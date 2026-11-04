/**
 * Testimonial slider — expanding active card in a window of narrow portraits.
 * Markup and CSS: `src/components/ui/TestimonialSlider.astro`.
 *
 * Model
 *   - `active`: index of the open card in the (repeated) card list.
 *   - `slot`:   where the open card sits in the visible window, 0..slots-1.
 *   Every card's place is derived from its signed distance `d` to `active`
 *   (wrapped, so the list loops): cards left of it are narrow and stacked
 *   to the left of `slot`, cards right of it follow the open card.
 *
 *   next / prev: `active` ± 1 and `slot` ± 1, clamped to the window. Inside
 *   the window only widths change (accordion); at the edge the whole row
 *   slides one card. Clicking a portrait opens it where it is.
 *
 * Motion is CSS transitions on `transform` + `width` (the script only writes
 * targets), so fast repeated clicks retarget smoothly from wherever each card
 * is. A card that wraps from one end of the list to the other is moved
 * without a transition; the list is long enough (see MIN_CARDS in the
 * component) that this always happens off-screen.
 *
 * Layout knobs are CSS custom properties on the root (`--ts-slots`,
 * `--ts-start-slot`, `--ts-inactive-w`, `--ts-gap`, `--ts-min-h`,
 * `--ts-photo-min`), so breakpoints live in CSS only. The script writes back
 * `--ts-active-w`, `--ts-h` and `--ts-content-h` (px).
 *
 * Autoplay (as the reference): one step every AUTOPLAY_MS while the slider is
 * on screen, the tab is visible and the pointer / focus is elsewhere. It
 * stops for good on the first interaction, and never runs with reduced
 * motion.
 *
 * Returns a cleanup function.
 */

/* TODO: DS motion — reference uses 3s; longer here so a quote can be read. */
const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD_PX = 40;

export function initTestimonialSlider(root: HTMLElement): () => void {
  const viewport = root.querySelector<HTMLElement>("[data-ts-viewport]");
  const track = root.querySelector<HTMLElement>("[data-ts-track]");
  const probe = root.querySelector<HTMLElement>("[data-ts-probe]");
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-ts-card]"));
  const prevButton = root.querySelector<HTMLButtonElement>("[data-ts-prev]");
  const nextButton = root.querySelector<HTMLButtonElement>("[data-ts-next]");
  if (!viewport || !track || !probe || cards.length === 0) return () => {};

  const count = cards.length;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const abort = new AbortController();
  const { signal } = abort;

  let active = 0;
  let slot = -1; // set on first layout from --ts-start-slot
  let slots = 1;
  let pitch = 0; // narrow card + gap
  let gap = 0;
  let activeWidth = 0;
  const offsets = new Array<number>(count).fill(0);
  let laidOut = false;

  // ---------------------------------------------------------------------------
  // Measurements
  // ---------------------------------------------------------------------------

  const cssVar = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();

  /** Any CSS length (rem, calc…) → px, through a hidden probe element. */
  const toPx = (value: string): number => {
    if (!value) return 0;
    probe.style.width = value;
    return probe.getBoundingClientRect().width;
  };

  const offsetOf = (index: number): number => {
    let d = (((index - active) % count) + count) % count;
    if (d > count / 2) d -= count;
    return d;
  };

  const xOf = (d: number): number => {
    const anchor = slot * pitch;
    if (d < 0) return anchor + d * pitch;
    if (d === 0) return anchor;
    return anchor + activeWidth + gap + (d - 1) * pitch;
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  /** Write every card's target. `instant` skips all transitions (layout, resize). */
  const render = (instant: boolean) => {
    const moves = cards.map((card, i) => {
      const d = offsetOf(i);
      const previous = offsets[i] ?? d;
      offsets[i] = d;
      // Jumped across the loop seam: move without animating.
      return { card, d, wrapped: laidOut && Math.abs(d - previous) > count / 2 };
    });
    const wrapped = moves.filter((m) => m.wrapped).map((m) => m.card);

    if (instant) root.classList.add("is-instant");
    wrapped.forEach((card) => card.classList.add("is-instant"));

    moves.forEach(({ card, d }) => {

      const isActive = d === 0;
      card.classList.toggle("is-active", isActive);
      card.style.width = `${isActive ? activeWidth : pitch - gap}px`;
      card.style.transform = `translate3d(${xOf(d)}px, 0, 0)`;

      // Only the open card is reachable by assistive tech; portraits are
      // previews (their content is also visibility: hidden).
      card.toggleAttribute("aria-hidden", !isActive);
      if (d >= -slot && d <= slots - 1 - slot) card.dataset.visible = "";
      else delete card.dataset.visible;
    });

    if (instant || wrapped.length > 0) {
      void track.offsetWidth; // commit the jump before transitions return
      root.classList.remove("is-instant");
      wrapped.forEach((card) => card.classList.remove("is-instant"));
    }
    laidOut = true;
  };

  const layout = () => {
    const width = viewport.clientWidth;
    if (width === 0) return;

    slots = Math.max(1, Math.round(Number(cssVar("--ts-slots")) || 1));
    gap = toPx(cssVar("--ts-gap"));
    pitch = toPx(cssVar("--ts-inactive-w")) + gap;
    activeWidth = Math.max(0, width - (slots - 1) * pitch);

    if (slot < 0) slot = Math.round(Number(cssVar("--ts-start-slot")) || 0);
    slot = Math.min(Math.max(slot, 0), slots - 1);

    root.style.setProperty("--ts-active-w", `${activeWidth}px`);

    // Every card's content has the open width, so its height is final now.
    let contentHeight = 0;
    cards.forEach((card) => {
      const content = card.querySelector<HTMLElement>("[data-ts-content]");
      if (content) contentHeight = Math.max(contentHeight, content.offsetHeight);
    });
    const height = Math.max(toPx(cssVar("--ts-min-h")), contentHeight + toPx(cssVar("--ts-photo-min")));
    root.style.setProperty("--ts-content-h", `${contentHeight}px`);
    root.style.setProperty("--ts-h", `${Math.ceil(height)}px`);

    render(true);
  };

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const goBy = (step: number) => {
    if (count < 2 || step === 0) return;
    active = (((active + step) % count) + count) % count;
    slot = Math.min(Math.max(slot + step, 0), slots - 1);
    render(false);
  };

  // ---------------------------------------------------------------------------
  // Autoplay
  // ---------------------------------------------------------------------------

  let autoplayStopped = reducedMotion.matches || count < 2;
  let onScreen = false;
  let hovered = false;
  let focused = false;
  let timer: number | undefined;

  const schedule = () => {
    window.clearTimeout(timer);
    timer = undefined;
    if (autoplayStopped || !onScreen || hovered || focused || document.hidden) return;
    timer = window.setTimeout(() => {
      goBy(1);
      schedule();
    }, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    if (autoplayStopped) return;
    autoplayStopped = true;
    window.clearTimeout(timer);
    track.setAttribute("aria-live", "polite");
  };

  // Announcing every automatic step would be noise.
  if (!autoplayStopped) track.setAttribute("aria-live", "off");

  const userGo = (step: number) => {
    stopAutoplay();
    goBy(step);
  };

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------

  prevButton?.addEventListener("click", () => userGo(-1), { signal });
  nextButton?.addEventListener("click", () => userGo(1), { signal });

  viewport.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowLeft") userGo(-1);
      else if (event.key === "ArrowRight") userGo(1);
      else return;
      event.preventDefault();
    },
    { signal },
  );

  // Swipe / drag: horizontal gestures step the slider; vertical ones scroll
  // the page (touch-action: pan-y on the viewport).
  let dragStart: { x: number; y: number; id: number } | null = null;
  let suppressClick = false;

  viewport.addEventListener(
    "pointerdown",
    (event) => {
      if (event.button !== 0) return;
      dragStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      suppressClick = false;
    },
    { signal },
  );

  viewport.addEventListener(
    "pointermove",
    (event) => {
      if (!dragStart || event.pointerId !== dragStart.id) return;
      const dx = event.clientX - dragStart.x;
      if (!suppressClick && Math.abs(dx) > SWIPE_THRESHOLD_PX / 2) {
        root.classList.add("is-dragging");
      }
    },
    { signal },
  );

  const endDrag = (event: PointerEvent) => {
    if (!dragStart || event.pointerId !== dragStart.id) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    dragStart = null;
    root.classList.remove("is-dragging");
    if (event.type === "pointerup" && Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      suppressClick = true;
      userGo(dx < 0 ? 1 : -1);
    }
  };
  viewport.addEventListener("pointerup", endDrag, { signal });
  viewport.addEventListener("pointercancel", endDrag, { signal });

  // Click a portrait to open it where it stands.
  track.addEventListener(
    "click",
    (event) => {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      const card = (event.target as Element).closest<HTMLElement>("[data-ts-card]");
      if (!card || card.classList.contains("is-active") || !("visible" in card.dataset)) return;
      const index = cards.indexOf(card);
      if (index === -1) return;
      userGo(offsetOf(index));
    },
    { signal },
  );

  root.addEventListener("pointerenter", () => { hovered = true; schedule(); }, { signal });
  root.addEventListener("pointerleave", () => { hovered = false; schedule(); }, { signal });
  root.addEventListener("focusin", () => { focused = true; schedule(); }, { signal });
  root.addEventListener(
    "focusout",
    (event) => {
      if (root.contains(event.relatedTarget as Node | null)) return;
      focused = false;
      schedule();
    },
    { signal },
  );
  document.addEventListener("visibilitychange", schedule, { signal });
  reducedMotion.addEventListener(
    "change",
    () => {
      if (reducedMotion.matches) stopAutoplay();
    },
    { signal },
  );

  const visibility = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry?.isIntersecting ?? false;
      schedule();
    },
    { threshold: 0.35 },
  );
  visibility.observe(viewport);

  let lastWidth = 0;
  const resize = new ResizeObserver(() => {
    const width = viewport.clientWidth;
    if (width === lastWidth) return;
    lastWidth = width;
    layout();
  });

  // ---------------------------------------------------------------------------
  // Start
  // ---------------------------------------------------------------------------

  root.classList.add("is-ready");
  layout();
  lastWidth = viewport.clientWidth;
  resize.observe(viewport);
  // Web fonts change the quote heights: measure again once they're in.
  document.fonts?.ready.then(() => {
    if (!signal.aborted) layout();
  });

  return () => {
    abort.abort();
    window.clearTimeout(timer);
    visibility.disconnect();
    resize.disconnect();
  };
}
