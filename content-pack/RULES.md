# BenorMedia new pages: content rules (v2, 2026-10-07)

Read this whole file before you write or edit any page. It is the one rulebook for every new page on benormedia.com. The scripts in `scripts/` enforce the parts that a machine can check; the rest is on you.

Files you will use next to this one:

- `CLAIMS-REGISTER.md`: what the live site already says (tier A) and what Sergio has stated (tier S). Your source for BenorMedia facts.
- `content/webflow-migration.md` (commercial page) and `content/wordpress-to-webflow-migration.md` (its companion guide): the exemplars. Match their quality, structure and marker style. `outlines/` shows how each page reads once built.
- `briefs/<slug>.md`: the assignment for your page (keywords, plan notes, proof you may use, research to do).
- `data/keyword-map.csv`, `data/all-researched-terms.csv`: Ahrefs keyword data, US unless marked.
- `scripts/check-content.mjs`, `scripts/apply-defaults.mjs`: the checks (section 13).

## 1. The decision behind these pages

Decided by Sergio on 2026-10-06: **Claude drafts, a person owns the facts and the final edit, and nothing publishes without that person's sign-off.** It covers benormedia.com only. The AEO program BenorMedia sells to clients keeps its own content rule.

Two families of page (Sergio, 2026-10-07). This decides almost everything below.

- **Commercial pages** (`service`, `industry`, `regional`, `tool`, `hub`): short and scannable, modeled on the commercial page outline Sergio supplied (a SwipeSimple HVAC page). A benefit-led H1, a short intro, two CTA buttons, a proof strip, five to seven sections that are each one framing line and a few bullets with an image direction, a testimonial, a short FAQ and a closing call to action. About 700 to 1,100 words. **They never show a byline, an author, dates or a recheck line.** Those live in the front matter as hidden metadata (sitemap and review calendar) and the page template does not print them.
- **Articles** (`guide`, `comparison`, `data-study`): long, sourced and checked, at `/guides/<slug>`. They show a byline, the published and updated dates and a recheck line, because a reader has to judge how fresh and how accountable the facts are. Every commercial page has a companion guide that carries the long how-to content. The two link to each other, once each way.

So your job is a finished draft that is accurate, useful and honest about what it does not know. A reader should be able to approve it, or fill its visible gaps, in minutes. Every page ships in one of two ways: with the facts a person supplies, or with each gap closed by its stated default, which gives a leaner but accurate page. Both versions must be good.

## 2. Facts: four tiers

Every sentence that states a fact belongs to one tier.

**A. Already on the live site.** The fact is on benormedia.com today (see `CLAIMS-REGISTER.md` section A). You may reuse the claim. Paraphrase it. Do not copy more than one sentence of live copy per page, except client names, figures and the testimonials, which may be quoted exactly.

**S. Stated by Sergio.** Listed in `CLAIMS-REGISTER.md` section S: the partner wording, the JOOR clearance, the six AEO program steps and the measurement method.

**B. An outside fact with a primary source.** A fact about Webflow, Google, WordPress, another platform, a standard or a study. You verified it yourself, in this task, on the source's own page (vendor docs, Google Search Central, a standards body, the paper itself). Paraphrase it, link the source, and record it in `sources` and in your claims ledger (section 14). Quote no more than a short phrase (under 15 words). If you cannot verify a sentence, cut it. Time-sensitive facts (prices, plan limits, feature availability, market-share figures) also go in `volatile` and carry "as of Month YYYY" in the sentence.

**C. Anything else about BenorMedia.** Counts, years, timelines, team, tools, processes that are not on the live site, named clients beyond the `/work` listing, what was built for a client, results, guarantees, scope, awards, comparisons with other agencies, prices. You cannot know these. You may not state them. Write a marker (section 3) or leave the sentence out.

General reasoning is allowed when it follows from tier A, S or B facts, or when it is a definition or a recommendation phrased as one ("Check X before Y"). It is not allowed as a claim about how the market behaves or what is "typical". "Most sites take 6 to 8 weeks" is a tier C claim about BenorMedia or a tier B claim that needs a source. Statistics always need tier B.

Write nothing that a reviewer would have to take on faith.

## 3. Markers: how you show a gap

A gap is a visible marker in the page text, never an invented sentence and never an HTML comment. Three kinds:

- `[FACT NEEDED #ID: the exact question | default: ACTION]`: a BenorMedia fact only a person can supply.
- `[VERIFY #ID: what to confirm | default: ACTION]`: a position or claim a person must confirm.
- `[PERSON #ID: what is missing | default: ACTION]`: a name or a role.

`ID` is either a global id from `FACTS-REGISTRY.md` (`G1`, `G2`, ...) or a page id: two to five capital letters or digits, a hyphen and a number (`MIG-2`, `B2B-1`). Reuse a global id when your question is the same question; the person answers it once. Use a page id otherwise, numbered from 1 in the order the markers appear.

`ACTION` is what happens if nobody answers. It is mandatory and it must be mechanical:

| ACTION | Effect |
|---|---|
| `DELETE-LINE` | Remove the whole line that holds the marker: a paragraph, a list item or a table row. |
| `DELETE-SECTION` | Remove the nearest heading above the marker and everything under it, up to the next heading of the same or a higher level. |
| `DELETE-ITEM` | Front matter only: remove the list item (for example one FAQ entry) that holds the marker. |
| `KEEP` | Remove only the marker and keep the sentence as written. Use it only when the sentence is already tier A, S or B and the marker asks for a confirmation of a position. |
| `REPLACE: text` | Replace the marker with `text`. The text must itself be tier A, S or B and must not contain square brackets. |

Rules:

1. No square brackets and no pipe character inside the question. Do not put a guess, a number or a "typical" figure in a marker.
2. Put the marker where the fact would go. A table row that depends on a fact carries its marker in its own cell and `DELETE-LINE`.
3. After every default is applied, the page must still read well and every H2 must still hold at least one paragraph that is tier A, S or B. Design for that. If a section would be empty, write its first paragraph from tier A or B facts and gate only the BenorMedia-specific part. Test it with the script in section 13.
4. Do not put a marker inside a FAQ answer unless its action is `DELETE-ITEM`. Prefer FAQ answers that are complete without BenorMedia-specific facts.
5. A marker that blocks the whole page (for example a tool that does not exist yet) goes in `blockedBy` in the front matter as well.
6. Keep markers few and valuable. A page with 25 markers is a questionnaire, not a draft. Aim for 3 to 10 per page, and put the highest-value fact first.

Examples:

```
BenorMedia has completed [FACT NEEDED #MIG-1: how many WordPress to Webflow migrations has BenorMedia completed, and since when | default: DELETE-LINE]
| Mid-size site with a blog | [FACT NEEDED #MIG-3: weeks for a mid-size site | default: DELETE-LINE] |
author: "[PERSON #G1: name and role of the person who owns the final edit | default: REPLACE: BenorMedia team]"   (guides, comparisons and data studies only)
```

## 4. Wording that is banned or flagged

`scripts/check-content.mjs` fails on the first group and warns on the second.

Fail (never on a page):

- "Enterprise Partner", "Official Webflow Partner". BenorMedia's partner wording is "Webflow Professional Partner" (Sergio, 2026-10-06; see the open question G2 in `FACTS-REGISTRY.md`). Never write a tier name Sergio has not confirmed.
- "Benor Media" with a space. The brand is "BenorMedia". Legal names stay as written ("Benor Media LLC", "Benor Media SLU").
- Prices: any currency amount, such as $500, EUR 2,000 or 3,000 USD. Link to `/pricing` instead. Exemptions: amounts in millions or billions (a client's funding as listed on `/work`, "$66.5M"), and, on a page with `thirdPartyPrices: true`, a third-party vendor's published price with its source and as-of date.
- The names of other agencies, and links to their sites. The check holds a list.
- Any claim of a guarantee, zero downtime or no ranking loss. (Warn, not fail, but a human must see a reason.)

Warn (each needs a reason, or fix it):

- "Webflow Partner" without "Professional".
- "guarantee", "100%", "zero downtime", "no downtime".
- The words "best", "leading", "top", "premier", "world-class", "cutting-edge", "best-in-class", "seamless", "game-changer", "revolutionize", "unlock", "elevate", "empower", "holistic", "robust", "leverage", "delve", "landscape", "ever-evolving", "in today's digital", "it is important to note", "we pride ourselves".
- BenorMedia's own tool names: Ahrefs, Surfer, Trakkr, Screaming Frog. Never named on a public page. (On a page with `strictTools: true` this fails.) Also do not name monitoring or SEO tools of any vendor as something BenorMedia uses. Naming Google Search Console, Google Analytics, Webflow features and standards is fine, because the reader uses them.
- Em dashes and en dashes. Use a period, a comma, a colon or "to" for ranges.
- Sentences over 40 words, and an average sentence length over 22 words.

Also never:

- invent a testimonial, quote, review, award, statistic, case study or client result;
- say BenorMedia is "the best", "number one", "leading" or "top-rated";
- compare BenorMedia with a named agency;
- promise a ranking, a citation, a traffic gain or revenue. Say what BenorMedia does, not what will happen;
- copy wording from a competitor page or from vendor documentation. Read it, then write in your own words.

## 5. Voice

Match the live site: confident, strategic, client-focused. Short sentences, active voice, concrete nouns, numbers where they are real. Live-site lines that set the tone (tier A, quote freely as a model, do not paste into pages):

- "Most surprises in a build are just questions nobody asked early. We ask them early."
- "The handoff is done when running the site feels unremarkable."
- "No black boxes. No surprises. Total transparency."
- "Migration is where most rebuilds quietly lose their rankings, which is why this is the most supervised step of all."

Write for a marketing lead or founder at a funded B2B company who has 90 seconds and a problem. Define a term the first time it appears if a non-specialist might not know it. No filler openers, no throat-clearing ("In this guide we will explore"), no summary that repeats the page. Never write "we" for something BenorMedia has not said it does. Commercial pages may use "we" and "our" for tier A and tier S statements, as the live site does. Guides are written in the third person ("BenorMedia"), because their facts come from outside sources.

Language: US English unless the front matter says `lang: en-GB`, `de-DE` or `es-ES`. Sentence-case headings (the live site uses them; the outline example uses Title Case because it is another company's style). Serial comma, as on the live site and in Sergio's example ("A, B, and C"; the checker warns when a list of three or more lacks it). Numerals for 10 and above, and for any measurement, percentage or date. Spell the brand "BenorMedia".

## 6. How a page is built (for readers and for AI answers)

**Commercial pages**

1. **Benefit first.** The H1 names the subject and, where it can be said truthfully, what the reader gets. No promise of a ranking, a citation, a traffic gain or revenue.
2. **A short intro.** Two or three sentences: what it is, who it is for, what BenorMedia does. The first two sentences still make sense if an AI answer quotes them alone.
3. **Sections of one framing line and a few bullets.** Each H2 is a statement or a question, followed by one sentence that frames it and three to six bullets. A bullet is a full thought, and a bold lead-in is allowed. Five to seven sections.
4. **An image direction after each section.** Put it in `visuals` (alternating right and left aligned). Describe the picture a designer should make. No text in images.
5. **Proof, not adjectives.** Prefer a named client from the live site, a sourced number or a dated vendor fact. The proof strip, the testimonial block and the closing call to action come from the template, not from the body.
6. **Limits stated.** One section says when another option is better. It is more credible and it is what AI answers quote.
7. **Link, do not repeat.** Link once to the companion guide for the full method and once to the live pillar page. Do not copy the guide's sentences: the checker flags near-duplicate text.
8. **Short everywhere.** Paragraphs of 50 words or fewer, FAQ answers of one to three sentences (20 to 70 words). No tables unless a comparison cannot be said in bullets.

**Articles (guides, comparisons, data studies)**

1. **Answer first.** The first two sentences under the H1 answer the question the page exists for, in plain words, as sentences that still make sense if quoted alone. The same holds for the first sentence under every H2.
2. **Question headings.** H2s are questions a buyer would type or ask an AI assistant. At least 70% end in a question mark.
3. **Tables for comparisons.** Anything with rows and columns (a timeline, a scope split, a comparison) is a Markdown table with a caption line and real column headings. No tables in images. No text in images.
4. **Lists.** Steps are an ordered list. A list has at most 8 items. Each item is a full thought, not a fragment.
5. **Short paragraphs.** At most 4 sentences or about 90 words.
6. **One idea per H2, two levels deep at most.** H2 and H3 only. The H1 comes from the front matter.
7. **Sourced.** Every outside fact is paraphrased, linked to its primary source and dated. A section near the end says how the guide was written and checked, and discloses that BenorMedia is a Webflow Professional Partner with an interest in the topic.
8. **Soft call to action only.** The template adds one closing block. The body links to the companion commercial page once.
9. **No padding.** Word counts in section 10 are ranges, not targets. A shorter page that answers everything beats a longer one that does not.
10. **Every page earns its own reason to exist.** Pages that look alike (industry pages, comparisons) must differ in substance, not only in the noun.

## 7. Front matter

Every content file is Markdown with a YAML front matter block. Use only this subset of YAML: `key: value` pairs, quoted or plain strings, `[a, b]` lists of simple values, block lists with `- `, lists of one-level maps, `|` and `>` block text. Quote any string that contains a colon followed by a space, a `#`, or that starts with a special character. Keys are plain words.

Required on every page (a `section` is exempt from `title`, `description`, `h1`, `breadcrumb` and `schema`):

| Key | Rule |
|---|---|
| `slug` | Kebab-case. Equals the file name without `.md`. |
| `url` | Final path, starting with `/`, no trailing slash (`/guides` for the hub). |
| `lang` | `en-US`, `en-GB`, `de-DE` or `es-ES`. |
| `pageType` | `service`, `industry`, `guide`, `comparison`, `data-study`, `tool`, `regional`, `hub`, `section` or `case-study-template`. |
| `wave` | 1, 2 or 3. Release wave suggested by the plan. |
| `draft` | `true` while drafting. The person who owns the final edit flips it at sign-off. |
| `blockedBy` | List of ids that need a real answer or a build before release. Usually `[]`. |
| `title` | Commercial pages: under 50 characters (49 or fewer, as in Sergio's template). Articles: 60 or fewer. End in `\| BenorMedia` unless that breaks the limit. |
| `description` | Commercial pages: 70 to 149 characters (under 150, as in Sergio's template). Articles: 70 to 160. Every word must be tier A, S or B. No promise, no price. |
| `h1` | Names the page's subject. 90 characters or fewer. |
| `primaryKeyword`, `secondaryKeywords` | From `data/keyword-map.csv`. `targetCountry`: `US`, `GB`, `DE` or `ES`. |
| `author` | **Guides, comparisons and data studies only** (required there; a FAIL on any other page type). A name, or a `[PERSON #G1: ... | default: REPLACE: BenorMedia team]` marker. |
| `publishedAt`, `updatedAt` | ISO dates. Use 2026-10-06 while drafting, and set both to the sign-off date when the page is released. Shown on articles only; hidden metadata on commercial pages. |
| `reviewEvery` | Days until the page must be rechecked. 90 by default, 30 for pages with volatile facts. The recheck line is shown on articles only. |
| `breadcrumb` | List of `{name, url}` from Home to this page. |
| `schema` | Any of `Service`, `Article`, `FAQPage`, `BreadcrumbList`, `CollectionPage`, `WebPage`, `WebApplication`. Services: `Service`. Guides, comparisons, studies: `Article`. Any page with an FAQ: `FAQPage`. All pages: `BreadcrumbList`. |
| `service` | `{name, serviceType}` when `Service` is in `schema`. |
| `faq` | List of `{q, a}`. Commercial pages: 5 to 8 items, answers of 20 to 70 words. Articles: 5 to 10 items, answers of 40 to 90 words. Each question ends in `?`. The answer is in the first sentence. Plain text only. |
| `faqHeading` | The H2 shown above the FAQ. |
| `takeaways` | Guides, comparisons and data studies: 3 to 5 plain sentences shown under the lead. Not used on commercial pages. |
| `related` | List of slugs of other new pages, or live paths such as `/custom-websites-migrations`, pillar first. Each is linked from the page's closing block. |
| `inbound` | Suggested links from existing pages: list of `{from, anchor, where}`. |
| `sources` | Every tier B source used: list of `{label, url, accessed}`. Rendered as the page's source list. |
| `volatile` | List of `{claim, source, recheck}` for every time-sensitive fact. Also set `volatileChecked` (the date you verified). |
| `thirdPartyPrices` | `true` only if the page states a vendor's published prices. Default `false`. |
| `strictTools` | `true` on pages where naming any tool fails the check. |
| `editorNotes` | List of up to 5 short lines telling the person what to look at first. Not published. |
| `visuals` | List of `{after, side, type, brief, alt}`: one picture for a designer to make, placed after the H2 named in `after` (quote the value when it holds a colon). `side` is `right` or `left` and alternates on commercial pages. |
| `eyebrow` | Commercial pages: the short label above the H1 (for example "B2B SaaS websites"). |
| `testimonial`, `testimonialAfter` | Commercial pages: `surfe`, `puzzle` or `both` (the two live testimonials, quoted word for word by the template), and the H2 after which the block sits (default: just before the FAQ). |
| `closing` | Commercial pages: `heading` and `text` for the closing call to action. End the text with the 24-hour contact promise (CLAIMS-REGISTER A1). |
| `hreflang` | Regional pages only: list of `{lang, url}` alternates. |

## 8. Body syntax

- Markdown. The text before the first H2 is the lead. No `# ` heading in the body. Use `##` and `###` only.
- A table is preceded by a line that starts with `Table: ` and holds its caption. The template turns that line into the table caption.
- Do not put the FAQ, the byline, the key takeaways, the sources list or the closing call to action in the body. They come from the front matter and the template.
- No raw HTML, no images (use `visuals`), no emoji, no horizontal rules.
- Links, in this order of preference:
  - another new page: `[anchor](page:slug)`. The build turns it into a normal link when that page is released and into plain text when it is not, so nothing ever 404s;
  - a live page: its path, such as `[pricing](/pricing)`. The live pages are `/`, `/custom-websites-migrations`, `/growth`, `/ongoing-website-support`, `/pricing`, `/work`, `/privacy-policy`, `/terms-conditions`;
  - a primary source: the full `https://` URL;
  - a client's site exactly as listed on `/work`.
- Anchors are descriptive ("WordPress to Webflow migration", not "click here"). At most two links to the same destination per page.
- Link up to the pillar page at least once. Link to `/pricing` wherever cost comes up. Link to `/work` where you claim proof.

## 9. Pillars and spokes

The plan's rule: every spoke links up to its pillar with a descriptive anchor, and each pillar links down to its spokes.

| Pillar | Spokes |
|---|---|
| `/custom-websites-migrations` (live) | `webflow-migration`, `b2b-saas-web-design`, `webflow-enterprise-agency`, all comparisons and Webflow guides |
| `b2b-saas-web-design` | `fintech-web-design`, `cybersecurity-web-design`, `hr-tech-web-design`, `saas-website-examples`, `b2b-website-redesign-cost` |
| `/growth` (live) | `aeo-agency`, `generative-engine-optimization`, `aeo-vs-geo-vs-seo`, `ai-visibility-checker` |
| `webflow-alternatives` | `framer-vs-webflow`, `webflow-vs-squarespace`, `webflow-vs-wix`, `webflow-vs-wordpress` |
| `/guides` (hub) | every guide and comparison |

Every service page has one companion guide, and the two link to each other once each way: `webflow-migration` and `wordpress-to-webflow-migration`; `b2b-saas-web-design` and `b2b-saas-website-pages`; `webflow-enterprise-agency` and `webflow-enterprise`; `aeo-agency` and `generative-engine-optimization`. The plan lists each pair in `data/plan.json` (`companionGuide`). Industry pages, the `/growth` section and the tool page have no guide of their own: they link up to their pillar and to the pillar's guide.

Each page lists its pillar and two or three siblings in `related`, and mentions them in the body where they help the reader.

## 10. Blueprints by page type

Word counts are visible words (body, FAQ, takeaways) and are ranges to stay inside, not targets to reach.

**service, industry, regional** (650 to 1,200 words). The commercial blueprint, modeled on the outline Sergio supplied:

1. Eyebrow, then the H1 (benefit-led, 90 characters or fewer).
2. Intro: two or three sentences. Optional proof line as a marker.
3. Two CTA buttons, then the proof strip (both from the template).
4. Five to seven H2 sections. Each is one framing line and three to six bullets, then an image direction in `visuals`. A typical order: the first step of the work (what BenorMedia maps or plans); what is built; how it is checked or launched; what is connected (SEO and AI search, integrations); training and support after launch (live pages `/ongoing-website-support`, `/growth`); who the work is for (named `/work` clients with their tags and funding, as listed); when another option is better.
5. A testimonial block (`testimonial`).
6. FAQ: five to eight short questions a buyer would type. One to three sentences each.
7. A closing H2 with one line and the two CTA buttons again (`closing`).
8. Schema from the front matter (Service, FAQPage, BreadcrumbList).

Industry pages replace the first section with what the website must do for that buyer, and add one or two sourced facts about the industry (never legal advice). Regional pages are a real service page for that market in its language and spelling, with no claim of a local office, local clients or local certifications unless tier A or a marker.

**guide** (1,800 to 3,200 words). Lead answers the title question. Then takeaways (front matter). H2s are the sub-questions in the order a reader asks them, mostly questions. At least one table. A closing H2 "How was this guide written and checked?" that says what the guide is based on, when it was last checked and that BenorMedia has an interest in the topic. One link to the companion commercial page. Byline, dates and recheck line from the front matter.

**comparison** (1,800 to 3,000 words). Lead: the verdict by use case in two sentences ("Choose X when ..., choose Y when ..."). A comparison table of criteria that can be checked against a vendor page. One H2 per criterion that matters to a B2B marketing team (cost model, who edits, performance, SEO controls, security and compliance, integrations, scaling). An H2 "Which one should you choose?" with if-then bullets. A fair-play disclosure: BenorMedia builds in Webflow. State where the other option wins.

**data-study** (1,200 to 2,200 words). Lead states the finding in one sentence once the numbers exist. Method first, then results tables, then limits. Every number comes from a data file or a marker. No number is written until it exists.

**tool** (600 to 1,200 words). What the tool checks and returns, what it does not do, how the result is produced, privacy of the input, what happens next. Plus a build specification in `briefs/`. Commercial format, no byline.

**hub** (400 to 800 words). One paragraph of orientation, then the list of guides grouped by cluster, each with one line on what it answers, then how the guides are written, checked and updated.

**section** (500 to 1,000 words). A block added to an existing page. The front matter says where it goes. It follows the voice and rules of the page it joins and adds no H1.

**case-study-template**: a fill-in structure with labelled gaps and no invented facts. Used when a client approves in writing.

## 11. Third-party facts: how to source them

1. Use the source's own page: Webflow Help Center and webflow.com, Google Search Central, WordPress.org, a vendor's pricing and docs pages, schema.org, a standards body, the paper itself. Not another agency's summary.
2. Fetch the page and read it. Note the URL and the date you read it. If a number matters (a price, a limit, a percentage), confirm it on a second page or by fetching again with a different question. If you still cannot confirm it, do not state it.
3. Paraphrase. Do not reuse the source's sentence structure. Quote at most a short phrase, in quotation marks, with the source linked.
4. Dates: write "as of October 2026" next to anything that can change. List it in `volatile` with where to recheck. The release check demands a recent `volatileChecked`.
5. Prices of third-party products appear only on a page with `thirdPartyPrices: true`, each next to its source and as-of date. Never present them as BenorMedia's prices.
6. Never describe a competitor product's weakness without a source. When a vendor page is ambiguous, say what it says and link it.
7. If the web read fails or the source is gone, say so in your notes and cut the claim.

## 12. Schema, in one line per type

The template builds JSON-LD from the front matter: `Service` for service, industry and regional pages (provider = the shared Organization, no `offers`); `Article` for guide, comparison and data-study pages only (author from `author`, dates from `publishedAt` and `updatedAt`; commercial pages carry no Article markup and no author); `FAQPage` from `faq`; `BreadcrumbList` from `breadcrumb`; `CollectionPage` for the hub. Do not write JSON-LD yourself.

## 13. Check your own work before you hand back

From the pack root:

```bash
node scripts/check-content.mjs content/<slug>.md
node scripts/apply-defaults.mjs content/<slug>.md --out defaulted/<slug>.md
node scripts/check-content.mjs --release --ignore-draft defaulted/<slug>.md
```

1. The first command must show no `FAIL`. Every `warn` must be either fixed or defensible.
2. The second and third commands prove the page is releasable if nobody answers a single marker: after the defaults are applied, there must be no `FAIL` in `--release --ignore-draft` mode (the `draft` flag is exempt in this simulation). A page that lists a real blocker in `blockedBy` (a tool that must be built, a native review) is expected to fail on that one item only. Read the defaulted page once. If it reads as a good, shorter page, you are done. If it has an empty section or a dangling sentence, fix the markers.
3. Read your page once as the buyer, then once as an AI answer engine looking for the sentence to quote. Is the answer in the first two sentences? Would the first sentence under each H2 survive being quoted alone?
4. Count your markers. If there are more than 10, cut the least valuable.

## 14. Your claims ledger (research notes)

Write `research/<slug>.notes.md` with:

1. **SERP read**: the Ahrefs SERP overview for the primary keyword (country in your brief): position, result, kind of page, DR. What the top pages cover that yours must cover, what they leave out, and what the AI Overview cites.
2. **Structure notes** from pages you read (structure only; nothing copied).
3. **Claims ledger**: a table with one row per tier B or tier S fact on the page: the claim as written, the tier, the source URL, the date read, and a note on confidence. Tier A facts need only the register id (`A12`).
4. **Not verified**: what you could not confirm and therefore cut or marked.
5. **Judgment calls**: what you chose that the brief did not decide.
6. **Noticed**: anything odd on the live site or in the data that Sergio should know, one line each.

Return to the parent a report of no more than 200 words: the file names, word count, marker count, check results, and the three things the reviewer should look at first.
