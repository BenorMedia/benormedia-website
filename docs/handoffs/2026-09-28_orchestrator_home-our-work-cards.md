# Handoff — orchestrator — Home Our Work (part 1: header + card grid)

Date: 2026-09-28 · Branch: `feat/phase4-home-part2` · Status: DONE (awaiting lead review)

Built directly by the orchestrator (small, cross-cutting task: query + UI primitive + section). Ref: `docs/refs/home/our-work-part-1.jpg`.

## What I did
- New section `c-work` (`OurWork.astro`) after Services: centered `SectionHeader` ("Our Work" eyebrow, title, subtitle) + 3×2 card grid (2 cols ≤991, 1 col ≤767).
- `ClientCard` gained `variant="grid"`: `cardThumbnail` (547×360 aspect, hotspot crop, srcset 547/820/1094) → footer row, space-between: client logo (in `<h3>`, alt = client name) left, tags right (funds raised, then category in accent).
- `Tag` primitive rebuilt to the Eyebrow box spec, with `default` + `accent` variants (was a pill placeholder, only used on the styleguide).
- `SectionHeader` title supports `\n` → `<br />` so the heading breaks after "B2B" as in the design.
- `CLIENTS_BY_IDS` now projects `cardThumbnail`.
- Sizing derived from the ref at 1 ref px = 1/16 rem (ref is a 1:1 export of the 1920 frame; thumbnails are 547×360 exactly).

## Files changed
- `src/components/sections/OurWork.astro` (new)
- `src/components/ui/ClientCard.astro` (grid variant; featured variant untouched)
- `src/components/ui/Tag.astro`
- `src/components/ui/SectionHeader.astro`
- `src/lib/sanity/queries.ts`
- `src/pages/index.astro`
- `docs/DECISIONS.md`, `docs/BUILD_PLAN.md`

## Checks
- [x] `pnpm run build` passes
- [x] `pnpm run check` passes (0 errors / 0 warnings / 0 hints)
- [x] `pnpm run lint` passes
- [x] Headless Chrome screenshots at 1440 / 800 / 390: grid 3 → 2 → 1 columns, all 6 clients render with thumbnail, logo and category tag. Not checked at 991 / 767 exactly.

## Data notes (Sanity, published)
- All 6 clients have `cardThumbnail`, `logo`, `category`.
- `fundsRaised` is null on all 6 → funds tag hidden (no invented copy).
- Categories render real data (Sales Tech, Fintech, E-Commerce, Consumer, Design Studio, Marketing), not the ref's repeated "Sales Tech".

## Requests for other agents
- @sanity: fill `fundsRaised` once the lead supplies amounts; replace Garaje de Ideas `cardThumbnail` when the correct asset arrives.
- @qa: review before PR into `dev`.

## Open questions for the project lead
See `DECISIONS.md` → "Raised in Phase 4 part 2": funds amounts, Garaje asset, header→content spacing (≈5.5rem in refs vs 3rem built), logo optical sizing, card hover spec.

## TODO markers added
- `TODO: DS` — tag specs (`Tag.astro`), tag gap (`ClientCard.astro`), header→grid spacing (`OurWork.astro`).
- `TODO: COPY` — none.

## Lead visual QA (2026-09-28) — applied
- Logo img: `height: 2rem; max-width: 9rem`, then reduced 30% → `height: 1.4rem; max-width: 6.3rem`. Then split: `is-compact` (Surfe, Arrows) keeps 1.4rem / 6.3rem; default (Puzzle, Sprii, Garaje, SimpleTiger) → `height: 2.35rem; max-width: 11.2rem`.
- Thumbnail + img: `border-radius: 0.625rem` (10px).
- Grid card gap (thumb → footer): `1.8rem`; footer `padding-bottom: 1.3rem`.
- `.c-work__grid`: `column-gap` / `row-gap` `1.3rem`.

---

## Part 2 — shared ClientList (2026-09-28)

Ref: `docs/refs/home/clients-list.png` (static), `clients-list-hover.png` (hover — built, see below).

### What I did
- New shared `src/components/ui/ClientList.astro`: `<ul>` of rows. Row = grid `minmax(0,1fr) 18.75rem 2.5rem`, row height 3.5rem, gaps 1.5rem, padding 0.875/1.375/1.875/1.375rem, radius 0.5rem, `--border-default`, white bg. Left: 3.5rem icon box (0.5rem padding, img 90%/90% contain) + name (`c-text_m`). Middle: funds + category `Tag`s, right-aligned. Right: 15px arrow (`--color-text`).
- Rows overlap 0.875rem (14px) so the 30px bottom padding reads as a stacked deck, matching the ref stride.
- Props: `clients`, `limit?`, `class?`. Links to `websiteUrl` in a new tab only when set.
- `OurWork` gets `listClients`; wrapper `.c-work__list` (flex, center, `margin-top: 2.5rem`). Component has no width: `max-width: 85%` (100% ≤767), `margin: 0 auto`, `flex-grow: 1` so it fills flex wrappers instead of shrinking to content. Section sets no width. Measured: 85% of wrapper at 1440/1200/900, 100% at 390. Home pins 9 clients: Unit21, DarwinCX, Mashgin, Major Players, HireArt, Resourcify, Userled, Sublime Security, Notable Capital.
- Fixed icon URLs to width-only: width + height made the Sanity builder crop a square and clip wide icons.

### Usage elsewhere
```astro
const clients = await getClientsByIds([...ids]);
<div class="my-wrapper"><ClientList clients={clients} limit={9} /></div>
```

### Checks
- [x] build / check / lint pass
- [x] Screenshots 1440 + 390 (iframe). Tags wrap to a second line on mobile.

### TODO markers added
- `TODO: DS` — icon → name gap, tag gap, mobile layout (`ClientList.astro`).

### Hover state (lead spec 2026-09-28)
- Added on top of the lead-restored file; no existing style rules changed.
- Arrow: path fill moved to CSS; hover → `--color-accent`, svg `rotate(-30.963deg)`, both on `--duration-hover` / `--ease-smooth`.
- `.c-client-list__preview` (only when `websiteScreenshot` exists): absolute, centered on the row's 56px track, `34.125rem × 17.3125rem`, radius `0.875rem`, lead-approved shadow `0 0.6875rem 1.48125rem 0.125rem rgba(0,0,0,0.2)`. Reveal = wrapper height 0 → 17.3125rem with the image fixed-size and centered inside, so it opens from the middle without stretching. `pointer-events: none`, `aria-hidden`.
- Hovered `<li>` gets `z-index: 1`; it drops back only after the close transition so the preview isn't cut by the next row while closing.
- Opens on any `:hover` (no `hover: hover` media gate); linked rows also open it on `:focus-visible`. Reduced motion handled by the global rule.
- Verified with a real mouse hover (Chrome DevTools protocol, 1440): preview opens to full height, all 9 screenshots load before hover, arrow accent + rotated.
- Lead visual QA: preview height −10% → `15.58rem`, width auto (box shrinks to the image). Sanity URL is height-only (`h=500&fit=max`, no crop) and `<img>` width/height come from the asset id, so the full screenshot shows. Verified at 1440: 382×218px = the screenshots' 1.75 ratio.

## "View All" CTA (2026-09-28)
- `.c-work__cta` below `.c-work__list`: flex, centered both axes, `margin-top: 2.5rem` (40px).
- `<Button variant="gradient" href="/work">View All 100+ Projects</Button>` with the lead's arrow SVG in the new `icon` slot, `1.5rem` (24px), stroke `currentColor` (white via `.c-button__icon`).
- `Button.astro` + `buttons.css`: optional `icon` named slot → `<span class="c-button__icon" aria-hidden="true">`. Existing buttons unchanged (slot renders only when used).
- `TODO: DS` — gap between button text and icon (0.5em).
- Verified at 1440: centered, 2.5rem gap, 1.5rem icon.
