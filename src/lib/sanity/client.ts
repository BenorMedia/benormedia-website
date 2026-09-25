/**
 * Sanity client — re-exported from the `sanity:client` virtual module that
 * `@sanity/astro` sets up from `astro.config.mjs` (see the `sanity(...)` call
 * in `integrations`). That module builds a `SanityClient` with the exact
 * `projectId`, `dataset`, `apiVersion` and `useCdn` we configured, so we do
 * not instantiate a fresh client here — there must be one, and only one,
 * source of truth for those values.
 *
 * Re-exporting under this path means the rest of the app imports from
 * `~/lib/sanity/client` (or a relative path to it) and never has to know
 * about the `sanity:client` virtual module.
 */
export { sanityClient } from 'sanity:client';
