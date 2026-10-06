/**
 * Image URL builder — thin wrapper over `@sanity/image-url` seeded with the
 * project's `sanityClient`. Components call `urlFor(image).width(1200).format('webp').url()`.
 *
 * The `Source` type is exported so component props can accept anything the
 * builder accepts (asset ref, image object, string ID, ...).
 */
import {
  createImageUrlBuilder,
  type ImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';
import { sanityClient } from './client';

const builder = createImageUrlBuilder(sanityClient);

export type Source = SanityImageSource;

export function urlFor(source: Source): ImageUrlBuilder {
  return builder.image(source);
}

/**
 * Intrinsic size from a Sanity image asset id
 * (`image-<hash>-<width>x<height>-<ext>`), for `<img width height>` without
 * an extra metadata query.
 */
export function assetDimensions(
  id: string | undefined | null,
): { width: number; height: number } | undefined {
  const match = id?.match(/-(\d+)x(\d+)-[a-z0-9]+$/i);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : undefined;
}

/** `true` when the asset id is an SVG (`…-svg`): serve the raw file, never a raster transform. */
export function isSvgAsset(id: string | undefined | null): boolean {
  return /-svg$/i.test(id ?? '');
}

/**
 * Alt text for a client image: the Sanity `alt` unless it is empty or only
 * repeats the client name (which says nothing about the image), else
 * "<name> <kind>", e.g. "Surfe logo", "Surfe website" (SEO cleanup 2026-10-06).
 */
export function clientImageAlt(
  alt: string | undefined | null,
  name: string | undefined | null,
  kind: 'logo' | 'website',
): string {
  const a = alt?.trim();
  const n = name?.trim() ?? '';
  return a && a !== n ? a : `${n} ${kind}`.trim();
}
