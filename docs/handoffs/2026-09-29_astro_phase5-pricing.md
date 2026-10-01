# Handoff — astro — Phase 5 Pricing page (`/pricing`)

Date: 2026-09-29 · Author: astro agent · Branch: `feat/phase5-secondary-pages` · Status: DONE (not committed, no per-page QA)

## What I did
- Built `/pricing` (`src/pages/pricing.astro`), static, per `pricing-preview.png`:
  1. `PageHero` (reused): eyebrow "Pricing", `<h1>` "Simple and transparent\npricing that meets your needs." with `accent="that meets your needs."` (PageHero already forwarded `accent`, so no change).
  2. New `PricingPlans`: 3 `PricingCard`s as direct children of a `repeat(3, 1fr)` grid (1 column ≤991), visually hidden `<h2>` "Plans". Copy is verbatim from `pricing-cards.jpg` (checked string by string against the image) in `src/lib/content/pricing.ts`.
  3. `LogoStrip` (reused) with `getAllClientsWithLogo()`.
  4. New shared `FaqSection`: title "Frequently asked questions.", `SegmentedControl mode="tabs"` + one `FaqAccordion` per group, `initTabs` in the component script, wireframe-globe background, FAQPage JSON-LD.
  5. `Testimonials` (reused) with `getTestimonials()`.
  6. `OurWork` (reused) with the same clients as Home.
  7. CTA banner: BaseLayout default.
- **FAQ content:** `src/lib/content/faqs.ts` holds `FAQ_WEB_DESIGN_DEVELOPMENT`, `FAQ_AEO` and `PRICING_FAQ_GROUPS`, with a `TODO: COPY` marker at the top and on each group.
  - The 5 ref questions are kept verbatim. Their answers are generated placeholders.
  - The AEO tab has 5 generated questions + answers.
  - Every claim comes from the pricing cards (unlimited requests/revisions, cancel anytime, dashboard/Slack/email, dedicated client manager, fast turnaround, the Growth feature list). No numbers, times, guarantees or prices were invented.
- **Our Work pins moved** to `src/lib/content/our-work.ts` (`OUR_WORK_GRID_IDS`, `OUR_WORK_LIST_IDS`). Home and Pricing both import them. Home markup is byte-identical to before; only the CSS `<link>` list changed, because Vite now emits OurWork's scoped CSS as a shared chunk.
- **G-2 fixed:**
  - `SegmentedControl` in tabs mode renders the tablist `hidden`, plus `.c-segmented[hidden] { display: none }`, because the component's `display` would otherwise win over the attribute.
  - `initTabs` removes `hidden` on init. Its cleanup re-hides the tablist and shows every panel.
  - The styleguide copy is updated.
- **FAQ background:**
  - Source `docs/refs/pricing/faqs-bg.png` is 7680×4140, 4,606,061 B (4.6 MB), and is left untouched.
  - It is the whole 1920×1035 FAQ section at 4x, and its alpha peaks at 62%. So I flattened it on white (the section's `--color-white`) and exported:
    - `public/images/pricing/faqs-bg.webp`: 1920×1035, 21,272 B (21 KB)
    - `public/images/pricing/faqs-bg@2x.webp`: 3840×2070, 56,412 B (55 KB)
  - Result: 4.6 MB → 21 KB at 1x / 55 KB at 2x, about −99%.
  - Served with `image-set()` (1x/2x), `cover`, center bottom, so the placement matches `FAQs.jpg`.
  - Made with a throwaway node script using the sharp copy already in `node_modules/.pnpm`. No dependency added, and the script is deleted.
- `getClientsByIds` now accepts `readonly string[]`. This is type-only and non-breaking.
- **SEO:**
  - `getPageSeo("pricingPage")`. There's no document yet, so the fallback is title "Pricing" plus a 156-char description.
  - The `TODO: COPY` is a frontmatter comment, so nothing ships in the HTML (G-11 avoided).
- **Empty data:**
  - `PricingPlans` and `FaqSection` hide when their list is empty. `FaqSection` drops empty groups and shows no tabs for a single group. `Testimonials` already hides itself.
  - `LogoStrip` / `OurWork` don't hide themselves (G-17), so the page guards them.
- Logged everything in `docs/DECISIONS.md`:
  - Global: 3 Proposed rows plus Needs lead OK lines.
  - Pricing: 4 Proposed rows, plus Content, Design team and Needs lead OK items.
- Added the Pricing section to `docs/PHASE5_OPEN_ITEMS.md` (P-1…P-25) and marked G-2 resolved.

## Files changed
- `src/pages/pricing.astro` (new)
- `src/components/sections/PricingPlans.astro` (new)
- `src/components/sections/FaqSection.astro` (new)
- `src/lib/content/pricing.ts`, `src/lib/content/faqs.ts`, `src/lib/content/our-work.ts` (new)
- `public/images/pricing/faqs-bg.webp`, `public/images/pricing/faqs-bg@2x.webp` (new)
- `src/pages/index.astro` (modified: pins imported from `our-work.ts`)
- `src/lib/sanity/queries.ts` (modified: `getClientsByIds(ids: readonly string[])`)
- `src/components/ui/SegmentedControl.astro`, `src/scripts/ui/tabs.ts` (modified: G-2, ui-owned, done at the orchestrator's request)
- `src/pages/dev/styleguide.astro` (modified: tabs demo copy)
- `docs/DECISIONS.md`, `docs/PHASE5_OPEN_ITEMS.md`

## Queries added
- None new. Reused `getPageSeo("pricingPage")`, `getAllClientsWithLogo()`, `getTestimonials()` and `getClientsByIds()`.

## Component APIs
```ts
// FaqSection (src/components/sections/FaqSection.astro)
title: string
groups: readonly { label: string; value: string; items: { question: string; answer: string }[] }[]
tabsLabel?: string   // tablist aria-label, default "FAQ topics"
jsonLd?: boolean     // FAQPage JSON-LD, default true
background?: boolean // globe background, default true
id?: string          // id prefix for panels / accordions, default "faq" (unique per page)
class?: string

// PricingPlans (src/components/sections/PricingPlans.astro)
plans: readonly PricingPlan[]   // src/lib/content/pricing.ts
```
- **FaqSection with 2+ groups:**
  - Panel ids are `<id>-<value>` and tab ids `<id>-<value>-tab`. `role="tabpanel"`, `tabindex` and `aria-labelledby` are added by `initTabs`, so without JS the panels are plain blocks under their `<h3>`.
  - Each accordion `name` = its panel id.
  - Without JS each panel shows an `<h3>` with its group label. The script adds `is-enhanced`, which hides them.
- **JSON-LD:** only answered questions are included, `<` is escaped, and paragraph breaks are kept as `\n\n`.

## data-anim hooks
| Hook | Element | Likely motion | State |
|---|---|---|---|
| `page-hero` | `PageHero` `<section>` | hero reveal | static |
| `section-header-accent` | hero accent span | gradient/text reveal | static |
| `pricing-plans` | `.c-pricing-plans__grid` | card stagger | static |
| `pricing-card` / `pricing-amount` | each card / price (ui) | reveal / counter | static |
| `logos-marquee` | LogoStrip track | marquee | running (CSS) |
| `segmented` | FAQ tablist (ui) | sliding pill | static |
| `faq-item` / `faq-answer` | `details` / answer (ui) | reveal / open-close | static |
| `testimonials-marquee` | TestimonialMarquee | rows | running (CSS) |

## Checks
- [x] `pnpm run build` passes (6 pages; the only warning is the existing react-compiler `use no memo` notice).
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints.
- [x] `pnpm run lint` passes.
- [x] **dist HTML** (`dist/pricing/index.html`):
  - 1 `<h1>`. Outline: h1 → h2 "Plans" → 3 × h3 plans → h2 FAQ → 2 × h3 groups → h2 Testimonials → h2 Our Work → h2 CTA → h2 modal.
  - 3 `article.c-pricing-card`, 10 `<details>`.
  - Summaries contain only phrasing content.
  - The FAQPage JSON-LD parses as valid JSON (10 questions).
  - The tablist renders `hidden`.
  - `<title>Pricing | BenorMedia</title>` and the description are correct. No `TODO` HTML comment.
- [x] **Headless Chrome on the built site** (CDP, exact viewport widths):
  - 1440 / 991 / 767 / 375 screenshots, no horizontal overflow at any width.
  - At 1440 the price rows and buttons line up across cards (subgrid).
  - Spacing matches the ref: hero → cards 103px, cards → strip 61px, strip 260px (ref 264), strip → FAQ title 120px, title → tabs 24px, tabs 60px tall, tabs → rows 49px, last row → end 120px.
  - With the 2nd question open, the globe placement matches `FAQs.jpg`.
- [x] **Behavior:**
  - Clicking a tab switches panels (`aria-selected`, roving tabindex, `is-active`).
  - ArrowRight wraps and moves focus, and the focus ring is visible.
  - A card's "Get In Touch" opens the contact modal.
  - **No JS:** the tablist is `display: none`, both panels are visible with `<h3>` labels and no `role`, and all 3 cards render.
  - `/dev/styleguide` tabs: visible with JS, hidden without.
- [x] **Home:** `dist/index.html` markup is identical to a baseline built from the original `index.astro`, apart from the CSS `<link>`s (see P-9).
- Temp files, the static server and the headless Chrome instances are cleaned up.

## Requests for other agents
- @ui:
  - Review the G-2 change in `SegmentedControl.astro` / `tabs.ts` (P-10).
  - Please add `cc-sr-only` (G-14). `PricingPlans` uses a scoped copy.
  - Optional: a translucent FAQ row (P-5) and a smaller card button (P-17), if design confirms.
- @sanity: create the `pricingPage` singleton when the lead supplies SEO copy (P-25). Nothing breaks without it.
- @qa: carry-over G-16. 162 of 186 `<img>` on this page come from reused components without width/height. I added no `<img>`; the FAQ background is a CSS background.

## Open questions for the project lead
See `docs/PHASE5_OPEN_ITEMS.md` → Pricing:
- P-11: plan name "Growth (AEO/GEO + CRO)" vs the nav's "Growth (AEO / SEO / CRO)".
- P-12: FAQ default open state.
- P-13: placeholder FAQ copy on staging.
- P-14: approvals.
- Design team: P-15…P-21.
- Content: P-22…P-25.

## TODO markers added
- `TODO: DS`:
  - `PricingPlans.astro`: top 7.357rem, bottom 4.357rem, card gap 1.071rem, section background / glow not built.
  - `FaqSection.astro`: 8.571rem top/bottom, title → tabs 1.714rem, tabs → rows 3.5rem, no-JS panel gap 4rem.
- `TODO: DS mobile`:
  - `PricingPlans.astro`: 5rem / 5rem.
  - `FaqSection.astro`: 5rem / 5rem, tabs → rows 3rem.
- `TODO: COPY`:
  - `pricing.astro`: fallback meta (frontmatter comment).
  - `PricingPlans.astro`: hidden h2 "Plans".
  - `faqs.ts`: file header, plus one per group.
