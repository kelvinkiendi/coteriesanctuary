# Project Rules

- Public booking (create-booking + website slots) enforces opening hours: Mon–Sat 9:00 AM – 6:00 PM, Sun 12:00 PM – 5:00 PM (Africa/Nairobi). Admin/reception edits (admin-bookings) may schedule outside these hours — reception override is intentional; keep overlap protection there.
- Services list is shared between the frontend and edge functions via `supabase/functions/_shared/services.ts` (re-exported by `src/lib/services.ts`); never duplicate it.
- Nail tech scheduling: one tech cannot be double-booked (book_slot advisory check + unique constraint).
