import { lazy, useRef } from "react";
import useReveal from "@/hooks/useReveal";
import Nav from "@/sections/Nav";
import Hero from "@/sections/Hero";
import SectionShell from "@/sections/SectionShell";

/**
 * Portfolio — composition root.
 *
 * Strategy:
 *  - Above the fold (Nav + Hero) is rendered eagerly and lives in the main
 *    bundle's index chunk so first paint has zero extra fetches.
 *  - Every other section is `React.lazy`'d and additionally wrapped in
 *    `SectionShell`, which uses IntersectionObserver to gate BOTH chunk
 *    fetch AND component reconciliation until the section is near the
 *    viewport. This gives us:
 *       - a tiny initial JS payload
 *       - instant LCP because Hero is the only thing in the critical path
 *       - progressive hydration as the user scrolls
 *
 *  - `useReveal` is scoped via a body-anchored MutationObserver, so it
 *    picks up `.reveal` elements inside lazy-mounted sections without
 *    re-running on every render.
 */

const About        = lazy(() => import("@/sections/About"));
const Capabilities = lazy(() => import("@/sections/Capabilities"));
const Projects     = lazy(() => import("@/sections/Projects"));
const Journey      = lazy(() => import("@/sections/Journey"));
const Stack        = lazy(() => import("@/sections/Stack"));
const Exploring    = lazy(() => import("@/sections/Exploring"));
const Contact      = lazy(() => import("@/sections/Contact"));
const Footer       = lazy(() => import("@/sections/Footer"));

export default function Portfolio() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <div ref={rootRef} data-reveal-root>
      <Nav />
      <Hero />

      <div className="section-divider" />
      <SectionShell id="about" intrinsicHeight={900}>
        <About />
      </SectionShell>

      <div className="section-divider" />
      <SectionShell id="build" intrinsicHeight={700}>
        <Capabilities />
      </SectionShell>

      <div className="section-divider" />
      <SectionShell id="projects" intrinsicHeight={1600}>
        <Projects />
      </SectionShell>

      <div className="section-divider" />
      <SectionShell id="journey" intrinsicHeight={1400}>
        <Journey />
      </SectionShell>

      <div className="section-divider" />
      <SectionShell id="stack" intrinsicHeight={700}>
        <Stack />
      </SectionShell>

      <div className="section-divider" />
      <SectionShell id="exploring" intrinsicHeight={500}>
        <Exploring />
      </SectionShell>

      <div className="section-divider" />
      <SectionShell id="contact" intrinsicHeight={900}>
        <Contact />
      </SectionShell>

      <SectionShell id="footer" intrinsicHeight={180}>
        <Footer />
      </SectionShell>
    </div>
  );
}
