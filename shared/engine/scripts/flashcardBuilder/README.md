# Flashcard bank YAML → TypeScript scaffold

This is a **create-only** source scaffolder for one existing Lesson-owned Flashcard bank, independent of the Lesson Builder and the assessment resource publisher. Follow repository `AGENTS.md`, `shared/engine/scripts/AGENTS.md`, and the Studio [Create Flashcards Flow](../../../studio/skills/lesson-workflow/create-flashcards-flow.skill.md) first.

After the Engine build:

```sh
node shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs --package content/playground --lesson <uuid> --preflight
node shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs --package content/playground --lesson <uuid> --write
node shared/engine/scripts/flashcardBuilder/flashcardBuilder.mjs --package content/playground --lesson <uuid> --check
```

The single input is `content/<textbook>/data/lessons/<bucket>/<uuid>/flashcards.yaml`. Its envelope is `lessonId`, `documentLanguage`, `supportedLanguages`, `flashcards: {items, order}`, and optional `relationships: {items, order}`. Each card is validated with Engine's actual `yamlFlashcard_Schema`; **no authored card-level `type`**. Each relationship is authored once as `{relationshipId,type,source,target}`, keyed by a stable slug; the converter materializes two typed endpoint links with preserved direction.

All front/back/hint blocks are nested canonical Engine-shaped Config maps. The initial implementation allows Text/Markdown/Code blocks with complete source-language learner text. It **explicitly blocks** Question-field and media-dependent cards until their real typed source and the #645 derived media reference can be resolved; never invent values, assets or copies of localized Question facts to bypass this. Source-only generated TypeScript is **not** proof of the Lesson's required translations or editorial review. Use the Lesson's real language tuple in full publication.

`--preflight` checks without writing, `--write` creates the independent `flashcards/index.ts` if absent, and `--check` compares deterministic output. Existing TS differing from YAML is always an error (no overwrite); matching TS is left alone. **The source YAML is never deleted automatically.** Remove it only after independent Memory Review, complete faithful TypeScript/asset materialization, and verification at the final production boundary; Git retains source history.

No Lesson or Question files, published resources, language defaults, approvals, external asset trees or UI Kit code are modified by this script. The separate existing `generateAssessmentResources --kind flashcard` reads finished typed banks.
