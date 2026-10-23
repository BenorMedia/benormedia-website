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
