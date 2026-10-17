---
slug: how-long-does-a-website-redesign-take
url: /blog/how-long-does-a-website-redesign-take
pageType: guide
draft: false
blockedBy: []
topicId: "1.2"
wave: 1
title: "How Long Does a B2B Website Redesign Take? | BenorMedia"
description: "An example plan for a B2B SaaS website redesign, phase by phase: how long each step takes, what stretches it, and a timeline you can adapt to your site."
h1: "How long does a website redesign take? A phase-by-phase plan for B2B SaaS teams"
lang: en-US
author: "David Garay, BenorMedia"
publishedAt: 2026-10-17
updatedAt: 2026-10-17
reviewEvery: none
primaryKeyword: "how long does a website redesign take"
secondaryKeywords: []
takeaways:
  - "In the example plan, a full redesign of a mid-size B2B SaaS site with a blog takes about 10 to 13 weeks from kickoff to launch."
  - "Templates, content volume, the redirect map, and review rounds set the timeline more than page count does."
  - "Waiting for access, content, and decisions stretches a redesign more than the design and build work itself."
  - "Plan for the weeks after launch too: Google says most pages of a small to medium site take a few weeks to move in its index."
faqHeading: "Questions about website redesign timelines"
faq:
  - q: "How long does a website redesign take?"
    a: "For a mid-size B2B SaaS site with a blog, about 10 to 13 weeks to launch in our example plan, plus a few weeks after launch while Google processes the changes. A migration without new design takes less."
  - q: "How long does each phase of a redesign take?"
    a: "In the example plan: audit 1 week, strategy plan 1 week, wireframes and content 2 weeks, design 3 weeks, build 3 weeks, content migration and QA 2 weeks, and launch 1 week. Some phases overlap."
  - q: "Can a website redesign be done in six weeks?"
    a: "A small site, or a move to a new platform without new design, can be. Our reference for a WordPress to Webflow migration of about 20 pages is 3 to 4 weeks. A full redesign of a mid-size site adds design time on top."
  - q: "Will a redesign hurt our search traffic?"
    a: "It can if URLs change without redirects. Google says rankings may fluctuate while it recrawls a moved site, and that most pages of a small to medium site take a few weeks to move. Keep redirects for at least a year."
  - q: "Can we keep publishing during a redesign?"
    a: "Yes. The current site stays live while the new one is built on a staging copy. Content changes pause only for the last few days before launch."
related:
  - /website-redesign
  - /webflow-migration
  - /guides/wordpress-to-webflow-migration
  - /custom-websites-migrations
sources:
  - label: "Google Search Central: Site moves with URL changes"
    url: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
    accessed: 2026-10-15
  - label: "Webflow Help Center: How to update DNS records when migrating a live site to Webflow"
    url: https://help.webflow.com/hc/en-us/articles/44474625240211-How-to-update-DNS-records-when-migrating-a-live-site-to-Webflow
    accessed: 2026-10-15
  - label: "Webflow Help Center: How do I set up redirects in Webflow?"
    url: https://help.webflow.com/hc/en-us/articles/33961294898835-How-do-I-set-up-redirects-in-Webflow
    accessed: 2026-10-15
  - label: "BenorMedia: Website Redesign Services for B2B & SaaS"
    url: https://www.benormedia.com/website-redesign
    accessed: 2026-10-15
  - label: "BenorMedia: WordPress to Webflow Migration"
    url: https://www.benormedia.com/webflow-migration
    accessed: 2026-10-15
volatile:
  - "A small to medium-sized site can take a few weeks for most pages to move; ranking fluctuations; keep redirects generally at least 1 year; plan changes one after the other (source: Site moves with URL changes, updated 2026-08-20)"
  - "Lower the TTL at least one full TTL period before changing DNS; SSL typically issued within a few minutes (source: Webflow DNS article, updated 2026-02-02)"
  - "No hard limit on redirects, about 1,000 recommended as a best practice (source: Webflow redirects article, updated 2026-05-19)"
  - "BenorMedia's reference timelines (3 to 4, 6 to 8, and 10 to 14 weeks, design time on top), 30 days of support, content pause before launch, launch as the halfway point (source: live /website-redesign and /webflow-migration, checked 2026-10-15)"
volatileChecked: 2026-10-15
inbound:
  - page: /website-redesign
    anchor: "phase-by-phase redesign timeline"
    sentence: "In the FAQ 'How long does a B2B website redesign take?': See a phase-by-phase redesign timeline."
  - page: /guides/wordpress-to-webflow-migration
    anchor: "how long a full redesign takes"
    sentence: "In 'How long does a WordPress to Webflow migration take?': If you're also changing the design, see how long a full redesign takes."
editorNotes:
  - "Sergio asked on 2026-10-15 for the missing project facts to be reasoned out. The example plan does that: it splits the reference timelines published on /website-redesign and /webflow-migration into phases under stated assumptions, and the post calls it an example. If the durations match your projects, answer P12-1 so the post can present them as yours, and update the method note to match."
  - "The live redesign page gives reference totals; this post adds the phase split, the overlaps, what stretches each phase, and the template."
  - "Cost is left to the planned B2B website cost guide, which owns 'website redesign cost'."
  - "No 30-day recheck and no AI note, per Sergio's answers of 2026-10-15."
---

A redesign of a mid-size B2B SaaS website takes about 10 to 13 weeks from kickoff to launch in our example plan, plus a few weeks after launch while search engines catch up. This guide for marketing leads and founders shows where the weeks go, so you can set a launch date your team can keep, as of October 2026.

## How long does a website redesign take?

For a mid-size B2B SaaS site with a blog, plan a redesign timeline of about 10 to 13 weeks to launch. Our reference timeline for the build and content migration alone is 6 to 8 weeks for a mid-size site with a blog, and a full redesign adds design time on top.

The same reference gives 3 to 4 weeks for a WordPress to Webflow migration of about 20 pages, and 10 to 14 weeks for a large site, again before design time. Typical timelines vary with four things more than with website size or page count:

- the number of page templates;
- the volume of content to move;
- the redirect map, meaning every old URL that needs a new address;
- the number of review rounds.

The example plan below shows how those weeks split into phases. It's a worked example built from the reference timelines and the assumptions listed, not a record of past projects.

## What are the phases of a website redesign, and how long does each take?

The example follows the seven steps of our website redesign process, for a site with these assumptions:

- about 30 pages on 10 to 12 templates, plus a blog of about 100 posts;
- one language, built in Webflow, with existing brand guidelines;
- copy written alongside the wireframes, with your team supplying product facts;
- one decision-maker per review round, two rounds per stage, and feedback within three working days.

Table: Example plan for a mid-size B2B SaaS website redesign

| Phase | Example length | Weeks | What it produces |
| --- | --- | --- | --- |
| 1. Audit and business goals | 1 week | 1 | A baseline from analytics, Search Console, and CRM data, and agreed goals |
| 2. Website strategy plan | 1 week | 2 | Sitemap, URL map, project scope, platform, and timeline, signed off |
| 3. Wireframes and content | 2 weeks | 3 to 4 | Page structure, navigation, and copy |
| 4. UI design and design system | 3 weeks | 4 to 6 | Visual design and mockups for desktop and mobile, from one design system |
| 5. Development | 3 weeks | 6 to 8 | Components, pages, interactions, and integrations |
| 6. Content migration and quality assurance | 2 weeks | 9 to 10 | Every page moved and checked, every redirect tested, no broken links |
| 7. Launch, training, and handoff | 1 week | 11 | Go-live, team training, then 30 days of support |

The phases of this redesign project add up to 13 weeks of work, but they overlap: the design phase starts on the first approved wireframes, and the development phase starts on approved components. That brings the project timeline to 11 weeks. Faster reviews can take it to 10; with no overlap and slower feedback, it runs to 13.

The audit and the strategy plan look short for the weight they carry. They set the project scope and the URL map, and the whole project depends on both, so a decision changed in week 6 costs more time than one made in week 2.

## What stretches each phase of a redesign?

Waiting stretches a website redesign project more than the work does: waiting for access, content, decisions, and approvals.

Table: What can stretch each phase, and how to keep it on schedule

| Phase | What can stretch it | How to keep it on schedule |
| --- | --- | --- |
| Audit | Access to analytics, Search Console, and the CRM arrives late | Grant access before kickoff |
| Strategy plan | More people need to sign off; a large blog means a long URL map | Name one decision-maker; export every URL early |
| Wireframes and content | Copy isn't ready, or product facts wait for approval | Give one person ownership of product facts and legal review |
| Design phase | Extra review rounds, or brand changes mid-project | Agree on the number of rounds in the plan |
| Development phase | Custom features or integrations added late | Hold new requests for a second release |
| Content migration and testing | Rich text cleanup and hundreds of redirects | Map redirects during the strategy plan |
| Launch | DNS access sits with another team | Book that team's time for launch week |

Two details catch teams near the end.

1. **Redirect volume.** Webflow has no hard limit on redirects but recommends keeping the total to about 1,000 as a best practice. A blog whose URLs all change may need pattern redirects instead of one rule per post, and that decision belongs in the strategy plan, not in QA.
2. **The DNS switch.** Webflow recommends lowering your domain's TTL at least one full TTL period before you change DNS records: with a 24-hour TTL, that's at least 24 hours ahead. Once the records point to Webflow, the SSL certificate is typically issued within a few minutes.

Content changes pause, too. We pause content changes on the old site for the last few days before launch, so the final content move and the redirect tests match what's live.

## What happens to the timeline after launch?

Launch isn't the final phase. Plan for a few more weeks of monitoring while search engines process the changes. Google says a small to medium-sized site can take a few weeks for most pages to move in its index, larger sites take longer, and rankings may fluctuate while Google recrawls and reindexes the new site.

That's why we treat launch as the halfway point of a website redesign. Support continues for 30 days after launch, and for the first weeks Search Console coverage, 404 errors, and the pages you chose to keep are checked daily. Google also says to keep redirects for as long as possible, generally at least 1 year, so the redirect map stays part of the site long after the project ends.

## Can you redesign a website faster?

Yes, mainly by changing less at once and by having content and decisions ready before the work needs them. Google advises planning changes to a site one after the other, not all at the same time, which also argues for splitting a platform move from a full redesign.

Ways to shorten the project timeline without raising the risk:

- **Move first, redesign second.** A migration without new design is the shorter project: our reference for about 20 pages is 3 to 4 weeks. The new design can follow on the new platform.
- **Use fewer templates.** Similar pages, such as integrations or use cases, can share one template.
- **Prepare content before kickoff.** Content readiness decides whether wireframes and copy take two weeks or four.
- **Keep one decision-maker.** One person who approves each review round and collects feedback in one place removes most unnecessary delays.

What not to cut: the redirect map and quality assurance. The redirect map protects the search traffic the old site already earns, and our [WordPress to Webflow migration guide](/guides/wordpress-to-webflow-migration) explains how to map and test redirects step by step. Before launch, we also test browsers, speed, accessibility, and mobile usability.

## How do you build a realistic timeline for your website redesign?

Start from the four things that set a redesign timeline, then put dates on the phases. A realistic website redesign timeline uses your own numbers, not an agency's averages.

1. Count templates, pages, and CMS items, and list the integrations, such as CRM forms and analytics.
2. Export every URL on the old site and mark which ones will change. That count is the size of your redirect map.
3. Decide who signs off each stage, how many review rounds you allow, and how many working days each review takes.
4. Copy the phases from the example plan, adjust each length to your counts, overlap design with wireframes and the build with design, and add one week of buffer.
5. Put the launch-week tasks on the calendar: the content pause, the DNS change, and a Search Console check on launch day.
6. Plan the 30 days after launch: daily checks for the first weeks, then a review of rankings, leads, and errors.

The dates worth writing down are kickoff, strategy plan sign-off, wireframes approved, design approved, build complete, content pause, launch, and the day-30 review. For what happens to the site afterwards, see our [website redesign](/website-redesign) page.

We plan and run website redesigns for B2B and SaaS companies, so we have an interest in the topic.

## How was this post written and checked?

This post draws on our published redesign and migration timelines, Google Search Central, and Webflow's help center, all opened on October 15, 2026, and listed in the sources. The phase lengths are a worked example built from those published ranges and the stated assumptions, not measurements from past projects.
