# Handoff — orchestrator — SEO cleanup

Date: 2026-10-06 · Author: orchestrator · Branch: `feat/seo-cleanup` (from `feat/seo-quick-changes`, PR #32 not merged yet) · Status: DONE (dashboard checks and task 7 decision with the lead)

Brief: `docs/seo-cleanup.md`.

## What I did
- **1 check-seo.mjs:** keyword check reads title + meta; "h1 differs from title" removed; new per-page img alt check.
- **2 Alt text:** root cause of Bing's report: Astro writes `alt={""}` as a bare `alt`, which crawlers read as missing (60 on /, 73 on each service page, 60 on /pricing). Repeats now render a literal `alt=""`. Client logos / screenshots: Sanity alt unless it only repeats the client name, else "<name> logo" / "<name> website" (`clientImageAlt`, `lib/sanity/image.ts`). Author photos next to a printed name: `alt=""`. No Sanity schema/content change (schema already has alt fields; most values are just the client name, worth rewriting in Studio).
- **5 Partner tier:** footer badge alt → "Webflow Professional Partner (…)". Meta, og/twitter, hero eyebrow, Organization description and llms.txt already said it. Badge image text: "Official Webflow Partner" (no tier). Brand grep: only `alternateName` in entity.ts. Organization address = `ENTITY.address`; footer hard-codes the same strings (not a shared constant).
- **6 lastmod:** /pricing and /work → 2026-10-06; legal pages 2026-10-05.
- **3 Crawlers:** all 9 UAs 200, identical body size; no middleware, `_headers`, CI or UA rules in the repo; no Cloudflare (`server: Vercel`, no cf-ray).
- **4 Redirects:** all 8 variants 308 → `https://www.benormedia.com/`; http hosts 2 hops (Vercel HTTPS upgrade). No 302/307. Nothing in the repo; no change.
- **7 Consent/GTM:** flag only, diff empty (see report in chat).

## Checks
- [x] build, check, lint pass; `check-seo.mjs dist/client`: all checks passed
- [x] Home at 1440 / 390: no layout change
