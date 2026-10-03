import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw, X, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type View = "day" | "week" | "month";
interface Booking {
  id: string; ref_number: string; name: string; phone: string; email: string | null; requests: string | null;
  service: string; nail_tech: string; appointment_date: string | null; start_time: string | null; end_time: string | null;
  status: string; payment_status: string; calendar_sync_status: string; created_at: string; date: string; time: string;
}

const PASS_KEY = "coterie_admin_pass";
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const label = (s: string) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const t12 = (t: string | null) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};
const statusColor: Record<string, string> = {
  confirmed: "border-l-accent", pending: "border-l-muted-foreground", checked_in: "border-l-primary",
  completed: "border-l-secondary", cancelled: "border-l-destructive opacity-60", no_show: "border-l-destructive opacity-60",
};

const call = async (passcode: string, payload: Record<string, unknown>) =>
  supabase.functions.invoke("admin-bookings", { body: { passcode, ...payload } });

const Admin = () => {
  const [passcode, setPasscode] = useState(() => sessionStorage.getItem(PASS_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [view, setView] = useState<View>("week");
  const [anchor, setAnchor] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [meta, setMeta] = useState<{ techs: string[]; services: string[]; statuses: string[]; payments: string[] }>({ techs: [], services: [], statuses: [], payments: [] });
  const [selected, setSelected] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => { document.title = "Reception Calendar | COTERIE"; }, []);

  const range = useMemo(() => {
    if (view === "day") return { from: anchor, days: [anchor] };
    if (view === "week") {
      const start = addDays(anchor, -((anchor.getDay() + 6) % 7));
      return { from: start, days: Array.from({ length: 7 }, (_, i) => addDays(start, i)) };
    }
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const start = addDays(first, -((first.getDay() + 6) % 7));
    return { from: start, days: Array.from({ length: 42 }, (_, i) => addDays(start, i)) };
  }, [view, anchor]);

  const load = useCallback(async (pc = passcode) => {
    if (!pc) return;
    setLoading(true);
    const { data, error } = await call(pc, { action: "list", from: iso(range.days[0]), to: iso(range.days[range.days.length - 1]) });
    setLoading(false);
    if (error || !data?.bookings) {
      sessionStorage.removeItem(PASS_KEY);
      setAuthed(false);
      return;
    }
    setAuthed(true);
    setBookings(data.bookings);
    setMeta({ techs: data.techs, services: data.services, statuses: data.statuses, payments: data.payments });
  }, [passcode, range]);

  useEffect(() => { load(); }, [load]);
  // Auto-refresh so new website bookings appear
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => load(), 30000);
    return () => clearInterval(t);
  }, [authed, load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await call(input, { action: "login" });
    if (data?.ok) {
      sessionStorage.setItem(PASS_KEY, input);
      setPasscode(input);
    } else toast({ title: "Incorrect passcode", variant: "destructive" });
  };

  const save = async (changes: Record<string, string>) => {
    if (!selected) return;
    const { data, error } = await call(passcode, { action: "update", id: selected.id, changes });
    if (error) {
      let msg = "Could not save changes.";
      try { msg = JSON.parse(await (error as any).context.text()).error || msg; } catch { /* ignore */ }
      toast({ title: "Not saved", description: msg, variant: "destructive" });
      return;
    }
    setSelected(data.booking);
    toast({ title: "Booking updated" });
    load();
  };

  const retrySync = async () => {
    const { data } = await call(passcode, { action: "retry_sync" });
    toast({ title: "Calendar sync", description: `${data?.synced ?? 0} of ${data?.total ?? 0} bookings synced.` });
    load();
  };

  const move = (dir: number) => {
    if (view === "day") setAnchor(addDays(anchor, dir));
    else if (view === "week") setAnchor(addDays(anchor, dir * 7));
    else setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + dir, 1));
  };

  const byDay = (d: Date) => bookings.filter((b) => (b.appointment_date || b.date) === iso(d));

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-card shadow-elegant rounded-sm p-8 w-full max-w-sm">
          <h1 className="font-heading text-2xl font-bold text-primary mb-2">Reception Calendar</h1>
          <p className="font-body text-sm text-muted-foreground mb-6">Enter the team passcode.</p>
          <input type="password" value={input} onChange={(e) => setInput(e.target.value)} autoFocus
            className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent mb-4" />
          <button className="w-full py-3 bg-accent text-accent-foreground font-body font-bold text-sm tracking-widest uppercase rounded-sm">Enter</button>
          <Link to="/" className="block text-center mt-4 font-body text-xs text-muted-foreground hover:text-accent">Back to website</Link>
        </form>
      </div>
    );
  }

  const title = view === "month"
    ? anchor.toLocaleDateString("en-KE", { month: "long", year: "numeric" })
    : view === "day"
      ? anchor.toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : `${range.days[0].toLocaleDateString("en-KE", { day: "numeric", month: "short" })} – ${range.days[6].toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}`;

  const Card = ({ b, compact }: { b: Booking; compact?: boolean }) => (
    <button onClick={() => setSelected(b)}
      className={`w-full text-left bg-background border border-border border-l-4 ${statusColor[b.status] || ""} rounded-sm p-2 mb-1.5 hover:border-accent transition-colors`}>
      <p className="font-body text-[11px] font-bold text-primary">{t12(b.start_time) || b.time}{!compact && b.end_time ? ` – ${t12(b.end_time)}` : ""}</p>
      <p className="font-body text-xs font-semibold truncate">{b.name}</p>
      {!compact && <>
        <p className="font-body text-[11px] text-muted-foreground truncate">{b.service}</p>
        <p className="font-body text-[11px] text-muted-foreground">{b.nail_tech} · {label(b.status)} · {label(b.payment_status)}</p>
      </>}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-foreground/60 hover:text-accent"><ArrowLeft size={14} /> Website</Link>
            <h1 className="font-heading text-3xl font-bold text-primary mt-2">Reception Calendar</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={retrySync} className="px-3 py-2 border border-border rounded-sm font-body text-xs uppercase tracking-wider hover:border-accent">Retry calendar sync</button>
            <button onClick={() => load()} aria-label="Refresh" className="p-2 border border-border rounded-sm hover:border-accent"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /></button>
            <button onClick={() => { sessionStorage.removeItem(PASS_KEY); setPasscode(""); setAuthed(false); }} aria-label="Log out" className="p-2 border border-border rounded-sm hover:border-accent"><LogOut size={16} /></button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => move(-1)} aria-label="Previous" className="p-2 border border-border rounded-sm hover:border-accent"><ChevronLeft size={16} /></button>
            <button onClick={() => setAnchor(new Date())} className="px-3 py-2 border border-border rounded-sm font-body text-xs uppercase tracking-wider hover:border-accent">Today</button>
            <button onClick={() => move(1)} aria-label="Next" className="p-2 border border-border rounded-sm hover:border-accent"><ChevronRight size={16} /></button>
            <h2 className="font-heading text-lg font-semibold text-primary ml-2">{title}</h2>
          </div>
          <div className="flex border border-border rounded-sm overflow-hidden">
            {(["day", "week", "month"] as View[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-4 py-2 font-body text-xs uppercase tracking-wider ${view === v ? "bg-accent text-accent-foreground" : "hover:bg-muted"}`}>{v}</button>
            ))}
          </div>
        </div>

        {view === "day" && (
          <div className="bg-card rounded-sm shadow-elegant p-4 min-h-[300px]">
            {byDay(anchor).length === 0 ? <p className="font-body text-sm text-muted-foreground">No appointments.</p> : byDay(anchor).map((b) => <Card key={b.id} b={b} />)}
          </div>
        )}

        {view === "week" && (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {range.days.map((d) => (
              <div key={iso(d)} className={`bg-card rounded-sm shadow-elegant p-2 min-h-[200px] ${iso(d) === iso(new Date()) ? "ring-1 ring-accent" : ""}`}>
                <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">{d.toLocaleDateString("en-KE", { weekday: "short", day: "numeric" })}</p>
                {byDay(d).map((b) => <Card key={b.id} b={b} />)}
              </div>
            ))}
          </div>
        )}

        {view === "month" && (
          <div className="grid grid-cols-7 gap-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <p key={d} className="font-body text-xs uppercase text-muted-foreground text-center py-1">{d}</p>)}
            {range.days.map((d) => (
              <div key={iso(d)} className={`bg-card rounded-sm p-1.5 min-h-[100px] ${d.getMonth() !== anchor.getMonth() ? "opacity-40" : ""} ${iso(d) === iso(new Date()) ? "ring-1 ring-accent" : ""}`}>
                <p className="font-body text-xs text-muted-foreground mb-1">{d.getDate()}</p>
                {byDay(d).slice(0, 3).map((b) => <Card key={b.id} b={b} compact />)}
                {byDay(d).length > 3 && (
                  <button onClick={() => { setAnchor(d); setView("day"); }} className="font-body text-[11px] text-accent">+{byDay(d).length - 3} more</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && <Details b={selected} meta={meta} onClose={() => setSelected(null)} onSave={save} />}
    </div>
  );
};

const Details = ({ b, meta, onClose, onSave }: {
  b: Booking; meta: { techs: string[]; services: string[]; statuses: string[]; payments: string[] };
  onClose: () => void; onSave: (c: Record<string, string>) => void;
}) => {
  const [service, setService] = useState(b.service);
  const [tech, setTech] = useState(b.nail_tech);
  const [date, setDate] = useState(b.appointment_date || "");
  const [start, setStart] = useState((b.start_time || "").slice(0, 5));
  useEffect(() => { setService(b.service); setTech(b.nail_tech); setDate(b.appointment_date || ""); setStart((b.start_time || "").slice(0, 5)); }, [b]);
  const sel = "w-full px-3 py-2 bg-background border border-border rounded-sm font-body text-sm focus:outline-none focus:border-accent";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-sm shadow-elegant w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-foreground/40 hover:text-foreground"><X size={20} /></button>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-1">{b.ref_number}</p>
        <h2 className="font-heading text-2xl font-bold text-primary mb-4">{b.name}</h2>
        <div className="font-body text-sm space-y-1 mb-5">
          <p><strong>Phone:</strong> <a className="text-accent" href={`tel:${b.phone}`}>{b.phone}</a></p>
          {b.email && <p><strong>Email:</strong> {b.email}</p>}
          <p><strong>Notes:</strong> {b.requests || "—"}</p>
          <p><strong>Booked:</strong> {new Date(b.created_at).toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}</p>
          <p><strong>Calendar sync:</strong> {label(b.calendar_sync_status)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <label className="block"><span className="font-body text-xs font-semibold">Status</span>
            <select className={sel} value={b.status} onChange={(e) => onSave({ status: e.target.value })}>
              {meta.statuses.map((s) => <option key={s} value={s}>{label(s)}</option>)}
            </select></label>
          <label className="block"><span className="font-body text-xs font-semibold">Payment</span>
            <select className={sel} value={b.payment_status} onChange={(e) => onSave({ payment_status: e.target.value })}>
              {meta.payments.map((s) => <option key={s} value={s}>{label(s)}</option>)}
            </select></label>
        </div>

        <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Reschedule / change</p>
        <div className="space-y-3 mb-4">
          <select className={sel} value={service} onChange={(e) => setService(e.target.value)}>
            {!meta.services.includes(service) && <option value={service}>{service}</option>}
            {meta.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="grid grid-cols-3 gap-2">
            <select className={sel} value={tech} onChange={(e) => setTech(e.target.value)}>
              {!meta.techs.includes(tech) && <option value={tech}>{tech}</option>}
              {meta.techs.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="date" className={sel} value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" step={900} className={sel} value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onSave({ service, nail_tech: tech, appointment_date: date, start_time: start })}
            className="flex-1 py-2.5 bg-accent text-accent-foreground font-body font-bold text-xs tracking-widest uppercase rounded-sm">Save changes</button>
          {b.status !== "cancelled" && (
            <button onClick={() => confirm("Cancel this appointment?") && onSave({ status: "cancelled" })}
              className="px-4 py-2.5 border border-destructive text-destructive font-body font-bold text-xs tracking-widest uppercase rounded-sm">Cancel booking</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
