export function Writing() {
  return (
    <section id="elsewhere" className="section">
      <p className="kicker">
        <span>§</span> Writing
      </p>
      <h2 className="serif-heading">
        Where I <em>publish.</em>
      </h2>
      <p className="section-lede">
        Long-form on Substack, short clips on Instagram. I post when I have
        something to say.
      </p>

      <div className="links">
        <div className="link-card link-card-soon" aria-disabled="true">
          <div className="link-card-row">
            <span>Newsletter</span>
            <span className="link-card-arrow" aria-hidden="true">soon</span>
          </div>
          <h3 className="link-card-title">Substack</h3>
          <p className="link-card-desc">
            Essays on what I learn while building. How I use AI and automation
            in real work, and where I get it wrong.
          </p>
          <p className="link-card-cta">Drafting the first essay</p>
        </div>

        <a
          className="link-card"
          href="https://www.instagram.com/mannyssidhu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link-card-row">
            <span>Updates</span>
            <span className="link-card-arrow" aria-hidden="true">→</span>
          </div>
          <h3 className="link-card-title">Instagram</h3>
          <p className="link-card-desc">
            Screenshots and short clips of work in progress before it becomes
            a full write-up.
          </p>
          <p className="link-card-cta">@mannyssidhu</p>
        </a>
      </div>
    </section>
  );
}
