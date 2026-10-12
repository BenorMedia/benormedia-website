// Prints the parsed front matter of a content file as JSON (used by the cross-check test).
import { readFileSync } from 'node:fs';
import { readContentFile } from './frontmatter.mjs';
const f = process.argv[2];
const r = readContentFile(readFileSync(f, 'utf8'));
console.log(JSON.stringify({ data: r.data, errors: r.errors }));
