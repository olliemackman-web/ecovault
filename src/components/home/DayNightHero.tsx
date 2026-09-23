"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./day-night-hero.css";
import { site } from "@/lib/site";

const LIGHT_IMG = "/images/hero-light.webp";
const DARK_IMG = "/images/hero-dark.webp";

const NAV_LINKS: [string, string][] = [
  ["/#services", "Services"],
  ["/#process", "How It Works"],
  ["/#reviews", "Reviews"],
  ["/about", "About Us"],
  ["/contact", "Contact"],
];

export function DayNightHero() {
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const bgBackRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  // Theme + both bg layers start on the night image.
  useEffect(() => {
    if (bgFrontRef.current) bgFrontRef.current.style.backgroundImage = `url(${DARK_IMG})`;
    if (bgBackRef.current) bgBackRef.current.style.backgroundImage = `url(${DARK_IMG})`;
  }, []);

  const toggleTheme = (toDark: boolean) => {
    if (toDark === isDark || animatingRef.current) return;
    animatingRef.current = true;
    const target = toDark ? DARK_IMG : LIGHT_IMG;
    if (bgBackRef.current) bgBackRef.current.style.backgroundImage = `url(${target})`;
    bgFrontRef.current?.classList.add("pull-down");
    setTimeout(() => {
      setIsDark(toDark);
      if (bgFrontRef.current) bgFrontRef.current.style.backgroundImage = `url(${target})`;
      setTimeout(() => {
        bgFrontRef.current?.classList.remove("pull-down");
        animatingRef.current = false;
      }, 30);
    }, 300);
  };

  return (
    <div className={`rh hero${isDark ? "" : " light-theme"}`}>
      <div className="blur-overlay blur-overlay-top" />
      <div className="blur-overlay blur-overlay-bottom" />
      <div className="hero-bg-wrapper">
        <div ref={bgBackRef} className="hero-bg bg-back" />
        <div ref={bgFrontRef} className="hero-bg bg-front" />
      </div>

      <nav className="navbar" aria-label="Primary">
        <Link href="/" className="logo-container" aria-label={`${site.name} – home`}>
          <Image src="/brand/mark.png" alt="" width={734} height={550} priority className="logo" />
          <span className="brand-name">eco volt</span>
        </Link>
        <div className={`nav-links${menuOpen ? " active" : ""}`}>
          {NAV_LINKS.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <Link href="/quote" className="cta-button drawer-cta">Get a Free Quote</Link>
        </div>
        <Link href="/quote" className="cta-button nav-cta">Get a Free Quote</Link>
        <button
          type="button"
          className={`hamburger${menuOpen ? " active" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className="hero-content">
        <h1 className="hero-title">
          Lower Electricity Bills
          <br />
          <span className="title-accent">for the next</span> {site.guaranteeYears} years
        </h1>
        <div className="theme-toggle" role="group" aria-label="Day or night view">
          <div className="toggle-indicator" style={{ transform: isDark ? "translateX(calc(100% + 4px))" : "translateX(0)" }} />
          <button type="button" className={`toggle-btn${!isDark ? " active" : ""}`} aria-pressed={!isDark} onClick={() => toggleTheme(false)}>
            <span className="label">Morning</span>
            <span className="subtext">Solar powers your home</span>
          </button>
          <button type="button" className={`toggle-btn${isDark ? " active" : ""}`} aria-pressed={isDark} onClick={() => toggleTheme(true)}>
            <span className="label">Night</span>
            <span className="subtext">Battery powers your home</span>
          </button>
        </div>
        <p className="hero-footer">
          Forget the energy market, weather conditions and seasons. Our solar and battery systems are designed around your home,
          installed by NICEIC &amp; MCS certified engineers and backed by a {site.guaranteeYears}-year guarantee.
        </p>
      </div>
    </div>
  );
}
