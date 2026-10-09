"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "about", href: "/#about", label: "About" },
  { id: "approach", href: "/#approach", label: "Approach" },
  { id: "work", href: "/#work", label: "Work" },
  { id: "notes", href: "/notes", label: "Notes" },
  { id: "portfolio", href: "/portfolio", label: "Portfolio" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

export function Masthead() {
  const pathname = usePathname();
  const page = pathname.startsWith("/notes") ? "notes" : pathname.startsWith("/portfolio") ? "portfolio" : null;
  const onNotes = page !== null;
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(page);
  const navRef = useRef<HTMLElement | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy on the home page only; on /notes the Notes link stays lit.
  useEffect(() => {
    if (onNotes) {
      setActive(page);
      return;
    }
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
  }, [onNotes, page]);

  // Measure the active link and slide the pill underneath it.
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav || !active) {
        setPill(null);
        return;
      }
      const link = nav.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
      if (!link) {
        setPill(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setPill({ left: linkRect.left - navRect.left, width: linkRect.width });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <header className={`masthead ${scrolled ? "is-scrolled" : ""}`}>
      <div className="masthead-inner">
        <Link href="/#top" className="mark" aria-label="Home">
          <span className="mark-glyph">M</span>
          <span className="mark-rule" />
          <span className="mark-text">AI agents &amp; automations for small teams</span>
        </Link>
        <nav className="nav" aria-label="Primary" ref={navRef}>
          {pill && (
            <span
              className="nav-pill"
              aria-hidden="true"
              style={{ transform: `translateX(${pill.left}px)`, width: `${pill.width}px` }}
            />
          )}
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              data-id={item.id}
              className={active === item.id ? "is-active" : ""}
              aria-current={active === item.id ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
