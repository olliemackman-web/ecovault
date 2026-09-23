# Eco Volt Solutions — website

Lead-gen site for **ECO VOLT SOLUTIONS LTD** (solar PV, battery storage, insulation, heat pumps, EV chargers · all major UK cities).

Next.js 15 · React 19 · Tailwind v4 · Framer Motion · Lucide.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3210
```

## Before launch — fill these in
| What | Where |
|---|---|
| Phone, WhatsApp, email | `src/lib/site.ts` (marked `TODO(client)`) |
| Real customer reviews | `src/lib/testimonials.ts` (currently sample copy) |
| Live domain | `site.url` in `src/lib/site.ts` |
| Where enquiries go | Env vars — see `.env.example` (Resend email and/or webhook) |

## Pages
`/` home · `/services/{solar-panels,battery-storage,insulation,heat-pumps,ev-chargers}` · `/about` · `/contact` · `/quote` (3-step wizard) · `/api/enquiry` (POST)

## Deploy
Push to `main` → import into Vercel → add the env vars from `.env.example`. Nothing else to configure.
