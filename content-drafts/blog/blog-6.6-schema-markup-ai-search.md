---
slug: schema-markup-ai-search
url: /blog/schema-markup-ai-search
pageType: guide
draft: false
blockedBy: []
topicId: "6.6"
wave: 2
title: "Schema Markup for AI Search: The Evidence | BenorMedia"
description: "Does schema markup help AI search? A review of Google's guidance, Microsoft's position, and six studies, plus the structured data worth keeping."
h1: "Schema markup for AI search: what the evidence says, and what to implement anyway"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-19
updatedAt: 2026-10-19
reviewEvery: 30 days
primaryKeyword: "schema markup for ai search"
secondaryKeywords: []
takeaways:
  - "Google says AI Overviews and AI Mode need no special schema markup, and its documentation lists no AI-specific structured data."
  - "The studies so far show correlation or no clear effect, and none shows that adding markup alone earns AI citations."
  - "Keep Organization, WebSite, BreadcrumbList, and Article markup for rich results and a clear company entity, and make sure it matches the visible page."
  - "FAQ rich results stopped appearing in Google Search on May 7, 2026, so FAQ schema is no longer a search visibility tactic."
  - "Content worth citing, crawl access, and facts in visible text do more for AI search than any markup."
faqHeading: "Questions about schema markup and AI search"
faq:
  - q: "Does schema markup help AI search?"
    a: "Google says no special markup is needed to appear in AI Overviews or AI Mode, and the studies so far show no clear effect on AI citations. Schema remains useful for rich results and for helping search engines understand a page, so keep it accurate."
  - q: "Does ChatGPT use schema markup?"
    a: "OpenAI's crawler documentation doesn't mention structured data. In a February 2026 test reported by Search Engine Roundtable, ChatGPT returned an address that existed only in JSON-LD, which suggests it read the markup as ordinary page text."
  - q: "Which schema type is best for AI search?"
    a: "No schema type is documented as best for AI search. The types Google supports for company and content pages, such as Organization, WebSite, BreadcrumbList, and Article, are the practical starting point."
  - q: "Is there a special schema type for AI content?"
    a: "No. Google says there is no special schema.org markup for generative AI search, and that you don't need new machine-readable files or special markup to appear in its AI features."
  - q: "Should every page have schema markup?"
    a: "No. Add relevant structured data that truthfully describes each page, such as Article on posts and BreadcrumbList on inner pages, and never mark up content readers can't see."
  - q: "How do I know whether my schema is working?"
    a: "Validate it with Google's Rich Results Test, watch the rich result reports in Search Console, and compare a fixed set of buyer prompts before and after. Change only the markup in that period so you can read the result."
related:
  - /aeo-agency
  - /webflow-seo-agency
  - /blog/ai-crawlers-robots-txt
  - /blog/track-brand-mentions-in-chatgpt
sources:
  - label: "Google Search Central: AI features and your website"
    url: https://developers.google.com/search/docs/appearance/ai-features
    accessed: 2026-10-19
  - label: "Google Search Central: Optimizing for generative AI search"
    url: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
    accessed: 2026-10-19
  - label: "Google Search Central: Documentation updates"
    url: https://developers.google.com/search/updates
    accessed: 2026-10-19
  - label: "Google Search Central: Introduction to structured data markup in Google Search"
    url: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
    accessed: 2026-10-19
  - label: "Google Search Central: General structured data guidelines"
    url: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
    accessed: 2026-10-19
  - label: "Google Search Central: Organization structured data"
    url: https://developers.google.com/search/docs/appearance/structured-data/organization
    accessed: 2026-10-19
  - label: "Google Search Central: Site names (WebSite structured data)"
    url: https://developers.google.com/search/docs/appearance/site-names
    accessed: 2026-10-19
  - label: "Google Search Central: Breadcrumb structured data"
    url: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
    accessed: 2026-10-19
  - label: "Google Search Central: Article structured data"
    url: https://developers.google.com/search/docs/appearance/structured-data/article
    accessed: 2026-10-19
  - label: "Google Search Central: Software app structured data"
    url: https://developers.google.com/search/docs/appearance/structured-data/software-app
    accessed: 2026-10-19
  - label: "Google Search Central: Review snippet structured data"
    url: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
    accessed: 2026-10-19
  - label: "Schema.org: About Schema.org"
    url: https://schema.org/docs/about.html
    accessed: 2026-10-19
  - label: "Microsoft Advertising: Optimizing your content for inclusion in AI search answers"
    url: https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers
    accessed: 2026-10-19
  - label: "OpenAI: Overview of OpenAI crawlers"
    url: https://developers.openai.com/docs/bots
    accessed: 2026-10-19
  - label: "Perplexity: Perplexity crawlers"
    url: https://docs.perplexity.ai/guides/bots
    accessed: 2026-10-19
  - label: "Anthropic Help Center: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
    accessed: 2026-10-19
  - label: "arXiv: GEO: Generative Engine Optimization (Aggarwal and others, KDD 2024)"
    url: https://arxiv.org/abs/2311.09735
    accessed: 2026-10-19
  - label: "Ahrefs: We Tracked 1,885 Pages Adding Schema. AI Citations Barely Moved."
    url: https://ahrefs.com/blog/schema-ai-citations/
    accessed: 2026-10-19
  - label: "arXiv: Structured Linked Data as a Memory Layer for Agent-Orchestrated Retrieval (WordLift)"
    url: https://arxiv.org/abs/2603.10700
    accessed: 2026-10-19
  - label: "EconPapers: The Impact of JSON-LD Metadata on ChatGPT Visibility (Schanbacher)"
    url: https://econpapers.repec.org/RePEc:etq:jarbma:6
    accessed: 2026-10-19
  - label: "OtterlyAI: GEO Experiment: Does Schema Markup Really Impact AI Search?"
    url: https://otterly.ai/blog/schema-markup-real-impact-ai-search
    accessed: 2026-10-19
  - label: "Search Engine Roundtable: Report: ChatGPT & Perplexity Treat Structured Data As Text On A Page"
    url: https://seroundtable.com/chatgpt-perplexity-structured-data-text-40862.html
    accessed: 2026-10-19
  - label: "Search Engine Land: Microsoft Bing/Copilot use schema for its LLMs"
    url: https://searchengineland.com/microsoft-bing-copilot-use-schema-for-its-llms-453455
    accessed: 2026-10-19
  - label: "Search Engine Land: Google Search stops showing How-to rich results on desktop"
    url: https://searchengineland.com/google-search-stops-showing-how-to-rich-results-desktop-431947
    accessed: 2026-10-19
  - label: "arXiv: A Benchmark to Understand the Role of Knowledge Graphs on LLM Accuracy for Question Answering on Enterprise SQL Databases"
    url: https://arxiv.org/abs/2311.07509
    accessed: 2026-10-19
volatile:
  - "Google's position on structured data and AI features (source: Google's AI features page, updated December 10, 2025, and its generative AI guide, updated July 10, 2026)"
  - "FAQ rich results no longer shown since May 7, 2026 (source: Google Search Central documentation updates)"
  - "Study findings and dates: Ahrefs, May 11, 2026; WordLift preprint, March 11, 2026; OtterlyAI, March 23, 2026 (source: the publishers' pages)"
  - "Requirements of the supported structured data types (source: Google's documentation pages, each updated by September 8, 2026)"
  - "Microsoft's guidance on schema (source: Microsoft Advertising blog, October 8, 2025)"
volatileChecked: 2026-10-19
inbound:
  - "/aeo-agency: anchor 'what the evidence says about schema markup and AI search'. One sentence on the evidence behind the structured data work."
  - "/blog/saas-technical-seo: anchor 'schema markup and AI search'. One sentence pointing to the evidence review for the structured data check."
  - "/blog/do-you-need-an-llms-txt-file: anchor 'structured data for AI search'. One sentence noting that structured data gets the same evidence treatment."
editorNotes:
  - "Check whether the blog template still emits FAQPage JSON-LD from the faq key. The post says FAQ rich results have ended."
  - "The body holds one JSON-LD code block. Delete it if the blog template cannot render code."
  - "Ahrefs, OtterlyAI, and WordLift are named as publishers of studies. Sergio approved that on 2026-10-19 (decision 6), so nothing blocks this post."
  - "Body runs about 2,300 words, above the 1,800-word guide spec, because of three tables and the evidence review. The hand-off explains why."
  - "Markers resolved to their defaults on publish (lead 2026-10-19): #P66-1, #P66-2 and #P66-3 kept as written; #P66-4 removed."
---

Schema markup is not required to appear in AI search, and the best evidence shows little direct effect on AI citations. Google says AI Overviews and AI Mode need no special markup. This guide, for B2B SaaS marketing teams as of October 2026, reviews what Google, Microsoft, and published studies say, which structured data to keep, and what matters more.

## Does schema markup help you appear in Google AI Overviews and AI Mode?

Not directly, according to Google. Its documentation on AI features says there are no additional requirements to appear in AI Overviews or AI Mode, and no special schema.org structured data you need to add. Eligibility works as it does in traditional search: a page has to be indexed and eligible to show in Google Search with a snippet.

Google's guide to optimizing for generative AI search, added May 15, 2026 and last updated July 10, 2026, makes the same point and adds a reason. These AI-powered search features are rooted in Google's core ranking and quality systems. They use retrieval-augmented generation, which grounds AI-generated summaries in pages from the Search index, plus "query fan-out," where the system also searches for related questions beyond the user's query. Google's own framing is that optimizing for generative search experiences is still SEO, so traditional SEO practice carries over to AI-driven search. The guide still calls structured data a good idea as part of your overall SEO strategy, because it helps with rich result eligibility, one of the enhanced search features Google offers. Google says the same about AI text files and special markup: you don't need them (our post on [whether you need an llms.txt file](/blog/do-you-need-an-llms-txt-file) covers that evidence).

A definition helps here. Schema markup is code, usually JSON-LD, that labels what a page's content represents using the shared Schema.org vocabulary, which Google, Microsoft, Yahoo, and Yandex founded. It gives search engines explicit signals about a page and changes nothing readers see. How structured data gets used is up to each system, and Google's one markup rule for AI features is a plain one: make sure your structured data matches the visible page content.

## What do Microsoft, OpenAI, Perplexity, and Anthropic say about structured data?

Only Microsoft says schema helps its AI systems. The other three document their crawlers and don't mention structured data.

Microsoft's position comes in two forms. In an October 8, 2025 post on the Microsoft Advertising blog, Krishna Madhavan, a principal product manager at Microsoft Bing, wrote that schema "helps search engines and AI systems understand your content." The same post says AI assistants split a page into smaller pieces instead of reading it top to bottom, and that clear headings mark where one idea ends and the next begins. It also says nothing guarantees selection in an AI answer. Earlier, in March 2025, Fabrice Canel of Bing said at SMX Munich that Microsoft's large language models use schema markup. Search Engine Land reported it on March 20, 2025, based on a LinkedIn post that Canel confirmed in the comments. Treat it as a conference remark, not documentation.

The other three are quieter. OpenAI's bot documentation says OAI-SearchBot surfaces websites in ChatGPT's search features, and it recommends allowing the bot in robots.txt. Perplexity says PerplexityBot is designed to surface and link websites in Perplexity's search results, and that it isn't used to crawl content for AI foundation models. Anthropic's help center describes Claude-SearchBot as a crawler that improves the quality and relevance of search results for users. None of the three pages mentions schema, structured data, or JSON-LD. Silence isn't proof that these systems ignore markup, but it does mean there's no vendor documentation to point to.

## What does the research say about schema markup and AI citations?

Mostly correlation and small tests, plus one large before-and-after comparison that found no lift on any platform it measured. None shows that adding schema alone earns AI citations.

Table: Studies on structured data and AI answers, as of October 2026

| Study | Type and date | Method | Finding |
| --- | --- | --- | --- |
| GEO: Generative Engine Optimization (Aggarwal and others) | Peer-reviewed, KDD 2024 | 10,000-query benchmark, nine text changes tested | Didn't test schema. Citing sources, adding quotations, and adding statistics raised visibility by about 30 to 40% |
| The Impact of JSON-LD Metadata on ChatGPT Visibility (Schanbacher) | Journal paper, 2026 | Regression across 1,508 German real estate agencies | FAQPage markup was associated with ChatGPT visibility; correlation in one niche |
| Structured Linked Data as a Memory Layer (WordLift authors) | Vendor preprint, arXiv, March 2026 | Controlled retrieval test, 349 queries, four domains | JSON-LD alone gave "only modest improvements"; richer entity pages improved accuracy by about 30% |
| We Tracked 1,885 Pages Adding Schema (Ahrefs) | Vendor study, May 2026 | 1,885 pages with structured data added, matched to controls | AI Overviews citations down 4.6%; AI Mode and ChatGPT changes not distinguishable from zero |
| GEO Experiment: Does Schema Markup Really Impact AI Search? (OtterlyAI) | Vendor experiment, March 2026 | Schema added to four pages of one SaaS site, seven AI platforms | A fact placed only in FAQ schema wasn't used by any platform, even when prompted |
| Structured data test (Mark Williams-Cook, reported by Search Engine Roundtable) | Single test, February 2026 | One fictional company page with an address only in invalid JSON-LD | ChatGPT and Perplexity returned the address, reading the markup as ordinary text |

Read the vendor studies with their limits in mind. The Ahrefs authors note that their sample held only pages already cited heavily in AI Overviews, that pages adding JSON-LD often changed other things at the same time, that all schema types were pooled, and that 30 days may miss slower effects. They also suggest that cited pages tend to have schema because those sites invest in other SEO work, which makes schema a correlate, not a cause. The OtterlyAI test rests on one brand's site and the Williams-Cook test on a single page. Neither settles the question, but together they say that markup isn't a reliable way to get a fact into AI-generated answers.

One number gets quoted often. GPT-4's accuracy on enterprise questions rose from 16% to 54% when the questions ran over a knowledge graph instead of a raw SQL database, in a 2023 benchmark by Sequeda and colleagues. That benchmark tested a closed enterprise database, not public web pages, so it says little about whether AI search engines or other AI models read the schema on your site. It shows why structured information matters when you control the data, and no more.

The fair summary: no single study settles it, but the signals from multiple sources agree. There's no good evidence that adding markup, on its own, gets you cited, and no clear evidence that it hurts. Schema markup plays a supporting role.

## Does FAQ schema still matter?

Not as a search visibility tactic. Google stopped showing FAQ rich results in Search on May 7, 2026.

That change finished a long retreat from rich result types that SEO teams once leaned on.

Table: Rich result changes that affect B2B sites

| Date | Change |
| --- | --- |
| September 13, 2023 | Google stopped showing HowTo rich results on desktop and limited FAQ rich results to well-known government and health websites |
| April 23, 2025 | Google deprecated the special announcement feature |
| June 12, 2025 | Google retired several other structured data features |
| May 7, 2026 | The FAQ rich result stopped appearing in Google Search for all sites |
| June 15, 2026 | Google removed its FAQ rich result documentation |

FAQPage markup isn't wrong, but it no longer earns a rich result, so it isn't a reason to add one. A question-and-answer section is still worth writing for readers. Any system that reads visible text can reuse it, and Microsoft's guidance lists Q&A blocks among the formats that assistants can reuse easily. Treat rich result features as unstable. Build markup around what a page is, not around whichever result type Google shows this year.

## Which schema markup is still worth adding to a B2B SaaS site?

A schema markup strategy for a B2B SaaS site can stay short: the types that describe the company, the site, and the content, and that Google still supports. Those are Organization, WebSite, BreadcrumbList, and Article.

Table: Structured data worth keeping on a B2B SaaS site

| Type | Where | What it does | Requirements |
| --- | --- | --- | --- |
| Organization | Home page or about page | Helps Google understand and identify the company, including its logo and links to profiles elsewhere (sameAs) | No required properties; logo at least 112 by 112 pixels |
| WebSite | Home page | Tells Google the site name to show in results | name and url; one site name per domain or subdomain |
| BreadcrumbList | Inner pages | Shows where a page sits in the site | At least two ListItems |
| Article or BlogPosting | Guides and posts | Helps Google show better title text, images, and dates | No required properties; add author, dates, headline, and image |
| SoftwareApplication | Product page, only if it qualifies | Software application rich result | name, offers.price, and either a rating or a review |

Two rules apply to all of it. Google says your structured data must be a true representation of the page content, and you shouldn't mark up anything readers can't see. A violation, such as irrelevant markup, can bring a manual action that removes rich result eligibility, though Google says that action doesn't affect ranking in web search. Accuracy matters more than volume, and comprehensive schema that doesn't match the page can cost you eligibility. And when a business controls the reviews about itself, Google says its pages with Organization or LocalBusiness markup can't earn star ratings, so curated customer feedback and testimonials on your own site won't produce them. That, plus the rating requirement, is why most B2B SaaS sites can skip SoftwareApplication.

Google recommends JSON-LD if your site setup allows it. A minimal Organization block looks like this:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example SaaS Inc.",
  "url": "https://www.example.com/",
  "logo": "https://www.example.com/images/logo.png",
  "sameAs": ["https://www.linkedin.com/company/example-saas"]
}
```

Put one Organization block on the home page and keep the name, url, and logo identical wherever you repeat them, so every page describes the same entity. Google lists sameAs as a recommended property for pointing to other pages about the organization, such as social profiles. For posts, Article schema is the lightest addition: describe the author with a Person schema block, since Google lists the author's name and url among the recommended properties. Validate the markup with Google's Rich Results Test while you build, then watch the rich result reports in Search Console after launch. Well-implemented schema doesn't have to cover the entire site. It has to be accurate and maintained, like the rest of technical SEO.

## What matters more than schema for AI search optimization?

Content worth citing, crawl access, and facts in visible text. Each has a source behind it.

Start with the content. Google's guide asks for non-commodity content: unique expert or experienced takes, as opposed to generic tip lists that repeat common knowledge. It also warns against publishing large volumes of pages to manipulate rankings. The one peer-reviewed study in this post points the same way, because the edits that helped most on its 10,000-query benchmark were citing sources, adding quotations, and adding statistics. They are changes to the text, not to the markup.

Then access. A page has to be crawlable, indexed, and eligible for a snippet before any of this counts, because Google says its models use publicly accessible, crawlable web content. OpenAI says each robots.txt setting is independent, so you can allow OAI-SearchBot for search while disallowing GPTBot, the crawler tied to AI training. Our post on [AI crawlers and robots.txt](/blog/ai-crawlers-robots-txt) walks through the choices.

Then the page text itself. If a price, a feature, or a date matters, put it in the copy and not only in the markup, because the OtterlyAI and Williams-Cook tests suggest that a fact stored only in JSON-LD may never reach AI search results. Clear headings and answer-first paragraphs help readers first. Microsoft says assistants split pages into pieces, so a clear content structure helps AI understand where one idea ends and the next begins. Google says there's no need to chunk content for its systems. Write for the reader and you cover both positions, because a clear structure serves search engines and AI systems alike.

A content strategy built on these three also gives you something to measure, which is the next question.

## How can you tell whether structured data is helping your AI visibility?

Validate it, then watch rich result eligibility and AI search visibility as two separate things.

Google's Rich Results Test checks markup during development, and the rich result status reports in Search Console show whether pages stay valid after launch. For AI features, Google points site owners to the Generative AI performance report in Search Console, and says that traffic from AI features is counted in the Web search type, so it sits inside your regular search performance data. That covers Google. For other AI engines and assistants, the practical method is a fixed set of buyer prompts that you check on a schedule, which our [30-prompt method](/blog/track-brand-mentions-in-chatgpt) describes, plus the referral traffic that [GA4 can show](/blog/ai-traffic-in-ga4).

Ahrefs' own caveat points to the main lesson: when structured markup ships together with a rewrite, a redesign, or a new set of pages, you can't tell which change moved the numbers. If you want to know whether markup matters on your site, ship it on its own and compare the same prompts before and after.

We implement structured data and AEO for B2B SaaS companies, so we have an interest in this topic. For how we approach AI visibility, see our [AEO agency](/aeo-agency) page.
