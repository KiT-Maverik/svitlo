# Section

A Section is a navigable learning unit. Regular Sections hold ordered ContentBlocks; a Quiz is **a Section, not a ContentBlock**.

## Contract

See [Section](../../../shared/contracts/src/types/content/section.types.ts) and [Quiz parameters](../../../shared/contracts/src/types/content/quiz.types.ts).

- General Section: `type`, `content: ContentBlock[]` and metadata.
- Quiz Section: `type: 'quiz'`, `parameters` and metadata, with **no** `content` array.
- Quiz parameters hold `selection`, `questionOptions`, `layout`, `interaction`, `feedbackMode`, `grading`, `results`, `screen`, `timeLimitSeconds` and `isBlocker`.
- Lesson owns the full authored Question catalog. Engine prepares each Quiz's Question array from this catalog and its `parameters.selection` settings.
- Multiple Quiz Sections are supported. A Quiz with `isBlocker: true` prevents forward navigation until the Quiz attempt is completed; passing the grade threshold is a separate assessment outcome.
- Omitted `timeLimitSeconds` means an untimed Quiz. `layout.mode` supports `stack` and `stepper`; the latter reuses QuestionProgress.

The same prepared Question responses and Quiz parameters can power standalone practice.

## Layout and knowledge checkpoints

General Section ContentBlocks render in one vertical column. A Scene can have its own internal layout. A Knowledge Checkpoint is a reflective prompt, not a scored Quiz.

Related: [Lesson](./lesson.md), [Lesson Content](./lesson-content.md).

## Build-time creator API

`createSection<SupportedLanguages>()({ ... })` accepts existing Section data,
including typed `createContentBlock` creators for an ordinary Section's
ordered `content` array. `getData()` unwraps nested creators while preserving
their identity and order. `toResource({ languages })` uses the Lesson
sparse-localization helper; it does not publish standalone Section files.

A Quiz Section uses `createSection({ type: 'quiz', parameters: ... })` and
has **no** ContentBlock `content`. Question selection is resolved from the
parent Lesson catalog during Lesson Response assembly. New blocks should be
added to the appropriate ContentBlock contract/renderer and verified against
existing serialization; the generator must not special-case individual block
kinds. `createContentBlock<SupportedLanguages>()` similarly exposes
`getData()` and pure `toResource({ languages })` with strict locale
coverage and intentional language-independent strings.

## Build-time creator methods

`createSection<L>()(data)` and `createContentBlock<L>()(data)` expose
`getData()`, `getBase({ languages })` and
`getLocale({ languages, language })`. These nested entities have no
independent published file paths; the Lesson or Course generator owns those.
A Quiz remains a Section, not a ContentBlock. Sparse locale patches never
repeat invariant IDs, types or authored ordering.
