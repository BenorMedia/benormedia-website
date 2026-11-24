---
slug: do-you-need-an-llms-txt-file
url: /blog/do-you-need-an-llms-txt-file
pageType: guide
draft: false
blockedBy: []
topicId: "6.2"
wave: 1
title: "llms.txt Examples: 6 Real Files and the Format | BenorMedia"
description: "Six real llms.txt examples, from Stripe and Cloudflare to a B2B marketing site, plus the format, what Google says, and how to add the file in Webflow."
h1: "llms.txt examples: six real files, the format, and whether you need one."
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-17
updatedAt: 2026-11-24
reviewEvery: none
primaryKeyword: "llms.txt"
secondaryKeywords: []
takeaways:
  - "llms.txt is a proposed Markdown file at the root of a site that points AI agents to its most useful pages. It isn't a formal standard."
  - "Google says you don't need AI text files to appear in AI Overviews or AI Mode, and the crawler documentation of OpenAI, Anthropic, and Perplexity doesn't say their crawlers read llms.txt."
  - "In a study published in June 2026, 97% of the llms.txt files found across 137,210 domains received no requests in May 2026."
  - "Adding one takes minutes and does no harm, but crawler access in robots.txt and pages rendered on the server matter more for AI answers."
faqHeading: "Questions about llms.txt"
faq:
  - q: "What is llms.txt?"
    a: "A proposed Markdown file, served at /llms.txt, that gives AI agents a short summary of a site and links to its most useful pages. It was proposed in September 2024 and isn't a formal standard."
  - q: "Does Google use llms.txt?"
    a: "Google's documentation says you don't need to create new machine-readable files, AI text files, or markup to appear in AI Overviews or AI Mode. A page has to be indexed and eligible to show with a snippet."
  - q: "Does llms.txt help SEO?"
    a: "No evidence says it does. Google says you don't need AI text files to show up in AI Overviews or AI Mode. A study of 137,210 domains also found that 97% of llms.txt files got no requests at all in a month. Add one if it's quick, but don't count it as SEO work."
  - q: "Does ChatGPT read llms.txt?"
    a: "OpenAI's crawler documentation doesn't say that GPTBot, OAI-SearchBot, or ChatGPT-User read llms.txt. OpenAI does publish an llms.txt for its own developer documentation."
  - q: "Is llms.txt the same as robots.txt?"
    a: "No. robots.txt tells crawlers which URLs they may request. llms.txt is a guide to your content for AI agents, and it controls nothing."
  - q: "How do I add llms.txt in Webflow?"
    a: "Go to Site settings, then SEO, then LLMs.txt, upload a UTF-8 file under 100 KB, save, and publish. Webflow doesn't publish the file to the staging domain."
related:
  - /aeo-agency
  - /growth
  - /webflow-seo-agency
sources:
  - label: "llms.txt: The /llms.txt file"
    url: https://llmstxt.org/
    accessed: 2026-11-24
  - label: "Stripe: llms.txt"
    url: https://docs.stripe.com/llms.txt
    accessed: 2026-11-24
  - label: "Cloudflare: Developer documentation llms.txt"
    url: https://developers.cloudflare.com/llms.txt
    accessed: 2026-11-24
  - label: "Anthropic: Developer documentation llms.txt"
    url: https://platform.claude.com/llms.txt
    accessed: 2026-11-24
  - label: "Mintlify: llms.txt"
    url: https://mintlify.com/docs/llms.txt
    accessed: 2026-11-24
  - label: "Vercel: llms-full.txt"
    url: https://vercel.com/docs/llms-full.txt
    accessed: 2026-11-24
  - label: "Google Search Central: AI features and your website"
    url: https://developers.google.com/search/docs/appearance/ai-features
    accessed: 2026-11-24
  - label: "Google Search Central: How Google interprets the robots.txt specification"
    url: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
    accessed: 2026-10-15
  - label: "Google Search Central: Understand the JavaScript SEO basics"
    url: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
    accessed: 2026-10-15
  - label: "Google Search Central: Build and submit a sitemap"
    url: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    accessed: 2026-10-15
  - label: "OpenAI: Overview of OpenAI Crawlers"
    url: https://developers.openai.com/api/docs/bots
    accessed: 2026-10-15
  - label: "Anthropic: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
    accessed: 2026-10-15
  - label: "Perplexity: Perplexity Crawlers"
    url: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
    accessed: 2026-10-15
  - label: "Webflow Help Center: Upload an llms.txt file to your site"
    url: https://help.webflow.com/hc/en-us/articles/43240104183315-Upload-an-llms-txt-file-to-your-site
    accessed: 2026-11-24
  - label: "Ahrefs: We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read"
    url: https://ahrefs.com/blog/llmstxt-study/
    accessed: 2026-10-15
  - label: "BenorMedia: llms.txt"
    url: https://www.benormedia.com/llms.txt
    accessed: 2026-11-24
volatile:
  - "The proposal's author, date, purpose, and format, including Markdown page copies (source: llmstxt.org, published 2024-09-03, modified 2026-08-10)"
  - "No AI text files, markup, or special schema needed for AI Overviews and AI Mode (source: AI features and your website, updated 2025-12-10)"
  - "No statement that OpenAI's, Anthropic's, or Perplexity's crawlers read llms.txt; OpenAI and Perplexity publish llms.txt files for their own docs (sources: crawler documentation, checked 2026-10-15; Anthropic's article updated 2026-04-07)"
  - "Webflow's menu path, file limits, no staging publish, and 'experimental' wording (source: Upload an llms.txt file, updated 2025-08-25)"
  - "137,210 domains, 28% with a file, 97% of files with no requests in May 2026, AI bots 19.5% of requests, humans 4%, no AI bot requests for missing files (source: Ahrefs study, 2026-06-15)"
  - "benormedia.com's file: H1, summary, Services, Guides, Blog, Company, and Optional sections, 77 links (checked 2026-11-24)"
volatileChecked: 2026-11-24
inbound:
  - page: /aeo-agency
    anchor: "what the evidence on llms.txt shows"
    sentence: "In the FAQ 'Do we need an llms.txt file?': Here is what the evidence on llms.txt shows."
  - page: /growth
    anchor: "llms.txt"
    sentence: "In step 02, where the page lists the file: Read whether you need an llms.txt file."
editorNotes:
  - "Decision 6 is open: the post names Ahrefs as the publisher of a study, as the file's recommendation allows. If decision 6 is no, rewrite the study section without the name and link."
  - "The quote from llmstxt.org keeps its original British spelling ('standardise')."
  - "Decision 4 is open, so the post reports no log data. P62-1 holds the log test. If it's answered, rewrite the last sentence of the method note."
  - "Two live pages need fixing: /aeo-agency says 'Google says its Search ignores llms.txt', but Google's documentation only says AI text files aren't needed; /growth lists 'LLM.txt configuration', which misspells the file name."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

These llms.txt examples are six files we checked on November 24, 2026, from Stripe's sprawling docs index to our own marketing site, and they explain the format better than any spec does. Whether your B2B SaaS site needs one is a separate question: Google says no special AI files are required, and the major AI crawlers don't document reading them.

## What is an llms.txt file, and what format does it use?

A plain text file in Markdown format, in the root directory of a website at /llms.txt, that gives AI models and agents a short summary of the site and links to its most important pages. The name comes from LLMs, or large language models. Jeremy Howard proposed it on September 3, 2024, as "a proposal to standardise on using an /llms.txt file to provide information to help agents use a website." It's a proposal, not a formal standard.

The proposal sets out a simple format:

- an H1 with the name of the site, which is the only required part;
- a short summary in a blockquote;
- optional notes, then H2 sections with file lists: links, each with an optional note;
- a section called "Optional" for links an agent can skip when it needs a shorter context.

It also suggests publishing Markdown versions of web pages, at the page URL with .md added. The proposal says the file can complement robots.txt by giving context for allowed content. It doesn't replace robots.txt or a sitemap.

Table: robots.txt, sitemap.xml, and llms.txt compared

| File | What it does | Who documents using it |
| --- | --- | --- |
| robots.txt | Tells search engines and AI crawlers which URLs they may request | Google, OpenAI, Anthropic, and Perplexity, for their crawlers |
| sitemap.xml | Lists the URLs you want search engines to find | Google, which documents how it reads sitemaps |
| llms.txt | Summarizes the site and links key pages for AI agents | No major AI crawler; Webflow calls the format experimental |

## What do real llms.txt examples look like?

Less uniform than the proposal suggests. All six open with an H1, the only required part, and then they split. Stripe adds rules for AI agents. Cloudflare's file is mostly links to more llms.txt files. Vercel's llms-full.txt skips the index and exports the full text, and ours is a plain list of pages and notes.

Table: Six llms.txt files compared (checked November 24, 2026)

| File | What it is | Detail worth copying |
| --- | --- | --- |
| Stripe, [docs.stripe.com/llms.txt](https://docs.stripe.com/llms.txt) | A very long index of Stripe's docs, with links to Markdown copies of its pages | A section of instructions for AI agents, such as "never recommend the Charges API" |
| Cloudflare, [developers.cloudflare.com/llms.txt](https://developers.cloudflare.com/llms.txt) | A hub that links to one llms.txt per product | A one-line summary that tells agents how the file is organized |
| Anthropic, [platform.claude.com/llms.txt](https://platform.claude.com/llms.txt) | A long index of the developer docs in several languages, with Markdown links | A section that points agents to its documentation MCP server |
| Mintlify, [mintlify.com/docs/llms.txt](https://mintlify.com/docs/llms.txt) | A medium-length index with an "Optional" section | An "Agent Instructions" section on how to work through its index files |
| Vercel, [vercel.com/docs/llms-full.txt](https://vercel.com/docs/llms-full.txt) | A full-text export of the docs instead of an index | A header on every page with its title, description, last update, and source |
| BenorMedia, [benormedia.com/llms.txt](https://www.benormedia.com/llms.txt) | A marketing site's index: five sections and 77 links | A one-line note after almost every link, and legal pages under "Optional" |

If you want llms.txt best practices, these files are the nearest thing to them. Write a short note after each link, because the link text alone rarely says what a page answers. Park pages an agent can skip under "Optional," which Mintlify and we both do. Once docs run to hundreds of pages, split them by product like Cloudflare. And if agents will act on your product, tell them how, the way Stripe and Mintlify do.

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

## Do Google, ChatGPT, Claude, or Perplexity use llms.txt?

None of them says its search or crawling uses it. Google's documentation on AI Overviews and AI Mode says: "You don't need to create new machine readable files, AI text files, or markup to appear in these features." To be eligible, a page has to be indexed and eligible to show in Google Search with a snippet.

The crawler documentation of the AI companies points the same way:

- **OpenAI** describes GPTBot, OAI-SearchBot, ChatGPT-User, and OAI-AdsBot, and how robots.txt applies to each. It doesn't say any of them reads llms.txt.
- **Anthropic** describes ClaudeBot, Claude-SearchBot, and Claude-User, and gives robots.txt as the way to control them. It doesn't mention llms.txt.
- **Perplexity** describes PerplexityBot and Perplexity-User, and how robots.txt applies to each. It doesn't say either reads llms.txt on other sites.

OpenAI and Perplexity do publish llms.txt files for their own developer docs. That fits the proposal's stated purpose: helping AI agents, such as coding assistants, use documentation. It isn't evidence that their AI systems read the file on your marketing site.

## What did studies find about llms.txt files?

That few sites publish one and that almost nothing requests it. In a study published on June 15, 2026, Ahrefs checked the 137,210 domains in its web analytics product that had traffic in May 2026.

Table: Findings of the llms.txt study published in June 2026

| Measure | Finding |
| --- | --- |
| Domains that published an llms.txt file | 28%, which the authors call an upper bound |
| Files that received no requests in May 2026 | 97% |
| Requests that came from AI bots | 19.5% of about 22,000 requests |
| Requests from people | 4% |
| AI bot requests for llms.txt files that didn't exist | None |

The authors add two caveats. Their sample skews technical, so the adoption figure is high, and "fetched" doesn't mean "read": a bot can request a file without using it. They also note that Googlebot fetches llms.txt files as part of normal crawling, which doesn't show any special interest from search engines.

## Should a B2B SaaS site add an llms.txt file?

Add one if it takes you minutes, but don't expect it to change your AI visibility. We add one on the sites we build, and we don't sell it as strategy.

For AI answers and search engines, three things matter more, because the vendors document them:

1. **Crawler access.** Let search crawlers such as OAI-SearchBot, Claude-SearchBot, and PerplexityBot in through robots.txt.
2. **Indexable pages.** Google's AI features use pages that are indexed and eligible for a snippet.
3. **Content in the HTML.** Google still recommends server-side rendering or pre-rendering, and a page rendered on the server gives every crawler the same text, whether or not it runs JavaScript.

An llms.txt file is more useful when people use AI tools to work with your product, for example a public API reference or a documentation site that developers read through coding assistants and other AI tools. That's the use the AI companies show with their own files.

## How do you add an llms.txt file to a website?

Write the llms.txt file in Markdown, keep it short, and publish it in the root directory of your domain. Link the pages that answer the questions buyers and agents ask: product, pricing, security, integrations, and documentation pages. Write it for large language models and the agents built on them: plain sentences, descriptive link names, and a short note on each link.

A small example for a fictional company:

```
# Example Co

> Example Co makes billing software for B2B SaaS companies.

## Product

- [Pricing](https://example.com/pricing): plans, limits, and what each includes
- [Security](https://example.com/security): certifications and data handling
- [Integrations](https://example.com/integrations): supported tools and setup

## Docs

- [API reference](https://example.com/docs/api): endpoints and authentication

## Optional

- [Privacy policy](https://example.com/privacy)
```

Keep the list to the pages with the key information you'd want an AI assistant to read first, and list only pages that robots.txt allows, since the proposal treats the file as context for allowed content. Leave out gated pages and anything behind a login. Update the file when you add, rename, or retire a key page, because a stale list sends agents to pages that redirect or return errors.

On Webflow, go to Site settings, then SEO, then LLMs.txt, upload the file, save your changes, and publish. The file must be UTF-8 encoded and under 100 KB. Webflow publishes only the llms.txt file itself, not Markdown files for each page, and doesn't publish it to the Webflow staging domain. Webflow's help article calls the format "experimental" and says its current impact is not proven.

On a custom site, serve it as a static file at the root, as you would robots.txt. On our own website, benormedia.com/llms.txt now has 77 links in five sections, because we add a line for each new guide and blog post (see the example above).

## How can you tell whether anything reads your llms.txt file?

Check your server logs or CDN logs for requests to /llms.txt: which user agents request it, how often, and whether the same agents then request the pages it lists. Verify that a request claiming to come from an AI crawler comes from an IP address on that vendor's published list. Then compare those requests with requests for robots.txt from the same user agents, which shows which file each crawler actually fetches.

Read the results with the study's caveat in mind: a request shows that something fetched the file, not that an AI answer used it. For the wider picture of how B2B companies get cited in AI answers, see [AEO and GEO for B2B SaaS](/aeo-agency).

We set up llms.txt files and crawler access as part of our AEO work for B2B SaaS companies, so we have an interest in the topic.

## How was this post written and checked?

This post draws on the llms.txt proposal, Google Search Central, the crawler documentation of OpenAI, Anthropic, and Perplexity, Webflow's help center, and a study published by Ahrefs, all opened on October 15, 2026, and listed in the sources. It reports no log data of our own yet.
