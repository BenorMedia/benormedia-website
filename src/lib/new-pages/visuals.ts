/**
 * Visuals (brief 5.9): a real asset, else a registered diagram, else a
 * preview-only placeholder, else nothing.
 *
 * Assets: `src/assets/new-pages/<slug>/<n>.<webp|png|jpg|svg>`, `n` counted
 * from 1 in `visuals` order.
 *
 * Diagrams: `DIAGRAMS['<slug>:<n>']`, filled in T7. Each entry names the
 * section text its labels came from.
 */
import type { ImageMetadata } from "astro";

type AstroComponent = (...args: any[]) => any;

export interface DiagramEntry {
  component: AstroComponent;
  props: Record<string, unknown>;
}

const ASSETS = import.meta.glob<{ default: ImageMetadata }>("/src/assets/new-pages/**/*.{webp,png,jpg,svg}", {
  eager: true,
});

export function findAsset(slug: string, n: number): ImageMetadata | undefined {
  for (const ext of ["webp", "png", "jpg", "svg"]) {
    const mod = ASSETS[`/src/assets/new-pages/${slug}/${n}.${ext}`];
    if (mod) return mod.default;
  }
  return undefined;
}

export const DIAGRAMS: Record<string, DiagramEntry> = {};

export type ResolvedVisual =
  | { kind: "asset"; asset: ImageMetadata }
  | { kind: "diagram"; diagram: DiagramEntry }
  | { kind: "placeholder" };

/**
 * What renders for a visual, in brief 5.9 order. `undefined` = nothing
 * (production without an asset or a diagram: the section is one column).
 */
export function resolveVisual(
  visual: { slug: string; n: number; key: string } | undefined,
  includeDrafts: boolean,
): ResolvedVisual | undefined {
  if (!visual) return undefined;
  const asset = findAsset(visual.slug, visual.n);
  if (asset) return { kind: "asset", asset };
  const diagram = DIAGRAMS[visual.key];
  if (diagram) return { kind: "diagram", diagram };
  return includeDrafts ? { kind: "placeholder" } : undefined;
}
