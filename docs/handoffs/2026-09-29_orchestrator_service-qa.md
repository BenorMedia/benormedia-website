# Handoff — orchestrator — Service template QA fixes

Date: 2026-09-29 · Author: orchestrator · Branch: `chore/phase5-secondary-qa` · Status: DONE (lead visual QA pending, not committed)

## What I did
### S-20: Problem carousels, mobile variant (`ServiceProblem.astro`)
- **Desktop (>991): unchanged.** Two vertical side columns and frame lines, ≈20s per screenshot. The split is also unchanged: 4+ clients → the left column gets the first half; 1–3 → both columns show all of them.
- **≤991.** The same markup and the same two tracks. CSS only:
  - The container becomes a flex column. The left column's track sits above the content (`order: 1`), the content in the middle (`order: 2`) and the right column's track below it (`order: 3`).
  - Tracks become rows (`flex-direction: row`). They use a new `c-service-problem-scroll-x` loop (translateX 0 → −50%).
    - Top row (`data-direction="up"`): `reverse`, moves left → right.
    - Bottom row (`data-direction="down"`): `normal`, moves right → left.
  - Same duration variable (≈20s per screenshot in one copy). Each copy repeats until it has ≥4 images, so the loop has no gaps at 991, 767 or 375.
  - Rows are full-bleed (`width: 100vw; margin-inline: calc(50% − 50vw)`). The section's `overflow: hidden` clips them, so there's no horizontal page scroll.
  - Screenshot width 22rem (≤991) / 20rem (≤767). Row → content gap 4rem / 3rem. Both `TODO: DS mobile`.
  - Frame lines hidden. The reduced-motion rule comes last, so both desktop and mobile tracks are static.
  - Hook kept: `data-anim="service-problem-carousel"` + `data-direction` on each track.
- **Built HTML:** all 20 carousel `<img>` have `width`, `height` and `alt`. 7 visible ones have alt text; the 13 repeats have `alt=""` inside `aria-hidden` items.

### S-7 / S-28: SEO (no code change)
`[service].astro` passes `service.seo` to `BaseLayout pageSeo`, which feeds `Seo.astro`.

| Field | Fallback while empty |
|---|---|
| `metaTitle` | `service.name` |
| `metaDescription` | `service.subtitle`, clamped to 160 characters |
| `ogImage` (+ alt) | siteSettings `defaultOgImage` |
| `noIndex` | env-driven noindex off production |
| `canonicalUrl` | site URL + `/<slug>` |

The seeded Custom Websites & Migrations document has `seo: null`, so every fallback renders today.

### Lead visual QA
- **Description widths (service template only).**
  - Hero subtitle: 40% (`ServiceHero.astro`).
  - Process description: 50% (`ServiceProcess.astro`).
  - Both go to 100% at ≤767. Other pages keep the shared 42rem.
- **Every CTA (`CtaActions.astro`).** `.c-cta__actions` and `.c-cta__buttons` gap 1.071rem (15px). The old 1.25rem mobile override is removed.
- **Every CTA, badge rotation (`src/scripts/animations/cta-badges.ts`).**
  - One circle at a time: after a random 1.5–2.5s delay, a random position (never the same one twice in a row) fades out, takes the next badge and fades back in.
  - The next badge comes from a shuffled deck of badges not on screen (no duplicates). The new image is preloaded before the swap.
  - Crossfade per circle (lead follow-up: smoother): each client circle is a positioned `.c-cta__badge-slot`. The script stacks a clone of the current `<img>` with the new `src` on top (`is-entering`), fades + scales it in (0.85 → 1, `--duration-hover` / `--ease-smooth`, `is-in`), then removes the old image, so the circle is never empty. The "+" circle is `position: relative` so it still overlaps the last slot. The group-level fade is removed.
  - Reduced motion / no JS: the first 6 stay.
- **Badge resolution.** Not changed (lead re-uploads the badges, S-33).
- **Process tabs (`ServiceProcess.astro`).**
  - **Tab bar:**
    - The step name is always in the layout. Inactive tabs have `max-width: 0` and `opacity: 0`; the active tab has `8.571rem` and `opacity: 1`. The tab's gap animates 0 ↔ 1.714rem, so the other tabs slide instead of jumping.
    - An inner `__tab-name-text` keeps the wrapping while the box grows.
    - The name stays in the tab's accessible name (no clip pattern needed).
  - **Square:** every square has the white fill + gradient border. The gradient fill is a `::before` that fades out when the tab is selected, and the number color transitions white → blue.
  - **Panel:** the shown panel fades in (`c-service-process-panel-in`, restarts each time `hidden` is removed).
  - **Timing:** `--duration-hover` / `--ease-smooth`; reduced motion → instant (base.css).
  - **Mobile:** squares only, as before; the active name also stays collapsed.

## Files changed
- Code: `src/components/sections/ServiceProblem.astro`, `ServiceProcess.astro`, `ServiceHero.astro`, `src/components/ui/CtaActions.astro`, `src/scripts/animations/cta-badges.ts`
- Docs (local, not committed): `PHASE5_OPEN_ITEMS.md` (S statuses, S-29 … S-36), `DECISIONS.md`, this handoff

## Checks
- [x] `pnpm run build`, `pnpm run check` (0 / 0 / 0), `pnpm run lint`
- [x] Built HTML: carousel images width / height / alt; 2 tracks with `up` / `down`; `c-service-problem-scroll-x` present; the section keeps `overflow: hidden`; 9 `__tab-name-text` spans
- [ ] Visual (lead): 991 / 767 / 375 no horizontal scroll, carousel rows; CTA gaps + badge rotation on every page; Process tab transition

## Open questions for the project lead
- S-34, S-35, S-36 (flags), S-33 (badge re-upload).
