# Separate Lesson composition from Question and Flashcard banks

**Status:** owner-approved target architecture; **partial resource-layer implementation in Draft PR #606, full migration not implemented**. This document is the work specification for [Issue #605](https://github.com/KiT-Maverik/svitlo/issues/605). It supersedes that Issue's earlier proposal to remove banks from the first-stage YAML while keeping them in final Lesson Config/Props.
**Scope:** Engine Build and runtime contracts; Section selection; independent YAML/TS authoring, generation and validation; static resource publishing/assembling; UI Kit/host loading; textbooks and Studio migration.
**Related:** [Lesson entity](../entities/lesson.md), [Section entity](../entities/section.md), [Lesson YAML Builder](./lesson-yaml-builder.md), [source layout](./lesson-generated-source-layout.md), [unified YAML handoff](./yaml-config-scaffolding.md), [Lesson workflow](../../skills/lesson-workflow/README.md), [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557), [PR #576](https://github.com/KiT-Maverik/svitlo/pull/576).


## Verified incremental implementation (15 November 2026)

The current Draft branch implements **only reusable independent assessment-resource infrastructure**:

- \`shared/engine/assemblers/assessmentResources/assessmentResources.ts\` defines UUID-addressed resource paths, a strict metadata-only manifest schema, owner/type/language/reference validation, and deterministic UUID candidate selection for Quiz. It is **not yet the active \`defineQuizSection\` API**.
- \`shared/engine/generators/assessments/renderAssessmentResourceFiles.utils.ts\` converts independently built Question/Flashcard \`{ base, locale }\` Props into UUID-addressed files plus a manifest. UUID collision checks span Lessons; the serializer is **not yet wired into textbook builds or Stage B/C YAML production**.
- \`shared/engine/assemblers/assessmentResources/createAssessmentResourceLoader.ts\` provides a host-injected, batched, scoped loader with locale fragment handling, explicit missing-file errors, cancellation checks, per-locale caching and validated resolved Props. **The UI Kit and hosts do not yet consume this loader.**
- Tests now run under the Engine \`npm test\` script. CI for commit \`ffe22ca\` passed FastGate, Engine generators, ContentBlock Build API, PR labels and agent-artifact checks. The tests cover a successful independent Flashcard publication/load, caching, missing files, cancellation, collisions and deterministic output. These CI checks are **not evidence of Web/offline/SSR integration**, which is pending.

**Still mandatory before closing #605:** remove Lesson bank fields from all Config/Props/Build/overrides, implement actual UUID-based Quiz/Flashcards Section interfaces, independent bank YAML and draft/publish commands, integrate textbook packaging and selected-resource UI/host loading, migrate existing authored consumers without content loss, regenerate schemas and complete independent technical/QA reviews. Keep every acceptance checkbox below unchecked until its end-to-end boundary is verified.

## Decision and nonnegotiable invariants

1. A Lesson describes pedagogical structure and Sections, **not** the full Question or Flashcard bank. Remove both fields from **all** `defineLesson` Config, Props and override contracts; this is a deliberate breaking source/publication change, not merely making these fields optional.
2. Question and Flashcard banks are independently authored, validated, generated and published. Their **Git co-location** beneath a Lesson UUID is an ownership/production convenience; it does not make them children of the Lesson Configurator or part of the Lesson response.
3. Quiz and Flashcards Sections reference **stable UUIDs** of eligible bank entries. A Section owns selection/order/sampling rules; neither its Config nor its Props embeds the full bank or complete Question/Flashcard contents.
4. A full bank must never be eagerly serialized into a Lesson resource, Course Lesson override, Lesson response, SSR payload or UI Kit props by virtue of opening the Lesson. Only explicitly selected entries may be requested/resolved as a separate resource.
5. Preserve UUID identity, source-locale provenance, declared language support, strict TS/Zod contracts, deterministic generation, immutable source and existing create-only SKIP/no-overwrite semantics. Do not introduce old API aliases or silently discard assessment content.
6. Draft scaffolding is allowed to leave intentionally unresolved asset/import/reference work; publishing a complete Lesson/Quiz must fail clearly if referenced bank entries or required requested-locale data are missing. Editorial/release readiness remains a **separate future decision** (#591), not a reason to put approval fields into Lesson Props.
7. No new generic factories or parallel copies of the same authoring source. Build/authoring APIs stay in `@svitlo/engine/build`; runtime and UI Kit consume only data-only published contracts.

## Observed pre-migration behavior (check current main again before coding)

- `shared/engine/configurators/lessons/defineLesson/defineLesson.schemas.ts`: Config has optional `questions` and `flashcards`; Props **require** the full `flashcards` array and optionally include full `questions` by kind. Lesson override types also include both banks.
- `shared/engine/configurators/lessons/defineLesson/defineLesson.ts`: validates child banks/Quiz dependencies; `build.props()` builds and inserts every bank entry, including localized content, into Lesson publication. `build.overrides()` can replace/add/disable bank entries.
- `shared/engine/assemblers/assembleLessonProps/assembleLessonProps.ts` and `shared/engine/assemblers/assembleCourseLesson/assembleCourseLesson.ts`: merge and allow these whole bank payloads in Lesson/Course override paths.
- `shared/engine/configurators/sections/defineQuizSection/defineQuizSection.schemas.ts`: `selection` supports `mode: all|sample`, `questionSlugs`, `count`, `shuffle`, `seed`; `shared/ui-kit/src/components/lesson/EngineQuestionRenderer.tsx` presently reads `lesson.questions` and selects by slug.
- `shared/engine/configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas.ts`: has no explicit bank-ID selection interface; Section `content` is for ContentBlocks and must stay separate.
- `shared/engine/configurators/yaml/yamlLessonCourse.schemas.ts` / `shared/engine/scripts/generateYamlSchemas/`: initial Lesson YAML editor schema includes banks, derived through Zod and generated JSON Schema.
- `shared/engine/scripts/lessonBuilder/lessonModules.mjs`: emits bank subtrees/imports from the one Lesson `config.yaml`; fixtures/tests depend on this; `generateLessonProps` publishes banks indirectly through Lesson Build.
- Existing Studio already calls `questions/questions.yaml` and `flashcards/flashcards.yaml` distinct **editorial source-language** artifacts; they are **not automatically** equivalent to the nested technical `config` YAML representation.
- Playground's `howLightMoves` imports complete banks into its `defineLesson` and its Quiz derives slugs with `Object.keys(howLightMovesQuestions.selectOneAnswer)`. Test fixtures, Math samples and documentation may have the same pattern.

## Source layout and three independent authoring stages

Preferred canonical source layout under `content/<textbook>/data/lessons/<last-uuid-hex>/<lesson-uuid>/`:

```text
lesson.yaml                    # Stage A: technical Lesson/Section/ContentBlock source, no banks
index.ts                       # generated Lesson Configurator (no bank imports)
constants.ts                   # Lesson languages/typed scope
sections/<sectionSlug>/...     # Section/ContentBlock source, including Quiz references
questions/questions.yaml       # Stage B: canonical approved Question Bank source
questions/<questionSlug>/...   # generated Question TS modules, if authored and approved
flashcards/flashcards.yaml     # Stage C: canonical approved Flashcard Bank source
flashcards/<cardSlug>/...      # generated Flashcard TS modules, if authored and approved
review.ts                     # unchanged review record; not part of Props
```

- Rename the **technical Lesson** input `config.yaml` to `lesson.yaml` in the Lesson Builder CLI, its input discovery/diagnostics, schema/docs, staged-source paths, fixture and invocation tests. Do **not** rename Course `config.yaml` without a separate explicit change. The name `lesson.yaml` does not change the Engine entity discriminator `type: lesson` or single `config.id` identity.
- Stage A consumes **only** `lesson.yaml`. Keep each nested `{ config, production? }` envelope, source-language-only values, Markdown/Code extraction, colocated media/Scene specifications and no-overwrite behavior. It must not produce `questions/index.ts`, `flashcards/index.ts`, placeholder banks, invented Question UUIDs or bank imports. Existing root bank fields must cause a clear migration diagnostic, not silent omission.
- Stage B consumes `questions/questions.yaml`; Stage C consumes `flashcards/flashcards.yaml`. These are different entrypoints, schemas, commands and tests with their own create-only behavior. Stage C remains downstream of approved Questions if cards reference Question-derived content. A Stage B/C run must not edit or regenerate the Stage A Lesson root `index.ts`.
- **Source-of-truth reconciliation:** Studio currently defines these two bank YAML files as **editorial** schemas. Before implementing Stage B/C, inspect `studio/skills/lesson-workflow/lesson-questions.schema.json`, `lesson-flashcards.schema.json`, the authoring skills and their current files. Specify and implement deterministic mapping from approved editorial records to typed `define*` Configurators, or deliberately revise those canonical source schemas. Do **not** silently reinterpret editorial YAML as Engine Config or create competing independently editable duplicate bank YAML at the same path.
- Keep `question.schema.json` and `flashcard.schema.json` as standalone editor guides; make Lesson-specific `lesson.schema.json` and `lesson.scaffold.schema.json` omit root bank fields entirely, including reachable schema branches solely for these banks. Update generated/checked-in schemas using the real Engine schema generation workflow.
- The first stage may describe a Quiz/Flashcards Section before its bank exists; its references may be pending in an unfinished draft, and a separate composition/reference validation must identify missing entries. No arbitrary mutable post-generation patching of manually edited Lesson `index.ts`.

## Engine Config, Props and Section API changes

**Lesson:** remove `flashcards` and `questions` from `lesson_Config_Schema`, `lesson_Props_Schema`, `Lesson_Props`, `Lesson_PropsBase`, Config generic parameters, `defineLesson` implementation, `validate`, `build.props`, `build.overrides`, metadata and public bank types that are Lesson-specific. Retain reusable Question and Flashcard Configurators, their own schemas/Build APIs and independent published Props. Maintain the Lesson Section collection and `params.requireQuiz` constraint on enabled Quiz Sections, but validate bank references **externally** at build/publish time rather than requiring banks as Lesson children.

**Quiz Section:** replace slug-based selection with a UUID-based explicit candidate list. Proposed authoring shape (final field spelling to be finalized consistently throughout schemas/tests):

```ts
selection: {
  mode: 'sample', // 'all' means all *explicit* candidate IDs
  questionIds: ['<question-uuid-a>', '<question-uuid-b>'],
  count: 1,
  shuffle: true,
  seed: 7,
}
```

- Prefer `questionIds` over `questionSlugs`; a stable identity is not a human-readable slug. Require nonempty unique UUIDs when a Quiz needs Questions; reject duplicate IDs, unknown IDs, disabled/unavailable records and `count > candidates`. No implicit fallback to the entire bank for `mode: all` or omitted IDs. Explicit selection preserves candidate order; sampling/shuffling follows deterministic, tested semantics (Section ID + seed) without requiring the entire bank payload.
- Selection refers to a **candidate set** and runtime sampling may pick only a subset; the resource layer must load no more than the selected candidate scope, and preferably only the final sampled IDs if sampling is resolved before fetching. Do not expose unrelated bank records. Preserve current Quiz grading/retries/timer/screen/assessment semantics.

**Flashcards Section:** add an explicit independent reference/selection shape (e.g. `params.selection: { flashcardIds: UUID[] }`, with optional sample/shuffle only if pedagogically required). The Section controls presentation order, not Lesson bank insertion order. Preserve `content: { items, order }` for ordinary screen ContentBlocks, and continue to support Flashcard front/back/hint Build objects and typed flags/links.

**Referential integrity:** at appropriate build/publication stages verify every referenced UUID belongs to the expected bank/type and owning Lesson, can be built in selected languages and has no collisions; failures are actionable and identify Lesson/Section/UUID. If future cross-Lesson reuse is needed, give it an explicit library ownership policy, not accidental cross-folder imports. Do not require the bank to be populated for a Lesson that has no consuming Section.

## Independent publishing, runtime resource resolution and offline

- Implement separate Question and Flashcard generation/publishing pipelines that take **approved/typed bank entities**, serialize data-only `base` and requested locale fragments using the existing Build API, and produce deterministic UUID-addressed resources. Suggested URL namespace: `/data/lessons/<bucket>/<lessonId>/questions/<questionId>/{base,<locale>}.json` and analogously `/flashcards/`; adapt exact path to textbook Publish CLI conventions after examining current packaging/manifest and collision rules. No bank data in `generated/lessons/<bucket>/<id>/{base,<locale>}.json`.
- Maintain a **build-time** index/manifest mapping owning Lesson ID + item UUID to resource paths/type/available locales and content hash for integrity and caching. The manifest may be packaged as metadata, but must not include complete Question/Flashcard content or automatically fetch every entry. Preserve static hosting/portable textbook distribution and deterministic invalidation.
- Remove bank arrays from Lesson and Course Lesson override generation and assembly; Course overrides remain constrained to actual Lesson fields, Sections and Section selection patches. They must not override full banks through `questions` or `flashcards` fields.
- A host supplies a typed asynchronous resolver/loader to the shared UI Kit for selected IDs and current locale. UI Kit **must not** directly import textbook-authored TS or hard-code Next.js paths, global fetch URLs or Node readers. Design the public interface so Web, Desktop and Mobile can use their existing static publishers/offline asset sources.
- Define batched fetch, localization, deduplication/caching, abort/stale-navigation handling, loading, empty/missing-resource error states, retry, sequencing, accessibility feedback and SSR/hydration behavior. Avoid N+1 network waterfall and avoid loading all bank records just to determine available IDs. Reuse the existing Question renderer with an explicit resolved Question Props argument; remove the dependency on `lesson.questions`.
- Offline: preserve the ability to complete an available Lesson/Quiz/Flashcards experience without network. Choose a scoped prefetch/install plan for referenced resources (e.g. current Section and upcoming required Section); do not regress existing package portability, asset manifests, local caching or navigation. Lazy runtime fetching is not equivalent to excluding assets from an offline installation.
- Security: transferring a Question's correct answer in a fetched client resource exposes it to the client; this design is **payload separation, not answer secrecy or secure proctoring**. A genuinely secret answer/key would require separate trusted grading; do not claim this PR solves it.

## Migration and integration worklist

1. **Inventory before edits:** inspect `AGENTS.md`, selected Studio personas/skills/architecture, current branch and open work (especially #557, #576, #577), lesson package scripts and search all references to `lesson.questions`, `lesson.flashcards`, `questionSlugs`, `config.yaml`, bank overrides, emitted source trees and static publishing. Distinguish legacy editorial `content.yaml` and Course YAML. Do not overwrite the manually edited #557 Math prototype.
2. **Engine contracts:** remove Lesson ownership, rewrite associated Config/Props/override and validation tests, preserve generic/language inference and valid isolated Lesson examples. Add UUID selection for Quiz/Flashcards Sections, independent references/validation without import cycles; migrate public exports and engine/runtime boundaries.
3. **Builder/YAML/editor:** implement `lesson.yaml` input and bank-free Lesson Zod/editor schemas, regenerate JSON Schemas; split Stage A/B/C generators, fixtures and commands; keep authoring-only production metadata separate. Address standalone bank YAML editorial/technical projection explicitly.
4. **Resource layer:** implement independent serializers, test publication path resolution/uniqueness, add published resource integrity/index metadata; update textbook build, publish, packaging, offline handling and all relevant package scripts. No hidden schema or extra manifest entries with embedded full bank contents.
5. **Consumers:** update UI Kit `LessonController`, `EngineQuestionRenderer`, Quiz and Flashcards rendering/selection, portably injected async resolver, Web and other configured host entrypoints, assembler paths, Course overrides and Section integration tests.
6. **Content migration:** migrate applicable Playground reference and Engine coverage fixture; **separately plan** current Math `config.yaml` migration and respect the owner-edited #557 tree and already-open #576/#577. Preserve all existing Question/Flashcard UUIDs, texts/answers, flags, links, locale dictionaries and curated Quiz assignments. Do not generate replacement educational content to satisfy tests.
7. **Studio:** update Lesson/Section entity docs, Lesson Production and specialist skills/personas, generator READMEs/JSDoc, `shared/engine/scripts/AGENTS.md`, architecture index, source-layout documentation and YAML samples to the final conventions. If `lesson.yaml` and editorial `content.yaml` coexist, clearly document ownership and projection; do not conflate them.
8. **Independent review and CI:** require Development Reviewer + QA review for this breaking multi-package change. Coordinate acceptance with #576 rather than claiming its old fixture validates the new architecture. Keep this PR Draft until the project owner requests Ready.

## Acceptance checklist (all must be verified, not assumed)

- [ ] `defineLesson` input, authored Config schema, resolved Props schema, build outputs, overrides, serializer and Course assembler contain **no** `questions`/`flashcards` bank fields. Their names may still exist legitimately on unrelated entities or as Stage review identifiers.
- [ ] Publishing a Lesson with no Quiz and no Flashcards works without any bank input, placeholder folders or extra bank JSON.
- [ ] A Quiz/Flashcards Section can hold explicit ordered UUID references and receives only its selected bank resources; no complete bank included in Lesson JSON, Course JSON, SSR transfer or UI Kit Lesson props.
- [ ] All referenced IDs are checked for type/ownership/duplicates/existence and requested locale; missing references fail at the **appropriate complete-publication boundary**, not at creation-only draft scaffolding.
- [ ] Both banks can be authored/scaffolded/generated/published on independent stages with their own YAML entrypoints and schemas, keeping Question→Flashcard dependencies, per-stage review evidence and SKIP/no-overwrite.
- [ ] `lesson.yaml` is accepted and `config.yaml` is no longer the canonical Lesson technical source; the old source path is migrated deliberately or rejected clearly, never silently discarded. Course `config.yaml` remains unchanged.
- [ ] Existing approved authored Question and Flashcard content migrates without loss; Quiz subset, random/sample modes and Flashcard presentation order remain correct. No hidden fallback to loading whole bank.
- [ ] Web/host + UI Kit support loader lifecycle, locale switching, offline caching/prefetch, missing resources, accessible loading/failure UI, and no extra cross-package source imports.
- [ ] Generated/checked-in JSON schemas are regenerated and drift check passes; source/layout tests, type tests, Engine tests, UI Kit tests, textbook packages build, portability/publish and relevant Web integration CI pass. Record commands and real results.
- [ ] #557 hand-edited source is preserved; dependencies with Draft #576/#577 are reconciled; Studio docs and test fixtures reflect only the finished behavior.
- [ ] The readiness gate investigation #591 remains separate and is not introduced into Lesson Config, Props or these draft scaffolders.

## Explicit non-goals

- No new Question/Flashcard educational content or translations.
- No automatic approval/sign-off, readiness flag or changes to release gating (#591).
- No conversion of the Course YAML source filename or unrelated textbook Configs.
- No backend/database requirement just to resolve static bank data; static offline-capable distribution remains valid.
- No claim that client-side questions/answers are secret from learners.

## Handoff to the next implementation chat

Work on **this Draft PR branch**; inspect this specification plus latest Issue #605, `main`, #557/#576/#577 and current CI before changing code. Do not open a parallel PR unless repository rules require independent subtasks. Implement the complete approved boundary incrementally on the same branch; update this document to distinguish verified implementation from targets, run and report checks, and retain Draft status until explicitly instructed otherwise.
