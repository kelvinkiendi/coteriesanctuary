import { useState, useMemo, useEffect } from "react";
import { X, Calendar, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SERVICES, TIME_SLOTS } from "@/lib/services";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const BookingModal = ({ open, onClose, preselectedService }: BookingModalProps) => {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [service, setService] = useState(preselectedService || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const refNumber = useMemo(() => `COT-${Date.now().toString(36).toUpperCase()}`, []);

  useEffect(() => {
    if (open && preselectedService) setService(preselectedService);
  }, [open, preselectedService]);

  if (!open) return null;

  // Ensure preselected service appears in dropdown even if not in list
  const serviceOptions: readonly string[] = preselectedService && !(SERVICES as readonly string[]).includes(preselectedService)
    ? [preselectedService, ...SERVICES]
    : SERVICES;

  const buildWhatsappUrl = () => {
    const msg = encodeURIComponent(
      `🔔 You have a new booking!\n\n` +
      `✨ COTERIE Sanctuary ✨\n\n` +
      `📋 Ref: ${refNumber}\n` +
      `💅 Service: ${service}\n` +
      `📅 Date: ${date}\n` +
      `🕐 Time: ${time}\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `${email ? `📧 Email: ${email}\n` : ""}` +
      `${requests ? `📝 Notes: ${requests}\n` : ""}`
    );
    return `https://wa.me/254722365861?text=${msg}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Open WhatsApp synchronously inside the user gesture so mobile browsers don't block it
    const whatsappWindow = window.open(buildWhatsappUrl(), "_blank", "noopener,noreferrer");

    try {
      const { data, error } = await supabase.functions.invoke("create-booking", {
        body: {
          service,
          date,
          time,
          name,
          phone,
          email: email || null,
          requests: requests || null,
          ref_number: refNumber,
        },
      });
      if (error) throw new Error("Unable to complete your booking.");
      if (data?.error) throw new Error("Unable to complete your booking.");
      setStep("confirmed");
      toast({ title: "✅ Booking Successful!", description: `Your appointment is confirmed. Ref: ${refNumber}` });
    } catch (err: any) {
      try { whatsappWindow?.close(); } catch {}
      toast({ title: "Booking failed", description: "Unable to complete your booking. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setService(preselectedService || "");
    setDate("");
    setTime("");
    setName("");
    setPhone("");
    setEmail("");
    setRequests("");
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-card rounded-sm shadow-elegant w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute top-4 right-4 text-foreground/40 hover:text-foreground">
          <X size={20} />
        </button>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-2">Book Your Session</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
              Reserve Your Session
            </h2>

            <label className="block mb-4">
              <span className="font-body text-sm font-semibold text-foreground mb-1 block">Service</span>
              <select required value={service} onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent">
                <option value="">Select a service</option>
                {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground mb-1 flex items-center gap-1">
                  <Calendar size={14} /> Date
                </span>
                <input type="date" required min={today} value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent" />
              </label>
              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground mb-1 flex items-center gap-1">
                  <Clock size={14} /> Time
                </span>
                <select required value={time} onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent">
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
            </div>

            <label className="block mb-4">
              <span className="font-body text-sm font-semibold text-foreground mb-1 block">Full Name</span>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent" />
            </label>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground mb-1 block">Phone</span>
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent" />
              </label>
              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground mb-1 block">Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent" />
              </label>
            </div>

            <label className="block mb-6">
              <span className="font-body text-sm font-semibold text-foreground mb-1 block">Special Requests</span>
              <textarea value={requests} onChange={(e) => setRequests(e.target.value)} rows={3} placeholder="Any preferences or notes..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent resize-none" />
            </label>

            <button type="submit" disabled={submitting}
              className="w-full py-3 bg-accent text-accent-foreground font-body font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-gold-dark transition-colors shadow-gold disabled:opacity-50">
              {submitting ? "Confirming..." : "Confirm Booking"}
            </button>
          </form>
        ) : (
          <div className="p-6 md:p-8 text-center">
            <CheckCircle size={48} className="text-accent mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">Booking Confirmed!</h2>
            <p className="font-body text-foreground/60 mb-6">Your appointment has been reserved.</p>

            <div className="bg-background rounded-sm p-6 mb-6 text-left space-y-2">
              <p className="font-body text-sm"><strong>Reference:</strong> {refNumber}</p>
              <p className="font-body text-sm"><strong>Service:</strong> {service}</p>
              <p className="font-body text-sm"><strong>Date:</strong> {date}</p>
              <p className="font-body text-sm"><strong>Time:</strong> {time}</p>
              <p className="font-body text-sm"><strong>Name:</strong> {name}</p>
              <p className="font-body text-sm"><strong>Phone:</strong> {phone}</p>
            </div>

            <p className="font-body text-xs text-muted-foreground mb-4">
              Your booking details have been sent via WhatsApp. We look forward to seeing you!
            </p>

            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 mb-3 bg-[#25D366] text-white font-body font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity text-center"
            >
              Resend via WhatsApp
            </a>

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
