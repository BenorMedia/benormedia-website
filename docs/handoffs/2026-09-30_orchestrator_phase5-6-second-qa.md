# Handoff — orchestrator — Phase 5/6 second QA round

Date: 2026-09-30 · Author: orchestrator · Branch: `feat/phase5-6-second-qa` (from `dev` @ f521682) · Status: DONE (uncommitted, waiting for the lead's visual QA + go)

Source: the lead's chat answers to `docs/QA_2026-09-30_QUESTIONS.md` and the services note. Decisions logged in `DECISIONS.md` (Global, Home, Service pages, Blog).

## What I did
- **B1 / S5 / N11 images → WebP** (sharp, lanczos3, q92 / alpha 100): hero lines 1000w + 1600w with `srcset` / `sizes="35vw"` (8.8 MB → ≈215 KB at 1x; ≈50 dB PSNR composited over the hero blue); Technologies mobile 1125w + 1536w (914 KB → 84 KB); nav icons 180px (2–3 KB each). Old PNGs removed from `public/` (sources in `docs/refs/`).
- **S3 / S4 featured videos:** no hover-to-play, no poster overlay; IntersectionObserver plays each video while on screen, pauses off screen (all devices, not under reduced motion / Data Saver); `preload="none"`; native `poster` = `websiteVideoPoster` or screenshot (1280×720, crop top). Video box = video ratio (16:9 default, updated from metadata), `object-fit: contain`, both mirrored cards and every breakpoint. Body hover kept. Studio descriptions updated.
- **S7:** hero icons `fetchpriority="low"` (new `ClientIcon` `imgFetchPriority` prop).
- **Q1 (b):** touch press-and-hold (250ms, 10px slop) to drag a hero tile; swipes scroll the page; scroll blocked only while a tile is held.
- **Q2:** `.c-hero__container` z-index 3 + click-through; `.c-hero__block` catches pointer events, so tiles pass behind the text / buttons.
- **N1:** no render while every tile sleeps and none is held. **N3 / N4:** nav entry only while `is-nav-intro` is set; no hide while Services is open by hover.
- **Q5:** `Stat.astro` deleted. **Nit:** `ClientList` uses `assetDimensions()`. Stale comments fixed (HomeHero, ClientCard, `image.ts`).
- **Q6:** Services / Testimonials header descriptions 100% up to 991.
- **Q7 (c):** nav `is-scrolled` background white 80% (navbar only, no token).
- **Q9 + services note:** "Growth (SEO/GEO + CRO)" in nav + footer. `/growth` (7 tabs) and `/ongoing-website-support` (10 tabs) build: no feature pills, no FAQ section. `SectionHeader` renders `\n\n` as separate `<p>`s; ServiceProblem gets a static gradient down arrow under the description on every service.
- **Links:** footer socials (LinkedIn, X, new tab); footer "Blog" hidden.
- **Legal pages:** `/privacy-policy`, `/terms-conditions`, `/cookie-policy` = `PageHero` + new `LegalContent`, placeholder copy in `src/lib/content/legal.ts`; `noindex` and excluded from the sitemap.
- **Docs (local only):** DECISIONS, SCHEMAS (video / poster notes, `ALL_CLIENTS_WITH_ICON`), DESIGN_SYSTEM §10 hero row (stats removed; lead approved the doc-notes nit), BUILD_PLAN, QA questions file (answers + launch-blocker updates).

## Files changed
- Images: `public/images/home/hero-lines-{left,right}{,@1600}.webp`, `technologies-mobile{,@1536}.webp`, `public/images/nav/*.webp` (new); matching PNGs deleted.
- `src/components/sections/HomeHero.astro`, `src/scripts/animations/hero-physics.ts`, `src/components/ui/ClientIcon.astro`
- `src/components/ui/ClientCard.astro`, `sanity/schemaTypes/documents/client.ts` (descriptions only)
- `src/components/layout/Nav.astro`, `src/scripts/animations/nav-motion.ts`, `src/components/layout/Footer.astro`
- `src/components/ui/SectionHeader.astro`, `src/components/sections/ServiceProblem.astro`
- `src/components/sections/Services.astro`, `src/components/sections/Testimonials.astro`, `src/components/sections/Technologies.astro`
- `src/components/ui/ClientList.astro`, `src/lib/sanity/image.ts`
- New: `src/components/sections/LegalContent.astro`, `src/lib/content/legal.ts`, `src/pages/{privacy-policy,terms-conditions,cookie-policy}.astro`
- `astro.config.mjs` (sitemap filter)
- Deleted: `src/components/ui/Stat.astro`

## Checks
- [x] `pnpm run build` passes (13 pages; sitemap has Home, 3 services, Pricing, Testimonials, Work)
- [x] `pnpm run check` passes (0 errors / warnings / hints, 99 files)
- [x] `pnpm run lint` passes
- [ ] Checked at 1440 / 991 / 767 / 375 — no browser in this session; lead visual QA (list below)

Built output verified: 2 featured `<video>`s with `preload="none"` + `poster`; only WebP hero / nav / Technologies images referenced; Growth / Support problem = 3 `<p>` + arrow, CW&M = 4 `<p>` + arrow; Growth 7 tabs, Support 10 tabs, no pills, no FAQ section; legal pages `noindex, nofollow`.

## To check visually (lead)
1. Featured cards at 1440 / 1200 / 992 / 991 / 375: whole video visible on both cards; body height vs video box (the video box centers if the body is taller); video starts on scroll-in, pauses on scroll-out; poster before the first frame.
2. Hero lines look identical (desktop + retina).
3. Hero on a short desktop viewport: tiles pass behind the title / buttons; buttons clickable; tiles beside the text still draggable.
4. Phone: swipe on the pile scrolls; press-and-hold then drag moves a tile; no long-press menu.
5. Nav once scrolled over the hero / CTA banner (white 80%).
6. `/growth` + `/ongoing-website-support`: tab bar at 1440 / 991 / 768 (10 squares wrap to 2 rows ≤991), paragraphs + arrow spacing.
7. Services / Testimonials descriptions at 768–991.
8. Legal pages layout; Technologies mobile diagram.

## Open questions for the project lead
- Pricing card name is still "Growth (AEO/GEO + CRO)", and Home Services reads "Web Growth (SEO + GEO + CRO)". Rename the pricing card too?
- Ongoing Support subtitle + step 05 say "Webflow" (CEO).
- `siteSettings`: still no published document (Organization JSON-LD, meta defaults, OG image stay off until filled).

## TODO markers added
- `TODO: DS` — touch hold 250ms / 10px; problem arrow spacing; description paragraph gap; legal page spacing / reading width / mobile.
- `TODO: COPY` — `src/lib/content/legal.ts` (all legal copy), legal eyebrow "Legal".

## Round 2 (same day, lead visual QA)
- Lead confirmed checks 1–4; 5–6 wait for the Figma updates.
- Growth name "Growth (SEO/GEO + CRO)" everywhere: Home Services item, Pricing card (`pricing.ts`), dev styleguide (nav, footer, Sanity already).
- Nav scroll sequence (`nav-motion.ts` now owns `is-scrolled`; Nav.astro listener removed): first scroll only slides the bar up; it comes back at `top: 1rem`; the scrolled state is removed at the top.
- `c-nav__panel-link`: 6px padding, 10px gap, stretch, 1px transparent border, 3px radius, hover border `--color-gray` (text no longer turns accent); icon 2.537rem (35.52px).
- Nav "Testimonials" rendered `hidden` (desktop + mobile menu). Footer link, `/testimonials` page and sitemap entry unchanged (lead to confirm).
- "Webflow" copy in Ongoing Support stays a CEO content-audit flag.
- Checks: build (13 pages), check, lint pass.

## Round 3 (Home visual QA)
- Hero: title 5.5rem + new copy; box 98% / max 1440 / min-height 90vh / margin 0 auto 1.5rem; container padding 3.8rem 2rem 20.5rem; buttons + badge = `CtaActions` (dark).
- Home LogoStrip hidden (`hidden` prop). `Testimonials` section hidden on every page; footer Testimonials link hidden.
- ClientCard: featured body + grid cards link to `websiteUrl` (new tab); grid hover (lift, accent border, shadow).
- Services: cards are links (hover = former active look), one static image, `CtaActions` (light) below the grid. Web Design / Web Development → `/custom-websites-migrations` (to confirm).
- Our Work CTA arrow tilts on hover. CTA vector scrubbed over the whole viewport passage.
- Icons: low-res sources (53/59 under 112px), no code fix — re-upload.
- Checks: build, check, lint pass.

## Round 4 (Home + contact modal visual QA)
- Hero block max-width 70%. Featured KPI description 0.8rem (≥768 only).
- Services: 3 illustrations from `docs/refs/services-images/` as WebP; card hover / focus crossfades its image over the current one.
- Contact modal: subtitle −30%, space before the email link, testimonial card padding halved.
- Checks: build, check, lint pass.

## Round 5
- Home Services cards = the 3 Sanity services (name / subtitle / link), new `SERVICE_CARDS` + `getServiceCards()`; old `services.png` / `services-2.png` deleted.
- `/testimonials` noindex + out of the sitemap. Contact modal testimonial card kept (lead flags it to the CEO); card height 19rem.
- GTM `GTM-M4MHRTDM` in BaseLayout, production only (`PUBLIC_SITE_ENV=production`); verified with a production-env build. Stale Adobe Fonts HTML comment removed.
- Open: cookie consent before GTM fires analytics (GDPR).
- Checks: build, check, lint pass.

## Round 6
- Hero description copy. Footer: socials above badges. Contact modal: Surfe testimonial.
- Services mobile accordion from `mobile-services-preview.jpg` (frame + nodes, toggle with "+" circle, Learn More link, one open, image crossfade). Proposed.
- Cookie consent: `CookieConsent.astro` + `src/scripts/ui/cookie-consent.ts`, Consent Mode v2 default-denied before GTM, stored choice 180 days, footer "Cookie Settings" reopens. Proposed. Verified order in a production-env build (consent default → GTM).
- Checks: build, check, lint pass.

## Round 7
- Consent banner: glass background + blur, nav panel shadow.
- GTM loads only after "Accept all" (`window.bmLoadGtm()`, `bm_consent=granted` cookie, 180 days); reject stores nothing (banner every load); GTM noscript iframe removed. Production-env build: inline script parses, no `ns.html` iframe.
- Checks: build, check, lint pass.

## Round 8
- Banner "not showing": it rendered, but the 5% glass made it unreadable over the blue hero (confirmed with a headless Edge screenshot of the build); now white 80% + blur. Footer "Cookie Settings" removed.
- Hero desc 34rem, container padding 4.8rem top. Badge row centered ≤767. Footer ≤767 side row + wordmark trigger clamped.
- Process tabs ≤767: sliding strip + progress line (Proposed).
- Pricing: feature 0.9rem (≥768), D+D bullet removed.
- Checks: build, check, lint pass.

## Round 9
- Process tabs ≤767: only active + next step visible (others visually hidden, still keyboard / screen-reader reachable); next of the last step = 01; slide (FLIP) + fade on change. Checks pass.

## Round 10 — Studio fetch errors in dev
- Cause 1: `astro build` shared `node_modules/.vite` with the running `astro dev` and re-optimized it ("vite config has changed"), deleting chunks the open Studio needed (every build this session did it).
- Cause 2: only 14 deps pre-bundled; `sanity` / `sanity/structure` / `@sanity/table` / `styled-components` / gsap / matter-js were discovered at runtime → mid-session re-optimize + reload → in-flight dynamic imports failed.
- Fix (`astro.config.mjs`): separate `cacheDir` for non-dev commands; those deps in `optimizeDeps.include`. The running dev server restarted on the config change: 22 deps pre-bundled, 0 discovered later; a build afterwards left the dev cache untouched.
- Follow-up regression: bare `sanity/structure` in `optimizeDeps.include` resolved to the repo's `sanity/structure.ts` → bundle without `structureTool` → Studio didn't hydrate. Fixed by aliasing `sanity/structure` to the package file (same as `sanity`); dev cache rebuilt; Studio verified rendering (headless Edge screenshot of the login screen), 22 deps, 0 discovered later.

## Round 11 (pages visual QA)
- Service process tabs ≤767: space-between.
- Pricing: FAQ section hidden (`FaqSection hidden`, JSON-LD dropped). Checks pass.
