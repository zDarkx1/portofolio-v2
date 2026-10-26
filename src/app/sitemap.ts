import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/data";
import { fieldNotes } from "@/lib/field-notes";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/projects", "/articles", ...projects.map(({ slug }) => `/projects/${slug}`), ...fieldNotes.map(({ slug }) => `/articles/${slug}`)].map((path) => ({ url: `https://${profile.domain}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : .7 }));
}
