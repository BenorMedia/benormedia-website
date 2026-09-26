# Handoff - qa - phase3-review

Date: 2026-09-25 - Branch: feat/phase3-layout-shell - Status: PASS WITH NOTES

## What I did
Full read-only review of the Phase 3 Layout Shell against CLAUDE.md, SCHEMAS.md v0.5, DESIGN_SYSTEM.md, and the three design refs in docs/refs/. Ran the green-bar (build/check/lint), grep-audited for rule violations, and diff-verified that Phase 1 CSS + UI primitives were not touched. Compared each component to its Figma ref screenshot and did static keyboard-flow analysis for the Nav dropdown, mobile menu, and contact modal (no live browser available in this environment).

## Overall status
**PASS WITH NOTES.** Green bar is clean, the shell is functionally correct, all documented behaviors match the plan. Two class-naming violations (double-dash modifiers) and a small drift between hardcoded service slugs in Nav/Footer vs SITEMAP.md must be resolved before merge to dev. Rgba color literals in scoped CSS are a token-discipline gap that likely needs a DS decision.

## Green bar
- pnpm run build -> exit 0 (4 pages built, 10.5s; the vite "use no memo" warning originates from react-compiler-runtime in node_modules, not our code)
- pnpm run check -> exit 0 (45 Astro files, 0 errors / 0 warnings / 0 hints)
- pnpm run lint  -> exit 0

## Violations

### Blocker
None.

### Should fix
1. **BEM double-dash modifier used - banned by CLAUDE.md class-naming rules.**
   - src/components/layout/Nav.astro:50, 141, 317-318, 323-324 - c-nav__item--has-menu
   - src/components/layout/Footer.astro:85, 210 - c-footer__col-link--button
   Convention says variants use is- prefix, no BEM double-dash. Suggest c-nav__item is-has-menu and c-footer__col-link is-button.

2. **Hardcoded rgba() color literals in scoped CSS - bypasses tokens.**
   - src/components/layout/CtaBanner.astro:129, 130, 143, 163, 168, 169 - six rgba whites for pill bg/border, avatar placeholder, and the on-dark eyebrow override.
   - src/components/layout/ContactModal.astro:145 - background: rgba(0, 0, 0, 0.5) for the dialog::backdrop.
   CLAUDE.md CSS rules say "Use var(--token) only. Hardcoded colors or font sizes are rejected in review." The DS has no translucent-white / on-dark tokens yet - this is a genuine gap. Either add tokens (e.g. --color-white-15, --color-white-35, --color-backdrop) or explicitly whitelist rgba() for scrim/glass surfaces in CLAUDE.md. DECISIONS.md already flags the eyebrow-on-dark gap; the pill + backdrop cases should be added.

3. **Sitemap vs Nav slug drift.**
   - docs/SITEMAP.md v0.2 lists /custom-websites-migrations, /growth, /ongoing-website-support.
   - src/components/layout/Nav.astro:29-33 and src/components/layout/Footer.astro:44-48 ship /custom-websites, /growth, /support.
   The astro handoff flags these as placeholder pending Lead confirmation, and DECISIONS.md logs the shipped slugs as Proposed. But SITEMAP.md v0.2 already contains a different set - three documents disagreeing. Lead should pick one set and align all three.

### Nice to have
4. **js- prefix is not on the approved class-naming whitelist.** CLAUDE.md lists c-, is-, cc-, and typography classes only. The js-open-contact hook is a pragmatic response to the Button primitive not spreading data-* attrs and is documented in the astro handoff, but it is off-spec. Cleanest fix: extend Button to spread data-* (and aria-*) attrs, then delete the js- hook and the dual-selector query in the modal.

5. **Icon-hitbox pixel values on non-border elements.** Nav.astro:354 gap:4px, 358 width:24px, 359 height:2px, 361 border-radius:1px (border-radius allowed; the others borderline). Strictly speaking 24px width and 2px height on a display element are not in the allowed px categories (border/radius/blur/media-query). Low priority; move to rem or accept as icon-hitbox pixels and note in DS.

## Design fidelity vs refs

**Nav** vs docs/refs/nav+submenu open.png - Matches: logo left, centered nav with Services dropdown, Get in Touch button right, sticky white bar with bottom border. Dropdown items and copy match exactly.

**Footer** vs docs/refs/footer.png - Structure matches. Ref shows "Built with **Webflow**" + legal links (Privacy / Terms / Cookie Policy); build ships "Built with **Astro**" and legal links hidden per approved Decision 2026-09-25. Correct. Partner badges are text placeholders (TODO: assets partner-badges) pending artwork.

**CtaBanner** vs docs/refs/cta-banner.png - Structure matches. Two intentional deviations: (a) avatar cluster is a single empty rounded square placeholder vs 6 real avatars in ref - acceptable stub, will be filled when avatar assets ship; (b) decorative sphere/globe wireframe in ref is served as cta-banner-vector.svg - visual comparison needs a live browser (see gap below).

## Component-by-component verification

### BaseLayout + Seo (SCHEMAS v0.5)
- getSiteSettings is called only from src/lib/sanity/site.ts; every consumer (BaseLayout, Nav, Footer, CtaBanner, ContactModal) receives the same cached value threaded via props. Confirmed via grep.
- Meta resolution chain in Seo.astro:34-41 follows pageSeo -> props -> siteSettings defaults, with a defensive "BenorMedia" fallback for title only.
- Title template applied unless title equals defaultMetaTitle - correct (Seo.astro:44-47). Home safely avoids Home | BenorMedia | BenorMedia.
- Robots: noindex, nofollow when noIndex prop OR pageSeo.noIndex OR PUBLIC_SITE_ENV !== production (Seo.astro:50-52). Preview deploys stay noindex by construction - matches Decision 2026-09-25.
- OG tags: title, description (conditional), image (via urlFor width 1200 height 630 fit crop), url, type=website, site_name - all emitted. String OG images pass through.
- Twitter: summary_large_image, handle (conditional), title, description (conditional), image (conditional) - all correct.
- google-site-verification meta only if set - correct.
- Canonical: prefers pageSeo.canonicalUrl -> siteSettings.siteUrl+pathname -> Astro.url fallback. Correct.
- Organization JSON-LD built defensively in BaseLayout, skips missing fields cleanly, JSON.stringify output injected via set:html. Schema shape is valid. Note: foundingYear (number) is coerced to string for foundingDate - a 4-digit year is a valid ISO 8601 date, so acceptable.

### Nav vs ref
- Sticky top with white bg + border-bottom: var(--border-default), z-index 100.
- Services button uses aria-haspopup=true, aria-controls, aria-expanded toggling.
- Panel is role=menu, items role=menuitem.
- Hover open on hover-capable devices via CSS (@media (hover: hover), lines 316-327).
- Click toggle handled in inline script (161-162).
- Esc + outside-click close + focus restore (168-173, 164-166).
- Mobile: hamburger appears @media (max-width: 767px) (line 436-442), off-canvas panel, close via X/Esc/backdrop/link-click, body overflow:hidden (line 187) while open, restored on close (192).
- TODO: DS mobile present (346, 437).
- Services dropdown items match ref exactly.

### Footer vs ref
- 3-column top row (grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr), line 147).
- Barcelona card image + address overlay (city/street/town) sourced from siteSettings.address with hardcoded fallback for each line (Footer.astro:22-27).
- SERVICES + ABOUT columns hardcoded (44-55). Services links match Nav dropdown (subject to Should-fix #3).
- Contact link in ABOUT uses native button with data-open-contact, not an anchor - better UX (does not spuriously navigate to #). Good call.
- Partner badges = 2 stacked bordered boxes with placeholder text (97-100); TODO: assets partner-badges present.
- Socials: findSocial() helper matches URLs from siteSettings.sameAs by host; icon hidden when no match. LinkedIn + X inline SVGs use currentColor.
- Wordmark: /images/benormedia-footer.png at full width.
- Credit line "Built with Astro. All rights reserved. BenorMedia." on the right.
- Legal links absent per Decision 2026-09-25.
- TODO: DS mobile present (line 291).

### CtaBanner vs ref
- Full-width background: var(--gradient-primary), position: relative; overflow: hidden.
- Decorative vector SVG at bottom, position: absolute; pointer-events: none; with aria-hidden=true on the img; alt=empty; z-index 0. Correct.
- Eyebrow (default variant) + c-text_xl H2 (white via color: var(--color-white)) + optional buttons + optional social-proof pill with placeholder avatar cluster.
- shouldRender = cta AND cta.title (line 22) - component returns null when title missing. Correct.
- TODO: DS eyebrow on-dark variant present (160).
- Note: hrefFromLink() for type=contact returns #, then the fallthrough uses Button variant with class=js-open-contact - click handler in ContactModal calls e.preventDefault(), so no bogus hash navigation. Fine.

### ContactModal
- Native dialog with title / description / form / success from siteSettings.contactModal + hardcoded fallbacks.
- Form: Name (required, autofocus), Email (required), Message (required, rows=4). Submit stub logs TODO: SUBMIT wire endpoint Day 6 and swaps the form for the success container. form.reset() on each open.
- Close button data-close-contact + aria-label=Close present.
- Script wires [data-open-contact], .js-open-contact (line 96-97). Esc handled natively by dialog (dialog close event listener also restores focus, lines 117-120). Backdrop click detected via event.target=dialog (112-114). Focus returns to lastTrigger on close.
- First input focused on open via requestAnimationFrame + autofocus attribute (fallback).
- Backdrop styled via dialog::backdrop { background: rgba(0, 0, 0, 0.5); } - see Should-fix #2 (rgba literal).
- No shadow. Border + 12px radius. Correct.

### 404
- Uses BaseLayout with noIndex=true and showCtaBanner=false.
- Eyebrow "404" + H1 "Page not found" in c-text_xl + paragraph + Button href=/ variant=gradient "Back to home".
- Centered layout with min-height: 60vh.
- TODO: DS mobile present (43).

## Rule compliance summary
- **No shadows anywhere** - grep for box-shadow|drop-shadow in src/components/layout returns 0 matches. Clean.
- **No hardcoded hex colors** in new .astro files - 0 matches.
- **rgba() color literals** - 7 matches (Should-fix #2).
- **px usage** - every hit falls under border-width, border-radius, blur, media-query, or max-width 1440px (all allowed) except the icon hitbox pixels called out in Nice-to-have #5.
- **Class naming** - 2 BEM double-dash violations (Should-fix #1). js- prefix used pragmatically (Nice-to-have #4).
- **Only var(--token)** for colors/fonts in scoped styles - respected except for the rgba() cases and one intentional gradient border (rgba(255,255,255,0.35) in CtaBanner pill).
- **No new deps** - git diff --stat -- package.json pnpm-lock.yaml returns no working-tree modifications. Confirmed clean.
- **No touch to main** - branch is feat/phase3-layout-shell. Confirmed.
- **No .env reads** - only import.meta.env[PUBLIC_SITE_ENV] in Seo.astro:50, which is a public build-time env, not a .env file read.
- **Phase 1 CSS + UI primitives untouched** - git diff --stat -- src/styles src/components/ui returns no working-tree modifications.

## Empty siteSettings graceful handling (static trace)
- **Nav** - logo falls back to /images/Logo.svg, alt to "BenorMedia". All labels + dropdown items + Get in Touch button hardcoded. Renders fully.
- **Footer** - card image renders, address falls back to hardcoded Barcelona lines, columns hardcoded, socials hidden (findSocial returns undefined for both, guards suppress the anchors), wordmark + credit render. Renders fully.
- **CtaBanner** - shouldRender=false -> component returns nothing. Correct: no half-rendered banner.
- **ContactModal** - title/description/successMessage all use hardcoded fallbacks. Renders fully.
- **Seo** - rawTitle falls to component-prop title, then "BenorMedia". Template still applied -> title becomes "BenorMedia | BenorMedia" when no page passes a title AND no defaultMetaTitle exists in Sanity. Minor gap: consider also skipping template when rawTitle equals siteName. Robots + canonical (via Astro.site) still render. Not a blocker for an empty-dataset launch scenario, but log for polish.

## SEO tag emission (static trace for BaseLayout title=Home with siteSettings populated)
Emitted markup:
- title = "Home | BenorMedia" via titleTemplate.
- link rel=canonical href=siteUrl/.
- meta name=robots content=... per PUBLIC_SITE_ENV.
- OG: title, description, image, url, type=website, site_name.
- Twitter: card=summary_large_image, site (if handle), title, description, image.
- google-site-verification if set.
- Organization JSON-LD present + valid.

## What I could not verify (needs live browser / project lead)
- **Live pixel-level fidelity at 1440 / 991 / 767 / 375** - this environment has no browser. Static CSS analysis shows: nav caps at max-width 1440px, mobile menu triggers @media (max-width 767px) (matches DS breakpoints), footer top-row collapses to 1fr at less than 767. Root font-size behavior (fluid 1vw, then fixed) is inherited from tokens/base and confirmed unchanged. Recommend Lead spot-check on preview deploy.
- **Real keyboard flow in a browser** - verified statically that Esc / outside-click / backdrop / focus-restore code paths exist and are wired. Recommend Lead tab through Nav + Services dropdown + Modal on preview.
- **CTA vector visual match** - the SVG exists (public/images/cta-banner-vector.svg), positioned bottom-center at width min 60rem 90%, opacity 0.6. Whether it visually matches the sphere/globe wireframe in cta-banner.png is a visual check.
- **Font rendering** - Adobe Fonts kit link is still a placeholder comment; Acumin Pro will fall back to system sans on preview until the kit ID lands.
- **.env.example content** - permission-denied on read. Handoff states PUBLIC_SITE_ENV=development was appended; trust the astro agent report.
- **Live JSON-LD validation** - build succeeded, JSON.stringify is safe; recommend Lead paste HTML source into a validator (schema.org / Google Rich Results Test) after preview deploy.

## Things shipped that were not in the plan
Only one, already flagged by astro: the js-open-contact class-based selector workaround for the Button primitive. Assessment: acceptable for Phase 3 as a pragmatic unblock (documented in astro handoff + DECISIONS.md), but should be retired in Phase 4/5 by extending Button to spread data-* attrs. Not a merge blocker.

## Things in the plan not shipped
Nothing missing. Every item in the Day 3 task list is present:
- BaseLayout, Seo, 404 - done.
- c-nav (Services dropdown + mobile menu + CTA, keyboard-accessible) - done.
- c-footer (legal hidden) - done.
- c-cta banner - done.
- c-contact-modal (dialog, opened by any Get in Touch link, form UI-only) - done.

## Requests for other agents

### @ui
- Extend Button primitive to spread data-* (and aria-*) attributes onto the underlying anchor/button. Retires the js-open-contact workaround.
- Add an is-on-dark eyebrow variant to src/components/ui/Eyebrow.astro. Retires the scoped override in CtaBanner.astro.
- Consider adding translucent-white / backdrop / glass tokens to tokens.css (e.g. --color-white-15, --color-white-35, --color-backdrop-50) to eliminate the 7 rgba() literals in Layout components. Discuss with Lead before adding - this is a DS decision.
- Optional: rename c-nav__item--has-menu -> c-nav__item is-has-menu and c-footer__col-link--button -> c-footer__col-link is-button (Should-fix #1) once other agents rebase.

### @astro
- After @ui ships Button data-attr spread + eyebrow on-dark variant, remove .js-open-contact from Nav/CtaBanner and remove the scoped eyebrow override in CtaBanner.
- Address rule violations #1 (class names) and #2 (rgba tokens) once DS updates land.
- Seo edge case: consider skipping titleTemplate not only when rawTitle equals defaultMetaTitle but also when rawTitle equals siteName, to avoid "BenorMedia | BenorMedia" in the empty-dataset scenario.

### @sanity
No schema changes required. When seeding a siteSettings fixture, note: (a) if ctaBanner.title is empty the banner is hidden entirely; (b) contactModal.title/description/successMessage are optional and fall back to hardcoded copy.

## Open questions for the project lead
1. **Confirm final Services slugs.** Three disagreeing sources today:
   - docs/SITEMAP.md: /custom-websites-migrations, /growth, /ongoing-website-support
   - Nav + Footer (shipped): /custom-websites, /growth, /support
   - DECISIONS.md logs the shipped values as Proposed.
   Pick one set. Once decided, align SITEMAP.md, Nav (src/components/layout/Nav.astro:29-33), Footer (src/components/layout/Footer.astro:44-48), and update DECISIONS.md to Locked.
2. **Decide on translucent-white / backdrop / glass tokens** (Should-fix #2). Options: add tokens to DS and re-run components, or accept rgba() literals for scrim/glass surfaces only and document the exception in CLAUDE.md.
3. **Confirm the c-nav__item--has-menu / c-footer__col-link--button rename to is-prefixed variants** (Should-fix #1) is safe to do now, or defer.
4. **Partner-badge artwork** - Webflow Partner + Claude Partner Network images still needed for Footer.
5. **X vs Twitter icon** - currently the X logo is shipped; confirm brand preference.
6. **PUBLIC_SITE_ENV=production** - confirm this is set only on the production Vercel deployment (previews stay noindex).

## TODO markers seen (all pre-declared in astro handoff, no new debt)
- TODO: DS mobile - Nav (2), Footer, ContactModal, 404
- TODO: DS eyebrow on-dark variant - CtaBanner
- TODO: assets partner-badges - Footer
- TODO: SUBMIT wire endpoint Day 6 - ContactModal
- TODO: FONTS Adobe kit link pending kit ID - BaseLayout (Phase 1 carryover)

## Files reviewed
- src/layouts/BaseLayout.astro
- src/components/layout/Seo.astro
- src/components/layout/Nav.astro
- src/components/layout/Footer.astro
- src/components/layout/CtaBanner.astro
- src/components/layout/ContactModal.astro
- src/pages/404.astro
- src/lib/sanity/site.ts
- src/lib/sanity/queries.ts
- src/lib/sanity/types.ts
- docs/DECISIONS.md
- docs/SITEMAP.md
- docs/refs/nav+submenu open.png
- docs/refs/footer.png
- docs/refs/cta-banner.png
