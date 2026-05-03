import { ProjectEntry } from "./ProjectEntry";
import { bucketOrder, buckets, projects } from "@/data/projects";

export function Work() {
  return (
    <section id="work" className="section">
      <p className="kicker">
        <span>§</span> Selected work
      </p>
      <h2 className="serif-heading work-heading">
        Things I&apos;ve built.
        <br />
        <em style={{ color: "var(--text-muted)" }}>A short list of side projects, grouped by what they&apos;re for.</em>
      </h2>

      {bucketOrder.map((bucketId) => {
        const bucket = buckets[bucketId];
        const items = projects.filter((p) => p.bucket === bucketId);
        return (
          <div key={bucketId} className="work-bucket">
            <header className="work-bucket-head">
              <div className="work-bucket-row">
                <p className="work-bucket-index" aria-hidden="true">{bucket.index}</p>
                <h3 className="work-bucket-kicker">{bucket.title}</h3>
                <p className="work-bucket-count" aria-hidden="true">{bucket.count}</p>
              </div>
              <p className="work-bucket-lede">{bucket.lede}</p>
            </header>
            <ol className="works">
              {items.map((p) => (
                <ProjectEntry key={p.id} project={p} />
              ))}
            </ol>
          </div>
        );
      })}
    </section>
  );
}
