---
slug: cro-audit
url: /blog/cro-audit
pageType: guide
draft: false
blockedBy: []
topicId: "4.2"
wave: 1
title: "CRO Audit: Checklist, Tools, and Steps for B2B SaaS"
description: "A CRO audit finds where B2B SaaS visitors drop out and why. The checks, tools, and funnel steps to run one, and how to rank fixes without A/B tests."
h1: "CRO audit: how to find what stops B2B SaaS visitors from converting, with or without A/B tests."
lang: en-US
author: "David Garay, Web Developer and Designer"
publishedAt: 2026-10-17
updatedAt: 2026-11-17
reviewEvery: none
primaryKeyword: "cro audit"
secondaryKeywords: []
takeaways:
  - "Check the measurement first: if demo requests and sign-ups aren't tracked as key events, every later finding is a guess."
  - "At a 2% conversion rate, an A/B test needs about 21,000 visitors per variant to detect a 20% relative lift, so most B2B SaaS pages can't test small changes."
  - "Below that traffic, use a funnel analysis to find where users drop and qualitative research to find out why, then fix the clearest problems."
  - "Five usability test sessions find most of the obvious problems; run several small rounds instead of one big one."
  - "Ship one change at a time on a page and compare it with the weeks before, knowing the comparison is weaker than a test."
faqHeading: "Questions about CRO audits"
faq:
  - q: "What is a CRO audit?"
    a: "A CRO audit, or conversion rate optimization audit, is a structured review of how visitors move through a website toward its conversion goals, where they drop out, and why. It ends in a ranked list of fixes or test ideas."
  - q: "What is the difference between CRO and SEO?"
    a: "SEO works on getting qualified visitors from search engines. CRO works on what those visitors do once they arrive, so more of them request a demo, start a trial, or take another conversion step."
  - q: "Which tools do you need for a CRO audit?"
    a: "An analytics tool with funnel reports, such as GA4, Search Console for queries and field speed data, and one behavior tool for heatmaps, session recordings, and surveys. Microsoft Clarity, Contentsquare (which now includes Hotjar), and PostHog all had free plans when we checked on November 17, 2026."
  - q: "How much traffic do you need for A/B testing?"
    a: "It depends on the baseline conversion rate and the lift you want to detect. At a 2% conversion rate and a 20% relative lift, a standard test at 95% significance and 80% power needs about 21,100 visitors per variant, or about 42,200 in total."
  - q: "Can you do CRO without A/B testing?"
    a: "Yes. Funnel analysis, usability testing, on-site surveys, and session recordings show where and why users struggle, and the clearest problems can be fixed directly. The trade-off is weaker proof that each change caused the result."
  - q: "How often should you run a CRO audit?"
    a: "Run one after a redesign or a major change to pricing, positioning, or traffic sources, and when conversion rates drop without an obvious cause. Between audits, review the funnel monthly."
related:
  - /growth
  - /website-redesign
  - /webflow-seo-agency
sources:
  - label: "Google Search Central: Minimize A/B testing impact in Google Search"
    url: https://developers.google.com/search/docs/crawling-indexing/website-testing
    accessed: 2026-10-17
  - label: "Nielsen Norman Group: Why You Only Need to Test with 5 Users"
    url: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
    accessed: 2026-10-17
  - label: "Nielsen Norman Group: 5 Test Users: Qual vs. Quant"
    url: https://www.nngroup.com/articles/5-test-users-qual-quant/
    accessed: 2026-10-17
  - label: "Google Analytics Help: Funnel exploration"
    url: https://support.google.com/analytics/answer/9327974
    accessed: 2026-10-17
  - label: "Google Analytics Help: Key events"
    url: https://support.google.com/analytics/answer/13128484
    accessed: 2026-10-15
  - label: "BenorMedia: Growth (SEO/GEO + CRO)"
    url: https://www.benormedia.com/growth
    accessed: 2026-10-17
  - label: "Microsoft Learn: Clarity frequently asked questions"
    url: https://learn.microsoft.com/en-us/clarity/faq
    accessed: 2026-11-23
  - label: "Contentsquare: Hotjar is now part of Contentsquare"
    url: https://contentsquare.com/hotjar/
    accessed: 2026-11-23
  - label: "PostHog: Pricing"
    url: https://posthog.com/pricing
    accessed: 2026-11-23
  - label: "BenorMedia: Testimonials"
    url: https://www.benormedia.com/testimonials
    accessed: 2026-11-16
volatile:
  - "Vendor free plans: Clarity free, up to 100,000 recorded sessions per project per day; Contentsquare Free up to 200,000 sessions, 100 survey responses, and 5 user interviews a month, no new Hotjar accounts; PostHog free tier 1 million events, 5,000 recordings, 1,500 survey responses a month (sources: vendor pages, checked 2026-11-17)"
  - "Google's testing guidance: no cloaking, rel=canonical on variant URLs, 302 for redirect tests, don't run tests longer than needed (source: Minimize A/B testing impact, updated 2025-12-10)"
  - "GA4 funnel exploration: up to 10 steps, open and closed funnels (source: Funnel exploration, checked 2026-10-17)"
  - "GA4 key events: up to 30, not retroactive, up to 24 hours to appear (source: Key events, checked 2026-10-15)"
volatileChecked: 2026-11-23
inbound:
  - page: /growth
    anchor: "CRO audit"
    sentence: "In the process introduction, after 'conversion improvements': See how we run a CRO audit on a site below testing traffic."
  - page: /webflow-seo-agency
    anchor: "turn more of that traffic into demo requests"
    sentence: "Where the page describes monthly reports and pipeline: Read how to turn more of that traffic into demo requests."
editorNotes:
  - "The topic row suggests a service minimum of about 8,000 to 10,000 sessions a month, marked 'confirm'. No live page states it, so the post gives the sample-size math instead of a BenorMedia threshold."
  - "Sample sizes were computed with the standard two-proportion formula, two-sided, 95% significance, 80% power. The table says so."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

A CRO audit finds where visitors drop out of your conversion funnel and why, then ranks the fixes. On a B2B SaaS site it covers tracking, the funnel from landing page to booked demo, the reasons behind each drop, and a checklist for every key page. Most of these sites don't have the traffic to A/B test small changes, so this guide, for marketing leads and founders, also shows the traffic math and how to decide what to change without a test.

## What is a CRO audit, and how is it different from SEO?

A CRO audit (a conversion rate optimization audit) is a structured review of how users interact with your site on the way to its conversion goals: a demo request, a trial sign-up, a contact form, or a pricing inquiry. It combines quantitative data, which shows where users drop, with qualitative data, which explains why. The output is a ranked list of problems, each with the evidence behind it and a proposed fix.

SEO and CRO share the same visitors but work on different halves of the problem. SEO brings qualified visitors from search engines. CRO works on what happens after they land, so a larger share of the same traffic turns into pipeline. Getting the traffic is only half the battle; a site that ranks but doesn't convert still misses its targets.

On a B2B SaaS site, the audit usually covers a short list of page types: the home page, product or feature pages, the pricing page, the landing pages that receive paid or organic traffic, and the forms behind each call to action. Our guides to [SaaS homepage design](/blog/saas-homepage-design) and [SaaS pricing pages](/blog/saas-pricing-page) cover what those two pages need.

## How much traffic does A/B testing need at your conversion rate?

More than most B2B SaaS pages get. The sample size an A/B test needs depends on two numbers: the page's current conversion rate and the smallest lift you want to detect. Low baseline rates and small lifts need far more visitors.

Table: Visitors needed per variant for an A/B test (two-sided, 95% significance, 80% power)

| Baseline conversion rate | Detect a 10% relative lift | Detect a 20% relative lift | Detect a 50% relative lift |
| --- | --- | --- | --- |
| 1% | 163,100 | 42,700 | 7,750 |
| 2% | 80,700 | 21,100 | 3,830 |
| 3% | 53,200 | 13,900 | 2,520 |
| 5% | 31,200 | 8,160 | 1,470 |

We computed these with the standard two-proportion formula. A test with two variants needs double the per-variant number, and the visitors have to reach the page being tested, not just the site. A pricing page with a 2% demo request rate needs about 42,200 visitors in total to detect a 20% lift. If that page gets 5,000 visitors a month, the test would run for more than eight months, and Google advises against running tests longer than necessary.

So below that level, the job of a CRO audit changes. Instead of producing a testing roadmap, it should find problems clear enough to fix directly, and save experiments for changes big enough to show up in the data.

## How do you conduct a CRO audit, starting with your analytics data?

Start with the measurement itself. A CRO audit built on broken tracking ranks the wrong problems, so the first step of the CRO audit process is to check that your web analytics record the conversion objectives you care about.

1. **Conversion goals are tracked as key events.** Demo requests, trial sign-ups, and contact forms should each be a key event in Google Analytics. GA4 allows up to 30 key events, and marking an event as key isn't retroactive, so a missing key event means missing historical data.
2. **Internal and existing-customer traffic is separated.** Logged-in users heading to the app, job seekers on the careers page, and your own team inflate sessions and lower conversion rates.
3. **Traffic is segmented by source.** Paid, organic, referral, and AI assistant traffic convert at different rates. To separate assistant referrals, see [how to track AI traffic in GA4](/blog/ai-traffic-in-ga4).
4. **The CRM agrees with analytics.** Submit every form yourself first and check that each event fires once. Compare form submissions in analytics with leads created in the CRM for the same month. A large gap means one of the two is wrong.

Once the numbers hold up, gather quantitative data for each key page and record it as baseline data: sessions, conversion rate, the main traffic source, and user engagement metrics such as average engagement time, over the last 90 days. Read them next to the conversion metrics. That baseline is what later changes get compared against, and it shows which landing pages hold back the website's conversion rates most.

## How do you run a conversion funnel analysis on a B2B SaaS site?

Define the conversion process as a sequence of steps along the customer journey and measure where users drop. In GA4, a funnel exploration lets you define up to 10 steps from events or page views and shows how many users complete each one. A closed funnel counts only users who enter at the first step; an open funnel lets users enter at any step, which suits B2B sites where people arrive on many different pages.

A typical B2B SaaS funnel has five steps:

1. Lands on a product, feature, or solution page.
2. Views the pricing page.
3. Starts the demo request or sign-up form.
4. Submits the form.
5. Books a meeting or activates the trial.

A large exit rate between the landing page and pricing may be normal for early-stage visitors, while a small drop between form start and form submit often points to friction you can remove: too many fields, an unclear next step, or a form error on mobile devices.

One real example of what can change at that step: after we rebuilt Bambi Health's site, its Chief Marketing Officer said, "Mobile form completion went from 68% to 83%, and our contact page now converts nearly a third of its visitors into leads." On the forms, the rebuild cut fields, fixed mobile issues, and gave them a clearer design. It changed the rest of the site too, so treat the numbers as one site's result, not a benchmark.

Break each step down by device and traffic source. A form that converts well on desktop and poorly on mobile is a usability issue, not a messaging issue. User intent matters too: a visitor from a comparison query needs different things than one from a brand query.

## How do you find out why users drop off when you can't run tests?

With qualitative research. Analytics shows where users drop; it can't tell you why users abandon a form or where users struggle on a page. On a low-traffic site, analyzing user behavior through these methods carries most of the audit.

- **User testing with real users.** Ask five people who match your target audience to complete a task, such as finding the price for their team size and requesting a demo, while they think aloud. Nielsen Norman Group's research found that five users uncover about 85% of the usability problems in a design, and recommends several small rounds over one large test.
- **Session recordings and heatmaps.** Watch session recordings of visits that reached the form but didn't submit. This user behavior data shows where users click, which user interactions fail, and how far people scroll. Look for repeated clicks on things that aren't links, rage clicks on form fields, and users scrolling past the call to action.
- **On-site surveys.** A one-question survey on the pricing page ("What's stopping you from booking a demo today?") collects objections in the visitor's own words.
- **Sales and support notes.** The questions prospects ask on calls show what the site failed to answer. If every first call starts with "Do you integrate with our CRM?", that answer belongs on the product page. For buyer research on what a site should answer, see [what B2B buyers need from your website](/blog/what-b2b-buyers-need-from-your-website).
- **Customer feedback.** Ask recent customers what nearly stopped them from buying and what convinced them.

Five sessions are enough to find usability issues, but not to measure anything. Nielsen Norman Group recommends more than 30 participants for quantitative usability studies, and 40 or more for narrow confidence intervals.

## Which tools do you need for a CRO audit?

Three kinds: an analytics tool that shows where users drop, such as GA4, Search Console for queries and field speed data, and one behavior tool for heatmaps, session recordings, and on-page surveys. Microsoft Clarity, Contentsquare (which now includes Hotjar), and PostHog all have free plans that cover a low-traffic B2B site.

Table: Tools for a CRO audit and what their free plans cover (checked November 17, 2026)

| Tool | What it adds to the audit | Free plan |
| --- | --- | --- |
| Google Analytics 4 | Key events and funnel explorations: where users drop | Free |
| Google Search Console | The queries that bring visitors, and Core Web Vitals field data | Free |
| Microsoft Clarity | Heatmaps, session recordings, and funnels, with a GA4 integration | Free, recording up to 100,000 sessions per project per day |
| Contentsquare (Hotjar's new home) | Heatmaps, recordings, surveys, user interviews, and funnels | Up to 200,000 sessions a month, 100 survey responses, and 5 user interviews; Hotjar no longer accepts new accounts |
| PostHog | Product analytics, session replay, surveys, and A/B experiments in one tool | 1 million events, 5,000 recordings, and 1,500 survey responses a month, with no credit card |

Keep the behavior tools to one or two: each one adds a script to every page, and extra scripts slow the templates you're auditing. If you expect to run experiments once a page has the traffic, a tool that combines recordings and tests saves a second install. On client audits we use PostHog and Microsoft Clarity, and we only start A/B tests once a site has roughly 8,000 to 10,000 sessions a month, on pages that get enough of that traffic to reach a result.

## What does a CRO audit checklist cover at each conversion point?

Run the same checks on every key page and every conversion point so the findings are comparable. A comprehensive CRO audit reviews design and user experience, copy, and technical performance together. Each check needs evidence from the data above, not just an opinion.

Table: CRO audit checklist for B2B SaaS landing pages

| Area | What to check | Evidence |
| --- | --- | --- |
| Value proposition | The headline says who the product is for and what it does, in the visitor's words | Usability tests, survey answers |
| Intent match | The page answers the query or ad that brought the visitor | Search Console queries, ad copy |
| Call to action | One primary action per page, visible without scrolling on mobile | Heatmaps, scroll depth |
| Pricing clarity | Visitors can estimate cost or know why they can't | Surveys, sales call notes |
| Proof | Customer logos, case studies, and security or compliance details near the call to action | Usability tests |
| Forms | Only the fields sales needs; clear errors; works on mobile | Form start to submit rate, recordings |
| Speed | Load times and loading speed on mobile for the key templates | Field data in Search Console |
| Next step | The confirmation page says what happens next and when | Recordings, support questions |

This CRO audit checklist covers the usual conversion bottlenecks on a B2B site, where the key performance indicators are demo requests, qualified pipeline, and customer acquisition cost. Pages judged on ecommerce metrics like average order value need a different list. For the speed row, see [how to improve Core Web Vitals](/blog/core-web-vitals-optimization).

## How do you prioritize fixes when A/B testing isn't an option?

Your optimization efforts should go where they increase conversions most. Score each finding on three things: how many users it affects, how strong the evidence is, and how much effort the fix takes. A form error that breaks mobile submissions affects every mobile visitor, has clear evidence, and takes an hour to fix, so it goes first. A new homepage message affects everyone but rests on weaker evidence, so it needs more research or a test once traffic allows.

Then ship and measure with care:

1. **Change one thing per page at a time.** If you rewrite the headline and shorten the form in the same week, you won't know which one moved the conversion rate.
2. **Compare like with like.** Compare at least four weeks after the change with the four weeks before, by traffic source, and check for seasonality, campaigns, or pricing changes in the same period.
3. **Treat the result as a signal, not proof.** A before-and-after comparison can't separate the change from everything else that happened.

When a page does have the traffic for an A/B test, follow Google's guidance so the test doesn't hurt search: don't show search engines different content than users see, use rel=canonical on variant URLs that point to the original, use a 302 redirect for redirect tests, and end the test once you have a result.

A CRO audit isn't a one-time project. Repeat a thorough CRO audit after a redesign, a pricing change, or a shift in traffic sources, and review the funnel monthly in between to keep tracking the website's performance. Continuous improvement comes from that cycle, and from fixes that enhance user experience and customer satisfaction, more than from any single audit.

We run CRO for B2B and SaaS companies as part of our Growth plan, so we have an interest in this topic. For how it fits with SEO and AEO, see our [B2B SaaS SEO agency](/growth) page.