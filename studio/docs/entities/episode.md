# Episode

**Entity category:** Course-owned narrative activity.

An **Episode** carries Course-specific plot, character interactions, missions or transitions. It is deliberately **not a subtype of Lesson**. Lesson has a pedagogical responsibility to teach or assess Skills independently of a story; Episode has a narrative responsibility and may evolve different state, progression and interaction rules.

## Authoring decision

- Use a **Lesson** when the purpose is explanation, guided practice, or assessment of knowledge/Skills. It must remain understandable without the Course storyline, even if physically stored under one Course.
- Use an **Episode** when the primary purpose is a story event, dialogue, mission, choice or scenario transition tied to a particular Course.
- Where both are needed, keep teaching material in the Lesson and story context in an Episode or Course. Do not duplicate a Lesson to embed a dialogue.

Episodes belong in their owning Course's authoring directory, e.g. `data/courses/<course-id>/episodes/<episode-id>/`. They are not intended to be standalone or shared across Courses.

## Independent Engine Build API

`defineEpisode` is exported through the build-time `@svitlo/engine/build` entrypoint and implemented in `configurators/episodes/defineEpisode`. Its own `episode_Config_Schema`, `episode_Props_Schema` and `episode_Override_Metadata_Schema` are not derived from Lesson schemas or functions.

The initial authored shape includes identity (`type: 'episode'`, UUID and slug), `params.languages`, localized `locale.title`, optional `events`, and a slug-keyed `section: { items, order }` collection of Section configurators. Episode does not own Lesson `skills`, `questions`, `flashcards`, `requireQuiz`, or `programId`.

`build.props({ languages })` returns `{ base, locale }`, with complete per-language **atomic Section Props arrays** wherever Sections require translation. `build.overrides(patch, { languages })` returns sparse metadata changes and complete Section arrays for changed collections. Existing Section overrides, additions, disabling, and order are validated. Course, Module and Chapter may directly contain Episode children.

The typed [Course workflow](../../skills/course-workflow/create-course-flow.skill.md) plans Episode placements as Stage 2 `production.focus/purpose` and uses the reviewed Stage 3 Course source at authorized Stage 5. The concrete [Episode source materializer](../../../shared/engine/generators/materializers/episode/materialize.mjs) delegates Section rendering; it does **not** by itself prove the runtime Episode scenario controller, publisher or player is complete. There is no Course/Episode YAML Config schema or YAML draft conversion path in the integration branch. Verify current Engine Build/Props and host tests before claiming operational playback.

See [Lesson](./lesson.md), [Course](./course.md), and [Section](./section.md).

## Production boundary

A provisional Course Episode placement is narrative intent, not a completed Episode. The Course Stage 5 materializer emits a blocked typed draft at the reserved placement, not a Configurator; this is not approval of the Episode's scenario, Sections, media, localization, or learner experience. Each of these must be completed and verified before publication.

The [Episode workflow](../../skills/episode-workflow/create-episode-flow.skill.md) defines the required ten-stage production procedure, with separate independent content and translation reviews and human-owned Media Generation and QA. Its authoring contract requires a Course-owned `draft.ts` handoff, distinct from runnable `index.ts`; the trusted Episode Stage 5 materializer must support that boundary before Episode content may be materialized. A draft handoff is not a completed scenario.

## Quest Section in Episodes (planned runtime)

An Episode may eventually host a [Quest Section](./quest.md) for Course-owned interactive story beats, media reactions, missions and branching decisions. The Quest is the autonomous **Section**; the Episode remains the Course-level narrative container. The Build-only Quest Config exists separately, but current Episode composition/publication and UI rendering do **not** yet accept or run Quest. Do not embed an unregistered Quest as a content block or claim a runnable story.
