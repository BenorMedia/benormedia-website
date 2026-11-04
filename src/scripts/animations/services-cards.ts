/**
 * Services cards — in-view trigger for touch devices and phones (lead
 * 2026-10-30).
 *
 * On pointer devices ≥768 the cards' hover motion is CSS only (`:hover`
 * in Services.astro). Elsewhere there is no hover, so each card gets
 * `is-active` while it is in view and loses it when it leaves; the CSS
 * runs the same motion from that class.
 *
 * Markup contract (Services.astro): section[data-c-services] containing
 * [data-c-services-card]. `is-enhanced` on the section switches touch
 * devices from the no-JS end state to the in-view trigger.
 *
 * Reduced motion: nothing is added, so touch devices keep the end state.
 */
const TOUCH = "(hover: none), (max-width: 767px)";
const REDUCED = "(prefers-reduced-motion: reduce)";
/* TODO: DS — no motion spec; share of the card in view that starts it. */
const THRESHOLD = 0.35;

export function initServicesCards(): void {
  const roots = document.querySelectorAll<HTMLElement>("[data-c-services]");
  if (roots.length === 0 || window.matchMedia(REDUCED).matches) return;

  const touch = window.matchMedia(TOUCH);
  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-c-services-card]"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-active", entry.isIntersecting));
    },
    { threshold: THRESHOLD },
  );

  const setup = (): void => {
    observer.disconnect();
    cards.forEach((card) => card.classList.remove("is-active"));
    if (!touch.matches) {
      roots.forEach((root) => root.classList.remove("is-enhanced"));
      return;
    }
    // Cards already on screen keep their end state, so nothing replays on load.
    cards.forEach((card) => {
      const box = card.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) card.classList.add("is-active");
      observer.observe(card);
    });
    roots.forEach((root) => root.classList.add("is-enhanced"));
  };

  setup();
  touch.addEventListener("change", setup);
}
