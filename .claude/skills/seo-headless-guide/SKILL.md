---
name: seo-headless-guide
description: Start or continue the Webflow vs custom code guide and the /headless-cms-agency service page, following docs/brief-headless-guide.md.
disable-model-invocation: true
---

Read `docs/brief-headless-guide.md` and the two content files it names: `docs/content/guide-webflow-vs-custom-code.md` and `docs/content/headless-cms-agency.md`.

**If the branch `seo/headless-guide` doesn't exist yet:**

1. Do the Discovery section, show me what you found, and stop.
2. After I reply, do the tasks on a new branch `seo/headless-guide`, created from the base branch in facts sheet item G1 (default `main`). Make one commit per task, use the copy in `docs/content/` word for word, and stop at any "STOP and ask" line.

**If the branch already exists:**

1. Run `git ls-tree seo/headless-guide -- CLAUDE.md .claude/settings.json`. If either file is missing, stop and ask. Once I agree, switch and merge in one command, `git switch seo/headless-guide && git merge --no-edit <base branch>` (a normal merge, never a rebase), so the settings never leave the working tree. If both files are there, check the branch out.
2. Show me its `git log --oneline`, which of the brief's tasks are done, and the next one.
3. Continue only after I confirm.

Don't merge into the base branch, push the base branch or deploy. When you push, name the branch: `git push -u origin seo/headless-guide`. Finish with the report described at the end of the brief.
