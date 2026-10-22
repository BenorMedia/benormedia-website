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
