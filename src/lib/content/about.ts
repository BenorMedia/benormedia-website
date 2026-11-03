/**
 * /about — every visible word of the page (Figma 4145:9660, lead
 * 2026-11-03), word for word, plus the SEO spec's meta and the draft
 * switch. Section components take their copy from here; nothing visible is
 * written in the components.
 *
 * `DRAFT = true`: the page is built in previews and `astro dev` only (never
 * in a production build), carries `noindex` and stays out of the sitemap.
 * Release = set `DRAFT = false` with the lead's sign-off, once every
 * `marker` below is resolved (each one prints on the page while it is set).
 *
 * Markers are the content kit's: `[VERIFY: ...]` and `[PERSON: ...]`. Never
 * resolve one with a guess; the lead answers them (DECISIONS → About).
 */
import { AUTHORS, authorPath, type Author } from "../new-pages/authors";

export const DRAFT = true;
export const publishedAt = "2026-11-03";
export const updatedAt = "2026-11-03";

/** SEO spec (lead, about-page-seo.md): the full title tag, no template. */
export const ABOUT_META = {
  title: "About BenorMedia: B2B Webflow Agency Since 2020",
  description:
    "BenorMedia is a B2B Webflow agency and Webflow Professional Partner. 100+ sites launched since 2020 for SaaS, fintech and AI companies like Surfe and Unit21.",
  /** Organization `description` on this page (SEO spec). */
  orgDescription:
    "B2B Webflow agency and Webflow Professional Partner that designs, builds and grows websites for SaaS, fintech, cybersecurity and AI companies.",
  foundingDate: "2020",
};

export const ABOUT_HERO = {
  eyebrow: "About us",
  title: "About BenorMedia",
  paragraphs: [
    "BenorMedia is a B2B Webflow agency and Webflow Professional Partner that designs, builds and grows websites for SaaS, fintech, cybersecurity and AI companies, among many others. Since 2020 we have launched 100+ sites for companies like Surfe, Puzzle, Unit21 and Sublime Security, which together have raised over $700M.",
    "We're a senior in-house team based in Barcelona, Spain, working remotely with clients in the US, UK and Europe.",
  ],
  marker:
    "[VERIFY: the six hero photos are Figma's placeholders (a city skyline, Barcelona, an office, a stock portrait, a person at a desk, the W Barcelona hotel). Real BenorMedia photos, or keep these?]",
};

export const ABOUT_MISSION = {
  eyebrow: "Mission",
  title: "Our mission.",
  body: "Help B2B companies grow through their web presence, starting with a website that brings in leads and keeps getting better long after launch. We're proud that many of our clients have kept growing with us for years.",
};

export interface AboutFact {
  key: "websites" | "support" | "growth" | "rebrand";
  title: string;
  body: string;
  marker?: string;
}

/** Facts cards, in the Home Services grid (`Services.astro` variant "about"). */
export const ABOUT_FACTS = {
  eyebrow: "Facts",
  title: "BenorMedia at a glance",
  cards: [
    {
      key: "websites",
      title: "Founded in 2020",
      body: "Sergio Gancedo founded BenorMedia in 2020. Today our team designs, builds and supports websites for funded B2B companies, mostly Series A to C.",
    },
    {
      key: "support",
      title: "A global remote team",
      body: "We're based in Barcelona and work remotely across time zones, with clients in the US, UK and Europe.",
    },
    {
      key: "growth",
      title: "Webflow Premium Partner",
      body: "Most of our sites run on Webflow, and Webflow lists us as a Professional Partner. When a project needs more, we build it custom.",
      marker:
        "[VERIFY: the title and the badge say \"Premium Partner\"; the body, the footer and the house style say \"Webflow Professional Partner\". Which tier is right?]",
    },
    {
      key: "rebrand",
      title: "100+ Sites launched",
      body: "Mostly for B2B SaaS companies, from a first marketing site to a full rebuild with hundreds of CMS pages.",
    },
  ] satisfies AboutFact[],
};

export const ABOUT_HOW = {
  eyebrow: "How we work",
  title: "A small senior team, by design.",
  body: "Every project is designed and built by our own staff, never outsourced. You talk to the people doing the work, and they ship to you directly.",
  stamp: "Barcelona, Spain.",
  marker:
    "[VERIFY: Figma names these four photos as another agency's office (\"DesignMe office lounge in Gdansk\", a DesignMe cap on the shelf). Send BenorMedia photos, or confirm we may use these.]",
};

export interface TeamMember {
  name: string;
  /** Role, from `authors.ts` (the lead's team titles). */
  role: string;
  href: string;
  photo: Author["photo"];
}

// Figma order for the first four cards, then the three newer members.
const TEAM_ORDER = [
  "sergio-gancedo",
  "santiago-lopez",
  "emily-gaitan",
  "david-garay",
  "paula-allievi",
  "ismael-aoussi",
  "mauricio-guerra",
];
const roleOf = (a: Author): string => a.jobTitle.replace(/,\s*BenorMedia$/, "");

export const ABOUT_TEAM = {
  eyebrow: "Team",
  title: "Our team.",
  members: TEAM_ORDER.flatMap((slug) => {
    const a = AUTHORS.find((x) => x.slug === slug);
    return a ? [{ name: a.name, role: roleOf(a), href: authorPath(a), photo: a.photo }] : [];
  }) satisfies TeamMember[],
  /** Team members, for the Organization `employee` list. */
  authors: TEAM_ORDER.flatMap((slug) => AUTHORS.find((x) => x.slug === slug) ?? []),
  marker:
    "[PERSON: card photos. Figma has one placeholder portrait on every card; the author headshots (round) stand in. Send a card photo per person.]",
  join: {
    title: "Want to join the team?",
    body: "We're always happy to meet designers and developers. Send us your work!",
    button: "Get in Touch",
  },
};
