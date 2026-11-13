# Lesson Props serializer

`generateLessonProps.utils.ts` serializes completed Lesson `build.props()` results into canonical `<uuid-last-digit>/<uuid>/base.json` and nonempty per-language Props-shaped JSON. It neither resolves authored configs nor interprets localized content.

The Engine-owned CLI and its regression tests live in [`../../scripts/generateLessonProps/`](../../scripts/generateLessonProps/). The TypeScript serializer and its tests live here. Textbook packaging stages the produced files; runtime assemblers never import this build-time module.

Run `npm test --workspace @svitlo/engine` for regression coverage.
