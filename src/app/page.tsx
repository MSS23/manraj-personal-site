import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Colophon } from "@/components/Colophon";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Masthead } from "@/components/Masthead";
import { Work } from "@/components/Work";
import { Writing } from "@/components/Writing";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <hr className="rule" data-ornament="❦" />
        <Approach />
        <hr className="rule" data-ornament="❦" />
        <Work />
        <hr className="rule" data-ornament="✦" />
        <Writing />
        <hr className="rule" data-ornament="✦" />
        <Contact />
      </main>
      <Colophon />
    </>
  );
}
