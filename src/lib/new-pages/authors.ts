/**
 * Article authors: the profile behind each author page (/authors/<slug>)
 * and the photo shown in the blog template's author card, matched on the
 * name in the front matter `author` (the text before the first comma). No
 * match → the BenorMedia mark and no profile link.
 */
import { SITE } from "../content/entity";

export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  photo: { src: string; w: number; h: number };
  /** Meta description of the author page. */
  description: string;
  /** Bio paragraphs (lead 2026-10-08: drafted by Claude, lead to review). */
  bio: string[];
  /** Profile links: the page's social icons and the Person `sameAs`. */
  linkedin: string;
  knowsAbout: string[];
}

export const AUTHORS: readonly Author[] = [
  {
    slug: "sergio-gancedo",
    name: "Sergio Gancedo",
    jobTitle: "Managing Director, BenorMedia",
    photo: { src: "/images/new-pages/authors/sergio-gancedo.webp", w: 216, h: 216 },
    description: "Sergio Gancedo is the Managing Director of BenorMedia, a Webflow agency for B2B SaaS. Read his guides on Webflow, migrations and SaaS web design.",
    bio: [
      "Sergio Gancedo is the Managing Director of BenorMedia, a Webflow agency based in Barcelona that designs, builds and grows websites for B2B SaaS and tech companies.",
      "He leads the agency's website projects from strategy to launch: Webflow builds, migrations from WordPress and other platforms, and the technical SEO that keeps rankings intact through a move. His focus is on websites that marketing teams can run on their own after launch.",
      "On the BenorMedia guides he writes about Webflow, website migrations, B2B SaaS web design and search, drawing on the agency's client work.",
    ],
    linkedin: "https://www.linkedin.com/in/sergio-gancedo/",
    knowsAbout: ["Webflow development", "Webflow migrations", "B2B SaaS website design", "Technical SEO"],
  },
];

const nameOf = (author: string): string => author.split(",")[0]?.trim() ?? "";

export const findAuthor = (author: string): Author | undefined => AUTHORS.find((a) => a.name === nameOf(author));

export const authorPath = (a: Author): string => `/authors/${a.slug}`;

/** Person JSON-LD `@id`: the author page's entity, shared with the articles. */
export const authorId = (a: Author): string => `${SITE}${authorPath(a)}#person`;
