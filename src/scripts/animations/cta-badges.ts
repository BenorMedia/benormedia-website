/**
 * CTA badges — rotating client circles (every CTA on the site).
 *
 * One circle changes at a time (lead, 2026-09-29): after a random 1.5–2.5s
 * delay, a random position (never the same one twice in a row) crossfades
 * to the next badge: a copy of its image with the new `src` is stacked on
 * top, fades + scales in (CSS `is-entering` → `is-in`), then the old image
 * is removed, so the circle is never empty. Badges are drawn from a shuffled
 * deck of the ones not on screen, so there are no duplicates in the group
 * and every badge shows before any repeats; the deck refills when it runs
 * out. The "+" circle is not part of the rotation.
 *
 * Markup contract (CtaActions.astro):
 *   [data-cta-badges='["url", ...]']     root, JSON array of every badge URL
 *     [data-cta-badges-group]            the rotating circles' wrapper
 *       [data-cta-badge] × 6             slots (positioned), each holding
 *         img.c-cta__badge-circle        the current badge
 *
 * No JS / reduced motion: the server-rendered first 6 badges stay visible.
 */
const DELAY_MIN_MS = 1500;
const DELAY_MAX_MS = 2500;
const FADE_FALLBACK_MS = 1200;

function shuffle<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

async function preload(src: string): Promise<void> {
  const img = new Image();
  img.src = src;
  try {
    await img.decode();
  } catch {
    // Broken image: swap anyway, the <img> just won't paint.
  }
}

const nextFrame = (): Promise<void> =>
  new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

function waitForFade(el: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const done = () => {
      el.removeEventListener("transitionend", done);
      resolve();
    };
    el.addEventListener("transitionend", done, { once: true });
    window.setTimeout(done, FADE_FALLBACK_MS);
  });
}

const randomDelay = (): number => DELAY_MIN_MS + Math.random() * (DELAY_MAX_MS - DELAY_MIN_MS);

function initRoot(root: HTMLElement): void {
  const slots = Array.from(root.querySelectorAll<HTMLElement>("[data-cta-badge]"));
  const currentImg = (slot: HTMLElement): HTMLImageElement | null =>
    slot.querySelector<HTMLImageElement>("img:not(.is-entering)");
  let pool: string[] = [];
  try {
    pool = JSON.parse(root.dataset.ctaBadges ?? "[]") as string[];
  } catch {
    return;
  }
  const count = slots.length;
  if (count === 0 || pool.length <= count) return;

  const onScreen = (): string[] => slots.map((slot) => currentImg(slot)?.getAttribute("src") ?? "");
  let deck = shuffle(pool.filter((src) => !onScreen().includes(src)));

  const draw = (): string | undefined => {
    const visible = onScreen();
    deck = deck.filter((src) => !visible.includes(src));
    if (deck.length === 0) deck = shuffle(pool.filter((src) => !visible.includes(src)));
    return deck.shift();
  };

  let lastIndex = -1;
  const pickIndex = (): number => {
    if (count === 1) return 0;
    let index = Math.floor(Math.random() * count);
    if (index === lastIndex) index = (index + 1 + Math.floor(Math.random() * (count - 1))) % count;
    lastIndex = index;
    return index;
  };

  const swapOne = async (): Promise<void> => {
    if (document.hidden) return;
    const next = draw();
    const slot = slots[pickIndex()];
    const old = slot ? currentImg(slot) : null;
    if (!next || !slot || !old) return;
    await preload(next);
    // Clone keeps the classes, size attributes and Astro scope attribute.
    const incoming = old.cloneNode(false) as HTMLImageElement;
    incoming.classList.add("is-entering");
    incoming.src = next;
    slot.append(incoming);
    await nextFrame();
    incoming.classList.add("is-in");
    await waitForFade(incoming);
    old.remove();
    incoming.classList.remove("is-entering", "is-in");
  };

  const loop = (): void => {
    window.setTimeout(() => {
      void swapOne().finally(loop);
    }, randomDelay());
  };
  loop();
}

export function initCtaBadges(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll<HTMLElement>("[data-cta-badges]").forEach(initRoot);
}
