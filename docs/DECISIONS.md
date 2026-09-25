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

## Pending
| Topic | Status |
|---|---|
| Forms: Vercel endpoint → Make webhook | Waiting CEO confirmation |
| Figma Dev seat → MCP QA of DESIGN_SYSTEM | Requested |

## Open questions
- See `DESIGN_SYSTEM.md` §9.
- Animation spec per section.
- Final copy (many placeholders in design).
