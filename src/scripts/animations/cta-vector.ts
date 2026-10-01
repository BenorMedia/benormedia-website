/**
 * CTA vector — scroll-linked rise (every CtaBanner; lead 2026-09-30).
 *
 * The decorative vector moves with the scroll the whole time the banner is
 * on screen, in both directions (scrubbed parallax; lead 2026-09-30 — it
 * used to move only while the banner entered the viewport): it is lower
 * (clipped by the banner's `overflow: hidden`) when the banner enters at the
 * bottom of the viewport and reaches its resting position as the banner
 * leaves at the top. It never goes above rest, so no gap opens under it
 * (it sits on the banner's bottom edge).
 *
 * Markup contract (CtaBanner.astro): img[data-cta-vector] inside `.c-cta`.
 *
 * No JS / reduced motion: the vector sits at its resting position.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* TODO: DS — offset and smoothing are proposals (no motion spec). 40%
   (lead 2026-10-01: more visible movement; was 20%, 15% before that). */
const START_OFFSET_PERCENT = 40;
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
            end: "bottom top",
            scrub: SCRUB_SMOOTHING,
          },
        },
      );
    });
  });
}
