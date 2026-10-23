# Design: manraj-personal-site

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Index-First (the home page leads with the index of twelve projects after a Stage hero)
- Theme: Studio
- Axes: light/roman-serif/cool · posture: restrained
- Colours: the site's previous palette (Notion-grey paper, #37352f ink, #2383e2 blue), kept by request; only the coordinates changed, the material did not
- Heroes per route: Stage (/), Index (/notes, /portfolio), Settled (/notes/[slug])

## Tokens
`src/app/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: #fbfbfa;  --color-paper-hi: #ffffff;  --color-paper-2: #f7f6f3;  --color-paper-3: #f1f1ef;  --color-paper-deep: #f4f3ef;
  --color-ink: #37352f;  --color-ink-2: #6f6e6b;  --color-muted: #6f6e6b;  /* #787774 is 4.3:1 on paper; one step darker clears the floor */
  --color-rule: #ededec;  --color-rule-strong: #d6d5d2;
  --color-accent: #2383e2;  --color-accent-fill: #1768b0;  --color-accent-soft: #e7f3f8;  --color-accent-ink: #ffffff;  --color-focus: #1768b0;
  --font-display: var(--font-hedvig), "Hedvig Letters Serif", ui-serif, Georgia, serif;  --font-body: var(--font-geist), "Geist", ui-sans-serif, system-ui, sans-serif;
  --radius-card: 3px;  --radius-pill: 3px;  --rule-hair: 1px;  --shadow-card: none;  --shadow-sheet: (the one shadow, for paper objects only);
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`. Fonts load through `next/font/google` in `src/app/layout.tsx`.

## Material
- The proof ground (`.proof`: dot grid under grain) on the hero, the nav and the footer only; clean paper elsewhere.
- Crop marks (`.crop`) on every printed piece: a sheet, a photograph, a card. Put the class on an unclipped wrapper, never on the `data-slot` itself.
- Blue draws construction: `--color-accent` (#2383e2) for the hero guide, the nav underline and hover underlines; `--color-accent-fill` (#1768b0) for the one filled button and the focus ring. Never blue type on paper (#337ea9 and #2383e2 both fall under 4.5:1).
- Two rules: `--color-ink` opens a set (`.index`, `.facts`, `.figures`, `.works`, `.ledger`), `--color-rule` parts its rows.

## Controls
- Primary: `.btn`, blue fill (`--color-accent-fill`), white text, 1px ink border with a second rule inset 2px, 2px radius, 48px. One per page.
- Secondary: `.btn-quiet`, the same box on paper-hi; `.btn-small` at 44px for the nav.
- Fields: 44px, a 1px muted border, the focus ring as an inset outline.

## Motion
- Character: still. No reveal; state changes at `--dur-short` on `--ease-out`; disclosures open on `grid-template-rows`; under reduced motion everything ends at once.

## Exports
`tokens.css` in this project. `tailwind.config.ts` mirrors the colour and font roles as `var()` utilities (`bg-paper`, `text-ink`, `font-display`). DTCG or shadcn blocks are added here on request, per `export-formats.md`.
