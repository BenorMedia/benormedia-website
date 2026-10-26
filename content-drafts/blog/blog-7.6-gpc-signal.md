---
slug: gpc-signal
url: /blog/gpc-signal
pageType: guide
draft: false
blockedBy: []
topicId: "7.6"
wave: 3
title: "GPC Signal: How a B2B Website Should Honor It | BenorMedia"
description: "What the GPC signal is, which state laws make Global Privacy Control binding, whether B2B sites are exempt, and how to honor and test it on your website."
h1: "GPC signal: what Global Privacy Control means for a B2B marketing site, and how to honor it"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-26
updatedAt: 2026-10-26
reviewEvery: 60 days
primaryKeyword: "gpc signal"
secondaryKeywords: ["global privacy control"]
takeaways:
  - "GPC is a browser setting. It arrives as a Sec-GPC: 1 header, pages can read it as navigator.globalPrivacyControl, and it asks your site not to sell or share the visitor's data."
  - "California treats it as an opt-out, Colorado has since July 1, 2024, and Connecticut since January 1, 2025. Their regulators swept for violations together in September 2025."
  - "There's no B2B pass in California: that exemption ended on December 31, 2022."
  - "For a marketing site, honoring the signal mostly means leaving ad and retargeting tags off for that browser."
  - "From January 2027, AB 566 makes browsers operating in California offer a signal like this, so expect to see more of it."
faqHeading: "Questions about the GPC signal"
faq:
  - q: "Is Global Privacy Control legally binding?"
    a: "In some states, for covered businesses, yes. California's Attorney General says it must be honored as a valid request to stop the sale or sharing of personal information. Colorado requires businesses to accept it, and Connecticut treats browser signals as opt-outs. In other states, check the local law."
  - q: "Do I have to honor GPC if my site only collects B2B leads?"
    a: "Possibly. California dropped its business-to-business exemption on December 31, 2022. Colorado's law leaves out people acting in a commercial or employment context, but nothing in the signal tells you which context a visitor is in. Ask counsel how this applies to you."
  - q: "What is the Sec-GPC header?"
    a: "It's the HTTP request header that carries the signal. Under the W3C draft, a browser with GPC turned on sends Sec-GPC with a value of exactly 1. Pages can read the same preference in JavaScript through navigator.globalPrivacyControl."
  - q: "Which browsers send the GPC signal?"
    a: "The Global Privacy Control project lists Brave, DuckDuckGo's browser (on by default), and Firefox (as a setting), plus extensions such as Privacy Badger. Under California's AB 566, browsers operating in the state must offer a signal from January 2027."
  - q: "Does GPC replace a cookie banner?"
    a: "No. GPC opts a visitor out of selling and sharing under US state privacy laws. You may still need a consent banner for other rules, such as EU consent requirements, and the banner should follow the GPC signal, not override it."
related:
  - /ongoing-website-support
  - /webflow-seo-agency
  - /growth
sources:
  - label: "W3C: Global Privacy Control (GPC), Working Draft"
    url: https://www.w3.org/TR/gpc/
    accessed: 2026-10-26
  - label: "Global Privacy Control: globalprivacycontrol.org"
    url: https://globalprivacycontrol.org/
    accessed: 2026-10-26
  - label: "California Department of Justice: California Consumer Privacy Act (CCPA)"
    url: https://oag.ca.gov/privacy/ccpa
    accessed: 2026-10-26
  - label: "California Department of Justice: Attorney General Bonta Announces Settlement with Sephora as Part of Ongoing Enforcement of California Consumer Privacy Act"
    url: https://oag.ca.gov/news/press-releases/attorney-general-bonta-announces-settlement-sephora-part-ongoing-enforcement
    accessed: 2026-10-26
  - label: "California Privacy Protection Agency: Joint Investigative Privacy Sweep: CA, CO, and CT Investigate Businesses Refusing to Honor Consumers' Right to Opt-Out"
    url: https://cppa.ca.gov/announcements/2025/20250909.html
    accessed: 2026-10-26
  - label: "California Privacy Protection Agency: Governor Signs Groundbreaking Privacy Bill Making It Easier for Californians to Protect Their Personal Data"
    url: https://cppa.ca.gov/announcements/2025/20251008_2.html
    accessed: 2026-10-26
  - label: "Colorado Attorney General: Universal Opt-Out and the Colorado Privacy Act"
    url: https://coag.gov/opt-out/
    accessed: 2026-10-26
  - label: "Colorado Attorney General: Colorado Privacy Act (CPA)"
    url: https://coag.gov/resources/colorado-privacy-act/
    accessed: 2026-10-26
  - label: "Connecticut Attorney General: Tong Advises Connecticut Consumers and Businesses of Opt Out Rights and Requirements"
    url: https://portal.ct.gov/ag/press-releases/2024-press-releases/tong-advises-connecticut-consumers-and-businesses-of-opt-out-rights-and-requirements
    accessed: 2026-10-26
volatile:
  - "GPC specification: W3C Working Draft dated September 24, 2026 (source: W3C)"
  - "CCPA: GPC must be honored as a valid request to stop sale or sharing; B2B and employee exemptions expired December 31, 2022; thresholds as listed on the Attorney General's page, updated August 28, 2026 (source: California Department of Justice)"
  - "Colorado: universal opt-out mechanisms required from July 1, 2024; GPC is the only recognized mechanism (source: Colorado Attorney General)"
  - "Connecticut: opt-out preference signals honored from January 1, 2025 (source: Connecticut Attorney General, December 30, 2024)"
  - "Joint GPC sweep by California, Colorado, and Connecticut announced September 9, 2025 (source: California Privacy Protection Agency)"
  - "AB 566 signed October 8, 2025; browsers must offer opt-out preference signals when the law takes effect in January 2027 (source: California Privacy Protection Agency)"
volatileChecked: 2026-10-26
inbound:
  - page: /blog/consent-mode-v2-webflow
    anchor: "the GPC signal"
    sentence: "Where the post covers which tags to hold until consent, link to the post for the US opt-out side."
  - page: /blog/webflow-analytics
    anchor: "honoring Global Privacy Control"
    sentence: "In the setup checklist, link to the post next to the consent step."
  - page: /blog/website-maintenance-checklist
    anchor: "retest the GPC signal"
    sentence: "In the quarterly checks, add a line on retesting GPC after tag changes and link to the post."
  - page: /ongoing-website-support
    anchor: "privacy signals like GPC"
    sentence: "Where the page lists what a support plan checks, link to the post."
editorNotes:
  - "Topic 7.6 re-ranked into this batch by data: gpc signal 350 US (KD 1), global privacy control 1,300 (KD 55). Primary keyword gpc signal; the head term is secondary."
  - "Legal topic: every legal statement comes from a regulator's own page (California DOJ, CPPA, Colorado AG, Connecticut AG) or the W3C draft, opened on 2026-10-26. It needs review by counsel before publishing, as the topic bank says. Other states with opt-out signal rules are not listed because no official source was opened for them."
  - "The California revenue threshold is quoted as the Attorney General's page states it (25 million dollars); the figure is adjusted for inflation over time, so counsel should confirm the current number."
  - "#P76-1 asks whether and how we implement GPC on client sites; default deletes it."
  - "No content score this time: the scoring subscription is paused until Sergio confirms it."
---

The GPC signal is a browser setting, Global Privacy Control, that tells every site a visitor opens not to sell or share their personal data. Regulators in California, Colorado, and Connecticut treat it as a valid opt-out, and B2B sites are not automatically exempt. This guide is for B2B SaaS marketing teams, as of October 2026.

## What is the GPC signal?

The GPC signal is a privacy preference that a browser sends to every website: a request not to sell or share the visitor's personal data. It travels as an HTTP header, Sec-GPC with a value of 1, and pages can read it in JavaScript as navigator.globalPrivacyControl. Visitors turn it on once, in a browser or an extension.

The W3C, the web's standards body, describes GPC as "a signal, transmitted over HTTP and through the DOM, that conveys a person's request" that sites not sell or share their data. The current specification is a W3C Working Draft dated September 24, 2026. It also defines an optional file, /.well-known/gpc.json, where a site can state that it is aware of the signal.

Support is already built in. The Global Privacy Control project lists Brave, DuckDuckGo's browser, where the signal is on by default, and Firefox, where it is a setting, plus extensions such as Privacy Badger. The project says the signal reaches over 150 million users. More are coming: California's AB 566, signed on October 8, 2025, requires browsers operating in the state to offer an opt-out preference signal when it takes effect in January 2027.

## Which laws require you to honor GPC?

In California, Colorado, and Connecticut, covered businesses must treat the GPC signal as an opt-out. California's Attorney General says it "must be honored by covered businesses as a valid consumer request to stop the sale or sharing" of personal information. Colorado has required it since July 1, 2024, and Connecticut since January 1, 2025.

Table: State rules on the GPC signal (as of October 2026)

| State | Required since | What the signal opts the visitor out of | Who must comply |
| --- | --- | --- | --- |
| California (CCPA) | In force; enforced against Sephora in August 2022 | Sale and sharing, where sharing means cross-context behavioral advertising | For-profit businesses doing business in California that meet one of three thresholds, such as gross annual revenue over 25 million dollars |
| Colorado (CPA) | July 1, 2024 | Sale and targeted advertising; GPC is the only mechanism the state recognizes | Businesses within the law's thresholds, such as processing the data of 100,000 or more Colorado consumers a year |
| Connecticut (CTDPA) | January 1, 2025 | Sales and targeted advertising | Covered businesses under the state law |

Regulators have acted on it. California announced a 1.2 million dollar settlement with Sephora in August 2022; according to the Attorney General, the company "failed to process user requests to opt out of sale via user-enabled global privacy controls." Three years later, on September 9, 2025, California, Colorado, and Connecticut announced a joint sweep of businesses that may be ignoring opt-outs sent through GPC. California's Attorney General said "businesses have an obligation to honor this request."

None of this is legal advice. Other states have their own rules, and thresholds and definitions differ between them, so have counsel confirm what applies to you.

## Does GPC apply to B2B websites?

Often, yes. California's exemption for business-to-business personal information "expired on December 31, 2022," so a buyer reading your site from California is a consumer under the CCPA like anyone else. Colorado's law excludes people "acting in a commercial or employment context," but a browser signal can't tell you which context a visitor is in.

Here is where it gets awkward. A procurement lead comparing vendors from the office may fall outside Colorado's definition; the same person reading your blog on the couch that evening may not. The header doesn't say which, and neither does the JavaScript property. It doesn't say where they live, either.

You can honor the signal for everyone, or try to honor it only where a law clearly applies, which means guessing each visitor's location and context. We'd do the first unless counsel says otherwise. It costs you part of your retargeting audience, and you build and test one rule for every page.

## What does honoring GPC mean on a marketing site?

For most B2B marketing sites, it means not loading tags that sell or share the visitor's data with third parties for that browser. In practice that is advertising pixels and retargeting tags, which serve what California calls cross-context behavioral advertising. Forms, the site itself, and analytics you don't use for advertising usually keep working.

Table: How common marketing tags are usually handled when GPC is on

| Tag or tool | Usual approach when the signal is on | Why |
| --- | --- | --- |
| Ad network pixels and retargeting tags | Don't load them | Building ad audiences from site visits is the core of cross-context behavioral advertising |
| Conversion tracking for ad platforms | Don't send visitor-level data | It passes the visitor's activity to the ad platform |
| Visitor identification or data enrichment tools | Review each one with counsel | Some share or sell visitor data, depending on the contract |
| Analytics used only for your own reporting | Usually keep, with ad features off | Not used to target ads, if configured that way |
| Forms, chat, and scheduling | Keep | The visitor chose to give you the data, though your CRM should record the opt-out |

That table is a common reading, not the only one, and the same tag can behave differently depending on its contract and settings. Walk through it with counsel once, then put the rule in your tag manager so every page follows it.

## How do you set up GPC on your website?

Read the signal before any advertising tag loads, and when it's on, keep those tags off for that browser. On a Webflow or headless site, that is a small rule in your tag manager or consent tool, a line in the privacy notice, and a test. Your consent platform may read GPC already; check what it turns off.

Start with an inventory. Open your tag manager, list every tag, and mark the ones that sell or share data, with the table above as a guide. On most B2B sites the list is short: one or two ad pixels, a retargeting tag, maybe a data enrichment script someone added for an old campaign.

The check itself is one line of JavaScript. If navigator.globalPrivacyControl is true, don't fire the marked tags, or switch your consent tool to its opted-out state for advertising. Sites that render on a server can read the Sec-GPC header instead and leave those tags out of the HTML. Our guide to [Consent Mode v2 on a Webflow site](/blog/consent-mode-v2-webflow) shows how consent states reach Google's tags.

Two loose ends are easy to miss. Leads still come in through forms, so pass the opt-out along, for example in a hidden field, so your CRM doesn't add that person to an ad audience later. And update the privacy notice: Colorado requires it to explain how opt-outs sent through universal opt-out mechanisms are processed. If you want to show awareness publicly, the W3C draft describes an optional /.well-known/gpc.json file.

## How do you test that your site honors GPC?

Turn the signal on, load your pages, and watch the network requests. If the setup works, requests carry Sec-GPC: 1, the page reports navigator.globalPrivacyControl as true, and nothing goes out to your ad networks, while forms and pages behave normally.

The quickest way to send the signal is a browser that already supports it. Firefox has it as a privacy setting, and Brave and DuckDuckGo's browser send it too. Open your site, open the developer tools, and reload with the Network tab visible.

Click any page request and look for Sec-GPC: 1 in the request headers. Then type navigator.globalPrivacyControl in the console; it should return true. Now filter the network list by the domains of your ad platforms. If anything shows up, a tag is still firing, often one pasted straight into the page code rather than added through the tag manager.

Finish with a test lead through your main form, and check that it reaches the CRM with the opt-out recorded. Then turn the signal off and repeat, to make sure the tags still load for everyone else. Do this again whenever someone adds a pixel, launches a campaign, or updates the consent tool. Our [Webflow analytics guide](/blog/webflow-analytics) covers the wider tracking setup, and our [website maintenance checklist](/blog/website-maintenance-checklist) has a slot for the quarterly retest.

We build and maintain websites for B2B SaaS companies, so we have an interest in the topic. Our [website support plans](/ongoing-website-support) include checks like these.
