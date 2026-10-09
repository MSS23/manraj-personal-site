export function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="kicker">
        <span>§</span> Contact
      </p>
      <h2 className="serif-heading contact-heading">Let&apos;s take something off your plate.</h2>
      <p className="contact-lede">
        If your team has a job that eats hours every week and should be
        running itself, tell me what it is. Short email, no pitch deck needed.
      </p>

      <p className="contact-open">
        <strong>Open to:</strong> contract builds (an agent or automation, scoped and shipped), AI consulting
        (what to automate first, what to leave alone), and the odd conversation about agents or VGC.
      </p>

      <ul className="contact-prompts" aria-label="Good reasons to write">
        <li>Got a process that lives in someone&apos;s head and a spreadsheet?</li>
        <li>Tried an AI tool, it half worked, and you want it to actually work?</li>
        <li>Building an agent and want a second pair of eyes?</li>
      </ul>

      <a href="mailto:contact@manrajssidhu.com" className="email-line">
        <span>contact@manrajssidhu.com</span>
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
