import Link from "next/link";
import { projects } from "@/data/projects";

/** Areas of practice, stated as what gets built, each tied to the project on this site that shows it. */
const AREAS = [
  {
    title: "Agents and MCP servers",
    text: "Tools that extend Claude into a domain: 200+ MCP tools for competitive Pokémon, a court-availability server for AI assistants, scheduled agents that run daily.",
    proof: ["entry-mcp", "entry-padel-mcp", "entry-claude"],
  },
  {
    title: "Automation pipelines",
    text: "Workflows that take a job end to end: a raw clip in a Drive folder becomes an edited, captioned, scheduled reel; a Google review becomes a drafted reply to approve.",
    proof: ["entry-hermes", "entry-review-responder"],
  },
  {
    title: "Shipped products",
    text: "Web and mobile apps with real users, support inboxes and compliance paperwork, run under Sidhu Studios Ltd.",
    proof: ["entry-vgc", "entry-atlaria", "entry-draft-league"],
  },
  {
    title: "Evals and testing",
    text: "Numbers that have to match a reference before they ship: 1,199 tests pinned bit-for-bit to Pokémon Showdown's damage engine.",
    proof: ["entry-mcp"],
  },
] as const;

const byId = (id: string) => projects.find((p) => p.id === id);

export function Expertise() {
  return (
    <section id="expertise" className="section">
      <div className="container">
        <div className="section-head">
          <h2>What I work on.</h2>
          <p className="lead">Four areas, each shown by a project on this site rather than described.</p>
        </div>
        <ol className="offers">
          {AREAS.map((a) => (
            <li key={a.title} className="offer">
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <p className="offer-proof">
                <span>Shown in</span>
                {a.proof.map((id) => {
                  const p = byId(id);
                  if (!p) return null;
                  return (
                    <Link key={id} href={`/portfolio#${id}`}>
                      {p.title.split(" · ")[0]}
                    </Link>
                  );
                })}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
