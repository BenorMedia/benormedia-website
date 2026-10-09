// Analysis behind scripts/check-content.mjs and scripts/build-index.mjs. Dependency-free.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { readContentFile } from './frontmatter.mjs';

export const LIVE_PATHS = new Set([
  '/', '/custom-websites-migrations', '/growth', '/ongoing-website-support', '/pricing', '/work',
  '/privacy-policy', '/terms-conditions',
]);
export const NOINDEX_PATHS = new Set(['/testimonials', '/cookie-policy']);

// Two families of page (decided by Sergio, 2026-10-07):
//   article  = guide, comparison, data-study. Long and sourced. Shows a byline, dates and a recheck line, so `author` is required.
//   everything else = commercial and utility pages. Short, scannable, no byline, no dates, no author.
//   `meta` = [title max, description max] in characters (commercial pages follow the outline template: under 50 and under 150).
//   `faqWords` = the answer length the check expects (commercial answers are one to three sentences).
export const TYPES = {
  service:   { words: [650, 1200], qh2: 0, meta: [60, 160], faqWords: [15, 80], schema: ['Service', 'BreadcrumbList', 'FAQPage'], faq: true },
  industry:  { words: [650, 1200], qh2: 0, meta: [60, 160], faqWords: [15, 80], schema: ['Service', 'BreadcrumbList', 'FAQPage'], faq: true },
  guide:     { words: [1800, 3200], qh2: 0.7, article: true, meta: [60, 160], faqWords: [35, 100], schema: ['Article', 'BreadcrumbList', 'FAQPage'], faq: true, takeaways: true, sources: true },
  comparison:{ words: [1800, 3000], qh2: 0.7, article: true, meta: [60, 160], faqWords: [35, 100], schema: ['Article', 'BreadcrumbList', 'FAQPage'], faq: true, takeaways: true, sources: true },
  'data-study': { words: [1200, 2200], qh2: 0.5, article: true, meta: [60, 160], faqWords: [35, 100], schema: ['Article', 'BreadcrumbList'], takeaways: true },
  tool:      { words: [600, 1200], qh2: 0, meta: [49, 149], faqWords: [15, 80], schema: ['WebPage', 'BreadcrumbList'], faq: true },
  regional:  { words: [650, 1200], qh2: 0, meta: [60, 160], faqWords: [15, 80], schema: ['Service', 'BreadcrumbList', 'FAQPage'], faq: true },
  hub:       { words: [400, 800], qh2: 0, meta: [49, 149], faqWords: [15, 80], schema: ['CollectionPage', 'BreadcrumbList'] },
  section:   { words: [500, 1000], qh2: 0, meta: [50, 150], faqWords: [15, 80], schema: [], faq: false, noMeta: true },
  'case-study-template': { words: [250, 900], qh2: 0, meta: [50, 150], faqWords: [15, 80], schema: ['WebPage', 'BreadcrumbList'] },
};
const SCHEMA_VALUES = new Set(['Service', 'Article', 'FAQPage', 'BreadcrumbList', 'CollectionPage', 'WebPage', 'WebApplication']);
const LANGS = new Set(['en-US', 'en-GB', 'de-DE', 'es-ES']);

// Names of other agencies and their domains: never named or linked on a page.
const COMPETITOR_NAMES = [
  'Flowout', 'Finsweet', 'Webstacks', 'Huemor', 'Veza Digital', 'Amply', 'Striped Horse', 'Digidop', 'Flow Ninja',
  'BRIX Agency', 'Refokus', 'Klarkode', 'Marcel Digital', 'Belt Creative', 'Jolly Good', 'Broworks', 'Thunderclap',
  'ClonePartner', 'Flowfye', 'MACU Studio', 'Chasing Creative', 'Orbit Media', 'Enzuzo', 'Musemind', 'First Page Sage',
  'Digihotshot', 'N4 Studio', 'SimpleTiger Agency',
];
const COMPETITOR_RE = new RegExp(`\\b(?:${COMPETITOR_NAMES.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'g');
const COMPETITOR_DOMAINS = [
  'flowout.com', 'finsweet.com', 'webstacks.com', 'huemor.rocks', 'veza.digital', 'amply.io', 'stripedhorse.com',
  'digidop.com', 'flow-ninja.com', 'flowninja.com', 'brixagency.com', 'refokus.com', 'klarkode.com', 'marceldigital.com',
  'beltcreative.com', 'jollygoodweb.com', 'broworks.net', 'thethunderclap.com', 'clonepartner.com', 'flowfye.com',
  'macustudio.com', 'chasingcreative.com', 'orbitmedia.com', 'enzuzo.com', 'musemind.agency', 'firstpagesage.com',
];

// Always fail. [regex, reason]. Applied to the visible text (markers removed, REPLACE text included).
const BANNED = [
  [/Enterprise Partner/gi, 'never "Enterprise Partner": BenorMedia is a Webflow Professional Partner'],
  [/Official Webflow Partner/gi, 'use "Webflow Professional Partner"'],
  [/\bBenor Media\b(?!\s+(?:LLC|SLU)\b)/g, 'the brand is spelled "BenorMedia" (legal names stay as written)'],
  [/\bBenor-Media\b/g, 'the brand is spelled "BenorMedia"'],
];
// Read by eye: allowed, but each needs a reason.
const WARN = [
  [/(?<!Professional )Webflow Partner\b/g, '"Webflow Partner" without "Professional": use the full tier wording'],
  [/\b(?:Premium|Certified|Foundations)\s+Partner\b/g, 'a Webflow program tier is named: fine when describing the program, never as a BenorMedia claim'],
  [/\bguarantee[sd]?\b/gi, 'a promise? allowed only in a sentence that denies one'],
  [/\b(?:zero|no) downtime\b/gi, 'promise of no downtime'],
  [/\b100\s?%/g, '100% claim'],
  [/\b(?:best|leading|top-rated|premier|number one|#1)\b/gi, 'superlative: allowed only for a third party with a source, never for BenorMedia'],
  [/\b(?:seamless|world-class|cutting-edge|best-in-class|game-changer|revolutioni[sz]e|unlock|elevate|empower|holistic|robust|leverage|delve|landscape|ever-evolving|tapestry|supercharge)\b/gi, 'hype or filler word'],
  [/in today.s (?:digital|fast-paced|competitive)/gi, 'filler opener'],
  [/\bit(?:'s| is) (?:important|worth) (?:to note|noting)\b/gi, 'filler'],
  [/\bwe pride ourselves\b/gi, 'filler'],
  [/[—–]/g, 'em or en dash: use a period, comma, colon or "to"'],
];
const TOOLS_RE = /\b(?:Ahrefs|Surfer SEO|Surfer|Trakkr|Screaming Frog|Semrush|SEMrush|Profound)\b/g;

// Serial comma (RULES section 5): "A, B and C" should read "A, B, and C". Heuristic and advisory: it skips
// sentences that open with an introductory phrase, appositives, and lists that already use the serial comma.
const SC_STOP_B = new Set('and or but so which who whose that because where while when then with without including plus such for like as if though although since unless whether after before once until yet nor'.split(' '));
const SC_INTRO = new Set('yes no sometimes however also first second third next finally instead otherwise usually largely rarely today again still not never always often typically generally mostly later now here there if when while after before once until because since although unless whether for in on at by as to with without using from during'.split(' '));
const SC_ITEM = '[^,;:.()|\\n\\[\\]]';
const SC_RE = new RegExp(`(${SC_ITEM}{2,80}), (${SC_ITEM}{2,70}?) (and|or) (?=[\\w"'*])(${SC_ITEM}{2,90})`, 'g');
export function serialCommaHits(t) {
  const s = t.replace(/\]\([^)]*\)/g, (m) => 'x'.repeat(m.length)).replace(/`[^`]*`/g, (m) => 'x'.repeat(m.length));
  const hits = [];
  for (const m of s.matchAll(SC_RE)) {
    const [whole, a, b, conj, c] = m;
    const bWords = b.trim().split(/\s+/);
    const bFirst = bWords[0].toLowerCase().replace(/\W+/g, '');
    if (SC_STOP_B.has(bFirst) || bWords.length > 8) continue;
    const ls = s.lastIndexOf('\n', m.index) + 1;
    const lineBefore = s.slice(ls, m.index) + a;
    const cut = Math.max(lineBefore.lastIndexOf('. '), lineBefore.lastIndexOf(': '), lineBefore.lastIndexOf('| '), lineBefore.lastIndexOf('**'));
    const before = cut >= 0 ? lineBefore.slice(cut + 1) : lineBefore;
    if (/, (and|or) /.test(before)) continue;
    const endC = m.index + whole.length;
    const nl = s.indexOf('\n', endC);
    const tail = s.slice(endC, nl === -1 ? s.length : nl).split('|')[0];
    if (/, (and|or) /.test(tail.split(/(?<=[.!?]) /)[0])) continue;
    const lead = before.replace(/^[\s|\-*0-9."'“]+/, '');
    const first = lead.toLowerCase().split(/\W+/)[0] || '';
    const commasBefore = (before.match(/,/g) || []).length;
    if (SC_INTRO.has(first) && commasBefore === 0) continue;
    if (/^[^,]+, (a|an|the) [^,]+$/.test(before.trim().replace(/^[-*\s"]+/, ''))) continue;
    hits.push({ index: m.index + a.length + 2 + b.length, text: clip(`${a.trim()}, ${b} ${conj} ${c}`, 70) });
  }
  return hits;
}


// Front matter keys whose text is never shown to visitors: not scanned for banned wording.
const HIDDEN_KEYS = new Set(['editorNotes', 'volatile', 'inbound', 'visuals', 'blockedBy', 'sources', 'related', 'hreflang', 'insertInto', 'placement', 'volatileChecked', 'primaryKeyword', 'secondaryKeywords', 'eyebrow', 'testimonial']);

const MARKER_ANY = /\[(?:FACT NEEDED|VERIFY|PERSON)\b[^\]]*\]/g;
const MARKER_OK = /^\[(FACT NEEDED|VERIFY|PERSON) #(G\d+|[A-Z][A-Z0-9]{1,4}-\d+): ([^|\]\[]+?) \| default: (DELETE-LINE|DELETE-SECTION|DELETE-ITEM|KEEP|REPLACE: [^\]\[|]+)\]$/;
const LEGACY_MARK = /\bTODO\b|\bTBD\b|lorem ipsum/gi;

export const lineOf = (text, index) => text.slice(0, index).split('\n').length;
const clip = (s, n = 90) => s.replace(/\s+/g, ' ').trim().slice(0, n);
const spaces = (s) => s.replace(/[^\n]/g, ' ');
const wordsIn = (s) => (s.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu) || []).length;

export function findMarkers(text) {
  const out = [];
  for (const m of text.matchAll(MARKER_ANY)) {
    const ok = MARKER_OK.exec(m[0]);
    out.push({
      raw: m[0], index: m.index, line: lineOf(text, m.index), valid: !!ok,
      kind: ok?.[1], id: ok?.[2], question: ok?.[3]?.trim(), action: ok?.[4],
    });
  }
  return out;
}

function maskForVisible(text, markers, fmEndLine, fmRawLines) {
  // 1. blank out markers (keep newlines); 2. blank out hidden front matter keys
  let t = text;
  for (const mk of [...markers].reverse()) {
    t = t.slice(0, mk.index) + spaces(mk.raw) + t.slice(mk.index + mk.raw.length);
  }
  const lines = t.split('\n');
  let hidden = false;
  for (let i = 1; i < fmEndLine - 1 && i < lines.length; i++) {
    const m = /^([A-Za-z0-9_-]+):/.exec(lines[i]);
    if (m) hidden = HIDDEN_KEYS.has(m[1]);
    if (hidden) lines[i] = spaces(lines[i]);
  }
  t = lines.join('\n');
  // 3. link destinations are not visible text
  t = t.replace(/\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (all) => ']' + spaces(all.slice(1)));
  return t;
}

function stripMarkdown(s) {
  return s
    .replace(MARKER_ANY, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/^\s*(?:[-*]|\d+\.)\s+/gm, '')
    .replace(/^\s*Table:.*$/gm, '')
    .replace(/^\s*\|.*$/gm, '')
    .replace(/^#{1,6}\s+.*$/gm, '');
}

function sentencesOf(s) {
  const clean = stripMarkdown(s).replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  return clean.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(¿¡ÄÖÜÁÉÍÓÚ])/u).filter((x) => wordsIn(x) > 0);
}

function parseBody(body, bodyStartLine) {
  const lines = body.split('\n');
  const blocks = [];
  let cur = null;
  lines.forEach((text, i) => {
    const h = /^(#{1,6})\s+(.*?)\s*$/.exec(text);
    if (h) {
      if (cur) blocks.push(cur);
      cur = { level: h[1].length, title: h[2], line: bodyStartLine + i, lines: [], startIdx: i };
    } else {
      if (!cur) cur = { level: 0, title: '', line: bodyStartLine + i, lines: [], startIdx: i };
      cur.lines.push({ text, no: bodyStartLine + i });
    }
  });
  if (cur) blocks.push(cur);
  return blocks;
}

export function loadKnown(dir) {
  const slugs = new Map(); // slug -> {url, file}
  const planFile = join(dirname(dir), 'data', 'plan.json');
  if (existsSync(planFile)) {
    try {
      for (const p of JSON.parse(readFileSync(planFile, 'utf8')).pages) slugs.set(p.slug, { url: p.url, file: null, type: p.pageType, planned: true });
    } catch { /* ignore a broken plan file */ }
  }
  if (!existsSync(dir)) return slugs;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const r = readContentFile(readFileSync(join(dir, f), 'utf8'));
    const slug = r.data.slug || basename(f, '.md');
    slugs.set(slug, { url: r.data.url, file: join(dir, f), type: r.data.pageType });
  }
  return slugs;
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

export function analyze(path, ctx = {}) {
  const issues = [];
  const add = (level, code, line, msg) => issues.push({ level, code, line, msg });
  const text = readFileSync(path, 'utf8');
  const { fm, data, errors, body, bodyStartLine, raw } = readContentFile(text);
  const file = path;
  const today = ctx.today || new Date().toISOString().slice(0, 10);

  for (const e of errors) add('FAIL', 'yaml', e.line, e.msg);
  if (!fm) return { file, issues, markers: [], data, words: 0, slug: basename(path, '.md'), body };

  const type = data.pageType;
  const T = TYPES[type];
  if (!T) add('FAIL', 'front', 1, `pageType "${type}" is not one of: ${Object.keys(TYPES).join(', ')}`);

  // ---- front matter
  const req = ['slug', 'url', 'lang', 'pageType', 'wave', 'draft', 'blockedBy', 'primaryKeyword', 'publishedAt', 'updatedAt', 'reviewEvery'];
  if (T?.article) req.push('author'); // only articles show a byline
  if (!T?.noMeta) req.push('title', 'description', 'h1', 'breadcrumb', 'schema', 'related');
  else req.push('insertInto');
  for (const k of req) if (!(k in data) || data[k] === null || data[k] === '') {
    if (k === 'blockedBy' || k === 'related') { if (!(k in data)) add('FAIL', 'front', 1, `missing front matter key "${k}" (use [] when empty)`); }
    else if (k === 'primaryKeyword' && (data.primaryKeyword === 'none')) { /* ok */ }
    else add('FAIL', 'front', 1, `missing front matter key "${k}"`);
  }
  const stem = basename(path, '.md');
  if (data.slug && data.slug !== stem) add('FAIL', 'front', 1, `slug "${data.slug}" must equal the file name "${stem}"`);
  if (data.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) add('FAIL', 'front', 1, 'slug must be kebab-case');
  if (data.url && (!/^\/[a-z0-9\-\/]*$/.test(data.url) || (data.url.length > 1 && data.url.endsWith('/')))) add('FAIL', 'front', 1, `url "${data.url}" must start with / and have no trailing slash`);
  if (data.lang && !LANGS.has(data.lang)) add('FAIL', 'front', 1, `lang "${data.lang}" must be one of ${[...LANGS].join(', ')}`);
  if (typeof data.draft !== 'boolean') add('FAIL', 'front', 1, 'draft must be true or false');
  if (![1, 2, 3].includes(data.wave)) add('FAIL', 'front', 1, 'wave must be 1, 2 or 3');
  if (data.blockedBy && !Array.isArray(data.blockedBy)) add('FAIL', 'front', 1, 'blockedBy must be a list');
  for (const k of ['publishedAt', 'updatedAt']) if (data[k] && !isoDate.test(String(data[k]))) add('FAIL', 'front', 1, `${k} must be an ISO date (YYYY-MM-DD)`);
  if (data.publishedAt && data.updatedAt && String(data.updatedAt) < String(data.publishedAt)) add('FAIL', 'front', 1, 'updatedAt is before publishedAt');
  if (data.reviewEvery !== undefined && (!Number.isInteger(data.reviewEvery) || data.reviewEvery < 7)) add('FAIL', 'front', 1, 'reviewEvery must be a whole number of days (7 or more)');
  // Byline rule: author, dates and the recheck line are shown on articles only. Commercial pages keep the dates as hidden metadata (sitemap, schema) and carry no author.
  if (T && !T.article && data.author !== undefined && data.author !== null && data.author !== '') add('FAIL', 'front', 1, `"author" belongs on guides, comparisons and data studies only: a ${type} page shows no byline, so remove it`);

  if (!T?.noMeta) {
    const [titleMax, descMax] = T?.meta || [60, 160];
    const title = String(data.title || '');
    if (title.length > titleMax) add('FAIL', 'meta', 1, `title is ${title.length} characters (limit ${titleMax}): ${title}`);
    if (title && title.length < 25) add('warn', 'meta', 1, `title is short (${title.length} characters)`);
    const desc = String(data.description || '');
    if (desc && (desc.length < 70 || desc.length > descMax)) add('FAIL', 'meta', 1, `description is ${desc.length} characters (must be 70 to ${descMax})`);
    if (data.h1 && String(data.h1).length > 90) add('FAIL', 'meta', 1, 'h1 is longer than 90 characters');
    if (!Array.isArray(data.breadcrumb) || data.breadcrumb.length < 2) add('FAIL', 'front', 1, 'breadcrumb needs at least Home and this page');
    else {
      for (const b of data.breadcrumb) if (!b || !b.name || !b.url) add('FAIL', 'front', 1, 'every breadcrumb item needs name and url');
      const last = data.breadcrumb[data.breadcrumb.length - 1];
      if (last?.url && data.url && last.url !== data.url) add('warn', 'front', 1, `last breadcrumb url (${last.url}) differs from the page url (${data.url})`);
      if (data.breadcrumb[0]?.url !== '/') add('warn', 'front', 1, 'first breadcrumb item should be Home (/)');
    }
    if (!Array.isArray(data.schema)) add('FAIL', 'front', 1, 'schema must be a list');
    else {
      for (const s of data.schema) if (!SCHEMA_VALUES.has(s)) add('FAIL', 'front', 1, `schema value "${s}" is not allowed`);
      for (const s of T?.schema || []) {
        if (s === 'FAQPage' && !(Array.isArray(data.faq) && data.faq.length)) continue;
        if (!data.schema.includes(s)) add('FAIL', 'front', 1, `schema for ${type} pages must include ${s}`);
      }
      if (data.schema.includes('Service') && !(data.service?.name && data.service?.serviceType)) add('FAIL', 'front', 1, 'schema Service needs service.name and service.serviceType');
      if (data.schema.includes('FAQPage') && !(Array.isArray(data.faq) && data.faq.length)) add('FAIL', 'front', 1, 'schema FAQPage needs a faq list');
      if (Array.isArray(data.faq) && data.faq.length && !data.schema.includes('FAQPage')) add('FAIL', 'front', 1, 'a faq list needs FAQPage in schema');
    }
  }

  // ---- FAQ
  const faqs = Array.isArray(data.faq) ? data.faq : [];
  if (T?.faq && faqs.length < 5) add('FAIL', 'faq', 1, `${type} pages need 5 to 12 FAQ items (found ${faqs.length})`);
  if (faqs.length > 12) add('FAIL', 'faq', 1, `FAQ has ${faqs.length} items (maximum 12)`);
  else if (T && !T.article && faqs.length > 8) add('warn', 'faq', 1, `FAQ has ${faqs.length} items (a commercial page keeps it to 5 to 8)`);
  if (faqs.length && !data.faqHeading) add('FAIL', 'faq', 1, 'faqHeading is missing');
  faqs.forEach((f, i) => {
    const n = i + 1;
    if (!f || typeof f.q !== 'string' || typeof f.a !== 'string') { add('FAIL', 'faq', 1, `FAQ item ${n} needs q and a`); return; }
    if (!/\?\s*$/.test(f.q.trim())) add('FAIL', 'faq', 1, `FAQ question ${n} must end with "?"`);
    const w = wordsIn(f.a.replace(MARKER_ANY, ' '));
    const [fLo, fHi] = T?.faqWords || [35, 100];
    if (w < fLo || w > fHi) add('warn', 'faq', 1, `FAQ answer ${n} has ${w} words (aim for ${T?.article ? '40 to 90' : '20 to 70'})`);
    if (/\n\n|^\s*[-*]\s/m.test(f.a)) add('warn', 'faq', 1, `FAQ answer ${n} should be plain text, one paragraph`);
  });
  if (T?.takeaways) {
    const tk = Array.isArray(data.takeaways) ? data.takeaways : [];
    if (tk.length < 3 || tk.length > 5) add('FAIL', 'front', 1, `takeaways needs 3 to 5 items (found ${tk.length})`);
  }
  if (T?.sources) {
    const sr = Array.isArray(data.sources) ? data.sources : [];
    if (sr.length < 2) add('FAIL', 'sources', 1, 'sources needs at least 2 entries');
  }
  if (Array.isArray(data.sources)) {
    const seen = new Set();
    data.sources.forEach((s, i) => {
      if (!s?.label || !s?.url || !s?.accessed) add('FAIL', 'sources', 1, `source ${i + 1} needs label, url and accessed`);
      else {
        if (!/^https:\/\//.test(s.url)) add('FAIL', 'sources', 1, `source ${i + 1} url must start with https://`);
        if (!isoDate.test(String(s.accessed))) add('FAIL', 'sources', 1, `source ${i + 1} accessed must be an ISO date`);
        if (seen.has(s.url)) add('warn', 'sources', 1, `source ${i + 1} duplicates an earlier url`);
        seen.add(s.url);
        const host = (() => { try { return new URL(s.url).hostname.replace(/^www\./, ''); } catch { return ''; } })();
        if (COMPETITOR_DOMAINS.some((d) => host === d || host.endsWith('.' + d))) add('FAIL', 'sources', 1, `source ${i + 1} is another agency's site (${host})`);
      }
    });
  }
  if (Array.isArray(data.volatile) && data.volatile.length) {
    data.volatile.forEach((v, i) => { if (!v?.claim || !v?.source || !v?.recheck) add('FAIL', 'volatile', 1, `volatile item ${i + 1} needs claim, source and recheck`); });
    if (!data.volatileChecked) add('FAIL', 'volatile', 1, 'volatileChecked (the date the volatile facts were verified) is missing');
    else if (!isoDate.test(String(data.volatileChecked))) add('FAIL', 'volatile', 1, 'volatileChecked must be an ISO date');
  }
  if (Array.isArray(data.editorNotes) && data.editorNotes.length > 5) add('warn', 'front', 1, 'editorNotes should have 5 lines or fewer');

  // ---- markers
  const markers = findMarkers(text);
  for (const mk of markers) {
    if (!mk.valid) add('FAIL', 'marker', mk.line, `malformed marker: ${clip(mk.raw, 120)}  (expected [KIND #ID: question | default: ACTION], see RULES.md section 3)`);
    else {
      if (mk.action === 'DELETE-ITEM' && mk.line >= bodyStartLine) add('FAIL', 'marker', mk.line, 'DELETE-ITEM is for front matter list items only');
      if (mk.line < bodyStartLine && ['DELETE-LINE', 'DELETE-SECTION'].includes(mk.action)) add('FAIL', 'marker', mk.line, `${mk.action} cannot be used in front matter (use DELETE-ITEM, REPLACE or KEEP)`);
      if (mk.action === 'DELETE-SECTION' && mk.line >= bodyStartLine) {
        // must sit under a heading
      }
    }
  }
  for (const m of text.matchAll(LEGACY_MARK)) add('FAIL', 'marker', lineOf(text, m.index), `"${m[0]}" left in the text`);
  // markers inside FAQ answers must be DELETE-ITEM
  faqs.forEach((f, i) => {
    for (const m of findMarkers(String(f?.a || '') + ' ' + String(f?.q || ''))) if (m.valid && m.action !== 'DELETE-ITEM') add('FAIL', 'marker', 1, `FAQ item ${i + 1} holds a marker whose action is not DELETE-ITEM`);
  });

  // ---- visible text checks
  const fmEnd = fm.bodyStartLine;
  const masked = maskForVisible(text, markers, fmEnd, raw.split('\n').length);
  const replaceTexts = markers.filter((m) => m.valid && m.action.startsWith('REPLACE: ')).map((m) => ({ text: m.action.slice(9), line: m.line }));
  const scanTargets = [{ text: masked, lineBase: 0 }, ...replaceTexts.map((r) => ({ text: r.text, lineBase: r.line - 1, replace: true }))];
  const strict = data.strictTools === true;
  const pricesOk = data.thirdPartyPrices === true;
  for (const tgt of scanTargets) {
    const t = tgt.text;
    const at = (idx) => tgt.lineBase + lineOf(t, idx);
    for (const [re, why] of BANNED) for (const m of t.matchAll(re)) add('FAIL', 'banned', at(m.index), `"${clip(m[0], 50)}": ${why}`);
    for (const m of t.matchAll(COMPETITOR_RE)) add('FAIL', 'banned', at(m.index), `"${m[0]}": another agency is named (never name or compare agencies)`);
    // currency amounts
    const cur = /([$€£])\s?(\d[\d.,]*)\s?(million|billion|bn|[MBmb]\b|[kK]\b)?|(\d[\d.,]*)\s?(?:€|£|\$|USD|EUR|GBP|dollars|euros|pounds)(?![A-Za-z])/g;
    for (const m of t.matchAll(cur)) {
      const suffix = (m[3] || '').toLowerCase();
      if (['million', 'billion', 'bn', 'm', 'b'].includes(suffix)) continue; // funding or AUM figure
      const msg = `"${clip(m[0], 30)}": a price or currency amount. Link to /pricing instead`;
      if (pricesOk) add('warn', 'price', at(m.index), `"${clip(m[0], 30)}": third-party price. It needs its source, an "as of" date and a volatile entry`);
      else add('FAIL', 'banned', at(m.index), msg);
    }
    for (const [re, why] of WARN) for (const m of t.matchAll(re)) add('warn', 'style', at(m.index), `"${clip(m[0], 40)}": ${why}`);
    for (const h of serialCommaHits(t)) add('warn', 'style', at(h.index), `"${h.text}": three or more items need the serial comma ("A, B, and C"); ignore this if it is not a list`);
    for (const m of t.matchAll(TOOLS_RE)) add(strict ? 'FAIL' : 'warn', 'tools', at(m.index), `"${m[0]}": a tool is named on a public page`);
  }

  // ---- body structure
  const blocks = parseBody(body, bodyStartLine);
  const lead = blocks.find((b) => b.level === 0);
  const h2s = blocks.filter((b) => b.level === 2);
  const h1InBody = blocks.filter((b) => b.level === 1);
  for (const b of h1InBody) add('FAIL', 'structure', b.line, 'no H1 in the body: the H1 comes from the front matter');
  for (const b of blocks.filter((x) => x.level >= 4)) add('FAIL', 'structure', b.line, 'use H2 and H3 only');
  if (!T?.noMeta && lead) {
    const leadText = lead.lines.map((l) => l.text).join('\n').trim();
    const firstPara = leadText.split(/\n\s*\n/)[0] || '';
    const lw = wordsIn(stripMarkdown(firstPara));
    if (!leadText) add('FAIL', 'structure', bodyStartLine, 'the lead (text before the first H2) is empty');
    else if (lw < 20 || lw > 90) add('warn', 'structure', lead.line, `lead paragraph has ${lw} words (aim for 30 to 80)`);
    const kwWords = String(data.primaryKeyword || '').toLowerCase().split(/\s+/).filter((w) => w.length > 2 && !['for', 'the', 'and'].includes(w));
    const frontText = `${data.title || ''} ${data.h1 || ''} ${leadText}`.toLowerCase();
    const missing = kwWords.filter((w) => !frontText.includes(w));
    if (kwWords.length && missing.length) add('warn', 'keyword', 1, `primary keyword "${data.primaryKeyword}": ${missing.join(', ')} not found in title, h1 or lead`);
  }
  if (!T?.noMeta) {
    if (h2s.length < 4) add('warn', 'structure', 1, `only ${h2s.length} H2 sections (usually 5 to 10)`);
    if (h2s.length > 12) add('warn', 'structure', 1, `${h2s.length} H2 sections: consider merging`);
  }
  let qCount = 0;
  for (const h of h2s) {
    if (/\?\s*$/.test(h.title)) qCount++;
    const first = h.lines.find((l) => l.text.replace(MARKER_ANY, '').trim() !== '');
    if (!first) { add('FAIL', 'structure', h.line, `empty section: "${h.title}" (only markers or nothing under it)`); continue; }
    const t = first.text.replace(MARKER_ANY, '').trim();
    const isPara = !/^(?:[-*]\s|\d+\.\s|\||Table:|#)/.test(t);
    if (!isPara) add('warn', 'answer-first', first.no, `section "${clip(h.title, 50)}" should open with a sentence that answers the heading, not a list or table`);
    else if (wordsIn(stripMarkdown(t)) < 8) add('warn', 'answer-first', first.no, `section "${clip(h.title, 50)}" opens with a very short line`);
  }
  if (T && T.qh2 && h2s.length >= 4) {
    const ratio = qCount / h2s.length;
    if (ratio < T.qh2) add('warn', 'headings', 1, `${qCount} of ${h2s.length} H2s are questions (aim for at least ${Math.round(T.qh2 * 100)}%)`);
  }
  // tables, lists, paragraphs
  const bodyLines = body.split('\n');
  for (let i = 0; i < bodyLines.length; i++) {
    const t = bodyLines[i];
    const no = bodyStartLine + i;
    if (/^\s*\|/.test(t) && !/^\s*\|/.test(bodyLines[i - 1] || '')) {
      // table start
      let j = i - 1;
      while (j >= 0 && bodyLines[j].trim() === '') j--;
      if (!(j >= 0 && /^Table:\s*\S/.test(bodyLines[j]))) add('FAIL', 'table', no, 'a table needs a caption line that starts with "Table: " directly above it');
      const sepLine = bodyLines[i + 1] || '';
      if (!(/^[\s|:-]+$/.test(sepLine) && /-{2,}/.test(sepLine))) add('FAIL', 'table', no, 'a table needs a header row followed by a |---| separator row');
      // a marker holds a pipe ("| default:"), so mask markers before counting the columns of a row
      const cols = (r) => r.replace(MARKER_ANY, 'x').replace(/\\\|/g, '').trim().replace(/^\|/, '').replace(/\|$/, '').split('|').length;
      const n0 = cols(t);
      let k = i;
      let rows = 0;
      while (k < bodyLines.length && /^\s*\|/.test(bodyLines[k])) {
        if (cols(bodyLines[k]) !== n0) add('FAIL', 'table', bodyStartLine + k, `table row has ${cols(bodyLines[k])} columns, header has ${n0}`);
        rows++;
        k++;
      }
      if (rows < 4) add('warn', 'table', no, 'a table with fewer than 2 data rows: use a sentence instead');
      i = k - 1;
    }
    if (/^Table:\s*\S/.test(t)) {
      let j = i + 1;
      while (j < bodyLines.length && bodyLines[j].trim() === '') j++;
      if (!/^\s*\|/.test(bodyLines[j] || '')) add('FAIL', 'table', no, 'a "Table:" caption line must be followed by the table');
    }
  }
  {
    let run = 0; let runStart = 0;
    const flush = () => { if (run > 8) add('warn', 'list', runStart, `a list of ${run} items (maximum 8)`); run = 0; };
    bodyLines.forEach((t, i) => {
      if (/^\s*(?:[-*]|\d+\.)\s+\S/.test(t)) { if (run === 0) runStart = bodyStartLine + i; run++; }
      else if (t.trim() !== '' && !/^\s{2,}\S/.test(t)) flush();
    });
    flush();
  }
  body.split(/\n\s*\n/).forEach((p) => {
    const first = p.trim().split('\n')[0] || '';
    if (/^(?:[-*]|\d+\.|\||Table:|#)/.test(first)) return;
    const w = wordsIn(stripMarkdown(p));
    if (w > 110) add('warn', 'paragraph', lineOf(text, text.indexOf(p.trim().slice(0, 40))), `a paragraph of ${w} words (aim for 90 or fewer)`);
  });

  // ---- sentences
  const prose = blocks.map((b) => b.lines.map((l) => l.text).join('\n')).join('\n') + '\n' + faqs.map((f) => String(f?.a || '')).join('\n');
  const sents = sentencesOf(prose);
  const lens = sents.map((s) => wordsIn(s));
  const avg = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
  const longest = lens.length ? Math.max(...lens) : 0;
  if (avg > 22 && type !== 'regional') add('warn', 'readability', 1, `average sentence length is ${avg.toFixed(1)} words (aim for 20 or fewer)`);
  const longOnes = sents.filter((s) => wordsIn(s) > 40);
  for (const s of longOnes.slice(0, 5)) add('warn', 'readability', lineOf(text, Math.max(0, text.indexOf(s.slice(0, 30)))), `a sentence of ${wordsIn(s)} words: "${clip(s, 60)}..."`);

  // ---- words
  const visibleWords = wordsIn(stripMarkdown(body)) + faqs.reduce((a, f) => a + wordsIn(String(f?.a || '').replace(MARKER_ANY, ' ')) + wordsIn(String(f?.q || '')), 0) + (Array.isArray(data.takeaways) ? data.takeaways.reduce((a, s) => a + wordsIn(String(s)), 0) : 0)
    + wordsIn((body.match(/^\s*\|.*$/gm) || []).join(' ').replace(MARKER_ANY, ' ').replace(/\]\([^)]*\)/g, ']').replace(/[|:*_-]/g, ' '));
  if (T) {
    const [lo, hi] = T.words;
    if (visibleWords < lo * 0.7) add('warn', 'length', 1, `${visibleWords} visible words is well under the ${type} range (${lo} to ${hi}); fine only if the page is complete`);
    else if (visibleWords > hi * 1.2) add('warn', 'length', 1, `${visibleWords} visible words is over the ${type} range (${lo} to ${hi}); cut padding`);
  }

  // ---- links
  const links = [];
  for (const m of body.matchAll(/(?<!\!)\[([^\]]*)\]\(([^)\s]*)(?:\s+"[^"]*")?\)/g)) links.push({ anchor: m[1], href: m[2], line: bodyStartLine - 1 + lineOf(body, m.index) });
  const counts = new Map();
  const internalSlugs = new Set();
  for (const l of links) {
    const { href, anchor } = l;
    counts.set(href, (counts.get(href) || 0) + 1);
    if (!anchor.trim()) add('FAIL', 'link', l.line, `link with empty anchor text: ${href}`);
    if (/^(?:click here|here|read more|learn more|this page|link)$/i.test(anchor.trim())) add('warn', 'link', l.line, `non-descriptive anchor "${anchor}"`);
    if (href.startsWith('page:')) {
      const slug = href.slice(5);
      internalSlugs.add(slug);
      if (ctx.known && !ctx.known.has(slug)) add('FAIL', 'link', l.line, `page:${slug} does not match any content file`);
      if (slug === data.slug) add('warn', 'link', l.line, 'a page links to itself');
    } else if (href.startsWith('/')) {
      const p = href.split('#')[0].split('?')[0] || '/';
      const newUrls = ctx.known ? [...ctx.known.values()].filter((v) => v.type !== 'section' && v.url && !LIVE_PATHS.has(v.url)).map((v) => v.url) : [];
      if (NOINDEX_PATHS.has(p)) add('warn', 'link', l.line, `${p} is noindex today; do not link to it`);
      else if (newUrls.includes(p)) add('warn', 'link', l.line, `${p} is a new page: use page:slug so the link disappears until the page is released`);
      else if (!LIVE_PATHS.has(p)) add('FAIL', 'link', l.line, `${href} is not a live page (live pages: ${[...LIVE_PATHS].join(', ')})`);
    } else if (href.startsWith('https://')) {
      let host = '';
      try { host = new URL(href).hostname.replace(/^www\./, ''); } catch { add('FAIL', 'link', l.line, `bad URL ${href}`); continue; }
      if (COMPETITOR_DOMAINS.some((d) => host === d || host.endsWith('.' + d))) add('FAIL', 'link', l.line, `${host} is another agency: never link to it`);
      if (host === 'benormedia.com') add('warn', 'link', l.line, 'use a path or page:slug for links to BenorMedia pages');
    } else if (href.startsWith('#')) {
      /* anchor on the same page */
    } else add('FAIL', 'link', l.line, `unsupported link "${href}" (use page:slug, a live path, or https://)`);
  }
  for (const [href, n] of counts) if (n > 2) add('warn', 'link', 1, `${href} is linked ${n} times (maximum 2)`);
  if (!T?.noMeta && type !== 'hub' && ![...links].some((l) => l.href.startsWith('page:') || LIVE_PATHS.has(l.href.split('#')[0]))) add('warn', 'link', 1, 'the page has no internal links');
  if (Array.isArray(data.related)) {
    for (const r of data.related) {
      if (ctx.known && !ctx.known.has(r) && !LIVE_PATHS.has(r)) add('FAIL', 'link', 1, `related "${r}" is not a known slug`);
      if (r === data.slug) add('FAIL', 'link', 1, 'related lists the page itself');
    }
  }
  if (Array.isArray(data.inbound)) data.inbound.forEach((x, i) => { if (!x?.from || !x?.anchor) add('FAIL', 'front', 1, `inbound item ${i + 1} needs from and anchor`); });

  // ---- keyword known?
  if (ctx.keywords && data.primaryKeyword && data.primaryKeyword !== 'none' && !ctx.keywords.has(String(data.primaryKeyword).toLowerCase())) {
    add('warn', 'keyword', 1, `primaryKeyword "${data.primaryKeyword}" is not in data/all-researched-terms.csv`);
  }

  // ---- release mode
  if (ctx.release) {
    if (data.draft !== false && !ctx.ignoreDraft) add('FAIL', 'release', 1, 'release blocked: draft is still true (the person who owns the final edit flips it at sign-off)');
    if (markers.length > 0) add('FAIL', 'release', markers[0].line, `release blocked: ${markers.length} open marker(s): ${[...new Set(markers.map((m) => m.id || '?'))].join(', ')}`);
    if (Array.isArray(data.blockedBy) && data.blockedBy.length) add('FAIL', 'release', 1, `release blocked: blockedBy ${data.blockedBy.join(', ')}`);
    if (/\[PERSON/.test(String(data.author || ''))) add('FAIL', 'release', 1, 'release blocked: author is still a marker');
    if (Array.isArray(data.volatile) && data.volatile.length && isoDate.test(String(data.volatileChecked || ''))) {
      const age = daysBetween(String(data.volatileChecked), today);
      if (age > 14) add(ctx.ignoreDraft ? 'warn' : 'FAIL', 'release', 1, `volatile facts were last checked ${age} days ago: recheck them on release day and update volatileChecked`);
    }
  }

  return { file, slug: data.slug || stem, data, issues, markers, words: visibleWords, avgSentence: avg, longest, h2: h2s.length, qh2: qCount, links, body, internalSlugs: [...internalSlugs] };
}

// ---- cross-file checks
function shingles(body, n = 7) {
  const words = stripMarkdown(body).toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(' '));
  return set;
}

export function crossCheck(results) {
  const out = [];
  const seen = { slug: new Map(), url: new Map(), title: new Map(), description: new Map(), h1: new Map() };
  for (const r of results) {
    for (const k of Object.keys(seen)) {
      const v = k === 'slug' ? r.slug : r.data?.[k];
      if (!v) continue;
      const key = String(v).trim().toLowerCase();
      if (seen[k].has(key)) out.push({ level: 'FAIL', code: 'duplicate', msg: `${k} "${clip(String(v), 60)}" is used by ${basename(seen[k].get(key))} and ${basename(r.file)}` });
      else seen[k].set(key, r.file);
    }
  }
  const sh = results.map((r) => ({ r, s: shingles(r.body) }));
  for (let i = 0; i < sh.length; i++) {
    for (let j = i + 1; j < sh.length; j++) {
      const a = sh[i], b = sh[j];
      if (a.r.data?.pageType === 'section' || b.r.data?.pageType === 'section') continue;
      if (a.r.data?.lang !== b.r.data?.lang) continue;
      const small = Math.min(a.s.size, b.s.size);
      if (small < 40) continue;
      let shared = 0;
      for (const x of a.s) if (b.s.has(x)) shared++;
      const ratio = shared / small;
      if (ratio >= 0.25) out.push({ level: 'FAIL', code: 'duplicate-text', msg: `${basename(a.r.file)} and ${basename(b.r.file)} share ${(ratio * 100).toFixed(0)}% of their 7-word phrases (near-duplicate text)` });
      else if (ratio >= 0.10) out.push({ level: 'warn', code: 'duplicate-text', msg: `${basename(a.r.file)} and ${basename(b.r.file)} share ${(ratio * 100).toFixed(0)}% of their 7-word phrases` });
    }
  }
  return out;
}

export function loadKeywordSet(packRoot) {
  const set = new Set();
  for (const f of ['data/all-researched-terms.csv', 'data/keyword-map.csv']) {
    const p = join(packRoot, f);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split('\n').slice(1)) {
      const cols = line.split(',');
      // keyword is the first column in all-researched-terms.csv and the second in keyword-map.csv
      for (const c of cols.slice(0, 3)) set.add(c.replace(/"/g, '').trim().toLowerCase());
    }
  }
  return set;
}
