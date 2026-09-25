// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
// @ts-ignore -- @types/node not installed; `node:module` is stdlib
import { createRequire } from 'node:module';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

/** @type {{ env: { NODE_ENV?: string }, cwd(): string }} */
const proc = /** @type {any} */ (globalThis).process;

const env = loadEnv(proc.env.NODE_ENV ?? 'development', proc.cwd(), '');
const projectId = env['PUBLIC_SANITY_PROJECT_ID'] ?? '';
const dataset = env['PUBLIC_SANITY_DATASET'] ?? '';

const require = createRequire(import.meta.url);
const sanityEntry = require.resolve('sanity');
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

// https://astro.build/config
export default defineConfig({
  output: 'static',
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
  ],
  vite: {
    plugins: [benorSanityAliasFix],
  },
});
