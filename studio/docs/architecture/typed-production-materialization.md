# Declarative typed source materialization

**Status:** target architecture in integration PR #857 (Agents A #858, B #859, C #860, D #861). The checked-out `develop` runner may still implement executable `draft.ts` and Jiti/Docker isolation. The descriptions below define the target; do not assume the new command path is deployed or verified until its exact default-branch implementation and authorized current-head run prove it. This migration does not certify an educational entity for publication.

## Canonical authored source

Course, Lesson, Episode, Question Bank, Flashcard Bank and Assessment each have **one** Git-owned `draft.ts`, progressively completed and independently reviewed under that entity's existing PR workflow. At every stage it contains one inert, typed, default-exported **configuration object** checked with the **exact current Stage `satisfies` contract**. `import type` and type-level references may support authoring; authored execution, arbitrary module dependencies, value imports, multiple runtime exports and a second YAML/JSON authoring representation are prohibited.

```ts
import type { LessonWorkflowStage2 } from '@svitlo/engine/build';

export default {
  // Insert the complete, literal Lesson config and production fields here.
} satisfies LessonWorkflowStage2;
```

The outline above is intentionally **not** a typechecked Lesson fixture: all required fields must be filled from actual reviewed source and current Engine schemas. Intermediate Stage objects are valid only against their own earlier contracts, not final materialization Zod schemas. Generated `index.ts` Configurator modules **do** use normal Build imports and executable `define*`/`build.overrides()` calls; only the author-edited `draft.ts` is inert. Keep typechecking, static-reader acceptance and Zod acceptance as separate checks.

### Strict static reader boundary

The shared trusted Draft Reader uses the TypeScript compiler API **only to parse**, never transpile, Jiti-import, evaluate, `require`, `eval`, run in `vm`, or load the author's module. Its explicit positive allowlist permits a single reviewed default-exported object (or one approved immutable root const referenced by that export), safe property names, literal strings/numbers/booleans/null, nested objects, arrays, comments, non-interpolated template strings for multiline educational copy, and strictly type-only imports/queries and supported `satisfies`/type assertions. Literal minus on finite numbers is permitted only if deliberately implemented and tested.

Fail closed on unrecognized syntax, arbitrary identifiers, calls/constructors, value imports, spreads, property access and computed keys, getters, methods, functions, interpolated templates, duplicate/prototype-sensitive keys, extra statements/exports, dynamic imports, JSX, unbounded depth/size or candidate-driven file reads. One Stage `satisfies` and `tsc` **do not** establish safety: the reader independently checks the AST and then the canonical final-stage Zod schema. Source text is read from the immutable pinned Git blob; the reader does not query editorial review, PR readiness, media, Lesson dependency health or other external state. Agent A owns the exact reader API and negative-test table; align examples with actual accepted syntax before declaring them executable fixtures.

## Reviewed workflow locale boundary

An author-edited, learner-facing scalar in the reviewed Course Stage 3 `config.locale` is **document-language text**, not the Configurator's intentionally invariant `localizationSwitch` scalar. Trusted Course/Module/Chapter source rendering normalizes Course `title`, `description`, `prerequisitesText`, `outcomesText` and Module/Chapter `title` to `{ [production.languages.document]: value }`. The new Lesson and Assessment seeds preserve that source-language identity; their later independently owned source materializers normalize their own learner-facing `title`. Episode's separately authored title is likewise normalized at its Stage 5 boundary. Editorial `purpose`, `focus` and methodology are _not_ learner-facing locale fields merely because they are strings.

A reviewed locale dictionary remains sparse and preserves only its explicitly authored entries, including already supplied additional translations. Missing planned languages are **not** filled or activated. A Course family uses exactly one root `constants.ts` with source-only active `languages` and the `Languages` type. It lists the planned (inactive) tuple with **one** TODO requiring independently reviewed translations and an in-place replacement of the existing active tuple; child Module/Chapter sources import it rather than redeclaring. Separate Lesson/Bank/Assessment/Episode locale ownership and their own review gates remain in force. An intentionally invariant Configurator scalar still has its original semantics when used outside this explicit workflow-field normalization boundary. Strict publication must reject missing requested locales; a draft is not proof of complete localization.

## Six distinct source handoffs

| Entity         | Final reviewed Stage type     | Trusted PR comment        | Transition                                                                                              | Independent/release boundary                                                                    |
| -------------- | ----------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Course         | `CourseWorkflowStage3`        | `/course materialize`     | Stage 5 → Course/Module/Chapter `index.ts`, derived methodology and new Lesson/Episode/Assessment seeds | Independent corrective Stage 4; 10-stage Course flow with Stage 10 human QA                     |
| Lesson         | `LessonWorkflowStage2`        | `/lesson materialize`     | Stage 6.1 → Lesson `index.ts`, Sections/Blocks/Scene scaffolds                                          | Independent Stage 3, specialist Stages 4–5; resources 6.2, Scenes 6.3, banks 7–8, locales 9–10  |
| Episode        | `EpisodeWorkflowStage2`       | `/episode materialize`    | Stage 5 → Episode modules and exact reserved Course slot update                                         | Independent Stage 3, experience Stage 4; human Media Generation Stage 9 and QA Stage 10         |
| Question Bank  | `QuestionBankWorkflowStage3`  | `/questions materialize`  | Stage 5 → Lesson-owned `questions/index.ts` + question modules                                          | Independent Stage 4; separate selections and translations 6–7; Question-first before Flashcards |
| Flashcard Bank | `FlashcardBankWorkflowStage3` | `/flashcards materialize` | Stage 5 → Lesson-owned `flashcards/index.ts` + cards/sides                                              | Independent Stage 4; Questions-first; translations 6–7                                          |
| Assessment     | `AssessmentWorkflowStage2`    | `/assessment materialize` | Stage 4 → Course-owned nested `content/<slug>/index.ts` + parent placeholder restoration                | Independent Stage 3; resources/locales 5–7 and human QA Stage 8                                 |

**Course child stubs:** A pending Lesson/Episode/Assessment slot emits its own typed, blocked `<placement>/stub.ts` and independent inert editorial handoff `draft.ts` (UUID-addressed under `data/lessons/` for new Lessons). The immediate owning Course/Module/Chapter imports only the stub Configurator, preserving exact `content.items/order`. Verified, reused Lessons import their real Configurator directly. Trusted Episode/Assessment source transactions pin the original stub Git blob, verify the imported alias and UUID/slug via AST, and remove **both** the owned stub and consumed handoff in the single atomic parent-restoration commit; Lesson production does not rewrite its owning Course automatically. The manifest inventory binds `stubSourcePath` to every pending placement and rejects foreign stubs.

Quest, QuestStage and QuestTask remain **nested Lesson content** materializers, not a seventh root PR command. Course Stage 2 inserts Assessment slots by ordered placement, not an Assessment-required boolean. Course Stage 5 may create only blocked child seeds, not completed Lesson/Assessment/Episode productions. Stage 6 Course Questions readiness, conditional Stage 7 Assessment design, Course Stages 8–9 translations and mandatory Stage 10 human QA are independent obligations.

## Existing Lesson reuse and typed Course patches

A Course Stage 3 existing Lesson placement authors `production.existing: { id: '<verified Lesson UUID>' }` plus evidence of its immutable source. A placement needing adaptation additionally authors a **single plain sparse `production.sourcePatch`** and pedagogical `overrideRationale`. Use a **type-only** import of the actual existing Lesson export to contextually check the inline raw patch expression:

```ts
import type { importedLesson } from '#lessonsData/verified-path';

// Inside the Course placement's production object (fragment only):
// existing: { id: '<the verified UUID>' },
// sourcePatch: { /* complete literal patch */ } satisfies Parameters<typeof importedLesson.build.overrides>[0]
```

Never value-import or invoke the Lesson in author code, embed a live `production.source`, or duplicate built `production.existing.base/locale`. The **trusted** Course materializer resolves a specific approved Lesson Configurator from its separately verified dependency context, invokes the **real** `build.overrides(rawPatch, { languages })` and preserves per-placement sparse overrides without changing the standalone Lesson. A SHA proves identity, **not execution trust**: untrusted or changed Lesson dependencies require a verified trusted revision, a narrow isolation boundary, or refusal—not arbitrary trusted-process import. The reader itself does not search for new Lessons, PR states or readiness.

**Typing acceptance gate:** Agent B must prove nested existing Section `items`, `additionalItems`, `order`, disabled children and locale keys with actual positive/negative compile fixtures before treating an example using `Parameters<typeof importedLesson.build.overrides>[0]` as guaranteed contextually precise. Do not replace real Build semantics with a second patch interpreter.

## Trust, publication and rollout

The six exact commands retain same-repo Draft PR scope, actor authority, immutable HEAD/blob, approved parent Course slots and bank/Lesson dependencies, branch and source ownership, deterministic target paths and bounded outputs. A tokenless analyzer uses **trusted code** to statically read/validate the reviewed source and call the relevant real Engine source materializer with explicit trusted context. It seals byte-exact `publishable:false` output files, manifest SHA256 and provenance; the write-token publisher reauthorizes current HEAD and dependency identity, rejects symlinks, path traversal, existing targets, forged/mismatched manifests and races, then writes **exactly one non-force Git commit** creating generated modules and deleting the consumed draft (plus the narrowly authorized parent placeholder update for Episode/Assessment). The publisher never evaluates candidate TypeScript, regenerates outputs or reformats sealed bytes.

Materialization produces **nonpublishable authored TypeScript**, not Props/JSON, independent review, locale/asset readiness, completed Scenes, real bank selection or human QA. Keep `TODO (BLOCKER):` and source specifications until actual implementation; use the existing Ready PR autoformatter, **not** a second materializer formatter. Completed Configurators later feed `generateLessonProps`, `generateCourseProps` and `generateAssessmentResources` through their existing separate pipelines. Historical YAML remains provenance; no new YAML or stage-status file is an active authoring input.

Inspect the deployed default `develop` workflow, Agent A/B/C merged code, exact current source SHA, authorized run and produced commit before claiming the declarative mode works. The current #857 integration branch is not proof of default-branch deployment.
