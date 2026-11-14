import { getAllNotes } from "@/lib/notes";
import { siteName, siteUrl } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed of published notes, prerendered at build time. */
export async function GET() {
  const notes = (await getAllNotes()).filter(
    (note) => note.status === "published",
  );

  const items = notes
    .map((note) => {
      const url = `${siteUrl}/notes/${note.slug}`;
      return `    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(note.description)}</description>
      <category>${escapeXml(note.category)}</category>
      <pubDate>${new Date(`${note.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`Notes · ${siteName}`)}</title>
    <link>${siteUrl}/notes</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>A personal technical notebook by ${escapeXml(siteName)}.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
