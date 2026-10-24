# Handoff — qa — case studies v3

Date: 2026-10-22 · Author: qa agent (saved by the orchestrator; qa has no write tool) · Branch: `feat/case-studies-v2` · Status: PASS WITH NOTES

Scope: uncommitted v2 + v3 work. Figma `ipKvlka3lQ7tSWAtq3wSGa` index 3790:36365, template 3842:40046. No blockers, 4 should-fix, 10 nice-to-have.

## Should fix
1. Facts row can overflow at 992–1280px with real data: `CaseStudyFacts.astro:80`, `:87` set `white-space: nowrap` on labels and values in a single non-wrapping flex row (≥992). With the fixture at 992px values already spill past their items and the 2rem gaps shrink to ~8px. Fix: allow wrapping ≥992, or the 3-column grid below ~1280px.
2. Card stat label rebuilds `src/components/ui/Tag.astro` (`CaseStudyCard.astro:64`, `:235-250`). Use `<Tag class="c-cs-card__stat-label">` with only size / min-width overrides.
3. Hardcoded `#95A78D` in `CaseStudiesIndexHero.astro:183` (`TODO: DS`). Needs a token or an explicit exception.
4. Results H2 duplicates `.c-cs-body__h2` (`CaseStudyResults.astro:55-63`). Share one class.

## Nice to have
5. 5% accent tint `color-mix(...)` repeated in `CaseStudyHero.astro:89-91` and `CaseStudyCard.astro:186`; `--np-surface-tint` (`new-pages.css:17`) has the same value and now loads on case-study pages.
6. Check-circle list CSS in `CaseStudyBody.astro:144-174` repeats `.c-np-prose.is-blog > ul > li::before` (`new-pages.css:274-292`); partly justified (lists inside the phase wrapper aren't direct children).
7. `CaseStudyBrowser.astro:154-164` adds a third component-scoped sr-only copy; fold together when `cc-sr-only` (G-14) lands.
8. `body/CaseStudyNodes.astro:30-33`: callout with empty title → `<aside>` labelled by an empty `<p>`; callout with no items → empty wrapper div.
9. `CaseStudyBody.astro:135` quote bar `width: 5px` (px outside a border) → `0.357rem`.
10. Dead code after v3: `CaseStudyLogo` `is-panel` variant (`:107+`), `CASE_STUDY_COPY.readTime` (`copy.ts:26`), `src/assets/dev/case-study/david-chevalier.png`.
11. `CaseStudyCard.astro:57-69`: `<span class="c-cs-card__main">` wraps a heading and a `<ul>` (invalid inside a span); `__body` span does the same.
12. Docs out of date: v2 handoff "Tile fills" table lists five fills (code + DECISIONS now only tile 4); DECISIONS open question "Five Figma values without tokens" still lists hero date 18px, Manrope and #D6D6D6 (removed in v3).
13. Sanity content: `placeholder-surfe` body has an H2 "Results" right before the component's own "The results" H2, so the TOC shows both.
14. Fixture copy (dev page only, Figma word for word) has em dashes, "Benor Media" and UK spellings; house style applies when real copy replaces it.

## What passed
- `pnpm run build` (existing new-pages warnings + expected placeholder note), `pnpm run check` (211 files, 0/0/0), `pnpm run lint`, `sanity schema validate` (0/0). Production-like build stops on the Lorem ipsum guard on purpose while `placeholder-surfe` is published.
- Rules: class names clean; px only in borders, radius, blur, media queries, 1px rules, sr-only (except item 9); colours `var(--token)` (except item 3); new strings are Figma strings marked `TODO: COPY` (`copy.ts:34-48`); `tokens.css` only the two flagged tokens; `DESIGN_SYSTEM.md` untouched.
- No regressions: HEAD `a1e17d7` exported with `git archive` and built with public env values only. Only build change: `CaseStudyBody` imports `new-pages.css`, so its CSS chunk loads after `NpArticlePage.css` on 21 non-case pages; rules identical apart from the 2 tokens and the new button icon rule. Computed styles on 31 pages at 1440 / 390 (+991 on five) match HEAD with JS off. `target` / `rel` only on the 2 "Visit live site" links; the icon rule matches only that button. `NpKeyTakeaways` blog output unchanged.
- Accessibility: one h1, heading order, alt present, decorative `aria-hidden`, external link `target="_blank" rel="noopener"` + hidden "(opens in a new tab)", breadcrumbs `<nav aria-label="Breadcrumb"><ol>`, facts row labelled `<section>` with `<dl>`, visible with JS off, focus styles, no motion added.
- Schema: code only, matches SCHEMAS v0.11 / v0.12, validation limits in place, `kpi.label` hidden outside `results`, nothing deployed.
- Overflow: none on the three pages at 1920 / 1440 / 992 / 991 / 768 / 767 / 390, JS on and off, 0 console errors.
- No leakage: sitemap has no `/dev/*` or `/studio`; `/dev/case-study` returns no paths in production; sample assets only in `dist/client/dev/case-study/index.html`.

## Files
Scripts, logs and side-by-side shots: scratchpad `qa/` (`audit.mjs`, `styles.mjs`, `cmp.py`, `cssseq.py`, `ev.mjs`, `head/`, `t1.png`, `t2.png`, `t3.png`, `i1.png`).
