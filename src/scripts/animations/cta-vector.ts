/**
 * CTA vector — scroll-linked rise (every CtaBanner; lead 2026-09-30).
 *
 * The decorative vector starts a bit lower (clipped by the banner's
 * `overflow: hidden`) and rises to its resting position as the banner
 * scrolls into view; scrolling back up reverses it (scrubbed).
 *
 * Markup contract (CtaBanner.astro): img[data-cta-vector] inside `.c-cta`.
 *
 * No JS / reduced motion: the vector sits at its resting position.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* TODO: DS — offset and smoothing are proposals (no motion spec). */
const START_OFFSET_PERCENT = 15;
const SCRUB_SMOOTHING = 1;

export function initCtaVector(): void {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    document.querySelectorAll<HTMLElement>("[data-cta-vector]").forEach((vector) => {
      const banner = vector.closest<HTMLElement>(".c-cta") ?? vector;
      gsap.fromTo(
        vector,
        { yPercent: START_OFFSET_PERCENT },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: banner,
            start: "top bottom",
            end: "bottom bottom",
            scrub: SCRUB_SMOOTHING,
          },
        },
      );
    });
  });
}
