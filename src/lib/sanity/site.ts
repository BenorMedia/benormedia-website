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
 * The ContactModal testimonial (global, every page): Surfe's (lead
 * 2026-09-30), else the first one (TESTIMONIALS order: oldest first). Same
 * once-per-build cache.
 */
const CONTACT_TESTIMONIAL_CLIENT_ID = 'client-surfe';
let contactTestimonialCached: Promise<Testimonial | null> | undefined;

export function getContactTestimonialCached(): Promise<Testimonial | null> {
  contactTestimonialCached ??= getTestimonials().then(
    (list) => list.find((t) => t.client?._id === CONTACT_TESTIMONIAL_CLIENT_ID) ?? list[0] ?? null,
  );
  return contactTestimonialCached;
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
