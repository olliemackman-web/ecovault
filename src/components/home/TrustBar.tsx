import { Award, BadgeCheck, Building2, Home, ShieldCheck, Tractor } from "lucide-react";
import { site } from "@/lib/site";

const items = [
  { icon: BadgeCheck, label: "NICEIC Approved Contractor" },
  { icon: Award, label: "MCS Certified Installer" },
  { icon: ShieldCheck, label: `${site.guaranteeYears}-Year Workmanship Guarantee` },
  { icon: Home, label: `${site.domesticInstalls}+ Domestic Installs` },
  { icon: Building2, label: "Commercial Hotels" },
  { icon: Tractor, label: "Farms & Agricultural" },
];

export function TrustBar() {
  const list = [...items, ...items];
  return (
    <section aria-label="Accreditations" className="marquee relative overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <ul className="marquee-track gap-10" style={{ "--marquee-duration": "36s" } as React.CSSProperties}>
        {list.map((it, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-muted">
            <it.icon className="h-5 w-5 text-volt-3" />{it.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
