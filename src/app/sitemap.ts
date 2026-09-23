import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/quote`, lastModified: now, priority: 0.9 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${site.url}/about`, lastModified: now, priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, priority: 0.7 },
  ];
}
