/**
 * Placeholder case study for the `/dev/case-study` preview only (DECISIONS
 * → Case studies 2026-10-20: drafts never render, so the template is
 * reviewed with in-code data). Typed as the `CASE_STUDY_BY_SLUG` result.
 *
 * TODO: COPY: sample content from Figma (template 3842:40046 since the v3
 * round, 2026-10-22; lead 2026-10-20 round 2: the dev page reads like the
 * frame). Never use it on a
 * real page, in `copy.ts` or in Sanity. The page that imports this file is
 * not built in production (`src/pages/dev/case-study/[...preview].astro`).
 *
 * Images: exported from Figma into `src/assets/dev/case-study/`. The dev
 * page reads them from disk at render time and passes them in as data URIs
 * (`createCaseStudyFixture`), so a production build, which never renders
 * that page, emits no copy of them.
 */
import type { PreviewImage } from '../../components/case-studies/image';
import type { CaseStudy, CaseStudyBodyBlock, CaseStudyBodyItem, CaseStudyCard, SanityImage } from './types';

export interface FixtureAsset {
  src: string;
  width: number;
  height: number;
}

/** The fixture case study and three cards (the related row and the index card preview). */
export function createCaseStudyFixture(assets: {
  surfeLogo: FixtureAsset;
  authorPhoto: FixtureAsset;
  websiteScreenshot: FixtureAsset;
}): {
  caseStudy: CaseStudy;
  cards: CaseStudyCard[];
} {
  // TODO: COPY: Figma sample logo (node 3768:25992 "Image (Surfe)": the source PNG, 321 × 100; no SVG in the file, the node export has a dark fill).
  const SURFE_LOGO: SanityImage & PreviewImage = {
    alt: 'Surfe logo',
    previewSrc: assets.surfeLogo.src,
    previewWidth: assets.surfeLogo.width,
    previewHeight: assets.surfeLogo.height,
  };

  // TODO: COPY: Figma sample photo (node 3842:40146, exported at its 69px size).
  const AUTHOR_PHOTO: SanityImage & PreviewImage = {
    previewSrc: assets.authorPhoto.src,
    previewWidth: assets.authorPhoto.width,
    previewHeight: assets.authorPhoto.height,
  };

  // TODO: COPY: Figma sample website screenshot (node 3842:40093, the visible 965 × 612 part).
  const WEBSITE_SCREENSHOT: SanityImage & PreviewImage = {
    alt: 'Surfe website homepage',
    previewSrc: assets.websiteScreenshot.src,
    previewWidth: assets.websiteScreenshot.width,
    previewHeight: assets.websiteScreenshot.height,
  };

  let n = 0;
  const span = (text: string, marks: string[] = []) => ({ _type: 'span', text, marks });
  const block = (
    style: 'normal' | 'h2' | 'h3' | 'blockquote',
    children: ReturnType<typeof span>[],
    extra: Partial<CaseStudyBodyBlock> = {},
  ): CaseStudyBodyBlock => ({ _key: `fx${(n += 1)}`, _type: 'block', style, children, markDefs: [], ...extra });
  const p = (text: string) => block('normal', [span(text)]);
  const bullet = (text: string) => block('normal', [span(text)], { listItem: 'bullet', level: 1 });

  // TODO: COPY: Figma sample body (3842:40186), word for word.
  const body: CaseStudyBodyItem[] = [
    block('h2', [span('Overview')]),
    p(
      'Surfe is a pipeline generation tool that connects LinkedIn to your CRM — helping sales teams capture leads, sync data, and book more meetings. Their product was converting trial users into paying customers at strong rates. The problem was getting people to the trial in the first place.',
    ),
    p(
      'When Surfe\'s marketing team first reached out, they described their website as "a blocker, not a lever." Pages took over three seconds to load. The CMS was rigid, making campaign landing pages a two-week engineering project. And despite strong brand recognition in the sales community, conversion on the homepage was well below industry benchmarks.',
    ),
    p(
      "Our mandate was clear: design and build a site that matches Surfe's product quality and gives the marketing team the tools to grow without waiting on engineers.",
    ),
    block('h2', [span('The Challenge')]),
    p(
      'Surfe operates in a crowded market — LinkedIn prospecting tools are everywhere, and visitors arrive skeptical. The previous site compounded this with a homepage that led with features rather than outcomes, and a demo booking flow buried three clicks deep.',
    ),
    block('blockquote', [span('"Our homepage was built to explain the product. What it needed to do was make people want it."')]),
    p('Three specific constraints shaped our scope:'),
    bullet('A legacy codebase with no component system — every change required a senior developer.'),
    bullet('No clear analytics on which pages or CTAs were driving demo requests.'),
    bullet('A multi-language roadmap (EN, FR, DE) that had to be architected from day one.'),
    p(
      'Page speed was also a silent killer. Core Web Vitals were failing across mobile, and Surfe was losing organic rankings to lighter-weight competitors with lower-quality content but faster pages.',
    ),
    block('h2', [span('Our Approach')]),
    p('We ran a structured 10-week engagement broken into two phases: strategic redesign followed by Webflow build and optimisation.'),
    block('h3', [span('Phase 1 — Strategy & Design')]),
    p(
      'We started with a four-day discovery sprint: stakeholder interviews, heatmap reviews, competitor audits, and a full conversion copy review. The core finding was that Surfe\'s value proposition — "your CRM, updated automatically from LinkedIn" — wasn\'t landing until the third paragraph of the homepage.',
    ),
    p(
      'We restructured every key page around a simple framework: lead with the outcome, prove it with social evidence, then make the next step obvious. The homepage hero became outcome-first: "Book more meetings. Update your CRM automatically." The demo CTA moved to persistent header placement.',
    ),
    {
      _key: `fx${(n += 1)}`,
      _type: 'caseStudyCallout',
      title: 'Deliverables — Design Phase',
      items: [
        'Full Figma design system with 60+ components',
        'Homepage, pricing, features, and 4 use-case pages',
        'Conversion copy for all hero sections and CTAs',
        'Mobile-first responsive layouts (390px → 1440px)',
        'i18n-ready CMS architecture for EN/FR/DE',
      ],
    },
    block('h3', [span('Phase 2 — Webflow Build & Optimisation')]),
    p(
      "With approved designs in hand, we moved into a six-week Webflow build. We built a custom component library using Webflow's native CMS, Finsweet's CMS Filter for dynamic filtering, and a HubSpot-embedded demo booking flow that bypasses iFrame lag on mobile.",
    ),
    p(
      'Core Web Vitals optimisation ran in parallel. Every image was converted to AVIF with WebP fallbacks, fonts were subset to the language variants actually used, and a custom Webflow edge-cache configuration was implemented via Cloudflare.',
    ),
  ];

  // TODO: COPY: Figma sample related cards (3842:40273): Surfe, placeholder title, "01/01/01".
  const card = (i: number): CaseStudyCard => ({
    _id: `fixture-case-study-${i}`,
    _type: 'caseStudy',
    title: 'Lorem ipsum dolor sit amet consectetur.',
    slug: `lorem-ipsum-${i}`,
    publishedAt: '2001-01-01',
    client: { _id: 'fixture-client-surfe', name: 'Surfe', logo: SURFE_LOGO },
    // TODO: COPY: Figma card stats placeholders (3798:19226).
    cardStats: [
      { value: 'XXX', label: 'Lorem ipsum' },
      { value: 'XXX', label: 'Lorem ipsum' },
    ],
  });

  const cards: CaseStudyCard[] = [card(1), card(2), card(3)];

  // TODO: COPY: Figma sample hero, facts, quote and results (3842:40061, 3842:40102, 3842:40140, 3842:40247).
  const caseStudy: CaseStudy = {
    _id: 'fixture-case-study-0',
    _type: 'caseStudy',
    _updatedAt: '2023-01-04T00:00:00Z',
    title: 'Lorem ipsum dolor sit amet consectetur. Sed augue nisi.',
    slug: 'lorem-ipsum',
    publishedAt: '2023-01-04',
    readTime: 9,
    intro:
      'Lorem ipsum dolor sit amet consectetur. Eget lacinia vestibulum erat nunc diam aliquet. Auctor risus lectus ac in mattis. Imperdiet morbi eget dolor vitae.',
    industry: 'Pipeline Generation / SaaS',
    challenge:
      'A legacy SCA tool kept reporting a clean bill of health while secrets, supply chain and license risks hid across a multi-language codebase.',
    // Lead 2026-10-22: "BenorMedia" (the schema's initial value; Figma "Benor Media").
    solution: 'BenorMedia',
    timeline: '10 weeks',
    stack: ['Webflow', 'Finsweet', 'HubSpot'],
    client: {
      _id: 'fixture-client-surfe',
      _type: 'client',
      name: 'Surfe',
      logo: SURFE_LOGO,
      websiteScreenshot: WEBSITE_SCREENSHOT,
      // Figma URL bar shows "yoursite.com"; the button needs a real address.
      websiteUrl: 'https://www.surfe.com',
    },
    // TODO: COPY: Figma card stats placeholders (3798:19226).
    cardStats: [
      { value: 'XXX', label: 'Lorem ipsum' },
      { value: 'XXX', label: 'Lorem ipsum' },
    ],
    services: [
      { _id: 'fixture-service-1', name: 'Web Design', slug: 'web-design' },
      { _id: 'fixture-service-2', name: 'Web Development', slug: 'web-development' },
      { _id: 'fixture-service-3', name: 'Technical SEO', slug: 'technical-seo' },
    ],
    testimonial: {
      _id: 'fixture-testimonial',
      _type: 'testimonial',
      quote:
        "Working with Benor Media was a turning point for Surfe. They didn't just rebuild our website — they reimagined it as a growth engine. Within two months of launch, our demo bookings had more than doubled and our sales team was fielding warmer, more qualified inbound leads.",
      authorName: 'Thibaut Davoult',
      authorRole: 'Head of Growth, Surfe',
      authorPhoto: AUTHOR_PHOTO,
    },
    body,
    resultsIntro:
      'Surfe went live in October 2024. Within 90 days, the results across every key metric exceeded projections. The marketing team now ships new landing pages in hours, not weeks.',
    results: [
      { _key: 'r1', value: '+142%', label: 'Booked Demo Requests', description: 'Within 60 days of launch' },
      { _key: 'r2', value: '+38%', label: 'Organic Traffic Growth', description: '90 days, month-over-month' },
      { _key: 'r3', value: '+12%', label: 'Trial-to-Paid Conversion', description: 'Better-qualified inbound leads' },
    ],
    resultsSummary:
      "Beyond the numbers, the most significant change was organisational. Surfe's growth team went from depending on engineering for every site update to shipping independently. In Q4 alone, they launched six new campaign pages without a single engineering ticket.",
    related: cards,
    latest: [],
    seo: null,
  };

  return { caseStudy, cards };
}
