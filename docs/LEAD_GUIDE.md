# Lead Guide — Running the agent team in Claude Code

## How it works
- Open Claude Code in the repo root. The **main session is the orchestrator**: it reads `CLAUDE.md` automatically.
- Subagents in `.claude/agents/` each run in their own context and return a summary. They can't call each other, so the orchestrator routes work, and agents leave notes in `docs/handoffs/`.
- You talk only to the orchestrator. It delegates automatically based on each agent's `description`, or you can name one: "Use the sanity agent to…".
- `/agents` lists and edits subagents. `.claude/settings.json` blocks production deploys, force pushes and `.env` reads.

## Daily loop
1. Start: *"Read CLAUDE.md and docs/BUILD_PLAN.md. What's the next task? Show me a plan before doing anything."*
   Use **plan mode** (Shift+Tab) for this: Claude plans without editing files.
2. Approve or adjust the plan.
3. *"Execute it. Create branch feat/…, delegate to the right agents, then run the qa agent and summarize its handoff."*
4. Review the preview URL and the qa handoff. Merge the PR into `dev` yourself.
5. End: *"Update BUILD_PLAN.md and DECISIONS.md with today's progress and open questions."*
6. `/clear` between unrelated tasks to keep context clean.

## Good habits
- One task = one branch = one PR. Small PRs are easier to review.
- When an agent asks a design question, answer in `DECISIONS.md` (or tell the orchestrator to log it), so every agent sees the answer.
- If an agent goes off-scope, point it to its file in `.claude/agents/` and restart the task.
- Keep this chat (Claude web) as the planning room; bring decisions back here and I'll update the docs.

## First prompt (Phase 0)
> Read CLAUDE.md and every file in docs/. We are in Phase 0. In plan mode, propose the exact steps to scaffold Astro + TypeScript strict + Vercel adapter + @sanity/astro with the Studio embedded at /studio, static output. Verify the current recommended setup in the official docs before proposing. List any decisions you need from me.

## MCP for Claude Code
- Figma: `claude mcp add --transport http figma https://mcp.figma.com/mcp` (same account; needs the Dev seat).

## Figma sync prompt (Phase F)
Use at the next checkpoint once `whoami` shows a Dev/Full seat:
> Insert Phase F from BUILD_PLAN.md now. Use the ui agent to extract variables and styles from <frame link>, diff them against docs/DESIGN_SYSTEM.md, and write the diff handoff. Do not change tokens yet. Then use the qa agent to compare everything built so far against <page frame links>. Turn fixes into tasks at the top of today's plan and show me before executing.
