# Course Data generation CLI

`generateCourseProps.mjs` discovers authored Course configurators and writes compact publications to the textbook-owned `generated/courses/` directory. It supports `--write`, read-only `--check` and `--preflight`. Canonical `draft.ts` files are never loaded by discovery. Draft mode (`--draft`) excludes those editorial-only roots; strict production rejects them. Conflicting draft and materialized entrypoints fail in both modes.

```sh
npm run content:generate:course-props -- --package content/playground --write
npm run content:check:course-props -- --package content/playground --check
```

The Course publisher and its regression tests are in [`../../generators/courses/`](../../generators/courses/). CLI tests live alongside the CLI here. The textbook build in `scripts/textbook-tooling/buildTextbook/build.mjs` invokes this command directly rather than duplicating its behavior.

The publisher discovers both root-level legacy `*.data.ts` Courses and Stage 5 modular `data/courses/<bucket>/<uuid>/index.ts` roots. Reused Lessons are imported as original Configurators and an optional plain authored patch is attached immediately inside the owning direct placement slot via `placeLesson(source, rawPatch)`. The compiler calls the Lesson's actual stateless Build API for each placement. The CLI **rejects** a legacy `authoredCourseOverrides` export instead of silently dropping adaptations; migrate every one to its own placement first. Contextual keys may differ from immutable standalone Lesson slugs. Published Course resources retain original Lesson UUIDs, contextual keys and only sparse validated override Data.
