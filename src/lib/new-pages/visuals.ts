/**
 * Visuals (brief 5.9): a real asset, else a registered diagram, else a
 * preview-only placeholder, else nothing.
 *
 * Assets: `src/assets/new-pages/<slug>/<n>.<webp|png|jpg|svg>`, `n` counted
 * from 1 in `visuals` order.
 *
 * Diagrams: `DIAGRAMS['<slug>:<n>']`, filled in T7. Each entry names the
 * section text its labels came from.
 */
import type { ImageMetadata } from "astro";
import FlowDiagram from "../../components/new-pages/diagrams/FlowDiagram.astro";
import OutlineDiagram from "../../components/new-pages/diagrams/OutlineDiagram.astro";
import SiteMapDiagram from "../../components/new-pages/diagrams/SiteMapDiagram.astro";
import TimelineDiagram from "../../components/new-pages/diagrams/TimelineDiagram.astro";
import IlAccessFlow from "../../components/new-pages/illustrations/IlAccessFlow.astro";
import IlBuilder from "../../components/new-pages/illustrations/IlBuilder.astro";
import IlHub from "../../components/new-pages/illustrations/IlHub.astro";
import IlJourney from "../../components/new-pages/illustrations/IlJourney.astro";
import IlOrbit from "../../components/new-pages/illustrations/IlOrbit.astro";
import IlRedirectMap from "../../components/new-pages/illustrations/IlRedirectMap.astro";
import IlRings from "../../components/new-pages/illustrations/IlRings.astro";
import IlSiteMap from "../../components/new-pages/illustrations/IlSiteMap.astro";
import IlHero from "../../components/new-pages/illustrations/IlHero.astro";

type AstroComponent = (...args: any[]) => any;

export interface DiagramEntry {
  component: AstroComponent;
  props: Record<string, unknown>;
  /** An illustration that draws its own frame (NpVisual adds none). */
  framed?: boolean;
}

const ASSETS = import.meta.glob<{ default: ImageMetadata }>("/src/assets/new-pages/**/*.{webp,png,jpg,svg}", {
  eager: true,
});

export function findAsset(slug: string, n: number): ImageMetadata | undefined {
  for (const ext of ["webp", "png", "jpg", "svg"]) {
    const mod = ASSETS[`/src/assets/new-pages/${slug}/${n}.${ext}`];
    if (mod) return mod.default;
  }
  return undefined;
}

export const DIAGRAMS: Record<string, DiagramEntry> = {
  // Labels: brief ("heading structure", "schema markup", "question-and-answer blocks").
  "b2b-saas-web-design:3": {
    component: OutlineDiagram,
    props: {
      rows: [
        { kind: "heading", label: "Heading structure" },
        { kind: "text" },
        { kind: "answer", label: "Question-and-answer blocks" },
        { kind: "text" },
        { kind: "schema", label: "Schema markup" },
      ],
    },
  },
  // Labels: brief ("the audit, the stakeholder sign-offs, the component library build, and the launch").
  "webflow-enterprise-agency:3": {
    component: TimelineDiagram,
    props: { milestones: ["Audit", "Stakeholder sign-offs", "Component library build", "Launch"] },
  },
  // Labels: brief ("benchmark, map URLs, rebuild, move content, redirect, test, launch, monitor"), the guide's eight numbered steps.
  "wordpress-to-webflow-migration:1": {
    component: FlowDiagram,
    props: {
      numbered: true,
      columns: 4,
      steps: [
        { label: "Benchmark" },
        { label: "Map URLs" },
        { label: "Rebuild" },
        { label: "Move content" },
        { label: "Redirect" },
        { label: "Test" },
        { label: "Launch" },
        { label: "Monitor" },
      ],
    },
  },
  // Labels: brief groups and pages; page names as in the "Pages a B2B SaaS website needs" table.
  "b2b-saas-website-pages:1": {
    component: SiteMapDiagram,
    props: {
      root: "Home",
      groups: [
        { label: "Learning", items: ["Resources"] },
        { label: "Evaluating", items: ["Product and use-case pages", "Integrations", "Comparison and alternatives"] },
        { label: "Deciding", items: ["Pricing", "Customers and proof", "Security and trust"] },
        { label: "Acting", items: ["Demo or contact"] },
      ],
    },
  },
  // approver must approve it"). The page does not say who merges or publishes ("Permissions set who ... publishes").
  "webflow-enterprise:1": {
    component: FlowDiagram,
    props: {
      columns: 3,
      steps: [
        { label: "Branch a page", note: "Designer or editor" },
        { label: "Submit for review", note: "Designer or editor" },
        { label: "Approve", note: "Approver", gate: true },
        { label: "Merge" },
        { label: "Publish to staging" },
        { label: "Publish to production" },
      ],
    },
  },

  // Illustrations for the commercial left/right sections (lead 2026-10-07,
  // Figma 3702:9167 style). Every label comes from that section's text or
  // the visual's brief; URLs are generic examples.

  // "Start with a map of every URL": the redirect map bullet and brief; chips = the audit, inventory and sitemap bullets.
  "webflow-migration:1": {
    framed: true,
    component: IlRedirectMap,
    props: {
      fromTag: "WordPress",
      toTag: "Webflow",
      rows: [
        { from: "/old-page", to: "/new-page", badge: "301" },
        { from: "/blog/old-post", to: "/blog/new-post", badge: "301" },
        { from: "/category/news", to: "/blog", badge: "301" },
        { from: "/about-us-2", to: "/about", badge: "301" },
      ],
      chips: [
        { icon: "techSeo", label: "Technical audit" },
        { icon: "cms", label: "Content inventory" },
        { icon: "systems", label: "Sitemap architecture" },
      ],
    },
  },
  // "Rebuild in Webflow with a component library": brief (hero, feature, and pricing blocks); tokens = "variables, and design tokens".
  "webflow-migration:2": {
    framed: true,
    component: IlBuilder,
    props: {
      tag: "Component library",
      items: [
        { icon: "systems", label: "Hero" },
        { icon: "puzzle", label: "Feature" },
        { icon: "reporting", label: "Pricing" },
      ],
      tokens: ["Variables", "Design tokens"],
    },
  },
  // "Plugins, forms, and integrations": "a built-in Webflow setting, an integration, or custom code"; forms connect to HubSpot.
  "webflow-migration:4": {
    framed: true,
    component: IlHub,
    props: {
      centerLogo: "webflow",
      cards: [
        { tag: "SEO & redirects", tiles: [{ icon: "techSeo" }, { icon: "cms" }] },
        { tag: "Forms", tiles: [{ logo: "hubspot" }, { icon: "doc" }] },
        { tag: "CRM & analytics", tiles: [{ logo: "salesforce" }, { logo: "ga" }, { logo: "pipedrive" }] },
      ],
      chips: [
        { icon: "systems", label: "Built-in setting" },
        { icon: "api", label: "Integration" },
        { icon: "code", label: "Custom code" },
      ],
    },
  },
  // "SEO and AI search readiness": the four bold lead-ins; inner ring = "traditional search and AI-first discovery", structured data, headings.
  "webflow-migration:5": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "techSeo", label: "Technical SEO" },
        { icon: "code", label: "Schema" },
        { icon: "systems", label: "Semantic structure" },
        { icon: "ai", label: "AEO" },
      ],
      inner: [
        { icon: "research", label: "Traditional search" },
        { icon: "cms", label: "Structured data" },
        { icon: "docPencil", label: "Headings" },
        { icon: "analytics", label: "AI-first discovery" },
      ],
    },
  },
  // "Training, handoff, and support after launch": the training bullets; card = ongoing website support (weekly updates, technical SEO monitoring, bug fixes).
  "webflow-migration:6": {
    framed: true,
    component: IlJourney,
    props: {
      tag: "Training & handoff",
      steps: [
        { icon: "ux", label: "Live training" },
        { icon: "graphics", label: "Video tutorials" },
        { icon: "doc", label: "Documentation" },
        { icon: "cms", label: "CMS guide" },
      ],
      cardTag: "Ongoing website support",
      chips: [
        { icon: "calendar", label: "Weekly updates" },
        { icon: "techSeo", label: "Technical SEO monitoring" },
        { icon: "code", label: "Bug fixes" },
      ],
    },
  },
  // "The pages a SaaS buyer expects": the six bold lead-ins.
  "b2b-saas-web-design:1": {
    framed: true,
    component: IlSiteMap,
    props: {
      root: "Home",
      pages: [
        { icon: "devices", label: "Product pages" },
        { icon: "reporting", label: "Pricing" },
        { icon: "api", label: "Integrations" },
        { icon: "person", label: "Customers & proof" },
        { icon: "shield", label: "Security & trust" },
        { icon: "doc", label: "Demo or contact" },
      ],
    },
  },
  // "A component library your marketers can build from": "feature, integration, and use-case pages"; "variables, and design tokens".
  "b2b-saas-web-design:2": {
    framed: true,
    component: IlBuilder,
    props: {
      tag: "Component library",
      items: [
        { icon: "puzzle", label: "Feature" },
        { icon: "api", label: "Integration" },
        { icon: "devices", label: "Use case" },
      ],
      tokens: ["Variables", "Design tokens"],
    },
  },
  // "CRM, analytics, and forms wired in during the build": CRM integration and marketing automation, GA4 and conversion tracking, custom API, cross-browser testing.
  "b2b-saas-web-design:4": {
    framed: true,
    component: IlHub,
    props: {
      cards: [
        { tag: "CRM & automation", tiles: [{ logo: "hubspot" }, { logo: "salesforce" }, { logo: "pipedrive" }] },
        { tag: "Analytics", tiles: [{ logo: "ga" }, { icon: "analytics" }] },
        { tag: "Custom API", tiles: [{ icon: "api" }, { icon: "code" }] },
      ],
      chips: [
        { icon: "analytics", label: "GA4 setup" },
        { icon: "funnel", label: "Conversion tracking" },
        { icon: "devices", label: "Cross-browser testing" },
      ],
    },
  },
  // "A team behind the site after launch": the support bullets (weekly updates, CRO audits, technical SEO monitoring, bug fixes, priority SLA, dedicated pod, Slack, no tickets).
  "b2b-saas-web-design:5": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "calendar", label: "Weekly updates" },
        { icon: "funnel", label: "CRO audits" },
        { icon: "techSeo", label: "Technical SEO monitoring" },
        { icon: "code", label: "Bug fixes" },
      ],
      inner: [
        { icon: "person", label: "Dedicated pod" },
        { icon: "api", label: "Slack" },
        { icon: "speed", label: "Priority SLA" },
        { icon: "puzzle", label: "No tickets" },
      ],
    },
  },
  // "Security and access questions answered up front": "Access for the people who edit, review, and publish"; security audits, SSL, stakeholder alignment.
  "webflow-enterprise-agency:1": {
    framed: true,
    component: IlAccessFlow,
    props: {
      tag: "Access controls",
      steps: [
        { icon: "graphics", label: "Edit" },
        { icon: "ux", label: "Review" },
        { icon: "shield", label: "Approve", big: true },
        { icon: "devices", label: "Publish" },
      ],
      cardTag: "Security & compliance",
      chips: [
        { icon: "techSeo", label: "Security audits" },
        { icon: "shield", label: "SSL implementation" },
        { icon: "person", label: "Stakeholder alignment" },
      ],
    },
  },
  // "Global sites in more than one language": one site, its language versions and regional teams; the three bullets as chips.
  "webflow-enterprise-agency:2": {
    framed: true,
    component: IlOrbit,
    props: {
      centerTag: "One site",
      versions: ["Language version A", "Language version B", "Language version C", "Language version D"],
      teamTag: "Regional team",
      chips: [
        { icon: "cms", label: "Multi-language CMS" },
        { icon: "research", label: "Localization workflows" },
        { icon: "reporting", label: "Approval steps" },
      ],
    },
  },
  // "Integrations and analytics wired in during the build": the three bullets.
  "webflow-enterprise-agency:4": {
    framed: true,
    component: IlHub,
    props: {
      cards: [
        { tag: "CRM & automation", tiles: [{ logo: "hubspot" }, { logo: "salesforce" }, { logo: "pipedrive" }] },
        { tag: "GA4 & conversions", tiles: [{ logo: "ga" }, { icon: "funnel" }] },
        { tag: "Custom API", tiles: [{ icon: "api" }, { icon: "code" }] },
      ],
      chips: [
        { icon: "person", label: "CRM integration" },
        { icon: "analytics", label: "Conversion tracking" },
        { icon: "api", label: "Custom API integrations" },
      ],
    },
  },
  // "A dedicated team and response times after launch": the pod (team lead, project manager, designers, developers); response times, Slack, reviews.
  "webflow-enterprise-agency:5": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "person", label: "Team lead" },
        { icon: "reporting", label: "Project manager" },
        { icon: "graphics", label: "Designers" },
        { icon: "code", label: "Developers" },
      ],
      inner: [
        { icon: "speed", label: "48-hour response" },
        { icon: "techSeo", label: "6-hour critical fixes" },
        { icon: "calendar", label: "Monthly check-ins" },
        { icon: "analytics", label: "Quarterly reviews" },
      ],
    },
  },

  // /website-redesign (docs/brief-next-pages.md). Labels from the page text.
  // "Start with what your current site already wins": the five groups (stand-in for the five-way triage diagram).
  "website-redesign:1": {
    framed: true,
    component: IlSiteMap,
    props: {
      root: "Current site",
      pages: [
        { icon: "shield", label: "Keep" },
        { icon: "funnel", label: "Improve" },
        { icon: "puzzle", label: "Merge" },
        { icon: "doc", label: "Retire" },
        { icon: "docPencil", label: "Add" },
      ],
    },
  },
  // "Rebuild on a system your marketing team can run": component library, CMS structure, integrations; "variables and design tokens".
  "website-redesign:2": {
    framed: true,
    component: IlBuilder,
    props: {
      tag: "Component library",
      items: [
        { icon: "systems", label: "Sections" },
        { icon: "cms", label: "CMS structure" },
        { icon: "api", label: "Integrations" },
      ],
      tokens: ["Variables", "Design tokens"],
    },
  },
  // "Protect your rankings through launch": URL map with 301s (content note: reuse the /webflow-migration URL map); chips = bold lead-ins.
  "website-redesign:3": {
    framed: true,
    component: IlRedirectMap,
    props: {
      fromTag: "Old URL",
      toTag: "New address",
      rows: [
        { from: "/old-page", to: "/new-page", badge: "301" },
        { from: "/blog/old-post", to: "/blog/new-post", badge: "301" },
        { from: "/category/news", to: "/blog", badge: "301" },
        { from: "/about-us-2", to: "/about", badge: "301" },
      ],
      chips: [
        { icon: "techSeo", label: "URL map" },
        { icon: "devices", label: "Testing on staging" },
        { icon: "analytics", label: "Monitoring after launch" },
      ],
    },
  },
  // "Fast, findable and ready for AI search": the content file's tags (outer) and the three metrics plus server rendering (inner).
  "website-redesign:4": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "speed", label: "Core Web Vitals" },
        { icon: "techSeo", label: "Technical SEO" },
        { icon: "code", label: "Structured data" },
        { icon: "ai", label: "AEO" },
      ],
      inner: [
        { icon: "speed", label: "Largest Contentful Paint" },
        { icon: "ux", label: "Interaction to Next Paint" },
        { icon: "devices", label: "Cumulative Layout Shift" },
        { icon: "systems", label: "Content rendered on the server" },
      ],
    },
  },
  // "After launch: measure, fix, keep improving": "rankings, conversions and errors, then ... a short plan"; card = ongoing website support.
  "website-redesign:5": {
    framed: true,
    component: IlJourney,
    props: {
      tag: "After launch",
      steps: [
        { icon: "chartSearch", label: "Rankings" },
        { icon: "funnel", label: "Conversions" },
        { icon: "code", label: "Errors" },
        { icon: "reporting", label: "Plan" },
      ],
      cardTag: "Ongoing website support",
      chips: [
        { icon: "calendar", label: "Weekly updates" },
        { icon: "funnel", label: "Quarterly CRO audits" },
        { icon: "techSeo", label: "Technical SEO monitoring" },
      ],
    },
  },
  // /webflow-seo-agency (docs/brief-next-pages.md). Labels from the page text.
  // "Start with a Webflow SEO audit, not a keyword list": the bold lead-ins (stand-in for the audit checklist).
  "webflow-seo-agency:1": {
    framed: true,
    component: IlSiteMap,
    props: {
      root: "SEO audit",
      pages: [
        { icon: "techSeo", label: "Index & crawl" },
        { icon: "cms", label: "CMS architecture" },
        { icon: "speed", label: "Performance" },
        { icon: "chartSearch", label: "Search baseline" },
        { icon: "ai", label: "AI visibility baseline" },
      ],
    },
  },
  // "The Webflow SEO problems we fix most often": lead-ins of the problems listed.
  "webflow-seo-agency:2": {
    framed: true,
    component: IlBuilder,
    props: {
      tag: "Webflow SEO fixes",
      items: [
        { icon: "shield", label: "Staging indexing" },
        { icon: "cms", label: "CMS content" },
        { icon: "systems", label: "Canonicals" },
      ],
      tokens: ["Redirect imports", "Schema gaps"],
    },
  },
  // "AEO and AI search on Webflow": the content file's legend as chips; cards = structured data, crawler access, Bing.
  "webflow-seo-agency:3": {
    framed: true,
    component: IlHub,
    props: {
      centerLogo: "webflow",
      cards: [
        { tag: "Structured data", tiles: [{ icon: "code" }, { icon: "cms" }] },
        { tag: "Crawler access", tiles: [{ icon: "ai" }, { icon: "techSeo" }] },
        { tag: "Bing and Copilot", tiles: [{ icon: "chartSearch" }, { icon: "analytics" }] },
      ],
      chips: [
        { icon: "systems", label: "Built-in setting" },
        { icon: "api", label: "Integration" },
        { icon: "code", label: "Custom code" },
      ],
    },
  },
  // "Authority that moves rankings and AI answers": the content file's tags (outer) and the lead-ins (inner).
  "webflow-seo-agency:4": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "doc", label: "Lists" },
        { icon: "puzzle", label: "Partners" },
        { icon: "research", label: "Digital PR" },
        { icon: "person", label: "Reviews" },
      ],
      inner: [
        { icon: "reporting", label: "Roundups" },
        { icon: "api", label: "Integration listings" },
        { icon: "analytics", label: "Your own data" },
        { icon: "ux", label: "Communities" },
      ],
    },
  },
  // "Reporting you can take to a pipeline meeting": the lead-ins; chips = organic traffic, rankings, AI visibility.
  "webflow-seo-agency:5": {
    framed: true,
    component: IlJourney,
    props: {
      tag: "Monthly report",
      steps: [
        { icon: "funnel", label: "Pipeline" },
        { icon: "chartSearch", label: "Search Console" },
        { icon: "ai", label: "AI visibility" },
        { icon: "calendar", label: "Roadmap" },
      ],
      cardTag: "SEO performance",
      chips: [
        { icon: "analytics", label: "Organic traffic" },
        { icon: "reporting", label: "Rankings" },
        { icon: "ai", label: "AI visibility" },
      ],
    },
  },

  // /cybersecurity-web-design (docs/brief-next-pages.md). Labels from the page text.
  // "Write for a buying committee that doesn't trust vendors": the four buyer lanes in the content note (stand-in).
  "cybersecurity-web-design:1": {
    framed: true,
    component: IlSiteMap,
    props: {
      root: "Buying committee",
      pages: [
        { icon: "shield", label: "CISO" },
        { icon: "code", label: "Engineers" },
        { icon: "doc", label: "Procurement" },
        { icon: "reporting", label: "Finance" },
      ],
    },
  },
  // "Proof before persuasion": the bold lead-ins and the trust center contents.
  "cybersecurity-web-design:2": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "shield", label: "Trust center" },
        { icon: "code", label: "security.txt" },
        { icon: "person", label: "Customer evidence" },
        { icon: "chartSearch", label: "Independent validation" },
      ],
      inner: [
        { icon: "doc", label: "SOC 2 report" },
        { icon: "reporting", label: "Certifications" },
        { icon: "docPencil", label: "Policies" },
        { icon: "systems", label: "Subprocessors" },
      ],
    },
  },
  // "Technical depth your engineers can find in two clicks": the page types.
  "cybersecurity-web-design:3": {
    framed: true,
    component: IlSiteMap,
    props: {
      root: "Navigation",
      pages: [
        { icon: "devices", label: "Platform pages" },
        { icon: "research", label: "Use-case pages" },
        { icon: "api", label: "Integrations" },
        { icon: "chartSearch", label: "Comparisons" },
        { icon: "doc", label: "Research" },
      ],
    },
  },
  // "A website built to pass your own security review": the bold lead-ins.
  "cybersecurity-web-design:4": {
    framed: true,
    component: IlAccessFlow,
    props: {
      tag: "Role-based publishing",
      steps: [
        { icon: "graphics", label: "Editors" },
        { icon: "ux", label: "Reviewers" },
        { icon: "shield", label: "Publishers", big: true },
      ],
      cardTag: "Attack surface",
      chips: [
        { icon: "code", label: "Fewer third-party scripts" },
        { icon: "doc", label: "Forms that collect less" },
        { icon: "techSeo", label: "Security reviews" },
      ],
    },
  },
  // "Search and AI visibility for security vendors": the content file's tags (outer) and the lead-ins (inner).
  "cybersecurity-web-design:5": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "chartSearch", label: "Comparisons" },
        { icon: "research", label: "Research" },
        { icon: "techSeo", label: "Technical SEO" },
        { icon: "ai", label: "AI visibility" },
      ],
      inner: [
        { icon: "person", label: "Peer recommendations" },
        { icon: "ai", label: "AI answers" },
        { icon: "analytics", label: "Search Console" },
        { icon: "funnel", label: "Pipeline data" },
      ],
    },
  },
  // "Built for the team that runs it after launch": the bold lead-ins; card = ongoing website support.
  "cybersecurity-web-design:6": {
    framed: true,
    component: IlJourney,
    props: {
      tag: "Training & handoff",
      steps: [
        { icon: "systems", label: "Component library" },
        { icon: "cms", label: "CMS" },
        { icon: "ux", label: "Live sessions" },
        { icon: "doc", label: "CMS guide" },
      ],
      cardTag: "Ongoing website support",
      chips: [
        { icon: "calendar", label: "Weekly updates" },
        { icon: "speed", label: "SLA-backed response times" },
      ],
    },
  },

  // /aeo-agency (docs/brief-next-pages.md). Labels from the page text.
  // "Why AI search now shapes B2B software shortlists": the bold lead-ins and source names (stand-in for the four stat tiles).
  "aeo-agency:1": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "ai", label: "Research starts in chat" },
        { icon: "chartSearch", label: "AI in nearly every purchase" },
        { icon: "person", label: "AI names vendors" },
        { icon: "funnel", label: "Fewer clicks" },
      ],
      inner: [
        { icon: "research", label: "G2" },
        { icon: "reporting", label: "Forrester" },
        { icon: "research", label: "G2" },
        { icon: "analytics", label: "Pew Research" },
      ],
    },
  },
  // "What AEO and GEO actually involve": the base layer and blocks in the content note (stand-in for the layered diagram).
  "aeo-agency:2": {
    framed: true,
    component: IlSiteMap,
    props: {
      root: "SEO foundations",
      pages: [
        { icon: "chartSearch", label: "Prompt tracking" },
        { icon: "docPencil", label: "Answer-shaped pages" },
        { icon: "person", label: "Third-party presence" },
        { icon: "systems", label: "Entity consistency" },
      ],
    },
  },
  // "What the evidence says gets cited": the bold lead-ins.
  "aeo-agency:3": {
    framed: true,
    component: IlBuilder,
    props: {
      tag: "What gets cited",
      items: [
        { icon: "reporting", label: "Statistics" },
        { icon: "doc", label: "Quotations" },
        { icon: "research", label: "Lists" },
      ],
      tokens: ["Third-party pages", "Sources"],
    },
  },
  // "How we measure AI search visibility": the content file's tags (outer) and the lead-ins (inner).
  "aeo-agency:4": {
    framed: true,
    component: IlRings,
    props: {
      outer: [
        { icon: "ai", label: "Mention rate" },
        { icon: "doc", label: "Citations" },
        { icon: "analytics", label: "AI referrals" },
        { icon: "techSeo", label: "Search Console" },
      ],
      inner: [
        { icon: "chartSearch", label: "Prompt set" },
        { icon: "funnel", label: "Pipeline" },
        { icon: "research", label: "AI Overviews" },
        { icon: "ai", label: "AI Mode" },
      ],
    },
  },
  // "What you get every month": the bold lead-ins; chips = "what changed, what we shipped and what's next".
  "aeo-agency:5": {
    framed: true,
    component: IlJourney,
    props: {
      tag: "Every month",
      steps: [
        { icon: "reporting", label: "Visibility report" },
        { icon: "code", label: "Shipped work" },
        { icon: "person", label: "Outreach log" },
        { icon: "calendar", label: "Next month's plan" },
      ],
      cardTag: "Growth (SEO/GEO + CRO)",
      chips: [
        { icon: "analytics", label: "What changed" },
        { icon: "devices", label: "What we shipped" },
        { icon: "calendar", label: "What's next" },
      ],
    },
  },
};

export type ResolvedVisual =
  | { kind: "asset"; asset: ImageMetadata }
  | { kind: "diagram"; diagram: DiagramEntry }
  | { kind: "placeholder" };

/**
 * What renders for a visual, in brief 5.9 order. `undefined` = nothing
 * (production without an asset or a diagram: the section is one column).
 */
export function resolveVisual(
  visual: { slug: string; n: number; key: string } | undefined,
  includeDrafts: boolean,
): ResolvedVisual | undefined {
  if (!visual) return undefined;
  const asset = findAsset(visual.slug, visual.n);
  if (asset) return { kind: "asset", asset };
  const diagram = DIAGRAMS[visual.key];
  if (diagram) return { kind: "diagram", diagram };
  return includeDrafts ? { kind: "placeholder" } : undefined;
}

/**
 * Article header illustrations (blog template, lead 2026-10-07), by page.
 * Labels come from the article's text. A page without one keeps the
 * screenshot collage.
 */
export const HEROES: Record<string, DiagramEntry> = {
  // The guide's steps: old URLs, plugins and SEO fields move to new URLs, CMS Collections and 301 redirects.
  "wordpress-to-webflow-migration": {
    component: IlHero,
    props: {
      from: {
        tag: "WordPress",
        items: [
          { icon: "doc", label: "/old-page" },
          { icon: "puzzle", label: "Plugins" },
          { icon: "techSeo", label: "SEO fields" },
        ],
      },
      to: {
        tag: "Webflow",
        items: [
          { icon: "doc", label: "/new-page" },
          { icon: "cms", label: "CMS Collections" },
          { icon: "api", label: "301 redirects" },
        ],
      },
    },
  },
  // What the buyer is doing (learning, evaluating, deciding) and the pages that answer it.
  "b2b-saas-website-pages": {
    component: IlHero,
    props: {
      from: {
        tag: "Buyer",
        items: [
          { icon: "ux", label: "Learning" },
          { icon: "chartSearch", label: "Evaluating" },
          { icon: "reporting", label: "Deciding" },
        ],
      },
      to: {
        tag: "Website",
        items: [
          { icon: "devices", label: "Product pages" },
          { icon: "person", label: "Customers & proof" },
          { icon: "doc", label: "Demo or contact" },
        ],
      },
    },
  },
  // The Enterprise release path (branch, review, approve, publish to staging and production) and roles.
  "webflow-enterprise": {
    component: IlHero,
    props: {
      from: {
        tag: "Page branch",
        items: [
          { icon: "graphics", label: "Branch a page" },
          { icon: "ux", label: "Submit for review" },
          { icon: "shield", label: "Approve" },
        ],
      },
      to: {
        tag: "Release",
        items: [
          { icon: "devices", label: "Staging" },
          { icon: "speed", label: "Production" },
          { icon: "person", label: "Roles & permissions" },
        ],
      },
    },
  },
};
