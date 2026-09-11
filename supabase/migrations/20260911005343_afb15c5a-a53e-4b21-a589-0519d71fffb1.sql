CREATE TABLE IF NOT EXISTS public.nail_techs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.nail_techs TO anon, authenticated;
GRANT ALL ON public.nail_techs TO service_role;
ALTER TABLE public.nail_techs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active nail techs" ON public.nail_techs FOR SELECT USING (active = true);

INSERT INTO public.nail_techs (name) VALUES ('Mbithi') ON CONFLICT (name) DO NOTHING;

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS nail_tech text NOT NULL DEFAULT 'Mbithi',
  ADD COLUMN IF NOT EXISTS appointment_date date,
  ADD COLUMN IF NOT EXISTS start_time time,
  ADD COLUMN IF NOT EXISTS end_time time,
  ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 60,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'confirmed',
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'unpaid',
  ADD COLUMN IF NOT EXISTS calendar_event_id text,
  ADD COLUMN IF NOT EXISTS calendar_sync_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

UPDATE public.bookings
SET appointment_date = date::date
WHERE appointment_date IS NULL AND date ~ '^\d{4}-\d{2}-\d{2}$';

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS bookings_set_updated_at ON public.bookings;
CREATE TRIGGER bookings_set_updated_at BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS nail_techs_set_updated_at ON public.nail_techs;
CREATE TRIGGER nail_techs_set_updated_at BEFORE UPDATE ON public.nail_techs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE UNIQUE INDEX IF NOT EXISTS bookings_no_double_booking
  ON public.bookings (nail_tech, appointment_date, start_time)
  WHERE status NOT IN ('cancelled', 'no_show') AND appointment_date IS NOT NULL AND start_time IS NOT NULL;

CREATE INDEX IF NOT EXISTS bookings_date_idx ON public.bookings (appointment_date);
CREATE UNIQUE INDEX IF NOT EXISTS bookings_ref_number_key ON public.bookings (ref_number);