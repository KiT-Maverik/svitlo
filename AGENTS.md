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
  Follow the [GitHub labels and naming policy](studio/rules/github-labels-and-naming.md)
  for Issues, PRs, and branches, and the [npm package script naming convention](studio/rules/package-scripts.md)
  when creating or changing package scripts, build tooling, or CI invocations.
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

## Script workflow instructions

Permanent scripts live in named workflow directories, both under the repository-wide
[`scripts/`](scripts/README.md) (read its scoped [`AGENTS.md`](scripts/AGENTS.md)) and inside owning packages (for example,
[`shared/engine/scripts/`](shared/engine/scripts/README.md)).
**Before changing any script, generator, YAML contract or its callers, open the
relevant named directory and read the actual entrypoint JSDoc, any local README
and its adjacent tests.** An entrypoint's stated purpose and non-goals take
precedence over assumptions based on names or historical workflows.

For Engine generators and YAML scaffolders, first read the scoped
[`shared/engine/scripts/AGENTS.md`](shared/engine/scripts/AGENTS.md).
The named directories include separate YAML-to-TypeScript _draft_ scaffolders,
JSON Schema editor guidance, and Props publishers; they are not interchangeable.
Follow the referenced source contracts before making changes.

## Repository-wide GitHub rules

Before creating or updating GitHub Issues, pull requests, or branches, read and follow [GitHub labels and naming conventions](studio/rules/github-labels-and-naming.md). Use [the canonical label catalog](.github/labels.json) for exact names. Apply appropriate labels to Issues and PRs in GitHub, rather than only describing them in text. Keep entity names short, specific, and free of category information already carried by labels. Preserve any workflow-required branch identifiers.

## Translation production Draft PR coordination

For **new** translation campaigns, follow [Manage Translation Production](studio/skills/translation-workflow/manage-translation-production.skill.md): use one Draft integration PR as the sole campaign tracker, with exact frozen entity × locale inventory and nonoverlapping translator/reviewer child Draft PRs. **Do not create a new Translation Production Issue.** Existing Issue campaigns remain valid historical/current work until individually owner-authorized migration; preserve their assignments, review evidence, SHAs and permissions via [legacy Issue recovery](studio/skills/translation-workflow/legacy-production-issues.md). The owner explicitly decides when independent review starts and on which source PR/SHA; it may occur directly on an unmerged translator PR. Validate source-derived Markdown and manifest only for supported scopes; clean temporary artifacts before child merge. Parent integration → `main` requires separate owner approval.

## Lesson production Draft PR handoff

For any authorized Lesson production read [Create Lesson Flow](studio/skills/lesson-workflow/create-lesson-flow.skill.md) first. Reuse the exact Lesson UUID, existing Draft Lesson PR and parent Course integration branch when present; otherwise create one Draft Lesson PR for one genuinely new Lesson. Its description is the sole stage/review coordinator; authored data remains in Git. **No new mandatory Lesson Production Issue** is required. Preserve and reconcile historical Issues via [Manage Lesson Production](studio/skills/lesson-workflow/manage-lesson-production.skill.md); do not destroy historical reviews. For new translation work, use the Draft PR protocol; old translation Issues remain recoverable without forced migration.
