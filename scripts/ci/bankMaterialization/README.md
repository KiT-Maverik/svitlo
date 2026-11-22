# Question/Flashcard Stage 5 PR-command materialization

> **Existing trusted YAML-only bank Stage 5 commands:** `/questions materialize` and `/flashcards materialize` still invoke create-only YAML builders. New #783/#784 Stage 1 `index.ts` files occupy the future final bank entrypoint paths; #775 must implement a source-SHA-preserving, collision-safe typed Stage 5 transition before changing these commands. Keep authorization, branch/path scope, no-clobber and complete final publication checks.

This opt-in GitHub Actions workflow follows the trusted Course materialization pattern.
It must be **merged into the default branch** before PR comments can trigger it.
It turns one independently reviewed bank YAML into a create-only, typed TypeScript
draft on the **existing child bank Draft PR**, never on the parent Lesson branch.

## Commands

Post exactly one top-level comment on the relevant open Draft bank PR:

- /questions materialize
- /flashcards materialize

Only repository collaborators with write/maintain/admin permission may invoke
these commands. Alternatively use the workflow_dispatch form with the same bank
choice and Draft PR number.

The child PR Description must contain exactly one matching marker:

- Questions: <!-- svitlo-create-questions-flow:v1 -->
- Flashcards: <!-- svitlo-create-flashcards-flow:v1 -->

and the following canonical identity lines (real values, no placeholders):

    - Lesson UUID: <actual-lesson-uuid>
    - Textbook: content/<book>
    - Parent Lesson PR: #<actual-parent-pr>

Include exactly one ## Workflow section with the true completed Stages 1-4,
matching the corresponding [Create Questions Flow] or [Create Flashcards Flow].
Stage 5 Resource Production must remain unchecked when invoking the command.
Recorded independent-review approval and exact source SHAs remain editorial
requirements; a checklist is a workflow declaration, not cryptographic review.

## Output ownership

Input:

    content/<book>/data/lessons/<last-hex>/<lesson-uuid>/questions.yaml
    content/<book>/data/lessons/<last-hex>/<lesson-uuid>/flashcards.yaml

Questions runs the **existing** Engine Questions Builder --preflight, --write,
then --check; its outputs are restricted to new questions/** modules and local
Markdown/Code/spec files inside that exact Lesson UUID directory.

Flashcards runs the **existing** Flashcard Builder --preflight, --write, then
--check; the single created file is flashcards/index.ts. No Lesson/Question
sources or Section selections are mutated. The existing Lesson must already
own its modular typed sources. The separate Questions-first requirement of the
Flashcards Flow must be satisfied and declared in the parent Lesson PR.

Both source YAMLs are deliberately **preserved**. The code may contain
authoring TODO(asset) or other visible blockers and is **not publishable**
without the remaining actual resource work, independent bank review, locales,
Section integration and strict Props publication. No command authorizes
translation, Ready, merge, bank-UUID assignment or YAML retirement.

## Trusted workflow and safeguards

1. **resolve (read-only):** load trusted default-branch gate; verify exact PR
   command, collaborator role, child Draft PR, parent Lesson identity/branch,
   matching bank marker, Stage 1-4 completion, stage 5 pending, canonical path,
   current PR HEAD SHA and current YAML Git blob SHA.
2. **analyze (read-only):** load trusted default-branch Engine/scripts in
   a separate trusted checkout, install dependencies without lifecycle scripts,
   build only trusted Engine, check out the immutable PR head as _untrusted
   source data_ (never import PR code), run the real bank builder preflight,
   create-only write and read-only check. Verify clean initial candidate,
   generated file inventory, UTF-8 bytes, exact scope, Git SHA, no modified
   tracked data, no symlinks and bounded counts/bytes. Upload a short-lived
   checksummed analysis artifact.
3. **publish (write only here):** revalidate actor/PR/source and pinned HEAD,
   verify the trusted artifact and current Git tree for conflicts; commit
   only allowed generated source bytes via Git Data API using the original
   HEAD as parent and a non-force ref update. Concurrent PR changes reject
   publication. No direct push from the PR checkout.

An existing, partial, manually edited or differing bank tree **fails closed**:
the generator never overwrites it, and the job does not delete YAML or
silently invent a restoration. The owner can reconcile and retry a _fresh_
source tree only after review. This CI is intentionally limited to first-time
materialization, not editing or final bank publication.

## Dependency-isolation audit (Questions and Flashcards)

The two bank modes share the same trusted controller but have separate Engine Builders. Source tracing confirms that `bank-materialization.mjs` statically imports only Node built-ins and `bank-gate.mjs` (also built-ins). The `questionsBuilder.mjs` and `flashcardBuilder.mjs` imports occur **only inside `analyze`**, where the workflow installs trusted npm dependencies and builds Engine. The Questions Builder imports `yaml`, the Lesson renderer/factory registry and Engine `dist/build.js`; the Flashcard Builder imports `yaml` and Engine `dist/build.js`. Neither is reachable from the publisher startup or its `publish` function. The `publish` job installs no npm packages, never runs PR code and uses only the trusted gate, pinned checkout, checksummed allowlisted manifest and Git Data API.

Both modes check the source blob and the authorizing Lesson/PR linkage again before publication. The publisher also reads the pinned parent Git tree, rejects symlinks/submodules and occupied paths, and uses a non-force branch update to reject concurrent writes. Questions outputs are limited to the reviewed `questions/**` source inventory; Flashcards can create only `flashcards/index.ts`. This audit found **no corresponding eager-import regression**, so no bank architecture refactor is warranted. The adjacent test suite now executes both publishers from a temporary source tree **without `node_modules` or Engine**. These source and isolated-process tests do not substitute for the post-deployment PR-command end-to-end check.

## Validation

    node --test scripts/ci/bankMaterialization/bank-materialization.spec.mjs
    node --test shared/engine/scripts/questionsBuilder/questionsBuilder.spec.mjs
    node --test shared/engine/scripts/flashcardBuilder/flashcardBuilder.spec.mjs
    npm run package:build --workspace @svitlo/engine

The Engine generators workflow runs the controller tests on this PR and
builder tests against actual Engine exports. A passing PR CI is not a real
issue_comment end-to-end test: this workflow must first be deployed to main
and separately exercised on a safe synthetic reviewed child PR. Record the
real Actions run, exact source blob and output commit SHA before claiming
production E2E validation.

See the canonical Studio [Create Questions Flow](../../../studio/skills/lesson-workflow/create-questions-flow.skill.md),
[Create Flashcards Flow](../../../studio/skills/lesson-workflow/create-flashcards-flow.skill.md),
and Course counterpart at [courseMaterialization](../courseMaterialization/README.md).
