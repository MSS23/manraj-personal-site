"use client";

import { useState } from "react";

export function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="section about">
      <p className="kicker">
        <span>§</span> About
      </p>

      <div className="about-grid">
        <div className="about-body">
          <h2 className="serif-heading">
            Builder, competitor, padel addict.
          </h2>

          <ol className="about-numbered">
            <li>
              <span className="about-num" aria-hidden="true">01</span>
              <p className="lead">
                <span className="dropcap">I</span>&apos;m Manraj. I build
                with AI, mostly against the work in front of me: tools
                that take a job I&apos;d otherwise put off, workflows
                that run themselves, and the occasional thing built
                around the games I play.
              </p>
            </li>
          </ol>

          <div
            className={`about-rest ${expanded ? "is-open" : ""}`}
            id="about-rest"
            aria-hidden={!expanded}
          >
            <div className="about-rest-grid">
              <ol className="about-numbered about-numbered-rest" start={2}>
                <li>
                  <span className="about-num" aria-hidden="true">02</span>
                  <p>
                    Some of these are personal infrastructure. Scheduled
                    Claude routines that prep my day, drain a queue,
                    refresh a dataset overnight, so my evenings go to
                    building instead of the admin around it.
                  </p>
                </li>
                <li>
                  <span className="about-num" aria-hidden="true">03</span>
                  <p>
                    I compete in Pokémon VGC, the official doubles format,
                    and travel to regional tournaments when I can. The
                    format is full of repetitive analysis: damage maths,
                    speed tiers, threat coverage. So I built the tools I
                    wished existed, for myself first and the community
                    second.
                  </p>
                </li>
                <li>
                  <span className="about-num" aria-hidden="true">04</span>
                  <p>
                    Off the keyboard, I&apos;m a padel addict. If I&apos;m
                    not at a court I&apos;m probably trying to book one.
                    Before that I co-hosted and edited{" "}
                    <em>The DMC Podcast</em> with my mate Joseph for three
                    seasons. 127 episodes on personal development, mental
                    health, and trying to be better.
                  </p>
                </li>
                <li>
                  <span className="about-num" aria-hidden="true">05</span>
                  <p>
                    I write the longer thoughts on{" "}
                    <a
                      href="https://mannyssidhu.substack.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Substack
                    </a>{" "}
                    and post the shorter ones on{" "}
                    <a
                      href="https://www.tiktok.com/@manrajtalks"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TikTok as @manrajtalks
                    </a>
                    . The thread through all of it is the same: AI inside
                    a workflow, taking the parts of the job I never want
                    to do again.
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
            <span className="about-toggle-label">
              {expanded ? "Show less" : "More about Manraj"}
            </span>
            <span className="about-toggle-chevron" aria-hidden="true">↓</span>
          </button>
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
              <dt>Working on</dt>
              <dd>AI &amp; automation, mostly</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>TypeScript, Python, Postgres, n8n</dd>
            </div>
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
        </aside>
      </div>
    </section>
  );
}
