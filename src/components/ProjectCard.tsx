import Link from "next/link";
import type { Project } from "@/data/projects";
import { buckets } from "@/data/projects";

/** One row of the home-page index; the case study lives on /portfolio. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <li>
      <Link href={`/portfolio#${project.id}`} className="index-row">
        <span className="index-num" aria-hidden="true">{project.folio}</span>
        <h3>{project.title}</h3>
        <span className="index-shelf">{buckets[project.bucket].title}</span>
        <span className="index-tag">
          {project.tag.split(" · ").map((part) => (
            <span key={part}>{part}</span>
          ))}
        </span>
      </Link>
    </li>
  );
}
