/**
 * Nav motion — entry animation, hide on scroll down / show on scroll up, and
 * the scrolled state (CEO revs 2026-09-30; scroll sequence lead 2026-09-30).
 *
 * - Entry: on page load the bar slides down from above the viewport to its
 *   position. The pre-state (`html.is-nav-intro`, bar translated off-screen)
 *   is set by an inline <head> script in BaseLayout so the bar never flashes
 *   in place before this module runs; that script also removes the class
 *   after a timeout, so the bar shows even if this module never loads.
 * - Scrolled state (`is-scrolled` on `.c-nav`: `top: 1rem` + the solid bar,
 *   Nav.astro styles) is owned here, so it never shows as a step of its own:
 *   - first scroll down from the top: the bar stays at `top: 0` until it has
 *     scrolled past its own height, then just slides up out of view;
 *   - `is-scrolled` is added while the bar is off-screen (end of the hide),
 *     so scrolling up brings it back already at `top: 1rem`;
 *   - back at the very top (≤ SCROLL_THRESHOLD) `is-scrolled` is removed.
 *   Loaded mid-page: starts in the scrolled state.
 * - Never hides while the Services dropdown is open (by click or by hover)
 *   or focus is inside the bar (keyboard users tabbing into it bring it back).
 * - The entry runs only while the pre-state is still set: if this module
 *   loads after the inline fallback timeout already showed the bar, the bar
 *   stays put (no second slide-in).
 * - Reduced motion: no entry, no hiding; the bar stays sticky and
 *   `is-scrolled` simply follows the scroll position.
 *
 * GSAP owns the bar's transform; Nav.astro excludes transform from its CSS
 * transition so the two never fight.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INTRO_CLASS = "is-nav-intro";
const SCROLLED_CLASS = "is-scrolled";
/** px from the top that still count as "at the top". */
const SCROLL_THRESHOLD = 4;
/* Durations: lead 2026-09-30. TODO: DS easing — power3.out ≈ --ease-smooth. */
const ENTRY_DURATION = 1;
const TOGGLE_DURATION = 1;
const EASE = "power3.out";

/** Fully off-screen: its own height + the 1rem `is-scrolled` top offset. */
const hiddenVars = (): gsap.TweenVars => ({
  yPercent: -100,
  y: -parseFloat(getComputedStyle(document.documentElement).fontSize),
});

const atTop = (): boolean => window.scrollY <= SCROLL_THRESHOLD;

let introDone = false;

export function initNavMotion(): void {
  const root = document.documentElement;
  const nav = document.querySelector<HTMLElement>(".c-nav");
  if (!nav) {
    root.classList.remove(INTRO_CLASS);
    return;
  }

  const setScrolled = (on: boolean): void => {
    nav.classList.toggle(SCROLLED_CLASS, on);
  };

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    let isHidden = false;
    setScrolled(!atTop());

    const show = (): void => {
      if (!isHidden) return;
      isHidden = false;
      // Normally already set at the end of the hide; covers a show that
      // interrupts the hide tween before it completed.
      if (!atTop()) setScrolled(true);
      gsap.to(nav, { yPercent: 0, y: 0, duration: TOGGLE_DURATION, ease: EASE, overwrite: true });
    };
    const hide = (): void => {
      if (isHidden) return;
      if (
        nav.matches(":focus-within") ||
        nav.querySelector(".c-nav__item.is-open, .c-nav__item.is-has-menu:hover")
      ) {
        return;
      }
      isHidden = true;
      gsap.to(nav, {
        ...hiddenVars(),
        duration: TOGGLE_DURATION,
        ease: EASE,
        overwrite: true,
        // Off-screen now: take the scrolled position for the way back.
        onComplete: () => {
          if (isHidden && !atTop()) setScrolled(true);
        },
      });
    };

    if (!introDone && root.classList.contains(INTRO_CLASS)) {
      introDone = true;
      gsap.set(nav, hiddenVars());
      root.classList.remove(INTRO_CLASS);
      gsap.to(nav, { yPercent: 0, y: 0, duration: ENTRY_DURATION, ease: EASE });
    }

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const scroll = self.scroll();
        if (scroll <= SCROLL_THRESHOLD) {
          setScrolled(false);
          show();
        } else if (scroll <= nav.offsetHeight) show();
        else if (self.direction === 1) hide();
        else show();
      },
    });

    nav.addEventListener("focusin", show);
    return () => nav.removeEventListener("focusin", show);
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    const update = (): void => setScrolled(!atTop());
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  });

  // Reduced motion: drop the pre-state immediately (the inline script skips
  // it under reduced motion, this covers a preference change mid-load).
  root.classList.remove(INTRO_CLASS);
}
