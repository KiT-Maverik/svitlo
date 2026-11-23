# Lesson Stage 6 — authorized PR-command source materialization

> **Existing trusted YAML-only Stage 6.1 command:** The `/lesson materialize` procedure below must remain available to existing PRs until #775/#782 supply a verified typed Stage 6 successor. Do not run it against a `LessonWorkflowStage1/2` file; protect actor authorization, pinned head/source blob, no-clobber, branch/path restrictions and Ready/publication gates.

This CI workflow materializes reviewed Lesson YAML into create-only TypeScript, Markdown/Code and production handoffs on the **existing Draft Lesson PR branch**. A verified run proves **Stage 6.1 only**. Under [Create Lesson Flow](../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md), **6.2** then completes and strictly typechecks generated Lesson resources (including real source media/a11y/offline handling), and **6.3** implements, registers and tests all required React Scenes via [Implement Scene](../../../studio/skills/lesson-workflow/implement-scene.skill.md). Those are **manual/specialist work on the Lesson/child PR branches**, not actions this command performs. There is no 6.4 step; final production/runtime QA is separate. This workflow never authors independent Question/Flashcard Banks (Stages 7–8), physical media, executable Scenes or translations (Stages 9–10); it does not publish Props, approve reviews, mark Ready or merge.

## Deploy before use

**The workflow and its trusted scripts must first be merged to the repository default branch with owner authorization.** GitHub issue_comment cannot execute a workflow which exists only on this Draft PR. This implementation PR is not an operational end-to-end test.

An agent resuming a Lesson by PR number first reads [Create Lesson Flow](../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md), checks the actual PR tracker and Stage 5 evidence, immutable UUID, canonical source/blob and linked Course PR. For Course-originated Lessons, the **Coding Agent (not the CI gate)** must inspect the verified Course-owned TS/Markdown and Stage 5 source-pinned Actions summary, match the Course slot and assigned Lesson UUID to the canonical `lesson.yaml`, and record the relevant source SHA before proceeding. One-time materialization is not rerun to repair 6.2/6.3 drafts. Once deployed, a collaborator with write/maintain/admin permissions posts this **exact top-level comment** to that Lesson PR:

```text
/lesson materialize
```

An authorized maintainer may alternatively run default-branch workflow_dispatch with pr_number and operation=materialize. Neither interface accepts arbitrary paths, refs or commands. The workflow derives the canonical `content/<book>/data/lessons/<last-uuid-hex>/<uuid>/lesson.yaml` from the verified PR identity. Never run candidate PR code or create a second Lesson PR for a retry.

The internal `finalize` operation checks the original unchanged YAML against fully committed materialized source and would remove **only** that `lesson.yaml`. **The trusted resolve gate currently disables `/lesson finalize` and dispatch `finalize`** until separate YAML-retirement authorization is approved. This refactor preserves that restriction; it does not regenerate, overwrite source files or assert bank/Stage 6 completion.

## Trusted job isolation

- **Resolve:** read-only token, exact command/dispatch, write-capable actor, same-repo open Draft Lesson PR, canonical identity marker and UUID bucket, Stages 1–5 uniquely checked and Stage 6 pending (three subchecks in the current ten-stage tracker), source Git blob and immutable head. For a Course-originated Lesson, validate the Lesson PR's Course UUID/parent PR linkage, require the parent to be an open same-repository PR with a safe integration branch, and require **Lesson PR base branch = actual parent Course PR head branch**. The trusted gate does **not** traverse the parent's Git tree, search generated Course imports, or parse a parent PR Lessons table. The Coding Agent independently verifies the committed Course source, Stage 5 Actions handoff, exact Lesson UUID and canonical YAML relationship before starting or continuing the Lesson. Standalone Lessons target develop for new work (existing PR ancestry remains authoritative).
- **Analyze:** trusted default-branch implementation checkout under `trusted/` and a separate pinned PR commit under `candidate/`, treated as untrusted **data only**. Install dependencies only from trusted with `npm ci --ignore-scripts`. Run trusted Engine preflight/schema/factory registry against the candidate Lesson root. Bank-pending Quiz/Flashcards Sections use `preflight-draft` then `handoff`: incomplete Section Configurators are emitted as enabled, typed, ordered Sections with deterministic reserved `feedc0de-` UUIDv8 references and `TODO (BLOCKER)` comments. Full original Section data is also copied to temporary `sectionDrafts` of the matching bank YAML; the source Lesson and approved IDs are unchanged. Complete Sections use strict `preflight` and source-preserving generation. The authored `quizRequiredForCompletion` value remains unchanged. Verify the full create-only generated inventory and source fidelity, reject symlinks, overwrite, unexplained modifications, forbidden outputs and size limits; produce bounded SHA256 artifact.
- **Publish:** dependency-free contents:write job downloads the exact analyzer artifact. The read-only analyzer exports the SHA256 of the completed report as a separate job output, and publish rejects any absent, substituted or altered report before parsing. Publish uses **only Node built-ins and the trusted gates**—no npm installation, Engine import, Builder execution or YAML/JSON-schema library. It revalidates actor/stage/identity/branch/source Git blob, allowlisted bytes/paths and hashes. For `finalize`, the analyzer already ran the full Engine preflight, source-fidelity check and deterministic Builder `check`; the report includes per-file hashes of every required committed source. Publish rechecks these hashes against the unchanged pinned checkout before permitting the single YAML deletion. It creates a Git tree and one commit on the original HEAD; a non-force ref update rejects concurrent pushes. No shell push, PR-head script execution or persistent checkout credentials.
- **One-time generation:** a second `/lesson materialize` after source creation fails explicitly; there is no no-op/reconciliation mode. If regeneration is genuinely needed, manually remove only verified generated output before retrying. Edited sources are never overwritten.

## Ownership and next steps

Only new Lesson-owned `index.ts`, `constants.ts`, `review.ts`, `methodology.md`, `production-handoff.json`, nested `sections/**` source/specifications and temporary root `questions.yaml`/`flashcards.yaml` pending-Section handoffs are allowed under the single verified UUID root. Complete Quiz/Flashcards Sections remain normal Sections; unfinished Sections remain registered and have real root, Section and per-placeholder `TODO (BLOCKER)` markers. Neither placeholder UUIDs nor draft labels can publish as real resources.

This command never writes `questions/**`, `flashcards/**`, **existing** bank YAML, independently owned bank TS modules, external assets, Scene implementations, translated files or unrelated Course/Lesson files. It may create a new bank YAML with empty bank collections plus preserved pending `sectionDrafts` only where needed. Independent bank flows author and review Question/Flashcard entries.

Inspect actual Actions run/artifact, pinned YAML source/head/blob, generated commit/diff and blockers. Record output SHA evidence for **6.1**. Next, the Coding Agent performs **6.2 Complete generated Lesson resources**, correcting typed drafts and real asset references, verifying strict TypeScript on actual Lesson sources and their imported contracts, and auditing source a11y/offline. Only then, the Scene Implementer performs **6.3 Implement and integrate Scenes**, including optional draft scaffolding, real React implementation, registry integration and substantive focused tests. Missing Scene infrastructure, unresolved essential Scene/media behavior or unsuccessful required checks block the relevant checkbox. Track all three substeps in the **same Draft Lesson PR**, even when Stage 6.3 uses specialist child PRs. The trusted analyze/publish jobs cover only 6.1 source integrity. Scoped package/runtime/full-locale checks remain separate Final QA gates; never invent a pass. Revalidate after changes. Question/Flashcard Banks remain Stages 7–8. A successful materialization command alone never marks Ready, merges or publishes.

## Verification

```sh
node --test scripts/ci/lessonMaterialization/lesson-materialization.spec.mjs
node --test scripts/ci/lessonMaterialization/lesson-publish-isolation.spec.mjs
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
```

The standalone Lesson finalizer supports `finalize --source <canonical lesson.yaml> --preserve-config` for a **strict first-time** source-preserving transfer; the bank-pending `handoff` always preserves YAML. Neither overwrites an existing authored entrypoint. See [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md).

**Operational E2E remains a separate post-merge acceptance gate:** after authorized deployment to the repository default branch, use a safe synthetic Draft Lesson PR with real Stage 1–5 evidence; record the actual workflow run ID, source commit/blob, output commit and repeat/failure outcome. Do not use production Lesson #666 as a speculative test. Unit tests and an unmerged workflow are not proof of live GitHub Actions execution.


## Typed Stage 6.1 successor (#794)

The reviewed TypeScript Lesson Stage 6.1 trusted command is specified in
[TYPED.md](./TYPED.md). It is separate from the legacy YAML command above.
Deploy its trusted workflow and Engine to the repository default branch and
verify a safe synthetic Actions run before treating it as available.
The typed operation accepts an explicitly reviewed Stage 2 index.ts, checks
source/reviewer SHA and Course provenance, statically parses untrusted TS
without executing it, archives the reviewed source and atomically commits the
real generated source modules. It never completes Stages 6.2/6.3 or publishes
Props. Do not dispatch the YAML command on this typed source.

## Lesson YAML-to-typed cutover inventory

[Lesson-owned source/CI consumer inventory and default-branch retirement gates](./CUTOVER.md)
records the legacy entrypoints, typed Stage 6.1 parity boundary, negative-test
expectations and required synthetic deployed-workflow evidence. The YAML-only
command remains an intentional compatibility path for already-approved legacy
PRs; new typed Lesson Stage 2 sources must never be passed through it.
