# GitHub labels and naming conventions

**Applies to:** all agents and contributors working with GitHub Issues, pull requests, branches, commits, and repository work items.

**Development and production:** read [CI workflow and branch policy](./ci-workflow.md). New standalone and integration work normally targets `develop`; only release promotion targets `main`. Preserve existing PR branch ancestry.

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
| `shared: *`    | Reusable libraries and APIs                       | `shared: adapters`, `shared: engine`, `shared: indexdb`, `shared: ui-kit` mapped to `shared/<name>/`.                                                                                                                                                                          |
| `studio`       | AI Studio guidance                                | Standalone label for `studio/` — one directory, no redundant `studio: studio` prefix.                                                                                                                                                                                          |
| `repo: *`      | Repository-wide files, infrastructure and tooling | `repo: scripts` for `scripts/`; `repo: general` is the fallback for `.github/`, root config, and other changes with no more specific scope.                                                                                                                                    |
| `work: *`      | Kind of activity or deliverable                   | Issues and PRs. Apply one or more when work genuinely spans categories, e.g., translation **and** review.                                                                                                                                                                      |
| `priority: *`  | Urgency and impact                                | Primarily Issues; PRs only when priority adds meaningful information. At most one level: `critical`, `high`, `medium`, or `low`. `critical` is for immediate production/security/data-loss situations, not merely large tasks.                                                 |
| `pr: *`        | PR's role or special change characteristics       | PRs only. `integration` identifies the parent PR; `agent-subtask` identifies an agent PR targeting the integration branch. These two **roles** are mutually exclusive. `breaking-change` and `migration` are independent flags that can accompany either role or a regular PR. |
| `issue: *`     | Issue intake or investigation status              | Issues only: `needs-triage`, `needs-info`, `needs-reproduction`. Use only while the condition applies.                                                                                                                                                                         |
| `source: *`    | Origin of the Issue                               | Issues only. Choose the factual source: `internal`, `expert-review`, `user-report`, `agent`, or `automation`. Do not confuse a project-owner request (`internal`) with a report submitted through the product's user-report UI (`user-report`).                                |
| `attention: *` | Special action still required                     | Issues and PRs, only when applicable: `decision`, `blocked`, `manual-qa`. Remove a transient label after the underlying condition is resolved.                                                                                                                                 |

### Educational production work types

Use the following `work: *` labels to classify the **educational artifact being created or edited**, independently of the PR's topology (`pr: integration` vs `pr: agent-subtask`), repository scope (`content: *`) and other kinds of work (`work: content`, `work: review`, etc.). Work labels may be used on both Issues and PRs, and do not imply a review stage, approval or readiness.

| Label              | Apply when the work delivers                                                         |
| ------------------ | ------------------------------------------------------------------------------------ |
| `work: course`     | An authored Course definition, editorial plan or Course-specific educational content |
| `work: episode`    | An authored Course-owned Episode definition, narrative scenario or Episode content   |
| `work: assessment` | An authored Course-owned Assessment and its evaluation content                       |
| `work: lesson`     | An authored Lesson definition, methodology or canonical Lesson content               |
| `work: questions`  | Authored Question Banks and assessment questions for Lessons                         |
| `work: flashcards` | Authored Flashcard Banks and learning flashcards for Lessons                         |
| `work: media`      | Static Lesson media assets, including illustrations, audio and video                 |

Apply the applicable work label to new production Issues/PRs and to existing ones when their actual deliverable is verified. Multiple work labels are permitted when work genuinely spans categories: for example, `work: content` + `work: lesson` can describe both the broad activity and the specific artifact. Do **not** apply a Course's `work: course` to its Lesson or Question/Flashcard child PRs simply because of ancestry; classify each work item by its own deliverable. Do **not** label generic tooling, CI or workflow changes with these educational deliverable labels merely because they enable educational authoring.

All `work: *` labels, including the seven educational production types, share purple (`#7C3AED`). All `pr: *` labels continue to share green (`#16A34A`) and describe PR role or change characteristics only. The canonical `.github/labels.json` owns exact names, colors and descriptions.

Consult the catalog for exact label names and colors. Content scopes use parchment yellow (`#D9C48B`), applications teal, backend rust, shared packages blue, Studio classic amber (`#B7791F`), and repository tooling/fallback slate. The `work` group includes activity labels (`feature`, `architecture`, `fix`, `refactor`, `content`, `translation`, `review`, `tests`, `ci`, `docs`, `tooling`) and the seven educational deliverable labels (`course`, `episode`, `assessment`, `lesson`, `questions`, `flashcards`, `media`).

**Distinguish architecture from feature and refactor:** Use `work: architecture` for system design or architectural changes to module boundaries, contracts, data models, composition, dependency direction, or runtime data flows. Use `work: feature` for new user-facing or technical capabilities, and `work: refactor` for reorganizing implementation without intentionally changing its architecture or behavior. Architecture-only work must not be labeled `work: feature` solely because it adds technical infrastructure. Apply both labels only when the change genuinely includes both architecture work and a new capability.

## Draft pull requests for coding agents

Coding Agents **must create every PR as a GitHub Draft** (`draft: true`), whether regular, integration or agent-subtask. **Draft is the active-editing state:** before starting a series of commits on an already Ready PR, convert it back to Draft to avoid repeatedly launching expensive CI. Keep it Draft while implementation, generation, review corrections or other work is unfinished. **When the assigned, authorized work is complete and the agent is handing the PR to the owner for inspection, the agent must mark it Ready for review without waiting for an additional owner command.** That transition triggers the applicable full-for-target Ready checks, even without a new commit. Investigate and repair actual failures, returning to Draft while actively committing repairs, then mark Ready again. A Ready-only check absent or deferred on Draft is _not a blocker_ and is _not a pass_. Do not claim checks succeeded until the latest-head Ready runs finish. Ready is not merge authorization; preserve separate owner approval and entity-stage authorization. This is native PR state, not a title prefix or label.

## 3. Application requirements

1. **At creation:** classify each new Issue and PR with the applicable scope label(s) (`content: *`, `app: *`, `backend: *`, `shared: *`, `studio`, `repo: *`) and `work: *` labels. Apply the applicable `work: course`, `work: episode`, `work: assessment`, `work: lesson`, `work: questions`, `work: flashcards` or `work: media` label for the produced educational deliverable; add relevant labels from other groups when appropriate. Creating labels in GitHub or adding names to the catalog does **not** apply them automatically to existing items.
2. **While updating:** re-evaluate labels when scope, status, blockers, or change characteristics evolve; remove stale labels. Never add mutually exclusive `priority: *` levels or both PR role labels.
3. **For multi-agent work:** the central PR receives `pr: integration`; each agent's PR receives `pr: agent-subtask` and targets the integration branch. Preserve the mandated integration hierarchy. The actual scope/agent partition belongs in the PR body or work plan rather than boilerplate title prefixes.
4. **For normal PRs:** omit `pr: integration` and `pr: agent-subtask`; they are not generic PR types. Assign `pr: migration` and/or `pr: breaking-change` only if the changes warrant them.
5. **When labels cannot be applied:** report the limitation and the exact labels needed. Do not claim the Issue or PR is labeled until GitHub confirms the update.
6. **For existing Issues/PRs:** the sync workflow renames former `area: *` scope labels and the five previously issued `pr: course|lesson|questions|flashcards|media` labels to their canonical `work: *` or scope equivalents in place, retaining Issue/PR assignments; it does not delete unrelated labels. The backfill runs after a successful sync to add missing scope labels to historical Issues/PRs.

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

## Entity-owned translation and independent review topology

For **new Course/Episode/Lesson/Questions/Flashcards entity work**, follow [Manage Translation Production](../skills/translation-workflow/manage-translation-production.skill.md): **reuse the current entity-owned PR throughout translation and independent linguistic review**, irrespective of its existing integration/agent-subtask role. Do not create separate translation, translator or reviewer PRs/branches or a competing production-status Issue. Preserve its existing branch ancestry and PR role label; record the exact immutable entity × locale × field inventory and source/review evidence in that PR. Historical translation campaigns and PRs retain their links, approvals and active assignments until separately reconciled.

Independent review starts **only when the owner authorizes** a qualified reviewer, exact entity PR/source SHA and entity × locale scope. A distinct review context/persona provides independence; **it does not require a separate branch or PR**. The reviewer reads generated scoped Markdown/manifest from that entity branch and may correct authorized fields there, repinning and repeating affected checks. Clean artifacts and preserve complete locale/typecheck/publication gates before the owner-approved merge. The existing Question/Flashcard bank subtask PRs themselves are still separate entities; this rule eliminates only their extra translation/review PR topology. GitHub `issue_comment` commands and historical Issues remain supported.

## Lesson production Draft PR coordination

Use [Create Lesson Flow](../skills/lesson-workflow/create-lesson-flow.skill.md): one Lesson UUID per Draft Lesson PR with verified content SHA, stages, reviewer evidence and bank child PRs. Course-originated Lesson PRs target the real Course integration branch and carry the exact `svitlo-course-lesson:v1` Course/Lesson/Parent PR marker from #639. Legacy Production Issues are historical inputs to reconcile, not new mandatory coordinators.

For nested Course → Lesson → Question/Flashcard branches, apply **one** PR role label: `pr: agent-subtask` for a Lesson child of a Course (even when receiving bank children), or `pr: integration` for a standalone Lesson coordinating independent bank subtasks. Actual branch ancestry, not both mutually exclusive labels, establishes nesting. Never invent identity or approvals, auto-advance an unauthorized production stage, or merge without owner permission. **Do** mark the PR Ready for review when its specifically authorized work is complete and fit for owner inspection; this is a CI/review handoff, not a stage approval or merge.

## Episode production Draft PR coordination

Follow [Create Episode Flow](../skills/episode-workflow/create-episode-flow.skill.md). A separately authorized Episode child PR targets its immediate owning Course branch, uses `work: episode` and `pr: agent-subtask`, and preserves the allocated UUID and ordered placement. The Episode PR owns all ten stages and actual human Media Generation and QA evidence. Generic Episode infrastructure is not authored Episode content. The label sync creates the new label from the catalog; it has no historical `pr: episode` rename requirement.
