# Course Props generation CLI

`generateCourseProps.mjs` discovers authored Course configurators and writes compact publications to the textbook-owned `generated/courses/` directory. It supports `--write` and read-only `--check`.

```sh
npm run content:generate:course-props -- --package content/playground --write
npm run content:check:course-props -- --package content/playground --check
```

The Course publisher and its regression tests are in [`../../generators/courses/`](../../generators/courses/). CLI tests live alongside the CLI here. The textbook build in `scripts/textbook-tooling/buildTextbook/build.mjs` invokes this command directly rather than duplicating its behavior.
