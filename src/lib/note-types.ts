/** Shared between server and client components: no node imports here. */
export type NoteKind = "carousel" | "reel" | "newsletter";

export const KIND_LABEL: Record<NoteKind, string> = { carousel: "Carousel", reel: "Reel", newsletter: "Newsletter" };

export type Note = {
  slug: string;
  title: string;
  kind: NoteKind;
  date: string; // ISO date
  series?: string | null;
  episode?: string | null;
  pillar?: string | null;
  hook?: string | null;
  keyword?: string | null;
  summary: string;
  body: string[];
  tags: string[];
  links: { tiktok?: string; instagram?: string; substack?: string; linkedin?: string };
  slides: string[];
  cover?: string | null;
  views?: number | null;
  style?: string;
};

/** "33 reels and 2 carousels": kinds with a count, biggest first. */
export function describeNotes(notes: Pick<Note, "kind">[]): string {
  const counts = new Map<NoteKind, number>();
  for (const n of notes) counts.set(n.kind, (counts.get(n.kind) ?? 0) + 1);
  const parts = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([k, c]) => `${c} ${KIND_LABEL[k].toLowerCase()}${c === 1 ? "" : "s"}`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : (parts[0] ?? "");
}

export function formatDate(iso: string): string {
  return new Date(iso + (iso.length === 10 ? "T12:00:00Z" : "")).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** TikTok video id from a post URL, for the embed player. */
export function tiktokId(url?: string): string | undefined {
  return url?.match(/\/video\/(\d+)/)?.[1];
}
