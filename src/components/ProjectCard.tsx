import Link from "next/link";
import type { Project } from "@/data/projects";
import { buckets } from "@/data/projects";

/** Home-page summary of a project; the case study lives on /portfolio. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio#${project.id}`} className="note-card project-card">
      <div className="note-card-media">
        {project.lead ? (
          <img src={project.lead.src} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="note-card-blank" aria-hidden="true">
            <span>{project.folio}</span>
          </div>
        )}
        <span className="note-card-badge">{project.tag}</span>
      </div>
      <div className="note-card-body">
        <p className="note-card-meta">
          <span className="note-card-series">{buckets[project.bucket].title}</span>
        </p>
        <h3 className="note-card-title">{project.title}</h3>
        <p className="note-card-summary">{project.description}</p>
      </div>
    </Link>
  );
}
