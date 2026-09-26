# Handoff — qa — Phase 4 Home part 1 review

Date: 2026-09-26 · Branch: `feat/phase4-home-part1` · Status: DONE (PASS WITH NOTES — 0 blockers)

## What I did
Reviewed the four Home sections (Hero, LogoStrip, FeaturedWork, Services), the three new UI primitives (Stat, SectionHeader, ClientCard), the new Sanity query + fetcher, and `src/pages/index.astro` against `CLAUDE.md` rules, `docs/DESIGN_SYSTEM.md` tokens, and the four visual refs under `docs/refs/home/`. Read-only pass; no source edits.

## Files changed
- None (this is a review). New file: this handoff.

## Checks

### 1. Green bar — build / check / lint
- [x] `pnpm run build` passes — 4 pages built in 7.05s. Only warning is unrelated `react-compiler-runtime` `"use no memo"` directive from a transitive dep.
- [x] `pnpm run check` passes — 54 files, 0 errors / 0 warnings.
- [x] `pnpm run lint` passes.
- [ ] Checked at 1440 / 991 / 767 / 375 — **not performed**. I can't drive a browser; visual fidelity inferred from source + refs (see check 8).

### 2. Class naming compliance — PASS
Grepped every new/modified `.astro` file. No BEM `--` modifiers. No camelCase class names. `is-` / `js-` prefixes used correctly (`is-left`, `is-center`, `is-featured`, `is-empty`, `js-open-contact`). The only `--` occurrences are CSS comment dividers and `var(--token)` refs.

### 3. Hardcoded values — MOSTLY PASS
- No hex literals. No `rgba()` calls. All colors go through `var(--color-*)`. Good.
- Two `font-size` literals bypass typography tokens, both in `src/components/ui/ClientCard.astro`:
  - `:196` — `font-size: 1.25rem;` on `.c-client-card__arrow` (decorative arrow placeholder)
  - `:227` — `font-size: 1.25rem;` on the initial glyph inside `.c-client-card__author-photo.is-empty`
  Should-fix once an `Icon` primitive lands (already tracked in the ui handoff).

### 4. Unit compliance — PASS
Spacing/gaps all `rem`. `px` only on borders, radius, and breakpoints. `em` used correctly on the KPI pill padding (`padding: 0.35em 0.9em`).

### 5. Sanity data path — PASS
`CLIENTS_BY_IDS` projection matches `Client` / `Testimonial` / `Kpi` / `Category` interfaces exactly. `getClientsByIds` re-orders GROQ results client-side and logs missing IDs via `console.warn`. Types honestly optional where the schema is optional; every consumer respects that via fallbacks.

### 6. Accessibility — PASS
- Exactly one `<h1>` (`HomeHero.astro:49`).
- `<h2>` per section via SectionHeader; LogoStrip uses its own `<h2 class="c-text_m">`.
- `<h3>` in Services accordion (`Services.astro:46`).
- Decorative images marked `aria-hidden="true"` + `alt=""` (hero lines, services image, avatar cluster).
- Real images always emit non-empty `alt` (fallback to `client.name` / `authorName`).
- Contact triggers use `class="js-open-contact"` — matches `ContactModal.astro:130` selector. Fallback documented in the astro handoff.
- Accordion: real `<button type="button">` triggers with matching `id` + `aria-controls` + `aria-expanded`. Panels have `role="region"` + `aria-labelledby` + `hidden` attribute (not `display:none`). First panel visible by default via `hidden={i !== 0}`. Keyboard: ArrowUp/Down wrap, Home/End jump, Enter/Space via native `<button>`.
- JS-off: initial SSR has first panel visible, rest `hidden`. Content stays accessible.

### 7. Fallback paths — PASS
- `LogoStrip` — missing `logo.asset` → renders `client.name` as text. Layout intact.
- `ClientCard`:
  - Missing screenshot → empty `.c-client-card__screenshot.is-empty` div preserves aspect + grid.
  - Missing testimonial → alternate `.c-client-card__body.is-empty` block with just the name (visually half-empty next to the screenshot — acceptable graceful degradation).
  - Missing author photo → first-initial glyph in a circle.
  - Missing author role → role `<span>` conditionally rendered.
  - Empty/undefined `kpis` → whole KPI `<ul>` omitted.

### 8. Design fidelity (inferred from refs + source) — SHOULD FIX
Cannot open a browser; assessment from reading markup + CSS + comparing to `docs/refs/home/*.jpg`.

- **Hero** (`hero.jpg`) — ref shows the hero on the `--gradient-primary` blue gradient with **white text** and **white / glass button variants**. Current renders on `var(--color-white)` with `var(--color-heading)` text and `gradient` / `gradient-outline` button variants. Every visual element (eyebrow, H1, description, buttons, stats) is inverted from the ref. Also, the ref eyebrow appears on a dark surface — the default `Eyebrow` variant renders its white squares invisible on dark. **Q for lead** below.
- **LogoStrip** (`logos-partners.jpg`) — logo row layout matches. Title in the ref is wrapped in an eyebrow-style bordered pill; current uses plain `<h2 class="c-text_m">`.
- **FeaturedWork** (`featured-work.jpg`) — header is **centered** in the ref; current is `align="left"`. Cards alternate layout: one shows a dark brand tile with wordmark left / testimonial right, the other lighter tile right / testimonial left. Current always renders `websiteScreenshot` in a 1:1 grid — needs a "brand tile" mode on ClientCard.
- **Services** (`services.jpg`) — header is **centered** (currently `align="left"`). Ref shows **left = diagram, right = accordion** with CTAs beneath the diagram; current is left=accordion / right=image with CTAs under the accordion. Ref accordion uses arrow (→) glyphs not `+/-`.

### 9. CLAUDE.md hard rules — PASS
No prod deploys / no push to main / no destructive git ops. No shadows. No invented tokens (every unknown value marked `/* TODO: DS */`). `.env` untouched, no secrets.

### 10. Handoff completeness — PASS
- All 5 `TODO: COPY` markers listed in the astro handoff exist at cited lines. One additional `TODO: COPY` in `ClientCard.astro:126` for the no-testimonial fallback was called out in the ui handoff.
- All 6 `data-anim` hooks listed in the astro handoff emit in the DOM (`hero-lines` ×2, `hero-headline`, `counter` ×2, `logos-marquee`, `card-reveal`, `services-image`).

## Blockers (must fix before merge to dev)
None.

## Should-fix (design fidelity — needs Lead call, not code bugs)
1. **Hero styling inversion** — background + text color + button variants for gradient bg (`HomeHero.astro:84,123,130` and buttons at `:57-58`).
2. **FeaturedWork header alignment** — `FeaturedWork.astro:26` → `align="center"`.
3. **Services header alignment** — `Services.astro:38` → `align="center"`.
4. **Services column order swap** — currently left=accordion / right=image; ref shows left=diagram / right=accordion with CTAs under the diagram.
5. **LogoStrip title styling** — pill-eyebrow treatment per ref.
6. **ClientCard "brand tile" mode** — accept `client.logo` on solid bg instead of always requiring `websiteScreenshot` so alternating card layouts work.

## Notes / nits (non-blocking)
- `ClientCard.astro:196, 227` — `font-size: 1.25rem` hardcoded (tracked in ui handoff Q7).
- `ClientCard.astro:73` — Unicode `→` as placeholder arrow.
- `SectionHeader.astro:83` — `-0.25rem` top margin on description is a stopgap; vanishes once DS spacing lands.
- `LogoStrip.astro:78-84` — `max-height: 3rem` on logo `<img>` may crop stacked wordmarks on mobile; recheck once real logos load.

## Requests for other agents
- **@astro** — apply header alignment fixes and swap Services column order once Lead confirms. Prepare to thread an "on dark" mode down through Hero once Lead answers Q15.
- **@ui** — three follow-ups:
  1. Add `is-on-dark` variant to `Eyebrow` for the hero on gradient (default squares/border invisible on dark surfaces today).
  2. Extend `ClientCard` with a "brand tile" mode (renders `client.logo` on solid bg instead of `websiteScreenshot`).
  3. Spread unknown attrs on `Button.astro` so `data-open-contact` works without the `.js-open-contact` fallback.
- **@sanity** — none. Data path is clean.

## Open questions for the project lead (de-duped across all four handoffs)
1. **Hero background** — `--gradient-primary` with white text + `white`/`glass` button variants (per ref), or is the current white-bg version intentional pending a later restyle pass?
2. **Featured Work + Services header alignment** — center per ref, currently left.
3. **Services column order** — left-accordion/right-image (current) vs. left-diagram/right-accordion (ref).
4. **LogoStrip title** — plain `<h2>` vs. pill-eyebrow treatment.
5. **Hero H1 size** — `c-text_xxl` correct or larger/tighter per ref?
6. **Section vertical rhythm** — is `.c-container { padding: 5rem 7.5rem }` correct for Home, or is there a separate section-spacing token?
7. **Accordion open-state design** — glyph swap only? Bg/border treatment on the open item? Ref shows arrow (→) glyph, not `+/-`.
8. **Social-proof pill avatars** — real client logos, generic photos, or fixed illustration set? Source?
9. **Services image** — single composite or per-tab illustrations (three images swapped as items open)?
10. **Featured card grid ratio** — 1:1 vs. asymmetric split, and does it need "brand tile" mode instead of screenshot?
11. **Logo strip** — marquee (Day 5+ Phase 6) or static desktop?
12. **KPI value color** — `--color-blue` vs. `--color-accent`?
13. **Card border-radius + padding** — currently `8px` / `1.5rem` as guesses.

## TODO markers added
- `TODO: DS` — none added by QA (all pre-existing markers listed in the ui + astro handoffs).
- `TODO: COPY` — none added by QA (all pre-existing markers listed in the astro handoff plus one in the ui handoff for `ClientCard.astro:126`).
