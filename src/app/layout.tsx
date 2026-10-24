import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import "./notes.css";
import { SOCIALS } from "@/components/FollowRow";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manrajssidhu.com"),
  title: "Manraj Sidhu · AI engineer",
  description:
    "Manraj Sidhu, AI engineer. Agents, MCP servers, automation pipelines and shipped products built with Claude, MCP and n8n, plus the reels and notes on how they were made.",
  authors: [{ name: "Manraj Sidhu" }],
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    title: "Manraj Sidhu · AI engineer",
    description:
      "AI engineer. Agents, MCP servers, automation pipelines and shipped products built with Claude, MCP and n8n.",
    type: "website",
    url: "https://manrajssidhu.com",
    images: [
      {
        url: "https://manrajssidhu.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manraj Sidhu, AI engineer. Agents, automations and products.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manraj Sidhu · AI engineer",
    description:
      "AI engineer. Agents, MCP servers, automation pipelines and shipped products built with Claude, MCP and n8n.",
    images: ["https://manrajssidhu.com/assets/og-image.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23fbfbfa'/%3E%3Ctext x='50' y='72' text-anchor='middle' font-size='72' font-family='Georgia,serif' fill='%231b2230'%3EM%3C/text%3E%3C/svg%3E",
  },
};

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manraj Sidhu",
  url: "https://manrajssidhu.com",
  image: "https://manrajssidhu.com/assets/portrait.webp",
  jobTitle: "AI engineer",
  description: "Builds agents, MCP servers, automation pipelines and products with Claude, MCP and n8n. Competes in Pokémon VGC.",
  sameAs: SOCIALS.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
