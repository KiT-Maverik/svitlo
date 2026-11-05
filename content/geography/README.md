# Geography textbook package

`@svitlo/geography` is a **platform-neutral textbook distribution**, not a Next.js application.
The canonical authoring sources are `data/skills/`; editorial documentation remains in `docs/`.
The currently authored taxonomy has **11 Domains**. No Lessons or React Scenes are
authored in this textbook yet, so no Scene registry, stylesheet or fabricated lesson JSON is
exported. Build and publish only resources that actually exist.

## Build and verify

From the repository root after `npm ci`:

```bash
npm run build --workspace @svitlo/geography
npm run typecheck --workspace @svitlo/geography
npm run test:publish --workspace @svitlo/geography
npm run test:portability --workspace @svitlo/geography
npm run test:locales --workspace @svitlo/geography
```

`build` generates localized JSON using the shared Engine-based Skills Analytics generator,
compiles `textbook.ts` to ESM and declarations, and writes `dist/manifest.json`.
Existing Skills, translations, UUIDs, review metadata and editorial documents are not rewritten.
The package exports only `@svitlo/geography` for compiled metadata. It does not require Next.js,
UI Kit providers, app-local TypeScript aliases or access to authored `*.data.ts` at runtime.

## Publish prebuilt resources

```bash
svitlo-geography publish --output /absolute/path/to/host/public
```

The public CLI is shipped in the npm package. It copies prebuilt
`dist/static/data/pages/skillAnalytics/<language>.json` into the host's public directory
and manages only its own `.svitlo/publish-geography.json` ownership manifest. Repeat runs clean
stale owned files without erasing unrelated host resources. Publication does **not** compile
TypeScript or regenerate Skills. The build also supports absent Lessons/Skills, including
metadata-only distribution. A host owns routing, locale selection, UI Kit assets,
Capacitor/Electron configuration and offline packaging.

The pre-migration localized landing-page copy is preserved in `data/homeCopy.ts` for eventual host consumption. Its locale coverage is verified with `test:locales`; the obsolete Next.js shell/browser E2E test was removed because route ownership now belongs to hosts.

