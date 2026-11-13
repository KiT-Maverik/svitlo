# Playground textbook package

`@svitlo/playground` is one platform-neutral React DOM textbook distribution.
Its source tree owns authored content, the static lazy Scene registry and book media;
its **compiled** npm package contains only runtime JavaScript, TypeScript declarations,
Scene CSS, localized JSON and prebuilt assets. No host imports authored `*.data.ts`.

## Build and consume

From the monorepo root (after `npm ci`):

```bash
npm run content:check:scenes --workspace @svitlo/playground
npm run package:build --workspace @svitlo/playground
npm run code:check:types --workspace @svitlo/playground
npm run test:portability --workspace @svitlo/playground
npm run test:publish --workspace @svitlo/playground
```

The build invokes the new stateless Skill/Lesson/Course Build API generators,
stages generated JSON from `generated/` into portable `dist/static/data/`,
emits ESM + declarations with esbuild/TypeScript, and packages CSS Modules from lazy Scene chunks. It produces:

```text
dist/
  textbook/index.js, index.d.ts
  scenes/index.js, index.d.ts, sceneLoader.d.ts
  chunks/*                 # statically analyzable lazy Scenes
  styles.css               # public stylesheet referencing Scene CSS bundles
  static/data/lessons/<uuid-bucket>/<uuid>/{base,<language>}.json
  static/data/skills/{base,<language>}.json # one full taxonomy tree per file
  static/data/courses/<course-uuid>/{base,<language>}.json
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

Book resources use `/data/lessons`, `/data/courses`, `/data/skills` (one base
and optional localized Skill tree per language) and `/textbooks/playground`.
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

The Playground Course is authored with `defineCourse`, `defineModule` and
`defineChapter`. Each of their `content` collections uses slug-keyed
`items` plus `order`. The Course publisher emits a compact nested
`content: { items, order }` hierarchy, storing Lesson UUID references and
only Course-owned sparse Lesson overrides. No complete nested Lesson Props
or legacy TOC/Episode files are published.

Generated Course and Lesson data are independently staged in
`content/playground/generated/`, then packaged under:

```text
dist/static/data/courses/<course-uuid>/{base,<language>}.json
dist/static/data/lessons/<bucket>/<lesson-uuid>/{base,<language>}.json
```

The Course-context Lesson assembler resolves the selected Lesson base and
locale first, then applies Course invariant and selected-locale overrides.
Ordinary Props arrays remain atomic; Course hierarchy uses keyed objects so
a translated Chapter need not duplicate sibling Modules or Lessons.
