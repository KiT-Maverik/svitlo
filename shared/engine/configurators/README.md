# Schema-backed entity Definitions (additive APIs)

The new `define*` factories live in `@svitlo/engine/definitions`.
Legacy creators, content contracts and publication generators are intentionally
untouched. These factories are separate authoring APIs; migration is future work.

## Authoring rules

- Every `define*` returns the minimum structural `Definition` API:
  `config.base`, `config.locales()`, `config.overrides()`,
  `config.test.config(languages)` and `config.test.props(props)`.
- All new entities use Zod for authored-data schemas. The new test methods
  return full `safeParse` results (including issues) rather than booleans.
- Containers must receive **child Definition objects**, not child config
  literals or the legacy `create*Configurator` outputs.
- Localization is field-specific: each entity supplies explicit localized paths.
  Language-independent strings remain in base; translated dictionaries move
  to per-language sparse patches. Nested definitions are projected recursively.
- `withOverrides(patch)` returns a **new** Definition with its own overrides.
  A standalone Lesson and a Course-specific Lesson variation therefore do
  not share mutable override state. There is no `defineLessonOverride`.
- References (for example Skill UUIDs in Lesson prerequisites) remain IDs;
  owned child entities (for example Skills inside a Group) are Definitions.

## New coverage

ContentBlocks: Markdown, Code, Image, Video, Audio, YouTube, Carousel,
Checkpoint and Scene (alongside the existing Text Definition).

Questions: all nine current question types.

Lesson content: seven Section types, Flashcard and Lesson.

Course content: Course, Module, Chapter and Episode.

Taxonomy: Skill, SkillGroup, SkillDomain and AssessmentMethod.

This is a definition-layer foundation only. Do not serialize Definition
objects or their methods directly. Existing runtime contracts and published
JSON are unchanged. Dedicated integration work will connect Definitions to
publishers and adapt specific publication formats.
