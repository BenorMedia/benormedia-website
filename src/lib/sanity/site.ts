/**
 * Module-level cache around `getSiteSettings()`.
 *
 * BaseLayout, Nav, Footer, CtaBanner and ContactModal each need the same
 * `siteSettings` singleton. Astro renders components independently, so
 * without a cache we'd fire the same GROQ query 4-5 times per page during
 * `astro build`. This wrapper resolves the singleton once per Node process
 * (i.e. once per build) and hands the same value to every caller.
 *
 * The cache stores `null` (singleton not yet published) and the resolved
 * document alike; only the initial `undefined` triggers a fetch.
 */
import { getSiteSettings } from './queries';
import type { SiteSettings } from './types';

let cached: SiteSettings | null | undefined;

export async function getSiteSettingsCached(): Promise<SiteSettings | null> {
  if (cached === undefined) {
    cached = await getSiteSettings();
  }
  return cached;
}
