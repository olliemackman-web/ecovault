"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.08, ease: EASE },
  }),
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Scroll-triggered reveal wrapper. Children animate once when ~15% in view. */
export function Reveal({
  children, className, delay = 0, as = "div", amount = 0.2, ...rest
}: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "span" | "p" | "h2" | "h3"; amount?: number } & Omit<ComponentProps<typeof motion.div>, "children">) {
  const reduce = useReducedMotion();
  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={fadeUp}
      custom={delay}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Container that staggers `fadeUp` children. Use <motion.div variants={fadeUp}> inside. */
export function Stagger({ children, className, amount = 0.15 }: { children: ReactNode; className?: string; amount?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount }} variants={stagger}>
      {children}
    </motion.div>
  );
}

export const Item = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div variants={fadeUp} className={className}>{children}</motion.div>
);
