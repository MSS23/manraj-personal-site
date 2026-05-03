export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-meta">
          <span>I build AI and automation systems. These are some of mine.</span>
        </div>

        <h1 className="display">
          <span className="line">Manraj</span>
          <span className="line">
            <em>Sidhu.</em>
          </span>
        </h1>

        <p className="dek">
          AI and automation, embedded in the way I work. Tools that augment a
          workflow. Agents that run themselves. The occasional thing built for
          the games I play.
        </p>

        <div className="hero-actions">
          <a href="#work" className="btn">
            See the projects
          </a>
          <a href="#elsewhere" className="btn btn-quiet">
            Read the notes
          </a>
        </div>

        <ul className="hero-stats" aria-label="At a glance">
          <li>
            <span className="hero-stat-num">6</span>
            <span className="hero-stat-label">shipped projects</span>
          </li>
          <li>
            <span className="hero-stat-num">1,199</span>
            <span className="hero-stat-label">passing tests on the MCP</span>
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
