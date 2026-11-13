# Episode

**Entity category:** Course-owned narrative activity.

An **Episode** carries Course-specific plot, character interactions, missions or transitions. It is deliberately **not a subtype of Lesson**. Lesson has a pedagogical responsibility to teach or assess Skills independently of a story; Episode has a narrative responsibility and may evolve different state, progression and interaction rules.

## Authoring decision

- Use a **Lesson** when the purpose is explanation, guided practice, or assessment of knowledge/Skills. It must remain understandable without the Course storyline, even if physically stored under one Course.
- Use an **Episode** when the primary purpose is a story event, dialogue, mission, choice or scenario transition tied to a particular Course.
- Where both are needed, keep teaching material in the Lesson and story context in an Episode or Course. Do not duplicate a Lesson to embed a dialogue.

Episodes belong in their owning Course's authoring directory, e.g. `data/courses/<course-id>/episodes/<episode-id>/`. They are not intended to be standalone or shared across Courses.

## Independent Engine Build API

`defineEpisode` is exported from `@svitlo/engine` via `configurators/episodes/defineEpisode`. Its own `episode_Config_Schema`, `episode_Props_Schema` and `episode_Override_Metadata_Schema` are not derived from Lesson schemas or functions.

The initial authored shape includes identity (`type: 'episode'`, UUID and slug), `params.languages`, localized `locale.title`, optional `events`, and a slug-keyed `section: { items, order }` collection of Section configurators. Episode does not own Lesson `skills`, `questions`, `flashcards`, `requireQuiz`, or `programId`.

`build.props({ languages })` returns `{ base, locale }`, with complete per-language **atomic Section Props arrays** wherever Sections require translation. `build.overrides(patch, { languages })` returns sparse metadata changes and complete Section arrays for changed collections. Existing Section overrides, additions, disabling, and order are validated. Course, Module and Chapter may directly contain Episode children.

Current scope is **authoring schemas and Build API composition**. Episode runtime screens, scenario state handling, generators, assemblers and separate publication routes are not implemented by this change. Do not claim they are operational based on configurator existence.

See [Lesson](./lesson.md), [Course](./course.md), and [Section](./section.md).
