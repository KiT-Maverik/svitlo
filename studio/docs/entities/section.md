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
