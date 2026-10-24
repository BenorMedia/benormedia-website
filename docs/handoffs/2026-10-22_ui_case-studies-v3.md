# Handoff — ui — case studies v3 (updated Figma template)

Date: 2026-10-22 · Author: ui agent · Branch: `feat/case-studies-v2` · Status: DONE (not committed, not pushed)

Figma `ipKvlka3lQ7tSWAtq3wSGa`: template **3842:40046** (new; 3790:36532 is gone), index 3790:36365. References: `docs/refs/case-studies/Case study template.png`, `Case studies index.png`. Built on top of the uncommitted v2 work; nothing from v2 reverted.

## What I did (per item)

| # | Item (Figma) | Status | Reused |
|---|---|---|---|
| T1 | Hero layout (3842:40061): text column 769/1680 (45.8%), 50px gap, browser frame running off the right viewport edge and clipped there; 110px top, 80px bottom | Done | `Container`; new layout CSS only (`container-type` so the frame reaches the viewport edge) |
| T2 | Breadcrumbs Home › Case studies › title | Done | `NpCrumbs` (unchanged) |
| T3 | Client logo chip with side squares + "Case study" tag | Done | default `Eyebrow` with the logo `<img>` (1 line tall) / accent `Eyebrow` (5% tint, existing hero rule) |
| T4 | Title + intro | Done | `c-text_xl` (Figma 60 / 1.4; class 54.7 / 1.2), `c-paragraph_m` (Figma Paragraph M) |
| T5 | Browser frame: window, 3 dots, URL pill, screenshot | Done | **new** `CaseStudyBrowser` (no browser mockup on the site). `--color-gray-light`, `--color-gray`, `--border-default`, `c-paragraph_s` |
| T6 | "Visit live site" button + arrow | Done, new tab | `Button variant="white"` + `icon` slot (Bootstrap arrow-up-right, Figma's `bi:` icon) |
| T7 | Hand cursor over the button | Left out (mock pointer, not UI) | — |
| T8 | Facts row 01 Client · 02 Industry · 03 Services delivered · 04 Solution · 05 Timeline · 06 Stack (3842:40102) | Done; empty items drop and renumber | `Eyebrow` labels, `c-paragraph` values; rewritten `CaseStudyFacts` (old panel with glow / globe removed) |
| T9 | Hero divider | Removed (not in Figma) | — |
| T10 | Quote (3842:40140): centred text, no quote marks, caption centred with 50px divider, name 500 | Done | existing `CaseStudyQuote`, `c-text_m`, `c-paragraph`, `--color-border` |
| T11 | Body section gaps 48px, body → results 48px | Done | — |
| T12 | Phase block: no left rule, 858/1220 column | Done | — |
| T13 | Inline quote: gradient 8% fill, 5px gradient bar | Done | `c-text_m`, `--gradient-primary` (pseudo-elements, opacity 0.08) |
| T14 | Check-circle bullet list | Done (all bullet lists) | blog body `CHECK_MASK` + same sizes as `.c-np-prose.is-blog` |
| T15 | "Deliverables" callout box | Done | `NpKeyTakeaways` (box, accent label, square bullets match Figma) + `new-pages.css`; items at the body's `--fs-p` |
| T16 | Results: intro, centred cells, label + description lines, 24px gaps, dividers, edge squares, summary | Done | existing `CaseStudyResults`, `c-text_xl`, `c-paragraph` |
| T17 | Sidebar: TOC (active arrow), Get in Touch, Share | Already matched | `NpBlogSidebar` (X icon instead of Figma's Twitter bird, lead 2026-10-20) |
| T18 | Related: eyebrow, heading, 3 cards | Already matched (v2) | `CaseStudyRelated`, `CaseStudyGrid` |
| T19 | CTA banner, footer | Unchanged | `CtaBanner`, `Footer` |
| I1 | Index (3790:36365) | No change needed: same nodes as v2 (hero 3803:27030, cards 3798:*), render matches apart from the approved 1230px container | — |

## New data fields (SCHEMAS v0.12, code only: NO deploy, no MCP writes, no documents touched)
- `caseStudy.solution` (string) → "04 / Solution"
- `caseStudy.timeline` (string) → "05 / Timeline"
- `caseStudy.stack` (array of strings) → "06 / Stack"
- `caseStudy.body`: `blockquote` style (Studio "Quote") and `caseStudyCallout` member (new object `sanity/schemaTypes/objects/caseStudyCallout.ts`: `title`, `items[]`)
- `caseStudy.resultsIntro`, `caseStudy.resultsSummary` (text)
- `kpi.label` (optional; hidden in Studio outside `caseStudy.results`)
- Wired, already existed: `client.websiteScreenshot` (added to `CASE_STUDY_BY_SLUG`), `client.websiteUrl`
- Display only: `challenge` no longer shown (meta fallback kept); hero date and read time removed (Figma)

All render nothing when empty. `pnpm exec sanity schema validate`: 0 errors, 0 warnings. Fixture `/dev/case-study` now carries the new Figma sample content (Surfe body, Thibaut Davoult quote, +142 / +38 / +12%), `TODO: COPY`; new dev assets `src/assets/dev/case-study/surfe-website.jpg` (Figma 3842:40093 render) and `thibaut-davoult.png` (69px, the Figma node size). The old `david-chevalier.png` is now unused and was left in place.

## Files changed
- New: `src/components/case-studies/CaseStudyBrowser.astro`, `sanity/schemaTypes/objects/caseStudyCallout.ts`, `src/assets/dev/case-study/surfe-website.jpg`, `src/assets/dev/case-study/thibaut-davoult.png`
- `src/components/case-studies/`: `CaseStudyHero.astro` (rewritten), `CaseStudyFacts.astro` (rewritten), `CaseStudyPage.astro`, `CaseStudyQuote.astro`, `CaseStudyBody.astro`, `CaseStudyResults.astro`, `CaseStudyArticle.astro`, `body/CaseStudyNodes.astro`, `copy.ts`
- Shared, backward compatible: `src/components/ui/Button.astro` (`target`, `rel`), `src/styles/buttons.css` (icon colour in `is-white` / `is-gradient-outline`), `src/components/new-pages/NpKeyTakeaways.astro` (`label`, `labelId`)
- Data: `sanity/schemaTypes/documents/caseStudy.ts`, `sanity/schemaTypes/objects/kpi.ts`, `sanity/schemaTypes/index.ts`, `src/lib/sanity/types.ts`, `queries.ts`, `case-study-body.ts`, `case-study-fixture.ts`, `src/pages/dev/case-study/[...preview].astro`
- Docs: `docs/SCHEMAS.md` (v0.12), `docs/DECISIONS.md`
- Not touched: `tokens.css`, `DESIGN_SYSTEM.md`

## Responsive choices (no tablet / mobile design)
1. ≥992: Figma layout; the frame is 112.4% of its box and clipped at the viewport edge at every width.
2. ≤991: hero one column, frame under the text, still running off the right edge.
3. ≤767: button centred on the visible part of the screenshot; hero padding 5rem / 4.444rem (site mobile hero).
4. Facts: one row, no wrapping ≥992; 3 columns ≤991, 2 columns ≤767 (values wrap, balanced).
5. Quote: text full width ≤991; divider hidden ≤767 (caption wraps); 4.444rem section padding ≤767.
6. Body phase column full width ≤767 (as before); quote padding 1.333 / 2.222rem ≤767.
7. Results cells stack ≤767 with horizontal dividers (existing rule).

Checked at 1920 / 1440 / 991 / 767 / 390 on `/dev/case-study`, `/case-studies/placeholder-surfe` and `/case-studies`: `scrollWidth == clientWidth` everywhere.

## Checks
- [x] `pnpm run build` passes (non-production; prints the expected "/case-studies uses placeholder copy" warning)
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint` passes
- [x] Checked at 1920 / 1440 / 991 / 767 / 390

## Requests for other agents
- @sanity: after the lead's and Sergio's OK, deploy v0.11 + v0.12 together; then fill `placeholder-surfe` / JOOR fields and each client's `websiteScreenshot` + `websiteUrl`.
- @astro: none required. I edited `src/lib/sanity/queries.ts`, `types.ts`, `case-study-body.ts` (quote + callout nodes) and the fixture; please review. `CaseStudyLogo` `is-panel` variant and `CASE_STUDY_COPY.readTime` are now unused (left in place).
- @qa: Button / buttons.css / NpKeyTakeaways are shared: confirm blog posts and every Button render unchanged.

## Open questions for the project lead
1. Approve the v3 template build and the v0.12 fields (with Sergio for the deploy).
2. "04 / Solution": what goes there? Figma's value is "Benor Media" (sample). Built as free text.
3. `challenge` is no longer on the page (only meta fallback). Keep the field, or drop it later?
4. Hero has no date / read time in the new Figma. OK to drop them (cards still show the date)?
5. Window dots in grey (Figma red / yellow / green have no tokens). Add tokens, or keep grey?
6. Class gaps kept per your reuse rule: hero title `c-text_xl` (54.7px vs 60px; 3 lines at 1440 in the 45.8% column), callout fill 5% vs 8%, URL text colour. OK?
7. Under the same rule, v2's lead-approved one-offs could go back to site classes: index hero title 4.286rem (60px) → `c-text_xl`, description `max-width` 47.321rem. Revert them?
8. Responsive list above.

## TODO markers added
- `TODO: DS` — browser window #F4F5F7 → `--color-gray-light`; window dots → `--color-gray`; URL text #8A909E → `--color-text`. Obsolete from v2: hero date 18px, hero divider and phase rule #D6D6D6 (elements removed).
- `TODO: COPY` — "Visit live site", facts labels (Client, Industry, Services delivered, Solution, Timeline, Stack), fixture sample content and images, new-tab note (same as ClientList).

## Screenshots
Scratchpad `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v3/`: `shots/template-{1920,1440,991,767,390}.png`, `shots/detail-{…}.png`, `shots/index-{…}.png`; before: `before/`; Figma crops: `ref/`; diff: `diff.md`.

---

## Round 2 (2026-10-22): lead answers + QA fixes

Status: DONE (not committed, not pushed, schema not deployed). QA report: `docs/handoffs/2026-10-22_qa_case-studies-v3.md`.

### Lead answers applied
| # | Answer | Done |
|---|---|---|
| 1 | Hero without date / read time | Kept removed; `CASE_STUDY_COPY.readTime` deleted (no other use). `readTime` stays in the schema, query, type and `caseStudyReadMinutes` (astro's lib, now unused: listed for @astro) |
| 2 | "04 / Solution" = BenorMedia | `initialValue: 'BenorMedia'` on `caseStudy.solution`; fixture "BenorMedia"; SCHEMAS v0.12 updated |
| 3 | `challenge` not rendered, field kept | As built (SEO description fallback) |
| 4 | Colour tokens | 6 new tokens in `src/styles/tokens.css` (below), used in `CaseStudyBrowser` (dots now red / yellow / green, window #F4F5F7, URL #8A909E) and `CaseStudiesIndexHero` tile 4. `DESIGN_SYSTEM.md` not edited |
| 5 | Hero title `c-text_xl`, callout 5% tint | Kept |
| 6 | Index hero back to site classes | Title = plain `c-text_xl` (4.286rem / 1.4 override removed); description = SectionHeader's 42rem (47.321rem override removed). DECISIONS rows updated |
| 7 | Schema deploy approved | Not deployed by me; SCHEMAS marks it for the orchestrator |

### New tokens (for `DESIGN_SYSTEM.md` §4, to relay)
| Token | Value | Figma source | Used in |
|---|---|---|---|
| `--color-browser-bg` | #F4F5F7 | 3842:40085 window fill | `CaseStudyBrowser` window |
| `--color-browser-url` | #8A909E | 3842:40092 URL text | `CaseStudyBrowser` URL pill |
| `--color-browser-red` | #FF5B5F | 3842:40088 dot 1 | `CaseStudyBrowser` |
| `--color-browser-yellow` | #FAC800 | 3842:40089 dot 2 | `CaseStudyBrowser` |
| `--color-browser-green` | #34C759 | 3842:40090 dot 3 | `CaseStudyBrowser` |
| `--color-tile-sage` | #95A78D | 3804:27327 tile fill | `CaseStudiesIndexHero` tile 4 |

Each is commented in `tokens.css` with its Figma source and "lead approved 2026-10-22". Still pending in the DS: `--color-navy`, `--color-blue-500` (v2, Sergio).

### QA fixes
| QA # | Fix | Reused |
|---|---|---|
| S1 | Facts values wrap (balanced) at every width instead of `nowrap`; labels stay one line. One line each at 1440+ as Figma; at 992 Industry / Services / Stack take 2 lines, no spill | — |
| S2 | Card stat label is now `<Tag class="c-cs-card__stat-label">` with font-size, min-width and centring only. Gap: Tag's box (0.5px `--color-gray` border, 0.5 / 1.05em padding) instead of Figma's 1px #E4E6EA, 3.7 / 9.5px | `Tag` |
| S3 | Tile 4 fill → `--color-tile-sage` | token |
| S4 | Results H2 uses `.c-cs-body__h2`; its heading styles are now global in `CaseStudyBody` (spacing rules stay scoped) | `.c-cs-body__h2` |
| N5 | Hero and card accent-tag 5% tint → `var(--np-surface-tint)`; `CaseStudyHero` and `CaseStudyCard` import `new-pages.css` (it was already on detail pages; now also on `/case-studies`) | `--np-surface-tint` |
| N6 | Top-level bullet lists render in a `c-np-prose is-blog` wrapper (`CaseStudyList`), so the blog's own `> ul > li` check-circle rules apply; my copy of them is gone. Numbered and nested lists keep the case-study rules (the blog rule targets direct children only) | `.c-np-prose.is-blog` |
| N8 | A callout with no items renders nothing; with no title, `NpKeyTakeaways` drops the label `<p>` and `aria-labelledby` (blog output unchanged: its label is never empty; the list's top margin now only follows a label) | `NpKeyTakeaways` |
| N9 | Quote bar `5px` → `0.357rem` | — |
| N10 | Removed `CaseStudyLogo` `is-panel` CSS and size option, `CASE_STUDY_COPY.readTime`. **Kept** (hard rule 4): `src/assets/dev/case-study/david-chevalier.png`, unused since v3 | — |
| N11 | Card `__thumb`, `__body`, `__tags`, `__main` are `<div>`s (were `<span>`s around a heading and a list) | — |
| N12 | v2 handoff "Tile fills" marked superseded (only tile 4); DECISIONS "Five Figma values" and "v3 values without tokens" resolved; v2 Manrope note marked obsolete | — |
| N7 | Left as is (sr-only copy until `cc-sr-only`) | — |
| N14 | Left as is (dev fixture copy, Figma word for word) | — |

### Not touched: Sanity content (QA 13)
`placeholder-surfe`'s body ends with its own H2 "Results" right before the component's "The results" H2, so the table of contents lists both. Fix in Studio: delete that H2 (and move its text into "Results intro" / "Results summary" once v0.12 is deployed).

### Files changed in round 2
`src/styles/tokens.css`, `src/components/case-studies/{CaseStudyBrowser,CaseStudiesIndexHero,CaseStudyHero,CaseStudyCard,CaseStudyFacts,CaseStudyResults,CaseStudyBody,CaseStudyLogo,copy}.astro|ts`, `src/components/case-studies/body/CaseStudyList.astro`, `src/components/new-pages/NpKeyTakeaways.astro`, `src/lib/sanity/case-study-body.ts`, `src/lib/sanity/case-study-fixture.ts`, `sanity/schemaTypes/documents/caseStudy.ts`, `docs/SCHEMAS.md`, `docs/DECISIONS.md`, `docs/handoffs/2026-10-22_ui_case-studies-v2.md`.

### Checks (round 2)
- [x] `pnpm run build` passes (expected placeholder-copy warning only)
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint` passes
- [x] `sanity schema validate`: 0 errors, 0 warnings
- [x] No horizontal overflow (`scrollWidth == clientWidth`) at 1920 / 1440 / 992 / 991 / 767 / 390 on `/dev/case-study`, `/case-studies/placeholder-surfe`, `/case-studies`

### Requests for other agents
- @astro: `caseStudyReadMinutes` (`src/lib/sanity/case-studies.ts`) has no caller since the hero lost the read time; remove or keep for JSON-LD.
- @qa: recheck blog posts / guides with `NpKeyTakeaways` (label selector change) and every `Tag` (card now uses it).

### Screenshots (round 2)
`/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v3/shots2/`: `template-{1920,1440,992,991,767,390}.png`, `detail-{…}.png`, `index-{…}.png`; crops `c-992-top.png`, `c-1440-body.png`, `c-index-1440.png`, `c-1440-cards.png`.

---

## Round 3 (2026-10-22): per-client card colours

Status: DONE (not committed, not pushed, schema not deployed, no Sanity documents written).

Lead decision (Emily, 2026-10-22): the card's navy thumbnail (`--color-navy` #001F3D) and glow (`--color-blue-500` #1355FF) are Surfe's brand colours, not site colours. Each client gets its own.

### What changed
| # | Item | Done |
|---|---|---|
| 1 | Schema (SCHEMAS v0.13) | `client.brandColor` (thumbnail background) and `client.brandGlowColor` (glow), optional plain `string`s right after `logoOnDark`, validated with `Rule.regex(/^#[0-9a-fA-F]{6}$/)`. No colour field type or plugin in the repo, none added. Studio descriptions say where they show, that empty = default navy / blue, and to pick a dark brand colour (white logo) |
| 2 | Query / types / fixture | Both projected in `CASE_STUDY_CARD_FIELDS` `client->` (so `ALL_CASE_STUDIES` and `CASE_STUDY_BY_SLUG` `related` / `latest`); `CaseStudyCardClient.brandColor` / `brandGlowColor` (`string \| null`); fixture cards carry Surfe's #001F3D / #1355FF |
| 3 | Card | `CaseStudyCard` sets `style="--c-cs-card-bg: …; --c-cs-card-glow: …"` on `.c-cs-card__thumb`, only for values that pass the same hex regex in code (trimmed); otherwise the attribute is left out. CSS: `background: var(--c-cs-card-bg, var(--color-navy))`, `fill: var(--c-cs-card-glow, var(--color-blue-500))` |
| 4 | Tokens | Comments only on `--color-navy` / `--color-blue-500`: "default case-study card colours (Surfe), lead approved 2026-10-22; per-client values come from client.brandColor / brandGlowColor". Values unchanged. `--color-navy` also notes its second use (related heading in `CaseStudyRelated`) |
| 5 | DECISIONS | Token row → `Lead` (no longer pending Sergio); new per-client row; "New tokens #001F3D and #1355FF (Sergio)" struck and resolved; new "v0.13 schema fields" (Needs lead OK, deploy) and "Client brand colours" (Content) items |

### Logo legibility
The logo stays white (`logoOnDark`, else the whitened `logo`, else the white name). A light `brandColor` (pastel, yellow, white) would make it hard or impossible to read. There is no automatic contrast check; the Studio description asks for a dark colour. If a client's brand is light, the options are a darker shade of it or leaving the field empty (navy).

### Tests
- Surfe values: all 12 thumbnails on `/dev/case-study` (1440 and 390) compute `rgb(0, 31, 61)` / glow `rgb(19, 85, 255)`.
- `/case-studies` (live Sanity, fields not in the dataset yet): no `style` attribute, fallbacks render navy / blue at 1440 and 390, same as before.
- Temporary fixture test (reverted, file byte-identical to before): card 2 `#5A1E3C` / `#FF8A00` rendered maroon with an orange glow; card 3 `red; background: url(x)` / `#12345` output no `style` at all and fell back to navy / blue.
- No horizontal overflow (`scrollWidth == clientWidth`) at 1440 and 390 on both pages.

### Files changed in round 3
`sanity/schemaTypes/documents/client.ts`, `src/lib/sanity/queries.ts`, `src/lib/sanity/types.ts`, `src/lib/sanity/case-study-fixture.ts`, `src/components/case-studies/CaseStudyCard.astro`, `src/styles/tokens.css` (comments only), `docs/SCHEMAS.md` (v0.13), `docs/DECISIONS.md`, this handoff.

### Checks (round 3)
- [x] `pnpm run build` passes
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint` passes
- [x] `sanity schema validate`: 0 errors, 0 warnings
- [x] Checked at 1440 / 390 on `/dev/case-study` and `/case-studies`

### Requests for other agents
- @sanity / orchestrator: deploy v0.13 with v0.11 / v0.12 once approved; then Surfe can be left empty (defaults) or set to #001F3D / #1355FF.
- @qa: confirm the card renders unchanged with empty fields and that invalid strings never reach the `style` attribute.

### Open questions for the project lead
1. `--color-navy` is also the related section heading colour (Figma #001F3D, `CaseStudyRelated`). Keep it as a site colour there, or move that heading to a site token?
2. Should `--color-navy` / `--color-blue-500` go into `DESIGN_SYSTEM.md` as the card defaults?

### Screenshots (round 3)
`/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v3/shots3/`: `template-{1440,390}.png`, `index-{1440,390}.png`, override test `test-1440.png` (crop `c-test.png`).

---

## Round 4 (2026-10-22): browser height, facts row

Status: DONE (not committed, not pushed). Emily's Figma update, template 3842:40046; confirmed with get_metadata on 3842:40085 and 3842:40102. The orchestrator's uncommitted hover / cursor-follow work in `CaseStudyBrowser.astro` and `src/scripts/ui/cursor-follow.ts` is kept as is.

### What changed
| # | Item (Figma) | Done |
|---|---|---|
| 1 | Browser bar 3842:40086: 46px (was 63.7) | `.c-cs-browser__bar` height 4.549rem → 3.286rem. Dots (x 30 / 61 / 92, 16.8px) and the URL pill (287.7 × 28.8, y 8.6) were already centred vertically, so only the height changed. Measured: bar 46px at 1440 / 1920 |
| 2 | Button default position 3842:40094 (x 590, y 277.9, 193 × 60) in the 1103 × 657.1 window | `top: 46.86%; left: 62.24%` (button centre 686.5 / 307.9). Used without a mouse, on touch and without JS; measured centre (686.5, 307.9) in Figma units at every width ≥992. The ≤767 override (centre of the visible part) is unchanged |
| 3 | Facts labels without numbers | Numbering removed from `CaseStudyFacts.astro`; `copy.ts` label "Services delivered" → "Services Delivered" (Figma), still `TODO: COPY`, uppercase via `Eyebrow` |
| 4 | Facts layout ≥992 | Items `flex: none` (natural width), values `white-space: nowrap`, `justify-content: space-between`: every gap equal on one line. `flex-wrap: wrap` with a 2rem minimum gap; when whole items wrap, `initRowWrap` (new `src/scripts/ui/row-wrap.ts`, ResizeObserver, offsetTop reads only) sets `is-wrapped` and the rows are centred with the same 2rem gaps, 2.857rem (40px) apart. Without JS the wrapped rows stay space-between (no overflow either way) |
| 5 | Facts ≤991 / ≤767 | Same 3 / 2-column grids; values may wrap inside their cell there (balanced). Services / Stack lists are now joined with a no-break space before "/", so a wrapped line ends on "/" and never starts with it (`Webflow /` · `Finsweet / HubSpot` at 390) |

### Facts row measurements (live `placeholder-surfe`: Surfe · Pipeline Generation / SaaS · Custom Websites & Migrations / Growth (SEO/GEO + CRO) · BenorMedia · 10 weeks · Webflow / Finsweet / HubSpot)
| Width | Content | Items' natural width | Rows | Gaps |
|---|---|---|---|---|
| 1920 | 1230px | 1044px | 1 | 37px ×5 |
| 1440 | 1230px | 1044px | 1 | 37px ×5 |
| ~1341–1439 | 85rem | | 1 | ≥2rem |
| 1280 | 1088px | 966px | **2** (5 + Stack centred) | 25.6px |
| 992 | 843px | 772px | **2** (5 + Stack centred) | 19.8px |
| 991 / 767 / 390 | grid | | 2 / 3 / 3 | grid |

So with the live data the row is on **one line from about 1341px up** and **wraps to two rows from 992 to about 1340px** (1340 wraps, 1342 does not; the boundary moves a few px with font rendering). Between 992 and 1439 the root is 1vw and the content is 85rem, so the row scales almost linearly and sits just past the limit (needs ~85.5rem). `/dev/case-study` (Figma sample values, shorter "Web Design / Web Development / Technical SEO") is one line at every width ≥992 (gaps 51px at 1440+, 24px at 992). Every value is one line ≥992 on both pages; labels centred over values (checked per item).

### No overflow
`scrollWidth - clientWidth = 0` at 1920, 1440, 1280, 992, 991, 767, 390 on both pages, plus a scan at 320, 500, 700, 850, 1050, 1100, 1200, 1220–1360 (every 20px), 1366, 1439, 1600 on `placeholder-surfe`. Limit: a single value wider than the whole container (≥992) would spill, because values never wrap there by design; no current value is near that (the longest is 391px of 1230).

### Files changed in round 4
- `src/components/case-studies/CaseStudyBrowser.astro` (bar height, default button position, comments)
- `src/components/case-studies/CaseStudyFacts.astro` (labels, layout, row-wrap script, joiner)
- `src/components/case-studies/copy.ts` ("Services Delivered", comment)
- New: `src/scripts/ui/row-wrap.ts`
- `docs/DECISIONS.md` (Decisions row `Proposed`, Design team "Facts row minimum gap", Needs lead OK line), this handoff

### TODO markers
- `TODO: DS` — facts minimum gap 2rem (Figma only shows the space-between result).
- `TODO: COPY` — facts labels (unchanged).

### Checks (round 4)
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint` passes
- [x] `pnpm run build` passes (only the existing content style / release warnings)
- [x] No horizontal overflow at 1920 / 1440 / 1280 / 992 / 991 / 767 / 390 on `/case-studies/placeholder-surfe` and `/dev/case-study`

### Note for the orchestrator
The running dev server served the old `CaseStudyFacts` style module after the edit (HTML updated, CSS stale) until the file was touched again. If a screenshot looks unchanged, touch the component or reload.

### Requests for other agents
- @astro: `src/lib/sanity/types.ts` still comments the facts as "04 / Solution", "05 / Timeline", "06 / Stack" (comment only).
- @qa: facts row at 992–1440 (2 rows with live data, centred), and with JS off (rows space-between).

### Open questions for the project lead
1. With the live Surfe values the facts row is two rows (5 + Stack alone, centred) from 992 to about 1340px. Keep, or allow a smaller minimum gap / value size there to stay on one line?
2. Figma's 84.6px gaps come from its shorter sample values; with the live values the gaps are 37px at 1440+. OK?

### Screenshots (round 4)
`/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v4/shots/`: hero + facts `surfe-{1920,1440,1280,992,991,767,390}.png` and `dev-{…}.png`; facts crops `facts-surfe-{…}.png`, `facts-dev-{…}.png`. Figma: `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v4/ref/figma-hero-3842-40061.png`, `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v4/ref/figma-facts-3842-40102.png`.

---

## Round 5: index hero fade, tile fill, orbit

Status: DONE (not committed, not pushed). Lead review of `/case-studies` on localhost (2026-10-22) plus two coordinator follow-ups (density, Figma start layout). Component `src/components/case-studies/CaseStudiesIndexHero.astro`; Figma `ipKvlka3lQ7tSWAtq3wSGa` 3803:27030 (get_metadata + get_design_context on the fade 3804:27352).

### What changed
| # | Item | Done |
|---|---|---|
| 1 | Fade: no hard cut | Figma's fade layer has changed since v2: box 1925.9 × 814.4 (was 1759.5 × 807.7), radii 1524.1 × 644.5, transparent to 38.372%, white from 78.655% (was 50.6% / 81.6%). The radial is now drawn on an element 140% of the frame (`inset: -20%`, percentages converted), so past the ellipse everything is white instead of ending at the box edge. The hero also fades to white at its edges (`.c-cs-index-hero::after`): top over the 110px band above Figma's container (`--c-cs-index-hero-top`), bottom over the space under the text (120 + 100px, new `--c-cs-index-hero-bottom`; 5rem at ≤767). Figma itself ends in a hard cut (its frame is clipped by the container), so the edge fades are `TODO: DS`. Order: rings → orbits → radial fade → edge fade → text |
| 2 | Bambi tile fill | Removed. Every tile is white with the 1.5px `--color-border`. `--color-tile-sage` stays in `tokens.css`, **now unused** (DECISIONS → Engineering follow-ups) |
| 3 | Orbit | CSS only. One square `.c-cs-index-hero__orbit` per ring (centre = rings' centre, size = ring diameter as % of the frame) animated on `rotate`; each tile has the opposite `rotate` on the same duration, and is placed with `translate: -50% -50%` (not `transform`) so it turns about its own centre and stays upright. Paused off screen (`is-paused` from an IntersectionObserver in the component script); without JS it keeps running; hidden tabs are throttled by the browser. `prefers-reduced-motion: reduce`: `animation: none` (base.css's 0.01ms override would otherwise spin it), tiles sit at the start layout |
| 4 | Data | New hero-only query `CLIENTS_WITH_ICON_BY_RANK` + `getClientsWithIconByRank()` in `src/lib/sanity/queries.ts` (same fields as `ALL_CLIENTS_WITH_ICON`, `order(orderRank asc, name asc)`); `src/pages/case-studies/[...index].astro` uses it. Home's `getAllClientsWithIcon` is unchanged |

### Tiles: count and selection rule
- **13 tiles**: the first 13 clients with an icon in the Studio order (`orderRank`, the Work page order). Live today: Surfe, Puzzle, HireArt, SimpleTiger, Sprii, Garaje de Ideas, Garaje Central, Resourcify, Unit21, DarwinCX, Poplin, Arrows, Base Operations.
- **Start layout = Figma.** Tiles 1–11 take Figma 3803:27030's 11 positions in layer order, as ring + angle around the rings' centre (896.62, 863.39). Each Figma tile centre is within 9px of a ring (the top one 18px), so it is snapped onto it. Figma's split is irregular and kept: outer 3 (13.8°, 171.8°, 201.5°), middle 3 (156.7°, 187.2°, 349.6°), inner 5 (23.3°, 161.5°, 215.2°, 268.1°, 322.6°).
- **2 extra outer tiles** (allowed: 1–3, outer only): at 92.8° and 287.7°, the middles of the outer ring's two 158° / 172° gaps. Both sit past the hero's bottom / top at the start, so the first frame still equals Figma; they keep the outer ring from showing an empty half as it turns. Total 13 (inside the 11–14 range).
- The first (and the only, under reduced motion) frame next to Figma: `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v5/shots/sbs-figma-vs-first-1440.png` and `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v5/shots/sbs-figma-vs-first-1920.png` (Figma left).

### Speeds (`TODO: DS`, lead asked for 120–200s per turn)
| Ring | Turn | Direction | Speed along the ring at 1920 |
|---|---|---|---|
| Outer (r 861.6) | 200s | clockwise | 27px/s |
| Middle (r 678.7) | 160s | anticlockwise | 26.7px/s |
| Inner (r 471.1) | 120s | clockwise | 24.7px/s |
Angular speeds differ so every ring moves at about the same visible speed; the middle ring turning the other way gives depth.

### Responsive
- ≥992: 13 tiles at 84px (6rem). Around 6–9 are clearly visible at any moment; the rest pass behind the nav band, below the hero or under the fade.
- ≤991: the inner ring's 5 tiles are hidden (at this width the inner ring runs beside and under the text column); 8 tiles (outer + middle) orbit at 64px.
- ≤767: rings only, no tiles, no animation (orbits `display: none`; the images are `loading="lazy"`, so hidden ones are never fetched). The text spans the width and most of the rings sit off screen.
- No horizontal overflow (`scrollWidth - clientWidth = 0`) at 1920, 1440, 991, 767, 390 and a scan at 320, 500, 1100, 1280, 2560.

### Performance
Only `rotate` animates (compositor), 3 orbits + 13 tiles; no JS per frame, no layout reads. Tile images 102px wide, `auto("format")`, lazy, async decode. Fixed sizes: no layout shift.

### Files changed in round 5
- `src/components/case-studies/CaseStudiesIndexHero.astro` (fade, white tiles, orbit, start layout, pause script, comments)
- `src/lib/sanity/queries.ts` (new `CLIENTS_WITH_ICON_BY_RANK`, `getClientsWithIconByRank`; astro's file, hero-only addition at the coordinator's request)
- `src/pages/case-studies/[...index].astro` (uses the new fetcher; comments)
- `docs/DECISIONS.md` (Case studies: rows "tiles all white" and "orbit" `Lead`, "fade" `Proposed`; tile colours and fixed list questions resolved; Needs lead OK line; follow-up: unused `--color-tile-sage`), this handoff

### TODO markers
- `TODO: DS` — orbit speeds / directions; hero edge fades (top 110px band, bottom 120 + 100px); rings #0C1627 → `--color-heading` (existing); tablet / mobile tile rules (existing `TODO: DS mobile`).

### Checks (round 5)
- [x] `pnpm run check`: 0 errors, 0 warnings, 0 hints
- [x] `pnpm run lint` passes
- [x] `pnpm run build` passes (only the existing content style warnings); built `/case-studies` has 13 tiles
- [x] No horizontal overflow at the widths above

### Screenshots (round 5)
`/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v5/shots/`: before `before-{1920,1440,991,767,390}.png`; after `after-{1920,1440,991,767,390}.png`; motion at 1440, 5s apart: `motion-1440-a.png`, `motion-1440-b.png`; first frame (reduced motion) `first-1440.png`, `first-1920.png`; side by side with Figma `sbs-figma-vs-first-1440.png`, `sbs-figma-vs-first-1920.png`. Figma reference: `/private/tmp/claude-501/-Users-emilygaitan-benormedia-website/40fe1ed7-f8f5-4e89-b21b-966e7ab38b50/scratchpad/v5/ref/figma-hero-3790-36381.png`.

### Notes
- The fade is stronger than Figma at the top centre: Figma's top tile (3803:27305) sits on its fade box's top edge, so half of it is unfaded and cut; ours fades it (lead point 1). The radial values themselves are Figma's.
- At 1440 the inner ring passes about 10–15px from the description's left and right ends (Figma geometry); tiles never overlap the text at ≥992.
- Two live clients (Garaje de Ideas, Garaje Central) have near-identical "G." icons and both rank in the top 13.

### Open questions for the project lead
1. Hero edge fades (top 110px, bottom 220px) are not in Figma: OK as built?
2. Speeds 200 / 160 / 120s, middle ring anticlockwise: OK?
3. `--color-tile-sage` is unused now: remove it from `tokens.css` or keep it?
4. Garaje de Ideas and Garaje Central both show a "G." tile: reorder in Studio or keep?
