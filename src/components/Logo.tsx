import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ variant = "mark", className = "" }: { variant?: "mark" | "lockup"; className?: string }) {
  if (variant === "lockup") {
    return (
      <Image src="/brand/logo-lockup.png" alt={`${site.name} logo`} width={1042} height={862} priority className={className} />
    );
  }
  return (
    <Link href="/" aria-label={`${site.name} – home`} className={`group inline-flex items-center gap-3 ${className}`}>
      <Image src="/brand/mark.png" alt="" width={734} height={550} priority className="h-9 w-auto transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105" />
      <span className="font-display text-[15px] font-bold leading-none tracking-tight">
        <span className="text-gradient">ECO VOLT</span>
        <span className="block text-[9px] font-medium tracking-[0.32em] text-muted">SOLUTIONS</span>
      </span>
    </Link>
  );
}
