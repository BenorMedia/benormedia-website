# Handoff — qa — Phase 5 final review

Date: 2026-09-30 · Author: qa agent · Branch: `chore/phase5-secondary-qa` (vs `dev`, incl. PR #8 + #9) · Status: PASS WITH NOTES

## Gates
- `pnpm run build`: exit 0. 8 pages, `sitemap-index.xml`. Only warning: the upstream react-compiler "use no memo" directive (harmless).
- `pnpm run check`: 0 errors / 0 warnings / 0 hints (90 files).
- `pnpm run lint`: exit 0.
- No secrets in the diff. `tokens.css` / `DESIGN_SYSTEM.md` only add `--color-surface-glass` (lead-approved).

## Must-fix
None confirmed. S1 is probable from the CSS maths; if a browser check confirms it, treat it as must-fix.

## Should-fix
- **S1 — Service Process tab bar can cause horizontal page scroll at 768 → ~846px (iPad portrait).**
  - Where: `ServiceProcess.astro:215-223` (flex, space-between, no wrap above 767) and `:311-315` (active name `max-content`, up to 8.571rem).
  - Min tab bar width ≈ 59.4rem (≈713px at the 12px root) vs ≈505px available at 768.
  - Already on `dev` at 768–~807; this branch widens the range.
  - Fix: use the ≤767 tab rules (wrap, squares only, name collapsed) up to 991, or give the tablist `overflow-x: auto`.
- **S2 — Glass blur lost on Safari ≤17 / iOS 17.**
  - The build strips `-webkit-backdrop-filter` (source: `FaqAccordion.astro:103`, `PricingCard.astro:97`, `TestimonialCard.astro:84`); unprefixed `backdrop-filter` only arrived in Safari 18.
  - The `url()` fallback before `image-set()` is dropped too (`pricing.astro:71`, `FaqSection.astro:180`), so Safari ≤16 shows no background.
  - Fix: explicit `vite.build.cssTarget` including Safari 16/17, or record that Safari ≤17 is accepted.
- **S3 — Every `/work` row is now a link, and its accessible name repeats the client name.**
  - Where: `ClientList.astro:78`, `:116`. All 60 clients have a `websiteUrl`; the icon alt falls back to the name.
  - Screen readers hear "Surfe Surfe $14.0M Raised SaaS / B2B Tech, link"; the new tab opens without warning.
  - Fix: icon `alt=""`; optionally a visually hidden "(opens in a new tab)".
- **S4 — Content: 3 rows link to staging / webflow.io addresses.**
  - `sama--staging.webflow.io`, `rec-philly.webflow.io`, `bank-novo.webflow.io`. The lead replaces them in Studio.
- **S5 — `ALL_CLIENTS` (`queries.ts:224`) doesn't place unranked clients explicitly.**
  - Where API/MCP-created clients land depends on GROQ null ordering.
  - Fix: `order(coalesce(orderRank, "~") asc, name asc)`.
- **S6 — Docs out of date.** Details:
  - W-17: rows are now links.
  - W-22: the 4 clients are published now.
  - G-33: funds tags render on 24 rows.
  - G-8: can be closed.
  - S-33: badges are now 116×116.
  - W-6 and the Work handoff: tab counts are now 7 / 19 / 6 / 7.
  - DECISIONS.md:174 and :88: superseded by row 128.
  - S-18: only "no duplicates within one group"; the two decks per page are still independent.

## Nits
- **`accordion.ts:46-53`:** with `name` removed, a browser-opened `<details>` (find-in-page) can leave 2 open. Add a `toggle` listener that closes the siblings.
- **`accordion.ts:91`, `:117`:** on an interrupted animation the answer opacity jumps. Start from the computed opacity.
- **`WorkListing.astro:153-160`, `:199`:** `syncUrl` rewrites other params (`%20` → `+`, `?flag` → `?flag=`) and calls `replaceState` on every load. Only call it when `category` is present or changed.
- **`cta-badges.ts:111-122`:** rotates off-screen CTAs too (2 loops on the service page) and ignores reduced-motion changes after load. Pause with an IntersectionObserver.
- **`sanity.cli.ts:28`:** `external: ['lexorank']` replaces any existing `ssr.external` instead of adding to it.
- **`/work` SegmentedControl at 768–~840:** 5 tabs are wider than the content box (it overflows into the padding; no page scroll). Check visually.
- **Still open, unchanged:** G-5 / G-6 (`tabs.ts`), G-10 (nav `aria-current`), G-35 (404 canonical), P-33 (clipped focus outline), P-3 / S-6 (placeholder FAQPage JSON-LD on 2 pages).

## Verified OK
- **Reduced motion:** respected everywhere (carousel rule last; JS checks it).
- **Content without JS:** visible (filters / tablists hidden until JS, native `<details name>`).
- **FAQ scripts:** no duplicate listeners.
- **`/work` performance:** 0 of 59 screenshots on load.
- **New images:** all have width / height / alt.
- **Headings:** one h1 and a clean outline per page.
- **Tabs markup and live region:** correct.
- **SEO:**
  - Titles and descriptions (147 / 156 / 146 / 159 chars).
  - Canonical and `og:url` without trailing slash.
  - noindex off production.
  - Sitemap: 5 URLs, `/dev`, `/studio`, `/404` excluded.
  - BreadcrumbList JSON-LD valid.
- **Size:** no new public assets. New JS is small (accordion 1.9 KB, tabs 1.8 KB).
- **Shadows:** only the approved exceptions.

## Could not verify (browser)
- S1, and the `/work` filter width at 768–991.
- Pricing amounts at 992.
- Motion feel (accordion, Process tabs, badge crossfade).
- Hover preview on the last rows.
- Glass / line-art rendering.
- The Studio drag-and-drop list.

## Out of Phase 5 scope
- `robots.txt` and the Webflow redirects (Phase 7).
- `og:image` (G-19).
