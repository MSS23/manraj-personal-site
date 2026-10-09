export function Hero() {
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
          <li>
            <span className="hero-stat-num">6</span>
            <span className="hero-stat-label">shipped projects</span>
          </li>
          <li>
            <span className="hero-stat-num">1,199</span>
            <span className="hero-stat-label">tests passing on the VGC MCP</span>
          </li>
          <li>
            <span className="hero-stat-num">4</span>
            <span className="hero-stat-label">scheduled agents in rotation</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
