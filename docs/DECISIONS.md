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
