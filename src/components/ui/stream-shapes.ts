/**
 * The Services "Custom Websites" shapes stream (Figma image 1576), cut into
 * its 24 shapes (lead 2026-10-30), so each shape can travel on its own
 * endless loop like the blog's ThImageConverge thumbnails: from beyond an
 * edge to a target (the card's icon, the banner's middle), fading out at the
 * end, then again from the edge. No loop ever runs backwards.
 *
 * Figma draws the stream as one image in a rotated box (the image 228.54%
 * of the box wide, only its stream half showing). `streamPaths` puts each
 * cut shape where Figma's box shows it, so the still frame is the design,
 * and works out its path in the same units (Figma px of the parent).
 */

const DIR = "/images/home/services/shapes";
/** Source image size (px) and its width as a share of Figma's box. */
const IMG_W = 3168;
const IMG_H = 1344;
const IMG_IN_BOX = 2.2854;

/** Centre and size of each shape in the source image (px). */
const SHAPES = [
  [39, 760, 78, 86], [101, 482, 88, 80], [108.5, 950, 79, 76], [173, 625, 84, 84],
  [182.5, 789.5, 91, 77], [279, 507.5, 90, 77], [278.5, 880.5, 85, 79], [308, 700, 70, 70],
  [380.5, 606, 69, 70], [403, 790, 82, 82], [490, 690.5, 82, 79], [525, 558, 90, 76],
  [548, 817, 70, 70], [601, 676, 70, 70], [678.5, 781, 85, 82], [688, 583, 84, 82],
  [785, 715.5, 70, 69], [834, 616.5, 90, 89], [899, 725, 80, 78], [998, 666, 84, 78],
  [1099.5, 719.5, 71, 69], [1107, 629, 70, 70], [1207, 672.5, 84, 83], [1320.5, 675.5, 91, 77],
] as const;

/** Figma's rotated box: centre and size in the parent's units, rotation, vertical flip. */
export interface StreamBox {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  flip?: boolean;
}

export interface ShapePath {
  src: string;
  /** Still-frame centre and size (parent units), rotation (deg), flip. */
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  flip: boolean;
  /** Start and end of the loop, as offsets from the still-frame centre. */
  sx: number;
  sy: number;
  ex: number;
  ey: number;
  /** Loop length (s) and the delay (s, negative) that starts it at the still frame. */
  dur: number;
  delay: number;
}

/**
 * Paths for both copies of the stream in `boxes`, heading for `target`.
 * Each shape starts just past the edge of `bounds` (on the line from the
 * target through the shape) and moves at `speed` parent units per second.
 * `phase` (0–1) shifts every loop, e.g. 0.5 for a second copy half a loop
 * behind. `from: "sides"` (as ThImageConverge) enters from the left or right
 * edge only, heading 40% of the way to the target's level line (at most
 * 0.35 steep), so nothing crosses copy above or below the target.
 */
export function streamPaths(
  boxes: readonly StreamBox[],
  target: { x: number; y: number },
  bounds: { x0: number; y0: number; x1: number; y1: number },
  speed: number,
  phase = 0,
  from: "ray" | "sides" = "ray",
): ShapePath[] {
  return boxes.flatMap((box, b) => {
    const k = box.h / IMG_H; // parent units per source px
    const rad = (box.r * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return SHAPES.map(([cx, cy, sw, sh], i) => {
      const lx = (cx / IMG_W) * IMG_IN_BOX * box.w - box.w / 2;
      const ly = (cy / IMG_H) * box.h - box.h / 2;
      const fy = box.flip ? -ly : ly;
      const x = box.x + lx * cos - fy * sin;
      const y = box.y + lx * sin + fy * cos;
      const w = sw * k;
      const h = sh * k;
      let sx: number, sy: number, ex: number, ey: number, len: number, progress: number;
      if (from === "sides" && Math.abs(x - target.x) > 1) {
        sx = x < target.x ? bounds.x0 - w : bounds.x1 + w;
        ex = target.x;
        // Through the shape towards the target's line, at most 0.35 steep, so
        // a shape near the target doesn't start far above or below it.
        const slope = Math.max(-0.35, Math.min(0.35, (target.y - y) * 0.4 / (ex - x)));
        ey = y + slope * (ex - x);
        sy = y + slope * (sx - x);
        len = Math.hypot(ex - sx, ey - sy);
        progress = (x - sx) / (ex - sx);
      } else {
        // Ray from the target through the shape, out to the bounds + the shape's size.
        const dx = x - target.x;
        const dy = y - target.y;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const exits = [
          ux > 0 ? (bounds.x1 - target.x) / ux : ux < 0 ? (bounds.x0 - target.x) / ux : Infinity,
          uy > 0 ? (bounds.y1 - target.y) / uy : uy < 0 ? (bounds.y0 - target.y) / uy : Infinity,
        ];
        len = Math.max(Math.min(...exits) + Math.max(w, h), dist);
        progress = 1 - dist / len;
        sx = target.x + ux * len;
        sy = target.y + uy * len;
        ex = target.x;
        ey = target.y;
      }
      // A little spread so the shapes don't move in lockstep.
      const dur = (len / speed) * (0.9 + ((i * 7 + b * 3) % 10) / 50);
      return {
        src: `${DIR}/s${String(i + 1).padStart(2, "0")}.webp`,
        x: round(x),
        y: round(y),
        w: round(w),
        h: round(h),
        r: box.r,
        flip: !!box.flip,
        sx: round(sx - x),
        sy: round(sy - y),
        ex: round(ex - x),
        ey: round(ey - y),
        dur: round(dur),
        delay: round(-((progress + phase) % 1) * dur),
      };
    });
  });
}

const round = (n: number) => Math.round(n * 100) / 100;
