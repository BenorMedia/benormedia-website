---
slug: ai-mode-tracking
url: /blog/ai-mode-tracking
pageType: guide
draft: false
blockedBy: []
topicId: "6.13"
wave: 3
title: "AI Mode Tracking: How to Track Visibility in Google AI Mode"
description: "How to track visibility in Google AI Mode: what Search Console shows and hides, how AI Mode rank tracking works, and a monthly method for B2B SaaS teams."
h1: "AI Mode tracking: what Search Console shows, what it hides, and how to track Google AI Mode yourself"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-26
updatedAt: 2026-10-26
reviewEvery: 30 days
primaryKeyword: "ai mode tracking"
secondaryKeywords: ["ai mode rank tracking", "track ai mode"]
takeaways:
  - "Search Console counts AI Mode inside your normal Search data, in the Performance report under the Web search type. There is no filter that isolates AI Mode."
  - "The Generative AI performance report shows impressions only, and it combines AI Mode with AI Overviews."
  - "Google counts a click on an external link in AI Mode as a click, uses the same position method as a results page, and treats a follow-up question as a new query."
  - "To see AI Mode on its own, run a fixed set of prompts several times a month and log which links each answer cites. Any tracker is a sample, not a ranking."
  - "On October 15, 2026, Google said it is adding more inline links to AI Mode and showing them higher, so mark that date in your reports."
faqHeading: "Questions about AI Mode tracking"
faq:
  - q: "Does Search Console show AI Mode data?"
    a: "Yes, but blended. Google includes AI Mode in the overall search traffic of the Performance report, under the Web search type, and counts its impressions in the Generative AI performance report. Neither report has an AI Mode filter."
  - q: "Can you separate AI Mode from AI Overviews in Search Console?"
    a: "Not today. The Generative AI performance report includes impressions from both features, and its only filters are pages, countries, dates, devices, and a text or multimodal search type. A prompt panel is the only way to look at AI Mode alone."
  - q: "How is position counted in AI Mode?"
    a: "Google says position in AI Mode follows the same method as a Google Search results page, and carousels and image blocks inside AI Mode use the standard rules for those elements. In AI Overviews, by contrast, every link shares a single position."
  - q: "Do follow-up questions in AI Mode count as new queries?"
    a: "Yes. Google treats a follow-up question in AI Mode as a new query, and all impressions, positions, and clicks in the new response are credited to that follow-up, not to the first question."
  - q: "Can you keep a site out of AI Mode?"
    a: "Yes. The Search generative AI control in Search Console can exclude a site from AI Overviews, AI Mode, and Discover's AI features, and Google says exclusion takes effect within 1 to 2 days. The site gives up those impressions and clicks."
related:
  - /aeo-agency
  - /growth
  - /webflow-seo-agency
sources:
  - label: "Search Console Help: What are impressions, position, and clicks?"
    url: https://support.google.com/webmasters/answer/7042828?hl=en
    accessed: 2026-10-26
  - label: "Search Console Help: Generative AI performance report (Search)"
    url: https://support.google.com/webmasters/answer/16984139?hl=en
    accessed: 2026-10-26
  - label: "Google Search Central: AI features and your website"
    url: https://developers.google.com/search/docs/appearance/ai-features
    accessed: 2026-10-26
  - label: "Google: AI Mode and AI Overviews updates to explore the web"
    url: https://blog.google/products-and-platforms/products/search/updates-ai-mode-overviews-explore-web/
    accessed: 2026-10-26
  - label: "Google: Alphabet earnings call Q2 2026: Sundar Pichai remarks"
    url: https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2026/
    accessed: 2026-10-26
  - label: "Search Console Help: Search generative AI control"
    url: https://support.google.com/webmasters/answer/16908024?hl=en
    accessed: 2026-10-26
  - label: "SparkToro: AIs are highly inconsistent when recommending brands or products"
    url: https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/
    accessed: 2026-10-26
volatile:
  - "AI Mode counting rules: external link click counts as a click, standard impression rules, results-page position method, follow-up equals new query (source: Search Console Help)"
  - "Generative AI performance report: impressions only, AI Overviews and AI Mode combined, rolled out to all sites by August 31, 2026 (source: Search Console Help)"
  - "More inline links in AI Mode and AI Overviews, shown higher; test of a dedicated section for official sites (source: Google, October 15, 2026)"
  - "AI Mode passed 1 billion monthly active users (source: Alphabet Q2 2026 remarks, July 22, 2026)"
  - "Search generative AI control: exclusion within 1 to 2 days (source: Search Console Help)"
volatileChecked: 2026-10-26
inbound:
  - page: /blog/track-brand-mentions-in-chatgpt
    anchor: "tracking Google AI Mode"
    sentence: "Where the post says the same method works in other assistants, link to the post for the AI Mode version."
  - page: /blog/zero-click-searches-b2b-saas
    anchor: "AI Mode tracking"
    sentence: "In the section on what to measure when fewer people click, link to the post."
  - page: /blog/ai-traffic-in-ga4
    anchor: "why AI Mode visits don't show up separately"
    sentence: "Where the post covers Google's AI features, link to the post for the Search Console side."
  - page: /aeo-agency
    anchor: "track visibility in Google AI Mode"
    sentence: "Next to the monthly prompt report, link to the post."
editorNotes:
  - "New topic 6.13, from the data-ranked candidates of 2026-10-26: ai mode rank tracking 800, ai mode tracking 200 (KD 0), track ai mode 100. The results are mostly tool pages, so the post explains what to measure and how to judge a tracker, and names no tools."
  - "Overlap: 6.11 (not live yet) covers optimizing for AI Overviews and AI Mode, and 6.12 (not live yet) defines AI visibility metrics. This post adds the AI Mode counting rules, the reporting gaps, and the prompt method. Link both once they are live."
  - "News peg: Google's October 15, 2026 post on more inline links in AI Mode and AI Overviews."
  - "#P613-1 asks for one AI Mode example from our own panel; default deletes it."
  - "No content score this time: the scoring subscription is paused until Sergio confirms it. The brief came from the keyword check and Google's documentation."
---

AI Mode tracking means measuring how often Google's AI Mode shows, cites, and sends clicks to your pages. Search Console counts AI Mode inside your normal Search data and doesn't separate it from AI Overviews, so you need your own prompt checks on top. This guide is for B2B SaaS marketing teams, as of October 2026.

## What does AI Mode tracking measure?

AI Mode tracking measures four things: how often your links are shown in AI Mode answers, how often people click them, which of your pages get cited, and for which questions. Classic rank tracking measures one position for one query. AI Mode answers are written fresh, can cite a page several times, and change from one run to the next.

The audience is large enough to track. In its July 22, 2026 earnings remarks, Google said AI Mode had "surpassed 1 billion monthly active users." Google calls AI Mode "particularly helpful for queries where further exploration, reasoning, or complex comparisons are needed," which is a good description of B2B software research.

The format also keeps moving. On October 15, 2026, Google said it had made "continued and substantial increases to the presence of inline links" in AI Mode and AI Overviews, and that it shows them higher in responses more often. It is also testing a section that surfaces official sites at the top of a response. Mark that date in your reports, because a change in your numbers after it may come from Google's layout, not from your pages.

## What does Search Console show about AI Mode?

Search Console includes AI Mode in your overall search traffic, in the Performance report under the Web search type, and counts AI Mode impressions in the Generative AI performance report. Neither report can isolate AI Mode. The Performance report blends it with classic results, and the Generative AI report combines it with AI Overviews and shows impressions only.

Table: How Search Console reports AI Mode (as of October 2026)

| Report | Is AI Mode included? | What you get | What you can't get |
| --- | --- | --- | --- |
| Performance report, Web search type | Yes, inside overall search traffic | Clicks, impressions, and position for every query and page | An AI Mode filter or row |
| Generative AI performance report | Yes, together with AI Overviews | Impressions by page, country, date, and device, with a text or multimodal filter | Clicks, position, or an AI Mode split |

Google's counting rules for AI Mode explain what those numbers mean:

- **Clicks.** "Clicking a link to an external page in AI Mode counts as a click."
- **Impressions.** "Standard impression rules apply."
- **Position.** "Position in AI Mode follows the same methodology as a Google Search results page." In AI Overviews, by contrast, the whole overview takes one position and all its links share it.
- **Follow-ups.** A follow-up question is "essentially performing a new query," and every impression, position, and click in the new response is credited to that follow-up.

Two smaller details matter when you compare periods. The newest data in the Generative AI report is preliminary and can change for a few hours, and Search Console leaves out Search Labs experiments. The report reached all sites on August 31, 2026, so check how far back your own data goes before you compare periods.

The follow-up rule changes how you read query data. A buyer who asks a broad question and then narrows it creates a second query in your reports, often a long, conversational one. Those long queries are worth reading closely: they show how people actually ask about your category.

## Can you rank track AI Mode?

Only as a sample. Search Console gives AI Mode links a position, but the answer behind it changes between runs, and Google's AI features issue "multiple related searches across subtopics and data sources" before they answer. A tracker can tell you how often a prompt cites you across many runs. It can't give you a stable rank.

Instability is the main reason. In SparkToro's January 2026 study of 2,961 runs across ChatGPT, Claude, and Google's AI answers, there was less than a 1 in 100 chance that ChatGPT or Google's AI returned the same list of brands in two responses. AI answers vary between runs, so one screenshot proves nothing.

If you use a tracker for AI Mode, ask how it handles the things that make AI Mode different:

Table: Questions to ask an AI Mode tracker

| Question | Why it matters |
| --- | --- |
| Does it query AI Mode itself, separately from AI Overviews? | Search Console can't split them, so the tracker is your only split |
| How many times does it run each prompt per check? | One run per prompt is noise |
| Which location, language, and device does it use? | AI Mode answers can differ by market, and your buyers may sit in several |
| Does it record follow-up prompts as separate queries? | Google counts follow-ups as new queries, so your data should too |
| Does it capture inline links and end-of-answer links separately? | Google is moving links inline and higher, so placement changes value |
| Can you read the raw answer behind every number? | You need to check accuracy, not only presence |

## How do you build an AI Mode prompt set?

Start from the long, conversational queries in your Search Console data, add the questions your sales team hears, and write each one the way a buyer would type it into AI Mode. Then add the sub-questions AI Mode may fan out into and the follow-ups a buyer would ask next. Keep the set fixed so you can compare months.

A workable process for a B2B SaaS team:

1. Filter the Performance report for queries of six words or more and pull the ones in your category. These are the closest thing you have to real AI Mode prompts.
2. Add comparison and evaluation prompts from sales calls, such as "best onboarding software for a 50-person customer success team" or "[your product] vs [competitor] for SOC 2 reporting."
3. For each prompt, write two or three sub-questions it implies, such as pricing model, integrations, and setup time. AI Mode searches subtopics, so the pages that answer them are the ones it can cite.
4. Write one follow-up per prompt and track it as its own query, matching how Google counts it.
5. Run each prompt several times per check, log the cited URLs, where the links appear, and whether the answer describes you correctly.

We track 30 to 50 buyer prompts for each client and report mention rate, citations, and AI referral pipeline monthly. Our [30-prompt method for tracking ChatGPT mentions by hand](/blog/track-brand-mentions-in-chatgpt) works the same way in AI Mode.

## How do you track clicks and conversions from AI Mode?

You can't isolate them. Google counts AI Mode clicks inside Search Console's Web search traffic, and its documentation doesn't describe a way to separate AI Mode visits in Google Analytics. The practical route is to track the landing pages AI Mode cites in your prompt panel and watch their Google organic clicks and conversions over time.

Google's own advice is to pair Search Console with other tools: "you could also track conversions and time spent on your site in other tools, such as Google Analytics." In practice:

- Keep a list of the URLs your prompt panel sees cited in AI Mode, and tag them as a page group in your analytics.
- Watch Google organic sessions and key events for that group, month over month, next to the Generative AI report's impressions for the same pages.
- Read the change against dates you control, such as page rewrites, and dates you don't, such as Google's October 15 link changes.

Fewer clicks per search is also part of the picture. Our post on [zero-click searches](/blog/zero-click-searches-b2b-saas) covers what to report when visibility rises and visits don't, and our guide to [tracking AI traffic in GA4](/blog/ai-traffic-in-ga4) covers the assistants that do send a separate referrer.

## What should a monthly AI Mode report include?

Five numbers cover it: AI feature impressions from Search Console, the cited-page share from your prompt panel, the accuracy of what AI Mode says about you, Google organic conversions on the pages it cites, and a short note on Google changes that month. Report trends, not single readings.

Table: A monthly AI Mode report for a B2B SaaS team

| Metric | Source | Note |
| --- | --- | --- |
| AI feature impressions by page | Generative AI performance report | Includes AI Overviews; read it as a trend |
| Share of prompt runs that cite your site | Your prompt panel | Split by prompt stage, such as problem, category, and comparison |
| Where your links appear | Your prompt panel | Inline, in an official sites section, or at the end |
| Errors in answers about your product | Your prompt panel | Pricing model, integrations, and audience |
| Organic clicks and conversions on cited pages | Search Console and your analytics | Blended with classic results |
| Google changes that month | Google's announcements | Such as the October 15, 2026 inline link update |

If a site would rather not appear at all, the [Search generative AI control](/blog/optimize-for-ai-overviews) in Search Console can exclude it from AI Overviews, AI Mode, and Discover's AI features within 1 to 2 days. For a B2B SaaS marketing site, that usually means giving up visibility your buyers already use.

We run AEO and GEO programs for B2B SaaS companies, so we have an interest in the topic. Our [AEO and GEO program](/aeo-agency) includes the monthly prompt report described here.
