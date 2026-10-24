# Handoff — astro — Comparison pages

Date: 2026-10-22 · Author: astro agent · Branch: `feat/comparison` · Status: DONE (not committed, not pushed; no schema deploy, no dataset writes)

## What I did
- **Routes**, following the case studies pattern:
  - `/comparison`, a rest route (`src/pages/comparison/[...index].astro`). It lists published comparisons only, newest first. While none is published, production builds skip the page; other builds emit it noindex with the hero only. It is listed in the sitemap only once an indexable comparison exists. JSON-LD: CollectionPage + BreadcrumbList through the shared helper (publisher = Organization `@id`).
  - `/comparison/[slug]`: `getStaticPaths` over published documents only. SEO falls back from `seo` to title and subtitle (≤160 characters). JSON-LD: Article (author and publisher = Organization `@id`, no offers) + BreadcrumbList; the FAQPage comes from `FaqSection`.
  - `/dev/comparison`: in-code fixture, not built in production (`isProductionBuild()`), noindex, and outside the sitemap through the existing `/dev` filter. It shows the full template, the CTA banner, then a separated "Index page" block with the index hero (as `h2`) and the 3-card grid (WordPress, Framer, Wix).
- **Queries and types** follow SCHEMAS v0.13 "GROQ: comparison": `PUBLISHED_COMPARISON`, `ACCENT_SECTION_HEADER`, `ALL_COMPARISONS`, `COMPARISON_SLUGS` and `COMPARISON_BY_SLUG`, plus the fetchers `getAllComparisons`, `getComparisonSlugs` and `getComparisonBySlug`. New types: `AccentSectionHeader`, `ComparisonChoice`, `ComparisonTableRow`, `ComparisonTableGroup`, `ComparisonStat`, `ComparisonReason`, `ComparisonMigrationStep`, `ComparisonCard` and `Comparison`. One addition: `ALL_COMPARISONS` also returns `"noIndex": seo.noIndex == true`, as `ALL_CASE_STUDIES` does (request below).
- **Production guards** (`src/lib/sanity/comparison-release.ts`):
  - Code copy: once a comparison is published, a production build stops if the index hero, the meta or the breadcrumb labels are still placeholders. Other builds only warn.
  - Sanity copy (new, Proposed): a production build also stops if a published comparison holds Lorem ipsum, `TODO: COPY` or an open `[FACT NEEDED: …]`-type marker.
  - The case-study guard now calls the shared `guardPlaceholderCopy`. Its behavior and messages are unchanged.
- **Sitemap:** the case-study sitemap reader became the generic `published-sitemap.mjs`. `case-study-sitemap.mjs` and the new `comparison-sitemap.mjs` wrap it. `astro.config.mjs` adds the `/comparison` filter and `lastmod`. It fails closed, as before.
- **FAQ:** `faqGroupsFromSections` moved out of `[service].astro` into `src/lib/sanity/faq-groups.ts`, and both templates use it. Service page output is unchanged.
- **`PageHero`** gained an optional `as` prop (`h1` by default), so the dev preview keeps one `h1`.
- **Copy:** the fixture has the Webflow vs WordPress copy from Figma, word for word.
  - Lorem blocks stay visible, marked `TODO: COPY`.
  - The FAQ is the Pricing FAQ (`PRICING_FAQ_GROUPS`). It is the same two tabs and questions Figma shows.
  - The stats are `[FACT NEEDED: …]` markers, with Figma's "+X%", "0" and "X" quoted inside them. Each `[source]` is a `[FACT NEEDED: source]` marker shown as plain text after the label (lead).

## Components
New, in `src/components/comparison/`:
- `copy.ts`, `image.ts`
- `ComparisonPill`: the "Webflow VS <logo>" pill, hero and card variants. Hero variant has the static chevron. Sizes are in em, so the card variant scales with the card through container units.
- `ComparisonCard`, `ComparisonGrid`, `ComparisonIndexHero`
- `ComparisonHero`, `ComparisonSectionHeader` (Sanity `accentSectionHeader` → `SectionHeader`), `ComparisonMark` (gradient check or dash)
- `ComparisonChoose`, `ComparisonTable`, `ComparisonReasons`, `ComparisonSteps`, `ComparisonCaseStudies`
- `ComparisonPage`, the shared template body

Reused:
- `PageHero`, `SectionHeader`, `Eyebrow` (through SectionHeader), `Button` (the gradient one carries `js-open-contact` to open the contact popup), `Tag` (stat labels), `Container`
- `LogoStrip`, `Testimonials` (hidden site-wide, so hidden here too), `FaqSection` (tabs + FAQPage)
- `CaseStudyGrid` / `CaseStudyCard` v2 (resources layout), `CtaBanner` / `Footer` through BaseLayout
- `ARROW_RIGHT`, the case-study `PreviewImage` fixture pattern, and the `service-mid-hero-bg` line art with the same CSS as `.c-service-intro`
- The `CaseStudyCard` orbit SVG pattern: 0.1 glow + 3 rings in `--color-border`

Not reused: `ServiceProcess`. It is a tab set with one large image per step, while the design shows 4 staggered cards. The new `ComparisonSteps` shares only `SectionHeader` and the `processStep` data.

Animations: no new ones. The section-header accent and logo marquee hooks come with the reused components, and all content shows without JS.

## Files changed
- New:
  - `src/components/comparison/`: 15 files
  - `src/pages/comparison/[...index].astro`
  - `src/pages/comparison/[slug].astro`
  - `src/pages/dev/comparison/[...preview].astro`
  - `src/lib/sanity/comparison-fixture.ts`
  - `src/lib/sanity/comparison-release.ts`
  - `src/lib/sanity/comparison-sitemap.mjs`
  - `src/lib/sanity/published-sitemap.mjs`
  - `src/lib/sanity/faq-groups.ts`
- Modified:
  - `src/lib/sanity/queries.ts`
  - `src/lib/sanity/types.ts`
  - `src/lib/sanity/case-study-release.ts`
  - `src/lib/sanity/case-study-sitemap.mjs`
  - `src/lib/new-pages/jsonld.ts` (shared `collectionIndexJsonLd`, `comparisonIndexJsonLd`, `comparisonJsonLd`)
  - `src/pages/[service].astro` (uses `faqGroupsFromSections`)
  - `src/components/sections/PageHero.astro` (`as` prop)
  - `astro.config.mjs`
  - `docs/DECISIONS.md` (Comparison section)
- `docs/BUILD_PLAN.md` not touched: it has no page-status table.

## Checks
- [x] `pnpm run build` passes. The local build emits `/comparison` (noindex, hero only, not in the sitemap) and `/dev/comparison`, and emits no fixture assets.
- [x] `PUBLIC_SITE_ENV=production pnpm run build` emits neither `/comparison` nor `/dev/comparison`.
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint`: passes
- [x] Checked at 1440, 991, 767 and 390 with headless Chrome and CDP device emulation. `document.scrollWidth` equals the viewport at every width. Only the logo marquee goes past the edge, and its section clips it. At 390 the table scrolls inside its focusable, labelled wrapper.

Screenshots (scratchpad, full page): `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/c2070c27-efdd-4ca4-bd28-f33041b9022d/scratchpad/shots/dev-1440.png`, `…/shots/dev-991.png`, `…/shots/dev-767.png`, `…/shots/dev-390.png`. Slices are `s1440_*`, `s991_*` and `s390_*` in the same folder.

## Deviations from Figma
- **Container width:** sections use the site's 1230px container, not Figma's 1680px row. Widths are proportional; Figma text-box widths are scaled to the site type classes so the line breaks match.
- **Hero subtitle** uses the 42rem SectionHeader default, so it stays on two lines as in Figma.
- **"What to choose" spacing:** 40px picture → text on both cards. Figma has 40 on the Webflow card and 48 on the WordPress one.
- **Table:**
  - Rows are 12px apart, including the header bar → body gap (Figma 8px), because it is a real `<table>` with `border-spacing`.
  - The header gradient is split across the three header cells with `background-size: 300%`.
  - The group label uses `c-paragraph_s`, to keep it smaller than the rows as in Figma.
- **Competitor logo size** comes from the file (Proposed decision). The fixture WordPress logo renders at 37.4px and Framer and Wix at 26px, as in Figma.
- **Reason stat values** are long `[FACT NEEDED]` markers, so they wrap. Labels use the case-study stat-label width.
- **Mobile and tablet:** no frames exist; the fallback layouts are logged in DECISIONS → Design team.

## Requests for other agents
- @sanity: add `"noIndex": seo.noIndex == true` to `ALL_COMPARISONS` in SCHEMAS v0.13 "GROQ: comparison". It is already in code, and keeps the index robots tag in line with the sitemap. Add editor guidance to `competitorLogo` / `competitorLogoOnDark`: SVG at display size, or raster at 2x.
- @ui: tokens or answers for the `TODO: DS` values listed in DECISIONS → Comparison → Design team. These are `#EDEDED`, `#FAFAFA`, the Acumin Medium 500 weight, the 24px step number and the 18px pill/label sizes.
- @qa: review `/dev/comparison`. Check the hero "View comparison" anchor (`scroll-margin-top` 6.571rem is a guess for the sticky nav) and the table's keyboard scroll at ≤767.

## Open questions for the project lead
1. Hero headline: Figma spells it "Wordpress" (lowercase p). Keep it, or use "WordPress"? (Content)
2. The table section eyebrow repeats "What to choose" in Figma. Is that intended? (Content)
3. OK to size competitor logos from the uploaded file (SVG at size, raster at 2x)? (Needs lead OK)
4. OK for the production build to stop when a published comparison still holds Lorem ipsum, TODO: COPY or a `[FACT NEEDED]` marker? (Needs lead OK)
5. OK to build migration steps as a new `ComparisonSteps` rather than reusing `ServiceProcess`? (Needs lead OK)
6. Still open, unchanged: fixed hero button actions, case-study fallback, newest-first index order, FAQ heading in code, static chevron.
7. Mobile and tablet frames for both pages. (Design team)

## TODO markers added
- `TODO: DS`:
  - pill font size
  - name fallback size
  - mobile hero pill and buttons
  - index and hero text-box widths
  - Text XL line-height 1.4
  - card border `#EDEDED`
  - table group row `#FAFAFA`
  - feature weight 500
  - table anchor scroll margin
  - stat label size
  - step number size
  - line-art placement (same as service)
  - every no-design mobile layout
- `TODO: COPY`:
  - `COMPARISON_COPY.indexHero.description`, `indexMeta.title`, `indexMeta.description`: all guarded in production
  - fixture lorem blocks: hero subtitle, "What to choose" paragraph, case studies paragraph, 3 index card titles and descriptions
  - fixture FAQ (Pricing FAQ)
- `[FACT NEEDED: …]` in the fixture: 5 stat values and 2 sources.

---

## Round 2 (2026-10-22): hero dropdown, H1 at narrow widths, compact table, QA fixes

Status: DONE (not committed, not pushed). Base: HEAD d87339b, which already had the orchestrator's fixture copy fixes ("WordPress" in the hero, "Feature comparison" table eyebrow).

### Correction to round 1
The round-1 claim "`PUBLIC_SITE_ENV=production pnpm run build` emits neither page" was wrong end to end. That build stops on the existing case-study placeholder guard, because a case study is published while `/case-studies` still has lorem copy (QA M2, not caused by this branch). The comparison routes do return `[]` in production by code, which QA confirmed by reading it. A full production build passes only once the case-study copy is fixed or that case study is unpublished.

### 1. Hero pill dropdown (lead decision)
- **Data:** `COMPARISON_BY_SLUG` gains `otherComparisons`: every other published comparison, in index order, with `_id`, `title`, `slug`, `competitorName` and `competitorLogo`.
  - New type `ComparisonSwitchItem`, plus `Comparison.otherComparisons`.
  - Documented in `docs/SCHEMAS.md` "GROQ: comparison" with a rendering note.
  - The content guard skips these items: they are other documents, checked on their own pages.
- **Markup (`ComparisonPill.astro`):**
  - With other comparisons, the competitor side is a `<details data-details-menu>`. The `<summary aria-controls>` holds the logo, the chevron and a visually hidden "Other comparisons".
  - The panel is a `<ul id>` of links. Each link shows the competitor logo and the comparison title, and points to `/comparison/<slug>`.
  - With no other comparisons, the pill renders exactly as before, but with no chevron and no control.
  - Without JS, the native `<details>` still opens the list, so the links stay reachable.
- **Behavior (`src/scripts/ui/details-menu.ts`, imported by the pill):**
  - Keeps the `<details>` open and drives visibility with `is-open`, so the panel fades like the nav.
  - Keeps `aria-expanded` in sync on the summary. Click toggles.
  - Esc closes and returns focus to the summary. A click outside, or focus leaving the menu, closes it.
  - ArrowDown on the summary opens and focuses the first link; ArrowUp/ArrowDown/Home/End move between links.
  - The chevron rotates with `--duration-hover`; the global reduced-motion rule applies.
- **Look:** Nav's styles are scoped, so I mirrored `.c-nav__panel` / `.c-nav__panel-link` with the same tokens and values:
  - white surface, `--border-default`, 8px radius, the nav panel shadow, 15/24px padding, 20px between items;
  - Tag-style uppercase links with a border that turns `--color-gray` on hover;
  - a 200ms opacity/visibility fade and the 0.5rem hover bridge.
  - The logo column has a fixed width so the labels line up (`TODO: DS`).
  - At ≤767 the links use the mobile `c-tag` size.
  - The trigger's hover/open border is `--color-text`, because the trigger already has a gray border at rest.
- **Position:** under the competitor side, right edges aligned, `max-width: calc(100vw - 4rem)`. The hero section is `position: relative; z-index: 2`, so the panel sits above the logo strip and below the sticky nav (z-index 100). It doesn't overflow at 390.
- **Fixture:** the WordPress detail lists Framer and Wix (from the index cards). Those links go to pages that don't exist in the preview.

### 2. Hero H1 "clipped on the left"
- I measured the H1 at 320, 360, 375, 390, 767 and 991: its box always fits, and it wraps through `c-text_xxl`.
- The real cause was the hero pill. At 320 it was 330px wide, so the page could pan sideways and the H1 looked cut on the left.
- Fix: on phones the pill's font size (everything in the pill is in em) is `min(1.35rem, (100vw − 4rem) / 29)`.
- After the fix, `scrollWidth == clientWidth` at 320, 360, 375, 390, 767, 991 and 1440.

### 3 and 4. Table
- **No scroll area at any width.** The wrapper's `overflow-x`, `tabindex`, `role="region"` and the negative margins are gone; the negative margins caused the vertical scrollbar.
- **≤767 restack (Proposed):**
  - `table`, `thead` and `tbody` become blocks; each row is a two-column grid.
  - The feature `th[scope=row]` spans the full width above the Webflow and competitor cells, which stay side by side.
  - The header bar becomes the same two columns, so the logos line up with their cells.
  - The hidden "Feature" header leaves the grid.
  - Explicit ARIA roles (`table`, `rowgroup`, `row`, `columnheader`, `rowheader`, `cell`) keep the semantics while `display` changes. `<caption>` and `scope` are kept.
- **Compact spacing (Proposed):** I used the Figma 3790:37411 values I pulled from `get_design_context` in round 1, scaled with the type (Figma 20px text → `c-paragraph` 14.56px, ×0.728):

  | Element | Figma | Built |
  |---|---|---|
  | Header bar | 70px tall, 12px padding | 3.64rem tall |
  | Under the bar | 8px | 0.416rem |
  | Between rows | 12px | 0.624rem |
  | Cell and group-row padding | 24px | 1.248rem |
  | Between columns | 48px | 2 × 1.248rem |
  | Header logos | Webflow 30px | 1.56rem |

  - `border-collapse` replaces the `border-spacing` approach. Row gaps are now padding, and each group label sits in an inner box with the background and 8px radius.
  - The competitor header logo is capped at 36.5px (Figma's WordPress white).
- **Group rows:** Figma is `#FAFAFA`. Per QA m1 / the coordinator I kept `--color-gray-light` (`#F0F0F0`) with `TODO: DS`; tokens are untouched.
  - Conflict to flag: the lead's item 4 said the built fill looks darker than Figma, and with this token it still is. The fill only matches once the lead approves a token. While testing, `color-mix(in srgb, var(--color-gray-light) 40%, var(--color-white))` gave exactly `#FAFAFA` with no new token; I didn't keep it, so as not to go against the m1 instruction.
  - The label stays `c-paragraph_s`: Figma's 18px next to 20px rows.

### QA fixes
- **m2:** group label weight 600 → 700, and feature names 500 → 400. Both are the closest weights in the kit (400 / 700), marked `TODO: DS` and logged under Design team.
- **m1:** kept `--color-gray-light` with `TODO: DS` (see above).
- **m4:** the fixture table eyebrow "Feature comparison" is marked `TODO: COPY`.
- **m5:** `CopyField` gains an optional `todo` flag, and `guardPlaceholderCopy` reports flagged fields whatever their value. `/comparison`'s meta title "Comparison" is flagged, so a production build stops on it once a comparison is published. Drop the flag when the lead confirms the title.
- **n1:** the pill has a visually hidden "versus" next to the `aria-hidden` "VS". The site has no global sr-only utility, so I used the component's local sr-only class, as the case-study and comparison cards do.
- **n3:** the table wrapper's `tabindex` and `role` are removed (it no longer scrolls).
- **n5:** the mark's dash is now 0.143rem (2px) with a 0.071rem radius. `cqi` stays for the card pill and is logged as Proposed in DECISIONS.
- **n6:** removed the dead `is-empty` class and the unused `empty` prop from `ComparisonIndexHero` and its caller.
- **n2 and n4:** left as is, as asked.

### Files changed (round 2)
- New: `src/scripts/ui/details-menu.ts`
- Modified:
  - `src/components/comparison/ComparisonPill.astro`
  - `src/components/comparison/ComparisonHero.astro`
  - `src/components/comparison/ComparisonPage.astro`
  - `src/components/comparison/ComparisonTable.astro` (rewritten markup and CSS)
  - `src/components/comparison/ComparisonMark.astro`
  - `src/components/comparison/ComparisonIndexHero.astro`
  - `src/components/comparison/copy.ts` (`versus`, `otherComparisons`)
  - `src/pages/comparison/[...index].astro`
  - `src/lib/sanity/queries.ts`
  - `src/lib/sanity/types.ts`
  - `src/lib/sanity/comparison-fixture.ts`
  - `src/lib/sanity/comparison-release.ts`
  - `src/lib/sanity/case-study-release.ts` (`todo` flag)
  - `docs/SCHEMAS.md`
  - `docs/DECISIONS.md`
  - this handoff

### DECISIONS → Comparison (round 2)
- New Lead row: the chevron is a dropdown of the other comparisons. The "Hero pill chevron" question is struck as resolved.
- New Proposed rows: table restack at ≤767, compact table spacing, card pill in `cqi`, hero pill size cap on phones.
- Updated: the mobile note, the font-weight entries, and the logo clamp (table header 26–36.5px).

### Checks (round 2)
- [x] `pnpm run build` passes (staging mode).
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint`: passes
- [x] CDP device emulation at 1440 and 390, dropdown closed and open. Overflow also checked at 320, 360, 375, 767 and 991: `scrollWidth == clientWidth` everywhere. Only the logo marquee runs past the edge, and its section clips it.

### Screenshots (scratchpad)
Folder: `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/c2070c27-efdd-4ca4-bd28-f33041b9022d/scratchpad/shots/`
- `r2-1440.png`: full page, closed
- `r2-1440-open.png`: hero with the dropdown open
- `r2-1440-table.png`: table crop
- `r2-390.png`: full page, closed
- `r2-390-open.png`: hero with the dropdown open
- `r2-390-table-top.png` and `r2-390-table.png`: table crops
- `r2-h1-320.png`: the 320 hero after the fix
- `r2-h1-{360,375,390,767,991}.png`

### Requests (round 2)
- @ui and the lead: a token for Figma `#FAFAFA` (Grey 400), which the lead noticed. Also confirm the 700 / 400 weights, or add Semibold and Medium to the Adobe kit.
- @qa: re-check the dropdown keyboard flow (Tab, Esc, arrows), the no-JS `<details>` fallback, and the ≤767 table semantics with VoiceOver (explicit roles plus `display` changes).
