/** Shared between server and client components: no node imports here. */
export type NoteKind = "carousel" | "reel";

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
