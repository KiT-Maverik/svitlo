# Create Course Flow

**Role:** the single canonical seven-stage Course production workflow, operated in the **existing Course entity-owned PR**. Before acting read root `AGENTS.md`/`README.md`, [CI/branch rules](../../rules/ci-workflow.md), [GitHub rules](../../rules/github-labels-and-naming.md), [Course entity](../../docs/entities/course.md), [architecture index](../../docs/architecture/README.md), [UUID addressing](../../docs/architecture/entity-uuid-addressing.md), [Methodologist](../../personas/methodist.persona.md), [Assessment Architect](../../personas/learning-assessment-architect.persona.md), and the current Engine contracts, source and tests. Stage 4 must be carried out by an **independent reviewer in a separate chat/context**.

## Authoritative source, contracts and PR state

- There is **one Course UUID**, **one evolving TypeScript Course object** and **one Course PR**. Stages 1–3 progressively type the same source with `CourseWorkflowStage1`, `CourseWorkflowStage2`, and `CourseWorkflowStage3` imported from `@svitlo/engine/build`. The Course PR description, not a production Issue, a status file, chat memory or authored Config, is the seven-stage tracker; recorded SHA and actual source/review evidence determine completion.
- Author the object at the canonical UUID-addressed Course location in `content/<book>/data/courses/<bucket>/<uuid>/` (resolve the exact path from the repository). Preserve immutable identity, collection keys, item order and verified references between stages. Editorial `production` metadata is *not* built Config or runtime Props. No second `toc.yaml`, `config.yaml`, `course.yaml`, separate matching or review PR, separate Course methodology authoring document or generator-artifact ledger.
- **TypeScript checks shape, not truth.** It does not establish that Skill IDs exist, the Git SHA was inspected, a reused Lesson is suitable, a locale is authored, a standard is verified or a plan is pedagogically adequate. Read source and record verifiable evidence; `satisfies` is necessary but insufficient.
- The current [workflow types](../../../shared/engine/types/workflow/courseWorkflow.types.ts), [typecheck examples](../../../shared/engine/types/workflow/courseWorkflow.typecheck.ts), [Course](../../docs/entities/course.md), [Lesson](../../docs/entities/lesson.md) and [Episode](../../docs/entities/episode.md) contracts take precedence over historical YAML examples. If a schema/API has changed in the integration branch, reconcile the real code before proceeding. The detailed methodology standard is here; Engine JSDoc is only a short field-by-field authoring reminder.
- **Migration reality:** Stage 1–3 Engine TS types exist in parent [#775](https://github.com/KiT-Maverik/svitlo/pull/775). The existing `materializeCourseFlow`/`validateCourseFlow` and trusted `/course materialize` Action still operate on legacy YAML as of this migration. **Do not feed typed TS to those CLIs, declare typed Stage 5 operational or remove their protected/authorization pathways until the new materializers are implemented, integrated and verified.** The typed Stage 5 implementation is independently owned in the parent/child workstreams.
- **Authorization:** reviewing/finishing the Course plan does not authorize Stage 5, creating Lesson PRs, authoring standalone Lessons/Questions/Flashcards, translations or publication. New Lesson IDs are allocated at authorized Stage 5 only. Independently produced Lessons stay immutable; Course-local overrides are built at the Course boundary.
- **PR state is distinct from Course stage state.** Create Draft; keep Draft during active authoring or when stage work is unfinished. Convert an already Ready PR to Draft **before active edits**. When *the specifically authorized assigned work* is completed and fit for the owner to inspect, convert to **Ready for review** automatically, then examine current-head target-specific checks. If Ready CI finds an actionable defect, return to Draft while committing fixes and then Ready again. Absent full checks on a Draft are an intentional cost-saving deferral, **never** a blocker or a pass; Ready is **not merge approval**. A partially completed Course workflow need not claim all seven stages done merely because a bounded, authorized PR deliverable is reviewable.

## Starting, resuming and reporting

1. Verify the exact Course PR, labels, head/base branches and immediate parent topology; inspect comments, open changes, relevant child PRs, real source files and immutable head SHA. Reuse the existing Course PR, not a new Production Issue or review PR. Historical Issues/PRs are evidence, not the new tracker.
2. Resolve the Course UUID and current authored TS object. Verify latest completed stage, planned Lesson slots and sources, import SHAs, assessment dependencies, checked approvals and any actual blocking owner decisions. Never infer completion from a checkbox, green Draft check or unverified materializer result.
3. **On a status-only request**, report the next feasible action without changing files. On an explicit `do course stage N for PR #...` or other unambiguous authorization, execute the assigned stage and its in-scope corrections immediately. The coordinating agent is the sole editor of the Course PR tracker; preserve concurrent subtask evidence.
4. After a stage, review or paused unit, report: Course UUID and PR/current SHA; **all seven stage states** (completed / in progress / not started / blocked / stale); last completed stage with evidence; first eligible next Course stage and prerequisites; **one** copyable next-action instruction or a precise decision needed. No invented eighth stage, fabricated Lesson PR or automatic authorization. Record actual results in the Course PR.

## Stages 1–4: same typed object

### 1. Create Course Methodology

**Owner:** Methodologist. **Target:** `CourseWorkflowStage1`; do not add a hierarchy or choose a scenario mode.

Research the target textbook, expected learner population, prior knowledge, prior Skills vs competencies to teach, intended scope and exclusions, learner age/grade and jurisdiction where relevant, discipline-specific causal learning sequence, difficulty, depth, misconceptions, feedback and valid learning evidence. Verify Skill/Group/Domain UUIDs from the actual taxonomy; Domain/Group references express intended breadth, not mastery of every descendant. For standards, establish the jurisdiction, edition/version, reference source and *extent* of alignment. Distinguish intended/partial/verified; no topic similarity implies certification.

Author **all** fields:
- `config.id`, `config.type: 'course'`, `config.slug`, optional current Config metadata (`params` without `languages`/`scenarioMode`; `locale` for authored source-language title/description).
- `production.languages.document` (actual source language) and nonempty `production.languages.planned` (planned language set). **Never** `config.params.languages` at this planning stage; planned locales are not translations.
- `production.methodology.{purpose,audience,approach,depth,accessibility,scope,entryConditions,sourceNotes}`, plus `outcomes.explanation`, `prerequisites.explanation`, `standardsAlignment` and `openDecisions`. Empty standards/decisions lists are explicit decisions, not omitted required fields.

These must contain actual, substantive editorial reasoning proportionate to scope. Audience is more than a grade. Approach describes concepts, practice, feedback and differentiation, not a pedagogical slogan. Depth and scope explain expected performance and excluded content. Entry conditions distinguish prerequisite knowledge and support needs. Accessibility covers equivalent nonvisual, keyboard, screen-reader, localization and offline implications. Source notes identify checkable evidence and uncertainty; the completed plan must be independently reviewable without guessing its meaning. No arbitrary word quota; one-line stubs do not pass methodological review.

Minimal *shape example only* (replace all explanatory strings and identifiers from real evidence):

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

The variables above stand for actual verified authored values, **not** invented identities or copy-ready production content. Complete Stage 1 only after checking compiler shape, source IDs and substantive methodological readiness at a recorded SHA.

### 2. Design Course Structure

**Owner:** Methodologist. **Target:** `CourseWorkflowStage2 extends CourseWorkflowStage1`. Retain *the same* root `config`/`production` object, add required `config.content: { items, order }` (including `order` at **every** nested level).

Allowed structure: **Course → Module / Chapter / Lesson slot / Episode slot; Module → Chapter / Lesson slot / Episode slot; Chapter → Lesson slot / Episode slot**. Never nest Modules or Chapters under Chapters; no obligatory artificial Module wrapper. Each Module and Chapter has `config.type`, `slug`, source-language `locale.title`, ordered `content`, and complete `production.methodology`, `outcomes`, `prerequisites`, `depth` and `sequenceReason`. Explain why each unit exists, what it expects and produces, how cognition progresses, why its position is chosen and where reinforcement/assessment transitions are necessary. Audit gaps, repetition, cycles and cognitive load across the *whole Course*.

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

**New Lesson (`production.kind: 'new'`):** author real partial `Lesson_Config` fields: `config.type: 'lesson'`, Course placement `slug`, verified nonempty `skills`, actual source-language `locale.title`, and suitable optional `params` (age/grade/settings except `languages`). **Do not supply** a Lesson `id`, `section` or `events`. Required `production.objective`, `depth`, `sequenceReason`, `assessmentEvidence` and complete `methodology` explain actual concepts, learning journey, prerequisite/misconception treatment, practice, differentiation, accessibility, evidence and intended Question Bank/Quiz responsibility. For an assessment-only Lesson explain exactly which *upstream Course slots* and independent Question Banks will supply evidence; its own bank may be genuinely N/A if justified, not silently omitted.

**Existing Lesson (`production.kind: 'existing'`):** query by verified Skill IDs using [Lesson query](../../../shared/engine/scripts/queryLessons/README.md), then open the actual canonical Lesson source and methodology; verify full Skill coverage, learner/age/grade, prior knowledge, depth, accessibility, locale availability, intended assessment and current source commit. A query result or Skill overlap alone is not approval. Import the **real existing Lesson** from authored TypeScript. Preserve the Course-local `config.slug` and `skills` with no `config.id`, `params`, `locale`, `section` or `events`. For plain reuse: `production.existing: { id: existingLesson.id }`. For a Course-local adaptation: `production.existing: existingLesson.build.overrides(patch, { languages: ['uk'] })`, keeping the returned **`{ id, base?, locale? }` object** and writing substantive `production.overrideRationale`. Never store a bare ID string, construct a third `existingWithOverrides` kind, duplicate `config.id`, hand-build a raw override in the slot or modify the original Lesson. `production.matching` requires `methodologySourcePath`, *real* `sourceSha`, `matchingRationale` and `languageEvidence`. A Course-local patch is not a mutation of standalone Lesson content/identity/languages/Skills.

```ts
import type { CourseWorkflowStage3, CourseWorkflowStage3LessonSlot } from '@svitlo/engine/build';
import { existingLesson } from '#lessonsData/verified-path';

const reusedSlot = {
  config: { type: 'lesson', slug: 'observationReview', skills: [verifiedSkillUuid] },
  production: {
    kind: 'existing',
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
const courseStage3 = {
  ...courseStage2,
  config: {
    ...courseStage2.config,
    content: { items: { firstObservation: reusedSlot }, order: ['firstObservation'] },
  },
} satisfies CourseWorkflowStage3;
```

The import path and variables are illustrative: resolve them from the real textbook's aliases and source evidence. The replacement Course example intentionally uses a single placement, **not** a license to drop reviewed Stage 2 items. Keep every intended item and order in real work. The two outcomes can be reviewed as `CourseWorkflowStage3NewLesson`/`CourseWorkflowStage3ExistingLesson` types; the single final whole-Course source must satisfy `CourseWorkflowStage3`.

**Course-wide assessment design:** decide meaningful instructional Quiz locations vs a justified ordinary assessment-only Lesson at Chapter/Module/Course boundaries; define target Skills, the learner evidence, feedback and item/bank ownership without prematurely generating Quiz/Question/Flashcard Configs or IDs. A full independent Question Bank normally belongs to each nontrivial teaching Lesson even when its own Quiz is absent. Cross-Lesson Quiz publication requires the upstream reviewed banks in the actual branch ancestry and working global Question resolver; this *publication* dependency does not block Stage 4 methodology review if ownership and planned coverage are already sound.

### 4. Independently review and correct the whole Course

**Reviewer:** Methodologist + Learning Assessment Architect in a **separate agent/chat context** from authorship. This is a corrective, independent *review operation* on the **same Stage 3 TypeScript source**, not `CourseWorkflowStage4`, a new PR or a backwards Stage 3 loop.

1. Pin the exact current Course source Git SHA; read the **whole source**, referenced taxonomy/standards, Module/Chapter progression, new Lesson methodologies, real reused Lesson sources/SHAs, Course-local patches, Quiz/Question Bank ownership, locales, accessibility/offline constraints and unresolved decisions.
2. Investigate learning science, scientific/source correctness, age/depth, Skill gaps and prerequisite loops, misconceptions, explicit learning evidence, suitability of matching and adaptations, honest standards claims and responsibility boundaries. Typechecking and a green Draft check do not establish pedagogical quality.
3. **Immediately edit and commit every in-scope defect in this same Course PR**. This reviewer is the authorized final methodological specialist; even fundamental methodological corrections do **not** automatically reset Stage 3, require a second independent reviewer or move changes into a separate review PR. Escalate only a genuinely unresolved/out-of-scope ownership decision (e.g. changing an independently owned Lesson or Course scope not authorized by its owner).
4. Re-read the resulting **entire corrected Stage 3 TS object**, verify actual source evidence and compiler/consistency as applicable, pin the **final corrected SHA**, and record the initial SHA, findings, exact corrective changes, remaining genuine decisions and one final Stage 4 verdict in the existing Course PR. One Stage 4 completion; do not create a second review record or silently claim that previous SHA evidence examined new content.

Stage 4 approval permits a **recommendation** for independently authorized Stage 5, not materialization, new Lesson Production, translation, publication or merge.

## Stages 5–7 and authorization boundaries

### 5. Materialize Course

**Owner:** Coding Agent; **requires separate authorization** after accepted Stage 4 methodology at the final SHA. The new typed materializer must demonstrably accept the reviewed `CourseWorkflowStage3` object, honor existing Lesson `{id,base?,locale?}` references, allocate genuine missing Course child/new Lesson IDs, create permanent Course/Module/Chapter/Episode authored TS and methodology sources and only minimal independent new-Lesson handoffs; preserve imports/identity, check output fidelity, paths, overwrite safety and trusted source authorization. **Do not** start a Lesson PR, fabricate Questions/media/translations/Scenes, claim publisher readiness or use a YAML-only CLI as a typed materializer.

**Implementation boundary as of #781:** the legacy [YAML Course materializer](../../../shared/engine/scripts/materializeCourseFlow/README.md) and [protected Course Action](../../../scripts/ci/courseMaterialization/README.md) are still a different contract, not proof that the typed path works. Before invoking the new workflow, verify its real entrypoint, tests, trusted PR command, current parent integration state and exact SHA. If replacement is not integrated, report an actual Stage 5 dependency and defer retirement of legacy tooling. A deliberately incomplete created Lesson is a separate production task; it cannot pass the final Ready/publisher gate until authored.

### 6. Translate Course

**Owner:** Technical Translator; authorized locales only, under [Translation Workflow](../translation-workflow/README.md). Translate Course-owned titles/descriptions and actual owned Module/Chapter/Episode text, not independently authored Lesson content. Read the source-language reference and the current Course TS modules; preserve UUIDs, keys, order and variables. Locale planning in `production.languages.planned` is **not** completed translation; TypeScript/Props/publication require genuine complete target coverage. Keep revision/provenance evidence **in the same Course PR**, no translator PR or report files.

### 7. Review Course Translations

**Owner:** independent Technical Translator reviewer in a different context, working in the **same Course PR** under [Review Translation](../translation-workflow/review-translation.skill.md). Review target-language terminology, conceptual meaning, inclusive language, structure, placeholders and actual source revision. Correct in-scope translation defects in the same branch and verify final SHA and locale scope. Missing/failed reference manifests are not approvals. Mark locales completed only with actual revision-specific evidence. Review of a Course locale does not approve standalone Lesson locales.

**After all seven stages:** explicitly report that all seven Course workflow stages are complete and no next Course stage remains. List remaining Lesson/bank, full QA, CI and publication dependencies separately. Workflow completion never authorizes merge.

## Independent Lesson and experience handoffs

After Stage 5, retrieve allocated Lesson UUIDs, slugs, canonical paths and source provenance from the **verified new materializer run and actual committed sources**, not guesses or PR-description scraping. Recommend at most **one** pedagogically appropriate eligible new Lesson for separate authorization: `do lesson <verified-lesson-uuid> related to PR #<course-pr>`. Reconcile exact existing Lesson PR claims and the `svitlo-course-lesson:v1` marker before creating anything. An existing Lesson PR must be resumed, not duplicated. The separate [Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md) owns its ten stages and bank children; Course Stage 5 never begins it.

Optional Course-specific experiences, scenario/Quest narrative or advanced Course-local overrides belong to independently approved Episode/screenwriting or Lesson adaptation work and appropriate review. The Course methodology may specify *why* an Episode is needed, not invent its Scenes or dialogue in Stages 1–4. Course-local Build overrides are sparse and must pass the actual current Engine contract; they never change the reusable Lesson.

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
- Current stage: <1–7>
- Next authorized action: <specific action>

## Workflow
- [ ] 1. Create Course Methodology
- [ ] 2. Design Course Structure
- [ ] 3. Design & Match Lessons
- [ ] 4. Review Course Plan
- [ ] 5. Materialize Course
- [ ] 6. Translate Course
- [ ] 7. Review Course Translations

## Handoffs / blockers
- <stage, source/review SHA, factual evidence, real dependency, owner and exact next action>
- <planned Lesson Course placement; after Stage 5, verified new Lesson UUID/handoff if applicable>
```

The sentinel and seven-stage checklist are the sole canonical tracking format. Do not parse or rewrite reviewer comments as a second production ledger. Do not label unfinished authoring as blocked solely because Draft intentionally skips Ready CI; follow [CI triage](../../rules/ci-workflow.md#agent-ci-failure-triage-low-token-default). A reviewer-approved Stage 4 source may be ready for the **owner's inspection** without granting Stage 5 authorization.

## Final verification

For Stages 1–3 run the relevant real Engine TypeScript check/typecheck fixtures and inspect IDs, imports, collection order, source SHAs and pedagogical quality. At Stage 4 re-verify the final corrected source; at Stage 5 verify the *new typed* CLI/authorization path and tests, not a similarly named legacy YAML path. For Course source publication, complete actual locales/resources, package/build/typecheck/tests, protected Ready CI and authorized review before claiming readiness. Record **exact commands, outcomes, commit SHA and deferred checks**, never write “passed” for unexecuted suites.