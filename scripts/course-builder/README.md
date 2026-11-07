# Deterministic Course YAML → TypeScript composition

This is **not** an AI authoring skill and does **not** generate standalone Lessons. It validates the approved Course Methodology and skill-based Course TOC, resolves **implemented** standalone Lessons by canonical UUID, and writes a deterministic **typed Course composition factory**. It does not change the existing Course publisher, Lesson authoring files, Episodes, Scenes or overrides.

## Usage

From the monorepo root after installing and building the existing Contracts/Engine workspaces:

~~~sh
npm run package:build --workspace @svitlo/contracts
npm run package:build --workspace @svitlo/engine

node scripts/course-builder/build-course.mjs \
  --package content/<textbook> \
  --course <course-uuid> \
  --write

node scripts/course-builder/build-course.mjs \
  --package content/<textbook> \
  --course <course-uuid> \
  --check

node --test scripts/course-builder/build-course.spec.mjs
~~~

The builder looks for existing approved input only at:

~~~text
content/<book>/data/courses/<last-hex-digit>/<courseId>/
  methodology.md
  toc.yaml
~~~

The canonical JSON Schema is **read from Studio**, not reimplemented. Duplicate keys are rejected; order is inherited exclusively from the YAML arrays. All Lesson slots require a matched UUID. For each unique UUID the builder looks in the textbook's canonical Lesson UUID bucket, requires exactly one implemented \`*.data.ts\`, loads real Lesson data through \`@svitlo/engine/utils\` and checks identity and implemented languages. Editorial-only \`methodology.md\` or \`lesson.identity.json\` is not an implemented Lesson. Missing implementations fail with their expected path.

The generated file is:

~~~text
content/<book>/data/courses/<bucket>/<courseId>/toc.generated.ts
~~~

It exports:

- \`courseLanguages\` and its literal tuple type;
- \`courseGroupTitleSources\`, with **only** the TOC's \`documentLanguage\` for ordinary group titles;
- \`courseLessonSlotTitleSources\` for editorial traceability, **not** as automatic Lesson title overrides;
- \`CourseLocalizedGroupTitles\`, a **complete** dictionary type required by the factory (intentional invariant group titles remain scalar);
- \`createCourseData(metadata, titles)\`, which composes the existing \`createModule\`, \`createChapter\`, \`createCourse\` and **imported, unmodified** Lesson Data.

The caller must supply separately approved Course-level frontend \`title\` and \`description\` as \`CourseFrontendMetadata\` and complete translations for ordinary grouping titles. For example, the caller's existing, authored flat \`data/courses/<name>.data.ts\` may use:

~~~ts
import { createCourseData } from './<bucket>/<uuid>/toc.generated';

export const exampleCourse_Data = createCourseData(
  {
    title: { id: 'course-title', slug: 'courseTitle', type: 'text', value: { uk: '...', en: '...' } },
    description: { id: 'course-description', slug: 'courseDescription', type: 'markdown', locales: { uk: '...', en: '...' } },
  },
  {
    'module/foundations': { uk: '...', en: '...' },
  },
);
~~~

The example values above are schematic and **must not** be used as placeholders in actual Course authoring. Ordinary titles are not promoted to language-independent strings simply because translations are unfinished. The generated source-only dictionaries do not satisfy the full localized type for a multi-language Course and cannot be passed directly to the factory until translations are approved. The builder does not assert publication readiness merely because a TS factory was generated.

## Integration boundary and known blockers

The existing Course publisher discovers **flat** \`data/courses/*.data.ts\` exports and produces \`data/pages/courses/<courseId>/toc/{base,<locale>}.json\`, Episodes and sparse Overrides. A generated \`toc.generated.ts\` is not discovered automatically: a typed Course Data entrypoint with approved Course metadata/translations is required before publication. This is deliberate; the current **Methodology and TOC have no approved frontend Course description or complete translated titles**. Fabricating those fields, an incomplete Course Data export, or null-filled \`Locale_Options\` would break content ownership or type safety.

Further gaps to close in subsequent reviewed work:

1. **Course frontend copy/translation ownership:** determine the canonical approved input for Course title, description, optional prerequisites text and translated Module/Chapter labels. Only then can a builder safely emit a complete \`*.data.ts\` entrypoint automatically.
2. **Course-owned Episodes, Scenario Sections and sparse Overrides:** no approved editorial YAML schema was found in the Course Workflow. This builder neither writes nor modifies them; existing typed authoring and slug-keyed overrides remain supported by the current Course API/publisher.
3. **Subset language typing:** \`Course<'data', L>\` currently requires imported \`Lesson<'data', L>\` with the *identical ordered tuple*. The builder checks the required Course locale subset first, then emits \`TYPED_LANGUAGE_SUPERSET\` for a Lesson with extra supported languages, rather than forcing \`any\`/casts or copying the Lesson. The Course contract needs a type-safe superset adaptation, independently approved.
4. **Repeated Lesson routes/overrides:** the publisher can now reuse one Lesson UUID in several TOC positions, but all placements address the same Lesson URL. Two different per-slot overrides targeting one UUID are rejected because the current publisher keys overrides by Lesson UUID, not slot key.
5. **Runtime Lesson titles:** existing \`createCourse\` derives Lesson TOC titles from canonical Lesson Data. TOC slot titles are editorial intent, not automatically approved sparse title overrides. The builder exposes them for review without changing Lesson UI or content.
6. **Group UUIDs:** Module/Chapter IDs are stable UUIDv5 values scoped by Course ID, node type and immutable editorial key. Renaming a key changes that group's identity: key changes require explicit migration/approval.

### Determinism and ownership

The builder processes input arrays without sorting, reuses each standalone Lesson import by UUID, deterministically derives group IDs, and emits byte-stable UTF-8 output. \`--check\` is read-only and fails on drift. \`--write\` rewrites **only** its marker-identified generated file and does nothing on unchanged output. No existing Lesson, Course publisher, Episode Scene, editor YAML or manually authored Course \`*.data.ts\` is changed by the generator.

For full validation, run the builder tests, the relevant textbook TypeScript typecheck after creating a real Course Data entrypoint, and the existing textbook publish/integration tests. The implementation is intentionally a separable production step from the Lesson YAML builder.
