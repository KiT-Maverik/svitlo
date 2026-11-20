# Question and Quiz translation review references

`generate-question-review-artifacts.mjs` statically reads the complete canonical
Question registry and directly relevant Quiz Sections for one Lesson. It does
not execute authored TypeScript or publish assessment resources.

Supported Question sources:

- Flat Playground bank: `questions/index.ts` with `questions/<slug>.ts`.
- Modular Lesson bank: `questions/index.ts` with
  `questions/selectOneAnswer/<slug>/index.ts` and locally imported Text
  modules, including grouped answer options.

Source-language selection reads only an explicitly declared single `languages`
value from Lesson `constants.ts`. The legacy Playground's computed roster
imports Engine runtime values; these are **never executed** to infer the
comparison language, and the adapter uses the verified `en` Text source.
An unsupported dynamic declaration named `languages` fails explicitly.

The only supported Question type is `selectOneAnswer`; unsupported kinds,
unexpected imports, dynamic expressions, unsafe paths, duplicate IDs and invalid
ordered collections fail the requested locale document. For a relevant local
`defineQuizSection`, the reference also shows its `title`,
`navigationLabel`, Section-owned Text or Markdown content, selected question IDs,
source links and complete physical Markdown. Quiz-only strings are tracked
separately from Question strings. All Question bank members are included even
when a Quiz selects a subset.

Invoke via the repository dispatcher, for example:

```sh
node scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs --kind questions --package content/astronomy --lesson c042698a-de5b-5055-9e10-ff5621f80ed7 --locale qm
```

Output: `.agent-ci-artifacts/questions/<book>/<uuid-bucket>/<lesson-uuid>/<locale>.md`.
References are temporary read-only review inputs, not localized authored data or
translation approval. A missing requested target value is shown as
`%%MISSING%%` and marks that document `reviewReady: false`. Any unresolved
source or missing physical Markdown is a manifest failure, and Question
generation exits nonzero if any requested document fails.

Test the generator with:

```sh
node --test shared/engine/scripts/generateQuestionReviewArtifacts/*.spec.mjs
node --test scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.spec.mjs
```
