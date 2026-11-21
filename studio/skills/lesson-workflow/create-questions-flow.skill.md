# Create Questions Flow — resumable Lesson Question Bank production

**Purpose:** produce an independent full Question Bank for an existing **bank-owning Lesson**, plus deliberate Quiz Section selections **only when that Lesson has approved Quizzes**. A full bank can exist with no Quiz Sections.
Input is the Lesson UUID or its current parent Lesson PR number.
The bank and each Quiz Section are separate deliverables; neither
truncates the other. This is a seven-stage, PR-tracked workflow.

**Responsibilities:** [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md)
owns evidence and Question design; [Methodologist](../../personas/methodist.persona.md)
owns Skill/outcome/Quiz necessity; [Coding Agent](../../personas/coding-agent.persona.md)
owns deterministic TS materialization; independent Assessment/QA/Development
Reviewers own their respective review decisions; [Technical Translator](../../personas/technical-translator.persona.md)
and an independent linguistic reviewer own localization.

Read root AGENTS.md/README.md, Studio GitHub labels policy and actual
Engine Config/Props, UI Kit Question renderer, [Lesson entity](../../docs/entities/lesson.md),
[Section entity](../../docs/entities/section.md), [bank separation](../../docs/architecture/lesson-assessment-bank-separation.md),
[UUID addressing](../../docs/architecture/entity-uuid-addressing.md),
[internationalization/accessibility](../../docs/architecture/internationalization-and-accessibility.md),
and the [Question authoring standard](./create-lesson-questions.skill.md).
A historical content.yaml or compulsory production Issue is NOT a
current prerequisite for this PR-based workflow.

## Coordination and prerequisite

Resolve the actual Lesson UUID directory, ownership, source locale,
declared language set, head/base SHA, methodology, current modular
index.ts and sections/index.ts, existing Question Bank/child PR,
Quiz requirements and approved Skill definitions. Read derived
Lesson Markdown from the existing generator; do not clone it or scan
the entire media tree.

Do **not** create an empty Questions PR for an assessment-only Lesson whose approved methodology explicitly relies solely on upstream Lessons' banks. Its parent Lesson PR records **own Questions: pending external banks** until evidence permits Methodologist-verified **Not Applicable**; its **Quiz selection** is finalized downstream, not inside an upstream bank owner's Questions PR. A teaching Lesson with an absent/unfinished required bank is never Questions-N/A.

Use a single **Draft Questions child PR** targeting the open parent
Lesson PR head branch; if the Lesson was merged, use its verified
current integration branch (normally `develop`, not implicitly `main`). Reuse an existing work PR rather than
creating duplicates. Record source SHA and review SHA. When nested
in a Course/Lesson integration hierarchy, follow actual GitHub
label rules; pr: integration and pr: agent-subtask are mutually
exclusive. Do not alter the parent Lesson's unrelated content,
Screenwriter sections, Flashcards bank, or other child branches.

The canonical [Lesson Flow](./create-lesson-flow.skill.md) orders each Lesson's own Questions before Flashcards. Finish the independently reviewed bank and any justified **local** Quiz Section registry edits, and integrate them into the actual parent Lesson branch before a Flashcards child edits that registry. This is an **entity-specific dependency**, not a requirement to reopen, merge or wait on historical workflow-implementation PR numbers. Downstream assessment-only Lessons must handle their own verified upstream Question selection without forcing Quiz Sections or reverse dependencies onto source Lessons.

## Mandatory user-facing stage report and next-action handoff

After each completed or paused stage, at a blocker, and on a status/resume request (including a message containing only the Questions child PR number), **inspect and reconcile first**. Read the current child PR body, head/base, actual Lesson UUID and parent Lesson PR, the latest Lesson content/reference Markdown, verified bank/Quiz Section files, reviewers, SHA-scoped evidence and applicable CI. A bare PR number requests a report and recommendation, **not** execution, PR creation, review approval or merge. The child PR description is the only bank workflow tracker. Do not add stage/status fields to `questions.yaml`, Lesson Config/Props or another ledger. **If invoked from a parent Lesson PR and no Questions child PR yet exists**, report `Questions PR: Not started` and all seven bank stages as not started (no invented child PR ID). After verifying that an own bank is required, recommend the separately authorized starting instruction `do questions for lesson <lesson-uuid> related to PR #<lesson-pr-number>`; do not create the PR until the user actually requests that action.

Always end the user-facing response with:

1. **Question Bank identity:** verified Lesson UUID and title/slug, parent Lesson PR `#N`, Questions child PR `#M`, and evidence/head SHA where known.
2. **All seven Questions stages in order:** 1. Lesson Analysis; 2. Question Design; 3. Quiz Section Design; 4. Independent Assessment Review; 5. Resource Production; 6. Translation; 7. Independent Translation Review. Mark each `✅ completed`, `▶ in progress`, `⬜ not started`, `⛔ blocked` or `↻ stale`, reflecting verified deliverables, required independent approvals, current source revisions and per-locale coverage. Distinguish `Quiz selections: Not Applicable` for a bank-owning Lesson with no approved Quiz from **`Questions (own bank): Not Applicable`**, which means **do not start this Questions workflow at all** unless an actual, separately authorized bank scope later changes.
3. **Last completed stage:** explicitly `Stage N — <name> completed` with actual evidence, or `No new stage completed`; specify blockers/stale SHAs.
4. **Next Questions stage:** the first eligible pending stage, or explicitly `None — all seven Questions stages are complete`.
5. **Recommended next action:** one grounded, copyable **chat instruction**, on its own fenced `text` line, such as `do questions stage 2 for PR #<questions-pr-number>`. State why this is the appropriate next action. The command is **not an existing CLI syntax** or permission to execute immediately. The user may paste it, give another clear instruction, or reply `go` to **one unambiguous proposal in this chat**; a bare PR number or a contextless `go` never authorizes work. If blocked, recommend an actual authorized unblock/review action instead of self-reviewing or fabricating evidence.

**Parent Lesson Stage 7 handoff:** when all seven Questions child stages are complete, independently reviewed, and **actually integrated into the parent Lesson branch**, verify and check the **parent Lesson Stage 7 — Questions** with exact child PR, source/review and integration SHAs. Then recommend Lesson Stage 8, which starts or resumes [Create Flashcards Flow](./create-flashcards-flow.skill.md) **only if a real Flashcard bank is justified**; otherwise record pedagogically verified Flashcards N/A and check parent Stage 8. If an existing Flashcards PR matches this Lesson UUID, recommend resuming it. Use a verified identifier and relationship:

```text
do flashcards for lesson <lesson-uuid> related to PR #<lesson-pr-number>
```

Before integration, the next action is the required final QA/owner-authorized review and integration of the Questions PR, **not** Flashcard authoring. If Flashcards are documented `Not Applicable`, recommend parent Stage 8 N/A evidence reconciliation and Lesson Stage 9 Translation or final gates when applicable. Never skip Questions by treating `no Quiz` as `Questions: Not Applicable`; a bank-owning Lesson may have `Quiz selections: Not Applicable` while still needing all seven Questions stages.

**Terminal state:** when all seven Questions stages are verified complete, explicitly say **"All seven Questions workflow stages are complete. There is no next Questions stage. You can assign new work."** Stop; report outstanding integration, independent Flashcards, Lesson QA, publication or merge separately rather than inventing stage eight or continuing automatically. An unmerged or unpublished bank does not satisfy downstream integration/readiness gates.

**Authoring validation boundary:** Stages 1–4 require authentic pedagogical/Assessment Architect content and independent review, not a repeated manual Zod/JSON-Schema or TypeScript check on unfinished `questions.yaml`. The existing Stage 5 Questions Builder preflight/materialization validates the final reviewed input before any writes; subsequently verify actual Question/Quiz references, source SHA, locale resources, media and production CI. Optional editor diagnostics are not a stage gate. See the [four-flow validation audit](../../docs/architecture/yaml-config-scaffolding.md#validation-boundaries-across-the-four-entity-workflows).

## Stage 1 — Lesson Analysis

Collect approved outcomes, target Skills, required cognitive Assessment
Methods, audience, misconceptions, representations, prerequisite knowledge
and current Quiz Section purpose/order. Compare methodology against the
current derived Lesson Markdown and real TS sources at an exact SHA.
A full independent bank is the **pedagogical default** for a substantive instructional Lesson even when it has no embedded Quiz. A concrete Methodologist-approved exception is required if no bank is warranted. If source content,
methodology or derived reference is incomplete, record a real blocker;
do not fabricate questions. Do not block unrelated independently ready
Lesson work.

## Stage 2 — Question Design

Build an evidence matrix BEFORE writing Questions. For each proposed
item, identify Skill, observable outcome, required Assessment Method,
knowledge aspect, error/misconception, cognitive demand, context or
representation, expected evidence and distinctness. Assign core and
extension as editorial coverage distinctions in the PR evidence, not
extra fields on Engine Config. Do not impose a fixed item quota.

Author Lesson-root questions.yaml immediately with exact current
Engine Question Config fields grouped by type and camelCase slug;
use the canonical generated question.schema.json and current Zod
Question variants. Keep real stable Question and ContentBlock UUIDs,
type, params.assessmentMethod, params.restrictions, locale and
type-specific answer/slot/matching/selection collections. All authored
text belongs to the real source language. Do not duplicate the
Question Zod schema with a manually maintained editorial schema and
never insert status/approval fields into Question Config or YAML.

Retain candidates only when they add meaningful diagnostic coverage:
new outcome, cognitive operation, misconception, transfer, boundary
condition, equivalent alternative or legitimate assessment variation.
Widget swaps, distractor shuffling and superficial renumbering are
not evidence of independent items. Record legitimate scoring limits;
do not claim all cognitive methods are automatically gradable.
Only reuse verified Lesson media UUIDs or document an unmet media need.

## Stage 3 — Quiz Section Design

Inspect actual Lesson/index.ts, sections/index.ts, each current Quiz
Section module and the order. Stage 6 may already have materialized an **enabled, schema-valid but blocked** Quiz with its approved Section ID, original screen ContentBlocks and a reserved `feedc0de-` synthetic `questionIds` entry. Treat that UUID as an unresolved draft marker, never as a real Question; reuse the existing Section and placement, replace all provisional fields with reviewed Question selections/interaction/results choices and remove TODOs only after strict Props and resource/locale verification. If the bank-owning Lesson has **no approved Quiz**, record `Quiz selections: Not Applicable — bank preserved for later assessment/Custom Practice`, skip Section mutations and continue the bank review/production stages. **Reuse** a suitable existing Quiz
Section and stable UUID whenever possible; create one only when
approved methodology requires it and none exists. Multiple Quizzes
are allowed. An independent Question Bank does not force a Quiz.

When a Quiz is approved **in this owning Lesson**, choose a _small, purposeful, explicit_ Question UUID subset per Quiz
without removing unselected Questions from the bank. An assessment-only Quiz belonging to **another Lesson** is not authored here and must not mutate this bank or Section registry; its Section owner later selects from all eligible reviewed upstream banks. The modern
defineQuizSection uses params.selection.questionIds; mode all means
every ID in that specified small subset, not every bank member.
For sample, count must fit the eligible pool and every sample must
respect required outcome/method coverage; there is no guaranteed
stratified sampler. Review placement, interaction/retry policy,
time limits, feedback, accessibility and learner attention.

Record the intended Quiz subsets and rationale in the Questions PR review
evidence before materialization. After typed Questions exist, the owning
Section imports the selected Question Configurators and uses their `.id`
values in `params.selection.questionIds`. The actual authored TS Section
Config is the only selection source; do not maintain a second YAML UUID map.

## Stage 4 — Independent Assessment Review

A reviewer other than the author checks every bank item and all Quiz
designs on verified current SHAs. Verify factual/answer correctness,
plausible distractors, observable evidence, required Method coverage,
nonredundancy, target language, accessibility/restrictions, relevance
of media and supported grading behavior. For every selected Quiz,
review that its small subset actually covers the Methodologist's
intent. Re-review after material edits. Record the verdict in the
Questions PR, not YAML/Config status flags.

## Stage 5 CI command for approved bank YAML

After Stage 4 Independent Assessment Review has accepted the current complete `questions.yaml` source (and its findings are corrected), the Coding Agent can use the opt-in [bank materialization workflow](../../../scripts/ci/bankMaterialization/README.md) **when deployed on `main`**. Verify the actual existing Questions child Draft PR identity, parent Lesson ancestry, authored canonical YAML blob and Stage 1–4 checklist. Post exactly `/questions materialize` as a top-level comment on **that Questions child PR**, or dispatch the workflow with its PR number and `bank=questions`; do not post to the Lesson PR. The job runs the existing Questions Builder `--preflight` → `--write` → `--check` with trusted Engine code and commits only verified `questions/**` files into the child PR branch. The original `questions.yaml` remains; no Lesson/Quiz Section sources or Flashcards are generated or altered. Verify the actual Actions run, source blob and new HEAD SHA before marking the source scaffold produced; a comment or green generic CI run alone is not evidence. Continue the same Stage 5 to complete Quiz selection integration, assets, verification, and publication; **never** mark Stage 5 complete from the draft scaffold alone. If the comment runner is not yet on `main`, use the documented local Builder and report the exact execution limitation instead of claiming it ran.

## Stage 5 — Resource Production

Use [Questions Builder](../../../shared/engine/scripts/questionsBuilder/README.md)
at the authorized handoff:

- Validate current Engine Question authoring shapes and selection UUIDs
  with --preflight; do not add stage-specific schemas.
- Use --write to create Question Configurator modules under
  questions/<questionType>/<slug>/index.ts and the independent
  questions/index.ts bank. No existing source is overwritten.
- **If** this bank-owning Lesson has approved Quiz Section(s), its Section owner edits only those Quiz module(s), sections/index.ts and necessary root Lesson imports/order, preserving all unrelated Sections/UUIDs. A bank with no Quiz must not acquire a Quiz merely to satisfy this stage. This work is intentionally not performed
  by a bank generator on an existing hand-authored Lesson.
- For **actual local Quiz Sections**, use stable IDs from imported typed Question Configurators in `params.selection.questionIds`; use normal TypeScript, Engine validation, publication and complete textbook builds. Do not invoke a separate AST/static Section verifier. A bank without a Quiz remains valid.
- Publish **all** Questions with the existing Engine
  generateAssessmentResources --kind question publisher and test
  selected resource loading, real UI Kit support, full intended Lesson
  locale coverage, assets, TypeScript and textbook builds.
- Remove temporary questions.yaml only after all bank modules and any **applicable local** selected Sections have been verified and editorial content transferred.
  On partial writes, missing media/locales, stale parent SHA, skip or
  conflict, retain YAML and report exact blockers. A Lesson-root
  lesson.yaml is not regenerated or restored by this stage.

The builder creates source-only drafts; absence of translations or
media may produce legitimate expected pending work, never a false
successful publication. Do not embed Question Bank in Lesson Config,
Lesson Props or Quiz Section. Custom Practice is a future independent
consumer, not evidence of a shipped UI or scheduling system.

## Stage 6 — Translation

Translate the **entire Question Bank on the existing Questions PR branch**, not only default Quiz items, and do **not** create another translation integration/translator PR, branch or Issue. Record the exact locale × Question/answer field inventory, author and source SHA in the Questions tracker.
including accepted answer variants, distractors, hints, explanations,
media alternatives and accessible names, plus Quiz Section titles and
learner-facing content. Preserve IDs, answer semantics, source locale,
numeric/unit accuracy and Lesson language scope. A Course build may
request a validated subset but must not silently narrow the reusable
bank or invent fallback translations.

## Stage 7 — Independent Translation Review

A **different authorized reviewer agent/context** reviews Code-derived Question-bank Markdown + manifest generated for the owning Lesson UUID/locale **on the same Questions PR** at a pinned source SHA. Verify `manifest.sourceCommit`, full Question selection and `reviewReady`/missing diagnostics. Per target language/source SHA, review all bank items plus actual Quiz
text and grading-sensitive answer meaning. Check RTL, bidirectional
math/text, units, accessibility labels and only verified media refs.
Use real generated review artifacts; missing artifacts are blockers,
not evidence of a successful review. An independent reviewer can make **owner-authorized corrections in that Questions PR branch**, followed by regenerated SHA-pinned artifacts and focused re-review. Record source/review SHAs, identity, findings and locale approval there. Follow [Translation Workflow](../translation-workflow/README.md) **without** starting separate translation/reviewer PRs, branches or a bank Production Issue. Cleanup is required before owner-authorized integration into the parent Lesson PR.

## Completion evidence and PR template

Keep the PR Draft until explicit owner authorization. Track these
seven stages in the PR body, with:

- Lesson UUID, parent Lesson PR, source language, supported languages,
  exact Lesson/Questions source SHA and branch relationships.
- Current stage, precise next action, blocker, independent review SHA
  and approval, with links to real work.
- Full bank path/UUID inventory and evidence matrix, per-Quiz Section
  UUID/path/placement and selected Question UUIDs, and confirmation
  that unselected Questions remain in the published full bank.
- Tests actually run: Question Builder unit tests, Zod/schema checks,
  publisher --preflight/--check, Section/UI Kit checks, Engine typecheck,
  package/textbook build, localization/RTL QA, CI and independent reviews.

Final QA is a checklist, **not an eighth stage**. Before owner-authorized
Ready/merge, run the existing `generateAssessmentResources --kind question`
production publisher without `--draft`; verify that **every bank Question**
(including unselected items) is included in the generated publication and
staged textbook manifest. Inspect the entire changed Lesson UUID root for any
`TODO(asset)`, reserved Nil media filename, temporary `questions.yaml` or
missing referenced media, captions and accessible alternative. The strict
textbook `package:build` must succeed for the full required language scope,
including the post-generation check that every explicitly selected **local** Quiz candidate resolves to the correct published Question, body and locale file. For an external downstream assessment Lesson, separately verify that the completed bank is integrated into its actual branch ancestry and published with the correct owning Lesson/UUID/locale; verify the merged global UUID resolver, manifest, and downstream branch ancestry actually provide the requested upstream resources.
Passing the Questions YAML→TS builder alone is not resource completion; do not
mark the Questions child PR complete until the real generated resources exist.
A missing or unfinished **required** Question Bank is never marked Questions-N/A; an approved assessment-only Lesson's absent **own** bank is a separate documented exception, conditional on verified external Question resources. Do not modify Flashcards
Flow, Course Flow, or derive an independent Lesson Markdown generator
inside this workflow.
