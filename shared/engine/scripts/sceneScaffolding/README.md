# React Scene Draft scaffolding

This is an **opt-in, create-only** executable Scene handoff. It does not
implement the educational Scene, translate content, publish Props, validate
editorial approval or modify authored Lesson/Course Config. The Scene's own
immutable UUID and production.specification are the source of truth.

## Source contract

Supply an explicitly selected YAML source under content/<book>/:

- a Scene-owned scene.yaml containing a {config, production} node,
- a standalone Lesson lesson.yaml with nested {config, production} Scene nodes,
- a Course course.yaml containing Episodes and nested Scenes, including
  unwrapped Engine Config-shaped Scene nodes with a production sibling.

The root must declare production.documentLanguage or documentLanguage, or
the caller must explicitly supply --document-language. A conflicting CLI
language is rejected. Nested Carousel/Quest Scenes are discovered recursively.
Each Scene must have its own config.id, config.slug, and nonempty
production.specification. Missing specifications are explicit blockers,
never fabricated. The Course/Engine source is not copied or overwritten.

## Invocation

    node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/data/.../scene.yaml
    node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/data/.../lesson.yaml --scene-id <scene-uuid>
    node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/data/.../course.yaml
    node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs check --source content/<book>/data/.../course.yaml
    node --test shared/engine/scripts/sceneScaffolding/sceneScaffolding.spec.mjs

The generator accepts no implicit source or textbook selection. Textbooks
without React, UI Kit, Engine, TSX, the exported ./scenes entry, and the
canonical registry are rejected with a Scene-ready diagnostic; Math is not
implicitly Scene-enabled.

## Created layout

    scenes/<last-uuid-hex>/<scene-uuid>/
      index.ts
      specification.md
      SceneName.tsx
      SceneName.module.css
      SceneName.constants.ts
      SceneName.stories.tsx
      SceneName.spec.tsx

SceneName is deterministically PascalCased from the existing slug; lookup
always uses the UUID. The .tsx is a real lazy-registry-compatible React
component that displays the accessible UI Kit SceneStub, with a visible
TODO (BLOCKER): Implement Scene marker. The story uses an empty Draft-only
locale object, not fake translation. The generated test asserts the real
placeholder status and leaves implementation tests pending.

Every existing Scene UUID directory is SKIP, even if partial or edited. Never
replace an authored specification, implementation, story, or test. The
existing scripts/textbook-tooling/generateScenes/generate-scenes.mjs workflow
is called in generate mode and immediately checked; check mode verifies files
and registry without writing. The registry remains the existing lazy-import
format; unrelated builds do not opportunistically re-register Scenes.

SceneStub is **Draft-only preview UI** exported as SceneStub from
@svitlo/ui-kit. Production imports of SceneStub must be prohibited by the
separate Agent G lint work. A completed Scene must replace the stub in place,
author true source-language content, implement real interactions and satisfy
the Implement Scene skill's accessibility/QA gates. A passing scaffold or
typecheck is never proof that a Scene is complete.

See the Implement Scene skill and the Engine scripts AGENTS.md for boundaries.
