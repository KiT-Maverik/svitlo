# Questions and Flashcards source materializers

**Scope:** eleven concrete kind renderers; individual renderer validity is not approval, live workflow evidence or bank publication readiness.

## Ownership and exact generated source boundaries

Nine Question variants each have an isolated `materialize<Kind>.ts` and adjacent `*.spec.ts`. Input is a typed ordinary Config-data node and separate production metadata; it is **not** YAML, a built Configurator or published Props. Each Question produces its canonical `questions/<questionType>/<slug>.ts`; nested ContentBlocks live under `<questionType>/<slug>/content/.../index.ts`. The Question owns typed `define<Kind>` emission, ordered collections and child placement, but **delegates ContentBlock implementation** through its narrow `materializeBlock` callback supplied by the parent. No kind depends on another Question variant.

`flashcard/materializeFlashcard.ts` emits `flashcards/<slug>.ts`, delegating `content.front/back/hint` to the actual `flashcardSide/materializeFlashcardSide.ts`. Each side emits `flashcards/<slug>/content/<side>/index.ts` with `defineFlashcardSide` and its ordered imported ContentBlocks. Sides have **no UUID, slug, or independent bank identity**. The card uses `defineFlashcard` without an authored `type` field, and preserves its ordered relationships and unordered flag array.

**Course and bank contract:** Question/Flashcard Banks remain independent from Course Stage 2/3 provisional Lesson/Episode placements. Contexts now take `languages: { document, planned }` with Engine's canonical `LanguageCode`/`SupportedLanguages`, structurally matching `CourseWorkflowStage1Languages` without a Course-specific runtime dependency. Compile-time fixtures for SelectOneAnswer and Flashcard consume objects checked with `satisfies CourseWorkflowStage1Languages`. The parent passes an independently reviewed bank language plan at Stage 5; old `documentLanguage` / `plannedLanguages` fields have been removed instead of preserved as compatibility aliases. Stage 3 existing Lesson reuse `production.existing: {id,base?,locale?}` is parent-owned and must not be confused with bank content. Stage 4 reviews the same Stage 3 source SHA, without introducing new Config fields. Bank-specific Stage 1–3 typed contracts and independent Stage 4 review govern the separate Question and Flashcard source workflows.

Each render returns a deterministic in-memory file manifest, named `exportName` and diagnostics. The parent still owns global type/stage contracts, wiring the concrete child callbacks, textbook destinations, collision detection across entities, atomic preflight/check/write, verified source expressions and production gates. `existingPaths` provides a local create-only guard for all emitted files, but is **not a replacement** for the parent's symlink, race and safe-writer checks.

## Lesson → Question/Flashcard staged handoff boundary

A Lesson may require an **independent Question Bank**, an **independent Flashcard Bank**, a **Quiz Section**, and/or a **Flashcards Section**. These are _four distinct production decisions_, represented by the shared production-only `LessonProductionAssessmentRequirements` type. A planned bank does **not** mean that an individual Question/Flashcard exists, that an independently reviewed UUID has been assigned to such a member, or that a Section/selection must be created.

- **At the parent Lesson Flow handoff:** the owning Lesson workflow may create a **minimal child-owned `draft.ts`** typed with the **child bank's canonical Stage 1 workflow type**. Only known immutable identity/ownership, scope, languages and editorial production intent belong in that staged object. This file is an **incomplete authored workflow entrypoint**, not a fully materialized bank, Question, Flashcard or published Props object; it must remain unpublishable until that independent workflow is completed.
- **Do not call `materializeSelectOneAnswer` through `materializeFillBlanksWithText`, `materializeFlashcard`, or `materializeFlashcardSide` at that handoff.** These eleven renderers produce complete, individual `define*` modules (and real nested ContentBlock source) only after Question/Flashcard authorship and independent review have yielded the actual final Config-shaped data. They must reject editorial-only handoff objects rather than fabricate questions, cards, sides, translations, bank members, Section selections or reviewed bank UUIDs. Adjacent negative tests cover all nine Question kinds, the Flashcard and its Side.
- **Ownership:** canonical workflow types live in `shared/engine/types/workflow/`; bank-level materializers and the trusted writer own the reviewed draft deletion/index creation, global checks and orchestration. Individual kind renderers do not create editorial handoffs or define duplicate contracts.

## Concrete kind contracts

| Kind                    | Owned child paths and semantic constraints                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectOneAnswer`       | Common prompt/hint/explanation; distinct `answers.correct/incorrect/distractors` ordered blocks; exactly one correct                                                 |
| `selectMultipleAnswers` | Same three scoring collections; at least one correct; answer-key slugs unique across groups                                                                          |
| `matchBlocks`           | Named ordered `pairs.items.*.left/right` delegated separately; at least one complete pair                                                                            |
| `answerWithText`        | Named localized `locale.correctAnswers`, optional placeholder; no synthetic accepted strings                                                                         |
| `answerWithNumber`      | Finite nonempty numeric `params.correctAnswers`; localized placeholder                                                                                               |
| `orderSequence`         | Ordered `content.sequence.items`; at least one real block                                                                                                            |
| `buildAnswerWithBlocks` | Separate nonempty ordered `correctSequence` and ordered `distractors`                                                                                                |
| `fillBlanksWithBlocks`  | Named ordered `slots.items.*.correctAnswer` plus `distractors`; preserve selectors                                                                                   |
| `fillBlanksWithText`    | Named ordered text `slots.items.*.correctAnswers` with nested source-locale values; no child Configurator inside a text slot                                         |
| `flashcard`             | Real front/back and optional hint Side delegation; ordered relationship UUID refs, typed `flags: []`, built-in flag uniqueness, custom/abbreviation localized values |
| `flashcardSide`         | Source-only side with no identity; exact `items/order`, role constraints and delegated child blocks                                                                  |

**Delegated:** concrete ContentBlock/Scene renderers own media and nested source. The bank orchestrator owns UUID allocation, reviewed source preservation and atomic filesystem/Git safety.

## Verification

All **11 independently owned concrete materializers** have adjacent Node regression suites for deterministic source paths, blocked and incomplete states, exact collections/ordering, source locales, child delegation and create-only/no-clobber rejection. These tests are now included in the standard `@svitlo/engine` `test` command via `.test-build/generators/materializers/*/*.spec.js`, not merely compiled.

The separate `selectOneAnswer/materializedTypecheck.spec.ts` **semantic TypeScript integration test** invokes real Question, Flashcard and FlashcardSide materializers, uses real `defineText` ContentBlock source fixtures, writes the generated modules to a safely cleaned ignored `temp/` directory, and compiles all emitted TypeScript with `ts.createProgram` against the real `@svitlo/engine/build` authoring type declarations. Unlike `ts.transpileModule`, this checks imported module types, child type constraints and explicit `define*` generic compatibility. It is a representative smoke test, **not** exhaustive typechecking of every Question variant or a claim of production publication readiness.

**Verified in GitHub Actions on `34886e73`:** [Engine coverage run #45052061817](https://github.com/KiT-Maverik/svitlo/actions/runs/45052061817) completed successfully after executing the registered materializer specs and semantic compilation fixture, alongside the existing Engine suite. It also passed Engine build and test TypeScript compilation. Earlier [run #45051762425](https://github.com/KiT-Maverik/svitlo/actions/runs/45051762425) exposed incorrect empty-prompt and FlashcardSide diagnostic test fixtures, corrected at `34886e73`; those tests now execute and pass. The run is evidence for the pinned SHA, not automatically for later parent changes.

Local reproduction with installed workspace dependencies:

```sh
npm run package:build --workspace @svitlo/engine
npx tsc -p shared/engine/tsconfig.test.json
node --test shared/engine/.test-build/generators/materializers/*/*.spec.js
```

The typed Bank Stage 5 orchestration owns complete generator-to-production wiring, all-kind final Config validation, GitHub SHA-pinned editorial review, safe atomic filesystem writing and source eligibility gates. The Lesson and bank workflows own their Stage 1 handoffs; follow the shared CI and GitHub lifecycle rules.
