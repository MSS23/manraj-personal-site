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

/** The stack, as one row of the facts list. Used to be a looping marquee under the hero. */
export function Marquee() {
  return (
    <div className="marquee">
      <dt>Stack</dt>
      <dd>{items.join(", ")}</dd>
    </div>
  );
}
