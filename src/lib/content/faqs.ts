/**
 * FAQ content: the types and FAQPage helper for `FaqSection`
 * (`src/components/sections/FaqSection.astro`, used by the service template
 * with Sanity FAQs), and the Pricing page FAQ (`PRICING_FAQ`, rendered with
 * `NpFaq`).
 *
 * `answer` is plain text; a blank line (`\n\n`) starts a new paragraph.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  /** Tab label. */
  label: string;
  /** Stable key: tab value and the base of the panel / accordion ids. */
  value: string;
  items: FaqItem[];
}

/**
 * Pricing page FAQ (content refresh brief 2026-11-16, task 4B; Sergio,
 * 2026-11-17). Final copy. Answers are Markdown-lite: `[text](/path)` links
 * render through the new-pages link resolver (`faqEntries`), and FAQPage
 * gets the anchor words only.
 */
export const PRICING_FAQ_HEADING = "Pricing and plan FAQs";

export const PRICING_FAQ: readonly { q: string; a: string }[] = [
  {
    q: "How does BenorMedia's unlimited web design and development plan work?",
    a: "The Design + Development plan is a monthly subscription for unlimited web design, marketing design, and web development requests. You add requests, set the order, and we work through them with unlimited revisions. It's billed monthly, you can cancel anytime, and a dedicated client manager is your main contact.",
  },
  {
    q: "Are design and development requests really unlimited?",
    a: "Yes. You can submit as many development, web design, marketing design, and technical SEO requests as you need, and revisions are unlimited too. We work through them in the order you prioritize, and you can change that order whenever your plans change.",
  },
  {
    q: "How fast is the turnaround on requests?",
    a: "We work on your requests in the order you set and keep turnaround fast. You can follow the status of every request in our dashboard, in Slack, or by email, and your dedicated client manager makes sure your feedback is clear and acted on.",
  },
  {
    q: "Is there a minimum contract, and can we cancel anytime?",
    a: "There's no long contract. The Design + Development and Growth plans are billed monthly and you can cancel anytime. One Off projects work differently: they have a fixed scope agreed before work starts, so they suit a single build with a clear end date.",
  },
  {
    q: "How many months will we need?",
    a: "It depends on your goals and your backlog. You can stay for a single project, such as a redesign, or keep us on as an ongoing extension of your team. Because the plans are billed monthly, you can stop when the work is done.",
  },
  {
    q: "What if we're not happy with the work?",
    a: "Revisions are unlimited, so we keep iterating until the work is right. Your dedicated client manager makes sure your feedback is clear and acted on, and because the plans are billed monthly with no long contract, you're never locked in.",
  },
  {
    q: "How do we send requests and talk to your team?",
    a: "Whichever way suits your team: our dashboard, Slack, or email. You also get a dedicated client manager as your main point of contact. We're based in Barcelona, and our hours cover the European working day and overlap with every US time zone.",
  },
  {
    q: "Is a monthly plan or a one-off project better for a new website?",
    a: "A One Off project suits a new site or a redesign with a fixed scope: Webflow development, conversion-focused design, design and development systems, technical SEO, and training, with several review rounds. The monthly Design + Development plan suits teams with a steady flow of pages, campaigns, and updates. Our [Webflow development agency](/custom-websites-migrations) page shows how a build runs.",
  },
  {
    q: "Is the Growth plan an SEO retainer?",
    a: "Yes: a monthly retainer for SEO, AEO, and CRO. It includes content creation, AI search analytics, AI visibility reporting, competitive intelligence, technical optimization, conversion rate experiments, content opportunity analysis, and behavior analysis, billed monthly and cancellable anytime. Our [B2B SaaS SEO agency](/growth) page shows how it runs.",
  },
  {
    q: "How does Webflow agency pricing work at BenorMedia?",
    a: "Two ways: a monthly plan (Design + Development or Growth), cancellable anytime, or a One Off project with a fixed scope. The prices are in the plan cards above. Webflow bills its own site plan, which covers hosting, separately; our [Webflow pricing breakdown](/blog/webflow-price-increase) lists every Webflow plan.",
  },
];

/**
 * FAQPage JSON-LD (schema.org) from FAQ groups: one Question per item with a
 * question and an answer, answer as plain text. `null` when there are none.
 * Used by FaqSection.
 */
export function faqPageLd(groups: readonly FaqGroup[]): Record<string, unknown> | null {
  const answered = groups.flatMap((group) =>
    group.items.filter((item) => item.question.trim().length > 0 && item.answer.trim().length > 0),
  );
  if (answered.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/\s*\n\s*\n\s*/g, "\n\n").trim(),
      },
    })),
  };
}
