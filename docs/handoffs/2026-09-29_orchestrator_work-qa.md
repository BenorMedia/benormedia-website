# Handoff — orchestrator — Work page QA fixes

Date: 2026-09-29 · Author: orchestrator · Branch: `chore/phase5-secondary-qa` · Status: DONE (lead visual QA pending)

## What I did
- **W-5, manual order (Work only).** `client.orderRank` from `@sanity/orderable-document-list` (hidden, read-only). Studio → Clients is now a drag-and-drop list and new clients go to the end. The initial order is the `docs/refs/work/work-list.jpg` order (Surfe, Puzzle, HireArt … Novo, 56 clients), seeded with `pnpm seed:client-order` (`scripts/sanity/seed-client-order.ts`, same ranks as the plugin's "Reset order"; published documents patched directly, no drafts). Schema deployed (`pnpm schema:deploy`). Only `ALL_CLIENTS` sorts by it (`order(orderRank asc, name asc)`). `CLIENTS_BY_IDS` (Home, Pricing, service pages) and `ALL_CLIENTS_WITH_LOGO` are unchanged.
- **CLI workaround.** With the plugin imported, `sanity schema deploy` / `manifest extract` failed with "exports is not defined": the CLI loads the Studio config through Vite with `ssr.noExternal: true`, which inlines CommonJS `lexorank` as ESM. `sanity.cli.ts` now sets `vite.ssr.external: ['lexorank']` (an explicit external wins over `noExternal: true`).
- **W-6, AI & Technology tab** and **W-7, filter in the URL** in `WorkListing.astro`.
- **W-3 / W-12, SEO in code.** `/work` no longer fetches `workPage`. Meta title "Our Work", meta description 147 characters, both `TODO: COPY`. The hero description is unchanged. The `workPage` schema type is kept (not deleted): Studio "Work Page" singleton, `links.ts`, `types.ts`.
- **Lead visual QA.**
  - `PageHero` padding-top 7.5rem (every page hero: Work, Pricing, Testimonials, service).
  - Work listing padding-top 7.5rem.
  - Filters → list 3rem.
  - ClientList hover rework (below).

### Tab → category mapping (`WorkListing.astro`)
| Tab | `?category=` | Category slugs | Clients (2026-09-29 → 2026-09-30) |
|---|---|---|---|
| View All | none | every client | 56 |
| Professional Services | `professional-services` | `professional-services` | 6 → 7 |
| SaaS / B2B Tech | `saas-b2b-tech` | `saas-b2b-tech`, `saas` | 12 → 19 |
| AI & Technology | `ai-technology` | `ai-technology`, `marketing-tech`, `sales-tech` | 9 → 6 |
| Agency | `agency` | `agency` | 2 → 7 |

A tab with 0 matching clients is dropped at build time.

### URL behavior
- The active filter is written as `?category=<tab value>` with `history.replaceState`, so tab changes add no history entries and Back leaves the page. "View All" removes the parameter.
- On load, a valid `?category=` opens that tab.
- An unknown value, or a tab dropped at build, falls back to View All and the parameter is removed. Other query parameters (e.g. `utm_*`) are kept.
- Canonical stays `/work`.

### ClientList hover (every page)
- The lead's item styles (`translateY(-0.4rem)`, `box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.07)`, `transition: all 0.2s linear`, no z-index on hover) are applied to `.c-client-list__row` when the `<li>` is hovered. The row is the only visible part of the item, so the result looks the same.
- The preview moved out of the row and is now the row's sibling inside the `<li>`. The `<li>` has no transform and no z-index, so it is not a stacking context and the preview's `z-index: 1` paints above every row, uncropped. A transform on the `<li>` would have trapped the preview under the following rows.
- The preview has a fixed 15.58rem height and only fades in (opacity), once its screenshot has loaded. Keyboard: `a.c-client-list__row:focus-visible + .c-client-list__preview`.
- Hover is read on the `<li>` (it doesn't move), so the lift can't flicker at the row's bottom edge.

## Files changed
- `sanity/schemaTypes/documents/client.ts`, `sanity/structure.ts`, `sanity.cli.ts`
- `scripts/sanity/seed-client-order.ts` (new), `package.json` (`seed:client-order`, `@sanity/orderable-document-list`, dev `lexorank`), `pnpm-lock.yaml`
- `src/lib/sanity/queries.ts` (`ALL_CLIENTS` order only)
- `src/components/sections/WorkListing.astro`, `src/components/sections/PageHero.astro`, `src/components/ui/ClientList.astro`, `src/pages/work.astro`
- `docs/SCHEMAS.md` (v0.7), `docs/DECISIONS.md`, `docs/PHASE5_OPEN_ITEMS.md`

## Checks
- [x] `pnpm run build`, `pnpm run check` (0 errors / warnings / hints), `pnpm run lint` pass
- [x] Sanity: 56 clients ranked, 0 without `orderRank`, 0 drafts; first = Surfe, last = Novo
- [x] `/work` (before the lead stopped browser checks): order Surfe → Novo; tabs 56 / 6 / 12 / 9 / 2 with matching live-region text; URL updates per tab with no new history entries; `?category=professional-services` opens that tab; `?category=nonsense&utm_source=test` → View All, `?utm_source=test` kept; Back skips the tab changes; meta description 147 characters, canonical `/work`
- [x] Built HTML: Home, Pricing and the service page list the same pinned order as before (Unit21, DarwinCX, Mashgin, Major Players, HireArt…)
- [ ] Visual: hover lift, shadow and preview fade on Home, Work, Pricing, service (lead)
- [ ] Studio → Clients drag-and-drop list (lead)

## Open questions for the project lead
- See `docs/PHASE5_OPEN_ITEMS.md` W-15 … W-19 (flags).

## TODO markers added
- `TODO: COPY` — `/work` meta title + description (`src/pages/work.astro`)
