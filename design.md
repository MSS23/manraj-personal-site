# Design: manraj-personal-site

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Index-First (the home page leads with the index of twelve projects after a Stage hero)
- Theme: Studio
- Axes: light/roman-serif/warm · posture: restrained
- Heroes per route: Stage (/), Index (/notes, /portfolio), Settled (/notes/[slug])

## Tokens
`src/app/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(97.2% 0.006 215);  --color-paper-2: oklch(94% 0.009 215);  --color-paper-3: oklch(90.5% 0.011 215);
  --color-ink: oklch(16% 0.032 250);  --color-ink-2: oklch(34% 0.022 245);  --color-muted: oklch(49% 0.018 240);  --color-rule: oklch(84% 0.010 225);
  --color-accent: oklch(68% 0.172 50);  --color-accent-ink: oklch(16% 0.032 250);  --color-focus: oklch(52% 0.15 48);
  --font-display: var(--font-hedvig), "Hedvig Letters Serif", ui-serif, Georgia, serif;  --font-body: var(--font-geist), "Geist", ui-sans-serif, system-ui, sans-serif;
  --radius-card: 3px;  --radius-pill: 3px;  --rule-hair: 1px;  --shadow-card: none;  --shadow-sheet: (the one shadow, for paper objects only);
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`. Fonts load through `next/font/google` in `src/app/layout.tsx`.

## Material
- The proof ground (`.proof`: dot grid under grain) on the hero, the nav and the footer only; clean paper elsewhere.
- Crop marks (`.crop`) on every printed piece: a sheet, a photograph, a card. Put the class on an unclipped wrapper, never on the `data-slot` itself.
- Orange draws construction only: the hero guide, hover underlines, the focus ring. Never an orange field or orange type.
- Two rules: `--color-ink` opens a set (`.index`, `.facts`, `.figures`, `.works`, `.ledger`), `--color-rule` parts its rows.

## Controls
- Primary: `.btn`, cadmium orange fill, ink text, 1px ink border with a second rule inset 2px, 2px radius, 48px. One per page.
- Secondary: `.btn-quiet`, the same box on paper-hi; `.btn-small` at 44px for the nav.
- Fields: 44px, a 1px muted border, the focus ring as an inset outline.

## Motion
- Character: still. No reveal; state changes at `--dur-short` on `--ease-out`; disclosures open on `grid-template-rows`; under reduced motion everything ends at once.

## Exports
`tokens.css` in this project. `tailwind.config.ts` mirrors the colour and font roles as `var()` utilities (`bg-paper`, `text-ink`, `font-display`). DTCG or shadcn blocks are added here on request, per `export-formats.md`.
