import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { FAQ } from "@/components/FAQ";
import { Reveal, Stagger, Item } from "@/components/motion";
import { QuoteCTA } from "@/components/home/QuoteCTA";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: `${s.name} Installation UK`, description: `${s.short} NICEIC & MCS certified, ${site.guaranteeYears}-year guarantee. Free quote.` };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero eyebrow={s.name} title={s.headline} intro={s.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`/quote?interest=${s.slug}`} className="btn btn-primary">Get a free {s.name.toLowerCase()} quote <ArrowRight className="h-4 w-4" /></Link>
          <a href={site.phoneHref} className="btn btn-ghost"><Phone className="h-4 w-4" />{site.phone}</a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="card relative overflow-hidden p-8 lg:row-span-2">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-volt/25 blur-[80px]" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-volt-dim text-volt-3"><s.icon className="h-7 w-7" /></span>
            <p className="font-display mt-10 text-6xl font-extrabold text-gradient sm:text-7xl">{s.stat.value}</p>
            <p className="mt-2 text-muted">{s.stat.label}</p>
          </Reveal>
          <Reveal delay={1} className="card p-8">
            <p className="eyebrow mb-4">Benefits</p>
            <ul className="space-y-3">{s.benefits.map((b) => <li key={b} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-volt-3" /><span>{b}</span></li>)}</ul>
          </Reveal>
          <Reveal delay={2} className="card p-8">
            <p className="eyebrow mb-4">What&apos;s included</p>
            <ul className="space-y-3">{s.includes.map((b) => <li key={b} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-volt-3" /><span>{b}</span></li>)}</ul>
          </Reveal>
          <Reveal delay={3} className="card p-8 lg:col-span-2">
            <p className="eyebrow mb-4">Our promise</p>
            <p className="font-display text-2xl font-bold leading-snug">Bespoke design. Certified install. {site.guaranteeYears}-year guarantee.</p>
            <p className="mt-3 text-muted">Every {s.name.toLowerCase()} job starts with a proper survey and ends with a handover you actually understand. No subcontractors, no surprises on the invoice.</p>
          </Reveal>
        </div>
      </section>

      <FAQ items={s.faqs} title={`${s.name}: common questions`} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><p className="eyebrow mb-6">Pairs well with</p></Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Item key={o.slug}>
              <Link href={`/services/${o.slug}`} className="card card-hover group block h-full p-6">
                <o.icon className="h-6 w-6 text-volt-3" />
                <p className="font-display mt-4 font-bold">{o.name}</p>
                <p className="mt-1 text-sm text-muted">{o.short}</p>
              </Link>
            </Item>
          ))}
        </Stagger>
      </section>

      <QuoteCTA />
    </>
  );
}
