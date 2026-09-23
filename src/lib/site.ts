/**
 * Single source of truth for business details.
 * ─────────────────────────────────────────────────────────────
 * TODO(client): phone, email and WhatsApp number were not supplied
 * in the brief — replace the placeholders below before launch.
 */
export const site = {
  name: "Eco Volt Solutions",
  legalName: "ECO VOLT SOLUTIONS LTD",
  tagline: "Renewable energy, done properly.",
  description:
    "Solar PV, battery storage, insulation, heat pumps and EV charging for UK homeowners. NICEIC & MCS certified. 15-year guarantee on all works.",
  url: "https://ecovoltsolutions.co.uk",
  phone: "0800 000 0000", // TODO(client)
  phoneHref: "tel:+448000000000", // TODO(client)
  whatsapp: "447000000000", // TODO(client) – international format, no "+"
  email: "hello@ecovoltsolutions.co.uk", // TODO(client)
  hours: "Mon–Sat, 8am–7pm",
  guaranteeYears: 15,
  experienceYears: 7,
  domesticInstalls: 200,
  certifications: ["NICEIC Approved", "MCS Certified", "Fully Insured"],
  cities: [
    "London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Sheffield",
    "Bristol", "Newcastle", "Nottingham", "Leicester", "Coventry", "Bradford",
    "Cardiff", "Glasgow", "Edinburgh", "Southampton", "Portsmouth", "Reading",
    "Milton Keynes", "Oxford", "Cambridge", "Norwich", "Derby", "Stoke-on-Trent",
  ],
} as const;

export const whatsappHref = (msg = "Hi Eco Volt, I'd like a free quote.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
