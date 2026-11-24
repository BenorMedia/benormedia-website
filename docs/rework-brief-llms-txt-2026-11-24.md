# Rework brief: /blog/do-you-need-an-llms-txt-file (2026-11-24)

This post has been indexed since October with zero impressions. People don't search "do you need llms.txt" (no measurable volume). They search for examples and the format, and the SERP for "llms.txt example" is weak: small blogs, a forum thread, and llmstxt.org at position 7. So the post is retargeted to examples. The URL stays the same.

| Target (US/mo) | Surfer after (SEO / AI / total) | AI detector, new copy |
| --- | --- | --- |
| llms.txt example 300, llms.txt examples 200, llms.txt format 200, llms.txt best practices 200, llms.txt seo 100, webflow llms.txt 30 (Ahrefs, Nov 24) | 49 / 80 / 65 | 0% (20% and 33% on two earlier drafts) |

Surfer couldn't import the live page, so there's no "before" score. Facts were checked on November 24, 2026: six real llms.txt files, llmstxt.org, Google's AI features page, and Webflow's llms.txt help article. One stale fact is fixed: the post says our own llms.txt has "about 19 links"; it now has 77.

## 0. Ground rules

Same as the previous rework brief:

1. **Copy is exact.** Don't reword, shorten, or add to it, including alt text and schema text. US English, no em dashes, serial comma, sentence-case headings.
2. **Only what's listed changes.** Everything else stays word for word.
3. **One commit:** `content(blog): retarget do-you-need-an-llms-txt-file to examples`.
4. **Dates.** `updatedAt` and the Article JSON-LD `dateModified` set to the ship date. Leave `publishedAt` alone. If the front matter has `volatileChecked`, set it to 2026-11-24.
5. **The slug and URL don't change.** No redirect.
6. **Tables, captions, FAQs, and sources** use the post's existing format. Each new table gets a caption line like the existing tables.
7. **STOP and ask** if the post lives in Sanity, a quoted "Where" text isn't found exactly once, or a change needs copy that isn't here.

### 0.1 Discovery (change nothing)

Post the source file, the fields that hold the title tag, meta description, H1, FAQ, and sources, and whether every "Where" text below is found exactly once.

---

## 1. Head

- **Title tag:** `llms.txt Examples: 6 Real Files and the Format | BenorMedia` (59 characters)
- **Meta description:** `Six real llms.txt examples, from Stripe and Cloudflare to a B2B marketing site, plus the format, what Google says, and how to add the file in Webflow.` (150)
- **H1:** `llms.txt examples: six real files, the format, and whether you need one.`

## 2. Lead

Where: the paragraph under the H1 that begins `Most B2B SaaS sites don't need an llms.txt file to appear in AI answers:`. Replace the whole paragraph with:

```markdown
These llms.txt examples are six files we checked on November 24, 2026, from Stripe's sprawling docs index to our own marketing site, and they explain the format better than any spec does. Whether your B2B SaaS site needs one is a separate question: Google says no special AI files are required, and the major AI crawlers don't document reading them.
```

## 3. Rename one H2

`What is an llms.txt file?` becomes `What is an llms.txt file, and what format does it use?` The section's text stays as it is.

## 4. New H2: the six examples

Where: after the table captioned `robots.txt, sitemap.xml, and llms.txt compared` (the end of the section renamed in 3), before the H2 `Do Google, ChatGPT, Claude, or Perplexity use llms.txt?` Insert:

```markdown
## What do real llms.txt examples look like?

Less uniform than the proposal suggests. All six open with an H1, the only required part, and then they split. Stripe adds rules for AI agents. Cloudflare's file is mostly links to more llms.txt files. Vercel's llms-full.txt skips the index and exports the full text, and ours is a plain list of pages and notes.

| File | What it is | Detail worth copying |
| --- | --- | --- |
| Stripe, docs.stripe.com/llms.txt | A very long index of Stripe's docs, with links to Markdown copies of its pages | A section of instructions for AI agents, such as "never recommend the Charges API" |
| Cloudflare, developers.cloudflare.com/llms.txt | A hub that links to one llms.txt per product | A one-line summary that tells agents how the file is organized |
| Anthropic, platform.claude.com/llms.txt | A long index of the developer docs in several languages, with Markdown links | A section that points agents to its documentation MCP server |
| Mintlify, mintlify.com/docs/llms.txt | A medium-length index with an "Optional" section | An "Agent Instructions" section on how to work through its index files |
| Vercel, vercel.com/docs/llms-full.txt | A full-text export of the docs instead of an index | A header on every page with its title, description, last update, and source |
| BenorMedia, benormedia.com/llms.txt | A marketing site's index: five sections and 77 links | A one-line note after almost every link, and legal pages under "Optional" |

If you want llms.txt best practices, these files are the nearest thing to them. Write a short note after each link, because the link text alone rarely says what a page answers. Park pages an agent can skip under "Optional," which Mintlify and we both do. Once docs run to hundreds of pages, split them by product like Cloudflare. And if agents will act on your product, tell them how, the way Stripe and Mintlify do.
```

Caption: `Six llms.txt files compared (checked November 24, 2026)`

In the File column, link each address to its file: https://docs.stripe.com/llms.txt, https://developers.cloudflare.com/llms.txt, https://platform.claude.com/llms.txt, https://mintlify.com/docs/llms.txt, https://vercel.com/docs/llms-full.txt, and https://www.benormedia.com/llms.txt.

## 5. New H2: a marketing-site example

Where: directly after the section from 4. Insert (the code block is exact; keep it as a plain code block like the post's existing Example Co block):

````markdown
## What does an llms.txt file look like on a B2B marketing site?

Shorter and less technical. Ours lists services, guides, blog posts, and company pages, with a one-line note on each, and keeps the privacy policy and terms under "Optional." Below are the start and end of the file, trimmed. The live version has 77 links in five sections.

```
# BenorMedia

> BenorMedia is a Webflow agency for B2B SaaS and tech companies. We design and build high-converting Webflow websites, then grow them with SEO, AEO/GEO and CRO.

## Services

- [Custom Websites & Migrations](https://www.benormedia.com/custom-websites-migrations): Custom Webflow design, development and migrations for B2B SaaS and tech companies.
- [Growth (SEO/GEO + CRO)](https://www.benormedia.com/growth): Technical SEO, AEO/GEO, content and CRO that turn more website traffic into pipeline.

## Guides

- [How to Migrate WordPress to Webflow](https://www.benormedia.com/guides/wordpress-to-webflow-migration): How to migrate from WordPress to Webflow without losing SEO: map URLs, move content, set 301 redirects, test, and monitor. Sourced from Google and Webflow.

## Optional

- [Privacy Policy](https://www.benormedia.com/privacy-policy)
- [Terms & Conditions](https://www.benormedia.com/terms-conditions)
```

The notes matter most. A link called "Growth (SEO/GEO + CRO)" tells an agent little on its own; the note after it says the page covers technical SEO, AEO/GEO, content, and CRO.
````

## 6. Fix the stale count

Where: in `How do you add an llms.txt file to a website?`, the sentence `On our own website, the file at benormedia.com/llms.txt has an H1, a one-line summary, and sections for services, guides, company pages, and optional links, with about 19 links in total.` Replace it with:

```markdown
On our own website, benormedia.com/llms.txt now has 77 links in five sections, because we add a line for each new guide and blog post (see the example above).
```

## 7. FAQ

Add after the item `Does Google use llms.txt?`:

- **Q:** `Does llms.txt help SEO?`
- **A:** `No evidence says it does. Google says you don't need AI text files to show up in AI Overviews or AI Mode. A study of 137,210 domains also found that 97% of llms.txt files got no requests at all in a month. Add one if it's quick, but don't count it as SEO work.`

The FAQ then has 6 items.

## 8. Sources

1. Change the accessed date to November 24, 2026 for: llms.txt: The /llms.txt file; Google Search Central: AI features and your website; Webflow Help Center: Upload an llms.txt file to your site; BenorMedia: llms.txt.
2. Add, after the llmstxt.org entry:
   - Stripe: llms.txt | https://docs.stripe.com/llms.txt | Accessed November 24, 2026
   - Cloudflare: Developer documentation llms.txt | https://developers.cloudflare.com/llms.txt | Accessed November 24, 2026
   - Anthropic: Developer documentation llms.txt | https://platform.claude.com/llms.txt | Accessed November 24, 2026
   - Mintlify: llms.txt | https://mintlify.com/docs/llms.txt | Accessed November 24, 2026
   - Vercel: llms-full.txt | https://vercel.com/docs/llms-full.txt | Accessed November 24, 2026

All other sources stay as they are.

## 9. public/llms.txt

Update this post's line to the new title and meta description from section 1, in the file's existing format. The link count stays at 77.

---

## 10. Checks before you report

1. Build, then `node scripts/check-seo.mjs dist`. One H1 equal to the new H1; title tag and meta description equal to section 1; FAQPage JSON-LD with 6 questions matching the visible FAQ; `dateModified` equal to the ship date.
2. Heading ids unique, no skipped levels; both code blocks render as code.
3. `rg -n "—"` on the changed file finds nothing; "about 19 links" no longer appears.
4. All new external links use https and resolve; the URL is still in the sitemap.

## 11. Report

Branch and commit, discovery answers, check results, and anything you couldn't place exactly. Don't merge, push to main, or deploy.

## 12. After the deploy

1. Search Console: Request indexing for https://www.benormedia.com/blog/do-you-need-an-llms-txt-file and confirm it's in sitemap-0.
2. 28-day check on December 22: impressions for the target queries above.
3. The "77 links" figure goes stale as new posts are added. Recheck it at the next refresh.
