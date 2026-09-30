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
import { getClientBadges, getSiteSettings, getTestimonials } from './queries';
import type { Client, SiteSettings, Testimonial } from './types';
import { urlFor, type Source } from './image';

let cached: SiteSettings | null | undefined;

export async function getSiteSettingsCached(): Promise<SiteSettings | null> {
  if (cached === undefined) {
    cached = await getSiteSettings();
  }
  return cached;
}

/**
 * Same once-per-build cache for the client badges shown in the global CTA
 * banner (rendered on every page).
 */
let badgesCached: Promise<Client[]> | undefined;

export function getClientBadgesCached(): Promise<Client[]> {
  badgesCached ??= getClientBadges();
  return badgesCached;
}

/**
 * The first testimonial (TESTIMONIALS order: oldest first) for the global
 * ContactModal card, rendered on every page. Same once-per-build cache.
 */
let firstTestimonialCached: Promise<Testimonial | null> | undefined;

export function getFirstTestimonialCached(): Promise<Testimonial | null> {
  firstTestimonialCached ??= getTestimonials().then((list) => list[0] ?? null);
  return firstTestimonialCached;
}

/**
 * Badge circle URLs for `CtaActions` (CTA banner + service hero): every
 * client badge, 64×64 crop (31.68px circle at 2x density). Same cache.
 */
let badgeUrlsCached: Promise<string[]> | undefined;

export function getCtaBadgeUrlsCached(): Promise<string[]> {
  badgeUrlsCached ??= getClientBadgesCached().then((clients) =>
    clients
      .filter((c) => c.badge?.asset)
      .map((c) => urlFor(c.badge as Source).width(64).height(64).fit('crop').auto('format').url()),
  );
  return badgeUrlsCached;
}
