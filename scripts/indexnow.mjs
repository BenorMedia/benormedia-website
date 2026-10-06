#!/usr/bin/env node
// Tell IndexNow search engines (Bing, Yandex, Naver, Seznam, Yep) about new or changed URLs.
// Google does not use IndexNow. Submit only URLs that are new or changed, right after the deploy that ships them.
//   node scripts/indexnow.mjs --dry-run https://www.benormedia.com/growth
//   node scripts/indexnow.mjs https://www.benormedia.com/growth https://www.benormedia.com/pricing
//   node scripts/indexnow.mjs --sitemap       every URL in the live sitemap (use sparingly)
const HOST = 'www.benormedia.com';
const KEY = '__INDEXNOW_KEY__'; // the key is public by design; it must equal the contents of public/<key>.txt
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
let urls = args.filter((a) => a.startsWith('http'));

if (args.includes('--sitemap')) {
  const index = await (await fetch(`https://${HOST}/sitemap-index.xml`)).text();
  for (const [, sm] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const xml = await (await fetch(sm)).text();
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
}
urls = [...new Set(urls)];

if (!urls.length) { console.error('No URLs given.'); process.exit(1); }
if (urls.some((u) => new URL(u).host !== HOST)) { console.error(`All URLs must be on ${HOST}.`); process.exit(1); }
if (KEY.startsWith('__')) { console.error('Set KEY at the top of this file first.'); process.exit(1); }

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
if (dryRun) { console.log(JSON.stringify(body, null, 2)); process.exit(0); }

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
// 200 = received, 202 = received and key validation pending, 400/403/422 = see https://www.indexnow.org/documentation
console.log(`${res.status} ${res.statusText}: submitted ${urls.length} URL(s)`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
