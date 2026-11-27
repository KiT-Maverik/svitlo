# Data-shaped Lesson publication

This is the new build-time pipeline for `defineLesson` configurators. It publishes completed Lesson Data into a build-only staging directory; the
textbook packaging script is responsible for final public resource paths.

## Run

After building the Engine workspace:

```sh
npm run package:build -w @svitlo/engine
npm run content:generate:lesson-props -- --package content/playground --write
npm run content:check:lesson-props -- --package content/playground --check
```

The default output root is
`content/<textbook>/generated/lessons/`. An explicit `--output`
may select another directory beneath the same textbook's `generated/`.
These files are inputs to textbook packaging, not an application public URL.

Each built Lesson produces:

```text
<bucket>/<uuid>/base.json
<bucket>/<uuid>/<language>.json
```

The bucket is the final hexadecimal digit of the canonical UUID, computed by
`resolveEntityPath`. A locale file is written only when `build.data()`
returns a nonempty locale body for that language. Locale files contain the
already Data-shaped object directly. The generator does not unwrap, wrap,
merge, reorder or reinterpret authored content.

The CLI discovers one Lesson exported from each `*.data.ts` or `index.ts`
in `data/lessons/<bucket>/<uuid>/`. Canonical `draft.ts` files are never loaded by discovery. Draft mode excludes those editorial-only roots, including a scope containing only editorial drafts; strict production rejects them. Conflicting draft and materialized entrypoints fail in both modes. Other Lesson directories without a supported entrypoint are ignored. A source that is still a legacy Lesson creator is reported as an
unsupported Build API instead of being silently skipped.

All IDs are checked for uniqueness across textbook Lesson source directories,
including editorial-only drafts, before any output is written. It then builds
all Lessons with their configured publication languages and the CLI's explicit draft/production mode, checks their source
IDs and Data IDs match the folder UUID, and serializes the complete batch.
Repeated regeneration of the **same** Lesson is permitted; duplicate source
IDs are not. The output tree is swapped atomically, removing stale JSON. The
check command compares exact expected bytes and reports changed and stale
files without writing.

The host copies the published files into `public/data/lessons` and the
runtime assembler consumes one base file plus the selected locale file.

The CLI and its regression tests live in this named directory. The Data serializer and its tests live in [`../../generators/lessons/`](../../generators/lessons/).

## Independent assessments

A separate Engine CLI at [`../generateAssessmentResources/`](../generateAssessmentResources/) publishes already-authored Question/Flashcard configurators into UUID-addressed files and metadata-only manifests. The textbook build stages those files beside `data/lessons/<bucket>/<uuid>/base.json`, rather than embedding them in Lesson JSON. The Lesson Data generator and this CLI are distinct workflows; neither creates or modifies editorial bank drafts.
