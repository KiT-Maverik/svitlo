# Compact Course resource publisher

`publishCourseData.mjs` publishes compact Course resources built from the new stateless Configurator API.

The build-time caller passes a `defineCourse` Configurator containing its
complete authored hierarchy. Reused Lessons may use `placeLesson(source, rawPatch)`
**at each immediate placement**; no separate Course-root authoring patch is
accepted by the publisher. No standalone Lesson resource is built into the
resulting Course files.

```js
import { publishCourse } from './publishCourseData.mjs';

// course: defineCourse(...)
// Inline Lesson patches belong in the Course Configurator's content.items
publishCourse(course, {
  packageRoot: '/absolute/path/to/content/playground',
  // outputRoot: '/absolute/path/to/content/playground/generated/courses',
  // Pass outputRoot to select a different generated staging directory.
  // No Course-root overrides: use placeLesson at each child placement.
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
containing the **already-built sparse Lesson override Props**. These are obtained
through the real Lesson `build.overrides` API from the authored patch attached
to that placement. Course-specific patches never mutate the standalone Lesson's
published resources; even repeated Lesson IDs can carry different patches.

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

### Course-owned Episodes

A materialized Episode publishes full invariant Props plus atomic localized Sections at its reviewed placement. The runtime validates supported Section/Block schemas, immutable identities and locale. Nonempty opaque Episode events and assessment/Quest Sections are unsupported and fail closed. Lesson references remain sparse and may occur at distinct placements with independent override patches. The Course CLI's strict source gate rejects pending Course-owned drafts and unresolved blockers; explicit draft-mode previews are not production approval. See [Episode entity](../../../../studio/docs/entities/episode.md).
