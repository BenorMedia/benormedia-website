/**
 * Card thumbnails by article slug (lead 2026-10-18, Figma BenorMedia
 * 3736:7123): which of the six layouts each guide, blog post and service
 * page (lead 2026-10-18) uses, with
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
import ThImage from "../../components/new-pages/thumbs/ThImage.astro";

const IMG = "/images/new-pages/thumbs/images";

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

  // ---- Service pages (shown on their related cards) ----------------------
  // "Start with what your current site already wins." and the process.
  "website-redesign": t(ThDome, {
    outer: [
      { icon: "crmCard", label: "Keep" },
      { icon: "seoChart", label: "Improve" },
      { icon: "contentStack", label: "Merge" },
      { icon: "doc", label: "Retire" },
      { icon: "designGrid", label: "Add" },
    ],
    middle: [
      { icon: "ux", label: "Audit" },
      { icon: "reporting", label: "Strategy plan" },
      { icon: "pencilDoc", label: "Wireframes" },
      { icon: "palette", label: "UI/UX design" },
    ],
    inner: [
      { icon: "codeBlocks", label: "Component library" },
      { icon: "api", label: "Content migration" },
      { icon: "speedGauge", label: "Launch" },
    ],
  }),
  // Security, languages, integrations and the team after launch.
  "webflow-enterprise-agency": t(ThDome, {
    outer: [
      { icon: "person", label: "Access controls" },
      { icon: "shieldLock", label: "Security audits" },
      { icon: "shield", label: "SSL" },
      { icon: "crmCard", label: "Stakeholder alignment" },
      { icon: "geoPin", label: "Languages" },
    ],
    middle: [
      { icon: "reporting", label: "Strategy" },
      { icon: "designGrid", label: "Component system" },
      { icon: "plugs", label: "Integrations" },
      { icon: "analytics", label: "Analytics" },
    ],
    inner: [
      { icon: "ux", label: "Dedicated team" },
      { icon: "calendar", label: "Response times" },
      { icon: "speedGauge", label: "After launch" },
    ],
  }),
  // The URL map, the migration and the SEO work in the build.
  "webflow-migration": t(ThChips, {
    rows: [
      [
        { icon: "ux", label: "Technical audit" },
        { icon: "contentStack", label: "Content inventory" },
        { icon: "api", label: "Redirect map" },
        { icon: "designGrid", label: "Sitemap architecture" },
        { icon: "calendar", label: "Timeline and sign-off" },
      ],
      [
        { icon: "docPencil", label: "Content migration" },
        { icon: "seoChart", label: "SEO verification" },
        { icon: "plugs", label: "Redirect testing" },
        { icon: "speedGauge", label: "Launch coordination" },
        { icon: "analytics", label: "Post-launch monitoring" },
      ],
      [
        { icon: "techSeo", label: "Technical SEO" },
        { icon: "codeBlocks", label: "Schema" },
        { icon: "pencilDoc", label: "Semantic structure" },
        { icon: "ai", label: "AEO" },
        { icon: "puzzle3d", label: "Component library" },
      ],
      [
        { icon: "person", label: "Training" },
        { icon: "crmCard", label: "Forms" },
        { icon: "cms", label: "Plugins" },
        { icon: "devices3d", label: "Integrations" },
        { icon: "shieldLock", label: "Support" },
      ],
    ],
  }),
  // The audit, the problems fixed most often and the content strategy.
  "webflow-seo-agency": t(ThChips, {
    rows: [
      [
        { icon: "techSeo", label: "Index and crawl check" },
        { icon: "cms", label: "CMS architecture" },
        { icon: "speedGauge", label: "Performance" },
        { icon: "reporting", label: "Search baseline" },
        { icon: "ai", label: "AI visibility baseline" },
      ],
      [
        { icon: "devices3d", label: "Staging site" },
        { icon: "contentStack", label: "Duplicate content" },
        { icon: "plugs", label: "Redirect imports" },
        { icon: "graphics", label: "Heavy images" },
        { icon: "codeBlocks", label: "Schema gaps" },
      ],
      [
        { icon: "funnelTarget", label: "Commercial pages" },
        { icon: "pencilDoc", label: "Answers up front" },
        { icon: "designGrid", label: "CMS templates" },
        { icon: "calendar", label: "Refreshes" },
        { icon: "seoChart", label: "Structured data" },
      ],
      [
        { icon: "shieldLock", label: "Crawler access" },
        { icon: "docPencil", label: "llms.txt" },
        { icon: "analytics", label: "Core Web Vitals" },
        { icon: "chartSearch", label: "Canonical tags" },
        { icon: "geoPin", label: "robots.txt" },
      ],
    ],
  }),
  // "The pages a SaaS buyer expects."
  "b2b-saas-web-design": t(ThIconWall, {
    icon: "designGrid",
    labels: ["Product pages", "Pricing", "Integrations", "Customers and proof", "Security and trust"],
  }),
  // Prompt tracking, answer-shaped pages, mentions and reporting.
  "aeo-agency": t(ThOrbit, {
    icons: ["ai", "seoChart", "pencilDoc", "geoPin", "reporting", "crmCard", "chartSearch", "designGrid"],
  }),
  // The headless CMSs the page works with, and the move from Webflow.
  "headless-cms-agency": t(ThLogos, {
    groups: [
      { tag: "Headless CMS", logos: ["sanity", "contentful", "storyblok"] },
      { tag: "Moving from Webflow", logos: ["webflow"] },
    ],
  }),
  // Security vendors.
  "cybersecurity-web-design": t(ThObject, { object: "shield" }),

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
  // Blog wave 4 (lead 2026-10-19).
  // The RFP's sections, the requirements most RFPs miss, the evaluation.
  "website-rfp-template": t(ThDome, {
    outer: [
      { icon: "funnelTarget", label: "Goals" },
      { icon: "devices3d", label: "Current website" },
      { icon: "designGrid", label: "Scope" },
      { icon: "plugs", label: "Integrations" },
      { icon: "reporting", label: "Budget range" },
    ],
    middle: [
      { icon: "api", label: "URL map" },
      { icon: "accessibility", label: "Accessibility" },
      { icon: "speedGauge", label: "Performance" },
      { icon: "analytics", label: "Analytics and consent" },
    ],
    inner: [
      { icon: "seoChart", label: "Evaluation" },
      { icon: "calendar", label: "Timeline" },
      { icon: "pencilDoc", label: "One-page brief" },
    ],
  }),
  // The four pricing page models and the comparison table.
  "saas-pricing-page": t(ThIconWall, {
    icon: "reporting",
    labels: ["Published tiers", "Starting price", "Usage-based pricing", "Cost drivers", "Plan comparison table"],
  }),
  // The CRMs, GA4 and the Webflow form the post covers.
  "b2b-marketing-attribution": t(ThLogos, {
    groups: [
      { tag: "CRM source fields", logos: ["hubspot", "salesforce"] },
      { tag: "UTMs and GA4", logos: ["googleAnalytics"] },
      { tag: "Hidden form fields", logos: ["webflow"] },
    ],
  }),
  // Scope, the standard, the audit and the statement.
  "european-accessibility-act-saas": t(ThOrbit, {
    icons: ["accessibility", "shieldLock", "geoPin", "pencilDoc", "devices3d", "reporting", "person", "chartSearch"],
  }),
  // Blog wave 5 (lead 2026-10-19).
  // The structured data worth keeping, the AI answers, the checks.
  "schema-markup-ai-search": t(ThChips, {
    rows: [
      [
        { icon: "crmCard", label: "Organization" },
        { icon: "devices3d", label: "WebSite" },
        { icon: "api", label: "BreadcrumbList" },
        { icon: "pencilDoc", label: "Article" },
        { icon: "codeBlocks", label: "JSON-LD" },
      ],
      [
        { icon: "ai", label: "AI Overviews" },
        { icon: "chartSearch", label: "AI Mode" },
        { icon: "research", label: "ChatGPT" },
        { icon: "graphics", label: "Perplexity" },
        { icon: "systems", label: "Copilot" },
      ],
      [
        { icon: "seoChart", label: "Rich results" },
        { icon: "techSeo", label: "Search Console" },
        { icon: "docPencil", label: "Visible text" },
        { icon: "shieldLock", label: "Crawl access" },
        { icon: "reporting", label: "Buyer prompts" },
      ],
      [
        { icon: "contentStack", label: "Content worth citing" },
        { icon: "flask", label: "Studies" },
        { icon: "person", label: "Author" },
        { icon: "calendar", label: "Dates" },
        { icon: "plugs", label: "sameAs" },
      ],
    ],
  }),
  // Impressions, branded search and demo requests.
  "zero-click-searches-b2b-saas": t(ThObject, { object: "seoChart" }),
  // The six asks before a case study is written.
  "b2b-case-study": t(ThIconWall, {
    icon: "crmCard",
    labels: ["Baseline and result", "The decision story", "Implementation facts", "A named quote", "Permission scope"],
  }),
  // Monthly, quarterly and yearly checks, and the headless extras.
  "website-maintenance-checklist": t(ThChips, {
    rows: [
      [
        { icon: "techSeo", label: "Page indexing" },
        { icon: "crmCard", label: "Key forms" },
        { icon: "analytics", label: "Key events" },
        { icon: "speedGauge", label: "Core Web Vitals" },
        { icon: "calendar", label: "Release notes" },
      ],
      [
        { icon: "codeBlocks", label: "Third-party scripts" },
        { icon: "person", label: "User access" },
        { icon: "shieldLock", label: "Consent and cookies" },
        { icon: "api", label: "Redirects" },
        { icon: "seoChart", label: "Sitemaps" },
      ],
      [
        { icon: "geoPin", label: "Domains" },
        { icon: "shield", label: "Certificates" },
        { icon: "reporting", label: "Plan limits" },
        { icon: "accessibility", label: "Accessibility" },
        { icon: "pencilDoc", label: "Content audit" },
      ],
      [
        { icon: "systems", label: "Node.js" },
        { icon: "puzzle3d", label: "Dependencies" },
        { icon: "cms", label: "Sanity API version" },
        { icon: "contentStack", label: "Content backups" },
        { icon: "devices3d", label: "Preview deployments" },
      ],
    ],
  }),
  // The link types that carry the structure.
  "website-architecture-seo": t(ThIconWall, {
    icon: "api",
    labels: ["Header navigation", "Breadcrumbs", "Contextual links", "Related resources", "XML sitemap"],
  }),
  // The homepage sections, in order.
  "saas-homepage-design": t(ThDome, {
    outer: [
      { icon: "designGrid", label: "Hero section" },
      { icon: "crmCard", label: "Logo bar" },
      { icon: "devices3d", label: "Product overview" },
      { icon: "puzzle3d", label: "Key features" },
      { icon: "person", label: "Paths by role" },
    ],
    middle: [
      { icon: "seoChart", label: "Proof" },
      { icon: "plugs", label: "Integrations" },
      { icon: "shieldLock", label: "Security" },
      { icon: "reporting", label: "Pricing" },
    ],
    inner: [
      { icon: "funnelTarget", label: "Final call to action" },
      { icon: "contentStack", label: "Footer" },
      { icon: "speedGauge", label: "Fast hero" },
    ],
  }),
  // Webflow forms to Salesforce or HubSpot.
  "webflow-salesforce-integration": t(ThLogos, {
    groups: [
      { tag: "Web-to-Lead", logos: ["webflow", "salesforce"] },
      { tag: "Webflow HubSpot app", logos: ["webflow", "hubspot"] },
      { tag: "Forms API", logos: ["hubspot"] },
    ],
  }),
  // The three metrics, the scripts behind them and the tools.
  "core-web-vitals-optimization": t(ThOrbit, {
    icons: ["speedGauge", "codeBlocks", "analytics", "devices3d", "chartSearch", "puzzle3d", "reporting", "shieldLock"],
  }),
  // PHP and Webflow over the orbit, from the lead's thumbnail (2026-10-21).
  "webflow-security-php2shell": t(ThOrbit, {
    icons: ["geoPin", "palette", "shieldLock", "codeBlocks", "chartSearch", "pencilDoc", "funnelTarget", "designGrid"],
    cards: [
      { logo: "php", x: 93, y: 67, w: 184, h: 112.5 },
      { logo: "webflow", x: 207, y: 209.5, w: 271, h: 70.5 },
    ],
  }),
  // Blog 2026-10-22 (lead). What the export holds, what stays behind, the exit.
  "webflow-export-code": t(ThChips, {
    rows: [
      [
        { icon: "codeBlocks", label: "HTML files" },
        { icon: "palette", label: "CSS folder" },
        { icon: "puzzle3d", label: "JS folder" },
        { icon: "graphics", label: "Images folder" },
        { icon: "doc", label: "Code export" },
      ],
      [
        { icon: "cms", label: "CMS content" },
        { icon: "crmCard", label: "Forms" },
        { icon: "chartSearch", label: "Site search" },
        { icon: "shieldLock", label: "Password protection" },
        { icon: "person", label: "User accounts" },
      ],
      [
        { icon: "contentStack", label: "CSV export" },
        { icon: "api", label: "301 redirects" },
        { icon: "docPencil", label: "Form submissions" },
        { icon: "geoPin", label: "Localized pages" },
        { icon: "designGrid", label: "Code components" },
      ],
      [
        { icon: "devices3d", label: "New host" },
        { icon: "plugs", label: "Form backend" },
        { icon: "speedGauge", label: "Staging tests" },
        { icon: "techSeo", label: "Search Console" },
        { icon: "calendar", label: "Keep the project" },
      ],
    ],
  }),
  // The myths and what to do instead.
  "ai-seo-myths": t(ThObject, { object: "lightbulb" }),
  // Blog 2026-10-23 (lead). The roles that replaced the legacy Editor.
  "webflow-editor": t(ThIconWall, {
    icon: "person",
    labels: ["Content editor", "Marketer", "Reviewer", "Designer", "Site manager"],
  }),
  // The CMSs compared, by the criteria the post uses.
  "headless-cms-comparison": t(ThLogos, {
    groups: [
      { tag: "Editing and preview", logos: ["sanity", "storyblok"] },
      { tag: "Localization", logos: ["contentful"] },
    ],
  }),
  // AI tools around the site, under the post's allow, ask and block policy.
  "webflow-mcp": t(ThDome, {
    outer: [
      { icon: "cms", label: "CMS items" },
      { icon: "designGrid", label: "Design" },
      { icon: "codeBlocks", label: "Custom code" },
      { icon: "graphics", label: "Assets" },
      { icon: "analytics", label: "Analytics" },
    ],
    middle: [
      { icon: "person", label: "Your role" },
      { icon: "shieldLock", label: "Approvals" },
      { icon: "pencilDoc", label: "Agent instructions" },
      { icon: "reporting", label: "Site Activity log" },
    ],
    inner: [
      { icon: "ai", label: "Allow" },
      { icon: "calendar", label: "Ask" },
      { icon: "shield", label: "Block" },
    ],
  }),
  // React into Webflow, Webflow into React, and apps on Webflow Cloud.
  "webflow-devlink": t(ThOrbit, {
    icons: ["codeBlocks", "puzzle3d", "devices3d", "plugs", "speedGauge", "designGrid", "ai", "seoChart"],
  }),
  // Content from the CMS, rendered for every device.
  "headless-cms-seo": t(ThObject, { object: "deviceStack" }),
  // Launch week.
  "website-launch-checklist": t(ThObject, { object: "rocket" }),
  // Images from the lead (2026-10-26).
  "webflow-redirects": t(ThImage, { src: `${IMG}/webflow-redirects.webp`, w: 1084, h: 720 }),
  "trust-center": t(ThImage, { src: `${IMG}/trust-center.webp`, w: 1084, h: 720 }),
  "google-tag-gateway": t(ThImage, { src: `${IMG}/google-tag-gateway.webp`, w: 1084, h: 720 }),
  "astro-cms": t(ThImage, { src: `${IMG}/astro-cms.webp`, w: 1084, h: 720 }),
  "copilot-seo": t(ThImage, { src: `${IMG}/copilot-seo.webp`, w: 1084, h: 720 }),
  // Blog wave 4, batch 2 (lead 2026-10-26).
  // The page types for programmatic SEO.
  "programmatic-seo-webflow": t(ThIconWall, {
    icon: "cms",
    labels: ["Integration pages", "Use case pages", "Comparison pages", "Template libraries", "City pages"],
  }),
  // OpenAI's crawlers, the answer, and how it is measured.
  "how-to-rank-in-chatgpt": t(ThOrbit, {
    icons: ["ai", "research", "shieldLock", "chartSearch", "pencilDoc", "crmCard", "reporting", "analytics"],
  }),
  // The two features, fan-out and where they are measured.
  "optimize-for-ai-overviews": t(ThIconWall, {
    icon: "chartSearch",
    labels: ["AI Overviews", "AI Mode", "Query fan-out", "Search Console", "GA4"],
  }),
  // The standard formats, the evidence and the answer library.
  "security-questionnaire": t(ThIconWall, {
    icon: "shieldLock",
    labels: ["SIG", "CAIQ", "HECVAT", "SOC 2 report", "Answer library"],
  }),
  // What marketers edit alone, and what still needs a developer.
  "headless-cms-visual-editor": t(ThIconWall, {
    icon: "designGrid",
    labels: ["Headings and copy", "Images", "Section order", "New sections", "Page types"],
  }),
  // Search Console, the prompt panel and the monthly report.
  "ai-mode-tracking": t(ThOrbit, {
    icons: ["chartSearch", "ai", "reporting", "analytics", "funnelTarget", "seoChart", "research", "calendar"],
  }),
  // A privacy signal the site honors.
  "gpc-signal": t(ThObject, { object: "padlockHeart" }),
  "saas-website-redesign": t(ThImage, { src: `${IMG}/saas-website-redesign.webp`, w: 1084, h: 720 }),
  // Webflow Collections served to other front ends.
  "webflow-cms-api": t(ThLogos, {
    groups: [{ tag: "Headless source", logos: ["webflow"] }],
  }),
  "cybersecurity-content-marketing": t(ThImage, { src: `${IMG}/cybersecurity-content-marketing.webp`, w: 1084, h: 720 }),
  "aeo-specialist": t(ThImage, { src: `${IMG}/aeo-specialist.webp`, w: 1084, h: 720 }),
};
