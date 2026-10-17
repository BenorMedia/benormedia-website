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
    photo: { src: "/images/new-pages/authors/sergio-gancedo.png", w: 129, h: 129 }, // lead 2026-10-17
    description: "Sergio Gancedo is the Managing Director of BenorMedia, a Webflow agency for B2B SaaS. Read his guides on Webflow, migrations and SaaS web design.",
    bio: [
      "Sergio Gancedo is the Managing Director of BenorMedia, a Webflow agency based in Barcelona that designs, builds and grows websites for B2B SaaS and tech companies.",
      "He leads the agency's website projects from strategy to launch: Webflow builds, migrations from WordPress and other platforms, and the technical SEO that keeps rankings intact through a move. His focus is on websites that marketing teams can run on their own after launch.",
      "On the BenorMedia guides he writes about Webflow, website migrations, B2B SaaS web design and search, drawing on the agency's client work.",
    ],
    linkedin: "https://www.linkedin.com/in/sergio-gancedo/",
    knowsAbout: ["Webflow development", "Webflow migrations", "B2B SaaS website design", "Technical SEO"],
  },
  {
    // Lead 2026-10-17: title from the lead; bio drafted by Claude at the
    // lead's request (role and topics only, no dates, employers or clients).
    slug: "david-garay",
    name: "David Garay",
    jobTitle: "Webflow Developer and UX/UI Designer, BenorMedia",
    photo: { src: "/images/new-pages/authors/david-garay.png", w: 129, h: 129 },
    description: "David Garay is a Webflow Developer and UX/UI Designer at BenorMedia. Read his articles on B2B buyers, redesign timelines, Webflow pricing and CRO.",
    bio: [
      "David Garay is a Webflow Developer and UX/UI Designer at BenorMedia, a Webflow agency based in Barcelona that designs, builds and grows websites for B2B SaaS and tech companies.",
      "He designs and builds client websites in Webflow, from wireframes and user flows to the finished pages, with a focus on clear layouts that help buyers find what they need and on sites that marketing teams can update on their own.",
      "On the BenorMedia blog he writes about the business side of a B2B website: what software buyers look for before a sales call, how long a redesign takes, what Webflow's plan changes mean for your budget, and how to find what stops visitors from converting.",
    ],
    linkedin: "https://www.linkedin.com/in/david-garay19/",
    knowsAbout: ["Webflow development", "UX design", "UI design", "Website redesign planning", "Conversion rate optimization"],
  },
];

const nameOf = (author: string): string => author.split(",")[0]?.trim() ?? "";

export const findAuthor = (author: string): Author | undefined => AUTHORS.find((a) => a.name === nameOf(author));

export const authorPath = (a: Author): string => `/authors/${a.slug}`;

/** Person JSON-LD `@id`: the author page's entity, shared with the articles. */
export const authorId = (a: Author): string => `${SITE}${authorPath(a)}#person`;
