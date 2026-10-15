---
slug: ai-crawlers-robots-txt
url: /blog/ai-crawlers-robots-txt
pageType: guide
draft: true
blockedBy: []
topicId: "6.3"
wave: 1
title: "GPTBot and AI Crawlers: Which to Allow | BenorMedia"
description: "GPTBot trains models, while OAI-SearchBot puts you in ChatGPT answers. Which AI crawlers a B2B SaaS site should allow in robots.txt, vendor by vendor."
h1: "GPTBot, ClaudeBot, and other AI crawlers: which to allow in robots.txt"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-11-24
updatedAt: 2026-11-24
reviewEvery: none
primaryKeyword: "gptbot"
secondaryKeywords: ["claudebot"]
takeaways:
  - "Each AI vendor runs separate crawlers for training, for search, and for visits a user triggers, and you can allow or block each one."
  - "Blocking OAI-SearchBot keeps your pages out of ChatGPT search answers, while blocking GPTBot only signals that your content shouldn't be used for training."
  - "Anthropic splits the same way: ClaudeBot for training, Claude-SearchBot for search, and Claude-User for user questions."
  - "A B2B SaaS site that wants to appear in AI answers should let the search crawlers in and decide on training crawlers as a separate business question."
  - "Robots.txt is a request, not a lock: user-triggered fetchers may ignore it, so check your logs against the vendors' published IP lists."
faqHeading: "Questions about AI crawlers and robots.txt"
faq:
  - q: "What is GPTBot?"
    a: "GPTBot is OpenAI's crawler for content that may be used to train its generative AI models. Blocking it in robots.txt signals that your content should not be used for training, and it doesn't affect ChatGPT search, which uses OAI-SearchBot."
  - q: "What is ClaudeBot?"
    a: "ClaudeBot is Anthropic's crawler for web content that could contribute to training its models. Blocking it tells Anthropic to exclude your future content from training datasets. Claude-SearchBot and Claude-User handle search and user questions."
  - q: "Does blocking GPTBot remove my site from ChatGPT?"
    a: "No. OpenAI says each setting is independent. To stay in ChatGPT search answers, allow OAI-SearchBot, even if you block GPTBot."
  - q: "Do AI crawlers respect robots.txt?"
    a: "The vendors' crawlers covered here say they do, but their user-triggered fetchers may not. OpenAI says robots.txt rules may not apply to ChatGPT-User, and Perplexity says Perplexity-User generally ignores robots.txt."
  - q: "Does Google-Extended affect Google Search rankings?"
    a: "No. Google says Google-Extended doesn't affect a site's inclusion in Google Search and isn't a ranking signal. It controls whether content may be used to train Gemini models and for grounding."
related:
  - /aeo-agency
  - /webflow-seo-agency
  - /growth
sources:
  - label: "OpenAI: Overview of OpenAI Crawlers"
    url: https://developers.openai.com/api/docs/bots
    accessed: 2026-10-15
  - label: "Anthropic: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
    accessed: 2026-10-15
  - label: "Perplexity: Perplexity Crawlers"
    url: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
    accessed: 2026-10-15
  - label: "Google Search Central: Google's common crawlers (Google-Extended)"
    url: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
    accessed: 2026-10-15
  - label: "Google Search Central: AI features and your website"
    url: https://developers.google.com/search/docs/appearance/ai-features
    accessed: 2026-10-15
  - label: "Google Search Central: How Google interprets the robots.txt specification"
    url: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
    accessed: 2026-10-15
  - label: "Webflow Help Center: Set robots.txt rules"
    url: https://help.webflow.com/hc/en-us/articles/41954080897683-Set-robots-txt-rules
    accessed: 2026-10-15
  - label: "Webflow Help Center: Request to block specific bots from visiting your site"
    url: https://help.webflow.com/hc/en-us/articles/41954183592851-Request-to-block-specific-bots-from-visiting-your-site
    accessed: 2026-10-15
volatile:
  - "OpenAI crawler names and purposes, independence of settings, about 24 hours for search changes, GPTBot user-agent string, IP list URLs (source: Overview of OpenAI Crawlers)"
  - "Anthropic crawler names and purposes, robots.txt and Crawl-delay support, warning on IP blocking, IP list URL (source: Anthropic help article, updated April 7, 2026)"
  - "Perplexity crawler names, purposes, Perplexity-User ignoring robots.txt, IP list URLs (source: Perplexity Crawlers)"
  - "Google-Extended scope and no effect on Search (source: Google's common crawlers)"
  - "Group selection and case rules (source: How Google interprets the robots.txt specification, updated 2026-08-31)"
  - "Webflow menu path and plan requirement (sources: Set robots.txt rules, updated May 19, 2026; Request to block specific bots, updated August 22, 2025)"
volatileChecked: 2026-10-15
inbound:
  - page: /webflow-seo-agency
    anchor: "which AI crawlers to allow"
    sentence: "In the 'Crawler access.' item: More on which AI crawlers to allow."
  - page: /aeo-agency
    anchor: "AI crawlers and robots.txt"
    sentence: "Where the page covers technical access for AI answers: See which AI crawlers and robots.txt rules a B2B SaaS site needs."
editorNotes:
  - "Decision 4 is open, so the post states no crawler log results. The marked paragraph in the logs section is where benormedia.com's own data goes once the log source works."
  - "The vendor IP list URLs are written out in the text; check that each still loads before publishing."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

Allow the AI search crawlers, such as OAI-SearchBot, Claude-SearchBot, and PerplexityBot, if you want your B2B SaaS site to appear in AI answers, and decide on training crawlers such as GPTBot and ClaudeBot separately. The wrong block can keep you out of AI answers. This guide for marketing leads and founders explains each crawler, as of October 2026.

## What is the difference between GPTBot, OAI-SearchBot, and ChatGPT-User?

They do three different jobs. GPTBot is OpenAI's web crawler for AI training, collecting content that may be used to train its generative AI foundation models. OAI-SearchBot decides whether your pages can appear in ChatGPT's search answers, and ChatGPT-User visits a page when someone asks ChatGPT a question.

OpenAI gives website owners a separate control for each user agent, and says each setting is independent of the others. You can allow OAI-SearchBot for search and disallow GPTBot for training, which is the example OpenAI gives itself. If you allow both, OpenAI may use the results of one crawl for both purposes.

The consequences differ:

- **Blocking OAI-SearchBot.** OpenAI says sites that opt out of it won't be shown in ChatGPT search answers, though they can still appear as navigational links. After a robots.txt change, it can take about 24 hours for OpenAI's systems to adjust.
- **Blocking GPTBot.** This signals that your content shouldn't become training data for OpenAI's AI models. Disallowing GPTBot has no bearing on ChatGPT search.
- **ChatGPT-User.** Because a person triggers these visits, OpenAI says robots.txt rules may not apply. OpenAI also says ChatGPT-User isn't used to decide whether content appears in search.

OpenAI lists a fourth agent, OAI-AdsBot, which checks pages submitted as ads in ChatGPT. Its data isn't used to train OpenAI's models, and it only visits pages submitted as ads.

## What do ClaudeBot, Claude-SearchBot, and Claude-User do?

Anthropic splits its crawlers the same way. ClaudeBot collects web content that could contribute to training Anthropic's AI models, Claude-SearchBot indexes content to improve Claude's search results, and Claude-User fetches pages when a Claude user asks a question.

Anthropic tells site owners that its bots honor robots.txt directives, and it supports the non-standard Crawl-delay extension. According to Anthropic's help article, updated April 7, 2026:

- blocking ClaudeBot tells Anthropic to exclude your future content from its training datasets;
- blocking Claude-SearchBot stops your content from being indexed for search, which may reduce your visibility in Claude's search results;
- blocking Claude-User stops Claude from retrieving your pages in response to a user's question.

Anthropic also warns that blocking its IP addresses may not opt you out reliably, because it stops the bots from reading your robots.txt. Add the rules to the robots.txt file of each subdomain you want covered.

## Which other AI bots matter for a B2B SaaS site?

Perplexity's two agents and Google's Google-Extended token. PerplexityBot surfaces and links websites in Perplexity's search results, and Perplexity says it isn't used to crawl content for AI foundation models. Perplexity recommends allowing it if you want your site to appear in its results.

Perplexity-User visits a page when a user asks a question and may link to it in the answer. Perplexity says that, because a user requested the fetch, it generally ignores robots.txt rules.

Google-Extended is a robots.txt token, not a separate crawler. It controls whether content Google crawls may be used to train future Gemini models and for grounding in Gemini Apps and on Vertex AI. Google says Google-Extended doesn't affect a site's inclusion in Google Search and isn't used as a ranking signal. Google's AI Overviews and AI Mode come from Google Search itself, so this token doesn't remove you from them.

## Which AI crawlers should a B2B SaaS site allow?

If you want to appear in AI answers, allow the search crawlers and the user-triggered fetchers, and treat AI training as a separate decision. Blocking a search crawler can keep you out of that assistant's answers; blocking a training crawler doesn't.

Table: What each AI crawler does, and what blocking it changes

| Crawler | Vendor | What it's for | If you block it |
| --- | --- | --- | --- |
| GPTBot | OpenAI | Content that may train AI models | Signals no training use; search unaffected |
| OAI-SearchBot | OpenAI | ChatGPT search | Not shown in ChatGPT search answers |
| ChatGPT-User | OpenAI | Visits users ask for | Rules may not apply |
| ClaudeBot | Anthropic | Content that could train AI models | Future content excluded from training |
| Claude-SearchBot | Anthropic | Claude's search results | Not indexed for search |
| Claude-User | Anthropic | Visits users ask for | Not retrieved for user questions |
| PerplexityBot | Perplexity | Perplexity's search results | Perplexity advises allowing it to appear |
| Perplexity-User | Perplexity | Visits users ask for | Generally ignores robots.txt |
| Google-Extended | Google | Gemini training and grounding | No effect on Google Search |

AI training is a business question, not an SEO one. One company may want its documentation in future AI models so assistants describe the product correctly; another may not want its content used as training data without a license. Whichever you choose, write it down, so the next person who edits robots.txt knows why.

Our default on client sites is the setup described on our [Webflow SEO and AEO page](/webflow-seo-agency): search crawlers such as OAI-SearchBot, PerplexityBot, and Claude-SearchBot are allowed, and the AI training decision stays with the client.

We set up crawler access for B2B SaaS clients as part of our SEO and AEO work, so we have an interest in the topic.

## How do you block GPTBot and other training crawlers in robots.txt?

Name each crawler you want to block in its own group, and leave the others to your general rules. Under the robots.txt standard as Google documents it, a crawler follows only the most specific group that names it, and named groups aren't combined with the general group for all user agents.

This example robots.txt file keeps the search crawlers and the user-triggered fetchers on your general rules, and blocks GPTBot, ClaudeBot, and Google-Extended:

```
User-agent: *
Disallow: /admin/

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

Three details matter:

1. **Repeat your general rules in named groups.** A crawler with its own group ignores the rules under User-agent: *, so copy any paths you block for everyone into each named group that should keep them.
2. **Names aren't case-sensitive, paths are.** Google's documentation says user-agent values are case-insensitive, while the paths in rules are case-sensitive.
3. **Robots.txt is public and voluntary.** Anyone can read the file, and not every bot follows it, so it doesn't protect private pages.

On a Webflow site, open Site settings, then SEO, then Indexing, add the rules, save, and publish the site. Webflow says you need a Site plan or a paid Workspace plan to add a robots.txt file.

## How do you check which AI crawlers visit your site?

Check your server logs or CDN request logs, if your host provides them. Each AI bot names itself in the user-agent string of its requests: GPTBot's, for example, contains GPTBot and a link to openai.com/gptbot. Any client can send a user-agent string that names a crawler, though, so verify each visit against the vendor's published IP list.

The vendors publish their lists here:

- OpenAI: openai.com/searchbot.json, openai.com/gptbot.json, and openai.com/chatgpt-user.json;
- Anthropic: claude.com/crawling/bots.json;
- Perplexity: perplexity.com/perplexitybot.json and perplexity.com/perplexity-user.json.

Look for three things: which bots come at all, which pages their requests target, and whether blocked crawlers keep sending requests. If you block GPTBot and it still requests pages days later, check the user agent and IP address before you assume the rule failed. A training crawler that ignores a Disallow is worth reporting to its vendor. A user-triggered fetcher that ignores it is behaving as its vendor describes.

## How was this post written and checked?

This post draws on the crawler documentation of OpenAI, Anthropic, Perplexity, and Google, and on Webflow's help center, all opened on October 15, 2026, and listed in the sources.
