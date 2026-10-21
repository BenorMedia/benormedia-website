/**
 * Placeholder case study for the `/dev/case-study` preview only (DECISIONS
 * → Case studies 2026-10-20: drafts never render, so the template is
 * reviewed with in-code data). Typed as the `CASE_STUDY_BY_SLUG` result.
 *
 * TODO: COPY: sample content from Figma (template 3764:16012, lead
 * 2026-10-20 round 2: the dev page reads like the frame). Never use it on a
 * real page, in `copy.ts` or in Sanity. The page that imports this file is
 * not built in production (`src/pages/dev/case-study/[...preview].astro`).
 *
 * Images: exported from Figma into `src/assets/dev/case-study/`. The dev
 * page reads them from disk at render time and passes them in as data URIs
 * (`createCaseStudyFixture`), so a production build, which never renders
 * that page, emits no copy of them.
 */
import type { PreviewImage } from '../../components/case-studies/image';
import type { CaseStudy, CaseStudyBodyBlock, CaseStudyCard, SanityImage } from './types';

export interface FixtureAsset {
  src: string;
  width: number;
  height: number;
}

/** The fixture case study and three cards (the related row and the index card preview). */
export function createCaseStudyFixture(assets: { surfeLogo: FixtureAsset; authorPhoto: FixtureAsset }): {
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

  // TODO: COPY: Figma sample photo (node 3768:26217).
  const AUTHOR_PHOTO: SanityImage & PreviewImage = {
    previewSrc: assets.authorPhoto.src,
    previewWidth: assets.authorPhoto.width,
    previewHeight: assets.authorPhoto.height,
  };

  let n = 0;
  const span = (text: string, marks: string[] = []) => ({ _type: 'span', text, marks });
  const block = (
    style: 'normal' | 'h2' | 'h3',
    children: ReturnType<typeof span>[],
    extra: Partial<CaseStudyBodyBlock> = {},
  ): CaseStudyBodyBlock => ({ _key: `fx${(n += 1)}`, _type: 'block', style, children, markDefs: [], ...extra });
  const p = (text: string) => block('normal', [span(text)]);
  const bullet = (text: string) => block('normal', [span(text)], { listItem: 'bullet', level: 1 });

  const INDICATORS =
    'Lorem ipsum dolor sit amet consectetur. Arcu malesuada venenatis elit vitae eu sit consectetur felis. Mattis ac a sed arcu. Quis sit nisl est purus volutpat sed. Posuere sollicitudin ut massa pellentesque pharetra sed lorem arcu. Feugiat faucibus leo justo in erat quis justo libero.';
  const LIST_ITEM = 'Nisi orci dictum fames consectetur ac turpis pretium ullamcorper purus.';

  // TODO: COPY: Figma sample body (3768:26274), word for word.
  const body: CaseStudyBodyBlock[] = [
    block('h2', [span('The Problem')]),
    p(
      "Guided by Last Click attribution, MagBak's marketing mix was heavily concentrated in bottom-of-funnel activity in Google and Meta. Over time, their addressable audience started to become saturated, and without sufficient demand generation, costs began to rise.",
    ),
    p(
      'The MagBak team and their new growth partners Neon Growth, knew they needed to diversify and embrace a full-funnel approach, but they lacked the granular, full-funnel data they needed confidently navigate the shift. Without it, they were trapped optimizing for an increasingly small, expensive slice of their potential market.',
    ),
    block('h2', [span('The Solution')]),
    p(
      'Partnering with Fospha provided the breakthrough. In September, MagBak onboarded with Fospha, instantly gaining access to year-on-year measurement data, revealing the true performance drivers and hidden opportunities across their entire marketing ecosystem.',
    ),
    block('h3', [span('Phase 1. Optimizing')]),
    p("Armed with Fospha's data, Neon Growth quickly identified key opportunities within MagBak's core Meta and Google campaigns."),
    p(
      'By strategically optimizing their budget within these major channels, they were able to quickly establish a more sustainable full-funnel strategy. This included moving some budget from bottom-of-funnel branded search and shopping towards demand generation initiatives like generic search and YouTube.',
    ),
    p(
      'The Result: The immediate impact was remarkable: within two months, MagBak witnessed a significant turnaround, getting back on track with year-over-year revenue growth by October.',
    ),
    block('h3', [span('Phase 2. Strategic Diversification')]),
    block('normal', [span('The indicators:', ['strong'])]),
    p(INDICATORS),
    p(INDICATORS),
    block('normal', [span('The Strategy:', ['strong'])]),
    p(
      'Lorem ipsum dolor sit amet consectetur. Pulvinar arcu faucibus at orci. Habitant fermentum neque tellus felis orci. Non in nisi amet sed lorem. Nisi orci dictum fames consectetur ac turpis pretium ullamcorper purus. Elementum enim fermentum dapibus volutpat sit.',
    ),
    p(
      'At massa mauris elementum a pharetra amet pellentesque. Eu adipiscing sit mi quisque blandit. Maecenas arcu amet velit egestas nisi semper mauris pharetra nibh.',
    ),
    bullet(LIST_ITEM),
    bullet(LIST_ITEM),
  ];

  // TODO: COPY: Figma sample related cards (3764:16201): Surfe, placeholder title, "01/01/01".
  const card = (i: number): CaseStudyCard => ({
    _id: `fixture-case-study-${i}`,
    _type: 'caseStudy',
    title: 'Lorem ipsum dolor sit amet consectetur.',
    slug: `lorem-ipsum-${i}`,
    publishedAt: '2001-01-01',
    client: { _id: 'fixture-client-surfe', name: 'Surfe', logo: SURFE_LOGO },
  });

  const cards: CaseStudyCard[] = [card(1), card(2), card(3)];

  // TODO: COPY: Figma sample hero, facts, quote and results (3764:16029, 3768:25937, 3768:26212, 3768:26295).
  const caseStudy: CaseStudy = {
    _id: 'fixture-case-study-0',
    _type: 'caseStudy',
    title: 'Lorem ipsum dolor sit amet consectetur. Sed augue nisi.',
    slug: 'lorem-ipsum',
    // Figma "01/04/2023", shown in the blog date format (lead 2026-10-20).
    publishedAt: '2023-01-04',
    readTime: 9,
    intro:
      'Lorem ipsum dolor sit amet consectetur. Eget lacinia vestibulum erat nunc diam aliquet. Auctor risus lectus ac in mattis. Imperdiet morbi eget dolor vitae.',
    industry: 'Pipeline Generation',
    challenge:
      'A legacy SCA tool kept reporting a clean bill of health while secrets, supply chain and license risks hid across a multi-language codebase.',
    client: { _id: 'fixture-client-surfe', _type: 'client', name: 'Surfe', logo: SURFE_LOGO },
    services: [{ _id: 'fixture-service', name: 'Benor Media', slug: 'benor-media' }],
    testimonial: {
      _id: 'fixture-testimonial',
      _type: 'testimonial',
      quote:
        "Their professionalism, knowledge, and expertise in web design, development, and technical SEO have made BenorMedia our preferred partner for both our own site and all our clients' websites.",
      authorName: 'David Chevalier',
      authorRole: 'CEO',
      authorPhoto: AUTHOR_PHOTO,
    },
    body,
    results: [
      { _key: 'r1', value: '+40%', description: 'Lorem ipsum dolor sit amet consectetur. At risus nulla in vel. Nisl duis cursus consectetur nisl etiam.' },
      { _key: 'r2', value: '+30%', description: 'Lorem ipsum dolor sit amet consectetur. At viverra nisi purus mauris. Ornare consequat magna urna.' },
      {
        _key: 'r3',
        value: '+12%',
        description: 'Lorem ipsum dolor sit amet consectetur. Odio pellentesque semper tincidunt lacinia malesuada purus sed nisi in.',
      },
    ],
    related: cards,
    latest: [],
    seo: null,
  };

  return { caseStudy, cards };
}
