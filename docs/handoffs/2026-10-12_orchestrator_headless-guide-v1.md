# Handoff: headless guide and /headless-cms-agency, version 1 (2026-10-12)

Brief: `docs/brief-headless-guide.md`. Branch: `seo/headless-guide` (pushed). Draft PR into `dev`: https://github.com/BenorMedia/benormedia-website/pull/43 (do not merge before sign-off).

## State

- Tasks 1 to 6 of the brief are done. Both pages are drafts (`draft: true`): Vercel previews build them with `noindex`, production builds leave them out.
- Previews (Vercel login required):
  - https://benormedia-git-seo-headless-guide-benor-media.vercel.app/headless-cms-agency
  - https://benormedia-git-seo-headless-guide-benor-media.vercel.app/guides/webflow-vs-custom-code
- Waiting on Sergio: answers in the two review sheets. Next command after he answers: `/seo-revise docs/brief-headless-guide.md`, then `/seo-release docs/brief-headless-guide.md` after "approved".

## How this repo differs from the kit and brief (read first)

- **Base branch is `dev`.** `main` was merged into `dev` on 2026-10-12 (PR #42). PRs go into `dev`; Sergio merges and releases. Never touch `main`.
- **Pages are content-pack Markdown**, not data files: `content-pack/content/<slug>.md` with front matter (`draft`, `faq`, `takeaways`, `sources`, `related`, `visuals`, ...). See `docs/new-pages.md` and `content-pack/RULES.md`.
- **No `scripts/check-draft.mjs`.** Use `node content-pack/scripts/check-content.mjs <file>` (draft) and `pnpm run pages:release-check <file>` (release).
- **Sitemap dates come from `updatedAt`** in the front matter, not `LASTMOD`.
- **Links to pack pages use `page:slug`.** They render as plain text until the target page is released.
- **Diagrams:** `DIAGRAMS` in `src/lib/new-pages/visuals.ts`, keyed `'<slug>:<n>'`.
- **Use `pnpm`.** SEO check needs a production-like build:
  - drafts: `PAGES_INCLUDE_DRAFTS=1 PUBLIC_SITE_URL=https://www.benormedia.com pnpm run build && node scripts/check-seo.mjs dist/client` (only the robots.txt check fails, expected outside production)
  - production: `PUBLIC_SITE_ENV=production PUBLIC_SITE_URL=https://www.benormedia.com pnpm run build` (the two drafts show "page not found" until released)
- **Auto-mode classifier:** it blocked commits until Sergio allowed `git add`/`git commit`. Pushes ask first (kit settings).

## Files on the branch

| What | File |
|---|---|
| Service page | `content-pack/content/headless-cms-agency.md` |
| Guide | `content-pack/content/webflow-vs-custom-code.md` |
| Diagrams | `src/lib/new-pages/visuals.ts` (`headless-cms-agency:1`, `:2`, `webflow-vs-custom-code:1`) |
| SEO check entries, title limit 61 | `scripts/check-seo.mjs` |
| Pack limits (service title 61, FAQ 13) | `content-pack/scripts/lib/check.mjs`, `content-pack/RULES.md` |
| Plan entries for both pages | `content-pack/data/plan.json` |
| Task 4 links (plain text until release; `updatedAt` 2026-10-12) | `content-pack/content/webflow-enterprise.md`, `website-redesign.md`, `cybersecurity-web-design.md` |
| Review sheets | `docs/review-headless-cms-agency.md` (99 rows, 78 open), `docs/review-guide-webflow-vs-custom-code.md` (146 rows, 114 open) |

## Choices made that the brief didn't decide

- Section 10 callout is a plain paragraph (no callout block in the guide template).
- Section 7 tags on the service page are dropped (no tag row in the template, same as `/website-redesign`).
- Related cards show each page's H1, not the content file's card wording.
- Guide breadcrumb is Home › Webflow vs custom code, per the brief. The live guides also have a Guides step.
- Payload's source entry is split into three, so the guide has 27 sources.
- `thirdPartyPrices: true` on the guide, plus a volatile entry, so "30,000 dollars" (Vellum) passes the pack's price check.

## Open issues for the revision

- `https://payloadcms.com/hosting` returns 404. The guide's sentence "You host it yourself, since new Payload Cloud sign-ups are paused" needs a new source, or deleting.
- Webflow Help Center pages blocked automated access, so many guide rows stay `open` until someone checks them in a browser.
- Sanity task for Sergio: on `/custom-websites-migrations`, step 03 "Website development", add "Building in code? See headless CMS development." linking `/headless-cms-agency`.
- Visuals to make: the guide's three-column header (stay, add code, move), which currently shows the template default, and the optional two-bar visual in section 5 (988 vs 95).
- Word counts (checker): service page 2,313 (brief 2,412), guide 3,677 (brief 3,845). Both under 5%.

## Release (after "approved" and an empty review gate)

Follow `/seo-release` with the content-pack mapping:
1. Set `draft: false`, and `publishedAt`/`updatedAt` to the sign-off day, in both page files. Also set the sign-off day as `updatedAt` on the three task 4 pages.
2. Add one `public/llms.txt` line per page (service under Services, guide under Guides), built from the meta description.
3. Run `pnpm run pages:release-check <file>` for each page, the production build, `check-seo.mjs dist/client`, and the review gate from `CLAUDE.md`.
4. Commit `feat(seo): publish the headless guide and service page`, push, then `gh pr ready 43`.
