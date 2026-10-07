#!/usr/bin/env node
// Turns content/<slug>.md into outlines/<slug>.outline.md: one readable page outline per page
// (header table, content outline with CTA, proof strip, image and block directions, FAQ, schema markup,
// and a closing "for the editor" block). Nothing is invented: every line comes from the content file,
// the claims register (tier A company facts) or the page-type defaults below.
//
//   node scripts/build-outline.mjs                      all files in content/ -> outlines/
//   node scripts/build-outline.mjs content/x.md ...     chosen files
//   node scripts/build-outline.mjs --out some/dir ...
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readContentFile } from './lib/frontmatter.mjs';
import { findMarkers } from './lib/check.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.benormedia.com'; // the live canonical host (www)
const args = process.argv.slice(2);
let outDir = join(ROOT, 'outlines');
const inputs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out') outDir = resolve(args[++i]);
  else inputs.push(args[i]);
}
if (!inputs.length) inputs.push(join(ROOT, 'content'));
const files = [];
for (const p of inputs) {
  const abs = resolve(p);
  if (statSync(abs).isDirectory()) for (const f of readdirSync(abs).sort()) { if (f.endsWith('.md')) files.push(join(abs, f)); }
  else files.push(abs);
}

const plan = existsSync(join(ROOT, 'data/plan.json')) ? JSON.parse(readFileSync(join(ROOT, 'data/plan.json'), 'utf8')).pages : [];
const planBySlug = new Map(plan.map((p) => [p.slug, p]));
const titles = new Map(); // slug -> h1 for drafted pages
for (const f of readdirSync(join(ROOT, 'content'))) {
  if (!f.endsWith('.md')) continue;
  const r = readContentFile(readFileSync(join(ROOT, 'content', f), 'utf8'));
  if (r.data?.slug) titles.set(r.data.slug, r.data.h1 || r.data.title || r.data.slug);
}

// Schema constants. They follow the pattern already live on the three service pages: the provider is an inline
// Organization (so each page parses on its own), areaServed lists the six target countries, the audience is a
// BusinessAudience, @id is the canonical URL plus #service, and there are no offers, prices or ratings.
const ORG_ID = SITE + '/#organization';
const PROVIDER = { '@type': 'Organization', '@id': ORG_ID, name: 'BenorMedia', url: SITE + '/' };
const AREA_SERVED = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Denmark', 'Spain'].map((name) => ({ '@type': 'Country', name }));
const AUDIENCE = { '@type': 'BusinessAudience', audienceType: 'B2B SaaS and tech companies' };
const LIVE_NAMES = { '/custom-websites-migrations': 'Custom Websites & Migrations', '/growth': 'Growth (SEO/GEO + CRO)', '/ongoing-website-support': 'Ongoing Website Support', '/pricing': 'Pricing', '/work': 'Work', '/': 'Home' };
const PROOF_STRIP = '100+ launches · 6+ years of experience · $700M+ raised by our clients · Webflow Professional Partner';
// Tier A8: the two testimonials on the live site, word for word, with the result tiles shown next to them.
const TESTIMONIALS = {
  surfe: {
    quote: 'BenorMedia is a valued partner to us at Surfe. Communication is always easy, things get implemented quickly, and their ongoing support has become an important part of our day-to-day operations.',
    by: 'Trelise Mansfield, Head of Marketing, Surfe', tiles: '100 Perfect SEO score · 3x Faster go-to-market',
  },
  puzzle: {
    quote: 'For more than a year, BenorMedia has been an essential partner in our growth. They created a flexible, system-driven website that helps us launch faster, experiment more, and scale our digital presence with ease.',
    by: 'Ozgur Uzuner, CEO, Puzzle', tiles: '150+ New pages and components · 3x Faster workflows',
  },
};

const TYPE_LABEL = {
  service: ['Commercial Page', 'New Commercial Page'], industry: ['Industry Page', 'New Industry Page'],
  regional: ['Regional Page', 'New Regional Page'], guide: ['Guide', 'New Guide'], comparison: ['Comparison Page', 'New Comparison Page'],
  'data-study': ['Data Study', 'New Data Study'], tool: ['Tool Page', 'New Tool Page'], hub: ['Hub Page', 'New Hub Page'],
  section: ['Page Section', 'New Section for an Existing Page'], 'case-study-template': ['Case Study Template', 'Case Study Template'],
};

const urlOfSlug = (slug) => (planBySlug.get(slug)?.url) || ('/' + slug);
const abs = (u) => (u.startsWith('http') ? u : SITE + (u === '/' ? '/' : u));
function convertLinks(text) {
  return text
    .replace(/\]\(page:([a-z0-9-]+)(#[^)\s]*)?\)/g, (_, s, h) => `](${abs(urlOfSlug(s))}${h || ''})`)
    .replace(/\]\((\/[^)\s/][^)\s]*|\/)\)/g, (_, p) => `](${abs(p)})`);
}
const trimBlank = (s) => s.replace(/^\n+|\n+$/g, '');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function longDate(iso) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso)); return m ? `${MONTHS[+m[2] - 1]} ${+m[3]}, ${m[1]}` : String(iso); }
const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');

function splitSections(body) {
  const lines = body.split('\n');
  const sections = [];
  let cur = { title: null, lines: [] };
  for (const l of lines) {
    const m = /^##\s+(.*?)\s*$/.exec(l);
    if (m && !/^###/.test(l)) { sections.push(cur); cur = { title: m[1], lines: [] }; } else cur.lines.push(l);
  }
  sections.push(cur);
  return sections; // sections[0] is the lead
}
function captionize(text) {
  return text.replace(/^Table:\s*(.*)$/gm, '*Table caption: $1*');
}

function build(file) {
  const raw = readFileSync(file, 'utf8');
  const { data: d, body, errors } = readContentFile(raw);
  if (errors.length) throw new Error(`${file}: front matter errors: ${errors.map((e) => e.msg).join('; ')}`);
  const type = d.pageType;
  const [heading, typeLabel] = TYPE_LABEL[type] || ['Page', 'New Page'];
  const plansEntry = planBySlug.get(d.slug) || {};
  const sections = splitSections(body);
  const lead = trimBlank(sections[0].lines.join('\n'));
  const rest = sections.slice(1);
  const faq = Array.isArray(d.faq) ? d.faq : [];
  const markers = findMarkers(raw);
  const isCommercial = ['service', 'industry', 'regional'].includes(type);
  const isArticle = ['guide', 'comparison', 'data-study'].includes(type);
  const o = [];
  const push = (...x) => o.push(...x);

  push(`# **${heading} Outline**`, '');
  push(`Main Keyword: ${d.primaryKeyword}`, '');
  if (type === 'section') {
    push('| Type: | ' + typeLabel + ' |', '| :---- | :---- |');
    push(`| **Goes into:** | ${cell(d.insertInto)} |`);
    push(`| **Live URL of the page it joins:** | ${abs(d.url)} |`);
  } else {
    push('| Type: | ' + typeLabel + ' |', '| :---- | :---- |');
    // commercial pages follow the outline template (title under 50, meta under 150); articles get a little more room
    const [tMax, dMax] = isArticle ? [60, 160] : [50, 150];
    push(`| **Title (<${tMax} char):** | ${cell(d.title)} (${String(d.title).length} characters) |`);
    push(`| **Meta Description (<${dMax} char):** | ${cell(d.description)} (${String(d.description).length} characters) |`);
    push(`| **Suggested URL:** | ${abs(d.url)} |`);
  }
  push(`| **Alternate Keywords** | ${cell((d.secondaryKeywords || []).join(', '))} |`);
  const notes = [
    `Role in the plan: ${plansEntry.role || 'n/a'}; pillar: ${plansEntry.pillar || 'n/a'}; language and country: ${d.lang}, ${d.targetCountry || 'n/a'}.`,
    isCommercial
      ? 'Layout follows the commercial page outline template: short sections of one framing line and a few bullets, with an image direction after each. The long, sourced how-to content lives in the linked guide.'
      : '',
    'Square brackets are directions or gaps for a person to fill. Every gap shows the default that applies if nobody answers it.',
    'Links to other new pages go live together with those pages. Status: draft, not approved. A person owns the facts and the final edit.',
  ].filter(Boolean);
  push(`| **Notes:** | ${cell(notes.join(' '))} |`, '');
  push('Content Outline', '');

  // eyebrow
  const eyebrowByType = { guide: 'Guides', comparison: 'Guides', 'data-study': 'Original data', hub: 'Guides', tool: 'Free tool', section: null };
  const eyebrow = d.eyebrow || (isCommercial ? (d.breadcrumb?.length > 2 ? d.breadcrumb[d.breadcrumb.length - 2].name : 'Webflow websites') : eyebrowByType[type]);
  if (eyebrow) push(`\\[Eyebrow:\\] ${eyebrow}`, '');
  if (type !== 'section') push(`# **${d.h1}**`, '');
  // Byline, dates and recheck line: guides, comparisons and data studies only (Sergio, 2026-10-07).
  // A commercial page never shows them; its dates stay hidden metadata for the sitemap and the review calendar.
  if (isArticle) {
    push('\\[Byline under the H1 (guides only):\\]', '', `By ${d.author} | Published ${longDate(d.publishedAt)} | Updated ${longDate(d.updatedAt)} | Rechecked every ${d.reviewEvery} days`, '');
  }
  push(convertLinks(captionize(lead)), '');
  if (Array.isArray(d.takeaways) && d.takeaways.length) {
    push('\\[Key takeaways box under the lead:\\]', '');
    for (const t of d.takeaways) push(`* ${convertLinks(t)}`);
    push('');
  }
  const ctaLine = type === 'service' ? '\\[CTA button: Get in Touch (same link as the header button)\\] \\[CTA button: [See Pricing](' + SITE + '/pricing)\\]'
    : (type === 'industry' || type === 'regional') ? '\\[CTA button: Get in Touch (same link as the header button)\\] \\[CTA button: [See Our Work](' + SITE + '/work)\\]' : null;
  if (ctaLine) push(ctaLine, '');
  if (isCommercial) push('\\[Add proof strip below\\]', '', PROOF_STRIP, '');

  // sections with image directions at the end of the matching section
  // commercial pages alternate right and left aligned images, as in the outline template; articles use full-width images
  const visuals = Array.isArray(d.visuals) ? d.visuals : [];
  const used = new Set();
  let imgCount = 0;
  const imgLine = (v, placed) => {
    const kind = isCommercial ? ((v.side ? v.side === 'right' : imgCount % 2 === 0) ? 'Right-aligned' : 'Left-aligned') : 'Full-width';
    imgCount++;
    return `\\[${kind} image suggestion${placed ? '' : ` (place after "${v.after}")`}: ${v.brief}${v.alt ? ` Alt text: "${v.alt}"` : ''}\\]`;
  };
  // testimonial block (commercial pages): placed after the section named in `testimonialAfter`, else just before the FAQ
  let testimonialDone = false;
  const pushTestimonial = () => {
    testimonialDone = true;
    const tk = d.testimonial === 'both' ? ['surfe', 'puzzle'] : d.testimonial && TESTIMONIALS[d.testimonial] ? [d.testimonial] : [];
    if (tk.length) {
      push('\\[Add testimonial block, quote word for word (CLAIMS-REGISTER.md A8):\\]', '');
      for (const k of tk) push(`> "${TESTIMONIALS[k].quote}"`, '>', `> ${TESTIMONIALS[k].by}`, '', `\\[Result tiles shown beside it on the home page: ${TESTIMONIALS[k].tiles}\\]`, '');
    } else {
      push('\\[Add testimonial block: quote one of the two client testimonials from the home page, word for word, with name and role. The exact wording is in CLAIMS-REGISTER.md section A8\\]', '');
    }
  };
  rest.forEach((s) => {
    push(`## **${s.title}**`, '');
    push(convertLinks(captionize(trimBlank(s.lines.join('\n')))), '');
    visuals.forEach((v, i) => {
      if (!used.has(i) && (v.after === s.title || (v.after && s.title.startsWith(v.after)))) {
        used.add(i);
        push(imgLine(v, true), '');
      }
    });
    if (isCommercial && d.testimonialAfter && d.testimonialAfter === s.title) pushTestimonial();
  });
  visuals.forEach((v, i) => { if (!used.has(i)) push(imgLine(v, false), ''); });
  if (isCommercial && !testimonialDone) pushTestimonial();

  if (faq.length) {
    push('\\[Add accordion FAQs section, as on ' + SITE + '/custom-websites-migrations\\]', '');
    push(`## **${d.faqHeading}**`, '');
    for (const f of faq) { push(`### **${f.q}**`, '', convertLinks(f.a), ''); }
  }

  // closing block
  if (type !== 'section') {
    const subject = d.service?.name || d.h1;
    const closeH2 = d.closing?.heading || (isCommercial ? `Plan your ${subject} with BenorMedia` : 'Talk to BenorMedia about your own site');
    const closeP = d.closing?.text || (isCommercial ? 'Tell us about your site and what has to be true at launch. One of our team members will be in touch within 24 hours.' : 'Questions about applying this to your own site? One of our team members will be in touch within 24 hours.');
    push(`## **${closeH2}**`, '', convertLinks(closeP), '', ctaLine || '\\[CTA button: Get in Touch (same link as the header button)\\]', '');
    const rel = (d.related || []).map((r) => {
      const slug = r.startsWith('/') ? null : r;
      const u = slug ? urlOfSlug(slug) : r;
      const name = slug ? (planBySlug.get(slug)?.label ? planBySlug.get(slug).label + (titles.has(slug) ? '' : ' (page planned)') : (titles.get(slug) || slug)) : (LIVE_NAMES[r] || r);
      return `* [${name}](${abs(u)})`;
    });
    if (rel.length) push('\\[Related links for the closing block, pillar first:\\]', '', ...rel, '');
  }
  // Articles carry a visible source list. A commercial page does not: its sources are listed in the editor block below.
  if (isArticle && Array.isArray(d.sources) && d.sources.length) {
    push('\\[Sources list at the foot of the page:\\]', '');
    for (const s of d.sources) push(`* [${s.label}](${s.url}), accessed ${longDate(s.accessed)}`);
    push('');
  }

  // schema
  if (type !== 'section') {
    push('Schema Markup', '');
    const pageUrl = abs(d.url);
    const graph = [];
    if (['service', 'industry', 'regional'].includes(type) && d.service) {
      graph.push({ '@type': 'Service', '@id': pageUrl + '#service', name: d.service.name, serviceType: d.service.serviceType, url: pageUrl, description: d.description, provider: PROVIDER, areaServed: AREA_SERVED, audience: AUDIENCE });
    }
    const authorIsMarker = /\[(?:FACT NEEDED|VERIFY|PERSON)\b/.test(String(d.author));
    if (isArticle) {
      graph.push({
        '@type': 'Article', '@id': pageUrl + '#article', headline: d.h1, description: d.description, url: pageUrl, mainEntityOfPage: pageUrl, inLanguage: d.lang,
        datePublished: String(d.publishedAt), dateModified: String(d.updatedAt),
        author: authorIsMarker ? { '@type': 'Organization', '@id': ORG_ID, name: 'BenorMedia' } : { '@type': 'Person', name: String(d.author) },
        publisher: PROVIDER,
      });
    }
    if (type === 'hub') graph.push({ '@type': 'CollectionPage', '@id': pageUrl + '#collection', name: d.h1, description: d.description, url: pageUrl, inLanguage: d.lang });
    const faqOk = faq.filter((f) => !/\[(?:FACT NEEDED|VERIFY|PERSON)\b/.test(f.a));
    if ((d.schema || []).includes('FAQPage') && faqOk.length) {
      graph.push({ '@type': 'FAQPage', mainEntity: faqOk.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
    }
    if (Array.isArray(d.breadcrumb) && d.breadcrumb.length) {
      graph.push({ '@type': 'BreadcrumbList', itemListElement: d.breadcrumb.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: abs(b.url) })) });
    }
    push('\\[Direction: the build generates this markup from the front matter with the site\'s own JSON-LD helper. It follows the pattern on the live service pages. The FAQ answers are the same text as the visible FAQ.\\]', '');
    push('```html', '<script type="application/ld+json">', JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2), '</script>', '```', '');
    if (isArticle && authorIsMarker) push('\\[Direction: replace the Organization author above with the named person once gap G1 is answered\\]', '');
  } else {
    push('Schema Markup', '', 'None. This section joins a live page that already carries its own markup.', '');
  }

  // editor block
  push('---', '', '## For the editor (not part of the page)', '');
  const blocked = Array.isArray(d.blockedBy) ? d.blockedBy : [];
  push(`Blocked by: ${blocked.length ? blocked.join(', ') : 'nothing'}. Draft flag: ${d.draft}.`, '');
  if (!isArticle && type !== 'section') {
    push(`Hidden metadata for the build (never shown on the page): published ${d.publishedAt}, updated ${d.updatedAt}, review every ${d.reviewEvery} days. They feed the sitemap and the review calendar. This page type shows no byline, no dates and no author.`, '');
  }
  if (Array.isArray(d.editorNotes) && d.editorNotes.length) { push('Look at first:', ''); for (const n of d.editorNotes) push(`* ${n}`); push(''); }
  const seen = new Set();
  const rows = [];
  for (const m of markers) {
    if (!m.valid || seen.has(m.raw)) continue;
    seen.add(m.raw);
    rows.push(`| #${m.id} | ${m.kind} | ${cell(m.question)} | ${cell(m.action)} |`);
  }
  if (rows.length) {
    push('Gaps on this page:', '', '| Id | Kind | Question | Default if nobody answers |', '| :---- | :---- | :---- | :---- |', ...rows, '');
  }
  if (!isArticle && Array.isArray(d.sources) && d.sources.length) {
    push('Sources behind the outside facts on this page (not shown as a list on the page):', '');
    for (const s of d.sources) push(`* [${s.label}](${s.url}), accessed ${longDate(s.accessed)}`);
    push('');
  }
  if (Array.isArray(d.volatile) && d.volatile.length) {
    push(`Facts to recheck before release (last checked ${d.volatileChecked || 'n/a'}):`, '');
    for (const v of d.volatile) push(`* ${v.claim}. Source: ${v.source}. Recheck: ${v.recheck}`);
    push('');
  }
  if (Array.isArray(d.inbound) && d.inbound.length) {
    push('Links to add on other pages, pointing here:', '');
    for (const l of d.inbound) push(`* On ${abs(l.from)}: anchor "${l.anchor}", ${l.where}`);
    push('');
  }
  return o.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '\n');
}

mkdirSync(outDir, { recursive: true });
for (const f of files) {
  const out = join(outDir, basename(f, '.md') + '.outline.md');
  writeFileSync(out, build(f));
  console.log('wrote', out);
}
