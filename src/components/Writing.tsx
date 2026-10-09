import Link from "next/link";
import { FollowRow } from "@/components/FollowRow";
import { NoteCard } from "@/components/NoteCard";
import { describeNotes, getNotes } from "@/lib/notes";

export function Writing() {
  const notes = getNotes();
  const latest = notes.slice(0, 3);

  return (
    <section id="elsewhere" className="section">
      <p className="kicker">
        <span>§</span> Notes
      </p>
      <h2 className="serif-heading">
        Notes from the <em>workbench.</em>
      </h2>
      <p className="section-lede">
        {notes.length
          ? `${describeNotes(notes)} on building with AI, all collected here. The newest three:`
          : "Carousels and reels on building with AI. Long-form on Substack, short clips on TikTok and Instagram."}
      </p>

      {latest.length > 0 && (
        <>
          <div className="notes-grid notes-grid-home">
            {latest.map((n) => (
              <NoteCard key={n.slug} note={n} />
            ))}
          </div>
          <p className="notes-all">
            <Link href="/notes" className="btn">
              All {notes.length} notes →
            </Link>
          </p>
        </>
      )}

      <div className="follow-block">
        <p className="kicker follow-kicker">
          <span>§</span> Follow along
        </p>
        <FollowRow />
      </div>

      <div className="podcast-block">
        <p className="kicker podcast-kicker">
          <span>§</span> Podcast archive
        </p>
        <h3 className="serif-heading podcast-heading">
          Before all this, <em>The DMC Podcast.</em>
        </h3>
        <p className="podcast-lede">
          A personal development show I co-hosted and edited with my mate Joseph. 127 episodes across three seasons on
          trust, mental health, morning routines, and trying to be better. We wrapped in 2023; the archive is still up
          on Spotify.
        </p>
        <a className="btn btn-quiet" href="https://open.spotify.com/show/5lS5DvT73hfAvxMPVfM91b" target="_blank" rel="noopener noreferrer">
          Listen on Spotify ↗
        </a>
      </div>
    </section>
  );
}
