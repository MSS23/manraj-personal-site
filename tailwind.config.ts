import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#fbfbfa",
        "bg-elevated": "#ffffff",
        "bg-soft": "#f7f6f3",
        "bg-hover": "#f1f1ef",
        "bg-deep": "#f4f3ef",
        text: "#37352f",
        "text-muted": "#787774",
        "text-faint": "#9b9a97",
        border: "#ededec",
        "border-strong": "#d6d5d2",
        accent: "#2383e2",
        "accent-hover": "#1768b0",
        "accent-text": "#337ea9",
        "accent-soft": "#e7f3f8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Times New Roman", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      maxWidth: { content: "1180px" },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(.2,.7,.2,1) both",
        marquee: "marquee 64s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
