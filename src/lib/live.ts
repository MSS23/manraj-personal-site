import type { Project } from "@/data/projects";

/**
 * Live numbers for the copy. Pulled from Clerk at render time and cached an
 * hour (ISR); when a key is missing or Clerk is down we fall back to the last
 * figure we knew, so the site never shows a zero.
 *
 * Env: CLERK_SECRET_KEY_VGC (VGC Team Report), CLERK_SECRET_KEY_DRAFT (Draft Simulator).
 */
export type Live = { vgcUsers: number; vgcActive30d: number; draftUsers: number };

// Last known figures (2026-10-09; draft count from the 2026-08-26 Clerk export).
const FALLBACK: Live = { vgcUsers: 220, vgcActive30d: 29, draftUsers: 900 };
const DAY = 86_400_000;

async function clerk<T>(key: string, path: string): Promise<T> {
  const r = await fetch(`https://api.clerk.com/v1${path}`, {
    headers: { Authorization: `Bearer ${key}` },
    next: { revalidate: 3600 },
  });
  if (!r.ok) throw new Error(`clerk ${r.status}`);
  return r.json();
}

async function count(key: string) {
  return (await clerk<{ total_count: number }>(key, "/users/count")).total_count;
}

/** Users seen in the last 30 days. ponytail: pages through at most 1,000 users; sample past that. */
async function active30d(key: string) {
  const since = Date.now() - 30 * DAY;
  let n = 0;
  for (let offset = 0; offset < 1000; offset += 100) {
    const page = await clerk<{ last_active_at: number | null }[]>(key, `/users?limit=100&offset=${offset}`);
    n += page.filter((u) => (u.last_active_at ?? 0) > since).length;
    if (page.length < 100) break;
  }
  return n;
}

export async function liveStats(): Promise<Live> {
  const vgc = process.env.CLERK_SECRET_KEY_VGC;
  const draft = process.env.CLERK_SECRET_KEY_DRAFT;
  const [vgcUsers, vgcActive30d, draftUsers] = await Promise.all([
    vgc ? count(vgc).catch(() => FALLBACK.vgcUsers) : FALLBACK.vgcUsers,
    vgc ? active30d(vgc).catch(() => FALLBACK.vgcActive30d) : FALLBACK.vgcActive30d,
    draft ? count(draft).catch(() => FALLBACK.draftUsers) : FALLBACK.draftUsers,
  ]);
  return { vgcUsers, vgcActive30d, draftUsers };
}

export const fmt = (n: number) => n.toLocaleString("en-GB");

/** Replace {{vgcUsers}}-style tokens in copy. Unknown tokens are left alone. */
export function fill(text: string, live: Live) {
  return text.replace(/\{\{(\w+)\}\}/g, (m, k: string) => (k in live ? fmt(live[k as keyof Live]) : m));
}

export function withLive(p: Project, live: Live): Project {
  return {
    ...p,
    result: fill(p.result, live),
    description: fill(p.description, live),
    detail: p.detail.map((b) =>
      b.kind === "p" ? { ...b, html: fill(b.html, live) }
      : b.kind === "ul" ? { ...b, items: b.items.map((i) => fill(i, live)) }
      : b.kind === "stat-row" ? { ...b, stats: b.stats.map((s) => ({ ...s, num: fill(s.num, live) })) }
      : b,
    ),
  };
}
