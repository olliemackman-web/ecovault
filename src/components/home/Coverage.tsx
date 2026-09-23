"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, Stagger, fadeUp } from "@/components/motion";

export function Coverage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="card noise relative overflow-hidden p-8 sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-volt/20 blur-[90px]" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Reveal>
            <p className="eyebrow mb-3">Coverage</p>
            <h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">Every major UK city. Nationwide teams.</h2>
            <p className="mt-4 text-pretty text-muted">From London to Glasgow, our engineers install across the country. If your city isn&apos;t listed, ask — we probably still cover it.</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-volt-3"><MapPin className="h-4 w-4" />Remote survey available everywhere</div>
          </Reveal>
          <Stagger className="flex flex-wrap gap-2">
            {site.cities.map((c) => (
              <motion.span key={c} variants={fadeUp} className="rounded-full border border-line bg-white/[.03] px-3.5 py-1.5 text-sm text-muted transition hover:border-volt/50 hover:text-fg">{c}</motion.span>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
