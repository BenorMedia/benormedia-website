/**
 * Tech diagram — Home "Technologies" motion (lead 2026-10-28).
 *
 * - Small blue squares travel along the lines into the BenorMedia mark:
 *   down each line from a tool card, and up the line from the capability
 *   rows. Each line launches its next square after a random pause, so
 *   several can be moving at once, slowly, fading in and out.
 * - The three capability rows loop endlessly: row 1 right to left, row 2
 *   left to right, row 3 right to left.
 *
 * The <img> SVG can't move, so on desktop the same file is fetched and
 * rebuilt inline as layers: the static drawing (lines, tool cards, mark),
 * a squares layer, and one layer per row (the row plus a copy one period
 * later, slid by a CSS animation on the compositor). Layers stack in the
 * drawing's order: squares pass under the rows and fade out at the mark.
 *
 * Markup contract (Technologies.astro): img[data-anim="tech-diagram"]
 * inside picture.c-tech__diagram. SVG contract (technologies.svg):
 * #tech-lines (one path per line, drawn from below the mark up to its tool
 * card), #tech-squares-static, #tech-row-1..3, #tech-square (template,
 * centered on 0 0, in <defs>).
 *
 * No JS / reduced motion / ≤767 (bitmap artwork): the static image.
 */
import { gsap } from "gsap";

/* TODO: DS — no motion spec; speeds and timings tuned by eye. Distances in
   the drawing's units (1680 wide). */
const ROW_SPEED = 12; // units per second
const ROW_DIRECTIONS = [-1, 1, -1]; // -1 = right to left
const SQUARE_SPEED = 32; // units per second
const SQUARE_GAP_MIN = 4; // seconds between two squares on one line
const SQUARE_GAP_MAX = 12;
const SQUARE_FADE = 60; // units faded in at the start, out at the end
/* Edges of the white circle behind the mark, and of row 1 (drawing units). */
const MARK_TOP = 369;
const MARK_BOTTOM = 567;
const ROW_TOP = 716;
const SQUARE_HALF = 7.5;

const SVG_NS = "http://www.w3.org/2000/svg";
const VIEW_W = 1680;
const VIEW_H = 1107;

interface Route {
  path: SVGPathElement;
  from: number;
  to: number;
}

let markup: Promise<string> | undefined;

export function initTechDiagram(): void {
  const img = document.querySelector<HTMLImageElement>('img[data-anim="tech-diagram"]');
  const picture = img?.closest<HTMLElement>(".c-tech__diagram");
  if (!img || !picture) return;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    let teardown: (() => void) | undefined;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        markup ??= fetch(img.src).then((response) => {
          if (!response.ok) throw new Error(`tech-diagram: ${response.status}`);
          return response.text();
        });
        markup
          .then((text) => {
            if (!cancelled) teardown = build(text, img, picture);
          })
          .catch(() => {
            markup = undefined; // keep the static image; retry next time
          });
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(picture);
    return () => {
      cancelled = true;
      observer.disconnect();
      teardown?.();
    };
  });
}

function build(text: string, img: HTMLImageElement, picture: HTMLElement): () => void {
  const parsed = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
  if (!(parsed instanceof SVGSVGElement)) return () => {};
  const base = document.importNode(parsed, true);
  const lines = [...base.querySelectorAll<SVGPathElement>("#tech-lines path")];
  const rows = [1, 2, 3].map((n) => base.querySelector<SVGGElement>(`#tech-row-${n}`));
  if (!lines.length || rows.some((row) => !row)) return () => {};

  const live = document.createElement("div");
  live.className = "c-tech__live";
  live.setAttribute("role", "img");
  live.setAttribute("aria-label", img.alt);
  base.removeAttribute("width");
  base.removeAttribute("height");
  base.setAttribute("aria-hidden", "true");
  base.querySelector("#tech-squares-static")?.remove();
  live.append(base);
  picture.after(live);
  picture.classList.add("is-replaced");

  const squares = layer(`0 0 ${VIEW_W} ${VIEW_H}`, "c-tech__squares");
  live.append(squares);

  // Rows: measured while still in the drawing, then moved to their layers.
  rows.forEach((row, i) => {
    if (!row) return;
    const box = row.getBBox();
    const period = rowPeriod(row);
    const width = box.width + period;
    const strip = layer(`${box.x} ${box.y} ${width} ${box.height}`, "c-tech__row");
    Object.assign(strip.style, {
      left: `${(box.x / VIEW_W) * 100}%`,
      top: `${(box.y / VIEW_H) * 100}%`,
      width: `${(width / VIEW_W) * 100}%`,
      height: `${(box.height / VIEW_H) * 100}%`,
    });
    strip.style.setProperty("--tech-shift", `${(-period / width) * 100}%`);
    strip.style.setProperty("--tech-duration", `${period / ROW_SPEED}s`);
    if ((ROW_DIRECTIONS[i] ?? -1) > 0) strip.classList.add("is-reverse");
    const copy = document.createElementNS(SVG_NS, "use");
    copy.setAttribute("href", `#${row.id}`);
    copy.setAttribute("x", String(period));
    strip.append(row, copy);
    live.append(strip);
  });

  // Squares: down every line to the top of the mark, and up the longest
  // line (the one that runs on below the mark) from row 1 to its bottom.
  const routes: Route[] = lines.map((path) => {
    const startY = path.getPointAtLength(0).y;
    return { path, from: path.getTotalLength(), to: startY - MARK_TOP + SQUARE_HALF };
  });
  const lowest = lines.reduce((a, b) =>
    a.getPointAtLength(0).y >= b.getPointAtLength(0).y ? a : b,
  );
  const lowestY = lowest.getPointAtLength(0).y;
  routes.push({
    path: lowest,
    from: lowestY - ROW_TOP - SQUARE_HALF,
    to: lowestY - MARK_BOTTOM - SQUARE_HALF,
  });

  const timeline = gsap.timeline({ autoRemoveChildren: true });
  const launch = (route: Route) => {
    const square = document.createElementNS(SVG_NS, "use");
    square.setAttribute("href", "#tech-square");
    square.setAttribute("opacity", "0");
    squares.append(square);
    const distance = Math.abs(route.to - route.from);
    const state = { at: route.from };
    timeline.to(
      state,
      {
        at: route.to,
        duration: distance / SQUARE_SPEED,
        ease: "sine.inOut",
        onUpdate: () => {
          const point = route.path.getPointAtLength(state.at);
          const travelled = Math.abs(state.at - route.from);
          const fade = Math.min(travelled, distance - travelled, SQUARE_FADE) / SQUARE_FADE;
          square.setAttribute("transform", `translate(${point.x} ${point.y})`);
          square.setAttribute("opacity", fade.toFixed(3));
        },
        onComplete: () => square.remove(),
      },
      timeline.time(),
    );
  };
  const schedule = (route: Route, min: number) => {
    timeline.call(
      () => {
        launch(route);
        schedule(route, SQUARE_GAP_MIN);
      },
      [],
      timeline.time() + gsap.utils.random(min, SQUARE_GAP_MAX),
    );
  };
  routes.forEach((route) => schedule(route, 0));

  // Paused (squares and rows) while the section is off screen.
  const visibility = new IntersectionObserver((entries) => {
    const onScreen = entries.some((entry) => entry.isIntersecting);
    live.classList.toggle("is-paused", !onScreen);
    if (onScreen) timeline.play();
    else timeline.pause();
  });
  visibility.observe(live);

  return () => {
    visibility.disconnect();
    timeline.kill();
    live.remove();
    picture.classList.remove("is-replaced");
  };
}

function layer(viewBox: string, className: string): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  return svg;
}

/* Distance after which a row repeats: from its first card's left edge to
   the last card's right edge, plus the row's average gap between cards.
   Cards are the row's direct children drawn with a mask (their borders). */
function rowPeriod(row: SVGGElement): number {
  const cards = [...row.children]
    .filter((el): el is SVGGraphicsElement => el instanceof SVGGraphicsElement && el.hasAttribute("mask"))
    .map((el) => el.getBBox())
    .sort((a, b) => a.x - b.x);
  const first = cards[0];
  const last = cards[cards.length - 1];
  if (!first || !last) return row.getBBox().width;
  const gaps = cards.slice(1).map((card, i) => card.x - (cards[i]!.x + cards[i]!.width));
  const gap = gaps.reduce((sum, g) => sum + g, 0) / Math.max(gaps.length, 1);
  return last.x + last.width + gap - first.x;
}
