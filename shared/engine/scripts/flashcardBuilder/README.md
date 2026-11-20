# Flashcard bank YAML → TypeScript scaffold

This is a **create-only** source scaffolder for one existing Lesson-owned Flashcard bank, independent of the Lesson Builder and the assessment resource publisher. Follow repository `AGENTS.md`, `shared/engine/scripts/AGENTS.md`, and the Studio [Create Flashcards Flow](../../../studio/skills/lesson-workflow/create-flashcards-flow.skill.md) first.

## Verify Flashcards Section selections

After materializing an independently reviewed bank, check the actual Lesson's
Flashcards Section references without rewriting the Lesson:

```sh
node shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs --package content/playground --lesson <uuid> --verify-sections
```

The verifier requires an authored `flashcards/index.ts`, validates the whole
source bank and checks every statically declared `defineFlashcardsSection`:
its identity, literal unique ordered `flashcardIds`, membership in the **full**
bank and registration in `sections/index.ts`. No embedded Section is allowed
and reported as zero. This is not editorial approval, full publication or
evidence that translations and linked media exist. Dynamic Section definitions
require manual review. Its static Section parser is local to the Flashcard
Builder and does not depend on the retired Questions verifier (PR #759).

After the Engine build:

```sh
node shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs --package content/playground --lesson <uuid> --preflight
node shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs --package content/playground --lesson <uuid> --write
node shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs --package content/playground --lesson <uuid> --check
```

The single input is `content/<textbook>/data/lessons/<bucket>/<uuid>/flashcards.yaml`. Its envelope is `lessonId`, `documentLanguage`, `supportedLanguages`, `flashcards: {items, order}`, and optional `relationships: {items, order}`. Each card is validated with Engine's actual `yamlFlashcard_Schema`; **no authored card-level `type`**. `parameters.flags` is an array of typed flag entries (`[]` when none), **not** a named `items/order` collection. Non-custom built-in flags may appear only once per card; multiple custom flags are allowed. Flashcard `build.overrides` replaces the complete flags array. Each relationship is authored once as `{relationshipId,type,source,target}`, keyed by a stable slug; the converter materializes two typed endpoint links with preserved direction.

All front/back/hint blocks are nested canonical Engine-shaped Config maps. The generator emits usable Text/Markdown/Code Config drafts. It also scaffolds Audio/Image/Video/Subtitles Config nodes **without physical filenames**, inserting a visible `TODO(asset)` beside each factory invocation and one
real `TODO (BLOCKER):` comment per pending media ContentBlock. Existing
Blocker TODO CI recognizes this source comment; Draft PRs are exempt and
Ready PRs are enforced according to their target branch. Such media drafts deliberately require completion, may fail TypeScript and must not be published. Exact existing assets must be verified against the #645 SHA-pinned Lesson media reference before completing their `locale.fileName` (and video `posterFileName`). It **explicitly blocks** Question-field reuse until real typed imports can be verified; never invent values, assets or copies of localized Question facts to bypass this. Only the declared `documentLanguage` may occur in authored locale dictionaries; the complete `supportedLanguages` remains an intended production requirement, not a licence to copy source-language text into other locale entries. Source-only generated TypeScript is **not** proof of the Lesson's required translations or editorial review. Use the Lesson's real language tuple in full publication.

`--preflight` checks without writing, `--write` creates `flashcards/index.ts` only if no authored bank entrypoint exists, and `--check` compares **untouched** deterministic drafts. With an existing entrypoint, `--write` returns `skipped: true` **before parsing stale YAML** (even when the agent refined TS). A partial bank tree without its root entrypoint blocks creation to avoid mixing drafts. Do not use strict `--check` on hand-edited TS as a later-stage approval gate. **The source YAML is never deleted automatically.** Remove it only after independent Memory Review, complete faithful TypeScript/asset materialization, and verification at the final production boundary; Git retains source history.

No Lesson or Question files, published resources, language defaults, approvals, external asset trees or UI Kit code are modified by this script. The separate existing `generateAssessmentResources --kind flashcard` reads finished typed banks.

## Pending Lesson Section handoff

Lesson Stage 6 may create an initially incomplete `flashcards.yaml` with optional top-level `sectionDrafts: { items, order }`. It preserves the full author-approved Flashcards Section Config, stable UUID, learner copy and placement that could not yet compile as a Section. This temporary authoring metadata is **not** a Flashcard, a selection, or a published Config. The independent Flashcards workflow completes genuine bank entries and later integrates reviewed Section selections; this Builder never generates or modifies the Lesson Section itself. An empty bank draft intentionally fails normal Flashcard preflight until its content is authored. Do not overwrite an existing independently edited `flashcards.yaml` merely to insert a handoff.
