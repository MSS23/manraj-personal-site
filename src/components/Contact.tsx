import { ContactForm } from "@/components/ContactForm";

const EMAIL = "contact@manrajssidhu.com";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact">
        <h2>Get in touch.</h2>
        <p className="lead contact-lede">
          Questions about any of the projects, an idea to collaborate on, a talk, or a conversation about agents or
          VGC. A short email is plenty.
        </p>

        <div className="contact-split">
          <ContactForm />
          <div className="contact-channels">
            <p className="label">Or write directly</p>
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hello from your site")}`} className="email-line">
              <span>{EMAIL}</span>
            </a>
            <p className="contact-channel-note">
              Prefer LinkedIn?{" "}
              <a href="https://www.linkedin.com/in/manraj-sidhu/" target="_blank" rel="noopener noreferrer">
                Message me there
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
