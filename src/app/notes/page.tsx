import type { Metadata } from "next";
import { Colophon } from "@/components/Colophon";
import { FollowRow } from "@/components/FollowRow";
import { Masthead } from "@/components/Masthead";
import { NotesGrid } from "@/components/NotesGrid";
import { SubstackForm } from "@/components/SubstackForm";
import { describeNotes, getNotes, getSeries } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes · Manraj Sidhu",
  description: "Every reel and post I've put out about building with AI, in one place. Watch them here and follow along on TikTok, Instagram, X and Substack.",
  alternates: { canonical: "https://manrajssidhu.com/notes", types: { "application/rss+xml": "https://manrajssidhu.com/feed.xml" } },
  openGraph: {
    title: "Notes · Manraj Sidhu",
    description: "Every reel and post I've put out about building with AI, in one place.",
    url: "https://manrajssidhu.com/notes",
    type: "website",
  },
};

export default function NotesPage() {
  const notes = getNotes();
  const series = getSeries();
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
            {describeNotes(notes)} on building with AI: Claude, agents, the apps I ship and what goes wrong. Watch them
            here, or follow along where they land first.
          </p>
          <FollowRow />
          <SubstackForm compact />
        </section>
        <section className="section notes-body" aria-label="All notes">
          <NotesGrid notes={notes} series={series} />
        </section>
      </main>
      <Colophon />
    </>
  );
}
