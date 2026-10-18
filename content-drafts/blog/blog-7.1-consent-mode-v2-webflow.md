---
slug: consent-mode-v2-webflow
url: /blog/consent-mode-v2-webflow
pageType: guide
draft: false
blockedBy: []
topicId: "7.1"
wave: 2
title: "Consent Mode v2 on Webflow: Setup and Testing | BenorMedia"
description: "How to set up Google Consent Mode v2 on a Webflow site, test it with Tag Assistant, and avoid the mistakes that lose data, including the June 2026 change."
h1: "Consent Mode v2 on a Webflow site: setup, testing, and the mistakes that lose data"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-18
updatedAt: 2026-10-18
reviewEvery: none
primaryKeyword: "consent mode v2"
secondaryKeywords: []
takeaways:
  - "Consent Mode v2 passes four consent signals to Google tags: ad_storage, analytics_storage, ad_user_data, and ad_personalization. It doesn't replace your cookie banner."
  - "Since June 15, 2026, consent mode in Google Ads is the single control for Google Ads cookies and IDs; Google signals no longer governs them."
  - "The consent default must load before any Google tag. On Webflow, that means the default goes at the top of the site's head code, or in a consent tool that sets it first."
  - "Behavioral modeling needs advanced consent mode and at least 1,000 events a day with analytics_storage denied for 7 days, which many B2B sites never reach."
  - "Test every region you show a banner in with Tag Assistant, then check the consent settings in Google Analytics after 48 to 72 hours."
faqHeading: "Questions about Consent Mode v2"
faq:
  - q: "What is Consent Mode v2?"
    a: "It's the current version of Google's consent mode. It adds two parameters, ad_user_data and ad_personalization, to the original ad_storage and analytics_storage, so Google tags know whether a visitor allowed data to be used for advertising and personalized ads."
  - q: "Is Consent Mode v2 required?"
    a: "Google requires advertisers to collect consent from users in the European Economic Area and pass consent signals to Google for measurement, personalization, and remarketing. Without them, EEA users are left out of audiences in linked advertising products. Whether your banner meets local law is a question for your legal counsel."
  - q: "Does Webflow support Consent Mode v2?"
    a: "Webflow doesn't set consent mode for you. You add the consent default in the site's head code or use a consent management app that supports consent mode. Custom code needs a paid Site or Workspace plan."
  - q: "What's the difference between basic and advanced consent mode?"
    a: "In basic mode, Google tags don't load until the visitor responds to the banner. In advanced mode, tags load right away with consent denied by default and send cookieless pings until the visitor chooses."
  - q: "How do you check that consent mode works?"
    a: "Open your site in Google's Tag Assistant, accept or reject the banner, and check the Consent tab: the on-page default should appear before any tag fires, and the update should match the visitor's choice."
related:
  - /growth
  - /webflow-seo-agency
  - /ongoing-website-support
sources:
  - label: "Google Tag Platform: Consent mode overview"
    url: https://developers.google.com/tag-platform/security/concepts/consent-mode
    accessed: 2026-10-17
  - label: "Google Tag Platform: Set up consent mode on websites"
    url: https://developers.google.com/tag-platform/security/guides/consent
    accessed: 2026-10-18
  - label: "Google Tag Platform: Troubleshoot consent mode with Tag Assistant"
    url: https://developers.google.com/tag-platform/security/guides/consent-debugging
    accessed: 2026-10-18
  - label: "Analytics Help: Updates to Google Analytics Data Controls"
    url: https://support.google.com/analytics/answer/17016975
    accessed: 2026-10-18
  - label: "Analytics Help: Verify and update consent settings in Google Analytics"
    url: https://support.google.com/analytics/answer/14275483
    accessed: 2026-10-18
  - label: "Analytics Help: Consent mode reference"
    url: https://support.google.com/analytics/answer/13802165
    accessed: 2026-10-18
  - label: "Analytics Help: Behavioral modeling for consent mode"
    url: https://support.google.com/analytics/answer/11161109
    accessed: 2026-10-18
  - label: "Tag Manager Help: Tag Manager consent mode support"
    url: https://support.google.com/tagmanager/answer/10718549
    accessed: 2026-10-18
  - label: "Webflow Help Center: Custom code in head and body tags"
    url: https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags
    accessed: 2026-10-18
  - label: "Webflow Help Center: Google Analytics integration"
    url: https://help.webflow.com/hc/en-us/articles/33961293143059
    accessed: 2026-10-18
  - label: "Webflow Help Center: Webflow Analyze overview"
    url: https://help.webflow.com/hc/en-us/articles/34200153798163
    accessed: 2026-10-15
volatile:
  - "June 15, 2026: consent mode in Google Ads becomes the single control for Google Ads cookies and IDs; ad_personalization and IP changes later in 2026 (source: Updates to Google Analytics Data Controls, checked 2026-10-18)"
  - "Consent mode setup: default before measurement, wait_for_update, region, update, url_passthrough, ads_data_redaction (source: updated 2026-10-13)"
  - "Tag Assistant consent checks (source: updated 2026-10-13)"
  - "Behavioral modeling thresholds: advanced mode, 1,000 denied events a day for 7 days, 1,000 granted daily users on 7 of 28 days (source: checked 2026-10-18)"
  - "EEA consent requirements and 48 to 72 hour refresh in GA4 consent settings (source: checked 2026-10-18)"
  - "Webflow custom code: Site settings, Custom code, Head code, 50,000 characters, paid plan, live on publish (source: updated 2026-09-02)"
volatileChecked: 2026-10-18
inbound:
  - page: /ongoing-website-support
    anchor: "Consent Mode v2 on Webflow"
    sentence: "In section 03, Technical SEO monitoring: Read how to set up and test Consent Mode v2 on Webflow."
  - page: /growth
    anchor: "consent mode setup"
    sentence: "In step 06, Tracking & reporting: Before reporting starts, check your consent mode setup."
editorNotes:
  - "The topic row asks to verify Google's June 2026 change against Google's own pages. Verified on 2026-10-18 against Analytics Help 17016975; the post states only what that page says and marks the later changes as announced, not dated."
  - "The topic row asks for 'a tested setup path'. The post describes the documented path and the test routine; it claims no specific site test."
  - "Counsel disclaimer included in the lead section and the FAQ."
  - "Once post 5.1 (Webflow analytics) is live, link it from the setup section."
---

Google Consent Mode v2 tells Google tags what each visitor agreed to, so analytics and ads respect the cookie banner. On Webflow it isn't built in: you set the default consent before any Google tag loads. This guide, for marketing leads running a B2B site on Webflow, covers setup, testing, and common mistakes. It isn't legal advice.

## What is Consent Mode v2, and what are its consent parameters?

Google consent mode is a way for your site to pass each visitor's consent choices to Google tags, so Google tags behave based on what the user allowed. Google lists four consent types, also called consent parameters:

- **ad_storage:** cookies and identifiers used for advertising;
- **analytics_storage:** cookies used for analytics, such as visit duration;
- **ad_user_data:** consent to send user data to Google for online advertising;
- **ad_personalization:** consent to use that data for personalized ads.

The "v2" refers to the last two, which Google added to the original consent mode. Google's help pages ask sites with their own banners to upgrade to consent mode v2, because ads measurement now expects ad_user_data and ads personalization expects ad_personalization.

Consent mode isn't a cookie banner, though. Google says you still need a consent banner, a custom consent solution, or a consent management platform to obtain user consent; consent mode only changes how tags behave once they know the consent status.

## Does a Webflow site need Consent Mode v2?

It depends on who visits and what you run. Google requires advertisers to collect consent from users in the European Economic Area and pass consent signals for measurement, personalization, and remarketing. A US-based B2B SaaS company that runs Google Ads and gets EEA traffic is in scope. If you run no Google advertising at all, consent mode still controls whether Google Analytics sets cookies, but the ads parameters matter less. Data privacy laws outside Europe can also require consent or opt-outs, so the banner's rules may differ by region; that part is for your legal counsel.

## What changed in Google's consent rules in 2026?

Google is consolidating its data controls by where data is used. Its Analytics help page says that from June 15, 2026, Google Analytics uses consent mode in Google Ads as the single control for collecting and using Google Ads cookies and IDs. Google signals now only controls whether Analytics data is linked to signed-in users for behavioral reporting.

The same page says changes to ads personalization and IP address controls are coming later in 2026, with dates to follow. When they arrive, Google says the ad_personalization setting will be the only control for whether that data is used for personalization.

In practice, this makes the consent signals your site sends the main control for Google Ads data. If your banner never sends an update, or sends one only for analytics_storage, the ads side of your setup doesn't reflect what visitors chose.

## Should you use basic consent mode or advanced consent mode?

Google describes two implementations:

Table: Basic and advanced consent mode compared

| | Basic | Advanced |
| --- | --- | --- |
| When Google tags load | After the visitor responds to the banner | When the page opens |
| Data before consent | None sent to Google | Cookieless pings with consent denied |
| Behavioral modeling in GA4 | Not available | Available if the property meets the thresholds |
| Setup effort | Block tags until consent | Set defaults, let tags load, send updates |

With analytics_storage denied, Google says cookieless pings set or read no Analytics cookies, and the data is used for behavioral and conversion modeling to fill gaps. But behavioral modeling has a high bar. The property needs advanced consent mode on every page, at least 1,000 events a day with analytics_storage denied for at least 7 days, and at least 1,000 daily users with analytics_storage granted on at least 7 of the previous 28 days. Even then, Google says eligibility isn't guaranteed.

Many B2B SaaS sites don't reach those numbers. If yours doesn't, advanced mode won't fill the gaps in your reports, and the choice between basic and advanced is mostly a privacy and legal decision. Take it with your legal counsel, then implement it consistently on every page.

## How do you set up default consent on a Webflow site?

Webflow doesn't set default consent states for you. Its Google Analytics help article covers where to add the Google tag, but doesn't mention consent. You have two routes.

**Route 1: a consent management app.** Several consent tools in Webflow's marketplace support Google consent mode. The tool shows the banner, sets the default, and sends the update when the visitor chooses. Check in its documentation that it sets all four parameters, records each visitor's consent preferences, and loads before your Google tag.

**Route 2: your own default snippet.** Google's setup guide says to call the consent default on every page before any command that sends measurement data. On Webflow:

1. Go to Site settings, then the Custom code tab, and put the consent default at the very top of the Head code. Custom code needs a paid Site plan or a paid Workspace, and each head code field accepts up to 50,000 characters.
2. Set defaults by region if you show the banner only in some regions. Google says a default without a region parameter applies to every visitor not covered by a region-specific default.
3. If the banner loads asynchronously, add wait_for_update with a value in milliseconds so tags wait for the update before sending data.
4. Have the banner send a consent update as soon as the visitor chooses, and store the choice in a first-party cookie or local storage so later pages start with the right state.
5. Consider url_passthrough, which carries ad click parameters across pages when cookies are denied, and ads_data_redaction, which redacts ad data when ad_storage is denied.
6. Publish. Custom code shows in preview mode but only goes live when you publish.

Then add the Google tag in one place only. Webflow's help says to put the GA4 tag either in the Google Analytics integration in Site settings or in the head code, not both. Webflow doesn't document where the integration's tag loads relative to head code, so if you use the integration, confirm in Tag Assistant that your default runs first. If it doesn't, move the Google tag (or your tag manager container) into the head code, directly below the consent default.

**If you use Google Tag Manager,** let the consent tool's tag, or your default consent tag, fire on the Consent Initialization trigger. Google says that trigger always fires before all other tags. Google tags have built-in consent checks; for other tags in the Google Tag Manager container, such as ad pixels, set "Require additional consent for tag to fire" in each tag's consent settings, so the tag fires only when the visitor grants consent. The container's Consent Overview shows which tags still have consent not configured.

If you use Webflow Analyze, set its own consent option too. Analyze can run always on, opt-in, or opt-out, and the last two need a consent solution connected to it.

## How do you test consent mode before and after launch?

Test on the published site, because custom code doesn't run in the Designer canvas.

1. **Tag Assistant.** Open Google's Tag Assistant, enter your site's URL, and accept everything in the banner. Open the earliest Consent event and check the four parameters in the API call; then open the latest Consent event and confirm they updated. In your tag's output, the Consent tab shows the on-page default and the on-page update. An empty Consent tab means consent mode isn't on the page.
2. **Deny consent.** Repeat in a private window and reject all. The update should set every parameter to denied, and no Analytics or advertising cookies should appear in the browser's storage.
3. **Every region.** Simulate a visitor from each region where your banner behaves differently and check that all four parameters follow your policy there.
4. **Google Analytics.** In Admin, under Data collection and modification, open Consent settings and review the signals for each data stream. Google says notifications can take 48 to 72 hours to refresh after you change the site.

Repeat the test after any change to the banner, the tag manager container, or the site's head code.

## Which cookie banner and consent mode mistakes lose data?

These come straight from Google's troubleshooting guidance, plus the Webflow-specific traps above.

- **The default loads after a tag.** Google says the default must be set before any tag uses consent. A tag that fires first may already have read or written a cookie.
- **The update never fires.** Every parameter with a default needs an update path that can set it to granted or denied.
- **A region has no default.** Setting analytics_storage by region but ad_storage without one leaves a gap Google calls out by name.
- **The Google tag is installed twice.** Integration plus head code, or head code plus a tag manager, doubles page views and makes consent timing harder to read.
- **Tags outside consent control.** Pixels or scripts pasted into page-level custom code or embeds can fire regardless of the banner.
- **Only analytics_storage is updated.** After June 15, 2026, the ad parameters are what control Google Ads data, so a banner that ignores them misreports what visitors chose and leaves conversion tracking in Google Ads without the consent signals it needs.

We build and support Webflow sites for B2B and SaaS companies, so we have an interest in this topic. For what ongoing support covers, see our [website support](/ongoing-website-support) page.
