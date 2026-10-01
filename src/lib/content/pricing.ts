/**
 * Pricing plans — static page copy (lead: all page copy lives in code; the
 * `pricingPage` singleton is SEO-only). Copy transcribed verbatim from
 * `docs/refs/pricing/pricing-cards.jpg`.
 *
 * Shape = `PricingCard` props (`src/components/ui/PricingCard.astro`).
 */

export interface PricingPlan {
  name: string;
  description: string;
  /** e.g. "€2,000". */
  price?: string;
  /** e.g. "/mo". Only rendered with `price`. */
  period?: string;
  /** Shown instead of a price, e.g. "Let's chat". */
  priceLabel?: string;
  features: string[];
}

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    name: "Design + Development",
    description:
      "Unlimited marketing design, web design, and web development support for growing B2B companies.",
    price: "€2,000",
    period: "/mo",
    features: [
      "Unlimited development requests",
      "Unlimited web and marketing design requests",
      "Unlimited revisions",
      "Unlimited projects",
      "Fast turnaround",
      "Updates via our dashboard, Slack or Email",
      "Dedicated client manager",
      "Cancel anytime",
    ],
  },
  {
    // Canonical service name (lead, 2026-09-30): nav, footer, Home Services
    // and the Sanity `service-growth` document use the same.
    name: "Growth (SEO/GEO + CRO)",
    description:
      "Technical AEO, AI search analytics, content creation, and ongoing optimization to improve your LLMs visibility and web conversion rate.",
    price: "€2,500",
    period: "/mo",
    features: [
      "Content creation",
      "AI Search Analytics",
      "AI Visibility Reporting",
      "Competitive Intelligence",
      "Technical Optimization",
      "Conversion Rate Experiments",
      "Content Opportunity Analysis",
      "Behavior Analysis",
      "Cancel anytime",
    ],
  },
  {
    name: "One Off",
    description:
      "A fixed-scope engagement for businesses that need expert design or development without a retainer.",
    priceLabel: "Let's chat",
    features: [
      "Webflow development",
      "Conversion-focused designs",
      "Scalable development system",
      "Scalable design system",
      "Custom illustrations",
      "Technical SEO optimization",
      "Tutorials and Training",
      "Dedicated client manager",
      "Multiple reviews",
    ],
  },
];
