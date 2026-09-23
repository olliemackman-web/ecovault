"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <section className="noise relative overflow-hidden pt-32 sm:pt-40">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-volt/20 blur-[130px]" aria-hidden />
      <motion.div initial={reduce ? false : "hidden"} animate="show" variants={stagger} className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.p variants={fadeUp} className="eyebrow mb-4">{eyebrow}</motion.p>
        <motion.h1 variants={fadeUp} className="font-display max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</motion.h1>
        {intro && <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">{intro}</motion.p>}
        {children && <motion.div variants={fadeUp} className="mt-8">{children}</motion.div>}
      </motion.div>
    </section>
  );
}
