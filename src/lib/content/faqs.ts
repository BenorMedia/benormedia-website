// TODO: COPY — placeholder, replace with final copy.
/**
 * FAQ content — static page copy for `FaqSection`
 * (`src/components/sections/FaqSection.astro`).
 *
 * Exported per group so the service template can reuse a single group, and
 * as `PRICING_FAQ_GROUPS` for the Pricing page tabs.
 *
 * Source: `docs/refs/pricing/FAQs.jpg` shows only the "Web Design And
 * Development" questions and one lorem answer. At the lead's request every
 * answer below, and the whole "Answer Engine Optimization (AEO)" group, is
 * generated placeholder copy based only on what the pricing cards state
 * (unlimited requests and revisions, cancel anytime, dashboard / Slack /
 * email updates, dedicated client manager, fast turnaround, AI search
 * analytics, AI visibility reporting…). No numbers, turnaround times,
 * guarantees or prices were invented.
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

// TODO: COPY — questions from the ref; answers are placeholders.
export const FAQ_WEB_DESIGN_DEVELOPMENT: FaqGroup = {
  label: "Web Design And Development",
  value: "web-design-development",
  items: [
    {
      question: "Are requests really unlimited?",
      answer:
        "Yes. You can submit as many development, web design, marketing design and technical SEO requests as you need. We work through them in the order you prioritize, and revisions are unlimited too.",
    },
    {
      question: "How many months will I need?",
      answer:
        "It depends on your goals and your backlog. Plans are billed monthly and you can cancel anytime, so you can stay for a single project or keep us on as an ongoing extension of your team.",
    },
    {
      question: "How does the turnaround time work?",
      answer:
        "We work on your requests in the order you set and keep turnaround fast. You can follow the status of every request via our dashboard, Slack or email.",
    },
    {
      question: "What if I'm still unhappy with the work at the end?",
      answer:
        "Revisions are unlimited, so we keep iterating until the work is right. Your dedicated client manager makes sure your feedback is clear and acted on.",
    },
    {
      question: "How will I communicate with you?",
      answer:
        "Whichever way suits your team: our dashboard, Slack or email. You also get a dedicated client manager as your main point of contact.",
    },
  ],
};

// TODO: COPY — questions and answers are placeholders (not in the ref).
export const FAQ_AEO: FaqGroup = {
  label: "Answer Engine Optimization (AEO)",
  value: "aeo",
  items: [
    {
      question: "What is Answer Engine Optimization (AEO)?",
      answer:
        "AEO makes your website and content easy for AI assistants and answer engines to understand, cite and recommend. It builds on technical SEO so your brand shows up where buyers now ask their questions.",
    },
    {
      question: "What does the Growth plan include?",
      answer:
        "Content creation, AI search analytics, AI visibility reporting, competitive intelligence, technical optimization, conversion rate experiments, content opportunity analysis and behavior analysis.",
    },
    {
      question: "How do you measure AI visibility?",
      answer:
        "With AI search analytics and regular AI visibility reporting, we track how your brand appears in AI-generated answers and how that compares with your competitors.",
    },
    {
      question: "How does conversion rate optimization fit in?",
      answer:
        "More visibility only helps if visitors convert. We run conversion rate experiments and behavior analysis on your site to turn that traffic into leads.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. The Growth plan is billed monthly and you can cancel anytime.",
    },
  ],
};

/** Pricing page tabs, in ref order. */
export const PRICING_FAQ_GROUPS: readonly FaqGroup[] = [FAQ_WEB_DESIGN_DEVELOPMENT, FAQ_AEO];
