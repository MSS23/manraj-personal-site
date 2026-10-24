import Link from "next/link";
import { FollowRow } from "@/components/FollowRow";
import { NoteCard } from "@/components/NoteCard";
import { SubstackForm } from "@/components/SubstackForm";
import { describeNotes, getNotes } from "@/lib/notes";

export function Writing() {
  const notes = getNotes();
  const latest = notes.slice(0, 6);

  return (
    <section id="elsewhere" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Notes from the <em>workbench</em>.</h2>
          <p className="lead">
            {notes.length
              ? `${describeNotes(notes)} on building with AI, all collected here. The newest six:`
              : "Carousels and reels on building with AI. Long-form on Substack, short clips on TikTok and Instagram."}
          </p>
        </div>
      </div>

      {latest.length > 0 && (
        <div className="container">
          <div className="rail-wrap">
            <ul className="rail" tabIndex={0} aria-label="Latest notes" style={{ listStyle: "none", margin: 0 }}>
              {latest.map((n) => (
                <li key={n.slug}>
                  <NoteCard note={n} />
                </li>
              ))}
            </ul>
          </div>
          <p className="notes-all">
            <Link href="/notes" className="btn btn-quiet">
              All {notes.length} notes
            </Link>
          </p>
        </div>
      )}

      <div className="container section-s">
        <div className="ledger">
          <div className="ledger-row" id="newsletter">
            <h3>The longer version, <em>by email</em>.</h3>
            <div className="ledger-body">
              <p>
                One email when something is worth your time: what I built, what broke, what I&apos;d do differently.
                No schedule, no filler.
              </p>
              <SubstackForm compact />
            </div>
          </div>

          <div className="ledger-row">
            <h3>Follow along.</h3>
            <div className="ledger-body">
              <FollowRow />
            </div>
          </div>

          <div className="ledger-row">
            <h3>Before all this, The DMC Podcast.</h3>
            <div className="ledger-body">
              <p>
                A personal development show I co-hosted and edited with my mate Joseph. 127 episodes across three
                seasons on trust, mental health, morning routines, and trying to be better. We wrapped in 2023; the
                archive is still up on Spotify.
              </p>
              <a className="btn btn-quiet" href="https://open.spotify.com/show/5lS5DvT73hfAvxMPVfM91b" target="_blank" rel="noopener noreferrer">
                Listen on Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
