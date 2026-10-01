# Handoff — orchestrator — Pricing page QA fixes

Date: 2026-09-29 · Author: orchestrator · Branch: `chore/phase5-secondary-qa` · Status: DONE (lead visual QA pending, not committed)

## What I did
### Written notes
- **P-11 / S-5, Growth name.** Canonical "Growth (AEO/GEO + CRO)" (middle pricing card). The nav dropdown + mobile menu (`Nav.astro`) and the footer (`Footer.astro`) are hardcoded in code (no siteSettings field): both updated. Logged in DECISIONS as the name for the future Growth `service` document.
  - **Not changed (separate content):** the Home Services accordion item "Web Growth (SEO + GEO + CRO)" in `src/components/sections/Services.astro:40`.
- **P-12, FAQ default open.** `FaqSection` opens the first question of the active group on load and on every tab change (no animation). A single-group FAQ opens its first item. Without JS all stay closed. `initTabs` gained `options.onSelect(tab, panel, initial)`. Applies to every FaqSection (Pricing + service).
- **P-8, mobile tabs.** New opt-in `scroll` prop on `SegmentedControl` (`is-scroll`): at ≤767 the items stay on one row with horizontal scroll and a hidden scrollbar. `FaqSection scrollTabs` passes it, and only `/pricing` enables it. `initTabs` scrolls a tab selected by click or arrow key into view inside the tablist (page never scrolls; focus uses `preventScroll`). Arrow keys unchanged.
  - **`/work` filter at 375:** it wraps. The ≤767 rule is `flex-wrap: wrap` and the 5 items don't fit on one row. Not changed.
- **P-25, SEO.** `/pricing` reads `getPageSeo("pricingPage")` → `BaseLayout` → `Seo.astro`. Wired fields and fallbacks:
  | Field | Fallback while empty |
  |---|---|
  | `metaTitle` | "Pricing" (code) → siteSettings default |
  | `metaDescription` | 156-character description (code) → siteSettings default |
  | `ogImage` (+ alt) | siteSettings `defaultOgImage` |
  | `noIndex` | env-driven noindex off production |
  | `canonicalUrl` | site URL + `/pricing` |

  The `pricingPage` **document does not exist** in Sanity yet (query on 2026-09-29), so the fallback renders. Create it in Studio → Pricing Page to override. Not created here.

### Lead visual QA notes (px → rem at 1/14)
- `SectionHeader` gap 1.5rem, **every page**.
- `PricingPlans`:
  - Container padding 7.5rem top / 4.286rem (60px) bottom.
  - Grid wrapped in `.c-pricing-plans__wrap` (flex, centered), grid width 90% (100% ≤991), gap 1rem.
  - Transparent background.
- `PricingCard` (subgrid kept, lead):
  - Card: row-gap 2rem (28px), padding 1.5rem (21px), `align-self: stretch`, 8px radius, 0.8px `--color-border`, `--color-surface-glass` + `backdrop-filter: blur(10px)`.
  - Header gap 1rem. Description `c-paragraph`. Text `--color-black-secondary` (for #222).
  - Price: margin and gap 0, `nowrap` (period always right of the amount).
  - Amount gradient 290deg `--color-blue-light` 8.49% → `--color-blue` 91.51%.
  - Features: no margin, gap 1rem, `--fs-text-s`.
  - Button: 0.75rem vertical padding.
  - **Already matching:** the name spec (Brulia 32.76px / 140%) = `c-text_l`, and the amount spec (77px / 120%) = `c-text_xxl`, so no new scoped type.
  - **Skipped:** the Figma export lines `grid-row: 1 / span 1`, `grid-column: 1 / span 1`, `justify-self: start` and `flex-direction: column`. They would stack the cards in one cell and drop the alignment.
- Line art between hero and cards: `.c-pricing-intro` wraps `PageHero` + `PricingPlans`. It uses the service template's `service-mid-hero-bg` 1x/2x WebP, 137.143rem wide, anchored to the wrapper bottom. The hero is transparent inside it.
- `FaqAccordion` (every page):
  - `max-width: 70%` (100% ≤767).
  - Rows 77px from padding (1.639rem vertical) + `min-height: 5.5rem`, question left / icon right.
  - 8px radius, border, glass + blur.
  - Smooth open / close via `initAccordion` (`src/scripts/ui/accordion.ts`): WAAPI height + answer fade, one open item at a time. `name` moves to `data-accordion-name` so the sibling animates closed. Reduced motion → instant.
  - Icon rotation: CSS transition (`is-closing` turns it back as soon as a row starts closing).
- Token (lead OK): `--color-surface-glass: rgba(255, 255, 255, 0.05)` in `tokens.css` + DESIGN_SYSTEM §4.

## Files changed
- Code: `src/components/layout/Nav.astro`, `Footer.astro`, `src/lib/content/pricing.ts` (comment), `src/styles/tokens.css`, `src/components/ui/SectionHeader.astro`, `PricingCard.astro`, `SegmentedControl.astro`, `FaqAccordion.astro`, `src/components/sections/PricingPlans.astro`, `FaqSection.astro`, `src/pages/pricing.astro`, `src/scripts/ui/tabs.ts`, `src/scripts/ui/accordion.ts` (new)
- Docs (local, not committed): `DESIGN_SYSTEM.md` §4, `DECISIONS.md`, `PHASE5_OPEN_ITEMS.md`, this handoff

## Checks
- [x] `pnpm run build`, `pnpm run check` (0 / 0 / 0), `pnpm run lint` pass
- [x] Built HTML:
  - "Growth (AEO/GEO + CRO)" in nav + footer on every page, no old label left.
  - The Pricing FAQ tablist has `is-scroll`; the service FAQ doesn't.
  - `.c-pricing-intro` + `__wrap` present.
  - `<details name>` kept for no-JS, none open in the HTML.
  - `/pricing` title / description = code fallback.
- [ ] Visual at 1440 / 991 / 767 / 375 (lead): nav + footer label, first question open on load and on tab switch, mobile tab scroll, FAQ animation, card and line-art look

## Open questions for the project lead
- See `docs/PHASE5_OPEN_ITEMS.md` P-32 … P-36.
