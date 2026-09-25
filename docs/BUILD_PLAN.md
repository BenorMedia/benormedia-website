# Build Plan (v0.2)

✅ = project lead approval checkpoint. Nothing moves to the next step without it.
Current target: **Home complete by end of Day 5.**
Current phase: **Phase 0**

Figma is NOT a dependency. We build from `DESIGN_SYSTEM.md` + screenshots. Figma checks are inserted as a floating phase (**Phase F**) whenever access is available (see bottom).

---

## Day 1 — Phase 0 Foundation + Phase 1 Design system
| Task | Agent |
|---|---|
| Repo, `main` + `dev` branches, push starter docs | Lead |
| Scaffold Astro + TS strict + Vercel adapter + `@sanity/astro` (Studio at `/studio`, static output). Verify setup against current official docs | astro |
| Sanity project + `production` dataset, CORS (localhost + Vercel previews) | Lead + sanity |
| Vercel project linked, `dev` previews = staging | Lead |
| Adobe Fonts kit whitelist: localhost, `*.vercel.app`, prod domain | Lead |
| `tokens.css`, `base.css`, `typography.css`, `buttons.css`, `utilities.css` | ui |
| Fonts: Brulia self-hosted + preload, Acumin via Adobe kit | ui |
| Primitives: `Button`, `Eyebrow`, `Tag`, `Container` (unknown values → `TODO: DS`) | ui |
| `/dev/styleguide` page (noindex) | ui |
✅ Checkpoint: site + Studio run on a preview URL; styleguide reviewed.

## Day 2 — Phase 2 Sanity
| Task | Agent |
|---|---|
| Finalize `SCHEMAS.md` for shared docs + Home | sanity |
| Schemas, desk structure, singletons, previews, validation | sanity |
| Seed Home content from design (placeholders marked `TODO: COPY`) | sanity |
| Types + `queries.ts` for Home + siteSettings | astro |
| Publish webhook → Vercel deploy hook (on `dev` previews) | sanity + Lead |
✅ Checkpoint: schema contract approved, Studio reviewed, seed content visible.

## Day 3 — Phase 3 Layout shell
| Task | Agent |
|---|---|
| `BaseLayout`, `Seo` component, 404 | astro |
| `c-nav`: Services dropdown, mobile menu, CTA (keyboard accessible) | astro + ui |
| `c-footer` (legal links hidden until pages exist) | astro + ui |
| `c-cta` banner | astro + ui |
| `c-contact-modal`: native `<dialog>`, opened by any "Get in Touch" link; form UI only (submit wired on Day 6) | astro + ui |
✅ Checkpoint: shell reviewed at 1440 / 991 / 767 / 375.

## Day 4 — Phase 4 Home (part 1)
Sections: Hero · Logo strip · Featured Work · Services accordion. astro builds, ui supports, qa reviews the PR.
✅ Checkpoint.

## Day 5 — Phase 4 Home (part 2)
Sections: Our Work (cards + list) · Technologies · Testimonials. Home animations (marquees, etc.) per spec; if no spec yet, static first. Full qa pass on Home.
✅ Checkpoint: **Home complete on preview.**

---

## Day 6 — Phase 5 Remaining pages + Phase 6 Motion/forms/webhooks
- Service template → 3 service pages
- Work (listing only, no detail pages)
- Testimonials, Pricing
- Blog listing (search + category filter) + article
- Remaining GSAP animations, contact form → Vercel endpoint → Make (if CEO confirmed)
✅ Checkpoint per page.

> Risk: Day 6 is heavy and needs designs for 6 templates. If a page's design isn't ready, it moves to Day 7 morning.

## Day 7 — Phase 7 Content + redirects + Phase 8 QA + launch prep
- Final copy into Sanity, blog migration from Webflow
- 301 map in `vercel.json`
- Full qa pass (a11y, Lighthouse, SEO, cross-browser), fixes, block `/dev/*`
✅ Final checkpoint. **Production release by the project lead only.**

---

## Phase F — Figma sync (floating)

Inserted at the **next checkpoint** after Figma MCP access is confirmed, then optionally at every later checkpoint. Never blocks the current day's tasks.

| Step | Agent |
|---|---|
| 1. Verify access: `whoami` shows a Dev/Full seat on the file's team | Lead |
| 2. Extract variables + text/effect styles from the style guide frame | ui |
| 3. Diff vs `DESIGN_SYSTEM.md` → write `docs/handoffs/YYYY-MM-DD_ui_figma-diff.md` (match / mismatch / missing) | ui |
| 4. Lead approves token changes → ui updates `DESIGN_SYSTEM.md` + `tokens.css` | Lead + ui |
| 5. Compare every built component/page so far against its Figma frame | qa |
| 6. Fixes become tasks at the top of the current day (or the next day if the current day is full) | orchestrator |

After the first sync, every new section is checked against its frame before its PR (step 5 only).

Log here when it runs:
| Date | Inserted after | Result |
|---|---|---|
| | | |
