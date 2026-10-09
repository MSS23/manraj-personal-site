import { projects } from "@/data/projects";
import { getNotes } from "@/lib/notes";

export function Hero() {
  const stats = [
    { num: String(projects.length), label: "projects shipped" },
    { num: String(getNotes().length), label: "reels on building in public" },
    { num: "18th", label: "EUIC 2026, Pokémon VGC" },
  ];
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-meta">
          <span>I build AI agents and automations for small teams.</span>
        </div>

        <h1 className="display">
          <span className="line">Manraj</span>
          <span className="line">
            <em>Sidhu.</em>
          </span>
        </h1>

        <p className="dek">
          Agents that take a job off your desk. Workflows that run while you
          sleep. Built with Claude, MCP and n8n, tested on my own work first.
        </p>

        <div className="hero-actions">
          <a href="#work" className="btn">
            See the projects
          </a>
          <a href="#contact" className="btn btn-quiet">
            Work with me
          </a>
        </div>

        <ul className="hero-stats" aria-label="At a glance">
          {stats.map((st) => (
            <li key={st.label}>
              <span className="hero-stat-num">{st.num}</span>
              <span className="hero-stat-label">{st.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
