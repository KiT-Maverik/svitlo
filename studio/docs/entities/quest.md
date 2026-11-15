# Quest Section — autonomous interactive learning workspace

**Status: Engine Build configurators and YAML draft authoring only.** Quest playback, Section registration in Lesson/Episode runtime, media mixing, user preference dispatch, Scene registration and completion/persistence are **not implemented by this contract**. Authoring tools must not imply that a Quest can already be published or played.

## Purpose and placement

A Quest is a **Section type** (`type: 'quest'`), not a ContentBlock, Quiz, Episode or game-specific entity. It owns one isolated learning workspace and nonlinear progression. A Course-owned Episode can present narrative missions, character dialogue and story consequences; a standalone Lesson may use the same Quest structure for guided algebra, debugging, scientific experiments or simulations without acquiring Course narrative dependencies. A Quest can subsume the intended workspace/guidance use case of `learningFlow`; do not remove or migrate that section type until runtime and editorial equivalence is verified.

**Choose Quest** for a cohesive, stateful sequence of interactive learning steps requiring controlled presentation, branching and feedback. Choose `content` for ordinary block-based instruction; `quiz` for formal Question Bank assessment/scoring, not merely a Task with local feedback; `learningFlow` remains the existing authoring contract for step-by-step instructional blocks. A Quest Task's success is not evidence of Lesson mastery unless a separately approved assessment process records it.

## Authored build tree

```text
defineQuestSection        id, slug, type: quest, params, locale
├── stages               SlugMap, mandatory "start", no order
│   ├── start            defineStage: id, slug, type: questStage
│   └── camelCaseKey     content.video.medium/small: defineVideo
│                       content.audio.dialogue/narration/background: defineAudio | null
│                       content.image: defineImage
│                       content.subtitles: defineSubtitles
└── tasks                SlugMap, mandatory "start", no order
    ├── start            defineTask: id, slug, type: questTask
    └── camelCaseKey     scene: exactly one defineScene
```

**All Stage content keys are mandatory.** `video.medium` and `video.small` are separate existing Video ContentBlock configurators with _invariant media URLs_, representing the same **silent** video timeline at two delivery qualities (not master source files). Each Video's required accessible `label` may be localized, because only its file itself is language-independent. Do not introduce a separate QuestVideo entity.

Audio uses independently synchronized tracks: `dialogue` is character/teaching speech, `narration` provides important visual descriptions for nonvisual access, and `background` carries music/effects. All three **keys** exist; a track value can be `null` if the stage genuinely has no sounds in that category. Use the existing `defineAudio` for non-null tracks. Narration is not a substitute for accessible Task controls or live feedback; ordinary educational narration and audio description need deliberate scripting and review. `defineSubtitles` authors a localized WebVTT resource for speech, speaker identity and significant non-speech audio. Subtitles is a reusable ContentBlock exported from Engine, independently of Quest; its renderer remains future runtime integration work; the YAML editor/scaffolded TypeScript draft handoff is supported. Avoid presenting authored `null` as completed media production.

`image` gives a static presentation resource; `subtitles` supports timed captions and a future text/dialogue alternative. A single static image is not sufficient by itself for every evolving comic/story; plan required equivalent meaning and staged images separately. Localized subtitle text and nonvisual text descriptions must remain available when spoken-language audio falls back to another available language. Confirm all approved supported languages are truly provided; never use silent placeholder translations.

## Technical usage of the Build contracts

The exports are available via `@svitlo/engine/build`: `defineQuestSection`, `defineStage`, `defineTask` and `defineSubtitles`. Every configurator has `validate`, `config.base`, `config.locales()`, `build.props({ languages })` and `build.overrides(patch, { languages })`. Stage and Task have **no standalone `params` or `locale`**; their nested media/Scene configurators own the localized fields. Quest Section has localized `title`/`navigationLabel` and Section `params.skippable`. The requested languages are explicitly selected when building; children own validation of their inner assets and locale dictionaries. Overrides remain stateless patches of existing children, without legacy editor operations, positional arrays, sequence rewrites or authored transition graphs. `stages` and `tasks` preserve camelCase keys as identities; all keys must agree with each child's `slug`. Both maps must have a `start` child.

**Critical boundary:** the Engine's existing `Section_Configurator`, `Section_Props` and `sectionTypes` remain **unchanged** until a separate renderer/runtime integration PR. The YAML editor schemas and Lesson/Course draft scaffolders **are expanded** for Quest/Stage/Task/Subtitles authoring only. Thus `defineLesson` and `defineEpisode` must not be made to publish Quest through this first contract-only PR; do not work around that boundary by disguising a Quest as an existing Section type.

## Planned Quest Controller behavior (not implemented)

Two independent presentation and task workspaces; the Task area always keeps its size, even when empty. A Task Scene dispatches typed Quest Actions (`playStage`, `setStage`, `showTask`, `complete`), choosing branches in code rather than in Config. `stages.start` is the initial presentation and `tasks.start` is the initial Task; how the Task first becomes visible is a runtime design responsibility, not an authored `order`. Keep current base Stage frozen on its final frame when showing a temporary reaction Stage above it, then remove the temporary layer and restore Task interaction. Disable Task inputs during active asynchronous reactions; centralize concurrency and cancellation in the controller. Maintain separate state and actions contexts, prevent stale promises / double submits, and preserve Task state while transient media plays. Switching media quality, voice locale, captions, reduced-motion mode, or presentation mode must not reset learning progress.

## Accessibility and editorial handoff

Every Quest must have equivalent participation, not just four nominal asset fields. For deaf and hard-of-hearing learners: accurate localized captions including speaker cues/significant sounds, readable transcript/dialogue flow, and visual feedback. For blind and low-vision learners: meaningful narration/audio description, complete nonvisual task state, screen-reader/keyboard operation, programmatic result announcements, focus management and textual descriptions of math/diagrams. Respect mobility impairments (keyboard, no drag-only or time-critical input), photosensitivity and reduced motion (disable shaking effects), language direction including RTL, cognitive pace control and offline/low-bandwidth representation. Defaults may honor **voluntary accessibility preferences** without inferring diagnoses. Review interactions and media alternatives by learning outcome and parity, not the existence of an asset reference.

See [Section](./section.md), [Lesson](./lesson.md), [Episode](./episode.md), [Inclusive Access](../architecture/internationalization-and-accessibility.md), [Educational Screenwriter Persona](../../personas/educational-screenwriter.persona.md), [Create Lesson Content](../../skills/lesson-workflow/create-lesson-content.skill.md).
