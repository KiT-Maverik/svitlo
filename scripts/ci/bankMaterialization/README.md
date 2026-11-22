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

## Opt-in typed Bank Stage 5 (new command; not yet deployed)

The legacy `/questions materialize` and `/flashcards materialize` routes
above **remain unchanged** for already-authored YAML. They must never be used
against a typed Stage 1–3 editor file. This branch additionally introduces:

- `/questions materialize typed` — reviewed, complete `QuestionBankWorkflowStage3`.
- `/flashcards materialize typed` — reviewed, complete `FlashcardBankWorkflowStage3`.
- Manual dispatch: select the bank and explicitly set `mode: typed`. The
  default `mode: legacy` keeps the previously deployed behavior.

**Deployment is a separate release gate.** The new comment syntax has no
effect until this workflow and trusted scripts reach the repository's default
branch; even successful PR tests do not prove an end-to-end comment trigger.

The existing bank child PR must remain Draft, identify its real owning Lesson
and parent Lesson PR, and have exactly one completed checklist for the first
four stages with Stage 5 pending. A real, qualified *independent GitHub PR
reviewer* (different from the author, with repository write permission) must
have submitted **APPROVED on the exact current bank PR HEAD**. A self-attested
review checkbox, author-controlled `production` property or approval on an
earlier SHA is insufficient. On corrections, re-review that exact current SHA.
If GitHub review protection/policy cannot supply this evidence, Stage 5
remains blocked until a separately reviewed trusted approval mechanism exists.

The bank's `questions/index.ts` or `flashcards/index.ts` must export one
literal staged object as `questionBank`/`flashcardBank` satisfying its exact
`QuestionBankWorkflowStage3`/`FlashcardBankWorkflowStage3` type, using only
a canonical type-only `@svitlo/engine/build` import. The static reader accepts
literal objects, arrays, scalars and `as const`, but **refuses executable
expressions, imports, aliasing and property spreads**: authoring expressive
runtime TypeScript would require a new independently audited read-only
evaluation boundary. It runs strict semantic TypeScript checks, not
`eval`/`import()`/transpiled execution of untrusted bank code.

### Trusted transaction

1. **typed_resolve** authorizes collaborator and PR/parent identity,
   verified Lesson ancestry, current SHA, source blob and independent review.
2. **typed_analyze** receives no GitHub write token or persisted checkout
   credentials. It builds only trusted Engine from the default branch, parses
   the candidate Stage 3 source as *data*, validates the approved Lesson and
   bank prerequisites, runs the **existing concrete Question/Flashcard
   source materializer and Git transaction adapters**, and uploads the exact
   proposed commit's full-tree SHA plus SHA-256 checksummed bytes.
3. **typed_publish** has only the trusted controller (no npm/Engine install,
   no candidate checkout, no untrusted code). It reauthorizes the same actor,
   reviewer, source blob, HEAD and ancestry; validates the complete manifest,
   verifies no other authored files/case/symlink collisions; reconstructs a
   single Git tree with **exactly the analysis tree SHA** and commits one new
   source revision through the Git Data API with a nonforce branch update.
   Stale HEAD or partial source trees fail closed.

Final Stage 5 **replaces only the exact reviewed bank-owned `index.ts`**
and creates the concrete bank member modules, source-only language tuple and
byte-identical `questions.reviewed-stage3.ts.txt` or
`flashcards.reviewed-stage3.ts.txt` audit archive in the same atomic
transaction. It never changes the parent Lesson/Quiz/Flashcards Section,
another bank's source, or YAML. No bank UUID, card, Question, locale, asset or
review is invented. Bank members are *all* materialized, independently of
the local Quiz/Flashcards Section subset. The output is source-only, **not
published Props or production readiness**.

Flashcards additionally require completed and integrated independently
reviewed Questions (with the completed bank and archive) or a verified
Methodologist-backed Questions N/A decision from the parent Lesson. The
current trusted bridge has **no independently verified media/Scene registry
input**: it intentionally rejects media/Scene-bearing bank content rather
than fabricating asset/registry approvals. Likewise, exceptions to a
Lesson-declared optional own bank and deeply nested `content/languages/*`
package roots remain closed until a separate, auditable approval/path adapter
is supplied. A complete reviewed bank using only supported text/Code/Markdown
blocks is the initial activation scope.

### Verification

Run from the repository root after installing trusted dependencies:

```bash
node --test scripts/ci/bankMaterialization/bank-materialization.spec.mjs
node --test scripts/ci/bankMaterialization/bank-typed-materialization.spec.mjs
node --test scripts/ci/bankMaterialization/bank-typed-stage3.spec.mjs
npm run code:check:types --workspace @svitlo/engine
npm run package:build --workspace @svitlo/engine
npm test --workspace @svitlo/engine
```

The trusted typed analysis job runs these checks (plus the actual bank
writer's SHA, preflight and atomic-commit checks) before uploading any
publication manifest. A **real** paired safe child-PR command run after
default-branch deployment, all-nine Question-kind and Flashcard
Card/Side semantic/Build checks, strict assessment publication, and final
owner approval remain separate verification gates. Do not interpret an
unexercised command, Draft-skipped check, or syntactic parsing as a pass.
