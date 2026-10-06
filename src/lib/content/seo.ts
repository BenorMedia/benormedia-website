/**
 * Meta titles + descriptions for every page (lead 2026-10-04).
 *
 * Passed to BaseLayout as `title` / `description`. Resolution is unchanged
 * (see `Seo.astro`): a filled Sanity `seo` field still wins over these.
 *
 * Lengths: `title` gets the " | BenorMedia" template (13 characters), so
 * keep it ≤47 for a ≤60-character `<title>`. `description` 140–160.
 */

export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META = {
  home: {
    title: "Webflow Agency for B2B SaaS Websites",
    description:
      "BenorMedia builds high-converting, AEO-optimized Webflow websites for B2B SaaS and tech companies. Webflow Professional Partner, 6+ years, 100+ clients.",
  },
  work: {
    title: "Our Work: Webflow Websites for B2B Brands",
    description:
      "See the Webflow websites we've designed and built for B2B SaaS, professional services and agencies, trusted by clients who have raised $700M+ combined.",
  },
  pricing: {
    title: "Pricing: Webflow Design & Development",
    description:
      "Simple, transparent pricing for B2B websites: monthly design and development, AEO/GEO growth plans, or one-off projects. Unlimited requests, cancel anytime.",
  },
  testimonials: {
    title: "Client Testimonials & Reviews",
    description:
      "Read what B2B marketing leaders say about working with BenorMedia, the Webflow agency trusted by 100+ clients to launch and grow their websites.",
  },
  notFound: {
    title: "Page Not Found",
    description:
      "The page you're looking for doesn't exist or has moved. Explore BenorMedia's Webflow websites, services and pricing from the home page.",
  },
} satisfies Record<string, PageMeta>;

/** Service pages, keyed by `service.slug`. Unknown slugs fall back to the
 *  service name + subtitle in `[service].astro`. */
export const SERVICE_META: Record<string, PageMeta> = {
  "custom-websites-migrations": {
    title: "Webflow Design & Development Agency for B2B",
    description:
      "Custom Webflow design, development and migrations for B2B SaaS and tech companies: strong creative, clear strategy and a site your team can update.",
  },
  growth: {
    title: "B2B SaaS SEO Agency: SEO, GEO & CRO",
    description:
      "B2B SaaS SEO agency for Google and AI search: technical SEO, AEO/GEO, content and CRO that turn more of your website traffic into pipeline.",
  },
  "ongoing-website-support": {
    title: "Webflow Maintenance & Support Service",
    description:
      "Unlimited Webflow design, development and maintenance for growing B2B companies. Keep your website improving without the cost of an in-house team.",
  },
};

