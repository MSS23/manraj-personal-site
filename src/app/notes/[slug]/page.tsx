import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Colophon } from "@/components/Colophon";
import { FollowRow } from "@/components/FollowRow";
import { Masthead } from "@/components/Masthead";
import { NoteCard } from "@/components/NoteCard";
import { SlideDeck } from "@/components/SlideDeck";
import { TikTokEmbed } from "@/components/TikTokEmbed";
import { formatDate, getNote, getNotes, KIND_LABEL, tiktokId } from "@/lib/notes";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  const url = `https://manrajssidhu.com/notes/${note.slug}`;
  const description = note.summary || note.hook || note.title;
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
  const tt = tiktokId(note.links.tiktok);
  const live = PLATFORMS.filter((p) => note.links[p.key]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" className="note-page">
        <article className="section note">
          <nav className="note-crumbs" aria-label="Breadcrumb">
            <Link href="/notes">← All notes</Link>
          </nav>

          <div className="note-layout">
            <div className="note-media">
              {note.kind === "carousel" && note.slides.length > 0 ? (
                <SlideDeck slides={note.slides} title={note.title} />
              ) : tt && note.links.tiktok ? (
                <TikTokEmbed id={tt} cover={note.cover ?? undefined} title={note.title} url={note.links.tiktok} />
              ) : note.cover ? (
                <img className="note-cover" src={note.cover} alt="" />
              ) : null}
            </div>

            <div className="note-text">
              <p className="kicker">
                <span>§</span> {KIND_LABEL[note.kind]}
                {note.series ? ` · ${note.series}${note.episode ? ` ${note.episode}` : ""}` : ""}
              </p>
              <h1 className="serif-heading note-title">{note.title}</h1>
              <p className="note-meta">
                <time dateTime={note.date}>{formatDate(note.date)}</time>
                {note.pillar && <span>· {note.pillar}</span>}
                {typeof note.views === "number" && note.views > 0 && (
                  <span>· {note.views.toLocaleString("en-GB")} views</span>
                )}
              </p>

              {note.hook && note.hook !== note.title && <p className="note-hook">{note.hook}</p>}

              <div className="note-body">
                {note.body.map((p, i) => (
                  <Para key={i} text={p} />
                ))}
              </div>

              {note.keyword && (
                <aside className="note-keyword" aria-label="Comment keyword">
                  <span className="note-keyword-label">Want the full version?</span>
                  <span className="note-keyword-word">{note.keyword}</span>
                  <span className="note-keyword-desc">
                    {`Comment it on the ${live[0]?.label ?? "Instagram"} post and I'll DM it to you.`}
                  </span>
                </aside>
              )}

              {live.length > 0 && (
                <div className="note-platforms">
                  {live.map((p) => (
                    <a key={p.key} className={`btn ${p.key === live[0].key ? "" : "btn-quiet"}`} href={note.links[p.key]} target="_blank" rel="noopener noreferrer">
                      {note.kind === "reel" ? "Watch" : note.kind === "newsletter" ? "Read it" : "See it"} on {p.label} ↗
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
              </div>
            </div>
          </div>

          <nav className="note-pager" aria-label="More notes">
            {older ? (
              <Link href={`/notes/${older.slug}`} className="note-pager-link">
                <span>← Older</span>
                <strong>{older.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`/notes/${newer.slug}`} className="note-pager-link is-next">
                <span>Newer →</span>
                <strong>{newer.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          {related.length > 0 && (
            <section className="note-related" aria-label={`More from ${note.series}`}>
              <p className="kicker">
                <span>§</span> More from {note.series}
              </p>
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
