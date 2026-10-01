# Handoff — ui — Home primitives (Phase 4 part 1)

Date: 2026-09-26 · Branch: `feat/phase4-home-part1` · Status: DONE

## What I did
- Built three drop-in UI primitives that the four Home sections (Hero, LogoStrip, FeaturedWork, Services) will consume in Phase 4.
- No animations wired. Every planned motion is a `data-anim="..."` hook only:
  - `Stat.astro` — value gets `data-anim="counter"` when `animate` prop is true.
  - `ClientCard.astro` — root gets `data-anim="card-reveal"`.
- Followed CLAUDE.md rules: `c-` / `is-` naming, no `--` BEM, `rem` sizing, no shadows, all colors and type via `var(--token)`, desktop-first max-width media queries at 991.
- Reused the existing `Eyebrow` primitive from `SectionHeader`.

## Files changed
- `src/components/ui/Stat.astro` (new)
- `src/components/ui/SectionHeader.astro` (new)
- `src/components/ui/ClientCard.astro` (new)
- `docs/handoffs/2026-09-26_ui_home-primitives.md` (this file)

Nothing added to `src/styles/`, `tokens.css`, or `DESIGN_SYSTEM.md`.

## Component APIs (for the astro subagent)

### Stat
```astro
<Stat value="$700M+" label="Money raised by our clients" animate />
```
Props: `value: string`, `label: string`, `animate?: boolean` (default `false`), `class?: string`.

### SectionHeader
```astro
<SectionHeader
  eyebrow="CASE STUDIES"
  title="Featured Work"
  description="We work closely with B2B companies..."
  align="center"
  titleClass="c-text_xl"
  as="h2"
/>
```
Props: `eyebrow?: string`, `eyebrowVariant?: 'default' | 'accent'` (default `'default'`), `title: string`, `description?: string`, `align?: 'left' | 'center'` (default `'left'`), `titleClass?: string` (default `'c-text_xl'`), `as?: 'h1' | 'h2' | 'h3'` (default `'h2'`), `class?: string`.

### ClientCard
```astro
<ClientCard client={client} variant="featured" />
```
Props: `client: Client` (from `src/lib/sanity/types.ts`), `variant: 'featured'`, `class?: string`.
Fallbacks:
- Missing `websiteScreenshot` → empty neutral block (`background: var(--color-gray-light)`).
- Missing `testimonial` → renders card with only the client name (`TODO: COPY` comment inline).
- Missing `authorPhoto` → initial in a circle.
KPIs are capped at 2 and taken from `client.testimonial.kpis` in order.

## Checks
- [x] `pnpm run check` passes (0 errors, 0 warnings)
- [x] `pnpm run lint` passes
- [ ] `pnpm run build` — not run; sections aren't wired yet per task instructions.
- [ ] Visual check at 1440 / 991 / 767 / 375 — deferred until sections consume these on `/dev/styleguide` or Home preview.

## Requests for other agents
- @sanity: none.
- @astro: primitives are drop-in. Import from `src/components/ui/Stat.astro`, `.../SectionHeader.astro`, `.../ClientCard.astro`. `ClientCard` expects the full `Client` type from `src/lib/sanity/types.ts` — make sure the Home Featured Work GROQ projection dereferences `testimonial->{...kpis[]}`, `authorPhoto{asset->,alt}`, and `websiteScreenshot{asset->,alt}`.
- @ui: fold these into `/dev/styleguide` once the styleguide page is built (out of scope this task).

## Open questions for the project lead
1. **Stat layout.** Value-on-top + label-below with `gap: 0.25rem` (`align-items: center`). Matches Hero ref. Is this correct also for future Testimonial KPIs, or should the KPI stat differ?
2. **SectionHeader gaps.** Used `gap: 1.25rem` between eyebrow/title/description with a `-0.25rem` top margin on description to tighten it against the title. Please confirm against Figma spacing tokens (none exist yet — flagged as `TODO: DS`).
3. **ClientCard grid ratio.** Used `1fr 1fr` between screenshot and body for the `featured` variant. In `featured-work.jpg` the Surfe card (screenshot on left, body on right) looks roughly 1.5:1 → 1.3:1. Please confirm exact ratio (or supply Figma spec).
4. **ClientCard padding + radius.** Used `padding: 1.5rem` and `border-radius: 8px`. Neither is a token — need DS values.
5. **KPI treatment.** In the ref the KPI label sits inside a faint bordered pill. Implemented as `border: var(--border-default); border-radius: 3px; padding: 0.35em 0.9em` on the description. Please confirm the pill styling (radius, padding, background) — currently borrowed from the tag/eyebrow pattern.
6. **KPI value color.** Used `var(--color-blue)` (matches Surfe ref XXX+ purple-blue). Confirm — could be `--color-accent`.
7. **Card `arrow` icon.** Rendered a plain unicode `→` as a placeholder — no icon primitive exists yet. Should we ship an `Icon` primitive or an inline SVG here?
8. **`c-client-card__name` typography.** Used `c-text_m` for the client name in the header row. Confirm against Figma (ref suggests something close to `c-text_m` on desktop).

## TODO markers added
- `TODO: DS` — `Stat.astro`: exact gap between value/label.
- `TODO: DS` — `SectionHeader.astro`: gap between eyebrow/title/description and description offset.
- `TODO: DS` — `ClientCard.astro`: grid column ratio for featured variant.
- `TODO: DS` — `ClientCard.astro`: card border-radius (used `8px` — no token).
- `TODO: DS` — `ClientCard.astro`: body internal gap.
- `TODO: DS` — `ClientCard.astro`: KPI grid gap.
- `TODO: COPY` — `ClientCard.astro`: fallback when a client has no testimonial (renders card with name only).
