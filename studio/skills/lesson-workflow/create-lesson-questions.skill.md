# Create Lesson Questions — Assessment Architect

**Persona:** [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md). Read it fully, the [Methodologist Persona](../../personas/methodist.persona.md), applicable `AGENTS.md`, the [Lesson Workflow](./README.md), and current canonical Question/Assessment Method/Quiz/ContentBlock contracts. This skill is for **specialist editorial Question authoring**, not production of code, media or translation.

**Production coordination:** For an authorized Lesson-production batch, reuse the existing fixed-scope Lesson Production Issue under [Manage Lesson Production](./manage-lesson-production.skill.md). Confirm assigned Lesson UUIDs, ownership, source revisions, reviews and sign-offs. Process all independently ready Lessons, leave blocked ones visible, and do not create a new Issue for each bank or Lesson. Pure design/brainstorming does not need an Issue.

## Purpose and prerequisite gates

For each assigned Lesson, create or revise a single source-language machine-readable Question bank:

`content/<textbook>/data/lessons/<last-hex-digit>/<lesson-uuid>/questions/questions.yaml`

The path must match the real Lesson's UUID-resolved directory. Do not guess it from the slug. `questions.yaml` is an **editorial generation source** and **not** the runtime `Lesson.questions` catalog, an additional `content.yaml`, or an alternate owner of the methodology.

Required approved inputs:

1. `methodology.md` (or the existing legacy `methodologist-brief.md`) with approved outcomes, audience, approved target Skill IDs, `documentLanguage`, `supportedLanguages`, and explicit `assessmentPlan`.
2. The _current_ `content.yaml`, with approved Quiz keys and `assessmentPlanKey` references, Lesson explanations, representations, and available media/Scene specifications.
3. The exact canonical current Question types and input/rendering behavior, 16 Assessment Methods, Quiz selection/interaction parameters, and relevant ContentBlock contracts.
4. Verified canonical source definitions for **only the target Skills** (and neighboring/prerequisite Skills when boundary analysis needs them). Verify approval and identity. Do not invent identifiers.
5. Verified existing media paths if any; missing media must remain explicit requests.

If approvals, source revisions, target Skill identity, target Quiz method sets or essential subject evidence are missing/inconsistent, mark affected Lesson `blocked` and report the precise conflict. Continue other independently ready Lessons. Do not quietly amend methodology or `content.yaml`.

## Step 1 — Construct the evidence coverage plan

For each `assessmentPlan.quizzes[].key`, resolve its matching Quiz `assessmentPlanKey` in `content.yaml`. Enumerate the intended **Skill × observable outcome × required Assessment Method** evidence cells. Note misconceptions, knowledge aspects, answerable contexts, representation needs and necessary accessibility equivalence.

Do not force a Quiz if `quizRequired: false`. Author non-Quiz practice items only when explicitly in the approved scope/editor request, and do not silently add Quiz Sections.

The approved list of required methods is a **hard coverage constraint**, not an instruction to use all sixteen or every UI type. Each required Method must be represented by one or more Questions genuinely eliciting that operation, or reported as an explicit blocker with a proposed methodology decision. A Question may be reused in multiple Quiz assignments only when fit is justified.

## Step 2 — Generate broadly, curate rigorously

Generate a candidate pool using different _valid_ cognitive operations, knowledge aspects, contexts, meaningful representations, common misconceptions and appropriate difficulty. Evaluate each candidate against what the kept bank already tests.

**Retain only if marginal diagnostic value is positive.** It must add a distinct observable outcome, Method-driven operation, meaningful misconception/boundary, unfamiliar transfer, or necessary parallel form of the **same validated construct** for sampling/accessibility. Rephrasing, renumbering, reordering choices, switching widgets, or inserting a decorative image are not evidence of diversity.

Organize kept Questions into:

- `core`: the smallest sufficient and robust coverage of the approved requirements.
- `extension`: additional items with a written distinctness justification (e.g., transfer, targeted misconception, valid alternate sample).

Neither tier has a mandatory item count. Do not add arbitrary quotas or force one Question per Skill, one Question per Method, or one of each type. Keep a useful pool when opportunities are genuinely rich; stop when further candidates would be near-duplicates. When a competency cannot be evaluated validly with available Question formats, document the limitation instead of making a fake multiple-choice substitute.

## Step 3 — Curate each default Lesson Quiz independently

**The bank and the ordinary Lesson Quiz are separate deliverables.** The full bank is retained for future **Custom Practice**, and it may contain far more Questions than the default Lesson Quiz. `core`/`extension` are bank coverage tiers, not Quiz inclusion switches. A default Quiz should normally show **only a small, pedagogically sufficient subset**, never all 100 items just because 100 were written.

After authoring the bank, inspect _every approved Quiz Section_ in the current `content.yaml` and map its `assessmentPlanKey` to exactly one `quizAssignments[]` entry. Author its explicit `selection` object using the existing `Quiz_Parameters.selection` contract:

- **Recommended for the ordinary default Quiz:** `mode: all` **with a required, explicit, short `questionSlugs` list**. This mode means "include all slugs on this particular list"—not the whole Lesson bank. Select Questions deliberately to cover the Quiz's intended target Skills, required Assessment Methods, outcomes and representative misconceptions. Prefer a compact, balanced set rather than the easiest items or a comprehensive exam.
- **Optional sampled subset:** `mode: sample` **with an explicit eligible `questionSlugs` pool**, positive integer `count` and deliberate `shuffle`/`seed`. The current Engine uses seed `0` by default: published Quiz samples are **deterministic**, not automatically refreshed at every attempt. Custom Practice could vary the seed through separately implemented runtime behavior. Use sampling only when the selected set is pedagogically safe; the present `Quiz_Parameters` has **no built-in stratified sampling by Skill or Assessment Method**. If sampling might omit required evidence, use a curated fixed set or escalate the need for stratified runtime support.
- **Never omit `questionSlugs` for a default Lesson Quiz**: the current runtime then selects from the entire bank. Also never duplicate all bank Question slugs into an ordinary Quiz by default.
- The Quiz must use only approved, existing bank Question slugs, preserving their source-language and type-independent identities. Assign separate default selections for multiple Quizzes, reflecting their placement and prerequisites, and avoid unintended repeated Questions.
- A Question **not selected into any default Quiz remains in the Lesson bank** and remains eligible for extra practice. Do not delete or artificially cap the bank to satisfy the default Quiz length. Custom Practice should be able to operate on the full valid bank when implemented, with its own independently configured selection and scoring.

**Ownership and generation:** keep the Quiz subset specification in Assessment-Architect-owned `questions/questions.yaml`, not in the Screenwriter's `content.yaml`. The future YAML-to-TypeScript builder must combine the documents by `assessmentPlanKey`, map the explicit `quizAssignments[].selection` to the matching generated Quiz Section's `parameters.selection` in Lesson config, and publish **all Questions** to `Lesson.questions`. It must preserve the other Quiz parameters and never rewrite the Screenwriter's source. Confirm actual generated data and semantics after the generator exists; do not claim it does today.

## Step 4 — Author complete, implementable items

Every kept Question needs:

- Stable `slug`, one actual `Question_Type`, one canonical `AssessmentMethodKey`, approved `targetSkills`, applicable `assessmentPlanKeys`, and `pool`.
- `evidence` with the exact targeted outcome, cognitive operation, diagnostic distinction, and why the item is not redundant (`distinctness`). Set context/demand when useful.
- The **source-language prompt** as ordered simple `contentBlocks` in `question`, including verified media or explicit pending media requests when cognitively justified. Keep editor-friendly block text and specifications rather than fake generated ContentBlock IDs or authored code.
- `answer` with full type-specific answer data, including correct/incorrect/distractor blocks, accepted values, pairs, sequence or slots as the applicable contract requires. Use stable choice/pair keys. For `selectOneAnswer`, distinguish normal incorrect options from extra distractors. Do not use an empty, ambiguous or ungradable answer key.
- Optional `hint` blocks, and required `explanation` blocks explaining the logic and addressing likely errors, without rewriting the full Lesson.
- Accessibility and localization dependencies when applicable, especially visual evidence equivalence, number/unit conventions and untranslatable media.

The schema uses **editorial block** shapes: `{type: text, text: ...}` for source text and `{type: image, assetPath: ...}` for approved existing images, or `{type: image, assetRequest: {description, purpose, altIntent, status: pending}}` for pending images. These are **not** direct runtime ContentBlocks; the Coding Agent will generate actual typed blocks and stable IDs. Do not invent media paths. Do not prescribe unsupported new response types. For non-text blocks whose content cannot yet be serialized by the editorial schema, record a specific production dependency rather than faking it.

Do not claim automatic scoring can measure open-ended justification/knowledge construction without verified grading support. Where chosen Method requires such evidence, design a valid item plus explicit limitation/review requirement.

## Step 5 — Source language and provenance

Write **exactly one source-language bank**. `documentLanguage` defaults to `en` unless the editor explicitly selects a different approved language. It must belong to `supportedLanguages`. Copy `supportedLanguages` unchanged from the approved Lesson. Every learner-facing prompt/answer/explanation/hint and media text specification is authored only in `documentLanguage`. Technical keys and canonical `assessmentMethod` values remain exact English identifiers. **Do not translate** or fill missing locale values with duplicates/placeholders.

Record `sources.methodology.path`, `sources.content.path`, and available immutable `revision` (Git blob SHA or commit reference). Preserve existing Question slugs and avoid unnecessary churn on regeneration.

## Output schema

Use [`lesson-questions.schema.json`](./lesson-questions.schema.json) as the editorial YAML validation schema. Required top-level groups are:

- `schemaVersion: 1`, `kind: lesson-question-bank`, `status`, `lessonId`, `documentLanguage`, `supportedLanguages`.
- `sources` referencing the approved methodology and current Screenwriter content.
- `quizAssignments` mapping approved `assessmentPlanKey` values to **explicit default Quiz `selection`** objects with curated Question slugs (empty for a deliberately unquizzed Lesson). This specification must be copied into generated Lesson Quiz Section parameters by the builder; it is not a request to modify `content.yaml`.
- `questions` containing actual source-language Question data with type-specific answers.
- `coverage` documenting why evidence cells are covered; `unresolvedDependencies` listing missing media, factual decisions, accessibility concerns or grading limitations.

**Illustrative fragment (not a substitute for the schema or current Lesson UUIDs):**

```yaml
schemaVersion: 1
kind: lesson-question-bank
status: draft
lessonId: '00000000-0000-0000-0000-000000000000' # placeholder only
documentLanguage: en
supportedLanguages: [en, uk]
sources:
  methodology: { path: ../methodology.md }
  content: { path: ../content.yaml }
quizAssignments:
  - assessmentPlanKey: check-understanding
    selection:
      mode: all
      questionSlugs: [identify-model-error]
      shuffle: false
questions:
  - slug: identify-model-error
    type: selectOneAnswer
    assessmentMethod: errorDiagnosis
    targetSkills: ['00000000-0000-0000-0000-000000000001'] # replace with approved Skill UUID
    assessmentPlanKeys: [check-understanding]
    pool: core
    evidence:
      outcome: Detect an incorrect claim in a studied model
      operation: Diagnose the misconception, not merely name a fact
      distinction: Distinguishes causal misunderstanding from vocabulary recall
      distinctness: Tests error diagnosis rather than another retrieval item
    question:
      - { type: text, text: 'Which statement contains the error?' }
    answer:
      correct:
        - key: faulty
          content: [{ type: text, text: 'Example incorrect claim.' }]
      incorrect:
        - key: sound
          content: [{ type: text, text: 'Example correct claim.' }]
      distractors: []
    explanation:
      - { type: text, text: 'The faulty statement reverses the stated causal relationship.' }
coverage:
  - targetSkill: '00000000-0000-0000-0000-000000000001'
    outcome: Detect an incorrect claim in a studied model
    assessmentMethod: errorDiagnosis
    questionSlugs: [identify-model-error]
unresolvedDependencies: []
```

IDs and educational claims above are illustrative placeholders, **never permissible as real approved Lesson data**.

## Validation and handoff

Validate machine-readable YAML against the schema plus **semantic checks** (a schema alone cannot establish correctness):

1. Every Question type and method exists in current canonical Engine schemas, and required type-specific answer fields are complete.
2. Every `targetSkills` value belongs to the Lesson's approved Skill set. Every `assessmentPlanKey` exists in both sources. All explicitly assigned `selection.questionSlugs` exist, are unique within a Quiz, and reference eligible bank Questions; unassigned Questions are allowed and preserved for additional practice.
3. Every default Quiz has a deliberate, proportionate **subset** with a nonempty explicit `questionSlugs` list, and each required Quiz `targetSkill`/`requiredAssessmentMethods` pair has meaningful coverage **in the actual selected set** (not merely somewhere in the full bank). For `sample` mode, assess every possible sample or document a safe selection strategy; never rely on accidental coverage. `coverage` matches the actual Question assignments.
4. Every item has a distinctness case, correct answer and evidence target. Reject near-duplicates and superficial type-diversity inflation.
5. Any media requirement has an approved real path or an explicit request, with a plan for equivalent accessible evidence; unresolved blockers are not disguised as approved resources.
6. Only one source language is authored. No invented translations, IDs, media or renderer capabilities.
7. The full bank is preserved for Custom Practice regardless of default Quiz subsets, and the builder is required to emit both the full catalog and merged Quiz selections when implemented. The bank matches current approved source revisions. A subsequent material change to methodology or content invalidates affected reviews/coverage until checked.

Create/update the bank only in its Lesson's `questions/` folder. Follow the Lesson Production Issue handoff, Draft PR and source-specific approval policy when operating in a production workflow. The Coding Agent consumes the _approved_ YAML to author typed data and tests; the Translation workflow supplies remaining locales. Do not claim the YAML-to-code generator exists unless it is verified in the repository.
