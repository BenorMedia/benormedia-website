// TODO: COPY — placeholder, replace with the final legal copy before launch.
/**
 * Legal pages content — static copy for `LegalContent`
 * (`src/components/sections/LegalContent.astro`), one entry per page:
 * `/privacy-policy`, `/terms-conditions`, `/cookie-policy` (footer legal
 * links; lead 2026-09-30).
 *
 * Every heading and paragraph below is structure-only placeholder: no terms,
 * data practices, dates or company details are stated. The pages are
 * `noindex` until the real copy lands.
 *
 * `body` is plain text; a blank line (`\n\n`) starts a new paragraph.
 */

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDoc {
  /** `<h1>` and meta title. */
  title: string;
  /** Meta description (≤160 characters). */
  description: string;
  /** Hero description under the title. */
  intro: string;
  sections: LegalSection[];
}

const PLACEHOLDER =
  "Placeholder text. The final copy for this section will be added before launch.";

export const PRIVACY_POLICY: LegalDoc = {
  title: "Privacy Policy",
  description: "How BenorMedia collects, uses and protects personal information.",
  intro: "How we collect, use and protect your personal information.",
  sections: [
    { heading: "Information we collect", body: PLACEHOLDER },
    { heading: "How we use your information", body: PLACEHOLDER },
    { heading: "Sharing your information", body: PLACEHOLDER },
    { heading: "Data retention", body: PLACEHOLDER },
    { heading: "Your rights", body: PLACEHOLDER },
    { heading: "Contact us", body: PLACEHOLDER },
  ],
};

export const TERMS_CONDITIONS: LegalDoc = {
  title: "Terms & Conditions",
  description: "The terms that apply when you use the BenorMedia website.",
  intro: "The terms that apply when you use this website.",
  sections: [
    { heading: "Using this website", body: PLACEHOLDER },
    { heading: "Intellectual property", body: PLACEHOLDER },
    { heading: "Third-party links", body: PLACEHOLDER },
    { heading: "Limitation of liability", body: PLACEHOLDER },
    { heading: "Changes to these terms", body: PLACEHOLDER },
    { heading: "Contact us", body: PLACEHOLDER },
  ],
};

export const COOKIE_POLICY: LegalDoc = {
  title: "Cookie Policy",
  description: "How the BenorMedia website uses cookies and similar technologies.",
  intro: "How this website uses cookies and similar technologies.",
  sections: [
    { heading: "What cookies are", body: PLACEHOLDER },
    { heading: "Cookies we use", body: PLACEHOLDER },
    { heading: "Managing cookies", body: PLACEHOLDER },
    { heading: "Changes to this policy", body: PLACEHOLDER },
    { heading: "Contact us", body: PLACEHOLDER },
  ],
};
