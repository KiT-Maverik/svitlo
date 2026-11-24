# React Scene draft scaffolding — Lesson Stage 6.1

The **trusted Lesson Stage 6.1 materializer now creates the executable Scene draft** alongside its nested `defineScene` Config, in the same SHA-pinned, atomic, no-clobber Git commit. Each authored Scene receives six files under `content/<book>/scenes/<uuid-last-hex>/<uuid>/`: `index.ts`, `SceneName.tsx`, `SceneName.module.css`, `SceneName.constants.ts`, `SceneName.stories.tsx`, `SceneName.unit.spec.tsx`. No duplicate `specification.md` is created for a Scene: its complete reviewed Stage 2 `production.specification` is preserved as a safe, removable line-comment block inside `SceneName.tsx`.

Every file has an actionable `TODO (BLOCKER)` until Stage 6.3 specialists implement the behavior, responsive styling, real test IDs, meaningful Storybook fixtures and substantive unit tests. The stub is valid TypeScript/TSX with inert `aria-hidden` output, **not an implemented or registered Scene**. No fabricated translations, media, placeholders with unresolved symbols or registry edits are allowed. Completion and source-language/accessibility/RTL/offline testing remain Stage 6.3 obligations.

This legacy create-only helper reuses the **same compiled Engine renderSceneFiles template**; it exists for historic materialized Lessons and for checking Stage 6.1 file presence without overwriting edits. A new Lesson does not need an additional CLI generate command. It statically reads `index.ts`, `constants.ts` (or exclusively legacy `languages.ts`) and the nested `defineScene` sources (never executes authored code). Historic inputs can still provide a colocated Scene `specification.md` for manual generation. New inputs already contain the Scene draft directories and need only `check`.

## Invocation

Build Engine before invoking the shared compiled templates:

```sh
npm run package:build --workspace @svitlo/engine
node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs check --source content/<book>/data/lessons/<bucket>/<UUID>/index.ts
# For a historical materialization with a reviewed colocated specification.md only:
node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/data/lessons/<bucket>/<UUID>/index.ts
node --test shared/engine/scripts/sceneScaffolding/sceneScaffolding.spec.mjs
```

The textbook must already expose `./scenes`, a Scene registry and TS/TSX/React/Engine/UI Kit/Vitest support. Existing UUID directories are never overwritten, even when incomplete. Validation rejects symlinks, unsafe paths, wrong UUID buckets, duplicate IDs and missing reviewed specs on legacy generation. The trusted Stage 6.1 publisher rejects partial six-file scaffolds and unrelated textbook paths. The runtime Scene registry must never be generated or updated to include unfinished Scenes.

See [Create Lesson Flow](../../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md) and [Implement Scene](../../../../studio/skills/lesson-workflow/implement-scene.skill.md).
