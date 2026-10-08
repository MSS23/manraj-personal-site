import Link from "next/link";
import { formatDate, type Note } from "@/lib/note-types";

export function NoteCard({ note }: { note: Note }) {
  const label = note.kind === "carousel" ? `${note.slides.length} slides` : "Reel";
  return (
    <Link href={`/notes/${note.slug}`} className={`note-card note-card-${note.kind}`}>
      <div className="note-card-media">
        {note.cover ? (
          <img src={note.cover} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="note-card-blank" aria-hidden="true">
            <span>M</span>
          </div>
        )}
        <span className="note-card-badge">
          {note.kind === "reel" && (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 1.5v7l6-3.5z" fill="currentColor" />
            </svg>
          )}
          {label}
        </span>
      </div>
      <div className="note-card-body">
        <p className="note-card-meta">
          {note.series ? (
            <span className="note-card-series">
              {note.series}
              {note.episode ? ` · ${note.episode}` : ""}
            </span>
          ) : (
            <span className="note-card-series">{note.pillar ?? "Note"}</span>
          )}
          <time dateTime={note.date}>{formatDate(note.date)}</time>
        </p>
        <h3 className="note-card-title">{note.title}</h3>
        {note.summary && <p className="note-card-summary">{note.summary}</p>}
      </div>
    </Link>
  );
}
