import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  // New in eslint-config-next 16; existing Masthead/Colophon effects trip it. Warn until refactored.
  { rules: { "react-hooks/set-state-in-effect": "warn" } },
];
