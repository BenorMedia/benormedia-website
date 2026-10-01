# Handoff — astro — Phase 5 service template (`/[service]`)

Date: 2026-09-29 · Author: astro agent · Branch: `feat/phase5-secondary-pages` · Status: DONE (not committed, no per-page QA)

## What I did
- Built `src/pages/[service].astro`. `getStaticPaths` reads `SERVICE_SLUGS`, so today it generates only `/custom-websites-migrations`. The other two nav links 404 until their documents exist (lead OK).
- Page sections, in order (per `services-template-preview.jpg`):
  1. **ServiceHero** (new). Built on `PageHero`:
     - `top` slot: `Breadcrumbs` showing "Services" › `name`. "Services" is plain text.
     - `<h1>`: `headline` (accentTitle rendered as `titleSegments`).
     - Description: `subtitle`.
     - Actions: `CtaActions tone="light"`, with a gradient "Get In Touch" button (opens the contact modal) and a gradient-outline "See Pricing" (→ `/pricing`). The badge rotation is included.
  2. **LogoStrip**: reused unchanged, and guarded when empty.
     - Sections 1 and 2 share the `.c-service-intro` wrapper, which paints `service-mid-hero-bg` (line art) behind the hero bottom and the strip.
  3. **ServiceProblem** (new):
     - Center: Eyebrow "The Problem" + `problemTitle` + `problemDescription`.
     - Decorative frame: 2 vertical lines with 3 square nodes; the section's bottom border closes it.
     - 2 vertical infinite CSS carousels of the related clients' `websiteScreenshot`. Left moves up, right moves down.
  4. **ServiceProcess** (new):
     - Header: `SectionHeader` with eyebrow "Process", `processTitle`, and `processDescription` (`\n` → `<br />`).
     - A bordered box holding a numbered tab bar and panels (image left; h3 + description + feature pills right).
  5. **OurWork**: same pins as Home (`src/lib/content/our-work.ts`).
  6. **Testimonials**: same as Home.
  7. **FaqSection**: fed by `faqSections`. Tabs = section titles. Answers are converted from Portable Text to plain paragraphs. It emits FAQPage JSON-LD.
  8. **CTA banner + footer**: BaseLayout default.
- **CtaActions extraction:**
  - The actions markup and CSS moved out of `CtaBanner` into `src/components/ui/CtaActions.astro`, with the same class names and markup.
  - `CtaBanner` now renders `<CtaActions buttons badges trustedText />`.
  - The new `tone="light"` gives a white badge with a 1px gradient border and gradient text. The approved badge shadow is kept.
  - `cta-badges.ts` already initialized every `[data-cta-badges]`, so it needed no change. Verified: both instances rotate, and they stay static under reduced motion / no JS.
- **SectionHeader** (non-breaking):
  - New optional `titleSegments` (`{ text, accent? }[]`, so any number of gradient runs).
  - `description` now renders `\n` as `<br />`.
- **PageHero** (non-breaking): forwards `titleSegments`, and adds an optional `top` slot and a default slot.
- **Hero line art:** `service-mid-hero-bg.svg` (347 KB, 110 KB gzipped) is exported as `public/images/services/service-mid-hero-bg{,@2x}.webp`:
  - 1x: 1920×747, 26 KB. 2x: 3840×1494, 77 KB.
  - Flattened on white, served with `image-set`, anchored to the strip bottom at the 1920 frame width.
  - The throwaway sharp script is deleted.
- **Empty and partial data:**
  - Hero: `headline` falls back to `name`.
  - Problem: no screenshots → center content only (no frame or carousels). No title and no description → the section is hidden. Description only → no empty `<h2>`.
  - Process: 0 steps → header only. 1 step → no tab bar. No title and no steps → hidden. A step without an image → full-width text.
  - FAQs: empty sections and questions are dropped (FaqSection hides itself).
  - LogoStrip / OurWork: guarded in the page. Testimonials hides itself.
- Logged in `docs/DECISIONS.md`:
  - Global: 4 Proposed rows plus Needs lead OK lines.
  - Service pages: 6 Proposed rows, Design team items and Needs lead OK lines. 2 engineering follow-ups resolved, 2 added.
- `docs/PHASE5_OPEN_ITEMS.md` → Service pages: status set to "V1 built (no per-page QA)" and S-11…S-28 added.

## Files changed
- New:
  - `src/pages/[service].astro`
  - `src/components/sections/ServiceHero.astro`, `ServiceProblem.astro`, `ServiceProcess.astro`
  - `src/components/layout/Breadcrumbs.astro`
  - `src/components/ui/CtaActions.astro` (ui-owned folder; extraction requested by the lead)
  - `src/lib/sanity/links.ts`, `src/lib/sanity/portable-text.ts`
  - `public/images/services/service-mid-hero-bg.webp`, `public/images/services/service-mid-hero-bg@2x.webp`
- Modified:
  - `src/components/layout/CtaBanner.astro`: uses `CtaActions` + `getCtaBadgeUrlsCached`; the local `hrefFromLink` was removed.
  - `src/components/ui/SectionHeader.astro` (ui-owned): `titleSegments`, `\n` in description.
  - `src/components/sections/PageHero.astro`: `titleSegments`, `top` and default slots.
  - `src/lib/sanity/queries.ts`, `types.ts`, `site.ts` (`getCtaBadgeUrlsCached`), `image.ts` (`assetDimensions`, `isSvgAsset`).
  - `docs/DECISIONS.md`, `docs/PHASE5_OPEN_ITEMS.md`

## Queries added (`src/lib/sanity/queries.ts`)
| Query / fetcher | Returns |
|---|---|
| `SERVICE_SLUGS` / `getServiceSlugs()` | `string[]`: published slugs; nulls and empties are filtered out |
| `SERVICE_BY_SLUG` / `getServiceBySlug(slug)` | `Service \| null` |
| `LINK_INTERNAL_REF` (changed) | `"title": coalesce(title, name)` |

- `SERVICE_BY_SLUG` is the sanity handoff version with one change: `clients[]->` projects only `_id, _type, name, websiteScreenshot` (what the carousels render) instead of `CLIENT_LIST_FIELDS`.
- Types:
  - New: `AccentTitle*`, `ProcessStep`, `PortableTextBlock/Span`, `ServiceFaq`, `ServiceFaqSection`, `Service`.
  - `LinkInternalRef._type` now includes `'service'`, which `hrefFromLink` maps to `/<slug>`.

## Component APIs
```ts
// CtaActions (ui)
buttons: readonly Button[]; badges: readonly string[]; trustedText?: string; tone?: "dark" | "light"
// SectionHeader (ui) — added
titleSegments?: readonly { text: string; accent?: boolean }[]   // overrides title/accent rendering
// PageHero — added
titleSegments?; <slot name="top" />; <slot />
// Breadcrumbs (layout)
items: { label: string; href?: string }[]; ld?: { name: string; url: string }[]
// ServiceProblem
title: string; titleSegments?; description?; clients: Client[]
// ServiceProcess
title: string; titleSegments?; description?; steps: ProcessStep[]; id?: string ("process-step")
```

## data-anim hooks
| Hook | Element | Motion | State |
|---|---|---|---|
| `service-problem-carousel` (+ `data-direction="up"`/`"down"`) | `ServiceProblem` tracks | vertical infinite marquee (the lead-requested animation of this phase) | running (CSS). Static under `prefers-reduced-motion`, hidden ≤991 |
| `service-process-panel` | each step panel | panel reveal on tab change | static (instant swap) |
| `page-hero`, `section-header-accent` | hero | reveal | static |
| `logos-marquee`, `testimonials-marquee`, `faq-item`, `segmented` | reused | as before | as before |

## Checks
- [x] `pnpm run build` passes (8 pages; the only warning is the existing react-compiler `use no memo` notice).
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints.
- [x] `pnpm run lint` passes.
- [x] **dist HTML** (`dist/custom-websites-migrations/index.html`):
  - Heading outline: 1 `<h1>`, then h2 Problem → h2 Process → 9 × h3 steps → h2 Our Work → h2 Testimonials → h2 FAQ → h2 CTA.
  - `<title>Custom Websites &amp; Migrations | BenorMedia</title>`; the meta description is the subtitle (158 chars).
  - Breadcrumb: `<nav aria-label="Breadcrumb">` with 1 `aria-current="page"`.
  - Process: 9 `role="tab"` buttons (phrasing content only) and 9 panels; the tablist renders `hidden`.
  - Carousels: 20 items (left 4 × 2, right 3 × 2 × 2). 13 of them are `aria-hidden`; the first occurrence of each of the 7 clients has alt text.
  - JSON-LD parses as valid JSON: BreadcrumbList (2 items) and FAQPage (10 questions).
  - 2 `[data-cta-badges]`.
  - Every new `<img>` has width, height and alt. The step images are the raw `.svg` URL.
  - No `TODO` in the HTML apart from the existing fonts comment.
- [x] **Headless Chrome on the built site:**
  - 1440 / 991: full-page screenshots.
  - 767 / 375: fixed-width iframes, because Chrome's minimum window width is ≈500px.
  - No horizontal overflow at any width (scrollWidth = viewport).
  - Compared with the refs, hero, Problem and Process match in structure and spacing. Problem → Process eyebrow is 111px (ref 110). The Process box whitespace matches the ref.
- [x] **Behavior:**
  - Tabs: ArrowRight/Left wrap, Home/End, click, one tab has `tabindex=0`, panels get `role="tabpanel"` + `aria-labelledby`, `is-enhanced` hides the in-panel numbers.
  - Accessible tab name is "02 Content and UX structure".
  - Both badge groups rotate independently after 12s.
- [x] **No JS** (scripts stripped): tab bar hidden, all 9 panels visible in order with "NN Name" headings, all content visible.
- [x] **Reduced motion** (`--force-prefers-reduced-motion`): carousels static on their first images, badges static.
- [x] **Regression:** Home / Work / Pricing / Testimonials HTML is identical to a baseline built before these changes, after normalizing scope hashes and CSS/JS chunk links. That covers `CtaBanner`, `SectionHeader` and `PageHero`.
- Re-built and re-checked after the sanity agent finished (7 clients, 9 steps with the SVG).
- Temp files, the static servers and the headless Chrome instances are cleaned up.

## Requests for other agents
- @ui:
  - Review `CtaActions` (moved into `src/components/ui/`, light tone) and the `SectionHeader` `titleSegments` / description `\n` change.
  - Possible DS variants to replace the scoped overrides:
    - an eyebrow "current" style (gradient border, blue squares), now in `Breadcrumbs`
    - a sentence-case pill / `Tag` variant, now in `ServiceProcess`
  - `cc-sr-only` (G-14): `ServiceProcess` uses a scoped clip pattern.
- @sanity:
  - Optional: fill `service.seo`.
  - If editors need rich FAQ answers, say so; the template currently flattens them (S-13).
- @qa (full Phase 5 QA):
  - G-16 carry-over on the reused components (~175 `<img>` without width/height on this page, none new).
  - The carousel `aria-hidden` / alt strategy.
  - The tabs pattern.

## Open questions for the project lead
See `docs/PHASE5_OPEN_ITEMS.md` → Service pages:
- S-19: breadcrumb "Services" as text, and JSON-LD Home → service.
- S-20: carousel column split and speed, and the sliver at 1440.
- S-21: mobile tab bar.
- S-22: approvals.
- Design team: S-23…S-26.
- Content: S-27, S-28.

## TODO markers added
- `TODO: DS`:
  - `ServiceHero`: bottom padding, subtitle → actions.
  - `ServiceProblem`: frame width, gap, screenshot width 32.369rem, screenshot gap, radius, nodes, 14.286rem padding, speed.
  - `ServiceProcess`: box, bar, squares, gaps, image 33.143rem, text column, pills, section padding.
  - `Breadcrumbs`: gaps, chevron size, current-item style.
  - `CtaActions`: light tone.
  - `[service].astro`: line art position.
- `TODO: DS mobile`: `ServiceHero`, `ServiceProblem` (hidden carousels ≤991, paddings), `ServiceProcess` (≤767 layout), `Breadcrumbs`.
- `TODO: COPY`: none new. The step 02–09 copy lives in Sanity (sanity agent).
