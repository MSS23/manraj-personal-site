import type { Metadata } from "next";
import { Colophon } from "@/components/Colophon";
import { FollowRow } from "@/components/FollowRow";
import { Masthead } from "@/components/Masthead";
import { NotesGrid } from "@/components/NotesGrid";
import { getNotes, getSeries } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes · Manraj Sidhu",
  description: "Every carousel and reel I've posted about building with AI, in one place. Swipe the slides, watch the reels, follow along.",
  alternates: { canonical: "https://manrajssidhu.com/notes", types: { "application/rss+xml": "https://manrajssidhu.com/feed.xml" } },
  openGraph: {
    title: "Notes · Manraj Sidhu",
    description: "Every carousel and reel I've posted about building with AI, in one place.",
    url: "https://manrajssidhu.com/notes",
    type: "website",
  },
};

export default function NotesPage() {
  const notes = getNotes();
  const series = getSeries();
  const carousels = notes.filter((n) => n.kind === "carousel").length;
  const reels = notes.length - carousels;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" className="notes-page">
        <section className="section notes-head" id="notes">
          <p className="kicker">
            <span>§</span> Notes
          </p>
          <h1 className="serif-heading">
            Everything I&apos;ve posted, <em>in one place.</em>
          </h1>
          <p className="section-lede">
            {carousels} carousels and {reels} reels on building with AI: Claude, agents, n8n, the apps I ship and what
            goes wrong. Swipe the slides here, or open any of them on TikTok and Instagram.
          </p>
          <FollowRow compact />
        </section>
        <section className="section notes-body" aria-label="All notes">
          <NotesGrid notes={notes} series={series} />
        </section>
      </main>
      <Colophon />
    </>
  );
}
