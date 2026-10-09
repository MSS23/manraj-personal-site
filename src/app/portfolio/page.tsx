import type { Metadata } from "next";
import Link from "next/link";
import { Colophon } from "@/components/Colophon";
import { FollowRow } from "@/components/FollowRow";
import { Masthead } from "@/components/Masthead";
import { NoteCard } from "@/components/NoteCard";
import { ProjectEntry } from "@/components/ProjectEntry";
import { bucketOrder, buckets, projects } from "@/data/projects";
import { describeNotes, getNotes } from "@/lib/notes";
import { liveStats, withLive } from "@/lib/live";

export const metadata: Metadata = {
  title: "Portfolio · Manraj Sidhu",
  description:
    "The projects and the posts in one place, and where to follow along on X, LinkedIn, Instagram and TikTok.",
  alternates: { canonical: "https://manrajssidhu.com/portfolio" },
  openGraph: {
    title: "Portfolio · Manraj Sidhu",
    description: "What I've built and what I post, in one place.",
    url: "https://manrajssidhu.com/portfolio",
    type: "website",
  },
};

export default async function PortfolioPage() {
  const live = await liveStats();
  const notes = getNotes();
  const latest = notes.slice(0, 6);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" className="notes-page">
        <section className="section notes-head" id="portfolio">
          <p className="kicker">
            <span>§</span> Portfolio
          </p>
          <h1 className="serif-heading">
            What I&apos;ve built, <em>and what I post.</em>
          </h1>
          <p className="section-lede">
            The projects and the posts in one place, and where to follow along.
          </p>
          <FollowRow />
        </section>

        <section className="section folio-section" id="projects" aria-labelledby="projects-h">
          <p className="kicker">
            <span>§</span> Projects
          </p>
          <h2 className="serif-heading" id="projects-h">
            Things I&apos;ve <em>built.</em>
          </h2>
          {bucketOrder.map((bucketId) => {
            const bucket = buckets[bucketId];
            const items = projects.filter((p) => p.bucket === bucketId);
            return (
              <div key={bucketId} className="work-bucket">
                <header className="work-bucket-head">
                  <div className="work-bucket-row">
                    <p className="work-bucket-index" aria-hidden="true">{bucket.index}</p>
                    <h3 className="work-bucket-kicker">{bucket.title}</h3>
                    <p className="work-bucket-count" aria-hidden="true">{bucket.count}</p>
                  </div>
                </header>
                <ol className="works">
                  {items.map((p) => (
                    <ProjectEntry key={p.id} project={withLive(p, live)} />
                  ))}
                </ol>
              </div>
            );
          })}
        </section>

        <section className="section folio-section" id="content" aria-labelledby="content-h">
          <p className="kicker">
            <span>§</span> Content
          </p>
          <h2 className="serif-heading" id="content-h">
            The latest <em>posts.</em>
          </h2>
          <p className="section-lede">
            {describeNotes(notes)}. Every post lands here the moment it goes out.
          </p>
          <div className="notes-grid">
            {latest.map((n) => (
              <NoteCard key={n.slug} note={n} />
            ))}
          </div>
          <p className="notes-all">
            <Link href="/notes" className="btn">
              All {notes.length} notes →
            </Link>
          </p>
        </section>

        <section className="section folio-section" id="elsewhere" aria-labelledby="elsewhere-h">
          <p className="kicker">
            <span>§</span> Where to find me
          </p>
          <h2 className="serif-heading" id="elsewhere-h">
            Same work, <em>different rooms.</em>
          </h2>
          <div className="links">
            <a className="link-card" href="https://x.com/manrajtalks" target="_blank" rel="noopener noreferrer">
              <div className="link-card-row">
                <span>Threads &amp; takes</span>
                <span className="link-card-arrow" aria-hidden="true">→</span>
              </div>
              <h3 className="link-card-title">X</h3>
              <p className="link-card-desc">Build notes as they happen, and my take on what other builders post.</p>
              <p className="link-card-cta">Follow on X</p>
            </a>
            <a className="link-card" href="https://www.linkedin.com/in/manraj-sidhu/" target="_blank" rel="noopener noreferrer">
              <div className="link-card-row">
                <span>Professional</span>
                <span className="link-card-arrow" aria-hidden="true">→</span>
              </div>
              <h3 className="link-card-title">LinkedIn</h3>
              <p className="link-card-desc">The longer write-ups of each build, and where to reach me for work.</p>
              <p className="link-card-cta">Connect on LinkedIn</p>
            </a>
            <a className="link-card" href="https://www.instagram.com/manrajtalks/" target="_blank" rel="noopener noreferrer">
              <div className="link-card-row">
                <span>Reels &amp; posts</span>
                <span className="link-card-arrow" aria-hidden="true">→</span>
              </div>
              <h3 className="link-card-title">Instagram</h3>
              <p className="link-card-desc">Every carousel and reel, posted daily by the engine.</p>
              <p className="link-card-cta">Follow on Instagram</p>
            </a>
            <a className="link-card" href="https://www.tiktok.com/@manrajtalks" target="_blank" rel="noopener noreferrer">
              <div className="link-card-row">
                <span>Short-form</span>
                <span className="link-card-arrow" aria-hidden="true">→</span>
              </div>
              <h3 className="link-card-title">TikTok</h3>
              <p className="link-card-desc">The same reels, plus the occasional life advice.</p>
              <p className="link-card-cta">Watch on TikTok</p>
            </a>
          </div>
        </section>
      </main>
      <Colophon />
    </>
  );
}
