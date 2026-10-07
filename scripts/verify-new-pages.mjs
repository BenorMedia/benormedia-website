#!/usr/bin/env node
/**
 * pages:verify (BUILD-BRIEF 5.1, 10.2): builds the three views of the new
 * pages, each into its own folder, and runs check-new-pages.mjs on each.
 *
 *   defaults    VERCEL_ENV=preview PAGES_VIEW=defaults  → dist-np-defaults
 *   review      VERCEL_ENV=preview PAGES_VIEW=review    → dist-np-review
 *   production  VERCEL_ENV=production                   → dist-np-production
 *
 * The static site is `dist/client` (Vercel adapter); it is moved after each
 * build to `$NP_VERIFY_DIR/dist-np-<view>` (default: the system temp folder,
 * `<tmp>/benormedia-np-verify`), outside the repo so `astro check` and eslint
 * never scan the built bundles. Exits non-zero if any view fails. Arguments: view names to run a
 * subset, e.g. `pnpm run pages:verify defaults`.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const OUT_DIR = resolve(process.env.NP_VERIFY_DIR || join(tmpdir(), 'benormedia-np-verify'));
const SITE_URL = 'https://www.benormedia.com';
const VIEWS = {
  defaults: { VERCEL_ENV: 'preview', PUBLIC_SITE_ENV: 'preview', PAGES_VIEW: 'defaults' },
  review: { VERCEL_ENV: 'preview', PUBLIC_SITE_ENV: 'preview', PAGES_VIEW: 'review' },
  production: { VERCEL_ENV: 'production', PUBLIC_SITE_ENV: 'production' },
};
const wanted = process.argv.slice(2).filter((a) => a in VIEWS);
const views = wanted.length ? wanted : Object.keys(VIEWS);

const summary = [];
let failed = false;
for (const view of views) {
  const out = join(OUT_DIR, `dist-np-${view}`);
  console.log(`\n=== ${view}: building`);
  const env = { ...process.env, PUBLIC_SITE_URL: SITE_URL, PAGES_INCLUDE_DRAFTS: '', ...VIEWS[view] };
  const build = spawnSync('pnpm', ['run', 'build'], { cwd: ROOT, env, encoding: 'utf8' });
  if (build.status !== 0) {
    console.log(`${build.stdout}\n${build.stderr}`.split('\n').filter((l) => /error|FAIL|new-pages/i.test(l)).join('\n'));
    summary.push(`${view}: BUILD FAILED`);
    failed = true;
    continue;
  }
  rmSync(out, { recursive: true, force: true });
  if (!existsSync(join(ROOT, 'dist/client'))) throw new Error('dist/client not found after the build');
  mkdirSync(OUT_DIR, { recursive: true });
  cpSync(join(ROOT, 'dist/client'), out, { recursive: true });
  const check = spawnSync(process.execPath, [join(ROOT, 'scripts/check-new-pages.mjs'), out, '--view', view], { cwd: ROOT, encoding: 'utf8' });
  process.stdout.write(check.stdout);
  if (check.stderr) process.stderr.write(check.stderr);
  summary.push(`${view}: ${check.stdout.split('\n')[0]}`);
  if (check.status !== 0) failed = true;
}
console.log(`\n=== summary (folders in ${OUT_DIR})\n${summary.join('\n')}`);
process.exit(failed ? 1 : 0);
