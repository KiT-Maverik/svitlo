# Svitlo Engine

`@svitlo/engine` contains framework-independent entity configurators, localization and publication utilities, validation, and Assessment Method data. Shared content contracts live in `@svitlo/contracts`.

## Source layout

- `lessons/` contains the existing Lesson, Section, and ContentBlock creators and publication helpers.
- `configurators/` contains the schema-backed `define*` factories (including the simplified Skill and Assessment Method configurators).
- `configurators_old/` contains legacy Course/Module/Chapter/Episode builders, kept during migration.
- `utils/` contains language and publishing utilities; `data/` contains Assessment Method data; `types/` contains internal projection helpers such as `DeepPartial`.
- Shared language types and the locale catalog live in `@svitlo/contracts`.

`index.ts` is the sole public import entrypoint: `@svitlo/engine`. Browser and React Server conditions use `runtime.ts` to exclude Node-only publication utilities, while Node authoring scripts use `index.ts`.

Lesson creators publish invariant base resources and language-specific locale patches; consumers combine them to assemble responses. See [Lesson](../../studio/docs/entities/lesson.md).

Internal aliases are configured in `tsconfig.json` and `package.json`.

## On-demand coverage for coding agents

`npm run test:coverage --workspace @svitlo/engine` executes the Engine's existing
`node --test` suites with source-map-aware Node coverage and writes two files under
`shared/engine/.coverage-engine/`: `engine-gaps.md` (short review) and
`engine-gaps.json` (machine-readable missing lines, branches and functions).
Neither output lists fully covered source files. The temporary raw LCOV is not
uploaded to the PR. Run the Contracts and Engine package builds before this command.

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
