# Handoff — orchestrator — Case Studies index + template

Date: 2026-10-21 · Author: orchestrator (lead: Emily) · Branch: `feat/case-studies` (from `dev` 8bcc060) · Status: DONE (waiting for lead review on the PR preview)

## What I did
- Planned the Case Studies index (Figma 3764:15808) and template (3764:16012), got Sergio's approval, logged every decision in `DECISIONS.md` → Case studies, updated `SITEMAP.md` and `SCHEMAS.md` (v0.10).
- Step 2 (sanity): `caseStudy` schema, Studio list, `case-studies` reserved slug. **Not deployed: Sergio deploys it.**
- Step 3 (astro): queries, types, read time, testimonial fallback (placeholder quote → client's quote), `/work` link map.
- Step 4 (ui): components and the `/dev/case-study` preview with the Figma sample content (four review rounds against Figma).
- Step 5 (astro): `/case-studies`, `/case-studies/[slug]`, shared `CaseStudyPage`, JSON-LD (Article, CollectionPage, BreadcrumbList), sitemap from Sanity, "Read the case study" on `/work` rows.
- QA: two rounds, final verdict PASS WITH NOTES (`2026-10-21_qa_case-studies-review.md`).

## For Sergio, in plain words
- **Nothing reaches the live site from this branch.** It merges into `dev` (staging) only. Production builds leave out `/dev/case-study`, and leave out `/case-studies` until a case study is published.
- **The build now stops on purpose in two cases**, and the live site keeps its previous deploy:
  1. **Sanity can't be reached** while the sitemap reads the published case studies (every build except `pnpm run dev`). Fix: check status.sanity.io and the project id / dataset, then redeploy.
  2. **A case study is published while the `/case-studies` copy is still placeholder** ("Lorem ipsum" / "TODO: COPY"), production builds only. The error lists each text and the file to change. Fix: replace the copy and merge, or unpublish the case study until the copy is ready. The check can't catch placeholder text that reads like real words (e.g. the meta title "Case Studies"), so a person still reviews the copy.
- **BLOCKER before the first publish:** real copy for the `/case-studies` title, intro, description and meta.
- **Schema deploy:** `caseStudy` is in code only; deploy it to the Studio after review.
- **JOOR brief:** `docs/brief-next-pages.md` Part 2 and `docs/content/work-joor.md` still describe `/work/joor`, a code data file and another section order. Align them with this template before `/seo-work-joor` runs (not edited on this branch, lead's decision).

## Incident
- 2026-10-21: while re-verifying a comparison against `dev`, the orchestrator copied `.env` into a temporary scratchpad worktree, which CLAUDE.md forbids. The copy was deleted the same session; nothing was committed, pushed or sent. Rule from the lead: never copy or link `.env`; ask first when a check needs environment variables. QA later ran the comparison with the four public values passed inline (lead OK).

## Checks
- [x] `pnpm run build`, `pnpm run check`, `pnpm run lint` pass
- [x] Production-like build: no `/case-studies`, no `/dev/case-study`, no sample content, `check-seo.mjs` passes
- [x] Regression vs `dev`: Home, `/work`, Pricing, two service pages, `/blog`, sitemap byte-identical; posts and guides differ only in the sidebar CSS moving inline
- [x] Checked at 1440 / 991 / 767 / 390

## Open questions and follow-ups
See `DECISIONS.md` → Case studies → Open questions: copy blocker, JOOR facts, Figma 1680px width and design-system gaps (Sergio), `/work` link design (Emily), pre-existing `/work` tag overlap at ~800px, TOC side squares, card motion after PRs #61/#67, `failHard` scope, unused CSS files, inline sidebar CSS, CSP note.
