"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "elsewhere", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  // Measure the active link and slide the pill underneath it.
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav || !active) {
        setPill(null);
        return;
      }
      const link = nav.querySelector<HTMLAnchorElement>(
        `a[data-id="${active}"]`,
      );
      if (!link) {
        setPill(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setPill({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <header className={`masthead ${scrolled ? "is-scrolled" : ""}`}>
      <div className="masthead-inner">
        <a href="#top" className="mark" aria-label="Home">
          <span className="mark-glyph">M</span>
          <span className="mark-rule" />
          <span className="mark-text">AI consultant · side projects</span>
        </a>
        <nav className="nav" aria-label="Primary" ref={navRef}>
          {pill && (
            <span
              className="nav-pill"
              aria-hidden="true"
              style={{
                transform: `translateX(${pill.left}px)`,
                width: `${pill.width}px`,
              }}
            />
          )}
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-id={item.id}
              className={active === item.id ? "is-active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
