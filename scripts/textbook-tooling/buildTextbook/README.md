# Portable Lesson media staging

Textbook builds stage **actual**, source-local Lesson media under their
existing `/textbooks/<book>/` namespace, without changing runtime Config/Props
schemas. This helper is called by `build.mjs` after existing `public/` and
`static/` copies, before writing `dist/manifest.json`.

Sources must be in the authored module's directory under
`data/lessons/<bucket>/<uuid>/sections|flashcards|questions/.../<slug>/`:

- Invariant primary: `<slug>.<ext>`
- Localized primary: `locale/<language>.<ext>`
- Video poster: `poster.<ext>`
- Localized video poster: `locale/<language>.poster.<ext>`

Allowed formats: image `svg/png/jpg/jpeg/webp/gif/avif`, video
`mp4/webm`, audio `mp3/wav/ogg/m4a/flac`, captions `vtt/srt`.
An adjacent `index.ts` is required. Only these files are copied to
`dist/static/textbooks/<book>/lessons/<bucket>/<uuid>/<module>/<file>`.
All URLs used in Lesson Props are determined by the build-only
`resolveLessonMedia(import.meta.url, kind, role, language?)` helper.

The existing `public/` and `static/` locations are still supported and
take precedence as owned resources: collisions fail instead of overwriting.
Pending media specifications, YAML, TS files, Markdown and Code source are
never staged as media. No downloads, fake assets or implicit translations.

Validation:

```sh
node --test scripts/textbook-tooling/buildTextbook/stageLessonMedia.spec.mjs
npm run package:build --workspace @svitlo/playground
```

## Textbook-local authored Lesson imports

Each textbook workspace (including `content/languages/*`) owns the same native
Node ESM package-import mapping in its `package.json`:

```json
"imports": {
  "#lessonsData/*": "./data/lessons/*.ts"
}
```

A deeply nested authored Configurator may import its own Lesson constants without
counting relative parent directories:

```ts
import { LessonLanguages } from '#lessonsData/f/<lesson-uuid>/constants';
```

Replace `f` with the UUID's final hex digit and `<lesson-uuid>` with the
actual Lesson UUID. The mapping is relative to the **importing textbook's**
package root, never another textbook. For another `index.ts` module use an
explicit `/index` suffix; the mapping appends `.ts` to the specifier.
Do not use this internal source alias from a host app or a published runtime
entrypoint, and do not add it as a public package export.

TypeScript's existing `moduleResolution: "bundler"` resolves `package.json`
`imports`; esbuild also resolves these `#` imports with
`packages: "external"`. The Engine Lesson Props loader bundles authored
TypeScript to executable Node CJS before evaluation. Node ESM resolves the
source URL natively, but unbundled Node 20 cannot execute `.ts` files directly.

Agent 5 (Issue #590): emit the exact
`#lessonsData/<bucket>/<uuid>/constants` specifier for Lesson Configurator
imports; keep all other Lesson Builder write/skip and publication boundaries
unchanged. The regression test
`lesson-import-alias.spec.mjs` synthesizes a deeply nested source in an
isolated temporary copy of **each** discovered textbook manifest and verifies
TypeScript, native Node ESM resolution, Engine-style Node/CJS bundling, and
textbook-style browser/ESM bundling. It does not generate or publish drafts.
