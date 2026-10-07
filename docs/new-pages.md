# New pages (content pack)

Pages written as Markdown in `content-pack/content/*.md` and rendered by two templates. The Markdown is the page: the site never edits it. Brief: `content-pack/BUILD-BRIEF.md`. Build report: `docs/new-pages-build-report.md`.

## How it works

| Piece | File |
|---|---|
| Pack files, families, build modes, sitemap info (plain JS, also read by `astro.config.mjs`) | `src/lib/new-pages/registry.mjs` |
| Loader: parse (the pack's `readContentFile`), checker gate, defaults view, page model | `src/lib/new-pages/loader.ts` |
| Markdown subset → HTML with `data-np-src`, heading ids, table captions | `src/lib/new-pages/markdown.ts` |
| Links (`page:slug`, `related`, `breadcrumb`): released / draft / planned / live | `src/lib/new-pages/links.ts` |
| Gap markers → `<mark class="c-np-gap">` (review view) | `src/lib/new-pages/markers.ts` |
| JSON-LD (Service or Article, FAQPage, BreadcrumbList) | `src/lib/new-pages/jsonld.ts` |
| Visuals: asset, else diagram, else preview placeholder | `src/lib/new-pages/visuals.ts` |
| Every string the templates add | `src/lib/new-pages/copy.json` |
| Commercial template (`service`, `industry`, `regional`) at `/<slug>` | `src/pages/[...page].astro` → `NpCommercialPage.astro` |
| Article template (`guide`, `comparison`, `data-study`) at `/guides/<slug>` | `src/pages/guides/[slug].astro` → `NpArticlePage.astro` |
| Components, the one stylesheet, diagrams | `src/components/new-pages/` |
| Preview-only kit of every block | `/dev/new-pages-kit` |

Family comes from `pageType`, never from a slug. Other types (`hub`, `tool`, `section`, ...) are skipped with a warning, and fail the build if `draft: false`.

## Modes

| Build | How it is detected | `draft: true` | `draft: false` |
|---|---|---|---|
| Production | `VERCEL_ENV=production` or `PUBLIC_SITE_ENV=production`, or any build outside Vercel without `PAGES_INCLUDE_DRAFTS=1` | not built (404) | built, indexable, in the sitemap |
| Vercel preview | `VERCEL_ENV=preview` | built, `noindex`, draft banner, not in the sitemap | as production |
| Local dev | `pnpm run dev` | as preview | as production |
| Forced | `PAGES_INCLUDE_DRAFTS=1` (ignored in production) | as preview | as production |

Build gate, per page: drafts get `check-content.mjs <files>`; released pages get `check-content.mjs --release --ignore-draft <files>` (fails on open markers, `blockedBy`, a `[PERSON` author; a stale `volatileChecked` only warns).

## The two views of a draft

`PAGES_VIEW=review` (default): gap markers show as yellow highlights, the banner counts them and a panel lists them at the end. `PAGES_VIEW=defaults`: each gap's default action is applied first (`apply-defaults.mjs` into `content-pack/defaulted/`, git-ignored), so the page is exactly what ships if nobody answers. Locally: `PAGES_VIEW=defaults pnpm run dev`. On Vercel: set `PAGES_VIEW=defaults` in the Preview environment.

## Checks

- `pnpm run pages:check`: the pack checker on every file (after each change).
- `pnpm run pages:verify`: builds the defaults, review and production views (into `<tmp>/benormedia-np-verify/dist-np-*`, or `$NP_VERIFY_DIR`) and runs `scripts/check-new-pages.mjs` on each.
- `pnpm run pages:release-check content-pack/content/<slug>.md`: the strict release gate.

## Add a page

Drop a new file in `content-pack/content/` with a supported `pageType` and `draft: true`. Run `pages:check` and `pages:verify`. No code change. For a diagram, add a `'<slug>:<n>'` entry to `DIAGRAMS` in `visuals.ts` (labels from the page text only). For a real image, add `src/assets/new-pages/<slug>/<n>.webp|png|jpg|svg`.

## Release a page (BUILD-BRIEF section 11)

Release companion pairs on the same day.

1. Gaps answered in the file, or defaults accepted: `node content-pack/scripts/apply-defaults.mjs content-pack/content/<slug>.md --write` (`--skip ID,ID` for gaps resolved by hand).
2. Front matter: `draft: false`; `publishedAt` and `updatedAt` = sign-off date; volatile facts rechecked and `volatileChecked` updated; for guides, `author` set.
3. `pnpm run pages:release-check content-pack/content/<slug>.md` passes.
4. Each `screenshot` visual has a real file in `src/assets/new-pages/<slug>/<n>.<ext>`, or its entry is deleted.
5. One line in `public/llms.txt`; one entry in the PAGES map of `scripts/check-seo.mjs` (`Service`/`Article`, `FAQPage`, `BreadcrumbList`, and the `primaryKeyword`).
6. Inbound links from the `inbound` front matter, in a separate PR (edits live pages).
7. `pnpm run pages:verify` (its production view now includes the page), then the lead merges and deploys.
8. After deploy: `node scripts/check-seo.mjs https://www.benormedia.com`, `node scripts/indexnow.mjs <url>`, Search Console inspection, Rich Results Test.

## Commercial page conventions (lead 2026-10-07)

H1, H2s, the FAQ heading and the closing heading end in a period (added by the template unless the text already ends in `.`, `?` or `!`). Body text uses the Home classes: `c-paragraph_m` for the lead and each section's framing line, `c-paragraph` for the rest. The two section roles follow the commercial blueprint (RULES.md §10), keyed on structure, never on a slug: the section that links to `/work` renders Our Work, and the last section renders as fit cards.

## Component map as built

| Block | Decision | File |
|---|---|---|
| Commercial hero | the Home `HomeHero` (logo pile, Trusted badge) extended with optional `content` / `buttons` (rung 2; lead 2026-10-07) | `src/components/sections/HomeHero.astro` |
| Proof strip | removed (lead 2026-10-07) | — |
| Work section (the section linking to `/work`) | the Home `OurWork` extended with an optional `title` (rung 2), under the section's own H2 | `src/components/sections/OurWork.astro` |
| Fit section (the last section, "when another option is better") | cards (lead 2026-10-07, Figma 3696-7378) | `NpFitCards.astro` |
| Sections + visuals | new (rung 4) | `NpSplitSection.astro`, `NpVisual.astro` |
| Testimonial | left out for now (lead 2026-10-07) | — |
| FAQ | `FaqAccordion` extended (rung 2) + section sibling (rung 3) | `src/components/ui/FaqAccordion.astro`, `NpFaq.astro` |
| Closing band | sibling of `CtaBanner` (rung 3); global banner off on these pages | `NpCtaBand.astro` |
| Related links | new | `NpRelatedLinks.astro` |
| Head | `BaseLayout` / `Seo` extended with `titleTemplate` (rung 2) | `src/layouts/BaseLayout.astro`, `src/components/layout/Seo.astro` |
| Breadcrumb (articles) | live `Breadcrumbs` extended with per-item `attrs` (rung 2) | `src/components/layout/Breadcrumbs.astro` |
| Article header, takeaways, TOC, prose, tables, sources | new | `NpArticleHeader`, `NpKeyTakeaways`, `NpToc`, `NpProse` (+ `markdown.ts` table markup), `NpSources` |
| Draft banner, gaps panel, gap highlight | new, preview only | `NpDraftBanner`, `NpGapsPanel`, `new-pages.css` |
| Diagrams | new | `diagrams/` (Flow, Timeline, Mapping, SiteMap, Outline, Hub) |
