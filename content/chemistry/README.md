# Хімія — platform-neutral Svitlo textbook

`@svitlo/chemistry` is a compiled textbook npm distribution. Keep existing authored `data/skills`, UUIDs, translations, review metadata and `docs/` unchanged. There are currently **no authored lessons or React Scenes**; this migration does not invent either.

## Build and verify

From the repository root after `npm ci`:

```bash
npm run package:build --workspace @svitlo/chemistry
npm run code:check:types --workspace @svitlo/chemistry
npm run test:publish --workspace @svitlo/chemistry
npm run test:portability --workspace @svitlo/chemistry
```

The build compiles ESM metadata and a safe empty Scene registry with declaration files, then runs the existing Engine Skills Analytics generator for **actual** authored taxonomy. Localized JSON lives at `dist/static/data/pages/skillAnalytics/<language>.json`, with ownership tracked in `dist/manifest.json`. Genuine future Lessons use `dist/static/data/pages/lessons/` through the existing generator. No runtime import of authored `*.data.ts` is allowed. Scene CSS is omitted until real Scenes exist.

## Consume

A React DOM host imports `textbook` from `@svitlo/chemistry`, and optionally `resolveScene` from `@svitlo/chemistry/scenes` (returns `undefined` until book Scenes exist). Hosts, not the textbook, own routing and UI Kit global assets. Only the generated `dist/` and CLI ship in `npm pack`.

Run `svitlo-chemistry publish --output <directory>` from an installed consumer (or use an absolute directory). The CLI reads **prebuilt** `dist/static` and never recompiles or regenerates content; its `.svitlo/publish-chemistry.json` record allows repeatable, book-scoped stale cleanup. Empty static manifests are valid for metadata-only textbooks. The portability test builds an isolated tarball consumer without Next.js, source aliases or authored files.
