import type { Config } from "tailwindcss";

// Utilities mirror the Hallmark tokens in src/app/tokens.css; the CSS variables are the source of truth.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-2": "var(--color-paper-2)",
        "paper-3": "var(--color-paper-3)",
        ink: "var(--color-ink)",
        "ink-2": "var(--color-ink-2)",
        muted: "var(--color-muted)",
        rule: "var(--color-rule)",
        accent: "var(--color-accent)",
        "accent-ink": "var(--color-accent-ink)",
        focus: "var(--color-focus)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: { content: "var(--container)" },
    },
  },
  plugins: [],
};

export default config;
