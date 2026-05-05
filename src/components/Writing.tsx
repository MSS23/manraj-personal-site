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
        Long-form on Substack, short clips on TikTok. I post when I have
        something to say.
      </p>

      <div className="links">
        <a
          className="link-card"
          href="https://mannyssidhu.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link-card-row">
            <span>Newsletter</span>
            <span className="link-card-arrow" aria-hidden="true">→</span>
          </div>
          <h3 className="link-card-title">Substack</h3>
          <p className="link-card-desc">
            Essays on what I learn while building. How I use AI and automation
            in real work, and where I get it wrong.
          </p>
          <p className="link-card-cta">mannyssidhu.substack.com</p>
        </a>

        <a
          className="link-card"
          href="https://www.tiktok.com/@manrajtalks"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link-card-row">
            <span>Updates</span>
            <span className="link-card-arrow" aria-hidden="true">→</span>
          </div>
          <h3 className="link-card-title">TikTok</h3>
          <p className="link-card-desc">
            Short clips on what I&apos;m building, what I&apos;m learning, and the
            occasional VGC take.
          </p>
          <p className="link-card-cta">@manrajtalks</p>
        </a>
      </div>
    </section>
  );
}
