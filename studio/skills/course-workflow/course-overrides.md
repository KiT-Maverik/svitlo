# Course Lesson Overrides: approved editorial contract

**Canonical schema:** [course-overrides.schema.json](./course-overrides.schema.json). This is a **separate**, optional, Course-owned editorial input: \`content/<book>/data/courses/<bucket>/<uuid>/overrides.yaml\`. It is not an extension of the Methodologist's skill-based \`toc.yaml\`.

## Ownership and approval

A Course editor/Experience designer must approve the **Course-specific modification**, and the relevant content owner must approve any replacement prose, interaction, scenario, events or newly inserted Section/ContentBlock. An approved \`overrides.yaml\` can only reference already implemented standalone Lessons and already authored, reviewed **Course-owned TypeScript sources**. Approving this file does **not** change ownership of the original Lesson or authorize the builder to invent a scene, story, image, question or translation.

The input is an ordered sequence of explicitly typed operations applied to one Course Lesson slot using \`createLessonOverrides(lesson)\`. References to existing Sections and ContentBlocks use immutable **slugs**, never array indexes. A new Course-owned item is referenced by an exported TypeScript object in the **same Course directory**, never copied into a Lesson directory:

- \`sections/<name>.ts\`: an approved \`Section<'data', ...>\` source, usually produced with \`createSection(...).getData()\`;
- \`blocks/<name>.ts\`: an approved \`ContentBlock<'data', ...>\` source, usually produced with \`createContentBlock(...).getData()\`;
- \`patches/<name>.ts\`: an approved, typed sparse replacement, title, Section metadata or event patch. Its exported type must satisfy the existing creator API.

The YAML builder checks source files and exported symbols. TypeScript and Engine creators validate the shapes and the existing original slug/ID invariants. New Course-owned material must have a distinct canonical content-producing workflow. No arbitrary inline TS/JS, fabricated strings, unknown Lesson-owned Question changes, or unreviewed translation fallback is permitted.

## Example (schematic UUIDs, never a production-ready editorial artifact)

```yaml
schemaVersion: 1
kind: course-lesson-overrides
status: approved
courseId: 30ecbde1-97fd-5fe7-a353-ea89b9ef4a67
overrides:
  - slotKey: light-intro
    lessonId: d3048d21-8690-5255-b62c-984c69ac272c
    operations:
      - type: params
        sections:
          allowSkipping: false

      # Existing Section metadata, approved as typed Course-owned TS.
      - type: section-set
        slug: theory
        source: { path: patches/theory.ts, export: theory_Patch }

      # Original Lesson-owned block remains original; change only authored fields.
      - type: block-set
        sectionSlug: theory
        slug: intro
        source: { path: patches/intro.ts, export: intro_Patch }

      - type: block-remove
        sectionSlug: theory
        slug: oldHint

      # Every retained existing block must occur exactly once.
      - type: block-order
        sectionSlug: theory
        entries:
          - intro
          - { source: { path: blocks/newHint.ts, export: newHint_Block } }

      # Every retained existing Section must occur exactly once.
      - type: section-order
        entries:
          - practice
          - theory
          - quiz
          - { source: { path: sections/storyBridge.ts, export: storyBridge_Section } }
```

Replace the example's slugs, IDs and paths with verified sources. In an actual Lesson the retained Section and ContentBlock lists **must match** its existing authoring data; the builder rejects missing/duplicate members.

## Supported operations

| Type               | Required fields                                                                | Existing Engine method                                             |
| ------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| \`params\`         | \`sections\` (allowNavigation / allowSkipping / showIndexes)                   | \`.setParams({ sections })\`                                       |
| \`title\`          | \`source\` (approved typed title dictionary)                                   | \`.setTitle(source)\`                                              |
| \`events\`         | \`source\` (approved typed event patch)                                        | \`.setEvents(source)\`                                             |
| \`section-set\`    | \`slug\`, \`source\` (approved metadata patch)                                 | \`.sections.bySlug[slug].set(source)\`                             |
| \`section-remove\` | \`slug\`                                                                       | \`.sections.remove(slug)\`                                         |
| \`section-order\`  | \`entries\`: existing slugs or Course-owned Section source refs                | \`.sections.setOrder(entries)\`                                    |
| \`block-set\`      | \`sectionSlug\`, \`slug\`, \`source\`                                          | \`.sections.bySlug[sectionSlug].content.bySlug[slug].set(source)\` |
| \`block-remove\`   | \`sectionSlug\`, \`slug\`                                                      | \`.sections.bySlug[sectionSlug].content.remove(slug)\`             |
| \`block-order\`    | \`sectionSlug\`, \`entries\`: existing slugs or Course-owned block source refs | \`.sections.bySlug[sectionSlug].content.setOrder(entries)\`        |

The \`operations\` array is ordered. A \`remove\` should precede an affected \`setOrder\` (because \`setOrder\` includes all _currently present_ members), and new items must be represented by source refs inside their order operation. Schema validation rejects unsupported operations and fields. Slug membership and original Lesson languages are checked against actual authored Lesson Data; the existing creator enforces complete slug/ID uniqueness and Quiz invariants.

## Important publication constraints

The existing publisher writes Course-local sparse overrides under \`overrides/<lessonId>/\` and cannot distinguish different slots sharing a Lesson UUID. Therefore an override on a Lesson referenced twice is an explicit \`OVERRIDE_REUSED_LESSON\` blocker pending a separate route/identity change. **Reusing an unmodified Lesson any number of times remains valid.**

A standalone Lesson may support extra languages: **Course languages ⊆ Lesson languages**. This must hold for each referenced Lesson (including an override's original Lesson); a missing Course locale is a blocker. A Course-owned addition should localize its own user-facing content for Course languages, without altering the standalone Lesson language declaration. TypeScript rejects incomplete \`Locale_Options\`; the builder does not duplicate source-locale content to other locales.

The Course publisher remains responsible for writing \`getBase()\`, \`getLocale()\` and \`getContentEntries()\` projections. The builder writes only the generated typed composition factory and never rewrites \`data/lessons\`, \`Scenes\`, published resources or manually authored \`*.data.ts\` sources.
