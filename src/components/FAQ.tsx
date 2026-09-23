"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export type QA = { q: string; a: string };

export function FAQ({ items, title = "Questions, answered", eyebrow = "FAQ" }: { items: QA[]; title?: string; eyebrow?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-display text-balance text-4xl font-bold sm:text-5xl">{title}</h2>
        </Reveal>
        <Reveal className="divide-y divide-line border-y border-line">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  <span className={cn("font-display text-lg font-semibold transition", isOpen ? "text-fg" : "text-fg/85")}>{it.q}</span>
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300", isOpen ? "rotate-45 border-volt bg-volt/20 text-volt-3" : "border-line-2 text-muted")}><Plus className="h-4 w-4" /></span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="pb-6 pr-12 leading-relaxed text-muted">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

export const homeFaqs: QA[] = [
  { q: "How much does a solar or heat pump installation cost?", a: "Every job is bespoke, so we don't publish list prices — a 3-bed semi with solar and a battery is typically £8k–£14k, a heat pump £8k–£14k after the £7,500 grant. Your free survey gives you a fixed price." },
  { q: "What does the 15-year guarantee cover?", a: "Our workmanship on every install, for 15 years. Manufacturer warranties on panels (25+ years), inverters and batteries (10–12 years) sit on top of that." },
  { q: "Are you certified?", a: "Yes. We're NICEIC approved for all electrical work and MCS certified, which is required to claim Smart Export Guarantee payments and the Boiler Upgrade Scheme grant." },
  { q: "Do you cover my area?", a: "We install in all major UK cities and most areas in between. Enter your postcode in the quote form and we'll confirm straight away." },
  { q: "Are there any offers?", a: "We run a seasonal Christmas offer each year. Ask when you enquire — and if you're reading this in December, mention it." },
  { q: "How quickly can you install?", a: "Surveys are usually within a week of enquiry; installation typically 2–4 weeks after you accept the quote, depending on scaffolding and DNO approval." },
];
