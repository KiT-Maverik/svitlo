# GitHub labels and naming conventions

**Applies to:** all agents and contributors working with GitHub Issues, pull requests, branches, commits, and repository work items.

**Canonical label catalog:** [`.github/labels.json`](../../.github/labels.json). It defines the exact available names, descriptions, and colors. Consult this file before assigning labels; do not invent, rename, or approximate label names. If this guide and the catalog diverge, the catalog defines the available labels and the discrepancy must be reported.

## 1. Separate content from metadata

- **Titles and names describe the specific task, change, or result.**
- **Labels classify the work** (scope, work type, priority, PR role, issue state, origin, or attention).
- Do not add redundant prefixes or suffixes to an Issue or PR title solely to repeat metadata already expressed by its labels.
- Never prefix an Issue/PR title with a textbook name in square brackets (for example, `[Physics]`); the corresponding `content: *` label identifies the textbook.
- Do not use Conventional Commit-style category prefixes in Issue or PR titles (`feat:`, `fix:`, `docs:`, `test:`, `ci:`, `chore:`, `refactor:`, `feat(math):`, etc.). The labels already encode work type and area. This restriction is for Issue/PR **titles**, not commit messages.
- Do not include redundant `[Draft]`, `[WIP]`, `Integration`, or `(Integration)` markers in PR titles: draft/closed state and `pr: integration` are carried by GitHub metadata. Describe temporary blockers in the PR body and applicable attention labels.
- Do not include routine agent-count suffixes (for example, `(4 Agents)`) in Issue/PR titles. Document the assignment count and agent workstreams in the Issue body. Keep an individual agent identifier in an agent PR title when it is needed to distinguish parallel workstreams; `pr: agent-subtask` does not encode which agent owns the change.
- Prefer short, specific, unambiguous, searchable names. Do not sacrifice clarity just to make a title shorter.
- A title must still identify the change without reading its full description. Include a subject such as "skills taxonomy" or "quiz navigation" when that is essential.
- Labels do **not** exist on branches or commits: those names must remain independently recognizable. Keep established branch naming conventions, including agent/integration branch patterns when a workflow requires them.

## 2. Label groups and responsibilities

| Group          | Purpose                                           | Where and how to use                                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content: *`   | Educational textbooks                             | One label per `content/<book>/`. Use all materially affected content labels.                                                                                                                                                                                                   |
| `app: *`       | Deployable applications                           | `app: desktop`, `app: mobile`, `app: web`, `app: platform` for `apps/<name>/`. The legacy `frontend/platform/` also maps to `app: platform`.                                                                                                                                   |
| `backend: *`   | Backend services                                  | `backend: server` for `backend/server/`.                                                                                                                                                                                                                                       |
| `shared: *`    | Reusable libraries and contracts                  | `shared: adapters`, `shared: contracts`, `shared: engine`, `shared: indexdb`, `shared: ui-kit` mapped to `shared/<name>/`.                                                                                                                                                     |
| `studio`       | AI Studio guidance                                | Standalone label for `studio/` — one directory, no redundant `studio: studio` prefix.                                                                                                                                                                                          |
| `repo: *`      | Repository-wide files, infrastructure and tooling | `repo: scripts` for `scripts/`; `repo: general` is the fallback for `.github/`, root config, and other changes with no more specific scope.                                                                                                                                    |
| `work: *`      | Kind of activity or deliverable                   | Issues and PRs. Apply one or more when work genuinely spans categories, e.g., translation **and** review.                                                                                                                                                                      |
| `priority: *`  | Urgency and impact                                | Primarily Issues; PRs only when priority adds meaningful information. At most one level: `critical`, `high`, `medium`, or `low`. `critical` is for immediate production/security/data-loss situations, not merely large tasks.                                                 |
| `pr: *`        | PR's role or special change characteristics       | PRs only. `integration` identifies the parent PR; `agent-subtask` identifies an agent PR targeting the integration branch. These two **roles** are mutually exclusive. `breaking-change` and `migration` are independent flags that can accompany either role or a regular PR. |
| `issue: *`     | Issue intake or investigation status              | Issues only: `needs-triage`, `needs-info`, `needs-reproduction`. Use only while the condition applies.                                                                                                                                                                         |
| `source: *`    | Origin of the Issue                               | Issues only. Choose the factual source: `internal`, `expert-review`, `user-report`, `agent`, or `automation`. Do not confuse a project-owner request (`internal`) with a report submitted through the product's user-report UI (`user-report`).                                |
| `attention: *` | Special action still required                     | Issues and PRs, only when applicable: `decision`, `blocked`, `manual-qa`. Remove a transient label after the underlying condition is resolved.                                                                                                                                 |

Consult the catalog for exact label names and colors. Content scopes use parchment yellow (`#D9C48B`), applications teal, backend rust, shared packages blue, Studio classic amber (`#B7791F`), and repository tooling/fallback slate. The `work` values are `feature`, `architecture`, `fix`, `refactor`, `content`, `translation`, `review`, `tests`, `ci`, `docs`, and `tooling`.

**Distinguish architecture from feature and refactor:** Use `work: architecture` for system design or architectural changes to module boundaries, contracts, data models, composition, dependency direction, or runtime data flows. Use `work: feature` for new user-facing or technical capabilities, and `work: refactor` for reorganizing implementation without intentionally changing its architecture or behavior. Architecture-only work must not be labeled `work: feature` solely because it adds technical infrastructure. Apply both labels only when the change genuinely includes both architecture work and a new capability.

## Draft pull requests for coding agents

Coding Agents **must create every PR as a GitHub Draft** (`draft: true`), whether it is a regular PR, an integration PR, or an agent subtask. Keep it in Draft after implementation and automated checks; only mark it Ready for review when the project owner explicitly requests that transition. This is the PR's native state, not a title prefix or a label.

## 3. Application requirements

1. **At creation:** classify each new Issue and PR with the applicable scope label(s) (`content: *`, `app: *`, `backend: *`, `shared: *`, `studio`, `repo: *`) and `work: *` labels. Add relevant labels from other groups when appropriate. Creating labels in GitHub or adding names to the catalog does **not** apply them automatically to existing items.
2. **While updating:** re-evaluate labels when scope, status, blockers, or change characteristics evolve; remove stale labels. Never add mutually exclusive `priority: *` levels or both PR role labels.
3. **For multi-agent work:** the central PR receives `pr: integration`; each agent's PR receives `pr: agent-subtask` and targets the integration branch. Preserve the mandated integration hierarchy. The actual scope/agent partition belongs in the PR body or work plan rather than boilerplate title prefixes.
4. **For normal PRs:** omit `pr: integration` and `pr: agent-subtask`; they are not generic PR types. Assign `pr: migration` and/or `pr: breaking-change` only if the changes warrant them.
5. **When labels cannot be applied:** report the limitation and the exact labels needed. Do not claim the Issue or PR is labeled until GitHub confirms the update.
6. **For existing Issues/PRs:** the sync workflow renames former `area: *` labels to their `content:`, `shared:`, `app:`, `backend:`, `studio`, or `repo:` equivalents in place, retaining their Issue/PR assignments; it never deletes other labels. The backfill runs after a successful sync to add missing scope labels to historical Issues/PRs.

## 4. Naming examples

| Avoid (duplicates labels or adds filler)             | Prefer                                  | Metadata carried by labels                                                   |
| ---------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| `[Biology] Translation Review — Agent 1`             | `Unify Crimean Tatar skill terminology` | `content: biology`, `work: translation`, `work: review`, `pr: agent-subtask` |
| `[Physics] Skills taxonomy — Integration (4 Agents)` | `Localize skills taxonomy`              | `content: physics`, `work: translation`, `pr: integration`                   |
| `[Repo] Docs: Add GitHub rules`                      | `Document GitHub labeling conventions`  | `repo: general`, `work: docs`                                                |
| `URGENT FIX: Quiz broken!`                           | `Restore keyboard navigation in quiz`   | `work: fix`, appropriate `priority: *`                                       |

These are naming examples, not an instruction to rename existing PRs or replace established workflow-required branch names.

### Entity-specific guidance

- **Issue titles:** state the problem or desired outcome; use the body for acceptance criteria and agent assignments.
- **PR titles:** summarize the concrete delivered change; use the body for implementation detail, validation, target branch, and review context.
- **Branch names:** keep them short, lowercase, and descriptive (`docs/github-labels-naming`, `review/biology-qm-terminology`). Preserve required workflow identifiers because branches have no labels.
- **Commit messages:** describe what the commit changes, not just generic labels or "updates". Keep established commit conventions if they exist.
- **Repository entities and documentation headings:** use accurate, concise domain terms; do not encode status, origin, or priority in a name where structured metadata already captures it.

**Pre-publication check:** Is the title specific and concise? Does it avoid duplicating GitHub labels? Are the actual (not hypothetical) labels applied? Are scope and work labels accurate? Are PR roles and target branches correct? Are temporary labels up to date?

## Lesson-production Issue scope and stage coordination

For production of **one or more Lessons**, use the repository's [Lesson production Issue Form](../../.github/ISSUE_TEMPLATE/lesson-production.yml) and [Manage Lesson Production](../skills/lesson-workflow/manage-lesson-production.skill.md). A single Issue may contain several explicitly identified Lesson UUIDs; never force one Issue per Lesson or per fast workflow stage. The per-Lesson tracker records the next stage, status, owner/branch, Draft PRs and blockers; scope-level checkboxes do not supersede the source files and independent approvals.

When working from a Lesson Production Issue, read its **latest** body, linked PRs and the actual Lesson sources before editing, claim the bounded artifact and keep the Issue updated after each meaningful batch. Multiple agents/chats can resume from this record; do not use chat history as the sole source of truth. Intermediate Draft PRs should say `Refs #N`, not `Closes #N` while other Lessons remain unfinished. Do not automatically merge PRs, self-approve editorial gates or close incomplete Issues.
