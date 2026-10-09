import type { Metadata } from "next";
import Link from "next/link";
import { Colophon } from "@/components/Colophon";
import { FollowRow } from "@/components/FollowRow";
import { Masthead } from "@/components/Masthead";
import { NoteCard } from "@/components/NoteCard";
import { ProjectEntry } from "@/components/ProjectEntry";
import { bucketOrder, buckets, projects } from "@/data/projects";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Portfolio · Manraj Sidhu",
  description:
    "What I've built and what I post: AI tools and agents, the content engine behind @manrajtalks, Pokémon VGC tooling, and where to follow along on X, LinkedIn, Instagram and TikTok.",
  alternates: { canonical: "https://manrajssidhu.com/portfolio" },
  openGraph: {
    title: "Portfolio · Manraj Sidhu",
    description: "What I've built and what I post, in one place.",
    url: "https://manrajssidhu.com/portfolio",
    type: "website",
  },
};

// The short version of the story. Projects come from src/data/projects.ts, posts from content/notes (the pipeline
// publishes a note every time something goes out), so this page refreshes itself; only this list is by hand.
const TIMELINE: { when: string; html: string }[] = [
  { when: "Now", html: "<strong>AI engineer and consultant.</strong> Agents, MCP servers and automations for the work in front of me, written up plainly here and on <a href=\"https://www.linkedin.com/in/manraj-sidhu/\" target=\"_blank\" rel=\"noopener noreferrer\">LinkedIn</a>." },
  { when: "2026", html: "<strong>The content engine.</strong> A Telegram bot (Hermes) and Claude agents that edit every reel, build every carousel in every house style, schedule the posts and keep this site's Notes up to date. Built in public as <a href=\"https://www.instagram.com/manrajtalks/\" target=\"_blank\" rel=\"noopener noreferrer\">@manrajtalks</a>." },
  { when: "2026", html: "<strong>Pokémon VGC Team Report</strong> live with ~80 players, and the Manny VGC Calc MCP server behind it: 150+ tools and 1,199 passing tests." },
  { when: "2026", html: "<strong>Top 32 at the Europe International Championships</strong> (18th), competing in Pokémon VGC with the tools I built for it." },
  { when: "2023", html: "<strong>The DMC Podcast</strong> wrapped: three seasons, 127 episodes on personal development, co-hosted and edited with Joseph. Still on Spotify." },
];

export default function PortfolioPage() {
  const notes = getNotes();
  const latest = notes.slice(0, 6);
  const carousels = notes.filter((n) => n.kind === "carousel").length;
  const reels = notes.length - carousels;
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
            The projects, the content and the story in one place. I build with AI against my own work, compete in
            Pokémon VGC, and post what I learn as @manrajtalks. Follow along wherever you already are.
          </p>
          <FollowRow />
          <ul className="hero-stats folio-stats" aria-label="At a glance">
            <li>
              <span className="hero-stat-num">{projects.length}</span>
              <span className="hero-stat-label">shipped projects</span>
            </li>
            <li>
              <span className="hero-stat-num">{carousels}</span>
              <span className="hero-stat-label">carousels</span>
            </li>
            <li>
              <span className="hero-stat-num">{reels}</span>
              <span className="hero-stat-label">reels</span>
            </li>
            <li>
              <span className="hero-stat-num">127</span>
              <span className="hero-stat-label">podcast episodes</span>
            </li>
          </ul>
        </section>

        <section className="section folio-section" aria-labelledby="done">
          <p className="kicker">
            <span>§</span> What I&apos;ve done
          </p>
          <h2 className="serif-heading" id="done">
            The short <em>version.</em>
          </h2>
          <ol className="folio-timeline">
            {TIMELINE.map((t) => (
              <li key={t.when + t.html.slice(0, 20)}>
                <span className="folio-when">{t.when}</span>
                <p className="folio-what" dangerouslySetInnerHTML={{ __html: t.html }} />
              </li>
            ))}
          </ol>
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
                    <ProjectEntry key={p.id} project={p} />
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
            {carousels} carousels and {reels} reels on building with AI. Every post lands here the moment it goes out.
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
                <span>Carousels &amp; reels</span>
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
