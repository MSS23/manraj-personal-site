export function Approach() {
  return (
    <section id="approach" className="section">
      <p className="kicker">
        <span>§</span> How I work
      </p>
      <div className="approach-grid">
        <h2 className="serif-heading approach-heading">
          A few things I believe about building.
        </h2>
        <div className="approach-body">
          <p>
            <strong>Scope down before you scope up.</strong> Every project on
            this page started as the smallest version of itself that solved
            one real problem. Damage maths in the browser. A single Streamlit
            page. Four scheduled routines. Once a thing earns its keep, it
            grows. Until then, it stays small.
          </p>
          <p>
            <strong>Automate the boring half.</strong> The interesting work
            is the call I haven&apos;t made yet, the tradeoff I haven&apos;t weighed.
            Everything around it (lint passes, queue triage, calendar prep,
            usage-stats refreshes) is the boring half, and the boring half
            is what I hand to a scheduled agent so I get my evenings back.
          </p>
          <p>
            <strong>Trust the boring tech.</strong> Postgres, plain HTML,
            vanilla JavaScript, a Python script on a cron. I reach for the
            shiniest thing only when the boring thing has run out of road.
            Most of the time it hasn&apos;t.
          </p>
          <p>
            <strong>Verify against ground truth.</strong> The VGC MCP has
            1,199 tests against Pokémon Showdown&apos;s reference output because
            &quot;I think it works&quot; is not a foundation I trust. If the system
            makes a claim, something has to check it.
          </p>
        </div>
      </div>
    </section>
  );
}
