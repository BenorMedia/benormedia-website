# Handoff — sanity — phase0-scaffold

Date: 2026-09-25 · Branch: `feat/phase0-scaffold` · Status: PARTIAL (sanity-owned step 13 DONE; build/dev still fail on an env-loading bug in `astro.config.mjs` that is out of sanity's scope — needs @astro follow-up)

## What I did

Executed plan step 13 only — created the minimal Studio stub so `/studio` can boot.

Concrete work:
1. Created `sanity/schemaTypes/index.ts` exporting `schemaTypes: never[] = []` with a comment explaining that real schemas land in Phase 2 per `docs/SCHEMAS.md`.
2. Created `sanity.config.ts` at repo root. Contents match the plan brief:
   - Imports `defineConfig` from `sanity` and `structureTool` from `sanity/structure`.
   - `name: 'default'`, `title: 'BenorMedia'`, `basePath: '/studio'` (matches `studioBasePath` in `astro.config.mjs`).
   - `projectId` and `dataset` read from `import.meta.env.PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` — never hardcoded.
   - `plugins: [structureTool()]` only. No `visionTool` (deferred to Phase 2 per brief).
   - `schema: { types: schemaTypes }` importing from `./sanity/schemaTypes`.

Did NOT create `sanity/structure.ts`, any documents, any desk overrides, or any singleton guards — all deferred to Phase 2 per the brief.

## Files changed

Added:
- `C:\Users\asant\Documents\2025 Projects\Benor Media\BenorMedia\benormedia-website\sanity.config.ts`
- `C:\Users\asant\Documents\2025 Projects\Benor Media\BenorMedia\benormedia-website\sanity\schemaTypes\index.ts`
- `C:\Users\asant\Documents\2025 Projects\Benor Media\BenorMedia\benormedia-website\docs\handoffs\2026-09-25_sanity_phase0-scaffold.md` (this file)

Unchanged (protected — not touched):
- `.claude/**`, `docs/**` (except this handoff), `CLAUDE.md`, `.env`, `.env.example`, `public/fonts/**`
- `astro.config.mjs`, `package.json`, `tsconfig.json` (all astro-agent territory)
- Everything under `src/` (astro/ui territory)

## Checks

Working directory: `C:\Users\asant\Documents\2025 Projects\Benor Media\BenorMedia\benormedia-website`.

- [x] `pnpm astro check` — PASS
  ```
  Result (7 files):
  - 0 errors
  - 0 warnings
  - 0 hints
  ```
- [ ] `pnpm build` — FAIL (NOT on my scope). My stub unblocked the previous error (`Sanity Studio requires a sanity.config.ts|js file`). The build now advances all the way through Vite bundling and only fails at prerender-time with:
  ```
  [ERROR] Error: Configuration must contain `projectId`
    at initConfig (@sanity/client/dist/index.node.js:129:50)
    ...
    at .vercel/output/server/.prerender/chunks/compiler_D54gztW6.mjs:36:20
  [ERROR] [build] Caught error rendering /studio: Error: Configuration must contain `projectId`
  ```
  Root cause: in `astro.config.mjs`, the `sanity({...})` integration is called with `projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID` and `dataset: import.meta.env.PUBLIC_SANITY_DATASET`. In Astro's config file (loaded by Node before Vite is set up), `import.meta.env` does NOT auto-populate from `.env` — those values resolve to `undefined`. Inspecting the generated SSR chunk confirms it:
  ```js
  // .vercel/output/server/.prerender/chunks/compiler_D54gztW6.mjs
  var sanityClient = createClient({
      "apiVersion": "2026-09-25",
      "projectId": void 0,
      "dataset": void 0,
      "useCdn": false
  });
  ```
  The `void 0`s prove the astro.config.mjs never received the env values. Fix belongs in `astro.config.mjs` (astro agent's file), not in `sanity.config.ts`. Suggested fix for the astro agent: use Vite's `loadEnv` at the top of `astro.config.mjs`:
  ```js
  import { loadEnv } from 'vite';
  const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } =
    loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
  ```
  then reference the destructured constants inside `sanity({ ... })`. This is the standard Astro pattern for reading `.env` inside `astro.config.mjs`.
- [ ] `pnpm dev` — Same underlying failure. Server starts and reports `astro v7.3.5 ready in 1538 ms`, but every request (both `/` and `/studio`, both `/studio/`) returns HTTP 500 with the same `Configuration must contain projectId` traceback. Sample:
  ```
  GET /         -> 500
  GET /studio   -> 500
  GET /studio/  -> 500
  ```
  Dev server was stopped cleanly after verification.
- [ ] Visual checks at 1440 / 991 / 767 / 375 — N/A, no components yet.

Note: my `sanity.config.ts` uses the same `import.meta.env.PUBLIC_SANITY_*` pattern the plan brief specified. That pattern is correct FOR `sanity.config.ts` (which is bundled by Vite for the Studio browser bundle), but it will only be exercised after `astro.config.mjs` correctly hands live projectId/dataset values to the integration. Once the astro agent lands the `loadEnv` fix, no change is needed here.

## Requests for other agents

- **@astro (urgent, blocks Phase 0 close):** Fix env loading in `astro.config.mjs`. Use `loadEnv` from `vite` at the top of the file and pass the resolved `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` constants into the `sanity({ ... })` integration. After the fix, `pnpm build` should produce `dist/index.html` + `dist/studio/index.html` and both routes should return 200 in dev.
- **@sanity (self, Phase 2 — do NOT do now):**
  - Add real schemas per `docs/SCHEMAS.md` (documents/objects/singletons).
  - Add `visionTool` alongside `structureTool` in `plugins`.
  - Create `sanity/structure.ts` with the custom desk (singletons pinned at top, non-creatable/non-deletable) and wire it via `structureTool({ structure })`.
  - Add document actions to enforce singleton non-duplication + non-deletion.
  - Update `docs/SCHEMAS.md` first with any schema deltas, get lead approval, then implement.
- **@ui:** No action.

## Open questions for the project lead

- **Sanity CORS still needs configuration at https://sanity.io/manage** — restating what @astro already flagged: add both `http://localhost:4321` and `https://*.vercel.app` as allowed CORS origins for the project. This is not something a subagent can do (no automation and no admin credentials here). Blocks `/studio` from actually authenticating even once the env fix lands.
- Production domain still TBD (needed for the Sanity CORS allow-list and Adobe Fonts kit).

## TODO markers added

- None in code.
- Documentation TODOs are enumerated under "Requests for other agents" and "Open questions" above.
