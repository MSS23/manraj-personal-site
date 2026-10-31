import type { Project } from "@/data/projects";

/**
 * Worst-case projects for the dev-only /dev/break-ui?data=projects page (break-ui skill).
 * Shapes the hand-written data in projects.ts can plausibly reach. Keep it as the regression check.
 */
export const WORST_PROJECTS: Project[] = [
  {
    id: "entry-w1", folio: "14", bucket: "products",
    title: "Pokémon Champions Draft Simulator · Clerk + Supabase realtime · Vercel",
    titleHref: "https://example.com",
    tag: "Live · 1,284,000+ draft picks · 900 users · Open source · Reg MA/MB/MC",
    result: "{{draftUsers}} players drafting live; the realtime channel carried 1,284,000+ picks without a dropped pick.",
    description: "A draft room for Pokémon leagues. ".repeat(6),
    meta: [
      { label: "Link", valueHtml: '<a href="https://example.com">pokemon-draft-simulator-git-main-mss23s-projects.vercel.app/league/8f3c2a91-4b7e-4d2a-9c1f-1e2d3c4b5a69</a>' },
      { label: "How I use it in the league every single week", valueHtml: "Every week" },
    ],
    toggleOpenLabel: "See how the realtime draft room stays in sync across every player",
    lead: { src: "/assets/work/does-not-exist.webp", alt: "Draft room" },
    detail: [
      { kind: "stat-row", stats: [{ num: "1,284,000+", label: "picks" }, { num: "99.98%", label: "realtime messages delivered in under 250ms across all leagues" }, { num: "0", label: "lost" }] },
      { kind: "p", html: "See https://supabase.com/docs/guides/realtime/postgres-changes-with-row-level-security-and-a-very-long-path for the rules." },
      { kind: "figure-stack", figures: [{ src: "/assets/work/does-not-exist-2.webp", alt: "Missing shot", caption: "A caption with a long link: <a href=\"#\">supabase.com/dashboard/project/abcdefghijklmnopqrst/database/tables</a>" }] },
    ],
  },
  { id: "entry-w2", folio: "15", bucket: "brand", title: "Jo", tag: "Draft", result: "", description: "", meta: [], detail: [] },
];
