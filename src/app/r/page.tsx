import type { Metadata } from "next";
import Link from "next/link";
import { Colophon } from "@/components/Colophon";
import { Masthead } from "@/components/Masthead";
import { getNotes, keywordSlug } from "@/lib/notes";
import "@/app/notes.css";

export const metadata: Metadata = {
  title: "Resources · Manraj Sidhu",
  description: "Every guide a comment keyword unlocks: the steps, prompts and files behind each reel, in one place.",
  alternates: { canonical: "https://manrajssidhu.com/r" },
  openGraph: { title: "Resources · Manraj Sidhu", description: "Every guide a comment keyword unlocks, in one place.", url: "https://manrajssidhu.com/r", type: "website" },
};

export default function ResourcesPage() {
  const notes = getNotes().filter((n) => n.keyword);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main" className="notes-page">
        <section className="container notes-head">
          <h1>Resources</h1>
          <p className="lead">
            Comment the word on a reel and the guide lands in your DMs. Or pick it straight from here.
          </p>
        </section>
        <section className="container notes-body" aria-label="Guides by keyword">
          <ul className="resources">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link href={`/r/${keywordSlug(n.keyword!)}`}>
                  <strong>{n.keyword}</strong>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Colophon />
    </>
  );
}
