"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Data = {
  interests: string[]; property: string; ownership: string; bill: string;
  name: string; email: string; phone: string; postcode: string; message: string; consent: boolean; company: string;
};

const initial = (p?: Partial<Data>): Data => ({
  interests: [], property: "", ownership: "", bill: "", name: "", email: "", phone: "", postcode: "", message: "", consent: false, company: "", ...p,
});

const PROPERTY = ["Detached", "Semi-detached", "Terraced", "Bungalow", "Flat", "Commercial / farm"];
const OWNERSHIP = ["I own it", "I'm a landlord", "I rent"];
const BILL = ["Under £100", "£100–£200", "£200–£300", "£300+"];

export function QuoteForm({ compact = false, defaults }: { compact?: boolean; defaults?: Partial<Data> }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(initial(defaults));
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setD((x) => ({ ...x, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };
  const steps = compact ? 1 : 3;

  const validate = (s: number) => {
    const e: typeof errors = {};
    if (!compact && s === 0 && d.interests.length === 0) e.interests = "Pick at least one";
    if (!compact && s === 1) { if (!d.property) e.property = "Please choose"; if (!d.ownership) e.ownership = "Please choose"; }
    if (s === steps - 1) {
      if (d.name.trim().length < 2) e.name = "Enter your name";
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email";
      if (d.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid UK phone number";
      if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/.test(d.postcode.trim())) e.postcode = "Enter a valid UK postcode";
      if (!d.consent) e.consent = "Please confirm you're happy to be contacted";
    }
    setErrors(e); return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep((s) => s + 1); };
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate(step)) return;
    setStatus("sending");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...d, source: compact ? "contact" : "quote", page: typeof location !== "undefined" ? location.pathname : "" }) });
      if (!r.ok) throw new Error();
      setStatus("done");
    } catch { setStatus("error"); }
  };

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-volt/20 text-volt-3"><CheckCircle2 className="h-8 w-8" /></span>
        <h3 className="font-display mt-6 text-2xl font-bold">Thanks, {d.name.split(" ")[0]} — we&apos;re on it.</h3>
        <p className="mx-auto mt-2 max-w-sm text-muted">One of our engineers will call you on {d.phone} within one working day to arrange your free survey.</p>
      </motion.div>
    );
  }

  const Err = ({ k }: { k: keyof Data }) => errors[k] ? <p className="mt-1.5 text-sm text-[#ff7b7b]" role="alert">{errors[k]}</p> : null;
  const Chip = ({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) => (
    <button type="button" aria-pressed={on} onClick={onClick} className={cn("min-h-11 rounded-xl border px-4 text-sm font-medium transition-all duration-200", on ? "border-volt bg-volt/20 text-fg shadow-[0_0_0_3px_rgba(30,139,255,.15)]" : "border-line-2 text-muted hover:text-fg")}>{children}</button>
  );

  return (
    <form onSubmit={submit} noValidate className="relative">
      {!compact && (
        <div className="mb-8 flex items-center gap-2" aria-label={`Step ${step + 1} of ${steps}`}>
          {Array.from({ length: steps }).map((_, i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", i <= step ? "bg-gradient-to-r from-volt-3 to-volt" : "bg-white/10")} />)}
          <span className="ml-2 font-mono text-xs text-muted">{step + 1}/{steps}</span>
        </div>
      )}
      {/* honeypot */}
      <input type="text" name="company" value={d.company} onChange={(e) => set("company", e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          {!compact && step === 0 && (
            <fieldset>
              <legend className="font-display text-2xl font-bold">What are you interested in?</legend>
              <p className="mt-1 text-sm text-muted">Choose everything that applies.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((s) => {
                  const on = d.interests.includes(s.slug);
                  return (
                    <button type="button" key={s.slug} aria-pressed={on} onClick={() => set("interests", on ? d.interests.filter((x) => x !== s.slug) : [...d.interests, s.slug])}
                      className={cn("flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200", on ? "border-volt bg-volt/15 shadow-[0_0_0_3px_rgba(30,139,255,.15)]" : "border-line-2 hover:border-line-2 hover:bg-white/[.03]")}>
                      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", on ? "bg-volt text-white" : "bg-volt-dim text-volt-3")}><s.icon className="h-5 w-5" /></span>
                      <span><span className="block font-semibold">{s.name}</span><span className="block text-xs text-muted">{s.stat.value} {s.stat.label}</span></span>
                    </button>
                  );
                })}
              </div>
              <Err k="interests" />
            </fieldset>
          )}
          {!compact && step === 1 && (
            <div className="space-y-8">
              <fieldset><legend className="font-display text-2xl font-bold">Tell us about the property</legend>
                <div className="mt-5 flex flex-wrap gap-2">{PROPERTY.map((p) => <Chip key={p} on={d.property === p} onClick={() => set("property", p)}>{p}</Chip>)}</div><Err k="property" />
              </fieldset>
              <fieldset><legend className="text-sm font-medium">Ownership</legend>
                <div className="mt-3 flex flex-wrap gap-2">{OWNERSHIP.map((p) => <Chip key={p} on={d.ownership === p} onClick={() => set("ownership", p)}>{p}</Chip>)}</div><Err k="ownership" />
              </fieldset>
              <fieldset><legend className="text-sm font-medium">Monthly energy bill (roughly)</legend>
                <div className="mt-3 flex flex-wrap gap-2">{BILL.map((p) => <Chip key={p} on={d.bill === p} onClick={() => set("bill", p)}>{p}</Chip>)}</div>
              </fieldset>
            </div>
          )}
          {step === steps - 1 && (
            <div>
              {!compact && <><h3 className="font-display text-2xl font-bold">Where should we send your quote?</h3><p className="mt-1 text-sm text-muted">An engineer will call to book your free survey. No hard sell, ever.</p></>}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-sm font-medium">Full name</span><input className="input" autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} /><Err k="name" /></label>
                <label className="block"><span className="mb-1.5 block text-sm font-medium">Phone</span><input className="input" type="tel" inputMode="tel" autoComplete="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} /><Err k="phone" /></label>
                <label className="block"><span className="mb-1.5 block text-sm font-medium">Email</span><input className="input" type="email" inputMode="email" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} /><Err k="email" /></label>
                <label className="block"><span className="mb-1.5 block text-sm font-medium">Postcode</span><input className="input uppercase" autoComplete="postal-code" placeholder="e.g. M1 1AE" value={d.postcode} onChange={(e) => set("postcode", e.target.value)} aria-invalid={!!errors.postcode} /><Err k="postcode" /></label>
                {compact && (
                  <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-medium">I&apos;m interested in</span>
                    <select className="input" value={d.interests[0] ?? ""} onChange={(e) => set("interests", e.target.value ? [e.target.value] : [])}>
                      <option value="">Not sure yet</option>{services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                    </select>
                  </label>
                )}
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-medium">Anything else? <span className="text-muted">(optional)</span></span><textarea className="input min-h-24" rows={3} value={d.message} onChange={(e) => set("message", e.target.value)} /></label>
              </div>
              <label className="mt-5 flex items-start gap-3 text-sm text-muted">
                <input type="checkbox" checked={d.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-volt" aria-invalid={!!errors.consent} />
                <span>I&apos;m happy for {site.name} to contact me about my enquiry. We never share your details.</span>
              </label>
              <Err k="consent" />
              {status === "error" && <p className="mt-4 rounded-xl border border-[#ff5c5c]/40 bg-[#ff5c5c]/10 p-3 text-sm" role="alert">Something went wrong sending that. Please call us on <a className="underline" href={site.phoneHref}>{site.phone}</a> or try again.</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-ghost"><ArrowLeft className="h-4 w-4" />Back</button> : <span />}
        {step < steps - 1
          ? <button type="button" onClick={next} className="btn btn-primary">Continue <ArrowRight className="h-4 w-4" /></button>
          : <button type="submit" disabled={status === "sending"} className="btn btn-primary min-w-40 disabled:opacity-70">{status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Get my free quote <ArrowRight className="h-4 w-4" /></>}</button>}
      </div>
    </form>
  );
}
