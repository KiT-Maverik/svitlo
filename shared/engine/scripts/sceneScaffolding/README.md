# React Scene draft scaffolding — typed Lesson Stage 6.3

This optional, create-only helper reads a **materialized typed Lesson** at
`content/<book>/data/lessons/<bucket>/<lesson-uuid>/index.ts` and the existing
Stage 6.1 `sections/**/index.ts` `defineScene` Config source modules plus
their **colocated reviewed** `specification.md` files. It never reads
`lesson.yaml`, imports/executes authored TypeScript, modifies Lesson/Scene
Config source, registers an incomplete Scene or publishes Props.

The Lesson must already have the materialized `workflow.stage2.ts` archive,
`languages.ts` with one actual source language and a valid owned Sections tree.
The helper statically parses the Scene Config sources, preserving real UUID,
slug and reviewed specification; invalid TS, path traversal, symlinks, duplicate
IDs/names and missing specifications fail closed. An independently reviewed
Scene can also remain absent from the executable registry: generated files are
**drafts**, not Stage 6.3 acceptance.

## Invocation

```sh
node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/data/lessons/<bucket>/<UUID>/index.ts
node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/data/lessons/<bucket>/<UUID>/index.ts --scene-id <scene-uuid>
node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs check --source content/<book>/data/lessons/<bucket>/<UUID>/index.ts
node --test shared/engine/scripts/sceneScaffolding/sceneScaffolding.spec.mjs
```

The textbook must already expose `./scenes`, a real Scene registry generator,
TS/TSX, React, Engine, UI Kit and Vitest. The scaffold writes seven files
under `scenes/<scene-uuid-last-hex>/<scene-uuid>/`: `index.ts`,
`specification.md`, `SceneName.tsx`, `SceneName.constants.ts`,
`SceneName.module.css`, `SceneName.stories.tsx`, and `SceneName.spec.tsx`.
All TypeScript parses, but unfinished TSX intentionally contains unresolved
`sceneImplementationRequired` and `sceneSourceLocaleRequired` identifiers.
Human specialists complete them, implement accessibility and real interactions,
run tests and register Scenes in the owning textbook. Existing UUID directories
are skipped even if partially edited. `check` checks presence, not exact
post-edit template bytes. Neither mode invents translations, media or approvals.

See [Create Lesson Flow](../../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md)
and [Implement Scene](../../../../studio/skills/lesson-workflow/implement-scene.skill.md).
