"use client";

import Link from "next/link";
import { MessageCircle, Phone, FileText } from "lucide-react";
import { site, whatsappHref } from "@/lib/site";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/85 p-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a href={site.phoneHref} className="btn btn-ghost !min-h-11 text-sm"><Phone className="h-4 w-4" />Call</a>
        <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-whatsapp !min-h-11 text-sm"><MessageCircle className="h-4 w-4" />WhatsApp</a>
        <Link href="/quote" className="btn btn-primary !min-h-11 text-sm"><FileText className="h-4 w-4" />Quote</Link>
      </div>
    </div>
  );
}
