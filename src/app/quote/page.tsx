import type { Metadata } from "next";
import { ShieldCheck, Clock, PoundSterling } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Free quote", description: `Get a bespoke, fixed-price quote for solar, battery, insulation, heat pump or EV charger. Free survey, ${site.guaranteeYears}-year guarantee.` };

const BILL_MAP: [number, string][] = [[100, "Under £100"], [200, "£100–£200"], [300, "£200–£300"], [Infinity, "£300+"]];

export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const interests = (sp.interest ?? "").split(",").map((s) => ({ solar: "solar-panels", battery: "battery-storage", heatpump: "heat-pumps" }[s] ?? s)).filter((s) => services.some((x) => x.slug === s));
  const billN = Number(sp.bill);
  const bill = Number.isFinite(billN) && billN > 0 ? BILL_MAP.find(([max]) => billN < max)?.[1] ?? "" : "";

  return (
    <>
      <PageHero eyebrow="Free quote" title="Your bespoke quote starts here." intro="Three quick steps. An engineer calls within one working day to book your free survey — then you get a fixed price, in writing." />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-20">
        <Reveal className="card p-6 sm:p-8 lg:p-10"><QuoteForm defaults={{ interests, bill }} /></Reveal>
        <Reveal delay={2} className="space-y-3 lg:sticky lg:top-28 lg:self-start">
          {[
            { i: PoundSterling, t: "Fixed-price, bespoke", d: "Built from a real survey of your home, not a national average." },
            { i: ShieldCheck, t: `${site.guaranteeYears}-year guarantee`, d: "On workmanship, on every job, on top of manufacturer warranties." },
            { i: Clock, t: "No obligation, no hard sell", d: "Take the quote away and think about it. We'll be here." },
          ].map((c) => (
            <div key={c.t} className="card flex items-start gap-4 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-volt-dim text-volt-3"><c.i className="h-5 w-5" /></span><span><span className="block font-semibold">{c.t}</span><span className="text-sm text-muted">{c.d}</span></span></div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
