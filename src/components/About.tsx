export function About() {
  return (
    <section id="about" className="section about">
      <p className="kicker">
        <span>§</span> About
      </p>

      <div className="about-grid">
        <div className="about-body">
          <h2 className="serif-heading">
            I build with AI to augment the way I work.
          </h2>

          <ol className="about-numbered">
            <li>
              <span className="about-num" aria-hidden="true">01</span>
              <p className="lead">
                <span className="dropcap">I</span>&apos;m a builder. Most of what I make
                sits at the intersection of AI and the work in front of me:
                tools that take a job I&apos;d otherwise put off, workflows that
                run themselves, and the occasional thing built around the
                games I play.
              </p>
            </li>
            <li>
              <span className="about-num" aria-hidden="true">02</span>
              <p>
                Some of the projects on this page are personal infrastructure.
                Scheduled Claude routines that prep my day, drain a queue,
                refresh a dataset overnight. Less to remember, more time on
                the work that actually matters.
              </p>
            </li>
            <li>
              <span className="about-num" aria-hidden="true">03</span>
              <p>
                Some of them are Pokémon-shaped. I compete in Pokémon VGC,
                and the format is full of repetitive analysis: damage maths,
                speed tiers, threat coverage. So I built the tools I wished
                existed, for myself first and the community second.
              </p>
            </li>
            <li>
              <span className="about-num" aria-hidden="true">04</span>
              <p>
                The thread running through all of it is the same: AI embedded
                inside a workflow, doing the boring half so the interesting
                half gets attention. I write up the projects I&apos;m proud of here,
                and the things I learn from them over on Substack.
              </p>
            </li>
          </ol>
        </div>

        <aside className="about-aside">
          <figure className="portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/portrait.png"
              alt="Portrait of Manraj Sidhu."
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <p className="aside-title">At a glance</p>
          <dl className="facts">
            <div>
              <dt>What this is</dt>
              <dd>A personal notebook</dd>
            </div>
            <div>
              <dt>Mostly</dt>
              <dd>Side projects in AI &amp; automation</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>TypeScript, Python, Postgres, n8n</dd>
            </div>
            <div>
              <dt>Writing</dt>
              <dd>Substack, shipping more this year</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
