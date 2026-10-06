/**
 * Entity facts — one source for the Organization / WebSite / Service JSON-LD
 * and `public/llms.txt` (SEO quick changes, lead 2026-10-06).
 *
 * Name is "BenorMedia"; "Benor Media" appears only as `alternateName`.
 * The address mirrors the footer card (`Footer.astro`: "C/ Dos de Maig /
 * E1 6D, (08013) / Barcelona, Spain."): change both together.
 * `sameAs` = the footer's profile links (LinkedIn, X, Webflow badge). Add
 * other profiles only with a confirmed URL.
 */

export const SITE = "https://www.benormedia.com";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

export const ENTITY = {
  name: "BenorMedia",
  alternateName: "Benor Media",
  email: "info@benor.media",
  address: {
    streetAddress: "C/ Dos de Maig, E1 6D",
    postalCode: "08013",
    addressLocality: "Barcelona",
    addressCountry: "ES",
  },
  areaServed: ["United States", "Canada", "United Kingdom", "Germany", "Denmark", "Spain"],
  knowsAbout: [
    "Webflow development",
    "Webflow migrations",
    "B2B SaaS website design",
    "Technical SEO",
    "Answer engine optimization",
    "Generative engine optimization",
    "Conversion rate optimization",
  ],
  sameAs: [
    "https://www.linkedin.com/company/benormedia",
    "https://x.com/benormedia",
    "https://webflow.com/@benor-media",
  ],
} as const;

/** `areaServed` as schema.org Country objects. */
export const AREA_SERVED_LD = ENTITY.areaServed.map((name) => ({ "@type": "Country", name }));

/** Inline provider reference, so each service page's Service parses on its own. */
export const PROVIDER_LD = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: ENTITY.name,
  url: `${SITE}/`,
} as const;
