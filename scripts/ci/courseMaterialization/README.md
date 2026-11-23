# Legacy Course YAML Stage 5 — protected PR-command materialization

**Migration status:** This is the existing trusted **YAML-only** `/course materialize` pathway. The [typed Course Skill](../../../studio/skills/course-workflow/create-course-flow.skill.md) must not invoke it on TypeScript objects or claim it implements the planned typed materializer. Retain its authorization, immutable-source verification and regression tests until an equivalent typed CI path is deployed and verified. Its behavior below remains accurate for legacy callers.

The trusted workflow lives in .github/workflows/course-materialization.yml. It must be deployed on the repository default branch before a PR comment can trigger this implementation. Stage 5 is a Draft source handoff, not publication approval.

## Exact command and authorization

On an open same-repository Draft Course PR targeting the default development branch, a write/maintain/admin contributor posts the exact top-level command:

    /course materialize

Manual workflow dispatch takes only the PR number. There is no finalize operation or additional preflight command. The trusted gate verifies the invoking actor, repository, base/head and safe branch. It finds **exactly one canonical Course course.yaml** from the PR changed-file inventory, verifies its UUID bucket, and resolves that exact file from the pinned PR Git tree/blob. Zero, duplicate, noncanonical, removed or ambiguous sources fail closed.

The gate never reads a PR description, checks Stage 1–4 Markdown boxes or parses a Course identity marker. Independent Stage 4 review is a separate editorial obligation documented in the PR discussion, but editable prose is **not** an authorization mechanism.

## Single trusted transaction

1. **Resolve — read only.** Record the source path, Git blob SHA, PR HEAD, branch, reviewer-agnostic actor permission and repo.
2. **Analyze — read only.** Run only checked-out default-branch scripts and dependencies, separately from the pinned PR checkout treated as untrusted data. Invoke the Engine materializer **once with --write** against the PR data checkout. The materializer internally validates the YAML and planned output inventory, deterministic identity, Episode/ContentBlock shape including explicit null params, output syntax and paths, source fidelity and bytes. It creates files exclusively, verifies all outputs and deletes **only the exact input course.yaml** on complete success. The orchestrator compares the changed-file inventory with an allowlisted SHA256-verified manifest containing every source creation **and that YAML deletion**. It does not separately invoke --check.
3. **Publish — write authorized.** Reverify the actor, pinned PR HEAD/branch/source blob and bounded manifest without executing PR-head code. Construct one Git Data API tree with all Course/Module/Chapter/Episode TS/Markdown files, new Lesson YAML shells and the exact Course YAML deletion. Create **one Git commit** whose only parent is the original pinned HEAD and update the branch with a non-force operation. An intervening push is rejected; no extra finalization or registration commit is made.

The publisher has only the required contents-write and pull-requests-read permissions. Unexpected changed paths, hashes, symlinks, partial writes, source changes and branch races fail closed before a Git commit can be published. The YAML remains in Git history. A new command after successful removal safely refuses to run against the now absent temporary input.

## Lesson identity handoff

The verified materializer assigns the stable UUID, authoring slug, source-language title and canonical lesson.yaml path for every newly planned Lesson. Its bounded artifact also carries the original Course source blob SHA. After the atomic commit, the trusted publisher writes a **SHA-pinned Actions step summary** with all Lesson assignments and links to their committed YAML files. That summary replaces the former managed PR-description Lessons block and separate register-lessons job. There is no body PATCH, status synchronizer or automatic Lesson PR creation. Reused Lessons remain independent source references.

Stage 5 does **not** certify Lessons, translations, Scenes, assessment banks, publication or readiness for merge. Independent Lesson production still requires explicit authorization.

## Regression checks

    node --test scripts/ci/courseMaterialization/course-materialization.spec.mjs
    node --test shared/engine/scripts/materializeCourseFlow/materialize-course-flow.spec.mjs shared/engine/scripts/validateCourseFlow/validate-course-flow.spec.mjs

Verify the successful actual Actions run, pinned source commit/blob, complete creation-and-deletion manifest, resulting one-commit SHA, and linked Lesson assignment summary before closing Stage 5.

PR #764 supplies an E2E Course source with three **intentional blank nested params keys** (YAML parses them as null). On that untouched input, the generator must reject the invalid nested Config **before writing generated sources, deleting the YAML or publishing a commit**. Only a legitimate editorial correction allows the positive materialization scenario.

**Deployment limit:** code on an unmerged Draft PR branch does not change the trusted default-branch issue_comment workflow. Do not claim an actual live E2E run before the workflow has been deployed and exercised at the correct PR HEAD.

## Separate typed Course Stage 5 rollout (PR #793)

The **legacy** YAML command and workflow described above remain unchanged.
The new workflow is .github/workflows/course-typed-materialization.yml
and is deliberately **manual workflow_dispatch only**. It cannot be invoked
until separately merged/deployed on the default branch; it does not replace
the existing /course materialize command, remove YAML support or authorize publication.

To exercise the staged path on an open same-repository **Draft Course PR**:
choose **Actions → Stage typed Course materialization (manual rollout)** and
supply pr_number. The gate requires a single changed canonical
content/<book>/data/courses/<UUID-last-hex>/<UUID>/index.ts,
the current source blob SHA, an independent contributor with
write/maintain/admin access who submitted a formal **APPROVED GitHub review
at that exact PR HEAD**, and a write-authorized invoking actor. The source
review and authorization are separate; TypeScript satisfies alone never
grants approval. If approval is stale or withdrawn, refuse.

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
default-branch implementation, never the Course PR. A Course-local sparse
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
file set, exact UTF-8 bytes and SHA-256 hashes, source blob, reviewer and
review commit. **Only trusted default-branch scripts** execute in both jobs.
Candidate TS is not imported, compiled to executable JS, or evaluated —
including in the privileged publisher. The publisher rechecks the actor and
independent Stage 4 review at the pinned HEAD, rereads original source/blob,
recreates the identical plan from inert AST, checks every target for symlinks
and clobbers, and builds **one Git Data API tree commit** that both replaces
index.ts and archives exact original bytes at workflow.stage3.ts. It checks
the branch/PR before a non-force ref update. There is no PR-description edit,
Course Props publication, child Lesson Production or automatic bank work.

### Validation and activation

Run on a checkout containing this PR with dependencies installed:

    node --test scripts/ci/courseMaterialization/course-materialization.spec.mjs
    node --test scripts/ci/courseMaterialization/typed-course-materialization.spec.mjs
    node --test shared/engine/generators/materializers/course/materializeStage5.spec.mjs
    node --test shared/engine/generators/materializers/course/materializeStage5.build.spec.mjs
    node --test shared/engine/generators/materializers/course/sourceCommit.spec.mjs
    npm run code:check:types --workspace @svitlo/engine
    npm run package:build --workspace @svitlo/engine
    npm run test:coverage --workspace @svitlo/engine

Before these focused tests, run:

    node scripts/ci/courseMaterialization/build-course-renderers.mjs

This transient trusted-only esbuild compilation supports isolated regressions
while the parent #775 full Engine TypeScript build currently fails in
Lesson Stage 6 sources. It is not a substitute for those real Engine gates.
The typed PR-targeted test job also requires the actual
`npm run code:check:types --workspace @svitlo/engine`; failure must be
reported and repaired in its owning workstream, not silently skipped.

The Engine tests check real source renderers, generated TS compilation and
Git-source writer. A complete successful Actions run on the default branch
against a pinned Course PR SHA is still required. This staged route has
**no claimed successful live run** while it exists only in this child Draft.
Owner authorization is required before activation, switching the canonical
command, retiring legacy YAML, or merging this subtask into #775.
