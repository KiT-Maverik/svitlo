<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Studio: required repository guidance discovery

Before starting **any repository task** (planning, implementation, content authoring,
translation, review, or GitHub maintenance), inspect [`studio/`](studio/) to identify
the instructions and resources relevant to that task. **Do not assume that
`studio/` files are automatically loaded** simply because this `AGENTS.md` is read.

1. Explore the relevant directories below and start with their `README.md`
   indexes where available.
2. **Read the applicable rules, persona(s), skill/workflow instructions, and
   referenced architecture or entity documentation before acting.** Select
   resources by the task's scope; do not blindly load every Studio document.
3. Follow those instructions throughout the task, including validation and
   GitHub operations. Revisit the resource selection if the scope changes.
4. Check the current code, contracts, and tests rather than treating plans,
   proposals, or backlog entries as already-implemented behavior. Surface
   unclear or conflicting guidance instead of silently guessing.

### Studio resource map

- [`studio/rules/`](studio/rules/) — repository and GitHub workflow rules.
  In particular, follow the [GitHub labels and naming policy](studio/rules/github-labels-and-naming.md)
  when working with Issues, PRs, or branches.
- [`studio/personas/`](studio/personas/) — role-specific responsibilities
  and review criteria (coding agent, development reviewer, QA reviewer,
  methodologist, screenwriter, technical translator). Choose the persona(s)
  that match the assignment.
- [`studio/skills/`](studio/skills/) — task-specific procedures and workflows,
  including [lesson creation](studio/skills/lesson-workflow/),
  [skill taxonomy](studio/skills/skill-taxonomy-workflow/), and
  [translation/review](studio/skills/translation-workflow/). Read the relevant
  workflow instructions, not just the filenames.
- [`studio/docs/`](studio/docs/) — architectural principles, entity specifications,
  and development/quality reference documents. Start from the
  [architecture index](studio/docs/architecture/README.md) when the task
  touches system design, content, localization, or runtime behavior.
- [`studio/To Do/`](studio/To%20Do/README.md) — proposed product features,
  open questions, and future work; **not** proof of approved scope or existing
  functionality.
- [Other documents at the root of `studio/`](studio/) — background,
  proposals, and generator requirements. Consult them when directly relevant
  to the task.

## Repository-wide GitHub rules

Before creating or updating GitHub Issues, pull requests, or branches, read and follow [GitHub labels and naming conventions](studio/rules/github-labels-and-naming.md). Use [the canonical label catalog](.github/labels.json) for exact names. Apply appropriate labels to Issues and PRs in GitHub, rather than only describing them in text. Keep entity names short, specific, and free of category information already carried by labels. Preserve any workflow-required branch identifiers.

## Lesson production Issue handoff

For any **authorized Lesson production** work (authoring one/many new Lessons, writing content plans, running educational reviews, generating source/material or coordinating production), locate an existing matching Lesson Production Issue or establish the fixed-scope Issue through the coordination skill before creating production PRs. Do not create a separate Issue per Lesson or stage; exclude exploratory questions or isolated maintenance work that is not a production workflow.

For tasks referencing a GitHub Lesson Production Issue, read [Manage Lesson Production](studio/skills/lesson-workflow/manage-lesson-production.skill.md) and its linked [lifecycle](studio/docs/architecture/lesson-production-workflow.md). One Issue covers **one or more explicitly scoped Lessons**; resume from the current Issue, linked PRs and real Git files, not a previous chat. Maintain per-Lesson statuses and independently verified approvals; avoid duplicate Issues and do not require a new user turn after every short task in an authorized batch.
