import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    { url: `${site.url}/sluzby/`, priority: 0.8 },
    { url: `${site.url}/kontakt/`, priority: 0.8 },
  ];
}
