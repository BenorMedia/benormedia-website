---
name: seo-release
description: Make the release commit for a brief's pages once the person who owns the final edit has approved them (the brief's "Sign-off and release commit" or "Sign-off and release commits" section).
argument-hint: "<brief file> [hold <page URL> | <URL of a page held back earlier>]"
disable-model-invocation: true
---

Brief: `$0`. If no brief was given, ask me which one. What follows the brief in `$ARGUMENTS` decides what is released:

- **Nothing:** every page on the brief's branch. If the brief has two parts on two branches (Part 1 and Part 2), ask me which part.
- **`hold <page URL>`:** hold that page back and release the others, following the brief's "If one page holds up the other" (or "the other three") steps.
- **The URL of a page held back earlier:** release that page alone from a new branch, as the last of those steps describes.

If the arguments don't fit one of these, ask.

**Step 1. Get on the right branch.**

- Releasing all pages, or holding one back: run `git ls-tree <branch> -- CLAUDE.md .claude/settings.json` on the brief's branch. If either file is missing, stop and ask. Otherwise check the branch out.
- Releasing a page held back earlier: never check out or merge into its `seo/hold-...` branch. Create `seo/release-<page>` from the base branch, copy the held page in from the hold branch with `git checkout <hold branch> -- <files>`, add back its `PAGES` and `LASTMOD` entries and its links, and commit (`chore(seo): bring back <page URL> from its hold branch`).

**Step 2. Check before you change anything else.** On that branch, show me the evidence for each point, for every page being released:

1. The person who owns the final edit has approved these pages. Either they wrote "approved" in this conversation, or each page's review sheet says "Approved to publish (yes or no): yes" in its sign-off block. Running this command is not approval. If neither is true, stop and ask.
2. The review gate in `CLAUDE.md` prints nothing for each page's review sheet: every row is `ok`, `confirmed` or `removed`, and no sheet is missing.
3. `node scripts/check-draft.mjs <page file> <data file>` in preview mode lists no markers.

If any check fails, stop and report what failed.

**Step 3. Prepare the branch.**

- If the brief's release section says to merge the base branch into the feature branch first, or the base branch has moved since the branch was created, do that now: a normal merge, never a rebase, never a force-push.
- If a page is held back, follow the brief's steps: the hold branch first, then the hold commit. Show me every change to the pages that ship, and wait for my OK before Step 4.

**Step 4. Make the release edits.** Follow the brief's release section exactly:

- `DRAFT` to `false`;
- the dates and `LASTMOD` to the sign-off day;
- the `public/llms.txt` lines.

**Step 5. Check again, then commit.** Run `node scripts/check-draft.mjs --release <page file> <data file>` for each page, `npm run build`, `node scripts/check-seo.mjs dist`, the review gate, and anything else the brief's "Verification" section lists for before the merge.

- If anything fails, restore the files you changed with `git restore`, and report what failed. Don't commit.
- If everything passes, commit with the message the brief gives. Push with the branch named (`git push -u origin <branch>`; settings will ask). Mark the pull request ready for review with `gh pr ready`, or open one into the base branch if there is none, and give me its link.

Stop there. A person merges into the base branch and deploys. Don't merge into the base branch, push the base branch or deploy.
