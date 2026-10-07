/**
 * JSON-LD for the new pages (brief 5.6), on the shared entity constants
 * (`src/lib/content/entity.ts`) and in the live service pages' pattern: one
 * object per `<script>` (rendered with `JsonLd.astro`).
 *
 *   commercial  Service, FAQPage, BreadcrumbList (no offers, no author)
 *   article     Article, FAQPage, BreadcrumbList
 *
 * FAQPage comes from the same array as the visible FAQ. In the review view,
 * items that hold a gap marker are left out. BreadcrumbList keeps only
 * released and live levels (`links.ts`), renumbered from 1.
 */
import { AREA_SERVED_LD, ORG_ID, PROVIDER_LD, SITE } from "../content/entity";
import type { NpPage } from "./loader";

type Ld = Record<string, unknown>;

const abs = (url: string): string => (url === "/" ? `${SITE}/` : `${SITE}${url}`);

/** Article author (brief 5.6): the Organization for "BenorMedia team" or an
 *  unanswered marker, else a Person "Name, Job title". */
function authorLd(page: NpPage): Ld {
  const text = page.author.text;
  if (page.author.hasGap || !text || text === "BenorMedia team") return { ...PROVIDER_LD };
  const comma = text.indexOf(",");
  const name = comma >= 0 ? text.slice(0, comma).trim() : text;
  const jobTitle = comma >= 0 ? text.slice(comma + 1).trim() : "";
  return { "@type": "Person", name, ...(jobTitle ? { jobTitle } : {}), worksFor: { ...PROVIDER_LD } };
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
      serviceType: page.service.serviceType,
      url,
      description: page.description,
      provider: PROVIDER_LD,
      areaServed: AREA_SERVED_LD,
      audience: { "@type": "BusinessAudience", audienceType: "B2B SaaS and tech companies" },
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
