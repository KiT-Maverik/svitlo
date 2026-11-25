# Root scripts: mandatory agent guidance

Before changing anything in `scripts/`, read the repository root `AGENTS.md`,
then `scripts/README.md` and the relevant Studio rules, persona and workflow.

Each maintained workflow lives in a **named subdirectory**, which may contain:

- A script entrypoint with a leading JSDoc/fileoverview defining its purpose
  and its explicit non-goals.
- A local `README.md` documenting CLI input/output, supported modes, and safety.
- Adjacent `*.spec.*` or `*.test.*` tests and, when necessary, fixtures/helpers.

**Before planning, editing, reviewing or removing a script, actually open its
entrypoint and read the JSDoc, nearby tests, README, npm/CI callers, and write
paths.** Do not infer its job from the filename or historical workflow.

Root `scripts/` owns repository-wide orchestration only. Engine-specific
generators and typed draft scaffolders belong under `shared/engine/scripts/`;
their additional mandatory rules are in
[Engine scripts AGENTS.md](../shared/engine/scripts/AGENTS.md).
UI Kit and app scripts belong to their owning packages. Do not move
single-package tools here or recreate removed legacy APIs.

Preserve deterministic behavior, no-clobber guards, package boundaries, and
runtime/build separation. Verify relevant tests before claiming success.

## Declarative source handoff (#857 target)

For six authored entities (Course, Lesson, Episode, Questions, Flashcards, Assessment), treat `draft.ts` as a single inert, staged, default-exported typed object. A trusted static reader—not Jiti or a user-authored function call—must parse reviewed source; the canonical final Stage schema and concrete Engine source materializer operate only in trusted code. Keep runner/publisher security and deterministic sealed outputs independent of editorial approval. See [canonical architecture](../studio/docs/architecture/typed-production-materialization.md) and entity-specific `ci/*Materialization/README.md` runbooks. The current default-branch implementation may predate #857; inspect code and actual deployed Actions before claiming this is operational.
