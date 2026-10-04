# Handoff — astro — nav links on the header's true center

Date: 2026-10-04 · Author: astro agent · Branch: `feat/preview-nav-center` · Status: DONE

## What I did
- Fixed a Vercel preview comment from the lead: the desktop nav links were centered in the space left between the logo and the "Get in Touch" CTA. Because the logo (about 197px at 1440) is wider than the CTA (about 154px), the links sat 13.6–21.6px right of center (qa: +13.55 at 992, +15.60 at 1100).
- CSS only, no markup changes (`src/components/layout/Nav.astro` `<style>`):
  - Inside `@media (min-width: 768px)`, `.c-nav__inner` is now `display: grid; grid-template-columns: 1fr auto 1fr`. The base rule's `gap: 2rem` and `align-items: center` still apply. `.c-nav__logo` is `justify-self: start` and `.c-nav__cta` is `justify-self: end`. `.c-nav__primary` takes the middle `auto` column.
  - Removed `flex: 1` from `.c-nav__primary`. It does nothing on a grid item, and on ≤767 the element is `display: none`.
  - Burger: it is `display: none` at ≥768, so it is not a grid item. Measured: there are only 3 items and the grid has no implicit 4th column.
  - ≤767: the flex layout (logo + burger) is unchanged. The grid rule lives only in the ≥768 query.
- Commented in place: "Lead preview comment 2026-10-04: links on the header's true center".

## Measurements (Playwright Chromium against `pnpm run dev`, home page)
Δ = center of `.c-nav__list` minus center of `.c-nav__inner`. It equals Δ to the viewport center at every width because the bar is symmetric.

| Width | Before Δ | After Δ | Logo→links / links→CTA space (after) | `.c-nav__inner` overflow | Page h-overflow |
|---|---|---|---|---|---|
| 768 | +17.57px | −0.01px | 38.6 / 73.7px | 0 | 0 |
| 800 | +17.57px | −0.01px | 54.6 / 89.7px | 0 | 0 |
| 880 | +17.57px | −0.01px | 94.6 / 129.7px | 0 | 0 |
| 991 | +17.57px | −0.01px | 150.1 / 185.2px | 0 | 0 |
| 1280 | +19.25px | 0.00px | 272.7 / 311.3px | 0 | 0 |
| 1440 | +21.55px | 0.00px | 319.9 / 363.0px | 0 | 0 |
| 1920 | +21.55px | 0.00px | 320.9 / 364.0px | 0 | 0 |

- The tightest case is 768. Each side column is 183.9px (qa re-measure; first pass said 176px). The logo needs 169px and the CTA 134px, and the list is 256px. All three columns fit, the side columns stay equal, and centering does not drift. The smallest space between logo and links is 38.6px, which is above the 32px (2rem) column gap. No fallback was needed.
- Scrolled / floating state (`is-scrolled`): checked at every width. The bar is 12px wider (no extra side margin), but `.c-nav__inner` is the same, and the deltas match the table.
- Services dropdown: opens on hover at every width. The panel center equals the trigger center (offset 0px), and the panel sits 6–7px below the trigger as before. It moves left with the links (about 17–21px) and stays inside the viewport (at 768 it spans 170.7–443.2px).
- 375: inner is still `display: flex`, logo + burger are unchanged, and the page has no horizontal overflow.

## Files changed
- `src/components/layout/Nav.astro` (styles only)
- `docs/DECISIONS.md` (Global → Decisions row + Needs lead OK item)
- `docs/handoffs/2026-10-04_astro_nav-true-center.md` (this file)

## Checks
- [x] `pnpm run build` passes (Complete!)
- [x] `pnpm run check` passes (105 files, 0 errors / 0 warnings / 0 hints)
- [x] `pnpm run lint` passes (exit 0, no output)
- [x] Checked at 1920 / 1440 / 1280 / 991 / 880 / 800 / 768 / 375

## Requests for other agents
- @sanity: none
- @astro: none
- @ui: none

## Open questions for the project lead
- Confirm the true-center layout on the Vercel preview (logged as `Proposed` in DECISIONS → Global).
- Seen while checking, not caused by this change (the panel is the same width before and after): at 991 the label "Custom Websites & Migrations" in the Services dropdown seems to run a few px past the panel's right edge. Worth a QA look; not touched here.

## TODO markers added
- `TODO: DS` — none
- `TODO: COPY` — none

---

## Follow-up (2026-10-04): Services dropdown label overflow

Status: DONE · approved by the lead via the orchestrator.

### Cause
- The overflow happened at **every** desktop width, not only around 991. It hit only the longest label, "Custom Websites & Migrations".
- `.c-nav__panel` is `position: absolute; left: 50%` inside `.c-nav__item` (the `li`, about 102px at a 12px root). The space available to it is only about half the `li`, so its shrink-to-fit `width: auto` falls back to its **min-content** width. Measured at 991: auto = min-content = 272.5px, max-content = 302.9px. This part of the hypothesis is confirmed.
- What the hypothesis missed: min-content was still too small for one-line nowrap links. Chrome works out a row flexbox's min-content from its largest item plus the gaps, without adding the items together. So `.c-nav__panel-link`'s min-content counted the nowrap text and the gap but **not the icon**. The text overflowed by exactly the icon width: 30.4px at a 12px root, 35.5px at 14px, which is 2.537rem. Hiding the icon left the panel width at 263.9px, which is the text plus the 8.6px gap only.

### Fix
`src/components/layout/Nav.astro`: one declaration, `width: max-content;`, on `.c-nav__panel`, with a comment. Max-content adds the items together (icon + gap + text), so the panel fits its longest link. Padding, gap, icon size, type, border and radius are unchanged. It stays centered under the trigger (`left: 50%` + `translateX(-50%)` were not touched).

### Measurements (Playwright Chromium, hover open, home page)
"Text past" = right edge of the label text minus the panel's inner (content) right edge. Positive means it overflows. The other two links never overflowed.

| Width | Root | Before: panel w / longest link scrollW vs clientW / text past | After: panel w / scrollW vs clientW / text past | Panel in viewport (after) |
|---|---|---|---|---|
| 768 | 12px | 272.5 / 258 vs 232 / +24.3px | 302.9 / 263 = 263 / −6.1px | 155.5–458.4 ✓ |
| 800 | 12px | 272.5 / 258 vs 232 / +24.3px | 302.9 / 263 = 263 / −6.1px | ✓ |
| 880 | 12px | 272.5 / 258 vs 232 / +24.3px | 302.9 / 263 = 263 / −6.1px | ✓ |
| 991 | 12px | 272.5 / 258 vs 232 / +24.3px | 302.9 / 263 = 263 / −6.1px | ✓ |
| 992 | 9.92px | 229.1 / 216 vs 195 / +19.9px | 254.3 / 221 = 221 / −5.2px | ✓ |
| 1100 | 11px | 251.6 / 238 vs 215 / +22.2px | 279.5 / 243 = 243 / −5.7px | ✓ |
| 1280 | 12.8px | 288.8 / 273 vs 246 / +26.0px | 321.3 / 279 = 279 / −6.5px | ✓ |
| 1439 | 14.39px | 321.1 / 304 vs 274 / +29.3px | 357.6 / 310 = 310 / −7.2px | ✓ |
| 1440 | 14px | 313.2 / 297 vs 267 / +28.5px | 348.7 / 303 = 303 / −7.0px | ✓ |
| 1920 | 14px | 313.2 / 297 vs 267 / +28.5px | 348.7 / 303 = 303 / −7.0px | ✓ |

- After the fix, the text ends exactly at the link's inner edge (0px). The −5 to −7px is the link's own padding plus its 1px border, as designed.
- Panel center minus trigger center: 0.00 to 0.01px at every width, before and after.

### Checks
- [x] `pnpm run build` passes (Complete!)
- [x] `pnpm run check` passes (105 files, 0 errors / 0 warnings / 0 hints)
- [x] `pnpm run lint` passes (exit 0)

### Open questions for the project lead
- The panel is now about 30–35px wider than before, which is what it should have been all along. Confirm on the Vercel preview (`Proposed` in DECISIONS → Global).
