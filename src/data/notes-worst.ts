import type { Note } from "@/lib/note-types";

/**
 * Worst-case notes for the dev-only /dev/break-ui page (break-ui skill).
 * Every value is something Hermes' site.py can write: the long series is a real
 * one from content/notes, the rest are the longest or emptiest realistic shapes.
 * Keep it: it is the regression check for the note cards.
 */
const base: Pick<Note, "body" | "tags" | "slides" | "links"> = { body: [], tags: [], slides: [], links: { tiktok: "https://www.tiktok.com/@manrajtalks/video/7412345678901234567" } };

export const WORST_NOTES: Note[] = [
  {
    ...base, slug: "w1", kind: "reel", date: "2026-10-30",
    title: "I watched more of my competitors' reels than I made my own. So I got AI to review mine against theirs, frame by frame",
    series: 'Building in public (original carousel 15 had no series episode; tag kept as "BUILDING IN PUBLIC" for search)',
    episode: "112", summary: "", cover: null,
  },
  {
    ...base, slug: "w2", kind: "carousel", date: "2026-10-29", slides: ["/assets/og-image.png"],
    title: "retrievalaugmentedgeneration, explained without the jargon",
    pillar: "Building in public", summary: "Retrieval-augmented generation in one slide: look the answer up first, then let the model write it. ".repeat(4),
    cover: "/assets/og-image.png", links: { instagram: "https://www.instagram.com/p/DAbCdEfGhIj/" },
  },
  {
    ...base, slug: "w3", kind: "motion", date: "2026-10-28", title: "Jo", summary: "", series: null, pillar: null,
    cover: "/assets/work/does-not-exist.webp", links: { linkedin: "https://www.linkedin.com/posts/x" },
  },
  {
    ...base, slug: "w4", kind: "carousel", date: "2026-10-27", slides: [], cover: null,
    title: "Claude 🤖 vs ChatGPT: which one wrote my 5 hooks faster? (Ð, ñ, ü, Tiếng Việt, 日本語)",
    pillar: "AI tools", summary: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview-of-everything-in-one-very-long-path",
    links: { substack: "https://manrajtalks.substack.com/p/x" },
  },
  {
    ...base, slug: "w5", kind: "reel", date: "2026-10-26T09:25:00", title: "Hook", summary: "Short.", series: "Hermes", episode: "01",
    cover: null, tags: ["retrievalaugmentedgeneration"], keyword: "AUTOMATIONTEMPLATE",
  },
];

export const ONE_NOTE: Note[] = [WORST_NOTES[4]];
