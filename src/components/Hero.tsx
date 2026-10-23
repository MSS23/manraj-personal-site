import { projects } from "@/data/projects";
import { getNotes } from "@/lib/notes";
import { fmt, type Live } from "@/lib/live";

const vgc = projects.find((p) => p.id === "entry-vgc");

/** Stage hero: the head on five columns, the live product on seven, crop-marked on the proof sheet. */
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

        {vgc?.lead && (
          <figure className="hero-figure">
            <div className="sheet crop">
              <div className="shot" data-slot="hero" data-kind="product" data-alt="The main screen of the product you want to lead with">
                <img src={vgc.lead.src} alt={vgc.lead.alt} width={2000} height={1250} fetchPriority="high" decoding="async" />
              </div>
            </div>
            <span className="hero-guide" aria-hidden="true" />
            <figcaption>
              <span className="label">VGC Team Report, a shipped web app: accounts, shared reports, PDF export, {fmt(live.vgcUsers)} players signed up</span>
              <span className="readout">3 : 2</span>
            </figcaption>
          </figure>
        )}
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
