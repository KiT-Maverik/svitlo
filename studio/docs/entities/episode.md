# Episode

**Entity category:** Course-owned narrative activity.

An **Episode** carries Course-specific plot, character interactions, missions or transitions. It is deliberately **not a subtype of Lesson**. Lesson has a pedagogical responsibility to teach or assess Skills independently of a story; Episode has a narrative responsibility and may evolve different state, progression and interaction rules.

## Authoring decision

- Use a **Lesson** when the purpose is explanation, guided practice, or assessment of knowledge/Skills. It must remain understandable without the Course storyline, even if physically stored under one Course.
- Use an **Episode** when the primary purpose is a story event, dialogue, mission, choice or scenario transition tied to a particular Course.
- Where both are needed, keep teaching material in the Lesson and story context in an Episode or Course. Do not duplicate a Lesson to embed a dialogue.

Episodes belong in their owning Course's authoring directory, at the reviewed slot, e.g. `data/courses/<bucket>/<course-id>/content/<module>/<chapter>/<episode-slug>/` (omit absent Module/Chapter levels). They are not intended to be standalone or shared across Courses.

## Independent Engine Build API

`defineEpisode` is exported through the build-time `@svitlo/engine/build` entrypoint and implemented in `configurators/episodes/defineEpisode`. Its own `episode_Config_Schema`, `episode_Props_Schema` and `episode_Override_Metadata_Schema` are not derived from Lesson schemas or functions.

The initial authored shape includes identity (`type: 'episode'`, UUID and slug), `params.languages`, localized `locale.title`, optional `events`, and a slug-keyed `section: { items, order }` collection of Section configurators. Episode does not own Lesson `skills`, `questions`, `flashcards`, `requireQuiz`, or `programId`.

`build.props({ languages })` returns `{ base, locale }`, with complete per-language **atomic Section Props arrays** wherever Sections require translation. `build.overrides(patch, { languages })` returns sparse metadata changes and complete Section arrays for changed collections. Existing Section overrides, additions, disabling, and order are validated. Course, Module and Chapter may directly contain Episode children.

The typed [Course workflow](../../skills/course-workflow/create-course-flow.skill.md) reserves Episode order, identity and Course/Module/Chapter ownership; Course Stage 5 emits a blocked inert `EpisodeWorkflowStage1Handoff` seed, not a completed Episode. The final reviewed `draft.ts` is a **single default-exported inert** `EpisodeWorkflowStage2` literal with type-only imports, no `materializeEpisodeStage5()` invocation. In the #857 target a shared trusted static Reader, canonical Stage 2 Zod and Course-slot/dependency verifier precede trusted Section/Block/Scene generation and one-slot atomic parent restoration. Verify default-branch deployment before use; independent reviews and human Stage 9 Media Generation / Stage 10 QA cannot be inferred from emission.

See [Lesson](./lesson.md), [Course](./course.md), and [Section](./section.md).

## Production boundary

A provisional Course Episode placement is narrative intent, not a completed Episode. The Course Stage 5 materializer emits a blocked typed draft and a preview-only Episode stub at the reserved ordered placement, not a completed Configurator; this is not approval of the Episode's scenario, Sections, media, localization, or learner experience. Each of these must be completed and verified before publication.

The [Episode workflow](../../skills/episode-workflow/create-episode-flow.skill.md) defines the required ten-stage production procedure, with separate independent content and translation reviews and human-owned Media Generation and QA. Its authoring contract requires a Course-owned `draft.ts` handoff, distinct from runnable `index.ts`; the [trusted Episode Stage 5 workflow](../../../scripts/ci/episodeMaterialization/README.md) must be deployed and verified before Episode content may be materialized. A draft handoff is not a completed scenario.

## Quest Section in Episodes (planned runtime)

An Episode may eventually host a [Quest Section](./quest.md) for Course-owned interactive story beats, media reactions, missions and branching decisions. The Quest is the autonomous **Section**; the Episode remains the Course-level narrative container. The Build-only Quest Config exists separately, but current Episode composition/publication and UI rendering do **not** yet accept or run Quest. Do not embed an unregistered Quest as a content block or claim a runnable story.

## Runtime and publication readiness

The compact Course publisher retains full Episode Props, with invariant base fields and atomic localized Section arrays, at the original Course/Module/Chapter slot. Lessons remain independent references with sparse placement-specific overrides. The shared runtime `assembleCourseTree` validates immutable Course and Episode identity/order, the selected locale and supported resolved Section/Block schemas. The Next.js adapter reads the same published JSON; Web exposes `/<interface-language>/course/<course-uuid>/episode/<content-language>/<episode-uuid>`. The portable UI Kit Episode controller renders ordered content, practice, codingTask and learningFlow Sections with canonical ContentBlock renderers, checkpoint completion gates, localized media and registered Episode-compatible Scenes. It advances to the next actual Course activity in reviewed order. Repeated Lesson references use a placement query to disambiguate their sparse overrides.

Episode `events` is currently an opaque JSON Build field, **not an executable event protocol**. Nonempty events and unsupported assessment/Quest Sections are rejected at authoring/materialization or publication/runtime boundaries. Scenes requiring Lesson-specific context or assessment services must not be authored as Episode Scenes. No general-purpose story engine, Lesson wrapper or invented event semantics is implied.

For human inspection, use an explicit draft-mode textbook build (`SVITLO_MEDIA_MODE=draft`) and the selected Web host. Missing media is reported by the existing projector; unmaterialized placements and source blockers are reported by the Course source readiness check. Only materialized compatible Episodes can be opened. A preview is not release approval. Strict production rejects Course-owned drafts, unresolved authored blockers and missing required assets; actual human Stage 9/10 evidence remains mandatory before removing their blockers. Do not treat a successful preview or automated test as human acceptance.

Test-only Web fixture: select `SVITLO_TEXTBOOK=web-fixture-alpha` and start the Web host with `npm run app:start:dev --workspace @svitlo/web`. Open `/uk/course/11111111-1111-4111-8111-000000000140/episode/uk/11111111-1111-4111-8111-000000000141`. This exercises a representative localized Episode, image, registered Scene and next activity, not authored Playground content or real human QA evidence.
