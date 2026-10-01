/**
 * Cookie consent state + GTM loading (CookieConsent.astro; lead 2026-09-30).
 *
 * - Accept: sets the first-party cookie `bm_consent=granted` (180 days),
 *   loads GTM via `window.bmLoadGtm()` (defined by BaseLayout's inline head
 *   script, production only — absent on previews / dev, so nothing loads
 *   there) and pushes a Consent Mode `update` to `granted`.
 * - Reject: stores nothing (the banner shows again on every page load, lead
 *   2026-09-30) and removes a previous `granted` cookie. If GTM was already
 *   loaded on this page (accepted earlier, reopened via a `.js-open-cookie-consent` hook),
 *   a Consent Mode `update` to `denied` stops consent-aware tags; from the
 *   next page load GTM is not loaded at all.
 *
 * Keep the cookie name in sync with the inline script in BaseLayout.
 */

export const CONSENT_COOKIE = "bm_consent";
/** Re-ask after this many days. TODO: lead / legal to confirm. */
export const CONSENT_MAX_AGE_DAYS = 180;

declare global {
  interface Window {
    dataLayer?: unknown[];
    bmLoadGtm?: () => void;
  }
}

/** `true` when the visitor accepted (cookie present and not expired). */
export function hasConsent(): boolean {
  return document.cookie.split("; ").includes(`${CONSENT_COOKIE}=granted`);
}

function pushConsent(granted: boolean): void {
  const state = granted ? "granted" : "denied";
  window.dataLayer = window.dataLayer ?? [];
  // gtag() pushes the `arguments` object, which GTM expects (not an array).
  const gtag = function (..._args: unknown[]): void {
    window.dataLayer?.push(arguments);
  };
  gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

export function acceptConsent(): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=granted; Max-Age=${CONSENT_MAX_AGE_DAYS * 24 * 60 * 60}; Path=/; SameSite=Lax${secure}`;
  window.bmLoadGtm?.();
  pushConsent(true);
}

export function rejectConsent(): void {
  const wasGranted = hasConsent();
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  if (wasGranted) pushConsent(false);
}
