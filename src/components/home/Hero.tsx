"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, Star, Zap } from "lucide-react";
import { site } from "@/lib/site";
import { fadeUp, stagger } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left); my.set(e.clientY - r.top);
  };

  return (
    <section ref={ref} onMouseMove={onMove} className="noise relative overflow-hidden pt-28 sm:pt-36 lg:min-h-[100svh] lg:pt-40">
      {/* backdrop */}
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-volt/20 blur-[140px]" aria-hidden />
      <div className="pointer-events-none absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-volt-2/25 blur-[120px]" aria-hidden />
      <motion.div
        aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(85,193,255,0.14), transparent 70%)` }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <motion.div style={{ y: textY, opacity: fade }} initial={reduce ? false : "hidden"} animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt-dim px-3.5 py-1.5 text-xs font-medium text-volt-3">
            <Zap className="h-3.5 w-3.5" /> NICEIC & MCS certified · {site.guaranteeYears}-year guarantee
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-balance text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            Cut your energy bills.
            <span className="text-gradient block">For good.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            Solar, battery storage, insulation and heat pumps — designed and installed by certified engineers, backed by a {site.guaranteeYears}-year guarantee. Bespoke to your home, anywhere in the UK.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn btn-primary text-base">Get my free quote <ArrowRight className="h-4 w-4" /></Link>
            <a href={site.phoneHref} className="btn btn-ghost text-base"><Phone className="h-4 w-4" />{site.phone}</a>
          </motion.div>
          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted">
            <li className="flex items-center gap-2"><Star className="h-4 w-4 fill-volt-3 text-volt-3" />{site.domesticInstalls}+ homes upgraded</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-volt-3" />Fully insured & certified</li>
            <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-volt-3" />Free survey, no obligation</li>
          </motion.ul>
        </motion.div>

        {/* logo emblem with energy rings */}
        <motion.div style={{ y: logoY }} className="relative mx-auto w-full max-w-[520px] lg:max-w-none" aria-hidden>
          <motion.div initial={reduce ? false : { opacity: 0, scale: 0.85, filter: "blur(20px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} className="relative aspect-square">
            <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full animate-spin-slow opacity-60" fill="none">
              <defs><linearGradient id="ring" x1="0" x2="1"><stop stopColor="#55c1ff" /><stop offset="1" stopColor="#0a5cff" stopOpacity="0" /></linearGradient></defs>
              <circle cx="300" cy="300" r="270" stroke="url(#ring)" strokeWidth="1.5" strokeDasharray="6 14" />
            </svg>
            <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full opacity-40" fill="none" style={{ animation: "spin-slow 28s linear infinite reverse" }}>
              <circle cx="300" cy="300" r="230" stroke="rgba(85,193,255,.5)" strokeWidth="1" strokeDasharray="2 10" />
            </svg>
            <div className="absolute inset-[18%] rounded-full bg-volt/25 blur-[70px]" />
            <div className="animate-float absolute inset-0 grid place-items-center">
              <Image src="/brand/logo-hero.png" alt="" width={900} height={745} priority className="w-[78%] drop-shadow-[0_0_60px_rgba(30,139,255,.45)]" />
            </div>
            {/* floating stat chips */}
            {[
              { t: "£0 VAT", s: "on solar & batteries", c: "left-0 top-[18%]" },
              { t: "£7,500", s: "heat pump grant", c: "right-0 top-[38%]" },
              { t: "15 yrs", s: "guarantee", c: "left-[4%] bottom-[12%]" },
            ].map((chip, i) => (
              <motion.div key={chip.t} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.15, duration: 0.7, ease: EASE }}
                className={`card absolute ${chip.c} px-4 py-2.5 backdrop-blur-md`} style={{ animation: `float ${7 + i}s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }}>
                <p className="font-display text-lg font-bold text-fg">{chip.t}</p>
                <p className="text-xs text-muted">{chip.s}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-24">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-line-2 to-transparent" />
      </div>
    </section>
  );
}
