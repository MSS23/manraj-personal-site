"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Swipeable carousel viewer: native scroll-snap, arrows, dots, keyboard, counter. */
export function SlideDeck({ slides, title }: { slides: string[]; title: string }) {
  const track = useRef<HTMLDivElement | null>(null);
  const [i, setI] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (n: number) => {
      const el = track.current;
      if (!el) return;
      const next = Math.max(0, Math.min(total - 1, n));
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [total],
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setI(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  };

  return (
    <div className="deck" tabIndex={0} onKeyDown={onKey} aria-roledescription="carousel" aria-label={title}>
      <div className="deck-frame">
        <div className="deck-track" ref={track}>
          {slides.map((src, n) => (
            <div className="deck-slide" key={src} aria-roledescription="slide" aria-label={`Slide ${n + 1} of ${total}`}>
              <img src={src} alt={`${title}, slide ${n + 1}`} loading={n < 2 ? "eager" : "lazy"} decoding="async" draggable={false} />
            </div>
          ))}
        </div>
        <button type="button" className="deck-arrow deck-prev" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="deck-arrow deck-next" onClick={() => go(i + 1)} disabled={i === total - 1} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="deck-counter">
          {i + 1} / {total}
        </span>
      </div>
      <div className="deck-dots" role="tablist" aria-label="Slides">
        {slides.map((_, n) => (
          <button
            key={n}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Go to slide ${n + 1}`}
            className={n === i ? "is-on" : ""}
            onClick={() => go(n)}
          />
        ))}
      </div>
      <p className="deck-hint">Swipe, use the arrows, or press ← →</p>
    </div>
  );
}
