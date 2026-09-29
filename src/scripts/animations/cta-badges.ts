/**
 * CTA banner — rotating client badges.
 *
 * Every 5s the group of client circles fades out, the next 6 badges are
 * swapped in, and the group fades back in. Badges are drawn from a shuffled
 * deck, so every badge is shown before any repeats; the deck is reshuffled
 * when it runs out. The "+" circle is not part of the rotation.
 *
 * Markup contract (CtaBanner.astro):
 *   [data-cta-badges='["url", ...]']     root, JSON array of every badge URL
 *     [data-cta-badges-group]            element that fades (CSS `is-fading`)
 *       img[data-cta-badge] × 6          circles whose `src` is swapped
 *
 * No JS / reduced motion: the server-rendered first 6 badges stay visible.
 */
const INTERVAL_MS = 5000;
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

function initRoot(root: HTMLElement): void {
  const group = root.querySelector<HTMLElement>("[data-cta-badges-group]");
  const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("[data-cta-badge]"));
  let pool: string[] = [];
  try {
    pool = JSON.parse(root.dataset.ctaBadges ?? "[]") as string[];
  } catch {
    return;
  }
  const count = imgs.length;
  if (!group || count === 0 || pool.length <= count) return;

  let current = imgs.map((img) => img.getAttribute("src") ?? "");
  let deck = shuffle(pool.filter((src) => !current.includes(src)));

  const draw = (): string[] => {
    if (deck.length < count) {
      // Refill with everything not on screen and not already queued.
      const rest = shuffle(pool.filter((src) => !current.includes(src) && !deck.includes(src)));
      deck = deck.concat(rest);
    }
    return deck.splice(0, count);
  };

  let busy = false;
  const rotate = async () => {
    if (busy || document.hidden) return;
    busy = true;
    const next = draw();
    await Promise.all(next.map(preload));
    group.classList.add("is-fading");
    await waitForFade(group);
    imgs.forEach((img, i) => {
      const src = next[i];
      if (src) img.src = src;
    });
    current = next;
    group.classList.remove("is-fading");
    busy = false;
  };

  window.setInterval(rotate, INTERVAL_MS);
}

export function initCtaBadges(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll<HTMLElement>("[data-cta-badges]").forEach(initRoot);
}
