/**
 * Hero physics — client icon tiles as solid bodies in the Home hero
 * (Matter.js; lead 2026-09-30).
 *
 * - When the hero is on screen, every tile drops from above the hero (random
 *   x, height and angle), falls through it and piles up on its bottom edge,
 *   in the space the hero leaves below its content (fixed hero height).
 * - Tiles avoid the cursor (lead 2026-10-23, replaces drag + throw): every
 *   tile within AVOID_RADIUS of a mouse or pen pointer is pushed straight
 *   away from it, gently (strongest at the pointer, fading to nothing at
 *   the radius), and resettles under gravity once the pointer moves on.
 *   Touch has no hover, so it doesn't push: a swipe scrolls the page.
 * - Bounds = the whole `.c-hero` card (ground + side walls; no ceiling, a
 *   tile thrown up falls back in). Walls and tile size follow resizes (tiles
 *   are rem-sized, so they scale with the fluid root).
 * - Tiles are DOM elements (the shared ClientIcon tile), positioned by
 *   transform after each engine update; no canvas.
 * - Paused while the hero is off screen. Settled tiles sleep, and no frame is
 *   drawn while every tile sleeps.
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
/* Cursor avoidance. TODO: DS — tuned by eye. Radius in tile sizes; strength
   is the push at the pointer, as a multiple of the tile's weight. */
const AVOID_RADIUS = 2;
const AVOID_STRENGTH = 5;

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
  const { Engine, Runner, Bodies, Body, Composite, Events, Sleeping } = Matter;

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

  // --- Cursor avoidance ------------------------------------------------------
  // Last mouse/pen position in viewport coordinates; read every step, so the
  // push follows the hero when the page scrolls under a still pointer.
  let pointer: { clientX: number; clientY: number } | null = null;

  window.addEventListener(
    "pointermove",
    (event) => {
      pointer = event.pointerType === "touch" ? null : { clientX: event.clientX, clientY: event.clientY };
    },
    { passive: true },
  );
  // Pointer left the window.
  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget) pointer = null;
  });

  const avoidPointer = (): void => {
    if (!pointer) return;
    const rect = root.getBoundingClientRect();
    const px = pointer.clientX - rect.left;
    const py = pointer.clientY - rect.top;
    if (px < 0 || px > width || py < 0 || py > height) return;

    const reach = size * AVOID_RADIUS;
    tiles.forEach(({ body }) => {
      const dx = body.position.x - px;
      const dy = body.position.y - py;
      const distance = Math.hypot(dx, dy);
      if (distance >= reach) return;
      // Pointer right on the tile's center: push it up.
      const [nx, ny] = distance > 0.001 ? [dx / distance, dy / distance] : [0, -1];
      const push = body.mass * engine.gravity.scale * AVOID_STRENGTH * (1 - distance / reach);
      Sleeping.set(body, false);
      Body.applyForce(body, body.position, { x: nx * push, y: ny * push });
    });
  };

  // --- Loop ---------------------------------------------------------------------
  Events.on(engine, "beforeUpdate", avoidPointer);
  Events.on(engine, "afterUpdate", () => {
    // Settled pile: the DOM is already up to date.
    if (tiles.every(({ body }) => body.isSleeping)) return;
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
