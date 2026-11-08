# Deterministic Lesson YAML → TypeScript Builder

This is Node.js build-time tooling, **not an AI Skill**. Implementation:
[scripts/lesson-builder.mjs](../../../scripts/lesson-builder.mjs). Sources and
contracts: the three schemas in [Lesson Workflow](../../skills/lesson-workflow/README.md),
Engine creators, and the canonical content types.

## Production stage and approval gate

Run after the fixed-scope Lesson Production Issue confirms approved methodology,
approved screenwriter content and both current independent reviews with editorial
sign-off, and the approved Question Bank with curated Quiz assignments.
The Builder validates the YAML approval status and schemas, but **cannot
independently verify external GitHub approvals**. The coordinator must verify
approval links/revisions before invoking it.

The source directory is the canonical
content/<textbook>/data/lessons/<last-uuid-character>/<uuid>, containing
methodology.md (or the legacy methodologist-brief.md), content.yaml,
questions/questions.yaml, optional approved flashcards/flashcards.yaml, and
optionally scenes/*.scene-spec.md.

## Commands

    npm ci
    npm run content:generate:lessons
    npm run content:check:lessons
    npm run test:unit:lesson-builder

Or run only one authorized Lesson:

    node scripts/lesson-builder.mjs generate --source content/<textbook>/data/lessons/<bucket>/<uuid>
    node scripts/lesson-builder.mjs check --source content/<textbook>/data/lessons/<bucket>/<uuid>

Without a source argument, the root command discovers YAML Lessons across all
textbook workspaces. Generation requires approved and valid inputs; check is read-only.

## Build-time integration and ownership

The script writes **only** a root Lesson entrypoint
<lessonSlug>.data.ts and the generated/ directory under the Lesson UUID.
The root entrypoint re-exports the generated lessonData object. Existing
renderTextbookLessonFiles discovers that root file without any new runtime
imports or a second publisher.

Generated outputs:

- generated/lesson.data.ts — typed Engine creator calls, full Question Catalog,
  and (when approved YAML exists) typed Flashcards via Engine linkFlashcards.
- generated/requirements.json — machine-readable resource/contract/localization handoff.
- generated/requirements.md — corresponding human-readable handoff.
- generated/manifest.json — SHA-256 input and output fingerprints, generator
  version, Lesson ID and check categories.
  When a source cannot be mapped, the Builder fails before writing any output,
  with a file/field diagnostic; incomplete sources cannot appear generated.

The script uses stable UUIDv5 identities from the Lesson UUID and editorial
keys/paths. It skips unchanged files and refuses to overwrite manual edits,
unowned files, symlinks or competing root authored Lesson entrypoints. Changing
a Lesson slug needs an explicit migration. No timestamps or network lookups.

## Content and localization semantics

- Lesson.questions retains **every Question**, including unselected questions.
- Each Quiz Section receives its approved explicit
  quizAssignments[].selection.questionSlugs. Never omit questionSlugs to
  include the entire bank implicitly. Zero Quiz and multiple Quiz are valid.
- In the absence of UI configuration in editorial YAML, technical Quiz defaults
  are stepper, after-completion feedback, zero retries, and after-review score;
  real production can require separately approved refinements.
- supportedLanguages is preserved exactly; learner-facing dictionaries
  contain only documentLanguage. No copies, translations, fake fallbacks,
  weakened types, or suppression of target-locale TypeScript errors.
- Implement Scene owns React Scenes, Scene locale strings and the registry;
  this tool only emits typed Scene references and precise requirements.
- Media files must have safe local paths. Missing assets become requirements,
  not fabricated files, external downloads or fake URLs.

## Explicit blockers and deferred integrations

1. Flashcards: the canonical approved Flashcards schema now exists. Optional
   flashcards/flashcards.yaml is validated with the same source-language and
   UUID invariants, and compiled to typed front/back/hint ContentBlocks, built-in
   and custom flags, actual Question field references, and canonical relationships
   mirrored by Engine linkFlashcards. If the approved YAML is absent, the Lesson
   uses an empty Flashcard bank with an explicit editorial requirement. If a
   Flashcard depends on an unsupported proposed block or missing essential
   image information, generation stops with a structured blocked handoff.
   Mnemonic composition and typed references are validated; educational
   soundness and acronym translation still require review.
2. Checkpoint ContentBlocks: editorial contentSpec has no canonical typed
   mapping for required title/items. The Builder refuses unsupported conversion.
3. Question image blocks: editorial YAML lacks the required canonical image
   layout and accessible alt. The Builder requires a contract decision.
4. The repo currently contains no approved Lesson content.yaml +
   questions/questions.yaml pair. Playground howLightMoves remains a read-only
   contract integration reference; do not claim an end-to-end YAML migration.
5. Source-only Lesson data can intentionally fail TypeScript/publishing due to
   missing target-locale values. **Unrelated TypeScript errors are engineering
   failures and must be fixed.** Existing publisher requires complete locale
   dictionaries before publication; never circumvent it.

For each authorized Lesson Production Issue stage, record the approved YAML
revisions, generated file paths, manifest input SHA-256 checks, check/generation
results, unresolved requirements with owners, exact missing-translation diagnostics
separately from generated-code/API errors, and next Scene/Media/Translation stages.
Neither the Builder nor its technical PR grants editorial approval or
auto-publishes/merges/closes a Lesson.
