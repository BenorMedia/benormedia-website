# Decisions Log

Format: date · decision · reason · approved by.

## Locked
| Date | Decision | Reason | By |
|---|---|---|---|
| 2026-09-24 | Astro static output + TypeScript strict | Performance, agency's new custom-code offer | Lead |
| 2026-09-24 | Sanity Studio embedded at `/studio` | One repo, one deploy | Lead |
| 2026-09-24 | Sanity publish webhook → Vercel rebuild | Static site with fresh content | Lead |
| 2026-09-24 | Vanilla CSS (nesting + custom properties), no SASS/Tailwind | Tokens as runtime CSS vars; native nesting covers SASS's main benefit | Lead |
| 2026-09-24 | GSAP + ScrollTrigger via npm | Standard for agency animations | Lead |
| 2026-09-24 | Branches: `main` prod, `dev` staging, `feat/*` per task | Staging-first workflow | Lead |
| 2026-09-24 | English only | Scope | Lead |
| 2026-09-24 | rem units on fluid root (html), em only for component padding | Avoid em compounding | Lead |
| 2026-09-24 | Figma text class names kept as-is | 1:1 QA with design | Lead |
| 2026-09-24 | Breakpoints 767 / 991 / 1440; 12px root on 768–991 | Tablet legibility | Lead |
| 2026-09-25 | Figma is not a dependency; Figma sync is a floating Phase F | Keep build moving without MCP access | Lead |
| 2026-09-25 | Work: listing only, no detail pages | Scope | Lead |
| 2026-09-25 | Services: header dropdown only, routes at root (`/<service-slug>`), no `/services` prefix | No main services area | Lead |
| 2026-09-25 | Contact is a popup (native `<dialog>`), no page | Design | Lead |
| 2026-09-25 | No legal pages for now; footer links hidden | Scope | Lead |
| 2026-09-25 | Blog search + category filter, client-side | Static site, small content volume | Lead |
| 2026-09-25 | Plan: Home by Day 5, remaining pages Day 6, content/QA Day 7 | Deadline | Lead |
| 2026-09-24 | Fixed-field Sanity schemas, no page builder | Approved fixed layouts, safer editing | Proposed |
| 2026-09-25 | Package manager: pnpm (supersedes earlier implied npm) | Strict node_modules layout, faster installs, better monorepo readiness | Lead |
| 2026-09-25 | Node 22.x LTS pinned via `.nvmrc` and `engines.node >= 22.12.0` | Required by Astro 7 | Lead |
| 2026-09-25 | TypeScript preset `astro/tsconfigs/strictest` | Stronger safety net than plain `strict` | Lead |
| 2026-09-25 | Vercel adapter included with `output: 'static'` + `imageService: true` | Vercel Image Optimization for Sanity images | Lead |
| 2026-09-25 | Sanity Studio routing: hash-based (default under static output) | Avoids `vercel.json` rewrite and 404-on-refresh | Lead |
| 2026-09-25 | Sanity `apiVersion` pinned to `2026-09-25` | Predictable behavior across upgrades | Lead |
| 2026-09-25 | Visual Editing deferred to post-launch; would require on-demand preview routes | Static output only; publish webhook rebuild is sufficient for launch | Lead |
| 2026-09-25 | CORS: no wildcard `vercel.app`; only `http://localhost:4321`, the `dev` branch preview URL, and the production domain (once known) | Least-privilege; wildcard preview URLs expose Studio to any Vercel deploy | Lead |
| 2026-09-25 | Local `benorSanityAliasFix` Vite plugin in `astro.config.mjs` to work around `@sanity/astro@3.5.1` Windows path-strip bug in `sanity:module-dedupe` | Studio unusable in dev on Windows without it; remove when upstream fix ships | Lead |
| 2026-09-25 | Handoff gates: `pnpm build`, `pnpm check` AND `pnpm lint` must pass | Lint now part of pre-handoff green bar | Lead |
| 2026-09-25 | Sanity schemas v0.4 approved | `author` promoted to its own document (single source of truth for bio/photo/LinkedIn); FAQ sections group their questions (`faqSections[].faqs[]`) — no dynamic "FAQ type" dropdown; testimonial `kpis` = array (max 2); `category` = shared document across `client` and `post`, seeded with the 22 canonical values | Lead |
| 2026-09-25 | Blog article body = Portable Text + `@sanity/table` | Native Sanity block content covers everything we need; table plugin fills PT's tables gap. Explicitly excludes embeds, videos, code blocks and CTA blocks | Lead |
| 2026-09-25 | `siteSettings` = single doc with tabs (General, SEO & Meta, Organization, Navigation, Footer, Global sections); every page/routable doc has Content + SEO tabs | Editors group related fields without splitting into multiple singletons; SEO always separated from content so it can't be forgotten | Lead |
| 2026-09-25 | Staging noindex handled via env var in code (BaseLayout), not a CMS toggle | Prevents accidental de-indexing of production from Studio; env-driven means preview deploys are noindex by construction | Lead |
| 2026-09-25 | Sanity schemas v0.5 — page singletons are SEO-only; page copy lives in Astro components | Site is small, copy is stable; removing per-section CMS fields eliminates schema drift and simplifies the editor UX. Every page singleton (`homePage`, `workPage`, `pricingPage`, `testimonialsPage`, `blogPage`) now holds just a `seo` object | Lead |
| 2026-09-25 | Removed `service` and `technology` document types | Services are handled as static Astro pages; the `technology` doc had no confirmed use case | Lead |
| 2026-09-25 | Removed `Navigation` and `Footer` tabs from `siteSettings` | Site chrome (nav + footer) is authored directly in the Astro components. `siteSettings` keeps only General, SEO & Meta, Organization and Global sections | Lead |
| 2026-09-25 | `PUBLIC_SITE_ENV` env var drives Seo noindex | Set to `production` only on the production Vercel deployment; preview/dev deployments render `noindex, nofollow` by construction. Prevents accidental de-indexing via CMS toggle | Lead |
| 2026-09-25 | Nav labels + Services dropdown items + footer link columns are hardcoded in Astro components (confirms SCHEMAS v0.5) | Editing labels/routes is a code change, not a CMS change | Lead |
| 2026-09-25 | Services dropdown routes aligned to `docs/SITEMAP.md`: `/custom-websites-migrations`, `/growth`, `/ongoing-website-support` | SITEMAP.md is the canonical route source; Nav + Footer + service pages must use these exact slugs | Lead |
| 2026-09-25 | Mobile nav / mobile menu design not provided → built functional with DS tokens; visual polish deferred to Phase F | Do not block Phase 3 on missing design | Proposed |
| 2026-09-25 | CTA banner eyebrow on gradient background overrides default `--color-gray` border and `--color-text` to translucent white / white | Default eyebrow variants are only readable on light bg; on-dark reuse needed here. Potential DS gap for an `is-on-dark` eyebrow variant — flagged in Open questions | Proposed |
| 2026-09-25 | Added `Healthcare` as the 23rd canonical category | Requested during Phase 3 content-entry prep; slug `healthcare` | Lead |
| 2026-09-25 | Added `pnpm schema:deploy` script (`sanity schema deploy`) | Keeps the remote Sanity schema in sync with the code so future MCP/content work can validate against it | Lead |
| 2026-09-25 | `.c-container` horizontal padding = 120 px desktop, 2 rem (32 px) mobile | Figma parity (Phase 3 nav sync); the Nav uses the same horizontal padding with 16 px vertical to match the frame | Lead |
| 2026-09-25 | Contact modal rebuilt as a right-side slide-in `<dialog>` (753 px panel, blur backdrop) — replaced the initial centered-modal draft | Matches the approved Figma design; earlier draft was structural only | Lead |
| 2026-09-25 | Footer legal links moved to the bottom **credit strip** (Privacy Policy · Terms & Conditions · Cookie Policy). Middle-columns legal was already hidden | Bottom strip is a separate context from the mid-footer columns; routes `/privacy-policy` etc. are placeholders until pages exist | Lead |
| 2026-09-25 | Footer wordmark sits in a **full-width strip** (258 px tall, border top + bottom) outside `.c-container`; credit strip stays inside the container with 30 px vertical padding | Wordmark spans viewport width regardless of container max; credit stays aligned with the rest of the site | Lead |
| 2026-09-25 | Partner-badge artwork landed as PNG in `/public/images/` (`webflow-partner.png`, `claude-partner.png`, width 216 px each) | Replaces the placeholder bordered text boxes; retires the `TODO: assets partner-badges` marker | Lead |

## Pending
| Topic | Status |
|---|---|
| Forms: Vercel endpoint → Make webhook | Waiting CEO confirmation |
| Figma Dev seat → MCP QA of DESIGN_SYSTEM | Requested |

## Open questions
- See `DESIGN_SYSTEM.md` §9.
- Animation spec per section.
- Final copy (many placeholders in design).
- Production domain — required for Sanity CORS allow-list and Adobe Fonts kit whitelist.
- File upstream fix for `@sanity/astro` Windows path-strip bug (one-line regex `/[\\/]package\.json$/`); remove `benorSanityAliasFix` workaround from `astro.config.mjs` once a fixed release ships.
- Revisit `typescript` pin (`^6.0.0`) once Astro supports TS 7 via `@astrojs/ts-content-mapper`.

### Raised in Phase 3 (Astro — Layout Shell)
- **Eyebrow on-dark variant** — the two shipped eyebrow variants (`is-default`, `is-accent`) only read on light backgrounds. CTA banner (gradient bg) needs on-dark colors; currently overridden scoped to `.c-cta`. Consider a third variant `is-on-dark` in the DS, or a per-instance color override contract.
- **On-dark surface tokens** — DS has no translucent-white or scrim tokens. `CtaBanner.astro` uses `rgba(255,255,255,α)` literals for the social-proof pill background, border and avatar placeholder, and for the eyebrow on-dark override; `ContactModal.astro` uses `rgba(0,0,0,0.5)` for the `::backdrop` scrim. Consider adding `--color-white-10`, `--color-white-15`, `--color-white-35`, `--color-white-40`, `--color-white-60`, `--color-white-90`, and `--color-scrim` tokens (or a smaller opinionated set) so these components can drop the literals.
- **Partner-badge assets** — Webflow Partner + Claude Partner Network artwork not delivered; footer uses bordered text boxes as placeholders (`TODO: assets partner-badges`).
- **Mobile nav / menu / modal designs** — no dedicated mobile designs provided; built functional with DS tokens. Flagged with `/* TODO: DS mobile */` in each component.

### Raised in Phase 1 (UI — Design System)
- **Adobe Fonts kit ID** — Acumin Pro `<link>` cannot be added to `BaseLayout.astro` until the kit is provisioned and the ID is provided. Kit must also whitelist localhost + Vercel preview + production domains. Placeholder HTML comment in place.
- ~~**Eyebrow specs**~~ — RESOLVED 2026-09-25 by project lead. Two variants shipped: `is-default` (15px Acumin 400, 10/16/8/16px padding, 0.5px `--color-gray` border, 3px radius, 0.96px tracking, two 10×10 decorative squares on outer edges) and `is-accent` (same box but `--color-accent` border, 8% accent tint bg, 600 weight, no squares). Implemented in `src/components/ui/Eyebrow.astro`; TODO marker removed.
- **Tag specs** — §9 flags this. Placeholder implemented in `src/components/ui/Tag.astro` (pill: `c-text_xs`, radius 999px, 0.35em/0.9em padding, 0.08em tracking). Marked `/* TODO: DS tag specs */`.
- **Section vertical spacing** — §8.1 uses `padding: 5rem 3rem` on `.c-container`. Confirm whether 5rem is the intended section rhythm or if a separate section token is needed. Marked `/* TODO: DS section vertical spacing */` in `utilities.css`.
- **Text color on dark / gradient backgrounds** — §4 assumes `--color-white`; needs confirmation for hero, CTA banner and any gradient-backed surfaces.
- **Sitemap `/dev/*` exclusion** — `/dev/styleguide` uses `<meta name="robots" content="noindex, nofollow">`. Once a sitemap integration is added (Phase 2+), exclude `/dev/*` from the generated sitemap as well.
