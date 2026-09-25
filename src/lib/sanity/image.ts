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
