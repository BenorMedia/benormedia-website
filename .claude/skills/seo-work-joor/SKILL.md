---
name: seo-work-joor
description: Start or continue the case study template and /work/joor, Part 2 of docs/brief-next-pages.md.
disable-model-invocation: true
---

Read `docs/brief-next-pages.md` and `docs/content/work-joor.md`.

**If the branch `seo/work-joor` doesn't exist yet:**

1. Run the Discovery items Part 2 needs: `/work`, images, JSON-LD, `PAGES`, `LASTMOD` and `public/llms.txt`. If Part 1's Discovery already covered them in this conversation, summarize those findings instead. Show me what you found, and stop.
2. After I reply, do Part 2 on a new branch `seo/work-joor`, created from the base branch. Make one commit per task, use the copy in `docs/content/work-joor.md` word for word, and stop at any "STOP and ask" line.

**If the branch already exists:**

1. Run `git ls-tree seo/work-joor -- CLAUDE.md .claude/settings.json`. If either file is missing, stop and ask. Once I agree, switch and merge in one command, `git switch seo/work-joor && git merge --no-edit <base branch>` (a normal merge, never a rebase), so the settings never leave the working tree. If both files are there, check the branch out.
2. Show me its `git log --oneline`, which of Part 2's tasks are done, and the next one.
3. Continue only after I confirm.

The draft testimonial stays inside its `[QUOTE: ...]` marker. Never render it as a finished quote.

Don't merge into the base branch, push the base branch or deploy. When you push, name the branch: `git push -u origin seo/work-joor`. Finish with the report described at the end of the brief.
