# Typed assessment-bank source materialization

## Four explicit Engine Build APIs

| Lesson-owned bank | Stage 1 authorized handoff | Independently reviewed Stage 3 |
| --- | --- | --- |
| Question Bank | `materializeQuestionBankDraft()` | `materializeQuestionBank()` |
| Flashcard Bank | `materializeFlashcardBankDraft()` | `materializeFlashcardBank()` |

Each draft operation creates only the owning bank's editable `questions/index.ts` or `flashcards/index.ts` satisfying its canonical Stage 1 workflow type. It does not mint Questions/Cards, create Section selections or publish Props.

The reviewed operations require the exact final `QuestionBankWorkflowMaterializerInput` or `FlashcardBankWorkflowMaterializerInput` from #786. They call all nine existing concrete Question-kind source materializers or, for Cards, the existing per-Card and Side materializers. The shared Block dispatcher invokes actual concrete Block implementations (including Carousel and Checkpoint). All members are exported, not just Lesson-Section selections.

## Trusted boundary: source plans, not filesystem writes

All four operations produce a sorted, deterministic `BankSourceResult` with authored TS/Markdown manifests and `publishable: false`. **They do not write to disk/Git or publish JSON.** The trusted #775 writer owns atomic commit, repo-root/owner-relative path checking and protected branch authorization. It must obtain a complete Git tree snapshot of the exact current PR HEAD, preflight every returned path and symlink ancestor, then atomically apply the *entire* plan with a HEAD lease and no blind overwrite. Do not apply per-file writes.

Final materialization additionally requires independently reviewed exact Stage 3 editor bytes, their Git blob SHA and approval evidence from the existing child PR. A trusted evaluator of that exact TS revision must compute `BankReviewedSource.reviewedInputSha256` as the SHA-256 of `JSON.stringify(stage3Input, null, 2)` and verify that it corresponds to the parsed staged object. The bank operation checks that digest before rendering. An agent-authored approval boolean or source checksum alone never grants production authorization.

## Safe Stage 3 → bank index transition

The editor has occupied `<bank>/index.ts` through Stages 1–3. The final operation proposes a single atomic transaction: (1) archive the **byte-identical approved editor source** as `questions.reviewed-stage3.ts.txt` / `flashcards.reviewed-stage3.ts.txt` at the owning Lesson root, (2) replace only the SHA-pinned bank index with the final complete registry, (3) create the separately named full member modules, and (4) create a source-only language tuple `questionsLanguages.ts` / `flashcardsLanguages.ts` at the Lesson root. The archive is durable review provenance, not an editable second workflow. Never silently delete or overwrite it.

Keep the Question Bank root free of extra files. Canonical layout: `questions/<questionType>/<questionSlug>.ts`, `questions/<questionType>/index.ts` re-exporting each leaf, `questions/index.ts` importing through those indexes and exporting the complete `questions` bank. The existing static assessment review adapter rejects unregistered root files, flattened Question modules and nested Question entrypoints. Flashcards use individual `flashcards/<slug>.ts` and `flashcards/index.ts` for all Cards; Sides remain owned by each Card.

Preflight refuses stale HEAD/review SHA or evaluated-input digest, divergent hand edits, duplicate paths, unsafe/symlink targets, partial applied migrations, and duplicate immutable UUIDs (including nested Blocks). Flashcard relationship edges are authored once and projected to both immutable Card UUID endpoints as peer/source/target without duplicating a graph. Questions-first completion/N/A and bank N/A exceptions need independently verified explicit evidence.

## Validation and release boundaries

Stage 1/Stage 3 editorial source is not a `define*` Configurator. Materializer output is not published and never modifies Lesson/Quiz/Flashcards Sections. Missing translations, incomplete media or Scene evidence and unsupported typed Question field reuse fail closed or remain blockers for the independent publisher. The live YAML builders/CI and `generateAssessmentResources` remain unchanged.

Engine's test runner already includes `generators/materializers/*/*.spec.ts`. After merging #786's authoritative workflow types and #775's shared Git writer, execute Engine typechecks, full Engine tests, semantic generated-TS Build checks and the actual owning textbook publisher/strict build. Passing syntactic transpilation alone is insufficient.
