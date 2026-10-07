#!/usr/bin/env node
// Checks the content files for the new pages. Dependency-free (Node 18 or newer).
//   node scripts/check-content.mjs content/webflow-migration.md            one page
//   node scripts/check-content.mjs content/                                 every page, plus cross-page checks
//   node scripts/check-content.mjs --release content/<slug>.md              release gate: also fails on draft, open markers, blockedBy, stale volatile facts
//   node scripts/check-content.mjs --release --ignore-draft <file>          the same, ignoring the draft flag (used to test a page with all defaults applied)
// Options: --quiet (summary only)  --json (machine-readable)  --root <dir> (pack root; default: the folder above scripts/)
// Exit code: 0 no failures, 1 failures, 2 usage.
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyze, crossCheck, loadKnown, loadKeywordSet, TYPES } from './lib/check.mjs';

const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const release = flag('--release');
const ignoreDraft = flag('--ignore-draft');
const quiet = flag('--quiet');
const asJson = flag('--json');
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(opt('--root') || join(here, '..'));
const skipVals = new Set(['--root', opt('--root')]);
const targets = argv.filter((a) => !a.startsWith('--') && !skipVals.has(a));
if (targets.length === 0) {
  console.error('usage: node scripts/check-content.mjs [--release] [--ignore-draft] [--quiet] [--json] [--root <dir>] <file-or-folder> ...');
  process.exit(2);
}

const files = [];
for (const t of targets) {
  if (!existsSync(t)) { console.error(`not found: ${t}`); process.exit(2); }
  if (statSync(t).isDirectory()) {
    for (const f of readdirSync(t).sort()) if (f.endsWith('.md')) files.push(join(t, f));
  } else files.push(t);
}

const contentDir = existsSync(join(root, 'content')) ? join(root, 'content') : dirname(files[0]);
const known = loadKnown(contentDir);
for (const f of files) { // files outside the content dir still count as known
  const slug = basename(f, '.md');
  if (!known.has(slug)) known.set(slug, { url: undefined, file: f });
}
const keywords = loadKeywordSet(root);
const today = process.env.CHECK_TODAY || new Date().toISOString().slice(0, 10);
const ctx = { release, ignoreDraft, known, keywords, today };

const results = files.map((f) => analyze(f, ctx));
const cross = files.length > 1 ? crossCheck(results) : [];

let fails = 0, warns = 0, markers = 0;
if (asJson) {
  console.log(JSON.stringify({ results: results.map((r) => ({ file: r.file, slug: r.slug, words: r.words, markers: r.markers, issues: r.issues })), cross }, null, 1));
}
for (const r of results) {
  const f = r.issues.filter((i) => i.level === 'FAIL');
  const w = r.issues.filter((i) => i.level === 'warn');
  fails += f.length; warns += w.length; markers += r.markers.length;
  if (asJson) continue;
  const range = TYPES[r.data?.pageType]?.words;
  console.log(`\n${r.file}`);
  if (!quiet) {
    for (const i of [...f, ...w].sort((a, b) => (a.level === b.level ? a.line - b.line : a.level === 'FAIL' ? -1 : 1))) {
      console.log(`  ${i.level === 'FAIL' ? 'FAIL' : 'warn'}  L${i.line}  [${i.code}] ${i.msg}`);
    }
  }
  const ids = [...new Set(r.markers.map((m) => m.id || '?'))];
  console.log(`  ${f.length} fail, ${w.length} warn | ${r.words} words${range ? ` (range ${range[0]} to ${range[1]})` : ''} | ${r.h2 ?? 0} H2 (${r.qh2 ?? 0} questions) | avg sentence ${r.avgSentence ? r.avgSentence.toFixed(1) : '-'} | ${r.markers.length} markers${ids.length ? ': ' + ids.join(', ') : ''} | draft: ${r.data?.draft}`);
}
if (!asJson && cross.length) {
  console.log('\ncross-page checks');
  for (const c of cross) { console.log(`  ${c.level === 'FAIL' ? 'FAIL' : 'warn'}  [${c.code}] ${c.msg}`); if (c.level === 'FAIL') fails++; else warns++; }
} else for (const c of cross) if (c.level === 'FAIL') fails++; else warns++;

if (!asJson) {
  console.log(`\nsummary: ${files.length} file(s), ${fails} fail, ${warns} warn, ${markers} open marker(s)${release ? ' [release mode]' : ' [preview mode: markers and draft are expected until sign-off]'}`);
  console.log(fails === 0 ? 'result: ok' : `result: ${fails} failure(s)`);
}
process.exit(fails === 0 ? 0 : 1);
