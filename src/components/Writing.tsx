export function Writing() {
  return (
    <section id="elsewhere" className="section">
      <p className="kicker">
        <span>§</span> Writing
      </p>
      <h2 className="serif-heading">
        Notes from the <em>workbench.</em>
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
            Essays on what I learn while building, and where I get it
            wrong.
          </p>
          <p className="link-card-cta">Read on Substack</p>
        </a>

        <a
          className="link-card"
          href="https://www.tiktok.com/@manrajtalks"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link-card-row">
            <span>Short-form</span>
            <span className="link-card-arrow" aria-hidden="true">→</span>
          </div>
          <h3 className="link-card-title">TikTok</h3>
          <p className="link-card-desc">
            Short clips on what I&apos;m building, what I&apos;m learning,
            and the occasional life advice.
          </p>
          <p className="link-card-cta">Watch on TikTok</p>
        </a>
      </div>

      <div className="podcast-block">
        <p className="kicker podcast-kicker">
          <span>§</span> Podcast archive
        </p>
        <h3 className="serif-heading podcast-heading">
          Before all this, <em>The DMC Podcast.</em>
        </h3>
        <p className="podcast-lede">
          A personal development show I co-hosted and edited with my mate
          Joseph. 127 episodes across three seasons on trust, mental health,
          morning routines, and trying to be better. We wrapped in 2023; the
          archive is still up on Spotify.
        </p>
        <a
          className="link-card podcast-card"
          href="https://open.spotify.com/show/5lS5DvT73hfAvxMPVfM91b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link-card-row">
            <span>Podcast</span>
            <span className="link-card-arrow" aria-hidden="true">→</span>
          </div>
          <h3 className="link-card-title">The DMC Podcast</h3>
          <p className="link-card-desc">
            Three seasons, 127 episodes, archived on Spotify.
          </p>
          <p className="link-card-cta">Listen on Spotify</p>
        </a>
      </div>
    </section>
  );
}
