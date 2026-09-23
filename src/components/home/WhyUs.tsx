"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ShieldCheck, Users, Sparkles, PoundSterling } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";

function Stat({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 22 });
  const text = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => { if (inView) reduce ? mv.jump(to) : mv.set(to); }, [inView, to, mv, reduce]);
  return (
    <div>
      <motion.span ref={ref} className="font-display block text-5xl font-extrabold tabular-nums text-gradient sm:text-6xl">{text}</motion.span>
      <span className="mt-1 block text-sm text-muted">{label}</span>
    </div>
  );
}

const reasons = [
  { icon: ShieldCheck, t: `${site.guaranteeYears}-year guarantee on all works`, d: "Not 2, not 5. Fifteen years on workmanship, because we install it right the first time." },
  { icon: Users, t: "Our own certified engineers", d: "No subcontractors. The people who survey your home are the people who install." },
  { icon: Sparkles, t: "Quality over volume", d: "Tier-1 components, tidy cable runs, proper making-good. Work you'd be happy to show the neighbours." },
  { icon: PoundSterling, t: "Bespoke, fixed-price quotes", d: "Every home is different, so every quote is built from a survey — and the price you're quoted is the price you pay." },
];

export function WhyUs() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_50%,rgba(10,92,255,.15),transparent)]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-3">Why Eco Volt</p>
            <h2 className="font-display text-balance text-4xl font-bold sm:text-5xl">High-quality results with long-term guarantees</h2>
            <p className="mt-4 text-pretty text-lg text-muted">A fresh company built on {site.experienceYears} years of combined renewables experience — from commercial hotels and farms to over {site.domesticInstalls} domestic properties.</p>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <Item><Stat to={site.domesticInstalls} suffix="+" label="homes upgraded" /></Item>
            <Item><Stat to={site.guaranteeYears} suffix="yr" label="guarantee" /></Item>
            <Item><Stat to={site.experienceYears} suffix="yrs" label="combined experience" /></Item>
          </Stagger>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r) => (
            <Item key={r.t}>
              <div className="card card-hover h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-volt-dim text-volt-3"><r.icon className="h-5 w-5" /></span>
                <h3 className="font-display mt-5 text-lg font-bold leading-snug">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.d}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
