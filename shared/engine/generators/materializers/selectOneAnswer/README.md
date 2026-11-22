# Agent E — Questions and Flashcards source materializers

**Status:** all 11 assigned concrete kinds implemented on this child Draft PR. **Not integrated into the parent production CLI and not claimed production-ready.** This PR targets `architecture/typed-production-materializers` (#775).

## Ownership and exact generated source boundaries

Nine Question variants each have an isolated `materialize<Kind>.ts` and adjacent `*.spec.ts`. Input is a typed ordinary Config-data node and separate production metadata; it is **not** YAML, a built Configurator or published Props. Each Question produces its canonical `questions/<questionType>/<slug>.ts`; nested ContentBlocks live under `<questionType>/<slug>/content/.../index.ts`. The Question owns typed `define<Kind>` emission, ordered collections and child placement, but **delegates ContentBlock implementation** through its narrow `materializeBlock` callback supplied by the parent. No kind depends on another Question variant.

`flashcard/materializeFlashcard.ts` emits `flashcards/<slug>.ts`, delegating `content.front/back/hint` to the actual `flashcardSide/materializeFlashcardSide.ts`. Each side emits `flashcards/<slug>/content/<side>/index.ts` with `defineFlashcardSide` and its ordered imported ContentBlocks. Sides have **no UUID, slug, or independent bank identity**. The card uses `defineFlashcard` without an authored `type` field, and preserves its ordered relationships and unordered flag array.

Each render returns a deterministic in-memory file manifest, named `exportName` and diagnostics. The parent still owns global type/stage contracts, wiring the concrete child callbacks, textbook destinations, collision detection across entities, atomic preflight/check/write, verified source expressions and production gates. `existingPaths` provides a local create-only guard for all emitted files, but is **not a replacement** for the parent's symlink, race and safe-writer checks.

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
