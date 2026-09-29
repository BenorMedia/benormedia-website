# Handoff — qa — Phase 4 Home final review (parts 1 + 2)

Date: 2026-09-29 · Author: qa (subagent) · Branch: `feat/phase4-home-part2` · Status: DONE — **PASS WITH NOTES** (0 blockers · 11 should-fix · 11 nits)

## What I did
Read-only end-of-phase review of `/` (HomeHero, LogoStrip, FeaturedWork, Services, OurWork, Technologies, Testimonials, plus the BaseLayout shell: Nav, CtaBanner + `cta-badges.ts`, Footer, ContactModal, Seo) and the shared UI primitives. Re-ran the gates, grepped for rule violations, and rendered the built site (`.vercel/output/static`) in headless Chrome via CDP at 1440 / 991 / 767 / 375. That covered layout and overflow, heading outline, the AX tree, keyboard flows, reduced motion, badge rotation and contrast maths. No source files edited. Known gaps from the brief are not repeated here.

## Files changed
- None. New file: this handoff.

## Checks
- [x] `pnpm run build` passes (4 pages).
- [x] `pnpm run check` passes (61 files, 0 errors / 0 warnings / 0 hints).
- [x] `pnpm run lint` passes.
- [x] Checked at 1440 / 991 / 767 / 375.

### Per viewport
| Check | 1440 | 991 | 767 | 375 |
|---|---|---|---|---|
| Horizontal page scroll (`scrollWidth > clientWidth`) | none | none | none | none |
| Elements overflowing viewport (unclipped) | 0 | 0 | 0 | 0 |
| Console errors / broken images / `<img>` without `alt` | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| Heading outline (1x h1, h2 per section, h3 in Services + Our Work cards, no skips) | OK | OK | OK | OK |
| Featured Work screenshots | OK | cropped (S7) | cropped (S7) | cropped (S7) |
| Visual pass (wrapping, overlap, clipping) | OK | OK | OK | OK |

### Accessibility
- **Headings.** 1 h1 (hero). h2s: Featured Work, Services, Our Work, Technologies, Testimonials, CTA. h3s: 3 service titles and 6 Our Work cards (names come from logo `alt`). All are exposed in Chrome's AX tree. LogoStrip has no heading (eyebrow only), which is fine.
- **Services cards.** Tab reaches each card. Enter and Space activate it: `aria-pressed` and `is-active` update and the image swaps. Focus ring is 2px `--color-accent`. The markup is invalid, see S3.
- **Nav dropdown.** Enter opens it (`aria-expanded=true`). Esc resets `aria-expanded` and returns focus, but the panel stays visible (S4). Tabbing out leaves it open (S4).
- **Mobile menu (767 and below).** Opens with Enter and closes with Esc or X. Focus handling is missing (S5).
- **ContactModal.** Tested from the hero, nav, Services and CTA triggers. Focus moves to Name, body scroll locks, Esc closes, and focus returns to the trigger that opened it. The native `showModal` keeps focus inside. Opening it from the mobile menu breaks focus restore (S5).
- **Images.** Decorative images use `alt=""` or `aria-hidden` (hero lines, Services illustration, CTA vector, badge circles, list previews). The duplicated marquee copies are `aria-hidden`: LogoStrip 56 of 112, TestimonialMarquee 24 of 32, and no hidden logo has a non-empty `alt`.
- **Reduced motion** (emulated `prefers-reduced-motion: reduce`). LogoStrip and both testimonial tracks show `animation-name: none` with a static transform. `initCtaBadges` returns early, so the first 6 badges stay. With motion on, all 3 tracks move and badges rotate (checked 4 samples, 34-badge pool).
- **Contrast.** See S6.

### SEO (built `/`)
- `<html lang="en">` present. Robots is `noindex, nofollow` (non-production env).
- Title: `BenorMedia | BenorMedia` (S1). Canonical and `og:url`: `http://localhost:4321/` (S2).
- Present: `og:title`, `og:type`, `og:site_name`, `twitter:card`, `twitter:title`.
- Absent: description, `og:image`, Organization JSON-LD. This follows from the known missing `siteSettings` gap; see N7 for a code fallback.
- `robots.txt`, sitemap and `vercel.json` redirects are scheduled for Phase 7 in BUILD_PLAN, so they are not reviewed here.

### Empty-data rendering (from reading the code)
Nothing throws. What renders when data is missing:
- **ClientCard grid:** no thumbnail → gray tile; no logo → name text; no funds or category → tag row omitted.
- **ClientCard featured:** no screenshot → gray box; no testimonial → name-only body; no photo → initial; no KPIs → list omitted.
- **ClientList:** no icon → initial; no `websiteUrl` → `div` row with no link; no screenshot → no preview.
- **TestimonialCard:** no photo → initial; no logo → omitted.
- **CtaBanner:** fewer than 6 badges → fewer circles and no rotation (`pool <= count`); 0 badges → only the "+" circle; no `siteSettings` → design copy.

Gaps: an empty testimonials list leaves an orphan header (S8), an empty LogoStrip renders an eyebrow over nothing (N6), and a 7–11 badge pool rotates only partially (N4).

### Hardcoded values / naming
- **Naming:** no camelCase and no BEM `--`. `js-open-contact` is a known Phase 3 nit.
- **Allowed** (per rules or logged exceptions):
  - The 3 approved shadows: `Services.astro:194`, `ClientList.astro:291`, `CtaBanner.astro:216`.
  - On-dark `rgba()`, pending the logged "On-dark surface tokens" question: `HomeHero.astro:261-267`, `CtaBanner.astro:282-288`, `buttons.css:83`, `ContactModal.astro:179`.
  - `px` only on borders, radius, outline, blur, media queries and `max-width: 1440px`. Nav burger px is a known Phase 3 nit.
  - `em` on button / tag / eyebrow / KPI padding, the lead-approved `.c-work__cta` margin, and the CTA star glyph (`CtaBanner.astro:233-234`, relative to its line).
  - Eyebrow and Tag `0.9375rem` (DS-locked or lead-requested).
- **Should-fix:** S9, S10, S11 below. **Nits:** N8.

## Blockers (must fix before merge to dev)
None.

## Should-fix
1. **S1 — Title is doubled on Home.** `src/components/layout/Seo.astro:44-47`. Output is `BenorMedia | BenorMedia`. When there is no page title, `rawTitle` falls back to the site name, and the template is still applied because `isDefaultTitle` needs `siteSettings.defaultMetaTitle`. Fix: apply the template only when the title came from the page, e.g. `const fromPage = !!(pageSeo?.metaTitle ?? titleProp); const title = fromPage && !isDefaultTitle ? template.replace("%s", rawTitle) : rawTitle;`.
2. **S2 — Canonical and `og:url` point to `http://localhost:4321/`.** `src/components/layout/Seo.astro:56-58` together with `astro.config.mjs` (no `site`). Without `siteSettings.siteUrl`, the fallback uses `Astro.site ?? Astro.url`, which is localhost in a static build. Fix: set `site: env.PUBLIC_SITE_URL` in `astro.config.mjs` (the prod domain is still an open question, so read it from env) and add the variable in Vercel. Must be fixed before production.
3. **S3 — Services card markup is invalid HTML.** `src/components/sections/Services.astro:79-95`. The `<button>` contains `<h3>`, `<div>` and `<p>`, but a button may only contain phrasing content. The button's accessible name also includes the whole body paragraph. Fix: wrap each card in a `div.c-services__item`, put `<h3><button aria-pressed ...>{title}</button></h3>` inside it and leave `<p>` outside the button. Keep the whole card clickable with `.c-services__item { position: relative }` plus `button::after { content: ""; position: absolute; inset: 0 }`, and move `is-active` and the focus ring to the wrapper (`:has(button:focus-visible)`).
4. **S4 — Services dropdown doesn't close visually on Esc or when focus leaves.** `src/components/layout/Nav.astro:345-351` and `:156-174`.
   - Cause: `:focus-within` keeps the panel open after Esc, because focus goes back to the trigger. Also, nothing removes `is-open` when you Tab past the last link, so `aria-expanded` stays `true`.
   - Fix: remove `:focus-within` from the CSS open rule and rely on `is-open`.
   - Add `services.addEventListener("focusout", (e) => { if (!services.contains(e.relatedTarget as Node)) closeServices(); })`.
   - Add `focusin` → `openServices()` if keyboard focus should still open the panel.
5. **S5 — Mobile menu has no focus management.** `src/components/layout/Nav.astro:106, 192-227`.
   - On open, focus stays on the burger, which is hidden behind the full-screen overlay. Tab moves into the page behind it (hero "Get in Touch", "See Our Work", ...).
   - On close (Esc or X), focus goes to `<body>` instead of the burger.
   - The panel has no `role="dialog"` or `aria-modal`.
   - Opening the modal from the menu's "Get in Touch" leaves the menu open underneath. Esc then closes both through the shared keydown handler, and focus is restored to a button inside the now-hidden panel, so it ends on `<body>`.
   - Fix: add `role="dialog" aria-modal="true" aria-label="Menu"`. On open, focus `.c-nav__mobile-close` and set `inert` on `main` and `footer` (or trap Tab). On close, focus the burger.
   - For the menu CTA, call `closeMobile()` before opening the modal, and make the burger the opener. A native `<dialog>`, as ContactModal uses, gives most of this for free.
   - This dates from Phase 3 but fails WCAG 2.4.3; fix it before the Phase 8 pass.
6. **S6 — Contrast on gradient surfaces fails WCAG AA.** Design decision needed from the lead.
   - Hero stat labels, white at `opacity: 0.6` (`src/components/sections/HomeHero.astro:254`): 1.67–2.39:1.
   - White body text on the gradient (hero description `HomeHero.astro:189`, CTA badge text `CtaBanner.astro:226-230`, eyebrow text, and the white text on the `is-gradient` and `is-glass` buttons): 2.29:1 at the `#6BB0F7` end, 3.89:1 at `#6275F6`. Body text needs 4.5:1.
   - Hero title gradient end `#8BC1F9` on `#6BB0F7`: 1.21:1 (large text needs 3:1).
   - Suggested fix: raise the stat label opacity to at least 0.85 or use solid white, and ask design whether the light end of the gradient can darken behind text. Log under "Text color on dark / gradient backgrounds".
7. **S7 — Featured Work screenshots lose their left edge at 991 and below.** `src/components/ui/ClientCard.astro:272-277`. At 4:3, `object-fit: cover` crops from the centre, which cuts off the Surfe and Puzzle logos and headlines ("rfe", "curate Books."). Fix: add `object-position: left top` (or `top center`) to `.c-client-card__screenshot img`.
8. **S8 — Empty testimonials leave an orphan section.** `src/components/sections/Testimonials.astro:21-34`. `TestimonialMarquee` renders nothing, but the header and background still render. Fix: wrap the section in `{testimonials.length > 0 && (...)}`.
9. **S9 — Hex literals in component CSS.**
   - `src/components/layout/CtaBanner.astro:159`: `#6BB0F7` and `#6275F6` → `var(--color-blue-light)` and `var(--color-blue)`.
   - `src/components/sections/HomeHero.astro:170`: `#FFFFFF` → `var(--color-white)`. Keep the `#8BC1F9` TODO but log it (N11).
   - `src/components/layout/ContactModal.astro:202`: `#E4E6EA` → `var(--color-border)`.
   - `ContactModal.astro:240, 243`: `#222` → `var(--color-black-secondary)`, marked `/* TODO: DS */`, and log it.
10. **S10 — Services title size bypasses the type scale.** `src/components/sections/Services.astro:215`. `font-size: 1.8rem` is about `--fs-text-m` (1.85rem). On mobile it stays 16.2px instead of the DS mobile 22.5px. Fix: `font-size: var(--fs-text-m)` (or add the `c-text_m` class).
11. **S11 — `em` used outside button / tag padding.**
    - `src/components/sections/HomeHero.astro:129`: `padding: 7.8rem 0 5em` → `5rem`.
    - `src/components/layout/Footer.astro:246`: `gap: 9.5em` → the rem equivalent.

## Nits
1. **N1** — `src/components/layout/ContactModal.astro:34-35`: renders "reach out atinfo@benor.media". Add `{" "}` before the `<a>`.
2. **N2** — `src/components/ui/TestimonialMarquee.astro:40-43, 51`: with fewer than 8 testimonials both rows hold the full list, so screen readers hear each testimonial twice. When the bottom row duplicates the top, mark all its items `aria-hidden`.
3. **N3** — `TestimonialMarquee.astro:139-141`: under reduced motion the rows become horizontally scrollable but can't be reached by keyboard. Add `tabindex="0"`, `role="region"` and an `aria-label` to `.c-testimonial-marquee__row`, or wrap the cards instead of scrolling.
4. **N4** — `src/scripts/animations/cta-badges.ts:64-71`: with a 7–11 badge pool, `draw()` returns fewer than 6 and only some circles swap. `current` is then set to that shorter list. Refill from `pool` minus `current` whenever `deck.length < count`. This is harmless with today's 34 badges.
5. **N5** — Images without `width`/`height` cause CLS:
   - `LogoStrip.astro:43`
   - `ClientCard.astro:121, 142, 155`
   - `Services.astro:59`
   - `HomeHero.astro:29-44`
   - `TestimonialCard.astro:62`
   - `ClientList.astro:93`
   Add intrinsic dimensions (the asset-id parser in `ClientList.astro:39-42` can be reused).
6. **N6** — `src/components/sections/LogoStrip.astro:28-59`: an empty `clients` array renders the eyebrow above an empty track. Guard with `clients.length > 0`.
7. **N7** — `src/layouts/BaseLayout.astro:71-103`: Organization JSON-LD disappears entirely without `siteSettings`. Emit a minimal fallback (`"@type": "Organization"`, name "BenorMedia", url from `Astro.site`) so the site-wide requirement holds.
8. **N8** — Font sizes that are neither tokenized nor marked `TODO: DS`:
   - `HomeHero.astro:162` (6.286rem) and `:241` (5.25rem). On mobile the stat values render at 47px, larger than the 36px h1; add a 767-and-below override.
   - `Nav.astro:289` (1.125rem)
   - `Footer.astro:179` (1.638rem)
   - `ClientCard.astro:363` (1.25rem, known)
   Add `/* TODO: DS */` markers and log them, or map them to tokens.
9. **N9** — `Nav.astro:54, 72, 75`: `aria-haspopup` + `role="menu"` / `menuitem` promise arrow-key menu behaviour that isn't implemented. Drop the menu roles and use the disclosure pattern (button + `aria-expanded` + plain links).
10. **N10** — Accent tag text `#3467E5` on its 8% tint is 4.48:1, just under 4.5:1 for 15px / 12px text. Flag to design with S6.
11. **N11** — DECISIONS housekeeping (for the orchestrator):
    - The `#8BC1F9` hero-title gradient stop (`HomeHero.astro:168`) isn't in Open questions.
    - The "On-dark surface tokens" entry still cites `rgba(0,0,0,0.5)` for the modal backdrop; the code now uses `rgba(255,255,255,0.05)`.

## Requests for other agents
- **@astro:** S1, S2, S3, S4, S5, S7, S8, S9, S10, S11 and nits N1–N9.
- **@ui:** S6 / N10 contrast proposal once design answers. Eyebrow `is-on-dark` variant is still pending (known).
- **@sanity:** none.

## Open questions for the project lead
- **S6:** accept the current gradient text contrast, or ask design for a darker text area or more opaque labels?
- **S2:** confirm the production domain so `site` / `PUBLIC_SITE_URL` can be set. This is already an open question.

## TODO markers added
- `TODO: DS`: none (QA did not edit code).
- `TODO: COPY`: none.
