# New pages, wave 1: build report

2026-10-07. Brief: `content-pack/BUILD-BRIEF.md`. How it works: `docs/new-pages.md`.

## 1. What exists

- **Branch:** `feat/new-pages-wave-1` from `main` (16f779d), pushed. Not merged, nothing deployed.
- **Commits:** T1 `2486b96` pack and loader · T2 `fc254b5` shared blocks · T3 `f9ec85f` commercial template · T4 `bd625c3` check script · T5 `682b9a3` article template · T6 `2e0d067` drafts and sitemap · T7 `248b020` diagrams · T8 docs and this report.
- **Preview:** https://benormedia-git-feat-new-pages-wave-1-benor-media.vercel.app (Vercel login). Dashboard: https://vercel.com/benor-media/benormedia/9BNUM9eXBjtr6JrAm2Bf5LX1bQZG
- **Routes (drafts: preview and dev only):** `/webflow-migration`, `/b2b-saas-web-design`, `/webflow-enterprise-agency`, `/guides/wordpress-to-webflow-migration`, `/guides/b2b-saas-website-pages`, `/guides/webflow-enterprise`. Kit: `/dev/new-pages-kit`.
- **Local:** `pnpm run dev`, then open a route. Defaults view: `PAGES_VIEW=defaults pnpm run dev`. On Vercel, set `PAGES_VIEW=defaults` in the Preview environment.

## 2. Component map as built

See the table at the end of `docs/new-pages.md`. In short: reused as-is: `Eyebrow`, `Button`, `Container`, `JsonLd`, the entity constants and the accordion script. Extended with optional props, default output unchanged: `BaseLayout` and `Seo` (`titleTemplate`), `FaqAccordion` (`npSrc`, HTML items), `Breadcrumbs` (per-item `attrs`). Siblings (rung 3): hero, proof strip, FAQ section, closing band. New: split section, visual, prose and tables, article header, takeaways, TOC, sources, related links, the preview chrome and 6 diagram templates. Testimonials are left out (lead, 2026-10-07).

New CSS custom properties (`src/components/new-pages/new-pages.css`):

| Variable | Value | Source |
|---|---|---|
| `--np-radius` | 8px | PricingCard / ClientCard radius |
| `--np-surface-tint` | accent 5% on white | the `.c-eyebrow.is-accent` mix (8%), lowered to 5% because accent text on 8% measured 4.48:1 |
| `--np-measure` | 70ch | brief 7.2 |
| `--np-gap-bg` | #fff2a8 | brief's marker-pen yellow, preview only |

Other copied values: hero padding from PageHero, FAQ section spacing and globe from FaqSection, band styles from CtaBanner, button grid from CtaActions, and the `SectionHeader` global rules (they ship only with that component). New utility: `cc-mobile-lands_text-l` (≤767px: `--fs-text-l`) on the H1s, as you asked.

## 3. Checks

- **10.1 nothing else changed** (production build with `VERCEL_ENV=production PUBLIC_SITE_ENV=production PUBLIC_SITE_URL=https://www.benormedia.com` against `/tmp/dist-before`):
  - No new or missing files. `sitemap-*.xml`, `robots.txt` and `llms.txt` are identical byte for byte.
  - Three HTML files changed: `/growth`, `/custom-websites-migrations`, `/ongoing-website-support`. The only difference is where the `Breadcrumbs` CSS lands: inline instead of inside `_service_.*.css`, because the guides now share that component. With style tags removed the markup is identical. The pixels are identical at 1440 and 390, and so are the computed styles of every element (reduced motion).
  - Hashed assets: `_service_.*.css` changed name for the same reason. There is one new, unreferenced `loader.*.css` (the new-pages styles, emitted because the routes compile even when they return no paths).
- **check-seo:** before and after are the same, `all checks passed` (64 ok, 8 sitemap URLs). `check-crawlers` (live site): all 7 crawlers got 200.
- **pages:verify:** defaults 6/6 pass, review 6/6 pass, production 0 pages (correct: all are drafts), 0 failures. Negative tests: a deleted sentence, an invented list item, a stray paragraph and a wrong byline each fail (checks 3, 4, 11).
- **LIVE_ALLOW:** empty (FaqAccordion and Breadcrumbs print no text of their own; button labels come from `copy.json`). **`data-np-live` wrappers:** none (testimonials left out).
- **Lighthouse** (mobile, review build served locally):

| Page | Perf | A11y | BP | SEO | LCP | CLS | Below 100 |
|---|---|---|---|---|---|---|---|
| /webflow-migration | 78 | 96 | 100 | 69 | 5.9 s | 0 | target-size, is-crawlable |
| /b2b-saas-web-design | 78 | 96 | 100 | 69 | 5.9 s | 0 | same |
| /webflow-enterprise-agency | 78 | 96 | 100 | 69 | 6.0 s | 0 | same |
| /guides/wordpress-to-webflow-migration | 77 | 96 | 100 | 69 | 6.1 s | 0 | same |
| /guides/b2b-saas-website-pages | 78 | 96 | 100 | 69 | 6.0 s | 0 | same |
| /guides/webflow-enterprise | 77 | 96 | 100 | 69 | 6.1 s | 0 | same |

  - SEO 69 is only `is-crawlable` (`noindex` on previews).
  - `target-size` is the live footer's social icons.
  - Performance misses the 90 budget. The live `/growth`, built and served the same way, scores 74 (LCP 8.2 s), so the gap is the shared shell (fonts, CSS), not the new templates.
- **axe** (`@axe-core/playwright`, WCAG 2.2 AA, 1440 and 390): no serious or critical findings on the new content. The one serious finding is `target-size` on the live footer social icons at 390px.
- **Budgets:** new client JavaScript is 0 KB (the pages load only the existing BaseLayout and FaqAccordion scripts). No new font or dependency. CLS is 0.
- **Look at it:** I looked at 1440 and 390 screenshots of every page, and checked 1024 and 768 by measurement. No sideways scroll anywhere. The H1 is at most 3 lines at 390. The FAQ opens with Enter. Tables scroll on a phone. Anchors land below the sticky nav. Focus rings show. All 14 diagrams have text of 14px or more at 390.
- **T6 rehearsal** (throwaway worktree, not committed):
  - (1) `webflow-migration` with `draft: false` and its markers: the production build failed with `release blocked: 4 open marker(s): MIG-1, G6, MIG-7, MIG-3`.
  - (2) After `apply-defaults --write` and `draft: false`: the strict `pages:release-check` passed without changing `volatileChecked`. The production build passed. The page existed with `index, follow`, was in the sitemap with `lastmod` = `updatedAt` (same format as existing entries), and passed `check-new-pages --view production` (JSON-LD included) and `check-seo`. Links to the still-draft guides were plain text.

## 4. Decisions I made

1. Astro 7 does not ship an importable Markdown processor here, so `markdown.ts` converts the RULES §8 subset itself, with no dependency.
2. The commercial route is `src/pages/[...page].astro` (a rest route). It coexists with `[service].astro` and also accepts prefixed regional URLs later. It asserts that the URL ends in the slug.
3. Production mode is also on when `PUBLIC_SITE_ENV=production`, the site's existing switch.
4. `pages:verify` builds into the system temp folder, not `dist-np-*` in the repo root. In the root, `astro check` and eslint scanned the bundles, and their configs are outside the brief's allowed edits. The `.gitignore` line is kept.
5. Classes follow CLAUDE.md (`c-np-*`), so the gap highlight is `.c-np-gap`.
6. The global "Ready to build your website?" band is off on the new pages, because the page's own closing band replaces it.
7. Article H2/H3 use `c-text_l`/`c-text_m`, because `c-text_xl` is too large for question headings in a 70ch column. Commercial section H2s use `c-text_xl`, the live section-title style.
8. The FAQ opens with every question closed. The live FaqSection's "open the first one" script is not reused.
9. Diagrams switch to the vertical layout below 440px (not ~560px), so side-column diagrams (≈496px wide at 1440) keep their wide layout. Language versions are labelled A–D as generic examples.
10. `og:type` stays `website`: BaseLayout has no prop for it.
11. JSON-LD goes in separate `<script>`s, as on the live pages; the outlines show one `@graph`.

## 5. Assets needed

- `webflow-migration:2`: the Webflow Designer with a component library open (hero, feature and pricing blocks). Goes in `src/assets/new-pages/webflow-migration/2.webp`.
- `webflow-migration:3`: a redirect test report (old URL, response code, destination URL, a pass mark on each row). Goes in `src/assets/new-pages/webflow-migration/3.webp`.
- `webflow-migration:6`: a marketer editing a page in Webflow during a live training session. Goes in `src/assets/new-pages/webflow-migration/6.webp`.
- `b2b-saas-web-design:2`: a Webflow component library with hero, feature, integration and pricing blocks. Goes in `src/assets/new-pages/b2b-saas-web-design/2.webp`.
- `b2b-saas-web-design:5`: a shared Slack channel with a weekly update and a bug fix reported to a marketing lead. Goes in `src/assets/new-pages/b2b-saas-web-design/5.webp`.

All 14 diagrams are drawn; none stayed a placeholder.

## 6. Content issues (none fixed)

- `content-pack/content/webflow-enterprise.md:170`: the visual's brief asks for "the role that acts at each step". The page (line 200) names the designer or editor and the approver, but not who merges or publishes ("Permissions set who … publishes"). The diagram shows roles only under the first three steps.
- `content-pack/content/webflow-enterprise.md:1`: checker warning that the primaryKeyword "webflow enterprise" is not in `data/all-researched-terms.csv` (known).
- `b2b-saas-web-design`, `webflow-migration`, `webflow-enterprise-agency`: `testimonial` and `testimonialAfter` are set but unused while testimonials are off.

## 7. Noticed, out of scope

- Footer social icons are 16.9×16.9px, under the 24px WCAG 2.2 target size, on every page.
- The CTA band's white text on the lighter end of the gradient may fall under 4.5:1. The automated tools don't measure contrast on gradients; it's the same on the live band.
- `/dev/styleguide` is built in production (outside the sitemap, but reachable).
- "Get In Touch" (ServiceHero, PricingCard) and "Get in Touch" (header, CtaBanner) differ in capitalisation.
- At 768px the H1s run 4–6 lines at 66px (`c-text_xxl` at the 12px tablet root), on live pages too.
- The Home hero still says "6+ YEARS AS A WEBFLOW PROFESSIONAL PARTNER" (CLAIMS-REGISTER X2).
