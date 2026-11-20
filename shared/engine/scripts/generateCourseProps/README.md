# Course Props generation CLI

`generateCourseProps.mjs` discovers authored Course configurators and writes compact publications to the textbook-owned `generated/courses/` directory. It supports `--write` and read-only `--check`.

```sh
npm run content:generate:course-props -- --package content/playground --write
npm run content:check:course-props -- --package content/playground --check
```

The Course publisher and its regression tests are in [`../../generators/courses/`](../../generators/courses/). CLI tests live alongside the CLI here. The textbook build in `scripts/textbook-tooling/buildTextbook/build.mjs` invokes this command directly rather than duplicating its behavior.

The publisher discovers both root-level legacy `*.data.ts` Courses and Stage 5 modular `data/courses/<bucket>/<uuid>/index.ts` roots (but never incomplete editorial `course.yaml`). A modular root may export the **raw** `authoredCourseOverrides` typed patch; the publisher passes it to `renderCourseFiles(..., { overrides })` so the existing Course Build API applies the patch and retains standalone Lesson UUIDs. Course contextual placement keys can differ from immutable standalone Lesson slugs. Sparse Lesson patches follow each placement, even for repeated Lesson references; an unpatched Course retains pure references.
