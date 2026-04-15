import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.4/cors";

const SERVICES = [
  "Classic Manicure", "Gel Manicure", "Luxury Spa Manicure",
  "Classic Pedicure", "Gel Pedicure", "Luxury Spa Pedicure",
  "Nail Art (per nail)", "Acrylic Full Set", "Acrylic Fill-In",
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM",
];

function isValidDate(dateStr: string): boolean {
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { service, date, time, name, phone, email, requests, ref_number } = body;

    // Validate required fields
    const errors: string[] = [];

    if (!service || !SERVICES.includes(service)) {
      errors.push("Invalid service selected.");
    }
    if (!date || !isValidDate(date)) {
      errors.push("Invalid or past date.");
    }
    if (!time || !TIME_SLOTS.includes(time)) {
      errors.push("Invalid time slot.");
    }
    if (!name || typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100) {
      errors.push("Name is required (max 100 characters).");
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 6 || phone.trim().length > 20) {
      errors.push("Valid phone number is required.");
    }
    if (email && (typeof email !== "string" || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      errors.push("Invalid email address.");
    }
    if (requests && (typeof requests !== "string" || requests.length > 500)) {
      errors.push("Special requests must be under 500 characters.");
    }
    if (!ref_number || typeof ref_number !== "string" || ref_number.length > 30) {
      errors.push("Invalid reference number.");
    }

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: errors.join(" ") }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabaseAdmin.from("bookings").insert({
      service: service.trim(),
      date,
      time,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      requests: requests?.trim() || null,
      ref_number,
    });

    if (error) {
      console.error("Booking insert error:", JSON.stringify(error));
      return new Response(JSON.stringify({ error: "Unable to save booking." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Booking function error:", err);
    return new Response(JSON.stringify({ error: "Unable to process booking." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
