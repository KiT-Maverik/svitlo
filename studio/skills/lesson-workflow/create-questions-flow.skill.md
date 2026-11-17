# Create Questions Flow — resumable Lesson Question Bank production

**Purpose:** produce an independent full Question Bank and one or more
pedagogically small Quiz Section selections for an existing Lesson.
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

Use a single **Draft Questions child PR** targeting the open parent
Lesson PR head branch; if the Lesson was merged, use its verified
current integration/main base. Reuse an existing work PR rather than
creating duplicates. Record source SHA and review SHA. When nested
in a Course/Lesson integration hierarchy, follow actual GitHub
label rules; pr: integration and pr: agent-subtask are mutually
exclusive. Do not alter the parent Lesson's unrelated content,
Screenwriter sections, Flashcards bank, or other child branches.

The parent [Create Lesson Flow #643](https://github.com/KiT-Maverik/svitlo/pull/643)
is merged and orders **per-Lesson** Questions before Flashcards.
[Flashcards Flow #646](https://github.com/KiT-Maverik/svitlo/pull/646)
is a **downstream consumer, never a dependency or merge gate of this
Create Questions Flow PR**. Finish, review and merge #647 independently;
afterwards #646 can incorporate the available Question authoring contract.
For an actual Lesson, finish and integrate its Question bank and Quiz
Section registry edits before the Flashcards child edits the same
Section registry. A genuinely reviewed Questions-N/A decision is
different from an unfinished Question Bank. Do not wait for #646 to
merge before completing #647.

## Stage 1 — Lesson Analysis

Collect approved outcomes, target Skills, required cognitive Assessment
Methods, audience, misconceptions, representations, prerequisite knowledge
and current Quiz Section purpose/order. Compare methodology against the
current derived Lesson Markdown and real TS sources at an exact SHA.
A bank may be appropriate without any embedded Quiz. If source content,
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
Section module and the order. **Reuse** a suitable existing Quiz
Section and stable UUID whenever possible; create one only when
approved methodology requires it and none exists. Multiple Quizzes
are allowed. An independent Question Bank does not force a Quiz.

Choose a _small, purposeful, explicit_ Question UUID subset per Quiz
without removing unselected Questions from the bank. The modern
defineQuizSection uses params.selection.questionIds; mode all means
every ID in that specified small subset, not every bank member.
For sample, count must fit the eligible pool and every sample must
respect required outcome/method coverage; there is no guaranteed
stratified sampler. Review placement, interaction/retry policy,
time limits, feedback, accessibility and learner attention.

Before materialization, the source may carry a temporary
quizSelections mapping from Section UUID to selected Question UUIDs.
The actual TS Section Config will become authoritative once the
Coding Agent materializes it; never keep competing permanent
Quiz selection sources.

## Stage 4 — Independent Assessment Review

A reviewer other than the author checks every bank item and all Quiz
designs on verified current SHAs. Verify factual/answer correctness,
plausible distractors, observable evidence, required Method coverage,
nonredundancy, target language, accessibility/restrictions, relevance
of media and supported grading behavior. For every selected Quiz,
review that its small subset actually covers the Methodologist's
intent. Re-review after material edits. Record the verdict in the
Questions PR, not YAML/Config status flags.

## Stage 5 — Resource Production

Use [Questions Builder](../../../shared/engine/scripts/questionsBuilder/README.md)
at the authorized handoff:

- Validate current Engine Question authoring shapes and selection UUIDs
  with --preflight; do not add stage-specific schemas.
- Use --write to create Question Configurator modules under
  questions/<questionType>/<slug>/index.ts and the independent
  questions/index.ts bank. No existing source is overwritten.
- The Section owner edits only the approved Quiz module(s),
  sections/index.ts and necessary root Lesson imports/order, preserving
  all unrelated Sections/UUIDs. This work is intentionally not performed
  by a bank generator on an existing hand-authored Lesson.
- Use --verify-sections to verify static Section UUID selections and
  registration; review custom dynamic Composition manually.
- Publish **all** Questions with the existing Engine
  generateAssessmentResources --kind question publisher and test
  selected resource loading, real UI Kit support, full intended Lesson
  locale coverage, assets, TypeScript and textbook builds.
- Remove temporary questions.yaml only after all bank modules and
  selected Sections have been verified and editorial content transferred.
  On partial writes, missing media/locales, stale parent SHA, skip or
  conflict, retain YAML and report exact blockers. A Lesson-root
  lesson.yaml is not regenerated or restored by this stage.

The builder creates source-only drafts; absence of translations or
media may produce legitimate expected pending work, never a false
successful publication. Do not embed Question Bank in Lesson Config,
Lesson Props or Quiz Section. Custom Practice is a future independent
consumer, not evidence of a shipped UI or scheduling system.

## Stage 6 — Translation

Translate the **entire Question Bank**, not only default Quiz items,
including accepted answer variants, distractors, hints, explanations,
media alternatives and accessible names, plus Quiz Section titles and
learner-facing content. Preserve IDs, answer semantics, source locale,
numeric/unit accuracy and Lesson language scope. A Course build may
request a validated subset but must not silently narrow the reusable
bank or invent fallback translations.

## Stage 7 — Independent Translation Review

Per target language/source SHA, review all bank items plus actual Quiz
text and grading-sensitive answer meaning. Check RTL, bidirectional
math/text, units, accessibility labels and only verified media refs.
Use real generated review artifacts; missing artifacts are blockers,
not evidence of a successful review. Keep stage/locale evidence in
the Questions PR. Follow separately applicable Translation Production
Issue coordination when relevant.

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
including the post-generation check that every explicitly selected Quiz
candidate resolves to the correct published Question, body and locale file.
Passing the Questions YAML→TS builder alone is not resource completion; do not
mark the Questions child PR complete until the real generated resources exist.
A missing or unfinished
Question Bank is never marked Questions-N/A. Do not modify Flashcards
Flow, Course Flow, or derive an independent Lesson Markdown generator
inside this workflow.
