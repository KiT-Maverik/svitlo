# Typed Course Stage 5 — trusted manual materialization

The Course-owned TypeScript Stage 3 source is the only supported editorial input. The trusted workflow is `.github/workflows/course-typed-materialization.yml`, a manual `workflow_dispatch` with `pr_number`. Verify its availability on default `develop` before dispatch; never bypass authorization.

## Authorization and source fidelity

To exercise the staged path on an open same-repository **Draft Course PR**:
choose **Actions → Stage typed Course materialization (manual rollout)** and
supply pr_number. The gate requires a single changed canonical
content/<book>/data/courses/<UUID-last-hex>/<UUID>/draft.ts,
the current source blob SHA, accepted Stage 4 evidence in the Course PR
description using the [canonical independent review rule](../../../studio/rules/independent-review.md),
and a write-authorized invoking actor. Review and command authorization are
separate. Missing, rejected, duplicate or stale evidence fails closed.

The **read-only analyze job** parses the Course PR TypeScript through trusted
TypeScript AST analysis; it never runs untrusted candidate modules. Only inert
literal objects and aliases, verified canonical Lesson imports, an imported
Lesson's immutable `.id`, and that trusted Lesson's
`build.overrides(rawPatch, { languages })` with reviewed literal arguments
are supported. Every other executable call/import, computed key or spread
fails closed. Imported Lesson code must already be present byte-for-byte
in the trusted default branch AND in the candidate Git checkout with an
independently pinned source revision and methodology. The trusted
`Lesson_Configurator` and its real Build API are loaded solely from that
default-branch implementation, never the Course PR. Bundling preserves each
original authored TypeScript module's file URL (including transitive Markdown
and other file-relative resources) using the shared Configurator loader plugin.
Editorial drafts cannot be reused or imported. A Course-local sparse
patch retains its _original raw expression_ and is replayed against the
reviewed built result; it is never reverse-engineered from Props. Changes to
independently authored Lessons that exist only on a nested integration branch
must first be approved and made available to the trusted implementation.
This conservative boundary rejects such imports rather than executing PR code.

This path uses the already-implemented Course/Module/Chapter/Episode
orchestrators, concrete Episode Section/ContentBlock renderers shared with
Lesson Stage 6, and Course → new Lesson Stage 1 handoffs. It does not begin
independent Lesson PRs, Question Banks, Flashcard Banks, translation, Scenes,
or Course Props publishing. Unresolved child and release
`TODO (BLOCKER)` markers persist in generated authored source. Generated
TypeScript is typechecked semantically against real trusted Engine Build
contracts as virtual in-memory files before manifest creation and again
before a privileged write.

The read-only job writes a bounded artifact containing the complete generated
file set, exact UTF-8 bytes and SHA-256 hashes, source blob, review verdict and
review commit. **Only trusted default-branch scripts** execute in both jobs.
Candidate TS is not imported, compiled to executable JS, or evaluated —
including in the privileged publisher. The publisher rechecks the actor and
independent Stage 4 review at the pinned HEAD, rereads original source/blob,
recreates the identical plan from inert AST, checks every target for symlinks
and clobbers, and builds **one Git Data API tree commit** that deletes the reviewed
draft.ts and creates index.ts plus all approved outputs. Exact original bytes
remain available at the pinned parent commit and blob. It checks
the branch/PR before a non-force ref update. There is no PR-description edit,
Course Props publication, child Lesson Production or automatic bank work.

### Validation and activation

Run on a checkout containing this PR with dependencies installed:

    node --test scripts/ci/courseMaterialization/typed-course-materialization.spec.mjs
    node --test shared/engine/generators/materializers/course/materializeStage5.spec.mjs
    node --test shared/engine/generators/materializers/course/materializeStage5.build.spec.mjs
    node --test shared/engine/generators/materializers/course/sourceCommit.spec.mjs
    npm run code:check:types --workspace @svitlo/engine
    npm run package:build --workspace @svitlo/engine
    npm run test:coverage --workspace @svitlo/engine

Before these focused tests, run:

    node scripts/ci/courseMaterialization/build-course-renderers.mjs

This transient trusted-only esbuild compilation supports isolated regressions. It is not a substitute for those real Engine gates.
The typed PR-targeted test job also requires the actual
`npm run code:check:types --workspace @svitlo/engine`; failure must be
reported and repaired in its owning workstream, not silently skipped.

The Engine tests check real source renderers, generated TS compilation and
Git-source writer. A complete successful Actions run on the default branch
against a pinned Course PR SHA is still required. A successful authorized default-branch workflow run and source-SHA-pinned result remain prerequisites before treating Stage 5 as operational.
