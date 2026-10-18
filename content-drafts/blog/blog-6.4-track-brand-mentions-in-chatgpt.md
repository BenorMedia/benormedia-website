---
slug: track-brand-mentions-in-chatgpt
url: /blog/track-brand-mentions-in-chatgpt
pageType: guide
draft: false
blockedBy: []
topicId: "6.4"
wave: 2
title: "How to Track Brand Mentions in ChatGPT by Hand | BenorMedia"
description: "How to track brand mentions in ChatGPT and other AI assistants by hand: a 30-prompt set, a clean way to run it, a scoring sheet, and what it can't tell you."
h1: "How to track brand mentions in ChatGPT by hand: a 30-prompt method"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-18
updatedAt: 2026-10-18
reviewEvery: none
primaryKeyword: "how to track brand mentions in chatgpt"
secondaryKeywords: []
takeaways:
  - "AI answers change from one run to the next, so track a fixed set of prompts on a schedule instead of trusting one screenshot."
  - "Build 30 prompts from real buyer questions, across category, problem, comparison, alternatives, and pricing prompts, and keep your brand name out of most of them."
  - "Run them in a clean session, such as ChatGPT's Temporary Chat with personalization off, because memory and location can change the answer."
  - "Record mentions, position, competitors, cited pages, and factual errors for every answer, then report a mention rate by platform and prompt type."
  - "Connect the results to AI-referred visits in GA4 and to a self-reported source field on your forms."
faqHeading: "Questions about tracking brand mentions in AI answers"
faq:
  - q: "Can you track brand mentions in ChatGPT for free?"
    a: "Yes. A fixed set of prompts, a clean session, and a spreadsheet are enough for a monthly baseline. It takes a few hours a month and gives you trends, not exact market share."
  - q: "How many prompts do you need to track AI visibility?"
    a: "About 30 is a practical minimum for one person to run by hand. It's enough to cover the main prompt types for a B2B SaaS category, and small enough to repeat every month."
  - q: "Why does ChatGPT give different answers to the same prompt?"
    a: "Answers can vary from run to run, and ChatGPT search may use your approximate location and saved memories when it rewrites your query. That's why a single result proves little and a repeated prompt set is more reliable."
  - q: "How often should you check AI brand mentions?"
    a: "Monthly is enough for most B2B SaaS companies. Run the same prompts in the same week each month, so changes reflect the answers and not the timing."
  - q: "How do you see traffic from ChatGPT in Google Analytics?"
    a: "Look at the AI Assistant channel in GA4's default channel group, and at sessions with the source chatgpt.com, which ChatGPT adds to the links it sends."
related:
  - /aeo-agency
  - /growth
  - /webflow-seo-agency
sources:
  - label: "OpenAI Help Center: Searching the web with ChatGPT"
    url: https://help.openai.com/en/articles/9237897-chatgpt-search
    accessed: 2026-10-18
  - label: "OpenAI Help Center: Temporary chat in ChatGPT"
    url: https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt
    accessed: 2026-10-18
  - label: "OpenAI Help Center: Does ChatGPT tell the truth?"
    url: https://help.openai.com/en/articles/8313428-chatgpt-and-fake-citations
    accessed: 2026-10-18
  - label: "Perplexity Help Center: How does Perplexity work?"
    url: https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work
    accessed: 2026-10-18
  - label: "Analytics Help: Default channel group"
    url: https://support.google.com/analytics/answer/9756891
    accessed: 2026-10-15
  - label: "BenorMedia: AEO & GEO Agency for B2B SaaS"
    url: https://www.benormedia.com/aeo-agency
    accessed: 2026-10-18
volatile:
  - "ChatGPT search: automatic and manual search, citations and Sources, approximate location and memory can shape results (source: Searching the web with ChatGPT, checked 2026-10-18)"
  - "Temporary Chat: no new memories; unpersonalized chats skip custom instructions; out of history; kept up to 30 days (source: checked 2026-10-18)"
  - "Perplexity answers include numbered citations (source: checked 2026-10-18)"
  - "GA4 AI Assistant channel (source: Default channel group, checked 2026-10-15)"
volatileChecked: 2026-10-18
inbound:
  - page: /aeo-agency
    anchor: "track brand mentions in ChatGPT by hand"
    sentence: "In 'How we measure AI search visibility': If you want to start before hiring anyone, here's how to track brand mentions in ChatGPT by hand."
  - page: /growth
    anchor: "a 30-prompt method"
    sentence: "In step 06, Tracking & reporting: For AI answers, start with a 30-prompt method."
editorNotes:
  - "The topic row asks for a repeatable method with a scoring sheet and no tool names. The post names AI assistants (the subject) but no tracking tools."
  - "The worked scoring example is labeled as an example; it uses no real results."
  - "/aeo-agency already describes a 30 to 50 prompt set and monthly reports; this post goes deeper on running and scoring it by hand and repeats only what the page states."
  - "The planned 'Free AEO scan' page owns the query 'ai visibility checker'; this post doesn't target it."
  - "Once post 6.1 (AI traffic in GA4) is live, link it from the traffic section."
---

To track brand mentions in ChatGPT without a tool, run a fixed set of about 30 buyer prompts every month in a clean session, record whether each answer names you, and report the mention rate by platform and prompt type. This guide gives B2B SaaS marketing leads the prompt set, the scoring sheet, and the limits of the method.

## Can you track brand mentions in ChatGPT without a tool?

Yes, as long as you treat it as a sample, not a screenshot. AI-generated answers vary between runs, even for the same prompt, so a single answer where your brand appears, or doesn't, proves very little. What works is the same set of prompts, run the same way, on a schedule, with every answer recorded. That gives you a trend you can compare month to month.

ChatGPT makes this harder than traditional search engines do. OpenAI's help center says ChatGPT may search the web on its own when a question would benefit from current information, may use an approximate location inferred from your IP address, and may use saved memories when it rewrites your query for search. Two people asking the same question can get different ChatGPT responses. Without web search, large language models answer from their training data, which can be months out of date.

Doing it by hand takes a few hours a month. For most B2B SaaS companies starting with AI visibility, that's enough to set a baseline, see where your brand appears and where it's completely absent, spot which competitors AI models recommend, and find out which of your pages they cite. SEO teams and marketing leads can run it without new software or API access.

## How do you build a 30-prompt set?

Start from the questions buyers actually ask, not from your keyword list. Sales call notes, demo request forms, support tickets, and the longer queries in Google Search Console are the best sources. AI prompts tend to be longer and more specific than search keywords, so write them the way a buyer would type them.

Spread the prompts across five types. For a project management software company, a category prompt might be "What's the best project management tool for a 40-person agency?" The placeholders below work for any category:

Table: A 30-prompt set for a B2B SaaS company

| Prompt type | Example | Prompts |
| --- | --- | --- |
| Category | "What are the best tools for [job] for a mid-size B2B team?" | 8 |
| Problem | "How do I [solve problem] without [common workaround]?" | 7 |
| Comparison | "[Competitor A] vs [Competitor B] for [use case]" | 6 |
| Alternatives | "Alternatives to [competitor] for [segment]" | 5 |
| Pricing | "How much does [category] software cost for a 50-person team?" | 4 |

Keep your own brand name out of almost every prompt. A prompt that names you measures what AI knows about your company, which is useful, but it doesn't show whether you're recommended to buyers who haven't heard of you. Add two or three branded prompts ("What is [your company] and who is it for?") separately, to check that the facts AI states about you are accurate.

Group the prompts by buyer stage as well, so you can identify gaps: a brand that shows up in pricing and comparison prompts but not in problem prompts is missing from the earliest AI conversations buyers have.

Write the set once and freeze it. If you change prompts every month, you can't tell a real change from a different question. Review the set once a quarter, and replace prompts only when buyers' questions have clearly changed.

## How do you run the prompts in ChatGPT search and other answer engines?

Control everything you can, and record everything you can't.

1. **Use a clean session.** In ChatGPT, use Temporary Chat with personalization off. OpenAI says temporary chats don't create or update memories, and unpersonalized ones don't use custom instructions. Logged-out sessions or a separate test account work too.
2. **Turn on web search where the platform offers it.** ChatGPT search answers include citations and a Sources button, so you can see which pages shaped the AI responses. Perplexity says every answer includes numbered citations. Answers without search can't show which pages AI relies on.
3. **Pick a fixed set of AI platforms.** A practical set of major AI platforms is ChatGPT, Perplexity, Gemini, Claude, and Google's AI Overviews and AI Mode. Track the same ones every month.
4. **Run each prompt twice per platform.** Two runs show how stable an answer is. If a prompt names you in one run and not the other, record both.
5. **Run in the same week every month,** from the same location, and note the date and the model or mode the platform shows. If your product category changes fast, add weekly tracking of a smaller set, such as your ten most important prompts.

With 30 prompts, four or five platforms, and two runs, you'll record between 240 and 300 answers a month. Paste each answer's text into the sheet, or save it as a file, so you can check it later.

## What should you record for each AI answer?

One row per answer, with the same columns every month.

Table: Scoring sheet columns for AI brand mention tracking

| Column | What to record |
| --- | --- |
| Prompt ID and type | For example, CAT-03, Category |
| Platform and run | ChatGPT, run 1 |
| Date and mode | The date, and whether web search was on |
| Brand mentioned | Yes or no |
| Position | Your brand's position: first recommendation, in a list, or only mentioned |
| Sentiment | How ChatGPT describes you: positive, neutral, or negative |
| Competitor mentions | Every company named, in order |
| Cited URLs | Every source link, and whether any are yours |
| Accuracy | Any wrong fact about your product, pricing, or customers |
| Notes | Anything unusual, such as an outdated product name |

Check factual accuracy carefully. OpenAI's own help center warns that ChatGPT can sound confident when it's wrong and can produce citations to sources that don't exist, and it advises verifying quotes, data, and references. A wrong statement about your pricing or integrations is worth fixing on your own pages before it spreads. Simple sentiment analysis by hand, reading how each answer describes your brand, catches problems a yes-or-no mention count misses.

## How do you turn the sheet into a visibility score?

Turn the rows into a few key metrics you can track over time:

- **Mention rate:** answers that name you, divided by all answers. This mention frequency is your main visibility score; report it by platform and by prompt type.
- **First-position rate:** answers where you're the first recommendation, divided by all answers.
- **Citation rate:** answers that link to one of your pages, divided by all answers with sources. AI citations show which of your pages AI systems use as sources.
- **Competitor share:** how often each competitor is named, using the same base. Competitor comparisons on the same prompts show who owns each part of the category.
- **Accuracy issues:** the number of wrong facts about your company, and which prompts produced them.

Track ChatGPT mentions separately from the other AI answer engines, because each platform can behave differently. Here's an example of the arithmetic, not a real result. Thirty prompts on four platforms with two runs each give 240 answers. If 36 of them name your company, your mention rate is 15%. If 18 of those 36 come from comparison prompts and none from category prompts, the gap tells you where to work: AI assistants know you when buyers already compare you, but don't suggest you to buyers who start from the category.

Look at the cited URLs too. If AI answers keep citing third-party roundups and comparison pages for your product category, that's where your AI search visibility is decided, not only on your own site. Use those gaps to set your content strategy: authoritative content on your own site for the questions where you're absent, and accurate listings on the pages AI already cites.

## How do you connect AI mentions to traffic and pipeline?

Mentions matter when they bring buyers. Two sources help you check that they do.

**Google Analytics.** GA4's default channel group includes an AI Assistant channel, and ChatGPT adds utm_source=chatgpt.com to the links it sends. Track ChatGPT referral traffic, sessions, and key events from that channel next to your mention rate. On many B2B sites these visits are few, so look at the trend over several months. For the setup, see [how to track ChatGPT traffic in GA4](/blog/ai-traffic-in-ga4).

**A self-reported source field.** Add "How did you hear about us?" as an open text field on your demo request form. A buyer who researched in an AI assistant may later arrive directly or through search, and analytics alone won't show that. Count the answers that mention ChatGPT, Perplexity, or "AI" every month.

## What can hand tracking tell you about ChatGPT brand visibility, and what can't it?

It shows visibility trends: how a fixed sample of buyer questions is answered over time, whether you're named, who's named instead, which pages are cited, and what AI gets wrong about you. That's enough to set priorities for content, comparison pages, and the facts on your own site.

It can't tell you how often real buyers see your brand, because you don't know how many people ask each question or how their history and location change the answer. Treat the mention rate as a trend indicator for AI search, not market share. Google AI Mode, ChatGPT, and the other platforms each change over time, so a steady month-to-month method matters more than any single result. When the set grows beyond what one person can run in an afternoon, or you need daily data, it's time to automate the same method.

We track AI visibility for B2B SaaS companies with a fixed set of 30 to 50 buyer prompts, so we have an interest in this topic. For how we measure and report it, see our [AEO agency](/aeo-agency) page.
