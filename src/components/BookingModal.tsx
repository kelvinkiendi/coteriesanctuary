import { useState, useEffect, useCallback } from "react";
import { X, Calendar, Clock, CheckCircle, User, CalendarPlus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { SERVICES } from "@/lib/services";
import { serviceDuration } from "../../supabase/functions/_shared/services";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedService?: string;
}

interface ConfirmedBooking {
  ref_number: string;
  service: string;
  nail_tech: string;
  date: string;
  start_time: string;
  end_time: string;
}

const newRef = () =>
  `COT-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const inputCls =
  "w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent";

const fmtTime = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};
const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const BookingModal = ({ open, onClose, preselectedService }: BookingModalProps) => {
  const [service, setService] = useState(preselectedService || "");
  const [tech, setTech] = useState("any");
  const [techs, setTechs] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refNumber, setRefNumber] = useState(newRef);
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);
  const [slotMessage, setSlotMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (open && preselectedService) setService(preselectedService);
  }, [open, preselectedService]);

  useEffect(() => {
    if (!open || techs.length) return;
    supabase.functions.invoke("availability", { body: {} }).then(({ data }) => {
      if (data?.techs) setTechs(data.techs);
    });
  }, [open, techs.length]);

  const loadSlots = useCallback(async () => {
    if (!service || !date || !(SERVICES as readonly string[]).includes(service)) {
      setSlots(null);
      return;
    }
    setLoadingSlots(true);
    const { data, error } = await supabase.functions.invoke("availability", {
      body: { date, service, nail_tech: tech },
    });
    setLoadingSlots(false);
    if (error || !data?.slots) {
      setSlots([]);
      return;
    }
    setSlots(data.slots);
    setTime((t) => (data.slots.includes(t) ? t : ""));
  }, [service, date, tech]);

  useEffect(() => {
    if (open) loadSlots();
  }, [open, loadSlots]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !time) return;
    setSubmitting(true);
    setSlotMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("create-booking", {
        body: {
          service, date, time, name, phone, nail_tech: tech,
          email: email || null, requests: requests || null, ref_number: refNumber,
        },
      });
      if (error) {
        const status = error instanceof FunctionsHttpError ? error.context.status : 0;
        if (status === 409) {
          setSlotMessage("That time has just been taken. Please choose another available time.");
          setTime("");
          await loadSlots();
          return;
        }
        if (status === 429) {
          toast({ title: "Too many attempts", description: "Please wait a little and try again.", variant: "destructive" });
          return;
        }
        throw error;
      }
      if (!data?.success || !data.booking) throw new Error("booking failed");
      setConfirmed(data.booking);
    } catch (err) {
      console.error("Booking failed:", err);
      toast({ title: "We couldn't complete your booking", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmed(null);
    setService(preselectedService || "");
    setTech("any");
    setDate("");
    setTime("");
    setSlots(null);
    setName("");
    setPhone("");
    setEmail("");
    setRequests("");
    setSlotMessage("");
    setRefNumber(newRef());
    onClose();
  };

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" });
  const serviceOptions: readonly string[] =
    preselectedService && !(SERVICES as readonly string[]).includes(preselectedService)
      ? [preselectedService, ...SERVICES]
      : SERVICES;

  const calendarLinks = (b: ConfirmedBooking) => {
    const stamp = (t: string) => `${b.date.replace(/-/g, "")}T${t.replace(":", "")}00`;
    const title = `Coterie Nails Sanctuary — ${b.service}`;
    const details = `Booking ID: ${b.ref_number}\nNail Tech: ${b.nail_tech}`;
    const location = "Chaka Court, Kilimani, Nairobi";
    const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(b.start_time)}/${stamp(b.end_time)}&ctz=Africa/Nairobi&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Coterie//Booking//EN", "BEGIN:VEVENT",
      `UID:${b.ref_number}@coterie`, `DTSTART;TZID=Africa/Nairobi:${stamp(b.start_time)}`,
      `DTEND;TZID=Africa/Nairobi:${stamp(b.end_time)}`, `SUMMARY:${title}`,
      `DESCRIPTION:${details.replace(/\n/g, "\\n")}`, `LOCATION:${location}`, "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    return { google, ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-card rounded-sm shadow-elegant w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button onClick={handleClose} aria-label="Close" className="absolute top-4 right-4 text-foreground/40 hover:text-foreground">
          <X size={20} />
        </button>

        {!confirmed ? (
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">Book Your Session</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">Reserve Your Session</h2>

            <label className="block mb-4">
              <span className="font-body text-sm font-semibold text-foreground mb-1 block">Service</span>
              <select required value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
                <option value="">Select a service</option>
                {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {service && (SERVICES as readonly string[]).includes(service) && (
                <span className="font-body text-xs text-muted-foreground mt-1 block">
                  Approx. {serviceDuration(service)} minutes
                </span>
              )}
            </label>

            <label className="block mb-4">
              <span className="font-body text-sm font-semibold text-foreground mb-1 flex items-center gap-1">
                <User size={14} /> Nail Tech
              </span>
              <select value={tech} onChange={(e) => setTech(e.target.value)} className={inputCls}>
                <option value="any">Any available</option>
                {techs.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>

            <label className="block mb-4">
              <span className="font-body text-sm font-semibold text-foreground mb-1 flex items-center gap-1">
                <Calendar size={14} /> Date
              </span>
              <input type="date" required min={today} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
            </label>

            <div className="mb-4">
              <span className="font-body text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                <Clock size={14} /> Available Times
              </span>
              {!service || !date ? (
                <p className="font-body text-xs text-muted-foreground">Choose a service and date to see available times.</p>
              ) : loadingSlots ? (
                <p className="font-body text-xs text-muted-foreground flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Checking availability…</p>
              ) : slots && slots.length === 0 ? (
                <p className="font-body text-xs text-muted-foreground">No times left on this day. Please pick another date.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots?.map((s) => (
                    <button type="button" key={s} onClick={() => setTime(s)}
                      className={`py-2 rounded-sm border font-body text-xs transition-colors ${time === s ? "bg-accent text-accent-foreground border-accent" : "bg-background border-border hover:border-accent"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {slotMessage && <p className="font-body text-xs text-destructive mt-2">{slotMessage}</p>}
            </div>

            <label className="block mb-4">
              <span className="font-body text-sm font-semibold text-foreground mb-1 block">Full Name</span>
              <input type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className={inputCls} />
            </label>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground mb-1 block">Phone</span>
                <input type="tel" required minLength={6} maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX" className={inputCls} />
              </label>
              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground mb-1 block">Email (optional)</span>
                <input type="email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" className={inputCls} />
              </label>
            </div>

            <label className="block mb-6">
              <span className="font-body text-sm font-semibold text-foreground mb-1 block">Special Requests</span>
              <textarea value={requests} maxLength={500} onChange={(e) => setRequests(e.target.value)} rows={3} placeholder="Any preferences or notes..." className={`${inputCls} resize-none`} />
            </label>

            <button type="submit" disabled={submitting || !time}
              className="w-full py-3 bg-accent text-accent-foreground font-body font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-dark transition-colors shadow-gold disabled:opacity-50">
              {submitting ? "Confirming..." : "Confirm Booking"}
            </button>
          </form>
        ) : (
          <div className="p-6 md:p-8 text-center">
            <CheckCircle size={48} className="text-accent mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">Appointment Confirmed</h2>
            <p className="font-body text-foreground/60 mb-6">Your appointment at Coterie Nails Sanctuary is confirmed.</p>

            <div className="bg-background rounded-sm p-6 mb-6 text-left space-y-2">
              <p className="font-body text-sm"><strong>Service:</strong> {confirmed.service}</p>
              <p className="font-body text-sm"><strong>Date:</strong> {fmtDate(confirmed.date)}</p>
              <p className="font-body text-sm"><strong>Time:</strong> {fmtTime(confirmed.start_time)} – {fmtTime(confirmed.end_time)}</p>
              <p className="font-body text-sm"><strong>Nail Tech:</strong> {confirmed.nail_tech}</p>
              <p className="font-body text-sm"><strong>Booking ID:</strong> {confirmed.ref_number}</p>
            </div>

            <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 flex items-center justify-center gap-1">
              <CalendarPlus size={14} /> Add to your calendar (optional)
            </p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <a href={calendarLinks(confirmed).google} target="_blank" rel="noopener noreferrer"
                className="py-2.5 border border-border rounded-sm font-body text-xs tracking-wider uppercase hover:border-accent transition-colors">
                Google
              </a>
              <a href={calendarLinks(confirmed).ics} download={`coterie-${confirmed.ref_number}.ics`}
                className="py-2.5 border border-border rounded-sm font-body text-xs tracking-wider uppercase hover:border-accent transition-colors">
                Apple / Outlook
              </a>
            </div>

            <button onClick={handleClose}
              className="w-full py-3 bg-accent text-accent-foreground font-body font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-dark transition-colors">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
