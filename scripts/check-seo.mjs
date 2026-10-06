#!/usr/bin/env node
// Dependency-free SEO/AEO checks for benormedia.com.
//   node scripts/check-seo.mjs dist                       built output (static)
//   node scripts/check-seo.mjs http://localhost:4321      running preview or dev server
//   node scripts/check-seo.mjs https://www.benormedia.com live site (run after deploy)
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const target = (process.argv[2] ?? 'dist').replace(/\/$/, '');
const isUrl = /^https?:\/\//.test(target);
const SITE = 'https://www.benormedia.com';

// expected = JSON-LD @types that must be present. keyword = words that must all appear in title + meta description.
const PAGES = {
  '/': { expected: ['Organization', 'WebSite'], keyword: 'webflow agency' },
  '/custom-websites-migrations': { expected: ['Service', 'BreadcrumbList', 'FAQPage'], keyword: 'webflow development agency' },
  '/growth': { expected: ['Service', 'BreadcrumbList'], keyword: 'b2b saas seo agency' },
  '/ongoing-website-support': { expected: ['Service', 'BreadcrumbList'], keyword: 'webflow maintenance service' },
  '/pricing': { expected: ['FAQPage'], keyword: null },
  '/work': { expected: [], keyword: null },
};
const NOINDEX_PAGES = ['/testimonials', '/cookie-policy']; // must stay out of the sitemap

let failures = 0;
const ok = (m) => console.log(`  ok    ${m}`);
const bad = (m) => { failures++; console.log(`  FAIL  ${m}`); };
const check = (cond, pass, fail) => (cond ? ok(pass) : bad(fail));

async function read(path) {
  if (isUrl) {
    const res = await fetch(target + path, { redirect: 'follow' });
    return res.ok ? await res.text() : null;
  }
  const candidates = path === '/' ? ['index.html'] : [`${path.slice(1)}/index.html`, `${path.slice(1)}.html`, path.slice(1)];
  for (const c of candidates) {
    try { return await readFile(join(target, c), 'utf8'); } catch { /* try next */ }
  }
  return null;
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const strip = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function jsonLdTypes(html) {
  const types = [];
  let parseErrors = 0;
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (n) => {
        if (Array.isArray(n)) return n.forEach(walk);
        if (n && typeof n === 'object') {
          if (n['@type']) types.push(...[].concat(n['@type']));
          if (n['@graph']) walk(n['@graph']);
        }
      };
      walk(JSON.parse(m[1]));
    } catch { parseErrors++; }
  }
  return { types, parseErrors };
}

for (const [path, rule] of Object.entries(PAGES)) {
  console.log(`\n${path}`);
  const html = await read(path);
  if (!html) { bad('page not found'); continue; }

  const title = strip((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? [, ''])[1]);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]));
  const meta = decode((html.match(/<meta[^>]+name=["']description["'][^>]*content="([^"]*)"/i) ?? html.match(/<meta[^>]+content="([^"]*)"[^>]*name=["']description["']/i) ?? [, ''])[1]);
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ?? [, ''])[1];
  const { types, parseErrors } = jsonLdTypes(html);

  console.log(`  title : ${title} (${title.length})`);
  console.log(`  h1    : ${h1s.join(' || ')}`);
  console.log(`  meta  : ${meta} (${meta.length})`);
  console.log(`  types : ${[...new Set(types)].join(', ') || '(none)'}`);

  check(title.length > 0 && title.length <= 60, 'title length 1-60', `title length ${title.length}, want 1-60`);
  check(h1s.length === 1, 'exactly one h1', `${h1s.length} h1 elements, want exactly 1`);
  check(meta.length >= 70 && meta.length <= 160, 'meta description 70-160 chars', `meta description ${meta.length} chars, want 70-160`);
  check(canonical.startsWith(SITE), `canonical ${canonical}`, `canonical missing or not on ${SITE}`);
  check(parseErrors === 0, 'all JSON-LD blocks parse', `${parseErrors} JSON-LD block(s) fail to parse`);
  for (const t of rule.expected) check(types.includes(t), `JSON-LD has ${t}`, `JSON-LD missing ${t}`);
  check(!/lorem ipsum/i.test(html), 'no Lorem ipsum', 'Lorem ipsum found in HTML');
  // H1s are brand taglines (lead 2026-10-06), so keywords are checked in title + meta.
  if (rule.keyword) {
    const hay = `${title} ${meta}`.toLowerCase();
    const missing = rule.keyword.split(' ').filter((w) => !hay.includes(w));
    check(missing.length === 0, `title+meta cover "${rule.keyword}"`, `title+meta miss: ${missing.join(', ')}`);
  }
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt\s*=/i.test(t));
  check(noAlt.length === 0, `all ${imgs.length} img tags have alt`, `${noAlt.length} of ${imgs.length} img tags have no alt attribute, for example: ${noAlt.slice(0, 2).map((t) => t.slice(0, 90)).join(' | ')}`);
}

console.log('\nsitemap');
const sm = (await read('/sitemap-0.xml')) ?? (await read('/sitemap.xml'));
if (!sm) bad('sitemap-0.xml not found');
else {
  const urls = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  const noLastmod = urls.filter((u) => !/<lastmod>/.test(u));
  check(urls.length > 0, `${urls.length} URLs listed`, 'no URLs in sitemap');
  check(noLastmod.length === 0, 'every URL has lastmod', `${noLastmod.length} URL(s) without lastmod`);
  const lm = new Set([...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].slice(0, 10)));
  check(lm.size > 1 || urls.length <= 1, `lastmod dates differ by page (${[...lm].join(', ')})`, 'every URL has the same lastmod date: use real per-page dates, not the build date');
  for (const p of NOINDEX_PAGES) check(!sm.includes(`${SITE}${p}`), `${p} not in sitemap`, `${p} (noindex) is in the sitemap`);
}

console.log('\nfiles');
const robots = await read('/robots.txt');
check(robots && /^sitemap:\s*https:\/\/www\.benormedia\.com\/sitemap-index\.xml/im.test(robots), 'robots.txt lists the sitemap', 'robots.txt has no Sitemap line for sitemap-index.xml');
const llms = await read('/llms.txt');
check(llms && llms.startsWith('# '), '/llms.txt present', '/llms.txt missing or does not start with "# "');
if (!isUrl) {
  const keyFiles = (await readdir(target)).filter((f) => /^[a-f0-9]{16,128}\.txt$/.test(f));
  if (keyFiles.length === 1) {
    const content = (await readFile(join(target, keyFiles[0]), 'utf8')).trim();
    check(content === keyFiles[0].replace('.txt', ''), `IndexNow key file ${keyFiles[0]} matches its name`, 'IndexNow key file content differs from its file name');
  } else bad(`IndexNow key file: found ${keyFiles.length}, want exactly 1`);
}

console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed');
process.exit(failures ? 1 : 0);
