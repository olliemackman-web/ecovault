"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { Reveal, Stagger, fadeUp } from "@/components/motion";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <Reveal className="mb-12 max-w-2xl">
        <p className="eyebrow mb-3">What we do</p>
        <h2 className="font-display text-balance text-4xl font-bold sm:text-5xl">One team for the whole home energy upgrade</h2>
        <p className="mt-4 text-pretty text-lg text-muted">Every job is bespoke. We survey, design, install and certify — no subcontractors, no hand-offs.</p>
      </Reveal>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {services.map((s, i) => {
          const big = i < 2;
          return (
            <motion.div key={s.slug} variants={fadeUp} className={cn(big ? "lg:col-span-3" : "lg:col-span-2")}>
              <Link href={`/services/${s.slug}`} className={cn("card card-hover group flex h-full flex-col overflow-hidden p-6 sm:p-7", big && "lg:p-9")}>
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-volt/15 blur-[70px] opacity-0 transition duration-700 group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-volt/25 bg-volt-dim text-volt-3 transition duration-500 group-hover:scale-110 group-hover:bg-volt/25"><s.icon className="h-6 w-6" /></span>
                  <ArrowUpRight className="h-5 w-5 text-muted-2 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt-3" />
                </div>
                <h3 className={cn("font-display mt-6 font-bold", big ? "text-2xl sm:text-3xl" : "text-xl")}>{s.name}</h3>
                <p className="mt-2 text-pretty text-muted">{s.short}</p>
                <div className="mt-auto pt-8">
                  <p className={cn("font-display font-extrabold text-gradient", big ? "text-4xl sm:text-5xl" : "text-3xl")}>{s.stat.value}</p>
                  <p className="mt-1 text-xs text-muted">{s.stat.label}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Link href="/quote" className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-volt to-volt-2 p-7 text-white shadow-glow">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl transition duration-700 group-hover:scale-150" />
            <p className="font-display text-2xl font-bold leading-tight">Not sure what you need?</p>
            <p className="mt-2 text-sm text-white/85">Tell us about your home — we&apos;ll recommend the right combination and price it up, free.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold">Start free assessment <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
          </Link>
        </motion.div>
      </Stagger>
    </section>
  );
}
