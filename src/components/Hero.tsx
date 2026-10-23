import { projects } from "@/data/projects";
import { getNotes } from "@/lib/notes";
import { fmt, type Live } from "@/lib/live";

/** Stage hero: the head on seven columns, the portrait on five, crop-marked on the proof sheet. */
export function Hero({ live }: { live: Live }) {
  return (
    <section className="hero proof" id="top">
      <div className="container hero-inner">
        <div className="stage-copy">
          <h1>I build the boring half.</h1>
          <p className="lead">AI engineer: agents, automations and products, tested on my own work first.</p>
          <div className="hero-actions">
            <a href="/portfolio" className="btn">
              See the portfolio
            </a>
            <a href="#contact" className="btn btn-quiet">
              Get in touch
            </a>
          </div>
        </div>

        <figure className="hero-figure hero-portrait">
          <div className="sheet crop">
            <div className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/portrait-hero.webp" alt="Portrait of Manraj Sidhu." width={800} height={800} fetchPriority="high" decoding="async" />
            </div>
          </div>
          <span className="hero-guide" aria-hidden="true" />
          <figcaption>
            <span className="label">Manraj Sidhu, AI engineer</span>
            <span className="readout">4 : 5</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** The four figures that used to sit under the hero head, as a strip of their own. */
export function Figures({ live }: { live: Live }) {
  const stats = [
    { num: String(projects.length), label: "projects shipped" },
    { num: fmt(live.vgcUsers), label: "players on VGC Team Report" },
    { num: String(getNotes().length), label: "reels on building in public" },
    { num: "18th", label: "EUIC 2026, Pokémon VGC" },
  ];
  return (
    <section className="section-s" aria-label="At a glance">
      <div className="container">
      <ul className="figures">
        {stats.map((st) => (
          <li key={st.label}>
            <span className="figure-num">{st.num}</span>
            <span className="figure-label">{st.label}</span>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
