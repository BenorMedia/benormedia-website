# Handoff — orchestrator — Testimonials page QA fixes

Date: 2026-09-29 · Author: orchestrator · Branch: `chore/phase5-secondary-qa` · Status: DONE (lead visual QA pending, not committed)

## What I did
- **T-18, SEO wiring (report only, no code change).** `/testimonials` reads `getPageSeo("testimonialsPage")`. That result goes to `BaseLayout pageSeo`, then to `Seo.astro`.

  | Field | Fallback while empty |
  |---|---|
  | `metaTitle` | "Testimonials" (code) → siteSettings default |
  | `metaDescription` | 146-character description (code) → siteSettings default |
  | `ogImage` (+ alt) | siteSettings `defaultOgImage` |
  | `noIndex` | env-driven noindex off production |
  | `canonicalUrl` | site URL + `/testimonials` |

  The `testimonialsPage` **document does not exist** in Sanity yet (query on 2026-09-29), so the code fallback renders. Create it in Studio → Testimonials Page to override. Not created here.

- **Lead visual QA, `TestimonialsGrid.astro` (`/testimonials` only):**
  - Container padding-top 7.5rem (was 7.286rem).
  - List gap 1.2rem (was 1.429rem).
  - Cards are solid `--color-white` with no blur, scoped to this page.

- **Lead visual QA, `TestimonialCard.astro` (shared by every `TestimonialMarquee` on Home, Work, Pricing and the service template, and by the grid).** px → rem at 1/14 (G-26):
  - Padding 2.714rem 2.429rem (38 / 34px; the old 2.375 / 2.125rem were 1/16).
  - Gap 1.714rem (24px).
  - Radius 14px.
  - Background `--color-surface-glass`: the same rgba(255, 255, 255, 0.05) as the old `color-mix`, now the token.
  - Blur 10px.
  - **Already correct, unchanged:** border `--border-default` (#E4E6EA), `flex-direction: column`, `align-items: flex-start`.
  - **Not in the notes, unchanged:** the card size, 34rem × 23.03rem.

## Files changed
- Code: `src/components/ui/TestimonialCard.astro`, `src/components/sections/TestimonialsGrid.astro`
- Docs (local, not committed): `PHASE5_OPEN_ITEMS.md` (T statuses, T-19 … T-21), `DECISIONS.md`, this handoff

## Checks
- [x] `pnpm run build`, `pnpm run check`, `pnpm run lint`
- [x] Built CSS: the card rule has the new padding, gap, radius and glass token. The grid override (white, no blur) exists only on `/testimonials`.
- [ ] Visual (lead): the grid, plus the marquees on Home, Work, Pricing and the service page

## Open questions for the project lead
- T-21: the card keeps its fixed 1/16 size while the new padding is at 1/14, so long quotes may crowd the author row.
