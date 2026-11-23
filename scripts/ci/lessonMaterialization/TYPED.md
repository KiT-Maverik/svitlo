# Trusted typed Lesson Stage 6.1 (PR #794)

This is the **only** Lesson Stage 6.1 PR-command materializer. Legacy
YAML-only Lesson Stage 6 jobs and their converters were removed in #797.
The trusted workflow/scripts must land on the default branch before GitHub
issue comments can invoke them. A Draft integration PR with passing lightweight
CI is not deployment or operational validation.

## Before authorization

The existing Lesson-owned Draft PR must declare the canonical Lesson identity,
UUID bucket, textbook and source path under
content/<book>/data/lessons/<bucket>/<uuid>/index.ts. The Lesson's actual
source must be the one progressively reviewed Stage 2 object satisfying
LessonWorkflowMaterializerInput, an alias of LessonWorkflowStage2. Its ten-stage
PR checklist must have Stages 1–5 completed and Stage 6 pending with all
three separate Stage 6 subchecks. No duplicate review/status artifact is
generated in the Lesson content tree.

Course-originated Lessons require the existing svitlo-course-lesson:v1
marker, correct parent Course PR and UUID, Lesson PR based on the current
parent Course branch, and the original Stage 1 Lesson handoff at the same path
in the parent's pinned branch. Standalone Lessons target the default branch.

Each of the three reviews must have exactly one accepted, source-pinned
attestation as a comment on the **same Lesson PR**:

~~~text
<!-- svitlo-lesson-review:v1 -->
Stage: 3
Source commit: <full 40-character Git commit SHA>
Source blob: <full 40-character Stage 2 index.ts Git blob SHA>
Verdict: accepted
Reviewer context: content-independent-review
Author context: original-authoring-chat
~~~

For Stage 4 and Stage 5, use the same format with Stage: 4 or Stage: 5
and omit the Author context line. The Stage 3 review context and author
context must be different. A review must be recorded by a GitHub collaborator
with write/maintain/admin access. Its source blob must exist at the recorded
commit. Review commits must be ordered ancestors of the final Stage 5
commit, which must equal the current Lesson PR HEAD and source Git blob.

**Security/quality limitation:** the GitHub API can verify the actor,
commit/blob provenance, comment records and declared context strings; it
cannot prove that two external chat contexts were genuinely independent or
that review judged pedagogy correctly. The owner must audit the substantive
review and independence evidence before authorizing this command. The
command itself cannot manufacture editorial approval.

When authorized, a write-capable collaborator posts exactly this as a
top-level comment on the Lesson PR:

~~~text
/lesson materialize typed
~~~

The same operation may be dispatched from the default-branch workflow with
the PR number and operation materialize-typed. The retired YAML-only commands `/lesson materialize` and `/lesson finalize`
are not supported; use only the typed command.

## Read-only analysis and restricted TypeScript

The typed-resolve job verifies the exact comment/dispatch, actor permission,
Draft/same-repo ownership, source path and blob, immutable PR HEAD, Course
handoff if applicable, Stage checklist and Stage 3/4/5 review provenance.
The typed-analyze job checks out a pinned Lesson commit as **data only**.
It installs dependencies and builds only the trusted default-branch Engine.
No scripts, build hooks, imports, eval or Code execution from the candidate
Lesson tree are permitted. A real TypeScript semantic check and a
conservative AST parser process the exact reviewed index.ts before calling
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

## Atomic reviewed source transition

The concrete Stage 6 orchestrator produces the real Lesson/Section/
ContentBlock define* source modules, languages.ts, methodology and
specifications, with visible resource/Scene/locale/assessment blockers.
It never manufactures new Section or bank IDs. The analyzer checks a bounded
and deterministic output inventory, ordinary TS syntax and source path/
no-clobber invariants. The SHA256-attested manifest contains the complete
new file bytes plus one intentional root index.ts replacement. In one Git
tree transaction the exact original Stage 2 index.ts is archived as
workflow.stage2.ts and the newly materialized index.ts replaces it.

Only the matching Lesson UUID tree is writable. An existing archive, any
other existing output destination, a symlink, stale source, changed reviewer
attestation, advanced PR branch or modified artifact blocks the transaction;
there is no destructive re-generation. The typed-publish job has no npm
installation, TypeScript loader or Engine import. With a write-scoped token it
rechecks actor authorization, immutable HEAD, source/review SHA, unchanged
parent ancestry, archived bytes, path allowlist and every file hash. It then
uses the Git Data API to create one commit based on the approved HEAD,
updating the source branch with force=false.

**Successful Stage 6.1 is only a source handoff.** It is not Stage 6.2
type/resource acceptance, Stage 6.3 Scene implementation, successful bank
ownership or full-locale readiness. It does not run content authorship,
translate, produce physical media/Scenes, create another PR, build publication
Props, approve a review, mark Ready or merge. Existing typed-source release
guards remain responsible for rejecting TODO blockers and reserved identities
even after technical TypeScript compilation.

## Verification

~~~sh
node --test scripts/ci/lessonMaterialization/lesson-typed-materialization.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-publish.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-source.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
~~~

Tests with simulated GitHub responses cannot prove the real GitHub Actions
permission boundary, artifact upload/download, source checkout pinning or
branch lease. After deployment use an owner-approved **synthetic** Draft
Lesson PR, record workflow run ID, exact source commit and blob, output
commit, repeat-command rejection and unauthorized/stale-source rejection.
Do not use production content as a speculative test.
