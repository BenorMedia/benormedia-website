/**
 * /about/photos/<file> — the About page's placeholder photos (TODO: ASSET,
 * replace before release; DECISIONS → About 2026-10-21).
 *
 * Production guard: the photos are third-party placeholders and must never
 * reach a production deploy. They are NOT imported anywhere (an ESM image
 * import is emitted into `dist/_astro` at load time, even when no page uses
 * it, and the Vercel image service never removes it). Instead this static
 * endpoint reads each file from `src/assets/about/_placeholder/` at render
 * time and `getStaticPaths` returns no path when `isProductionBuild()` says
 * production, so a production build emits none of them. `astro dev`, Vercel
 * previews and local builds emit them next to `/about`.
 *
 * Remove this endpoint (and the folder) once the real photos are in.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isProductionBuild } from "../../../lib/sanity/case-study-release";
import { ALL_PHOTOS } from "../../../components/sections/about/content";

export const getStaticPaths = (() =>
  isProductionBuild() ? [] : ALL_PHOTOS.map((p) => ({ params: { file: p.file } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const photo = ALL_PHOTOS.find((p) => p.file === params["file"]);
  if (!photo) return new Response(null, { status: 404 });
  const body = readFileSync(join(process.cwd(), "src/assets/about/_placeholder", photo.file));
  return new Response(new Uint8Array(body), { headers: { "Content-Type": "image/webp" } });
};
