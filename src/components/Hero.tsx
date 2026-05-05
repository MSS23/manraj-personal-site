export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-meta">
          <span>I build apps with AI and talk AI &amp; automation. These are some of mine.</span>
        </div>

        <h1 className="display">
          <span className="line">Manraj</span>
          <span className="line">
            <em>Sidhu.</em>
          </span>
        </h1>

        <p className="dek">
          AI and automation built into my own workflow. Tools that take a job
          off my desk, scheduled agents that drain a queue overnight, plus a
          few projects built around the games I play.
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
