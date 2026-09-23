import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BadgeCheck, Building2, Home, ShieldCheck, Tractor } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, Item } from "@/components/motion";
import { WhyUs } from "@/components/home/WhyUs";
import { QuoteCTA } from "@/components/home/QuoteCTA";

export const metadata: Metadata = { title: "About us", description: `${site.legalName}: a fresh renewable energy company built on ${site.experienceYears} years of combined experience across hotels, farms and ${site.domesticInstalls}+ homes.` };

const work = [
  { icon: Home, t: `${site.domesticInstalls}+ domestic properties`, d: "Solar, batteries, insulation, heat pumps and EV chargers for homeowners across the UK." },
  { icon: Building2, t: "Commercial hotels", d: "Roof-mounted solar and storage designed around occupancy, with zero disruption to guests." },
  { icon: Tractor, t: "Farms & agricultural", d: "High-demand sites with cold storage, pumps and machinery running on self-generated power." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Eco Volt" title="A new name. Seven years of doing this properly." intro={`${site.legalName} was founded by engineers who'd spent years installing renewables for other companies — and wanted to do it with better components, cleaner workmanship and a guarantee they could actually stand behind.`} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="card noise relative grid aspect-square place-items-center overflow-hidden p-12">
            <div className="absolute inset-[20%] rounded-full bg-volt/25 blur-[80px]" />
            <Image src="/brand/logo-lockup.png" alt={site.legalName} width={1042} height={862} className="animate-float relative w-3/4 drop-shadow-[0_0_50px_rgba(30,139,255,.4)]" />
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow mb-3">Our standard</p>
              <h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">High-quality results with long-term guarantees</h2>
              <p className="mt-4 text-pretty text-muted">Energy bills are too high and too many UK homes leak heat. We fix both — with bespoke designs, our own certified engineers and a {site.guaranteeYears}-year guarantee on every job. We&apos;d rather do fewer installs brilliantly than lots of them badly.</p>
            </Reveal>
            <Stagger className="mt-8 grid gap-3 sm:grid-cols-3">
              {[{ i: BadgeCheck, t: "NICEIC" }, { i: Award, t: "MCS" }, { i: ShieldCheck, t: `${site.guaranteeYears}-yr guarantee` }].map((c) => (
                <Item key={c.t}><div className="card flex items-center gap-3 p-4"><c.i className="h-5 w-5 text-volt-3" /><span className="text-sm font-semibold">{c.t}</span></div></Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-10"><p className="eyebrow mb-3">Who we've worked with</p><h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">Homes, hotels and farms</h2></Reveal>
        <Stagger className="grid gap-4 md:grid-cols-3">
          {work.map((w) => (
            <Item key={w.t}><div className="card card-hover h-full p-7"><span className="grid h-12 w-12 place-items-center rounded-xl bg-volt-dim text-volt-3"><w.icon className="h-6 w-6" /></span><h3 className="font-display mt-5 text-xl font-bold">{w.t}</h3><p className="mt-2 text-muted">{w.d}</p></div></Item>
          ))}
        </Stagger>
        <Reveal className="mt-10"><Link href="/quote" className="btn btn-primary">Work with us <ArrowRight className="h-4 w-4" /></Link></Reveal>
      </section>

      <WhyUs />
      <QuoteCTA />
    </>
  );
}
