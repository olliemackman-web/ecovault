"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ClipboardCheck, Ruler, Wrench, HeartHandshake } from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/motion";

const steps = [
  { icon: ClipboardCheck, t: "Free assessment", d: "Tell us about your home online or by phone. We check suitability, grants and rough numbers within 24 hours.", n: "01" },
  { icon: Ruler, t: "Survey & bespoke design", d: "An engineer surveys your property and designs a system around your roof, usage and budget. Fixed-price quote, no surprises.", n: "02" },
  { icon: Wrench, t: "Certified installation", d: "Our own NICEIC & MCS engineers install — typically in 1–2 days. We handle DNO, MCS and grant paperwork.", n: "03" },
  { icon: HeartHandshake, t: "15 years of peace of mind", d: "Full handover, monitoring app, and a 15-year workmanship guarantee. We're one call away if you ever need us.", n: "04" },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <Reveal className="mb-14 max-w-2xl">
        <p className="eyebrow mb-3">How it works</p>
        <h2 className="font-display text-balance text-4xl font-bold sm:text-5xl">From first call to switched-on in four steps</h2>
      </Reveal>
      <div ref={ref} className="relative">
        <div className="absolute left-[27px] top-0 hidden h-full w-px bg-line md:block lg:left-1/2" aria-hidden>
          <motion.div style={{ height: reduce ? "100%" : h }} className="w-full bg-gradient-to-b from-volt-3 via-volt to-volt-2 shadow-[0_0_20px_rgba(30,139,255,.8)]" />
        </div>
        <Stagger className="grid gap-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
          {steps.map((s, i) => (
            <Item key={s.n} className={i % 2 ? "lg:mt-24" : ""}>
              <div className="card card-hover relative p-7 md:ml-20 lg:ml-0">
                <span className="absolute -left-[68px] top-7 hidden h-14 w-14 place-items-center rounded-full border border-volt/40 bg-bg font-mono text-sm text-volt-3 shadow-glow md:grid lg:hidden">{s.n}</span>
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-volt-dim text-volt-3"><s.icon className="h-6 w-6" /></span>
                  <span className="font-mono text-xs text-muted-2">STEP {s.n}</span>
                </div>
                <h3 className="font-display mt-5 text-2xl font-bold">{s.t}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted">{s.d}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
