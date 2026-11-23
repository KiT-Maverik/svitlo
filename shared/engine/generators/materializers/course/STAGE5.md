# Typed Course Stage 5 source orchestration — PR #787

**Scope:** build-time TypeScript source materialization, not runtime Props/JSON.
The input to `materializeCourseStage5(input, options)` is the **canonical**
`CourseWorkflowMaterializerInput = CourseWorkflowStage3`, verified and approved
by an independent Course Stage 4 reviewer. No local redefinition of Course,
Lesson, Episode or bank production stage types is introduced.\n\n**Integration topology:** #787 now targets #786 (which already integrates #782–#785),\nwhile #786 targets #775. The canonical `LessonWorkflowStage1` and\n`LessonWorkflowStage1CourseHandoff` are available from\n`@svitlo/engine/build` in the immediate parent, and the generated handoff\nis checked against **both** types. #787 does not merge #786 into #775.

## Entrypoints and ownership

- `materializeStage5.mjs`: Course root composition of existing concrete
  `materializeCourse`, Module, Chapter, Episode, and the single shared Section
  callback. It is a **pure planner**, emitting a manifest of authored sources.
- `lessonDraft.mjs`: `materializeLessonDraft()` creates exactly one typed
  Lesson Stage 1 `index.ts` at the Lesson's permanent UUID path, typechecked\n against both canonical #786 Lesson source/handoff types, from approved
  Course methodology, planned Skills, reviewed source language, optional
  age/grade and all four independent bank/Section assessment decisions. It
  does not generate `defineLesson`, Sections, banks, Scene content or assets.
- The existing `materializeLesson()` from #777 is **unchanged** and is reserved
  for the later complete independent Lesson workflow.
- `deriveCourseEntityId.mjs`: SHA-1 UUIDv5-shaped identities compatible with
  the existing legacy Course namespace, qualified by the full placement path.
  Explicit imported Lesson identities are preserved.
- `sourceCommit.mjs`: explicit read-only `mode: 'check'` and authorized
  `mode: 'write'` on a detached Git checkout. It verifies source blob/review
  SHA, parent branch head, every target, local modifications and symlinks before
  atomically creating a single Git tree commit, with Git ref compare-and-swap.
  It does not mutate the working tree or push. An external authorized caller
  must push the committed branch after validating the result.

The code is an Engine Build-side **source authoring** implementation, and not
available from Engine Runtime. The `.d.mts` sibling declares the exact
`CourseWorkflowMaterializerInput` contract to TypeScript importers.

## Source-preserving Stage 3 → Stage 5 transition

- Input `content/<book>/data/courses/<bucket>/<uuid>/index.ts` is inspected
  and source-blob-SHA-pinned to an independent Stage 4 review.
- The atomic Git commit installs the new Course Configurator `index.ts` and
  saves the **byte-identical original** at sibling `workflow.stage3.ts`.
  Both objects are committed together or neither is.
- A rerun after success accepts only a byte-identical archive AND identical
  complete output set. Divergence, missing files or a stale reviewed SHA
  fails closed; `--check` makes no Git objects or filesystem changes.
- The original authoring object remains independently inspectable. No second
  YAML/JSON review ledger or separate Course methodology input is created.
  Materialized `methodology.md` is an output of reviewed Course production.
- New Lesson Stage 1 files are emitted in other UUID folders. The Course
  Configurator omits incomplete Lesson references and records pending
  placements with `TODO (BLOCKER)`; it cannot publish until Lesson Production
  completes and those child imports/order are reconciled. The generated Course\n root **always contains a persistent `TODO (BLOCKER)` publication marker**\n with pinned Stage 3 source/review SHA, even when all planned items are\n complete, because the legacy publisher could otherwise discover the new\n UUID-root `index.ts` before #775's trusted release gates are installed.

For an existing Lesson placement, a trusted `resolveExistingLesson` callback
must prove immutable ID, matching source SHA, source-language support, actual
`Lesson_Configurator`, exported symbol and canonical import path. For Course
local adaptation it must also provide the **original raw Lesson Build patch**
corresponding to `production.existing.{base,locale}`. The planner invokes
`lesson.build.overrides(rawPatch, {languages: reviewedPatchLanguages})` and compares
the result to the reviewed built sparse object. It rejects a mismatched result,
missing editorial rationale or invalid patch. Only the verified **raw** nested
Course patch is emitted in `authoredCourseOverrides.ts`, re-exported from
the root Course module so the existing Course publisher may consume it.

Provisional Episodes with only reviewed `focus/purpose` stay blocked by the
existing Episode renderer. The composer never invents Sections, translations,
bank content, Question IDs, Flashcard IDs, Scene implementations or approval.

## Trusted caller obligations

The caller must load the reviewed TypeScript object, not YAML, and implement
`verifyReviewedSource()` by inspecting actual Git blob/commit evidence, reviewer
identity and Stage 5 authorization. A `true` callback result is intentionally
required; TypeScript `satisfies` does **not** prove editorial review. Provide
`materializeSection()` from the **same concrete Section dispatcher** used for
standalone Lessons when Episodes have complete authored Sections. The writer
requires a local detached checkout of the approved commit, a local target branch
pointing at that commit, and a separate `authorizeWrite()` callback.

**Source creation is not publication.** `publishable: false` is deliberate.
The final publisher/CI must independently reject unresolved Lesson/Scene/Episode,
locale, Question/Flashcard, blocked asset and review obligations. Importing the
typed Stage1 source must not automatically start a Lesson PR or advance its
workflow. The root Engine build-only API/CLI and trusted production command
activation are parent #775 integration work, not a reason to ship this Draft
source writer as a production command prematurely.

## Verification

Adjacent tests:

```sh
node --test shared/engine/generators/materializers/course/materializeStage5.spec.mjs\nnode --test shared/engine/generators/materializers/course/materializeStage5.build.spec.mjs
node --test shared/engine/generators/materializers/course/sourceCommit.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
npm run test:coverage --workspace @svitlo/engine
```

These tests cover deterministic parent-child paths, provisional Episode blockers,
Lesson Stage1 handoffs, explicit review failure, generated UUIDs, atomic one-commit
no-clobber behavior, read-only checks, Git SHA drift and symlink/collision
rejection. Real standalone Lesson Stage6 conversion and downstream bank-root
flows are separately owned by #775 and #788. The canonical Lesson Stage 1 build exports are now **in #787's integrated\nparent #786**. The real-Engine semantic compiler fixture includes a newly\nmaterialized Lesson Stage 1 handoff and checks `satisfies LessonWorkflowStage1\n& LessonWorkflowStage1CourseHandoff`; only a completed test run at the exact\nhead SHA may be claimed as verification.

**Import aliases:** `#lessonsData/*` maps to `./data/lessons/*.ts`, so a UUID-owned source is imported as `#lessonsData/<bucket>/<uuid>/index`, never `#lessonsData/<bucket>/<uuid>` (which would resolve to a missing `<uuid>.ts`). These canonical references are checked by the resolver.
