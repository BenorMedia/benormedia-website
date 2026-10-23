---
slug: webflow-mcp
url: /blog/webflow-mcp
pageType: guide
draft: false
blockedBy: []
topicId: "2.5"
wave: 2
title: "Webflow MCP: What to Allow on a Marketing Site | BenorMedia"
description: "The Webflow MCP server lets AI tools edit, publish, and delete on your site. What each action does, what to allow or block, and a review policy that works."
h1: "Webflow MCP on a live marketing site: what AI tools can change, and what we would allow"
lang: en-US
author: "Sergio Gancedo, Managing Director"
publishedAt: 2026-10-23
updatedAt: 2026-10-23
reviewEvery: none
primaryKeyword: "webflow mcp"
secondaryKeywords: []
takeaways:
  - "The Webflow MCP server is a remote server that connects AI tools such as Claude, ChatGPT, and Cursor to your site through OAuth. It's on all Site plans, including free Starter, and doesn't use Webflow AI credits."
  - "Its tools can publish the site, publish or delete CMS items, replace custom code and robots.txt, and delete scripts, so treat a connection like a new contractor's access."
  - "The server enforces your Webflow role, including custom roles, so connect with the smallest role that works and keep your AI tool's approval prompts on."
  - "New and updated CMS items are saved as drafts. Review changes on the staging domain before a person publishes to the live site."
  - "Webflow has no scheduled backups and documents no undo for agent changes, so back up before big sessions. On Enterprise, the Site Activity log shows changes made through MCP."
faqHeading: "Questions about the Webflow MCP server"
faq:
  - q: "What is the Webflow MCP server?"
    a: "It's a remote server that connects AI tools to your Webflow site through the Model Context Protocol. You sign in with OAuth and choose which sites and Workspace to authorize, and the tool can then read and change content, design, and settings within your Webflow permissions."
  - q: "Does the Webflow MCP server cost extra?"
    a: "No. Webflow says it's available on all Site plans, including the free Starter plan, and that using it doesn't consume Webflow AI credits. Usage counts toward your AI tool's own plan or credits. Analytics data needs the Analyze or Optimize add-on."
  - q: "Can an AI agent publish my Webflow site?"
    a: "Yes, if your role allows it. The publish_site action makes the latest changes live, and CMS items and individual pages can be published too. Webflow suggests that fully independent agents publish to a staging domain and verify changes there."
  - q: "Can I undo changes made through Webflow MCP?"
    a: "Webflow documents no undo for MCP changes. Deleting a registered script is irreversible, and deleted assets can't be restored through the API. Webflow creates a restore point on every 50th auto-save, and only Site managers can restore a backup."
  - q: "Does Webflow use my site content to train AI models?"
    a: "Webflow says it doesn't use customer or partner data to train generative AI models. The AI tool you connect has its own data terms, so check them before you authorize a site."
related:
  - /webflow-enterprise-agency
  - /guides/webflow-enterprise
  - /ongoing-website-support
sources:
  - label: "Webflow Developers: Webflow MCP server overview"
    url: https://developers.webflow.com/mcp/reference/overview
    accessed: 2026-10-23
  - label: "Webflow Developers: How the MCP server works"
    url: https://developers.webflow.com/mcp/reference/how-it-works
    accessed: 2026-10-23
  - label: "Webflow Developers: MCP FAQs"
    url: https://developers.webflow.com/mcp/faqs
    accessed: 2026-10-23
  - label: "Webflow Developers: MCP data tools"
    url: https://developers.webflow.com/mcp/tools/data-tools
    accessed: 2026-10-23
  - label: "Webflow Developers: MCP Designer tools"
    url: https://developers.webflow.com/mcp/tools/designer-tools
    accessed: 2026-10-23
  - label: "Webflow Developers: Beta MCP server"
    url: https://developers.webflow.com/mcp/installing/beta
    accessed: 2026-10-23
  - label: "Webflow Help Center: Webflow MCP server overview"
    url: https://help.webflow.com/hc/en-us/articles/52536562285203-Webflow-MCP-server-overview
    accessed: 2026-10-23
  - label: "Webflow Help Center: Connect your AI tools to the Webflow MCP server"
    url: https://help.webflow.com/hc/en-us/articles/52536616701971-Connect-your-AI-tools-to-the-Webflow-MCP-server
    accessed: 2026-10-23
  - label: "Webflow Help Center: Connect Claude to Webflow"
    url: https://help.webflow.com/hc/en-us/articles/52637346869779-Connect-Claude-to-Webflow
    accessed: 2026-10-23
  - label: "Webflow Help Center: Connect ChatGPT to Webflow"
    url: https://help.webflow.com/hc/en-us/articles/52976525572755-Connect-ChatGPT-to-Webflow
    accessed: 2026-10-23
  - label: "Webflow Help Center: Create and manage AI agent instructions"
    url: https://help.webflow.com/hc/en-us/articles/52536649709971
    accessed: 2026-10-23
  - label: "Webflow Help Center: Site Activity log"
    url: https://help.webflow.com/hc/en-us/articles/46651707969043-Site-Activity-log
    accessed: 2026-10-23
  - label: "Webflow Help Center: Save and restore backups"
    url: https://help.webflow.com/hc/en-us/articles/33961244069395-Save-and-restore-backups
    accessed: 2026-10-23
  - label: "Webflow Help Center: Publishing workflow"
    url: https://help.webflow.com/hc/en-us/articles/46651740529811-Publishing-workflow
    accessed: 2026-10-23
  - label: "Webflow Help Center: Page branching"
    url: https://help.webflow.com/hc/en-us/articles/46651751861139-Page-branching
    accessed: 2026-10-23
  - label: "Webflow Help Center: Webflow AI overview"
    url: https://help.webflow.com/hc/articles/34297897805715
    accessed: 2026-10-23
  - label: "Webflow Help Center: AI Assistant"
    url: https://help.webflow.com/hc/articles/34205154436243
    accessed: 2026-10-23
  - label: "Webflow Help Center: AI site builder"
    url: https://help.webflow.com/hc/en-us/articles/38840145286035
    accessed: 2026-10-23
  - label: "Webflow Help Center: Generate copy with AI"
    url: https://help.webflow.com/hc/en-us/articles/38323375464723
    accessed: 2026-10-23
  - label: "Webflow Updates: Introducing MCP 2.0"
    url: https://webflow.com/updates/introducing-mcp-2-0
    accessed: 2026-10-23
  - label: "Webflow Updates: Agent presence on the canvas"
    url: https://webflow.com/updates/agent-presence-on-the-canvas
    accessed: 2026-10-23
  - label: "Webflow Updates: AI credits"
    url: https://webflow.com/updates/ai-credits
    accessed: 2026-10-23
  - label: "Webflow Updates: Webflow AI enabled by default"
    url: https://webflow.com/updates/webflow-ai-enabled-by-default
    accessed: 2026-10-23
  - label: "Webflow Blog: Webflow Conf 2026 announcements"
    url: https://webflow.com/blog/webflow-conf-2026-announcements
    accessed: 2026-10-23
  - label: "Webflow: MCP feature page"
    url: https://webflow.com/feature/mcp
    accessed: 2026-10-23
  - label: "Model Context Protocol: What is MCP?"
    url: https://modelcontextprotocol.io/
    accessed: 2026-10-23
  - label: "Model Context Protocol specification (2026-07-28): Tools"
    url: https://modelcontextprotocol.io/specification/2026-07-28/server/tools
    accessed: 2026-10-23
  - label: "OWASP: LLM01:2025 Prompt Injection"
    url: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
    accessed: 2026-10-23
  - label: "BenorMedia: Webflow security after PHP2Shell"
    url: https://www.benormedia.com/blog/webflow-security-php2shell
    accessed: 2026-10-23
  - label: "BenorMedia: Webflow Enterprise: What to Check"
    url: https://www.benormedia.com/guides/webflow-enterprise
    accessed: 2026-10-23
volatile:
  - "MCP server plans, credits, roles, and capabilities (sources: Help Center MCP overview and Connect your AI tools, both updated 2026-10-22; developer docs, no date shown)"
  - "MCP 2.0 launched 2026-07-21; agent presence 2026-10-21; Releases announced at Webflow Conf 2026-09-02 for a beta later in 2026"
  - "Who can connect: the Help Center says any site role except Reviewer; the developer FAQ says only site owners and admins (checked 2026-10-23)"
  - "Page branching on Team and Enterprise Platform plans (updated 2026-09-18); Site Activity log MCP filter since early June 2026, Enterprise only (updated 2026-10-22)"
  - "AI credit limits since 2026-06-29; AI Assistant in beta (updated 2026-10-14); App Gen being deprecated (updated 2026-05-21)"
  - "MCP specification version 2026-07-28"
volatileChecked: 2026-10-23
inbound:
  - page: /blog/webflow-security-php2shell
    anchor: "what to allow when AI tools connect through Webflow MCP"
    sentence: "In the section on security work that stays with your team: For AI agents, here's what to allow when AI tools connect through Webflow MCP."
  - page: /guides/webflow-enterprise
    anchor: "Webflow MCP permissions and review policy"
    sentence: "Next to the release and approval flow: For AI agents, see our Webflow MCP permissions and review policy."
editorNotes:
  - "The topic row asks for a first-hand test with screenshots and failures. No test was run, so the post uses Webflow's documentation, the MCP specification, and OWASP, gives our recommended defaults as advice, and claims no test results."
  - "Webflow's docs conflict on who can connect: the Help Center says any site role except Reviewer, the developer FAQ says only site owners and admins. The post says so and tells readers to check."
  - "Research noted a Claude Partner Network badge in the site footer. The post names Claude and ChatGPT only as clients Webflow documents and doesn't compare AI tools; add a disclosure if you'd like one."
  - "/blog/webflow-editor isn't live yet. Once it is, link it from the role step in the review routine."
  - "Published 2026-10-23 (lead)."
---

The Webflow MCP server lets AI tools such as Claude, ChatGPT, and Cursor read and change your site, up to publishing it. It works within your Webflow role, and some of its actions can't be undone. This guide covers what it can change and what a marketing team should allow, for B2B SaaS marketing leads, as of October 2026.

## What is the Webflow MCP server?

It's how outside AI tools connect to Webflow. MCP, the Model Context Protocol, is "an open-source standard for connecting AI applications to external systems," and the Webflow MCP server "connects agents and AI tools directly to your Webflow projects." You ask in natural language, and your AI tool, the MCP client, turns your prompts into calls to the Webflow APIs.

- **Where it runs.** Remotely, at mcp.webflow.com/mcp. You connect with OAuth and "authorize the sites and Workspaces you want your AI tool to access." Each authorization covers one Webflow Workspace.
- **Which AI tools.** Webflow documents setup for Claude, Claude Code, ChatGPT, Codex, Cursor, Gemini, and others, through a built-in connector or a manual setup.
- **Cost.** It's "available on all Site plans, including the free Starter plan," and using it "doesn't consume Webflow AI credits." Usage counts toward your AI tool's own plan. MCP 2.0 launched on July 21, 2026, at no additional cost.
- **Who can connect.** Webflow's Help Center says any site role except Reviewer can connect, but its developer FAQ says only site owners and admins can authorize the server. Check which applies in your Workspace before you plan access.

### When do you need the Bridge App?

Only for a few tasks. Most Webflow MCP tools run without the Webflow Designer open. A few, such as element snapshots and image uploads, need the Designer open with the Webflow MCP Bridge App connected, which installs automatically when you authorize the MCP server. Webflow also runs a separate beta MCP server for experimental tools. We'd keep production sites off it.

## What can the Webflow MCP server change on a live site?

Almost everything a Webflow user can change: CMS content, design, code, and some settings. The Webflow MCP server's data tools "don't require an open Designer session or the companion bridge app," so an AI agent can work on your site while nobody on your team has it open.

Table: What the Webflow MCP server can do, by area (as of October 2026)

| Area | What the tools can do | What to watch |
| --- | --- | --- |
| CMS items | Create and update items "as drafts"; publish, unpublish, or delete them | Drafts stay off the live site until someone publishes |
| Publishing | Publish the site, "making the latest changes live," or publish a single page | A site publish pushes every pending change, not only the agent's |
| Design | Change elements, styles, variables, components, and interactions | Shared styles and components change on every page that uses them |
| Custom code and robots.txt | Replace a custom code block, delete a registered script ("Irreversible"), or completely replace robots.txt | Tracking, consent, and crawler rules live here |
| Assets | Upload images and other assets, or delete them with a "soft delete" that can't be restored through the API | Check where an image is used before deleting it |
| Forms and comments | Work with form submissions, including deleting them; read comments and reply, but not delete them | This text comes from people outside the session |
| Analytics | Ask questions about your Webflow Analyze data, query traffic and engagement, and read Optimize test data and AEO analytics, such as "which pages LLM crawlers request most" | Read-only; needs the Analyze or Optimize add-on |
| Webflow Cloud | Build and troubleshoot Webflow Cloud apps | Usually a developer's job, not a marketing edit |
| Access (Enterprise) | Manage Workspace and site access, including removing a member from a Workspace and all its sites | Needs a Workspace owner or admin |

Webflow's developer docs list no action that deletes a page or a whole CMS collection.

## Which controls does Webflow give you over AI agents?

Four, and the role you connect the MCP server with matters most.

1. **Your role.** "The MCP server enforces your Webflow permissions and roles, including custom roles." An agent "can do through the MCP server only what you can do in the Webflow Designer, and nothing more." Connect as a Content editor without "Can publish," and the agent gets the same limits.
2. **Approvals in your MCP client.** "By default, Claude will ask you to approve any actions it wants to take in Webflow," and ChatGPT asks too. In Claude, you can also "block or always allow specific actions" under Customize > Connectors > Webflow.
3. **AI agent instructions.** Site managers and Designers can create and manage instructions in the Instructions panel, which give agents context on your design system, voice, CMS, and policies; Marketers and Content editors can only read them. Webflow notes that "AI can make mistakes" and suggests having agents read your site's instructions at the start of a session.
4. **The Site Activity log (Enterprise).** It records changes made by agents, and since early June 2026 you can filter it to changes made through Webflow MCP. Its history doesn't expire, and anyone with the Content editor role or above can see it.

Enterprise adds more. Your AI tool can build and edit in an isolated page branch before changes are merged, and Webflow lists "granular access per site, CMS collection, page, and locale" among its MCP features for Enterprise. Our [Webflow Enterprise guide](/guides/webflow-enterprise) covers custom roles, approvals, and the activity log in more depth.

Webflow's own advice is short: "Only authorize sites you're actively working on to maximize security and performance." It also says it "does not use customer or partner data to train generative AI models." The AI tool you connect has its own data terms, so check how it handles your site's content before you authorize a site.

## What would we allow, ask about, or block?

Treat a new Webflow MCP server connection like a new contractor: read-only first, writes with review, and nothing irreversible. These are our defaults for a B2B marketing site; adjust them to your team.

Table: Our default policy for Webflow MCP actions on a live marketing site

| Action | Our default | Why |
| --- | --- | --- |
| Read pages, CMS items, styles, and analytics | Allow | Read-only, and useful for audits and reports |
| Create or update CMS items as drafts | Allow, with review | Drafts don't go live on their own |
| Reply to comments | Allow | Comments stay inside Webflow, and the tool can't delete them |
| Change styles, components, or variables | Ask each time | Shared styles change every page that uses them |
| Publish CMS items or individual pages | Ask each time | They go live right away |
| Publish the whole site | Block; a person ships it after a staging check | It pushes every pending change live |
| Delete CMS items, assets, scripts, or form submissions | Block | Some deletes can't be reversed |
| Replace custom code or robots.txt | Block | It can break tracking and [Consent Mode](/blog/consent-mode-v2-webflow), or block [AI crawlers](/blog/ai-crawlers-robots-txt) and search engines |
| Manage members and access (Enterprise) | Block | Access changes belong with an admin |

If your AI tool can't block a single action, the role does the work: an agent connected through a role without "Can publish" can't push changes live, however the request is worded.

## How should a marketing team review AI edits before they go live?

With a short, written review workflow. Webflow's advice for fully independent agents is to "publish to a staging domain and verify changes there," and the MCP specification says there "SHOULD always be a human in the loop with the ability to deny tool invocations."

1. **Back up first.** Webflow doesn't offer scheduled backups; it creates a restore point on every 50th auto-save, and only Site managers can restore one. Restoring updates the "Published on" date of CMS items, so plan a rollback before you need it. Our [Webflow security post](/blog/webflow-security-php2shell) covers manual backups and roles.
2. **Connect with the smallest role.** Authorize the MCP server only for the site you're working on, and use a role without "Can publish" for drafting sessions.
3. **Work in drafts or a branch.** CMS Collection items are created and updated as drafts. On Team and Enterprise Platform plans, page branching keeps design work off the live page, and content editors and marketers can create branches but not merge them. Through MCP, the branch tools need Enterprise.
4. **Review on staging.** A person pushes changes to the webflow.io staging domain, checks the changed pages on desktop and mobile, then publishes to the live site. On Enterprise, Webflow's publishing workflow builds that staging step in before "Publish to production."
5. **Treat outside text as untrusted.** Form submissions, comments, and imported content can carry instructions an agent might follow. Prompt injection is first on OWASP's 2025 Top 10 for LLM applications, including indirect injection from "external sources, such as websites or files." Don't let an agent with write access act on text from forms or comments.
6. **Log what changed.** On Enterprise, filter the Site Activity log by Webflow MCP. On other plans, keep your AI tool's record of the actions you approved with the ticket.

Add AI tool connections to the access review in your [website maintenance checklist](/blog/website-maintenance-checklist).

## How does MCP fit with Webflow's other AI tools?

The MCP server brings your own AI tool, such as Claude or Cursor, into Webflow. Webflow's built-in AI features run inside the product, and some of them use Webflow AI credits, which have had limits since June 29, 2026.

Table: Webflow's AI features as of October 2026

| Feature | What it does | Status and plan notes |
| --- | --- | --- |
| MCP server | Connects outside AI tools to your site | All Site plans; no Webflow AI credits |
| AI copy generation | Writes and edits copy on the canvas | Uses Webflow AI credits |
| AI Assistant | Generates page sections | Beta, "limited to a small number of free templates"; no credits |
| AI site builder | Generates a site | Only for a brand-new site or an existing AI-generated site |
| AEO agents | Scan your site on a recurring schedule | Team or Enterprise Platform plans |
| Agent presence | Shows where agents are working on the canvas | Launched October 21, 2026; all plans |
| App Gen | Generated apps | Development paused; being deprecated |

At Webflow Conf in September 2026, Webflow said agents in its upcoming Releases feature would be "subject to the same roles and permissions as your teammates," with a beta planned for later in the year. For whether AI-written copy hurts SEO, see our [AI SEO myths](/blog/ai-seo-myths) post. Whatever the tool, the rule stays the same: give agents the access you'd give a new hire, and keep a person on the publish button.

We build and support Webflow sites for B2B SaaS companies, so we have an interest in this topic. If you want a second pair of eyes on AI edits before they go live, see our [ongoing website support](/ongoing-website-support) page.
