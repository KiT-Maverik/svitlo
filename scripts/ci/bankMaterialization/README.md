# Typed Question/Flashcard Stage 5 trusted PR command

The only supported Bank materialization source is the owning Lesson's progressively authored `questions/draft.ts` or `flashcards/draft.ts` satisfying `QuestionBankWorkflowStage3` or `FlashcardBankWorkflowStage3`, respectively.

## Invocation and deployment

After these workflow/scripts are deployed to the repository's default `develop` branch, a collaborator with write permission can post exactly `/questions materialize` or `/flashcards materialize` as a top-level comment on the corresponding existing Draft bank PR. Manual `workflow_dispatch` accepts the PR number and matching bank only. Verify the actual trusted workflow exists on the default branch; neither PR comments nor successful tests prove live availability.

The Bank PR must be an open same-repository Draft with exactly one changed canonical UUID-addressed Bank `draft.ts` on the current Lesson base. The gate resolves the pinned source blob, actual owning Lesson `index.ts` and base revision from Git and rechecks the PR state. PR descriptions, stage checklists, identity markers, accepted/rejected verdicts and parent Questions Completed/N/A records are not technical inputs. Questions-first and independent reviews remain editorial workflow responsibilities; actual source references, bank ownership and downstream publication requirements remain technical checks.

## Trusted operations

- `typed_resolve`: reads immutable metadata from the real GitHub PR, current Git base and exact Stage 3 `draft.ts`. Static stage-source parsing accepts bounded literals and refuses candidate side effects, dynamic imports and unrecognized spreads.
- `typed_analyze`: checks out reviewed PR SHA as **untrusted data only**, compiles and executes only default-branch trusted Engine and source materializers, verifies complete Bank inventory, deterministic UUIDs/order/relationships and exact allowlisted outputs. Saves bounded UTF-8 bytes and hashes, including the pinned draft deletion and original blob SHA, in a short-lived run artifact.
- `typed_publish`: has the write permission but no Engine/npm or candidate execution. Revalidates exact actor/source/base/HEAD/branch lease, hashes and permitted paths and atomically updates the Git tree in one non-force commit. Existing edited or partial source trees, changed reviewed bytes, path collisions and symlinks fail closed.

Question Bank and Flashcard Bank are separate complete resources; neither materializes or edits Lesson Quiz/Flashcards Sections. Source code generation does not imply publication of assessment resources or resolve missing assets, bank references, locales or independent translations. `generateAssessmentResources` and completed Lesson Config publication remain distinct downstream gates.

## Verification

Run focused checks from the monorepo root:

```sh
node --test scripts/ci/bankMaterialization/bank-typed-materialization.spec.mjs scripts/ci/bankMaterialization/bank-typed-stage3.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
npm test --workspace @svitlo/engine
```

Then verify an authorized **real** default-branch workflow_dispatch or comment on safe reviewed input. Preserve the resulting immutable Actions run, source/base SHAs, artifact and exact generated commit before declaring deployment operational.

See [Questions Flow](../../../studio/skills/lesson-workflow/create-questions-flow.skill.md), [Flashcards Flow](../../../studio/skills/lesson-workflow/create-flashcards-flow.skill.md), and [Bank source materializers](../../../shared/engine/generators/materializers/).
