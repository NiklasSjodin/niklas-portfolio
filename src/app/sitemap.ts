import type { MetadataRoute } from "next";
import { navItems } from "@/lib/navigation";
import { getAllNotes } from "@/lib/notes";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = navItems.map((item) => ({
    url: item.href === "/" ? siteUrl : `${siteUrl}${item.href}`,
  }));

  // Starter drafts are marked noindex, so they stay out of the sitemap too.
  const notes = (await getAllNotes())
    .filter((note) => note.status === "published")
    .map((note) => ({
      url: `${siteUrl}/notes/${note.slug}`,
      lastModified: new Date(`${note.date}T00:00:00Z`),
    }));

  return [...pages, ...notes];
}
