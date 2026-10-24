# Handoff — orchestrator — contact page

Date: 2026-10-22 · Author: orchestrator · Branch: `feat/contact-page` · Status: DONE (waiting for lead review on the preview)

## What I did
- New page `/contact` from Figma 3790:36790 (`docs/refs/contact-us/Contact.png`): title + subtitle, Surfe testimonial, client logo strip, form card with the Figma line art. No CTA banner (the design goes straight to the footer).
- Every contact CTA now links to `/contact`: Nav (desktop + mobile), Footer "Contact", every Sanity `contact` link through `hrefFromLink` (CTA banner, Home hero, service hero, Services, new pages), PricingCard, NpActions, NpBlogSidebar, CaseStudyRelated.
- `ContactModal` is no longer rendered by BaseLayout (file kept, mounted only on `/dev/styleguide`). Its submit logic moved to `src/scripts/ui/contact-form.ts`, used by both the modal and the page. `/api/contact` unchanged.
- `LogoStrip` gained an `inline` prop (column-width strip, as in the design).
- Sanity: `contact` added to the service reserved slugs; link type `contact` relabelled "Contact page" (no data change).
- Sitemap: `/contact` lastmod 2026-10-22.

## Files changed
- New: `src/pages/contact.astro`, `src/components/sections/ContactSection.astro`, `src/scripts/ui/contact-form.ts`, `public/images/contact/form-bg.svg`
- CTAs: `Nav.astro`, `Footer.astro`, `CtaActions.astro`, `PricingCard.astro`, `NpActions.astro`, `NpBlogSidebar.astro`, `CaseStudyRelated.astro`, `src/lib/sanity/links.ts`
- Shell: `BaseLayout.astro`, `ContactModal.astro`, `LogoStrip.astro`, `src/lib/content/seo.ts`, `astro.config.mjs`, `src/pages/dev/styleguide.astro`
- Sanity: `sanity/schemaTypes/documents/service.ts`, `sanity/schemaTypes/objects/link.ts`
- Comments only: `HomeHero`, `ServiceHero`, `Services`, `PricingPlans`, `api/contact.ts`
- Docs: `SITEMAP.md`, `DECISIONS.md` (Global row + new Contact section)

## Checks
- [x] `pnpm run build` passes (public Sanity project id + dataset passed inline, no `.env`)
- [x] `pnpm run check` passes (0 errors, 0 warnings)
- [x] `pnpm run lint` passes
- [x] Checked at 1440 and 390 (no horizontal overflow at 390)

## Open questions for the project lead
- Meta title/description for `/contact` (placeholder).
- Figma quote is David Chevalier's; the page shows Surfe's Sanity testimonial (Trelise Mansfield), like the modal did.
- No tablet/mobile design: built as one column ≤991.
- Required asterisk color has no token (kept the label color).
- Can the ContactModal file be deleted, or keep it in case the popup returns?

## TODO markers added
- `TODO: DS` — title color, asterisk color, budget wrap gap, tablet/mobile layout (ContactSection)
- `TODO: COPY` — `PAGE_META.contact`, form status messages
