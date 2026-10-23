"use client";

import { useState } from "react";

const EMAIL = "contact@manrajssidhu.com";

/** A short brief that opens the visitor's own email app with the fields in the body. Nothing is sent from this page, and the copy says so. */
export function ContactForm() {
  const [help, setHelp] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const company = form.elements.namedItem("company") as HTMLInputElement;
    const about = form.elements.namedItem("about") as HTMLTextAreaElement;
    for (const field of [name, about]) field.toggleAttribute("aria-invalid", !field.checkValidity());
    if (!form.checkValidity()) {
      setHelp("Add your name and a line on what it is about, then try again.");
      (name.checkValidity() ? about : name).focus();
      return;
    }
    const subject = `Hello from your site: ${about.value.trim().slice(0, 60)}`;
    const body = [`Name: ${name.value.trim()}`, company.value.trim() ? `Company: ${company.value.trim()}` : "", "", about.value.trim()]
      .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setHelp(`Your email app should open with this filled in, addressed to ${EMAIL}.`);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-label="Send a message">
      <div className="contact-form-row">
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Company, if any</span>
          <input name="company" type="text" autoComplete="organization" />
        </label>
      </div>
      <label>
        <span>What it is about</span>
        <textarea name="about" rows={4} required placeholder="A project on this site, an idea, a talk, or a question." />
      </label>
      <div className="contact-form-foot">
        <button type="submit" className="btn btn-quiet">
          Draft the email
        </button>
        <p className="contact-form-help" aria-live="polite">
          {help || "Opens your email app with these details filled in. Nothing is sent from this page."}
        </p>
      </div>
    </form>
  );
}
