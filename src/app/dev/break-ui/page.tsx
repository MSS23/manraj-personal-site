import { notFound } from "next/navigation";
import { NotesGrid } from "@/components/NotesGrid";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectEntry } from "@/components/ProjectEntry";
import { projects } from "@/data/projects";
import { WORST_PROJECTS } from "@/data/projects-worst";
import { liveStats, withLive } from "@/lib/live";
import { ONE_NOTE, WORST_NOTES } from "@/data/notes-worst";
import { getNotes, getSeries, type Note } from "@/lib/notes";

// Dev-only stress page for the note cards (break-ui skill). 404 in production.
const STATES = ["demo", "worst", "empty", "one", "projects"] as const;

export default async function BreakUi({ searchParams }: { searchParams: Promise<{ data?: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const data = (await searchParams).data ?? "demo";
  if (data === "projects") {
    const live = await liveStats();
    const list = [...WORST_PROJECTS, ...projects.slice(0, 2)].map((p) => withLive(p, live));
    return (
      <main className="container" style={{ paddingBottom: 96 }}>
        <ol className="index">{list.map((p) => <ProjectCard key={p.id} project={p} />)}</ol>
        <ol className="works">{list.map((p) => <ProjectEntry key={p.id} project={p} />)}</ol>
        <Toggle data={data} />
      </main>
    );
  }
  const notes: Note[] = data === "worst" ? WORST_NOTES : data === "empty" ? [] : data === "one" ? ONE_NOTE : getNotes();
  const series = data === "demo" ? getSeries() : [...new Set(notes.map((n) => n.series).filter((s): s is string => !!s))];
  return (
    <main className="container notes-body" style={{ paddingBottom: 96 }}>
      <NotesGrid key={data} notes={notes} series={series} />
      <Toggle data={data} />
    </main>
  );
}

function Toggle({ data }: { data: string }) {
  return (
      <nav style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 999, display: "flex", gap: 2, padding: 2, borderRadius: 999, background: "#e5e5e5", font: "13px system-ui" }}>
        {STATES.map((s) => (
          <a key={s} href={`?data=${s}`} style={{ padding: "6px 12px", borderRadius: 999, color: "#111", textDecoration: "none", background: s === data ? "#fff" : "transparent" }}>
            {s}
          </a>
        ))}
      </nav>
  );
}
