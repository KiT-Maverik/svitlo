# Typed Question/Flashcard Stage 5 trusted PR command

The only supported Bank materialization source is the owning Lesson's progressively authored `questions/index.ts` or `flashcards/index.ts` satisfying `QuestionBankWorkflowStage3` or `FlashcardBankWorkflowStage3`, respectively. The legacy YAML-only routes and builders were retired in integration #775. No `questions.yaml`/`flashcards.yaml` input or fallback is supported.

## Invocation and deployment

After these workflow/scripts are deployed to the repository's default `develop` branch, a collaborator with write permission can post exactly `/questions materialize typed` or `/flashcards materialize typed` as a top-level comment on the corresponding existing Draft bank PR. Manual `workflow_dispatch` accepts the PR number, matching bank and `mode: typed`. On an unmerged #775 Draft, neither PR comments nor successful tests prove live default-branch availability.

The bank PR must carry its existing `svitlo-create-questions-flow:v1` or `svitlo-create-flashcards-flow:v1` marker, owning Lesson UUID, textbook path, parent Lesson PR, true seven-stage checklist with Stages 1–4 complete and Stage 5 pending, and a **formal independent GitHub APPROVED review on the current HEAD SHA**. The gate verifies actor permission, source blob, actual Lesson parent ancestry and Question-first prerequisite. A self-attested checkbox or approval on an earlier SHA is insufficient.

## Trusted operations

- `typed_resolve`: reads immutable metadata from the real GitHub PR, current review and exact Stage 3 `index.ts`. Static stage-source parsing accepts bounded literals and refuses candidate side effects, dynamic imports and unrecognized spreads.
- `typed_analyze`: checks out reviewed PR SHA as **untrusted data only**, compiles and executes only default-branch trusted Engine and source materializers, verifies complete Bank inventory, deterministic UUIDs/order/relationships and exact allowlisted outputs. Saves bounded UTF-8 bytes and hashes, including the archive of the reviewed original source, in a short-lived run artifact.
- `typed_publish`: has the write permission but no Engine/npm or candidate execution. Revalidates exact actor/independent review/HEAD/branch lease, hashes and permitted paths and atomically updates the Git tree in one non-force commit. Existing edited or partial source trees, changed reviewed bytes, path collisions and symlinks fail closed.

Question Bank and Flashcard Bank are separate complete resources; neither materializes or edits Lesson Quiz/Flashcards Sections. Source code generation does not imply publication of assessment resources or resolve missing assets, bank references, locales or independent translations. `generateAssessmentResources` and completed Lesson Config publication remain distinct downstream gates.

## Verification

Run focused checks from the monorepo root:

```sh
node --test scripts/ci/bankMaterialization/bank-typed-materialization.spec.mjs scripts/ci/bankMaterialization/bank-typed-stage3.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
npm test --workspace @svitlo/engine
```

Then verify an authorized **real** default-branch workflow_dispatch or comment on safe reviewed input. Preserve the resulting immutable Actions run, source/review SHAs, artifact and exact generated commit before declaring deployment operational. If the current branch is only #775, report this as pending, not a successful live run.

See [Questions Flow](../../../studio/skills/lesson-workflow/create-questions-flow.skill.md), [Flashcards Flow](../../../studio/skills/lesson-workflow/create-flashcards-flow.skill.md), and [Bank source materializers](../../../shared/engine/generators/materializers/).
