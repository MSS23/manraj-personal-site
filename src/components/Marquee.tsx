const items = [
  "Claude",
  "MCP",
  "TypeScript",
  "Python 3.13",
  "Postgres",
  "n8n",
  "FastMCP",
  "Streamlit",
  "Gemini 2.5",
  "Pydantic",
  "Render",
  "Pokémon VGC",
  "Brand sites",
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
