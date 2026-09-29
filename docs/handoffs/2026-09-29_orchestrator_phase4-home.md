# Handoff — orchestrator — Phase 4 Home (parts 1 + 2)

Date: 2026-09-29 · Author: Santiago · Branch: `feat/phase4-home-part2` · Status: DONE

Phase 4 approved by the project lead on 2026-09-29. Part 1 (Hero, Logo strip, Featured Work, Services) was merged to `dev` in PR #6. Part 2 is on this branch, not committed yet.

## What was built
Home, in page order (`src/pages/index.astro`):

| # | Section | Component | Data |
|---|---|---|---|
| 1 | Hero (gradient, white text, 2 CTAs, 2 stats) | `sections/HomeHero.astro` (`c-hero`) | static |
| 2 | Logo strip (full-bleed CSS marquee) | `sections/LogoStrip.astro` (`c-logos`) | `getAllClientsWithLogo()` |
| 3 | Featured Work (2 case cards) | `sections/FeaturedWork.astro` (`c-featured`) | `getClientsByIds([surfe, puzzle])` |
| 4 | Services (3 click-to-activate cards + illustration + 2 CTAs) | `sections/Services.astro` (`c-services`) | static |
| 5 | Our Work: 3×2 cards, client list (9), "View All 100+ Projects" | `sections/OurWork.astro` (`c-work`) | `getClientsByIds` ×2 |
| 6 | Technologies (static diagram, design only) | `sections/Technologies.astro` (`c-tech`) | static SVG |
| 7 | Testimonials (2 infinite rows) | `sections/Testimonials.astro` (`c-testimonials`) | `getTestimonials()` |
| — | CTA banner with rotating trusted badge (global, every page) | `layout/CtaBanner.astro` (`c-cta`) | `siteSettings` (fallback: design copy) + `getClientBadgesCached()` |

Part-2 detail lives in the task handoffs:
- `2026-09-28_orchestrator_home-our-work-cards.md`
- `2026-09-28_orchestrator_home-technologies.md`
- `2026-09-28_orchestrator_home-testimonials.md`
- `2026-09-28_orchestrator_cta-trusted-badge.md`
- `2026-09-29_orchestrator_mobile-tweaks.md`

Other Phase 4 work:
- `DECISIONS.md` restructured: Global, then one section per page, each split into categories. The lead doesn't read it, so open questions are relayed in chat.
- The 20.3 MB Technologies SVG was optimized to 394 KB.

## Checks
- [x] `pnpm run build` passes.
- [x] `pnpm run check` passes (0 errors / 0 warnings / 0 hints).
- [x] `pnpm run lint` passes.
- [x] QA final review at 1440 / 991 / 767 / 375: **PASS WITH NOTES, 0 blockers**, 11 should-fix, 11 nits. See `docs/handoffs/2026-09-29_qa_phase4-home-final-review.md`. No horizontal scroll, broken images or console errors at any width. Headings: one h1, h2 per section. Reduced motion is respected. The contact modal's keyboard flow works.
- Blocker fixes: none needed.
- **QA should-fix follow-up (lead: fix all except S6):**
  - S3, S4, S5, S10 fixed by `astro`; 25/25 keyboard checks pass. See `2026-09-29_astro_qa-fixes-nav-services.md`.
  - S1, S2, S7, S8, S9, S11 fixed by the orchestrator:
    - S1: title template only for page titles.
    - S2: canonical / `og:url` omitted when no site URL; `site` read from `PUBLIC_SITE_URL`.
    - S7: `object-position: left top` on featured screenshots.
    - S8: Testimonials doesn't render without testimonials.
    - S9: hex colors → tokens (only the logged `#8BC1F9` remains).
    - S11: `em` → `calc(N * var(--fs-p))`, the same computed values.
  - S6 is deferred by the lead. Nits N1–N10 remain open.
  - Gates re-run after the fixes: build, check (0/0/0) and lint pass.
  - Verified: Home `<title>` = "BenorMedia"; 404 = "Page not found | BenorMedia"; no canonical when `PUBLIC_SITE_URL` is empty (local `.env` sets it to localhost); 0 block elements inside the Services buttons.

## `data-anim` hooks on Home (for Phase 6)

| Hook | Section · element | File:line | Intended motion | Current state |
|---|---|---|---|---|
| `hero-lines` | Hero · 2 decorative line images (left / right) | `sections/HomeHero.astro:33`, `:41` | Parallax on scroll or slow drift on load | static |
| `hero-headline` | Hero · `<h1>` | `sections/HomeHero.astro:54` | Split-text reveal (word or line) on load | static |
| `counter` | Hero · both stat values ($700M+, 100+) | `ui/Stat.astro:23` (via `HomeHero.astro:71-72`, `animate`) | Count up from 0 once in view; keep the final string as fallback | static |
| `logos-marquee` | Logo strip · track | `sections/LogoStrip.astro:37` | Infinite marquee | **running** (CSS, 270s, off for reduced motion). Phase 6: keep, or move to GSAP if the spec needs easing or hover |
| `card-reveal` | Featured Work (2) + Our Work (6) · card roots | `ui/ClientCard.astro:98` (grid), `:138` (featured) | Fade and rise on enter, staggered | static |
| `services-image` | Services · illustration | `sections/Services.astro:64` | Crossfade when the active card changes (the `src` swap is currently instant), optional subtle parallax | static swap |
| `tech-diagram` | Technologies · diagram image | `sections/Technologies.astro:34` | Spec pending: connector lines, capability marquee. Likely needs the diagram delivered as separate layers | static |
| `testimonials-marquee` | Testimonials · marquee root | `ui/TestimonialMarquee.astro:65` | Two infinite rows (top → left, bottom → right) | **running** (CSS, 13.2s per card, no hover pause, off for reduced motion) |

Motion already live without a hook:
- **Client list row hover:** CSS arrow rotation and screenshot preview.
- **Services active card:** CSS arrow rotation.
- **CTA trusted badge rotation:** JS, `src/scripts/animations/cta-badges.ts`, initialized in `BaseLayout`.

New Phase 6 animation scripts go in `src/scripts/animations/`, one file each, initialized from BaseLayout.

## Remaining `TODO: DS` / `TODO: COPY` markers

**`TODO: COPY`**
- `src/components/ui/ClientCard.astro:229` — featured card with no testimonial renders without the quote, author and KPI block.

**`TODO: DS`**

| File:line | What |
|---|---|
| `src/components/layout/ContactModal.astro:177` | On-dark tokens: backdrop rgba literal |
| `src/components/layout/ContactModal.astro:331` | Mobile modal design |
| `src/components/layout/CtaBanner.astro:222` | Trusted badge: gap from text to circles |
| `src/components/layout/CtaBanner.astro:262` | Trusted badge: circle overlap |
| `src/components/layout/CtaBanner.astro:279` | Eyebrow on-dark variant |
| `src/components/layout/Footer.astro:352` | Mobile footer design |
| `src/components/layout/Nav.astro:375`, `:474` | Mobile nav design |
| `src/components/sections/FeaturedWork.astro:44` | Spacing between featured cards |
| `src/components/sections/HomeHero.astro:168` | Title gradient stop `#8BC1F9` not a token |
| `src/components/sections/HomeHero.astro:201` | Gap between hero CTAs |
| `src/components/sections/HomeHero.astro:221` | Gap between hero stats |
| `src/components/sections/HomeHero.astro:258` | Eyebrow on-dark variant |
| `src/components/sections/OurWork.astro:94` | Header → grid spacing |
| `src/components/sections/Services.astro:124` | Header → grid spacing |
| `src/components/sections/Services.astro:161` | Gap between service cards |
| `src/components/sections/Services.astro:258` | Gap between service CTAs |
| `src/components/sections/Technologies.astro:57` | Header → content spacing |
| `src/components/sections/Technologies.astro:61` | Mobile diagram |
| `src/components/sections/Testimonials.astro:46` | Header → content spacing |
| `src/components/ui/ClientCard.astro:296` | Featured body internal spacing |
| `src/components/ui/ClientCard.astro:385` | Gap between KPIs |
| `src/components/ui/ClientCard.astro:482` | Gap between grid-card tags |
| `src/components/ui/ClientList.astro:204` | Gap from icon to name |
| `src/components/ui/ClientList.astro:247` | Gap between tags |
| `src/components/ui/ClientList.astro:317` | Mobile list layout |
| `src/components/ui/Stat.astro:32` | Gap from value to label |
| `src/components/ui/Tag.astro:23` | Tag specs (mirrors Eyebrow) |
| `src/components/ui/TestimonialCard.astro:103` | Gap from photo to name |
| `src/components/ui/TestimonialCard.astro:108` | Author photo size |
| `src/components/ui/TestimonialCard.astro:145` | Client logo size |
| `src/components/ui/TestimonialMarquee.astro:34` | Marquee speed |
| `src/components/ui/TestimonialMarquee.astro:87` | Row gap |
| `src/components/ui/TestimonialMarquee.astro:117` | Card gap |
| `src/pages/404.astro:43` | Mobile 404 design |
| `src/styles/buttons.css:45` | Gap from button text to icon |

Other markers:
- `TODO: SUBMIT` — `ContactModal.astro:154` (Day 6).
- `TODO: FONTS` — `BaseLayout.astro:121`, `tokens.css:23` (Adobe kit ID).

## Reusable components (`src/components/ui/`) — Phase 5 pages should reuse these

| Component | Props | Use for |
|---|---|---|
| `Container` | `class?` | Every section's content wrapper (`c-container`: max 1440, 7.5rem / 2rem side padding) |
| `SectionHeader` | `eyebrow?`, `eyebrowVariant?` (`default` / `accent`), `title` (`\n` = line break), `description?`, `titleClass?` (default `c-text_xl`), `as?` (h1–h3), `class?` | Every section header. Always centered, no `align` prop |
| `Eyebrow` | `variant?` (`default` / `accent`) | Standalone labels (e.g. LogoStrip title) |
| `Button` | `variant` (`gradient` / `gradient-outline` / `white` / `glass`), `href?`, `type?`, `class?`; optional `icon` slot | All CTAs. Add `class="js-open-contact"` to open the contact modal |
| `Tag` | `variant?` (`default` / `accent`) | Funds and category labels; 12px on mobile |
| `Stat` | `value`, `label`, `animate?` | Big number + label (adds the `counter` hook) |
| `ClientCard` | `client`, `variant` (`featured` / `grid`), `logoSize?` (`default` / `compact`, grid only) | `featured`: screenshot + testimonial. `grid`: card thumbnail + logo + tags. **Work page listing → `grid`** |
| `ClientList` | `clients`, `limit?` | Stacked client rows with hover screenshot preview. Used on most pages. Max-width 85% (100% on mobile), no width; the wrapper decides placement |
| `TestimonialCard` | `testimonial` | Single testimonial (quote, author, related client logo) |
| `TestimonialMarquee` | `testimonials` | Two infinite testimonial rows. **Testimonials page + any page with the testimonials band**. The caller handles full-bleed (`margin-inline: calc(50% - 50vw)` + `overflow-x: clip`) |

Global layout pieces (already on every page via BaseLayout): Nav, CtaBanner (+ trusted badge), Footer, ContactModal. Use `showCtaBanner={false}` to hide the CTA.

Data fetchers (`src/lib/sanity/queries.ts`):
- `getClientsByIds(ids)` — order-preserving; warns on missing IDs.
- `getAllClientsWithLogo()`
- `getTestimonials()` — each with its referencing client.
- `getClientBadges()`, plus `getClientBadgesCached()` / `getSiteSettingsCached()` in `site.ts`.

## Open questions for the lead
Also logged in `DECISIONS.md`.

**Content**
1. `siteSettings` doesn't exist in Sanity: CTA, footer address, social links and SEO all use fallbacks.
2. `fundsRaised` is empty on all Home clients; `websiteUrl` is empty on all list clients.
3. The Garaje de Ideas card thumbnail shows "Garaje Central".
4. Client icons: Resourcify is missing; Major Players has the wrong mark; DarwinCX is low-res.
5. Testimonials are placeholders: same author, Lorem ipsum, no photos.
6. Client badges are 29px, so soft on retina; 22 clients have no badge.

**Design team**
7. Header → content spacing: about 5.5rem in the refs vs 3rem built.
8. Tag specs.
9. Our Work card hover.
10. Technologies animation spec, plus a layered asset.
11. Mobile designs: Technologies diagram, client list, nav, menu, modal, footer, 404.
12. Measured-only values: testimonial sizes and speed, badge gap and overlap, button icon gap.
13. Hero gradient stop `#8BC1F9` is not a token.

**Lead / CEO**
14. White-on-gradient contrast fails WCAG AA (QA S6): accept, or adjust.
15. Production domain: needed for the Astro `site` value (canonical is `localhost` today), CORS and Adobe Fonts.
16. Adobe Fonts kit ID.
17. Contact form: Vercel → Make webhook.
18. Figma Dev seat.

**Needs lead OK** (`Proposed` rows)
19. Fixed-field schemas.
20. Mobile nav built functional without a design.
21. CTA eyebrow on-dark override.
22. `Tag` mirrors the Eyebrow box.
23. `SectionHeader` `\n` line breaks.
24. Client list rows link to `websiteUrl`.

**QA follow-ups**
25. ~~Fix S1–S11 now or later?~~ Lead: fix now, except S6 (done).
26. S10 made the Services card titles the DS mobile size: 16.2px → 22.5px at ≤767. "Web Growth (SEO + GEO + CRO)" wraps to 2 lines at 375. Confirm against the mobile design.
27. The mobile menu can't be closed by clicking its backdrop (X, Esc and links work). Fix in Phase 5?

## Requests for other agents
- **@astro:** QA S1–S5, S7–S11 once the lead schedules them. Phase 5 pages reuse the components above.
- **@sanity:** create and seed `siteSettings` once the lead supplies the values; fill `fundsRaised`, `websiteUrl`, testimonials and assets as they arrive.
- **@ui:** contrast proposal (S6) after the lead's call; Eyebrow `is-on-dark` variant.
