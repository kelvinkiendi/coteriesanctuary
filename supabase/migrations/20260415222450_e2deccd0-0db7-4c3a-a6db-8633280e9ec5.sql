CREATE TABLE public.booking_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_rate_limits_ip_created ON public.booking_rate_limits (ip_address, created_at);

ALTER TABLE public.booking_rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access policies - only service role can read/write