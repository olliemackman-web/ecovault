import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line pb-28 lg:pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image src="/brand/logo-lockup.png" alt={site.legalName} width={220} height={182} className="h-auto w-44" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.certifications.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted"><ShieldCheck className="h-3.5 w-3.5 text-volt-3" />{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Services</h3>
            <ul className="space-y-1 text-sm">
              {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="inline-block py-1 text-muted transition hover:text-fg">{s.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Company</h3>
            <ul className="space-y-1 text-sm">
              {[["/about", "About us"], ["/#process", "How it works"], ["/#reviews", "Reviews"], ["/quote", "Free quote"], ["/contact", "Contact"]].map(([h, l]) => (
                <li key={h}><Link href={h} className="inline-block py-1 text-muted transition hover:text-fg">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Get in touch</h3>
            <ul className="space-y-3 text-sm">
              <li><a href={site.phoneHref} className="flex min-h-11 items-center gap-2.5 text-muted transition hover:text-fg"><Phone className="h-4 w-4 text-volt-3" />{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-2.5 text-muted transition hover:text-fg"><Mail className="h-4 w-4 text-volt-3" />{site.email}</a></li>
              <li className="flex items-start gap-2.5 text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-volt-3" />Covering all major UK cities</li>
            </ul>
            <p className="mt-4 text-xs text-muted-2">{site.hours}</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>{site.guaranteeYears}-year guarantee on all works · NICEIC · MCS</p>
        </div>
      </div>
    </footer>
  );
}
