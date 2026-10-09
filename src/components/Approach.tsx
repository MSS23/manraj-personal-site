const PRINCIPLES = [
  {
    title: "Scope down before you scope up.",
    text: "Every project on this page started as the smallest version of itself that solved one real problem: damage maths in the browser, a single Streamlit page, four scheduled routines. Once a thing earns its keep, it grows.",
  },
  {
    title: "Automate the boring half.",
    text: "The interesting work is the call I haven’t made yet, the tradeoff I haven’t weighed. Lint passes, queue triage, calendar prep, usage-stats refreshes: those go to a scheduled agent so the evenings come back.",
  },
  {
    title: "Trust the boring tech.",
    text: "Postgres, plain HTML, vanilla JavaScript, a Python script on a cron. I reach for the shiny thing once the boring thing runs out of road, which is rarer than the discourse suggests.",
  },
  {
    title: "Bit-for-bit, or it doesn’t ship.",
    text: "The VGC MCP has 1,199 tests pinned to Pokémon Showdown’s reference output, because every damage number it returns has to match the authoritative engine before I’ll trust it in someone else’s game plan.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="section">
      <p className="kicker">
        <span>§</span> How I work
      </p>
      <h2 className="serif-heading">
        How I <em>build.</em>
      </h2>
      <ol className="approach-list">
        {PRINCIPLES.map((p, i) => (
          <li key={p.title} className="approach-card">
            <span className="approach-num" aria-hidden="true">0{i + 1}</span>
            <h3 className="approach-title">{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
