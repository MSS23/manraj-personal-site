import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { bucketOrder, projects } from "@/data/projects";
import { withLive, type Live } from "@/lib/live";

export function Work({ live }: { live: Live }) {
  // One project per bucket; the full case studies are on /portfolio.
  const featured = bucketOrder
    .map((b) => projects.find((p) => p.bucket === b))
    .filter((p) => p !== undefined)
    .map((p) => withLive(p, live));
  return (
    <section id="work" className="section">
      <p className="kicker">
        <span>§</span> Selected work
      </p>
      <h2 className="serif-heading work-heading">
        Things I&apos;ve built.
        <br />
        <em style={{ color: "var(--text-muted)" }}>One from each shelf. The full case studies are on the portfolio.</em>
      </h2>
      <div className="notes-grid notes-grid-home">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <p className="notes-all">
        <Link href="/portfolio" className="btn">
          See all {projects.length} projects →
        </Link>
      </p>
    </section>
  );
}
