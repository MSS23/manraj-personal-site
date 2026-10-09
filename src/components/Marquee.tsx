const items = [
  "Claude",
  "Claude Code",
  "MCP",
  "n8n",
  "TypeScript",
  "Next.js",
  "Python",
  "Postgres",
  "Supabase",
  "Clerk",
  "Vercel",
  "Hermes",
  "Pokémon VGC",
];

export function Marquee() {
  // Render the list twice for a seamless loop.
  const doubled = [...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 28 }}>
            <span className="marquee-item">{label}</span>
            <span className="marquee-dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
