# Handoff — ui — Phase 1 Design System

Date: 2026-09-25 · Branch: `feat/phase1-design-system` · Status: DONE

## What I did
- Built the global CSS foundation in `src/styles/` exactly per `docs/DESIGN_SYSTEM.md`:
  - `tokens.css` — Brulia `@font-face`, font-family vars, all §4 colors, §3.2 type-scale vars (desktop + `≤767` mobile overrides), §6 motion tokens, and a `prefers-reduced-motion` guard was NOT placed here (kept in base — see note below).
  - `base.css` — modern reset, fluid root font-size per §1 (`1vw` default, `14px` ≥1440, `12px` 768–991, `9px` ≤767), body defaults from §3.2, headings `--font-heading`/weight 400/margin 0.
  - `typography.css` — every `c-text_*`, `c-paragraph_*`, `c-paragraph`, and `c-button` class from §3.2, all `font-weight: 400; letter-spacing: 0;`.
  - `buttons.css` — `.c-button` + 4 `is-*` variants copied 1:1 from §7.3 (masked gradient border via `-webkit-mask` + `mask-composite: exclude`, gradient-clipped text on `is-gradient-outline` / `is-white`, glass with `backdrop-filter: blur(10px)`).
  - `utilities.css` — minimal: `.c-container` (§8.1), `.cc-hidden`, plus a small margin utility set actually used on the styleguide.
- Created `src/layouts/BaseLayout.astro` — typed props (`title`, `description?`, `noindex?`), UTF-8 + viewport, `<title>`, description meta, canonical from `Astro.url`, robots meta gated by `noindex`, Brulia woff2 preload, HTML comment placeholder for the Adobe Fonts kit link, and ES imports of the 5 CSS files in the specified order.
- Created 4 primitives in `src/components/ui/`:
  - `Button.astro` — typed variant, renders `<a>` when `href` is set otherwise `<button type={type ?? "button"}>`, inner `<span class="c-button__text">` in both cases.
  - `Eyebrow.astro` — `c-text_xs` + scoped placeholder styles (uppercase, border, 3px radius, 0.35em/0.8em padding, 0.08em tracking) marked `/* TODO: DS eyebrow specs */`.
  - `Tag.astro` — `c-text_xs` pill placeholder (radius 999px, 0.35em/0.9em padding) marked `/* TODO: DS tag specs */`.
  - `Container.astro` — thin wrapper rendering `.c-container` from utilities.
- Built `src/pages/dev/styleguide.astro` using `BaseLayout` with `noindex={true}` and 4 labeled sections: Colors (swatch grid + full-width gradient bar), Typography (every `c-text_*` + `c-paragraph_*` at real size with class labels), Buttons (all 4 variants on both a white panel and a `--gradient-primary` panel, plus one `href` and one `type` example), Primitives (Eyebrow, Tag, Container with a dashed placeholder inside).
- Updated `docs/DECISIONS.md` — appended a "Raised in Phase 1 (UI — Design System)" list under "Open questions" (no changes to the Locked table).

Notes:
- Existing `src/pages/index.astro` was intentionally left alone (out of scope for Phase 1; Phase 2+ will migrate it to `BaseLayout`).
- `prefers-reduced-motion` guard from §6 is available via the design system spec but was not added yet because no animations are wired in this phase; will be added alongside the first GSAP animation.

## Files changed
- Created: `src/styles/tokens.css`
- Created: `src/styles/base.css`
- Created: `src/styles/typography.css`
- Created: `src/styles/buttons.css`
- Created: `src/styles/utilities.css`
- Created: `src/layouts/BaseLayout.astro`
- Created: `src/components/ui/Button.astro`
- Created: `src/components/ui/Eyebrow.astro`
- Created: `src/components/ui/Tag.astro`
- Created: `src/components/ui/Container.astro`
- Created: `src/pages/dev/styleguide.astro`
- Modified: `docs/DECISIONS.md` (appended Phase 1 open questions)
- Created: `docs/handoffs/2026-09-25_ui_design-system.md` (this file)

## Checks
- [x] `pnpm run build` passes — 3 pages built (`/`, `/dev/styleguide/`, `/studio/`). One pre-existing Vite warning about `"use no memo"` from `react-compiler-runtime` (unrelated to this PR).
- [x] `pnpm run check` passes — 13 files, 0 errors / 0 warnings / 0 hints.
- [x] `pnpm run lint` passes — exit code 0, no output.
- [ ] Checked at 1440 / 991 / 767 / 375 — **NOT VERIFIED YET**. Requires a browser session on `/dev/styleguide`. Recommend @qa runs a visual pass at the four breakpoints and confirms glass button legibility on the gradient panel.

## Requests for other agents
- @qa: Visual QA of `/dev/styleguide` at 1440 / 991 / 767 / 375. Verify (a) the root font-size switches (esp. the accepted 991→992 drop noted in §1), (b) the masked gradient border renders on `is-gradient-outline` and `is-white`, (c) `is-glass` is legible over `--gradient-primary`, (d) no shadows anywhere. Cross-check against `docs/refs/Home.png` where applicable.
- @astro: When Phase 2 begins page work, migrate `src/pages/index.astro` to `BaseLayout` and remove its duplicated `<html>` boilerplate. Also add the sitemap integration and exclude `/dev/*` from it (see open question below).
- @sanity: None.
- @ui (self, follow-up): Once the Adobe Fonts kit ID lands, replace the HTML comment in `BaseLayout.astro` with the real `<link>` and verify Acumin renders in the styleguide.

## Open questions for the project lead
- **Adobe Fonts kit ID** — needed to add the Acumin Pro `<link>` in `BaseLayout.astro`. Kit must whitelist `localhost`, Vercel preview domains, and the production domain (once known). Currently `--font-body` falls back to system sans-serif.
- **Eyebrow specs** — §3.3 leaves text class, tracking, border-radius, and padding open. Confirm the placeholder (`c-text_xs`, uppercase, `border-radius: 3px`, `padding: 0.35em 0.8em`, `letter-spacing: 0.08em`) or provide final values.
- **Tag / pill specs** — §9 flags this. Confirm the placeholder pill (`c-text_xs`, `border-radius: 999px`, `padding: 0.35em 0.9em`, `letter-spacing: 0.08em`) or provide final values (background, text color, border color per state).
- **Section vertical spacing** — `.c-container` uses `padding: 5rem 3rem` per §8.1. Is 5rem the intended section rhythm, or should sections use a separate token (e.g. `--space-section`)?
- **Text color on dark / gradient backgrounds** — §4 assumes `--color-white`. Confirm for hero, CTA banner, and glass button surfaces.
- **Sitemap `/dev/*` exclusion** — `/dev/styleguide` is `noindex, nofollow`, but the sitemap integration isn't wired yet; when it is (Phase 2+), the entire `/dev/*` tree should be excluded from `sitemap.xml`.

## TODO markers added
- `TODO: DS eyebrow specs` — `src/components/ui/Eyebrow.astro` (scoped style)
- `TODO: DS tag specs` — `src/components/ui/Tag.astro` (scoped style)
- `TODO: DS section vertical spacing (5rem placeholder)` — `src/styles/utilities.css` on `.c-container`
- `TODO: FONTS Adobe kit <link> pending kit ID` — `src/layouts/BaseLayout.astro` (HTML comment) and `src/styles/tokens.css` (comment near `--font-body`)
- `TODO: COPY` — none added in this phase.
