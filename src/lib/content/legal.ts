/**
 * Legal pages content — static copy for `LegalContent`
 * (`src/components/sections/LegalContent.astro`), one entry per page:
 * `/privacy-policy`, `/terms-conditions`, `/cookie-policy` (footer legal
 * links; lead 2026-09-30).
 *
 * Privacy Policy + Terms & Conditions (lead 2026-10-05): original copy,
 * structured after flowninja.com's pages and written for BenorMedia's own
 * setup (Barcelona, GDPR + LOPDGDD, contact form → Google Workspace email,
 * Google Tag Manager, Vercel hosting). Approved by the lead as written.
 * Cookie Policy is still placeholder.
 *
 * TODO: COPY — `LEGAL_NAME` is the trade name; replace it with the
 * registered company name and add its tax ID (NIF / CIF) once confirmed.
 *
 * `body` is plain text; a blank line (`\n\n`) starts a new paragraph. A
 * paragraph whose lines all start with "- " renders as a bulleted list.
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

const LEGAL_NAME = "BenorMedia";
const ADDRESS = "C/ Dos de Maig E1 6D, 08013 Barcelona, Spain";
const EMAIL = "info@benor.media";
const UPDATED = "Last updated: 5 October 2026.";

export const PRIVACY_POLICY: LegalDoc = {
  title: "Privacy Policy",
  description:
    "How BenorMedia collects, uses, stores and protects the personal information you share through our website, contact forms and client services.",
  intro: `How we collect, use and protect your personal information. ${UPDATED}`,
  sections: [
    {
      heading: "Who we are",
      body: `${LEGAL_NAME} ("BenorMedia", "we", "us") is a web design, development and growth agency based in ${ADDRESS}. We are the data controller for the personal data described in this policy.

This policy explains what personal data we collect when you visit benor.media, contact us or work with us, why we use it, who we share it with and the rights you have. We process personal data in line with the EU General Data Protection Regulation (GDPR) and the Spanish Organic Law 3/2018 on Data Protection and Guarantee of Digital Rights (LOPDGDD).

For any question about this policy or your data, write to ${EMAIL}.`,
    },
    {
      heading: "Information we collect",
      body: `We only collect the data we need for the purposes described below:

- Contact details: your name, email address and company name, when you fill in our contact form or email us.
- Project details: the budget range you select and anything you choose to tell us in your message.
- Business and billing details: for clients, the contact, invoicing and payment details needed to deliver and bill our services.
- Correspondence: the emails, calls and messages we exchange with you.
- Usage data: information about how you use our website, such as pages visited, time on page, referring website, approximate location, device and browser type, collected through cookies and similar technologies (see "Cookies and analytics").

We do not ask for sensitive data (such as health information or political opinions) and ask you not to send it to us.`,
    },
    {
      heading: "How we use your information",
      body: `We use your personal data to:

- Answer your enquiry and prepare proposals or quotes you ask for.
- Deliver, manage and invoice the services we provide to our clients.
- Communicate with you about an ongoing project or relationship.
- Understand how our website is used and improve its content, performance and conversion.
- Keep our website and systems secure and prevent misuse of our forms.
- Meet our legal, tax and accounting obligations.

We do not sell your personal data, and we do not use it for automated decision-making that has legal or similarly significant effects on you.`,
    },
    {
      heading: "Legal bases for processing",
      body: `We rely on the following legal bases under Article 6 of the GDPR:

- Taking steps at your request before entering into a contract, and performing that contract: answering enquiries, preparing proposals and delivering our services.
- Our legitimate interests: running and improving our business and website, keeping it secure, and keeping in touch with existing business contacts. We balance these interests against your rights and you can object at any time.
- Your consent: for non-essential cookies and analytics, and for any marketing emails. You can withdraw your consent at any time, without affecting processing that happened before.
- Legal obligations: keeping invoices and accounting records as required by Spanish law.`,
    },
    {
      heading: "Who we share your data with",
      body: `We share personal data only with service providers that help us run our business, under data processing agreements that require them to protect it and use it only on our instructions:

- Google (Google Workspace and Google Tag Manager / Google Analytics): email, documents and website analytics.
- Vercel: hosting of our website and of the contact form endpoint.
- Other tools we use to manage projects, communication and invoicing with clients.

We may also disclose data to public authorities, courts or professional advisers (such as lawyers and accountants) when the law requires it or to protect our legal rights.`,
    },
    {
      heading: "International transfers",
      body: `Some of our service providers are based in, or store data in, countries outside the European Economic Area, such as the United States. When that happens, we make sure the transfer is protected by an adequacy decision of the European Commission (including the EU-US Data Privacy Framework, where the provider is certified) or by the European Commission's Standard Contractual Clauses.`,
    },
    {
      heading: "Cookies and analytics",
      body: `Our website uses cookies and similar technologies, including Google Tag Manager and Google Analytics, to understand how visitors use the site and to improve it. Some cookies are strictly necessary for the site to work; analytics cookies are only used in line with your choices.

You can block or delete cookies in your browser settings at any time. Our Cookie Policy explains the cookies we use in more detail.`,
    },
    {
      heading: "How long we keep your data",
      body: `We keep personal data only for as long as we need it for the purpose it was collected for:

- Enquiries that do not lead to a project: up to 2 years after our last contact.
- Client data: for the duration of our relationship, and afterwards for as long as needed to meet our legal obligations and to handle possible claims (for example, accounting and tax records are kept for the periods Spanish law requires).
- Analytics data: for the retention period set in our analytics tools, up to 14 months.

When data is no longer needed, we delete it or anonymise it.`,
    },
    {
      heading: "How we protect your data",
      body: `We use appropriate technical and organisational measures to protect personal data against loss, misuse and unauthorised access, including encrypted connections (HTTPS), access controls and reputable service providers. No method of transmission over the internet is completely secure, but we work to protect your data and review our measures regularly.`,
    },
    {
      heading: "Your rights",
      body: `Under data protection law you have the right to:

- Access the personal data we hold about you.
- Ask us to correct inaccurate or incomplete data.
- Ask us to delete your data.
- Ask us to restrict how we use your data.
- Object to processing based on our legitimate interests, and to direct marketing at any time.
- Receive your data in a portable format, or ask us to send it to another organisation.
- Withdraw your consent at any time, where we rely on it.

To exercise any of these rights, email ${EMAIL}. We will reply within one month. We may ask you to confirm your identity before acting on a request.

If you think we have not handled your data properly, you can file a complaint with the Spanish Data Protection Agency (Agencia Española de Protección de Datos, www.aepd.es) or with the data protection authority of the EU country where you live or work. We would appreciate the chance to address your concern first.`,
    },
    {
      heading: "Children",
      body: `Our website and services are aimed at businesses and are not directed at children under 14. We do not knowingly collect personal data from children.`,
    },
    {
      heading: "Changes to this policy",
      body: `We may update this policy from time to time, for example when we change the tools we use or when the law changes. The date at the top of this page shows when it was last updated. If we make significant changes, we will make that clear on this page.`,
    },
    {
      heading: "Contact us",
      body: `${LEGAL_NAME}
${ADDRESS}
${EMAIL}`,
    },
  ],
};

export const TERMS_CONDITIONS: LegalDoc = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that apply when you use the BenorMedia website or work with our Webflow design, development and growth services.",
  intro: `The terms that apply when you use this website. ${UPDATED}`,
  sections: [
    {
      heading: "About these terms",
      body: `These terms and conditions ("Terms") apply to your use of the website benor.media (the "Website"), operated by ${LEGAL_NAME} ("BenorMedia", "we", "us"), ${ADDRESS}.

By using the Website you agree to these Terms. If you do not agree with them, please do not use the Website.

These Terms cover the Website only. Design, development, growth and support services we provide to clients are governed by the proposal, statement of work or agreement signed with each client, which takes precedence over these Terms for those services.`,
    },
    {
      heading: "Our services",
      body: `Through the Website you can learn about our services (custom websites and migrations, growth through SEO, GEO and CRO, and ongoing website support), see examples of our work and pricing, and contact us about a project.

Information on the Website, including prices and plan descriptions, is for general information and does not constitute a binding offer. A project starts only once we have both agreed to a written proposal or agreement.`,
    },
    {
      heading: "Using the Website",
      body: `We grant you a personal, non-exclusive, non-transferable and revocable licence to access and use the Website for your own information and to get in touch with us. You agree not to:

- Copy, modify, distribute, sell or otherwise exploit the Website or its content for commercial purposes without our written permission.
- Use the Website in a way that is unlawful, harmful or that could damage, disable or overload it.
- Use robots, scrapers or other automated means to access or collect content or data from the Website.
- Try to gain unauthorised access to the Website, its servers or any connected systems.
- Send false information, spam or malicious content through our contact form.

We may suspend or restrict access to the Website, in whole or in part, at any time and without notice.`,
    },
    {
      heading: "Intellectual property",
      body: `The Website and its content, including text, graphics, illustrations, logos, layout, code and the selection and arrangement of that content, are owned by BenorMedia or our licensors and are protected by intellectual property laws. "BenorMedia" and our logo are our trade names and marks.

Client names, logos, screenshots and testimonials shown on the Website belong to their respective owners and are used with their permission to present our work. Nothing in these Terms gives you any right to use them.`,
    },
    {
      heading: "Your privacy",
      body: `Our Privacy Policy explains how we collect and use personal data when you use the Website or contact us. By using the Website you acknowledge that we process your data as described there.`,
    },
    {
      heading: "Emails",
      body: `We only email you when you contact us, when you are a client, or when you have asked to receive information from us. You can ask us to stop sending you non-essential emails at any time by replying to any of them or writing to ${EMAIL}.`,
    },
    {
      heading: "Third-party links",
      body: `The Website may link to third-party websites, such as our clients' sites, partners or social networks. We do not control those websites and are not responsible for their content, availability or privacy practices. Visiting them is at your own risk.`,
    },
    {
      heading: "Disclaimer",
      body: `We work to keep the Website accurate, up to date and available, but it is provided "as is" and "as available". We do not guarantee that it will always be available, uninterrupted or free of errors or viruses, or that its content is complete or suited to your needs. Results shown in case studies and testimonials reflect specific projects and are not a promise of the results of a future project.`,
    },
    {
      heading: "Limitation of liability",
      body: `To the fullest extent permitted by law, BenorMedia is not liable for any indirect or consequential loss, or for loss of profits, revenue, data or business opportunities, arising from your use of, or inability to use, the Website or its content.

Nothing in these Terms limits or excludes liability for death or personal injury caused by negligence, for fraud or wilful misconduct, or for any other liability that cannot be limited or excluded under applicable law, including the consumer protection rights you may have.`,
    },
    {
      heading: "Indemnification",
      body: `You agree to indemnify BenorMedia against claims, losses and costs (including reasonable legal fees) arising from your breach of these Terms, your violation of any law or third-party rights, or your misuse of the Website.`,
    },
    {
      heading: "Changes to these terms",
      body: `We may update these Terms from time to time. The date at the top of this page shows when they were last updated. Changes apply from the moment they are published; continuing to use the Website after that means you accept the updated Terms.`,
    },
    {
      heading: "Governing law and disputes",
      body: `These Terms are governed by Spanish law. Any dispute relating to the Website or these Terms will be submitted to the courts of Barcelona, Spain, unless the law gives you, as a consumer, the right to bring proceedings in the courts of the place where you live.`,
    },
    {
      heading: "General",
      body: `These Terms are the entire agreement between you and us about your use of the Website. If any provision is found invalid or unenforceable, the rest remain in force. If we do not enforce a right under these Terms, that does not waive it. You may not transfer your rights under these Terms without our consent.`,
    },
    {
      heading: "Contact us",
      body: `${LEGAL_NAME}
${ADDRESS}
${EMAIL}`,
    },
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
