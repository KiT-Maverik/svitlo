# Engine-derived YAML authoring schemas

`generateYamlSchemas.mjs` publishes deterministic JSON Schema editor guides from
the owning Engine `*_Config_Schema` Zod contracts and the typed
`yamlProduction_Schemas`. The generated files are **authoring aids**, not
editorial approval, completed resources, runtime Props or publication evidence.

## One source shape

Every complete YAML node uses the same envelope in a standalone Lesson, Course,
Episode, Section, ContentBlock and bank:

```yaml
config:
  id: 00000000-0000-4000-8000-000000000001
  slug: intro
  type: content
  params: {}
  locale:
    title: Introduction
    navigationLabel: Introduction
  content:
    items:
      greeting:
        config:
          id: 00000000-0000-4000-8000-000000000002
          slug: greeting
          type: text
          params: {}
          locale: { value: Hello }
    order: [greeting]
production:
  pedagogicalIntent: Introduce the concept
```

`config` is required at **every** node. `production` is optional except
where the root Lesson or Course requires `documentLanguage` (and Course also
requires reviewed methodology). It is authoring-only metadata: consumers must
strip it from each node before passing the Config to its `define*` function.
An incomplete Stage 1–4 draft may intentionally fail the final editor schema.

Full inline Lesson: `config.type: lesson`, with the actual Lesson Config.
Standalone Lesson placement: `config.type: lessonReference`, with
`config.lessonId` and optional placement `config.slug`. The materializer,
not this generator, resolves the reference and converts it to a real Course
child. These discriminators never overlap. Course children are constrained
by their actual Engine parent: Course accepts Module/Chapter/Episode/Lesson/
LessonReference, Module accepts Chapter/Episode/Lesson/LessonReference and
Chapter accepts Episode/Lesson/LessonReference. An Episode and Lesson both
embed the identical Section/ContentBlock authoring nodes.

## Typed API for materialization

The public `@svitlo/engine/build` entrypoint re-exports
`yamlAuthoringSchemas` (a typed map of complete roots),
`yamlCourseAuthoring_Schema`, `yamlLessonAuthoring_Schema`,
`yamlEpisodeAuthoring_Schema`, `yamlSectionAuthoring_Schema`,
`yamlContentBlockAuthoring_Schema`, `yamlQuestionAuthoring_Schema`,
`yamlFlashcardAuthoring_Schema`, `yamlLessonReferenceAuthoring_Schema`
and `yamlProduction_Schemas`. All concrete ContentBlock, Section and Question
node schemas are also exported for targeted tests and tools.

A Course materializer's source node may contain:

```yaml
config:
  type: course
  id: 00000000-0000-4000-8000-000000000003
  slug: foundationalCourse
  params: { languages: [en] }
  locale: { title: Foundations, description: An introductory course }
  content:
    items:
      existingLesson:
        config:
          type: lessonReference
          lessonId: 00000000-0000-4000-8000-000000000010
          slug: existingLesson
      narrativeEpisode:
        config:
          type: episode
          id: 00000000-0000-4000-8000-000000000004
          slug: narrativeEpisode
          params: { languages: [en] }
          locale: { title: The discovery }
          section: { items: {}, order: [] }
    order: [existingLesson, narrativeEpisode]
production:
  documentLanguage: en
  methodology:
    purpose: Establish foundational knowledge
    audience: Beginning learners
    approach: Guided practice
```

The example illustrates the contract, not evidence of a completed or
pedagogically approved Course. Every nested `section.items` or
`content.items` child has the same `{config, production?}` envelope shown
above. In particular, the Lesson Builder and Course Episode renderer must
unwrap nodes recursively and keep metadata out of Engine Config; no implicit
`type: lesson` reference compatibility is allowed.

All Config fields come from Engine Zod. Media draft Configs omit physical
`fileName`/`posterFileName`; actual TypeScript Configs still require verified
asset names. Missing Scene implementation and physical assets remain blockers.
Do not fabricate values, or treat schema validity as pedagogical approval.

## Outputs

`shared/engine/yaml-schemas/<kind>.schema.json` retains Config-only references
for ContentBlock, Section, Question, Flashcard, Lesson, Episode and Course.
`courseOverrides.schema.json` remains the existing Build patch guide.

`<kind>.scaffold.schema.json` is generated for ContentBlock, Section,
Question, Flashcard, Lesson, Episode, Chapter, Module and Course, using the
same recursive Zod authoring nodes. `production.schema.json` is generated
from the typed authoring metadata; it is no longer hand-maintained.
`studio/skills/course-workflow/course-flow.schema.json` is a generated
**copy of the Course authoring schema** with its canonical Studio ID, not an
independent editorial schema. There is one temporary `course.yaml` and one
standalone `lesson.yaml`, never a second `config.yaml`.

## Commands

From the repository root, after building Engine:

```sh
npm run package:build --workspace @svitlo/engine
npm run content:generate:yaml-schemas --workspace @svitlo/engine
npm run content:check:yaml-schemas --workspace @svitlo/engine
node --test shared/engine/scripts/generateYamlSchemas/generateYamlSchemas.spec.mjs
SVITLO_TEXTBOOK=math npm run code:check:types
```

`--write` updates only these generator-owned output files; `--check` is
read-only and fails on any drift, including the Studio Course Flow copy and
typed production metadata. No runtime/YAML scaffolder input validation or
authoring workflow gate is added here. Stage 5 integration must migrate the
current `validateCourseFlow` and `materializeCourseFlow` consumer to the
new envelope; those files belong to their respective agents, not this PR.
