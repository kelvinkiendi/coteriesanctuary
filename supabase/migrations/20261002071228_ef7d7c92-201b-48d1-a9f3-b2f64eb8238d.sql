CREATE OR REPLACE FUNCTION public.book_slot(
  _service text, _date date, _start time, _end time, _duration int,
  _tech text, _name text, _phone text, _email text, _requests text, _ref text,
  _exclude uuid DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE new_id uuid;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(_tech || _date::text));
  IF EXISTS (
    SELECT 1 FROM public.bookings
    WHERE nail_tech = _tech AND appointment_date = _date
      AND status NOT IN ('cancelled','no_show')
      AND (_exclude IS NULL OR id <> _exclude)
      AND start_time < _end AND end_time > _start
  ) THEN
    RAISE EXCEPTION 'SLOT_TAKEN';
  END IF;
  IF _exclude IS NOT NULL THEN
    UPDATE public.bookings SET service=_service, appointment_date=_date, date=_date::text,
      start_time=_start, end_time=_end, duration_minutes=_duration, nail_tech=_tech,
      time=to_char(_start,'FMHH12:MI AM')
    WHERE id=_exclude;
    RETURN _exclude;
  END IF;
  INSERT INTO public.bookings (service, date, time, name, phone, email, requests, ref_number,
    nail_tech, appointment_date, start_time, end_time, duration_minutes, status, calendar_sync_status)
  VALUES (_service, _date::text, to_char(_start,'FMHH12:MI AM'), _name, _phone, _email, _requests, _ref,
    _tech, _date, _start, _end, _duration, 'confirmed', 'pending')
  RETURNING id INTO new_id;
  RETURN new_id;
END; $$;
REVOKE ALL ON FUNCTION public.book_slot(text,date,time,time,int,text,text,text,text,text,text,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.book_slot(text,date,time,time,int,text,text,text,text,text,text,uuid) TO service_role;