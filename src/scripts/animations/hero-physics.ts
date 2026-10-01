/**
 * Hero physics — client icon tiles as solid bodies in the Home hero
 * (Matter.js; lead 2026-09-30).
 *
 * - When the hero is on screen, every tile drops from above the hero (random
 *   x, height and angle), falls through it and piles up on its bottom edge,
 *   in the space the hero leaves below its content (fixed hero height).
 * - Tiles are dragged and thrown with a pointer (mouse, touch, pen): a
 *   spring constraint pulls the grabbed point towards the pointer, so an
 *   off-center grab swings the tile and releasing keeps its momentum.
 * - Touch (lead 2026-09-30, Q1b): a swipe that starts on a tile scrolls the
 *   page as usual. The drag starts only after a press-and-hold (HOLD_MS
 *   without moving more than HOLD_SLOP); while a tile is held, page scroll
 *   is blocked (non-passive `touchmove`). Mouse and pen grab at once.
 * - Bounds = the whole `.c-hero` card (ground + side walls; no ceiling, a
 *   tile thrown up falls back in). Walls and tile size follow resizes (tiles
 *   are rem-sized, so they scale with the fluid root).
 * - Tiles are DOM elements (the shared ClientIcon tile), positioned by
 *   transform after each engine update; no canvas.
 * - Paused while the hero is off screen. Settled tiles sleep, and no frame is
 *   drawn while every tile sleeps and none is held.
 * - Matter.js is loaded on demand (dynamic import), only on pages with the
 *   hero pile.
 *
 * Markup contract (HomeHero.astro):
 *   [data-hero-physics]          layer inside .c-hero (`is-live` added here)
 *     [data-hero-physics-item]   one tile per client
 *
 * No JS / reduced motion: the tiles stay a static row at the bottom. With JS,
 * `html.is-hero-pending` (inline <head> script, BaseLayout) hides that
 * static row until the pile goes live, so it never flashes before the drop.
 */
import type MatterTypes from "matter-js";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const MOBILE = "(max-width: 767px)";
/* Mobile: the full roster (59) piles higher than the space under the
   buttons, so phones get a random subset. TODO: DS — lead to confirm. */
const MOBILE_MAX_TILES = 30;
/* Thick static walls so fast throws can't tunnel through them. */
const WALL_THICKNESS = 400;
/* TODO: DS — feel tuned by eye (no motion spec). */
const TILE_OPTIONS: MatterTypes.IChamferableBodyDefinition = {
  restitution: 0.25,
  friction: 0.35,
  frictionAir: 0.012,
};
const DRAG_STIFFNESS = 0.2;
const DRAG_DAMPING = 0.1;
/* Touch press-and-hold before a drag starts. TODO: DS — tuned by eye. */
const HOLD_MS = 250;
const HOLD_SLOP = 10; // px of finger movement that turns the press into a scroll

type Tile = { el: HTMLElement; body: MatterTypes.Body };

const random = (min: number, max: number): number => min + Math.random() * (max - min);
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

function shuffle<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

export function initHeroPhysics(): void {
  const root = document.querySelector<HTMLElement>("[data-hero-physics]");
  if (!root || window.matchMedia(REDUCED_MOTION).matches) return;

  // Start the first time the hero is on screen.
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    void start(root);
  });
  observer.observe(root);
}

async function start(root: HTMLElement): Promise<void> {
  let Matter: typeof MatterTypes;
  try {
    ({ default: Matter } = await import("matter-js"));
  } catch {
    // Library failed to load: show the static pile.
    document.documentElement.classList.remove("is-hero-pending");
    return;
  }
  const { Engine, Runner, Bodies, Body, Composite, Constraint, Events, Sleeping, Vector } = Matter;

  // --- Tiles ---------------------------------------------------------------
  let els = shuffle(Array.from(root.querySelectorAll<HTMLElement>("[data-hero-physics-item]")));
  if (window.matchMedia(MOBILE).matches) {
    els.slice(MOBILE_MAX_TILES).forEach((el) => el.classList.add("is-off"));
    els = els.slice(0, MOBILE_MAX_TILES);
  }
  const first = els[0];
  if (!first) return;

  root.classList.add("is-live");
  let width = root.clientWidth;
  let height = root.clientHeight;
  let size = first.offsetWidth;
  const radius = parseFloat(getComputedStyle(first).borderTopLeftRadius) || 0;

  // --- World -----------------------------------------------------------------
  const engine = Engine.create({ enableSleeping: true, positionIterations: 8, velocityIterations: 6 });
  const { world } = engine;

  let walls: MatterTypes.Body[] = [];
  const buildWalls = (): void => {
    Composite.remove(world, walls);
    const half = WALL_THICKNESS / 2;
    walls = [
      // Ground, then left + right walls reaching well above the hero.
      Bodies.rectangle(width / 2, height + half, width + WALL_THICKNESS * 2, WALL_THICKNESS, { isStatic: true }),
      Bodies.rectangle(-half, -height / 2, WALL_THICKNESS, height * 3, { isStatic: true }),
      Bodies.rectangle(width + half, -height / 2, WALL_THICKNESS, height * 3, { isStatic: true }),
    ];
    Composite.add(world, walls);
  };
  buildWalls();

  // Drop zone: above the hero, so the tiles fall in from off screen.
  const dropPoint = (): MatterTypes.Vector => ({
    x: random(size, width - size),
    y: -random(size, height * 1.2),
  });

  const tiles: Tile[] = els.map((el) => {
    const { x, y } = dropPoint();
    const body = Bodies.rectangle(x, y, size, size, {
      ...TILE_OPTIONS,
      chamfer: { radius },
      angle: random(0, Math.PI * 2),
    });
    return { el, body };
  });
  Composite.add(
    world,
    tiles.map((tile) => tile.body),
  );

  // --- Render: DOM transforms ---------------------------------------------
  const render = (): void => {
    const half = size / 2;
    tiles.forEach(({ el, body }) => {
      el.style.transform = `translate3d(${body.position.x - half}px, ${body.position.y - half}px, 0) rotate(${body.angle}rad)`;
    });
  };

  // A tile that escaped the bounds (extreme throw) drops back in from above.
  const rescueStrays = (): void => {
    const margin = size * 2;
    tiles.forEach(({ body }) => {
      const { x, y } = body.position;
      if (y > height + margin || x < -margin || x > width + margin) {
        Body.setPosition(body, dropPoint());
        Body.setVelocity(body, { x: 0, y: 0 });
      }
    });
  };

  // --- Drag + throw -----------------------------------------------------------
  let drag: { constraint: MatterTypes.Constraint; pointerId: number; el: HTMLElement } | null = null;
  // Touch press waiting for HOLD_MS before it becomes a drag.
  let pending: { pointerId: number; timer: number; startX: number; startY: number } | null = null;

  const toLocal = (event: { clientX: number; clientY: number }): MatterTypes.Vector => {
    const rect = root.getBoundingClientRect();
    return {
      x: clamp(event.clientX - rect.left, 0, width),
      y: clamp(event.clientY - rect.top, 0, height),
    };
  };

  const cancelPending = (): void => {
    if (!pending) return;
    window.clearTimeout(pending.timer);
    pending = null;
  };

  const beginDrag = (el: HTMLElement, body: MatterTypes.Body, pointerId: number, at: MatterTypes.Vector): void => {
    Sleeping.set(body, false);
    const constraint = Constraint.create({
      pointA: at,
      bodyB: body,
      // World-space offset at the current angle; Matter rotates it with
      // the body, so the grabbed spot stays under the pointer.
      pointB: Vector.sub(at, body.position),
      length: 0,
      stiffness: DRAG_STIFFNESS,
      damping: DRAG_DAMPING,
    });
    Composite.add(world, constraint);
    try {
      el.setPointerCapture(pointerId);
    } catch {
      // Pointer already gone (released during the hold): no capture needed.
    }
    el.classList.add("is-dragging");
    drag = { constraint, pointerId, el };
  };

  const endDrag = (event: PointerEvent): void => {
    if (pending?.pointerId === event.pointerId) cancelPending();
    if (!drag || drag.pointerId !== event.pointerId) return;
    Composite.remove(world, drag.constraint);
    drag.el.classList.remove("is-dragging");
    drag = null;
  };

  tiles.forEach(({ el, body }) => {
    el.addEventListener("pointerdown", (event) => {
      if (drag || pending || event.button !== 0) return;
      if (event.pointerType === "touch") {
        // No preventDefault: the browser may still turn this into a scroll
        // (it then fires pointercancel, which drops the pending press).
        const { pointerId, clientX, clientY } = event;
        pending = {
          pointerId,
          startX: clientX,
          startY: clientY,
          timer: window.setTimeout(() => {
            if (!pending || drag) return;
            const at = toLocal({ clientX: pending.startX, clientY: pending.startY });
            pending = null;
            beginDrag(el, body, pointerId, at);
          }, HOLD_MS),
        };
        return;
      }
      event.preventDefault();
      beginDrag(el, body, event.pointerId, toLocal(event));
    });
    el.addEventListener("pointermove", (event) => {
      if (pending && pending.pointerId === event.pointerId) {
        const moved = Math.hypot(event.clientX - pending.startX, event.clientY - pending.startY);
        if (moved > HOLD_SLOP) cancelPending();
        return;
      }
      if (drag && drag.pointerId === event.pointerId) drag.constraint.pointA = toLocal(event);
    });
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("lostpointercapture", endDrag);
    // While a tile is held by touch, the finger moves the tile, not the page.
    el.addEventListener(
      "touchmove",
      (event) => {
        if (drag?.el === el && event.cancelable) event.preventDefault();
      },
      { passive: false },
    );
    // Long-press menu / image callout would interrupt the hold.
    el.addEventListener("contextmenu", (event) => event.preventDefault());
  });

  // --- Loop ---------------------------------------------------------------------
  Events.on(engine, "beforeUpdate", () => {
    // A held tile never falls asleep.
    if (drag?.constraint.bodyB) Sleeping.set(drag.constraint.bodyB, false);
  });
  Events.on(engine, "afterUpdate", () => {
    // Settled pile, nothing held: the DOM is already up to date.
    if (!drag && tiles.every(({ body }) => body.isSleeping)) return;
    rescueStrays();
    render();
  });

  render(); // Tiles jump to the drop zone before the first paint.
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Pause while the hero is off screen.
  new IntersectionObserver((entries) => {
    runner.enabled = entries.some((entry) => entry.isIntersecting);
  }).observe(root);

  // --- Resize: walls follow the hero, tiles follow the rem size ---------------
  new ResizeObserver(() => {
    const nextWidth = root.clientWidth;
    const nextHeight = root.clientHeight;
    const nextSize = first.offsetWidth;
    if (nextWidth === width && nextHeight === height && nextSize === size) return;

    if (nextSize !== size && size > 0) {
      const ratio = nextSize / size;
      tiles.forEach(({ body }) => Body.scale(body, ratio, ratio));
      size = nextSize;
    }
    width = nextWidth;
    height = nextHeight;
    buildWalls();

    // Keep every tile inside the new bounds, then let the pile resettle.
    tiles.forEach(({ body }) => {
      Sleeping.set(body, false);
      Body.setPosition(body, {
        x: clamp(body.position.x, size, width - size),
        y: Math.min(body.position.y, height - size),
      });
    });
    render();
  }).observe(root);
}
