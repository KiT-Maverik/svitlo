# Compact Course resource publisher

`publish-course-data.mjs` is the new Course-configurator publication entrypoint.
It is separate from the legacy `scripts/generators/pages/courses/generate-courses.mjs`
publisher; this change does not switch existing textbook runtime routes.

The build-time caller passes the result of `defineCourse` and, optionally, the
Course-owned authoring patch accepted by `course.build.overrides`. No standalone
Lesson resource is built into the resulting Course files.

```js
import { publishCourse } from './publish-course-data.mjs';

// course: defineCourse(...)
// courseOverrides: optional nested Course_Overrides authoring patch
publishCourse(course, {
  packageRoot: '/absolute/path/to/content/playground',
  // outputRoot: '/absolute/path/to/content/playground/dist/static/data/courses',
  // Pass outputRoot instead of packageRoot to publish directly to a packed build.
  overrides: courseOverrides,
  // languages: ['uk', 'en'], // default: Course-supported languages
  // check: true,             // compare, never write
});
```

Output is `<textbook>/public/data/courses/<course-uuid>/base.json` and
`<language>.json` only for languages that actually change the published Props.
When `outputRoot` is provided, the files are instead written directly to
`<outputRoot>/<course-uuid>/` (for example, the compiled textbook's
`dist/static/data/courses/`). This directory is a generated output, not
an authored resource or a runtime import.

The Course root, Modules and Chapters carry their full Props-shaped metadata
and their ordered `content` arrays. Each Lesson appears only as
`{ "type": "lesson", "id": "<uuid>" }`, with an optional `overrides` field
containing the **already-built sparse Lesson override Props**. Course-specific
Lesson patches are _not_ applied to the standalone Lesson's published resources.

The locale patch is Props-shaped and has **no extra locale wrapper**. Objects
merge by key, and arrays replace atomically. If a localized Module/Chapter or
Lesson override changes a nested array entry, that locale file necessarily
includes the **whole effective array** with invariant siblings and base
overrides intact. Consumers must merge base then the selected locale, treating
published arrays as replacements; they must not merge arrays by index.

Course/Module/Chapter and Lesson config validation and override resolution
remain owned by their existing `build.props` / `build.overrides` methods.
The output is intentionally a _compact Course resource_, **not** a standalone
`course_Props_Schema` object: Lesson leaves are references to separately
published Lesson Props. The future Course assembler must resolve those Lesson
IDs and apply these sparse patches after the Lesson's own locale assembly.

`publishCourse` writes only this UUID's directory using a staging directory,
removes stale files from that directory, preserves other Course directories and
unrelated public files, and supports read-only `check` mode.

Tests: `node --test scripts/generators/data/publish-course-data.spec.mjs`.
