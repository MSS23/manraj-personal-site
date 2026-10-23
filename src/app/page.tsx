import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Colophon } from "@/components/Colophon";
import { Contact } from "@/components/Contact";
import { Expertise } from "@/components/Expertise";
import { Figures, Hero } from "@/components/Hero";
import { Masthead } from "@/components/Masthead";
import { Reveal } from "@/components/Reveal";
import { Work } from "@/components/Work";
import { Writing } from "@/components/Writing";
import { liveStats } from "@/lib/live";

export default async function HomePage() {
  const live = await liveStats();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Masthead />
      <main id="main">
        <Hero live={live} />
        <Reveal><About /></Reveal>
        <Reveal><Figures live={live} /></Reveal>
        <Reveal><Work live={live} /></Reveal>
        <Reveal><Expertise /></Reveal>
        <Reveal><Approach /></Reveal>
        <Reveal><Writing /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Colophon />
    </>
  );
}
