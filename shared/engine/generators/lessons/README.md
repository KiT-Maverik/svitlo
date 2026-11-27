# Lesson Data serializer

`generateLessonProps.utils.ts` serializes completed Lesson `build.data()` results into canonical `<uuid-last-digit>/<uuid>/base.json` and nonempty per-language Data-shaped JSON. It neither resolves authored configs nor interprets localized content. Completed Lesson Data retains ordered `children` with direct slug-keyed Section Data; the serializer does not reconstruct legacy `section[]` arrays.

The Engine-owned CLI and its regression tests live in [`../../scripts/generateLessonProps/`](../../scripts/generateLessonProps/). The TypeScript serializer and its tests live here. Textbook packaging stages the produced files; runtime assemblers never import this build-time module.

Run `npm test --workspace @svitlo/engine` for regression coverage.
