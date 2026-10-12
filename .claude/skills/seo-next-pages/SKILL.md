---
name: seo-next-pages
description: Start or continue the four service pages (/website-redesign, /webflow-seo-agency, /cybersecurity-web-design, /aeo-agency), Part 1 of docs/brief-next-pages.md.
disable-model-invocation: true
---

Read `docs/brief-next-pages.md` and the four service-page files in `docs/content/`: `website-redesign.md`, `webflow-seo-agency.md`, `cybersecurity-web-design.md` and `aeo-agency.md`.

**If the branch `seo/next-pages` doesn't exist yet:**

1. Do the Discovery section, show me what you found, and stop.
2. After I reply, do Part 1 on a new branch `seo/next-pages`, created from the base branch in facts sheet item G1. Make one commit per task, use the copy in `docs/content/` word for word, and stop at any "STOP and ask" line.

**If the branch already exists:**

1. Run `git ls-tree seo/next-pages -- CLAUDE.md .claude/settings.json`. If either file is missing, stop and ask. Once I agree, switch and merge in one command, `git switch seo/next-pages && git merge --no-edit <base branch>` (a normal merge, never a rebase), so the settings never leave the working tree. If both files are there, check the branch out.
2. Show me its `git log --oneline`, which of Part 1's tasks are done, and the next one.
3. Check whether `/website-redesign` and `/webflow-seo-agency` were built from their v2.1 content files (see the "Updated 2026-10-10" note at the top of the brief), and list any differences.
4. Continue only after I confirm.

Don't merge into the base branch, push the base branch or deploy. When you push, name the branch: `git push -u origin seo/next-pages`. Finish with the report described at the end of the brief.
