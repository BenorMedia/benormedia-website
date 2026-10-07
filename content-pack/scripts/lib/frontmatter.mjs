// Front matter reader for the content files. Dependency-free.
// Supports the YAML subset the content rules allow (see RULES.md section 7):
//   key: value            plain, "double-quoted" or 'single-quoted' strings, true/false/null, numbers
//   key: [a, b, "c, d"]   flow lists of simple values
//   key:                  block lists ("- item"), lists of one-level maps ("- q: ..." plus indented keys), nested maps
//   key: |  or  key: >-   block text (literal or folded)
// Anything outside the subset is reported as an error with its line number.

export function splitFrontMatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(text);
  if (!m) return null;
  const raw = m[1];
  const rawLines = raw.split(/\r?\n/).length;
  return {
    raw,
    body: text.slice(m[0].length),
    rawStartLine: 2, // the line after the opening fence
    bodyStartLine: rawLines + 3, // opening fence, raw lines, closing fence
  };
}

function stripComment(s) {
  let q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '\\' && q === '"') { i++; continue; }
      if (c === q) {
        if (q === "'" && s[i + 1] === "'") { i++; continue; }
        q = null;
      }
    } else if (c === '"' || c === "'") {
      if (i === 0 || /[\s\[,]/.test(s[i - 1])) q = c;
    } else if (c === '#' && (i === 0 || /\s/.test(s[i - 1]))) {
      return s.slice(0, i).trimEnd();
    }
  }
  return s.trimEnd();
}

function parseQuoted(s, lineNo, errors) {
  const q = s[0];
  let out = '';
  let i = 1;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q === '"' && c === '\\') {
      const n = s[i + 1];
      const map = { n: '\n', t: '\t', '"': '"', '\\': '\\', '/': '/' };
      if (n in map) { out += map[n]; i++; continue; }
      errors.push({ line: lineNo, msg: `unsupported escape \\${n} in a double-quoted string` });
      out += n; i++; continue;
    }
    if (q === "'" && c === "'") {
      if (s[i + 1] === "'") { out += "'"; i++; continue; }
      break;
    }
    if (q === '"' && c === '"') break;
    out += c;
  }
  if (i >= s.length) {
    errors.push({ line: lineNo, msg: 'unterminated quoted string (keep each quoted value on one line)' });
    return [out, s.length];
  }
  return [out, i + 1];
}

function parsePlain(s) {
  const t = s.trim();
  if (t === '' || t === '~' || t === 'null') return null;
  if (t === 'true') return true;
  if (t === 'false') return false;
  if (/^-?\d+$/.test(t)) return Number(t);
  if (/^-?\d+\.\d+$/.test(t)) return Number(t);
  return t;
}

function parseScalar(str, lineNo, errors) {
  const s = str.trim();
  if (s[0] === '"' || s[0] === "'") {
    const [val, end] = parseQuoted(s, lineNo, errors);
    if (s.slice(end).trim() !== '') errors.push({ line: lineNo, msg: 'text after a closing quote' });
    return val;
  }
  if (s[0] === '{' || s[0] === '&' || s[0] === '*' || s[0] === '!' || s[0] === '%' || s[0] === '@' || s[0] === '`') {
    errors.push({ line: lineNo, msg: `a value cannot start with "${s[0]}" (quote it)` });
  }
  if (/: /.test(s) || /:$/.test(s)) {
    errors.push({ line: lineNo, msg: 'a plain value contains ": " (quote the whole value)' });
  }
  return parsePlain(s);
}

function splitFlow(inner, lineNo, errors) {
  const items = [];
  let cur = '';
  let q = null;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (q) {
      cur += c;
      if (c === '\\' && q === '"') { cur += inner[++i] ?? ''; continue; }
      if (c === q) {
        if (q === "'" && inner[i + 1] === "'") { cur += inner[++i]; continue; }
        q = null;
      }
    } else if (c === '"' || c === "'") { q = c; cur += c; }
    else if (c === ',') { items.push(cur); cur = ''; }
    else cur += c;
  }
  if (q) errors.push({ line: lineNo, msg: 'unterminated quote inside a [list]' });
  if (cur.trim() !== '' || items.length > 0) items.push(cur);
  return items.map((x) => parseScalar(x, lineNo, errors)).filter((x) => x !== undefined);
}

function parseValueText(text, lineNo, errors) {
  const s = stripComment(text).trim();
  if (s[0] === '[') {
    if (s[s.length - 1] !== ']') {
      errors.push({ line: lineNo, msg: 'a [list] must open and close on the same line' });
      return [];
    }
    const inner = s.slice(1, -1).trim();
    return inner === '' ? [] : splitFlow(inner, lineNo, errors);
  }
  return parseScalar(s, lineNo, errors);
}

export function parseYamlSubset(raw, lineOffset = 2) {
  const errors = [];
  const toks = raw.split(/\r?\n/).map((text, i) => {
    const no = i + lineOffset;
    if (/^\s*$/.test(text)) return { blank: true, no, text, indent: -1 };
    if (/^\s*#/.test(text)) return { blank: true, comment: true, no, text, indent: -1 };
    const indent = /^ */.exec(text)[0].length;
    if (/^\s*\t/.test(text)) errors.push({ line: no, msg: 'tab used for indentation' });
    return { indent, s: text.slice(indent), no, text };
  });
  let pos = 0;

  const skipBlank = () => { while (pos < toks.length && toks[pos].blank) pos++; };

  function blockScalar(header, parentIndent, lineNo) {
    const folded = header[0] === '>';
    const strip = header.includes('-');
    const lines = [];
    let blockIndent = null;
    while (pos < toks.length) {
      const t = toks[pos];
      if (t.blank && !t.comment) { lines.push(''); pos++; continue; }
      if (t.comment && t.indent === -1) {
        // a comment-looking line inside a block scalar is text if indented deeper
        const ci = /^ */.exec(t.text)[0].length;
        if (ci > parentIndent) { lines.push(t.text.slice(blockIndent ?? ci)); pos++; continue; }
        break;
      }
      if (t.indent <= parentIndent) break;
      if (blockIndent === null) blockIndent = t.indent;
      lines.push(t.text.slice(Math.min(blockIndent, t.indent)));
      pos++;
    }
    while (lines.length && lines[lines.length - 1] === '') lines.pop();
    let out;
    if (!folded) out = lines.join('\n');
    else {
      out = '';
      let prevBlank = false;
      lines.forEach((l, i) => {
        if (l === '') { out += '\n'; prevBlank = true; return; }
        if (i > 0 && !prevBlank) out += ' ';
        out += l;
        prevBlank = false;
      });
    }
    if (!strip) out += '\n';
    return out;
  }

  function parseNode(minIndent) {
    skipBlank();
    if (pos >= toks.length) return null;
    const t = toks[pos];
    if (t.indent < minIndent) return null;
    if (t.s === '-' || t.s.startsWith('- ')) return parseList(t.indent);
    return parseMap(t.indent);
  }

  function parseList(indent) {
    const arr = [];
    while (true) {
      skipBlank();
      if (pos >= toks.length) break;
      const t = toks[pos];
      if (t.indent !== indent || !(t.s === '-' || t.s.startsWith('- '))) break;
      const after = t.s.slice(1);
      const itemText = after.trimStart();
      const offset = t.s.length - itemText.length;
      if (itemText === '') {
        pos++;
        arr.push(parseNode(indent + 1));
        continue;
      }
      if (/^[A-Za-z0-9_-]+:(\s|$)/.test(itemText) && itemText[0] !== '"' && itemText[0] !== "'") {
        toks[pos] = { ...t, indent: indent + offset, s: itemText };
        arr.push(parseMap(indent + offset));
        continue;
      }
      pos++;
      arr.push(parseValueText(itemText, t.no, errors));
    }
    return arr;
  }

  function parseMap(indent) {
    const obj = {};
    while (true) {
      skipBlank();
      if (pos >= toks.length) break;
      const t = toks[pos];
      if (t.indent < indent) break;
      if (t.indent > indent) {
        errors.push({ line: t.no, msg: 'unexpected indentation' });
        pos++;
        continue;
      }
      if (t.s === '-' || t.s.startsWith('- ')) break;
      const m = /^([A-Za-z0-9_-]+):(?:[ \t]+(.*))?$/.exec(t.s);
      if (!m) {
        errors.push({ line: t.no, msg: `cannot read this line as "key: value": ${t.s.slice(0, 60)}` });
        pos++;
        continue;
      }
      const key = m[1];
      const rest = m[2] === undefined ? '' : stripComment(m[2]).trim();
      pos++;
      if (key in obj) errors.push({ line: t.no, msg: `duplicate key "${key}"` });
      if (rest === '') {
        // value on the following lines
        let j = pos;
        while (j < toks.length && toks[j].blank) j++;
        if (j < toks.length && toks[j].indent > indent) obj[key] = parseNode(indent + 1);
        else if (j < toks.length && toks[j].indent === indent && (toks[j].s === '-' || toks[j].s.startsWith('- '))) obj[key] = parseList(indent);
        else obj[key] = null;
      } else if (/^[|>][+-]?$/.test(rest)) {
        obj[key] = blockScalar(rest, indent, t.no);
      } else {
        obj[key] = parseValueText(m[2], t.no, errors);
      }
    }
    return obj;
  }

  const data = parseNode(0) ?? {};
  skipBlank();
  if (pos < toks.length) errors.push({ line: toks[pos].no, msg: 'could not read the rest of the front matter' });
  return { data, errors };
}

export function readContentFile(text) {
  const fm = splitFrontMatter(text);
  if (!fm) return { fm: null, data: {}, errors: [{ line: 1, msg: 'no front matter block (---) at the top of the file' }], body: text, bodyStartLine: 1, raw: '' };
  const { data, errors } = parseYamlSubset(fm.raw, fm.rawStartLine);
  return { fm, data, errors, body: fm.body, bodyStartLine: fm.bodyStartLine, raw: fm.raw };
}
