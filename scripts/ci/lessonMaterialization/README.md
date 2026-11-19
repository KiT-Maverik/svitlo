# Lesson Stage 6 — trusted PR materialization and YAML retirement

Run this GitHub Actions workflow only after its implementation has been deployed to the repository default branch. It acts on the existing Draft Lesson PR, not a second generated PR, and is a Stage 6 **source handoff**, never automatic Stage 6 completion.

## Supported commands

- `/lesson materialize`: create-only, one-time, source-preserving Lesson YAML → TypeScript/Markdown/specifications/production handoff and optional assessment-bank YAML drafts.
- `/lesson finalize`: separately authorized, verified deletion of **only the unchanged canonical `lesson.yaml`** after all materialized files were committed and a deterministic source-fidelity check succeeds.

Both are exact top-level PR comments made by an authorized write-capable actor. The optional `workflow_dispatch` takes `pr_number` and `operation: materialize | finalize`. There is **no implicit deletion** or retry/no-op generator: repeat `/lesson materialize` is rejected once `index.ts` exists. An agent may explicitly remove confirmed generated sources and restart, but the workflow never overwrites or removes edited files on its own. Finalize should normally follow a successful first materialize commit before bank specialists change the drafts.

## Trusted execution and safety

- **Resolve:** read-only token; verify same-repository open Draft Lesson PR, actor, unique Lesson identity, Course parent ancestry when present, checked Stages 1–5, pending Stage 6, source path and pinned Git HEAD/blob.
- **Analyze:** check out trusted default-branch code separately from pinned candidate data. Install only trusted dependencies with `npm ci --ignore-scripts`. Choose strict or assessment-pending source preflight. Verify immutable YAML, complete deterministic materialized files, source Markdown/Code and specifications, root blocker TODOs, production handoff and optional bank-owned `questions.yaml`/`flashcards.yaml` drafts. Output bounded SHA256 manifest. For finalize, **do not generate anything**; verify previously committed and source-equivalent files, then prepare exactly one canonical deletion.
- **Publish:** revalidate actor, PR HEAD/blob, artifact identities/allowlist and race protection; publish only new generated files (materialize) or the one canonical YAML deletion (finalize) by non-force Git fast-forward through Git Data API. Never execute untrusted candidate PR code or overwrite edited files.

Unfinished assessment Sections are kept in `sectionDrafts` of temporary bank YAML, not emitted as invalid Lesson Configurators. `production.quizRequired`/`production.flashcardsRequired` drive Methodologist obligations; `config.params.quizRequiredForCompletion` retains its original value. The TODO guard prevents Ready/merge while required Sections remain unfinished. Question/Flashcard bank publication happens only in their independent flows. Media/Scene and translation completion remain separate.

A failed check, source mutation, bank-draft conflict, missing/edited file, unauthorized actor, symlink, partial output or concurrent branch update leaves the YAML intact; neither command silently deletes other files. Review the Actions run and generated commit, source SHA and exact file manifest in the same Lesson PR. A posted comment or successful source transfer by itself does **not** complete Stage 6.

## Verification

```sh
node --test scripts/ci/lessonMaterialization/lesson-materialization.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
```
