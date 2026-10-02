import { TIME_SLOTS, slotToMinutes, CLOSE_MINUTES, TIMEZONE } from "./services.ts";

function toMin(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }

export function nairobiToday(): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const g = (t: string) => parts.find((p) => p.type === t)!.value;
  return { date: `${g("year")}-${g("month")}-${g("day")}`, minutes: (parseInt(g("hour")) % 24) * 60 + parseInt(g("minute")) };
}

/** Returns map: slot label -> list of free tech names */
export async function freeSlots(admin: any, date: string, techs: string[], duration: number, excludeId?: string) {
  let q = admin.from("bookings").select("id,nail_tech,start_time,end_time")
    .eq("appointment_date", date).not("status", "in", "(cancelled,no_show)").in("nail_tech", techs);
  const { data, error } = await q;
  if (error) throw error;
  const busy = (data || []).filter((b: any) => b.id !== excludeId && b.start_time && b.end_time);
  const now = nairobiToday();
  const result: Record<string, string[]> = {};
  for (const slot of TIME_SLOTS) {
    const s = slotToMinutes(slot), e = s + duration;
    if (e > CLOSE_MINUTES) continue;
    if (date === now.date && s <= now.minutes + 30) continue;
    const free = techs.filter((t) => !busy.some((b: any) => b.nail_tech === t && toMin(b.start_time) < e && toMin(b.end_time) > s));
    if (free.length) result[slot] = free;
  }
  return result;
}

export async function activeTechs(admin: any): Promise<string[]> {
  const { data } = await admin.from("nail_techs").select("name").eq("active", true).order("name");
  return (data || []).map((t: any) => t.name);
}
