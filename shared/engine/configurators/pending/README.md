# Build-only pending configurators

`definePendingLesson`, `definePendingQuizSection` and `definePendingFlashcardsSection` are **Draft-only** entrypoints exported solely from `@svitlo/engine/build`. Each accepts exactly `{ id, slug }` and invokes its ordinary `define*` configurator. Their return values have the real Build API and the real Config/Props type. They do not introduce a status field, a bank, translations or approval evidence.

## Identity and source invariants

The supplied authored UUID and literal slug are kept unchanged on the root entity. Every additional nested UUID is deterministic from the canonical parent UUID and a distinct role path. `pendingUuid` uses SHA-256 over `svitlo:pending:v1`, the parent UUID and the role, then formats a reserved `feedc0de-*` UUIDv8 with RFC variant. UUIDs are stable across runs and languages and distinct for each root UUID/role pair (subject to the normal negligible hash-collision probability). No random UUIDs, shared registry or mutable lifecycle exist. These placeholders must be replaced with genuine author-owned child identities/content; the root authored UUID/slug should stay unchanged.

All visible text is exactly the source-invariant string **Not implemented**, including titles, navigation labels, and the `pendingNotice` Text block. It is not translated educational content. Pending notices use real ordered Section/ContentBlock children and publish no locale fragments.

## Fixed defaults

| Factory | Field | Default |
| --- | --- | --- |
| Lesson | `type` / `skills` | `lesson` / `[]` |
| Lesson | `params.languages` | canonical `allLanguageCodes` tuple, so a draft can nest in any supported Course locale scope |
| Lesson | `params.quizRequiredForCompletion` | `false` — never assert a required real assessment |
| Lesson | `params.sections` | `{ allowNavigation: true, allowSkipping: true, showIndexes: false }` |
| Lesson | `section` | one `pendingContent` Content Section containing one `pendingNotice` Text block |
| Content Section | `params` | `{}` |
| Quiz | `params.disabled` / `skippable` / `isBlocker` | `true` / `true` / `false` |
| Quiz | `params.selection` | `{ mode: 'all', questionIds: [reserved UUIDv8] }` |
| Quiz | `params.layout` / `feedbackMode` | `{ mode: 'stack', showProgress: false }` / `after-completion` |
| Quiz | `params.interaction` | `{ retries: 0, showErrors: false, showCorrectAnswers: false, allowExplanations: false, allowDeferring: false, allowQuestionNavigation: false, skippable: true }` |
| Quiz | `params.results` | `{ visibility: 'hidden', showScore: false }` |
| Quiz | `params.screen.starting` | `{ showDefaultContent: true, content: ['pendingNotice'] }` |
| Flashcards | `params.disabled` / `skippable` | `true` / `true` |
| Flashcards | `params.selection` | `{ flashcardIds: [reserved UUIDv8] }` |
| Quiz and Flashcards | `content` | one real `pendingNotice` Text block in `{ items, order }` |

Other optional params, grading, screens and locale translations are **absent**, not tacitly approved or filled. Required selections are only schema-valid **draft references**, never entries in Question/Flashcard manifests. They MUST be replaced with verified bank UUIDs before publication. Because pending assessment Sections are `disabled: true`, the ordinary Lesson completion check cannot count a pending Quiz toward `quizRequiredForCompletion: true`.

## Draft Preview and publication boundary

An ordinary Lesson Content Section can show the notice immediately. Normal runtime renderers may intentionally hide disabled Quiz/Flashcards Sections; **Agent H owns Draft Preview presentation and suppression of nonexistent bank loading**. A preview must display an explicit pending state rather than query a missing bank or attempt an assessment. The source validators check structural and Props consistency only; a valid Build result is **not** publication readiness. **Agent G owns production lint of direct `definePending*` imports** and the release boundary. Keep such imports out of completed authoring code.

No production Config/Props `pending` discriminant, duplicate registry, special renderer or implicit bank is introduced here.
