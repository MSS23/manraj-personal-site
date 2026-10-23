import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";
import { withLive, type Live } from "@/lib/live";

/** Every project as an index row; the full case studies are on /portfolio. */
export function Work({ live }: { live: Live }) {
  const rows = projects.map((p) => withLive(p, live));
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Twelve projects, four shelves.</h2>
          <p className="lead">Each row opens into its case study on the portfolio.</p>
        </div>
        <ol className="index">
          {rows.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </ol>
        <p className="index-foot">
          <Link href="/portfolio" className="btn btn-quiet">
            See all {projects.length} projects
          </Link>
        </p>
      </div>
    </section>
  );
}
