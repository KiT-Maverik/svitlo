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
  textbook/index.js, index.d.ts
  scenes/index.js, index.d.ts, sceneLoader.d.ts
  chunks/*                 # statically analyzable lazy Scenes
  styles.css               # public stylesheet referencing Scene CSS bundles
  static/data/pages/lessons/<uuid-bucket>/<uuid>/{config,questions,flashcards}/<lang>.json
  static/data/pages/skillAnalytics/<lang>.json
  static/textbooks/playground/*  # textbook-owned public media (when present)
  manifest.json            # source of truth for owned resources
```

The package exports `@svitlo/playground` (`textbook`),
`@svitlo/playground/scenes` (`resolveScene`) and
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

Book-owned media may be placed in `static/` (for example
`static/whale.png`, `static/barabaka.mp4`, `static/demo-tone.wav`) or
`public/`. The textbook build stages them under
`dist/static/textbooks/playground/`, and the Publish CLI makes them available
at `/textbooks/playground/<filename>`. An identical path in both source folders
is rejected instead of silently overwritten. YouTube embeds require external
connectivity; the other gallery media are distributed with the package.

Book resources use `/data/pages/lessons`,
`/data/pages/skillAnalytics` and `/textbooks/playground`.
UI Kit global message JSON and SVG flags remain host-staged from the UI Kit package.

The pack/React DOM portability harness creates a real npm tarball, extracts it
into an isolated consumer, and bundles its compiled exports with esbuild without
textbook source aliases or a Next.js compiler. Web (`apps/web`), Electron
(`apps/desktop`) and Capacitor (`apps/mobile`) build the selected package,
run its Publish CLI for book-owned JSON/media, import its compiled Scene
registry and stylesheet, and stage UI Kit translations/flags independently.

Build/bundle tests do not alone prove all installed Electron/Capacitor devices
work, or that the Web host precaches lazy chunks. Offline content packaging and
real-device accessibility/launch checks remain host-specific release gates.

## Playground Course integration example

The Playground textbook now also authors a demo Course in
`data/courses/playgroundLightCourse.data.ts` with two lightweight Lesson copies,
a Module, a Chapter, a narrative Episode, and a course-local section reorder
for the existing `howLightMoves` Lesson. The Lesson's canonical files and
Definition are not modified. The Course-only override also inserts a
`contentBlockGallery` Section that exercises all ten supported ContentBlock
renderers: text, Markdown, code, image, carousel, video, audio, YouTube, Scene and checkpoint.
The standalone Lesson retains its original three Sections.

The shared build pipeline automatically emits **separate** Course resources:

```text
dist/static/data/pages/courses/30ecbde1-97fd-5fe7-a353-ea89b9ef4a67/
  toc/<language>.json
  overrides/d3048d21-8690-5255-b62c-984c69ac272c/<language>.json
  episodes/9f417177-1d07-5a9d-ad74-0146c5637e84/<language>.json
```

The published TOC provides the navigation tree. The override resource
contains only changed fields and slug-keyed ordering operations, and is
applied **only** in the Course context. Episode resources are separate from
the Lesson content. All three are included in `dist/manifest.json` and
published by the existing `svitlo-playground publish` CLI.

Open:

- `/uk/course/30ecbde1-97fd-5fe7-a353-ea89b9ef4a67` — Course TOC
- `/uk/course/30ecbde1-97fd-5fe7-a353-ea89b9ef4a67/lesson/d3048d21-8690-5255-b62c-984c69ac272c` — overridden Lesson
- `/uk/course/30ecbde1-97fd-5fe7-a353-ea89b9ef4a67/episode/9f417177-1d07-5a9d-ad74-0146c5637e84` — Lorem Ipsum Episode

The existing standalone Lesson URL remains unchanged. This is a
test-only content arrangement, not a production learning program.
