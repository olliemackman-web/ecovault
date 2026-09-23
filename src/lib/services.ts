import type { LucideIcon } from "lucide-react";
import { Sun, BatteryCharging, Home, Thermometer, PlugZap } from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  icon: LucideIcon;
  stat: { value: string; label: string };
  benefits: string[];
  includes: string[];
  faqs: { q: string; a: string }[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "solar-panels",
    name: "Solar PV",
    short: "Generate your own electricity and slash your bills from day one.",
    headline: "Turn your roof into a power station.",
    intro:
      "High-efficiency solar PV systems designed around your roof, your usage and your budget. We handle survey, design, DNO paperwork, installation and MCS certification — so you can claim Smart Export Guarantee payments for the electricity you don't use.",
    icon: Sun,
    stat: { value: "70%", label: "typical bill reduction with solar + battery" },
    benefits: [
      "Cut electricity bills by up to 70%",
      "Earn from exported energy (SEG)",
      "0% VAT on domestic solar installs",
      "Increase your property's value & EPC rating",
    ],
    includes: [
      "Free remote + on-site survey",
      "Bespoke system design & yield forecast",
      "Tier-1 panels, hybrid inverter, monitoring app",
      "MCS certificate, DNO notification, handover pack",
    ],
    faqs: [
      { q: "Does solar work in the UK?", a: "Yes. A typical 4kW south-facing system in the UK generates 3,400–4,000 kWh a year — roughly the annual usage of an average household." },
      { q: "Do I need planning permission?", a: "Almost never. Roof-mounted solar is permitted development for most homes. Listed buildings and conservation areas are the exception — we'll check for you." },
      { q: "How long does installation take?", a: "Most domestic systems are installed in one to two days. Scaffolding goes up the day before." },
    ],
    featured: true,
  },
  {
    slug: "battery-storage",
    name: "Battery Storage",
    short: "Store cheap or solar energy and use it when you need it.",
    headline: "Use your own power, day and night.",
    intro:
      "Home batteries let you bank solar energy for the evening, or charge on cheap overnight tariffs and run the house on stored power during peak hours. We install and configure leading battery systems, with or without solar.",
    icon: BatteryCharging,
    stat: { value: "3×", label: "more self-consumed solar with storage" },
    benefits: [
      "Run your home on stored power at peak rates",
      "Backup during power cuts (EPS option)",
      "Works with new or existing solar",
      "Smart-tariff ready (Octopus, EDF, etc.)",
    ],
    includes: [
      "Load assessment & sizing",
      "Battery, inverter & consumer-unit works",
      "App setup and tariff scheduling",
      "NICEIC certification",
    ],
    faqs: [
      { q: "What size battery do I need?", a: "Most homes land between 5 and 13.5 kWh. We size from your actual usage, not a guess." },
      { q: "Can I add a battery to my existing solar?", a: "Yes — AC-coupled batteries retrofit to almost any existing solar system." },
    ],
    featured: true,
  },
  {
    slug: "insulation",
    name: "Insulation",
    short: "Stop paying to heat the outside. Loft, cavity and internal wall.",
    headline: "Keep the heat you've already paid for.",
    intro:
      "Poor insulation is the number-one reason UK homes cost so much to heat. We survey the whole building fabric and fix the weak points — loft, cavity walls, floors and internal walls — with materials and workmanship guaranteed for 15 years.",
    icon: Home,
    stat: { value: "25%", label: "of heat is lost through an uninsulated roof" },
    benefits: [
      "Lower heating bills immediately",
      "Warmer, draught-free rooms",
      "Better EPC rating for sale or letting",
      "Reduces condensation and damp risk",
    ],
    includes: [
      "Whole-house fabric survey",
      "Loft, cavity wall & floor insulation",
      "Internal wall insulation (solid walls)",
      "Ventilation check & guarantee certificate",
    ],
    faqs: [
      { q: "Can insulation cause damp?", a: "Not when done correctly. We always assess ventilation and moisture first — that's the difference between a quality install and a cheap one." },
    ],
  },
  {
    slug: "heat-pumps",
    name: "Air Source Heat Pumps",
    short: "Efficient, low-carbon heating with up to £7,500 government grant.",
    headline: "Heating that's 300% efficient.",
    intro:
      "An air source heat pump delivers three to four units of heat for every unit of electricity it uses. Combined with the £7,500 Boiler Upgrade Scheme grant, it's now one of the smartest upgrades a UK home can make — and we're MCS certified to install it.",
    icon: Thermometer,
    stat: { value: "£7,500", label: "Boiler Upgrade Scheme grant available" },
    benefits: [
      "£7,500 BUS grant handled by us",
      "Up to 4× more efficient than a gas boiler",
      "Heating and hot water from one system",
      "Future-proof against gas price spikes",
    ],
    includes: [
      "Heat-loss calculation for every room",
      "Radiator / emitter upgrades where needed",
      "Heat pump, cylinder & controls",
      "MCS certificate & BUS grant application",
    ],
    faqs: [
      { q: "Will a heat pump work in an older house?", a: "Usually yes, with the right sizing and sometimes a few larger radiators. Our room-by-room heat-loss survey tells you exactly what's needed before you commit." },
    ],
  },
  {
    slug: "ev-chargers",
    name: "EV Chargers",
    short: "Fast, smart home charging installed by NICEIC electricians.",
    headline: "Charge at home for pennies.",
    intro:
      "A 7kW smart charger fills most EVs overnight on an off-peak tariff for a fraction of public charging costs. We install all major brands, integrate with solar where you have it, and certify everything under NICEIC.",
    icon: PlugZap,
    stat: { value: "~2p", label: "per mile on an overnight EV tariff" },
    benefits: [
      "Full charge overnight, every night",
      "Solar-aware charging modes",
      "Scheduling via app for cheapest rates",
      "Tethered or untethered options",
    ],
    includes: [
      "Supply & earthing assessment",
      "Charger, cabling & protection",
      "App setup & tariff scheduling",
      "NICEIC certificate & DNO notification",
    ],
    faqs: [
      { q: "Can I get a grant?", a: "The OZEV grant is available for flats and rental properties. We'll tell you if you qualify." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
