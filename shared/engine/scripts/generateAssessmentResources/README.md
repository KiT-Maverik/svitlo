# Independently published Questions and Flashcards

Stage B and Stage C may independently publish existing typed authoring modules, without mutating Lesson Config/Props. Run from the repository root after building Engine:

```sh
node shared/engine/scripts/generateAssessmentResources/generateAssessmentResources.mjs --package content/playground --kind question --write
node shared/engine/scripts/generateAssessmentResources/generateAssessmentResources.mjs --package content/playground --kind flashcard --write
node shared/engine/scripts/generateAssessmentResources/generateAssessmentResources.mjs --package content/playground --kind all --write
```

`--check` verifies byte-for-byte generated output without writing. Each kind's independent stage is under `generated/assessmentStages/<kind>`; the final `all` publication merges both metadata manifests and is staged under `generated/assessments/`. The portable textbook build copies those resources under `static/data`, separately from Lesson Props. Full Question/Flashcard bodies remain outside `base.json` and `<locale>.json` Lesson files.

The portable textbook `package:build` invokes the combined publication when authored typed bank entrypoints exist, and includes each generated file in the textbook manifest. The current implementation consumes completed existing TypeScript banks from each Lesson's `questions/index.ts` and `flashcards/index.ts`, and their owner's configured publication languages. The old Questions/Flashcards YAML Builders were removed in #775. The separate reviewed typed Bank Stage 5 source-materialization transactions generate the complete authoring module trees from canonical staged `questions/index.ts`/`flashcards/index.ts`; this publisher consumes only **completed** resulting Configurators and never edits a bank or Quiz/Flashcards Section. Approved Section selections use imported Configurator `.id` values. UUID, kind, locale and duplicate-identity validation happens before publication, and generated output is replaced atomically.

Media inside authored Question/Flashcard ContentBlocks is validated and resolved
using the same textbook-wide UUID asset rules as Lesson/Course Props.
`--draft` permits missing physical media with warnings; Production is strict,
with aggregated diagnostics and `--preflight` for write-free readiness checks.
The bank structure and independent assessment ownership are unchanged.

## Global published addressing (PR #668)

Published Question JSON uses `data/questions/<last-uuid-hex>/<uuid>/base.json` plus genuine sparse locale files. Flashcards use the analogous `data/flashcards/` root. The textbook-scoped `data/assessments/manifest.json` indexes the entire UUID set and records `ownerLessonId` only as authoring provenance; it contains no assessment bodies. Each kind's independent generation stage emits its own metadata index, then `--kind all` validates both against content hashes and rejects global UUID collisions before staging the merged index. No Lesson-relative alias is published.

The complete production build validates selected Question/Flashcard candidates and their effective Lesson languages after staging through `verifyAssessmentSelections`. Runtime English fallback for a missing requested locale is _not_ permission to omit a required declared translation at publication time.
