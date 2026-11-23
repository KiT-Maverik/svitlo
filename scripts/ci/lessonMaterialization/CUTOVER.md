# Lesson YAML → reviewed TypeScript cutover inventory

> Scope: Lesson-owned Stage 6 and legacy Lesson YAML consumers only. This document
> records the implementation observed on the #775 integration branch; it does not
> authorize removing any live default-branch command. Question/Flashcard and
> Course-owned YAML consumers are separate sibling/parent workstreams.

## Actual source entrypoints and consumers

| Entrypoint | Input and effect | Current dependency / decision |
| --- | --- | --- |
| `scripts/ci/lessonMaterialization/lesson-gate.mjs` | Trusted `/lesson materialize` authorization and YAML source/blob pinning. `/lesson finalize` is deliberately disabled. | Keep for still-live approved legacy Lesson PRs. Do not point it at `index.ts`. |
| `scripts/ci/lessonMaterialization/lesson-materialization.mjs` | Read-only YAML analyze and dependency-free artifact-verified Git Data API publisher; invokes `finalizeLesson` and `lessonBuilder` in the trusted analyzer. | Keep while the legacy gate is deployed. Source and output must remain non-clobbering. |
| `shared/engine/scripts/finalizeLesson/finalizeLesson.mjs` | Local YAML preflight, draft assessment handoff and explicit legacy finalize. | Retain for historical YAML sources and for the trusted legacy analyzer; CLI's local finalize is **not** authorization to enable GitHub `/lesson finalize`. |
| `shared/engine/scripts/lessonBuilder/lessonBuilder.mjs` | Create-only `lesson.yaml` → Lesson/Section/ContentBlock TypeScript drafts, methodology and pending Section bank-YAML handoff. | Retain until its last caller and historical approved inputs are explicitly reconciled. It is not a Props publisher. |
| `.github/workflows/lesson-materialization.yml` | One deployed workflow with separate YAML `resolve/analyze/publish` and typed `typed-resolve/typed-analyze/typed-publish` jobs. | Both commands remain distinct. Do not delete jobs until the replacement has been merged to `develop` and exercised. |
| `scripts/ci/lessonMaterialization/lesson-typed-gate.mjs` | Trusted `/lesson materialize typed` actor, Draft PR, source/head/blob, Course parent and accepted Stage 3–5 attestation checks. | Typed authorization; comments alone do not demonstrate true reviewer independence. |
| `scripts/ci/lessonMaterialization/lesson-typed-source.mjs` | Static parsing of reviewed Stage 2 `index.ts`, restricted imported bank `.id` references, plus trusted Engine TypeScript semantic checking. | Candidate code must never execute during trusted CI. Expressions outside the conservative grammar fail closed. |
| `scripts/ci/lessonMaterialization/lesson-typed-materialization.mjs` | Hash-attested, allowlisted, source-preserving typed file transition through one non-force Git tree/ref update. | New typed source path is `index.ts`; exact original bytes are archived as `workflow.stage2.ts`. |
| `shared/engine/generators/materializers/lesson/` | Pure authored TypeScript source emitter used by typed Stage 6.1. | Distinct from legacy YAML converter and independent runtime/Props publisher. |

The Engine workspace `test` script still invokes `scripts/lessonBuilder/lessonBuilder.spec.mjs`
and `scripts/finalizeLesson/finalizeLesson.spec.mjs`; the Lesson workflow
README/TYPED.md also list direct node tests. `content:check:yaml-schemas`
is globally shared, **not** owned by this subtask. Parent #775 must audit
shared schema generation, shared package scripts, and cross-domain usages
before their removal.

## Parity and security boundaries

1. **Identity and authorization:** Use the original Lesson UUID and canonical
   UUID bucket. Standalone Lesson PRs target the default branch; Course-originated
   Lesson PRs retain the explicit Course marker, approved parent branch, parent
   Stage 1 handoff and Course source provenance. Each accepted Stage 3/4/5
   review must be independently source-blob/commit-pinned. Static checks of
   declared review contexts cannot establish substantive editorial independence.
2. **Source preservation:** Stage 2 `index.ts` is the sole reviewed input.
   Stage 6.1 archives its *exact* original bytes and replaces that path
   atomically with generated `defineLesson` source. No second editable
   `lesson.yaml`, fabricated approvals or silently regenerated IDs.
3. **Source structure:** Preserve the authored Section/ContentBlock
   `items/order`, immutable UUIDs, original selected Question/Flashcard
   Configurator `.id` references, source language, planned locales and
   nested Quest/media/Scene specifications. Incomplete resources remain visible
   `TODO (BLOCKER)` drafts and must not become published Props.
4. **Separation:** Stage 6.1 emits sources; Stage 6.2 repairs and typechecks
   actual resources; Stage 6.3 implements and validates Scenes. Independently
   authored Question and Flashcard Banks are Stages 7/8. Translation and
   translation review are Stages 9/10. No stage implies acceptance of another.
5. **Atomicity:** Analyzer uses candidate PR files as data only; publisher
   rechecks identity, source/reviewer hashes, parent lineage, allowlisted
   inventory, nonexisting destinations and unchanged branch HEAD. No privileged
   execution of candidate code; repeated or partial writes fail closed.
6. **Nonpublication:** Missing/disabled mandatory Quiz or Flashcards Sections,
   reserved assessment IDs, unresolved locales, `TODO(asset)`, incomplete
   Scenes and other release blockers must fail the relevant typed/source or
   eventual publication gates. Never fabricate bank content, media or locales.

## Cutover gates — not yet satisfied by a green Draft PR

- [ ] Merge the trusted typed workflow, Engine emitter and related guards to
      the actual default branch (`develop`). Confirm the workflow deployed
      there rather than only existing on #775 or #797.
- [ ] On an owner-authorized **synthetic Draft Lesson PR**, capture the exact
      workflow run, source HEAD/blob, Stage 3/4/5 evidence, output commit and
      archive bytes for `/lesson materialize typed`.
- [ ] Verify a rerun rejects already materialized source, an unauthorized actor
      is rejected, stale source/reviews/parent linkage are rejected, and
      preexisting or partial destination trees cannot be overwritten.
- [ ] Run the Lesson-owned focused tests, Engine build/typecheck and impacted
      commands on the actual integration HEAD; record exact commands/results.
      Passing simulated gate tests cannot substitute for Actions permission or
      branch-lease verification.
- [ ] Inventory all existing approved legacy Lesson PRs and their remaining
      `lesson.yaml` consumers. Decide and document a recovery/migration path
      for each before disabling the YAML command; do not bulk-convert them.
- [ ] Parent #775 confirms no other script, workflow, root/npm entrypoint or
      Question/Flashcard/Course use depends on shared YAML factory/schema code,
      then separately removes **shared** artifacts as necessary.
- [ ] Owner explicitly authorizes retirement. Keep `/lesson finalize`
      disabled unless a separately audited post-materialization deletion
      protocol is approved.

**Decision:** retain the YAML-only Lesson workflow and its Engine converters
until these gates have evidence. Do not use legacy YAML tools as an alternate
source for newly reviewed typed Lessons; do not claim deployment based on Draft
or Production Quality running on the integration branch.
