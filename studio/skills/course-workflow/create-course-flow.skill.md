# Create Course Flow

**Final technical invocation (Stage 4):** The same reviewed `draft.ts` must import `materializeCourse` from `@svitlo/engine/build` and invoke `materializeCourse(reviewedCourse)` **exactly once** after its final `satisfies CourseWorkflowMaterializerInput` object. Normal imported Lesson Configurators are supplied as `production.source` (and `sourceExportName`); author original JSON-safe `sourcePatch` alongside any approved built override. The final file is executed only in the sandboxed read-only worker by the trusted Stage 5 gate, not parsed as an inert-literal AST by the privileged publisher. Retain exact source/review SHA authorization and never import unmaterialized or modified standalone Lessons. See [Direct source architecture](../../docs/architecture/typed-production-materialization.md).

**Role:** the single canonical eight-stage Course production workflow, operated in the **existing Course entity-owned PR**. Before acting read root `AGENTS.md`/`README.md`, [CI/branch rules](../../rules/ci-workflow.md), [GitHub rules](../../rules/github-labels-and-naming.md), [Course entity](../../docs/entities/course.md), [architecture index](../../docs/architecture/README.md), [UUID addressing](../../docs/architecture/entity-uuid-addressing.md), the current Engine contracts, source and tests. Select Personas by stage: [Methodologist](../../personas/methodist.persona.md) for Stages 1–2; Methodologist and [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) for Stages 3–4 (also load the Assessment Architect earlier if the task genuinely requires assessment expertise); [Coding Agent](../../personas/coding-agent.persona.md) for Stage 5; [Technical Translator](../../personas/technical-translator.persona.md) for Stages 6–7. Stage 4 follows the [independent review rule](../../rules/independent-review.md). Stage 8 is owned exclusively by a human; no agent Persona can approve it.

## Authoritative source, contracts and PR state

- There is **one Course UUID**, **one evolving TypeScript Course object** and **one Course PR**. Stages 1–3 progressively type the same source with `CourseWorkflowStage1`, `CourseWorkflowStage2`, and `CourseWorkflowStage3` imported from `@svitlo/engine/build`. The final independently corrected Stage 3 object must use `satisfies CourseWorkflowMaterializerInput` **during Stage 4, before final reinspection and sign-off**; that type is a canonical alias to Stage 3, **not** a second schema or an additional authoring stage. The Course PR description, not a production Issue, a status file, chat memory or authored Config, is the eight-stage tracker; recorded SHA and actual source/review evidence determine completion.
- Author the object at the canonical UUID-addressed Course location in `content/<book>/data/courses/<bucket>/<uuid>/draft.ts` (resolve the exact path from the repository). Preserve immutable identity, collection keys, item order and verified references between stages. Editorial `production` metadata is _not_ built Config or runtime Props. No second `toc.yaml`, `config.yaml`, `course.yaml`, separate matching or review PR, separate Course methodology authoring document or generator-artifact ledger.
- **TypeScript checks shape, not truth.** It does not establish that Skill IDs exist, the Git SHA was inspected, a reused Lesson is suitable, a locale is authored, a standard is verified or a plan is pedagogically adequate. Read source and record verifiable evidence; `satisfies` is necessary but insufficient.
- The current [workflow types](../../../shared/engine/types/workflow/courseWorkflow.types.ts), [typecheck examples](../../../shared/engine/types/workflow/courseWorkflow.typecheck.ts), [Course](../../docs/entities/course.md), [Lesson](../../docs/entities/lesson.md) and [Episode](../../docs/entities/episode.md) contracts take precedence over historical YAML examples. If a schema/API has changed in the integration branch, reconcile the real code before proceeding. The detailed methodology standard is here; Engine JSDoc is only a short field-by-field authoring reminder.
- **Trusted materialization:** follow the [Course Stage 5 runbook](../../../scripts/ci/courseMaterialization/README.md). Verify the workflow exists on default `develop`, the exact current HEAD and source blob SHA and actor write authorization. Stage 4 review is editorial evidence, not a technical eligibility input; trusted read-only analysis precedes atomic, SHA-guarded publication of authored source.
- **Authorization:** reviewing/finishing the Course plan does not authorize Stage 5, creating Lesson PRs, authoring standalone Lessons/Questions/Flashcards, translations or publication. New Lesson IDs are allocated at authorized Stage 5 only. Independently produced Lessons stay immutable; Course-local overrides are built at the Course boundary.
- **PR state is distinct from Course stage state.** Create Draft; keep Draft during active authoring or when stage work is unfinished. Convert an already Ready PR to Draft **before active edits**. When _the specifically authorized assigned work_ is completed and fit for the owner to inspect, convert to **Ready for review** automatically, then examine current-head target-specific checks. If Ready CI finds an actionable defect, return to Draft while committing fixes and then Ready again. Absent full checks on a Draft are an intentional cost-saving deferral, **never** a blocker or a pass; Ready is **not merge approval**. A partially completed Course workflow need not claim all eight stages done merely because a bounded, authorized PR deliverable is reviewable.

## Starting, resuming and reporting

1. Verify the exact Course PR, labels, head/base branches and immediate parent topology; inspect comments, open changes, relevant child PRs, real source files and immutable head SHA. Reuse the existing Course PR, not a new Production Issue or review PR. Historical Issues/PRs are evidence, not the new tracker.
2. Resolve the Course UUID and current authored TS object. Verify latest completed stage, planned Lesson slots and sources, import SHAs, assessment dependencies, checked approvals and any actual blocking owner decisions. Never infer completion from a checkbox, green Draft check or unverified materializer result.
3. **On a status-only request**, report the next feasible action without changing files. On an explicit `do course stage N for PR #...` or other unambiguous authorization, execute the assigned stage and its in-scope corrections immediately. The coordinating agent is the sole editor of the Course PR tracker; preserve concurrent subtask evidence.
4. After a stage, review or paused unit, report: Course UUID and PR/current SHA; **all eight stage states** (completed / in progress / not started / blocked / stale); last completed stage with evidence; first eligible next Course stage and prerequisites; **one** copyable next-action instruction or a precise decision needed. No fabricated Lesson PR, automatic authorization or AI-generated human QA approval. Record actual results in the Course PR.

## Stages 1–4: same typed object

### 1. Create Course Methodology

**Owner:** Methodologist. **Target:** `CourseWorkflowStage1`; do not add a hierarchy or choose a scenario mode.

Research the target textbook, expected learner population, prior knowledge, prior Skills vs competencies to teach, intended scope and exclusions, learner age/grade and jurisdiction where relevant, discipline-specific causal learning sequence, difficulty, depth, misconceptions, feedback and valid learning evidence. Verify Skill/Group/Domain UUIDs from the actual taxonomy; Domain/Group references express intended breadth, not mastery of every descendant. For standards, establish the jurisdiction, edition/version, reference source and _extent_ of alignment. Distinguish intended/partial/verified; no topic similarity implies certification.

Author **all** fields:

- `config.id`, `config.type: 'course'`, `config.slug`, optional current Config metadata (`params` without `languages`/`scenarioMode`; `locale` for authored source-language title/description).
- `production.languages.document` (actual source language) and nonempty `production.languages.planned` (planned language set). **Never** `config.params.languages` at this planning stage; planned locales are not translations.
- `production.methodology.{purpose,audience,approach,depth,accessibility,scope,entryConditions,sourceNotes}`, plus `outcomes.explanation`, `prerequisites.explanation`, `standardsAlignment` and `openDecisions`. Empty standards/decisions lists are explicit decisions, not omitted required fields.

These must contain actual, substantive editorial reasoning proportionate to scope. Audience is more than a grade. Approach describes concepts, practice, feedback and differentiation, not a pedagogical slogan. Depth and scope explain expected performance and excluded content. Entry conditions distinguish prerequisite knowledge and support needs. Accessibility covers equivalent nonvisual, keyboard, screen-reader, localization and offline implications. Source notes identify checkable evidence and uncertainty; the completed plan must be independently reviewable without guessing its meaning. No arbitrary word quota; one-line stubs do not pass methodological review.

Minimal _shape example only_ (replace all explanatory strings and identifiers from real evidence):

```ts
import type { CourseWorkflowStage1 } from '@svitlo/engine/build';

const courseStage1 = {
  config: {
    id: verifiedCourseUuid,
    type: 'course',
    slug: 'skyObservation',
    params: { outcomes: { skills: [verifiedSkillUuid] }, prerequisites: { skills: [] } },
    locale: { title: 'Sky observation', description: 'Observe and explain sky patterns' },
  },
  production: {
    languages: { document: 'uk', planned: ['uk', 'en'] },
    methodology: {
      purpose: substantivePurpose,
      audience: substantiveLearnerProfile,
      approach: substantiveTeachingAndFeedbackPlan,
      depth: substantiveExpectedDepth,
      accessibility: substantiveAccessibilityAndOfflinePlan,
      scope: substantiveScopeAndExclusions,
      entryConditions: substantivePrerequisiteEvidence,
      sourceNotes: verifiedSourceReferencesAndUncertainties,
    },
    outcomes: { explanation: substantiveOutcomesAndEvidence },
    prerequisites: { explanation: substantiveEntryRequirements },
    standardsAlignment: [],
    openDecisions: {},
  },
} satisfies CourseWorkflowStage1;
```

The variables above stand for actual verified authored values, **not** invented identities or copy-ready production content. Complete Stage 1 only after checking the declared Stage 1 type contract, source IDs and substantive methodological readiness at a recorded SHA.

### 2. Design Course Structure

**Owner:** Methodologist. **Target:** `CourseWorkflowStage2 extends CourseWorkflowStage1`. Retain _the same_ root `config`/`production` object, add required `config.content: { items, order }` (including `order` at **every** nested level).

Allowed structure: **Course → Module / Chapter / Lesson slot / Episode slot; Module → Chapter / Lesson slot / Episode slot; Chapter → Lesson slot / Episode slot**. Never nest Modules or Chapters under Chapters; no obligatory artificial Module wrapper. Each Module and Chapter has `config.type`, `slug`, source-language `locale.title`, ordered `content`, and complete `production.methodology`, `outcomes`, `prerequisites`, `depth` and `sequenceReason`. Explain why each unit exists, what it expects and produces, how cognition progresses, why its position is chosen and where reinforcement/assessment transitions are necessary. Audit gaps, repetition, cycles and cognitive load across the _whole Course_.

A provisional Lesson slot has **only** `config: { type: 'lesson', skills: [realVerifiedSkillId, ...] }`. A provisional Episode has **only** `config: { type: 'episode' }` and `production: { focus, purpose }`, explaining the educational situation and reason for its placement. At Stage 2 **do not** invent Lesson UUID/title/slug/objective/methodology, choose matched Lessons, write Episode plots/Scenes/Sections, create Questions or author translations.

```ts
import type { CourseWorkflowStage2, CourseWorkflowStage2LessonSlot } from '@svitlo/engine/build';

const observationSlot = {
  config: { type: 'lesson', skills: [verifiedSkillUuid] },
} satisfies CourseWorkflowStage2LessonSlot;

const courseStage2 = {
  ...courseStage1,
  config: {
    ...courseStage1.config,
    content: {
      items: {
        firstObservation: observationSlot,
        transition: {
          config: { type: 'episode' },
          production: {
            focus: 'Apply the observation question in a new situation',
            purpose: 'Connect observations to the next learning objective',
          },
        },
      },
      order: ['firstObservation', 'transition'],
    },
  },
} satisfies CourseWorkflowStage2;
```

Use stable collection keys; replace any historical `TMP_*` names by Stage 3. Type-checking cannot establish that all items are ordered exactly once, that Skill IDs exist or that sequencing is pedagogically justified; inspect these in the source. Stage 2 completion means the **entire** macrostructure and provisional Skill coverage are supported by evidence, not just a syntactically valid tree.

### 3. Design & Match Lessons

**Owners:** Methodologist and Assessment Architect. **Target:** `CourseWorkflowStage3 extends CourseWorkflowStage2` on the same nested Course tree. Resolve **every** Lesson slot into exactly **two** semantic outcomes; keep Module/Chapter methodology and Episode focus/purpose unchanged unless correcting their actual educational rationale. No `TMP_*` markers, invented Lesson UUIDs, Question IDs or separate Lesson PRs.

**Four explicit assessment decisions for _every_ Lesson placement:** `production.assessment` is a required `LessonProductionAssessmentRequirements` decision object. Set **all four booleans**: `questionBankRequired`, `flashcardBankRequired`, `quizSectionRequired`, `flashcardsSectionRequired`. Decide separately whether an independently authored Question Bank or Flashcard Bank is needed and whether an in-Lesson Quiz Section or Flashcards Section is needed. A bank may be required without a Section; an assessment-only Lesson can consume _verified upstream_ banks without owning one. Record the pedagogical rationale, precise upstream owners and target Skills in the available methodology/assessment evidence (new Lesson) or matching/override rationale (existing Lesson), without invented bank IDs or changes to an independently owned Lesson. `config.params.quizRequiredForCompletion` is **separate**: when `true`, a real enabled Quiz Section must exist by completed Lesson build; `disabled: true` cannot satisfy that structural requirement. These are planning decisions, not authority to create Sections or bank PRs during Course Stage 3.

**New Lesson (`production.kind: 'new'`):** use the independent Course-owned `CourseWorkflowStage3NewLesson` proposal. The root Course `production.languages` supplies context at seed emission; do not repeat it in each new slot. Author real partial `Lesson_Config` fields: `config.type: 'lesson'`, Course placement `slug`, verified nonempty `skills`, actual source-language `locale.title`, and suitable optional `params` (age/grade/settings except `languages`). **Do not supply** a Lesson `id`, `section` or `events`. Required `production.objective`, `depth`, `sequenceReason`, `assessmentEvidence` and complete `methodology` explain actual concepts, learning journey, prerequisite/misconception treatment, practice, differentiation, accessibility, evidence and intended Question Bank/Quiz responsibility. For an assessment-only Lesson explain exactly which _upstream Course slots_ and independent Question Banks will supply evidence; its own bank may be genuinely N/A if justified, not silently omitted.

**Existing Lesson (`production.kind: 'existing'`):** query by verified Skill IDs using [Lesson query](../../../shared/engine/scripts/queryLessons/README.md), then open the actual canonical Lesson source and methodology; verify full Skill coverage, learner/age/grade, prior knowledge, depth, accessibility, locale availability, intended assessment and current source commit. A query result or Skill overlap alone is not approval. Import the **real existing Lesson** from authored TypeScript. Preserve the Course-local `config.slug` and `skills` with no `config.id`, `params`, `locale`, `section` or `events`. For plain reuse: `production.existing: { id: existingLesson.id }`. For a Course-local adaptation: `production.existing: existingLesson.build.overrides(patch, { languages: ['uk'] })`, keeping the returned **`{ id, base?, locale? }` object** and writing substantive `production.overrideRationale`. Never store a bare ID string, construct a third `existingWithOverrides` kind, duplicate `config.id`, hand-build a raw override in the slot or modify the original Lesson. `production.matching` requires `methodologySourcePath`, _real_ `sourceSha`, `matchingRationale` and `languageEvidence`. A Course-local patch is not a mutation of standalone Lesson content/identity/languages/Skills.

```ts
import type {
  CourseWorkflowStage3,
  CourseWorkflowStage3LessonSlot,
  LessonProductionAssessmentRequirements,
} from '@svitlo/engine/build';
import { existingLesson } from '#lessonsData/verified-path';

const assessmentPlan = {
  questionBankRequired: true,
  flashcardBankRequired: false,
  quizSectionRequired: true,
  flashcardsSectionRequired: false,
} satisfies LessonProductionAssessmentRequirements;

const reusedSlot = {
  config: { type: 'lesson', slug: 'observationReview', skills: [verifiedSkillUuid] },
  production: {
    kind: 'existing',
    assessment: assessmentPlan,
    existing: { id: existingLesson.id }, // or existingLesson.build.overrides(patch, { languages: ['uk'] })
    matching: {
      methodologySourcePath: verifiedLessonMethodologyPath,
      sourceSha: actualInspectedCommitSha,
      matchingRationale: substantiveMatchWithAudienceDepthAndSkills,
      languageEvidence: actualLocalesAndAnyDependencies,
    },
  },
} satisfies CourseWorkflowStage3LessonSlot;

// Replace *all* provisional Lesson slots, including ones nested in Modules/Chapters.
export const courseStage3 = {
  ...courseStage2,
  config: {
    ...courseStage2.config,
    content: {
      ...courseStage2.config.content,
      items: { ...courseStage2.config.content.items, firstObservation: reusedSlot },
    },
  },
} satisfies CourseWorkflowStage3;
```

This is a conceptual Stage 3 transformation, not an executable trusted-parser input: persist the reviewed object as valid TypeScript and pass normal imported Lesson Configurators and a plain source patch directly to the Engine materializer. The import path and variables are illustrative: resolve them from the real textbook's aliases and source evidence. The replacement Course example preserves the Stage 2 Episode and its order. In real work, replace **every** unresolved Lesson slot throughout nested Modules/Chapters, not only the illustrated root slot. The two outcomes can be reviewed as `CourseWorkflowStage3NewLesson`/`CourseWorkflowStage3ExistingLesson` types; the single final whole-Course source must satisfy `CourseWorkflowStage3`.

**Course-wide assessment design:** recheck every new and existing placement's four independent booleans, their evidence/ownership rationale, intended later Section position, whether Questions/Flashcards banks belong to this Lesson or verified upstream Lessons, and the distinction from `quizRequiredForCompletion`. Stage 4 checks both the decisions and their implications for later independent bank/Section handoffs. Decide meaningful instructional Quiz locations vs a justified ordinary assessment-only Lesson at Chapter/Module/Course boundaries; define target Skills, the learner evidence, feedback and item/bank ownership without prematurely generating Quiz/Question/Flashcard Configs or IDs. A full independent Question Bank normally belongs to each nontrivial teaching Lesson even when its own Quiz is absent. Cross-Lesson Quiz publication requires the upstream reviewed banks in the actual branch ancestry and working global Question resolver; this _publication_ dependency does not block Stage 4 methodology review if ownership and planned coverage are already sound.

### 4. Independently review and correct the whole Course

**Reviewer:** Methodologist + Learning Assessment Architect following the [independent review rule](../../rules/independent-review.md). This is a corrective, independent _review operation_ on the **same Stage 3 TypeScript source**, not `CourseWorkflowStage4`, a new PR or a backwards Stage 3 loop.

1. Pin the exact current Course source Git SHA; read the **whole source**, referenced taxonomy/standards, Module/Chapter progression, new Lesson methodologies, real reused Lesson sources/SHAs, Course-local patches, Quiz/Flashcards Section and Question/Flashcard Bank decisions for **every** placement, `quizRequiredForCompletion` implications, upstream owners, locales, accessibility/offline constraints and unresolved decisions.
2. Investigate learning science, scientific/source correctness, age/depth, Skill gaps and prerequisite loops, misconceptions, explicit learning evidence, suitability of matching and adaptations, honest standards claims and responsibility boundaries. Typechecking and a green Draft check do not establish pedagogical quality.
3. **Immediately edit and commit every in-scope defect in this same Course PR**. This reviewer is the authorized final methodological specialist; even fundamental methodological corrections do **not** automatically reset Stage 3, require a second independent reviewer or move changes into a separate review PR. Escalate only a genuinely unresolved/out-of-scope ownership decision (e.g. changing an independently owned Lesson or Course scope not authorized by its owner).
4. Finalize the existing exported Course declaration as described below and commit it as part of Stage 4. Re-read the resulting **entire corrected materializer input**, verify actual source evidence, typed materializer compatibility and contract consistency, inspect applicable CI for the final revision, pin the **final corrected SHA**, and record the initial SHA, findings, exact corrective changes, remaining genuine decisions and one final Stage 4 verdict in the existing Course PR using the [canonical review evidence format](../../rules/independent-review.md). One Stage 4 completion; do not create a second review record or silently claim that previous SHA evidence examined new content.

#### Final direct materializer invocation (part of Stage 4)

Before final independent review sign-off, keep the original `CourseWorkflowStage3` object, change its final type assertion to `satisfies CourseWorkflowMaterializerInput`, and add exactly **one** source-only materializer call in the same file:

```ts
import { materializeCourse } from '@svitlo/engine/build';
import type { CourseWorkflowMaterializerInput } from '@svitlo/engine/build';

export const reviewedCourse = {
  // The existing, complete reviewed Course hierarchy and methodology.
} satisfies CourseWorkflowMaterializerInput;

materializeCourse(reviewedCourse);
```

The displayed body is schematic: retain the fully authored object, real UUID and all reviewed evidence. Normal imports/spreads and imported `Lesson_Configurator` references may be used as TypeScript, but authored dependencies must be genuine, unchanged and independently source-pinned. For existing Lesson placements, `production.source`, `sourceExportName` and a plain `sourcePatch` (if overridden) must be supplied and checked against the actual Build API. No AST decoder, special importer or second authored source is an acceptance gate. Commit this invocation before the final Stage 4 reinspection/CI/source SHA verdict. Stage 5 must consume the exact reviewed bytes without editing the source.

Stage 4 approval permits a **recommendation** for independently authorized Stage 5, not materialization, new Lesson Production, translation, publication or merge.

## Stages 5–8 and authorization boundaries

### 5. Materialize Course

**Owner:** Coding Agent; **requires separate authorization** after accepted Stage 4 methodology at the final SHA. Consume the exact final Stage 4 reviewed `draft.ts` without editing its declaration or content. The typed materializer must demonstrably accept `CourseWorkflowMaterializerInput`, honor existing Lesson `{id,base?,locale?}` references, allocate genuine missing Course child/new Lesson IDs, create permanent Course/Module/Chapter authored TS and an allocated typed Episode Stage 1 handoff at each reviewed placement, and generate deterministic **derived** human-readable `methodology.md` for each owning Course, Module and Chapter during Course Stage 5. A new Lesson's approved methodology stays in its _single_ `CourseWorkflowLessonSeed` `draft.ts` at Course Stage 5; the **later, separately authorized Lesson materializer** renders that Lesson's own `methodology.md`. Define a stable documented heading order (identity/scope → outcomes/prerequisites → approach/depth/sequencing → evidence and four assessment decisions/owners → accessibility/locales → standards/sources/open decisions), omitting inapplicable headings explicitly rather than dumping JSON; preserve the reviewed substantive rationale faithfully. Every generated TypeScript file must be valid against current contracts; legitimately unfinished production resources use valid typed placeholders and explicit `TODO (BLOCKER)` where applicable, never missing imports or required fields. The TypeScript planning object is the only editable authoring source; Markdown is reproducible output, not a second editorial input. Do not dump serialized JSON as methodology prose. Preserve imports/identity, check output fidelity, paths, overwrite safety and trusted source authorization. Consume the reviewed Course `draft.ts` and create the materialized `index.ts` in one commit; retain exact review commit and blob provenance. Follow [Episode Workflow](../episode-workflow/create-episode-flow.skill.md) for independently authorized Episode production. **Do not** start a Lesson or Episode PR, fabricate Questions/media/translations/Scenes, claim publisher readiness or use a YAML-only CLI as a typed materializer.

**Current implementation boundary:** the only retained Course materialization instructions are the [typed Course Stage 5 runbook](../../../scripts/ci/courseMaterialization/README.md). Before invoking the exact top-level `/course materialize` PR comment, confirm deployment of the trusted workflow on default `develop`, actual source SHA and the permission gate. Verify independent approval as a separate editorial responsibility; the technical gate never parses it. If the trusted workflow is unavailable, report Stage 5 as unavailable. For **each approved new** `production.kind: 'new'` slot, Course Stage 5 must create its deterministic UUID-addressed Lesson directory with **only `draft.ts` satisfying `CourseWorkflowLessonSeed`**, containing the reviewed Lesson identity/methodology/assessment requirements already available from the Course. **Do not create `defineLesson`, Sections, Quiz/Flashcards drafts, `Not implemented` indicators or reserved selection IDs at Course Stage 5; do not start the Lesson PR.** This seed is _not_ a runnable Configurator or publication-ready content. After separately authorized Lesson Production, the Lesson Methodologist completes authorized Stage 1 by replacing the seed in the same `draft.ts` with `satisfies LessonWorkflowStage1`, preserving the UUID and valid substance; the Screenwriter then advances that same source; only the subsequent authorized **full Lesson materialization** creates typed Section files with visible `Not implemented`, reserved Quiz/Flashcards IDs and `TODO (BLOCKER):` where incomplete, including a **real enabled Quiz** when `quizRequiredForCompletion: true`. Preserve publisher blockers until independently reviewed banks and real selections exist. See [Lesson entity](../../docs/entities/lesson.md). Verify the current Course-owned `CourseWorkflowLessonSeed` Engine export and generated handoff against the actual head before claiming the full Stage 5 pipeline operational.

### 6. Translate Course

**Owner:** Technical Translator; authorized locales only, under [Translation Workflow](../translation-workflow/README.md). Translate Course-owned titles/descriptions and actual owned Module/Chapter text, not independently authored Lesson or Episode content. Read the source-language reference and the current Course TS modules; preserve UUIDs, keys, order and variables. Locale planning in `production.languages.planned` is **not** completed translation; TypeScript/Props/publication require genuine complete target coverage. Keep revision/provenance evidence **in the same Course PR**, no translator PR or report files.

### 7. Review Course Translations

**Owner:** independent Technical Translator reviewer in a different context, working in the **same Course PR** under [Review Translation](../translation-workflow/review-translation.skill.md). Review target-language terminology, conceptual meaning, inclusive language, structure, placeholders and actual source revision. Correct in-scope translation defects in the same branch and verify final SHA and locale scope. Missing/failed reference manifests are not approvals. Mark locales completed only with actual revision-specific evidence. Review of a Course locale does not approve standalone Lesson locales.

### 8. QA — Human

**Owner:** Human reviewer. Mandatory final Course stage; not an AI Persona, automated CI gate, or another methodology/translation review.

**Entry:** Stages 1–7 are complete at verified revisions. The integrated Course is available for actual inspection, with all required Lesson and Episode placements, resource/media, bank, localization and applicable review requirements fulfilled. Record outstanding dependencies in the Course PR and keep Stage 8 blocked until resolved. A green CI run or a source scaffold is not a substitute for the integrated experience.

**Human inspection:** At a pinned Course revision/build, inspect actual navigation, ordered Course/Module/Chapter hierarchy, Lesson and Episode placements and transitions, locale switching and accuracy, accessibility, resources, and the overall learner experience. Episode Stage 10 human QA belongs to the independent Episode workflow; Course Stage 8 verifies integration, not duplicate Episode production or independent translation review.

The agent prepares the inspectable revision, environment, dependency inventory and automated evidence, but may not perform or infer human QA approval. The human records an explicit verdict (pass / changes requested / blocked), tested revision, environment and scope, and defects in the existing Course PR. Correct only authorized defects; reverify affected evidence at the corrected revision and obtain the human's explicit final verdict. Preserve unaffected stage evidence without automatically restarting all prior stages. A source change affecting tested behavior makes the affected QA evidence stale.

**Completion:** mark Stage 8 complete only on explicit human pass for the actual integrated revision and scope with no unresolved required dependencies or QA defects. Do not add a CourseWorkflowStage8 type, separate QA PR or Issue. Ready is not QA approval; QA approval is not merge authorization.

After all eight stages, report completion only with the human verdict and revision; list any remaining CI/release authorization separately.

## Independent Lesson and experience handoffs

A new Course-owned Lesson seed is an editorial starting point, not Lesson Flow Stage 1 completion or a newly authorized PR. Subsequently authorized Lesson→Questions and Lesson→Flashcards handoffs should also create a typed **child Stage 1 `draft.ts`** with the actual available bank planning requirements, **not** completed Bank/Question/Flashcard Configs; each child then progresses through its own stage types and review/authorization gate. Questions and Flashcards banks are separate from Quiz/Flashcards Sections; a Quest is an independent instructional Section, **not** automatically a Question Bank, Quiz, or a separate approved Quest Production flow. Verify the real Quest contract before assigning work; the independent bank workflows own their Stage 1 handoffs.

After Stage 5, retrieve allocated Lesson UUIDs, slugs, canonical paths and source provenance from the **verified new materializer run and actual committed sources**, not guesses or PR-description scraping. Recommend at most **one** pedagogically appropriate eligible new Lesson for separate authorization: `do lesson <verified-lesson-uuid> related to PR #<course-pr>`. Reconcile exact existing Lesson PR claims and the `svitlo-course-lesson:v1` marker before creating anything. An existing Lesson PR must be resumed, not duplicated. The separate [Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md) owns its ten stages and bank children; Course Stage 5 never begins it.

Optional Course-specific experiences, scenario/Quest narrative or advanced Course-local overrides belong to independently approved Episode/screenwriting or Lesson adaptation work and appropriate review. The Course methodology may specify _why_ an Episode is needed, not invent its Scenes or dialogue in Stages 1–4. Course-local Build overrides are sparse and must pass the actual current Engine contract; they never change the reusable Lesson.

## Canonical PR tracker

Initialize **once** in the Course entity PR description, then update in place with exact evidence, not optimistic checkmarks:

```md
<!-- svitlo-course-flow:v1 -->

## Course identity

- Course UUID: <verified uuid>
- Textbook: content/<book>
- Single authored TS source: <canonical path and export>
- Document / planned locales: <verified languages>
- Last reconciled head SHA: <sha>
- Current stage: <1–8>
- Next authorized action: <specific action>

## Workflow

- [ ] 1. Create Course Methodology
- [ ] 2. Design Course Structure
- [ ] 3. Design & Match Lessons
- [ ] 4. Review Course Plan
- [ ] 5. Materialize Course
- [ ] 6. Translate Course
- [ ] 7. Review Course Translations
- [ ] 8. QA — Human

## Stage 4 review evidence

- <Stage 4 findings, corrections, reviewed commit/blob and actual verdict; editorial only>

## Human QA evidence

- Reviewer / explicit verdict: <human identity and recorded verdict; pending until provided>
- Tested integrated revision / build / environment: <sha and inspection location>
- Scope / dependency readiness: <placements, locales, resources, accessibility and evidence>
- Defects / authorized fixes / human re-verification: <findings and revision-specific outcome>

## Handoffs / blockers

- <stage, source/review SHA, factual evidence, real dependency, owner and exact next action>
- <planned Lesson Course placement; after Stage 5, verified new Lesson UUID/handoff if applicable>
```

The sentinel and eight-stage checklist are the sole canonical tracking format. Do not parse or rewrite reviewer comments as a second production ledger. Do not label unfinished authoring as blocked solely because Draft intentionally skips Ready CI; follow [CI triage](../../rules/ci-workflow.md#agent-ci-failure-triage-low-token-default). A reviewer-approved Stage 4 source may be ready for the **owner's inspection** without granting Stage 5 authorization.

## Final verification

For Stages 1–4, author valid TypeScript against the actual Stage contracts and inspect IDs, imports, collection order, source SHAs and pedagogical quality. Normal typechecking is owned by CI: follow the [Draft/Ready lifecycle](../../rules/ci-workflow.md), inspect actual current-head checks and correct failures; no additional mandatory per-stage manual typecheck is required. At Stage 5 preserve trusted materializer semantic validation and focused engineering tests. For Course source publication, complete actual locales/resources, package/build/typecheck/tests, protected Ready CI and authorized review before claiming readiness. Stage 8 completion additionally requires the explicit revision-specific human QA evidence defined above. Record **exact commands, outcomes, commit SHA and deferred checks**, never write “passed” for unexecuted suites.
