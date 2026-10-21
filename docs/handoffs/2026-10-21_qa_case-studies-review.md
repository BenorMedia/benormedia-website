# Handoff — qa — case studies review (round 1)

Date: 2026-10-21 · Author: qa agent (written by the orchestrator from the qa report; the qa agent is read-only) · Branch: `feat/case-studies` (406a13d..8b4ca88 on `dev` 8bcc060) · Status: DONE — **PASS WITH NOTES** (0 blockers · 4 should-fix · 8 nits)

## What I did
1. **Build, check, lint:** all pass (`astro check`: 206 files, 0 errors, 0 warnings, 0 hints). Only the existing new-pages content warnings.
2. **Production-like build** (`PUBLIC_SITE_ENV=production PUBLIC_SITE_URL=https://www.benormedia.com`): PASS. `/case-studies` present, `noindex, nofollow`, canonical `https://www.benormedia.com/case-studies`, absent from `sitemap-0.xml`. `dev/` holds only `styleguide`. No fixture text ("Chevalier", "MagBak", "Neon Growth", fixture sentences) anywhere, server function included; no `david-chevalier` / `surfe-logo` file or same-md5 image. "Fospha", "Pipeline Generation", "Benor Media" appear only from real Sanity client data and the Organization `alternateName`. `check-seo.mjs` passes.
3. **Normal build:** PASS. `/dev/case-study` present, noindex, not in the sitemap.
4. **Regressions vs `dev`:** BLOCKED. The `origin/dev` worktree build fails in prerender (`Configuration must contain projectId`): it needs `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` (`astro.config.mjs:22-23`). `.env` was never read, copied or linked. Worktree removed.
5. **Code review:** naming, units, tokens clean (no hardcoded colors or font sizes outside comments); `TODO: COPY` / `TODO: DS` markers in place; fixture used only by the dev route; no motion added; content renders without JS; one h1; 5 TOC anchors match real ids, no duplicate ids, no missing alt, no nested links; accent tag contrast 4.65:1; JSON-LD (Article, BreadcrumbList, CollectionPage) valid in shape, publisher/author = shared Organization `@id`, no `offers`, no trailing slashes.
6. **Schema:** matches SCHEMAS v0.10 and the 2026-10-20/21 decisions; `case-studies` reserved (`service.ts:14-23`); `[...page].astro:20-24` guard works.
7. **Sitemap helper** (mocked `fetch`): zero published → index out; published → per-page lastmod, index = newest, noindex excluded; unreachable / 401 / no project id → warns, "nothing published" (see should-fix 2).
8. **Visual** (headless Chrome device emulation, true 390px): `/dev/case-study` and `/case-studies` at 1440 / 991 / 767 / 390, no horizontal overflow, 0 console errors. At 1440 no Figma mismatch beyond the ui handoff list (compared against the ui agent's Figma export; Figma tools unavailable to qa).

## Should fix
1. **"Read the case study" overlaps the client name on `/work` at 768–991px.** The link sits in the fixed 18.75rem tags column (`src/components/ui/ClientList.astro:137-139`) and can't wrap (`src/components/sections/WorkListing.astro:90-98`). Simulated rows: at 800px 8 of the first 10 overlap (Surfe name ends x=269, link starts x=176); at 991px Sublime Security and Notable Capital overlap. Shows with the first publish. Suggested: the link on its own row at ≤991. Keyboard OK.
2. **Sitemap fails open** (`src/lib/sanity/case-study-sitemap.mjs:47-50`): if only the config-time fetch fails, `/case-studies` can be indexable but missing from the sitemap, noindex case studies get listed, detail pages lose lastmod. Suggested: fail the build when a project id is set and the request fails.
3. **Nothing stops the Lorem ipsum index going live** (`src/lib/content/seo.ts:42-50`, `src/components/case-studies/copy.ts:44-59`, `src/pages/case-studies/index.astro:40`): a Sanity publish rebuilds without a PR and `check-seo.mjs` has no `/case-studies` entry. Suggested: fail the production build when a case study is published and the index copy still contains "Lorem ipsum".
4. **Regression comparison not verified** (item 4).

## Nits
5. Article JSON-LD has no `dateModified` / `image` (blog Articles have `dateModified`) (`src/lib/new-pages/jsonld.ts:236-252`).
6. Sitemap lastmod = `publishedAt`, never updated by edits; index lastmod and `hasPublished` count noindex case studies (`case-study-sitemap.mjs:55-65`).
7. Schema accepts a relative link like `pricing` (`caseStudy.ts:186-187`); the renderer drops it silently (`case-study-body.ts:74-81`).
8. Body links opening in a new tab have no screen-reader note (`body/CaseStudyInline.astro:20`).
9. Inline `<style>` inside a `<div>` (`WorkListing.astro:153`): invalid HTML.
10. Dev-only classes `cs-preview__*` lack the `c-` prefix (`src/pages/dev/case-study/[...preview].astro:57-78`).
11. Fixture writes "Benor Media" (`src/lib/sanity/case-study-fixture.ts:122`), dev page only.
12. No intro and no SEO description → site-wide default description shared by several pages (`src/pages/case-studies/[slug].astro:51`).

## Checks
- [x] `pnpm run build` passes
- [x] `pnpm run check` passes
- [x] Checked at 1440 / 991 / 767 / 390

## Open questions for the project lead (answered 2026-10-21)
- Regression build with the two Sanity variables → lead: pass `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET` inline (public values); never read or copy `.env`.
- `/case-studies` out of production builds while nothing is published → lead: yes.
- Fix should-fix 1–3 and nits 5, 7–12; nit 6 only for noindex case studies → lead: yes; rerun qa after.

Evidence: `scratchpad/qa-shots/` and `scratchpad/qa-tools/` in the session scratchpad.
