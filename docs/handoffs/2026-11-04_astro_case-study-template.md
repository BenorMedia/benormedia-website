# Handoff — astro — case study template + Surfe

Date: 2026-11-04 · Author: astro agent · Branch: `feat/work-case-study-template` (stacked on `feat/work-case-study-tag`) · Status: DONE (draft, not pushed)

## What I did
- Built `/work/[slug]` from Figma 4225:11810 ("Case study template", 1920). Figma wins over the brief's JOOR section list (lead 2026-11-04).
- Content model in code: `src/lib/case-studies/types.ts` (one typed `CaseStudy` per entry), `entries/surfe.ts` (slug `surfe`, `DRAFT = true`, `publishedAt` / `updatedAt` 2026-11-04), `index.ts` (`builtCaseStudies()`, `caseStudyPath()`), `registry.mjs` (draft paths for the sitemap, read as text).
- Route `src/pages/work/[slug].astro`: one static page per built entry. Drafts follow `/about`: built only in previews / `astro dev` / `PAGES_INCLUDE_DRAFTS=1`, `noindex, nofollow`, out of the sitemap. A production build has no `/work/surfe`.
- New components in `src/components/case-studies/` (`c-case-*`): `CaseHero`, `CaseStats`, `CaseSection`, `CaseFacts`, `CaseQuote`, `CaseGoals`, `CaseFigure`, `CaseTable`, `CaseStack`, `CaseTimeline`, `CaseTeam`, `CaseTakeaways`, `CaseCta`, `CaseFaq`, `CaseRelated`, `CaseDecor`.
- Reused: `NpBlogSidebar` (sticky TOC + Get in Touch + Share), `NpCrumbs`, `Eyebrow`, `Tag`, `CtaActions` + `CtaShapes`, `FaqAccordion`, /about team photos, `authors.ts`.
- JSON-LD through the shared helper: `caseStudyJsonLd()` in `src/lib/new-pages/jsonld.ts` (`Article` with author and publisher = Organization `@id`, `about` = Surfe; `BreadcrumbList` Home › Work › Surfe; `FAQPage` only when the entry has FAQ items, from the same array as the visible FAQ).
- `scripts/check-seo.mjs` `PAGES`: `/work/surfe` (`Article`, `BreadcrumbList`, keyword `surfe`). `astro.config.mjs`: `LASTMOD['/work/surfe']` and the draft filter on the sitemap.
- Assets downloaded from Figma into `src/assets/case-studies/{surfe,shared}/` (no Figma URLs at runtime); OG image `public/images/case-studies/surfe-og.jpg`.
- FAQ: Figma's block holds the Pricing placeholder questions, so Surfe has none and the block renders nothing. Related case studies: render nothing (no other entry); heading kept as `TODO: COPY`.

## Files changed
- New: `src/lib/case-studies/{types.ts,index.ts,registry.mjs,entries/surfe.ts}`, `src/components/case-studies/*.astro` (16), `src/pages/work/[slug].astro`, `src/assets/case-studies/**`, `public/images/case-studies/surfe-og.jpg`
- Changed: `src/lib/new-pages/jsonld.ts` (new `caseStudyJsonLd`), `astro.config.mjs`, `scripts/check-seo.mjs`
- Docs: `docs/DECISIONS.md` (Work), `docs/SITEMAP.md`, this file

## Checks
- [x] `pnpm run build` passes (production: `/work/surfe` not built, as a draft)
- [x] `PAGES_INCLUDE_DRAFTS=1 pnpm run build` passes; `/work/surfe` built with `noindex, nofollow`, not in `sitemap-0.xml`
- [x] `pnpm run check` 0 errors / 0 warnings / 0 hints; `pnpm run lint` clean
- [x] `node scripts/check-seo.mjs dist/client` on a drafts build with `PUBLIC_SITE_URL` set: every `/work/surfe` check ok; one failure on the whole site, "robots.txt has no Sitemap line" (production-only robots, not this branch)
- [x] 1440 compared with the Figma screenshot; 390 rendered in a 390px iframe: no horizontal overflow (`scrollWidth` 390, no element outside the viewport); the table scrolls inside its wrapper
- [ ] 991 / 767 not screenshotted separately (rules written for both)
- [ ] `scripts/check-draft.mjs` does not exist in the repo, so not run

## Requests for other agents
- @ui: a global screen-reader-only utility (`cc-sr-only`) to replace the local classes in `CaseHero`, `CaseTable`, `CaseTimeline`; an eyebrow on-dark variant (used by `CaseCta`, `CaseStack`, as in `CtaBanner`); tokens for the `TODO: DS` values in DECISIONS → Work → Design team.
- @sanity: none. Note: `/work` links JOOR and DarwinCX to `/work/joor` and `/work/darwincx`, which have no entry yet (see the lead question below).
- @qa: review `/work/surfe` on the preview at 1440 / 991 / 767 / 390, keyboard path through the TOC, table region and team cards.

## Open questions for the project lead
- **Links to missing pages:** in production, `/work` links Surfe (draft, not built), JOOR and DarwinCX (no entry) to pages that 404. Gate the row link on built entries, or hold the Sanity flags until each page ships?
- **Copy edits:** missing spaces and split words fixed; source note, "brief 6 - " and "Image brief 7" left out; Sergio as "General Manager" (not Figma's "Managing Director"); "surfe.com" in the browser frame. OK?
- **Copy kept as in Figma, flagged:** "10-week engagement ... two phases" vs about three months and three phases; "optimisation"; summary without a full stop; "surfe's" lower case; Ahrefs named in Results; redirect-map caption under the wrong image; results image shows 97 while the table says 86; H2s without full stops.
- **SEO title and meta** for Surfe (derived, `TODO: COPY`).
- **Team photos:** /about photos used instead of Figma's placeholder. OK?

## TODO markers added
- `TODO: DS` — `CaseHero` (frame fill, address colour, logo chip), `CaseFigure` (border, caption colour), `CaseTable` (header fill), `CaseStack` (glass tile, on-dark chip, card text, logo tile), `CaseTimeline` (glass tile), `CaseCta` (on-dark eyebrow), `CaseStats` (50px numbers), `CaseQuote` (Medium names); `TODO: DS mobile` in every component's header
- `TODO: COPY` — `entries/surfe.ts`: SEO title / meta, results caption, FAQ, related heading "Lorem ipsum dolor sit", related card numbers
