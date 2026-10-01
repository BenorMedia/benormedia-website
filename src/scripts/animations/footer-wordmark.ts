/**
 * Footer wordmark — subtle move-in on scroll into view (every page; CEO
 * request, motion chosen by the orchestrator 2026-09-30, lead to QA).
 *
 * The wordmark is already cropped by its strip (`overflow: hidden`, bottom
 * edge), so it rises out of that edge: starts 35% lower and transparent,
 * settles into place when the strip is 85% up the viewport — clamped to the
 * page's maximum scroll, so it still fires when the strip can never get that
 * high (short mobile pages: it used to stay invisible). Plays once
 * (no replay on scroll back) so it stays a quiet sign-off, not a loop.
 *
 * Markup contract (Footer.astro): img[data-footer-wordmark] inside
 * `.c-footer__wordmark-strip`.
 *
 * No JS / reduced motion: the wordmark sits in place, fully visible.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* TODO: DS — no motion spec; values proposed by the orchestrator. */
const START_OFFSET_PERCENT = 35;
const DURATION = 1.2;
const EASE = "power3.out";

export function initFooterWordmark(): void {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    document.querySelectorAll<HTMLElement>("[data-footer-wordmark]").forEach((wordmark) => {
      const strip = wordmark.closest<HTMLElement>(".c-footer__wordmark-strip") ?? wordmark;
      gsap.from(wordmark, {
        yPercent: START_OFFSET_PERCENT,
        opacity: 0,
        duration: DURATION,
        ease: EASE,
        scrollTrigger: {
          trigger: strip,
          start: "clamp(top 85%)",
          once: true,
        },
      });
    });
  });
}
