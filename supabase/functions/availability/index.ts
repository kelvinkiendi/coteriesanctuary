import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { SERVICES, serviceDuration } from "../_shared/services.ts";
import { freeSlots, activeTechs } from "../_shared/slots.ts";

const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { date, service, nail_tech } = await req.json();
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const techs = await activeTechs(admin);
    if (!date) return json({ techs });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !SERVICES.includes(service)) return json({ error: "Invalid request" }, 400);
    const pick = nail_tech && nail_tech !== "any" ? [nail_tech].filter((t) => techs.includes(t)) : techs;
    if (!pick.length) return json({ error: "Invalid nail tech" }, 400);
    const slots = await freeSlots(admin, date, pick, serviceDuration(service));
    return json({ techs, slots: Object.keys(slots), duration: serviceDuration(service) });
  } catch (e) {
    console.error("availability error", e);
    return json({ error: "Unable to load availability" }, 500);
  }
});
