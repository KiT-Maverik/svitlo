# React Scene draft scaffolding

**Lesson workflow:** this is an optional create-only helper within [Lesson Stage 6.3 Implement and integrate Scenes](../../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md); the required implementation, registration and tests are governed by [Implement Scene](../../../../studio/skills/lesson-workflow/implement-scene.skill.md). Stage 6.1 still generates only `defineScene` Config/specification source, and Stage 6.2 completes strict typed Lesson resources. The helper alone never completes Stage 6.3.

An **opt-in, separate** Engine workflow for executable React Scene drafts. It reads
a single Lesson technical `lesson.yaml` (including nested Carousel/Quest Scenes)
and the authored `production.specification` belonging to each Scene's UUID.
Unlike `lessonBuilder`, this workflow **never** emits `defineScene` sources,
mutates Lesson files, runs Config validation, translates text, registers Scenes,
or publishes Props. The Lesson's colocated `specification.md` is the authoring
handoff; this workflow copies the same source specification into the executable
Scene directory so implementers can work at that location.

## Invocation

    node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml
    node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs generate --source content/<book>/staging/lesson.yaml --scene-id <scene-uuid>
    node shared/engine/scripts/sceneScaffolding/sceneScaffolding.mjs check --source content/<book>/staging/lesson.yaml
    node --test shared/engine/scripts/sceneScaffolding/sceneScaffolding.spec.mjs

`generate` is deterministic, create-only and logs `SKIP` whenever the Scene's
UUID directory already exists, including partially created or manually edited
trees. It never replaces a file. `check` verifies expected file presence only;
it does **not** compare human-completed implementation bytes to a draft template.
No discovery or generation occurs without an explicitly selected Lesson source.

New executable Scenes use the safe PascalCase component name from the authored
Scene slug; legacy `lightRayDiagram` becomes `LightRayDiagram`. The intended
separate configurator symbol convention is `LightRayDiagramConfig` (owned by
Lesson source generation). Identity and registry lookup **always** use the
original Scene UUID, not the filename/slug. Case-folding collisions are rejected.

The workflow requires an already Scene-enabled textbook with an exported
`./scenes` package entrypoint, generated lazy Scene registry tooling, TS+TSX
coverage, and React/UI Kit/Engine/Vitest dependencies. In particular, Math
currently lacks this support: enabling Math's Scene registry and package
exports is a **separate integration task**, not silently done here.

## Newly created files

    scenes/<last-scene-uuid-hex>/<scene-uuid>/
      index.ts                     (default export for lazy registry)
      specification.md             (authored source handoff)
      SceneName.tsx                (typed locales, intentionally unresolved implementation)
      SceneName.module.css
      SceneName.stories.tsx        (CSF-style story, intentionally unresolved source-locale fixture)
      SceneName.spec.tsx           (Vitest pending tests, no fake assertions)
      SceneName.constants.ts      (testIds ONLY; never ARIA copy)

All TS/TSX scaffolds parse; incomplete TSX deliberately references unresolved
`sceneImplementationRequired` and `sceneSourceLocaleRequired` symbols so missing
work is visible to TypeScript. This is **not** a successful typecheck or a
working Scene. Do not suppress those errors or inject errors into later human-
completed code. Do not fabricate locales, accessible names, animations, media,
interactions or test evidence.

After the specialist implements the approved Scene and source-locale content,
runs the package's component/type tests and completes accessibility review,
run the existing `content:generate:scenes` command in that textbook workspace
to update its lazy registry. No generator call is made automatically here.
Storybook discovery/configuration must be provided by the textbook as needed;
the CSF story uses React types without a new Storybook runtime dependency.

**Integration boundary:** The existing Lesson Builder still uses camelCase
folder slugs and currently exports raw Scene slug symbols. The separate agent
responsible for shared Lesson Builder emission must align its Scene-only
`safeSlug` and `*Config` export naming with this convention. This PR does not
change `lessonBuilder` or its source handoff behavior.
