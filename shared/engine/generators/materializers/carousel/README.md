# Agent D materializer workstream — carousel

**Status:** Assignment and integration contract only; no implementation is present in this bootstrap commit.

## Owned kinds

- `carousel` -> `shared/engine/generators/materializers/carousel/`
- `checkpoint` -> `shared/engine/generators/materializers/checkpoint/`
- `checkpointItem` -> `shared/engine/generators/materializers/checkpointItem/`
- `checkpointAnswer` -> `shared/engine/generators/materializers/checkpointAnswer/`
- `scene` -> `shared/engine/generators/materializers/scene/`

## Work to implement

Compound ContentBlocks and Scene. Carousel delegates its Image/Scene slides to their actual materializers, Checkpoint delegates nested Item/Answer and supported ContentBlocks. For Scene retain specification/registry/SceneStub behavior without modifying UI Kit or Scene runtime; avoid an invented standalone CarouselSlide Configurator.

## Mandatory historical behavior audit

Read the **actual** existing YAML -> TypeScript implementation on branch `integration/unified-yaml-materialization-preview` (parent PR #769; agent PR #772):
- `shared/engine/scripts/yamlScaffolding/recursiveMaterializer.mjs`
- `shared/engine/scripts/yamlScaffolding/recursiveMaterializer.spec.mjs`
- `shared/engine/scripts/yamlScaffolding/yamlScaffolding.mjs`
- `shared/engine/scripts/yamlScaffolding/productionScaffolding.mjs`
- `shared/engine/scripts/yamlScaffolding/README.md`
Also inspect current develop `materializeCourseFlow`, `lessonBuilder`, `questionsBuilder`, `flashcardBuilder` only for the applicable kinds and relevant actual configurator/Zod/test contracts. **Do not import the YAML materializer or move YAML dependencies into the new source materializer.**

For **each assigned kind**, explicitly map and port applicable existing behaviors: exact factory selection and type-specific TS generics; slug-based variable/export names and stable nested imports; correct child-boundary paths and ordered collections; locale-source pruning and planned-language TODOs; location-qualified validation; TODO (BLOCKER) placement and pending semantics; external Markdown/Code text readers; source/specification sidecars; nil-UUID reserved media placeholders (never real assets); Scene/assessment pending safeguards; correct handling of special source values/expressions; no loss of authored values; syntactically valid emitted TS; deterministic, create-only behavior. Some cases do not apply to every kind; record N/A where appropriate. Also fix observed defects rather than duplicating them and add regression tests.

## Independence and collaboration

- Base/head ancestry: target `architecture/typed-production-materializers` (parent Draft PR #775), not `develop` or #769. All five agents work on branches created from the same parent head.
- All implementations belong under `shared/engine/generators/materializers/<concreteKind>/`, one folder per concrete kind. Your branch owns only its assigned folders. Keep tests adjacent to each concrete kind. **Do not edit shared indexes, `package.json`, tsconfig, Studio, rules, production contracts, global generator helpers, UUID/path/writer code, original Configurators, existing YAML scripts or another agent's folders.** Integration of exports, entrypoints, production types, shared primitives and workflows belongs to parent #775.
- Input is **already-authored, typed, plain Config object data** plus separate production metadata, not a `define*` Configurator and not a YAML document. Final Config may be incomplete during staged authoring; do not weaken real Config/Zod validators. Emit authored TypeScript/TSX/Markdown modules and sidecars, **not published JSON/Props**. Never add `build.files` to a Configurator.
- Each kind's materializer should be simple, explicit and standalone; duplication is preferable to generic factories/registries/base classes, complex AST abstractions or cross-sibling coupling. A parent delegates to its child's materializer and never reimplements child logic. Avoid circular imports; if a child kind belongs to another agent, produce a narrow delegation boundary and test it with a fixture/test double rather than implementing that sibling.
- The parent will implement canonical derived Production stage types and any minimal shared UUID/path/file writer contract. **Do not invent competing canonical shared types**; use local types derived from real `*_Config` where possible, and list any requested parent exports/contracts in your PR. Coordinate the final function signature through #775; keep self-contained tests passing now and state explicitly which integration checks remain pending.
- Respect `shared/engine/generators/AGENTS.md` as the existing JSON publication guidance; it currently assumes generators only serialize Props. Source materializers are intentionally distinct, and parent #775 must update that instruction to distinguish them. Do not change it in this subtask.
- Protect invariant IDs, explicit source identity, human-edited files and real localization/asset validation. Do not suppress TypeScript diagnostics with `as any` or `@ts-ignore`. No invented approved content or silently fabricated translations.

## Required evidence

Implement all owned kinds with adjacent unit tests and a cross-nesting fixture when relevant. Demonstrate exact generated module paths, imports/exports, immutable identifiers, source-language behavior, TODO blockages, warnings/errors, deterministic re-runs, and no-clobber behavior. Run the actual applicable tests/types/format where possible and report commands and results. Distinguish unit tests that passed from parent integration tests that cannot yet run because the shared Production API is still being authored. Keep the PR in Draft; do not merge without the project owner's instruction.
