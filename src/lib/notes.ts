import fs from "node:fs";
import path from "node:path";
import type { Note } from "@/lib/note-types";

export * from "@/lib/note-types";

const DIR = path.join(process.cwd(), "content", "notes");

let cache: Note[] | null = null;

/** Every note, newest first. Read once per build from content/notes/*.json. */
export function getNotes(): Note[] {
  if (cache) return cache;
  if (!fs.existsSync(DIR)) return (cache = []);
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Note)
    .filter((n) => Object.values(n.links).some(Boolean)) // posted somewhere; drafts stay out until site.py publish adds a link
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug < b.slug ? 1 : -1));
  return cache;
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((n) => n.slug === slug);
}

export function getSeries(): string[] {
  const counts = new Map<string, number>();
  for (const n of getNotes()) if (n.series) counts.set(n.series, (counts.get(n.series) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s);
}
