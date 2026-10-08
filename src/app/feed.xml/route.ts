import { getNotes } from "@/lib/notes";

const SITE = "https://manrajssidhu.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

/** RSS of every note: readers, and Substack's import tool, can pull from here. */
export function GET() {
  const items = getNotes()
    .map((n) => {
      const url = `${SITE}/notes/${n.slug}`;
      const html = [
        n.cover ? `<p><a href="${url}"><img src="${SITE}${n.cover}" alt="" /></a></p>` : "",
        ...n.body.map((p) => `<p>${esc(p)}</p>`),
        n.links.tiktok ? `<p><a href="${n.links.tiktok}">Watch on TikTok</a></p>` : "",
        n.links.instagram ? `<p><a href="${n.links.instagram}">See it on Instagram</a></p>` : "",
      ].join("\n");
      return `<item>
  <title>${esc(n.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(n.date + (n.date.length === 10 ? "T09:00:00Z" : "")).toUTCString()}</pubDate>
  ${n.series ? `<category>${esc(n.series)}</category>` : ""}
  <description>${esc(n.summary || n.hook || n.title)}</description>
  <content:encoded><![CDATA[${html}]]></content:encoded>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Manraj Sidhu · Notes</title>
  <link>${SITE}/notes</link>
  <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
  <description>Carousels and reels on building with AI: Claude, agents, n8n and the apps I ship.</description>
  <language>en-gb</language>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
