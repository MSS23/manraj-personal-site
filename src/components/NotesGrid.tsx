"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { NoteCard } from "@/components/NoteCard";
import type { Note, NoteKind } from "@/lib/note-types";

type Filter = "all" | NoteKind;

export function NotesGrid({ notes, series }: { notes: Note[]; series: string[] }) {
  const [kind, setKind] = useState<Filter>("all");
  const [show, setShow] = useState<string>("");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim().toLowerCase());

  const counts = useMemo(
    () => ({
      all: notes.length,
      carousel: notes.filter((n) => n.kind === "carousel").length,
      reel: notes.filter((n) => n.kind === "reel").length,
      newsletter: notes.filter((n) => n.kind === "newsletter").length,
    }),
    [notes],
  );

  const shown = useMemo(
    () =>
      notes.filter((n) => {
        if (kind !== "all" && n.kind !== kind) return false;
        if (show && n.series !== show) return false;
        if (!q) return true;
        const hay = [n.title, n.hook, n.summary, n.series, n.pillar, n.keyword, ...n.tags, ...n.body]
          .join(" ")
          .toLowerCase();
        return q.split(/\s+/).every((w) => hay.includes(w));
      }),
    [notes, kind, show, q],
  );

  const chips: { id: Filter; label: string }[] = (
    [
      { id: "all", label: "All" },
      { id: "carousel", label: "Carousels" },
      { id: "reel", label: "Reels" },
      { id: "newsletter", label: "Newsletters" },
    ] as const
  ).filter((c) => counts[c.id] > 0);
  const oneKind = chips.length <= 2; // "All" + one kind says nothing: hide the chips

  return (
    <>
      <div className="notes-toolbar" role="group" aria-label="Filter notes">
        {!oneKind && (
          <div className="notes-chips">
            {chips.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`notes-chip ${kind === c.id ? "is-on" : ""}`}
                aria-pressed={kind === c.id}
                onClick={() => setKind(c.id)}
              >
                {c.label} <span className="notes-chip-count">{counts[c.id]}</span>
              </button>
            ))}
          </div>
        )}
        {series.length > 0 && (
          <label className="notes-select">
            <span className="sr-only">Series</span>
            <select value={show} onChange={(e) => setShow(e.target.value)}>
              <option value="">All series</option>
              {series.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="notes-search">
          <span className="sr-only">Search notes</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search: claude, n8n, agents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <p className="notes-count" aria-live="polite">
        {shown.length === notes.length ? `${notes.length} notes` : `${shown.length} of ${notes.length} notes`}
      </p>

      {shown.length ? (
        <div className="notes-grid">
          {shown.map((n) => (
            <NoteCard key={n.slug} note={n} />
          ))}
        </div>
      ) : (
        <p className="notes-empty">
          Nothing matches that yet.{" "}
          <button
            type="button"
            className="notes-reset"
            onClick={() => {
              setKind("all");
              setShow("");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </p>
      )}
    </>
  );
}
