"use client";

import { useState } from "react";
import { Marquee } from "@/components/Marquee";

export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="section">
      <div className="container about-grid">

        <div className="about-body">
          <h2>Run on my own work first.</h2>

          <ol className="about-numbered">
            <li>
              <p className="lead">
                I&apos;m Manraj, an AI engineer. I build agents and automations for small teams: the enquiry
                replies, the reports, the data refreshes, the admin that eats a week. Everything on this site I ran
                on my own work first, so I know where it breaks.
              </p>
            </li>
            <li>
              <p>
                My own setup is the test bed. Scheduled Claude routines prep my day, drain a queue and refresh a
                dataset overnight. If a workflow survives a month on my desk, it&apos;s ready for someone
                else&apos;s.
              </p>
            </li>
            <li>
              <p>
                I compete in Pokémon VGC, the official doubles format, and travel to regional tournaments when I
                can. The format is full of repetitive analysis: damage maths, speed tiers, threat coverage. So I
                built the tools I wished existed, for myself first and the community second.
              </p>
            </li>
          </ol>

          <div className={`about-rest ${expanded ? "is-open" : ""}`} id="about-rest" aria-hidden={!expanded}>
            <div className="about-rest-grid">
              <ol className="about-numbered about-numbered-rest" start={4} style={{ counterReset: "about 3" }}>
                <li>
                  <p>
                    Off the keyboard, I&apos;m a padel addict. If I&apos;m not at a court I&apos;m probably trying
                    to book one. Before that I co-hosted and edited <em>The DMC Podcast</em> with my mate Joseph for
                    three seasons. 127 episodes on personal development, mental health, and trying to be better.
                  </p>
                </li>
                <li>
                  <p>
                    I write the longer thoughts on{" "}
                    <a href="https://substack.com/@manrajtalks" target="_blank" rel="noopener noreferrer">
                      Substack
                    </a>{" "}
                    and post the shorter ones on{" "}
                    <a href="https://www.tiktok.com/@manrajtalks" target="_blank" rel="noopener noreferrer">
                      TikTok as @manrajtalks
                    </a>
                    . The thread through all of it is the same: AI inside a workflow, taking the parts of the job I
                    never want to do again.
                  </p>
                </li>
              </ol>
            </div>
          </div>

          <button
            type="button"
            className="about-toggle"
            aria-expanded={expanded}
            aria-controls="about-rest"
            onClick={() => setExpanded((v) => !v)}
            suppressHydrationWarning
          >
            <span className="about-toggle-label">{expanded ? "Show less" : "More about Manraj"}</span>
            <span className="about-toggle-chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        <dl className="facts">
            <div>
              <dt>Working on</dt>
              <dd>Agents, automation pipelines and AI enablement for teams</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>TypeScript, Python, Postgres, n8n</dd>
            </div>
            <Marquee />
            <div>
              <dt>Competing</dt>
              <dd>Pokémon VGC regionals</dd>
            </div>
            <div>
              <dt>Off-screen</dt>
              <dd>Padel, badly and often</dd>
            </div>
            <div>
              <dt>Writing</dt>
              <dd>Substack, sporadic but honest</dd>
            </div>
            <div>
              <dt>Short-form</dt>
              <dd>TikTok, @manrajtalks</dd>
            </div>
            <div>
              <dt>Podcast</dt>
              <dd>The DMC Podcast, 3 seasons on Spotify</dd>
            </div>
        </dl>
      </div>
    </section>
  );
}
