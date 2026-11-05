/**
 * Testimonials shapes — subtle scroll parallax (Testimonials page; lead
 * 2026-11-05).
 *
 * The two background shape images drift vertically while the grid section is
 * on screen, scrubbed to the scroll in both directions. Each image's
 * `data-testimonials-shape` value is its direction (1 = drifts down relative
 * to the page, -1 = up), so the two copies move against each other.
 *
 * Markup contract (TestimonialsGrid.astro): img[data-testimonials-shape]
 * inside `.c-testimonials-grid`.
 *
 * No JS / reduced motion: the images stay at their CSS position.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* TODO: DS — no motion spec. Travel in % of the image's own height, each
   way from rest; kept small so the effect stays subtle. */
const TRAVEL_PERCENT = 8;
const SCRUB_SMOOTHING = 1;

export function initTestimonialsShapes(): void {
  const shapes = document.querySelectorAll<HTMLElement>("[data-testimonials-shape]");
  if (shapes.length === 0) return;

  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    shapes.forEach((shape) => {
      const direction = Number(shape.dataset["testimonialsShape"]) || 1;
      const section = shape.closest<HTMLElement>(".c-testimonials-grid") ?? shape;
      gsap.fromTo(
        shape,
        { yPercent: -TRAVEL_PERCENT * direction },
        {
          yPercent: TRAVEL_PERCENT * direction,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: SCRUB_SMOOTHING,
          },
        },
      );
    });
  });
}
