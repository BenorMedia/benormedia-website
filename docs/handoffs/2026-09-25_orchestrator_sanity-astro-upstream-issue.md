# Upstream issue draft — sanity-io/sanity-astro

Ready to file at https://github.com/sanity-io/sanity-astro/issues/new. Lead files, not the agent.

---

## Title

`sanity:module-dedupe` alias broken on Windows — regex only strips forward-slash `/package.json`

## Labels (suggest)

`bug`, `windows`, `dev-server`

## Environment

- `@sanity/astro` `3.5.1`
- `astro` `7.3.5`
- `vite` `8.3.1` (rolldown `1.2.11`)
- `sanity` `6.16.0`
- `pnpm` `9.6.0`
- Node `22.x`
- Windows 11 (any Windows host, path separator `\`)

## Summary

On Windows, embedded Studio (`/studio`) fails to render in `astro dev` with **333 `[MISSING_EXPORT]` errors** from Vite's dep optimizer. The build (`astro build`) works because the buggy plugin is `apply: 'serve'` only, but local dev is unusable.

## Root cause

`packages/sanity-astro/src/module-dedupe.ts` (compiled to `dist/sanity-astro.mjs` around line 1273–1280) computes an alias for the bare `sanity` specifier at Vite `config()` time. Simplified:

```js
function resolvePkgDir(rootDir, packageName) {
  return createRequire(path.join(rootDir, 'package.json'))
    .resolve(`${packageName}/package.json`)
    .replace(/\/package\.json$/, '');
}

const sanityDir = resolvePkgDir(root, 'sanity');
if (sanityDir) aliases.push({ find: /^sanity$/, replacement: sanityDir });
```

The regex `/\/package\.json$/` only matches forward slashes. On Windows, `require.resolve('sanity/package.json')` returns a path like:

```
C:\Users\...\node_modules\...\sanity\package.json
```

The strip is a **no-op**. The resulting alias points `sanity` at the `package.json` file itself, not the package directory.

## Reproduction

```powershell
pnpm create astro@latest repro -- --template minimal --typescript strict --no-git --yes
cd repro
pnpm dlx astro add react --yes
pnpm dlx astro add @sanity/astro --yes
# minimal sanity.config.ts with basePath: '/studio', empty schemaTypes
pnpm dev
# browse http://localhost:4321/studio → 333 MISSING_EXPORT in the dev-server log
```

Verified in Node inside the repo root:

```
> require.resolve('sanity/package.json')
'C:\\...\\node_modules\\...\\sanity\\package.json'
> '<that>'.replace(/\/package\.json$/, '')
'C:\\...\\node_modules\\...\\sanity\\package.json'   // unchanged
```

## Consequences

1. Every `import ... from 'sanity'` in the Studio client bundle (notably `@sanity/astro`'s own `src/studio/studio-component.tsx`: `import { Studio } from 'sanity'`, and inside `sanity/lib/structure.js`: `import { CommandList, ContextMenuButton, ... } from 'sanity'`) is rewritten to import from the file `.../sanity/package.json`.
2. Vite serves `package.json` as JSON-as-ESM — a module whose only exports are `name`, `version`, `description`, etc.
3. Vite/rolldown's dep optimizer sees the (broken-alias) imports of ~333 names from `sanity/package.json` and errors with 333 `[MISSING_EXPORT]` diagnostics.
4. Even with `optimizeDeps.exclude: ['sanity']` to silence the log, `Studio` binds to `undefined` at runtime in the browser.

`styled-components` is affected by the same bug in the same plugin (~200 additional `MISSING_EXPORT`s if you fix only `sanity`).

## Suggested fix

One-line regex change to accept either separator:

```diff
-    .replace(/\/package\.json$/, '');
+    .replace(/[\\/]package\.json$/, '');
```

Or use `path.dirname`:

```diff
-  return createRequire(path.join(rootDir, 'package.json'))
-    .resolve(`${packageName}/package.json`)
-    .replace(/\/package\.json$/, '');
+  return path.dirname(
+    createRequire(path.join(rootDir, 'package.json'))
+      .resolve(`${packageName}/package.json`)
+  );
```

## Local workaround (for anyone else hitting this)

Add a Vite plugin in `astro.config.mjs` with `enforce: 'pre'` that pre-registers `{ find: /^sanity$/, replacement: require.resolve('sanity') }` and same for `styled-components`, plus a `configResolved` hook to strip and prepend across the top-level and per-environment `resolve.alias` arrays (a plain `config()` alias does not win first-match against the integration's plugin under Astro 7 + Vite 8). Working implementation lives in the reporter's repo under `astro.config.mjs` behind the anchor comment `TODO: remove when @sanity/astro fixes Windows path-strip in sanity:module-dedupe`.

## Related

- rolldown issue [#10044](https://github.com/rolldown/rolldown/issues/10044) — related but not the same failure mode
- sanity-astro issue [#290](https://github.com/sanity-io/sanity-astro/issues/290) — build-time warnings, adjacent
