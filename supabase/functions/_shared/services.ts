// Shared list of bookable services and time slots.
// Imported by both the frontend (src/components/BookingModal.tsx)
// and the edge function (supabase/functions/create-booking/index.ts)
// to keep validation in sync.

export const SERVICES = [
  "Regular Polish Application",
  "Gel Polish Application",
  "Gel Overlay",
  "Acrylic Overlay",
  "Polygel Overlay",
  "Coterie Classic Manicure",
  "Coterie Signature Manicure",
  "Coterie Pamper Manicure",
  "Coterie Classic Pedicure",
  "Coterie Signature Pedicure",
  "Coterie Pamper Pedicure",
  "Coterie Classic Gents Manicure",
  "Coterie Signature Gents Manicure",
  "Coterie Pamper Gents Manicure",
  "Coterie Classic Gents Pedicure",
  "Coterie Signature Gents Pedicure",
  "Coterie Pamper Gents Pedicure",
  "Pre- Shaped Stick-Ons",
  "Clear Acrylic Tips",
  "Colored Acrylic Tips",
  "Acrylic Ombre Tips",
  "Red Bottoms Tips",
  "Extra Long Tips Addictional",
  "Acrylic Sculpting",
  "Gel Sculpting",
  "Acrylic Moulding",
  "Acrylic Infill",
  "Gel Infill",
  "Toes Acrylic Feet Extensions",
  "Toes Gel Feet Extensions",
  "Toes Nail Reconstruction",
  "Toes Ingrown Removal",
  "Feet Acrylic Refill",
  "Feet Gel Refill",
  "Gel Soak-Off",
  "Acrylic Removal",
  "Extension Removal",
  "French Tip Add-On",
  "Chrome / Cat Eye Finish (full set)",
  "Rhinestones / Gems(per nail)",
  "Nail Art is charged separately depending on the art",
  // Packages
  "Solo Package",
  "Couples Package",
  "Masculine Package",
  "Custom Package",
] as const;

export const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM",
] as const;

// ---- Scheduling ----
export const TIMEZONE = "Africa/Nairobi";
export const OPEN_MINUTES = 9 * 60; // 9:00 AM
export const CLOSE_MINUTES = 19 * 60; // 7:00 PM (latest end time)

/** Default duration (minutes) per service, derived from its name. */
export function serviceDuration(service: string): number {
  const s = service.toLowerCase();
  if (s.includes("solo package") || s.includes("couples package")) return 240;
  if (s.includes("masculine package")) return 120;
  if (s.includes("custom package")) return 120;
  if (s.includes("pamper")) return 90;
  if (s.includes("signature")) return 75;
  if (s.includes("classic")) return 60;
  if (s.includes("tips") || s.includes("sculpting") || s.includes("moulding") || s.includes("extensions") || s.includes("reconstruction")) return 120;
  if (s.includes("infill") || s.includes("refill") || s.includes("overlay")) return 90;
  if (s.includes("removal") || s.includes("soak-off") || s.includes("add-on") || s.includes("rhinestones") || s.includes("chrome") || s.includes("nail art")) return 30;
  return 60;
}

export function slotToMinutes(slot: string): number {
  const m = slot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return NaN;
  let h = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + parseInt(m[2], 10);
}

export function minutesToHHMM(min: number): string {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

export function minutesToLabel(min: number): string {
  const h = Math.floor(min / 60), m = min % 60;
  const ap = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${ap}`;
}

export const BOOKING_STATUSES = ["pending", "confirmed", "checked_in", "completed", "cancelled", "no_show"] as const;
export const PAYMENT_STATUSES = ["unpaid", "deposit_paid", "paid", "refunded"] as const;
