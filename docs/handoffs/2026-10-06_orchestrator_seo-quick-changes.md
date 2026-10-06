# Handoff — orchestrator — SEO quick changes

Date: 2026-10-06 · Author: orchestrator · Branch: `feat/seo-quick-changes` · Status: DONE (tasks needing the lead listed below)

Brief: `docs/seo-quick-changes.md`. One commit per task.

## What I did
- **Scripts:** `scripts/check-seo.mjs`, `scripts/check-crawlers.sh`, `scripts/indexnow.mjs` (+ `pnpm run indexnow`).
- **10 Entity facts:** `src/lib/content/entity.ts` (name, alternateName, email, footer address, service area, profiles) + `src/components/layout/JsonLd.astro`. Brand grep `Benor Media|Benor media|benor media` in src/public/sanity: 0 hits. Partner badge (`webflow-partner.png`) reads "Official Webflow Partner", no tier → alt text and meta left as they are.
- **5 Titles / meta:** new titles + descriptions in `SERVICE_META`. The H1 / subheader changes were reverted (lead 2026-10-06): Home and service heroes are as before.
- **2 Organization + WebSite** JSON-LD on `/` only.
- **3 Service** JSON-LD on the three service pages (BreadcrumbList / FAQPage untouched).
- **4 Pricing FAQPage:** not added. The FAQ is rendered `hidden` (lead 2026-09-30) with placeholder answers; FaqSection already uses one data array for both and emits FAQPage automatically once `hidden` is removed. Check script updated to match.
- **1 Placeholder testimonials:** HireArt + SimpleTiger (Lorem ipsum, "Rob Alfano") filtered out in GROQ (`TESTIMONIALS`, `CLIENTS_BY_IDS`). Sanity untouched (unpublish would be blocked anyway: the client docs reference them). Marquee repeats the 2 remaining cards to fill the track.
- **7** `public/llms.txt`.
- **8** Sitemap `lastmod` per page (`LASTMOD` in `astro.config.mjs`), IndexNow key file `public/9458c828e34af8970c785ff41c9216b1.txt`. robots.txt already has the Sitemap line on production.
- **6 Crawlers:** all 9 UAs 200, same body size, robots + sitemap 200.
- **9 Redirects:** all variants already 308 to `https://www.benormedia.com/` (http hosts 2 hops: Vercel's forced HTTPS upgrade). No change.

## Checks
- [x] `pnpm run build` passes (also with `PUBLIC_SITE_ENV=production PUBLIC_SITE_URL=https://www.benormedia.com`)
- [x] `pnpm run check` passes
- [x] `pnpm run lint` passes
- [x] `node scripts/check-seo.mjs dist/client`: all checks passed
- [x] Heroes checked at 1440 / 390

## Open questions for the project lead
- Real quotes from HireArt and SimpleTiger (replace the Lorem ipsum text in Studio; they show again on the next build).
- Webflow partner tier: badge says "Official Webflow Partner", meta / hero eyebrow / llms.txt say "Professional Partner".
- `siteSettings` Organization JSON-LD in BaseLayout (every page) is empty today; if those Studio fields get filled it would duplicate the Home Organization. Leave them empty or drop that block.
- Bing Webmaster Tools + `pnpm run indexnow -- <changed URLs>` after deploys.
