/**
 * Image URLs for the case-study components: a Sanity image (SVG served raw,
 * rasters resized), or a dev-preview image. `previewSrc` exists only on the
 * `/dev/case-study` fixture (`case-study-fixture.ts`, bundled assets from
 * Figma); Sanity never returns it.
 */
import type { SanityImage } from '../../lib/sanity/types';
import { assetDimensions, isSvgAsset, urlFor, type Source } from '../../lib/sanity/image';

export interface PreviewImage {
  previewSrc?: string;
  previewWidth?: number;
  previewHeight?: number;
}

export type CaseStudyImageInput = (SanityImage & PreviewImage) | null | undefined;

export interface ResolvedImage {
  src: string;
  /** Intrinsic ratio, when known. */
  ratio?: number;
}

/** `true` when there is something to render. */
export const hasImage = (image: CaseStudyImageInput): boolean => Boolean(image?.previewSrc || image?.asset);

/**
 * `height` = rendered CSS px height (raster sources are fetched at 2x).
 * `square` = crop to a square (photos).
 */
export function resolveImage(image: CaseStudyImageInput, height: number, square = false): ResolvedImage | null {
  if (!image) return null;
  if (image.previewSrc) {
    const w = image.previewWidth;
    const h = image.previewHeight;
    return w && h ? { src: image.previewSrc, ratio: w / h } : { src: image.previewSrc };
  }
  if (!image.asset) return null;
  const id = image.asset._id ?? image.asset._ref;
  const dims = assetDimensions(id);
  const ratio = dims ? dims.width / dims.height : undefined;
  let src: string;
  if (isSvgAsset(id)) src = urlFor(image as Source).url();
  else if (square) src = urlFor(image as Source).width(height * 2).height(height * 2).fit('crop').auto('format').url();
  else src = urlFor(image as Source).height(height * 2).fit('max').auto('format').url();
  return ratio && !square ? { src, ratio } : square ? { src, ratio: 1 } : { src };
}

/** `<img width height>` for a rendered height. */
export function imageSize(img: ResolvedImage | null, height: number): { width?: number; height?: number } {
  return img?.ratio ? { width: Math.round(height * img.ratio), height } : {};
}

