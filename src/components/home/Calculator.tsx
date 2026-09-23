"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useSpring, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/* Rough but defensible UK assumptions — clearly labelled as an estimate on the page. */
const OPTIONS = [
  { key: "solar", label: "Solar PV", saving: 0.45 },
  { key: "battery", label: "Battery", saving: 0.2 },
  { key: "insulation", label: "Insulation", saving: 0.18 },
  { key: "heatpump", label: "Heat pump", saving: 0.12 },
] as const;

function Counter({ value, prefix = "£", className }: { value: number; prefix?: string; className?: string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const text = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString("en-GB")}`);
  useEffect(() => { if (reduce) mv.jump(value); else mv.set(value); }, [value, mv, reduce]);
  return <motion.span className={className}>{text}</motion.span>;
}

export function Calculator() {
  const [bill, setBill] = useState(180);
  const [picked, setPicked] = useState<string[]>(["solar", "battery"]);

  const { monthly, yearly, over15 } = useMemo(() => {
    // diminishing returns: combine multiplicatively
    const remaining = OPTIONS.filter((o) => picked.includes(o.key)).reduce((r, o) => r * (1 - o.saving), 1);
    const monthly = bill * (1 - remaining);
    return { monthly, yearly: monthly * 12, over15: monthly * 12 * 15 * 1.25 /* modest price-inflation uplift */ };
  }, [bill, picked]);

  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  return (
    <section id="calculator" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[600px] -translate-y-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(30,139,255,.14),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="card overflow-hidden lg:grid lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="p-7 sm:p-10 lg:p-12">
            <p className="eyebrow mb-3">Savings estimator</p>
            <h2 className="font-display text-balance text-3xl font-bold sm:text-4xl">See what you could save</h2>
            <p className="mt-3 text-pretty text-muted">Drag your current monthly energy bill and pick the upgrades you&apos;re considering.</p>

            <label className="mt-9 block">
              <span className="flex items-baseline justify-between text-sm font-medium"><span>Monthly energy bill</span><span className="font-display text-2xl font-bold text-gradient">£{bill}</span></span>
              <input type="range" min={60} max={600} step={10} value={bill} onChange={(e) => setBill(+e.target.value)} className="volt-range mt-1 w-full" aria-valuetext={`£${bill} per month`} />
              <span className="mt-1 flex justify-between text-xs text-muted-2"><span>£60</span><span>£600</span></span>
            </label>

            <fieldset className="mt-8">
              <legend className="text-sm font-medium">Upgrades</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {OPTIONS.map((o) => {
                  const on = picked.includes(o.key);
                  return (
                    <button key={o.key} type="button" aria-pressed={on} onClick={() => toggle(o.key)}
                      className={cn("min-h-11 rounded-full border px-4 text-sm font-medium transition-all duration-300", on ? "border-volt bg-volt/20 text-fg shadow-[0_0_0_3px_rgba(30,139,255,.15)]" : "border-line-2 text-muted hover:border-line-2 hover:text-fg")}>
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          <div className="relative border-t border-line bg-gradient-to-br from-volt/15 via-surface to-surface p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { l: "Per month", v: monthly, big: false },
                { l: "Per year", v: yearly, big: false },
                { l: `Over 15 years*`, v: over15, big: true },
              ].map((s) => (
                <div key={s.l} className={cn(s.big && "sm:col-span-3 lg:col-span-1 border-t border-line pt-6")}>
                  <p className="text-sm text-muted">{s.l}</p>
                  <Counter value={s.v} className={cn("font-display block font-extrabold tabular-nums", s.big ? "text-5xl text-gradient sm:text-6xl" : "text-3xl")} />
                </div>
              ))}
            </div>
            <Link href={`/quote?bill=${bill}&interest=${picked.join(",")}`} className="btn btn-primary mt-8 w-full sm:w-auto">Get an exact quote <ArrowRight className="h-4 w-4" /></Link>
            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-2"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />*Estimate only, based on typical UK household outcomes. Your survey gives exact figures for your roof, usage and tariff.</p>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .volt-range { -webkit-appearance: none; appearance: none; height: 44px; background: transparent; cursor: pointer; touch-action: pan-y; }
        .volt-range::-webkit-slider-runnable-track { height: 6px; border-radius: 999px; background: linear-gradient(90deg, #1e8bff ${((bill - 60) / 540) * 100}%, rgba(255,255,255,.12) 0); }
        .volt-range::-moz-range-track { height: 6px; border-radius: 999px; background: linear-gradient(90deg, #1e8bff ${((bill - 60) / 540) * 100}%, rgba(255,255,255,.12) 0); }
        .volt-range::-webkit-slider-thumb { -webkit-appearance: none; margin-top: -10px; height: 26px; width: 26px; border-radius: 50%; background: #fff; border: 4px solid #1e8bff; box-shadow: 0 0 0 6px rgba(30,139,255,.2), 0 6px 20px -4px rgba(30,139,255,.8); transition: transform .2s; }
        .volt-range::-webkit-slider-thumb:hover { transform: scale(1.1); }
        .volt-range::-moz-range-thumb { height: 26px; width: 26px; border-radius: 50%; background: #fff; border: 4px solid #1e8bff; box-shadow: 0 0 0 6px rgba(30,139,255,.2); }
      `}</style>
    </section>
  );
}
