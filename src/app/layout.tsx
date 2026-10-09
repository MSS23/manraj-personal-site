import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./notes.css";
import { SOCIALS } from "@/components/FollowRow";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manrajssidhu.com"),
  title: "Manraj Sidhu · AI consultant and builder",
  description:
    "Manraj Sidhu, AI consultant. Agents, automations and tools built with Claude, MCP and n8n, plus the reels and notes on how they were made.",
  authors: [{ name: "Manraj Sidhu" }],
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    title: "Manraj Sidhu · AI consultant and builder",
    description:
      "AI consultant. Agents, automations and tools built with Claude, MCP and n8n for small teams.",
    type: "website",
    url: "https://manrajssidhu.com",
    images: [
      {
        url: "https://manrajssidhu.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manraj Sidhu, AI consultant. Agents and automations for small teams.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manraj Sidhu · AI consultant and builder",
    description:
      "AI consultant. Agents, automations and tools built with Claude, MCP and n8n for small teams.",
    images: ["https://manrajssidhu.com/assets/og-image.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23fbfbfa'/%3E%3Ctext x='50' y='72' text-anchor='middle' font-size='72' font-family='Georgia,serif' font-style='italic' fill='%232383e2'%3EM%3C/text%3E%3C/svg%3E",
  },
};

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manraj Sidhu",
  url: "https://manrajssidhu.com",
  image: "https://manrajssidhu.com/assets/portrait.webp",
  jobTitle: "AI consultant",
  description: "Builds agents, automations and tools with Claude, MCP and n8n. Competes in Pokémon VGC.",
  sameAs: SOCIALS.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
