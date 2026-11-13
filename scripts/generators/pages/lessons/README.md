# Props-shaped Lesson publication

This is the new build-time pipeline for `defineLesson` configurators. It publishes completed Lesson Props into a build-only staging directory; the
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
`resolveEntityPath`. A locale file is written only when `build.props()`
returns a nonempty locale body for that language. Locale files contain the
already Props-shaped object directly. The generator does not unwrap, wrap,
merge, reorder or reinterpret authored content.

The CLI discovers one Lesson exported from each `*.data.ts` or `index.ts`
in `data/lessons/<bucket>/<uuid>/`. Editorial-only Lesson directories are
ignored. A source that is still a legacy Lesson creator is reported as an
unsupported Build API instead of being silently skipped.

All IDs are checked for uniqueness across textbook Lesson source directories,
including editorial-only drafts, before any output is written. It then builds
all Lessons with their configured publication languages, checks their source
IDs and Props IDs match the folder UUID, and serializes the complete batch.
Repeated regeneration of the **same** Lesson is permitted; duplicate source
IDs are not. The output tree is swapped atomically, removing stale JSON. The
check command compares exact expected bytes and reports changed and stale
files without writing.

The host copies the published files into `public/data/lessons` and the
runtime assembler consumes one base file plus the selected locale file.
