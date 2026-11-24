# Reviewed typed Lesson Stage 6.1 materialization

The only supported PR command is **`/lesson materialize typed`**. The trusted
default-branch GitHub Actions workflow has three jobs:
`typed-resolve`, `typed-analyze`, and `typed-publish`.

The input is the exact reviewed, source-commit/source-blob-pinned Lesson
`draft.ts satisfies LessonWorkflowMaterializerInput` under the canonical
UUID bucket. The operation deletes the reviewed draft and atomically creates `index.ts` and the deterministic Lesson-owned `define*` module tree. Exact original bytes remain in the pinned Git commit/blob. It does not generate translations, Question/Flashcard
Banks, assets, Scene implementations or publishable runtime Props.

## Trigger

On an existing, open, same-repository Draft Lesson PR whose Stages 1–5 have
been accepted and source-SHA-attested, an authorized collaborator adds this
**exact** top-level comment:

```text
/lesson materialize typed
```

An authorized maintainer may dispatch the default-branch workflow with that
PR number and `operation=materialize-typed`. No YAML or finalize command is
accepted. The old `/lesson materialize` and `/lesson finalize` jobs, their
standalone trusted scripts, and the Lesson `lesson.yaml` Builder/Finalizer
are not supported. Historical Lesson YAML must be
reconciled in its owning PR, preserving source and author/review provenance,
rather than using a hidden legacy fallback.

## Security and stage boundaries

The read-only resolver verifies actor privileges, Draft/same-repository PR
ownership, identity, Course parent provenance, canonical Stage 2 file, Stages
1–5 state and accepted Stage 3/4/5 source review evidence. Analyzer installs
only trusted dependencies and treats candidate TypeScript as **data**; its AST
parser permits a conservative source subset and statically resolves
imported owned bank Configurator `.id` values without executing candidate
code. It uses the trusted Engine source materializer.

The SHA256-attested manifest contains an allowlisted create-only source
inventory, the new root `index.ts`, and the pinned draft deletion with exact source bytes.
The dependency-free publisher rechecks actor/source/review SHA, branch HEAD,
parent ancestry, file hashes, no-clobber destinations and Git tree lease
before the one non-force commit. Stale or partial writes fail closed.

Completion of Stage 6.1 does **not** satisfy Stage 6.2 (typed resources),
Stage 6.3 (working Scenes), Stages 7/8 (independent assessment banks) or
Stages 9/10 (translation and review). Missing required assessment Sections,
unresolved scene/media assets, reserved IDs and translation drafts remain
visible blockers and must not publish.

See [full trusted typed command specification](./TYPED.md) and the
[retirement record](./CUTOVER.md).

## Scoped verification

```sh
node --test scripts/ci/lessonMaterialization/lesson-typed-materialization.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-publish.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-typed-source.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
```

A successful local/simulated test does not prove operational GitHub Actions permissions or deployment. Verify the workflow on default `develop` and an actual authorized run before claiming operational materialization.
