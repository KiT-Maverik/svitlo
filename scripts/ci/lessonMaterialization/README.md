# Lesson Stage 6 — authorized PR-command source materialization

This CI workflow materializes the already-reviewed canonical Lesson YAML into create-only TypeScript, Markdown/Code and production handoffs on the **existing Draft Lesson PR branch**. After verifying the real run and commit, this proves only **Stage 6.1 Materialize Lesson sources**; Stage 6 also requires separate checked 6.2 Accessibility source audit, 6.3 Offline source audit, and 6.4 Validate source/handoff. It does not author or integrate Question/Flashcard Banks (parent Stages 7–8), produce Scenes/media (separate resource blockers), translate (Stages 9–10), publish, approve reviews, mark Ready or merge.

## Deploy before use

**The workflow and its trusted scripts must first be merged to the default branch (main) with owner authorization.** GitHub issue_comment cannot execute a workflow which exists only on this Draft PR. This implementation PR is not an operational end-to-end test.

An agent resuming a Lesson by PR number first reads [Create Lesson Flow](../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md), checks the actual PR tracker and Stage 5 evidence, immutable UUID, canonical source/blob and linked Course PR. Once deployed, a collaborator with write/maintain/admin permissions posts this **exact top-level comment** to that Lesson PR:

```text
/lesson materialize
```

An authorized maintainer may alternatively run default-branch workflow_dispatch with pr_number and operation=materialize. Neither interface accepts arbitrary paths, refs or commands. The workflow derives the canonical `content/<book>/data/lessons/<last-uuid-hex>/<uuid>/lesson.yaml` from the verified PR identity. Never run candidate PR code or create a second Lesson PR for a retry.

A separately authorized `/lesson finalize` (dispatch operation=finalize) verifies an existing committed source handoff and deletes **only** the pinned, unchanged `lesson.yaml`. It never reruns a generator or changes TypeScript, Markdown, Scenes, media or banks.

## Trusted job isolation

- **Resolve:** read-only token, exact command/dispatch, write-capable actor, same-repo open Draft Lesson PR, canonical identity marker and UUID bucket, Stage 1–5 uniquely checked and Stage 6.1 pending in the ten-stage Lesson tracker, source Git blob and immutable head. Course-originated Lessons must target the real linked Course integration branch; verify parent PR, Course UUID/textbook and Lesson inventory. Standalone Lessons target main.
- **Analyze:** trusted default-branch implementation checkout under `trusted/` and a separate pinned PR commit under `candidate/`, treated as untrusted **data only**. Install dependencies only from trusted with `npm ci --ignore-scripts`. Run trusted Engine preflight/schema/factory registry against the candidate Lesson root. Bank-pending Quiz/Flashcards Sections are deferred into temporary bank YAML `sectionDrafts`, with root CI-visible TODOs; no incomplete assessment TS is emitted. Complete Sections use strict `preflight`; initial materialization always preserves YAML. Verify the full create-only generated inventory and source fidelity, reject symlinks, overwrite, unexplained modifications, forbidden outputs and size limits; produce bounded SHA256 artifact.
- **Publish:** separate contents:write job downloads the exact analyzer artifact, revalidates actor/stage/identity/branch/source SHA, allowed bytes/paths and tracked files, then creates a Git tree and one commit on the original HEAD. A non-force ref update rejects concurrent pushes. No shell push, PR-head script execution or persistent checkout credentials.
- **One-time materialize:** repeated `/lesson materialize` is rejected after initial source creation; no no-op/provenance shortcut. An agent must explicitly inspect and remove only genuinely generated artifacts before any intentional regeneration. Existing manually edited files are never overwritten.

## Ownership and next steps

Only new Lesson-owned `index.ts`, `constants.ts`, `review.ts`, `methodology.md`, `production-handoff.json`, nested `sections/**` modules/specifications and **new** root `questions.yaml` / `flashcards.yaml` draft handoffs (where required) are allowed under the verified UUID root. The bank authoring and published resource outputs remain independently owned.

This command never creates or modifies `questions/**`, `flashcards/**`, existing bank YAML, bank TS modules, external assets, Scene implementations, translated files or unrelated Course/Lesson files. When no bank YAML exists, it may create only a draft envelope with deferred Section `sectionDrafts`. Independent bank flows own the actual Question/Flashcard data and reviews.

A successful `/lesson materialize` establishes Stage 6.1 evidence only; 6.2 accessibility, 6.3 offline, and 6.4 source validation remain separate. Parent Stages 7–8 own banks, 9–10 translations; missing physical assets remain separate blockers. Inspect actual Actions run/artifact, pinned YAML source/head/blob, generated commit/diff and blockers. Record output SHA evidence for **6.1**, then complete 6.2 source-level accessibility, 6.3 source-level offline requirements and 6.4 Engine/schema/Builder fidelity and scoped technical checks, each with an independent checkbox in the **same Draft Lesson PR**. Check the parent Stage 6 only after all four are verified. Missing physical Scenes/media remain separately owned resource blockers, and pending independent Question/Flashcard Bank selections are handled in Lesson Stages 7–8; neither blocks completion of the Stage 6 source-preparation checklist. Final Ready/merge still requires clearing physical/bank blockers and strict production validation. A successful command alone never marks Ready, merges or publishes.

## Verification

```sh
node --test scripts/ci/lessonMaterialization/lesson-materialization.spec.mjs
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
```

The standalone Lesson finalizer supports `finalize --source <canonical lesson.yaml> --preserve-config` for a **strict first-time** source-preserving transfer; the bank-pending `handoff` always preserves YAML. Neither overwrites an existing authored entrypoint. See [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md).

**Operational E2E remains a separate post-merge acceptance gate:** after authorized deployment to main, use a safe synthetic Draft Lesson PR with real Stage 1–5 evidence; record the actual workflow run ID, source commit/blob, output commit and repeat/failure outcome. Do not use production Lesson #666 as a speculative test. Unit tests and an unmerged workflow are not proof of live GitHub Actions execution.
