// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
// @ts-ignore -- @types/node not installed; `node:module` is stdlib
import { createRequire } from 'node:module';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import { sitemapInfo } from './src/lib/new-pages/registry.mjs';

/** @type {{ env: { NODE_ENV?: string }, cwd(): string, argv: string[] }} */
const proc = /** @type {any} */ (globalThis).process;

// `astro dev` vs every other command (build, check, preview). They get
// separate Vite caches (see `vite.cacheDir`).
const isDevServer = proc.argv.includes('dev');

const env = loadEnv(proc.env.NODE_ENV ?? 'development', proc.cwd(), '');
const projectId = env['PUBLIC_SANITY_PROJECT_ID'] ?? '';
const dataset = env['PUBLIC_SANITY_DATASET'] ?? '';
// Production URL (e.g. https://benor.media). Unset until the domain is
// confirmed; Seo then omits canonical/og:url instead of emitting localhost.
const siteUrl = env['PUBLIC_SITE_URL'] || undefined;

const require = createRequire(import.meta.url);
const sanityEntry = require.resolve('sanity');
// `sanity/structure` is aliased the same way: as a bare id in
// `optimizeDeps.include` Vite resolved it to this repo's own
// `sanity/structure.ts` (the desk structure, same path under the project
// root) and pre-bundled that file, so `structureTool` was missing and the
// Studio failed to hydrate (2026-09-30).
const sanityStructureEntry = require.resolve('sanity/structure');
const styledComponentsEntry = require.resolve('styled-components');

// TODO: remove when @sanity/astro fixes Windows path-strip in sanity:module-dedupe (see handoff 2026-09-25).
const benorSanityAliasFix = {
  name: 'benor-sanity-alias-fix',
  enforce: /** @type {'pre'} */ ('pre'),
  config() {
    return {
      resolve: {
        alias: [
          { find: /^sanity$/, replacement: sanityEntry },
          { find: /^sanity\/structure$/, replacement: sanityStructureEntry },
          { find: /^styled-components$/, replacement: styledComponentsEntry },
        ],
      },
    };
  },
  /**
   * `@sanity/astro@3.5.1` registers Vite aliases like
   *   `sanity            -> <resolved>/package.json`
   *   `styled-components -> <resolved>/package.json`
   * on Windows because its dedupe plugin uses `.replace(/\/package\.json$/, '')` (POSIX
   * slashes only). Vite processes alias arrays first-match-wins, and Astro appends our
   * user-plugin alias AFTER Sanity's — so a plain `resolve.alias` from `config()` loses.
   * Intercept both the bare specifier AND the aliased-to-package.json id here with
   * `enforce: 'pre'` to pre-empt alias resolution at Vite `resolveId` time (dev-server
   * transform + dep optimizer).
   */
  resolveId(/** @type {string} */ id) {
    if (id === 'sanity') return sanityEntry;
    if (id === 'sanity/structure') return sanityStructureEntry;
    if (id === 'styled-components') return styledComponentsEntry;
    if (typeof id === 'string' && /[\\/]sanity[\\/]package\.json$/.test(id)) {
      return sanityEntry;
    }
    if (typeof id === 'string' && /[\\/]styled-components[\\/]package\.json$/.test(id)) {
      return styledComponentsEntry;
    }
    return null;
  },
  configResolved(/** @type {any} */ resolved) {
    /**
     * @param {any} aliases
     * @param {string} pkg
     * @param {string} entry
     */
    const patchOne = (aliases, pkg, entry) => {
      if (!Array.isArray(aliases)) return;
      const escaped = pkg.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const wantedSrc = '^' + escaped + '$';
      for (let i = aliases.length - 1; i >= 0; i--) {
        const a = aliases[i];
        const find = a?.find;
        const rep = typeof a?.replacement === 'string' ? a.replacement : '';
        const findSrc =
          find instanceof RegExp ? find.source : typeof find === 'string' ? find : '';
        const isMatch = findSrc === wantedSrc || findSrc === pkg;
        const looksBroken = /package\.json$/.test(rep);
        if (isMatch && (looksBroken || rep !== entry)) {
          aliases.splice(i, 1);
        }
      }
      aliases.unshift({ find: new RegExp(wantedSrc), replacement: entry });
    };
    /** @param {any} aliases */
    const patch = (aliases) => {
      patchOne(aliases, 'sanity', sanityEntry);
      patchOne(aliases, 'sanity/structure', sanityStructureEntry);
      patchOne(aliases, 'styled-components', styledComponentsEntry);
    };
    patch(resolved.resolve?.alias);
    const envs = resolved.environments;
    if (envs && typeof envs === 'object') {
      for (const name of Object.keys(envs)) {
        patch(envs[name]?.resolve?.alias);
      }
    }
  },
};

// Sitemap <lastmod> per page (SEO quick changes, lead 2026-10-06). Real
// dates only, never the build date (Google ignores an inaccurate lastmod):
// seeded from `git log -1 --format=%cs` on each page's source files.
// Update the date when a page's content changes.
/** @type {Record<string, string>} */
const LASTMOD = {
  '/': '2026-10-06',
  '/custom-websites-migrations': '2026-10-06',
  '/growth': '2026-10-06',
  '/ongoing-website-support': '2026-10-06',
  '/pricing': '2026-10-06',
  '/work': '2026-10-06',
  '/privacy-policy': '2026-10-05',
  '/terms-conditions': '2026-10-05',
  '/authors/sergio-gancedo': '2026-10-08',
};

// New pages (content-pack/content/*.md, docs/new-pages.md): draft pages stay
// out of the sitemap (they are built in previews only); released pages take
// `lastmod` from their front matter `updatedAt`, so nobody edits LASTMOD.
const NEW_PAGES = sitemapInfo();

// https://astro.build/config
export default defineConfig({
  ...(siteUrl ? { site: siteUrl } : {}),
  output: 'static',
  // No trailing slashes site-wide (lead, 2026-09-29). The Vercel adapter turns
  // this into `trailingSlash: false` routes (308 `/work/` → `/work`); it also
  // forces `build.format: 'directory'`, so `Astro.url.pathname` still ends in
  // `/` at build time: Seo strips it for canonical / og:url.
  trailingSlash: 'never',
  adapter: vercel({ imageService: true }),
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2026-09-25',
      useCdn: false,
      studioBasePath: '/studio',
    }),
    react(),
    // Needs `site` (PUBLIC_SITE_URL): skipped with a warning until the
    // production domain is set. Dev pages, Studio and the 404 are left out,
    // and so are the noindex pages: /cookie-policy (placeholder) and
    // /testimonials while testimonials are off (lead 2026-09-30; drop them
    // from this list when they go live). Privacy Policy + Terms are
    // indexable since 2026-10-05, so they are listed.
    sitemap({
      filter: (page) =>
        !/\/(dev|studio)(\/|$)|\/404$|^\/(cookie-policy|testimonials)\/?$/.test(
          new URL(page).pathname,
        ) && !NEW_PAGES.draftPaths.has(new URL(page).pathname.replace(/\/$/, '')),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const lastmod = LASTMOD[path] ?? NEW_PAGES.lastmod[path];
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [benorSanityAliasFix],
    // Studio "Failed to fetch dynamically imported module …/.vite/deps/…"
    // (2026-09-25, again 2026-09-30). Two causes, both fixed here:
    //  1. `astro build` / `check` re-optimized deps into the SAME cache as a
    //     running `astro dev` ("Re-optimizing dependencies because vite
    //     config has changed"), deleting the chunks an open Studio was using.
    //     Non-dev commands now use their own cache dir.
    //  2. Deps found only at runtime (the whole `sanity` package when /studio
    //     opens, the Clients drag-and-drop list, gsap / matter-js on the site)
    //     made `astro dev` re-optimize mid-session, change the chunk hashes
    //     and reload, so in-flight dynamic imports in the Studio failed. They
    //     are pre-bundled at server start instead. Dev only; builds are
    //     unaffected.
    cacheDir: isDevServer ? 'node_modules/.vite' : 'node_modules/.vite-build',
    optimizeDeps: {
      include: [
        // Studio (sanity.config.ts, sanity/)
        'sanity',
        // Aliased to the package file (see `sanityStructureEntry` above).
        'sanity/structure',
        '@sanity/table',
        'styled-components',
        // Studio → Clients (drag-and-drop list)
        '@sanity/orderable-document-list',
        'lexorank',
        '@sanity/orderable-document-list > @hello-pangea/dnd',
        '@sanity/orderable-document-list > sanity-plugin-utils',
        // Site animations
        'gsap',
        'gsap/ScrollTrigger',
        'matter-js',
      ],
    },
  },
});
