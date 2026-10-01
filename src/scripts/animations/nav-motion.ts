/**
 * Nav motion — entry animation, hide on scroll down / show on scroll up, and
 * the scrolled state (CEO revs 2026-09-30; scroll sequence lead 2026-09-30,
 * revised 2026-10-01).
 *
 * - Entry: on page load the bar slides down from above the viewport to its
 *   position. The pre-state (`html.is-nav-intro`, bar translated off-screen)
 *   is set by an inline <head> script in BaseLayout so the bar never flashes
 *   in place before this module runs; that script also removes the class
 *   after a timeout, so the bar shows even if this module never loads.
 * - Three states:
 *   - `flow` (at the top of the page): `is-flow` makes the bar
 *     `position: relative`, so it scrolls away natively with the page, like
 *     a normal header (lead 2026-10-01: the sticky bar stood still for a
 *     moment on the first scroll before it hid, so it looked like it moved
 *     down). Same slot in the layout as sticky, so switching never shifts
 *     the page. Once the page has scrolled past the bar it is off-screen →
 *     `hidden` (sticky again, translated above the viewport) with
 *     `is-scrolled` for the way back. Scrolling back up while still in
 *     `flow` brings it back with the page.
 *   - `shown`: floating at `top: 1rem` with the solid bar (`is-scrolled`,
 *     Nav.astro styles). Scrolling down hides it.
 *   - `hidden`: above the viewport. Scrolling up shows it.
 *   Hide / show: 0.3s linear (lead 2026-10-01; was 1s power3.out). Back at
 *   the very top (scroll 0) the bar returns to `flow` and drops
 *   `is-scrolled`. Loaded mid-page: starts `shown`.
 * - Near the top (lead 2026-10-01: `top: 1rem` → 0 showed as a jump when
 *   the bar came back on the way up and the page reached the top):
 *   `is-near-top` while the scroll is within the top 10% of a screen
 *   (NEAR_TOP_VIEWPORTS × the viewport height) drops the 1rem offset
 *   (Nav.astro): a floating bar glides up 1rem (CSS transition) just
 *   before the top instead of at it, and one that shows up inside the zone
 *   is already at `top: 0`, so the switch to `flow` at the top changes
 *   nothing. Above the zone the bar always floats 1rem from the top.
 * - Never hides while the Services dropdown is open (by click or by hover)
 *   or focus is inside the bar (keyboard users tabbing into it bring it back);
 *   in `flow` it then stays sticky at the top instead of moving with the page.
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
const FLOW_CLASS = "is-flow";
const NEAR_TOP_CLASS = "is-near-top";
/** px from the top that still count as "at the top". */
const SCROLL_THRESHOLD = 4;
/** Near-top zone, in viewport heights: 10% of a screen (lead 2026-10-01). */
const NEAR_TOP_VIEWPORTS = 0.1;
/* Entry: lead 2026-09-30. TODO: DS easing — power3.out ≈ --ease-smooth. */
const ENTRY_DURATION = 1;
const EASE = "power3.out";
/* Hide / show on scroll: 0.3s linear, lead 2026-10-01. */
const TOGGLE_DURATION = 0.3;
const TOGGLE_EASE = "none";

type NavState = "flow" | "shown" | "hidden";

/** Fully off-screen: its own height + the 1rem `is-scrolled` top offset. */
const hiddenVars = (): gsap.TweenVars => ({
  yPercent: -100,
  y: -remPx(),
});

const atTop = (): boolean => window.scrollY <= SCROLL_THRESHOLD;

const remPx = (): number => parseFloat(getComputedStyle(document.documentElement).fontSize);

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
  const setFlow = (on: boolean): void => {
    nav.classList.toggle(FLOW_CLASS, on);
  };

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    let state: NavState = atTop() ? "flow" : "shown";
    setScrolled(state !== "flow");
    setFlow(state === "flow");

    const setNearTop = (scroll: number): void => {
      nav.classList.toggle(NEAR_TOP_CLASS, scroll < window.innerHeight * NEAR_TOP_VIEWPORTS);
    };
    setNearTop(window.scrollY);

    const isPinned = (): boolean =>
      nav.matches(":focus-within") ||
      nav.querySelector(".c-nav__item.is-open, .c-nav__item.is-has-menu:hover") !== null;

    const show = (): void => {
      if (state === "shown" || (state === "flow" && atTop())) return;
      state = "shown";
      setFlow(false);
      setScrolled(true);
      gsap.to(nav, {
        yPercent: 0,
        y: 0,
        duration: TOGGLE_DURATION,
        ease: TOGGLE_EASE,
        overwrite: true,
      });
    };
    const hide = (): void => {
      if (state !== "shown" || isPinned()) return;
      state = "hidden";
      gsap.to(nav, {
        ...hiddenVars(),
        duration: TOGGLE_DURATION,
        ease: TOGGLE_EASE,
        overwrite: true,
      });
    };
    /** `flow`, scrolled a bit: the page carries the bar until it is gone. */
    const follow = (scroll: number): void => {
      if (isPinned()) {
        setFlow(false);
        if (scroll >= nav.offsetHeight) show();
        return;
      }
      if (scroll >= nav.offsetHeight) {
        // Off-screen now: sticky + translated out, scrolled look for the way
        // back. Both positions are off-screen, so the switch is invisible.
        state = "hidden";
        gsap.set(nav, { ...hiddenVars(), overwrite: true });
        setFlow(false);
        setScrolled(true);
      } else {
        setFlow(true);
      }
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
        setNearTop(scroll);
        // Exactly 0: the only scroll where the sticky (top 0) and the resting
        // bar sit in the same spot, so the switch never shows a step.
        if (scroll <= 0) {
          if (state !== "flow") {
            state = "flow";
            setScrolled(false);
            setFlow(true);
            gsap.to(nav, {
              yPercent: 0,
              y: 0,
              duration: TOGGLE_DURATION,
              ease: TOGGLE_EASE,
              overwrite: true,
            });
          } else {
            follow(scroll);
          }
        } else if (state === "flow") follow(scroll);
        else if (self.direction === 1) hide();
        else show();
      },
    });

    nav.addEventListener("focusin", show);
    return () => {
      nav.removeEventListener("focusin", show);
      setFlow(false);
      nav.classList.remove(NEAR_TOP_CLASS);
    };
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
