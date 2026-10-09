export const SOCIALS = [
  { id: "instagram", label: "Instagram", handle: "@manrajtalks", href: "https://www.instagram.com/manrajtalks/" },
  { id: "tiktok", label: "TikTok", handle: "@manrajtalks", href: "https://www.tiktok.com/@manrajtalks" },
  { id: "x", label: "X", handle: "@manrajtalks", href: "https://x.com/manrajtalks" },
  { id: "linkedin", label: "LinkedIn", handle: "manraj-sidhu", href: "https://www.linkedin.com/in/manraj-sidhu/" },
  { id: "substack", label: "Substack", handle: "@manrajtalks", href: "https://substack.com/@manrajtalks" },
  { id: "github", label: "GitHub", handle: "MSS23", href: "https://github.com/MSS23" },
] as const;

const ICONS: Record<(typeof SOCIALS)[number]["id"], React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.3 1.7 3.9 4 4.1v3.1c-1.5 0-2.9-.5-4-1.3v6.3A5.7 5.7 0 1 1 10.8 9.5c.4 0 .8 0 1.1.1v3.2a2.6 2.6 0 1 0 1.5 2.4V3h3.1z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.5L4.6 21h-3l7.5-8.6L1.3 3h6.5l4.5 6 5.2-6zm-1.1 16.2h1.7L6.7 4.7H4.9l11.5 14.5z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.2 8.6H3V21h3.2V8.6zM4.6 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM21 13.4c0-3.4-1.8-5-4.3-5-2 0-2.9 1.1-3.4 1.9V8.6H10V21h3.3v-6.9c0-1.8.6-3 2.2-3 1.5 0 2.2 1 2.2 3V21H21v-7.6z" />
    </svg>
  ),
  substack: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 4h16v2.2H4V4zm0 4.4h16v2.2H4V8.4zM4 12.8h16V21l-8-4.5L4 21v-8.2z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
    </svg>
  ),
};

/** Where to follow: used on the home page and under every note. */
export function FollowRow({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`follow-row ${compact ? "is-compact" : ""}`} aria-label="Follow Manraj">
      {SOCIALS.map((s) => (
        <li key={s.id}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" className={`follow-link follow-${s.id}`}>
            <span className="follow-icon">{ICONS[s.id]}</span>
            <span className="follow-text">
              <span className="follow-label">{s.label}</span>
              {!compact && <span className="follow-handle">{s.handle}</span>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
