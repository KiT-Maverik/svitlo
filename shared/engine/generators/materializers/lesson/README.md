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

## Staged handoff lifecycle (owner clarification, 2026-11-22)

**The later owner comment on [#777](https://github.com/KiT-Maverik/svitlo/pull/777#issuecomment-7082626039)
supersedes the earlier request for full `Not implemented` Content/Quiz/Flashcards
scaffolds at Course Stage 5. Do not implement the superseded request.**

| Boundary | Authored output | Responsibility |
|---|---|---|
| Course Stage 3/4 → Stage 5 | Immutable UUID-addressed Lesson directory with a minimal `index.ts` typed as the canonical `LessonWorkflowStage1`; retain only known identity, source language, approved methodology and four assessment decisions. **No Sections or `defineLesson`.** | Parent #775 owns the canonical type and orchestrator; #776 owns Course→Lesson handoff |
| Later standalone Lesson Flow materialization | Fully authored ordinary `defineLesson` source, own Section modules, actual ordered `section.items/order`, and blockers for unfinished content. | This #777 `materializeLesson(Source)` and concrete Section materializers |
| Separately authorized Lesson → Question/Flashcard child | Child-owned **typed Stage 1 `index.ts`** with known source identity/editorial data; no invented Questions, Flashcard sides or reviewed bank records. | Parent #775 owns canonical stage contracts and orchestration; #780 owns completed Question/Flashcard renderers |
| Any Quest stage/task | Follow Quest's actual Build-only Section ownership. Do not invent an independent Quest authoring workflow. | Existing Quest Section/Stage/Task scopes; parent resolves any later standalone flow |

**Do not call `materializeLesson` on a `CourseWorkflowStage3NewLessonConfig`,
a `CourseWorkflowStage3NewLesson` envelope, the Course-generated Lesson
Stage 1 object, or an existing Lesson's `{ id, base?, locale? }` reuse
reference.** The initial handoff has no complete `Lesson_Config.params.languages`
or `section.items/order`, and it intentionally cannot be rendered by the
final factory. This materializer rejects these shapes without generating
Content/Quiz/Flashcards placeholders.

Parent #775's canonical `LessonWorkflowStage1` was **not yet defined at
the parent revision inspected** (the existing
`LessonProductionAssessmentRequirements` type *is* exported). Therefore
this child does not introduce a rival Stage 1 type or a temporary generic
scaffolder. The correct type and UUID-owned output path must come from #775/
#776 before a Course can emit the handoff; coordinate those integration tests
there. A Source emitter's `directory` is only a caller-supplied source
destination, not authorization to decide a new staged entity's path.

For a later complete Lesson, `production.assessment` uses the **four
canonical booleans**:
`questionBankRequired`, `flashcardBankRequired`,
`quizSectionRequired`, `flashcardsSectionRequired`. Bank requirements
initiate independent authoring work; they do **not** imply Section presence.
Quiz/Flashcards Section requirements **fail closed before any complete
Lesson files are emitted** if the later standalone workflow has not authored
an enabled Section. A TODO in an otherwise invalid `defineLesson` is not
sufficient: `defineLesson.build.props()` must be able to build valid
Section collections. The separate `params.quizRequiredForCompletion` gate
remains unchanged and likewise requires an enabled Quiz. No automatic
disabled Quiz, reserved `feedc0de-` references or fictitious content
is created at Course Stage 5.
Question/Flashcard bank materializers in #780 run only after their own
independent production/review stage, never to satisfy a Lesson handoff.

Tests now reject both Stage 3 and Stage 1-like draft shapes and check seven
assessment combinations (including bank-only decisions) to prove required
Sections fail before source output, while standalone bank-only requirements do
not invent Sections or change completion policy. A separate executable
emitted-source fixture validates the actual `defineLesson.build.props()` path. Full Engine compilation
and run-time publication guard integration remain parent-owned verification.

## Compatibility with updated #775 Course stages

Initially audited parent commit `66514c2b959e4824f4307d5dd4c1e32f11beefeb`,
`shared/engine/types/workflow/courseWorkflow.types.ts` and
`defineLesson.build.overrides()`. This child branch now includes that parent
revision as merge ancestry.

- `CourseWorkflowStage1` plans methodology and languages in
  `production.languages.document/planned`, not `config.params.languages`.
  Stage 2 owns provisional Course hierarchy; Stage 3 only resolves Lesson
  placement as `new` or `existing`. Stage 4 reviews the same Stage 3 source,
  not another TypeScript Config. **No Stage 1–4 Course document is a complete
  standalone Lesson Config.**
- `CourseWorkflowStage3NewLessonConfig` intentionally lacks UUID,
  publication languages and Sections. It cannot enter `materializeLesson`.
  The parent-owned Stage 5 bridge allocates/persists IDs and produces the
  independently authorized Lesson handoff; it must not fabricate Sections.
- A reused Lesson's `CourseWorkflowStage3ExistingLessonReference` is the
  uniform `{ id, base?, locale? }` shape; `id` is outside the sparse built
  override. The Course materializer must preserve that imported source
  reference, **not** invoke the standalone Lesson materializer or interpret
  `id` as an overridden Props field. This is outside Agent B's owned folders.
- Newly optional `Lesson_Config.params.age` and `grade` are preserved
  verbatim. Their validation remains with canonical Lesson Config/Zod and
  the final Build API, not a duplicated source-renderer schema.
- Added `lesson.typecheck.ts` compile-time boundary tests rejecting both
  Stage 3 placement Config types and a built Course reference as Lesson
  source, plus runtime regressions for audience fields and incomplete inputs.

Full Engine TypeScript build, tests and real generated-module compilation
remain required before merging; cheap Draft GitHub checks do not prove them.

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

## Review #777 — required enabled Sections and release boundary

The review on [current source at `354dc0af`](https://github.com/KiT-Maverik/svitlo/pull/777#issuecomment-7083044852)
correctly identified that comment-only missing Quiz/Flashcards requirements
allowed output that would fail the real Build API or omit a required visible
Section. **This implementation uses the explicitly allowed fail-closed
alternative** for later standalone Lesson source emission. It checks
`config.params.quizRequiredForCompletion` and the two independent editorial
Section requirements against *enabled* Sections at the ordered collection
boundary, before delegating child source. Missing or disabled required
Sections throw actionable `TODO (BLOCKER)` diagnostics as errors and return
no misleading final Lesson manifest. The Lesson workflow must author the
required Section (or an explicitly approved pending Section with full real
Config parameters) before rerunning. No fake bank content or reserved IDs
are synthesized here. Course Stage 5 still writes **only typed Lesson Stage 1**.

`assertLessonSourceReleaseReady(result)` is an optional, narrow
source-release preflight over the generated manifest: it blocks any unresolved
diagnostics and scans all emitted TypeScript for reserved `feedc0de-` UUIDs,
independent of TODO comments. The parent must wire it into the authorized
source release path and independently verify bank manifests and reviewed
locales. **No claim that the existing JSON publisher already uses it.**
A real emitted-`defineLesson` test exercises `build.props()` on a
complete Lesson containing an enabled authored Quiz Section.

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
