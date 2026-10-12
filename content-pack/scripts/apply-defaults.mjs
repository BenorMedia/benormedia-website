#!/usr/bin/env node
// Applies the default action of every open marker, so a page can ship leaner but accurate when nobody answers.
//   node scripts/apply-defaults.mjs content/<slug>.md --out defaulted/<slug>.md
//   node scripts/apply-defaults.mjs content/<slug>.md --write                 (in place)
//   node scripts/apply-defaults.mjs content/<slug>.md --skip G1,MIG-2 --out x.md   leave those ids untouched (you are resolving them by hand)
// Actions: DELETE-LINE, DELETE-SECTION, DELETE-ITEM (front matter lists), KEEP, REPLACE: text. See RULES.md section 3.
// Exit code: 0 done, 1 a marker could not be applied, 2 usage.
import { readFileSync, writeFileSync } from 'node:fs';
import { splitFrontMatter } from './lib/frontmatter.mjs';
import { findMarkers } from './lib/check.mjs';

const argv = process.argv.slice(2);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const file = argv.find((a) => !a.startsWith('--') && a !== opt('--out') && a !== opt('--skip'));
if (!file) { console.error('usage: node scripts/apply-defaults.mjs <file> [--out <file> | --write] [--skip ID,ID]'); process.exit(2); }
const skip = new Set((opt('--skip') || '').split(',').filter(Boolean));

const text = readFileSync(file, 'utf8');
const fm = splitFrontMatter(text);
if (!fm) { console.error('no front matter'); process.exit(2); }
const lines = text.split('\n');
const bodyStart = fm.bodyStartLine - 1; // 0-based index of the first body line
const del = new Array(lines.length).fill(false);
const problems = [];
const applied = [];

const markers = findMarkers(text).filter((m) => m.valid && !skip.has(m.id));
for (const m of findMarkers(text).filter((x) => !x.valid)) problems.push(`L${m.line}: malformed marker ${m.raw.slice(0, 80)}`);

const headingLevel = (s) => { const h = /^(#{1,6})\s+\S/.exec(s); return h ? h[1].length : 0; };
const isTableRow = (s) => /^\s*\|/.test(s);
const isListItem = (s) => /^\s*(?:[-*]|\d+\.)\s+/.test(s);

// 1. inline edits (KEEP, REPLACE), right to left within each line
const inline = markers.filter((m) => m.action === 'KEEP' || m.action.startsWith('REPLACE: '));
for (const m of [...inline].sort((a, b) => b.index - a.index)) {
  const li = m.line - 1;
  const inFront = li < bodyStart;
  let rep = m.action === 'KEEP' ? '' : m.action.slice(9);
  if (inFront && /["\\]/.test(rep)) { problems.push(`L${m.line}: REPLACE text in front matter must not contain quotes or backslashes`); continue; }
  const col = m.index - lines.slice(0, li).join('\n').length - (li > 0 ? 1 : 0);
  const line = lines[li];
  let before = line.slice(0, col);
  let after = line.slice(col + m.raw.length);
  if (rep === '') { // tidy the space left behind
    if (/\s$/.test(before) && /^[\s.,;:)]/.test(after)) before = before.replace(/\s+$/, '');
  }
  lines[li] = before + rep + after;
  applied.push({ id: m.id, action: m.action.split(':')[0], line: m.line });
}

// 2. deletions. Positions are looked up in the edited lines, so find markers again by id and line.
function findLineOf(m) { return m.line - 1; }
function deleteBlock(li) {
  if (isTableRow(lines[li])) { del[li] = true; return; }
  if (isListItem(lines[li])) {
    del[li] = true;
    for (let k = li + 1; k < lines.length && /^\s{2,}\S/.test(lines[k]) && !isListItem(lines[k]); k++) del[k] = true;
    return;
  }
  let a = li, b = li;
  while (a > bodyStart && lines[a - 1].trim() !== '' && !headingLevel(lines[a - 1]) && !isListItem(lines[a - 1]) && !isTableRow(lines[a - 1])) a--;
  while (b + 1 < lines.length && lines[b + 1].trim() !== '' && !headingLevel(lines[b + 1]) && !isListItem(lines[b + 1]) && !isTableRow(lines[b + 1])) b++;
  for (let k = a; k <= b; k++) del[k] = true;
}
function deleteSection(li) {
  let h = li;
  while (h >= bodyStart && !headingLevel(lines[h])) h--;
  if (h < bodyStart) { problems.push(`L${li + 1}: DELETE-SECTION used outside any heading`); return; }
  const lvl = headingLevel(lines[h]);
  let e = h + 1;
  while (e < lines.length && !(headingLevel(lines[e]) && headingLevel(lines[e]) <= lvl)) e++;
  for (let k = h; k < e; k++) del[k] = true;
}
function deleteItem(li) {
  let s = li;
  while (s >= 0 && !/^\s*-\s/.test(lines[s])) s--;
  if (s < 0 || s >= bodyStart) { problems.push(`L${li + 1}: DELETE-ITEM found no list item in the front matter`); return; }
  const ind = /^ */.exec(lines[s])[0].length;
  let e = s + 1;
  while (e < bodyStart && (lines[e].trim() === '' || /^ */.exec(lines[e])[0].length > ind)) e++;
  for (let k = s; k < e; k++) del[k] = true;
}
for (const m of markers) {
  const a = m.action;
  if (a === 'KEEP' || a.startsWith('REPLACE: ')) continue;
  const li = findLineOf(m);
  if (a === 'DELETE-LINE') deleteBlock(li);
  else if (a === 'DELETE-SECTION') deleteSection(li);
  else if (a === 'DELETE-ITEM') deleteItem(li);
  applied.push({ id: m.id, action: a, line: m.line });
}

// 3. rebuild, then tidy tables and blank lines
let out = lines.filter((_, i) => !del[i]);
const bodyIdx = out.findIndex((l, i) => i > 0 && /^---\s*$/.test(l)) + 1; // first line after the closing fence
const head = out.slice(0, bodyIdx);
let body = out.slice(bodyIdx);

// drop tables left without data rows, and orphan captions
for (let i = 0; i < body.length; i++) {
  if (isTableRow(body[i]) && !isTableRow(body[i - 1] || '')) {
    let j = i;
    while (j < body.length && isTableRow(body[j])) j++;
    const rows = j - i;
    if (rows <= 2) {
      let c = i - 1;
      while (c >= 0 && body[c].trim() === '') c--;
      const from = c >= 0 && /^Table:/.test(body[c]) ? c : i;
      for (let k = from; k < j; k++) body[k] = '\u0000';
    }
    i = j - 1;
  }
}
for (let i = 0; i < body.length; i++) {
  if (/^Table:/.test(body[i])) {
    let j = i + 1;
    while (j < body.length && body[j].trim() === '') j++;
    if (!isTableRow(body[j] || '')) body[i] = '\u0000';
  }
}
body = body.filter((l) => l !== '\u0000');
// collapse blank runs
const tidy = [];
for (const l of body) { if (l.trim() === '' && tidy.length && tidy[tidy.length - 1].trim() === '') continue; tidy.push(l); }
const result = [...head, ...tidy].join('\n').replace(/\n+$/, '\n');

const dest = opt('--out');
if (argv.includes('--write')) writeFileSync(file, result);
else if (dest) writeFileSync(dest, result);
else process.stdout.write(result);

const byAction = {};
for (const a of applied) byAction[a.action] = (byAction[a.action] || 0) + 1;
console.error(`applied ${applied.length} default(s): ${Object.entries(byAction).map(([k, v]) => `${k} x${v}`).join(', ') || 'none'}${skip.size ? `; left alone: ${[...skip].join(', ')}` : ''}`);
for (const p of problems) console.error(`PROBLEM ${p}`);
process.exit(problems.length ? 1 : 0);
