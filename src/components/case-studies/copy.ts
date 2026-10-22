/**
 * Case study template and index labels. Strings that already exist in
 * `src/lib/new-pages/copy.json` are reused from there; every other string
 * is the Figma placeholder (index 3764:15808, template 3764:16012) and is
 * `TODO: COPY` until the lead sends the final wording (DECISIONS → Case
 * studies, 2026-10-20: all case-study copy is placeholder).
 */
import copy from '../../lib/new-pages/copy.json';

/** Route of the index; detail pages are `/case-studies/<slug>`. */
export const CASE_STUDIES_PATH = '/case-studies';

export const caseStudyHref = (slug: string): string => `${CASE_STUDIES_PATH}/${slug}`;

/** Card date, the Figma pattern "01/01/01" (lead 2026-10-20, round 2): MM/DD/YY from `YYYY-MM-DD`. */
export function formatShortDate(iso: string): string {
  const [y = '', m = '', d = ''] = iso.split('-');
  return `${m.padStart(2, '0')}/${d.slice(0, 2).padStart(2, '0')}/${y.slice(-2)}`;
}

export const CASE_STUDY_COPY = {
  // TODO: COPY: Figma tag label (card, hero).
  tag: 'Case study',
  // TODO: COPY: Figma "Published on 01/01/01"; date in the blog format (lead 2026-10-20).
  published: 'Published on {date}',
  learnMore: copy.resources.learnMore,
  breadcrumb: {
    home: copy.livePathNames['/'],
    // TODO: COPY: Figma breadcrumb level 2.
    index: 'Case studies',
  },
  // TODO: COPY: Figma facts row labels (3842:40102, "01 / Client" … "06 / Stack"), numbered in code.
  facts: {
    client: 'Client',
    industry: 'Industry',
    services: 'Services delivered',
    solution: 'Solution',
    timeline: 'Timeline',
    stack: 'Stack',
  },
  // aria-label of the facts row (no visible heading in Figma).
  factsLabel: 'Project facts',
  // TODO: COPY: Figma hero button (3842:40095).
  visitSite: 'Visit live site',
  // TODO: COPY: same text as ClientList / ClientCard (hardcoded there, not in copy.json).
  newTab: ' (opens in a new tab)',
  // TODO: COPY: Figma results heading (also the last table of contents item).
  resultsHeading: 'The results',
  related: {
    // TODO: COPY: Figma related section eyebrow (3764:16203), shown uppercase by Eyebrow
    // (lead 2026-10-21, replaces "Resources").
    eyebrow: 'Case studies',
    // TODO: COPY: Figma placeholder heading (3764:16208), one line at 1440.
    heading: 'Lorem ipsum dolor sit',
  },
  indexHero: {
    // TODO: COPY: Figma index hero (3767:25928): eyebrow, two-line title with the
    // second line in the gradient, description. All three are placeholders.
    eyebrow: 'Case studies',
    title: 'Case Studies\nlorem ipsum',
    accent: 'lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet consectetur. Senectus nec gravida blandit et ultricies donec eu orci. Scelerisque lectus tristique iaculis duis.',
  },
} as const;
