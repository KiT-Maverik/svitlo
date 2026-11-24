# Trusted typed Lesson Stage 6.1

This is the **only** Lesson Stage 6.1 PR-command materializer. Verify the trusted workflow/scripts on the default branch before invoking them. A Draft integration PR with passing lightweight
CI is not deployment or operational validation.

## Before authorization

The open same-repository Draft PR must contain exactly one changed canonical
Lesson-root `content/<book>/data/lessons/<bucket>/<uuid>/draft.ts`
in its pinned base/head Git comparison. Its actual source must satisfy
`LessonWorkflowMaterializerInput` (an alias of `LessonWorkflowStage2`).
Missing or ambiguous paths and incomplete comparisons fail closed.

Editorial Stages 1–5 remain responsibilities of the Lesson agents; the PR
description is their coordination record. The materializer accepts the
authorized command and validated typed source only. PR prose, review verdicts,
checklists, parent Course PRs and provenance are not technical inputs.

When authorized, a write-capable collaborator posts exactly this as a
top-level comment on the Lesson PR:

```text
/lesson materialize
```

The same operation may be dispatched from the default-branch workflow with
the PR number only. No format selector, YAML fallback or `/lesson finalize`
command is supported.

## Read-only analysis and restricted TypeScript

The typed-resolve job verifies the exact comment/dispatch, actor permission,
Draft/same-repo ownership, canonical source path and blob, and immutable PR HEAD.
It obtains the candidate path from a complete bounded comparison of pinned Git
commits. The analyzer validates UUID, type and slug from the typed object and
checks path, tracked-file safety and source bytes.
The typed-analyze job checks out a pinned Lesson commit as **data only**.
It installs dependencies and builds only the trusted default-branch Engine.
No scripts, build hooks, imports, eval or Code execution from the candidate
Lesson tree are permitted. A real TypeScript semantic check and a
conservative AST parser process the exact pinned draft.ts before calling
the trusted Engine materializeLessonStage6 emitter.

The static parser accepts an exported Stage 2 object using a satisfies
expression, with plain object/array/scalar literals and TypeScript as-const.
For independently reviewed owned assessments, a selection may reference a
directly imported named real Question or Flashcard Configurator .id with a
statically verifiable UUID inside its define* initializer; source files are
read as data. Dynamic expressions, spreads, function invocation from the
candidate source, side-effect imports, nonlocal/external bank selectors and
unrecognized re-export chains **fail closed**. This conservative subset does
not revise Engine's Stage 2 type contract: authoring expressions outside the
supported safe subset require a separately reviewed static resolver, never
a relaxation to executing candidate code. Missing/disabled mandatory
Quiz/Flashcards Sections are rejected; incomplete but already-authored
enabled assessment Sections remain visible draft blockers. Bank sources
are never created or edited by Lesson Stage 6.

## Atomic source transition

The concrete Stage 6 orchestrator produces the real Lesson/Section/
ContentBlock define* source modules, languages.ts, methodology and
specifications, with visible resource/Scene/locale/assessment blockers.
It never manufactures new Section or bank IDs. The analyzer checks a bounded
and deterministic output inventory, ordinary TS syntax and source path/
no-clobber invariants. The SHA256-attested manifest contains the complete
new file bytes plus the exact pinned draft deletion. In one Git tree
transaction the Stage 2 draft.ts is consumed and the newly materialized
index.ts and children are created. The immutable pinned Git commit and
blob retain the exact original bytes.

Only the matching Lesson UUID tree is writable. Any existing output destination, a symlink, stale source, advanced PR branch or modified artifact blocks the transaction;
there is no destructive re-generation. The typed-publish job has no npm
installation, TypeScript loader or Engine import. With a write-scoped token it
rechecks actor authorization, immutable HEAD, source blob SHA, exact pinned draft bytes, path allowlist and every file hash. It then
uses the Git Data API to create one commit based on the pinned HEAD,
updating the source branch with force=false.

**Successful Stage 6.1 is only a source handoff.** It is not Stage 6.2
type/resource acceptance, Stage 6.3 Scene implementation, successful bank
ownership or full-locale readiness. It does not run content authorship,
translate, produce physical media/Scenes, create another PR, build publication
Props, approve a review, mark Ready or merge. Existing typed-source release
guards remain responsible for rejecting TODO blockers and reserved identities
even after technical TypeScript compilation.

## Verification

```sh
node --test scripts/ci/lessonMaterialization/lesson-typed-materialization.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-publish.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-source.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
```

Tests with simulated GitHub responses cannot prove the real GitHub Actions
permission boundary, artifact upload/download, source checkout pinning or
branch lease. After deployment use an owner-approved **synthetic** Draft
Lesson PR, record workflow run ID, exact source commit and blob, output
commit, repeat-command rejection and unauthorized/stale-source rejection.
Do not use production content as a speculative test.
