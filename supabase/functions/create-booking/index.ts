import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { SERVICES, TIME_SLOTS, serviceDuration, slotToMinutes, minutesToHHMM, dayBounds } from "../_shared/services.ts";
import { freeSlots, activeTechs, nairobiToday } from "../_shared/slots.ts";
import { syncBooking } from "../_shared/calendar.ts";
import { notifyBookingCreated } from "../_shared/notify.ts";

const MAX_BOOKINGS_PER_HOUR = 5;
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  try {
    const body = await req.json();
    const { service, date, time, name, phone, email, requests, ref_number, nail_tech } = body;

    const errors: string[] = [];
    if (!service || !SERVICES.includes(service)) errors.push("Invalid service.");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < nairobiToday().date) errors.push("Invalid date.");
    if (!time || !TIME_SLOTS.includes(time)) errors.push("Invalid time.");
    if (typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100) errors.push("Invalid name.");
    if (typeof phone !== "string" || phone.trim().length < 6 || phone.trim().length > 20) errors.push("Invalid phone.");
    if (email && (typeof email !== "string" || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.push("Invalid email.");
    if (requests && (typeof requests !== "string" || requests.length > 500)) errors.push("Notes too long.");
    if (typeof ref_number !== "string" || !/^COT-[A-Z0-9]{4,24}$/.test(ref_number)) errors.push("Invalid reference.");
    if (errors.length) return json({ error: errors.join(" ") }, 400);

    // Idempotency: same reference already saved (e.g. retry/refresh) -> return it, don't duplicate
    const { data: existing } = await admin.from("bookings").select("*").eq("ref_number", ref_number).maybeSingle();
    if (existing) return json({ success: true, booking: publicView(existing) });

    // Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { count } = await admin.from("booking_rate_limits").select("*", { count: "exact", head: true })
      .eq("ip_address", ip).gte("created_at", new Date(Date.now() - 3600_000).toISOString());
    if ((count ?? 0) >= MAX_BOOKINGS_PER_HOUR) return json({ error: "rate_limited" }, 429);

    const techs = await activeTechs(admin);
    const duration = serviceDuration(service);
    const start = slotToMinutes(time), end = start + duration;
    const { open, close } = dayBounds(date);
    if (start < open || end > close) return json({ error: "slot_taken" }, 409);

    const candidates = nail_tech && nail_tech !== "any" ? [nail_tech].filter((t) => techs.includes(t)) : techs;
    if (!candidates.length) return json({ error: "Invalid nail tech." }, 400);
    const free = (await freeSlots(admin, date, candidates, duration))[time] || [];

    let bookingId: string | null = null;
    for (const tech of free) {
      const { data, error } = await admin.rpc("book_slot", {
        _service: service, _date: date, _start: minutesToHHMM(start), _end: minutesToHHMM(end), _duration: duration,
        _tech: tech, _name: name.trim(), _phone: phone.trim(), _email: email?.trim() || null,
        _requests: requests?.trim() || null, _ref: ref_number, _exclude: null,
      });
      if (!error) { bookingId = data; break; }
      if (!String(error.message).includes("SLOT_TAKEN") && error.code !== "23505") {
        console.error("book_slot error", JSON.stringify(error));
        return json({ error: "save_failed" }, 500);
      }
    }
    if (!bookingId) return json({ error: "slot_taken" }, 409);

    await admin.from("booking_rate_limits").insert({ ip_address: ip });
    await admin.from("booking_rate_limits").delete().lt("created_at", new Date(Date.now() - 7200_000).toISOString());

    const { data: booking } = await admin.from("bookings").select("*").eq("id", bookingId).single();
    const sync = await syncBooking(booking);
    await admin.from("bookings").update(sync).eq("id", bookingId);
    await notifyBookingCreated(booking);

    return json({ success: true, booking: publicView({ ...booking, ...sync }) });
  } catch (err) {
    console.error("Booking function error:", err);
    return json({ error: "server_error" }, 500);
  }
});

function publicView(b: any) {
  return {
    ref_number: b.ref_number, service: b.service, nail_tech: b.nail_tech, date: b.appointment_date,
    start_time: String(b.start_time).slice(0, 5), end_time: String(b.end_time).slice(0, 5), status: b.status,
  };
}
