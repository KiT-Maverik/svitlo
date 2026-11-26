# Textbook-wide UUID media packaging

Every textbook stores physical files under `assets/images`, `assets/audio`,
`assets/video` or `assets/subtitles`, using a stable `UUID.extension`.
ContentBlocks reference these files by `locale.fileName` (or
`locale.posterFileName` for a Video poster), independently of the consuming
block's UUID. Runtime Props retain `src`, `fileLocation` and `poster` URLs.

`build.mjs` runs production media preflight before replacing outputs, and
copies the entire textbook `assets/` tree to
`dist/static/textbooks/<textbook>/assets/`. Missing referenced media makes
Production fail with aggregated diagnostics, without replacing an earlier
distribution. `SVITLO_MEDIA_MODE=draft` permits missing physical media with
warnings for preview, but not invalid Config or malformed UUID filenames.
Canonical Course, Lesson and assessment bank `draft.ts` roots are never materialized by this build. Draft mode runs the owning generator even for an editorial-only scope to avoid staging stale generated resources; production refuses unfinished roots. `dist/manifest.json` includes staged files; the existing portable publisher
owns cleanup of stale published paths.

Source-local `data/lessons/.../<slug>.<extension>` staging is retired.
Markdown, Code and executable Scenes remain separate.

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

## Independent assessment resource publication

When authored Lesson directories contain a `questions/index.ts` or `flashcards/index.ts`, the textbook build runs the Engine's independent `generateAssessmentResources` pipeline with `--kind all --write`. It copies the metadata-only manifest and individual localized Question/Flashcard JSON into `dist/static/data/questions/<bucket>/<questionId>/` and `dist/static/data/flashcards/<bucket>/<flashcardId>/`; a single textbook-scoped `dist/static/data/assessments/manifest.json` indexes all UUIDs. Every resource is included in `dist/manifest.json`, so the existing portable publish CLI can install/remove it without additional host paths. No resource is generated for a textbook without authored banks; copied paths are checked for collisions. **Production now also validates actual generated Section references** with `verifyAssessmentSelections`: every explicit Quiz candidate Question UUID and Flashcards Section Flashcard UUID must resolve via the textbook manifest, matching kind, generated `base.json`, effective Lesson languages and complete real locale files. A selected Question may originate from another Lesson; its `ownerLessonId` is provenance, not a selection restriction. Missing manifests or selected bank files fail the production build before the distribution is replaced. See [the post-generation reference check](../verifyAssessmentSelections/README.md). It does not certify independent pedagogical or translation approvals. Historical Lesson YAML requires separately authorized, non-destructive migration to the typed editorial source; this build does not perform that migration.

## Derived Course navigation

The existing Course Props generator also creates `generated/courses/<uuid>/toc/base.json`
and sparse `toc/<language>.json` fragments. `build.mjs` copies the complete generated
Course tree into `dist/static/data/courses` and lists every TOC file in
`dist/manifest.json`; the portable Publish CLI transfers and removes stale
manifest-owned TOC paths exactly as other Course JSON. Web hosts read this derived
navigation resource without loading each standalone Lesson. It is not an authored
entity or a second generation workflow.
