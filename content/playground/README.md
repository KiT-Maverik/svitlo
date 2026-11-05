# Playground textbook

`@svitlo/playground` owns the authored How Light Moves lesson, demonstration Skills,
interactive React Scenes, static Scene registry, and published textbook resources.
It has no Next.js routes or standalone server. `apps/web` hosts the textbook.

Authored content lives in `data/`. The Web build runs the existing generators
against this package, then publishes its JSON and assets into the selected
Web build. Runtime code imports `@svitlo/playground/scenes`, never authored
`*.data.ts` modules.

```bash
npm run generate:scenes --workspace @svitlo/playground
npm run check:scenes --workspace @svitlo/playground
npm run typecheck --workspace @svitlo/playground
SVITLO_TEXTBOOK=playground npm run build --workspace @svitlo/web
```
