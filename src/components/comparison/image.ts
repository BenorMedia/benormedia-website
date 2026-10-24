/**
 * Image sources for the comparison components: a Sanity image (SVG served
 * raw, rasters resized at 2x and `auto('format')`), or a `/dev/comparison`
 * fixture image (`previewSrc`, bundled Figma exports read at render time;
 * Sanity never returns it). Shares `PreviewImage` with the case-study
 * components.
 *
 * Logos (`logoBox`): Figma shows each logo at its own size (WordPress
 * 162 × 37.4, Framer 95 × 26, Wix 46 × 26). There is no size field in the
 * schema, so the display size comes from the file: SVG at its own size
 * (viewBox = display size), rasters as 2x exports (half their pixel size),
 * the height clamped to the design's range. Logged in DECISIONS →
 * Comparison (editor guidance for logo uploads).
 */
import type { PreviewImage } from '../case-studies/image';
import type { SanityImage } from '../../lib/sanity/types';
import { assetDimensions, isSvgAsset, urlFor, type Source } from '../../lib/sanity/image';

export type ComparisonImageInput = (SanityImage & PreviewImage & { previewSvg?: boolean }) | null | undefined;

export interface ComparisonImage {
  src: string;
  srcset?: string;
  /** Intrinsic CSS px at display size (width / height attributes). */
  width: number;
  height: number;
  alt: string;
}

/** Pixel size and SVG flag of a Sanity or preview image, when known. */
function intrinsic(image: ComparisonImageInput): { width: number; height: number; svg: boolean } | null {
  if (!image) return null;
  if (image.previewSrc) {
    const { previewWidth: width, previewHeight: height } = image;
    return width && height ? { width, height, svg: image.previewSvg === true || image.previewSrc.startsWith('data:image/svg') } : null;
  }
  const id = image.asset?._id ?? image.asset?._ref;
  const dims = assetDimensions(id);
  return dims ? { ...dims, svg: isSvgAsset(id) } : null;
}

/**
 * An image shown at `width` CSS px (mockups, "What to choose" picture, step
 * icons). Rasters get a 1x / 2x `srcset`; SVGs are served as the raw file.
 */
export function imageAtWidth(image: ComparisonImageInput, width: number, alt: string): ComparisonImage | null {
  const size = intrinsic(image);
  if (!image || !size) return null;
  const height = Math.round((width * size.height) / size.width);
  if (image.previewSrc) return { src: image.previewSrc, width, height, alt };
  if (size.svg) return { src: urlFor(image as Source).url(), width, height, alt };
  const base = urlFor(image as Source).auto('format').fit('max');
  return {
    src: base.width(width).url(),
    srcset: `${base.width(width).url()} 1x, ${base.width(width * 2).url()} 2x`,
    width,
    height,
    alt,
  };
}

/**
 * A logo's display box in CSS px: SVG at its own size, raster at half its
 * pixel size, height clamped to `[minHeight, maxHeight]` (width follows the
 * ratio). Rasters are fetched at 2x the display height.
 */
export function logoBox(
  image: ComparisonImageInput,
  alt: string,
  { minHeight, maxHeight }: { minHeight: number; maxHeight: number },
): ComparisonImage | null {
  const size = intrinsic(image);
  if (!image || !size) return null;
  const natural = size.svg ? size.height : size.height / 2;
  const height = Math.min(maxHeight, Math.max(minHeight, natural));
  const width = Math.round(((height * size.width) / size.height) * 100) / 100;
  if (image.previewSrc) return { src: image.previewSrc, width, height, alt };
  if (size.svg) return { src: urlFor(image as Source).url(), width, height, alt };
  return { src: urlFor(image as Source).height(Math.round(height * 2)).fit('max').auto('format').url(), width, height, alt };
}

/** Alt text: the Sanity `alt`, else the fallback (e.g. the competitor name). */
export const altOr = (image: ComparisonImageInput, fallback: string): string => image?.alt?.trim() || fallback;
