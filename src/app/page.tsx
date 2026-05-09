import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Colophon } from "@/components/Colophon";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Masthead } from "@/components/Masthead";
import { Reveal } from "@/components/Reveal";
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
        <Reveal><About /></Reveal>
        <Reveal><hr className="rule" data-ornament="❦" /></Reveal>
        <Reveal><Approach /></Reveal>
        <Reveal><hr className="rule" data-ornament="❦" /></Reveal>
        <Reveal><Work /></Reveal>
        <Reveal><hr className="rule" data-ornament="✦" /></Reveal>
        <Reveal><Writing /></Reveal>
        <Reveal><hr className="rule" data-ornament="✦" /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Colophon />
    </>
  );
}
