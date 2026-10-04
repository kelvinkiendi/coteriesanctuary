// Google Calendar sync via the Lovable connector gateway.
// Works only when a Google Calendar connection is linked (GOOGLE_CALENDAR_API_KEY).
// Without it, bookings stay saved with calendar_sync_status = 'pending' and can be retried.
import { TIMEZONE } from "./services.ts";

const GATEWAY = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";
const CAL_ID = Deno.env.get("GOOGLE_CALENDAR_ID") || "primary";

export function calendarConfigured() {
  return !!(Deno.env.get("LOVABLE_API_KEY") && Deno.env.get("GOOGLE_CALENDAR_API_KEY"));
}

function headers() {
  return {
    Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
    "X-Connection-Api-Key": Deno.env.get("GOOGLE_CALENDAR_API_KEY")!,
    "Content-Type": "application/json",
  };
}

function eventBody(b: any) {
  const date = b.appointment_date;
  return {
    summary: `${b.service} – ${b.name}`,
    description:
      `Client: ${b.name}\nPhone: ${b.phone}\n${b.email ? `Email: ${b.email}\n` : ""}` +
      `Service: ${b.service}\nNail Tech: ${b.nail_tech}\nBooking ID: ${b.ref_number}\n` +
      `Status: ${b.status}\nPayment Status: ${b.payment_status}\nNotes: ${b.requests || "-"}\n\nFrom website`,
    start: { dateTime: `${date}T${String(b.start_time).slice(0, 5)}:00`, timeZone: TIMEZONE },
    end: { dateTime: `${date}T${String(b.end_time).slice(0, 5)}:00`, timeZone: TIMEZONE },
    extendedProperties: { private: { coterieBookingId: b.ref_number } },
  };
}

/** Create, update, or delete the event for a booking. Returns new sync fields. */
export async function syncBooking(b: any): Promise<{ calendar_sync_status: string; calendar_event_id: string | null }> {
  if (!calendarConfigured()) return { calendar_sync_status: "pending", calendar_event_id: b.calendar_event_id ?? null };
  try {
    const cancelled = b.status === "cancelled" || b.status === "no_show";
    if (cancelled) {
      if (b.calendar_event_id) {
        const r = await fetch(`${GATEWAY}/calendars/${encodeURIComponent(CAL_ID)}/events/${b.calendar_event_id}`, { method: "DELETE", headers: headers() });
        if (!r.ok && r.status !== 404 && r.status !== 410) throw new Error(`[${r.status}] ${await r.text()}`);
      }
      return { calendar_sync_status: "synced", calendar_event_id: null };
    }
    // Update existing event (no duplicates on retry/reschedule)
    if (b.calendar_event_id) {
      const r = await fetch(`${GATEWAY}/calendars/${encodeURIComponent(CAL_ID)}/events/${b.calendar_event_id}`, {
        method: "PUT", headers: headers(), body: JSON.stringify(eventBody(b)),
      });
      if (r.ok) return { calendar_sync_status: "synced", calendar_event_id: b.calendar_event_id };
      if (r.status !== 404 && r.status !== 410) throw new Error(`[${r.status}] ${await r.text()}`);
    }
    // Look up by booking id first, to avoid duplicates if a previous create succeeded silently
    const q = await fetch(`${GATEWAY}/calendars/${encodeURIComponent(CAL_ID)}/events?privateExtendedProperty=${encodeURIComponent(`coterieBookingId=${b.ref_number}`)}`, { headers: headers() });
    if (q.ok) {
      const found = (await q.json()).items?.[0];
      if (found?.id) return syncBooking({ ...b, calendar_event_id: found.id });
    }
    const r = await fetch(`${GATEWAY}/calendars/${encodeURIComponent(CAL_ID)}/events`, {
      method: "POST", headers: headers(), body: JSON.stringify(eventBody(b)),
    });
    if (!r.ok) throw new Error(`[${r.status}] ${await r.text()}`);
    const ev = await r.json();
    return { calendar_sync_status: "synced", calendar_event_id: ev.id };
  } catch (e) {
    console.error("Calendar sync failed for", b.ref_number, e);
    return { calendar_sync_status: "failed", calendar_event_id: b.calendar_event_id ?? null };
  }
}
