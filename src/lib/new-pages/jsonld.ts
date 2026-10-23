/**
 * JSON-LD for the new pages (brief 5.6), on the shared entity constants
 * (`src/lib/content/entity.ts`) and in the live service pages' pattern: one
 * object per `<script>` (rendered with `JsonLd.astro`).
 *
 *   commercial  Service, FAQPage, BreadcrumbList (no offers, no author)
 *   article     Article, FAQPage, BreadcrumbList
 *   author      ProfilePage (mainEntity Person), BreadcrumbList
 *   blog index  CollectionPage (mainEntity ItemList of the posts), BreadcrumbList
 *
 * FAQPage comes from the same array as the visible FAQ. In the review view,
 * items that hold a gap marker are left out. BreadcrumbList keeps only
 * released and live levels (`links.ts`), renumbered from 1.
 */
import { AREA_SERVED_LD, ORG_ID, PROVIDER_LD, SITE, WEBSITE_ID } from "../content/entity";
import type { NpPage } from "./loader";
import { authorId, authorPath, findAuthor, type Author } from "./authors";

type Ld = Record<string, unknown>;

const abs = (url: string): string => (url === "/" ? `${SITE}/` : `${SITE}${url}`);

/** Article author (brief 5.6): the Organization for "BenorMedia team" or an
 *  unanswered marker, else a Person "Name, Job title". A registered author
 *  (`authors.ts`) also gets the author page's `@id`, `url` and `sameAs`. */
function authorLd(page: NpPage): Ld {
  const text = page.author.text;
  if (page.author.hasGap || !text || text === "BenorMedia team") return { ...PROVIDER_LD };
  const comma = text.indexOf(",");
  const name = comma >= 0 ? text.slice(0, comma).trim() : text;
  const jobTitle = comma >= 0 ? text.slice(comma + 1).trim() : "";
  const a = findAuthor(text);
  const profile = a ? { "@id": authorId(a), url: abs(authorPath(a)), sameAs: [a.linkedin] } : {};
  return { "@type": "Person", ...profile, name, ...(jobTitle ? { jobTitle } : {}), worksFor: { ...PROVIDER_LD } };
}

/** Author page: a ProfilePage about the Person (the same `@id` the articles'
 *  `author` points to) and its breadcrumb. `dateModified` = the latest
 *  `updatedAt` of the author's articles. */
export function authorPageJsonLd(a: Author, articles: readonly NpPage[]): Ld[] {
  const url = abs(authorPath(a));
  const dates = articles.map((p) => p.updatedAt).filter(Boolean).sort();
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${url}#profile`,
      url,
      name: a.name,
      inLanguage: "en-US",
      ...(dates.length > 0 ? { dateModified: dates[dates.length - 1] } : {}),
      mainEntity: {
        "@type": "Person",
        "@id": authorId(a),
        name: a.name,
        url,
        image: abs(a.photo.src),
        jobTitle: a.jobTitle.split(",")[0]?.trim(),
        description: a.bio[0],
        worksFor: { ...PROVIDER_LD },
        sameAs: [a.linkedin],
        knowsAbout: a.knowsAbout,
      },
      hasPart: articles.map((p) => ({ "@type": "Article", "@id": `${abs(p.url)}#article`, headline: p.h1, url: abs(p.url) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
        { "@type": "ListItem", position: 2, name: a.name, item: url },
      ],
    },
  ];
}

/** The /blog index: a CollectionPage whose main entity lists the posts built
 *  in this mode (newest first), each pointing at its Article `@id`, and the
 *  breadcrumb. `dateModified` = the latest `updatedAt` of those posts. */
export function blogIndexJsonLd(meta: { name: string; description: string }, posts: readonly NpPage[]): Ld[] {
  const url = abs("/blog");
  const dates = posts.map((p) => p.updatedAt).filter(Boolean).sort();
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.name,
      description: meta.description,
      inLanguage: "en-US",
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { ...PROVIDER_LD },
      ...(dates.length > 0 ? { dateModified: dates[dates.length - 1] } : {}),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: posts.length,
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "Article", "@id": `${abs(p.url)}#article`, headline: p.h1, url: abs(p.url), datePublished: p.publishedAt },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
        { "@type": "ListItem", position: 2, name: meta.name, item: url },
      ],
    },
  ];
}

/** A Sanity collection index (`/case-studies`, `/comparison`): the same
 *  CollectionPage + BreadcrumbList as `/blog` (lead 2026-10-21), listing the
 *  published documents as Articles at `<basePath>/<slug>`. */
function collectionIndexJsonLd(
  basePath: string,
  meta: { name: string; description: string },
  items: readonly { title: string; slug: string; publishedAt: string }[],
): Ld[] {
  const url = abs(basePath);
  const dates = items.map((c) => c.publishedAt).filter(Boolean).sort();
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.name,
      description: meta.description,
      inLanguage: "en-US",
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { ...PROVIDER_LD },
      ...(dates.length > 0 ? { dateModified: dates[dates.length - 1] } : {}),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((c, i) => {
          const itemUrl = abs(`${basePath}/${c.slug}`);
          return {
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Article", "@id": `${itemUrl}#article`, headline: c.title, url: itemUrl, datePublished: c.publishedAt },
          };
        }),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
        { "@type": "ListItem", position: 2, name: meta.name, item: url },
      ],
    },
  ];
}

/** `/case-studies`: the published case studies (lead 2026-10-21). */
export function caseStudiesIndexJsonLd(
  meta: { name: string; description: string },
  cards: readonly { title: string; slug: string; publishedAt: string }[],
): Ld[] {
  return collectionIndexJsonLd("/case-studies", meta, cards);
}

/** `/comparison`: the published comparisons, same shape as `/case-studies`. */
export function comparisonIndexJsonLd(
  meta: { name: string; description: string },
  cards: readonly { title: string; slug: string; publishedAt: string }[],
): Ld[] {
  return collectionIndexJsonLd("/comparison", meta, cards);
}

export function pageJsonLd(page: NpPage): Ld[] {
  const url = abs(page.url);
  const out: Ld[] = [];

  if (page.family === "commercial") {
    out.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.service.name,
      ...(page.service.alternateName.length > 0 ? { alternateName: page.service.alternateName } : {}),
      serviceType: page.service.serviceType,
      url,
      description: page.description,
      provider: PROVIDER_LD,
      areaServed: AREA_SERVED_LD,
      audience: { "@type": "BusinessAudience", audienceType: page.service.audience ?? "B2B SaaS and tech companies" },
    });
  } else {
    out.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: page.h1,
      description: page.description,
      url,
      mainEntityOfPage: url,
      inLanguage: page.lang,
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
      author: authorLd(page),
      publisher: { ...PROVIDER_LD, "@id": ORG_ID },
    });
  }

  const faq = page.faq.filter((item) => !item.hasGap && item.q && item.a);
  if (faq.length > 0) {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (page.breadcrumbLd.length > 0) {
    out.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumbLd.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: abs(item.url),
      })),
    });
  }
  return out;
}

/** A case study (`/case-studies/<slug>`, Sanity `caseStudy`): an Article by
 *  and published by the Organization, `about` the client, and the
 *  breadcrumb (`NpCrumbs` prints none). No offers. `dateModified` and
 *  `image` (an absolute URL) are omitted when not given. */
export function caseStudyJsonLd(cs: {
  url: string;
  headline: string;
  description?: string | undefined;
  datePublished: string;
  dateModified?: string | undefined;
  image?: string | undefined;
  client?: { name?: string | undefined; websiteUrl?: string | undefined } | null | undefined;
  crumbs: readonly { name: string; url: string }[];
}): Ld[] {
  const url = abs(cs.url);
  const clientName = cs.client?.name?.trim();
  const clientUrl = cs.client?.websiteUrl?.trim();
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: cs.headline,
      ...(cs.description ? { description: cs.description } : {}),
      url,
      mainEntityOfPage: url,
      inLanguage: "en-US",
      datePublished: cs.datePublished,
      ...(cs.dateModified ? { dateModified: cs.dateModified } : {}),
      ...(cs.image ? { image: cs.image } : {}),
      author: { ...PROVIDER_LD },
      publisher: { ...PROVIDER_LD },
      ...(clientName
        ? { about: { "@type": "Organization", name: clientName, ...(clientUrl ? { url: clientUrl } : {}) } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: cs.crumbs.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: abs(item.url),
      })),
    },
  ];
}

/** A comparison (`/comparison/<slug>`, Sanity `comparison`): an Article by
 *  and published by the Organization, and the breadcrumb (the page prints
 *  none). The FAQPage comes from `FaqSection`. No offers. */
export function comparisonJsonLd(c: {
  url: string;
  headline: string;
  description?: string | undefined;
  datePublished: string;
  dateModified?: string | undefined;
  image?: string | undefined;
  crumbs: readonly { name: string; url: string }[];
}): Ld[] {
  const url = abs(c.url);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: c.headline,
      ...(c.description ? { description: c.description } : {}),
      url,
      mainEntityOfPage: url,
      inLanguage: "en-US",
      datePublished: c.datePublished,
      ...(c.dateModified ? { dateModified: c.dateModified } : {}),
      ...(c.image ? { image: c.image } : {}),
      author: { ...PROVIDER_LD },
      publisher: { ...PROVIDER_LD },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: c.crumbs.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: abs(item.url),
      })),
    },
  ];
}
