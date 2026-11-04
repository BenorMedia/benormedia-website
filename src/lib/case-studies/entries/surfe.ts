/**
 * /work/surfe — every visible word of the Surfe case study, word for word
 * from Figma 4225:11810 (lead 2026-11-04: Surfe's copy is final and
 * client-approved). Images exported from the same frame.
 *
 * Copy edits (DECISIONS → Work, 2026-11-04), all logged for the lead:
 *  - Missing spaces where Figma's text ran two lines together ("aCRM",
 *    "15providers", "redesignedsurfe.com", "offWordPress", "August2026",
 *    "about1,500", "ongoingwebsite", "everyGoogle", "33to 86", "threemonths",
 *    "thingsget", "ofour", "questionsabout", "months,May", "ofMay",
 *    "andOctober" ...) are restored.
 *  - Split words joined: "Pipe drive" → "Pipedrive", "forf ree" → "for
 *    free", "sitel aunched" → "site launched", "or are direct" → "or a
 *    redirect", "healthscore" → "health score".
 *  - Left out: the second "About Surfe" paragraph ("Wording follows Surfe's
 *    homepage ... so more names can be added."), a source note, not page
 *    copy; the "brief 6 - " prefix of the templates caption; the results
 *    image caption "Image brief 7" (an image brief, `TODO: COPY`).
 *  - Sergio's role: "General Manager, BenorMedia" (lead 2026-11-03 in
 *    `authors.ts`; Figma still says "Managing Director, BenorMedia").
 *  - Browser frame address: "surfe.com" (Figma's hero frame says
 *    "yoursite.com", a template placeholder).
 *
 * Not shown: the "What we did" intro, a hidden layer in Figma.
 *
 * Not changed, flagged for the lead: the redirect-map caption, Ahrefs named in Results, the summary's missing full
 * stop, H2s without full stops.
 *
 * `DRAFT = true` (lead 2026-11-04): built in previews and `astro dev` only,
 * noindex, out of the sitemap. The lead releases it.
 */
import type { CaseStudy } from "../types";

import logo from "../../../assets/case-studies/surfe/surfe-logo.png";
import homepage from "../../../assets/case-studies/surfe/surfe-homepage.jpg";
import factClient from "../../../assets/case-studies/surfe/fact-client.png";
import factIndustry from "../../../assets/case-studies/surfe/fact-industry.png";
import factOffices from "../../../assets/case-studies/surfe/fact-offices.png";
import factFounded from "../../../assets/case-studies/surfe/fact-founded.png";
import factStage from "../../../assets/case-studies/surfe/fact-stage.png";
import factServices from "../../../assets/case-studies/surfe/fact-services.png";
import factStack from "../../../assets/case-studies/surfe/fact-stack.png";
import factPages from "../../../assets/case-studies/surfe/fact-pages.png";
import factTimeline from "../../../assets/case-studies/surfe/fact-timeline.png";
import factLive from "../../../assets/case-studies/surfe/fact-live.png";
import goal1 from "../../../assets/case-studies/surfe/goal-1.png";
import goal2 from "../../../assets/case-studies/surfe/goal-2.png";
import goal3 from "../../../assets/case-studies/surfe/goal-3.png";
import goal4 from "../../../assets/case-studies/surfe/goal-4.png";
import goal5 from "../../../assets/case-studies/surfe/goal-5.png";
import trelise from "../../../assets/case-studies/surfe/trelise-mansfield.png";
import baBefore from "../../../assets/case-studies/surfe/before-after/browser-before.png";
import baAfter from "../../../assets/case-studies/surfe/before-after/browser-after.png";
import baBackdrop from "../../../assets/case-studies/surfe/before-after/swatches.png";
import baBadge from "../../../assets/case-studies/surfe/before-after/hub.png";
import baLinesLeft from "../../../assets/case-studies/surfe/before-after/lines-left.svg";
import baLinesRight from "../../../assets/case-studies/surfe/before-after/lines-right.svg";
import redirectMap from "../../../assets/case-studies/surfe/redirect-map.png";
import trustApi from "../../../assets/case-studies/surfe/trust-center-and-api.png";
import cmsTemplates from "../../../assets/case-studies/surfe/cms-templates.png";
import launchAudit from "../../../assets/case-studies/surfe/launch-audit.png";
import webflow3d from "../../../assets/case-studies/surfe/webflow-3d.png";
import logoHubspot from "../../../assets/case-studies/surfe/logo-hubspot.png";
import logoCookiebot from "../../../assets/case-studies/surfe/logo-cookiebot.png";
import logoZendesk from "../../../assets/case-studies/surfe/logo-zendesk.png";
import logoGtm from "../../../assets/case-studies/surfe/logo-google-tag-manager.png";
import magnifier from "../../../assets/case-studies/surfe/timeline-magnifier.png";

/** Read by `registry.mjs` (sitemap) as text: keep these three lines simple. */
export const SLUG = "surfe";
export const DRAFT = true;
export const publishedAt = "2026-11-04";
export const updatedAt = "2026-11-04";

const trelisePhoto = { src: trelise, alt: "Trelise Mansfield" };

export const CASE_STUDY: CaseStudy = {
  slug: SLUG,
  draft: DRAFT,
  publishedAt,
  updatedAt,
  seo: {
    // TODO: COPY: no SEO fields for Surfe in the brief; derived from the H1
    // and intro (DECISIONS → Work, open question).
    title: "Surfe Case Study: WordPress to Webflow | BenorMedia",
    description:
      "How BenorMedia moved Surfe's 350 pages from WordPress to Webflow in three months, with about 1,500 redirects and higher Lighthouse scores.",
    // The hero screenshot cut to 1200 x 630.
    ogImage: "/images/case-studies/surfe-og.jpg",
  },
  client: {
    id: "client-surfe",
    name: "Surfe",
    url: "https://www.surfe.com",
    logo: { src: logo, alt: "Surfe" },
  },
  hero: {
    tag: "Case study",
    h1: "How Surfe moved 350 pages from WordPress to Webflow in three months.",
    intro:
      "Surfe, the pipeline generation platform used by 50,000+ revenue professionals, has worked with BenorMedia since May 2026 to redesign its website and move it from WordPress to Webflow.",
    screenshot: { src: homepage, alt: "Surfe's new homepage on Webflow: Pipeline Generation built on better data" },
    address: "surfe.com",
    liveLabel: "Visit live site",
  },
  stats: [
    { value: "33 to 86", label: "Lighthouse performance score on mobile, old site vs. new" },
    { value: "350", label: "WordPress pages moved to Webflow, with about 1,500 old URLs redirected" },
    { value: "3 months", label: "from kickoff to launch" },
  ],
  toc: { label: "Table of contents", getInTouch: "Get in Touch", share: "Share" },
  glance: {
    heading: "At a glance",
    summary:
      "Surfe, the pipeline generation platform used by more than 50,000 revenue professionals, had outgrown its WordPress site: it needed a more flexible platform to scale, and a UI that would position it for enterprise buyers. Since May 2026, BenorMedia has redesigned surfe.com, rebuilt its design system and CMS in Webflow, and moved about 350 pages off WordPress, redirecting about 1,500 old URLs, before the August 2026 launch. Surfe's new site scores higher than its old one in every Google Lighthouse category, with mobile performance up from 33 to 86",
    facts: [
      { label: "Client", value: "Surfe (formerly Leadjet)", icon: factClient },
      { label: "Industry", value: "B2B sales data and prospecting software (SaaS)", icon: factIndustry },
      { label: "Offices", value: "New York, Paris and Barcelona", icon: factOffices },
      { label: "Founded", value: "2020", icon: factFounded },
      {
        label: "Stage",
        value: "About $10M raised (seed and pre-Series A), 10,000 + paying customers (CEO interview, August 2026)",
        icon: factStage,
      },
      { label: "Services", value: "Webflow migration, B2B SaaS web design, ongoing website support", icon: factServices },
      { label: "Stack", value: "Webflow, HubSpot, Cookiebot, Zendesk", icon: factStack },
      { label: "Pages", value: "About 350 pages migrated from WordPress; about 1,500 old URLs redirected", icon: factPages },
      { label: "Timeline", value: "Kickoff May 2026; launch August 2026; ongoing support since", icon: factTimeline },
      { label: "Live site", value: "surfe.com", icon: factLive },
    ],
  },
  about: {
    heading: "About Surfe",
    paragraphs: [
      "Surfe calls itself the pipeline generation platform for revenue teams. It finds and enriches B2B contacts, flags buying signals and syncs the data straight into Salesforce, HubSpot or Pipedrive. More than 50,000 revenue professionals use it, at companies such as Rakuten, AB Tasty and Sastrify, and it powers HubSpot's Prospecting Agent and Pipedrive's native enrichment. Surfe was founded in 2020 as Leadjet and has offices in New York, Paris and Barcelona.",
    ],
  },
  challenge: {
    heading: "The challenge and goals",
    paragraphs: [
      "Surfe started in 2020 as Leadjet, a Chrome extension that moved LinkedIn contacts into a CRM. By 2026 it sells a full pipeline generation platform: contact data from more than 15 providers, buying signals, an API and an MCP server for AI agents, with native sync into Salesforce, HubSpot and Pipedrive. The deals grew with the product, and Surfe set out to win more enterprise clients.",
      "The WordPress website hadn't kept pace. It had grown well past a thousand URLs, and it looked like the startup Surfe used to be rather than the vendor enterprise revenue teams were now evaluating. Surfe's marketing team wanted two things: a more flexible platform that could scale with the content and campaigns ahead, and a UI that could hold its own in an enterprise buying process.",
    ],
    quote: {
      text: "\"On WordPress, every new landing page turned into a small project. By the time it went live, the campaign had usually moved on.\"",
      name: "Trelise Mansfield",
      role: "Head of Marketing, Surfe",
      photo: trelisePhoto,
    },
    goalsIntro: "Goals agreed at kickoff:",
    goals: [
      { label: "GOAL 01", text: "A more scalable website", icon: goal1 },
      { label: "GOAL 02", text: "SEO improvements", icon: goal2 },
      { label: "GOAL 03", text: "A brand and UI refresh", icon: goal3 },
      { label: "GOAL 04", text: "More enterprise clients", icon: goal4 },
      { label: "GOAL 05", text: "A cleanup of the technical structure", icon: goal5 },
    ],
    figure: {
      image: {
        src: baBefore,
        alt: "Surfe's homepage on WordPress next to the new homepage on Webflow, with the new color palette between them",
      },
      caption: "Surfe homepage on WordPress, before the redesign",
      compare: {
        before: baBefore,
        after: baAfter,
        backdrop: baBackdrop,
        badge: baBadge,
        linesLeft: baLinesLeft,
        linesRight: baLinesRight,
        chips: { before: "BEFORE", after: "After" },
      },
    },
  },
  work: {
    heading: "What we did",
    // Figma's intro ("We ran a structured 10-week engagement ...", 4225:12236)
    // is a hidden layer: not shown (lead reference export, 2026-11-04).
    intro: undefined,
    questions: [
      {
        heading: "How do you move a large WordPress site to Webflow without breaking links?",
        paragraphs: [
          "The migration process started with a map of every URL on the existing WordPress site. About 350 pages moved into Webflow CMS collections built around Surfe's content types: blog posts, customer stories, comparison pages, integrations, use cases and roles, each with its own URL structure. About 1,500 old URLs were redirected to their new homes, so search engines and visitors following old links still land on the right page.",
        ],
        figure: {
          image: {
            src: redirectMap,
            alt: "Surfe's redirect map spreadsheet next to the 301 redirects list in Webflow's site settings",
          },
          // Flagged: the image shows the redirect map, not the homepage.
          caption: "Surfe homepage after the move to Webflow",
        },
      },
      {
        heading: "What does an enterprise buyer need to see before booking a demo?",
        paragraphs: [
          "The website redesign started from the questions enterprise revenue teams ask before they talk to sales. Security and compliance are one click away, in a Trust Center covering ISO 27001, GDPR and CCPA. Integrations have their own pages, from the Salesforce, HubSpot and Pipedrive sync to the API and MCP server. Proof comes from 23 customer stories, with names like Rakuten and AB Tasty. And every page offers two paths: start for free, or book a demo with sales.",
        ],
        figure: {
          image: { src: trustApi, alt: "Surfe's Trust Center page and API and MCP page on the new Webflow site" },
          caption: "Surfe's Trust Center and API pages on the new site",
        },
      },
      {
        heading: "How does the new Webflow site keep Surfe's team shipping?",
        paragraphs: [
          "The site runs on a design system and Webflow CMS templates, so a new customer story, comparison page or landing page is assembled from tested sections instead of designed from scratch. HubSpot forms, tracking and Cookiebot consent run across every template, so new pages go live with them in place. After launch, BenorMedia stayed on for ongoing support, so new pages keep going live on the same system.",
          "In September 2026, Surfe's API and MCP page went from brief to live in four working days, built entirely from existing components.",
        ],
        figure: {
          image: {
            src: cmsTemplates,
            alt: "Surfe's blog, AB Tasty customer story and Surfe vs FullEnrich comparison page, built from Webflow CMS templates",
          },
          caption: "Surfe’s blog, customer story and comparison templates in Webflow",
        },
      },
    ],
  },
  results: {
    heading: "Results",
    paragraphs: [
      "The new surfe.com is faster than the WordPress site it replaced and scores higher in every Google Lighthouse category. On mobile, the homepage's performance score rose from 33 to 86, and its main content now loads in 2.4 seconds instead of 7.8. In Ahrefs' Site Audit, the site's health score went from 62 to 94.",
      "The move also kept Surfe's content intact: about 350 pages crossed to Webflow in three months, and some 1,500 old URLs now redirect to their new homes.",
    ],
    table: {
      // Written for screen readers (visually hidden), not Figma copy.
      caption: "Surfe website metrics before and after the move to Webflow, with sources",
      columns: ["Metric", "Before", "After", "Source"],
      rows: [
        ["WordPress pages moved to Webflow", "-", "About 350", "Migration map"],
        ["Old URLs redirected", "-", "About 1,500", "Redirect map"],
        ["Kickoff to launch", "-", "About 3 months, May to August 2026", "Project plan"],
        [
          "Lighthouse Performance, mobile",
          "33",
          "86",
          "Google Lighthouse, mobile, May 12, 2026 (old site) vs. October 30, 2026 (new site)",
        ],
        ["Lighthouse SEO", "85", "100", "Google Lighthouse, same runs"],
        ["Lighthouse Accessibility", "78", "96", "Google Lighthouse, same runs"],
        ["Lighthouse Best Practices", "74", "96", "Google Lighthouse, same runs"],
        ["Largest Contentful Paint (loading), mobile", "7.8 s", "2.4 s", "Google Lighthouse, same runs"],
        [
          "Ahrefs Site Audit health score",
          "62",
          "94",
          "Ahrefs Site Audit, crawls of May 12, 2026 (old site) and October 30, 2026 (new site)",
        ],
      ],
    },
    figure: {
      image: {
        src: launchAudit,
        alt: "Google Lighthouse report and Ahrefs Site Audit overview for the new surfe.com",
      },
      caption: undefined, // TODO: COPY: Figma has "Image brief 7" (an image brief, not a caption).
    },
  },
  clientQuote: {
    heading: "Client quote",
    quote: {
      text: "\"BenorMedia is a valued partner to us at Surfe. Communication is always easy, things get implemented quickly, and their ongoing support has become an important part of our day-to-day operations.\"",
      name: "Trelise Mansfield",
      role: "Head of Marketing, Surfe",
      photo: trelisePhoto,
    },
  },
  stack: {
    heading: "Stack and integrations",
    intro: "Surfe's site runs on Webflow, with HubSpot behind forms and tracking.",
    core: {
      chip: "PLATFORM AND CMS",
      name: "Webflow",
      text: "Website, design system, and CMS for blog posts, customer stories, comparison, integration, use-case and role pages.",
      image: { src: webflow3d, alt: "" },
    },
    items: [
      {
        chip: "CRM, FORMS AND TRACKING",
        name: "HubSpot",
        text: "Demo-request forms, analytics and ad tracking",
        logo: { src: logoHubspot, alt: "" },
      },
      { chip: "CONSENT", name: "Cookiebot", text: "Cookie consent banner", logo: { src: logoCookiebot, alt: "" } },
      {
        chip: "SUPPORT",
        name: "Zendesk",
        text: "Help center at support.surfe.com and the support widget",
        logo: { src: logoZendesk, alt: "" },
      },
      {
        chip: "TAGS AND ADS",
        name: "Google Tag Manager, Google Ads",
        text: "Tag management and conversion tracking",
        logo: { src: logoGtm, alt: "" },
      },
    ],
  },
  team: {
    heading: "Team and timeline",
    intro: "From kickoff in May 2026 to launch, then ongoing support",
    milestone: { label: "Launch", date: "August 2026", at: 2 },
    phases: [
      {
        title: "Discovery and design",
        dates: "May - Jun 2026",
        text: "Content inventory, new design system, page designs",
        icon: magnifier,
      },
      {
        title: "Build and migration",
        dates: "Jun 2026 - launch",
        text: "Webflow components, CMS collections, content and redirects",
        icon: webflow3d,
      },
      {
        title: "Support and growth",
        dates: "Since launch",
        text: "New pages, updates and fixes for surfe's marketing team",
        icon: magnifier,
      },
    ],
    summary:
      "The project kicked off in May 2026, and the Webflow project started in June. The site launched in August 2026, about three months after kickoff, and BenorMedia has supported it since. Sergio Gancedo led the project, with Emily Gaitan, Santiago Lopez and David Garay on the team.",
    members: [
      { author: "sergio-gancedo", role: "General Manager, BenorMedia" },
      { author: "emily-gaitan", role: "Senior Web & Marketing Designer" },
      { author: "santiago-lopez", role: "Senior Webflow Developer" },
      { author: "david-garay", role: "Webflow Developer and UX/UI Designer" },
    ],
  },
  takeaways: {
    heading: "Key takeaways",
    items: [
      {
        title: "Design for the buyer you're moving toward.",
        text: "Surfe's site answers enterprise questions about security, integrations and proof before the demo, not after it.",
      },
      {
        title: "Give self-serve and sales-led buyers their own path.",
        text: "Every page on surfe.com offers both \"Start for free\" and \"Book a demo\".",
      },
      {
        title: "Treat a migration as a content decision.",
        text: "Map every old page to a new home or a redirect before the build starts.",
      },
    ],
  },
  cta: {
    tocLabel: "Next steps",
    eyebrow: "get in touch",
    heading: "Moving a SaaS site off WordPress? Book a 30-minute call.",
    button: "Get in Touch",
    trusted: "Trusted by +100 B2B companies",
  },
  // Figma's FAQ block (4225:12760) holds the Pricing placeholder questions,
  // not Surfe's: no FAQ until copy exists (TODO: COPY).
  // Figma 4225:12760 (lead 2026-11-04). Only the second question has an
  // answer in the design; the others wait for theirs (markers, never guessed).
  faq: {
    heading: "Frequently asked questions.",
    items: [
      {
        question: "How long does a WordPress to Webflow migration take?",
        answer: "[FACT NEEDED: answer not in Figma 4225:12770]",
      },
      {
        question: "Can you run a website redesign and a Webflow migration at the same time?",
        answer:
          "Yes. Surfe's redesign and its WordPress to Webflow migration ran as one project, so the design system and the CMS collections were built together.",
      },
      {
        question: "Does BenorMedia support the site after launch?",
        answer: "[FACT NEEDED: answer not in Figma 4225:12785]",
      },
      {
        question: "Evidence log",
        answer: "[FACT NEEDED: content not in Figma 4225:12791]",
      },
    ],
  },
  related: {
    eyebrow: "Case studies",
    heading: "More case studies", // lead 2026-11-04 (Figma: "Lorem ipsum dolor sit")
    cardTag: "Case study",
    more: "Learn more",
  },
  card: {
    // TODO: COPY: Figma's card stats are "XXX / Lorem ipsum"; the hero stats stand in.
    stats: [
      { value: "33 to 86", label: "Lighthouse mobile" },
      { value: "350", label: "Pages moved" },
    ],
  },
};
