# Handoff — astro — home part 1

Date: 2026-09-26 · Branch: `feat/phase4-home-part1` · Status: DONE

## What I did
- Created the four Phase 4 Home sections as scoped Astro components under `src/components/sections/`.
- Wired `src/pages/index.astro` to fetch the Home singleton for SEO plus two pinned client sets (`LogoStrip`, `FeaturedWork`) via `getClientsByIds`, and mounted the sections inside `BaseLayout`.
- All Home copy lives statically in the section components (per spec — homePage doc only carries SEO). Placeholders are marked `TODO: COPY`.
- No animation code — every motion touchpoint is a `data-anim="…"` attribute for Phase 6.
- Services accordion is JS-optional: `<button>` triggers with `aria-expanded`, `<div role="region">` panels using the `hidden` attribute (so SR/DOM stay in sync), and a scoped Astro `<script>` for click + keyboard (ArrowUp/Down, Home, End). Single-select behavior. First panel open by default even without JS.
- Buttons that need to open the ContactModal use the `js-open-contact` class fallback (same as `Nav`/`CtaBanner`) because `Button.astro` doesn't spread unknown attributes onto the underlying element — a `data-open-contact` prop would just be dropped.
- Coerced `home?.seo` (`Seo | undefined`) to `null` when passing to `BaseLayout.pageSeo` — required by `exactOptionalPropertyTypes` in the layout's typed prop.

## Files changed
- **Created**: `src/components/sections/HomeHero.astro`
- **Created**: `src/components/sections/LogoStrip.astro`
- **Created**: `src/components/sections/FeaturedWork.astro`
- **Created**: `src/components/sections/Services.astro`
- **Rewrote**: `src/pages/index.astro` (was Astro's placeholder)

Nothing else touched. No changes to `sanity/schemaTypes/**`, `sanity.config.ts`, `src/styles/**`, or `docs/DESIGN_SYSTEM.md`.

## Checks
- [x] `pnpm run build` passes (4 pages built in 8.80s; only warning is `react-compiler-runtime` `"use no memo"` directive from a transitive dep — unrelated).
- [x] `pnpm run check` passes (0 errors, 0 warnings, 54 files).
- [x] `pnpm run lint` passes (no output).
- [x] Dev server serves `/` at HTTP 200 (70 KB) with all four `.c-*` section classes present in the DOM. Not visually reviewed at 1440/991/767/375 yet — leaving that for QA.

## TODO markers added

### `TODO: COPY`
- `src/components/sections/HomeHero.astro:47` — hero eyebrow text.
- `src/components/sections/HomeHero.astro:54` — hero description paragraph (`<p class="c-paragraph_l c-hero__desc">`).
- `src/components/sections/FeaturedWork.astro:24` — Featured Work section description prop on `<SectionHeader>`.
- `src/components/sections/Services.astro:39` — Services section description prop on `<SectionHeader>`.
- `src/components/sections/Services.astro:65` — accordion panel body for each of the three services (Web Design / Web Development / Web Growth).

### `TODO: DS`
Every one of these is spacing/sizing not covered by `docs/DESIGN_SYSTEM.md` §8 (which itself lists gaps / section rhythm as TODO). I used neutral values close to the visual refs and marked each with `/* TODO: DS */`.

- `HomeHero.astro` — content-stack `gap`, title `max-width`, buttons `gap`, buttons `margin-top`, pill `gap`/`padding`, pill `margin-top`, avatar cluster (placeholder circles), stats `gap`, stats `margin-top`.
- `LogoStrip.astro` — title-to-track vertical rhythm, logo row `gap` (desktop and wrapped), item `max-width`.
- `FeaturedWork.astro` — stack `gap` between cards, `margin-top` from section header to first card.
- `Services.astro` — grid columns `gap` and `margin-top`, left-column internal `gap`, trigger vertical `padding`, trigger `font-size` (used `--fs-text-m` token as closest), panel `padding`, buttons `gap`.

Please review; the DS agent will need to lock these once §8.3 (grid / gaps) and §5 (section rhythm) are defined.

## Phase 6 animation wishlist

Every animation hook is currently a `data-anim="…"` attribute — no JS behavior wired. Suggested motion (final call is with the animation spec):

| Hook | Section | Suggested motion |
|---|---|---|
| `data-anim="hero-lines"` | HomeHero — both decorative line PNGs (`.is-left`, `.is-right`) | Parallax on scroll, or slow drift on mount. Respect `prefers-reduced-motion`. |
| `data-anim="hero-headline"` | HomeHero — `<h1>` | Split-text reveal (word or line) on load, ease out. |
| `data-anim="counter"` | HomeHero — both `<Stat>` values (already emitted by the `Stat` primitive when `animate` is true) | Count-up from 0 to target when entering the viewport (once). Keep the final formatted string (`$700M+`, `100+`) as fallback text. |
| `data-anim="logos-marquee"` | LogoStrip `<ul.c-logos__track>` | Horizontal marquee at ≥992. Duplicate items in JS to make the loop seamless (do not duplicate in the source — they need to stay one accessible list). |
| `data-anim="card-reveal"` | FeaturedWork — each `<ClientCard>` root (already emitted by the primitive) | Reveal (fade + rise) on enter viewport, staggered. |
| `data-anim="services-image"` | Services right column `<img>` | Slight parallax or subtle scroll-linked scale/opacity. |

## Requests for other agents

- **@ui (non-blocking)**: `Button.astro` doesn't spread unknown attributes onto the rendered `<a>`/`<button>`. That's why every page passing `data-open-contact` has to fall back to `class="js-open-contact"` instead (Nav, CtaBanner, HomeHero, Services all do this). Consider `<a {...rest}>` / `<button {...rest}>` so callers can use `data-*` attributes directly — would also let us drop the class shim.
- **@ui (non-blocking)**: The Services accordion trigger currently uses inline styles for the `+ / −` glyph. If a real icon primitive lands (per DESIGN_SYSTEM §9 "Icon sizes"), swap the CSS pseudo-elements for `<Icon name="plus" />` and toggle via `[aria-expanded="true"]`.
- **@ui (non-blocking)**: `Eyebrow` requires text as a child — I passed `TODO: COPY` for the hero. Fine as-is but flagging so the DS agent doesn't mistake it for a real string in a Figma diff.
- **@qa (Phase 4 review)**:
  - Verify the visual match against `docs/refs/home/hero.jpg`, `logos-partners.jpg`, `featured-work.jpg`, `services.jpg` at 1440 / 991 / 767 / 375. Every spacing token above is a placeholder — expect to log deltas.
  - Confirm the accordion keyboard behavior (Enter/Space toggle, Arrow keys move focus with wrap, Home/End jump).
  - Confirm the `hidden` attribute on collapsed panels (screen reader test welcome).
  - Confirm the hero social-proof pill's placeholder avatars degrade to a sensible visual until real assets land.
  - Confirm the `Get in Touch` buttons in HomeHero + Services open the ContactModal (they rely on the `.js-open-contact` global handler from Phase 3).
- **@sanity (informational, no action needed now)**: `LogoStrip` and `FeaturedWork` pin clients by `_id` in `src/pages/index.astro`. If a pinned ID doesn't resolve, `getClientsByIds` logs a warning and drops it — this will surface in `pnpm run build` logs. If the seed dataset ever changes those slugs, update the arrays in `index.astro`.

## Open questions for the project lead

1. **Hero H1 size (`c-text_xxl`)** — at 1440 root=14px that renders as ~77 px. Figma reference in `docs/refs/home/hero.jpg` looks larger and tighter (line-height <1.2). Confirm the class + line-height are correct, or if the hero needs a bespoke display size.
2. **Section vertical rhythm** — `.c-container` currently uses `padding: 5rem 3rem` (DESIGN_SYSTEM §8.1 flags this as TBD). Every section inherits this. Is 5rem the intended section spacing on Home, or do we need a separate section token?
3. **Accordion open-state design** — I used a `+ / −` glyph that folds vertically to a `−`. The `services.jpg` ref crops the accordion tight — no arrow / chevron / bg change on the open item. Confirm the open-state treatment (background tint? left border? just the glyph swap?).
4. **Social-proof pill avatars** — placeholder circles right now. Are these real client-logo avatars, generic user photos, or a fixed illustration set? If real client avatars, do we pull from Sanity or hardcode?
5. **Services image swap** — the illustration in `services.jpg` looks static, but historically these are per-tab illustrations. Should each accordion item show a different image (three PNGs), or is the current single `services.png` correct?
6. **Featured card layout** — `ClientCard.astro` currently uses a 1:1 column split (screenshot / testimonial). `featured-work.jpg` looks slightly asymmetric (screenshot ~55%). Confirm the grid ratio.
7. **Logo strip marquee vs static** — spec says "no marquee this phase, only the `data-anim` hook". At ≥992 with 7 logos across the container, spacing is comfortable. Confirm whether desktop should stay a static row or always marquee once Phase 6 lands.
