# **Guide Outline**

Main Keyword: webflow enterprise

| Type: | New Guide |
| :---- | :---- |
| **Title (<60 char):** | Webflow Enterprise: What to Check \| BenorMedia (46 characters) |
| **Meta Description (<160 char):** | What makes a website project enterprise, what Webflow Enterprise includes as of October 2026, and how to vet an agency. Sourced from Webflow, Google, and W3C. (158 characters) |
| **Suggested URL:** | https://www.benormedia.com/guides/webflow-enterprise |
| **Alternate Keywords** | webflow for enterprise, webflow enterprise pricing, enterprise webflow agency |
| **Notes:** | Role in the plan: AI visibility; pillar: webflow-enterprise-agency; language and country: en-US, US. Square brackets are directions or gaps for a person to fill. Every gap shows the default that applies if nobody answers it. Links to other new pages go live together with those pages. Status: draft, not approved. A person owns the facts and the final edit. |

Content Outline

\[Eyebrow:\] Guides

# **Webflow Enterprise: security, governance, and what to check before you commit**

\[Byline under the H1 (guides only):\]

By [PERSON #G1: name and role of the person who owns the final edit | default: REPLACE: BenorMedia team] | Published October 6, 2026 | Updated October 6, 2026 | Rechecked every 30 days

An enterprise Webflow project differs from a marketing-site project in who has to say yes: security reviewers, legal and privacy teams, regional teams, and many editors all have a say before launch. Webflow Enterprise is Webflow's plan for larger organizations. This guide shows what it offers, where enterprise projects go wrong, and how to vet an agency.

\[Key takeaways box under the lead:\]

* A website project is an enterprise project when requirements from outside the marketing team, such as security, legal, regional teams, and procurement, set how the site is built, reviewed, and released.
* As of October 2026, Webflow lists single sign-on, custom roles, an audit log API, custom security headers, and contractual SLAs as Enterprise features, so your requirements decide the plan.
* Enterprise projects go wrong at points that can be named in advance: unowned approvals, late security review, redirects at scale, and locale mistakes.
* Evaluate any agency on evidence you can check: its partner profile, access controls, signed documents, rollback plan, named team, and written response times.

## **What makes a website project an enterprise project?**

A website project is an enterprise project when requirements from outside the marketing team set how the site is built, reviewed, and released, whatever the size of the company. Six requirements define it, and each can be checked with a document, a setting, or a named person.

- **Security review.** Security or IT reviews the platform, the site's setup, and the agency's own access before launch.
- **Many editors with different rights.** Several teams edit the site, and some people review changes without publishing them.
- **Approval before release.** A named person signs off before a change goes live, and a release has a planned way back.
- **More than one language or region.** One site serves several locales, and regional teams own their content.
- **Written obligations.** Accessibility targets, privacy rules, and contract terms come from legal or policy, not from design.
- **Support terms.** Response times and escalation paths are written down.

## **What does Webflow Enterprise offer?**

Webflow Enterprise is Webflow's plan for larger organizations, and Webflow's own pages list security, access control, publishing workflow, and support terms among what it adds to other plans. The plan is separate from an agency's partner status, which describes the agency's relationship with Webflow.

Plans and limits change, so confirm each row with Webflow first.

*Table caption: What Webflow says Enterprise includes, as of October 2026*

| Capability | What Webflow says | Source |
|---|---|---|
| Security and compliance evidence | The security page names ISO 27001 and SOC 2 among Webflow's certifications, and the plan differences article lists SOC 2 Type II compliance for Enterprise. The trust center lists a penetration test report, a service level agreement, and CAIQ and SIG Lite self-assessments, with access on request. | [Security page](https://webflow.com/security), [plan differences](https://help.webflow.com/hc/en-us/articles/46651891357971-Differences-between-Enterprise-and-non-Enterprise-plans), [trust center](https://trust.webflow.com/) |
| Single sign-on and provisioning | SSO is available on Enterprise Workspace plans through OAuth or SAML, set up with Webflow's team. Provisioning through SCIM lets your identity provider add Webflow users and remove their access, but Webflow does not currently assign roles or groups through it. | [SSO](https://help.webflow.com/hc/en-us/articles/46651862433683-Single-Sign-On-SSO-Login), [SCIM](https://help.webflow.com/hc/en-us/articles/46651868408595-SCIM-provisioning) |
| Roles and permissions | Workspace owners and admins can create up to 20 custom roles, each built on a Reviewer, Content Editor, Marketer, or Designer role. Enterprise plans can limit editors to specific secondary locales. | [Custom roles](https://help.webflow.com/hc/en-us/articles/46651804072467-Create-and-manage-custom-roles), [locales](https://help.webflow.com/hc/en-us/articles/53682971927571-Manage-your-site-s-locales) |
| Release and approval flow | A designer or editor works on a page branch and submits it for review, and an approver must approve it before it is merged and published. Permissions set who branches, who approves, and who publishes to staging or production. | [Publishing workflow](https://university.webflow.com/videos/publishing-workflow), [design approvals](https://help.webflow.com/hc/en-us/articles/33961229501971-Design-approvals) |
| Audit trail | The Site Activity log records changes to components, CMS content, code, and publishes, and its history does not expire. The Workspace audit log API covers logins and role changes, keeps logs for 1 year, and can feed a security monitoring (SIEM) tool. | [Site Activity log](https://help.webflow.com/hc/en-us/articles/46651707969043-Site-Activity-log), [audit log API](https://help.webflow.com/hc/en-us/articles/46651794799891-Workspace-audit-log-API) |
| Site security settings | Custom security headers, such as Content-Security-Policy and X-Frame-Options, and custom SSL certificates are Enterprise features. You contact Webflow's sales team to switch the headers on for a site, and a republish applies them. | [Custom security headers](https://help.webflow.com/hc/en-us/articles/46651836279059-Custom-security-headers), [security page](https://webflow.com/security) |
| Uptime, support, and limits | The Enterprise page cites 99.99% uptime SLAs, 24/7 support, and a dedicated customer success manager. The help center says other plans have no contractual SLA for uptime or support reply times and carry standard caps on CMS items, Collections, and API requests. | [Enterprise page](https://webflow.com/enterprise), [plan differences](https://help.webflow.com/hc/en-us/articles/46651891357971-Differences-between-Enterprise-and-non-Enterprise-plans) |

If your review requires single sign-on, custom roles, an audit trail, custom security headers, or a contractual SLA, Webflow lists them as Enterprise features, so the requirement decides the plan. Webflow's [pricing page](https://webflow.com/pricing) shows Enterprise as Custom, with no price, and the [Webflow pricing guide](https://www.benormedia.com/guides/webflow-pricing) covers the other plans.

\[Full-width image suggestion: A left-to-right release path: branch a page, submit for review, approve, merge, publish to staging, publish to production, with the role that acts at each step written under it. Text outside the image. Alt text: "Release path in Webflow Enterprise from page branch to review, approval, staging, and production"\]

## **How long does an enterprise website project take?**

There is no fixed length: an enterprise website project runs as long as its templates, locales, content, integrations, reviews, and approvals require.

*Table caption: What adds time to an enterprise website project and what shortens it*

| Driver | Why it adds time | What shortens it |
|---|---|---|
| Templates and locales | Each template and each locale repeats design, build, and review work. | Fix both lists before design starts. |
| Content volume | Every page and CMS item must be moved, checked, and approved. | Inventory content early and retire pages nobody needs. |
| Integrations | Each connected system needs access, testing, and an owner. | List them in the first weeks, with an owner for each. |
| Review turnaround | Security, legal, and privacy reviews each have their own queue. | Send review material as soon as it exists. |
| Approval steps | Each extra approver adds waiting time to every change. | Name one approver per area and match the Workspace roles. |

Ask any agency for a plan by phase with each review shown as its own line, because a late review moves every later date. Two Webflow steps can sit on the critical path: SSO is set up with Webflow's team, and custom security headers are switched on through its sales team.

## **What goes wrong on enterprise projects, and how is it prevented?**

Enterprise Webflow projects go wrong at points that can be named in advance, from unowned approvals to late security review, redirects at scale, and locale mistakes.

*Table caption: What goes wrong on an enterprise Webflow project, why it matters, and how to prevent it*

| What goes wrong | Why it matters | How to prevent it |
|---|---|---|
| Nobody owns approval | Changes wait in a queue or go live unreviewed. Webflow can set who approves, but only once someone decides the names. | Write the release path, name one approver per area before design starts, and set Workspace roles to match. |
| Security review starts late | Questions about access, headers, or single sign-on after design sign-off reopen decisions. | Give the security team the platform evidence, access plan, and role map in the first weeks. |
| Roles are assumed to sync from the identity provider | Webflow says SCIM does not currently assign roles or groups, so each role is set in Webflow. | Keep a role map, set the role when a person is added, and review the map on a schedule. |
| Redirects at scale | Webflow recommends at most 1,000 redirect rules and wildcard rules where possible, and Google advises keeping redirects for generally at least 1 year. | Group URLs into patterns, test the list on a staging copy, and keep it live for at least a year. |
| Locale and hreflang mistakes | Hreflang tags tell Google which language or region a page serves, and Google ignores them when two pages do not point to each other. Webflow adds them to its generated sitemap, but a custom sitemap needs them added by hand. | Keep a locale map and check that every version lists itself and all the others. |
| Content freeze with no end date | Content moved early goes stale, or editors are locked out too long. | Set freeze dates in the plan and schedule one final content pass before launch. |
| Editors who are not trained | New roles and review steps get bypassed. | Train each role on its own tasks, with short guides that match your approval flow. |

## **How do you evaluate an agency for an enterprise Webflow site?**

Evaluate an agency for an enterprise Webflow site on evidence you can check, and get each answer in writing. These eight questions work for any agency, BenorMedia included, and the [guide to choosing a Webflow agency](https://www.benormedia.com/guides/how-to-choose-a-webflow-agency) covers the wider decision.

1. **Partner status.** Open the agency's profile in Webflow's partner directory, check that it matches what you were told, and ask the agency to state its partner status in writing.
2. **Access and security.** Ask how the agency controls access to your Workspace and hosting account, how that access ends, and whether it will complete your security questionnaire.
3. **Contracts.** Ask which documents the agency signs, such as a master services agreement, a data processing agreement, and an NDA, and which legal entity signs them.
4. **Releases and rollbacks.** Ask who approves a release and how a rollback works. Webflow creates restore points as you work, and restoring a backup changes the Published on date of CMS items, so a rollback needs a plan.
5. **Team.** Ask who will work on the project and in which roles, who you will talk to day to day, and whether any work goes to freelancers or partners.
6. **Support.** Ask for response times in writing, the hours they cover, and the escalation path for a critical bug.
7. **Accessibility and languages.** Ask which version and level of the Web Content Accessibility Guidelines (WCAG) the agency builds to and how it tests. WCAG 2.2 defines three levels: A, AA, and AAA. Ask how it handles locale URLs and hreflang.
8. **References and handover.** Ask to speak to a client with similar review requirements, and ask what documentation, training, and ownership transfer you get at the end.

## **When is Webflow not the right fit for an enterprise site?**

Webflow suits an enterprise team whose website is a marketing and content system. Another option is better in these cases:

- **The site is mainly a product application.** A logged-in product with its own features is a different build, and a Webflow marketing site would sit beside it.
- **The site must handle protected health information.** Webflow says it is not HIPAA compliant by default and is not designed to store or process such information.
- **Procurement requires a certification the platform does not hold.** Compare the requirement with the evidence on Webflow's security page and trust center before you shortlist the platform.
- **Your editors need an approval flow Webflow does not offer.** Map each approval step to the release flow described above before you commit.
- **You only need a refreshed marketing site for one team of editors.** A smaller plan or a simpler build may be enough, and the [Webflow pricing guide](https://www.benormedia.com/guides/webflow-pricing) covers the other plans.

## **How was this guide written and checked?**

Every Webflow row in this guide was read on Webflow's own pages, listed at the end, on 6 or 7 October 2026, and each is marked as of October 2026 because plans and limits change. The guide is rechecked every 30 days. BenorMedia, a Webflow Professional Partner, builds Webflow sites for B2B companies, including large ones, so it has an interest in the topic. To see how BenorMedia works on enterprise projects, read about its [Webflow enterprise agency service](https://www.benormedia.com/webflow-enterprise-agency).

[VERIFY #G2: confirm in the Webflow partner dashboard that Webflow Professional Partner is BenorMedia's exact current status | default: KEEP]

\[Add accordion FAQs section, as on https://www.benormedia.com/custom-websites-migrations\]

## **Questions about Webflow Enterprise**

### **Is Webflow secure enough for an enterprise website?**

Webflow publishes security evidence your security team can judge against its own requirements. Its security page names ISO 27001 and SOC 2 among its certifications, and its trust center lists reports and self-assessments. Webflow also says it is not HIPAA compliant by default. As of October 2026, Enterprise adds single sign-on, custom roles, and audit logs.

### **How is Webflow Enterprise priced?**

Webflow does not publish an Enterprise price. As of October 2026 its pricing page shows Enterprise as custom, with a button to talk to its sales team. Its help center says Enterprise limits on CMS items, Collections, and API requests can exceed the standard caps on other plans.

### **Do you need Webflow Enterprise for an enterprise website?**

Only if your requirements call for what Webflow reserves for it. As of October 2026 Webflow lists single sign-on, SCIM provisioning, custom roles, the audit log API, custom security headers, and contractual SLAs for uptime and support reply times as Enterprise features. If your review needs none of them, compare current plan limits before assuming Enterprise.

### **Is Webflow Enterprise the same as an agency's partner status?**

No. Webflow Enterprise is Webflow's plan for larger organizations, and your site and Workspace run on it. An agency's partner status describes its relationship with Webflow and is a separate matter. Ask any agency to state its status in writing, and compare it with the agency's profile in Webflow's partner directory.

### **Can Webflow run a multi-language enterprise site?**

Yes, through Webflow's Localize add-on. As of October 2026 Webflow says it translates pages and CMS content, customizes styles, assets, and page settings per locale, and includes hreflang tags in its generated sitemap. Enterprise plans can limit editors to specific secondary locales. The number of locales depends on your plan.

### **What should an agency be able to sign and provide for enterprise procurement?**

Ask for the list of documents it signs, such as a master services agreement, a data processing agreement and an NDA, which legal entity signs them, and how long each takes. Send your security questionnaire early so that the answers arrive before design is final.

## **Talk to BenorMedia about your own site**

Questions about applying this to your own site? One of our team members will be in touch within 24 hours.

\[CTA button: Get in Touch (same link as the header button)\]

\[Related links for the closing block, pillar first:\]

* [Webflow enterprise agency](https://www.benormedia.com/webflow-enterprise-agency)
* [How to choose a Webflow agency (page planned)](https://www.benormedia.com/guides/how-to-choose-a-webflow-agency)
* [Webflow pricing (page planned)](https://www.benormedia.com/guides/webflow-pricing)
* [How to migrate from WordPress to Webflow](https://www.benormedia.com/guides/wordpress-to-webflow-migration)

\[Sources list at the foot of the page:\]

* [Webflow: Enterprise](https://webflow.com/enterprise), accessed October 7, 2026
* [Webflow: Plans and pricing](https://webflow.com/pricing), accessed October 6, 2026
* [Webflow: Security](https://webflow.com/security), accessed October 6, 2026
* [Webflow Trust Center](https://trust.webflow.com/), accessed October 6, 2026
* [Webflow Help Center: Differences between Enterprise and non-Enterprise plans](https://help.webflow.com/hc/en-us/articles/46651891357971-Differences-between-Enterprise-and-non-Enterprise-plans), accessed October 7, 2026
* [Webflow Help Center: Create and manage custom roles](https://help.webflow.com/hc/en-us/articles/46651804072467-Create-and-manage-custom-roles), accessed October 6, 2026
* [Webflow Help Center: Single Sign-On (SSO) Login](https://help.webflow.com/hc/en-us/articles/46651862433683-Single-Sign-On-SSO-Login), accessed October 6, 2026
* [Webflow Help Center: SCIM provisioning](https://help.webflow.com/hc/en-us/articles/46651868408595-SCIM-provisioning), accessed October 7, 2026
* [Webflow Help Center: Workspace audit log API](https://help.webflow.com/hc/en-us/articles/46651794799891-Workspace-audit-log-API), accessed October 6, 2026
* [Webflow Help Center: Site Activity log](https://help.webflow.com/hc/en-us/articles/46651707969043-Site-Activity-log), accessed October 6, 2026
* [Webflow Help Center: Design approvals](https://help.webflow.com/hc/en-us/articles/33961229501971-Design-approvals), accessed October 6, 2026
* [Webflow University: Enterprise publishing workflow](https://university.webflow.com/videos/publishing-workflow), accessed October 6, 2026
* [Webflow Help Center: Custom security headers](https://help.webflow.com/hc/en-us/articles/46651836279059-Custom-security-headers), accessed October 6, 2026
* [Webflow Help Center: Localization overview](https://help.webflow.com/hc/en-us/articles/33961240752147-Localization-overview), accessed October 6, 2026
* [Webflow Help Center: Manage your site's locales](https://help.webflow.com/hc/en-us/articles/53682971927571-Manage-your-site-s-locales), accessed October 6, 2026
* [Webflow Help Center: Localized SEO and locale routing](https://help.webflow.com/hc/en-us/articles/33961235675155-Localized-SEO-and-locale-routing), accessed October 7, 2026
* [Webflow: Localization features](https://webflow.com/feature/localize), accessed October 6, 2026
* [Webflow Help Center: Save and restore backups](https://help.webflow.com/hc/en-us/articles/33961244069395-Save-and-restore-backups), accessed October 6, 2026
* [Webflow Help Center: How do I set up redirects in Webflow?](https://help.webflow.com/hc/en-us/articles/33961294898835), accessed October 6, 2026
* [Google Search Central: Tell Google about localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions), accessed October 6, 2026
* [Google Search Central: Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), accessed October 7, 2026
* [W3C: Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), accessed October 6, 2026
* [W3C WAI: WCAG 2 overview](https://www.w3.org/WAI/standards-guidelines/wcag/), accessed October 7, 2026

Schema Markup

\[Direction: the build generates this markup from the front matter with the site's own JSON-LD helper. It follows the pattern on the live service pages. The FAQ answers are the same text as the visible FAQ.\]

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.benormedia.com/guides/webflow-enterprise#article",
      "headline": "Webflow Enterprise: security, governance, and what to check before you commit",
      "description": "What makes a website project enterprise, what Webflow Enterprise includes as of October 2026, and how to vet an agency. Sourced from Webflow, Google, and W3C.",
      "url": "https://www.benormedia.com/guides/webflow-enterprise",
      "mainEntityOfPage": "https://www.benormedia.com/guides/webflow-enterprise",
      "inLanguage": "en-US",
      "datePublished": "2026-10-06",
      "dateModified": "2026-10-06",
      "author": {
        "@type": "Organization",
        "@id": "https://www.benormedia.com/#organization",
        "name": "BenorMedia"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.benormedia.com/#organization",
        "name": "BenorMedia",
        "url": "https://www.benormedia.com/"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Webflow secure enough for an enterprise website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Webflow publishes security evidence your security team can judge against its own requirements. Its security page names ISO 27001 and SOC 2 among its certifications, and its trust center lists reports and self-assessments. Webflow also says it is not HIPAA compliant by default. As of October 2026, Enterprise adds single sign-on, custom roles, and audit logs."
          }
        },
        {
          "@type": "Question",
          "name": "How is Webflow Enterprise priced?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Webflow does not publish an Enterprise price. As of October 2026 its pricing page shows Enterprise as custom, with a button to talk to its sales team. Its help center says Enterprise limits on CMS items, Collections, and API requests can exceed the standard caps on other plans."
          }
        },
        {
          "@type": "Question",
          "name": "Do you need Webflow Enterprise for an enterprise website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Only if your requirements call for what Webflow reserves for it. As of October 2026 Webflow lists single sign-on, SCIM provisioning, custom roles, the audit log API, custom security headers, and contractual SLAs for uptime and support reply times as Enterprise features. If your review needs none of them, compare current plan limits before assuming Enterprise."
          }
        },
        {
          "@type": "Question",
          "name": "Is Webflow Enterprise the same as an agency's partner status?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Webflow Enterprise is Webflow's plan for larger organizations, and your site and Workspace run on it. An agency's partner status describes its relationship with Webflow and is a separate matter. Ask any agency to state its status in writing, and compare it with the agency's profile in Webflow's partner directory."
          }
        },
        {
          "@type": "Question",
          "name": "Can Webflow run a multi-language enterprise site?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, through Webflow's Localize add-on. As of October 2026 Webflow says it translates pages and CMS content, customizes styles, assets, and page settings per locale, and includes hreflang tags in its generated sitemap. Enterprise plans can limit editors to specific secondary locales. The number of locales depends on your plan."
          }
        },
        {
          "@type": "Question",
          "name": "What should an agency be able to sign and provide for enterprise procurement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ask for the list of documents it signs, such as a master services agreement, a data processing agreement and an NDA, which legal entity signs them, and how long each takes. Send your security questionnaire early so that the answers arrive before design is final."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.benormedia.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Guides",
          "item": "https://www.benormedia.com/guides"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Webflow Enterprise",
          "item": "https://www.benormedia.com/guides/webflow-enterprise"
        }
      ]
    }
  ]
}
</script>
```

\[Direction: replace the Organization author above with the named person once gap G1 is answered\]

---

## For the editor (not part of the page)

Blocked by: nothing. Draft flag: true.

Look at first:

* This is the long, sourced guide. The short commercial page is webflow-enterprise-agency. Check that the two do not repeat each other.
* Every Webflow row is dated October 2026 and listed under volatile. Recheck on release day, because Webflow's own pages differ in places.
* Resolve G2 before release. Checklist item 1 tells buyers to compare an agency's directory profile with what it says.
* The primary keyword is not in the Ahrefs export. Check its volume after the 13 October reset.

Gaps on this page:

| Id | Kind | Question | Default if nobody answers |
| :---- | :---- | :---- | :---- |
| #G1 | PERSON | name and role of the person who owns the final edit | REPLACE: BenorMedia team |
| #G2 | VERIFY | confirm in the Webflow partner dashboard that Webflow Professional Partner is BenorMedia's exact current status | KEEP |

Facts to recheck before release (last checked 2026-10-07):

* Webflow shows Enterprise pricing as Custom with a Talk to us button and no price. Source: https://webflow.com/pricing. Recheck: open the pricing page and confirm Enterprise still shows custom pricing and no number
* Enterprise limits on CMS items, Collections, and API requests can exceed the standard caps on other plans; other plans have no contractual SLA for uptime or support reply times; SSO, SCIM, custom roles, the audit log API, custom SSL certificates, security headers, and SOC 2 Type II compliance are listed as Enterprise features. Source: https://help.webflow.com/hc/en-us/articles/46651891357971-Differences-between-Enterprise-and-non-Enterprise-plans. Recheck: reread the plan differences article and confirm each item is still listed for Enterprise only
* The Enterprise page cites 99.99% uptime SLAs, 24/7 support, and a dedicated customer success manager. Source: https://webflow.com/enterprise. Recheck: confirm the uptime figure and the support wording on the Enterprise page
* The security page names ISO 27001 and SOC 2; the trust center lists a penetration test report, a service level agreement, and CAIQ and SIG Lite self-assessments; Webflow is not HIPAA compliant by default. Source: https://webflow.com/security. Recheck: reread the security page and the trust center and confirm the named items and the HIPAA sentence
* SSO is for Enterprise Workspace plans, uses OAuth or SAML, and is set up with Webflow's team; SCIM lets the identity provider add Webflow users and remove their access, and Webflow does not currently assign roles or groups through it. Source: https://help.webflow.com/hc/en-us/articles/46651868408595-SCIM-provisioning. Recheck: reread the SSO and SCIM articles and confirm the plan, the protocols, and the roles and groups limit
* Up to 20 custom roles on four base roles; Enterprise plans can restrict editors to specific secondary locales. Source: https://help.webflow.com/hc/en-us/articles/46651804072467-Create-and-manage-custom-roles. Recheck: confirm the role limit, the base roles, and the locale restriction sentence
* Enterprise publishing workflow (branch, review, approve, merge) and design approvals. Source: https://university.webflow.com/videos/publishing-workflow. Recheck: confirm the steps, the permission wording, and the Enterprise availability sentence
* Site Activity log history does not expire; the Workspace audit log API keeps logs for 1 year. Source: https://help.webflow.com/hc/en-us/articles/46651794799891-Workspace-audit-log-API. Recheck: confirm both retention sentences
* Custom security headers are Enterprise only, switched on through Webflow's sales team, and applied on republish. Source: https://help.webflow.com/hc/en-us/articles/46651836279059-Custom-security-headers. Recheck: confirm the plan sentence, the sales contact step, and the republish sentence
* Localization is an add-on; hreflang tags are in the generated sitemap and a custom sitemap needs them added by hand; the locale count depends on the plan. Source: https://help.webflow.com/hc/en-us/articles/33961235675155-Localized-SEO-and-locale-routing. Recheck: reread the localization feature page, the locales article, and the localized SEO article
* Webflow recommends 1,000 redirects as a maximum and wildcard redirects where possible. Source: https://help.webflow.com/hc/en-us/articles/33961294898835. Recheck: confirm the redirect recommendation sentence on the redirects article
* Restore points are created automatically and by hand; restoring changes the Published on date of Collection items. Source: https://help.webflow.com/hc/en-us/articles/33961244069395-Save-and-restore-backups. Recheck: confirm the restore point and Published on sentences

Links to add on other pages, pointing here:

* On https://www.benormedia.com/webflow-enterprise-agency: anchor "Webflow Enterprise guide", in the intro and in the FAQ, one link each
* On https://www.benormedia.com/guides: anchor "Webflow Enterprise", in the list of guides on Webflow and enterprise sites
