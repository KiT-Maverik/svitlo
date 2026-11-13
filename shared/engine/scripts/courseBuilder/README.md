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

The script accepts either:

- A direct Config-shaped course.yaml with type: course, slug,
  params.languages, locale, and content: { items, order } when authored;
  recursively nested Module/Chapter/Episode/Section items are converted to
  matching define* calls, including Carousel slides and Checkpoint items,
  question and answer ContentBlocks.
- The existing Studio toc.yaml editorial Course plan (kind:
  course-toc-plan, with content arrays and children). Its courseId
  becomes Config id, supportedLanguages becomes params.languages,
  key becomes slug, and ordered arrays become items/order. Group titles
  are copied **only** under locale.title[documentLanguage], except for
  explicitly invariant titles. No group ID, scenario, Course title or
  description is fabricated. Planning-only fields (skills, objectives, etc.)
  stay in the original YAML for the subsequent editor to consult.

All polymorphic children must provide type. Unknown or absent discriminators
fail with a path-specific diagnostic. No schema/semantic, approval or Lesson
existence checks run here. The current Engine authoring schemas are defined in
shared/engine/configurators/yaml/, and Engine authoring factories are
imported from @svitlo/engine/build.

### Existing standalone Lessons

A type: lesson Course child is a **reference** to a previously authored,
reusable Lesson, identified by lessonId. It does not become defineLesson.
When YAML supplies safe, explicit relative import coordinates (including the canonical sibling Lesson directory):

~~~yaml
type: lesson
lessonId: d3048d21-8690-5255-b62c-984c69ac272c
source:
  path: ../../../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/intro.data.ts
  export: intro_Lesson
~~~

the draft includes that import. The three leading `../` segments are
restricted to the canonical `data/lessons/<bucket>/<uuid>/<slug>.data.ts`
shape so they cannot escape to arbitrary packages. Otherwise it includes a clearly named
UNRESOLVED_LESSON_N and a TODO recording the original UUID and location.
The editor must resolve the actual import; no Lesson is fabricated and no
implementation lookup is performed. Such unfinished drafts may not typecheck.

### Optional Course-owned overrides

If the Course directory contains overrides.yaml, its YAML data is preserved
unaltered in the exported <slug>_OverrideEditorial constant, including
slotKey, lessonId, ordered operations, and Course-owned source references.
This is an **explicit handoff**, not an executable patch.

The old Studio operation language (section-set, block-order, etc.) cannot
safely be translated one-to-one into the current stateless Engine
course.build.overrides({ content: { items: ... } }, { languages }) API.
An editor/coordinator must define and approve that mapping before creating
typed sparse patches. The builder must not resurrect createLessonOverrides
or edit any standalone Lesson.

## Run

From the repository root (with npm workspace dependencies installed):

~~~sh
node shared/engine/scripts/courseBuilder/courseBuilder.mjs \
  --package content/<textbook> \
  --course <course-uuid> \
  --slug <courseSlug> \
  --language uk \
  --write

node shared/engine/scripts/courseBuilder/courseBuilder.mjs \
  --package content/<textbook> \
  --course <course-uuid> \
  --slug <courseSlug> \
  --language uk \
  --check

node --test shared/engine/scripts/courseBuilder/courseBuilder.spec.mjs
~~~

--slug is optional when the YAML has its own safe slug. For old TOC input
without an authored slug, supplying --slug names the output and explicitly
provides the draft Config slug. Otherwise an ID-derived **filename only** is
used and the required Config slug stays unfilled. An optional `--language uk` restricts direct Config YAML localization dictionaries
to the authored source language; editorial TOC already carries its
`documentLanguage`. A direct `course.yaml` may also carry
`documentLanguage` as provenance, but that field is stripped before calling
`defineCourse`. An optional
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
Episode and Section content; converting the old operations-only
overrides.yaml into Engine's sparse patch model; validating Config types and
publishing Course Props. Coordinate source-format changes with the Studio/schema
workstream; do not silently alter the Engine schemas to accommodate a draft.
