# PR body — copy into GitHub UI

**Title:** `Phase 0 scaffold: Astro + TS strictest + Vercel adapter + @sanity/astro`
**Base:** `dev` ← **Compare:** `feat/phase0-scaffold`
**Open at:** https://github.com/BenorMedia/benormedia-website/pull/new/feat/phase0-scaffold

---

## Summary

Foundation for the BenorMedia site. Scope is exactly steps 2–3 of `docs/BUILD_PLAN.md` Phase 0 — subsequent Phase 0 work (Sanity project setup, Vercel linking, Adobe Fonts, CSS layers, primitives, styleguide) lands in follow-up PRs.

- **Astro 7** + **TypeScript `strictest`**, **pnpm 9.6.0**, **Node 22** (`.nvmrc`, `engines.node >= 22.12.0`)
- **`@astrojs/vercel`** adapter, `output: 'static'`, `imageService: true`
- **`@sanity/astro` + `@astrojs/react`**, Studio embedded at `/studio` with hash routing
- Sanity `apiVersion: '2026-09-25'`, `useCdn: false`, env via `loadEnv` from vite
- **Prettier + ESLint** (with `@typescript-eslint/parser` for `.ts` files)
- **`.gitattributes`** normalizes EOL to LF; marks `woff2/png/jpg/ico` as binary
- Empty `sanity/schemaTypes/index.ts` stub — Phase 2 fills it

## Verification

All four gates green on this branch:

| Check | Result |
|---|---|
| `pnpm astro check` | 0 errors / 0 warnings / 0 hints (7 files) |
| `pnpm build` | 2 pages in ~8s → `dist/index.html` + `dist/studio/index.html` |
| `pnpm lint` | 0 errors, 0 warnings |
| `pnpm dev` `/studio` | HTTP 200, 0 `MISSING_EXPORT` in dep-optimizer log, 0 broken imports in module graph |

### `pnpm build && pnpm preview` `/studio` result

- `pnpm build` PASS (8.34s, 2 pages, Vercel static adapter engaged)
- `pnpm preview` PASS — server clean, no error/warn/failed lines
- `GET /` → HTTP 200 · `GET /studio/` → HTTP 200 (9,400 B) · `GET /studio` (no trailing slash) → HTTP 200
- All Studio chunks fetched HTTP 200: `studio-component.CHBxdxgI.js`, `client.B-QcCzrk.js`, `lib.DJ6yAmnE.css` (174 KB), plus 9 dynamic imports (`react-dom`, `PerspectiveProvider`, `structureTool`, `PaneContainer`, etc.)
- `grep -r "sanity/package.json" dist/_astro/` → **0 hits** (Windows bug did NOT leak into the emitted bundles)
- `grep -r "MISSING_EXPORT" dist/_astro/` → **0 hits**
- Entry chunks scanned for `is not defined`, `Cannot read`, `SyntaxError` — **0 hits**

**Limit:** no real browser was opened. A final human check at `http://localhost:4321/studio/` (DevTools console clean, Studio boots to workspace `BenorMedia`, structureTool loads) remains the definitive gate before merge.

## Upstream fix TODO

`@sanity/astro@3.5.1`'s `sanity:module-dedupe` Vite plugin has a Windows path-strip bug: `.replace(/\/package\.json$/, '')` never matches on Windows because `require.resolve` returns backslashes. This aliases `sanity` → `sanity/package.json` (a JSON file), producing 333 `MISSING_EXPORT`s in dev.

**Local workaround shipped in this PR:** `benorSanityAliasFix` Vite plugin in `astro.config.mjs` (`enforce: 'pre'`, plus `resolveId` + `configResolved` defense-in-depth for both `sanity` and `styled-components`). Zero new dependencies.

**Upstream issue drafted at** `docs/handoffs/2026-09-25_orchestrator_sanity-astro-upstream-issue.md` — ready to file at github.com/sanity-io/sanity-astro. One-line fix: `/[\\/]package\.json$/`. Remove the workaround (grep anchor: `TODO: remove when @sanity/astro`) once a fixed release ships.

Full root-cause analysis and every attempted fix logged in `docs/handoffs/2026-09-25_astro_phase0-scaffold.md`.

## Your manual steps

The scaffold can't do these — need lead action:

1. **Sanity CORS** at https://sanity.io/manage → CORS origins:
   - Add `http://localhost:4321`
   - Add the exact `dev` branch Vercel preview URL (once this PR builds a preview)
   - Add the production domain (once known)
   - **Do NOT use `https://*.vercel.app`** — decided against wildcard preview origins (least-privilege; wildcard exposes Studio to any Vercel deploy)
2. **Vercel import** — link this repo in the Vercel dashboard, set:
   - Framework preset: Astro
   - Root directory: repo root
   - Node version: 22
   - Environment variables: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` (mirror what's in local `.env`)
   - Confirm `dev` branch is set as the staging branch; production branch is `main`
3. **Adobe Fonts kit whitelist** — add domains to the kit at fonts.adobe.com:
   - `localhost`
   - The `dev` Vercel preview URL
   - The production domain (once known)
4. **File the upstream issue** at github.com/sanity-io/sanity-astro using the draft in `docs/handoffs/2026-09-25_orchestrator_sanity-astro-upstream-issue.md`

## Files changed

24 files, +13,690 / −6. Bulk is `pnpm-lock.yaml` (~12.4k lines, normal for pnpm). Substantive changes:

- Scaffold: `package.json`, `tsconfig.json`, `astro.config.mjs`, `sanity.config.ts`, `sanity/schemaTypes/index.ts`, `src/env.d.ts`, `src/pages/index.astro`
- Tooling: `.prettierrc`, `eslint.config.js`, `.gitattributes`, `.nvmrc`, `.vscode/`
- Docs: `CLAUDE.md` (pnpm + lint gate), `docs/DECISIONS.md` (+10 decisions, +3 open questions), 3 new handoffs

## Test plan

- [ ] Vercel preview URL builds green
- [ ] Preview URL: `/` loads (default Astro landing page)
- [ ] Preview URL: `/studio` loads, DevTools console clean, Sanity Studio boots to workspace `BenorMedia`
- [ ] Sanity CORS origins added at sanity.io/manage (see manual steps §1)
- [ ] Vercel env vars set (see manual steps §2)
- [ ] Adobe Fonts kit domains added (see manual steps §3)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
