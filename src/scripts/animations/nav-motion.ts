/**
 * Nav motion — entry animation + hide on scroll down / show on scroll up
 * (CEO revs 2026-09-30).
 *
 * - Entry: on page load the bar slides down from above the viewport to its
 *   position. The pre-state (`html.is-nav-intro`, bar translated off-screen)
 *   is set by an inline <head> script in BaseLayout so the bar never flashes
 *   in place before this module runs; that script also removes the class
 *   after a timeout, so the bar shows even if this module never loads.
 * - Scroll: scrolling down (past the bar's own height) slides it up out of
 *   view; scrolling up slides it back to the scrolled position (`top: 1rem`,
 *   Nav.astro `is-scrolled`). Back near the top it always shows.
 * - Never hides while the Services dropdown is open or focus is inside the
 *   bar (keyboard users tabbing into it bring it back).
 * - Reduced motion: no entry, no hiding; the bar stays sticky.
 *
 * GSAP owns the bar's transform; Nav.astro excludes transform from its CSS
 * transition so the two never fight.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INTRO_CLASS = "is-nav-intro";
/* Durations: lead 2026-09-30. TODO: DS easing — power3.out ≈ --ease-smooth. */
const ENTRY_DURATION = 1;
const TOGGLE_DURATION = 1;
const EASE = "power3.out";

/** Fully off-screen: its own height + the 1rem `is-scrolled` top offset. */
const hiddenVars = (): gsap.TweenVars => ({
  yPercent: -100,
  y: -parseFloat(getComputedStyle(document.documentElement).fontSize),
});

let introDone = false;

export function initNavMotion(): void {
  const root = document.documentElement;
  const nav = document.querySelector<HTMLElement>(".c-nav");
  if (!nav) {
    root.classList.remove(INTRO_CLASS);
    return;
  }

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    let isHidden = false;

    const show = (): void => {
      if (!isHidden) return;
      isHidden = false;
      gsap.to(nav, { yPercent: 0, y: 0, duration: TOGGLE_DURATION, ease: EASE, overwrite: true });
    };
    const hide = (): void => {
      if (isHidden) return;
      if (nav.matches(":focus-within") || nav.querySelector(".c-nav__item.is-open")) return;
      isHidden = true;
      gsap.to(nav, { ...hiddenVars(), duration: TOGGLE_DURATION, ease: EASE, overwrite: true });
    };

    if (!introDone) {
      introDone = true;
      gsap.set(nav, hiddenVars());
      root.classList.remove(INTRO_CLASS);
      gsap.to(nav, { yPercent: 0, y: 0, duration: ENTRY_DURATION, ease: EASE });
    }

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.scroll() <= nav.offsetHeight) show();
        else if (self.direction === 1) hide();
        else show();
      },
    });

    nav.addEventListener("focusin", show);
    return () => nav.removeEventListener("focusin", show);
  });

  // Reduced motion: drop the pre-state immediately (the inline script skips
  // it under reduced motion, this covers a preference change mid-load).
  root.classList.remove(INTRO_CLASS);
}
