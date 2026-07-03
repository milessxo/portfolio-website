import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; return [{ url: base, lastModified: new Date() }, ...projects.map(({ slug }) => ({ url: `${base}/projects/${slug}`, lastModified: new Date() }))]; }
