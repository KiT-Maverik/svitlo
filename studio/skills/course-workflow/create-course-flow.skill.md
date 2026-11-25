# Create Course Flow

**Generated-source blocker semantics:** Follow the [Coding Agent's actionable TODO contract](../../personas/coding-agent.persona.md#actionable-generated-source-blockers): a `TODO (BLOCKER):` must explain the real implementation and removal criterion; keep a reviewed temporary brief in **one** safe multiline comment rather than a detached specification. Preserve all unfinished publication blockers, independent approvals and the entity-owned source of truth. This is guidance for materialized technical scaffolds, not permission to complete a workflow stage.

**Final authoring boundary (Stage 4 → 5):** Keep the independently corrected Course as one inert `draft.ts` default-exported object with `satisfies CourseWorkflowStage3` and type-only imports. The reviewed file must not import or invoke `materializeCourse`, evaluate Lesson Configurators, spread another object, or execute `build.overrides()`. After separate authorization, `/course materialize` asks the trusted Draft Reader to parse (not execute) the pinned source, validate the final Zod schema and pass plain values to the trusted Course materializer. Reuse existing Lessons by immutable `production.existing.id` and a plain optional `sourcePatch` typed through a **type-only** reference to the actual Lesson; the trusted materializer alone runs the real Build override. See [declarative source architecture](../../docs/architecture/typed-production-materialization.md).

**Role:** the single canonical ten-stage Course production workflow, operated in the **existing Course entity-owned PR**. Before acting read root `AGENTS.md`/`README.md`, [CI/branch rules](../../rules/ci-workflow.md), [GitHub rules](../../rules/github-labels-and-naming.md), [Course entity](../../docs/entities/course.md), [architecture index](../../docs/architecture/README.md), [UUID addressing](../../docs/architecture/entity-uuid-addressing.md), the current Engine contracts, source and tests. Select Personas by stage: [Methodologist](../../personas/methodist.persona.md) for Stages 1–2; Methodologist and [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) for Stages 3–4 (also load the Assessment Architect earlier if the task genuinely requires assessment expertise); [Coding Agent](../../personas/coding-agent.persona.md) for Stage 5; [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) for Questions readiness at Stage 6 and conditional Assessment design at Stage 7, with the Methodologist retaining curriculum ownership; [Technical Translator](../../personas/technical-translator.persona.md) for Stages 8–9. Stage 4 follows the [independent review rule](../../rules/independent-review.md). Stage 10 is owned exclusively by a human; no agent Persona can approve it.

## Authoritative source, contracts and PR state

- There is **one Course UUID**, **one evolving TypeScript Course object** and **one Course PR**. Stages 1–3 progressively type the same source with `CourseWorkflowStage1`, `CourseWorkflowStage2`, and `CourseWorkflowStage3` imported from `@svitlo/engine/build`. The final independently corrected Stage 3 object must use `satisfies CourseWorkflowStage3` **during Stage 4, before final reinspection and sign-off**; the Stage 3 contract itself is canonical; there is no additional materializer-input type or authored stage. The Course PR description, not a production Issue, a status file, chat memory or authored Config, is the ten-stage tracker; recorded SHA and actual source/review evidence determine completion.
- Author the object at the canonical UUID-addressed Course location in `content/<book>/data/courses/<bucket>/<uuid>/draft.ts` (resolve the exact path from the repository). Preserve immutable identity, collection keys, item order and verified references between stages. Editorial `production` metadata is _not_ built Config or runtime Props. No second `toc.yaml`, `config.yaml`, `course.yaml`, separate matching or review PR, separate Course methodology authoring document or generator-artifact ledger.
- **TypeScript checks shape, not truth.** It does not establish that Skill IDs exist, the Git SHA was inspected, a reused Lesson is suitable, a locale is authored, a standard is verified or a plan is pedagogically adequate. Read source and record verifiable evidence; `satisfies` is necessary but insufficient.
- The current [workflow types](../../../shared/engine/types/workflow/courseWorkflow.types.ts), [typecheck examples](../../../shared/engine/types/workflow/courseWorkflow.typecheck.ts), [Course](../../docs/entities/course.md), [Lesson](../../docs/entities/lesson.md) and [Episode](../../docs/entities/episode.md) contracts take precedence over historical YAML examples. If a schema/API has changed in the integration branch, reconcile the real code before proceeding. The detailed methodology standard is here; Engine JSDoc is only a short field-by-field authoring reminder.
- **Trusted materialization:** follow the [Course Stage 5 runbook](../../../scripts/ci/courseMaterialization/README.md). Verify the workflow exists on default `develop`, the exact current HEAD and source blob SHA and actor write authorization. Stage 4 review is editorial evidence, not a technical eligibility input; trusted read-only analysis precedes atomic, SHA-guarded publication of authored source.
- **Authorization:** reviewing/finishing the Course plan does not authorize Stage 5, creating Lesson or Assessment PRs, authoring standalone Lessons/Questions/Flashcards, Assessment production, translations or publication. New Lesson IDs are allocated at authorized Stage 5 only. Independently produced Lessons stay immutable; Course-local overrides are built at the Course boundary.
- **PR state is distinct from Course stage state.** Create Draft; keep Draft during active authoring or when stage work is unfinished. Convert an already Ready PR to Draft **before active edits**. When _the specifically authorized assigned work_ is completed and fit for the owner to inspect, convert to **Ready for review** automatically, then examine current-head target-specific checks. If Ready CI finds an actionable defect, return to Draft while committing fixes and then Ready again. Absent full checks on a Draft are an intentional cost-saving deferral, **never** a blocker or a pass; Ready is **not merge approval**. A partially completed Course workflow need not claim all ten stages done merely because a bounded, authorized PR deliverable is reviewable.

## Starting, resuming and reporting

1. Verify the exact Course PR, labels, head/base branches and immediate parent topology; inspect comments, open changes, relevant child PRs, real source files and immutable head SHA. Reuse the existing Course PR, not a new Production Issue or review PR. Historical Issues/PRs are evidence, not the new tracker.
2. Resolve the Course UUID and current authored TS object. Verify latest completed stage, planned Lesson slots and sources, import SHAs, assessment dependencies, checked approvals and any actual blocking owner decisions. Never infer completion from a checkbox, green Draft check or unverified materializer result.
3. **On a status-only request**, report the next feasible action without changing files. On an explicit `do course stage N for PR #...` or other unambiguous authorization, execute the assigned stage and its in-scope corrections immediately. The coordinating agent is the sole editor of the Course PR tracker; preserve concurrent subtask evidence.
4. After a stage, review or paused unit, report: Course UUID and PR/current SHA; **all ten stage states** (completed / in progress / not started / blocked / stale); last completed stage with evidence; first eligible next Course stage and prerequisites; **one** copyable next-action instruction or a precise decision needed. No fabricated Lesson PR, automatic authorization or AI-generated human QA approval. Record actual results in the Course PR.

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

Target approved structure: **Course → Module / Chapter / Lesson slot / Episode slot / Assessment slot; Module → Chapter / Lesson slot / Episode slot / Assessment slot; Chapter → Lesson slot / Episode slot / Assessment slot**. Assessment is Course-owned, not a Lesson or Episode subtype. **Its ordered Stage 2 slot is the decision**: no separate required/not-required flag exists or should be introduced. The Stage 2 Assessment slot's typed Engine contract and materialization remain pending #826 integration with #823. Never nest Modules or Chapters under Chapters; no obligatory artificial Module wrapper. Each Module and Chapter has `config.type`, `slug`, source-language `locale.title`, ordered `content`, and complete `production.methodology`, `outcomes`, `prerequisites`, `depth` and `sequenceReason`. Explain why each unit exists, what it expects and produces, how cognition progresses, why its position is chosen and where reinforcement/assessment transitions are necessary. Audit gaps, repetition, cycles and cognitive load across the _whole Course_.

A provisional Lesson slot has **only** `config: { type: 'lesson', skills: [realVerifiedSkillId, ...] }`. A provisional Episode has **only** `config: { type: 'episode' }` and `production: { focus, purpose }`, explaining the educational situation and reason for its placement. **At Stage 2 the Methodologist decides whether and where Assessments are pedagogically necessary by adding zero or more `type: 'assessment'` slots directly to the appropriate Course, Module or Chapter `config.content.items` and listing each in that exact owner's `content.order`.** A Course-level final Assessment is a direct Course child; a Module or Chapter Assessment stays directly inside that owner. The absence of Assessment slots **anywhere in the completed ordered tree** means that no Course-owned Assessments were planned. Do **not** author an Assessment-required boolean at Course, Module or Chapter level; this would duplicate the structure. For each chosen slot document its purpose/target evidence, provisional upstream and additional Lesson dependencies and rationale within the existing Course methodology/slot planning, not a second owner-level flag. The eventual Engine Stage 2 Assessment slot TypeScript schema must support these actual slots; the current source contract does not yet, pending #823/#826 integration. **Do not** invent Lesson UUID/title/slug/objective/methodology, choose matched Lessons, write Assessment Quiz/Question IDs or content, write Episode plots/Scenes/Sections, create Questions or author translations.

**Placement examples (Stage 2 design, independent of eventual UUID allocation):** a final Course-wide review belongs to `course.config.content.items.finalAssessment` and the root `content.order`; a Module assessment belongs to that Module's own `config.content.items.moduleReview` and `content.order`; a Chapter assessment belongs to that Chapter's own `config.content.items.chapterReview` and `content.order`. These are `type: 'assessment'` slots, **not** Lessons, flags on the parent or a standalone global Assessment list. Preserve the direct owner, stable collection key, scope rationale and exact relative order against adjacent Lessons/Episodes. **The TypeScript example below currently demonstrates already-implemented Lesson/Episode slots only**; do not invent an unimplemented Assessment slot object shape or pretend it compiles until the Engine Stage 2 contract is extended in #826.

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

**Existing Lesson (`production.kind: 'existing'`):** query by verified Skill IDs using [Lesson query](../../../shared/engine/scripts/queryLessons/README.md), then inspect the actual standalone Lesson and methodology at a pinned SHA; verify coverage, age/depth, accessibility, locale and assessment suitability. The Course draft records the independently reviewed Lesson UUID as `production.existing: { id: '<verified UUID>' }`, the factual `production.matching` evidence and, when needed, one **plain sparse `production.sourcePatch`** plus substantive `overrideRationale`. Use `import type { existingLesson } from '<verified Lesson export path>'` and type-check the nested patch expression with `satisfies Parameters<typeof existingLesson.build.overrides>[0]` (subject to Agent B's tested generic inference); never use a value import, `existingLesson.id` expression, direct `build.overrides()` call, built `base/locale` duplication, invented ID or mutations of standalone Lesson source. The trusted dependency resolver must establish executable-source trust independently of the authored draft. Placement-local overrides preserve the original Lesson identity and can differ between placements.

**Authoring shape, not a copy-ready full Course:** the complete final `draft.ts` uses exactly one `export default { config: ..., production: ... } satisfies CourseWorkflowStage3;` declaration. All actual fields, nested `items`/ `order` maps, UUIDs, localized strings and matching evidence are **literal values**, not imported values or references to Stage 2 variables. Inside an existing Lesson slot, `production.existing` holds `{ id: '<verified UUID>' }`; for a changed placement, `production.sourcePatch` is the raw sparse object expression checked with `satisfies Parameters<typeof importedLesson.build.overrides>[0]` via `import type`. Do not introduce a top-level helper `assessmentPlan`, `reusedSlot`, spreads, extra exports or computed expressions. A full executable/typechecked nested override example is **pending Agent B's deep generic typing tests**; do not invent Section/Carousel/Checkpoint `additionalItems` or `order` support before the test demonstrates it. Refer to the canonical Engine Stage 3 schema for all required keys.

The two outcomes remain `CourseWorkflowStage3NewLesson` and `CourseWorkflowStage3ExistingLesson`. The complete authored source must satisfy `CourseWorkflowStage3`, retain the Stage 2 Episode/Assessment positions and order, and resolve all nested Lesson slots throughout Modules and Chapters. Typechecking does not verify matching evidence or the reader's syntax allowlist.

**Course-wide assessment design:** recheck every new and existing placement's four independent booleans, their evidence/ownership rationale, intended later Section position, whether Questions/Flashcards banks belong to this Lesson or verified upstream Lessons, and the distinction from `quizRequiredForCompletion`. Stage 4 checks both the decisions and their implications for later independent bank/Section handoffs. Decide meaningful instructional Quiz locations vs a justified ordinary assessment-only Lesson at Chapter/Module/Course boundaries; define target Skills, the learner evidence, feedback and item/bank ownership without prematurely generating Quiz/Question/Flashcard Configs or IDs. A full independent Question Bank normally belongs to each nontrivial teaching Lesson even when its own Quiz is absent. Cross-Lesson Quiz publication requires the upstream reviewed banks in the actual branch ancestry and working global Question resolver; this _publication_ dependency does not block Stage 4 methodology review if ownership and planned coverage are already sound.

**Assessment placement in the reviewed Stage 3 tree:** preserve every directly owned `type: 'assessment'` slot and the exact Course/Module/Chapter order selected by the Stage 2 Methodologist. Stage 3 resolves real upstream Lesson placements and any additional Lessons without authoring Questions or a separate owner-level required/not-required flag. Reject missing, forward, duplicate or ambiguous dependencies in Course materialization; cross-Lesson assessments are distinct Assessment entities, not newly invented assessment-only Lessons. Stage 6 later verifies the real independently reviewed Question Banks. See [Assessment](../../docs/entities/assessment.md).

### 4. Independently review and correct the whole Course

**Reviewer:** Methodologist + Learning Assessment Architect following the [independent review rule](../../rules/independent-review.md). This is a corrective, independent _review operation_ on the **same Stage 3 TypeScript source**, not `CourseWorkflowStage4`, a new PR or a backwards Stage 3 loop.

1. Pin the exact current Course source Git SHA; read the **whole source**, referenced taxonomy/standards, Module/Chapter progression, new Lesson methodologies, real reused Lesson sources/SHAs, Course-local patches, Quiz/Flashcards Section and Question/Flashcard Bank decisions for **every** placement, `quizRequiredForCompletion` implications, upstream owners, locales, accessibility/offline constraints and unresolved decisions.
2. Investigate learning science, scientific/source correctness, age/depth, Skill gaps and prerequisite loops, misconceptions, explicit learning evidence, suitability of matching and adaptations, honest standards claims and responsibility boundaries. Typechecking and a green Draft check do not establish pedagogical quality.
3. **Immediately edit and commit every in-scope defect in this same Course PR**. This reviewer is the authorized final methodological specialist; even fundamental methodological corrections do **not** automatically reset Stage 3, require a second independent reviewer or move changes into a separate review PR. Escalate only a genuinely unresolved/out-of-scope ownership decision (e.g. changing an independently owned Lesson or Course scope not authorized by its owner).
4. Finalize the existing exported Course declaration as described below and commit it as part of Stage 4. Re-read the resulting **entire corrected materializer input**, verify actual source evidence, typed materializer compatibility and contract consistency, inspect applicable CI for the final revision, pin the **final corrected SHA**, and record the initial SHA, findings, exact corrective changes, remaining genuine decisions and one final Stage 4 verdict in the existing Course PR using the [canonical review evidence format](../../rules/independent-review.md). One Stage 4 completion; do not create a second review record or silently claim that previous SHA evidence examined new content.

#### Final reviewed declarative source (part of Stage 4)

Before independent sign-off, finalize the same complete `CourseWorkflowStage3` literal under **one** default export. Only **type-only** imports are permitted; no authored functions, method calls, spreads, extra executable exports or runtime Lesson dependencies. This outline identifies the form, **not** a typechecked complete Course instance:

```ts
import type { CourseWorkflowStage3 } from '@svitlo/engine/build';

export default {
  // Complete, reviewed, literal config and production trees go here.
} satisfies CourseWorkflowStage3;
```

For a placement-local override, add a type-only import for the **actual Lesson export** and apply `satisfies Parameters<typeof importedLesson.build.overrides>[0]` to the raw `sourcePatch` literal. Do **not** invoke `build.overrides()`, import the live Lesson, include `production.source`, or prebuild `production.existing.base/locale`. Verify the exact reader syntax and schema against Agents A/B, then reread the **whole** corrected source and record final Git/source-blob SHAs and independent evidence. The user invokes the same `/course materialize` trusted PR command separately at Stage 5.

Stage 4 approval permits a **recommendation** for independently authorized Stage 5, not materialization, new Lesson Production, translation, publication or merge.

## Stages 5–10 and authorization boundaries

### 5. Materialize Course

**Owner:** Coding Agent; **requires separate authorization** after accepted Stage 4 methodology at the final SHA. Consume the exact final Stage 4 reviewed `draft.ts` without editing its declaration or content. The typed materializer must demonstrably accept `CourseWorkflowStage3`, honor plain existing Lesson `{ id }` references and trusted, placement-local sparse patches, allocate genuine missing Course child/new Lesson IDs, create permanent Course/Module/Chapter authored TS and an allocated typed Episode Stage 1 handoff at each reviewed placement, and generate deterministic **derived** human-readable `methodology.md` for each owning Course, Module and Chapter during Course Stage 5. A new Lesson's approved methodology stays in its _single_ `CourseWorkflowLessonSeed` `draft.ts` at Course Stage 5; the **later, separately authorized Lesson materializer** renders that Lesson's own `methodology.md`. Define a stable documented heading order (identity/scope → outcomes/prerequisites → approach/depth/sequencing → evidence and four assessment decisions/owners → accessibility/locales → standards/sources/open decisions), omitting inapplicable headings explicitly rather than dumping JSON; preserve the reviewed substantive rationale faithfully. Every generated TypeScript file must be valid against current contracts; legitimately unfinished production resources use valid typed placeholders and explicit `TODO (BLOCKER)` where applicable, never missing imports or required fields. The TypeScript planning object is the only editable authoring source; Markdown is reproducible output, not a second editorial input. Do not dump serialized JSON as methodology prose. Preserve imports/identity, check output fidelity, paths, overwrite safety and trusted source authorization. Consume the reviewed Course `draft.ts` and create the materialized `index.ts` in one commit; retain exact review commit and blob provenance. Follow [Episode Workflow](../episode-workflow/create-episode-flow.skill.md) for independently authorized Episode production. **Do not** start a Lesson or Episode PR, fabricate Questions/media/translations/Scenes, claim publisher readiness or use a YAML-only CLI as a typed materializer.

**Current implementation boundary:** the only retained Course materialization instructions are the [typed Course Stage 5 runbook](../../../scripts/ci/courseMaterialization/README.md). Before invoking the exact top-level `/course materialize` PR comment, confirm deployment of the trusted workflow on default `develop`, actual source SHA and the permission gate. Verify independent approval as a separate editorial responsibility; the technical gate never parses it. If the trusted workflow is unavailable, report Stage 5 as unavailable. For **each approved new** `production.kind: 'new'` slot, Course Stage 5 must create its deterministic UUID-addressed Lesson directory with **only `draft.ts` satisfying `CourseWorkflowLessonSeed`**, containing the reviewed Lesson identity/methodology/assessment requirements already available from the Course. **Do not create `defineLesson`, Sections, Quiz/Flashcards drafts, `Not implemented` indicators or reserved selection IDs at Course Stage 5; do not start the Lesson PR.** This seed is _not_ a runnable Configurator or publication-ready content. After separately authorized Lesson Production, the Lesson Methodologist completes authorized Stage 1 by replacing the seed in the same `draft.ts` with `satisfies LessonWorkflowStage1`, preserving the UUID and valid substance; the Screenwriter then advances that same source; only the subsequent authorized **full Lesson materialization** creates typed Section files with visible `Not implemented`, reserved Quiz/Flashcards IDs and `TODO (BLOCKER):` where incomplete, including a **real enabled Quiz** when `quizRequiredForCompletion: true`. Preserve publisher blockers until independently reviewed banks and real selections exist. See [Lesson entity](../../docs/entities/lesson.md). Verify the current Course-owned `CourseWorkflowLessonSeed` Engine export and generated handoff against the actual head before claiming the full Stage 5 pipeline operational.

**Course-owned Assessment Stage 5 handoff (PR #826):** for each approved Stage 2 Assessment slot at Course, Module or Chapter level, allocate a deterministic UUID, keep an inline `Not implemented`/ `TODO (BLOCKER)` placeholder at that parent's original ordered position, and generate a typed `AssessmentWorkflowSeed` at the exact nested `content/<assessmentSlug>/draft.ts` path with real upstream/additional Lesson placement dependencies, source SHA, order and language intent. Return an ordered `inventory.assessments` alongside Lessons and Episodes. The existing PR-description updater adds a managed Assessments table **without altering the human-owned ten-stage checklist**. Do not create fake Question IDs, a complete Quiz, an Assessment PR or translation automatically. The separate [Assessment Flow](../assessment-workflow/create-assessment-flow.skill.md) owns the later, independently authorized production and human QA. Integration is implemented on this Draft branch but must pass actual Ready checks before claiming verified functionality.

### 6. Verify Questions Readiness

**Owner:** Learning Assessment Architect, coordinating with the Course Methodologist and independently owned Lesson/Questions PRs. This is a **Course-level dependency and handoff checkpoint**, not a second Question Bank authoring workflow. The Lesson's separately authorized [Questions Flow](../lesson-workflow/create-questions-flow.skill.md) owns Question generation, review, materialization and translation; Course Stage 6 must never invent Questions, duplicate bank IDs, create a bank PR without authorization or move Questions into Course/Assessment Props.

**Entry:** Course Stage 5 is actually materialized and its ordered Lesson/Assessment placement inventory is known. For each required bank, use the real Lesson or additional-Lesson owner, verified UUIDs, exact source revision, Question Bank publication/review readiness, available language support and actual Question IDs. Distinguish **bank required by a Lesson**, **bank needed by a Course Assessment**, and **in-Lesson Quiz Section required**; these are not interchangeable. Track separate Flashcard Bank and Section dependencies for eventual Course QA, but do not silently turn them into Questions or create another Course stage.

**Completion:** record the verified Question dependencies by Lesson placement and Assessment target, owner PR/commit, readiness and blockers in the Course PR. Required Question selections for an applicable Assessment must be real, reviewed and ready before Assessment content is authored at Stage 7. If a required bank is missing, keep Stage 6 blocked with the exact upstream owner and next action, not a fictitious generated bank. If the Course genuinely requires no Question Banks, record the explicit zero-dependency decision and complete this coordination stage without starting any bank flow. Completion does **not** certify the separate Lesson/Question Bank PRs or authorize them.

### 7. Design Assessments — conditional

**Owner:** Learning Assessment Architect, with the Methodologist responsible for approved purpose, scope, evidence and placement. Follow [Assessment entity](../../docs/entities/assessment.md) and the separately owned [Assessment Flow](../assessment-workflow/create-assessment-flow.skill.md).

**Applicability:** inspect the **entire approved Stage 2/3 ordered Course tree**, including direct Course children and every Module/Chapter `content.items` and `content.order`, and reconcile it to the actual Stage 5 placement inventory when available. **If at least one `type: 'assessment'` slot exists at any nesting level, Stage 7 applies** and coordinates those exact placements. No separate Course/Module/Chapter Assessment-required decision is stored. Preserve each slot's direct parent and reviewed order; verify upstream/additional Lessons and actual Question readiness. A malformed/missing Stage 2 tree, a missing expected generated placement or unresolved slot is a validation blocker, not evidence that Assessment is unnecessary. The typed Stage 2 slot and Stage 5 inventory are being implemented in #826 with #823 coordination.

**Skip when none:** if the **complete approved Course Stage 2/3 tree** has **zero `type: 'assessment'` slots**, including all Course/Module/Chapter children, Stage 7 is **Skipped (not applicable)**. In the existing Course PR checklist write `- [x] 7. Design Assessments — Skipped (zero slots; verified at <source SHA>)` and under **Assessment decisions & handoffs** record the reviewed Course source SHA and the zero-slot count (including nested levels). This is an evidence-backed decision taken from the structure, **not** a missing `assessment.required` flag or a fabricated completed Assessment. Existing Courses that have no Assessment slots qualify once their complete hierarchy has been verified; no migration to add booleans is needed. A missing/incomplete tree or stale materialization inventory must be reconciled before skipping. Skipping Stage 7 does not block Stage 8 or create an Assessment PR.

**Execute when applicable:** use the **verified Stage 5 Assessment UUID/slug/ordered placement** at its actual Course/Module/Chapter path. Ensure required upstream Lessons, including additional Lessons, and actual reviewed Question Banks/IDs are ready, with available locales and evidence at exact revisions. A missing dependency blocks Assessment authoring, not the already accepted Course methodology or Course Stage 5. Author the Assessment's educational design, evidence coverage, Question selection, feedback and accessible supporting Content/Quiz Sections **only through its separately authorized Assessment Workflow** in the appropriate child PR; do not copy bank Questions into Assessment, overwrite independent Lessons or treat the Course PR checklist as authorization to begin another PR. A Stage 7 entry must link each approved Assessment design, owner, source SHA, corresponding Assessment PR and real current status. If its design remains pending, keep Stage 7 open or blocked. Completion of **design coordination** is not evidence of finished materialization, translation, resource availability, publication or the Assessment's independent human QA.

**PR description preservation:** keep Stage 7 in the **Course PR's existing `## Workflow` list regardless of applicability**, with a truthful state (unchecked while pending/blocked, checked and explicitly labeled Skipped only after the zero-placement proof, or checked with design review evidence when actually completed). Include its supporting per-placement rows and skip rationale in `## Assessment decisions & handoffs`. Stage 5's separate generated `inventory.assessments` table tracks concrete placements and statuses; the Course PR tracker tracks the **stage**. Future reconciliation of Lessons/Episodes/Assessments tables must preserve the human-owned `## Workflow` list and evidence intact. The inventory/table implementation intersects #823 and remains a separate technical acceptance task in #826, not a reason to invent an additional PR-state parser here.

### 8. Translate Course

**Owner:** Technical Translator; authorized locales only, under [Translation Workflow](../translation-workflow/README.md). Translate Course-owned titles/descriptions and actual owned Module/Chapter text, not independently authored Lesson, Episode or Assessment content. Read the source-language reference and the current Course TS modules; preserve UUIDs, keys, order and variables. Locale planning in `production.languages.planned` is **not** completed translation; TypeScript/Props/publication require genuine complete target coverage. Keep revision/provenance evidence **in the same Course PR**, no translator PR or report files. Stage 7 may be legitimately Skipped and still permit this stage.

### 9. Review Course Translations

**Owner:** independent Technical Translator reviewer in a different context, working in the **same Course PR** under [Review Translation](../translation-workflow/review-translation.skill.md). Review target-language terminology, conceptual meaning, inclusive language, structure, placeholders and actual source revision. Correct in-scope translation defects in the same branch and verify final SHA and locale scope. Missing/failed reference manifests are not approvals. Mark locales completed only with actual revision-specific evidence. Review of a Course locale does not approve standalone Lesson, Episode or Assessment locales.

### 10. QA — Human

**Owner:** Human reviewer. Mandatory final Course stage; not an AI Persona, automated CI gate, or another methodology/translation review.

**Entry:** Stages 1–9 have truthful recorded outcomes at verified revisions (including evidence-backed Stage 7 Skipped when applicable). The integrated Course is available for actual inspection, with all required Lesson, Episode **and Assessment** placements, resources/media, bank selections, localization and applicable separate child reviews/QA fulfilled. Even when Assessment design at Stage 7 was completed, **its separate Assessment Workflow and materialization must actually be finished** before Course QA can pass. Record outstanding dependencies in the Course PR and keep Stage 10 blocked until resolved. A green CI run or source scaffold is not a substitute for the integrated experience.

**Human inspection:** At a pinned Course revision/build, inspect actual navigation, ordered Course/Module/Chapter hierarchy, Lesson/Episode/Assessment placements and transitions, Quiz selection and grading where relevant, locale switching and accuracy, accessibility, resources, and the overall learner experience. Episode and Assessment human QA belong to their **independent entity workflows**; Course Stage 10 verifies integration, not duplicate child production or independent translation review.

The agent prepares the inspectable revision, environment, dependency inventory and automated evidence, but may not perform or infer human QA approval. The human records an explicit verdict (pass / changes requested / blocked), tested revision, environment and scope, and defects in the existing Course PR. Correct only authorized defects; reverify affected evidence at the corrected revision and obtain the human's explicit final verdict. Preserve unaffected stage evidence without automatically restarting all prior stages. A source change affecting tested behavior makes the affected QA evidence stale.

**Completion:** mark Stage 10 complete only on explicit human pass for the actual integrated revision and scope with no unresolved required dependencies or QA defects. Do not add a CourseWorkflowStage10 type, separate QA PR or Issue. Ready is not QA approval; QA approval is not merge authorization.

After all ten stages, report completion only with the human verdict and revision; list any remaining CI/release authorization separately.

## Independent Lesson and experience handoffs

A new Course-owned Lesson seed is an editorial starting point, not Lesson Flow Stage 1 completion or a newly authorized PR. Subsequently authorized Lesson→Questions and Lesson→Flashcards handoffs should also create a typed **child Stage 1 `draft.ts`** with the actual available bank planning requirements, **not** completed Bank/Question/Flashcard Configs; each child then progresses through its own stage types and review/authorization gate. Questions and Flashcards banks are separate from Quiz/Flashcards Sections; a Quest is an independent instructional Section, **not** automatically a Question Bank, Quiz, or a separate approved Quest Production flow. Verify the real Quest contract before assigning work; the independent bank workflows own their Stage 1 handoffs.

After Stage 5, retrieve allocated Lesson UUIDs, slugs, canonical paths and source provenance from the **verified new materializer run and actual committed sources**, not guesses or PR-description scraping. Recommend at most **one** pedagogically appropriate eligible new Lesson for separate authorization: `do lesson <verified-lesson-uuid> related to PR #<course-pr>`. Reconcile exact existing Lesson PR claims and the `svitlo-course-lesson:v1` marker before creating anything. An existing Lesson PR must be resumed, not duplicated. The separate [Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md) owns its ten stages and bank children; Course Stage 5 never begins it. The Course's distinct Stage 6 Questions checkpoint verifies actual bank readiness; its conditional Stage 7 Design Assessments coordinates separately authorized Assessment entities. These Course stages are not replacements for Lesson Questions/Flashcards or Assessment's own eight-stage flow.

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
- Current stage: <1–10>
- Next authorized action: <specific action>

## Workflow

- [ ] 1. Create Course Methodology
- [ ] 2. Design Course Structure
- [ ] 3. Design & Match Lessons
- [ ] 4. Review Course Plan
- [ ] 5. Materialize Course
- [ ] 6. Verify Questions Readiness
- [ ] 7. Design Assessments (conditional)
- [ ] 8. Translate Course
- [ ] 9. Review Course Translations
- [ ] 10. QA — Human

## Stage 4 review evidence

- <Stage 4 findings, corrections, reviewed commit/blob and actual verdict; editorial only>

## Questions readiness (Stage 6)

- Required Question Banks and owners: <each required Lesson placement/Bank ID, source/review SHA and separate bank PR; or explicitly none>
- Questions used by each Assessment: <verified source Question UUIDs/locale coverage and readiness, or pending>
- Gaps / next authorized handoffs: <factual blockers and owners; never invented banks>

## Assessment decisions & handoffs (Stage 7)

- Approved Stage 2 Course hierarchy: <verified source SHA, all Course/Module/Chapter owner paths and ordered Assessment slot keys/placements (if any)>
- Assessment inventory: <every direct/nested Assessment UUID, Course placement path, required upstream/additional Lessons, linked child PR and status; or verified zero Assessment slots across the complete tree>
- Stage 7 state: <pending / blocked / design completed / Skipped (none planned)>
- Skip evidence, if applicable: <verified complete Stage 2/3 tree source SHA, Course/Module/Chapter traversal and zero Assessment slots; no extra flags>
- Approved design evidence: <reviewed Assessment draft/PR SHA per required placement, or N/A>

## Human QA evidence

- Reviewer / explicit verdict: <human identity and recorded verdict; pending until provided>
- Tested integrated revision / build / environment: <sha and inspection location>
- Scope / dependency readiness: <placements, locales, resources, accessibility and evidence>
- Defects / authorized fixes / human re-verification: <findings and revision-specific outcome>

## Handoffs / blockers

- <stage, source/review SHA, factual evidence, real dependency, owner and exact next action>
- <planned Lesson Course placement; after Stage 5, verified new Lesson UUID/handoff if applicable>
```

The existing `svitlo-course-flow:v1` sentinel and ten-stage checklist are the canonical tracking format. The sentinel remains unchanged so existing Course PRs can be updated in place; do not create a parallel tracker or confuse it with the separately managed Lessons/Episodes/Assessments inventory tables. Do not parse or rewrite reviewer comments as a second production ledger. Do not label unfinished authoring as blocked solely because Draft intentionally skips Ready CI; follow [CI triage](../../rules/ci-workflow.md#agent-ci-failure-triage-low-token-default). A reviewer-approved Stage 4 source may be ready for the **owner's inspection** without granting Stage 5 authorization.

## Final verification

For Stages 1–4, author valid TypeScript against the actual Stage contracts and inspect IDs, imports, collection order, source SHAs and pedagogical quality. Normal typechecking is owned by CI: follow the [Draft/Ready lifecycle](../../rules/ci-workflow.md), inspect actual current-head checks and correct failures; no additional mandatory per-stage manual typecheck is required. At Stage 5 preserve trusted materializer semantic validation and focused engineering tests. For Course source publication, complete actual locales/resources, package/build/typecheck/tests, protected Ready CI and authorized review before claiming readiness. Stage 10 completion additionally requires the explicit revision-specific human QA evidence defined above. Record **exact commands, outcomes, commit SHA and deferred checks**, never write “passed” for unexecuted suites.
