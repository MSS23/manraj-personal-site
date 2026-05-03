"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Project, ProjectDetailBlock } from "@/data/projects";

const isExternalHref = (href?: string) => !!href && /^https?:\/\//.test(href);

function ZoomableImage({
  src,
  alt,
  href,
  className,
  onZoom,
  showOverlay,
}: {
  src: string;
  alt: string;
  href?: string;
  className?: string;
  onZoom: (src: string, alt: string) => void;
  showOverlay?: boolean;
}) {
  // External hrefs keep the open-in-new-tab behaviour. Local hrefs (or no href) become click-to-zoom.
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        {showOverlay && (
          <span className="entry-figure-overlay" aria-hidden="true">
            Open ↗
          </span>
        )}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={`zoom-trigger${className ? " " + className : ""}`}
      onClick={() => onZoom(src, alt)}
      aria-label={`Zoom: ${alt}`}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {showOverlay && (
        <span className="entry-figure-overlay" aria-hidden="true">
          Zoom ⤢
        </span>
      )}
    </button>
  );
}

function DetailBlock({
  block,
  onZoom,
}: {
  block: ProjectDetailBlock;
  onZoom: (src: string, alt: string) => void;
}) {
  switch (block.kind) {
    case "h4":
      return <h4>{block.text}</h4>;
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "ul":
      return (
        <ul>
          {block.items.map((html, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </ul>
      );
    case "stat-row":
      return (
        <div className="stat-row">
          {block.stats.map((s, i) => (
            <div key={i} className="stat">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      );
    case "figure-stack":
      return (
        <div className="entry-detail-figures stacked">
          {block.figures.map((fig, i) => (
            <figure key={i}>
              <ZoomableImage
                src={fig.src}
                alt={fig.alt}
                href={fig.href}
                className="figure-shot"
                onZoom={onZoom}
              />
              {fig.caption && (
                <figcaption dangerouslySetInnerHTML={{ __html: fig.caption }} />
              )}
            </figure>
          ))}
        </div>
      );
  }
}

export function ProjectEntry({ project }: { project: Project }) {
  const detailId = `detail-${project.id.replace(/^entry-/, "")}`;
  const reactId = useId();
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  const openZoom = (src: string, alt: string) => setZoom({ src, alt });
  const closeZoom = () => setZoom(null);

  // Close zoom on Escape and lock body scroll while open.
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoom]);

  // Auto-expand if the URL hash points at this entry on load or hash change.
  useEffect(() => {
    const checkHash = () => {
      if (typeof window === "undefined") return;
      const hashId = window.location.hash.replace(/^#/, "");
      if (hashId === project.id && !expanded) {
        setExpanded(true);
        // Defer scroll so the panel has a chance to render.
        requestAnimationFrame(() => {
          const el = document.getElementById(project.id);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  // Sync URL hash when expanded so the case study is shareable.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (expanded) {
      const next = `#${project.id}`;
      if (window.location.hash !== next) {
        history.replaceState(null, "", window.location.pathname + window.location.search + next);
      }
    } else if (window.location.hash === `#${project.id}`) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [expanded, project.id]);

  const toggle = () => setExpanded((v) => !v);

  return (
    <li className="entry" id={project.id}>
      <div className="entry-folio">
        <span className="entry-folio-mark">№</span>
        <span className="entry-folio-num">{project.folio}</span>
      </div>
      <article className="entry-body">
        <header className="entry-head">
          <h3>
            {project.titleHref ? (
              <a href={project.titleHref} target="_blank" rel="noopener noreferrer">
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <span className="entry-tag">{project.tag}</span>
        </header>
        <p className="entry-desc">{project.description}</p>

        {project.lead && (
          <figure className="entry-figure">
            <ZoomableImage
              src={project.lead.src}
              alt={project.lead.alt}
              href={project.lead.href}
              className="entry-figure-lead"
              onZoom={openZoom}
              showOverlay
            />
          </figure>
        )}

        <ul className="entry-meta">
          {project.meta.map((m, i) => (
            <li key={i}>
              <span>{m.label}</span>
              <em dangerouslySetInnerHTML={{ __html: m.valueHtml }} />
            </li>
          ))}
        </ul>

        <button
          className="entry-toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={detailId}
          onClick={toggle}
          suppressHydrationWarning
        >
          <span className="toggle-label-open">{project.toggleOpenLabel ?? "Read the case study"}</span>
          <span className="toggle-label-close">Hide details</span>
          <span className="toggle-chevron" aria-hidden="true">↓</span>
        </button>

        <div
          ref={panelRef}
          className="entry-detail"
          id={detailId}
          hidden={!expanded}
          aria-labelledby={reactId}
          style={{ height: expanded ? "auto" : 0 }}
        >
          <div className="entry-detail-inner">
            {project.detail.map((block, i) => (
              <DetailBlock key={i} block={block} onZoom={openZoom} />
            ))}
          </div>
        </div>
      </article>

      {zoom && (
        <div
          className="zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          onClick={closeZoom}
        >
          <button
            type="button"
            className="zoom-close"
            onClick={(e) => {
              e.stopPropagation();
              closeZoom();
            }}
            aria-label="Close"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom.src}
            alt={zoom.alt}
            onClick={(e) => e.stopPropagation()}
            decoding="async"
          />
        </div>
      )}
    </li>
  );
}
