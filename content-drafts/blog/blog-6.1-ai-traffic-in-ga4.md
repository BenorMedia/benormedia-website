---
slug: ai-traffic-in-ga4
url: /blog/ai-traffic-in-ga4
pageType: guide
draft: true
blockedBy: []
topicId: "6.1"
wave: 1
title: "How to Track ChatGPT and AI Traffic in GA4 | BenorMedia"
description: "GA4 now has an AI Assistant channel. How to find ChatGPT, Perplexity, Claude, and Copilot visits, fill the gaps with a custom channel group, and read them."
h1: "How to track ChatGPT traffic in GA4, plus Perplexity, Claude, and Copilot"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-11-10
updatedAt: 2026-11-10
reviewEvery: none
primaryKeyword: "how to track chatgpt traffic in ga4"
secondaryKeywords: []
takeaways:
  - "GA4's default channel group now includes an AI Assistant channel for visits from sources such as ChatGPT, Gemini, Deepseek, Copilot, and Grok."
  - "ChatGPT tags its links with utm_source=chatgpt.com, which makes its visits the easiest to identify."
  - "Google doesn't publish the full list behind the channel, so check Referral for assistants such as Perplexity and Claude, and add them with a custom channel group."
  - "Google's AI Overviews and AI Mode are excluded from the channel and count as Organic Search."
  - "GA4 shows clicks, not mentions, so pair it with a regular check of what AI answers say about you."
faqHeading: "Questions about tracking AI traffic in GA4"
faq:
  - q: "Does GA4 track ChatGPT traffic automatically?"
    a: "For most visits, yes. GA4's default channel group includes an AI Assistant channel for sources such as ChatGPT, and ChatGPT adds utm_source=chatgpt.com to the links it shows. Check Session source to confirm what GA4 recorded."
  - q: "Why does Perplexity or Claude traffic show up as Referral?"
    a: "Google doesn't publish the full list of assistants behind its AI Assistant channel, and its examples don't name Perplexity or Claude. If they appear under Referral, add them with a custom channel group."
  - q: "Are Google AI Overviews and AI Mode in the AI Assistant channel?"
    a: "No. Google excludes them from the channel, so those clicks count as Organic Search. Search Console includes them in its Web search totals."
  - q: "Can I see AI traffic for past months?"
    a: "Yes, with a custom channel group. GA4 applies custom channel groups to your reports retroactively, though not to audiences."
  - q: "Who can create a custom channel group in GA4?"
    a: "A user with the Editor role or higher on the property. Standard properties can have 2 custom channel groups, and Analytics 360 properties can have 5."
related:
  - /aeo-agency
  - /webflow-seo-agency
  - /growth
sources:
  - label: "Google Analytics Help: Default channel group"
    url: https://support.google.com/analytics/answer/9756891?hl=en
    accessed: 2026-10-15
  - label: "Google Analytics Help: Custom channel groups"
    url: https://support.google.com/analytics/answer/13051316?hl=en
    accessed: 2026-10-15
  - label: "Google Analytics Help: Segment builder"
    url: https://support.google.com/analytics/answer/9304353?hl=en
    accessed: 2026-10-15
  - label: "Google Analytics Help: Analytics' list of sources and categories (spreadsheet)"
    url: https://storage.googleapis.com/support-kms-prod/qn1xhBu8MVcZPIZ2WZMNdI40FtZXFPGYxj2K
    accessed: 2026-10-15
  - label: "OpenAI Help Center: Publishers and Developers FAQ"
    url: https://help.openai.com/en/articles/12627856
    accessed: 2026-10-15
  - label: "Google Search Central: AI features and your website"
    url: https://developers.google.com/search/docs/appearance/ai-features
    accessed: 2026-10-15
volatile:
  - "The AI Assistant channel, its example sources (ChatGPT, Gemini, Deepseek, Copilot, Grok), the ai-assistant medium and campaign, and the exclusion of AI Overviews and AI Mode (source: Default channel group)"
  - "Custom channel group rules: Editor role, 2 groups in standard and 5 in 360 properties, Admin path, button names (Create new channel group, Add new channel, Reorder, Save group), first-match order, Google's AI assistants example placed above Referral, retroactive except audiences (source: Custom channel groups)"
  - "Segments work only in explorations and are calculated retroactively (source: Segment builder)"
  - "The sources list has search, social, shopping, and video categories only (source: Analytics' list of sources and categories, checked 2026-10-15)"
  - "ChatGPT adds utm_source=chatgpt.com, and OAI-SearchBot must not be blocked (source: OpenAI Publishers and Developers FAQ)"
  - "AI Overviews and AI Mode traffic is included in Search Console's Web search totals (source: Google Search Central, updated 2025-12-10)"
volatileChecked: 2026-10-15
inbound:
  - page: /aeo-agency
    anchor: "how to see AI traffic in GA4"
    sentence: "In the reporting item on AI-referred traffic: Here is how to see AI traffic in GA4."
  - page: /webflow-seo-agency
    anchor: "track ChatGPT traffic in GA4"
    sentence: "After 'ChatGPT tags its links with utm_source=chatgpt.com': See how to track ChatGPT traffic in GA4."
editorNotes:
  - "Google's page doesn't say when the AI Assistant channel was added. Secondary reports put it around May 2026, so the post gives no date."
  - "Menu names (Traffic acquisition, Session source, Explorations) are standard GA4 labels; check them in the property before publishing."
  - "The Realtime check uses a private window so the test visit counts as a new user; Realtime cards may show first-user source rather than session source."
  - "Google's own AI assistants regex is broader than ours and has no Claude pattern, though its text names Claude. The post doesn't quote it, so it can't go stale."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

To track ChatGPT traffic in GA4, open the Traffic acquisition report and find the AI Assistant channel, now part of the default channel group. That tells you which assistants send buyers and whether those visits convert. This guide for B2B SaaS marketing teams, as of October 2026, covers the setup, its gaps, and a custom channel group.

## Where do you view AI traffic in GA4?

In the AI Assistant channel of the default channel group in Google Analytics 4 (GA4). Google defines it as visits from sources like ChatGPT, Gemini, Deepseek, Copilot, or Grok, and it leaves out Google's own AI Overviews and AI Mode.

To see it:

1. Open the Traffic acquisition report.
2. Keep the default channel group as the primary dimension, and find the AI Assistant row.
3. Switch the primary dimension to Session source / medium to see which assistant sent each visit.

When GA4 recognizes the referrer as an AI assistant, it sets the medium to ai-assistant and the campaign to (ai-assistant). You can filter reports and explorations on either value.

## How does ChatGPT traffic show up in GA4?

With chatgpt.com as the source. OpenAI says ChatGPT adds utm_source=chatgpt.com to the links it shows, so GA4 can attribute the visit from the link itself.

OpenAI also tells site owners not to block its OAI-SearchBot crawler if they want their content in ChatGPT's search results. If your robots.txt blocks it, there may be little ChatGPT traffic to measure, so check that file before you read a low number as low interest.

## Which AI traffic sources can GA4 miss?

Some AI traffic never reaches the AI Assistant channel, mainly from assistants that aren't on Google's list and from Google's own AI features.

- **Assistants Google doesn't list.** Google doesn't publish the full list behind the AI Assistant channel. Its downloadable list of sources and categories, checked on October 15, 2026, has categories for search, social, shopping, and video only. If sources such as perplexity.ai or claude.ai appear under Referral, the default channel isn't catching them.
- **AI Overviews and AI Mode.** Google excludes them from the AI Assistant channel, so their clicks count as Organic Search. Search Console includes them in its Web search totals.

Table: Where each AI source should show up in GA4

| Source | In Google's AI Assistant definition? | Where to look |
| --- | --- | --- |
| ChatGPT | Yes, named | AI Assistant channel, with chatgpt.com as Session source |
| Gemini, Copilot, Deepseek, and Grok | Yes, named | AI Assistant channel, by Session source |
| Perplexity | Not named | AI Assistant or Referral; add it to a custom group if it's in Referral |
| Claude | Not named | AI Assistant or Referral; add it to a custom group if it's in Referral |
| Google AI Overviews and AI Mode | Excluded | Organic Search in GA4, Web search totals in Search Console |

## How do you build a custom channel group for AI traffic?

To track AI traffic beyond the assistants Google lists, copy the default channel group, add an AI channel above Referral, and match the AI tools and AI platforms by source with a regular expression. GA4 applies custom channel groups to your reports retroactively, so the new view covers your historical data too.

1. In Admin, under Data display, open Channel groups. You need the Editor role or higher on the property.
2. Select Create new channel group. GA4 starts the new channel group from a copy of the default group.
3. Select Add new channel, name it AI assistants, and add a condition group: Source matches regex, with the pattern below. Then select Save channel.
4. Select Reorder, drag the new channel above Referral, and select Apply. GA4 puts each visit in the first channel it matches, so the order decides where AI traffic lands.
5. Select Save group, then choose the group as the primary dimension in the Traffic acquisition report.

A starting regex pattern for the five assistants in this post:

```
.*(chatgpt\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com|gemini\.google\.com).*
```

The backslash before each dot makes the pattern match a literal dot, and the vertical bars separate the domains. Add any other AI sources that show up in your Session source report. Google's help article on custom channel groups uses an AI assistants channel as its own example, with a broader pattern, and advises updating the regex when the list of assistants you want to measure changes.

Standard properties can have 2 custom channel groups and Analytics 360 properties 5, so plan which ones you need. If none are left, build a session segment for the same AI sources in an exploration instead. Segments work only in explorations, but they apply to past data too.

### Check that it works

Ask an AI assistant a question that one of your pages answers, follow its link to your site in a private browser window, and check that the Realtime report in Google Analytics shows the visit with the assistant as its source. After a few weeks, compare your custom channel with the default AI Assistant channel. If the custom one is larger, the difference is AI-driven traffic from assistants that Google's list misses.

## How much traffic do AI assistants send, and what does it do?

Check which assistants send visits, which pages those visits land on, and whether they turn into demo requests or sign-ups. Put landing pages and key events next to the AI channel to see all three.

A one-page monthly view for a B2B SaaS team covers:

- sessions and engaged sessions by assistant;
- the top landing pages for AI traffic, so you know which pages assistants link to;
- key events from AI visits, such as demo requests and sign-ups, next to the same figures for other channels;
- AI traffic as a share of all website traffic, month over month;
- anything that changed on the site that month, such as a robots.txt edit, a new page, or a pricing update.

To build it:

- In the Traffic acquisition report, keep your AI channel as the primary dimension and add Landing page as a secondary dimension.
- In an exploration, combine Session source, Landing page, and your key events, filtered to the AI channel or to the ai-assistant medium.
- Add the custom channel group to custom reports, or use it in audience conditions if you want to compare AI visitors with other visitors over time. Audiences only count from the day you change them, not retroactively.

Pick a date range of at least a full month, and read the numbers over months rather than days, since a few visits can swing the percentages on a B2B site. Turn on the comparison to the previous period in the date picker, so the monthly change sits in the same report. If AI traffic lands mostly on blog posts, check that those pages give a clear next step to the product or a demo.

## What can't GA4 tell you about AI visibility?

Whether an assistant mentioned you without a click. Google Analytics only sees visits, so a buyer who reads your name in an AI answer and later finds you through a search engine or types your address shows up as organic traffic or direct traffic.

For Google's own AI features, Search Console is the closer view: Google includes traffic from AI Overviews and AI Mode in the Performance report's Web search totals.

To see the mentions themselves, check the answers: run a fixed set of buyer prompts on a schedule and record which assistants name you and which pages they cite. That is part of how [AEO and GEO](/aeo-agency) work is measured, alongside the referral traffic in GA4.

We report AI-referred visits for B2B SaaS clients as part of that work, so we have an interest in the topic.

## How was this post written and checked?

This post draws on Google Analytics Help, Google Search Central, and OpenAI's help center, all opened on October 15, 2026, and listed in the sources.
