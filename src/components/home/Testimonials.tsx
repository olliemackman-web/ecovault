import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { Reveal } from "@/components/motion";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="card w-[340px] shrink-0 p-6 sm:w-[400px]">
      <Quote className="absolute right-5 top-5 h-8 w-8 text-volt/25" aria-hidden />
      <div className="flex gap-0.5" aria-label={`${t.stars} out of 5 stars`}>
        {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-volt-3 text-volt-3" />)}
      </div>
      <blockquote className="mt-4 text-pretty leading-relaxed text-fg/90">&ldquo;{t.text}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 text-sm">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-volt to-volt-2 font-display text-xs font-bold text-white">{t.name.slice(0, 1)}</span>
        <span><span className="block font-semibold">{t.name}</span><span className="text-muted">{t.where} · {t.service}</span></span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rowA = [...testimonials, ...testimonials];
  const rev = [...testimonials].reverse();
  const rowB = [...rev, ...rev];
  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <Reveal className="mx-auto mb-12 max-w-7xl px-4 sm:px-6">
        <p className="eyebrow mb-3">Reviews</p>
        <h2 className="font-display text-balance text-4xl font-bold sm:text-5xl">Homeowners, hotels and farms who chose us</h2>
      </Reveal>
      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee"><ul className="marquee-track gap-4" style={{ "--marquee-duration": "60s" } as React.CSSProperties}>{rowA.map((t, i) => <li key={i} aria-hidden={i >= testimonials.length}><Card t={t} /></li>)}</ul></div>
        <div className="marquee"><ul className="marquee-track gap-4" style={{ "--marquee-duration": "75s", animationDirection: "reverse" } as React.CSSProperties}>{rowB.map((t, i) => <li key={i} aria-hidden={i >= testimonials.length}><Card t={t} /></li>)}</ul></div>
      </div>
    </section>
  );
}
