/**
 * Steps parallax — the comparison migration steps (`ComparisonSteps`; lead
 * comment on the preview 2026-10-23).
 *
 * While the steps scroll through the viewport, the odd cards (1, 3) drift
 * up and the even cards (2, 4) drift down, scrubbed to the scroll in both
 * directions, so the Figma stagger breathes a little. Each card crosses its
 * resting position halfway, when the list is centred in the viewport.
 *
 * Desktop only (≥992px, where the cards sit side by side and staggered):
 * below it they stack and share borders, which any offset would break.
 *
 * Markup contract (ComparisonSteps.astro): ol[data-steps-parallax] whose
 * items hold a `.c-cmp-steps__card`.
 *
 * No JS / reduced motion: cards sit at their resting position.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* TODO: DS — travel and smoothing are proposals (no motion spec): ±10% of
   the card's height (about ±22px at 1440), the CTA vector's smoothing. */
const TRAVEL_PERCENT = 10;
const SCRUB_SMOOTHING = 1;

export function initStepsParallax(): void {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () => {
    document.querySelectorAll<HTMLElement>("[data-steps-parallax]").forEach((list) => {
      list.querySelectorAll<HTMLElement>(".c-cmp-steps__card").forEach((card, i) => {
        // i is 0-based: i = 0, 2 are steps 1, 3 (odd) → bottom to top.
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          card,
          { yPercent: TRAVEL_PERCENT * direction },
          {
            yPercent: -TRAVEL_PERCENT * direction,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top bottom",
              end: "bottom top",
              scrub: SCRUB_SMOOTHING,
            },
          },
        );
      });
    });
  });
}
