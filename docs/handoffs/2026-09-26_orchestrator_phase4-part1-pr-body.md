# Handoff — orchestrator — Phase 4 Home part 1 PR body

Date: 2026-09-26 · Branch: `feat/phase4-home-part1` · Status: READY FOR REVIEW (0 blockers · 6 design-fidelity notes for Lead)

## What I did
Orchestrated Day 4 of `docs/BUILD_PLAN.md` — first four Home sections (Hero · Logo strip · Featured Work · Services accordion). Sync'd `dev` (picked up `chore/content-import` merged as `f75aa36`), cut `feat/phase4-home-part1`, moved three ref assets into `public/images/home/`, then delegated in parallel to `sanity` + `ui`, sequentially to `astro`, and read-only to `qa`. All checks pass; dev server serves `/` at HTTP 200 with all four section classes + 9 `data-anim` hooks in the DOM.

Content model decision recorded here: **all Home copy is authored statically in Astro** (per Lead confirmation). The v0.5 "singletons = SEO only" rule stands — no `homePage` schema changes, no client-validation changes. Sanity is only consulted for the pinned client lists (7 logos, 2 featured cards).

## Files changed
**New — sections**
- `src/components/sections/HomeHero.astro`
- `src/components/sections/LogoStrip.astro`
- `src/components/sections/FeaturedWork.astro`
- `src/components/sections/Services.astro`

**New — UI primitives**
- `src/components/ui/Stat.astro`
- `src/components/ui/SectionHeader.astro`
- `src/components/ui/ClientCard.astro`

**New — assets**
- `public/images/home/hero-lines-left.png`
- `public/images/home/hero-lines-right.png`
- `public/images/home/services.png`

**Modified**
- `src/lib/sanity/queries.ts` — added `CLIENTS_BY_IDS` fragment + `getClientsByIds(ids)` fetcher (order-preserving; warns on missing IDs)
- `src/pages/index.astro` — rewritten to wrap `BaseLayout` and render the four sections with parallel `Promise.all` fetches

**Untracked design refs to include in this PR**
- `docs/refs/home/*.jpg` (7 files — Phase 4/5 section refs)
- `docs/refs/home-hero-lines-left.png`, `home-hero-lines-right.png`, `home-services-image.png` (public sources)
- `docs/refs/technologies-image.svg`, `docs/refs/testimonials-component.jpg` (carryover, referenced Day 5)

**Not touched** (Lead-gated)
- `sanity/schemaTypes/**`, `sanity.config.ts`
- `src/styles/tokens.css`
- `docs/DESIGN_SYSTEM.md`, `docs/SCHEMAS.md`, `docs/BUILD_PLAN.md`

## Checks
- [x] `pnpm run build` passes — 4 pages, 7.05 s
- [x] `pnpm run check` passes — 54 files, 0 errors / 0 warnings
- [x] `pnpm run lint` passes
- [x] Dev server smoke — `GET /` → 200, 70 741 bytes; DOM contains `c-hero`, `c-logos`, `c-featured`, `c-services`, `c-stat`, `c-container`; 9 `data-anim` hooks emit (2× `card-reveal`, 2× `counter`, 1× `hero-headline`, 2× `hero-lines`, 1× `logos-marquee`, 1× `services-image`); Sanity `cdn.sanity.io` URLs render for all 7 logos and both featured screenshots; accordion first panel `aria-expanded="true"`, others `hidden`
- [ ] Checked at 1440 / 991 / 767 / 375 — deferred to Lead browser review (QA cannot drive a browser)

## Constituent handoffs
- `docs/handoffs/2026-09-26_sanity_home-client-fetcher.md` — CLIENTS_BY_IDS + fetcher; all 9 pinned client IDs verified present against `production`
- `docs/handoffs/2026-09-26_ui_home-primitives.md` — Stat, SectionHeader, ClientCard
- `docs/handoffs/2026-09-26_astro_home-part1.md` — 4 sections + `index.astro` rewire; accordion keyboard behaviour scoped-`<script>`
- `docs/handoffs/2026-09-26_qa_phase4-part1-review.md` — PASS WITH NOTES, 0 blockers, 6 should-fix design-fidelity items

## Requests for other agents
None until the Lead answers the open questions below. Once decisions land:
- **@ui:** `is-on-dark` variant on `Eyebrow`; `Button.astro` spreading unknown attrs so `data-open-contact` works without `.js-open-contact` fallback; optional `ClientCard` "brand tile" mode.
- **@astro:** apply `SectionHeader align="center"` on Featured Work + Services; swap Services column order; thread hero-on-gradient styling once decided.

## Open questions for the project lead

**Design fidelity (needs a call before any polish pass)**
1. **Hero background** — ref shows gradient with white text + `white`/`glass` button variants. Current build renders on white bg with `gradient`/`gradient-outline` buttons. Which is correct?
2. **Featured Work + Services header alignment** — center per refs, currently `left`.
3. **Services column order** — ref has diagram left / accordion right with CTAs under the diagram. Current is inverted.
4. **LogoStrip title** — plain `<h2 class="c-text_m">` vs. pill-eyebrow treatment.
5. **Services image behaviour** — single composite vs. per-tab illustrations (three images swapped on accordion state).
6. **Featured card layout** — 1:1 grid with screenshot every time (current) vs. asymmetric "brand tile" (wordmark on solid bg) alternating with testimonial block.

**Copy + spec (unblocks removing TODOs)**
7. Hero eyebrow, description, social-proof pill avatar assets/source
8. Featured Work + Services descriptions
9. Three service item descriptions (Web Design, Web Development, Web Growth (SEO + GEO + CRO))

**Design system TODOs (carryover)**
10. Section vertical rhythm (`.c-container { padding: 5rem 7.5rem }` still a placeholder)
11. Card border-radius + padding (currently `8px` / `1.5rem`)
12. KPI value color — `--color-blue` vs. `--color-accent`
13. Adobe Fonts kit ID (Phase 1 carryover — body renders in system sans until resolved)

## TODO markers added
- `TODO: COPY` — 6 locations
  - `HomeHero.astro:52` (eyebrow)
  - `HomeHero.astro:56` (hero description)
  - `FeaturedWork.astro:26` (section description)
  - `Services.astro:38` (section description)
  - `Services.astro:70,80,90` (three service item descriptions)
  - `ClientCard.astro:126` (no-testimonial fallback body)
- `TODO: DS` — 7 locations, all in the new primitives, all closest-token stopgaps
  - `Stat.astro:32` (value/label gap)
  - `SectionHeader.astro:58` (eyebrow/title/description rhythm)
  - `SectionHeader.astro:81` (description offset)
  - `ClientCard.astro:137` (grid column ratio)
  - `ClientCard.astro:143` (card border-radius)
  - `ClientCard.astro:178` (body internal spacing)
  - `ClientCard.astro:249` (KPI gap)

## Phase 6 animation wishlist (from `data-anim` hooks shipped)
| Hook | Section | Intended motion |
|---|---|---|
| `hero-lines` (×2) | HomeHero | Slow parallax / drift on the decorative background lines |
| `hero-headline` | HomeHero | Word-by-word fade-in on load |
| `counter` (×2) | HomeHero stats | Count-up animation when the stats scroll into view |
| `logos-marquee` | LogoStrip | Infinite horizontal marquee (desktop only? — Q for Lead) |
| `card-reveal` | FeaturedWork (per card) | Scroll-in reveal (fade + rise) |
| `services-image` | Services | Swap image / cross-fade when a new accordion item opens (Q5) |

## Suggested PR title + body

**Title**
`Phase 4 Home (part 1): Hero, Logo strip, Featured Work, Services accordion`

**Body**
```
Day 4 of BUILD_PLAN. First four Home sections wired against the visual refs
under docs/refs/home/. All Home copy is static in Astro; Sanity is consulted
only for the pinned client lists (7 logos, 2 featured cards) via a new
CLIENTS_BY_IDS query + order-preserving getClientsByIds fetcher. No schema
changes, no client-validation changes.

## What's in
- src/components/sections: HomeHero, LogoStrip, FeaturedWork, Services
- src/components/ui: Stat, SectionHeader, ClientCard
- src/lib/sanity/queries.ts: CLIENTS_BY_IDS + getClientsByIds
- src/pages/index.astro: rewired through BaseLayout with parallel fetches
- public/images/home/: hero-lines-left/right + services PNGs
- 5 handoffs under docs/handoffs/2026-09-26_*

## Checks
- pnpm run build · check · lint — all pass
- Dev server GET / → 200; 9 data-anim hooks in DOM; 7 logos + 2 screenshots
  render from cdn.sanity.io; accordion state correct
- Visual review at 1440 / 991 / 767 / 375 — pending Lead browser pass

## Not in (design-fidelity items for Lead call — see PR review)
- Hero on-gradient styling + button variant swap
- FeaturedWork / Services header centering
- Services column order swap
- LogoStrip title pill
- ClientCard "brand tile" mode

## QA
PASS WITH NOTES, 0 blockers. Full report:
docs/handoffs/2026-09-26_qa_phase4-part1-review.md

## Follow-up
Phase 6 animation wishlist + 13 open questions consolidated in the
orchestrator handoff:
docs/handoffs/2026-09-26_orchestrator_phase4-part1-pr-body.md
```
