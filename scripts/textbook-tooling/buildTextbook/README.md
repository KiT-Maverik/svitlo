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
