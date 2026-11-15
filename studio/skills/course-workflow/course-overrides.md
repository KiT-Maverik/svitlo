# Course-owned Build Overrides

**The only supported override API is the stateless Engine `build.overrides(patch, { languages })`.**
Course-local `overrides.yaml` is the serialized `patch` argument and is guided by
[the generated Course Overrides JSON Schema](../../../shared/engine/yaml-schemas/courseOverrides.schema.json).
No other override DSL or historical operation list is supported.

## Identity and ownership

- A standalone Lesson is immutable from the Course's perspective. `type: lesson` in a Course
  is a `lessonId` reference to an existing independently authored Lesson, not an embedded
  Lesson definition. `source.path` and `source.export` are optional import coordinates,
  **not** existence markers or instructions to create a Lesson.
- A Course-specific patch changes only the Course's view of a referenced Lesson.
  It never changes or writes files under `data/lessons/`.
- A new Lesson, if required, is produced through the separate Lesson Production workflow
  and only later referenced by Course. Course Builder generates files only within the
  Course UUID directory; Lesson Builder has independent UUID-path and no-clobber safeguards.
- Course languages must be a subset of the referenced Lesson's supported languages.
  Missing translations must not be invented.

## Format

In the **new single-file technical authoring flow**, write the patch as root `overrides` in `content/<book>/data/courses/<bucket>/<uuid>/config.yaml`. A pre-existing separate `overrides.yaml` is only for historical Course source formats, and must contain the **same** supported sparse Build API patch; never author both as competing sources. Example patch body:

```yaml
content:
  items:
    opening:
      params:
        sections:
          allowSkipping: false
```

To patch a nested Lesson, follow its Course path through `content.items` at each Module
or Chapter level. To change order or add/disable children, use the canonical
`items`, `additionalItems`, `order` collection fields supported by the corresponding
configurator's Build API. For Quest sections, patch their supported `stages` and `tasks` maps through the Quest Build API; there are **no** Quest `order` arrays. New Quest Config nodes can be authored in the technical YAML drafts, but runtime Section integration and playback remain pending. Identifiers and source Lesson Configs remain unchanged.

**Unsupported:** `schemaVersion`, `kind: course-lesson-overrides`, `operations`,
`section-set`, `block-order`, `createLessonOverrides`, or exported `_OverrideEditorial`.
The generic scaffolder must reject the obsolete operation format rather than silently
converting, applying, preserving, or treating it as a second supported format.

## Authorship and verification

Methodological and scenario changes still require the appropriate Studio authoring and
independent review; source conversion is not approval. The Course draft scaffolder emits
a `course.build.overrides(...)` TypeScript expression, but does **not** evaluate it,
typecheck it, resolve all references, validate authoring completeness, or publish Props.
Those are separate required completion and publication stages. New Course-owned Sections,
blocks, and Scenes require approved source and compatible import/authoring workflows;
the scaffolder must not fabricate them.
