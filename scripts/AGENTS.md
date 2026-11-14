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
generators and YAML draft scaffolders belong under `shared/engine/scripts/`;
their additional mandatory rules are in
[Engine scripts AGENTS.md](../shared/engine/scripts/AGENTS.md).
UI Kit and app scripts belong to their owning packages. Do not move
single-package tools here or recreate removed legacy APIs.

Preserve deterministic behavior, no-clobber guards, package boundaries, and
runtime/build separation. Verify relevant tests before claiming success.
