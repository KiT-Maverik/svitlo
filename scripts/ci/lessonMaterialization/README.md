# Lesson Stage 6 — authorized PR-command source materialization

This CI workflow materializes the already-reviewed canonical Lesson YAML into create-only TypeScript, Markdown/Code and production handoffs on the **existing Draft Lesson PR branch**. After verifying the real run and commit, this proves only **Stage 6.1 Materialize Lesson sources**; Stage 6 also requires separately checked 6.2 Accessibility source audit and 6.3 Offline source audit. Engine schema/preflight, Builder inventory/fidelity, typed source checks and scoped tests remain automated CI/final-QA responsibilities, not a fourth Stage 6 checkbox. It does not author or integrate Question/Flashcard Banks (parent Stages 7–8), produce Scenes/media (separate resource blockers), translate (Stages 9–10), publish, approve reviews, mark Ready or merge.

## Deploy before use

**The workflow and its trusted scripts must first be merged to the repository default branch with owner authorization.** GitHub issue_comment cannot execute a workflow which exists only on this Draft PR. This implementation PR is not an operational end-to-end test.

An agent resuming a Lesson by PR number first reads [Create Lesson Flow](../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md), checks the actual PR tracker and Stage 5 evidence, immutable UUID, canonical source/blob and linked Course PR. Once deployed, a collaborator with write/maintain/admin permissions posts this **exact top-level comment** to that Lesson PR:

```text
/lesson materialize
```

An authorized maintainer may alternatively run default-branch workflow_dispatch with pr_number and operation=materialize. Neither interface accepts arbitrary paths, refs or commands. The workflow derives the canonical `content/<book>/data/lessons/<last-uuid-hex>/<uuid>/lesson.yaml` from the verified PR identity. Never run candidate PR code or create a second Lesson PR for a retry.

The internal `finalize` operation checks the original unchanged YAML against fully committed materialized source and would remove **only** that `lesson.yaml`. **The trusted resolve gate currently disables `/lesson finalize` and dispatch `finalize`** until separate YAML-retirement authorization is approved. This refactor preserves that restriction; it does not regenerate, overwrite source files or assert bank/Stage 6 completion.

## Trusted job isolation

- **Resolve:** read-only token, exact command/dispatch, write-capable actor, same-repo open Draft Lesson PR, canonical identity marker and UUID bucket, Stages 1–5 uniquely checked and Stage 6 pending (three subchecks in the current ten-stage tracker), source Git blob and immutable head. Course-originated Lessons must target the real linked Course integration branch; verify parent PR, Course UUID/textbook and Lesson inventory. Standalone Lessons target develop for new work (existing PR ancestry remains authoritative).
- **Analyze:** trusted default-branch implementation checkout under `trusted/` and a separate pinned PR commit under `candidate/`, treated as untrusted **data only**. Install dependencies only from trusted with `npm ci --ignore-scripts`. Run trusted Engine preflight/schema/factory registry against the candidate Lesson root. Bank-pending Quiz/Flashcards Sections use `preflight-draft` then `handoff`: incomplete Section Configurators are omitted from the generated Lesson, with full authored Section data copied to temporary `sectionDrafts` of the matching bank YAML. Complete Sections use strict `preflight` and source-preserving generation. The authored `quizRequiredForCompletion` value remains unchanged. Verify the full create-only generated inventory and source fidelity, reject symlinks, overwrite, unexplained modifications, forbidden outputs and size limits; produce bounded SHA256 artifact.
- **Publish:** dependency-free contents:write job downloads the exact analyzer artifact. The read-only analyzer exports the SHA256 of the completed report as a separate job output, and publish rejects any absent, substituted or altered report before parsing. Publish uses **only Node built-ins and the trusted gates**—no npm installation, Engine import, Builder execution or YAML/JSON-schema library. It revalidates actor/stage/identity/branch/source Git blob, allowlisted bytes/paths and hashes. For `finalize`, the analyzer already ran the full Engine preflight, source-fidelity check and deterministic Builder `check`; the report includes per-file hashes of every required committed source. Publish rechecks these hashes against the unchanged pinned checkout before permitting the single YAML deletion. It creates a Git tree and one commit on the original HEAD; a non-force ref update rejects concurrent pushes. No shell push, PR-head script execution or persistent checkout credentials.
- **One-time generation:** a second `/lesson materialize` after source creation fails explicitly; there is no no-op/reconciliation mode. If regeneration is genuinely needed, manually remove only verified generated output before retrying. Edited sources are never overwritten.

## Ownership and next steps

Only new Lesson-owned `index.ts`, `constants.ts`, `review.ts`, `methodology.md`, `production-handoff.json`, nested `sections/**` source/specifications and temporary root `questions.yaml`/`flashcards.yaml` deferred-Section drafts are allowed under the single verified UUID root. Complete Quiz/Flashcards Sections remain normal Sections; unfinished Sections become real root `TODO (BLOCKER)` handoffs.

This command never writes `questions/**`, `flashcards/**`, **existing** bank YAML, independently owned bank TS modules, external assets, Scene implementations, translated files or unrelated Course/Lesson files. It may create a new bank YAML with empty bank collections plus deferred `sectionDrafts` only where needed. Independent bank flows author and review Question/Flashcard entries.

Inspect actual Actions run/artifact, pinned YAML source/head/blob, generated commit/diff and blockers. Record output SHA evidence for **6.1**, then complete 6.2 source-level accessibility and 6.3 source-level offline audits, each with an independent checkbox in the **same Draft Lesson PR**. Check the parent Stage 6 directly after all three are verified, then hand off to Stage 7 Questions. Engine schema/preflight, Builder output inventory/fidelity and SHA integrity are verified by trusted analyze/publish during 6.1; scoped generator tests, typed source validation and full release checks run in applicable Ready/manual/production CI and final QA. Preserve exact run/commit evidence, distinguish Draft-deferred checks from passes and revalidate modified sources before Ready/merge. Missing physical Scenes/media remain separately owned resource blockers, and pending independent Question/Flashcard Bank selections are handled in Lesson Stages 7–8; neither blocks completion of the Stage 6 source-preparation checklist. Final Ready/merge still requires clearing physical/bank blockers and strict production validation. A successful command alone never marks Ready, merges or publishes.

## Verification

```sh
node --test scripts/ci/lessonMaterialization/lesson-materialization.spec.mjs
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
```

The standalone Lesson finalizer supports `finalize --source <canonical lesson.yaml> --preserve-config` for a **strict first-time** source-preserving transfer; the bank-pending `handoff` always preserves YAML. Neither overwrites an existing authored entrypoint. See [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md).

**Operational E2E remains a separate post-merge acceptance gate:** after authorized deployment to the repository default branch, use a safe synthetic Draft Lesson PR with real Stage 1–5 evidence; record the actual workflow run ID, source commit/blob, output commit and repeat/failure outcome. Do not use production Lesson #666 as a speculative test. Unit tests and an unmerged workflow are not proof of live GitHub Actions execution.
