# Svitlo Engine

Engine publishes two distinct responsibilities:

- `@svitlo/engine/build` — Node/build-time authoring, `define*` factories, validation and publication.
- `@svitlo/engine/runtime` — framework-independent runtime assemblers, schemas, types and pure helpers.

Published JSON resources are assembled at runtime without loading authoring factories. Build may import runtime definitions; runtime must not import build factories, generators, `*.data.ts` or Node filesystem APIs.

Use `import { defineSkill } from '@svitlo/engine/build'` in authored textbook files and `import { assembleSkills } from '@svitlo/engine/runtime'` in applications. The shared app ESLint configuration rejects `/build` imports.

The browser graph check `node scripts/check-engine-runtime-graph.mjs` bundles `shared/engine/runtime.ts` for the browser, rejecting Node dependencies and build-only input modules. The Engine test script invokes this guard.

Migration from legacy Engine subpath imports is provided by `node scripts/migrateEngineImports/migrate-engine-imports.mjs --write`, with `--check` for verification. Imports that depend on retired contracts without a canonical Engine export require manual migration; the utility fails explicitly instead of emitting invalid imports. The legacy package root is not exported. App code must depend on the runtime entrypoint; authored content imports the build entrypoint.

## On-demand coverage for coding agents

`npm run test:coverage --workspace @svitlo/engine` executes the Engine's existing
`node --test` suites with source-map-aware Node coverage and writes two files under
`shared/engine/.coverage-engine/`: `engine-gaps.md` (short review) and
`engine-gaps.json` (machine-readable missing lines, branches and functions).
Neither output lists fully covered source files. The temporary raw LCOV is not
uploaded to the PR. Run the Engine package build before this command.

The target selection is implemented and tested in
`scripts/coverage/report.mjs`. It includes `*.utils.ts`/`*.util.ts` helpers,
assemblers, Lesson functions, `define*` implementations, the specific
`configuratorArrayToSlugMap` and `deepStrict_Schema` modules, and the Skills
publisher. It excludes legacy `configurators_old`, re-exports, tests,
TypeScript-only types, schema declarations, and generated build products.
Files not loaded by any test are explicitly marked **Not executed**, rather
than silently treated as covered.

In an open **same-repository PR**, an owner, member or collaborator can comment
`/engine-coverage` (alone on its line). The `Engine coverage gaps` workflow
checks out that PR's exact head SHA, runs the tests with **read-only** permissions,
uploads the gap-only report as an Actions artifact, then updates its previous bot
comment with the top findings and a link to the run. A manual
`workflow_dispatch` with the PR number is also supported. The workflow is
not a required gate and imposes no numerical coverage threshold. It becomes
available for PR comments once merged to the default branch.

Reviewers should start from the compact PR comment, inspect the gap-only JSON
artifact for the remaining locations, and design behavioral tests. A high
percentage alone does not establish that the assertions detect realistic bugs.

## Lesson and Course generation

The build-time CLI entrypoints are under `scripts/generateLessonProps/` and `scripts/generateCourseProps/`, each with its own tests. Lesson and Course publication modules live under `generators/{lessons,courses}/` with their unit tests. The shared textbook build invokes the named Engine CLIs without root-level generator wrappers. Build-time APIs belong to `@svitlo/engine/build`; `@svitlo/engine/runtime` remains free of Node filesystem and authored configurators.
