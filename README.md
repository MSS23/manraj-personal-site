# Manraj Sidhu — Personal Site (Next.js)

Migrated from the vanilla `website/` folder. Same content, same editorial system, now with React component composition and a Tailwind base.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build for production

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx           Root layout, fonts, metadata
    page.tsx             Composes the single-page sections
    globals.css          Editorial design system + Tailwind
  components/
    Masthead.tsx         Sticky nav with scrollspy + active underline
    Hero.tsx             Hero + stat row
    Marquee.tsx          Stack-name ticker
    About.tsx            Numbered narrative + portrait card
    Approach.tsx         "How I work" panel
    Work.tsx             Bucket loop
    ProjectEntry.tsx     Accordion entry with deep-link sync
    Writing.tsx          Substack + Instagram cards
    Contact.tsx          Email line
    Colophon.tsx         Footer with social links
  data/
    projects.ts          Source of truth for every project entry

public/
  assets/                Portrait + project screenshots
```

## Adding a project

Edit `src/data/projects.ts`. Each project is a typed object with a `bucket`,
a folio number, an entry tag, a description, optional lead image, meta list,
and a `detail` array of typed blocks (`h4`, `p`, `ul`, `stat-row`,
`figure-stack`). Components render whatever you put there.

## Deep linking

Opening `https://manrajssidhu.com/#entry-mcp` auto-expands that case study
and scrolls it into view. Expanding any entry updates the URL hash so the
case study can be shared.

## Connecting 21st.dev Magic MCP (optional)

If you want to generate UI components via the [21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp):

1. Get an API key from https://21st.dev/magic/console.
2. Run `npx @21st-dev/cli@latest install claude --api-key <key>` (or add the
   server manually to `~/.claude/mcp_config.json`).
3. In Claude Code, type `/ui ...` to generate components into `src/components/`.

The site is React + Tailwind so anything 21st.dev generates will drop in directly.
