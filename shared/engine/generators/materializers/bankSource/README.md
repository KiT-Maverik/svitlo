# Typed assessment-bank source materialization

## Four explicit Engine Build APIs

| Lesson-owned bank | Stage 1 authorized handoff        | Pinned final Stage 3         |
| ----------------- | --------------------------------- | ---------------------------- |
| Question Bank     | `materializeQuestionBankDraft()`  | `materializeQuestionBank()`  |
| Flashcard Bank    | `materializeFlashcardBankDraft()` | `materializeFlashcardBank()` |

Each draft operation creates only the owning bank's editable `questions/draft.ts` or `flashcards/draft.ts` satisfying its canonical Stage 1 workflow type. It does not mint Questions/Cards, create Section selections or publish Props.

The final-stage operations require the exact final `QuestionBankWorkflowMaterializerInput` or `FlashcardBankWorkflowMaterializerInput`. They call all nine existing concrete Question-kind source materializers or, for Cards, the existing per-Card and Side materializers. The shared Block dispatcher invokes actual concrete Block implementations (including Carousel and Checkpoint). All members are exported, not just Lesson-Section selections.

## Trusted source transition and Git commit boundary

The four materializers return sorted non-publishable `BankSourceResult` plans and never write directly. Each bank has explicit `check*DraftSource` / `write*DraftSource` and `checkReviewed*Source` / `writeReviewed*Source` adapters in its own directory. These adapters **recompute the entire plan**, supply a fresh complete Git tree snapshot from the actual checked-out child PR HEAD, and use `bankSourceGitTransaction.ts` to validate/create a **single new Git tree and commit** with an expected-old-HEAD ref lease. No generic materializer registry is introduced.

The trusted caller supplies the exact UUID-addressed Lesson root, child branch and SHA, Stage 1 authorization or pinned Stage 3 source, and the Stage 3 object evaluated from those exact TS bytes. The transaction verifies the reviewed Git commit's original editor bytes, evaluated-input digest, case-sensitive paths, symlink ancestors, clean checkout, all bank-owned files, and collisions before a write. Stage 1 is create-only (unchanged reruns are no-ops). Final Stage 5 consumes only the precisely approved draft and creates the index and all member files in one branch commit. The in-memory and Git snapshots are not caller-selected.

**Git ref, not the local checkout, is the committed result.** The writer intentionally leaves the working tree and index untouched; after a real write, the caller must refresh that clean checkout before further operations. This prevents a hidden reset or overwrite of other local files. If a lease fails, the old branch ref is untouched. Trusted GitHub PR authorization, staged TS evaluation, branch protection and workflow command deployment remain the trusted GitHub workflow's responsibility; this local transaction API by itself does not grant them.

Final materialization requires exact Stage 3 editor bytes and their Git commit/blob SHAs, not editorial approval evidence from the child PR. A trusted evaluator of that exact TS revision must compute `BankPinnedSource.inputSha256` as the SHA-256 of `JSON.stringify(stage3Input, null, 2)` and verify that it corresponds to the parsed staged object. The bank operation checks that digest before rendering. An agent-authored approval boolean or source checksum alone never grants production authorization.

## Safe Stage 3 → bank index transition

The editor occupies `<bank>/draft.ts` through Stages 1–3. The final atomic transaction deletes that exact reviewed draft, creates `<bank>/index.ts` and all complete member modules, and creates the source-only language tuple at the Lesson root. The approved parent Git commit and blob preserve the exact original bytes. A consumed draft cannot be materialized again; existing outputs are never clobbered.

Keep the Question Bank root free of extra files. Canonical layout: `questions/<questionType>/<questionSlug>.ts`, `questions/<questionType>/index.ts` re-exporting each leaf, `questions/index.ts` importing through those indexes and exporting the complete `questions` bank. The existing static assessment review adapter rejects unregistered root files, flattened Question modules and nested Question entrypoints. Flashcards use individual `flashcards/<slug>.ts` and `flashcards/index.ts` for all Cards; Sides remain owned by each Card.

Nested Question ContentBlocks are stored under the owning question's semantic role, e.g. `questions/selectOneAnswer/<slug>/question/<block>/index.ts` and `questions/selectOneAnswer/<slug>/answers/correct/<block>/index.ts`; generated `content/items` wrappers are deliberately absent. FlashcardSide retains its owner role boundary (`flashcards/<slug>/content/front/index.ts`, similarly back/hint), but places child blocks directly at `.../front/<block>/index.ts`. The literal authored `items/order` collections remain unchanged. Leaf renderers reject child outputs escaping their delegated role folders; the trusted Git publisher still enforces the complete tree and no-clobber rules.

Preflight refuses stale HEAD/review SHA or evaluated-input digest, divergent hand edits, duplicate paths, unsafe/symlink targets, partial applied migrations, and duplicate immutable UUIDs (including nested Blocks). Flashcard relationship edges are authored once and projected to both immutable Card UUID endpoints as peer/source/target without duplicating a graph. Questions-first completion/N/A and bank N/A exceptions remain editorial decisions; no PR description, checklist or verdict is a technical prerequisite.

## Validation and release boundaries

Stage 1/Stage 3 editorial source is not a `define*` Configurator. Materializer output is not published and never modifies Lesson/Quiz/Flashcards Sections. Missing translations, incomplete media or Scene evidence and unsupported typed Question field reuse fail closed or remain blockers for the independent publisher. The retired YAML builders/commands are not supported alternatives. `generateAssessmentResources` remains a distinct publisher of fully authored Configurator banks and must not publish unreviewed Stage 1–3 editorial source.

Engine's test runner already includes `generators/materializers/*/*.spec.ts`. Run Engine typechecks, full Engine tests (including temporary real-Git transaction suites), semantic generated-TS Build checks and the actual owning textbook publisher/strict build. Passing syntactic transpilation alone is insufficient.
