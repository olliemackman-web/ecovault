import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, whatsappHref } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Contact", description: `Call, WhatsApp or message ${site.name}. Free surveys across all major UK cities.` };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to an engineer, not a call centre." intro="Call, WhatsApp, or send us a message — we reply within one working day and never hard-sell." />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-24">
        <Reveal className="space-y-3">
          <a href={site.phoneHref} className="card card-hover flex items-center gap-4 p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-volt-dim text-volt-3"><Phone className="h-5 w-5" /></span><span><span className="block font-display text-lg font-bold">{site.phone}</span><span className="text-sm text-muted">{site.hours}</span></span></a>
          <a href={whatsappHref()} target="_blank" rel="noopener" className="card card-hover flex items-center gap-4 p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#25d366]/15 text-[#5ee597]"><MessageCircle className="h-5 w-5" /></span><span><span className="block font-display text-lg font-bold">WhatsApp</span><span className="text-sm text-muted">Send photos for a faster answer</span></span></a>
          <a href={`mailto:${site.email}`} className="card card-hover flex items-center gap-4 p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-volt-dim text-volt-3"><Mail className="h-5 w-5" /></span><span><span className="block font-display text-lg font-bold">{site.email}</span><span className="text-sm text-muted">For quotes, paperwork and aftercare</span></span></a>
          <div className="card flex items-center gap-4 p-5"><span className="grid h-12 w-12 place-items-center rounded-xl bg-volt-dim text-volt-3"><MapPin className="h-5 w-5" /></span><span><span className="block font-display text-lg font-bold">All major UK cities</span><span className="text-sm text-muted">Nationwide install teams</span></span></div>
          <div className="flex items-center gap-2 px-1 pt-2 text-sm text-muted"><Clock className="h-4 w-4 text-volt-3" />Reply within one working day</div>
        </Reveal>
        <Reveal delay={2} className="card p-6 sm:p-8 lg:p-10">
          <h2 className="font-display text-2xl font-bold">Send us a message</h2>
          <p className="mb-6 mt-1 text-sm text-muted">We&apos;ll come back with next steps and, if you want one, a free survey.</p>
          <QuoteForm compact />
        </Reveal>
      </section>
    </>
  );
}
