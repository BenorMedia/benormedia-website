#!/usr/bin/env node
/**
 * Output checks for the new pages (BUILD-BRIEF 10.2). Dependency-free.
 *
 *   node scripts/check-new-pages.mjs <dist> --view defaults|review|production
 *
 * <dist> is the static output folder (`dist/client` with the Vercel adapter).
 * Sources are read with the pack's own parser: `content-pack/content/<slug>.md`,
 * or `content-pack/defaulted/<slug>.md` in the defaults view. Checks every page
 * built in that view; exits non-zero on any failure and prints
 * `file  check#  text`. Docs: docs/new-pages.md.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { readContentFile } from '../content-pack/scripts/lib/frontmatter.mjs';
import { LIVE_PATHS } from '../content-pack/scripts/lib/check.mjs';

// Fixed chrome printed by reused live components inside <main>, which the
// fidelity check (4) accepts as is. Each entry names the component.
// - FaqAccordion: no text of its own (the +/× icon is an SVG).
// - Breadcrumbs: no text of its own (chevrons are SVGs).
// - Button / NpActions labels come from copy.json (section 8), not from here.
// - CtaActions (the Home hero's Trusted badge): the star before the text.
const LIVE_ALLOW = [
  '★', // CtaActions badge star (aria-hidden)
];

const SITE = 'https://www.benormedia.com';
const ROOT = resolve(process.cwd());
const PACK = join(ROOT, 'content-pack');
const FAMILY = { service: 'commercial', industry: 'commercial', regional: 'commercial', guide: 'article', comparison: 'article', 'data-study': 'article' };
const copy = JSON.parse(readFileSync(join(ROOT, 'src/lib/new-pages/copy.json'), 'utf8'));
const plan = JSON.parse(readFileSync(join(PACK, 'data/plan.json'), 'utf8')).pages;

const argv = process.argv.slice(2);
const dist = argv.find((a) => !a.startsWith('--') && a !== argv[argv.indexOf('--view') + 1]);
const view = argv[argv.indexOf('--view') + 1];
if (!dist || !['defaults', 'review', 'production'].includes(view) || argv.indexOf('--view') < 0) {
  console.error('usage: node scripts/check-new-pages.mjs <dist> --view defaults|review|production');
  process.exit(2);
}
const DIST = resolve(dist);

// --------------------------------------------------------------------------
// A small HTML parser: enough for Astro's output.
// --------------------------------------------------------------------------
const VOID = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
const RAW = new Set(['script', 'style']);

function parseAttrs(src) {
  const attrs = {};
  for (const m of src.matchAll(/([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

function parse(html) {
  const root = { tag: '#root', attrs: {}, children: [], parent: null };
  let cur = root;
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<(\/?)([a-zA-Z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)|</gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<!')) continue;
    if (m[4] !== undefined || m[0] === '<') {
      cur.children.push({ text: m[0], parent: cur });
      continue;
    }
    const tag = m[2].toLowerCase();
    if (m[1]) {
      let n = cur;
      while (n && n.tag !== tag) n = n.parent;
      if (n) cur = n.parent ?? root;
      continue;
    }
    const node = { tag, attrs: parseAttrs(m[3].replace(/\/\s*$/, '')), children: [], parent: cur };
    cur.children.push(node);
    if (RAW.has(tag)) {
      const end = html.toLowerCase().indexOf(`</${tag}`, re.lastIndex);
      node.raw = html.slice(re.lastIndex, end < 0 ? html.length : end);
      re.lastIndex = end < 0 ? html.length : html.indexOf('>', end) + 1;
      continue;
    }
    if (!VOID.has(tag) && !/\/\s*$/.test(m[3])) cur = node;
  }
  return root;
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', mdash: '—', ndash: '–', hellip: '…', times: '×' };
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENT[e.toLowerCase()] ?? all;
  });
}

const walk = (node, fn) => { for (const c of node.children ?? []) { if (fn(c) !== false && c.children) walk(c, fn); } };
const all = (node, pred) => { const out = []; walk(node, (n) => { if (n.tag && pred(n)) out.push(n); }); return out; };
const textOf = (node) => (node.text !== undefined ? decode(node.text) : RAW.has(node.tag) ? '' : (node.children ?? []).map(textOf).join(''));
const inside = (node, pred) => { for (let n = node.parent; n; n = n.parent) if (n.tag && pred(n)) return true; return false; };

// --------------------------------------------------------------------------
// Normalization (both sides)
// --------------------------------------------------------------------------
const norm = (s) =>
  decode(String(s ?? ''))
    .replace(/[‘’‛′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const stripMd = (s) =>
  s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/^\s*(?:[-*]|\d+\.)\s+/, '')
    .replace(/^Table:\s+/, '');

/** Body source blocks in order, from a line-based split (RULES.md section 8). */
function bodyBlocks(body) {
  const blocks = [];
  let para = [];
  const flush = () => { if (para.length) blocks.push({ src: 'p', text: norm(stripMd(para.join(' '))) }); para = []; };
  for (const line of body.split('\n')) {
    if (!line.trim()) { flush(); continue; }
    let m;
    if ((m = /^(#{2,3})\s+(.*)$/.exec(line))) { flush(); blocks.push({ src: m[1].length === 2 ? 'h2' : 'h3', text: norm(stripMd(m[2])) }); continue; }
    if (/^Table:\s+/.test(line) && !para.length) { blocks.push({ src: 'caption', text: norm(stripMd(line)) }); continue; }
    if (/^\s*\|/.test(line)) {
      flush();
      if (/^\s*\|?(\s*:?-+:?\s*\|)+\s*:?-*:?\s*$/.test(line)) continue;
      for (const c of line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|')) blocks.push({ src: 'cell', text: norm(stripMd(c.trim())) });
      continue;
    }
    if (/^\s*(?:[-*]|\d+\.)\s+/.test(line)) { flush(); blocks.push({ src: 'li', text: norm(stripMd(line)) }); continue; }
    if (/^\s{2,}\S/.test(line) && blocks.length && blocks[blocks.length - 1].src === 'li' && !para.length) {
      blocks[blocks.length - 1].text = norm(`${blocks[blocks.length - 1].text} ${stripMd(line)}`);
      continue;
    }
    para.push(line.trim());
  }
  flush();
  // Lead paragraphs: every block before the first h2.
  const firstH2 = blocks.findIndex((b) => b.src === 'h2');
  blocks.forEach((b, i) => { if (b.src === 'p' && (firstH2 < 0 || i < firstH2)) b.src = 'lead'; });
  return blocks.filter((b) => b.text);
}

// --------------------------------------------------------------------------
// Section 8 strings → matchers
// --------------------------------------------------------------------------
const flat = (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(flat) : v && typeof v === 'object' ? Object.entries(v).filter(([k]) => k !== '_note' && k !== 'href').flatMap(([, x]) => flat(x)) : []);
const COPY = flat(copy).map(norm);
const COPY_RE = COPY.map((s) => new RegExp(`^${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{\w+\\\}/g, '.+')}$`));
const isCopy = (t) => COPY_RE.some((re) => re.test(t));

// --------------------------------------------------------------------------
// The pages built in this view
// --------------------------------------------------------------------------
const failures = [];
let checked = 0;
const fail = (file, n, text) => failures.push(`${file}  check ${n}  ${String(text).slice(0, 220)}`);

const pack = readdirSync(join(PACK, 'content')).filter((f) => f.endsWith('.md')).sort().map((f) => {
  const r = readContentFile(readFileSync(join(PACK, 'content', f), 'utf8'));
  return { f, data: r.data };
});
const packBySlug = new Map(pack.map((p) => [p.data.slug, p.data]));
const htmlPath = (url) => join(DIST, url === '/' ? 'index.html' : `${url.slice(1)}/index.html`);
const existsUrl = (url) => {
  const clean = url.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
  if (LIVE_PATHS.has(clean)) return true;
  return existsSync(htmlPath(clean)) || existsSync(join(DIST, clean.slice(1)));
};

const built = [];
for (const { f, data } of pack) {
  const family = FAMILY[data.pageType];
  if (!family) continue;
  const draft = data.draft !== false;
  const isBuilt = view === 'production' ? !draft : true;
  const there = existsSync(htmlPath(data.url));
  if (view === 'production' && draft && there) fail(f, 0, `draft page is in the production build: ${data.url}`);
  if (isBuilt && !there) fail(f, 0, `page missing from the build: ${data.url}`);
  if (isBuilt && there) built.push({ f, family, draft });
}

for (const { f, family, draft } of built) {
  checked++;
  const srcFile = view === 'defaults' ? join(PACK, 'defaulted', f) : join(PACK, 'content', f);
  const { data: d, body } = readContentFile(readFileSync(srcFile, 'utf8'));
  const html = readFileSync(htmlPath(d.url), 'utf8');
  const doc = parse(html);
  const main = all(doc, (n) => n.tag === 'main')[0];
  if (!main) { fail(f, 0, 'no <main>'); continue; }
  const mainText = norm(textOf(main));
  const marker = /\[(FACT NEEDED|VERIFY|PERSON)\b/;
  // Commercial headings end in a period (lead 2026-10-07), added by the template.
  const head = (t) => (family === 'commercial' && t && !/[.?!]$/.test(t) ? `${t}.` : t);
  const hasGap = (s) => marker.test(String(s ?? ''));

  // 1. One h1, equal to the front matter.
  const h1s = all(main, (n) => n.tag === 'h1');
  if (h1s.length !== 1) fail(f, 1, `${h1s.length} <h1> elements`);
  else if (norm(textOf(h1s[0])) !== head(norm(d.h1))) fail(f, 1, `h1 "${norm(textOf(h1s[0]))}"`);

  // 2. Head.
  const title = norm(textOf(all(doc, (n) => n.tag === 'title')[0] ?? { children: [] }));
  const meta = (name) => all(doc, (n) => n.tag === 'meta' && n.attrs.name === name)[0]?.attrs.content;
  const canonical = all(doc, (n) => n.tag === 'link' && n.attrs.rel === 'canonical')[0]?.attrs.href;
  if (title !== norm(d.title)) fail(f, 2, `title "${title}"`);
  if (norm(meta('description')) !== norm(d.description)) fail(f, 2, `description "${meta('description')}"`);
  if (canonical !== `${SITE}${d.url}`) fail(f, 2, `canonical "${canonical}"`);
  const robots = meta('robots') ?? '';
  if (draft !== /noindex/.test(robots)) fail(f, 2, `robots "${robots}" on a ${draft ? 'draft' : 'released'} page`);

  // Units inside <main>.
  const srcEls = all(main, (n) => n.attrs['data-np-src'] !== undefined && !inside(n, (p) => p.attrs['data-np-src'] !== undefined));
  const units = srcEls.map((n) => ({ src: n.attrs['data-np-src'], text: norm(textOf(n)) }));
  const BODY_SRC = new Set(['lead', 'p', 'li', 'h2', 'h3', 'caption', 'th', 'td']);
  const bodyUnits = units.filter((u) => BODY_SRC.has(u.src)).map((u) => ({ src: u.src === 'th' || u.src === 'td' ? 'cell' : u.src, text: u.text }));

  const faq = (d.faq ?? []).filter((x) => x && x.q);
  const expectedOther = [
    ...(family === 'commercial' && d.eyebrow ? [{ src: 'eyebrow', text: norm(d.eyebrow) }] : []),
    { src: 'faqHeading', text: head(norm(d.faqHeading)) },
    ...faq.flatMap((x) => [{ src: 'faq.q', text: norm(x.q) }, { src: 'faq.a', text: norm(x.a) }]),
    ...(family === 'article' ? (d.takeaways ?? []).map((t) => ({ src: 'takeaway', text: norm(t) })) : []),
    ...(family === 'commercial' ? [{ src: 'closing.heading', text: head(norm(d.closing?.heading)) }, { src: 'closing.text', text: norm(d.closing?.text) }] : []),
  ];
  const sourceBody = bodyBlocks(body).map((b) => (b.src === 'h2' ? { ...b, text: head(b.text) } : b));
  // Sections the template renders with a live block (`data-np-live` +
  // `data-np-section`, e.g. Our Work): their own blocks are not printed.
  const replaced = new Set(all(main, (n) => n.attrs['data-np-section'] !== undefined).map((n) => head(norm(n.attrs['data-np-section']))));
  const printedBody = [];
  let skipping = false;
  for (const b of sourceBody) {
    if (b.src === 'h2') skipping = replaced.has(b.text);
    if (!skipping) printedBody.push(b);
  }

  if (view !== 'review') {
    // 3. Fidelity forward: every source block is one unit, body blocks in order.
    const seq = bodyUnits.map((u) => `${u.src}\u0000${u.text}`);
    const want = printedBody.map((b) => `${b.src}\u0000${b.text}`);
    for (let i = 0; i < Math.max(seq.length, want.length); i++) {
      if (seq[i] !== want[i]) {
        fail(f, 3, `body block ${i + 1}: expected [${(want[i] ?? 'nothing').replace('\u0000', '] ')} — got [${(seq[i] ?? 'nothing').replace('\u0000', '] ')}`);
        break;
      }
    }
    for (const e of expectedOther) {
      if (!units.some((u) => u.src === e.src && u.text === e.text)) fail(f, 3, `missing ${e.src}: "${e.text}"`);
    }

    // 4. Fidelity backward: every unit is a source block, section 8 copy, a visual's alt or brief, or live text.
    const allowed = new Set([
      head(norm(d.h1)),
      ...sourceBody.map((b) => b.text),
      ...expectedOther.map((e) => e.text),
      ...(d.visuals ?? []).flatMap((v) => [norm(v.alt), norm(v.brief)]),
      ...(d.breadcrumb ?? []).map((b) => norm(b.name)),
      ...(d.sources ?? []).map((s) => norm(s.label)),
      ...plan.map((p) => norm(p.label)),
      ...pack.map((p) => norm(p.data.h1)),
      ...LIVE_ALLOW.map(norm),
    ]);
    const ok = (t) => !t || allowed.has(t) || isCopy(t) || (t.endsWith(` ${copy.plannedSuffix}`) && ok(t.slice(0, -copy.plannedSuffix.length - 1)));
    for (const u of units) if (!ok(u.text)) fail(f, 4, `stray copy in data-np-src="${u.src}": "${u.text}"`);
    walk(main, (n) => {
      if (n.tag && (n.attrs['data-np-src'] !== undefined || n.attrs['data-np-live'] !== undefined || n.attrs.role === 'img' || RAW.has(n.tag))) {
        if (n.tag && n.attrs.role === 'img' && n.attrs['aria-label'] && !ok(norm(n.attrs['aria-label']))) fail(f, 4, `stray aria-label "${n.attrs['aria-label']}"`);
        return false;
      }
      if (n.tag) for (const a of ['alt', 'aria-label', 'title', 'placeholder']) if (n.attrs[a] && !ok(norm(n.attrs[a]))) fail(f, 4, `stray ${a}="${n.attrs[a]}"`);
      if (n.text !== undefined && !ok(norm(n.text))) fail(f, 4, `stray text: "${norm(n.text)}"`);
      return true;
    });
  }

  // 5. Headings.
  const heads = all(main, (n) => /^h[1-6]$/.test(n.tag));
  let prev = 0;
  for (const h of heads) {
    const lvl = Number(h.tag[1]);
    if (lvl > prev + 1) fail(f, 5, `heading level skips to ${h.tag}: "${norm(textOf(h))}"`);
    prev = lvl;
  }
  // H2s of live blocks (Services, a page-level Our Work) are not page copy;
  // a live block standing in for a section (`data-np-section`) keeps its H2.
  const liveOnly = (h) =>
    h.attrs['data-np-src'] === undefined &&
    inside(h, (p) => p.attrs['data-np-live'] !== undefined && p.attrs['data-np-section'] === undefined);
  const h2s = heads.filter((h) => h.tag === 'h2' && !liveOnly(h)).map((h) => norm(textOf(h)));
  const wantH2 = [
    ...sourceBody.filter((b) => b.src === 'h2').map((b) => b.text),
    head(norm(d.faqHeading)),
    family === 'commercial' ? head(norm(d.closing?.heading)) : norm(copy.articleClosing.heading),
    ...(family === 'article' ? [norm(copy.sourcesHeading)] : []),
  ];
  if (JSON.stringify([...h2s].sort()) !== JSON.stringify([...wantH2].sort())) {
    fail(f, 5, `h2 set differs: got ${JSON.stringify(h2s)}`);
  }
  const ids = all(doc, (n) => n.attrs.id !== undefined).map((n) => n.attrs.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) fail(f, 5, `duplicate ids: ${[...new Set(dup)].join(', ')}`);
  for (const a of all(main, (n) => n.tag === 'a' && /^#./.test(n.attrs.href ?? ''))) {
    if (!ids.includes(decodeURIComponent(a.attrs.href.slice(1)))) fail(f, 5, `anchor ${a.attrs.href} has no target`);
  }

  // 6. JSON-LD.
  const lds = [];
  for (const s of all(doc, (n) => n.tag === 'script' && n.attrs.type === 'application/ld+json')) {
    try { lds.push(JSON.parse(s.raw)); } catch { fail(f, 6, 'JSON-LD does not parse'); }
  }
  const ofType = (t) => lds.filter((x) => x['@type'] === t);
  const deepKeys = (o, out = new Set()) => { if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) { out.add(k); deepKeys(v, out); } return out; };
  for (const bad of ['offers', 'aggregateRating', 'review']) if (lds.some((x) => deepKeys(x).has(bad))) fail(f, 6, `JSON-LD has ${bad}`);
  const pageUrl = `${SITE}${d.url}`;
  if (family === 'commercial') {
    const s = ofType('Service')[0];
    if (!s) fail(f, 6, 'no Service');
    else {
      if (s['@id'] !== `${pageUrl}#service` || s.url !== pageUrl) fail(f, 6, `Service @id/url ${s['@id']}`);
      if (s.name !== d.service?.name || s.serviceType !== d.service?.serviceType) fail(f, 6, 'Service name/serviceType');
      if (s.description !== d.description) fail(f, 6, 'Service description');
      if (s.provider?.['@id'] !== `${SITE}/#organization`) fail(f, 6, 'Service provider');
      if ((s.areaServed ?? []).length !== 6) fail(f, 6, 'Service areaServed');
    }
    if (ofType('Article').length) fail(f, 6, 'Article on a commercial page');
  } else {
    const a = ofType('Article')[0];
    if (!a) fail(f, 6, 'no Article');
    else {
      if (a['@id'] !== `${pageUrl}#article` || a.headline !== d.h1 || a.datePublished !== String(d.publishedAt) || a.dateModified !== String(d.updatedAt) || a.inLanguage !== d.lang) {
        fail(f, 6, 'Article @id/headline/dates/inLanguage');
      }
      const author = String(d.author ?? '');
      const wantOrg = hasGap(author) || author === 'BenorMedia team';
      if (wantOrg ? a.author?.['@type'] !== 'Organization' : a.author?.['@type'] !== 'Person' || a.author?.name !== author.split(',')[0].trim()) {
        fail(f, 6, `Article author ${JSON.stringify(a.author)}`);
      }
    }
    if (ofType('Service').length) fail(f, 6, 'Service on an article');
  }
  const faqLd = ofType('FAQPage')[0];
  const visibleQ = all(main, (n) => n.attrs['data-np-src'] === 'faq.q').map((n) => norm(textOf(n)));
  const visibleA = all(main, (n) => n.attrs['data-np-src'] === 'faq.a').map((n) => norm(textOf(n)));
  const wantFaq = faq.filter((x) => view !== 'review' || (!hasGap(x.q) && !hasGap(x.a)));
  if ((faqLd?.mainEntity ?? []).length !== wantFaq.length) fail(f, 6, `FAQPage has ${(faqLd?.mainEntity ?? []).length} questions, expected ${wantFaq.length}`);
  for (const q of faqLd?.mainEntity ?? []) {
    const i = visibleQ.indexOf(norm(q.name));
    if (i < 0 || visibleA[i] !== norm(q.acceptedAnswer?.text)) fail(f, 6, `FAQPage item differs from the visible FAQ: "${q.name}"`);
  }
  for (const item of ofType('BreadcrumbList')[0]?.itemListElement ?? []) {
    const path = String(item.item).replace(SITE, '') || '/';
    if (!existsUrl(path)) fail(f, 6, `BreadcrumbList item does not resolve: ${item.item}`);
  }

  // 7. Links.
  const draftUrls = new Set(pack.filter((p) => p.data.draft !== false).map((p) => p.data.url));
  for (const a of all(main, (n) => n.tag === 'a')) {
    const href = a.attrs.href ?? '';
    if (href === '#' || href === '') fail(f, 7, `empty href "${href}"`);
    else if (href.startsWith('/')) {
      if (!existsUrl(href)) fail(f, 7, `internal link does not resolve: ${href}`);
      if (view === 'production' && draftUrls.has(href)) fail(f, 7, `link to a draft page: ${href}`);
    } else if (!href.startsWith('#') && !href.startsWith('https://')) fail(f, 7, `external link is not https: ${href}`);
  }

  // 8. Images.
  for (const img of all(main, (n) => n.tag === 'img' && !inside(n, (p) => p.attrs['data-np-live'] !== undefined))) {
    if (img.attrs.alt === undefined) fail(f, 8, `img without alt: ${img.attrs.src}`);
    if (!img.attrs.width || !img.attrs.height) fail(f, 8, `img without width/height: ${img.attrs.src}`);
  }

  // 9. Residue.
  if (marker.test(html)) fail(f, 9, 'raw gap marker in the HTML');
  if (view !== 'review' && /np-gap/.test(html)) fail(f, 9, 'np-gap markup');
  if (view === 'production') {
    for (const chrome of ['data-np-draft-banner', 'data-np-gaps-panel', 'data-np-placeholder', 'data-draft-target', 'data-planned', copy.plannedSuffix]) {
      if (html.includes(chrome)) fail(f, 9, `preview chrome in production: ${chrome}`);
    }
  }

  // 10. Banned strings in <main>.
  for (const banned of ['Benor Media', 'Enterprise Partner', 'Official Webflow Partner']) if (mainText.includes(banned)) fail(f, 10, banned);
  for (const m of mainText.matchAll(/[$€£]\s?\d[\d,.]*(\s?[MBK]\b|\s?(million|billion)\b)?/g)) {
    if (!m[1] && !/^[$€£]\d+[MB]\+?$/.test(m[0])) fail(f, 10, `currency amount: ${m[0]}`);
  }

  // 11. Family rules.
  const times = all(main, (n) => n.tag === 'time');
  const byline = all(main, (n) => n.attrs['data-np-byline'] !== undefined);
  if (family === 'commercial') {
    if (times.length || byline.length || /Rechecked/.test(mainText)) fail(f, 11, 'byline, <time> or recheck text on a commercial page');
  } else if (!byline.length) fail(f, 11, 'no byline row');
  else {
    const row = norm(textOf(byline[0]));
    const fmt = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    const want = [
      ...(hasGap(d.author) ? [] : [copy.byline.author.replace('{author}', d.author)]),
      copy.byline.published.replace('{date}', fmt(String(d.publishedAt))),
      copy.byline.updated.replace('{date}', fmt(String(d.updatedAt))),
      copy.byline.recheck.replace('{n}', String(d.reviewEvery)),
    ];
    for (const w of want) if (!row.includes(norm(w))) fail(f, 11, `byline lacks "${w}"`);
    const dts = times.map((t) => t.attrs.datetime);
    if (!dts.includes(String(d.publishedAt)) || !dts.includes(String(d.updatedAt))) fail(f, 11, `byline <time datetime> ${dts.join(', ')}`);
  }
}

console.log(`check-new-pages (${view}): ${checked} page(s) checked, ${failures.length} failure(s)`);
for (const line of failures) console.log(`  FAIL  ${line}`);
process.exit(failures.length ? 1 : 0);
