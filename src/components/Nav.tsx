"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/#process", label: "How it works" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setSvcOpen(false); }, [pathname]);
  useEffect(() => { const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setSvcOpen(false), setOpen(false)); window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-2" : "py-4")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          aria-label="Main"
          className={cn(
            "flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500",
            scrolled ? "border-line bg-bg/70 shadow-[0_10px_40px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl" : "border-transparent bg-transparent"
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            <li className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
              <button
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted transition hover:text-fg"
                aria-expanded={svcOpen} aria-haspopup="true" onClick={() => setSvcOpen(true)} onKeyDown={(e) => e.key === "Escape" && setSvcOpen(false)}
              >
                Services <ChevronDown className={cn("h-4 w-4 transition", svcOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {svcOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="card w-[420px] p-2 backdrop-blur-xl">
                      {services.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-white/5">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-volt-dim text-volt-3"><s.icon className="h-5 w-5" /></span>
                          <span>
                            <span className="flex items-center gap-1 text-sm font-semibold">{s.name}<ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" /></span>
                            <span className="block text-xs leading-relaxed text-muted">{s.short}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition hover:text-fg">{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={site.phoneHref} className="btn btn-ghost !min-h-10 !px-4 text-sm"><Phone className="h-4 w-4" />{site.phone}</a>
            <Link href="/quote" className="btn btn-primary !min-h-10 !px-5 text-sm">Free quote</Link>
          </div>

          <button className="grid h-11 w-11 place-items-center rounded-xl lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }} className="mx-auto max-w-7xl px-6 py-6">
              <p className="eyebrow mb-3">Services</p>
              <ul className="mb-6 space-y-1">
                {services.map((s) => (
                  <motion.li key={s.slug} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                    <Link href={`/services/${s.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-3 text-lg font-semibold hover:bg-white/5">
                      <s.icon className="h-5 w-5 text-volt-3" />{s.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mb-8 space-y-1 border-t border-line pt-6">
                {links.map((l) => (
                  <motion.li key={l.href} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                    <Link href={l.href} className="block rounded-xl px-3 py-3 text-lg font-semibold hover:bg-white/5">{l.label}</Link>
                  </motion.li>
                ))}
              </ul>
              <div className="grid gap-3">
                <Link href="/quote" className="btn btn-primary">Get a free quote</Link>
                <a href={site.phoneHref} className="btn btn-ghost"><Phone className="h-4 w-4" />Call {site.phone}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
