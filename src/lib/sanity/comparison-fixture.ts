/**
 * Placeholder comparison for the `/dev/comparison` preview only (DECISIONS
 * → Comparison 2026-10-22: drafts never render, so the template is
 * reviewed with in-code data). Typed as the `COMPARISON_BY_SLUG` /
 * `ALL_COMPARISONS` results.
 *
 * Copy: Figma template 3790:37245 (Webflow vs WordPress) word for word.
 * TODO: COPY: the Figma lorem blocks (hero subtitle, "What to choose"
 * paragraph, case studies paragraph, index card titles and descriptions)
 * stay visible as they are in Figma, and the FAQ is the Pricing FAQ
 * (`PRICING_FAQ_GROUPS`, the questions Figma shows; lead: placeholder).
 * Stats: Figma "+X%", "0", "X" and "[source]" are `[FACT NEEDED: …]`
 * markers, never numbers (house rule). Never use this file on a real page,
 * in `copy.ts` or in Sanity. The page that imports it is not built in
 * production (`src/pages/dev/comparison/[...preview].astro`).
 *
 * Images: Figma exports in `src/assets/comparison/` (ui handoff
 * 2026-10-22). The dev page reads the competitor-side files from disk at
 * render time and passes them in as data URIs (`createComparisonFixture`),
 * as `/dev/case-study` does; the Webflow side is fixed in the components.
 */
import type { PreviewImage } from '../../components/case-studies/image';
import type { FaqGroup } from '../content/faqs';
import type { FixtureAsset } from './case-study-fixture';
import type {
  AccentTitle,
  CaseStudyCard,
  Comparison,
  ComparisonCard,
  PortableTextBlock,
  SanityImage,
  ServiceFaqSection,
} from './types';

type FixtureImage = SanityImage & PreviewImage & { previewSvg?: boolean };

export interface ComparisonFixtureAssets {
  wordpressLogo: FixtureAsset;
  wordpressLogoWhite: FixtureAsset;
  framerLogo: FixtureAsset;
  wixLogo: FixtureAsset;
  chooseWordpress: FixtureAsset;
  reasonWebflowDesigner: FixtureAsset;
  reasonPluginsVsUpdates: FixtureAsset;
  reasonPerformanceAi: FixtureAsset;
  reasonCmsLocalization: FixtureAsset;
  stepAudit: FixtureAsset;
  stepDesignBuild: FixtureAsset;
  stepCmsSeo: FixtureAsset;
  stepLaunch: FixtureAsset;
}

const img = (asset: FixtureAsset, alt: string): FixtureImage => ({
  alt,
  previewSrc: asset.src,
  previewWidth: asset.width,
  previewHeight: asset.height,
  previewSvg: asset.src.startsWith('data:image/svg'),
});

let n = 0;
const key = (): string => `cfx${(n += 1)}`;

/** One-block `accentTitle`; `accent` = the part shown in the gradient. */
function title(text: string, accent?: string): AccentTitle {
  const i = accent ? text.indexOf(accent) : -1;
  const parts =
    accent && i >= 0
      ? [
          { text: text.slice(0, i), marks: [] as string[] },
          { text: accent, marks: ['accent'] },
          { text: text.slice(i + accent.length), marks: [] as string[] },
        ].filter((p) => p.text.length > 0)
      : [{ text, marks: [] as string[] }];
  return [{ _key: key(), _type: 'block', children: parts.map((p) => ({ _key: key(), _type: 'span' as const, ...p })) }];
}

/** `FaqGroup` (plain answers) → Sanity `faqSection` (Portable Text answers). */
function faqSection(group: FaqGroup): ServiceFaqSection {
  return {
    _key: key(),
    title: group.label,
    faqs: group.items.map((item) => ({
      _key: key(),
      question: item.question,
      answer: item.answer.split(/\n\s*\n/).map(
        (paragraph): PortableTextBlock => ({
          _key: key(),
          _type: 'block',
          children: [{ _key: key(), _type: 'span', text: paragraph, marks: [] }],
          markDefs: [],
        }),
      ),
    })),
  };
}

/** The fixture comparison (Webflow vs WordPress) and three index cards. */
export function createComparisonFixture(
  assets: ComparisonFixtureAssets,
  { caseStudies, faqGroups }: { caseStudies: CaseStudyCard[]; faqGroups: readonly FaqGroup[] },
): { comparison: Comparison; cards: ComparisonCard[] } {
  const WORDPRESS_LOGO = img(assets.wordpressLogo, 'WordPress');

  const comparison: Comparison = {
    _id: 'fixture-comparison-wordpress',
    _type: 'comparison',
    _updatedAt: '2026-10-22T00:00:00Z',
    title: 'Webflow vs WordPress',
    slug: 'webflow-vs-wordpress',
    publishedAt: '2026-10-22',
    competitorName: 'WordPress',
    competitorLogo: WORDPRESS_LOGO,
    competitorLogoOnDark: img(assets.wordpressLogoWhite, 'WordPress'),
    // Figma 3790:37360, word for word ("Wordpress" spelled as in Figma).
    headline: title("Wordpress wasn't built for SaaS. Webflow was.", 'Webflow was.'),
    // TODO: COPY: Figma lorem (3790:37362).
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Libero non nisl dictum morbi sed eu condimentum. Sit eget amet ac sagittis nam in pharetra nec.',
    primaryButtonLabel: "Let's talk about your migration",
    secondaryButtonLabel: 'View comparison',
    chooseHeader: {
      eyebrow: 'What to choose',
      title: title('Which one is right for your team?'),
      // TODO: COPY: Figma lorem (3790:37375).
      description: 'Lorem ipsum dolor sit amet consectetur. Maecenas blandit consequat maecenas vel malesuada.',
    },
    webflowChoice: {
      title: title('Choose Webflow if…', 'Webflow'),
      reasons: [
        'Your marketing team needs to ship pages without waiting on developers.',
        'You want a fast, secure site with no plugins to patch.',
        'Design quality and brand consistency matter as you scale.',
      ],
    },
    competitorChoice: {
      image: img(assets.chooseWordpress, 'WordPress admin dashboard showing the Themes screen on a laptop'),
      title: title('Choose WordPress if…'),
      reasons: [
        'You need a very specific plugin with no Webflow equivalent.',
        'You have an in-house WordPress dev team you want to keep busy.',
        'Your site is mostly a blog with little custom design.',
      ],
    },
    tableHeader: {
      // Figma 3834:38132 repeats "What to choose" here (likely a copy slip; kept word for word).
      eyebrow: 'What to choose',
      title: title('Webflow vs WordPress, side by side', 'side by side'),
      description: 'Grouped by what actually matters to a SaaS marketing team.',
    },
    tableGroups: [
      {
        _key: key(),
        label: 'Performance',
        rows: [
          { _key: key(), feature: 'Hosting & speed', webflow: 'Global CDN and hosting included, optimized by default', competitor: 'Depends on your host, theme and plugin stack' },
          { _key: key(), feature: 'Core Web Vitals', webflow: 'Clean code, no plugin bloat', competitor: 'Requires caching and optimization plugins' },
        ],
      },
      {
        _key: key(),
        label: 'SEO & AEO',
        rows: [
          { _key: key(), feature: 'Technical SEO', webflow: 'Built-in meta, sitemaps, redirects and schema', competitor: 'Handled through third-party plugins' },
          { _key: key(), feature: 'AI search readiness', webflow: 'Semantic structure ready for ChatGPT, Perplexity and Google AI', competitor: 'Varies by theme quality' },
        ],
      },
      {
        _key: key(),
        label: 'Editing & design',
        rows: [
          { _key: key(), feature: 'Visual editing', webflow: 'Marketers edit directly on the page', competitor: 'Page builders or developer help' },
          { _key: key(), feature: 'Design freedom', webflow: 'Pixel-perfect, no theme limits', competitor: 'Bound by the theme or custom dev' },
          { _key: key(), feature: 'CMS', webflow: 'Custom collections, no code', competitor: 'Flexible, often needs custom fields plugins' },
        ],
      },
      {
        _key: key(),
        label: 'Security & maintenance',
        rows: [
          { _key: key(), feature: 'Updates', webflow: 'Managed platform, nothing to update', competitor: 'Core, theme and plugin updates to manage' },
          { _key: key(), feature: 'Security', webflow: 'SSL, DDoS protection and backups included', competitor: 'Depends on plugins and hosting' },
        ],
      },
      {
        _key: key(),
        label: 'Scale & cost',
        rows: [
          { _key: key(), feature: 'Localization', webflow: 'Native localization', competitor: 'Multilingual plugins' },
          { _key: key(), feature: 'Total cost', webflow: 'Predictable plan pricing', competitor: 'Free core, variable hosting, plugin and dev costs' },
        ],
      },
    ],
    reasonsHeader: {
      eyebrow: 'Why SaaS teams switch',
      title: title('Four reasons Webflow wins for B2B marketing sites'),
    },
    reasons: [
      {
        _key: key(),
        image: img(assets.reasonWebflowDesigner, 'Mock Webflow Designer editing a page heading that reads Launch pages that actually convert'),
        title: 'Marketing ships pages without developers',
        text: 'Launch landing pages, update pricing or publish a case study the same day. Anyone on your team can update, maintain and scale the site.',
        // Figma 3790:39797: "+X%" twice, same label.
        stats: [
          { _key: key(), value: '[FACT NEEDED: faster page launches figure, Figma "+X%"]', label: 'faster page launches' },
          { _key: key(), value: '[FACT NEEDED: second figure, Figma "+X%"]', label: 'faster page launches' },
        ],
      },
      {
        _key: key(),
        image: img(
          assets.reasonPluginsVsUpdates,
          "Mock WordPress plugins list with pending updates, next to a mock Webflow site panel reading Everything's up to date",
        ),
        title: 'Zero plugins to patch, fewer risks',
        text: 'No core, theme or plugin updates breaking your site on a Friday. Hosting, security and backups are handled by the platform.',
        stats: [{ _key: key(), value: '[FACT NEEDED: plugins to maintain, Figma "0"]', label: 'plugins to maintain' }],
      },
      {
        _key: key(),
        image: img(assets.reasonPerformanceAi, 'Mock performance audit report next to a mock AI search answer that cites a website'),
        title: 'Built for SEO and AI search',
        text: 'Clean, semantic code and built-in SEO controls help you rank on Google and get cited by ChatGPT, Perplexity and Google AI.',
        stats: [
          {
            _key: key(),
            value: '[FACT NEEDED: organic traffic lift, Figma "+X%"]',
            label: 'organic traffic lift',
            source: '[FACT NEEDED: source]',
          },
        ],
      },
      {
        _key: key(),
        image: img(assets.reasonCmsLocalization, 'Mock CMS collection of case studies with English, Spanish, German and French localized pages'),
        title: 'Scales with your product',
        text: 'CMS collections, localization and a component system keep the site consistent as you add products, markets and pages.',
        stats: [
          {
            _key: key(),
            value: '[FACT NEEDED: pages managed by one team, Figma "X"]',
            label: 'pages managed by one team',
            source: '[FACT NEEDED: source]',
          },
        ],
      },
    ],
    migrationHeader: {
      eyebrow: 'WordPress → Webflow',
      title: title('How we migrate you without losing a ranking'),
    },
    migrationSteps: [
      { _key: key(), name: 'Audit', description: 'We map every page, URL, CMS item and ranking keyword on your current WordPress site.', image: img(assets.stepAudit, '') },
      { _key: key(), name: 'Design & build', description: 'A new Webflow site on a scalable component system, designed around conversion.', image: img(assets.stepDesignBuild, '') },
      { _key: key(), name: 'CMS & SEO migration', description: 'Content moved to Webflow CMS, 301 redirects set and metadata preserved.', image: img(assets.stepCmsSeo, '') },
      { _key: key(), name: 'Launch & monitor', description: 'Go live, then track rankings, traffic and Core Web Vitals after launch.', image: img(assets.stepLaunch, '') },
    ],
    caseStudiesHeader: {
      eyebrow: 'Case studies',
      title: title('Trusted to power\nmillions of products'),
      // TODO: COPY: Figma lorem (3790:37776).
      description:
        'Lorem ipsum dolor sit amet consectetur. Maecenas blandit consequat maecenas vel malesuada. Id facilisis etiam urna fermentum quisque porttitor.',
    },
    caseStudies,
    latestCaseStudies: [],
    faqSections: faqGroups.map(faqSection),
    seo: null,
  };

  // TODO: COPY: Figma index cards (3790:37994 / 38015 / 38036): lorem titles and descriptions.
  const LOREM_TITLE = 'Lorem ipsum dolor sit amet consectetur.';
  const LOREM_TEXT = 'Lorem ipsum dolor sit amet consectetur. Faucibus congue maecenas ac diam tellus diam id. Tempor pretium et sem mauris.';
  const card = (id: string, name: string, slug: string, logo: FixtureImage): ComparisonCard => ({
    _id: `fixture-comparison-${id}`,
    _type: 'comparison',
    title: `Webflow vs ${name}`,
    slug,
    publishedAt: '2026-10-22',
    competitorName: name,
    competitorLogo: logo,
    cardTitle: LOREM_TITLE,
    cardDescription: LOREM_TEXT,
  });
  const cards: ComparisonCard[] = [
    card('wordpress', 'WordPress', 'webflow-vs-wordpress', WORDPRESS_LOGO),
    card('framer', 'Framer', 'webflow-vs-framer', img(assets.framerLogo, 'Framer')),
    card('wix', 'Wix', 'webflow-vs-wix', img(assets.wixLogo, 'Wix')),
  ];

  return { comparison, cards };
}
