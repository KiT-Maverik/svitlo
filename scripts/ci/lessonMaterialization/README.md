# Lesson Stage 6 — authorized PR-command source materialization

This CI workflow materializes the already-reviewed canonical Lesson YAML into create-only TypeScript, Markdown/Code and production handoffs on the **existing Draft Lesson PR branch**. It is a **Stage 6 source handoff**, not Stage 6 completion, Question/Flashcard Bank creation, asset generation, publication, translation, review approval, Ready transition or merge.

## Deploy before use

**The workflow and its trusted scripts must first be merged to the repository default branch with owner authorization.** GitHub issue_comment cannot execute a workflow which exists only on this Draft PR. This implementation PR is not an operational end-to-end test.

An agent resuming a Lesson by PR number first reads [Create Lesson Flow](../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md), checks the actual PR tracker and Stage 5 evidence, immutable UUID, canonical source/blob and linked Course PR. Once deployed, a collaborator with write/maintain/admin permissions posts this **exact top-level comment** to that Lesson PR:

~~~text
/lesson materialize
~~~

An authorized maintainer may alternatively run default-branch workflow_dispatch with pr_number and operation=materialize. Neither interface accepts arbitrary paths, refs or commands. The workflow derives the canonical `content/<book>/data/lessons/<last-uuid-hex>/<uuid>/lesson.yaml` from the verified PR identity. Never run candidate PR code or create a second Lesson PR for a retry.

The optional `/lesson finalize` (dispatch operation=finalize) **fails closed** in this version: safe post-materialization source verification/retirement is not implemented. A second create-only finalizer run may never overwrite edited TS just to delete YAML.

## Trusted job isolation

- **Resolve:** read-only token, exact command/dispatch, write-capable actor, same-repo open Draft Lesson PR, canonical identity marker and UUID bucket, Stage 1–5 uniquely checked and Stage 6 pending, source Git blob and immutable head. Course-originated Lessons must target the real linked Course integration branch; verify parent PR, Course UUID/textbook and Lesson inventory. Standalone Lessons target main.
- **Analyze:** trusted default-branch implementation checkout under `trusted/` and a separate pinned PR commit under `candidate/`, treated as untrusted **data only**. Install dependencies only from trusted with `npm ci --ignore-scripts`. Run trusted Engine preflight/schema/factory registry against the candidate Lesson root. Bank-pending reviewed Quiz/Flashcards Sections use `preflight-draft` then `handoff`; fully specified Sections use strict `preflight` and source-preserving strict finalize. Verify the full create-only generated inventory and source fidelity, reject symlinks, overwrite, unexplained modifications, forbidden outputs and size limits; produce bounded SHA256 artifact.
- **Publish:** separate contents:write job downloads the exact analyzer artifact, revalidates actor/stage/identity/branch/source SHA, allowed bytes/paths and tracked files, then creates a Git tree and one commit on the original HEAD. A non-force ref update rejects concurrent pushes. No shell push, PR-head script execution or persistent checkout credentials.
- **Repeat:** an identical repeat immediately on the previous materializer's generated commit is an explicitly verified no-op. Manually edited or divergent source is a diagnostic; it is never overwritten.

## Ownership and next steps

Only new Lesson-owned `index.ts`, `constants.ts`, `review.ts`, `methodology.md`, `production-handoff.json` and nested `sections/**` Config/Markdown/Code/specification modules are allowed under the **single** verified UUID root. Ordinary Quiz/Flashcards **Section** modules and their real `TODO (BLOCKER)` markers are valid.

This command never creates, edits, deletes or commits `questions/**`, `flashcards/**`, `questions.yaml`, `flashcards.yaml`, bank TS modules, external assets, Scene implementations, translated files or unrelated Course/Lesson files. Independent bank builders own bank sources and approvals.

Inspect actual Actions job output/artifact, pinned source HEAD/blob, published commit/diff and blockers. Record this evidence in the **same Draft Lesson PR** and continue **the same Stage 6**: real Scene/media/audio production, accessibility/offline testing, independently integrated Question/Flashcard banks and strict source/Props verification. A successful command alone never checks Stage 6, clears blockers, marks Ready, merges or publishes.

## Verification

~~~sh
node --test scripts/ci/lessonMaterialization/lesson-materialization.spec.mjs
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
~~~

The standalone Lesson finalizer supports `finalize --source <canonical lesson.yaml> --preserve-config` for a **strict first-time** source-preserving transfer; the bank-pending `handoff` always preserves YAML. Neither overwrites an existing authored entrypoint. See [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md).

**Operational E2E remains a separate post-merge acceptance gate:** after authorized deployment to main, use a safe synthetic Draft Lesson PR with real Stage 1–5 evidence; record the actual workflow run ID, source commit/blob, output commit and repeat/failure outcome. Do not use production Lesson #666 as a speculative test. Unit tests and an unmerged workflow are not proof of live GitHub Actions execution.
