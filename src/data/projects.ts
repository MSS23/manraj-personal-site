export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;        // HTML allowed
  href?: string;
};

export type ProjectMetaItem = { label: string; valueHtml: string };

export type ProjectDetailBlock =
  | { kind: "h4"; text: string }
  | { kind: "p"; html: string }
  | { kind: "ul"; items: string[] }                 // HTML allowed in items
  | { kind: "stat-row"; stats: { num: string; label: string }[] }
  | { kind: "figure-stack"; figures: ProjectImage[] };

export type Project = {
  id: string;
  folio: string;
  title: string;
  titleHref?: string;
  tag: string;
  description: string;
  lead?: ProjectImage;
  meta: ProjectMetaItem[];
  toggleOpenLabel?: string;
  detail: ProjectDetailBlock[];
  bucket: BucketId;
};

export type BucketId = "pokemon" | "workflows" | "brand";

export const buckets: Record<BucketId, { index: string; title: string; lede: string; count: string }> = {
  pokemon: {
    index: "01",
    title: "Pokémon, made smarter",
    lede:
      "I compete in Pokémon VGC. The format is full of repetitive analysis, so I built the tools I wished existed: damage maths against the meta, Japanese-to-English translation of the deepest write-ups, and a CRM for the people working trade nights.",
    count: "3 projects",
  },
  workflows: {
    index: "02",
    title: "AI-augmented workflows",
    lede:
      "Scheduled agents and tools that hand the boring half of my work to a machine. Personal infrastructure I run on my own projects, not at scale for anyone else.",
    count: "2 projects",
  },
  brand: {
    index: "03",
    title: "Brand & web",
    lede:
      "Static-site work for places I love. Built without a framework so it stays light, loads fast, and outlives the next JavaScript fashion.",
    count: "1 project",
  },
};

export const bucketOrder: BucketId[] = ["pokemon", "workflows", "brand"];

const linkHtml = (href: string, label: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}&nbsp;↗</a>`;

export const projects: Project[] = [
  // ── 01 — VGC Team Report ──────────────────────────────────────────────
  {
    id: "entry-vgc",
    folio: "01",
    title: "VGC Team Report",
    titleHref: "https://pokemonvgcteamreport.com/",
    tag: "Live · ~80 users",
    description:
      "A team-building site for competitive Pokémon VGC players. Paste any Showdown team, get a full report: damage maths against the meta, speed analysis, threat coverage, win conditions. Started as a spreadsheet I kept rewriting for myself, then grew into something other players started using.",
    lead: {
      src: "/assets/work/vgc-team-report/team-report-hero.png",
      alt: "A team report. Overview of the team being analysed.",
      href: "https://pokemonvgcteamreport.com/s/TRjVuD8B",
    },
    meta: [
      { label: "Stack", valueHtml: "TypeScript, Postgres, web app" },
      { label: "Role", valueHtml: "Solo, design through deploy" },
      { label: "Link", valueHtml: linkHtml("https://pokemonvgcteamreport.com/", "pokemonvgcteamreport.com") },
    ],
    bucket: "pokemon",
    detail: [
      { kind: "h4", text: "Why I built it" },
      {
        kind: "p",
        html: "Most VGC team-building is repetitive analysis: damage rolls, speed tiers, EV maths, checking your team against the current meta. Players were doing it in spreadsheets or in their heads. I wanted one place that did it for you. Paste a team, get the report.",
      },
      { kind: "h4", text: "What it does" },
      {
        kind: "ul",
        items: [
          "<strong>Team report.</strong> Paste a Showdown export → instant analysis: damage calcs against the top 30 of the meta, speed tiers, role coverage, and the threats this team is weak to.",
          "<strong>Explore.</strong> Browse curated team reports from real tournaments, filterable by regulation, archetype, and Pokémon.",
          "<strong>Compare.</strong> Two teams side by side: turn order, common KOs, who wins under Tailwind vs Trick Room.",
          "<strong>Champions.</strong> Dedicated section for Pokémon Champions Reg MA, including Mega-form coverage that other tools didn't have when I shipped it.",
        ],
      },
      { kind: "h4", text: "What's interesting under the hood" },
      {
        kind: "ul",
        items: [
          "<strong>Auto-regulation detection.</strong> The site infers which Reg (G / H / I / Champions MA) a team belongs to from the Pokémon used. No manual switching, no wrong analysis.",
          "<strong>Damage calcs in the browser.</strong> A port of Showdown's own damage formula runs client-side. No server round-trip per calculation, instant feedback.",
          "<strong>Postgres + full-text search</strong> across Pokémon, items, abilities, and tera types. Reports dedupe on a fingerprint of the set so the same team uploaded twice doesn't pollute the explore feed.",
          "<strong>Static where I can be, server-rendered where I have to be.</strong> The explore feed and team reports themselves are SSR; static landing pages are pre-rendered.",
        ],
      },
      { kind: "h4", text: "How it grew" },
      {
        kind: "p",
        html: "Zero paid marketing. Most of the early traction came from posting my own teams on Reddit. Where most players share a Showdown paste, I'd link a full team report instead, so anyone reading could see the damage maths, speed tiers, and threat coverage I was building around. The reports did the selling; word-of-mouth did the rest. About 80 active players, growing steadily, and the kind of feedback I want: \"this saved me an hour of maths before locals.\"",
      },
      { kind: "h4", text: "Inside a team report" },
      {
        kind: "p",
        html: "The six Pokémon are the easy part. The analysis around them is what I keep coming back to. Below are the sections I lean on when I'm building or matching up.",
      },
      {
        kind: "figure-stack",
        figures: [
          {
            src: "/assets/work/vgc-team-report/team-report-notable-calcs.png",
            alt: "Notable offensive damage calcs against the meta.",
            caption:
              "<strong>Per-Pokémon page.</strong> Each Pokémon gets its own slide: an overview, the moves, the stat spread, and a dropdown for notable offensive and defensive calcs underneath.",
            href: "https://pokemonvgcteamreport.com/s/TRjVuD8B",
          },
          {
            src: "/assets/work/vgc-team-report/team-report-defensive-calcs.png",
            alt: "Defensive calcs. What each Pokémon survives.",
            caption:
              "<strong>Defensive calcs.</strong> The other side of the page: what each Pokémon lives, what it doesn't, and which EV spreads earn their keep.",
            href: "https://pokemonvgcteamreport.com/s/TRjVuD8B",
          },
          {
            src: "/assets/work/vgc-team-report/team-report-matchups.png",
            alt: "Match-up sheet. How this team fares across the meta.",
            caption:
              "<strong>Match-up sheets.</strong> A condensed view of how the team performs against the most-played teams in the format: who wins, who loses, and where to plan around.",
            href: "https://pokemonvgcteamreport.com/s/TRjVuD8B",
          },
        ],
      },
    ],
  },

  // ── 02 — VGC Team Analyser ────────────────────────────────────────────
  {
    id: "entry-vgc-translation",
    folio: "02",
    title: "VGC Team Analyser · Japanese → English",
    titleHref: "https://pokemonvgctranslation.streamlit.app/",
    tag: "Live · Streamlit + Gemini",
    description:
      "The Japanese VGC scene publishes the deepest team write-ups on the planet, and almost none of it gets translated. This Streamlit app takes a Japanese VGC article (URL or pasted text), runs it through Gemini, and gives you the full team breakdown in English: Pokémon, EVs, items, moves, and the strategy notes.",
    lead: {
      src: "/assets/work/vgc-translation/hero.png",
      alt: "VGC Team Analyser. Landing page with Japanese-to-English translation engine.",
      href: "https://pokemonvgctranslation.streamlit.app/",
    },
    meta: [
      { label: "Stack", valueHtml: "Python, Streamlit, Google Gemini 2.5" },
      { label: "Role", valueHtml: "Solo, design through deploy" },
      { label: "Link", valueHtml: linkHtml("https://pokemonvgctranslation.streamlit.app/", "pokemonvgctranslation.streamlit.app") },
    ],
    bucket: "pokemon",
    detail: [
      { kind: "h4", text: "Why I built it" },
      {
        kind: "p",
        html: "The best VGC team reports in the world are written in Japanese. They're note.com posts where the player walks through every EV decision, every item choice, and the way the team is meant to win. Machine-translating them in a browser tab loses all of it: kana names mangle, EV blocks get garbled, and the strategic context disappears. I wanted a tool that read the structure of a VGC article, not just the prose.",
      },
      { kind: "h4", text: "What it does" },
      {
        kind: "ul",
        items: [
          "<strong>URL or text input.</strong> Paste a note.com link or drop the article body in directly.",
          "<strong>Structured extraction.</strong> Gemini pulls out each Pokémon's name, item, ability, tera type, EVs, nature, and moveset, instead of giving you a flat translation.",
          "<strong>Strategy notes, kept.</strong> The \"なぜこの構築\" (why this team) section gets translated as English prose so the reasoning carries over.",
          "<strong>Export.</strong> Download as Showdown paste so you can drop the team straight into a damage calculator or VGC Team Report.",
        ],
      },
      { kind: "h4", text: "Why it's a Streamlit app" },
      {
        kind: "p",
        html: "Streamlit was the right tool for the job: single Python file, hosted free, deploys on push. The whole thing is a thin wrapper around Gemini, with a structured output schema doing the heavy lifting. Bring-your-own-API-key, so it costs me nothing to run.",
      },
      { kind: "h4", text: "Where it fits" },
      {
        kind: "p",
        html: "It feeds VGC Team Report. Translate a Japanese article, paste the resulting Showdown export into the team report site, get the full damage and threat analysis. Two small tools that compose.",
      },
    ],
  },

  // ── 03 — PokéCRM ──────────────────────────────────────────────────────
  {
    id: "entry-pokecrm",
    folio: "03",
    title: "PokéCRM · A trade-night CRM for traders and vendors",
    tag: "Demo · 7 connectors ready",
    description:
      "A small, fast CRM for Pokémon card traders and solo vendors, the people working the floor at a trade night. I love Pokémon, and after going to a few of those nights I noticed the same problem repeating: collections live in a binder, trades live in someone's head, DMs are scattered across four apps, and the spreadsheet someone started never survives a real Friday. PokéCRM is the version of the tool I'd want traders and vendors to have in their hand at the table.",
    lead: {
      src: "/assets/work/pokemon-crm/portfolio.png",
      alt: "PokéCRM Portfolio view. Net worth, 12-month chart, top winners and losers.",
      href: "/assets/work/pokemon-crm/portfolio.png",
    },
    meta: [
      { label: "Stack", valueHtml: "Vanilla HTML, CSS, JavaScript · localStorage" },
      { label: "Build", valueHtml: "No build step. Two files plus a seed." },
      { label: "Role", valueHtml: "Solo, design through deploy" },
    ],
    bucket: "pokemon",
    detail: [
      { kind: "h4", text: "Why this exists" },
      {
        kind: "p",
        html: "Three patterns kept showing up at the trade nights I went to. Vendors losing track of £300 deals because the DM thread had fallen off the top of an Instagram inbox. Traders buying a card they already owned because the binder at home wasn't searchable. People shaking hands on a deal, forgetting what they'd agreed, and apologising later. None of that is a hard problem. It just needed a single place to put it.",
      },
      { kind: "h4", text: "What's in it" },
      {
        kind: "p",
        html: "It splits cleanly between the trader/solo-vendor side and the shop-style operations. The trader-facing pieces:",
      },
      {
        kind: "ul",
        items: [
          "<strong>My Collection.</strong> Every card I own personally, with what I paid, what it's worth now, where I got it, and how long I've held it. Filter by type, favourite, \"open to trade.\" This is the binder, made searchable.",
          "<strong>Portfolio.</strong> The net-worth view. 12-month value chart against cost basis, top winners and losers by ROI, allocation by type. Tells me at a glance whether I'm up or down for the year.",
          "<strong>Trade Night Mode.</strong> The reason most of this exists. You start a session when you arrive, then everything is one tap: log a trade, add a trader you just met, run a trust check on a handle before you ship anything, do a quick margin calc. Big buttons because you're using it standing up at a table.",
          "<strong>Trades pipeline.</strong> Drag-and-drop kanban from enquiry → negotiating → confirmed → shipped → completed. Multi-channel (Instagram, Discord, Whatnot, email).",
          "<strong>Traders, inventory, wishlist, inbox.</strong> The shop-side stuff that grew out of the personal stuff. Trust scores, dispute history, KYC flags, market deltas. Honest about which traders to be careful with.",
        ],
      },
      { kind: "h4", text: "What's interesting under the hood" },
      {
        kind: "ul",
        items: [
          "<strong>No backend.</strong> Pure HTML/CSS/JS. State lives in <code>localStorage</code> with a versioned key and a graceful migration path so old saves don't break new schemas.",
          "<strong>One global error guard.</strong> If anything throws mid-render, a banner appears with a one-click \"Reset Demo\". The demo can never paint itself into a corner.",
          "<strong>Hash routing.</strong> Each tab is a hash route, so deep links work and back/forward buttons behave naturally.",
          "<strong>SVG charts hand-rolled.</strong> No charting library. The Portfolio chart is a single inline SVG with two polylines (value and cost basis), a gradient area fill, and grid lines. Loads instantly.",
          "<strong>Mobile-first Trade Night.</strong> The action grid collapses 3 → 2 → 2 columns down to phone width. Sidebar tucks behind a hamburger. Tested on an actual iPhone before I called it done.",
        ],
      },
      { kind: "h4", text: "The Trade Night view in action" },
      {
        kind: "figure-stack",
        figures: [
          {
            src: "/assets/work/pokemon-crm/tradenight-active.png",
            alt: "Trade Night Mode. Live session with big-button actions.",
            caption:
              "<strong>Trade Night Mode.</strong> Start a session when you arrive. The black strip up top tracks trades, money in, and elapsed time. Six big actions cover everything you'd reach for at a table.",
          },
          {
            src: "/assets/work/pokemon-crm/mobile-tradenight-active.png",
            alt: "Trade Night Mode on mobile. Same controls, two-column layout.",
            caption:
              "<strong>Same view on a phone.</strong> Two-column action grid, hamburger nav, big tap targets. This is the form factor a trader holds at the table.",
          },
          {
            src: "/assets/work/pokemon-crm/collection.png",
            alt: "My Collection. Personal cards with ROI per card.",
            caption:
              "<strong>My Collection.</strong> What I own, what I paid, what it's worth now, ROI per card. The yellow banner is the one rule that matters: this is your stash, not shop inventory.",
          },
          {
            src: "/assets/work/pokemon-crm/dashboard.png",
            alt: "PokéCRM dashboard. KPIs, revenue chart, market movers, recent activity.",
            caption:
              "<strong>Dashboard.</strong> The shop-side overview when I switch out of personal-vendor mode: active trades, inventory value, unread DMs, trust alerts.",
          },
        ],
      },
      { kind: "h4", text: "Demo to production" },
      {
        kind: "p",
        html: "The demo runs entirely in the browser. A single folder served with <code>python -m http.server</code>, data in <code>localStorage</code>, no backend. To take it live, drop the folder onto Cloudflare Pages or Netlify for an HTTPS URL in under a minute. There's a config layer that swaps every connector from demo to live the moment a real API key is added: TCGplayer for market pricing, Stripe for payments, Gmail / Discord / Instagram for the inbox, eBay and Shopify for inventory sync. No keys, no calls. Add a key and the same connector starts hitting the real endpoint, with a \"LIVE\" badge on the card to show you it's no longer mocked.",
      },
    ],
  },

  // ── 04 — Claude Routines ─────────────────────────────────────────────
  {
    id: "entry-claude",
    folio: "04",
    title: "Claude Routines & Custom Agents",
    tag: "Ongoing · 4 routines",
    description:
      "A small, growing set of Claude-powered routines I've built around the work I want done while I'm not at the keyboard. Each one is a scheduled Claude agent with a clear job, a sensible early-exit, and a place to drop the result.",
    meta: [
      { label: "Stack", valueHtml: "Claude Code, MCP, Python, TypeScript" },
      { label: "Scope", valueHtml: "Scheduled routines + the VGC MCP" },
      { label: "Role", valueHtml: "Solo, idea through ship" },
    ],
    toggleOpenLabel: "See the routines",
    bucket: "workflows",
    detail: [
      {
        kind: "p",
        html: "These are the ones I run on my personal projects. The rest of my routines are work-side and stay off this site.",
      },
      { kind: "h4", text: "Scheduled routines" },
      {
        kind: "ul",
        items: [
          "<strong>Weekly lint</strong> <span class=\"routine-cron\">Weekly</span><br/><span>Runs across my repos every week and surfaces lint and format drift before it stacks up. Cleans the small stuff so it never becomes a half-day chore.</span>",
          "<strong>VGC monthly chaos refresh</strong> <span class=\"routine-cron\">Monthly</span><br/><span>Refreshes the chaos-stats data feeding VGC Team Report. Pulls the latest Pokémon Showdown usage stats, processes them, and updates the site so every team report stays current with the meta.</span>",
          "<strong>Linear queue drain</strong> <span class=\"routine-cron\">Recurring</span><br/><span>Drains the VGC Team Report Linear inbox. Triages incoming bug reports, feature requests, and player feedback into the right lanes so nothing gets lost.</span>",
          "<strong>Meeting prep briefing</strong> <span class=\"routine-cron\">Daily</span><br/><span>Reads my Google Calendar at the start of the day. For every meeting on the agenda it drafts a short brief: what the meeting is about, what I should be prepped for, what I want to say, what to ask. I open the day with the briefs already waiting, not assembled in the five minutes before each call.</span>",
        ],
      },
      { kind: "h4", text: "Why bother" },
      {
        kind: "p",
        html: "Each one is a job I'd otherwise put off until Sunday evening. Once it's scheduled, it happens. The hours that used to go on chores now go on the projects on this page.",
      },
    ],
  },

  // ── 05 — VGC MCP ──────────────────────────────────────────────────────
  {
    id: "entry-mcp",
    folio: "05",
    title: "VGC MCP",
    titleHref: "https://github.com/MSS23/vgc-mcp",
    tag: "Live · 1,199 tests",
    description:
      "A Model Context Protocol server that extends Claude into competitive Pokémon VGC. 200+ tools spanning damage maths, EV optimisation, team analysis, and speed control, all anchored to Smogon's 4096-scale damage formula. One calc engine, two format systems (mainline VGC and Pokémon Champions Reg MA), with the regulation auto-detected from any team you paste.",
    meta: [
      { label: "Stack", valueHtml: "Python 3.13, FastMCP, Pydantic, hosted on Render" },
      { label: "How I use it", valueHtml: "Claude Desktop, daily, for damage &amp; survival maths" },
      { label: "Role", valueHtml: "Solo, design through deploy" },
      { label: "Link", valueHtml: linkHtml("https://github.com/MSS23/vgc-mcp", "github.com/MSS23/vgc-mcp") },
    ],
    toggleOpenLabel: "See what it can do",
    bucket: "workflows",
    detail: [
      { kind: "h4", text: "What this is" },
      {
        kind: "p",
        html: "VGC is one of the most analytically dense competitive games in existence: damage rolls, EV spreads, speed tiers, and format legality across five regulations. Players normally context-switch between Showdown, Smogon, the damage calculator, and Pikalytics to make a single decision. The MCP server collapses that into a conversational interface inside Claude. Ask \"does my Flutter Mane OHKO Incineroar in rain?\" or \"design a spread for Ogerpon-Hearthflame that survives Urshifu, Flutter Mane, and Chi-Yu\" and you get a Showdown-ready paste back with the maths transparent.",
      },
      {
        kind: "stat-row",
        stats: [
          { num: "200+", label: "tools available" },
          { num: "1,199", label: "passing tests, 0 failing" },
          { num: "2", label: "format systems, one calc engine" },
        ],
      },
      { kind: "h4", text: "What I actually use it for" },
      {
        kind: "p",
        html: "Damage and survival maths, in Claude Desktop. It saves me opening Showdown's calc and re-entering the same context every time.",
      },
      {
        kind: "ul",
        items: [
          "<strong>\"Can my Iron Hands survive a +1 Calyrex-Shadow Astral Barrage?\"</strong><br/><span>Plain question, instant answer with the exact rolls and the EV spread that gets me over the line. The thing I reach for ten times a session.</span>",
          "<strong>\"What's the min HP/SpD to live this hit at +1?\"</strong><br/><span>Tells me the breakpoint and the EV cost. Saves me the spreadsheet.</span>",
        ],
      },
      { kind: "h4", text: "What else is in there" },
      {
        kind: "p",
        html: "The full surface covers damage calculations, EV optimisation, team analysis, speed control, meta intelligence, game planning, and format legality across Reg F / G / H / I plus Pokémon Champions Reg MA. I lean hardest on the damage maths layer day-to-day; the rest is in there for when I need it, with tests to back it up.",
      },
      { kind: "h4", text: "How rigorous is the maths" },
      {
        kind: "p",
        html: "The Gen 9 damage formula is implemented to Smogon's full 4096-scale modifier chain. Multipliers are stored as integers (4915 for a 1.2× boost, for example) so the server matches Showdown's calc bit-for-bit, not as a rounded approximation. The test suite pins specific 4096-scale values rather than ranges, with regression tests for real production bugs (like a guard that prevents Prankster Pokémon from being misread as having Fake Out). 1,199 tests passing, 0 failing, 51% line coverage across roughly 18k lines of code.",
      },
      { kind: "h4", text: "Architecture" },
      {
        kind: "ul",
        items: [
          "Python 3.13, FastMCP, async via httpx, validated with Pydantic v2",
          "Damage engine ported from Showdown's 4096-scale Gen 9 formula, multiplier-by-multiplier",
          "One calc engine, two format systems (mainline VGC and Pokémon Champions Reg MA), with the regulation auto-detected from team contents",
          "Pure functions in <code>calc/</code>, side effects only at the boundaries. Cacheable, testable, parallelisable",
          "Hosted on Render, kept warm by a 14-minute keep-alive ping so the first cold call doesn't time out",
        ],
      },
      { kind: "h4", text: "See it in use" },
      {
        kind: "p",
        html: "A real Claude conversation using the server for the damage and survival maths described above: <a href=\"https://claude.ai/share/747d7985-376d-4bc4-8afc-83f4cd30b6ce\" target=\"_blank\" rel=\"noopener noreferrer\">claude.ai/share/747d7985 ↗</a>",
      },
      { kind: "h4", text: "Why it's open" },
      {
        kind: "p",
        html: "I built it for myself first. Once I noticed I was relying on it daily, opening it up made sense. The repo is on GitHub; install instructions are in the README.",
      },
    ],
  },

  // ── 06 — Oddono's ─────────────────────────────────────────────────────
  {
    id: "entry-oddonos",
    folio: "06",
    title: "Oddono's · Brand site demo",
    titleHref: "https://oddonos-gelati-demo.vercel.app/",
    tag: "Demo · 7 pages",
    description:
      "A seven-page static site I built for Oddono's, a gelato shop I love. Wholesale page, store finder, loyalty programme, the lot. The production version still needs real photography and proper form handling. The demo is live and clickable.",
    lead: {
      src: "/assets/work/oddonos/home.png",
      alt: "Oddono's home page. Editorial hero, product story, and shop locator entry.",
      href: "https://oddonos-gelati-demo.vercel.app/",
    },
    meta: [
      { label: "Stack", valueHtml: "HTML, CSS, vanilla JavaScript" },
      { label: "Pages", valueHtml: "Home, About, Shops, Wholesale, Reviews, Contact, Loyalty" },
      { label: "Role", valueHtml: "Solo, design and build" },
      { label: "Link", valueHtml: linkHtml("https://oddonos-gelati-demo.vercel.app/", "oddonos-gelati-demo.vercel.app") },
    ],
    bucket: "brand",
    detail: [
      { kind: "h4", text: "What this is" },
      {
        kind: "p",
        html: "A seven-page brand site for a gelato shop I'm fond of. I built it as a portfolio piece, a useful and finished example of how their next site could feel, without the drag of negotiating it as paid work first.",
      },
      { kind: "h4", text: "What's there" },
      {
        kind: "ul",
        items: [
          "<strong>Home.</strong> Hero, product highlights, calls-to-action.",
          "<strong>About.</strong> The family story, the way the gelato is made, the values.",
          "<strong>Shops.</strong> Store finder, sortable by distance from the visitor's location.",
          "<strong>Wholesale.</strong> For cafés and restaurants who want to stock it, with a real intake form.",
          "<strong>Reviews.</strong> Pulled-out testimonials, hand-curated.",
          "<strong>Contact.</strong> Straightforward, with the details a customer needs.",
          "<strong>Loyalty.</strong> The framework for a future digital stamp card.",
        ],
      },
      { kind: "h4", text: "What's interesting under the hood" },
      {
        kind: "ul",
        items: [
          "<strong>Store finder without a map library.</strong> Just lat/lon distance maths and a sortable list. Faster, simpler, no third-party dependency.",
          "<strong>No build step.</strong> Plain HTML/CSS/JS. Deploys in seconds on Vercel.",
          "<strong>Forms are demo-only.</strong> Production would wire them to a real backend with proper validation, anti-spam, and email delivery.",
        ],
      },
      { kind: "h4", text: "A few of the pages" },
      {
        kind: "figure-stack",
        figures: [
          {
            src: "/assets/work/oddonos/flavors.png",
            alt: "Flavours page. Editorial menu with a quick flavour-finder block.",
            caption:
              "<strong>Flavours.</strong> Set up like a menu, not a product grid. A short flavour-finder underneath answers one question and routes you to a match.",
            href: "https://oddonos-gelati-demo.vercel.app/flavors.html",
          },
          {
            src: "/assets/work/oddonos/shops.png",
            alt: "Shops page. Sortable list of all seven shop locations.",
            caption:
              "<strong>Shops.</strong> A list, not a map. Sorts by distance from the visitor's location with one click. No third-party map library, no API key, instant load.",
            href: "https://oddonos-gelati-demo.vercel.app/shops.html",
          },
          {
            src: "/assets/work/oddonos/wholesale.png",
            alt: "Wholesale page. Pitch and intake form for restaurants and cafés.",
            caption:
              "<strong>Wholesale.</strong> Pitch above the fold, intake form below. The page a buyer for a restaurant or hotel actually needs to read.",
            href: "https://oddonos-gelati-demo.vercel.app/wholesale.html",
          },
        ],
      },
      { kind: "h4", text: "Status" },
      {
        kind: "p",
        html: "Live and clickable as a demo. The production version is pending real photography, copy review, and form handling. None of it hard work, just decisions for the owner to make.",
      },
    ],
  },
];
