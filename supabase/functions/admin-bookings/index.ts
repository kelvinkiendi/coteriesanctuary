import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { SERVICES, BOOKING_STATUSES, PAYMENT_STATUSES, serviceDuration, minutesToHHMM, CLOSE_MINUTES, OPEN_MINUTES } from "../_shared/services.ts";
import { syncBooking } from "../_shared/calendar.ts";

const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const expected = Deno.env.get("ADMIN_PASSCODE");
  const body = await req.json().catch(() => ({}));
  if (!expected || typeof body.passcode !== "string" || !safeEqual(body.passcode, expected)) {
    await new Promise((r) => setTimeout(r, 500));
    return json({ error: "unauthorized" }, 401);
  }
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  try {
    const { action } = body;
    if (action === "login") return json({ ok: true });

    if (action === "list") {
      const { from, to } = body;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) return json({ error: "bad range" }, 400);
      const [{ data, error }, { data: techs }] = await Promise.all([
        admin.from("bookings").select("*").gte("appointment_date", from).lte("appointment_date", to).order("appointment_date").order("start_time"),
        admin.from("nail_techs").select("name").eq("active", true).order("name"),
      ]);
      if (error) throw error;
      return json({ bookings: data, techs: (techs || []).map((t: any) => t.name), services: SERVICES, statuses: BOOKING_STATUSES, payments: PAYMENT_STATUSES });
    }

    if (action === "update") {
      const { id, changes } = body;
      const { data: cur, error: e1 } = await admin.from("bookings").select("*").eq("id", id).single();
      if (e1 || !cur) return json({ error: "not found" }, 404);

      const patch: Record<string, unknown> = {};
      if (changes.status && BOOKING_STATUSES.includes(changes.status)) patch.status = changes.status;
      if (changes.payment_status && PAYMENT_STATUSES.includes(changes.payment_status)) patch.payment_status = changes.payment_status;

      const service = changes.service ?? cur.service;
      const tech = changes.nail_tech ?? cur.nail_tech;
      const date = changes.appointment_date ?? cur.appointment_date;
      const startStr: string = (changes.start_time ?? String(cur.start_time)).slice(0, 5);
      const scheduleChanged = service !== cur.service || tech !== cur.nail_tech || date !== cur.appointment_date || startStr !== String(cur.start_time).slice(0, 5);

      if (scheduleChanged) {
        if (!SERVICES.includes(service) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(startStr)) return json({ error: "Invalid values" }, 400);
        const [h, m] = startStr.split(":").map(Number);
        const s = h * 60 + m, duration = serviceDuration(service), e = s + duration;
        if (s < OPEN_MINUTES || e > CLOSE_MINUTES) return json({ error: "Outside opening hours (9 AM – 7 PM)" }, 400);
        const { error } = await admin.rpc("book_slot", {
          _service: service, _date: date, _start: minutesToHHMM(s), _end: minutesToHHMM(e), _duration: duration,
          _tech: tech, _name: cur.name, _phone: cur.phone, _email: cur.email, _requests: cur.requests, _ref: cur.ref_number, _exclude: id,
        });
        if (error) {
          if (String(error.message).includes("SLOT_TAKEN") || error.code === "23505") return json({ error: "That nail tech is already booked at that time." }, 409);
          throw error;
        }
      }
      if (Object.keys(patch).length) {
        const { error } = await admin.from("bookings").update(patch).eq("id", id);
        if (error) throw error;
      }
      const { data: updated } = await admin.from("bookings").select("*").eq("id", id).single();
      const sync = await syncBooking(updated);
      await admin.from("bookings").update(sync).eq("id", id);
      return json({ booking: { ...updated, ...sync } });
    }

    if (action === "retry_sync") {
      const { data: pending } = await admin.from("bookings").select("*").in("calendar_sync_status", ["pending", "failed"]).not("appointment_date", "is", null).limit(50);
      let synced = 0;
      for (const b of pending || []) {
        const sync = await syncBooking(b);
        await admin.from("bookings").update(sync).eq("id", b.id);
        if (sync.calendar_sync_status === "synced") synced++;
      }
      return json({ synced, total: pending?.length ?? 0 });
    }

    return json({ error: "unknown action" }, 400);
  } catch (e) {
    console.error("admin-bookings error", e);
    return json({ error: "server error" }, 500);
  }
});
