import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Manraj Sidhu · Personal site",
  description:
    "Manraj Sidhu. Side projects in AI and automation: VGC tools, Claude routines, MCP servers, brand sites.",
  authors: [{ name: "Manraj Sidhu" }],
  openGraph: {
    title: "Manraj Sidhu · Personal site",
    description:
      "Side projects in AI and automation: VGC tools, Claude routines, MCP servers, brand sites.",
    type: "website",
    url: "https://manrajssidhu.com",
    images: [
      {
        url: "https://manrajssidhu.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manraj Sidhu, AI consultant. Side projects, written up plainly.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manraj Sidhu · Personal site",
    description:
      "Side projects in AI and automation: VGC tools, Claude routines, MCP servers, brand sites.",
    images: ["https://manrajssidhu.com/assets/og-image.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23fbfbfa'/%3E%3Ctext x='50' y='72' text-anchor='middle' font-size='72' font-family='Georgia,serif' font-style='italic' fill='%232383e2'%3EM%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
