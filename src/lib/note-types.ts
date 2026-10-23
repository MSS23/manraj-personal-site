/** Shared between server and client components: no node imports here. */
export type NoteKind = "carousel" | "reel" | "motion" | "newsletter";

export const KIND_LABEL: Record<NoteKind, string> = { carousel: "Carousel", reel: "Reel", motion: "Motion reel", newsletter: "Newsletter" };

/** Reels and motion reels: video posts that play in place. */
export const isVideo = (kind: NoteKind) => kind === "reel" || kind === "motion";

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

/** Instagram shortcode from a reel or post URL. */
export function instagramId(url?: string): string | undefined {
  return url?.match(/\/(?:reel|reels|p)\/([\w-]+)/)?.[1];
}

/** The player for a video note: TikTok when it is there (plays without a login), else Instagram. */
export function reelEmbed(links: Note["links"]): { src: string; name: "TikTok" | "Instagram"; url: string } | undefined {
  const tt = tiktokId(links.tiktok);
  if (tt && links.tiktok) return { src: `https://www.tiktok.com/player/v1/${tt}?autoplay=1&muted=0`, name: "TikTok", url: links.tiktok };
  const ig = instagramId(links.instagram);
  if (ig && links.instagram) return { src: `https://www.instagram.com/p/${ig}/embed/`, name: "Instagram", url: links.instagram };
  return undefined;
}
