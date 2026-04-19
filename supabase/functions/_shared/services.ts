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
