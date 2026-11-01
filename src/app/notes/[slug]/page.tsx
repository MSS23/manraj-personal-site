import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Colophon } from "@/components/Colophon";
import { FollowRow } from "@/components/FollowRow";
import { Masthead } from "@/components/Masthead";
import { NoteCard } from "@/components/NoteCard";
import { SlideDeck } from "@/components/SlideDeck";
import { SubstackForm } from "@/components/SubstackForm";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import { formatDate, getNote, getNotes, isVideo, KIND_LABEL, reelEmbed } from "@/lib/notes";
import { RESOURCES_URL, stripCta } from "@/lib/note-types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  const url = `https://manrajssidhu.com/notes/${note.slug}`;
  const description = stripCta(note.summary) || note.hook || note.title;
  const image = note.cover ? `https://manrajssidhu.com${note.cover}` : "https://manrajssidhu.com/assets/og-image.png";
  return {
    title: `${note.title} · Manraj Sidhu`,
    description,
    alternates: { canonical: url },
    openGraph: { title: note.title, description, url, type: "article", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: note.title, description, images: [image] },
  };
}

const URL_RE = /(https?:\/\/[^\s)]+)/g;
const IS_URL = /^https?:\/\//;

function Para({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  return (
    <p>
      {parts.map((p, i) =>
        IS_URL.test(p) ? (
          <a key={i} href={p} target="_blank" rel="noopener noreferrer">
            {p.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </p>
  );
}

/** Guide lines (site.py): "## " headings, "- " / "1. " steps, ``` code, else a paragraph; a block of step lines becomes one list. */
function Guide({ lines }: { lines: string[] }) {
  const out: ReactNode[] = [];
  let steps: string[] = [];
  const flush = (key: string) => {
    if (steps.length) out.push(<ol key={key}>{steps.map((s, i) => <li key={i}><Para text={s} /></li>)}</ol>);
    steps = [];
  };
  lines
    .flatMap((b) => (b.startsWith("```") ? [b] : b.split("\n")))
    .forEach((raw, i) => {
      const step = raw.match(/^(?:-|\d+[.)])\s+(.*)$/);
      if (step) return void steps.push(step[1]);
      flush(`l${i}`);
      if (raw.startsWith("```")) out.push(<pre key={i}><code>{raw.replace(/^```\w*\n?/, "").replace(/\n?```$/, "")}</code></pre>);
      else if (raw.startsWith("#")) out.push(<h3 key={i}>{raw.replace(/^#+\s*/, "")}</h3>);
      else if (raw.trim()) out.push(<Para key={i} text={raw} />);
    });
  flush("end");
  return <>{out}</>;
}

const PLATFORMS: { key: "tiktok" | "instagram" | "linkedin" | "substack"; label: string }[] = [
  { key: "tiktok", label: "TikTok" },
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "substack", label: "Substack" },
];

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const notes = getNotes();
  const idx = notes.findIndex((n) => n.slug === slug);
  if (idx < 0) notFound();
  const note = notes[idx];
  const newer = notes[idx - 1];
  const older = notes[idx + 1];
  const related = notes.filter((n) => n.slug !== note.slug && n.series && n.series === note.series).slice(0, 3);
  const video = isVideo(note.kind);
  const em = video ? reelEmbed(note.links) : undefined;
  const live = PLATFORMS.filter((p) => note.links[p.key]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" className="note-page">
        <article className="container note">
          <nav className="note-crumbs" aria-label="Breadcrumb">
            <Link href="/notes">All notes</Link>
          </nav>

          <div className="note-layout">
            <div className="note-media">
              {note.kind === "carousel" && note.slides.length > 0 ? (
                <SlideDeck slides={note.slides} title={note.title} />
              ) : em ? (
                <TikTokEmbed {...em} cover={note.cover ?? undefined} title={note.title} />
              ) : note.cover ? (
                <img className="note-cover" src={note.cover} alt="" />
              ) : null}
            </div>

            <div className="note-text">
              <h1 className="note-title">{note.title}</h1>
              <p className="note-meta">
                <time dateTime={note.date}>{formatDate(note.date)}</time>
                <span>
                  {KIND_LABEL[note.kind]}
                  {note.series ? `, ${note.series}${note.episode ? ` ${note.episode}` : ""}` : ""}
                </span>
                {note.pillar && <span>{note.pillar}</span>}
                {typeof note.views === "number" && note.views > 0 && (
                  <span>{note.views.toLocaleString("en-GB")} views</span>
                )}
              </p>

              {note.hook && note.hook !== note.title && <p className="note-hook">{note.hook}</p>}

              <div className="note-body">
                {note.body
                  .map(stripCta)
                  .filter(Boolean)
                  .map((p, i) => (
                    <Para key={i} text={p} />
                  ))}
              </div>

              {note.guide && note.guide.length > 0 && (
                <section className="note-guide" id="guide" aria-labelledby="guide-title">
                  <h2 id="guide-title">How to build it</h2>
                  <Guide lines={note.guide} />
                </section>
              )}

              <aside className="note-keyword" aria-label="Resources">
                <span className="note-keyword-label">Resources</span>
                <span className="note-keyword-desc">
                  {note.guideUrl
                    ? "This guide is a standalone Notion page you can send to anyone. The prompts, blueprints, checklists and setups behind every video are in the library."
                    : note.guide?.length
                      ? "The build steps are above. The prompts, blueprints, checklists and setups behind every video live in my Notion library."
                      : "The prompts, blueprints, checklists and setups behind every video live in my Notion library."}
                </span>
                <span className="note-keyword-actions">
                  <a className="btn" href={note.guideUrl ?? RESOURCES_URL} target="_blank" rel="noopener noreferrer">
                    {note.guideUrl ? "Open this guide in Notion" : "Open the resource library"}
                  </a>
                  {note.guideUrl ? (
                    <a className="btn btn-quiet" href={RESOURCES_URL} target="_blank" rel="noopener noreferrer">
                      All resources
                    </a>
                  ) : note.guide && note.guide.length > 0 ? (
                    <a className="btn btn-quiet" href="#guide">
                      How to build it
                    </a>
                  ) : null}
                </span>
              </aside>

              {live.length > 0 && (
                <div className="note-platforms">
                  {live.map((p) => (
                    <a key={p.key} className={`btn ${p.key === live[0].key ? "" : "btn-quiet"}`} href={note.links[p.key]} target="_blank" rel="noopener noreferrer">
                      {video ? "Watch" : note.kind === "newsletter" ? "Read it" : "See it"} on {p.label}
                    </a>
                  ))}
                </div>
              )}

              {note.tags.length > 0 && (
                <ul className="note-tags" aria-label="Tags">
                  {note.tags.map((t) => (
                    <li key={t}>#{t}</li>
                  ))}
                </ul>
              )}

              <div className="note-follow">
                <p className="note-follow-label">Follow for the next one</p>
                <FollowRow compact />
                <SubstackForm />
              </div>
            </div>
          </div>

          <nav className="note-pager" aria-label="More notes">
            {older ? (
              <Link href={`/notes/${older.slug}`} className="note-pager-link">
                <span>Older</span>
                <strong>{older.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`/notes/${newer.slug}`} className="note-pager-link is-next">
                <span>Newer</span>
                <strong>{newer.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          {related.length > 0 && (
            <section className="note-related" aria-label={`More from ${note.series}`}>
              <h2>More from {note.series}</h2>
              <div className="notes-grid">
                {related.map((n) => (
                  <NoteCard key={n.slug} note={n} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Colophon />
    </>
  );
}
