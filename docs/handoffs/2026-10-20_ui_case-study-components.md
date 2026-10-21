# Handoff — ui — case study components

Date: 2026-10-20 (round 3: 2026-10-21) · Author: ui agent · Branch: `feat/case-studies` (nothing committed) · Status: DONE (rounds 2, 3 and 4 included)

## What I did
- **Round 1.** Built the case-study UI from Figma (`ipKvlka3lQ7tSWAtq3wSGa`, desktop 1920 frames), using existing tokens and components, and the preview page `/dev/case-study`.
- **Round 2 (lead revision).**
  - The preview page now matches the Figma template (3764:16012) with the Figma **sample content**, on the dev page only.
  - The related section has its own markup (`CaseStudyRelated`), and `NpBlogResources` is reverted to its original file.
  - Cards use the short date (MM/DD/YY).
  - The table of contents includes the phases (H3), as in Figma.
  - `/dev/case-study` is no longer emitted in production builds.
- `docs/DECISIONS.md` was not touched in round 2. The three open questions I added in round 1 are still there; the orchestrator owns the log.

## Components (`src/components/case-studies/`)
| Component | Class | Notes |
|---|---|---|
| `CaseStudyCard.astro` | `c-cs-card` | `<li>`: orbit thumbnail (inline SVG, 532:243 as Figma 3768:26448), logo box at the Figma share of the thumbnail (43.6% / 7.22%), "Case study" + "Published on 01/01/01" (short date `formatShortDate`). The tags are styled as Figma inside the card only: em-based box, Regular weight, `--fs-p-s`, one line from 992 up. Title (h2 index / h3 related), "Learn more →". Whole card clickable via `::after`; hover/focus as the blog cards. |
| `CaseStudyLogo.astro` | `c-cs-logo`, `is-card` / `is-panel` | Logo in the bordered box with side squares; no fill, so the glow shows through (Figma). Client name as text when there is no logo. `eager` prop for the hero. |
| `CaseStudyGrid.astro` | `c-cs-grid`, `is-index` / `is-resources` | 3 per row; Figma gaps as a share of the frame (24px → 1.429%, 40px → 2.381%); 1 per row ≤991. |
| `CaseStudyListing.astro` | `c-cs-listing` | Index grid section under `PageHero`. |
| `CaseStudyHero.astro` | `c-cs-hero` | `NpCrumbs`, tag, date \| read time, H1, intro, `CaseStudyFacts`, the rule. Panel = 36% of the row (see the comparison, item 1). |
| `CaseStudyFacts.astro` | `c-cs-facts` | Logo + numbered `<dl>` rows. Empty rows are omitted and the rest renumber. CSS glow + `/images/cta-banner-vector.svg` (loaded eagerly, above the fold). |
| `CaseStudyQuote.astro` | `c-cs-quote` | Nothing when `testimonial` is null. Photo, name, role, logo (client logo, else `companyLogo`). |
| `CaseStudyBody.astro` + `body/*` | `c-cs-body` | Portable Text renderer. H2 and H3 get ids. Phase block (H3 up to the next H2) has the left rule; its text is 72.7% wide (858 / 1180, Figma). |
| `CaseStudyResults.astro` | `c-cs-results` | H2 `id="results"`, up to 3 KPIs, dividers + edge squares. |
| `CaseStudyArticle.astro` | `c-cs-article` | `NpBlogSidebar` (unchanged) + body + results. TOC = H2s and H3s + "The results". |
| `CaseStudyRelated.astro` (replaces `CaseStudyResources`) | `c-cs-related` | Round 3, Figma 3764:16201. Eyebrow "Case studies". One-line heading (`c-text_xl`, line-height 1.4, max-width 1038.76px). Button `CASE_STUDY_COPY.relatedButton` ("Get in Touch", confirmed). Same container as the hero and article (round 4; the round-3 1680px row is reverted). 40px between cards; 110px top/bottom; 8 / 24 / 40px between eyebrow, heading, button and cards. |
| `copy.ts` | — | Labels (`TODO: COPY`), incl. `related.eyebrow` "Case studies" and `related.heading` "Lorem ipsum dolor sit" (the current Figma placeholder). Also `CASE_STUDIES_PATH`, `caseStudyHref()`, `formatShortDate()`, `relatedButton`. |
| `image.ts` | — | `resolveImage` / `imageSize` / `hasImage`: Sanity images (SVG raw, rasters resized) or a dev `previewSrc` (fixture only). |

Helpers outside the folder:
- `src/lib/sanity/case-study-body.ts`: `parseCaseStudyBody`, `caseStudyToc` (H2 + H3), `slugifyHeading`, `CASE_STUDY_RESULTS_ID`.
- `src/lib/sanity/case-study-fixture.ts`: `createCaseStudyFixture(assets)`, the Figma sample content, `TODO: COPY`.

## Files changed
- New:
  - `src/components/case-studies/*`
  - `src/lib/sanity/case-study-body.ts`
  - `src/lib/sanity/case-study-fixture.ts`
  - `src/pages/dev/case-study/[...preview].astro`
  - `src/assets/dev/case-study/surfe-logo.png` (Figma source PNG of "Image (Surfe)", 321×100; no SVG exists in the file)
  - `src/assets/dev/case-study/david-chevalier.png` (Figma export of node 3768:26217, 207×207)
- Removed (round 1 files of mine): `src/pages/dev/case-study.astro` (replaced by the rest route), `src/components/case-studies/CaseStudyResources.astro`.
- Reverted: `src/components/new-pages/NpBlogResources.astro` (`git checkout`; nothing else used the slot).
- `docs/DECISIONS.md`: round-1 edit only.

## Checks
- [x] `pnpm run build` passes
- [x] `pnpm run check` passes (0 errors, 0 warnings, 0 hints)
- [x] `pnpm run lint` passes
- [x] Checked at 1440 / 991 / 767 / 390. Headless Chrome; 991 / 767 / 390 inside an iframe so the viewport is exact. At 390, `scrollWidth` = viewport (no horizontal scroll).
- Screenshots in `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/1e965cb5-e4aa-4b8e-b467-4188705024b4/scratchpad/case-study-r2/`: `figma-template.png` (1920 frame), `before-1440.png`, `after-1440.png`, `after-991.png`, `after-767.png`, `after-390.png` (also `before-1920.png` and the side-by-side crops `f1.png`, `e2.png`).

### Production-build check
- `PUBLIC_SITE_ENV=production pnpm run build`: `dist/client/dev/` holds only `styleguide`. No `case-study` route, no Surfe/photo asset in `_astro/`, and no "David Chevalier" / "MagBak" anywhere in `dist/` or `.vercel/output/`.
- Normal `pnpm run build`: `dist/client/dev/case-study/index.html` is present, `noindex`, and not in `sitemap-0.xml`.
- How it works:
  - The route is `src/pages/dev/case-study/[...preview].astro`. Its `getStaticPaths` returns no path when `resolveMode()` (`src/lib/new-pages/registry.mjs`) says production (`VERCEL_ENV=production` or `PUBLIC_SITE_ENV=production`). `astro dev` and Vercel previews still get the page.
  - The two Figma images are read from disk at render time and inlined as data URIs. The first version imported them as modules, and Vite still copied them into `_astro/` in the production build even though the page was skipped.

### Production-build check (round 3)
Re-run after round 3: `PUBLIC_SITE_ENV=production pnpm run build` → `dist/client/dev/` holds only `styleguide`, no Surfe/photo asset in `_astro/`, and no sample text in `dist/` or `.vercel/output/`. Normal build → `dev/case-study` present.

### Blog / guide / author / home / work HTML diff
I compared the original baseline build (before any case-study work) with the final build, re-run after round 3, on: /blog, `blog/webflow-price-increase`, `blog/ai-traffic-in-ga4`, `guides/webflow-vs-custom-code`, `guides/webflow-enterprise`, `authors/sergio-gancedo`, /, /work.
- **Markup:** identical on all 8 pages, with stylesheet tags and hashed asset names stripped.
- **CSS:** the same set of rules on all 8 pages (0 added, 0 removed).
- **Bytes:**
  - `authors/sergio-gancedo` is byte-identical.
  - Blog posts and guides differ only because Vite inlines `NpBlogSidebar`'s CSS as a `<style>` (the component is now also used by the case-study page) instead of keeping it in the `NpArticlePage` chunk. No other rule targets `.c-np-sidebar*`.
  - `NpBlogResources` is back to its original file.

## Figma comparison (round 2)
Compared side by side: the Figma 1920 frame scaled to 1440 width against the built page at 1440, plus `get_design_context` on every listed node. Nav, CTA banner and footer are ignored.

**Scale note.** The site container is 1230px at ≥1440 (Figma 1680). Spacing follows DESIGN_SYSTEM §1 (Figma px ÷ 14). Type uses the DS text classes, which don't scale by one factor:
- Figma 60px → `c-text_xl` 54.7px (×0.91)
- Figma 20px → `--fs-p` 14.6px (×0.73)

Text therefore looks larger or smaller relative to the boxes than in the frame. That is systemic and is not listed per item.

### Hero (3764:16029, 3768:25937): 13 differences
1. H1 wrapped to 3 lines (Figma 2): the text column was 648px, the H1 needs 687px. **Fixed:** facts panel = 36% of the row (443px at 1440, Figma 724/1680 = 43%), text column 737px. 2 lines at 1440, 1200 and 992. `TODO: DS`.
2. Facts content (Lorem placeholders) vs Surfe / Pipeline Generation / Benor Media / challenge text. **Fixed** (fixture).
3. No logo in the facts panel (text fallback) vs the Surfe logo. **Fixed:** Figma source PNG. No SVG exists; the node export had a dark fill, so the raw image is used.
4. Logo box had a white fill; Figma has none (the glow shows through). **Fixed** (box and card).
5. Read time "2 min read" vs "9 min read". **Fixed** (fixture `readTime: 9`).
6. Date "October 20, 2026" vs "01/04/2023". **Partly fixed:** the fixture date is now 2023-01-04, shown as "January 4, 2023". **Not fixed:** the blog date format for the hero is the approved decision; the round-2 short date applies to cards only.
7. Breadcrumb last item: Figma "Lorem ipsum dolor sit amet." (shorter than the H1) vs ours = the title. **Not fixed:** the schema has no breadcrumb label; the crumb is the title.
8. Globe line art at the panel bottom was missing in the first screenshot (lazy image). **Fixed:** loaded eagerly (above the fold).
9. Facts challenge text wraps to 4 lines (Figma 2) because the panel is narrower (item 1). **Not fixed:** a consequence of item 1.
10. Tag "CASE STUDY" at weight 600 vs Figma Regular 400. **Not fixed:** Eyebrow `is-accent` weight is locked in DS §3.3.
11. H1 line-height 1.2 vs Figma 1.4. **Not fixed:** the `c-text_xl` line-height is DS §3.1.
12. Date / read-time colour Figma #4A4A4A vs `--color-text-secondary` #4F4F4F. **Not fixed:** closest token.
13. Panel glow slightly lighter than the Figma render. **Not fixed:** same values (20%, brand gradient, blur); Figma stacks two blurs.

### Quote (3768:26212): 5 differences
14. Placeholder quote, initial "L", no logo vs the Figma quote, David Chevalier's photo, "David Chevalier", "CEO", Surfe logo. **Fixed** (fixture; photo exported from node 3768:26217).
15. Curly quotes vs Figma straight quotes. **Not fixed:** site convention (`TestimonialCard`).
16. Name in Poppins SemiBold vs body font at 600. **Not fixed:** kept at semibold per the lead; no Poppins in the DS.
17. Quote text 25.9px over 2 lines vs Figma 30px over 2 lines. Matches in lines; type scale (note above).
18. Figure padding / radius / border match (38 / 34px, 14px, 1px). No change.

### Sidebar (3768:26363): 5 differences
19. TOC listed H2s only; Figma lists the phases too ("Phase 1. Optimizing", "Phase 2. Strategic Diversification"). **Fixed:** `caseStudyToc` includes H3s, and H3s get ids.
20. TOC items are the Figma sample headings. **Fixed** (fixture body).
21. "Phase 2. Strategic Diversification" is cut with an ellipsis at 1440 (the sidebar is 20.8% of the row, as Figma, but the item text is larger relative). **Not fixed:** shared `NpBlogSidebar` style, kept unchanged.
22. Side squares on the TOC box. **Not fixed:** the lead asked to keep the TOC without them.
23. TOC item gap (Figma 10px between 32px-high items) vs the shared 25px. **Not fixed:** shared component.

### Article / phase block (3768:26274, 3768:26281): 6 differences
24. Lorem body vs the Figma sample body. **Fixed**, word for word: The Problem (2 paragraphs), The Solution, Phase 1 (3 paragraphs), Phase 2 ("The indicators:" ×2 paragraphs, "The Strategy:" 2 paragraphs, 2 bullets).
25. Phase text ran the full column (882px at 1440) vs Figma 858 of 1180 next to the rule. **Fixed:** `max-width: 72.7%`.
26. Bold labels in Poppins SemiBold vs body font at 600. **Not fixed:** kept per the lead.
27. Paragraph gap 24px everywhere; Figma uses a blank line (30px) inside "The Problem" and Phase 1, and 24px in Phase 2. **Not fixed:** Figma is inconsistent; 24px kept.
28. The Figma rule (976px) stops above the bullet list; ours runs to the end of the phase block. **Not fixed:** looks unintentional in Figma; a rule that ends mid-block can't be tied to content.
29. List bullets: native discs, 30px indent (Figma). No change.

### Results (3768:26295): 2 differences
30. "+00%" placeholders vs +40% / +30% / +12% with the Figma descriptions. **Fixed** (fixture).
31. Value line-height 1.4 matches; type scale per the note above. No change.

### Related section (3764:16201, 3768:26447): 10 differences
32. Shared `NpBlogResources` shell (header gap 24px, no 8px eyebrow gap) vs Figma. **Fixed:** own `CaseStudyRelated` (eyebrow → heading 8px, heading → button 24px, button → cards 40px, 110px top/bottom); `NpBlogResources` reverted.
33. Heading line breaks differed (1 long line + rest) vs Figma's 2 balanced lines. **Fixed:** `max-width: 17.3em` (Figma 1038px box ÷ 60px).
34. Heading colour Figma #001F3D "Deep Sea 900" vs `--color-heading` #12142B. **Not fixed:** no token, `TODO: DS`.
35. Button "Get in Touch" vs Figma "Start a Project". **Not fixed:** approved decision, pending the lead; one constant (`CASE_STUDY_COPY.relatedButton`).
36. Eyebrow "Resources" vs Figma "Case studies". **Not fixed:** approved decision.
37. Card column gap 40px fixed vs the frame's proportion. **Fixed:** 2.381% (40/1680); index 1.429% (24/1680). Cards 398px at 1440.
38. Tags wrapped to 2 lines ("Published on October 20, 2026") vs one line. **Fixed:** short date MM/DD/YY ("PUBLISHED ON 01/01/01"); measured one line at 1440 and two lines at 1200 (cards 330px); the switch is around 1250px. **Not fixed below that:** wraps between 992 and about 1250; full width at ≤991.
39. Logo box too big for the thumbnail (60% of card width) vs Figma 43%. **Fixed:** box width 42.7% and padding 7.07% of the thumbnail, logo ≤ 48px tall. Matches Figma at any card width.
40. Card glow visibly fainter than the Figma render, and the Figma colour #1355FF has no token. **Not fixed:** same geometry and opacity as the exported Figma SVG; colour is `--color-accent` (`TODO: DS`).
41. Accent tag weight 600 vs Figma 400. **Not fixed:** DS §3.3.

**Totals:** 41 items. Hero 13, quote 5, sidebar 5, article 6, results 2, related 10.
- **Fixed (18):** 1–5, 8, 14, 19, 20, 24, 25, 30, 32, 33, 37, 38 (one line at 1440), 39, plus the logo-box fill from item 4 applied to the cards.
- **Not fixed (17):** 6 (partly fixed), 7, 9–13, 15, 16, 21–23, 26–28, 34–36, 40, 41, each with its reason above.
- **No change needed (4):** 17, 18, 29, 31 (they match Figma).

## Figma comparison (round 3: related section)
Sources:
- Figma 3764:16201 and card 3768:26447: `get_design_context` + `get_screenshot`.
- The built section at 1440 and 1920, from DOM measurements (`getBoundingClientRect`) and screenshots.

Figma has changed since round 2: the heading placeholder is now "Lorem ipsum dolor sit" (one line), and the section is 1018px tall.

Screenshots in `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/1e965cb5-e4aa-4b8e-b467-4188705024b4/scratchpad/case-study-r3/`: `related-figma.png` (1920), `card-figma.png`, `related-before-1440.png`, `related-after-1440.png`, `related-after-1920.png`, `related-after-991.png`, `related-after-767.png`, `related-after-390.png`.

Before → Figma (values at 1920 unless noted):
1. **Row width / side margins:** 1230px in the site container (105px margins at 1440, 345px at 1920) vs Figma 1680px with 120px margins. **Fixed:** this section's container from 768 up: `padding-inline: 8.571rem` (120px), `max-width: 120rem + margins` (1680px row). Measured 1200px at 1440 and 1680px at 1920. At ≤767 the site container's mobile padding stays.
2. **Card gap:** 29.3px (2.381%) vs 40px. **Fixed:** 2.857rem. Measured 40px at 1440 and 1920. Cards are 373px at 1440 and 533px at 1920 (Figma 533).
3. **Eyebrow text:** "Resources" vs "CASE STUDIES". **Fixed:** `CASE_STUDY_COPY.related.eyebrow` = "Case studies" (`TODO: COPY`), uppercased by Eyebrow.
4. **Eyebrow box:** 132 × 31px at 13.1px vs Figma 148 × 37px at 15px. **Not fixed:** shared Eyebrow size (DS §3.3, 0.9375rem); the brief limits tag changes to the card.
5. **Heading copy:** 2-line placeholder vs Figma "Lorem ipsum dolor sit". **Fixed:** the current Figma placeholder (`TODO: COPY`). One line at every width, 522px wide at 1440 and 1920.
6. **Heading size:** 54.7px vs Figma 60px. **Not fixed:** Figma style "Text XL" = `c-text_xl` (3.91rem); 60px has no token, and the type was not shrunk or changed.
7. **Heading line-height:** 1.2 vs Figma 1.4 (box 66 vs 84px). **Fixed:** `line-height: 1.4` on this heading (box 76.6px at 54.7px type). `c-text_xl` is 1.2 in DS §3.1, so this is marked `TODO: DS`.
8. **Heading max-width:** 947px (17.3em) vs 1038.76px. **Fixed:** 74.197rem (1038.76px at the 14px root).
9. **Heading colour:** #12142B vs Figma #001F3D "Deep Sea 900". **Not fixed:** no token; closest is `--color-heading` (#12142B), marked `TODO: DS`.
10. **Button:** 156 × 56px, 18.2px, "Get in Touch" vs Figma 186 × 60px, 20px, "Start a Project". **Not fixed:** the label is confirmed; the size is the shared `c-button` style.
11. **Gaps eyebrow → heading → button → cards:** 8 / 24 / 40px. Already matched; still 8 / 24 / 40 after the line-height change. No change.
12. **Section padding:** 110px top / bottom. Already matched. No change.
13. **Thumbnail ratio:** 543:243 (index card) vs related 532:243 (thumb 237.8 vs 243px). **Fixed:** 532:243, measured 242.7px at 1920. Index cards (Figma 543:243) are now about 2% taller than their frame.
14. **Logo box:** 165.9 × 90.8px at 1440 in a 390px card; with the old 42.7% share, 228px at 1920 vs Figma 232 × 126px, logo 154 × 48px. **Fixed:** 43.6% width / 7.22% padding of the thumbnail. Measured 231.7 × 126.4px, logo 152.9 × 47.6px at 1920. 161.9 × 88.7px at 1440 (scales with the card).
15. **Tag type and box:** 13.1px, accent weight 600, padding 0.5em / 1.05em, squares 8.75px, gap 16px vs Figma 15px Regular, padding 10 / 16 / 8 / 16px, tracking 0.96px, 0.5px border, 10px squares 5.5px out, gap 16px. **Fixed, scoped to `CaseStudyCard`:** the Figma box in em (0.667 / 1.067 / 0.533em), 0.064em tracking, 0.5px border, 0.667em squares at −0.367em, 1.067em gap, weight 400, type `--fs-p-s` (12.6px). Shared Eyebrow and Tag are untouched.
16. **Tag size vs Figma:** at the Figma 15px the two tags (369px) don't fit one line in a 1440 card (323px text column). With 12.6px they measure 318.8px and fit. **Not fixed at 1920:** there they are 84% of the Figma size; there is no rem value that matches both 1440 and 1920, because the root is fixed at 14px from 1440 up. `TODO: DS`.
17. **Tags one line:** wrapped at <1250px in round 2. **Fixed:** `nowrap` from 768 up. Between 992 and 1439 the row can be up to about 12px wider than the text column and runs into the 24px card padding (measured 277px in a 265px column at 1200). Wraps only at ≤767 when the card is too narrow (it doesn't at 390).
18. **Accent tag tint:** 5% vs Figma 8%. **Not fixed:** the blog cards' contrast fix (8% measures 4.48:1 with accent text).
19. **Card title:** 25.9px vs Figma 30px. One line at 1920 vs Figma 2 lines (the card is Figma width but the type is smaller); 2 lines at 1440. **Not fixed:** `c-text_m` token (DS scale).
20. **"Learn more":** 14.6px vs Figma Inter 20px. **Not fixed:** `c-paragraph` token; Inter is not a site font.
21. **Card height:** 481px vs 545px at 1920 (444px at 1440). **Not fixed:** a result of items 19 and 20.
22. **Card glow:** fainter than the Figma render, and Figma #1355FF has no token. **Not fixed:** same geometry and opacity as the Figma SVG; colour `--color-accent` (`TODO: DS`).
23. **Card border / radius / body padding / title padding:** 0.5px #E4E6EA, 8px, 24px, 40px. Already matched. No change.

**Totals:** 23 items. Fixed 12 (1, 2, 3, 5, 7, 8, 13, 14, 15, 17, plus 16 at 1440 only). Not fixed 9 (4, 6, 9, 10, 16 at 1920, 18–22). No change needed 4 (11, 12, 23, and 21 as a consequence).

**Heading choice (point 2):** I used the **Figma placeholder as-is**. The frame now reads "Lorem ipsum dolor sit", which fits one line at the Figma style (`c-text_xl`) and the Figma width (1038.76px) at 1440. No shortening was needed and the type was not shrunk.

**Shared Nav, CTA banner, Footer, Eyebrow, Tag and Button:** unchanged.

## Round 4 (lead's final fixes, 2026-10-21)
1. **Related section container:** the round-3 section-only row (120px margins, 1680px) is reverted. The section uses the same `c-container` as the hero and article (1230px at ≥1440). Kept: 40px between cards, 110px top/bottom, 8 / 24 / 40px eyebrow → heading → button → cards, 12.6px tags, logo box at 43.6% / 7.22% of the thumbnail. Measured at 1440: cards 383px, gap 40px, tags 318.8px on one line in a 333px text column, logo box 166 × 91px, heading on one line.
2. **Eyebrow and button:** shared site sizes, already so. No change.
3. **Tags:** 12.6px, unchanged.
4. **Hero date:** already the blog format, `formatDate` ("January 4, 2023"). No change.
5. **Facts panel 36%:** kept.
6. **Phase block:** text full width at ≤767 (`max-width: none`). Left rule and 1.778rem mobile indent kept; 72.7% from 768 up.
7. **TOC wrap, case studies only:** a scoped rule in `CaseStudyArticle` (`.c-cs-article__side :global(.c-np-sidebar__label)`: `white-space: normal`, no ellipsis). `NpBlogSidebar` is untouched. At 1440, "Phase 2. Strategic Diversification" wraps to two lines (35px vs 18px for one line).
8. **Tokens:** no changes to `tokens.css` or `DESIGN_SYSTEM.md`.

**Checks:**
- Build, check (0 errors) and lint pass.
- `PUBLIC_SITE_ENV=production pnpm run build` → no `dev/case-study`, no Surfe/photo asset, no sample text in `dist/` or `.vercel/output/`. A normal build includes the page.
- HTML diff vs the original baseline: /blog, two posts, two guides, the author page, / and /work all have identical markup and the same CSS rules.

Screenshots in `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/1e965cb5-e4aa-4b8e-b467-4188705024b4/scratchpad/case-study-r4/`: `after-1440.png`, `after-1920.png`, `after-390.png` (full page), `related-after-1440.png`, `toc-1440.png`.

## Responsive decisions (round 1 list, round-2 changes marked)
1. Card grid: 3 per row, one per row at ≤991 (`NpBlogResources` pattern). **Round 2:** column gaps are now Figma shares (1.429% / 2.381%), so cards keep the frame proportions from 992 up.
2. Short last row centred (blog cards).
3. Index listing padding 110px; 5rem at ≤767.
4. Related section: 110px top/bottom; 5rem at ≤767. **Round 2:** own component. **Round 3:** a 1680px Figma row (reverted in round 4). **Round 4:** the site container, same as the hero and article; 40px card gap at all multi-column widths.
5. Hero: two columns, one column at ≤991 (`NpBlogHero`). **Round 2:** panel = 36% of the row (was 724fr : 906fr).
6. Hero padding at ≤767: 5rem top, 4.444rem bottom and before the rule.
7. Facts panel padding at ≤767: 2.857rem 2.222rem; globe art clipped by the panel.
8. Logo box max width 18rem / 22rem at ≤767 (panel). **Round 2:** card logo box is now a share of the thumbnail at every width.
9. Quote caption wraps when narrow; at ≤767 padding 2.857rem 2.222rem, caption gap 1.111rem, bottom 4.444rem.
10. Article grid 350 | 1220 ≥1200, 300 | 800 at ≤1199 (kept, per the lead), one column at ≤991 (`NpArticlePage`).
11. Sidebar sticky on desktop, static above the body at ≤991 (`NpBlogSidebar`, unchanged). **Round 4:** on case studies, TOC entries wrap to two lines at every width instead of the ellipsis (scoped in `CaseStudyArticle`).
12. Body at ≤767: 4.444rem before H2s and the phase block; phase indent 1.778rem. **Round 2:** phase text 72.7% of the block. **Round 4:** 72.7% from 768 up, full width at ≤767.
13. Results stack at ≤767, horizontal dividers between cells.
14. Article bottom / body → results gap 4.444rem at ≤767.
15. Hero H1 keeps `c-text_xl` on mobile.
16. Card tags (round 3): one line from 768 up (`nowrap`). Between 992 and 1439 the row can run up to about 12px into the card's 24px padding. At ≤767 they may wrap if a card is very narrow (not at 390).

## TODO: DS (Figma value → what is used)
| Where | Figma | Used |
|---|---|---|
| Hero columns | 906 \| 724 in 1680 | text 1fr \| panel 36% (443px at 1440) so the H1 keeps 2 lines |
| Card thumbnail glow | #1355FF "Blue 500" at 10% | `--color-accent` at 10% |
| Related heading line-height | Text XL 1.4 | 1.4 on this heading (`c-text_xl` is 1.2) |
| Related heading size | 60px | `c-text_xl` (54.7px) |
| Card tags | Acumin 15px Regular, 10 / 16 / 8 / 16px, 0.96px, 0.5px, 10px squares | `--fs-p-s` (12.6px), same box in em, weight 400 (card only) |
| Related section row | 120px margins, 1680px row | site `c-container` (1230px at ≥1440), lead round 4 |
| Related heading colour | #001F3D "Deep Sea 900" | `--color-heading` |
| Quote author name | Poppins SemiBold 20px #12142B | body font, 600, `--color-heading`, `c-paragraph` |
| Body bold ("The indicators:") | Poppins SemiBold 20px #212427 | body font, 600, `--color-black-secondary` |
| Hero date / read time colour | #4A4A4A | `--color-text-secondary` (#4F4F4F) |
| Facts row labels | Acumin 15px uppercase, 0.96px tracking | `--fs-p` (14.6px), 0.064em |
| Facts values | Brulia 25px | `c-text_m` (25.9px) |
| Facts challenge / hero meta | 18px | `c-paragraph_m` (facts) / `c-paragraph_s` (hero meta, as `NpBlogHero`) |
| Hero intro | 24px / 40px | `c-paragraph_l` (23.4px / 1.6) |
| Body H2 / H3 | Brulia 38px / 30px | `--fs-text-l` / `--fs-text-m` |
| Text XL line-height (H1, related heading) | 1.4 | `c-text_xl` 1.2 |
| Accent tag weight | 400 | 600 (DS §3.3) |
| Logo box radius / border | 3.6px (card), 2.9px (panel), 0.6px | as Figma, 0.5px `--color-gray` |
| Card logo box size | 232px box, 38.4px padding, 154 × 48px logo in a 532px thumbnail | 43.6% / 7.22% of the thumbnail, logo ≤ 3.429rem |
| Phase text width | 858px of 1180px | 72.7% from 768 up; full width at ≤767 (round 4) |
| Card gaps | 40px related / 24px index in 1680 | 2.857rem related (round 3) / 1.429% index |
| Quote figure | 14px radius, glass 5%, 10px backdrop blur | as Figma, `--color-surface-glass` |
| Results edge squares | 15px, 0.75px, 2.25px radius | as Figma (px), `--color-gray` |
| Facts glow | two blurs (79 + 135), 20% | one `blur(135px)`, `--gradient-primary`, 20% |
| Facts dividers | 1.38px white 50% | 1px `--color-white` 50% |
| Phase rule | 976px from 22px, stops above the list | from 1.571rem to the block end |

## Requests for other agents
- @astro:
  - Build `/case-studies` with `PageHero` (`CASE_STUDY_COPY.indexHero`) + `CaseStudyListing`.
  - Build `/case-studies/[slug]` as `CaseStudyHero` → `CaseStudyQuote` → `CaseStudyArticle` → `CaseStudyRelated cards={caseStudyResources(cs)}` → `CtaBanner` (same order as `/dev/case-study`).
  - Emit the BreadcrumbList JSON-LD on the page (`NpCrumbs` prints none).
  - `/work` "Read the case study" can use `caseStudyHref()`.
  - Never import `case-study-fixture.ts` on a real page.
- @qa: Review `/dev/case-study` (local / preview only; not built in production) at 1440 / 991 / 767 / 390, the comparison list and the responsive list.

## Open questions for the project lead
0. ~~Round 3 questions~~: answered in round 4 (site container, 12.6px tags, shared eyebrow/button sizes, blog-format hero date, 36% panel, full-width mobile phase text, wrapping TOC).
1. ~~Related button~~: "Get in Touch" confirmed 2026-10-21.
2. Hero date: keep the blog format ("January 4, 2023") or use the Figma "01/04/2023"? Cards now use the short date.
3. Hero panel is 36% of the row so the H1 fits in 2 lines (Figma ratio is 43%); the challenge text then wraps to 4 lines. OK?
4. Card tags wrap to 2 lines between 992 and about 1250px. OK, or a smaller tag style for cards?
5. Phase text at 72.7% on mobile too, or full width at ≤767?
6. TOC: the shared sidebar cuts "Phase 2. Strategic Diversification" with an ellipsis at 1440 (Figma shows it in full). OK, or a case-study-only TOC style?
7. DS gaps: Text XL line-height 1.4, accent tag weight 400, Deep Sea 900 and Blue 500 colours (see the table).

## TODO markers added
- `TODO: DS`: card glow colour; related heading colour; hero panel 36%; Poppins SemiBold → body 600 (quote name, body bold). Every row of the table above.
- `TODO: COPY`:
  - `src/components/case-studies/copy.ts`: placeholder labels for real pages. No sample content there.
  - `src/lib/sanity/case-study-fixture.ts`: Figma sample content, dev page only, each block marked.

---

## QA fix round (2026-10-21)

Source: `docs/handoffs/2026-10-21_qa_case-studies-review.md`, should-fix 1 and nit 9 (approved by the lead). Files changed: `src/components/ui/ClientList.astro` (case-study row markup + header comment only; its `<style>` is untouched) and `src/components/sections/WorkListing.astro`. No commit.

### Should-fix 1: "Read the case study" overlapped the client name
- The link is no longer inside `c-client-list__tags`. It is its own grid item in the row, between the name and the tags (DOM order: website link, case study link, tags, so the keyboard order stays website → case study).
- **≥992:** row columns `minmax(0, 1fr) auto minmax(18.75rem, auto) 2.5rem`. The link has its own `auto` column left of the tags. The tags column keeps 18.75rem but may grow: on Surfe, Resourcify, Unit21, Sublime Security and Notable Capital the funds + category tags are wider than 18.75rem and spill left (same as today on rows without a link). With a fixed column they covered the link at every width 992–1440. Tags stay right-aligned, so rows whose tags fit look the same as the other rows. The link stays next to the tags at ≥992; long names do not collide or truncate there, so it does not need its own line above 991.
- **768–991:** the link drops to its own full-width line under the row (`grid-row: 2`), same pattern as the mobile tags line.
- **≤767:** the tags already take line 2 (ClientList), so the link goes to line 3. `TODO: DS mobile` (no mobile design).

### Nit 9: `<style>` inside a `<div>`
- Moving the `<style>` outside the `<div>` would not fix it: HTML only allows `<style>` in `<head>`, so a `<style>` anywhere in `<body>` is invalid. A component can't write to `<head>`, and a normal Astro `<style>` block is bundled whenever the component is imported, rendered or not, so `/work` would change.
- So the CSS now ships as `<link rel="stylesheet" href="data:text/css,…">`, placed just before the list, and only when a row has a case study link. `stylesheet` is a body-ok link type, so a `<link>` inside the `<div>` is valid. The CSS is still inline in the HTML (no extra request; comments stripped, whitespace collapsed) and is parsed before the rows, so they never show unstyled. No CSP in the repo restricts `data:` stylesheets. If one is added later, it needs `style-src data:`; otherwise move this CSS to a static file.

### Verification
- Temporary in-memory map (every client → `/case-studies/test`) in `WorkListing.astro`, removed before finishing (no `TEMP` line left). Checked in headless Chrome on the running dev server for overlap between name text, link and each tag in all 61 rows:
  - 375, 767, 991, 992, 1100, 1200, 1440: 0 overlaps, 0 truncated names, no horizontal overflow, 0 console errors.
  - 800: Sublime Security and Notable Capital names overlap their **tags**, and 19 names truncate. This happens at HEAD too, without any case study link (measured on the HEAD build). It is not caused by the link, which sits on its own line there. Left alone (see below).
  - Keyboard order in every row: name (website, new tab) → "Read the case study".
- Screenshots in `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/1e965cb5-e4aa-4b8e-b467-4188705024b4/scratchpad/qa-fix-work/`: `m375-*.png`, `w800-*.png`, `w991-*.png`, `w1200-*.png`, `w1440-*.png` (`-surfe`, `-sublime`, `-notable` each), plus full pages `work-<width>.png`.
- **Byte-identical with no published case study:** HEAD (8b4ca88) and HEAD + these two files were built in a scratch worktree with the public Sanity id and dataset passed inline (`.env` never read). `diff -rq` of the two `dist/` trees showed no differences: all 38 HTML pages (`/work`, Home, Pricing, service pages) and every asset are identical. The worktree was removed afterwards.
- `pnpm run check`: 0 errors, 0 warnings, 0 hints. `pnpm run lint`: pass. `pnpm run build`: passes in the worktree (HEAD + fix). I did not run it in the main tree while another agent was editing there.

### Noticed, left alone
- Pre-existing in the shared `ClientList` row CSS (measured on `/work`; Home, Pricing and the service pages use the same CSS but were not measured), between 768 and about 900px: wide tag pairs spill out of the fixed 18.75rem column over long names (Sublime Security and Notable Capital at 800). Fixing it means changing the shared row CSS, which is out of scope for this round. Question for the lead: drop the tags to a second line at ≤991 for all rows?
