import type { MetadataRoute } from "next";
import { getNotes } from "@/lib/notes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getNotes();
  return [
    { url: "https://manrajssidhu.com", lastModified: new Date(), priority: 1 },
    { url: "https://manrajssidhu.com/notes", lastModified: notes[0] ? new Date(notes[0].date) : new Date(), priority: 0.9 },
    { url: "https://manrajssidhu.com/portfolio", lastModified: notes[0] ? new Date(notes[0].date) : new Date(), priority: 0.9 },
    ...notes.map((n) => ({ url: `https://manrajssidhu.com/notes/${n.slug}`, lastModified: new Date(n.date), priority: 0.7 })),
  ];
}
