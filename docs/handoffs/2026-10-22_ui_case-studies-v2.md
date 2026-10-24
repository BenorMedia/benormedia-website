# Handoff — ui — case studies v2 (updated Figma)

Date: 2026-10-22 · Author: ui agent · Branch: `feat/case-studies-v2` · Status: DONE (not committed)

Figma `ipKvlka3lQ7tSWAtq3wSGa`: index 3790:36365, template 3790:36532, card 3798:19207 / 3798:19459, index hero background 3803:27030. Item numbers below refer to the read-only comparison `differences.md` (scratchpad `figma-v2/`).

## What I did (per Figma item)

| # | Item | Status |
|---|---|---|
| 1, 2 | Index hero background: 3 rings + 11 client icon tiles + white radial fade | Done. New `CaseStudiesIndexHero` (case studies only; `PageHero` untouched). Tiles from `getAllClientsWithIcon()`, first 11 by name: 12th Street Catering, Aerial, Arrows, Bambi Health, Base Operations, Canals, Candybox, Clerk, DarwinCX, DeepSeas, Dimensions, placed in Figma layer order. Tile 84px, 12px radius, 1.5px `--color-border`, 51px icon. Fills by tile position (lead 2026-10-22 follow-up): see "Tile fills" below; Figma's two small rotations dropped (179.55° would flip a real logo). Decorative: `aria-hidden`, `alt=""`, fixed sizes, no motion |
| 3 | Hero padding | Done: 110px nav → container (Figma body padding) + 120px inside; below: 120px + Figma's 100px gap, then the listing's 110px |
| 4 | Hero title 60px / 1.4 | Done, `4.286rem`, `TODO: DS` |
| 5 | Description 662px wide | Done, `max-width: 47.321rem`, `TODO: DS` |
| 7 | Card width (1680 vs 1230 container) | Kept the 1230px container (lead 2026-10-22: whole page) |
| 13 | Hero date 18px | Done (date and read time), `1.286rem`, `TODO: DS` |
| 15 | Hero intro Manrope | Body font kept (Manrope is not loaded; no font added), `TODO: DS (Figma: Manrope, not loaded)` |
| 24 | Phase rule full height | Done, `top: 0` |
| 25 | Phase rule + hero divider #D6D6D6 | Done, Figma value, `TODO: DS`. The hero has one such divider (3790:36612); the facts panel's dividers are white 50% in Figma and are unchanged |
| 26 | "The indicators:" weight | 500 |
| 28 | Related heading → cards 60px | Done (`CaseStudyGrid` resources `margin-top: 4.286rem`) |
| 29 | Related "Get in Touch" button | Removed; `CASE_STUDY_COPY.relatedButton` removed (no other use) |
| 30 | Related heading colour #001F3D | `--color-navy` (Figma still uses #001F3D there) |
| 34 | Navy thumbnail | `--color-navy` |
| 35 | Orbit rings | Removed |
| 36 | Glow #1355FF 40%, blur 75.36 | `--color-blue-500`, opacity 0.4, `stdDeviation 75.36` |
| 37 | White logo | `client.logoOnDark` when set, else `logo` + `filter: brightness(0) invert(1)`, else the name in white (`CaseStudyLogo` new `onDark` / `whiten` props; facts panel unchanged) |
| 38 | Logo box squares | Same values as before (white, 0.5px gray border); now read as solid white on navy, as Figma |
| 39 | Stats row | Done from `cardStats` (max 2, items with both value and label), hidden when empty: 0.5px `--color-gray` top rule, 16px top padding, 40px gap, items centred, 7px value → label. Value `c-text_m` (Figma Text M, same class as the card title) in `--color-blue`, line-height 1.5. Label: 1px `--color-border`, 3px radius, Figma padding and tracking in em, uppercase, `--color-text`, body font at `--fs-text-xs` (Figma SF Pro 10.5px, `TODO: DS`), min width = Figma's 94.6px text box |
| 40 | Body gaps | 32px tags → title block → "Learn more", 24px title → stats. The title block takes the free height so "Learn more" lines up in a row |
| 41 | Card height | Follows (552px at 398px wide with stats) |
| 42, 43 | Short date, 12.6px tags, "Learn more" size | Unchanged (logged decisions) |
| 6, 18, 19, 45 | Copy | Unchanged placeholders |

Also: tokens `--color-navy` (#001F3D) and `--color-blue-500` (#1355FF), each commented "case-study card; pending Sergio's OK (DECISIONS 2026-10-22)". The glow token follows the Figma-name pattern of `--color-grey-700`. `DESIGN_SYSTEM.md` not edited.

`/dev/case-study` shows every template and card change (fixture `cardStats` from the astro agent). The index hero is **not** added to its "Index card" block: it would add a second `<h1>` and a Sanity fetch to the preview; `/case-studies` shows it.

## Tile fills by position (lead follow-up, 2026-10-22)
> **Superseded (2026-10-22, DECISIONS):** only tile 4 keeps a fill (#95A78D, now the token `--color-tile-sage`); tiles 7, 8, 9 and 11 are white until the fixed client list exists. The table below is the original five-fill build.

The five tiles coloured in Figma 3803:27030 keep Figma's fill at that position whatever icon lands there; the other six stay white. Component-scoped `--c-cs-index-hero-tile-bg`, each value `/* TODO: DS */`. Figma keeps the 1.5px #E4E6EA border and 12px radius on filled tiles, so they are kept too.

| Tile (Figma node) | Fill | Client icon there | Legibility |
|---|---|---|---|
| 4 (3804:27327) | #95A78D | Bambi Health | OK (navy B + teal on sage) |
| 7 (3804:27348) | #EA515B | Candybox | Weak: its pink / red pixels blend into the red; the blue and teal pixels read |
| 8 (3803:27300) | #E74724 | Clerk | Weak: the orange half of the plane disappears on the orange-red; the teal half reads |
| 9 (3803:27293) | #001F3C | DarwinCX | Poor: a black wordmark on navy, nearly invisible (the tile also sits under the white fade, so it looks grey, as in Figma) |
| 11 (3803:27305) | #0065FF | Dimensions | Poor: a blue / purple mark on blue; also half clipped by the hero top, as in Figma |

Icon assignment unchanged (first 11 by name). ≤991 hides tiles 3, 7, 8 and 11 as before, so tiles 4 and 9 keep their fills there; ≤767 shows no tiles. Screenshots: `shots/hero-fills-1920.png`, `hero-fills-1440.png`, `hero-fills-991.png`. After this change: `pnpm run check` (0 / 0 / 0), `pnpm run lint` and `pnpm run build` pass.

The lead approved the token names (pending Sergio), the alphabetical 11 tiles for now, the Figma hero spacing, stat values in the card-title style and the responsive list (DECISIONS rows updated; open question "Hero tiles: fixed list" added).

## Files changed
- `src/styles/tokens.css` (2 tokens)
- `src/components/case-studies/CaseStudiesIndexHero.astro` (new)
- `src/components/case-studies/CaseStudyCard.astro`
- `src/components/case-studies/CaseStudyLogo.astro`
- `src/components/case-studies/CaseStudyGrid.astro`
- `src/components/case-studies/CaseStudyRelated.astro`
- `src/components/case-studies/CaseStudyBody.astro`
- `src/components/case-studies/CaseStudyHero.astro`
- `src/components/case-studies/CaseStudyListing.astro` (comment only)
- `src/components/case-studies/copy.ts` (`relatedButton` removed)
- `src/pages/case-studies/[...index].astro` (new hero + `getAllClientsWithIcon`)
- `docs/DECISIONS.md` (one Proposed row, open questions)

## Responsive choices (no mobile / tablet design) for the lead's review
1. Index hero frame: drawn at 91.667% of the viewport width (exactly Figma's 1760px at 1920, capped at 125.714rem), centred; tile centres are percentages of the frame, so the composition scales with the viewport while the text keeps its size.
2. Ring clipping: the hero clips the layer (`overflow: clip`) at its top (nav bottom) and bottom (listing top); no horizontal overflow at any width.
3. Below Figma's fade box the layer is white, so when the frame shrinks the rings fade out instead of showing a hard cut.
4. ≥992: all 11 tiles at 84px.
5. ≤991: the 4 tiles nearest the text (Figma 3803:27286, 3804:27348, 3803:27300, 3803:27305) are hidden; the other 7 shrink to 64px (10px radius, 45px icon).
6. ≤767: no tiles; rings only (faint behind the text).
7. ≤767 hero spacing: the site's mobile hero values (5rem above, nothing below; the listing's 5rem follows), instead of Figma's 110 + 120 / 120 + 100.
8. Hero title stays 4.286rem at every width (≈51px at 991, ≈39px at 390, follows the fluid root); description max-width 662px is wider than mobile, so it fills the container.
9. Card stats row: wraps to a second line only if two labels can't fit (no case at 390); label min width = Figma's box, longer labels grow up to the card width.
10. Card height: one card per row at ≤991 (existing grid rule); the stats row adds ~100px per card.
11. Card tags may wrap at ≤767 (existing rule, unchanged).
12. Navy thumbnail, glow, white logo: same at every width (thumbnail keeps the 532:243 ratio).
13. Related section: 60px heading → cards at every width (rem, scales with the root).
14. Phase rule full height at every width; ≤767 keeps the existing 1.778rem left padding.

Checked at 1920, 1440, 991, 767, 390: `document.scrollWidth == clientWidth` on `/case-studies` and `/dev/case-study` at all five widths.

## Checks
- [x] `pnpm run build` passes (normal build: `/case-studies` = hero + 1 card, `/case-studies/placeholder-surfe` and `/dev/case-study` render)
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint` passes
- [x] Production-like build (`PUBLIC_SITE_ENV=production PUBLIC_SITE_URL=https://www.benormedia.com`) stops on the Lorem ipsum guard only: "[case-studies] Build stopped on purpose: a case study is published, so /case-studies would go live with placeholder copy" (hero title, gradient part, description, meta description). Expected (placeholder-surfe is published).
- [x] Non-case-study output: a build made before my edits (current tree with only the sanity / astro agents' case-study query and type changes) vs after: all 41 other HTML / XML / TXT files (Home, /work, /pricing, every service page, /blog, every post, guides, legal, /dev/styleguide, sitemaps) are byte-identical once the shared CSS file name is normalized (`BaseLayout.CexeFB12.css` → `BaseLayout.D1ofqEhe.css`). That CSS file's only change is the two new tokens in `:root`. Every other asset is identical. A clean HEAD export couldn't be built (it needs the repo's `.env`, which I may not copy).
- [x] Checked at 1920 / 1440 / 991 / 767 / 390

Screenshots (scratchpad `figma-v2-build/`): `shots/index-{1920,1440,991,767,390}.png`, `shots/template-{1920,1440,991,767,390}.png`, `shots/card-{1920,1440,390}.png`, `shots/related-1920.png`, `shots/hero-1440.png`, `shots/phase-390.png`; Figma references in `figma/` (`figma-index-body.png`, `figma-index.png`, `figma-template.png`, `02-index-card-figma.png`, `03-related-figma.png`).

## Requests for other agents
- @sanity: none. (A per-client tile colour would need a field if the lead wants Figma's coloured tiles.)
- @astro: none. I edited `src/pages/case-studies/[...index].astro` (hero swap + `getAllClientsWithIcon()` call); no change to `src/lib/sanity/*`.

## Open questions for the project lead
1. Tokens `--color-navy` / `--color-blue-500` (name OK?), pending Sergio.
2. Index hero tiles: white (no colour data) and the first 11 clients by name. OK, or a fixed list?
3. Hero spacing 110 + 120 / 120 + 100 (Figma) instead of the site's 7.5rem hero top.
4. Stat value at `c-text_m` (25.9px at 1920, same as the card title) vs Figma's literal 30px.
5. The responsive list above.

## TODO markers added
- `TODO: DS` — index hero tile fills #95A78D / #EA515B / #E74724 / #001F3C / #0065FF; index hero title 60px; description 662px; hero rings #0C1627 → `--color-heading`; hero date 18px; hero intro Manrope (not loaded); hero divider and phase rule #D6D6D6; card stat label SF Pro 10.5px → `--fs-text-xs`; empty index spacing (existing).
- `TODO: COPY` — none new (fixture stat placeholders are the astro agent's).
- Note: weight 500 for "The indicators:" renders as the nearest loaded Acumin weight until the Adobe kit is set (tokens: `TODO: FONTS`).
