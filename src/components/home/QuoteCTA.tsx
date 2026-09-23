import { Phone, MessageCircle, Clock } from "lucide-react";
import { site, whatsappHref } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/motion";

export function QuoteCTA() {
  return (
    <section id="quote" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(30,139,255,.18),transparent)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-3">Free quote</p>
          <h2 className="font-display text-balance text-4xl font-bold sm:text-5xl">Ready to stop overpaying for energy?</h2>
          <p className="mt-4 text-pretty text-lg text-muted">Get a bespoke, fixed-price quote from certified engineers. Free survey, no obligation, and a {site.guaranteeYears}-year guarantee if you go ahead.</p>
          <div className="mt-8 space-y-3">
            <a href={site.phoneHref} className="card card-hover flex items-center gap-4 p-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-volt-dim text-volt-3"><Phone className="h-5 w-5" /></span><span><span className="block font-semibold">{site.phone}</span><span className="text-sm text-muted">Speak to an engineer, not a call centre</span></span></a>
            <a href={whatsappHref()} target="_blank" rel="noopener" className="card card-hover flex items-center gap-4 p-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25d366]/15 text-[#5ee597]"><MessageCircle className="h-5 w-5" /></span><span><span className="block font-semibold">WhatsApp us</span><span className="text-sm text-muted">Send photos of your roof or boiler for a faster answer</span></span></a>
            <div className="flex items-center gap-3 px-1 text-sm text-muted"><Clock className="h-4 w-4 text-volt-3" />{site.hours} · reply within one working day</div>
          </div>
        </Reveal>
        <Reveal delay={2} className="card p-6 sm:p-8 lg:p-10">
          <QuoteForm compact />
        </Reveal>
      </div>
    </section>
  );
}
