# Course YAML → TypeScript draft scaffolder

This Engine-owned script mechanically converts a **partly authored Course YAML**
into a named TypeScript Config draft. It saves repetitive AI authoring work.
It is **not** a validator, approval check, translator, Lesson resolver,
typechecker, runtime component, or Props generator.

The output is a draft for an AI/editor to complete. Missing mandatory Config
fields and missing translations are intentional and may produce TypeScript
diagnostics **after** an editor begins completing the draft. Do not typecheck
generated drafts as an acceptance criterion for this script.

## Source shapes

The script accepts either. The Config form can include an optional
top-level `documentLanguage` provenance marker; it is removed from the
emitted `defineCourse` Config and used to keep only source-language localized
values (including nested values). Without this marker, already-authored
localization maps are preserved rather than guessing an authoring locale.

The script accepts either:

- A direct Config-shaped course.yaml with type: course, slug,
  params.languages, locale, and content: { items, order } when authored;
  recursively nested Module/Chapter/Episode/Section items are converted to
  matching define* calls.
- The existing Studio toc.yaml editorial Course plan (kind:
  course-toc-plan, with content arrays and children). Its courseId
  becomes Config id, supportedLanguages becomes params.languages,
  key becomes slug, and ordered arrays become items/order. Group titles
  are copied **only** under locale.title[documentLanguage], except for
  explicitly invariant titles. No group ID, scenario, Course title or
  description is fabricated. Planning-only fields (skills, objectives, etc.)
  stay in the original YAML for the subsequent editor to consult.

Every polymorphic node is dispatched via the **single canonical Engine
`shared/engine/configurators/yaml/yamlFactoryByType.ts` registry**. Nested
Carousel slides, Checkpoint items, their mandatory Text questions and answer
collections also become `define*` calls, not plain child objects.

All polymorphic children must provide type. Unknown or absent discriminators
fail with a path-specific diagnostic. No schema/semantic, approval or Lesson
existence checks run here. The current Engine authoring schemas are defined in
shared/engine/configurators/yaml/, and Engine authoring factories are
imported from @svitlo/engine/build.

### Existing standalone Lessons

A type: lesson Course child is a **reference** to a previously authored,
reusable Lesson, identified by lessonId. It does not become defineLesson.
When YAML supplies safe, explicit relative import coordinates **bounded
to the owning textbook's `data/lessons/` or the current Course directory**
(including legitimate `../../../lessons/...` relative paths from its UUID
folder), the script emits the import without an existence check:

~~~yaml
type: lesson
lessonId: d3048d21-8690-5255-b62c-984c69ac272c
source:
  path: lessons/intro.data.ts
  export: intro_Lesson
~~~

the draft includes that import. Otherwise it includes a clearly named
UNRESOLVED_LESSON_N and a TODO recording the original UUID and location.
The editor must resolve the actual import; no Lesson is fabricated and no
implementation lookup is performed. Such unfinished drafts may not typecheck.

### Optional Course-owned Build API overrides

The optional Course-local `overrides.yaml` is **the exact declarative patch
argument** for the current stateless `course.build.overrides(patch, { languages })`
API. There is **no** separate editorial operations format. The old
`kind: course-lesson-overrides`, ordered `operations` lists, and
`createLessonOverrides` API are unsupported and must not be consumed or
silently converted.

For example, given a Course whose `content.items.opening` is an imported
standalone Lesson:

```yaml
content:
  items:
    opening:
      params:
        sections:
          allowSkipping: false
```

The scaffolder emits `spaceCourse_Course.build.overrides(..., { languages: ... })`
and exports the result as `spaceCourse_Overrides`. Nested Module and Chapter
patches use `content.items.<slug>` at each level, exactly as in the current
Build API. Additions use `additionalItems` with typed Config nodes; existing
Lesson additions remain **references to imported standalone Lesson
configurators**, never new Lesson definitions.

The script emits an **authoring draft**; it does not evaluate or validate the
Build API patch. An AI editor completes missing imports, translations and
typed patches before normal TypeScript checks and publication. No Course
operation may write to a standalone Lesson folder.

`source.path` and `source.export` on a Course `type: lesson` node are optional
TypeScript import coordinates, **not** an existence marker or an instruction
to generate a Lesson. The Lesson is always owned by its independent UUID.
If coordinates are missing, emit an unresolved reference and require explicit
Lesson Production work or import resolution.

## Run

From the repository root (with npm workspace dependencies installed):

~~~sh
node shared/engine/scripts/courseBuilder/courseBuilder.mjs \
  --package content/<textbook> \
  --course <course-uuid> \
  --slug <courseSlug> \
  --write

node shared/engine/scripts/courseBuilder/courseBuilder.mjs \
  --package content/<textbook> \
  --course <course-uuid> \
  --slug <courseSlug> \
  --check

node --test shared/engine/scripts/courseBuilder/courseBuilder.spec.mjs
~~~

--slug is optional when the YAML has its own safe slug. For old TOC input
without an authored slug, supplying --slug names the output and explicitly
provides the draft Config slug. Otherwise an ID-derived **filename only** is
used and the required Config slug stays unfilled. An optional
--source course.yaml|toc.yaml selects the source; by default course.yaml
wins if present, otherwise toc.yaml.

The input directory is fixed at:

~~~text
content/<book>/data/courses/<last-uuid-hex-digit>/<course-uuid>/
  course.yaml or toc.yaml
  overrides.yaml  # optional
~~~

The output is <courseSlug>.data.ts in the same directory, exporting
<courseSlug>_Course = defineCourse(...) (non-identifier characters in export
names become underscores).

**Safe writes:** --check never writes. --write creates a new file or does
nothing if byte-identical. It refuses to overwrite *any* divergent existing
file, even one originally scaffolded: a human/AI editor may have changed it.
No input YAML, Lesson authoring, Episode Scene, Props generator, or runtime
source is changed.

## Work that remains outside this script

The following requires deliberate editorial/coordination work, not generator
heuristics: completing Course/Module/Chapter identity fields; resolving
existing Lesson imports; translating Course/group/episode copy; authoring
Episode and Section content; completing direct Build API patches; validating Config types and
publishing Course Props. Coordinate source-format changes with the Studio/schema
workstream; do not silently alter the Engine schemas to accommodate a draft.
