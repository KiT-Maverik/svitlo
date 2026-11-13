# Compact Course resource publisher

`publishCourseData.mjs` publishes compact Course resources built from the new stateless Configurator API.

The build-time caller passes the result of `defineCourse` and, optionally, the
Course-owned authoring patch accepted by `course.build.overrides`. No standalone
Lesson resource is built into the resulting Course files.

```js
import { publishCourse } from './publishCourseData.mjs';

// course: defineCourse(...)
// courseOverrides: optional nested Course_Overrides authoring patch
publishCourse(course, {
  packageRoot: '/absolute/path/to/content/playground',
  // outputRoot: '/absolute/path/to/content/playground/generated/courses',
  // Pass outputRoot to select a different generated staging directory.
  overrides: courseOverrides,
  // languages: ['uk', 'en'], // default: Course-supported languages
  // check: true,             // compare, never write
});
```

Output is `<textbook>/generated/courses/<course-uuid>/base.json` and
`<language>.json` only for languages that actually change the published Props.
When `outputRoot` is provided, the files are instead written directly to
`<outputRoot>/<course-uuid>/` (for example, `generated/courses/`). This directory is a generated output, not
an authored resource or a runtime import.

The Course root, Modules and Chapters carry their full Props-shaped metadata
and their ordered, slug-keyed `content: { items, order }` collections. Each Lesson appears only as
`{ "type": "lesson", "id": "<uuid>" }`, with an optional `overrides` field
containing the **already-built sparse Lesson override Props**. Course-specific
Lesson patches are _not_ applied to the standalone Lesson's published resources.

The locale patch is Props-shaped and has **no extra locale wrapper**. Course
`content.items` is keyed by slug and sparse locale patches include only changed
items. The `order` array records ordering independently. Published Props arrays
within Lesson overrides remain atomic and must never be merged by index.

Course/Module/Chapter and Lesson config validation and override resolution
remain owned by their existing `build.props` / `build.overrides` methods.
The output is intentionally a _compact Course resource_, **not** a standalone
`course_Props_Schema` object: Lesson leaves are references to separately
published Lesson Props. The future Course assembler must resolve those Lesson
IDs and apply these sparse patches after the Lesson's own locale assembly.

`publishCourse` writes only this UUID's directory using a staging directory,
removes stale files from that directory, preserves other Course directories and
unrelated public files, and supports read-only `check` mode.

Tests: `npm test --workspace @svitlo/engine` (Course publication, CLI, and Lesson generator suites).

The CLI lives at `shared/engine/scripts/generateCourseProps/generateCourseProps.mjs`, with its CLI tests beside it. It discovers authored Course configurations and invokes the renderer; there is no duplicate root `scripts/generators/` wrapper.
