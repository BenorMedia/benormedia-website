# Global facts registry: questions that come up on many pages

A person answers each of these once, and every page that carries the marker is updated. (Since 2026-10-07 the pack has two page families: short commercial pages with no byline, and long guides with one. See `RULES.md` section 1.) A drafter reuses the id (`#G5`) when the page needs the same fact, and writes the question in its own words as long as it asks for the same thing. Page-specific questions use a page id (`MIG-3`, `B2B-2`) and are not listed here.

The "default" is what happens on a page if nobody answers. Every default keeps the page accurate.

| Id | Kind | Question (canonical) | Default if unanswered | Likely pages |
|---|---|---|---|---|
| G1 | PERSON | Who owns the final edit of the guides, and what is their name and role for the byline? One person for all guides, or a name per guide. Only guides, comparisons and data studies show a byline (Sergio, 2026-10-07); commercial pages show no author, so they carry no G1 marker. | `REPLACE: BenorMedia team` | guides, comparisons, data studies |
| G2 | VERIFY | Which partner wording is correct today? The live site says "Webflow Professional Partner". Webflow's own directory profile for BenorMedia shows a different tier name and a "partner since" date. Check the Webflow partner dashboard and give the exact tier name and the year BenorMedia joined. | Keep "Webflow Professional Partner" (confirmed by Sergio on 2026-10-06). Make no claim about years as a partner. Never name any other tier. | all |
| G3 | VERIFY | May the six steps of the AEO program and the measurement method, as Sergio wrote them, be published on the AEO page in full? | `KEEP` (publish as written) | aeo-agency, guides |
| G4 | blocker | Who is the native German reviewer and who is the native Spanish reviewer? Machine drafts of non-English pages must be read by a native speaker before release. | The pages stay in `blockedBy` until a named reviewer signs off. | webflow-agentur, agencia-webflow (deferred 2026-10-07) |
| G5 | FACT NEEDED | How many WordPress to Webflow migrations has BenorMedia completed, and since when? | `DELETE-LINE` | webflow-migration, webflow-vs-wordpress, regional pages |
| G6 | FACT NEEDED | What are BenorMedia's usual timelines in weeks for a small site (about 20 pages), a mid-size site with a blog, and a large or enterprise site? | `DELETE-LINE` | webflow-migration, b2b-saas-web-design, webflow-enterprise-agency, cost guide, regional pages |
| G7 | FACT NEEDED | Who works on a website project at BenorMedia (roles, how many people, who the client talks to) and are any parts done by partners or freelancers? | `DELETE-LINE` | service pages, how-to-choose guide |
| G8 | FACT NEEDED | Which clients from the work page have approved a published case study or a named result, and which results (before and after numbers) may be published? | No case study and no result is published beyond the two testimonials already on the site. | all service and industry pages |
| G9 | FACT NEEDED | Of the 100+ launches, how many were new builds, redesigns and migrations, and how many are still active clients? | `DELETE-LINE` | service pages, data study |
| G10 | FACT NEEDED | Does BenorMedia have clients, partners, staff or a legal entity in the UK, Germany or Spain that may be named, and which languages does the team work in? (Webflow's profile lists English and Spanish.) | No claim of local presence or local clients. | regional pages (deferred 2026-10-07) |
| G11 | blocker | Will BenorMedia build the free AI visibility scan, and if so, who builds it and when? | The tool page stays in `blockedBy`. | ai-visibility-checker |

## How a global answer is applied

1. The person answers in the facts sheet (`FACTS-SHEET.md`, which lists every open marker by id).
2. A drafter or Claude Code replaces each marker that carries that id with the answer, using only what the person said.
3. Re-run `node scripts/check-content.mjs --release` on the pages touched.

## Decisions that are not markers

These shape the program and are listed in the facts sheet under "Decisions for Sergio".

- **D1. A "best Webflow agencies" list or the how-to-choose guide.** The pack drafts the guide. A list would have to name other agencies, which the rules forbid. See `briefs/how-to-choose-a-webflow-agency.md`.
- **D2. Release pace.** The program's baseline must be recorded before the first page ships, and waves should be spaced so each wave can be measured. Releasing everything on one day is possible but loses attribution.
- **D3. "Alternatives to [agency]" pages are not drafted**, because they would name other agencies.
- **D4. Live-site items that disagree with the new pages** (listed in `FACTS-SHEET.md`): footers that say "Official Webflow Partner", the /growth page naming reporting tools, the support page's use of "guarantee", and three client links to Webflow staging addresses on /work.
