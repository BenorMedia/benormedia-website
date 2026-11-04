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

---

## Follow-up 2026-11-04: fidelity pass + hero video

### What I did
- **Fidelity pass** against `docs/refs/Case-study-template.png` at a 1920 window (the site caps at the 1440 container, so the reference is compared at x0.729, the `--u` scale). Section heights now match the reference within a few px (hero 631/631, stats 141/140, at a glance 535/544, challenge 1114/1117, what we did 1758/1749, results 957/992, team 783/784, CTA 378/377, TOC box 448/456); stack is +31 (font fallback, below).
  - Type at the design's sizes: `--cs-fs-*` page variables scale the closest tokens from 768 up (H1 60, H2 38, H3/names 30, stats 50, quote 25.9, lead 25, body 20, small 18, xs 15); phones keep the tokens.
  - Eyebrows and tags in hero and body at Figma's 15px; logo chip at 24/10 padding; crumbs 15px with 8px gaps.
  - TOC sidebar restyled on this page to 4225:11907 (13.5px items, 42.4px pitch, 50/32/32 box, 15px tab).
  - Hero: browser address 13.2px, button 20px with 16/30/14 padding.
  - Stats: labels 250px wide, 18px.
  - Table: Figma rows (18px, 10/16 padding, 40px column gaps, 250/72/200 columns, #F7F7F7 header); phones size columns freely and scroll.
  - Quote: photo 51.8px, name 20 / role 18.
  - Stack: logo tiles 44px.
  - Timeline: glass tiles fixed (they shrank to a strip next to the card edge), blue dashed line.
  - Takeaways: check icon re-exported at 4x (32px).
  - Inline CTA: Figma padding and button size.
  - "What we did" intro removed: hidden layer in Figma (4225:12236), not in the reference.
- **Hero video + cursor follow:** entry `client.id: "client-surfe"`; the page fetches `websiteVideo` + `websiteVideoPoster` with `getClientsByIds` at build and falls back to the screenshot. New shared scripts `src/scripts/ui/client-video.ts` (Featured Work's logic) and `src/scripts/ui/cursor-follow.ts`.

### Files changed
- New: `src/scripts/ui/client-video.ts`, `src/scripts/ui/cursor-follow.ts`
- Changed: `src/pages/work/[slug].astro`, every `src/components/case-studies/*.astro` with text, `src/lib/case-studies/{types.ts,entries/surfe.ts}`, `src/assets/case-studies/shared/check.png`, `docs/DECISIONS.md`

### Checks
- [x] `pnpm run build`, `pnpm run check` (0/0/0), `pnpm run lint` clean
- [x] Drafts build with `PUBLIC_SITE_URL`: `check-seo` 10/10 ok on `/work/surfe`; only the production-only robots line fails site-wide
- [x] 1920 side by side per section; 1440 and 390 re-checked: no horizontal overflow at 390
- [x] Cursor follow tested with synthetic pointer events: hidden at rest, follows with easing, fades on leave, keyboard focus at Figma's spot; video plays on screen (`preload="none"`)

### Deliberate differences kept
- **Line breaks** differ where Acumin text runs wider. The site never loads the Adobe Fonts kit, so body text is the system fallback: stat labels, the HubSpot chip under its logo, takeaway cards (+20px). The H1 glyphs match within ~4%; its wrap differs by one word.
- **Site container:** 7.5rem side padding (Figma 120px = 6.25rem at this scale), for alignment with nav and footer.
- **About source note** left out (the reference shows it); Sergio's title; "surfe.com" in the frame (Figma "yoursite.com").
- **Shared components kept as they are:** the CTA badge (`CtaActions`) and the final CtaBanner + footer (newer than the Figma instances), and Acumin Medium shown at 400 (kit has 400/700).
- **Team photos** come from /about (Figma has a placeholder).
- **Video crop:** the video is 16:9 in Figma's 1069x611 box (`object-fit: cover`, top).

### Requests
- @ui: switch `ClientCard.astro`'s inline video script to `src/scripts/ui/client-video.ts`; load the Adobe Fonts kit (site-wide, needs the kit ID).

## Follow-up 2 (orchestrator, lead review 2026-11-04)

- **Before / after figure** (4225:12100): the flat export had its top band cut (chips) and the backdrop lost. Rebuilt in `CaseFigure` (`figure.compare`) from Figma's layers at Figma's coordinates (% of 1220 × 470): CSS glow, swatches, both browsers (exports clipped to the frame, shadow included), connector vectors turned −90deg as in Figma (frames centred, x 403 / 549), round badge, BEFORE / After chips in HTML. `src/assets/case-studies/surfe/before-after.png` replaced by `before-after/*`.
- **Accent chips weight**: hero "Case study" and "GOAL 0x" are Acumin Regular in Figma (4225:11842, 4225:12067); the shared Tag sets 600 on `is-accent`. Page-level override to 400 on `/work/[slug]` only.
- **Stack chips**: logo and chip on one row (4225:12593), chip without tracking (4225:12597).
- **FAQ**: Figma's visible FAQ is Surfe's (4 questions; the layer names are stale Pricing ones). Added; centred Text XL heading, full-width list 48px below; not in the TOC (Figma's ends at "Next steps"). Only Q2 has an answer in Figma: Q1, Q3 and "Evidence log" carry `[FACT NEEDED: ...]` markers and stay out of the FAQPage JSON-LD.
