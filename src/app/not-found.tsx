import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="That page has gone off-grid." intro="The link might be old, or the page moved. Head back home or get a free quote.">
      <div className="flex gap-3 pb-24"><Link href="/" className="btn btn-ghost">Home</Link><Link href="/quote" className="btn btn-primary">Free quote</Link></div>
    </PageHero>
  );
}
