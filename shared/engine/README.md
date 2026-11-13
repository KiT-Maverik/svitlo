# Svitlo Engine

Engine publishes two distinct responsibilities:

- `@svitlo/engine/build` — Node/build-time authoring, `define*` factories, validation and publication.
- `@svitlo/engine/runtime` — framework-independent runtime assemblers, schemas, types and pure helpers.

Published JSON resources are assembled at runtime without loading authoring factories. Build may import runtime definitions; runtime must not import build factories, generators, `*.data.ts` or Node filesystem APIs.

Use `import { defineSkill } from '@svitlo/engine/build'` in authored textbook files and `import { assembleSkills } from '@svitlo/engine/runtime'` in applications. The shared app ESLint configuration rejects `/build` imports.

The browser graph check `node scripts/check-engine-runtime-graph.mjs` bundles `shared/engine/runtime.ts` for the browser, rejecting Node dependencies and build-only input modules. The Engine test script invokes this guard.

Migration from legacy root imports is provided by `node scripts/migrate-engine-entrypoints.mjs --write`, with `--check` for verification. The root export is temporarily retained in the in-progress Draft branch until all consumers are migrated; it must be removed before merging #474.
