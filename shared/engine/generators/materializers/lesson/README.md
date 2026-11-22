# Lesson, Section and Quest source materializers — Agent B

**Status:** 10 concrete source materializers implemented in the PR #777 Draft branch.
These are **pure source renderers**, not JSON publishers or YAML parsers. Parent integration
PR #775 owns dispatch/export wiring, Production stage contracts, validation and a safe,
atomic, create-only writer; this subtask does not add a package entrypoint or change
`build.props()/build.overrides()`.

## Scope / legacy parity inventory

| Concrete kind | Factory / generics | Children and output ownership | Applicable transferred behavior |
|---|---|---|---|
| Lesson | `defineLesson<Slug, Languages, Sections>` | `sections/<slug>/index.ts`, `languages.ts` | Immutable IDs, ordered Section map, source-only languages, pending required assessment TODOs, methodology |
| Content Section | `defineContentSection<Slug, Blocks, Languages>` | `content/items/<slug>/index.ts` | Ordered ContentBlocks, localized title/navigation, independent child delegation |
| Practice Section | `definePracticeSection<Slug, Blocks, Languages>` | same | Same Section collection and locale contract |
| Coding Task Section | `defineCodingTaskSection<Slug, Blocks, Languages>` | same | Same Section collection and locale contract; Code reader delegated to Agent C |
| Learning Flow Section | `defineLearningFlowSection<Slug, Blocks, Languages>` | same | Same Section collection and locale contract |
| Flashcards Section | `defineFlashcardsSection<Slug, Blocks, Languages>` | same | Real selection IDs untouched; missing/reserved/pending selection is blocked, bank content never invented |
| Quiz Section | `defineQuizSection<Slug, Blocks, Languages>` | same | Real Question IDs, layout, scoring, screen selections and parameters preserved; incomplete cases blocked |
| Quest Section | `defineQuestSection<Slug, Stages, Tasks, Languages>` | `stages/<slug>`, `tasks/<slug>` | Maps have mandatory `start`, **no order**; Build-only runtime blocker |
| Quest Stage | `defineStage<Slug, Languages>` | `content/video/{medium,small}`, `content/audio/{dialogue,narration,background}`, `content/image`, `content/subtitles` | Mandatory Video/Image/Subtitles, explicit nullable audio slots; all non-null media delegated to Agent C |
| Quest Task | `defineTask<Slug, Languages>` | `scene/index.ts` | Exactly one Scene delegated to Agent D; pending Scene integration blocker |

**Legacy reference audited:** the actual
`scripts/yamlScaffolding/{recursiveMaterializer.mjs,recursiveMaterializer.spec.mjs,yamlScaffolding.mjs,productionScaffolding.mjs,README.md}`
from branch `integration/unified-yaml-materialization-preview`, plus the current
Lesson/Section/Quest Config/Zod contracts, the standalone Lesson Builder and Course
Episode draft renderer rules.

The old materializer emitted `section/items/<slug>` for Lessons/Episodes; **this
work deliberately adopts `sections/<slug>`** as required by assignment B.
The same concrete Section callback produces the subtree for both parents (the
Lesson fixture compares its entire emitted Section files to an Episode-style
call with the same relative path and languages import). All Section-owned
ContentBlock collections retain `content.items/order`. All generated module
exports/import aliases are derived from validated slugs, never random IDs.
The source locale is retained from localized dictionaries; other reviewed
languages remain in the Lesson's visible `TODO (BLOCKER)` and are not silently
translated. Per-kind `production` metadata yields a sibling specification;
Lesson methodology yields `methodology.md`.

**Intentional bug correction vs legacy:** incomplete assessment Sections no longer
replace their authored title, content and actual selection with a tiny
`definePending*Section` shell. Instead the ordinary typed `define*Section` draft
keeps all original authored fields, including any already verified selection,
and carries explicit `TODO (BLOCKER)` on genuinely missing/unreviewed fields.
Such an incomplete draft may deliberately fail Engine typechecking until the
specialist finishes its parameters; do not publish it. Provisional
`feedc0de-` references remain visible blockers, not valid Question/Flashcard
resources. No Quest runtime compatibility is implied.

**Delegated / N/A for Agent B:** standalone Markdown/Code sidecar readers, media
Nil-UUID filename placeholders, Scene stub implementation and registration,
and ContentBlock-specific localization belong to the invoked Agent C/D
materializers. Section/Stage/Task must not reproduce those child behaviors.
Course Lesson references, Carousel slides, Checkpoint and Question/Flashcard
bank internals belong to other agents. The parent owns the final output writer;
the child manifests are deterministic and constrained to their own directories,
but no child is allowed to clobber authored files. The existing YAML
`writeMaterialized()` is an audited reference, not a new runtime dependency.

## Integration seam (parent #775)

Each `materializeX(config, options)` accepts **plain authored Config data** with
the real Engine Config identity/metadata shape and explicitly typed nested
plain child records. Optional `production` is separate; for legacy migration,
a nested child may still be provided as `{config, production?}`.
Every materializer returns
`{exportName, files: [{path, content, kind}], diagnostics}`. Files are
source-root-relative and the owning materializer emits its own
`index.ts` last. Section calls `renderContentBlock`, Lesson calls
`renderSection`, Quest calls `renderStage` / `renderTask`, Stage calls
`renderMedia`, Task calls `renderScene`. Callers supply exact
`languagesImport` context. No universal factory registry, YAML runtime
imports or shared Engine API changes are introduced.

Parent must supply: (1) dispatching concrete child functions by verified
`type`; (2) production stage typing and a shared source-locale/UUID policy;
(3) TypeScript emitted-module typechecks against real Engine Build contracts;
(4) path-safe, no-symlink, atomic preflight and create-only/no-clobber writer
plus `--check`; (5) CLI integration with source documents; (6) targeted
test inclusion in the package's test command. **Quest remains unpublishable
through `defineLesson`/`defineEpisode` until the separate runtime work.**

## Verification

Adjacent `*.spec.ts` tests cover deterministic paths, child delegations,
Section order and locale pruning, source-only active language TODO, real pending
bank references, a Lesson/alternate-Episode Section subtree comparison,
Quest Stage media/null slots, Quest Task Scene reference and invalid input.
Each suite also parses emitted TS using TypeScript's compiler AST.

Intended checkout commands (not claimed run in this branch context):

```sh
npm run code:check:types --workspace @svitlo/engine
npx tsc -p shared/engine/tsconfig.test.json
node --test shared/engine/.test-build/generators/materializers/*/*.spec.js
```

This Draft branch has GitHub's lightweight PR checks; actual test/typecheck
results must be recorded after a runnable checkout/parent integration.
