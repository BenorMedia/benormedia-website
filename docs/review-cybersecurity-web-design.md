# Review sheet: /cybersecurity-web-design

Draft version: 1 | Preview: (added after push) | Prepared: 2026-10-09 | Content file: docs/cybersecurity-web-design.md (built as content-pack/content/cybersecurity-web-design.md)

How to use: go to the rows marked `open`. For each, give the fact, or write "delete". Rows marked `ok` were checked against their source by Claude Code; open the source if one looks wrong to you.

| # | Section | Sentence or figure on the page | Tier | Source, or who confirms | Status |
|---|---|---|---|---|---|
| 1 | Hero | "Security and risk companies on our work page include Sublime Security, Unit21, TripleKey ... and Base Operations." | A | https://www.benormedia.com/work lists Sublime Security, Unit21 and Triplekey under "Cybersecurity" and Base Operations under "Security". Note: /work writes "Triplekey"; this page writes "TripleKey", the brand's own spelling | ok |
| 2 | Hero | "... DeepSeas ..." in the same list [VERIFY #CYB-1] | C | Sergio, facts sheet item 7 (DeepSeas is on /work under "Cybersecurity"; the question is whether to keep pointing to it) | open |
| 3 | Hero (marker text) | "Its live site now runs on WordPress, not Webflow" | B | https://www.deepseas.com/ opened today: the page source shows WordPress (wp-content) and the Elementor 4.3.4 generator tag | ok |
| 4 | Hero | Sublime Security described as a security company | B | https://sublime.security/ could not be opened today (HTTP 429, Vercel browser check, with both curl and WebFetch). The content file quotes "Agentic email security tailored to your organization" | open |
| 5 | Hero | Unit21 described as a security and risk company | B | https://www.unit21.ai/ opened today: "The AI company that fights financial crime for you", "Real-time fraud prevention. Automated compliance." (risk and fraud, not classic security, which is why the page says "security and risk") | ok |
| 6 | Hero | TripleKey described as a security and risk company | B | https://www.triplekey.com/ opened today: "TripleKey, Continuous Software Supply Chain Risk Score" | ok |
| 7 | Hero | DeepSeas described as a security company | B | https://www.deepseas.com/ opened today: "Top MDR & Cyber Defense Solutions", managed detection and response, threat intelligence | ok |
| 8 | Hero | Base Operations described as a security company | B | https://www.baseoperations.com/ opened today: "Street-Level Threat Intelligence for Corporate Security" | ok |
| 9 | Section 3 | "In a Sophos-commissioned survey" | B | https://www.sophos.com/en-us/blog/the-cybersecurity-trust-reality-in-2026 opened today: "Conducted by Vanson Bourne, a specialist research firm", commissioned by Sophos | ok |
| 10 | Section 3 | "of 5,000 IT and security decision-makers" | B | Sophos blog (above): "5,000 IT and security decision-makers across 17 countries". The press release the page links to says "5,000 organizations" | ok |
| 11 | Section 3 | "published in March 2026" | B | Neither Sophos page opened today shows a publication date. Only the press release web address contains "2026/03". Confirm the date or write "published in 2026" | open |
| 12 | Section 3 | "79% said new vendors are hard to assess" | B | Sophos blog: "79% of respondents say it's challenging to assess the trustworthiness of new cybersecurity vendors or partners"; press release also says 79% | ok |
| 13 | Section 3 | "47% said vendor information isn't factual or detailed enough" | B | Sophos blog: "Nearly half (47%) say the information vendors provide isn't factual or detailed enough". The linked press release gives no percentage for this | ok |
| 14 | Section 3 | "A Ponemon Institute study published in June 2026" | B | https://ponemonsullivanreport.com/2026/06/the-state-of-cybersecurity-marketing-influence-2026-from-awareness-to-selection-how-buyers-evaluate-vendors/ opened today: "posted ... on June 15, 2026", 320 enterprise cybersecurity decision-makers | ok |
| 15 | Section 3 | "52% of enterprise security buyers think vendor messaging lacks technical depth" | B | Ponemon post (above): "52% say messaging lacks technical depth" | ok |
| 16 | Section 4 | "the strongest trust driver was verifiable evidence of security maturity, such as a public trust center, published advisories, bug bounty programs and third-party certifications" | B | Sophos blog: "verifiable artifacts indicative of cybersecurity maturity" ranked first; examples: vulnerability reward program, publicly accessible trust hub, advisories on product flaws, outside assessments, industry accreditations | ok |
| 17 | Section 4 | "a hosted trust center from a platform such as Vanta, Drata or SafeBase" | B | https://www.vanta.com/products/trust-center opened today (Vanta Trust Center product); https://drata.com/product/trust-center opened today with WebFetch (Drata Trust Center, "Why Drata + SafeBase"); Drata news page: Drata announced it is acquiring SafeBase on 11 Feb 2025 | ok |
| 18 | Section 4 | "A trust page on your site, or a hosted trust center" (that we build or integrate them) | C | Sergio (content file, confirm list item 3) | open |
| 19 | Section 4 | "A /.well-known/security.txt file as defined in RFC 9116" | B | https://www.rfc-editor.org/rfc/rfc9116.html opened today: RFC 9116, security.txt, published April 2022, location /.well-known/security.txt | ok |
| 20 | Section 4b | "tested with browsers, speed and mobile layouts before launch" | A | https://www.benormedia.com/custom-websites-migrations, step 08: "Browsers, speed, accessibility: tested until there's nothing left to find." (mobile layouts are not named there) | ok |
| 21 | Section 4b | "Readable contrast, keyboard navigation and alt text" (the specific accessibility checks) | C | Sergio (content file, confirm list item 6) | open |
| 22 | Section 4b | "A short demo video or a self-guided product tour for buyers who are still researching" [VERIFY #CYB-2] | C | Sergio, facts sheet item 6 | open |
| 23 | Section 5 | "More than half of the buyers in the Ponemon study said vendor content lacks evidence-backed claims and doesn't explain how a product integrates with their existing security tools." | B | Ponemon post: "More than half of respondents cite gaps ... a lack of evidence-backed claims ... and an unclear articulation of how solutions integrate with existing security stacks" | ok |
| 24 | Section 6 | "[Webflow's] security page lists SOC 2 Type II and ISO 27001 among its certifications and describes TLS with HSTS and a CDN with DDoS protection" | B | https://webflow.com/security opened today: certifications include ISO 27001 and SOC 2 ("SOC 2 Type II compliance" in its FAQ); "TLS 1.2+ for all sites", "HSTS enforced by default", "Global CDN with DDoS protection" | ok |
| 25 | Section 6 | "We have completed vendor security questionnaires and security reviews for enterprise clients, and we share our security practices with your team on request." | A | https://www.benormedia.com/webflow-enterprise-agency. Note: the live page says "your security team"; this page says "your team" | ok |
| 26 | Section 7 | "55% discovered vendors through peer recommendations" | B | Ponemon post: "Peer recommendations rank highest at 55%" | ok |
| 27 | Section 7 | "35% already use AI tools in product selection" | B | https://cioinfluence.com/security/new-ponemon-nola-marketing-study-reveals-what-influences-enterprise-cybersecurity-buyers/ opened today: "35% of security teams now use AI tools in the product selection process" | ok |
| 28 | Section 7 | "HIPAA in US healthcare" | B | https://www.hhs.gov/hipaa/index.html could not be opened today (HTTP 403 with curl and WebFetch) | open |
| 29 | Section 7 | "DORA in EU financial services" | B | https://eur-lex.europa.eu/eli/reg/2022/2554/oj could not be opened today (EUR-Lex returned an empty page, HTTP 202, with curl and WebFetch) | open |
| 30 | Section 7 | "NIS2, which covers critical infrastructure operators and other critical sectors in the EU" | B | https://digital-strategy.ec.europa.eu/en/policies/nis2-directive opened today: "cybersecurity in 18 critical sectors across the EU". (The EUR-Lex text of the directive could not be opened, see row 29) | ok |
| 31 | Section 8 | "your team can create a new integration or use-case page in hours, not a sprint" | C | Sergio (content file, confirm list item 2) | open |
| 32 | Section 8 | "Live sessions, video walkthroughs and a CMS guide at handoff." | A | https://www.benormedia.com/custom-websites-migrations: "Live training, video walkthroughs, and documentation your marketers will actually open." and the label "CMS guide" | ok |
| 33 | Section 8 | "Weekly updates and SLA-backed response times" | A | https://www.benormedia.com/ongoing-website-support: "Weekly updates & initiatives", "SLA-backed response times" | ok |
| 34 | Section 9 | "6+ years of experience and 100+ launches speak for themselves." | A | https://www.benormedia.com/ and /custom-websites-migrations (same line in the work grid) | ok |
| 35 | Section 9 | "View All 100+ Projects" | A | https://www.benormedia.com/ (same button) | ok |
| 36 | Section 10 | "Webflow says it isn't HIPAA compliant by default" | A | https://www.benormedia.com/webflow-enterprise-agency; also https://webflow.com/security opened today: "Webflow is not HIPAA compliant by default" | ok |
| 37 | Section 10 | "We handle the website, search engine optimization, AEO and conversion work, not events, paid media or analyst relations." | C | Sergio (content file, confirm list item 4) | open |
| 38 | Section 10 | "We work alongside the marketing partner or demand generation team that owns your marketing strategy." | C | Sergio (content file, confirm list item 7) | open |
| 39 | Section 12 (CTA) | "We'll show you where the site loses those buyers and what to fix first." | C | Sergio (content file, confirm list item 5) | open |
| 40 | FAQ | "missing pricing information was the top reason tech buyers gave for being less likely to buy" | B | https://www.trustradius.com/blog/2023-b2b-disconnect could not be opened today (HTTP 403 with curl and WebFetch). The content file records 54% | open |
| 41 | FAQ | "Webflow's security page lists SOC 2 Type II and ISO 27001 ... its trust center publishes reports your team can review" | B | https://webflow.com/security (row 24); https://trust.webflow.com/ opened today with WebFetch: SOC 2 Type 2 reports and ISO 27001 certificate listed, available on request | ok |
| 42 | FAQ | "It is not HIPAA compliant by default." | A | https://www.benormedia.com/webflow-enterprise-agency | ok |
| 43 | FAQ | "We sign master services and data processing agreements, and we have completed vendor security questionnaires and security reviews for enterprise clients." | A | https://www.benormedia.com/webflow-enterprise-agency: "We sign a master services agreement and a data processing agreement" and the security reviews sentence | ok |
| 44 | FAQ | "We build a trust page into the site, or design around a hosted trust center" | C | Sergio (content file, confirm list item 3) | open |
| 45 | FAQ | "We build most sites in Webflow, migrate sites from WordPress and other platforms, and build custom-coded sites when a project needs it." | C | Sergio. WordPress migrations are on the live site (/webflow-migration); "custom-coded sites" is not checked | open |

## Sign-off

- Facts confirmed by: ________ on ________
- Final edit done by: ________ on ________
- Approved to publish (yes or no): ________
