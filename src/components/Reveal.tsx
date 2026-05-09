import type { ReactNode } from "react";

// Server component: just wraps children in a div with the `.reveal` class.
// All animation lives in CSS and uses `animation-timeline: view()` where
// supported, falling back to always-visible. No JS, no hydration risk.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`.trim()}>{children}</div>;
}
