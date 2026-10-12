---
name: seo-revise
description: Apply the person's answers from a brief's facts sheet and review sheets to its drafted pages (the brief's "Revision" step).
argument-hint: "<brief file, e.g. docs/brief-headless-guide.md>"
disable-model-invocation: true
---

Use the brief at `$ARGUMENTS`. If no brief was given, ask me which one.

1. Find the branch the brief names. If the brief has two parts on two branches (Part 1 and Part 2), or a page was held back on a `seo/hold-...` branch, ask me which branch to revise. Run `git ls-tree <branch> -- CLAUDE.md .claude/settings.json`:
   - if both files are there, check the branch out and show me its `git log --oneline`;
   - if either is missing, stop and ask. Once I agree, switch and merge in one command, `git switch <branch> && git merge --no-edit <base branch>` (a normal merge, never a rebase), so the settings never leave the working tree.
2. Read the brief's facts sheet and the review sheet of every page in it (`docs/review-*.md`, column "Your answer").
3. Before you edit anything, list each answered item and what you'll do with it:
   - a fact: apply it, using the person's wording where they gave one;
   - "delete": remove the claim;
   - no answer: leave the row `open`.
4. After I confirm, follow the brief's "After the first draft > Revision" section:
   - never rephrase a claim to keep it alive without its fact, and never add new claims;
   - if a deletion leaves a list or section too thin, say so and don't fill the gap.
5. Update each review sheet: set every resolved row to `confirmed` or `removed`, and fill in its "Date" column.
6. Run `npm run build`, `node scripts/check-seo.mjs dist` and `node scripts/check-draft.mjs <page file> <data file>` for each page, and paste the output.
7. Make one commit, `chore(seo): apply review answers`. Push with the branch named (`git push -u origin <branch>`; settings will ask), and give me the preview URLs from the pull request or GitHub's deployment status.
8. Report:
   - what changed since the last version;
   - every row that is still `open`, from the review gate in `CLAUDE.md`.

Don't make the release commit. Don't merge into the base branch, push the base branch or deploy.
