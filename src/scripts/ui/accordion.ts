/**
 * Accordion — smooth open / close for `FaqAccordion` (`<details>` rows).
 *
 * `initAccordion(root)` takes a `.c-faq` element. Idempotent: calling it again
 * on the same root returns the same controller, so `FaqAccordion` and
 * `FaqSection` can both use it.
 *
 * - Summary click / Enter / Space: the `<details>` height animates between
 *   the summary height and the full height (Web Animations API) and the
 *   answer fades in / out. The `+` icon rotation is a CSS transition; the
 *   item gets `is-closing` while it collapses so the icon turns back at once.
 * - One open item at a time: the markup uses `<details name>` (native
 *   exclusive accordion without JS). The browser would close the other item
 *   instantly, so on init the `name` moves to `data-accordion-name` and this
 *   script closes the open sibling with the same animation.
 * - Timing: `--duration-hover` + `--ease-smooth` (tokens.css).
 * - Reduced motion: no animation, instant toggle (same exclusivity).
 * - No JS: native `<details>` behavior, nothing here runs.
 *
 * Controller: `open(item, animate)` opens an item (and closes the others),
 * e.g. FaqSection opening the first question of a group (P-12).
 */
export interface AccordionController {
  open: (item: HTMLDetailsElement, animate?: boolean) => void;
}

const controllers = new WeakMap<HTMLElement, AccordionController>();

function motionSettings(): { duration: number; easing: string } {
  const styles = getComputedStyle(document.documentElement);
  const raw = styles.getPropertyValue("--duration-hover").trim();
  const value = Number.parseFloat(raw);
  const duration = Number.isFinite(value) ? (raw.endsWith("ms") ? value : value * 1000) : 400;
  const easing = styles.getPropertyValue("--ease-smooth").trim() || "ease-out";
  return { duration, easing };
}

export function initAccordion(root: HTMLElement): AccordionController {
  const existing = controllers.get(root);
  if (existing) return existing;

  const items = Array.from(root.querySelectorAll<HTMLDetailsElement>("details.c-faq__item"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const running = new WeakMap<HTMLDetailsElement, Animation[]>();

  // Take over exclusivity so the sibling can animate closed.
  for (const item of items) {
    const name = item.getAttribute("name");
    if (name) {
      item.dataset["accordionName"] = name;
      item.removeAttribute("name");
    }
  }

  const summaryOf = (item: HTMLDetailsElement): HTMLElement | null =>
    item.querySelector<HTMLElement>(":scope > summary");
  const answerOf = (item: HTMLDetailsElement): HTMLElement | null =>
    item.querySelector<HTMLElement>(":scope > .c-faq__answer");

  const stop = (item: HTMLDetailsElement): void => {
    running.get(item)?.forEach((animation) => animation.cancel());
    running.delete(item);
  };

  const finish = (item: HTMLDetailsElement): void => {
    running.delete(item);
    item.style.height = "";
    item.style.overflow = "";
    item.classList.remove("is-closing");
  };

  const collapse = (item: HTMLDetailsElement, animate: boolean): void => {
    if (!item.open) return;
    const summary = summaryOf(item);
    if (!animate || !summary) {
      stop(item);
      item.open = false;
      finish(item);
      return;
    }
    const from = item.offsetHeight;
    stop(item);
    const { duration, easing } = motionSettings();
    item.classList.add("is-closing");
    item.style.overflow = "hidden";
    const height = item.animate(
      { height: [`${from}px`, `${summary.offsetHeight}px`] },
      { duration, easing },
    );
    const answer = answerOf(item);
    const fade = answer?.animate({ opacity: [1, 0] }, { duration: duration / 2, easing, fill: "forwards" });
    running.set(item, fade ? [height, fade] : [height]);
    height.onfinish = () => {
      item.open = false;
      fade?.cancel();
      finish(item);
    };
  };

  const expand = (item: HTMLDetailsElement, animate: boolean): void => {
    const summary = summaryOf(item);
    const wasClosing = running.has(item) && item.classList.contains("is-closing");
    if (item.open && !wasClosing) return;
    const from = item.offsetHeight;
    stop(item);
    item.classList.remove("is-closing");
    item.open = true;
    if (!animate || !summary) {
      finish(item);
      return;
    }
    const { duration, easing } = motionSettings();
    item.style.overflow = "hidden";
    const to = item.offsetHeight;
    const height = item.animate({ height: [`${from}px`, `${to}px`] }, { duration, easing });
    const answer = answerOf(item);
    const fade = answer?.animate({ opacity: [0, 1] }, { duration, easing });
    running.set(item, fade ? [height, fade] : [height]);
    height.onfinish = () => finish(item);
  };

  const open = (item: HTMLDetailsElement, animate = true): void => {
    const move = animate && !reduceMotion.matches;
    const group = item.dataset["accordionName"];
    for (const other of items) {
      if (other !== item && other.open && other.dataset["accordionName"] === group) {
        collapse(other, move);
      }
    }
    expand(item, move);
  };

  for (const item of items) {
    const summary = summaryOf(item);
    summary?.addEventListener("click", (event) => {
      event.preventDefault();
      const closing = item.classList.contains("is-closing");
      if (item.open && !closing) collapse(item, !reduceMotion.matches);
      else open(item);
    });
  }

  const controller: AccordionController = { open };
  controllers.set(root, controller);
  return controller;
}
