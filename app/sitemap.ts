import type { MetadataRoute } from "next";
import { SITE } from "@/lib/contact";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return ["", "/magazin"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
