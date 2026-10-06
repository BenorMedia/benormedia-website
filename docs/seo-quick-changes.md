# benormedia.com: quick changes on existing pages

Task brief for Claude Code. Prepared 2026-10-06 from the "Quick changes on existing pages" table in the [Benor Media SEO & AEO Plan](https://claude.ai/code/artifact/150ca2c2-121a-4cb8-839e-de8d64b828da). Current values below were read from the live site's HTML (Ahrefs crawl of 2026-10-05), decisions come from Sergio's answers in the plan, and new copy is a proposal. Verify against the repo before relying on any of it.

## How to run this (Sergio)

1. Save this file in the site repo, for example as `docs/seo-quick-changes.md`.
2. Edit the copy in task 5 if you want different wording. Everything else can run as written.
3. Open Claude Code in the repo root and paste:

   > Read docs/seo-quick-changes.md. Do the Discovery section first and show me what you found before you edit anything. Then work through the tasks on a new branch `seo/quick-changes`, one commit per task, and stop at any "STOP and ask" line. Do not merge, push to main or deploy. Finish with the report described at the end of the file.

4. What stays with you, because Claude Code cannot or should not do it:
   - unpublish the placeholder testimonials in Sanity if Claude Code has no access, and ask HireArt and SimpleTiger for real quotes (task 1);
   - approve the copy (task 5);
   - confirm the Webflow partner tier if the badge and the meta description disagree (task 10);
   - change redirects in the hosting dashboard if they are not in the repo (task 9);
   - add the site to Bing Webmaster Tools (task 8);
   - deploy, then run the post-deploy checks.

## Context

- Site: Astro. The built HTML reports `Astro v7.3.5`, the canonical host is `https://www.benormedia.com`, and pages ship as fully rendered HTML. The shared layout component is `BaseLayout`.
- Content: testimonial images load from Sanity (`cdn.sanity.io/images/t287mdlq/production`), and `/studio` is the Sanity Studio route. Google Tag Manager `GTM-M4MHRTDM` is loaded in the head.
- Hosting is not visible from outside. The crawl saw `308` redirects, which points to Vercel; confirm from the repo (`vercel.json`, `netlify.toml`, `wrangler.toml`, `_redirects`, `.vercel/`, CI workflows).
- Indexable pages today (8 in the sitemap): `/`, `/custom-websites-migrations`, `/growth`, `/ongoing-website-support`, `/pricing`, `/work`, `/privacy-policy`, `/terms-conditions`. `/testimonials` and `/cookie-policy` are `noindex`.
- Goal: make the existing pages readable by search engines and AI answer engines (clean titles and headings, structured data, crawler access) without changing the design.

Decisions Sergio has made (plan, open-questions table, 2026-10-06):

| Topic | Decision | What it changes here |
| --- | --- | --- |
| Organic priority | Bring leads for Webflow builds first | The copy in task 5 leads with Webflow agency, development and design terms |
| Name | "BenorMedia" | `name` is "BenorMedia"; "Benor Media" appears only as `alternateName` |
| Address and area | The address on the site, with the target countries as the service area | Organization address equals the footer address; `areaServed` is US, Canada, UK, Germany, Denmark, Spain |
| Platform | Stay on Astro | Every change ships in code |
| Webflow partner tier | Not decided | Task 10 has a STOP condition |

## Ground rules

1. No redesign. Do not change CSS or layout except where a task says so (task 5 changes which text is the H1; task 1 checks the marquee for gaps).
2. Do not invent facts. Names, URLs, the address and claims in this file were read from the live site. Anything that is neither here nor in the repo: ask.
3. Structured data must match visible content. No `aggregateRating`, `review`, `offers` or prices, and no claim the page does not make.
4. No new runtime dependencies. The three scripts in the appendix use Node built-ins and `curl` only.
5. One commit per task with a conventional message (`feat(seo): ...`, `fix(seo): ...`, `chore(seo): ...`), so any single task can be undone with `git revert`. Do not merge, force-push or deploy.
6. Never touch DNS mail records (MX, SPF, DKIM, DMARC), tokens or credentials. If a task needs access you do not have, write the steps for Sergio into the report and continue with the next task.
7. After every task: run the repo's build, then `node scripts/check-seo.mjs dist`. Failures for tasks you have not reached yet (for example a missing `llms.txt` before task 7) are expected; fix only regressions.

## Discovery (before editing anything)

Report the file paths for:

- the head and meta component that outputs `<title>`, the meta description, canonical and the Open Graph and Twitter tags (likely `BaseLayout`), and how a page passes its title and description;
- how JSON-LD is emitted today (BreadcrumbList on `/growth`, `/custom-websites-migrations` and `/ongoing-website-support`; FAQPage on `/custom-websites-migrations`). Reuse that pattern;
- the H1 and hero markup of `/`, `/custom-websites-migrations`, `/growth` and `/ongoing-website-support`, and whether the heading highlights a phrase with an accent span;
- the footer component (address, social links, partner badges);
- the source of the FAQ on `/pricing` (data array or inline markup);
- the Sanity testimonial schema, the queries that feed the home marquee and `/testimonials`, and any hard-coded testimonial fallback;
- `astro.config.*` (site, integrations, sitemap options, redirects), the contents of `public/` (robots.txt, icons, images) and any hosting config;
- the build command and output. If the build is server-rendered with no `dist/**/*.html`, run the preview server and use the URL mode of `scripts/check-seo.mjs`.

Then make the first commit: save the three scripts from the appendix as `scripts/check-seo.mjs`, `scripts/check-crawlers.sh` and `scripts/indexnow.mjs` (`chore(seo): add check scripts`). They are small and dependency-free, and every new page in the plan reuses them.

Suggested order: 10, 5, 2, 3, 4, 1, 7, 8, then 6 and 9. Task 10 creates the shared entity constants that tasks 2, 3 and 7 use, and task 5 fixes the descriptions that task 3 repeats.

## Tasks

### 1. Remove the placeholder testimonials

Why: filler text under a real company's name costs trust with buyers, and answer engines read the same text as Benor's own claim.

Evidence (raw HTML of the 2026-10-05 crawl; confirm against the current build). The home-page marquee holds four distinct cards, each repeated for the loop (the clones are `aria-hidden`):

| Card | Quote | Name and role | Logo alt |
| --- | --- | --- | --- |
| 1 | "BenorMedia is a valued partner to us at Surfe..." | Trelise Mansfield, Head of Marketing, Surfe | Surfe |
| 2 | "For more than a year, BenorMedia has been an essential partner..." | Ozgur Uzuner, CEO, Puzzle | Puzzle |
| 3 | "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." | Rob Alfano, VP of Digital, Verifone | HireArt |
| 4 | "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." | Rob Alfano, VP of Digital, Verifone | SimpleTiger |

Cards 3 and 4 are placeholders. The testimonial content most likely lives in Sanity, not in the repo, and the same entries probably feed `/testimonials`.

Do:

1. Search the repo: `grep -rniE "lorem ipsum|Rob Alfano|Verifone" --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git .`. Remove any hard-coded, seed or fallback occurrence.
2. Find the testimonial document type in the Sanity schema and the GROQ query behind the marquee and `/testimonials`.
3. If Sanity access already works in this environment (a logged-in CLI or a token that is already configured; never ask for or print a token), list the documents whose quote starts with "Lorem ipsum". **STOP and ask:** show Sergio the document IDs and unpublish only after he says yes. Unpublish, do not delete: he will turn them into real quotes. If you have no access, change nothing in Sanity and put these steps in the report: open `/studio`, go to Testimonials, open both "Rob Alfano" entries, choose Unpublish.
4. Once unpublished, a rebuild is needed for the static HTML to refresh. Check whether a Sanity webhook triggers a deploy and say so in the report.
5. With two cards left, check the marquee at 1440 px and 390 px: the track must still be full with no gap. If the loop repeats the set a fixed number of times, raise the repeat count instead of touching the design.
6. Do not write replacement quotes. Sergio will ask HireArt and SimpleTiger for approved ones.

Acceptance: `grep -ci "lorem ipsum" dist/index.html dist/testimonials/index.html` prints 0 for both, and `check-seo.mjs` shows "no Lorem ipsum" on every page.

### 2. Organization and WebSite markup on the home page

Why: it states the entity (name, logo, address, profiles) in a form machines read directly, and WebSite markup tells Google the site name.

Do: add one JSON-LD graph to the home page only. First create the shared constants (task 10), then render them.

```ts
// src/data/entity.ts (path is a suggestion; follow the repo's conventions)
export const SITE = 'https://www.benormedia.com';
export const ORG_ID = `${SITE}/#organization`;
export const ENTITY = {
  name: 'BenorMedia',
  alternateName: 'Benor Media',
  email: 'info@benor.media',
  // copy these from the footer component so the two cannot drift
  address: { streetAddress: 'C/ Dos de Maig, E1 6D', postalCode: '08013', addressLocality: 'Barcelona', addressCountry: 'ES' },
  areaServed: ['United States', 'Canada', 'United Kingdom', 'Germany', 'Denmark', 'Spain'],
  sameAs: [
    'https://www.linkedin.com/company/benormedia',
    'https://x.com/benormedia',
    'https://webflow.com/@benor-media',
  ],
} as const;
```

```astro
---
// src/components/JsonLd.astro (extend the existing JSON-LD helper instead, if there is one)
const { data } = Astro.props;
const json = JSON.stringify(data).replace(/</g, '\\u003c');
---
<script is:inline type="application/ld+json" set:html={json} />
```

Output on `/`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.benormedia.com/#organization",
      "name": "BenorMedia",
      "alternateName": "Benor Media",
      "url": "https://www.benormedia.com/",
      "logo": { "@type": "ImageObject", "url": "https://www.benormedia.com/apple-touch-icon.png", "width": 180, "height": 180 },
      "description": "<the home page meta description, verbatim>",
      "email": "info@benor.media",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "C/ Dos de Maig, E1 6D",
        "postalCode": "08013",
        "addressLocality": "Barcelona",
        "addressCountry": "ES"
      },
      "areaServed": [
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Germany" },
        { "@type": "Country", "name": "Denmark" },
        { "@type": "Country", "name": "Spain" }
      ],
      "knowsAbout": [
        "Webflow development", "Webflow migrations", "B2B SaaS website design",
        "Technical SEO", "Answer engine optimization", "Generative engine optimization",
        "Conversion rate optimization"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/benormedia",
        "https://x.com/benormedia",
        "https://webflow.com/@benor-media"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.benormedia.com/#website",
      "url": "https://www.benormedia.com/",
      "name": "BenorMedia",
      "alternateName": "Benor Media",
      "inLanguage": "en",
      "publisher": { "@id": "https://www.benormedia.com/#organization" }
    }
  ]
}
```

Notes:

- Logo: use `/apple-touch-icon.png` (square, 180 x 180) after opening it and confirming it is the brand mark. `/images/Logo.svg` (252 x 50 wordmark in the header) is the fallback.
- Address: the footer reads "C/ Dos de Maig / E1 6D, (08013) / Barcelona, Spain." Take the exact strings from the footer component.
- Do not add other profiles (Clutch, Sortlist, Awwwards and so on) unless Sergio supplies the URLs.
- No `SearchAction`: the site has no search.

Acceptance: `check-seo.mjs` reports Organization and WebSite on `/`; the graph parses as JSON; every value matches what the footer and head show.

### 3. Service markup on the three service pages

Why: it ties each service to the Organization so a model can say what Benor sells and to whom.

Do: add a `Service` object to each page, next to the JSON-LD it already has (add it to the existing graph or as a second script, whichever matches the current pattern). Do not duplicate or alter BreadcrumbList or FAQPage.

| Page (canonical URL) | `name` | `serviceType` |
| --- | --- | --- |
| `https://www.benormedia.com/custom-websites-migrations` | Custom Websites & Migrations | Webflow website design, development and migration |
| `https://www.benormedia.com/growth` | Growth (SEO/GEO + CRO) | SEO, AEO/GEO and conversion rate optimization |
| `https://www.benormedia.com/ongoing-website-support` | Ongoing Website Support | Webflow website maintenance and support |

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.benormedia.com/growth#service",
  "name": "Growth (SEO/GEO + CRO)",
  "serviceType": "SEO, AEO/GEO and conversion rate optimization",
  "url": "https://www.benormedia.com/growth",
  "description": "<that page's final meta description from task 5, verbatim>",
  "provider": { "@type": "Organization", "@id": "https://www.benormedia.com/#organization", "name": "BenorMedia", "url": "https://www.benormedia.com/" },
  "areaServed": [ "<the same six Country objects as task 2>" ],
  "audience": { "@type": "BusinessAudience", "audienceType": "B2B SaaS and tech companies" }
}
```

Keep the `provider` object inline as shown, so each page parses on its own. `@id` is the canonical URL plus `#service`; keep the canonical's exact form (no trailing slash on sub-pages). No `offers`, prices, ratings or reviews.

Acceptance: `check-seo.mjs` reports Service on all three pages, and BreadcrumbList and FAQPage are still present where they were.

### 4. FAQPage markup on /pricing

Why: the FAQ is visible on `/pricing` but unmarked. Google now shows FAQ rich results for few sites, so the gain is machine-readable question and answer pairs, not a search feature.

Do:

1. Make one data array the single source for both the visible FAQ and the JSON-LD, so they cannot drift. If the FAQ is inline markup today, extract the questions and answers into that array without changing what renders.
2. Output `FAQPage` with one `Question` per visible item and the answer as plain text in `acceptedAnswer.text` (links may stay as simple HTML, nothing else).
3. Only questions that are visible on the page. Hidden or collapsed accordion items count as visible if they are in the page HTML and open on click.
4. Leave the existing FAQPage on `/custom-websites-migrations` alone.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "<question as shown>", "acceptedAnswer": { "@type": "Answer", "text": "<answer as shown>" } }
  ]
}
```

Acceptance: the number of `Question` objects equals the number of visible FAQ items, and a text comparison of each answer against the rendered HTML (whitespace-normalised) matches. Report the count.

### 5. Title, H1 and meta description on each commercial page

Why: the H1s are brand taglines, so the buyer's search term appears only in the title. The plan's rule: the H1 names the service and the buyer, the tagline becomes the subhead, one primary keyword per page.

Rules:

- Keep the ` | BenorMedia` suffix. Titles stay at or under 60 characters, meta descriptions between 70 and 160.
- Exactly one H1 per page. Put the old H1 text in a paragraph directly under the new H1, in the existing lead or paragraph style, so the brand line stays on the page. If the hero already has a paragraph there, put the tagline above it in the same style and say in the report if the hero now looks crowded. If the current H1 highlights a phrase with an accent span, highlight the equivalent phrase in the new H1.
- Keep `og:title`, `og:description`, `twitter:title` and `twitter:description` in step with the title and description (the layout should already do this).
- Change nothing else in the page copy. Leave `/pricing` and `/work` as they are.
- Look at the four heroes at 1440 px and 390 px before committing. If a new H1 wraps badly, shorten the wording and say so in the report. Do not change font sizes.

`/` (primary keyword: webflow agency, 1,700 searches a month, KD 7)

| Field | Current | New |
| --- | --- | --- |
| Title | Webflow Agency for B2B SaaS Websites \| BenorMedia | unchanged |
| H1 | We turn your website into a revenue engine built to scale. | Webflow agency for B2B SaaS and tech companies |
| Subhead | none | We turn your website into a revenue engine built to scale. |
| Meta | BenorMedia builds high-converting, AEO-optimized Webflow websites for B2B SaaS and tech companies. Webflow Professional Partner, 6+ years, 100+ clients. | unchanged here (task 10 may adjust the partner wording) |

`/custom-websites-migrations` (primary keyword: webflow development agency, 1,300, KD 6; also webflow design agency, 1,300, KD 7)

| Field | Current | New |
| --- | --- | --- |
| Title | Custom Webflow Websites & Migrations \| BenorMedia | Webflow Design & Development Agency for B2B \| BenorMedia |
| H1 | Build a website your ambition deserves. | Webflow design and development for B2B companies |
| Subhead | none | Build a website your ambition deserves. |
| Meta | Custom Webflow website design, development and migrations for B2B companies: strong creative, clear strategy and scalable tech your team can update. | Custom Webflow design, development and migrations for B2B SaaS and tech companies: strong creative, clear strategy and a site your team can update. |

`/growth` (primary keyword: b2b saas seo agency, 1,400, KD 9)

| Field | Current | New |
| --- | --- | --- |
| Title | SEO, GEO & CRO Growth Services \| BenorMedia | B2B SaaS SEO Agency: SEO, GEO & CRO \| BenorMedia |
| H1 | Show up where buyers actually look. | B2B SaaS SEO for Google and AI search |
| Subhead | none | Show up where buyers actually look. |
| Meta | Get found in Google and AI search. Technical SEO, AEO/GEO, AI visibility, content and CRO that turn more of your website traffic into pipeline. | B2B SaaS SEO agency for Google and AI search: technical SEO, AEO/GEO, content and CRO that turn more of your website traffic into pipeline. |

`/ongoing-website-support` (primary keyword: webflow maintenance service, 200, KD 2)

| Field | Current | New |
| --- | --- | --- |
| Title | Ongoing Webflow Website Support \| BenorMedia | Webflow Maintenance & Support Service \| BenorMedia |
| H1 | Keep your website moving. Without adding to your team. | Webflow maintenance and support for B2B teams |
| Subhead | none | Keep your website moving. Without adding to your team. |
| Meta | Unlimited Webflow design, development and support for growing B2B companies. Keep your website improving without the cost of an in-house team. | Unlimited Webflow design, development and maintenance for growing B2B companies. Keep your website improving without the cost of an in-house team. |

Note for Sergio: `/growth` deliberately does not target "aeo agency" or "geo agency". Those belong to the new `/aeo-agency` page planned for later, so two pages do not compete for the same query. The title and meta keep "GEO" because it is the service name used on the site.

Acceptance: `check-seo.mjs` shows one H1 per page, titles of 60 characters or fewer, descriptions of 70 to 160, and the keyword words present in title plus H1.

### 6. Confirm AI crawlers can reach the site

Why: an open `robots.txt` (it allows all bots and blocks only `/studio`, `/dev/` and `/api/`) does not stop a CDN or firewall rule from blocking OAI-SearchBot, PerplexityBot or ClaudeBot at the edge.

Do: run `bash scripts/check-crawlers.sh` against production (appendix B). Paste the table into the report.

- All rows should be `200` with a normal body size. A `403`, `429`, `503`, or a `200` with a much smaller body (a challenge page) is a block.
- If anything is blocked, look at the response headers (`curl -sI -A "<ua>" https://www.benormedia.com/`) and name the likely layer: a bot-protection or "AI bots" toggle in the host's firewall settings, a CDN rule, or middleware in the repo. Fix it if it is in the repo; otherwise write the dashboard steps for Sergio.
- Do not edit `robots.txt` for this task, except to add a `Sitemap: https://www.benormedia.com/sitemap-index.xml` line if it is missing (task 8).

A UA-only test from your own IP does not trigger IP-verified "known bot" rules, so a clean result means "not blocked by user-agent", not "proven reachable".

### 7. Add /llms.txt

Why: `/llms.txt` returns 404 today. It is a plain-text index of the key pages for models. Adoption by the AI platforms is unconfirmed, so this is cheap hygiene, not a lever.

Do: create `public/llms.txt` (served at `/llms.txt` as `text/plain`). Build the page descriptions from the final meta descriptions in task 5, and the partner wording from task 10.

```
# BenorMedia

> BenorMedia is a Webflow agency for B2B SaaS and tech companies. We design and build high-converting Webflow websites, then grow them with SEO, AEO/GEO and CRO. Webflow Professional Partner, 6+ years, 100+ clients. Office: Barcelona, Spain. Contact: info@benor.media

## Services

- [Custom Websites & Migrations](https://www.benormedia.com/custom-websites-migrations): Custom Webflow design, development and migrations for B2B SaaS and tech companies.
- [Growth (SEO/GEO + CRO)](https://www.benormedia.com/growth): Technical SEO, AEO/GEO, content and CRO that turn more website traffic into pipeline.
- [Ongoing Website Support](https://www.benormedia.com/ongoing-website-support): Unlimited Webflow design, development and maintenance for growing B2B companies.

## Company

- [Our work](https://www.benormedia.com/work): Webflow websites designed and built for B2B SaaS, professional services and agencies.
- [Pricing](https://www.benormedia.com/pricing): Monthly design and development, AEO/GEO growth plans, or one-off projects.

## Optional

- [Privacy Policy](https://www.benormedia.com/privacy-policy)
- [Terms & Conditions](https://www.benormedia.com/terms-conditions)
```

Every sentence must already be a claim the site makes. If the final partner wording changes in task 10, change it here too.

Acceptance: `/llms.txt` returns 200 as `text/plain` in the preview, starts with `# BenorMedia`, and every URL in it returns 200.

### 8. Sitemap lastmod, IndexNow and Bing Webmaster Tools

Why: `sitemap-0.xml` lists 8 URLs with no dates. `lastmod` gives Google a freshness signal. IndexNow pushes new and changed URLs to Bing the day they ship, and Bing's index feeds Copilot and ChatGPT search.

Do:

1. **lastmod.** Use the sitemap integration's `serialize` option with a per-page map. Do not stamp every URL with the build date: Google ignores `lastmod` when it is not accurate. Seed the map once from the last real content change of each page (`git log -1 --format=%cs -- <source file>` run locally; shallow CI clones give wrong dates), and set today's date for the pages these tasks change.

   ```js
   // astro.config.mjs (excerpt). The dates below are placeholders: use the day each change actually ships.
   const LASTMOD = {
     '/': '2026-10-06',
     '/custom-websites-migrations': '2026-10-06',
     '/growth': '2026-10-06',
     '/ongoing-website-support': '2026-10-06',
     '/pricing': '2026-10-06',
     '/work': '<from git log>',
     '/privacy-policy': '<from git log>',
     '/terms-conditions': '<from git log>',
   };
   // inside sitemap({ ... })
   serialize(item) {
     const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
     if (LASTMOD[path]) item.lastmod = LASTMOD[path];
     return item;
   },
   ```

   Add a one-line comment above the map: "update the date when a page's content changes". Keep `/testimonials` and `/cookie-policy` out of the sitemap.
2. **robots.txt.** Make sure it contains `Sitemap: https://www.benormedia.com/sitemap-index.xml`; add the line if missing and change nothing else.
3. **IndexNow.** Generate a key with `openssl rand -hex 16`. Create `public/<key>.txt` containing exactly the key. Save appendix C as `scripts/indexnow.mjs` and replace `__INDEXNOW_KEY__` with the key (the key is public by design, so committing it is fine). Add an npm script `"indexnow": "node scripts/indexnow.mjs"`. If the repo has a deploy workflow, say where a post-deploy step would go but do not add it. Dry-run the script and show the output.
4. **Bing Webmaster Tools (Sergio).** Sign in at bing.com/webmasters, add `https://www.benormedia.com`, import from Google Search Console, submit `https://www.benormedia.com/sitemap-index.xml`. After each deploy that changes pages, run `npm run indexnow -- <changed URLs>`.

Acceptance: `check-seo.mjs` shows "every URL has lastmod", different dates across pages, no noindex pages in the sitemap, the robots.txt Sitemap line and "IndexNow key file matches its name".

### 9. Redirects: one permanent hop

Why: `http://benormedia.com` takes two hops (https, then www) and the email domain `benor.media` redirects with a temporary 302. One permanent hop per variant keeps every signal on `www.benormedia.com`.

Do:

1. Measure the current state:

   ```bash
   for u in http://benormedia.com/ https://benormedia.com/ http://www.benormedia.com/ http://benor.media/ https://benor.media/; do
     echo "== $u"
     curl -sIL -o /dev/null -w 'hops=%{num_redirects} final=%{url_effective} code=%{http_code}\n' "$u"
     curl -sI "$u" | grep -iE '^(HTTP|location)'
   done
   ```
2. Find where each redirect is set: repo config (`vercel.json`, `netlify.toml`, `_redirects`, `astro.config` `redirects`, middleware) or the host or registrar dashboard.
3. Target state: every variant above ends at `https://www.benormedia.com/` with a permanent status (301 or 308), in as few hops as the platform allows. Some hosts always upgrade HTTP to HTTPS before applying a domain redirect, so `http://benormedia.com` may stay at two permanent hops; that is acceptable. A 302 or 307 anywhere is not.
4. Change what is in the repo. For anything that lives in a dashboard (domain redirect on the host, URL forwarding at the registrar for `benor.media`), write the exact click path for Sergio in the report.
5. Never change MX, SPF, DKIM or DMARC records: `benor.media` is the email domain. Only the web redirect for `benor.media` and `www.benor.media` changes.

Acceptance: the loop above shows `301` or `308` everywhere, `final=https://www.benormedia.com/`, and no variant with more hops than the platform forces. Paste the before and after.

### 10. One set of entity facts

Why: models merge what they find across the site, the markup, LinkedIn and directories, and contradictions weaken the entity.

Do:

1. **Constants.** Create the shared entity constants from task 2 first; tasks 2, 3 and 7 import them.
2. **Spelling.** The name is "BenorMedia". Run `grep -rnE "Benor Media|Benor media|benor media" src public` and list every hit. Fix visitor-facing marketing copy, meta tags and alt text. Do not bulk-replace: legal entity names such as "Benor Media LLC" and "Benor Media SLU" on the legal pages stay exactly as written. "Benor Media" may remain only as `alternateName` in the markup.
3. **Partner tier.** The home meta description (also `og:description` and `twitter:description`) says "Webflow Professional Partner". The footer badge alt text says "Official Webflow Partner (opens BenorMedia's Webflow profile in a new tab)". Open `public/images/webflow-partner.png` and read what the badge says.
   - If the badge shows "Professional Partner" (the same tier as the meta description), change the alt text to "Webflow Professional Partner (opens BenorMedia's Webflow profile in a new tab)".
   - If the badge shows any other tier, **STOP and ask Sergio**. Do not pick one.
   - If the badge shows no tier at all, leave the alt text and the meta description as they are and note it in the report.
4. **Address.** One address everywhere: the footer's. The Organization markup (task 2) reads from the same constant.
5. **Fact sheet for Sergio.** End the report with the entity fact sheet below, filled from what the site now says, so he can paste it into LinkedIn, the Webflow partner profile and directory listings.

| Field | Value |
| --- | --- |
| Name | BenorMedia (also written Benor Media) |
| Website | https://www.benormedia.com/ |
| Email | info@benor.media |
| Address | C/ Dos de Maig, E1 6D, 08013 Barcelona, Spain |
| One-line description | the home page meta description |
| Service area | United States, Canada, United Kingdom, Germany, Denmark, Spain |
| Webflow partner tier | whatever step 3 settles on |

Acceptance: the grep list is in the report with each hit marked fixed or left (and why), and the badge alt text, the meta description and `llms.txt` use the same tier wording.

### 11. Link profile: no action

The 844 referring domains are mostly spam that Google ignores, so no disavow file is needed. Do not create one. Sergio will watch the Manual actions report in Search Console and build real links through the roadmap.

## Verification

Build, then:

```bash
node scripts/check-seo.mjs dist          # static output; or a preview URL, e.g. http://localhost:4321
bash scripts/check-crawlers.sh           # production
```

After Sergio deploys (not you), run `node scripts/check-seo.mjs https://www.benormedia.com` and the redirect loop from task 9 again, then:

- run the home page, `/pricing` and the three service pages through Google's Rich Results Test and validator.schema.org;
- in Search Console, use URL Inspection on those URLs and request indexing;
- confirm `https://www.benormedia.com/llms.txt` and `https://www.benormedia.com/<indexnow key>.txt` return 200.

## Report (end of your last message)

For each task: status (done, blocked, needs Sergio), files changed, the verification output, and anything you chose that this brief did not decide. Then three lists: what Sergio must do, what you could not verify, and what you noticed but left alone.

## Noticed, out of scope (do not change in this branch)

- The inline head script in the 2026-10-05 HTML sets Google Consent Mode defaults to `granted` for ad storage, ad user data, ad personalization and analytics storage, then calls `window.bmLoadGtm()` unconditionally, so Tag Manager loads on every page view. No consent banner gating it was visible in the HTML. With visitors from the EU, UK and Denmark this is worth a privacy review.
- `/testimonials` is `noindex` and its nav link is hidden, yet the branded prompt "Is BenorMedia a good Webflow agency for SaaS?" in the plan's prompt set points to it. A decision for the plan, not this branch.
- New pages in the plan (`/aeo-agency`, `/b2b-saas-web-design`, `/webflow-migration` and others) are a separate brief.

## Appendix A: `scripts/check-seo.mjs`

Dependency-free checks for titles, H1s, meta descriptions, canonicals, JSON-LD, Lorem ipsum, the sitemap, robots.txt, `llms.txt` and the IndexNow key file. Exits 1 on any failure. Tested against a mock site (pass and fail cases, file mode and URL mode).

```js
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

// expected = JSON-LD @types that must be present. keyword = words that must all appear in title + H1.
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
  if (rule.keyword) {
    const hay = `${title} ${h1s.join(' ')}`.toLowerCase();
    const missing = rule.keyword.split(' ').filter((w) => !hay.includes(w));
    check(missing.length === 0, `title+h1 cover "${rule.keyword}"`, `title+h1 miss: ${missing.join(', ')}`);
    check(h1s[0] && h1s[0].toLowerCase() !== title.toLowerCase().split(' | ')[0], 'h1 differs from title', 'h1 equals title');
  }
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
```

## Appendix B: `scripts/check-crawlers.sh`

Requests the home page, `robots.txt` and the sitemap index as each crawler and flags non-200 responses and challenge pages. Tested against a local server.

```bash
#!/usr/bin/env bash
# Request the home page, robots.txt and the sitemap with the user-agent of each AI and search crawler.
# Usage: scripts/check-crawlers.sh [base-url]      default: https://www.benormedia.com
# A UA-only test from your own IP exercises UA-based CDN/WAF rules, not IP-verified "known bot" rules:
# 200 here is necessary, not sufficient.
BASE="${1:-https://www.benormedia.com}"
BASE="${BASE%/}"

UAS='Browser (baseline)|Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36
OAI-SearchBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot
GPTBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot
ChatGPT-User|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot
PerplexityBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)
ClaudeBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)
Claude-SearchBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)
Googlebot|Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
Bingbot|Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'

fail=0
base_size=""
printf '%-20s %-6s %-10s %-6s %-6s %s\n' "user-agent" "home" "bytes" "robots" "sitemap" "note"
while IFS='|' read -r name ua; do
  home=$(curl -s -o /tmp/bm-home.$$ -w '%{http_code} %{size_download}' -A "$ua" "$BASE/")
  code=${home% *}; size=${home#* }
  robots=$(curl -s -o /dev/null -w '%{http_code}' -A "$ua" "$BASE/robots.txt")
  sitemap=$(curl -s -o /dev/null -w '%{http_code}' -A "$ua" "$BASE/sitemap-index.xml")
  [ -z "$base_size" ] && base_size=$size
  note=""
  [ "$code" != "200" ] && { note="BLOCKED or redirected"; fail=1; }
  # a bot-challenge page is usually a 200 with a much smaller body
  if [ "$code" = "200" ] && [ "$base_size" -gt 0 ] && [ $((size * 100 / base_size)) -lt 70 ]; then note="body <70% of the browser response: possible challenge page"; fail=1; fi
  grep -qiE 'just a moment|attention required|verify you are human|access denied' /tmp/bm-home.$$ && { note="challenge text in body"; fail=1; }
  [ "$robots" != "200" ] && { note="$note robots.txt $robots"; fail=1; }
  [ "$sitemap" != "200" ] && { note="$note sitemap $sitemap"; fail=1; }
  printf '%-20s %-6s %-10s %-6s %-6s %s\n' "$name" "$code" "$size" "$robots" "$sitemap" "$note"
done <<< "$UAS"
rm -f /tmp/bm-home.$$
[ $fail -eq 0 ] && echo "all crawlers got 200 with a normal-sized body" || echo "problems found: see the note column"
exit $fail
```

## Appendix C: `scripts/indexnow.mjs`

Submits new or changed URLs to IndexNow (Bing and the other participating engines). Replace `__INDEXNOW_KEY__` first (task 8). Dry-run tested.

```js
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
```
