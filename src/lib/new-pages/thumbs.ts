/**
 * Card thumbnails by article slug (lead 2026-10-18, Figma BenorMedia
 * 3736:7123): which of the six layouts each guide and blog post uses, with
 * its own content. Labels come from the article's text; logos only for
 * products the article names. The Resources cards (/blog, /guides, author
 * pages, related cards) and the article header show these; a slug without
 * an entry keeps its header illustration (`HEROES`; lead 2026-10-18 for
 * ai-crawlers-robots-txt and what-b2b-buyers-need-from-your-website), else
 * the screenshot collage.
 */
import ThDome from "../../components/new-pages/thumbs/ThDome.astro";
import ThChips from "../../components/new-pages/thumbs/ThChips.astro";
import ThLogos from "../../components/new-pages/thumbs/ThLogos.astro";
import ThOrbit from "../../components/new-pages/thumbs/ThOrbit.astro";
import ThIconWall from "../../components/new-pages/thumbs/ThIconWall.astro";
import ThObject from "../../components/new-pages/thumbs/ThObject.astro";

export interface ThumbEntry {
  // Astro components take any props object.
  component: (props: never) => unknown;
  props: Record<string, unknown>;
}

/** An entry, with its props checked against the component's Props. */
type PropsOf<C> = C extends (props: infer P) => unknown ? P : never;

const t = <C extends ThumbEntry["component"]>(component: C, props: PropsOf<C>): ThumbEntry => ({
  component,
  props: props as Record<string, unknown>,
});

export const THUMBS: Record<string, ThumbEntry> = {
  // ---- Guides ------------------------------------------------------------
  // "Which pages does a B2B SaaS website need?" and the editing roles.
  "b2b-saas-website-pages": t(ThDome, {
    outer: [
      { icon: "devices3d", label: "Home" },
      { icon: "designGrid", label: "Product pages" },
      { icon: "reporting", label: "Pricing" },
      { icon: "plugs", label: "Integrations" },
      { icon: "crmCard", label: "Customers and proof" },
    ],
    middle: [
      { icon: "shieldLock", label: "Security and trust" },
      { icon: "pencilDoc", label: "Resources" },
      { icon: "seoChart", label: "Comparison" },
      { icon: "funnelTarget", label: "Demo or contact" },
    ],
    inner: [
      { icon: "palette", label: "Designer" },
      { icon: "contentStack", label: "Marketer" },
      { icon: "docPencil", label: "Content editor" },
    ],
  }),
  // "What does Webflow Enterprise offer?"
  "webflow-enterprise": t(ThDome, {
    outer: [
      { icon: "shieldLock", label: "Security review" },
      { icon: "crmCard", label: "Single sign-on" },
      { icon: "person", label: "Roles and permissions" },
      { icon: "contentStack", label: "Page branches" },
      { icon: "reporting", label: "Audit trail" },
    ],
    middle: [
      { icon: "geoPin", label: "Locales" },
      { icon: "accessibility", label: "Accessibility" },
      { icon: "shield", label: "Security headers" },
      { icon: "speedGauge", label: "Uptime" },
    ],
    inner: [
      { icon: "ux", label: "Approval" },
      { icon: "flask", label: "Rollbacks" },
      { icon: "calendar", label: "Support" },
    ],
  }),
  // The eight migration steps.
  "wordpress-to-webflow-migration": t(ThIconWall, {
    icon: "plugs",
    labels: ["Benchmark", "Map every URL", "Move the content", "301 redirects", "Monitor after launch"],
  }),
  // Webflow, the headless CMSs and the AI tools the guide names.
  "webflow-vs-custom-code": t(ThLogos, {
    groups: [
      { tag: "Stay on Webflow", logos: ["webflow"] },
      { tag: "Headless CMS", logos: ["sanity", "storyblok"] },
      { tag: "AI tools", logos: ["claude"] },
    ],
  }),

  // ---- Blog posts --------------------------------------------------------
  // The example plan's phases, what sets the timeline.
  "how-long-does-a-website-redesign-take": t(ThDome, {
    outer: [
      { icon: "ux", label: "Audit" },
      { icon: "reporting", label: "Strategy plan" },
      { icon: "designGrid", label: "Wireframes" },
      { icon: "palette", label: "UI design" },
      { icon: "codeBlocks", label: "Development" },
    ],
    middle: [
      { icon: "contentStack", label: "Content migration" },
      { icon: "seoChart", label: "Quality assurance" },
      { icon: "speedGauge", label: "Launch" },
      { icon: "person", label: "Training" },
    ],
    inner: [
      { icon: "systems", label: "Templates" },
      { icon: "api", label: "Redirect map" },
      { icon: "calendar", label: "Review rounds" },
    ],
  }),
  // The checklist's steps, from the baseline to day 90.
  "website-redesign-seo-checklist": t(ThChips, {
    rows: [
      [
        { icon: "seoChart", label: "Baseline" },
        { icon: "contentStack", label: "Keep, merge, or retire" },
        { icon: "api", label: "Redirect map" },
        { icon: "plugs", label: "Permanent redirects" },
        { icon: "codeBlocks", label: "Self-referencing canonical" },
      ],
      [
        { icon: "shieldLock", label: "Freeze keep pages" },
        { icon: "ux", label: "Internal links" },
        { icon: "designGrid", label: "Structured data" },
        { icon: "chartSearch", label: "XML sitemap" },
        { icon: "techSeo", label: "robots.txt" },
      ],
      [
        { icon: "devices3d", label: "Staging site" },
        { icon: "calendar", label: "Launch day" },
        { icon: "reporting", label: "Search Console" },
        { icon: "speedGauge", label: "Core Web Vitals" },
        { icon: "doc", label: "404 or 410" },
      ],
      [
        { icon: "analytics", label: "90-day monitoring" },
        { icon: "geoPin", label: "Change of Address" },
        { icon: "flask", label: "Second release" },
        { icon: "crmCard", label: "Demo requests" },
        { icon: "pencilDoc", label: "Hreflang" },
      ],
    ],
  }),
  // What Webflow handles and what the team still owns.
  "is-webflow-good-for-seo": t(ThChips, {
    rows: [
      [
        { icon: "codeBlocks", label: "HTML output" },
        { icon: "chartSearch", label: "XML sitemap" },
        { icon: "techSeo", label: "Canonical tags" },
        { icon: "plugs", label: "301 redirects" },
        { icon: "designGrid", label: "Schema markup" },
      ],
      [
        { icon: "shieldLock", label: "robots.txt" },
        { icon: "pencilDoc", label: "Meta descriptions" },
        { icon: "geoPin", label: "Localization" },
        { icon: "accessibility", label: "Alt text" },
        { icon: "devices3d", label: "Responsive breakpoints" },
      ],
      [
        { icon: "contentStack", label: "CMS templates" },
        { icon: "ux", label: "Internal links" },
        { icon: "speedGauge", label: "Core Web Vitals" },
        { icon: "reporting", label: "Search Console" },
        { icon: "ai", label: "AI search" },
      ],
      [
        { icon: "docPencil", label: "Content" },
        { icon: "graphics", label: "Image optimization" },
        { icon: "analytics", label: "Monitoring" },
        { icon: "calendar", label: "Redirects over time" },
        { icon: "seoChart", label: "Search intent" },
      ],
    ],
  }),
  // Measurement, research and the checklist's areas.
  "cro-audit": t(ThChips, {
    rows: [
      [
        { icon: "analytics", label: "Key events" },
        { icon: "funnelTarget", label: "Funnel exploration" },
        { icon: "person", label: "Usability tests" },
        { icon: "flask", label: "Session recordings" },
        { icon: "seoChart", label: "Heatmaps" },
      ],
      [
        { icon: "pencilDoc", label: "On-site surveys" },
        { icon: "ux", label: "Value proposition" },
        { icon: "funnel", label: "Call to action" },
        { icon: "reporting", label: "Pricing clarity" },
        { icon: "crmCard", label: "Forms" },
      ],
      [
        { icon: "shieldLock", label: "Proof" },
        { icon: "speedGauge", label: "Speed" },
        { icon: "chartSearch", label: "Intent match" },
        { icon: "calendar", label: "Next step" },
        { icon: "codeBlocks", label: "Sample size" },
      ],
      [
        { icon: "designGrid", label: "Prioritize fixes" },
        { icon: "contentStack", label: "One change at a time" },
        { icon: "geoPin", label: "Traffic sources" },
        { icon: "devices3d", label: "Mobile devices" },
        { icon: "docPencil", label: "Sales and support notes" },
      ],
    ],
  }),
  // The three tools, the starter events and the monthly report.
  "webflow-analytics": t(ThChips, {
    rows: [
      [
        { icon: "analytics", label: "Webflow Analyze" },
        { icon: "seoChart", label: "GA4" },
        { icon: "codeBlocks", label: "Tag Manager" },
        { icon: "plugs", label: "Google tag gateway" },
        { icon: "funnelTarget", label: "Key events" },
      ],
      [
        { icon: "crmCard", label: "generate_lead" },
        { icon: "person", label: "sign_up" },
        { icon: "doc", label: "page_view" },
        { icon: "devices3d", label: "scroll" },
        { icon: "pencilDoc", label: "form_submit" },
      ],
      [
        { icon: "ux", label: "Clickmaps" },
        { icon: "designGrid", label: "Scroll depth" },
        { icon: "geoPin", label: "Traffic sources" },
        { icon: "reporting", label: "Monthly report" },
        { icon: "ai", label: "AI Assistant channel" },
      ],
      [
        { icon: "shieldLock", label: "Consent" },
        { icon: "techSeo", label: "Measurement ID" },
        { icon: "speedGauge", label: "Realtime report" },
        { icon: "contentStack", label: "Landing pages" },
        { icon: "chartSearch", label: "Search Console" },
      ],
    ],
  }),
  // Plans, limits and billing.
  "webflow-price-increase": t(ThOrbit, {
    icons: ["contentStack", "speedGauge", "reporting", "calendar", "seoChart", "crmCard", "shieldLock", "designGrid"],
  }),
  // The file, the crawlers and AI answers.
  "do-you-need-an-llms-txt-file": t(ThOrbit, {
    icons: ["pencilDoc", "codeBlocks", "ai", "shieldLock", "chartSearch", "devices3d", "techSeo", "geoPin"],
  }),
  // AI assistants, the channel, landing pages and key events.
  "ai-traffic-in-ga4": t(ThOrbit, {
    icons: ["ai", "analytics", "funnelTarget", "reporting", "seoChart", "devices3d", "chartSearch", "geoPin"],
  }),
  // The field mapping table.
  "import-wordpress-to-webflow": t(ThIconWall, {
    icon: "contentStack",
    labels: ["Title", "Slug", "Rich text", "Featured image", "Categories"],
  }),
  // Blog wave 3 (lead 2026-10-18).
  // "The first 12 checks of a SaaS technical SEO audit", in order.
  "saas-technical-seo": t(ThDome, {
    outer: [
      { icon: "shieldLock", label: "robots.txt" },
      { icon: "doc", label: "Noindex tags" },
      { icon: "devices3d", label: "Staging and app" },
      { icon: "reporting", label: "Page indexing report" },
      { icon: "chartSearch", label: "XML sitemaps" },
    ],
    middle: [
      { icon: "techSeo", label: "Canonical tags" },
      { icon: "plugs", label: "Redirects" },
      { icon: "codeBlocks", label: "JavaScript rendering" },
      { icon: "ux", label: "Internal links" },
    ],
    inner: [
      { icon: "speedGauge", label: "Core Web Vitals" },
      { icon: "designGrid", label: "Structured data" },
      { icon: "seoChart", label: "Search Console" },
    ],
  }),
  // The five prompt types of the 30-prompt set.
  "track-brand-mentions-in-chatgpt": t(ThIconWall, {
    icon: "ai",
    labels: ["Category", "Problem", "Comparison", "Alternatives", "Pricing"],
  }),
  // The consent parameters, the two modes and the setup pieces.
  "consent-mode-v2-webflow": t(ThChips, {
    rows: [
      [
        { icon: "shieldLock", label: "ad_storage" },
        { icon: "analytics", label: "analytics_storage" },
        { icon: "crmCard", label: "ad_user_data" },
        { icon: "person", label: "ad_personalization" },
        { icon: "docPencil", label: "Consent banner" },
      ],
      [
        { icon: "devices3d", label: "Basic consent mode" },
        { icon: "contentStack", label: "Advanced consent mode" },
        { icon: "seoChart", label: "Behavioral modeling" },
        { icon: "flask", label: "Tag Assistant" },
        { icon: "calendar", label: "wait_for_update" },
      ],
      [
        { icon: "plugs", label: "url_passthrough" },
        { icon: "codeBlocks", label: "ads_data_redaction" },
        { icon: "funnelTarget", label: "Consent Initialization" },
        { icon: "pencilDoc", label: "Head code" },
        { icon: "geoPin", label: "Region defaults" },
      ],
      [
        { icon: "techSeo", label: "Google Tag Manager" },
        { icon: "ux", label: "Webflow Analyze" },
        { icon: "speedGauge", label: "Cookieless pings" },
        { icon: "reporting", label: "Consent settings" },
        { icon: "designGrid", label: "Google Ads" },
      ],
    ],
  }),
  // Checks from the designer, developer and editor lists.
  "webflow-accessibility-checklist": t(ThIconWall, {
    icon: "accessibility",
    labels: ["Color contrast", "Focus visible", "Target size", "Alt text", "Keyboard navigation"],
  }),
  // Content from the CMS, rendered for every device.
  "headless-cms-seo": t(ThObject, { object: "deviceStack" }),
  // Launch week.
  "website-launch-checklist": t(ThObject, { object: "rocket" }),
};
