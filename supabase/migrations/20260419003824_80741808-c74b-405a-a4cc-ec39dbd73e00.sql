-- Add explicit deny-all policy to booking_rate_limits
-- This table is only accessed by the create-booking edge function via service role
-- which bypasses RLS. Adding an explicit policy satisfies the linter and documents intent.

CREATE POLICY "No public access"
ON public.booking_rate_limits
AS RESTRICTIVE
FOR ALL
TO public
USING (false)
WITH CHECK (false);