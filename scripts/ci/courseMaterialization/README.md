# Course Stage 5 — one PR-command materialization

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
