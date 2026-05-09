export function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="kicker">
        <span>§</span> Contact
      </p>
      <h2 className="serif-heading contact-heading">Say hello.</h2>
      <p className="contact-lede">
        If you&apos;re building something interesting, or you just want
        to argue about agents, my inbox is open.
      </p>

      <ul className="contact-prompts" aria-label="Good reasons to write">
        <li>Building an agent and want a second pair of eyes?</li>
        <li>Working on a VGC tool? Let&apos;s compare notes.</li>
        <li>Got a Claude trick I should try? I&apos;m always reading.</li>
      </ul>

      <a href="mailto:contact@manrajssidhu.com" className="email-line">
        <span>contact@manrajssidhu.com</span>
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
