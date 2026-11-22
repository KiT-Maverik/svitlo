# Agent E — Questions and Flashcards source materializers

**Status:** all 11 assigned concrete kinds implemented on this child Draft PR. **Not integrated into the parent production CLI and not claimed production-ready.** This PR targets `architecture/typed-production-materializers` (#775).

## Ownership and exact generated source boundaries

Nine Question variants each have an isolated `materialize<Kind>.ts` and adjacent `*.spec.ts`. Input is a typed ordinary Config-data node and separate production metadata; it is **not** YAML, a built Configurator or published Props. Each Question produces its canonical `questions/<questionType>/<slug>.ts`; nested ContentBlocks live under `<questionType>/<slug>/content/.../index.ts`. The Question owns typed `define<Kind>` emission, ordered collections and child placement, but **delegates ContentBlock implementation** through its narrow `materializeBlock` callback supplied by the parent. No kind depends on another Question variant.

`flashcard/materializeFlashcard.ts` emits `flashcards/<slug>.ts`, delegating `content.front/back/hint` to the actual `flashcardSide/materializeFlashcardSide.ts`. Each side emits `flashcards/<slug>/content/<side>/index.ts` with `defineFlashcardSide` and its ordered imported ContentBlocks. Sides have **no UUID, slug, or independent bank identity**. The card uses `defineFlashcard` without an authored `type` field, and preserves its ordered relationships and unordered flag array.

**Compatibility with #775 (current Course Stages 1–3):** Question/Flashcard Banks remain independent from Course Stage 2/3 provisional Lesson/Episode placements. Contexts now take `languages: { document, planned }` with Engine's canonical `LanguageCode`/`SupportedLanguages`, structurally matching `CourseWorkflowStage1Languages` without a Course-specific runtime dependency. Compile-time fixtures for SelectOneAnswer and Flashcard consume objects checked with `satisfies CourseWorkflowStage1Languages`. The parent passes an independently reviewed bank language plan at Stage 5; old `documentLanguage` / `plannedLanguages` fields have been removed instead of preserved as compatibility aliases. Stage 3 existing Lesson reuse `production.existing: {id,base?,locale?}` is parent-owned and must not be confused with bank content. Stage 4 reviews the same Stage 3 source SHA, without introducing new Config fields. Bank-specific Stage 1–4 production types are not yet provided by #775.

Each render returns a deterministic in-memory file manifest, named `exportName` and diagnostics. The parent still owns global type/stage contracts, wiring the concrete child callbacks, textbook destinations, collision detection across entities, atomic preflight/check/write, verified source expressions and production gates. `existingPaths` provides a local create-only guard for all emitted files, but is **not a replacement** for the parent's symlink, race and safe-writer checks.

## Lesson → Question/Flashcard staged handoff boundary (#775 / #777 / #780)

A Lesson may require an **independent Question Bank**, an **independent Flashcard Bank**, a **Quiz Section**, and/or a **Flashcards Section**. These are *four distinct production decisions*, represented by the shared production-only `LessonProductionAssessmentRequirements` type in parent #775. A planned bank does **not** mean that an individual Question/Flashcard exists, that an independently reviewed UUID has been assigned to such a member, or that a Section/selection must be created.

- **At the parent Lesson Flow handoff:** the owning Lesson workflow may create a **minimal child-owned `index.ts`** typed with the **child bank's canonical Stage 1 workflow type**. Only known immutable identity/ownership, scope, languages and editorial production intent belong in that staged object. This file is an **incomplete authored workflow entrypoint**, not a fully materialized bank, Question, Flashcard or published Props object; it must remain unpublishable until that independent workflow is completed.
- **Do not call `materializeSelectOneAnswer` through `materializeFillBlanksWithText`, `materializeFlashcard`, or `materializeFlashcardSide` at that handoff.** These eleven renderers produce complete, individual `define*` modules (and real nested ContentBlock source) only after Question/Flashcard authorship and independent review have yielded the actual final Config-shaped data. They must reject editorial-only handoff objects rather than fabricate questions, cards, sides, translations, bank members, Section selections or reviewed bank UUIDs. Adjacent negative tests cover all nine Question kinds, the Flashcard and its Side.
- **Ownership:** #775 defines canonical staged bank workflow input types, validation/release gates, safe writers, and parent-to-child orchestration. #777 integrates the Lesson handoff, using the independently owned bank directories. #780 intentionally implements **only the later complete individual-entity materializers**. It must not define a competing `QuestionBankWorkflowStage1` / `FlashcardBankWorkflowStage1`, add a generic child materializer, or duplicate the methodology model. Quest handoffs, when independently supported, follow their actual Quest contract instead.
- **Open parent dependency (verified 2026-11-22):** `shared/engine/types/workflow/index.ts` exports Course Stage 1–3 and `LessonProductionAssessmentRequirements`, but **no canonical Question Bank / Flashcard Bank Stage 1 workflow types** yet. The parent must define these before the Lesson emits typed `index.ts` handoffs. This child PR cannot assert a Stage 1 bank file compiles until the parent supplies those contracts and the Lesson orchestration exists.

## Specific old YAML → TypeScript parity

| Kind | Owned child paths and semantic constraints |
| --- | --- |
| `selectOneAnswer` | Common prompt/hint/explanation; distinct `answers.correct/incorrect/distractors` ordered blocks; exactly one correct |
| `selectMultipleAnswers` | Same three scoring collections; at least one correct; answer-key slugs unique across groups |
| `matchBlocks` | Named ordered `pairs.items.*.left/right` delegated separately; at least one complete pair |
| `answerWithText` | Named localized `locale.correctAnswers`, optional placeholder; no synthetic accepted strings |
| `answerWithNumber` | Finite nonempty numeric `params.correctAnswers`; localized placeholder |
| `orderSequence` | Ordered `content.sequence.items`; at least one real block |
| `buildAnswerWithBlocks` | Separate nonempty ordered `correctSequence` and ordered `distractors` |
| `fillBlanksWithBlocks` | Named ordered `slots.items.*.correctAnswer` plus `distractors`; preserve selectors |
| `fillBlanksWithText` | Named ordered text `slots.items.*.correctAnswers` with nested source-locale values; no child Configurator inside a text slot |
| `flashcard` | Real front/back and optional hint Side delegation; ordered relationship UUID refs, typed `flags: []`, built-in flag uniqueness, custom/abbreviation localized values |
| `flashcardSide` | Source-only side with no identity; exact `items/order`, role constraints and delegated child blocks |

Historical migration reference actually inspected on `integration/unified-yaml-materialization-preview` (#769/#772): `recursiveMaterializer.mjs` and tests, `yamlScaffolding.mjs`, `productionScaffolding.mjs`, its README; existing `questionsBuilder`, `flashcardBuilder`, real Engine Question/Flashcard Config schemas and factory tests. Kept: canonical concrete `define*` factories and generic types, UUIDs and slugged exports, nested imports, review TODO blockers, source-language localization filtering (including Flashcard flags), planned-language TODO, authored values and specifications, deterministic paths, explicit missing-content/order errors, and refusal to touch existing outputs. No fake translations, Questions, Flashcard relations or media.

**Delegated / N/A:** Markdown/Code source files and readers are owned by Agent C's concrete ContentBlock materializers. Media Nil-UUID placeholders and physical-asset TODOs likewise belong to Agent C; Scenes to Agent D. Quest/Section pending states and real assessment bank IDs are owned by Agent B and the bank production workflow. The old YAML loader is deliberately **not imported**. Global UUID allocation, approved source-expression preservation and filesystem symlink/atomic protections are parent #775 integration responsibilities, not silently reimplemented by this child.

## Verification and parent integration

Each materializer has adjacent Node tests exercising deterministic filenames/source, nested delegated imports and type-specific constraints, TypeScript syntax parsing, ordered source, blocker preservation and create-only rejection. The Flashcard tests exercise side generation, flags, relationships and locale filtering.

**Manual verification commands after parent merges this branch and dependencies are installed:**

```sh
npm run code:check:types --workspace @svitlo/engine
npx tsc -p shared/engine/tsconfig.test.json
node --test shared/engine/.test-build/generators/materializers/*/*.spec.js
```

The current Draft GitHub workflows are lightweight and may defer these type/test suites. They must **not** be marked passed until actually executed. The parent must also confirm full Engine Config validation of emitted complete source, correct generic constraints, GitHub SHA-pinned review evidence, exact writers and materialization/publisher integration. No Ready transition or merge is authorized by this subtask.
