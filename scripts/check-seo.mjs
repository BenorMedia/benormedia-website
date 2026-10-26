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
  // New pages (content-pack), released 2026-10-07.
  '/webflow-migration': { expected: ['Service', 'FAQPage', 'BreadcrumbList'], keyword: 'wordpress to webflow migration' },
  '/b2b-saas-web-design': { expected: ['Service', 'FAQPage', 'BreadcrumbList'], keyword: 'b2b web design' },
  '/webflow-enterprise-agency': { expected: ['Service', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow enterprise agency' },
  '/guides/wordpress-to-webflow-migration': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'migrate wordpress to webflow' },
  '/guides/b2b-saas-website-pages': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'saas website' },
  '/guides/webflow-enterprise': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow enterprise' },
  // Service pages from docs/brief-next-pages.md (drafts until sign-off: built in previews only).
  '/website-redesign': { expected: ['Service', 'BreadcrumbList', 'FAQPage'], keyword: 'website redesign' },
  '/webflow-seo-agency': { expected: ['Service', 'BreadcrumbList', 'FAQPage'], keyword: 'webflow seo' },
  '/cybersecurity-web-design': { expected: ['Service', 'BreadcrumbList', 'FAQPage'], keyword: 'cybersecurity website design' },
  '/aeo-agency': { expected: ['Service', 'BreadcrumbList', 'FAQPage'], keyword: 'aeo geo b2b saas' },
  // docs/brief-headless-guide.md (drafts until sign-off: built in previews only).
  '/headless-cms-agency': { expected: ['Service', 'BreadcrumbList', 'FAQPage'], keyword: 'headless cms agency' },
  '/guides/webflow-vs-custom-code': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow vs custom code' },
  // Blog (content-drafts/blog/, docs/new-pages.md), released 2026-10-15.
  '/blog': { expected: ['CollectionPage', 'BreadcrumbList'], keyword: 'b2b saas blog' },
  '/guides': { expected: ['CollectionPage', 'BreadcrumbList'], keyword: 'webflow guides' },
  '/blog/import-wordpress-to-webflow': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'import wordpress webflow' },
  '/blog/website-launch-checklist': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'website launch checklist' },
  '/blog/is-webflow-good-for-seo': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow seo' },
  '/blog/cro-audit': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'cro audit' },
  '/blog/website-rfp-template': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'website rfp template' },
  '/blog/saas-pricing-page': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'saas pricing page' },
  '/blog/b2b-marketing-attribution': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'b2b marketing attribution' },
  '/blog/european-accessibility-act-saas': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'european accessibility act' },
  '/blog/schema-markup-ai-search': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'schema markup' },
  '/blog/zero-click-searches-b2b-saas': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'zero-click' },
  '/blog/b2b-case-study': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'case study' },
  '/blog/website-maintenance-checklist': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'website maintenance checklist' },
  '/blog/website-architecture-seo': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'website architecture' },
  '/blog/saas-homepage-design': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'saas homepage' },
  '/blog/webflow-salesforce-integration': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow salesforce integration' },
  '/blog/core-web-vitals-optimization': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'core web vitals' },
  '/blog/webflow-security-php2shell': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow security' },
  '/blog/webflow-export-code': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow' },
  '/blog/ai-seo-myths': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'ai seo myths' },
  '/blog/webflow-editor': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow editor' },
  '/blog/headless-cms-comparison': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'headless cms' },
  '/blog/webflow-mcp': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow mcp' },
  '/blog/webflow-devlink': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow devlink' },
  '/blog/webflow-redirects': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow redirects' },
  '/blog/trust-center': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'trust center' },
  '/blog/google-tag-gateway': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'google tag gateway' },
  '/blog/programmatic-seo-webflow': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'programmatic seo' },
  '/blog/how-to-rank-in-chatgpt': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'rank in chatgpt' },
  '/blog/optimize-for-ai-overviews': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'ai overviews' },
  '/blog/security-questionnaire': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'security questionnaire' },
  '/blog/astro-cms': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'astro' },
  '/blog/saas-technical-seo': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'saas technical seo' },
  '/blog/track-brand-mentions-in-chatgpt': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'brand mentions chatgpt' },
  '/blog/consent-mode-v2-webflow': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'consent mode v2' },
  '/blog/webflow-accessibility-checklist': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow accessibility checklist' },
  '/blog/webflow-price-increase': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow price increase' },
  '/blog/what-b2b-buyers-need-from-your-website': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'b2b software buyers website' },
  '/blog/ai-traffic-in-ga4': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'chatgpt traffic ga4' },
  '/blog/how-long-does-a-website-redesign-take': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'website redesign take' },
  '/blog/ai-crawlers-robots-txt': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'gptbot ai crawlers' },
  '/blog/do-you-need-an-llms-txt-file': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'llms.txt' },
  '/blog/headless-cms-seo': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'headless cms seo' },
  '/blog/website-redesign-seo-checklist': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'website redesign seo checklist' },
  '/blog/webflow-analytics': { expected: ['Article', 'FAQPage', 'BreadcrumbList'], keyword: 'webflow analytics' },
  // Author pages (src/lib/new-pages/authors.ts), 2026-10-08.
  '/authors/sergio-gancedo': { expected: ['ProfilePage', 'BreadcrumbList'], keyword: 'sergio gancedo' },
  '/authors/david-garay': { expected: ['ProfilePage', 'BreadcrumbList'], keyword: 'david garay' },
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

  check(title.length > 0 && title.length <= 61, 'title length 1-61', `title length ${title.length}, want 1-61`); // 61 for /headless-cms-agency (Sergio, 2026-10-12)
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
