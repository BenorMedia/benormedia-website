---
slug: webflow-security-php2shell
url: /blog/webflow-security-php2shell
pageType: guide
draft: false
blockedBy: []
topicId: "2.8"
wave: 1
title: "Webflow Security After PHP2Shell: What Changes | BenorMedia"
description: "What the October 2026 PHP2Shell flaws mean for WordPress and PHP sites, what Webflow security covers for you, and the work your team still owns."
h1: "Webflow security after PHP2Shell: what a hosted site takes off your patch list"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-21
updatedAt: 2026-10-21
reviewEvery: 14 days
primaryKeyword: "webflow security"
secondaryKeywords: ["is webflow secure", "php vulnerabilities", "is wordpress secure", "wordpress security issues"]
takeaways:
  - "PHP2Shell is two critical flaws in PHP itself, CVE-2026-109618 and CVE-2026-109619, fixed on October 21, 2026 in PHP 8.2.35, 8.3.36, 8.4.27, and 8.5.12."
  - "Because the flaws sit in the PHP runtime, updating WordPress, themes, or plugins does not fix them; the server's PHP version has to change."
  - "A site hosted on Webflow gives your team no PHP installation, plugin, or server to patch, because Webflow manages hosting and security updates at the platform level."
  - "Webflow security still leaves work with you: account access, custom code, third-party scripts, form destinations, and any other system your site connects to."
  - "If any part of your web presence runs on PHP, such as a blog, help center, or landing-page subdomain, patch it now or ask your hosting provider when it will be patched."
faqHeading: "Questions about Webflow security and PHP2Shell"
faq:
  - q: "Is Webflow affected by PHP2Shell?"
    a: "A site hosted on Webflow has no PHP installation that your team manages, so there is nothing for you to patch on the site itself. Webflow says it monitors for vulnerabilities and deploys updates automatically. Code or services you connect to the site, such as a separate WordPress blog, are outside that coverage."
  - q: "Is Webflow secure enough for a B2B SaaS company?"
    a: "Webflow lists SOC 2 Type II, ISO 27001, ISO 27017, and ISO 27018 among its certifications, enforces HTTPS with TLS 1.2 or later, and includes DDoS protection on all hosted sites. Enterprise plans add custom security headers and a 99.99% uptime SLA. Webflow is not HIPAA compliant by default."
  - q: "What security features does Webflow Enterprise add?"
    a: "Webflow Enterprise adds SSO over SAML or OAuth that can be required, SCIM or JIT provisioning, custom roles and approval workflows, an audit log API with 1 year of retention, custom security headers and SSL certificates, and SLAs for uptime and incident response. Confirm SLA terms in your contract."
  - q: "Do I need to update WordPress plugins to fix PHP2Shell?"
    a: "No. PHP2Shell is in PHP itself, so plugin and theme updates do not fix it. The server must run a patched PHP release or a vendor backport. Plugins still need their own updates for other issues."
  - q: "Is WordPress secure?"
    a: "WordPress can be run securely, but the owner or host is responsible for the whole stack: PHP, the web server, WordPress core, themes, and plugins. In 2026, both WordPress core (July) and PHP (October) needed emergency updates for remote code execution flaws."
  - q: "What should I do if I cannot patch PHP right away?"
    a: "The UK NCSC advises applying the PHP team's temporary mitigations and, if that is not possible, considering taking the system offline. A web application firewall can block known exploit patterns while you patch, but Cloudflare says its rules are not a substitute for updating PHP."
related:
  - /webflow-migration
  - /guides/wordpress-to-webflow-migration
  - /ongoing-website-support
  - /guides/webflow-enterprise
  - /blog/website-maintenance-checklist
sources:
  - label: "PHP: Upcoming Critical PHP Security Release (news, October 20, 2026)"
    url: https://www.php.net/index.php
    accessed: 2026-10-21
  - label: "PHP (php-src on GitHub): RCE via OOM corruption, GHSA-w8hw-w9fx-j79w (CVE-2026-109618)"
    url: https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w
    accessed: 2026-10-21
  - label: "PHP (php-src on GitHub): RCE via stale global state, GHSA-6wmf-4rv5-p3rp (CVE-2026-109619)"
    url: https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp
    accessed: 2026-10-21
  - label: "PHP: Supported Versions"
    url: https://www.php.net/supported-versions.php
    accessed: 2026-10-21
  - label: "UK National Cyber Security Centre: Critical security issue affecting PHP"
    url: https://www.ncsc.gov.uk/news/critical-security-issue-affecting-php
    accessed: 2026-10-21
  - label: "Cloudflare: Cloudflare deploys protections against php2shell vulnerability"
    url: https://blog.cloudflare.com/php-vulnerabilities-waf-protection/
    accessed: 2026-10-21
  - label: "Wiz: PHP2Shell research"
    url: https://www.wiz.io/blog/php2shell-php-rce
    accessed: 2026-10-21
  - label: "W3Techs: Usage statistics of PHP for websites"
    url: https://w3techs.com/technologies/details/pl-php
    accessed: 2026-10-21
  - label: "WordPress.org: WordPress 7.0.2 release"
    url: https://wordpress.org/documentation/?p=16369429
    accessed: 2026-10-21
  - label: "Webflow: Secure hosting without the hassles"
    url: https://webflow.com/hosting
    accessed: 2026-10-21
  - label: "Webflow: Information security program"
    url: https://www.webflow.com/security
    accessed: 2026-10-21
  - label: "Webflow Help Center: Webflow hosting overview"
    url: https://help.webflow.com/hc/en-us/articles/33961342422547
    accessed: 2026-10-21
  - label: "Webflow Help Center: Custom security headers"
    url: https://help.webflow.com/hc/en-us/articles/46651836279059-Custom-security-headers
    accessed: 2026-10-21
  - label: "Webflow Help Center: Save and restore backups"
    url: https://help.webflow.com/hc/en-us/articles/33961244069395
    accessed: 2026-10-21
  - label: "Webflow Help Center: Two-factor authentication (2FA)"
    url: https://help.webflow.com/hc/en-us/articles/33961343631891-Two-factor-authentication-2FA
    accessed: 2026-10-21
  - label: "Webflow Help Center: Password protect your site or web pages"
    url: https://help.webflow.com/hc/en-us/articles/33961298873235-Password-protect-your-site-or-web-pages
    accessed: 2026-10-21
  - label: "Webflow: Trust Center"
    url: https://trust.webflow.com/
    accessed: 2026-10-21
  - label: "Webflow: Data Processing Agreement"
    url: https://webflow.com/legal/dpa
    accessed: 2026-10-21
  - label: "Webflow: Webflow Enterprise"
    url: https://webflow.com/enterprise
    accessed: 2026-10-21
  - label: "Webflow Help Center: Single Sign-On (SSO) Login"
    url: https://help.webflow.com/hc/en-us/articles/33961357812371
    accessed: 2026-10-21
  - label: "Webflow Help Center: Audit log API"
    url: https://help.webflow.com/hc/en-us/articles/40787420311315-Audit-log-API
    accessed: 2026-10-21
  - label: "Help Net Security: PHP2Shell: Critical PHP vulnerabilities patched, update now!"
    url: https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/
    accessed: 2026-10-21
volatile:
  - "PHP2Shell fixed versions 8.2.35, 8.3.36, 8.4.27, 8.5.12 and CVSS v4 9.2 (source: php-src GitHub advisories, October 21, 2026)"
  - "Exploitation status: Cloudflare observed attack traffic before release (source: Cloudflare blog, October 21, 2026); recheck for CISA KEV listing"
  - "Webflow Enterprise SSO, SCIM, audit log API (1 year retention), incident response SLAs, Whistic profile (sources: Webflow Enterprise page and Help Center, October 21, 2026)"
  - "PHP share 69.3% and version split PHP 8 65.2%, PHP 7 27.0%, PHP 5 7.7% (source: W3Techs, October 21, 2026)"
  - "PHP 8.2 security support ends December 31, 2026 (source: php.net supported versions)"
  - "Webflow certifications, HSTS default, backups, custom headers on Enterprise only (sources: Webflow security page and Help Center, checked October 21, 2026)"
volatileChecked: 2026-10-21
inbound:
  - page: /webflow-migration
    anchor: "what PHP2Shell means for WordPress sites"
    sentence: "Add near the plugin section: a WordPress plugin cannot run in Webflow, and neither does a PHP runtime your team has to patch."
  - page: /ongoing-website-support
    anchor: "Webflow security and the work your team still owns"
    sentence: "Add where the page lists what support covers, to explain the split between Webflow's platform and your team."
  - page: /blog/website-maintenance-checklist
    anchor: "what to do when a critical PHP flaw lands"
    sentence: "Add to the security section as a dated example of an emergency patch."
editorNotes:
  - "News peg: the value drops after about 2 weeks. Publish fast or retitle as an evergreen Webflow security post."
  - "Topic 2.8 is new (not in the 2026-10-14 bank). Sergio requested it in chat on 2026-10-21."
  - "Check for a Webflow statement on PHP2Shell before publishing; none was found on 2026-10-21."
  - "Published 2026-10-21 (lead): marker #P28-1 removed at its default (delete this sentence)."
---

Webflow security works differently from a WordPress or other PHP site: a site hosted on Webflow gives your team no PHP installation, plugin, or server to patch, so the PHP2Shell flaws fixed on October 21, 2026 add nothing to your own patch list. This post is for marketing leads and founders at B2B SaaS companies who own the marketing site, including teams facing an enterprise security review, and it reflects the facts as of October 2026.

## What happened with PHP2Shell in October 2026?

PHP2Shell is the name given to two critical vulnerabilities in PHP itself, CVE-2026-109618 and CVE-2026-109619, which the PHP project fixed on October 21, 2026. Both are rated 9.2 on CVSS v4.0, and both can let an attacker run code on a web server without logging in.

The timeline moved fast. On October 20, the PHP security team announced an emergency release for 14:00 UTC the next day and said it might ship earlier if details became public or attacks appeared. Details did leak. Cloudflare says it "observed attack traffic targeting our customers" before the official release and deployed web application firewall (WAF) rules for all plans, including free ones.

The two advisories describe memory-safety bugs in how PHP handles fatal errors:

- **CVE-2026-109618 (RCE via OOM corruption).** When PHP runs out of memory early in a request, it can leave request data half-initialized, and cleanup later treats it as valid. The advisory says this can lead to unauthenticated remote code execution as the web worker account, validated against mod_php with default limits.
- **CVE-2026-109619 (RCE via stale global state).** Request-owned state can survive after its memory is freed, so the next request on the same worker can use it. Confirmed paths run through PHP 8.5 fatal error backtraces and session upload progress, validated against mod_php and PHP-FPM.

Researchers at Wiz, among the credited reporters, say they first reported the issues to PHP in August 2026. They also say they confirmed unauthenticated remote code execution against the latest WordPress, Drupal, and Joomla container images, and that "even a simple 'Hello World' application" on an affected version can be vulnerable.

Table: PHP versions that fix PHP2Shell (October 21, 2026)

| PHP branch | Fixed release | Upstream support status |
| --- | --- | --- |
| 8.5 | 8.5.12 | Active support |
| 8.4 | 8.4.27 | Active support |
| 8.3 | 8.3.36 | Security fixes only |
| 8.2 | 8.2.35 | Security fixes only, ends December 31, 2026 |
| 8.1 and older | No upstream release | End of life; check your Linux distribution or host for backports |

## Why do PHP vulnerabilities put WordPress sites at risk, and is WordPress secure?

PHP vulnerabilities like these sit below the application, so every WordPress site, plugin, and theme inherits them from the server. Cloudflare puts it plainly: updating website code or plugins alone does not fix these flaws, because they are in the PHP runtime.

That is a large surface. W3Techs reports that PHP is used by 69.3% of websites whose server-side language it can identify (October 21, 2026). Among those PHP sites, 27.0% run PHP 7 and 7.7% run PHP 5, versions the PHP project no longer supports. Those sites get no upstream fix and depend on a host or vendor that backports one. Here, outdated software means the language itself, not only an old plugin.

PHP2Shell is also the second emergency of its kind for WordPress sites in 2026. On July 17, 2026, WordPress 7.0.2 fixed a REST API batch-route confusion and SQL injection chain that led to remote code execution in WordPress core. Both of these WordPress vulnerabilities came from the core software and the language under it, not from a plugin. Plugin vulnerabilities still matter as well, because every one of the third party plugins on a WordPress site adds code that runs on the server.

So, is WordPress secure? WordPress can be run securely with good security practices, but someone has to own every layer: the server, PHP, WordPress core, themes, plugins, logins, and backups. When that owner is a strong managed host, most of the stack is covered. When it is a marketing team with a one-off developer, the gaps show up exactly in weeks like this one.

The question for a B2B SaaS marketing lead is less "is WordPress secure?" and more "who on my side applies security updates when PHP needs an emergency patch?" If the answer is unclear, that gap is the biggest risk to your site security.

## Is Webflow secure against PHP vulnerabilities?

For the site itself, yes in the sense that matters to your team: Webflow is a completely managed hosting platform, so there is no PHP version, plugin, or server configuration on your Webflow site for you to find and update. Webflow's help center says the managed hosting means "you don't have to worry about scalability, site downtime, or applying security patches."

Webflow describes its hosting environment as combining AWS infrastructure with Cloudflare's global CDN. On its hosting page, it says, "We continuously monitor for new security vulnerabilities and deploy updates automatically," and that customers have "no updates to run, packages to install, or capacity planning." Unlike WordPress, a Webflow site does not install server plugins: a WordPress plugin cannot run in Webflow, so features come from built-in settings, integrations, or custom code that runs in the browser.

Two caveats keep this honest:

1. Webflow does not publish which server software runs its platform, and it had not posted a statement on PHP2Shell when this was written. The accurate claim is about responsibility: platform patching is Webflow's job, not yours.
2. A managed platform moves risk; it does not remove it. If Webflow had a flaw of its own, you would depend on its security team to fix it. That is the trade you make with any hosted service, and it is why the certifications and security documentation below matter in procurement.

We build and migrate Webflow sites for B2B companies, so we have an interest in the topic.

## What security features does Webflow include, from DDoS protection to SOC 2 Type II?

Webflow security covers the hosting environment, encryption, DDoS protection, and recovery by default, and Webflow Enterprise adds the security controls that vendor reviews often ask for. The table lists what Webflow states on its own pages as of October 2026.

Table: Webflow security features by plan, as stated by Webflow (October 2026)

| Feature | What Webflow states | Plans |
| --- | --- | --- |
| Encryption | TLS 1.2 or later for all sites, encrypted data at rest, free SSL certificates that renew automatically | All hosted sites |
| HTTP Strict Transport Security | HSTS enforced by default; Enterprise customers can configure it | All, configurable on Enterprise |
| DDoS protection | Global CDN with protection against DDoS attacks and built-in rate limiting | All hosted sites |
| Platform patching | Automated patches and updates with no customer maintenance | All hosted sites |
| Backups | Restore points every 50th auto-save; unlimited backups on paid Site plans | Paid Site plans (Starter is limited) |
| Account login protection | Two-factor authentication with an authentication app and 8 single-use backup codes | All accounts |
| Password protection | Restrict access to a page, folder, or whole site; uploaded files stay public by direct URL | Site plans and paid Workspaces |
| Custom security headers | Content-Security-Policy, X-Frame-Options, and others | Enterprise only |
| Compliance | SOC 2 Type II, ISO 27001, ISO 27017, ISO 27018, ISO 42001, PCI DSS, GDPR, and CCPA | Company-wide |
| HIPAA | Not HIPAA compliant by default | Not offered by default |
| Uptime | 99.99% uptime SLA | Enterprise |

SSL certificates also mean browsers do not show "not secure" warnings, which protects user trust as much as the data transmitted between visitors and your site.

For procurement, Webflow's Trust Center lists its security documentation, including SOC 2 Type 2 reports, an annual pentest report, CAIQ and SIG Lite self-assessments, and a Shared Security Responsibility Model. Sensitive documents sit behind a "Get access" request, so ask for them early in a security review. The Trust Center states that Webflow is "independently audited for SOC 2 Type II and certified ISO 27001 compliant." For GDPR, Webflow's Data Processing Agreement says it acts as a processor for customer personal information, except for customer relationship data, where it is an independent controller.

Two practical notes. Webflow does not offer scheduled backups, so take a manual backup before large changes. And if you are asking whether Webflow is HIPAA compliant, Webflow's own answer is that it is not HIPAA compliant by default, so healthcare organizations should not collect protected health information through Webflow forms.

## What does Webflow Enterprise add for security teams?

Webflow Enterprise adds the identity, audit, and contract controls that enterprise security teams usually require before they approve a vendor: single sign-on that can be enforced, automated provisioning, an audit log API, custom security headers, and written SLAs for uptime and incident response. If your company runs a heavy vendor security review, start with these.

A week like PHP2Shell shows why. When a critical flaw lands, your security team asks every vendor the same questions: were you affected, when did you patch, and who do we call? Webflow's Enterprise page lists "defined incident response SLAs and a clear escalation path," which gives that question a contractual owner. On a self-managed PHP stack, the owner is your own team.

Table: Enterprise security questions and what Webflow Enterprise offers (October 2026)

| What the security team asks | What Webflow Enterprise offers |
| --- | --- |
| Can we control logins through our identity provider? | SSO over SAML or OAuth, optional or required for Workspace members |
| Can access follow our HR system? | SCIM or JIT provisioning when SSO is enabled |
| Who can change and publish the site? | Custom roles, granular permissions, and approval, branching, and staging workflows |
| Can we monitor access changes? | Audit log API covering logins, role changes, memberships, and invitations, kept for 1 year and usable in a SIEM |
| Can we set our own browser security policy? | Custom security headers such as Content-Security-Policy, plus custom SSL certificates |
| What happens if something goes wrong? | 99.99% uptime SLA, 24/7 support with a priority queue, and defined incident response SLAs |
| How do we complete the vendor review? | Trust Center documents and an Enterprise Whistic profile |

Three details matter in a review. Guest members do not need SSO even when it is enforced, so list every guest, including agency accounts, and decide who keeps access. The audit log API is pull-based, and Webflow says logs are available "within at least 10 minutes of the event," so your security team has to poll it rather than wait for alerts. And custom security headers, which help against cross site scripting attacks, are available only on Enterprise, so a site on another plan cannot set its own Content-Security-Policy header.

These are the terms Webflow publishes; confirm the SLA wording and response times in your own contract. For the rest of the plan, including timelines and governance, see our guide on [what to check before you buy Webflow Enterprise](/guides/webflow-enterprise), and our [Webflow Enterprise agency](/webflow-enterprise-agency) page covers how we run those projects.

## What security work stays with your team, from login credentials to access controls?

Your team still owns everything that is not the platform: who can log in, what code you add, where customer data goes, and any other system the site connects to. On a hosted site, these are the parts of site security that remain yours.

- **Login credentials and access controls.** Turn on two-factor authentication with an authenticator app for every account, give each person the lowest role that works, and remove access the day someone leaves. Unique passwords plus a second factor blunt brute force attacks and repeated login attempts. Shared logins defeat all of this.
- **Custom code and third-party scripts.** Every tag manager container, chat widget, or embed runs JavaScript code in your visitors' browsers. A compromised script can run malicious code on every page. Keep an owner and a purpose for each script and remove the ones nobody can explain.
- **Form destinations and data handling.** Know which CRM, automation, or webhook receives each form, and do not collect sensitive data or personally identifiable information you do not need.
- **Staging and private pages.** Use password protection to restrict access to unreleased pages, and remember that Webflow says uploaded files are not restricted and can be opened by direct URL.
- **The rest of your web presence.** A WordPress blog, help center, careers site, or landing-page tool on a subdomain still runs its own stack. If any of it runs PHP, PHP2Shell applies to it today.
- **Your domain and DNS.** Protect the registrar account with two-factor authentication, because whoever controls DNS controls where your site points.
- **Incident response.** Write down who can lock accounts, restore a backup, and contact Webflow support, so a bad day does not start with a search for passwords.

Our [website maintenance checklist](/blog/website-maintenance-checklist) covers how often to review each of these.

## How does Webflow security compare with WordPress security?

The main difference from traditional CMS platforms is who patches what. On a self-managed WordPress site your team or hosting provider applies security patches to the server, PHP, core, themes, and plugins; on Webflow, the platform patches the hosting layer and you manage access and the code you add.

Table: Who handles each security task, Webflow vs self-managed WordPress

| Security task | Webflow | Self-managed WordPress |
| --- | --- | --- |
| PHP and server patching | Webflow | You or your hosting provider |
| CMS core updates | Webflow | You or your hosting provider |
| Plugin and theme updates | No plugins to update | You |
| SSL certificates | Automatic | You or your host |
| DDoS protection and WAF | Built in at the CDN | Depends on host or add-on |
| Backups | Built in; manual before big changes | You or your host |
| Logins and user roles | You | You |
| Custom code and scripts | You | You |

Neither column is risk-free. A well-run WordPress site on a strong managed host can be safer than a Webflow site with shared logins and unreviewed scripts. What changes on Webflow is the maintenance burden: the hardest layer to staff, emergency server patching, is no longer on your team's list.

## What should you do this week if part of your site runs on PHP?

Patch first, then reduce how much of your site depends on a server you have to patch. The UK NCSC's guidance for PHP2Shell gives a clear order, summarized here.

1. **Find every PHP installation**, starting with internet-facing ones: the main site, blog, help center, staging servers, and any appliance or service that bundles PHP.
2. **Update to a fixed release** (8.2.35, 8.3.36, 8.4.27, or 8.5.12) or your vendor's backport. If a host manages PHP for you, ask them for a date in writing.
3. **Apply temporary mitigations** from the PHP advisories if you cannot update yet, such as disabling session upload progress, and keep web application firewalls in front of the site. Cloudflare says its WAF rules are not a substitute for patching PHP.
4. **Consider taking a system offline** if you can neither patch nor mitigate it quickly, as the NCSC advises.
5. **Check for signs of compromise.** Wiz lists unusual multipart requests followed by memory-limit errors, repeated HTTP 500 responses, oversized or malformed PHPSESSID cookies, and unexplained PHP worker restarts.

Once the emergency is over, decide whether your marketing site needs a server at all. If it is mostly pages, a blog, and forms, a managed platform removes a whole class of PHP vulnerabilities from your patch list. Our [WordPress to Webflow migration guide](/guides/wordpress-to-webflow-migration) explains how to move without losing search traffic, and our [WordPress to Webflow migration](/webflow-migration) service handles the move for you.
