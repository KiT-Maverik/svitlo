# Create Questions Flow — resumable Lesson Question Bank production

**Final technical invocation (Stage 5):** The SHA-reviewed bank `draft.ts` invokes `materializeQuestionBank(reviewedQuestionBank)` once from `@svitlo/engine/build` with a complete `QuestionBankWorkflowStage3` object. Independent review and Lesson ownership are checked outside the no-token worker; the write-token publisher never replays or compiles authored source. No AST literal decoder, local temporary Git writer or second materialization input is supported. See [Direct source architecture](../../docs/architecture/typed-production-materialization.md).

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

**Typed authoring boundary:** a bank
is authored in the same Lesson-owned `questions/draft.ts` from Stage 1 through
Stage 4, with `satisfies QuestionBankWorkflowStage1`, then Stage 2 and Stage 3.
The file is an **incomplete bank-owned authoring object**, not the final published
Question Configurator index. It must NOT be imported by the assessment publisher
or mistaken for a bank. Stage 4 reviews and directly corrects the Stage 3
source in the same Questions PR, retaining baseline/final SHA evidence in the
PR only. Stage 5 uses `QuestionBankWorkflowStage3`, an alias to
the final Stage 3 type, and an explicit verified source-preserving transition to
the canonical `questions/index.ts` export plus child modules. The trusted bank materializer owns that transition, safe writes and orchestration. The typed trusted command requires default-branch deployment, explicit authorized invocation and immutable source SHA. Independent review remains editorial; no PR prose or verdict is parsed.

**Validation:** TypeScript `satisfies` enables early source diagnostics but
does not prove unique order keys/UUIDs, source SHA, completed review, scoring,
correctness, media, authored locale coverage or publication. Independent
review remains editorial; Stage 5 preflight enforces identity/order/asset
safety and full Engine Config validation, and publication verifies all bank
members (including unselected members) and Section refs. Draft CI intentionally
defers expensive checks. See the relevant [architecture](../../docs/architecture/lesson-assessment-bank-separation.md).

## Stage 1 — Lesson Analysis

The Assessment Architect compares the approved Lesson methodology, stable UUID,
Skill/outcome/method decisions, current source and derived reference Markdown at
a **verified exact Lesson SHA**. Analyze audience, misconceptions, prerequisite
knowledge, task representations, media needs and genuine upstream dependencies.
A substantial instructional Lesson normally requires its own full bank even
without a Quiz; an external-bank-only assessment Lesson does not create an
empty Questions PR. Preserve the four independent
`LessonProductionAssessmentRequirements` booleans and the distinct
`quizRequiredForCompletion` decision. If the Lesson's assessment methodology
approves N/A, record the Methodologist decision in its Lesson PR and do not
manufacture a bank or handoff.

For an authorized own bank, initialize only the Lesson-owned
`content/<book>/data/lessons/<last-hex>/<lesson-uuid>/questions/draft.ts`
as `{ config, production } satisfies QuestionBankWorkflowStage1`. Its
`config.ownerLessonId` is the **existing Lesson UUID**, not a second bank UUID;
`production.languages.document` identifies the genuinely authored source
language and `planned` includes intended target languages. Record verified
Lesson path/SHA, reference and methodology sources, assessment decisions, Skill
evidence intent, misconceptions and dependencies in production-only metadata.
No `defineQuestion`, Quiz Section, invented Question IDs, fake candidates,
publication or new YAML is permitted here. A Course/Lesson-originated handoff
may create this initial file **only** after explicit Lesson Stage 7
authorization; verify no existing bank or conflicting staged source exists.
A Stage 1 index is purposely incomplete/unpublishable.

## Stage 2 — Question Design

Refine the **same** `questions/draft.ts` to
`satisfies QuestionBankWorkflowStage2`, keeping all Stage 1 analysis.
Build an evidence matrix first: target Skill and observable outcome,
`assessmentMethod`, cognitive operation, misconception, transfer/context,
expected diagnostic evidence, nonredundancy, scoring limitations and core vs
extension rationale. Keep only substantively distinct items; no fixed quota
and no obligation to exercise all nine response widgets or all methods.

Author the **complete bank** in `config.questions`, grouped by the actual
nine Engine Question `type` discriminants, then camelCase slug. Each node
contains `config` (the real kind-specific Question Config fields) and
`production` (evidence, distinction, rationale and media/specification needs).
Preserve real immutable Question and nested Block UUIDs, source-locale prompts,
answer variants, restrictions, scored keys, hint/explanation and ordered
`{items,order}` collections. Nested ContentBlock, Carousel slide and
Checkpoint child nodes hold **plain typed Config objects**, never constructed
Configurators; final `define*` instances belong to Stage 5. Do not substitute
a generic Question Config or invent correct answers. Type derivations live in
`shared/engine/types/workflow/questionBankWorkflow.types.ts`; the individual
nine Config/Zod schemas remain the scoring source of truth. A missing
physical asset is an explicit production blocker, not a fake file reference.
No second YAML/JSON Schema editor source is needed.

## Stage 3 — Quiz Section Design

Inspect current Lesson and ordered Sections, actual Quiz modules, approved
`quizSectionRequired` and `quizRequiredForCompletion` decisions. Refine
the **same bank source** to `satisfies QuestionBankWorkflowStage3`; add
only `production.quiz`: `{kind:'none',rationale}` for no approved local
Quiz or `{kind:'local',rationale,sections:{items,order}}` with each existing
or authorized new Section UUID/path, placement rationale, outcome coverage
and upstream dependencies. No Quiz is automatically created by the bank.

Preserve existing approved Section IDs, order, screen ContentBlocks and
learner-facing copy, including an explicitly blocked `feedc0de-` provisional
selection from Lesson Stage 6. Such a value is **never** a real Question or
publication-ready choice. A bank with no local Quiz still proceeds through
all seven bank stages. A downstream assessment-only Lesson owns its **own**
Quiz Section and may select from reviewed upstream banks.

Choose a small, pedagogically sufficient subset per actual local Quiz, but
record its rationale in the Questions PR and Stage 3 design metadata **without
storing a second canonical UUID selection list in the bank**. Only after
Stage 5 produced typed Question modules may the **Lesson Section owner**
edit the real `defineQuizSection`, importing the chosen Question
Configurators and assigning `params.selection.questionIds:
[approvedQuestion.id, anotherQuestion.id]`. Do not make an AST verifier,
fabricate upstream references or automatically rewrite Section registries.

## Stage 4 — Independent Assessment Review

A different specialist agent/chat context independently reviews the **entire**
Stage 3 typed source and every proposed local Quiz design at a pinned baseline
SHA. Check real correct-answer models, distractors/answer variants, method and
outcome coverage, unsupported grading, nonredundancy, source locales,
accessibility restrictions, media needs and upstream-bank dependencies.
The independent reviewer **edits and corrects that same typed bank source**
within the same Questions PR under Assessment Architect authority; no separate
review PR, approval properties on Config/Props, `Stage4` authoring type or
mandatory return to Stage 2. Re-verify the corrected source and record
baseline/final SHA, corrections, scope and outcome in the Questions PR. Escalate
genuinely unresolved Methodologist or another entity's ownership decisions
rather than inventing assessment semantics.

## Stage 5 — Resource Production

**Prerequisite:** verify the current bank-level bridge, safe writer and actual composition of the nine Question-kind materializers. The final input is exactly
`QuestionBankWorkflowStage3 = QuestionBankWorkflowStage3`;
review evidence remains human-readable on the PR, not in a second MaterializeProps object or machine-parsed eligibility gate.
A Stage 1 or Stage 2 source cannot call the final materializer.

Once integrated and separately authorized, preflight exact Lesson UUID/path,
source/final review SHAs, languages and all nonempty Question kinds, unique
UUIDs across bank/children, safe slug keys and matching complete order arrays,
required answer fields, source-language values, media and child materializers.
Generate canonical separate
`questions/<type>/<slug>.ts`,
`questions/<type>/index.ts` and final `questions/index.ts`
exports; preserve nested ContentBlock modules and all authored members.
**Editorial and materialized entrypoints are distinct:** consume the reviewed `questions/draft.ts` and create the complete `questions/index.ts` and its members in a single SHA-pinned Git commit. No existing output may be clobbered. Retain reviewed bytes through their immutable Git commit/blob; no additional archive is needed. No Question UUID is regenerated during materialization.

The nine concrete materializers remain the only owners of their
kind-specific source renderers. The bank root orders, dispatches and verifies
the full bank, without another generic Question factory. The materializer
does not author Quiz Sections: only the Lesson Section owner imports the
actual Question Configurators and sets `questionIds: [first.id, second.id]`
on each approved local Quiz, preserving Section IDs/order, after the bank
source is available. Do not edit another Lesson's Quiz.

Complete source/resources and actual Engine typecheck/tests, rendered
Question fixtures, answer scoring, Lesson/Section selection checks, all-member
`generateAssessmentResources --kind question` publication, strict UUID
manifest, locales, accessible media and textbook build. Missing artifacts,
unreviewed locales or provisional `feedc0de-` IDs remain blockers. A draft
source scaffold or green Draft check is not production completion.

**Typed materialization:** use the trusted `/questions materialize` command on the existing reviewed child PR after its deployment to default branch. See [Bank materialization](../../../scripts/ci/bankMaterialization/README.md). No YAML builder is available as a parallel workflow.

## Stage 6 — Translation

On the **same Questions PR**, localize the full bank and its nested
ContentBlocks, including unselected Questions, answer variants, distractors,
hints, explanations, media alternatives and accessible labels. After Stage 5
the editable source of truth is the real materialized TypeScript Question
modules, **not** stale YAML, a second authoring document or a translated copy
of the Stage 1 analysis. Preserve identity and scoring semantics; do not
treat runtime English fallback as completed translation. Record every genuine
locale/field completion and source SHA in the existing Questions PR. Approved
local Quiz screen copy is Section-owned, so coordinate its corrections with
the Section owner in this PR without adding an external review PR.

## Stage 7 — Independent Translation Review

A **different authorized reviewer agent/context** reviews Code-derived Question-bank Markdown + manifest generated for the owning Lesson UUID/locale **on the same Questions PR** at a pinned source SHA. Verify `manifest.sourceCommit`, full Question selection and `reviewReady`/missing diagnostics. Per target language/source SHA, review all bank items plus actual Quiz
text and grading-sensitive answer meaning. Check RTL, bidirectional
math/text, units, accessibility labels and only verified media refs.
Use real generated review artifacts; missing artifacts are blockers,
not evidence of a successful review. An independent reviewer can make **owner-authorized corrections in that Questions PR branch**, followed by regenerated SHA-pinned artifacts and focused re-review. Record source/review SHAs, identity, findings and locale approval there. Follow [Translation Workflow](../translation-workflow/README.md) **without** starting separate translation/reviewer PRs, branches or a bank Production Issue. Cleanup is required before owner-authorized integration into the parent Lesson PR.

## Completion evidence and PR template

Keep the Questions PR Draft while assigned work is unfinished or actively changing. After completing the authorized work and making it fit for owner review, **mark Ready for review automatically** and verify the target-specific latest-head checks; the owner alone authorizes merge and any separate production stage. Draft-only omission of expensive CI is intentional, not a blocker. Track these
seven stages in the PR body, with:

- Lesson UUID, parent Lesson PR, source language, supported languages,
  exact Lesson/Questions source SHA and branch relationships.
- Current stage, precise next action, blockers and Stage 4 review evidence using the [canonical independent review rule](../../rules/independent-review.md), with links to real work.
- Full bank path/UUID inventory and evidence matrix, per-Quiz Section
  UUID/path/placement and selected Question UUIDs, and confirmation
  that unselected Questions remain in the published full bank.
- Tests actually run: typed workflow fixtures and nine concrete materializer tests, Engine Config checks,
  publisher --preflight/--check, Section/UI Kit checks, Engine typecheck,
  package/textbook build, localization/RTL QA, CI and independent reviews.

Final QA is a checklist, **not an eighth stage**. Before owner-authorized
Ready/merge, run the existing `generateAssessmentResources --kind question`
production publisher without `--draft`; verify that **every bank Question**
(including unselected items) is included in the generated publication and
staged textbook manifest. Inspect the entire changed Lesson UUID root for any
`TODO(asset)`, reserved Nil media filename, obsolete/parallel `questions.yaml` or
missing referenced media, captions and accessible alternative. The strict
textbook `package:build` must succeed for the full required language scope,
including the post-generation check that every explicitly selected **local** Quiz candidate resolves to the correct published Question, body and locale file. For an external downstream assessment Lesson, separately verify that the completed bank is integrated into its actual branch ancestry and published with the correct owning Lesson/UUID/locale; verify the merged global UUID resolver, manifest, and downstream branch ancestry actually provide the requested upstream resources.
Passing typed source materialization alone is not resource completion; do not
mark the Questions child PR complete until the real generated resources exist.
A missing or unfinished **required** Question Bank is never marked Questions-N/A; an approved assessment-only Lesson's absent **own** bank is a separate documented exception, conditional on verified external Question resources. Do not modify Flashcards
Flow, Course Flow, or derive an independent Lesson Markdown generator
inside this workflow.
