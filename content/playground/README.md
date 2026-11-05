# Playground textbook package

`@svitlo/playground` is one platform-neutral React DOM textbook distribution.
Its source tree owns authored content, the static lazy Scene registry and book media;
its **compiled** npm package contains only runtime JavaScript, TypeScript declarations,
Scene CSS, localized JSON and prebuilt assets. No host imports authored `*.data.ts`.

## Build and consume

From the monorepo root (after `npm ci`):

```bash
npm run check:scenes --workspace @svitlo/playground
npm run build --workspace @svitlo/playground
npm run typecheck --workspace @svitlo/playground
npm run test:portability --workspace @svitlo/playground
npm run test:publish --workspace @svitlo/playground
```

The build runs the existing shared Engine-based Lesson and Skills Analytics
generators, emits ESM + declarations with esbuild/TypeScript, and packages CSS
Modules from lazy Scene chunks. It produces:

```text
dist/
  textbook/index.js, index.d.ts, questionsDemo.js, questionsDemo.d.ts
  scenes/index.js, index.d.ts, sceneLoader.d.ts
  chunks/*                 # statically analyzable lazy Scenes
  styles.css               # public stylesheet referencing Scene CSS bundles
  static/data/pages/lessons/<uuid-bucket>/<uuid>/{config,questions,flashcards}/<lang>.json
  static/data/pages/skillAnalytics/<lang>.json
  static/textbooks/playground/*  # textbook-owned public media (when present)
  manifest.json            # source of truth for owned resources
```

The package exports `@svitlo/playground` (`textbook`),
`@svitlo/playground/scenes` (`resolveScene`),
`@svitlo/playground/demo-questions` and
`@svitlo/playground/styles`. Host code should import the compiled
exports, include the stylesheet once in its application shell, and supply the
shared UI Kit runtime dependencies (React, React DOM, MUI and their peers).

## Publish prebuilt static resources

```bash
npm exec --workspace @svitlo/web -- svitlo-playground publish --output public
```

Run from the Web workspace (or supply an **absolute** output path to avoid
workspace-cwd ambiguity). Any other React DOM host can invoke the same executable
through its installed npm dependency. `publish` only copies already-built
`dist/static` files into the requested output root; it does not regenerate
content or compile code. It preserves resource URLs, validates paths and writes
`.svitlo/publish-playground.json` to track only Playground-owned files for
safe stale-file cleanup. It leaves UI Kit flags, UI Kit translations, host favicons,
Electron icons and Capacitor assets alone.

Book resources use `/data/pages/lessons`,
`/data/pages/skillAnalytics` and `/textbooks/playground`.
UI Kit global message JSON and SVG flags remain host-staged from the UI Kit package.

The pack/React DOM portability harness creates a real npm tarball, extracts it
into an isolated consumer, and bundles its compiled exports with esbuild without
textbook source aliases or a Next.js compiler. Web uses the same package API
in `apps/web/scripts/prepare-textbook.mjs` while selecting a textbook at build time.

This does not yet prove real Electron/Capacitor device behavior or offline chunk
precaching. Those hosts must package their own browser chunks and assets, then
verify a cold offline launch and device-specific accessibility.
