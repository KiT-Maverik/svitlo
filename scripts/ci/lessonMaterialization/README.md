# Typed Lesson Stage 6.1 materialization

The only supported PR command is **`/lesson materialize`**. The trusted
default-branch GitHub Actions workflow has three jobs:
`typed-resolve`, `typed-analyze`, and `typed-publish`.

The input is the exact source-commit/source-blob-pinned Lesson
`draft.ts` invoking `materializeLessonStage6(...)` under the canonical
UUID bucket. An initial Course-owned seed or completed Lesson Stage 1 draft is not valid materializer input. The operation deletes the pinned draft and atomically creates `index.ts` and the deterministic Lesson-owned `define*` module tree. Exact original bytes remain in the pinned Git commit/blob. It does not generate translations, Question/Flashcard
Banks, assets, Scene implementations or publishable runtime Props.

## Trigger

On an existing, open, same-repository Draft Lesson PR with a valid Stage 2 source,
an authorized collaborator adds this
**exact** top-level comment:

```text
/lesson materialize
```

An authorized maintainer may dispatch the default-branch workflow with that
PR number only. No format selector, YAML or finalize command is accepted.
The retired YAML jobs and `/lesson finalize` command, their
standalone trusted scripts, and the Lesson `lesson.yaml` Builder/Finalizer
are not supported. Historical Lesson YAML must be
reconciled in its owning PR, preserving source and author/review provenance,
rather than using a hidden legacy fallback.

## Security and stage boundaries

The read-only resolver verifies actor privileges, Draft/same-repository PR
ownership and an unambiguous changed canonical Lesson-root draft.ts in the pinned
base/head Git comparison. A missing, ambiguous, oversized or changed source fails
closed. The command never reads PR descriptions, editorial checklists, review
records or Course ancestry. Stages 1–5 remain editorial responsibilities. Analyzer installs only trusted dependencies and builds Engine normally.
It runs the pinned authored TypeScript entrypoint once inside a read-only,
non-root, network-disabled worker with no GitHub credentials or repository
metadata. The actual input is validated by the Engine materializer.

```ts
import { materializeLessonStage6 } from '@svitlo/engine/build';

materializeLessonStage6(/* complete LessonWorkflowStage2 object */);
```

Execution options and source provenance come from the trusted runner, not
the authored call. Bank Configurator references are preserved in generated
Section source. Worker output is untrusted: the outer analyzer validates
paths, sizes and source identity before creating the manifest. Attestation
binds bytes and provenance; it does not prove arbitrary candidate code
behaved honestly. Normal review and ordinary CI remain necessary.

The SHA256-attested manifest contains an allowlisted create-only source
inventory, the new root `index.ts`, and the pinned draft deletion with exact source bytes.
The dependency-free publisher rechecks actor authorization, source blob, branch HEAD,
file hashes, no-clobber destinations and Git tree lease
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
node --test scripts/ci/directMaterialization/run-isolated.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
```

A successful local/simulated test does not prove operational GitHub Actions permissions or deployment. Verify the workflow on default `develop` and an actual authorized run before claiming operational materialization.
