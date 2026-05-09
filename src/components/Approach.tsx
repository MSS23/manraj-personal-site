export function Approach() {
  return (
    <section id="approach" className="section">
      <p className="kicker">
        <span>§</span> How I work
      </p>
      <div className="approach-grid">
        <h2 className="serif-heading approach-heading">
          How I build.
        </h2>
        <div className="approach-body">
          <p>
            <strong>Scope down before you scope up.</strong> Every project on
            this page started as the smallest version of itself that solved
            one real problem: damage maths in the browser, a single Streamlit
            page, four scheduled routines. Once a thing earns its keep, it
            grows.
          </p>
          <p>
            <strong>Automate the boring half.</strong> The interesting work
            is the call I haven&apos;t made yet, the tradeoff I haven&apos;t weighed.
            Lint passes, queue triage, calendar prep, usage-stats refreshes:
            those go to a scheduled agent so my evenings come back.
          </p>
          <p>
            <strong>Trust the boring tech.</strong> Postgres, plain HTML,
            vanilla JavaScript, a Python script on a cron. I reach for the
            shiny thing once the boring thing runs out of road, which is
            rarer than the discourse suggests.
          </p>
          <p>
            <strong>Bit-for-bit, or it doesn&apos;t ship.</strong> The VGC
            MCP has 1,199 tests pinned to Pokémon Showdown&apos;s reference
            output, because every damage number it returns has to match the
            authoritative engine before I&apos;ll trust it in someone
            else&apos;s game plan.
          </p>
        </div>
      </div>
    </section>
  );
}
