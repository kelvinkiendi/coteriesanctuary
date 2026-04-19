// Re-export shared service constants for the frontend.
// Source of truth lives in supabase/functions/_shared/services.ts
// so the edge function and the UI stay in sync.
export { SERVICES, TIME_SLOTS } from "../../supabase/functions/_shared/services";
