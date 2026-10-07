/**
 * Seed the FAQ sections of the three service pages (`service.faqSections`)
 * from the lead's FAQ brief "Benor Media — FAQs for the Service Pages"
 * (October 2026).
 *
 * - Custom Websites & Migrations: replaces the old "Web Design And
 *   Development" / "Answer Engine Optimization (AEO)" tabs with
 *   "Custom Websites" + "Migrations".
 * - Growth: "SEO, GEO & AEO" + "CRO" (new).
 * - Ongoing Website Support: one section, no tabs (new).
 *
 * Copy = the brief's FAQPage JSON-LD (section 4), word for word, so the
 * visible answers and the JSON-LD that `FaqSection` builds from them match.
 * Following the brief, every `[CONFIRM]` / `[NOV 1]` marker is left out, as
 * are the two unverified items: the "What platforms can you migrate from?"
 * question and the 6-hour critical-bug sentence. Links are plain text
 * (`portableTextToPlain` drops annotations anyway).
 *
 * - Patches the published document directly (and its draft, if one exists),
 *   so the FAQs go live without leaving pending drafts.
 * - Re-running resets each service's FAQs to this list.
 *
 * Flags:
 *   --dry-run   Plan only, no writes. Log lines prefixed with `[DRY]`.
 *
 * Env (fail-fast, never printed):
 *   PUBLIC_SANITY_PROJECT_ID
 *   PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN   (Editor-or-higher token)
 *
 * Run:
 *   pnpm seed:service-faqs --dry-run
 *   pnpm seed:service-faqs
 */
import 'dotenv/config';
import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

const missing: string[] = [];
if (!projectId) missing.push('PUBLIC_SANITY_PROJECT_ID');
if (!dataset) missing.push('PUBLIC_SANITY_DATASET');
if (!token) missing.push('SANITY_WRITE_TOKEN');
if (missing.length) {
  console.error(`Missing required env var(s): ${missing.join(', ')}`);
  console.error('Set them in .env before running this script.');
  process.exit(1);
}

const DRY_RUN = process.argv.slice(2).includes('--dry-run');
const PREFIX = DRY_RUN ? '[DRY] ' : '';

type Qa = readonly [question: string, answer: string];
interface Section {
  key: string;
  title: string;
  faqs: readonly Qa[];
}

/** Service slug → its FAQ sections (section title = tab label). */
const FAQS: Record<string, readonly Section[]> = {
  'custom-websites-migrations': [
    {
      key: 'custom-websites',
      title: 'Custom Websites',
      faqs: [
        [
          'What makes Benor different from other Webflow agencies?',
          "We bring strategy, design, development, and migration together in one team, and we only build in Webflow. The people who design your site are the people who build it, so nothing gets lost in a handoff. We've launched 100+ websites over six-plus years, mostly for B2B tech companies, and we stay available after launch.",
        ],
        [
          'How long does a website project take?',
          'It depends on the number of pages, how complex your CMS is, and how many integrations we need to wire in. Timelines are set in step one, the website strategy plan, before design or development starts, so you know the plan up front.',
        ],
        [
          'Do you handle both design and development?',
          'Yes. We design in Figma, then build the approved design natively in Webflow with the same team. We start with a component system, so pages come out of it consistently and your team can assemble new layouts later without booking a developer.',
        ],
        [
          'How many revisions do I get?',
          "Unlimited. There's no cap on rounds or feedback. We keep iterating until the work is right, and we've worked this way for five years.",
        ],
        [
          'Will our marketing team be able to update the site without developers?',
          "That's the goal. We build the CMS around how your team works, then hand it over with live training, video tutorials, documentation, and a CMS guide. The handoff is done when running the site feels unremarkable.",
        ],
        [
          'Is the site ready for SEO and AI search?',
          'Yes. Technical SEO, schema, and semantic structure are built into every site, so it works for Google and for AI assistants like ChatGPT and Perplexity. If you want ongoing work on top of that, see Growth (SEO/GEO + CRO).',
        ],
        [
          'What happens after launch?',
          'We include 2 weeks of post-launch assistance. After that you can run the site yourself or keep us on for Ongoing Website Support.',
        ],
        [
          'How much does a project cost?',
          "One-off projects are scoped to your needs: number of pages, CMS complexity, integrations, and migration work. Tell us what you're working on through the contact form and we'll respond with a clear proposal. You can also see Pricing.",
        ],
      ],
    },
    {
      key: 'migrations',
      title: 'Migrations',
      faqs: [
        [
          'How long does a Webflow migration take?',
          'It depends on the size of your site, the amount of content, and the integrations involved. We map the full scope during the strategy plan, so the timeline is based on your actual site, not a guess.',
        ],
        [
          'Will we lose our SEO rankings during the migration?',
          "We do everything we can to prevent it. Migration is where most rebuilds quietly lose rankings, so it's our most supervised step: we start with a content inventory and redirect map, move every page and check it by hand, and test every redirect before launch. Rankings can still move around for a short period after any replatforming, so we monitor them after launch and fix issues quickly.",
        ],
        [
          'What happens to our existing content, blog posts, and URLs?',
          'Everything is accounted for. We inventory your content, design the new sitemap, and map each old URL to its new home before anything is moved. Pages and blog posts are migrated and verified one by one.',
        ],
        [
          'Can you migrate a multi-language site?',
          "Yes. We set up a multi-language CMS and localization workflows, including regional content and SEO, so adding a language later doesn't become a separate project.",
        ],
        [
          'Will our integrations keep working?',
          "Yes. CRM, analytics, forms, and marketing automation are wired in and tested during the build, when it's cheap, not after launch. This includes tools like HubSpot, GA4, Google Tag Manager, Pardot, Clearbit, and Calendly.",
        ],
      ],
    },
  ],
  growth: [
    {
      key: 'seo-geo-aeo',
      title: 'SEO, GEO & AEO',
      faqs: [
        [
          'What are AEO and GEO?',
          'Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) are about making your website easy for AI assistants and answer engines to understand, cite, and recommend. They build on technical SEO, so your brand shows up where buyers now ask their questions: ChatGPT, Perplexity, and Google AI Overviews.',
        ],
        [
          'Why do I need AEO if I already do SEO?',
          "SEO gets you ranked. AEO gets you cited. As more buyers use AI to research solutions, ranking first doesn't help if the AI answers the question without mentioning you. The two share a technical foundation, which is why we do them together.",
        ],
        [
          'What does the Growth plan include?',
          'Content creation, AI search analytics, AI visibility reporting, competitive intelligence, technical optimization, conversion rate experiments, content opportunity analysis, and behavior analysis. See Pricing for the current plan.',
        ],
        [
          'How do you measure AI visibility?',
          'We track how your brand appears in AI answers across ChatGPT, Perplexity, Google AI Overviews, Claude, and Gemini. We define a fixed set of real buyer questions, record a baseline before any work starts, and measure across repeated runs, because AI answers change from one run to the next. Reports show change against that baseline.',
        ],
        [
          'Do you guarantee results?',
          "No. AI answers vary and attribution is still maturing, so we don't promise rankings or revenue outcomes. What we commit to is rigorous measurement of how often you're cited, compared with the baseline and with your competitors.",
        ],
        [
          'How long until I see results?',
          "SEO compounds over time, with early signals in the first few months and bigger impact over six months or more. AI visibility can move sooner than search rankings, but we don't promise a timeline. The plan is billed monthly and you can cancel anytime, though we recommend giving it at least six months to judge.",
        ],
        [
          'Who writes the content?',
          'People do, not AI. Our writers work from briefs built on keyword and competitor research, and every piece is structured so both readers and AI systems can pull clear answers from it. If you already have writers, we can provide AEO briefs instead.',
        ],
        [
          'Do you implement the fixes or just recommend them?',
          'We implement them. Schema, llms.txt, page structure, and technical fixes are built directly in Webflow, with no tickets and no waiting on your dev team. We also recommend which schema types belong on which pages and set them up in your CMS templates where it makes sense.',
        ],
      ],
    },
    {
      key: 'cro',
      title: 'CRO',
      faqs: [
        [
          'What does CRO cover?',
          'Conversion rate optimization is getting more of your existing visitors to book a demo or take another key action. We study how people use your site with heatmaps, scroll maps, click maps, and filtered session replays, then run conversion rate experiments to test improvements.',
        ],
        [
          'How much traffic do I need?',
          "For reliable A/B tests, roughly 8,000–10,000 monthly sessions and 30+ monthly conversions. Below about 5,000 visits a month, tests can't reach trustworthy results. In that case the better first step is growing traffic with SEO and AEO.",
        ],
        [
          'Do you build the changes, or just recommend them?',
          'We build them. Design, Webflow implementation, QA, and launch for every variation are handled by our team.',
        ],
        [
          'How do you report results?',
          "Individual experiments are reported on their own result. Smaller quick wins are tracked as a quarterly trend instead of being credited one by one. We don't compare overall metrics month over month, because they're too noisy to trust.",
        ],
        [
          'What if a test loses?',
          "It's still a result. It tells us what your visitors don't respond to, and it stops you from shipping a change that would have hurt conversion.",
        ],
        [
          'What do you need from us to start?',
          "Access to Webflow, GA4, your CRM (HubSpot or equivalent), and our analytics tool, plus a marketing contact who can respond within 48 hours. We'll also ask about your average deal size, leads per month, and close rate, so we can show what an extra demo is worth.",
        ],
      ],
    },
  ],
  'ongoing-website-support': [
    {
      key: 'ongoing-website-support',
      title: 'Ongoing Website Support',
      faqs: [
        [
          'How is this different from a typical Webflow retainer?',
          'Many retainers are just a ticket queue where you submit requests and wait. We add proactive work on top: weekly updates, quarterly CRO audits, and technical SEO monitoring. You work with a team that knows your brand and your site.',
        ],
        [
          'Are requests really unlimited?',
          'Yes. You can submit as many development, web design, marketing design, and technical SEO requests as you need, with unlimited revisions and unlimited projects. We work through them in the order you prioritize.',
        ],
        [
          'How does turnaround work?',
          'We usually start on a request within 1–3 business days, and we respond to messages within 48 hours. You can follow the status of every request in the dashboard, Slack, or email.',
        ],
        [
          'How many months will I need?',
          'That depends on your goals and your backlog. Plans are billed monthly and you can cancel anytime, so you can stay for a single project or keep us on as an ongoing extension of your team.',
        ],
        [
          'Who will I work with?',
          "A dedicated client manager is your main point of contact, supported by designers and developers who learn your brand and your Webflow build. You're never starting from zero on a new request.",
        ],
        [
          'How will we communicate?',
          "Whichever way suits your team: our dashboard, Slack, or email. We can join your Slack channels, and you can see everything we're working on, what's next, and what's done in ClickUp.",
        ],
        [
          "What's included in the quarterly CRO audits?",
          "Each quarter we review your site's performance data, user behavior, and conversion paths, then implement the improvements: speed fixes, UX refinements, and conversion changes. The output is shipped work, not a report that collects dust.",
        ],
        [
          'Can you handle both design and development?',
          'Yes. Our team covers web design, marketing design, and Webflow development. A new landing page, a campaign update, or a section redesign all go through one team, with no coordination between agencies.',
        ],
        [
          "What if I'm unhappy with the work?",
          'Revisions are unlimited, so we keep iterating until the work is right. Your client manager makes sure your feedback is clear and acted on.',
        ],
        [
          'Can I invite my colleagues, and can I add Growth later?',
          'Yes to both. You can add anyone on your team to the dashboard or Slack, and you can add Growth (SEO/GEO + CRO) any time. The two plans can be combined.',
        ],
      ],
    },
  ],
};

/** `faqSection[]` value with stable `_key`s (re-runs produce the same keys). */
function toFaqSections(sections: readonly Section[]) {
  return sections.map((section) => ({
    _key: section.key,
    _type: 'faqSection',
    title: section.title,
    faqs: section.faqs.map(([question, answer], i) => {
      const key = `${section.key}-${i + 1}`;
      return {
        _key: key,
        _type: 'faq',
        question,
        answer: [
          {
            _key: `${key}-a`,
            _type: 'block',
            style: 'normal',
            markDefs: [],
            children: [{ _key: `${key}-a0`, _type: 'span', marks: [], text: answer }],
          },
        ],
      };
    }),
  }));
}

const client = createClient({
  projectId: projectId!,
  dataset: dataset!,
  apiVersion: '2026-09-25',
  token: token!,
  useCdn: false,
});

interface ServiceRow {
  _id: string;
  slug?: string;
}

async function main(): Promise<void> {
  const docs = await client.fetch<ServiceRow[]>(
    `*[_type == "service"]{ _id, "slug": slug.current }`,
  );
  const published = new Map<string, string>();
  const drafts = new Set<string>();
  for (const doc of docs) {
    if (doc._id.startsWith('drafts.')) drafts.add(doc._id);
    else if (doc.slug) published.set(doc.slug, doc._id);
  }

  const notFound = Object.keys(FAQS).filter((slug) => !published.has(slug));
  if (notFound.length) {
    console.error(`Services not found in Sanity: ${notFound.join(', ')}`);
    process.exit(1);
  }

  let tx = client.transaction();
  for (const [slug, sections] of Object.entries(FAQS)) {
    const id = published.get(slug)!;
    const value = toFaqSections(sections);
    tx = tx.patch(id, { set: { faqSections: value } });
    const draftId = `drafts.${id}`;
    if (drafts.has(draftId)) tx = tx.patch(draftId, { set: { faqSections: value } });
    const summary = sections.map((s) => `${s.title} (${s.faqs.length})`).join(' · ');
    console.log(`${PREFIX}${slug}: ${summary}${drafts.has(draftId) ? ' (+ draft)' : ''}`);
  }

  if (DRY_RUN) {
    console.log(`${PREFIX}${Object.keys(FAQS).length} services would be updated.`);
    return;
  }
  await tx.commit({ visibility: 'sync' });
  console.log(`Updated the FAQs of ${Object.keys(FAQS).length} services.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
