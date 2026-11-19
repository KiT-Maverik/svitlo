# Separate Lesson composition from Question and Flashcard banks

**Status (updated 18 November 2026, PR #668 Draft):** PR #606 has merged; independent Question/Flashcard resource publication, host/UI selection and dedicated `questionsBuilder/` / `flashcardBuilder/` draft scaffolding exist. The remaining content migration, integrated acceptance and any Custom Practice UI are separate work, **not** evidence that the core bank separation is still a Draft. This document is the work specification for [Issue #605](https://github.com/KiT-Maverik/svitlo/issues/605). It supersedes that Issue's earlier proposal to remove banks from the first-stage YAML while keeping them in final Lesson Config/Props.
**Scope:** Engine Build and runtime contracts; Section selection; independent YAML/TS authoring, generation and validation; static resource publishing/assembling; UI Kit/host loading; textbooks and Studio migration.
**Related:** [Lesson entity](../entities/lesson.md), [Section entity](../entities/section.md), [Lesson YAML Builder](./lesson-yaml-builder.md), [source layout](./lesson-generated-source-layout.md), [unified YAML handoff](./yaml-config-scaffolding.md), [Lesson workflow](../../skills/lesson-workflow/README.md), [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557), [PR #576](https://github.com/KiT-Maverik/svitlo/pull/576).

## Verified historical implementation checkpoint (16 November 2026; superseded where newer builders exist)

The PR #606 implementation established more than standalone resource primitives (historical 16 November snapshot):

- Engine `defineLesson` Config, Build outputs, Props and Course override paths omit full Question and Flashcard banks. Quiz and Flashcards Sections carry explicit UUID selection; the Quiz's deterministic sample/shuffle function selects final UUIDs before loading their resources. The derived YAML editor JSON Schemas have been regenerated.
- Independent Question and Flashcard Build publication serializes one UUID-addressed base and sparse locale file per resource, with a metadata-only, cross-kind merged manifest. The two resource stages can run separately from already authored TypeScript bank modules, and the textbook build stages their files in its portable static manifest. **At this historical checkpoint**, editorial bank YAML-to-TypeScript stages were not yet implemented; current Questions/Flashcards builders must be read instead.
- Stage A Lesson Builder now accepts `lesson.yaml` only, rejects embedded root banks, and creates no Question/Flashcard TS directories.
- The Mathematics textbook's 109 technical Lesson YAMLs now use `lesson.yaml` and have no embedded root Question/Flashcard bank fields. This is a mechanical migration of unapproved technical drafts; no Lesson generation or editorial approval is implied. The independent YAML files belong at the Lesson root; Stage B/C conversion was **deferred at this historical checkpoint** and is now provided by Engine-owned Questions/Flashcards draft builders.
- UI Kit's Quiz and Flashcards Sections use a host-injected async loader with selected-resource validation, locale handling, retry and cancellation. The Playground Web host supplies a static-file reader; no entire bank is passed through Lesson Props.
- Verified via GitHub's `Content packages build` on commit `05a5ed8`: the Playground package generated **271 independent assessment files** and built **428 static resources**. Engine generator and ContentBlock Build API workflows also succeeded on that commit. Additional unit/integration tests and subsequent CI remain in progress.

**Remaining acceptance concerns for the original Issue (verify their current status independently):** reconcile approved `questions.yaml` and `flashcards.yaml` editorial content with independent stages, verify complete-publication UUID ownership and references, handle reused legacy Playground Lesson/Quiz examples without silently duplicating UUIDs, align Studio and fixtures, prove offline/accessibility and host behavior end to end, and obtain independent Development/QA review. Keep the acceptance checklist below unchecked until each boundary is verified.

## Global UUID assessment publication migration (Draft PR #668 — implementation in progress)

**Decision for this Draft PR:** Keep authoring Question/Flashcard banks with their Lesson's independent workflow and source-language provenance, but **do not** publish those banks under the Lesson's JSON resource directory. Questions and Flashcards are first-class, globally UUID-addressed _publication_ resources within one textbook. This section is the accepted contract for the ongoing PR #668 migration. Engine generation, runtime paths, and textbook staging are being migrated; maintain the Draft label until all consumers, tests and CI are verified.

Publication and static-host paths (illustrative UUIDs omitted):

```text
data/questions/<last-hex-of-question-id>/<question-id>/base.json
data/questions/<last-hex-of-question-id>/<question-id>/<locale>.json
data/flashcards/<last-hex-of-flashcard-id>/<flashcard-id>/base.json
data/flashcards/<last-hex-of-flashcard-id>/<flashcard-id>/<locale>.json
data/assessments/manifest.json
```

- `resolveEntityPath(questionId)` and `resolveEntityPath(flashcardId)` supply the same bucket/UUID algorithm as other entities. The content package's `generated/assessments/` tree and portable `static/data/` tree must resolve to these same public relative paths. Both kinds must preserve independent `base.json` plus sparse locale files; authored TypeScript and `questions.yaml`/`flashcards.yaml` stay in their existing independent bank workflows. Never embed full banks in Lesson Props or Quiz Props.
- One textbook-scoped metadata-only manifest indexes **each** globally unique UUID with kind, optional `ownerLessonId` (provenance rather than path), available languages/locale fragments, type/restrictions when applicable and content hash. Reject duplicate UUIDs _across kinds and Lessons_, unsafe paths, unexpected or missing files, and mismatched metadata. No per-Lesson manifest is needed for runtime resolution.
- `defineQuizSection` continues to hold **only** `params.selection.questionIds` for the actual Question candidates. Question Configurators are authored exclusively in the Question Bank, **never** embedded or defined by the Quiz. Quiz `content.items` is only for optional screen ContentBlocks. A Quiz may select Question UUIDs originating in other Lessons; an assessment-only Lesson need not own a Question Bank.
- Host-injected resource readers accept `{ ids, language, signal }` (and Flashcard access needs), not a mandatory `lessonId`. Use the manifest to validate type, locale, resource existence, and optional provenance; batch/load only selected IDs, preserve sample/shuffle semantics, caching, abort, stale-navigation handling and offline manifest coverage. UI Kit must not embed a textbook path.
- **Runtime fallback:** if a requested Question/Flashcard locale is missing, use a genuinely published `en` locale when available (plus invariant base). If English is unavailable too, return a clear missing-resource error; do not invent text or silently use unrelated languages. Report/mark the fallback so consumers can surface it appropriately.
- **Production validation is stricter than runtime resilience:** for each Lesson's actual effective publication languages, verify every selected Question/Flashcard has the required real locale content (or truly locale-independent validated fields); ensure the Question/Flashcard bank advertised language support and per-Lesson published scope are consistent. Missing translations for a **declared supported locale** fail the complete textbook/Lesson build even though a runtime English fallback can protect a partially deployed or out-of-scope request. An `en` fallback requires genuine `en` content, not a fake translation.
- Preserve authored multilingual content and physical-media/Scene validation: these JSON resources may reference media; do not assume that moving their JSON makes media checks unnecessary. Update the textbook static manifest/build, web host loader, offline cache/install behavior, and any desktop/mobile adapters that actually consume the old loader signature. Do not retain silent legacy URL aliases after consumers/tests migrate.
- Verification must include deterministic output and manifest comparison, mixed-Lesson Quiz selection, absent requested locale + existing English, absent both, missing declared supported locale failing production, cross-kind UUID collision, missing selected Question, source-English-with-no-English fallback error, cancellation/caching, and complete production build for a real consumer package. Do not declare ready on spec text alone.

**Scope boundary:** this is a breaking publication/resolver migration. Do not redesign Question/Flashcard authoring, invent another Quiz entity, embed banks in Lessons, or use a separate permanent assessment-planning YAML. The existing historical paths and per-Lesson manifest descriptions below explain the shipped pre-migration implementation; they are to be updated/retired as the code changes.

## Decision and nonnegotiable invariants

1. A Lesson describes pedagogical structure and Sections, **not** the full Question or Flashcard bank. Remove both fields from **all** `defineLesson` Config, Props and override contracts; this is a deliberate breaking source/publication change, not merely making these fields optional.
2. Question and Flashcard banks are independently authored, validated, generated and published. Their **Git co-location** beneath a Lesson UUID is an ownership/production convenience; it does not make them children of the Lesson Configurator or part of the Lesson response.
3. Quiz and Flashcards Sections reference **stable UUIDs** of eligible bank entries. A Section owns selection/order/sampling rules; neither its Config nor its Props embeds the full bank or complete Question/Flashcard contents.
4. A full bank must never be eagerly serialized into a Lesson resource, Course Lesson override, Lesson response, SSR payload or UI Kit props by virtue of opening the Lesson. Only explicitly selected entries may be requested/resolved as a separate resource.
5. Preserve UUID identity, source-locale provenance, declared language support, strict TS/Zod contracts, deterministic generation, immutable source and existing create-only SKIP/no-overwrite semantics. Do not introduce old API aliases or silently discard assessment content.
6. Draft scaffolding is allowed to leave intentionally unresolved asset/import/reference work; publishing a complete Lesson/Quiz must fail clearly if referenced bank entries or required requested-locale data are missing. Editorial/release readiness remains a **separate future decision** (#591), not a reason to put approval fields into Lesson Props.
7. No new generic factories or parallel copies of the same authoring source. Build/authoring APIs stay in `@svitlo/engine/build`; runtime and UI Kit consume only data-only published contracts.

## Historical pre-migration behavior (NOT the current implementation)

- `shared/engine/configurators/lessons/defineLesson/defineLesson.schemas.ts`: Config has optional `questions` and `flashcards`; Props **require** the full `flashcards` array and optionally include full `questions` by kind. Lesson override types also include both banks.
- `shared/engine/configurators/lessons/defineLesson/defineLesson.ts`: validates child banks/Quiz dependencies; `build.props()` builds and inserts every bank entry, including localized content, into Lesson publication. `build.overrides()` can replace/add/disable bank entries.
- `shared/engine/assemblers/assembleLessonProps/assembleLessonProps.ts` and `shared/engine/assemblers/assembleCourseLesson/assembleCourseLesson.ts`: merge and allow these whole bank payloads in Lesson/Course override paths.
- `shared/engine/configurators/sections/defineQuizSection/defineQuizSection.schemas.ts`: `selection` supports `mode: all|sample`, `questionSlugs`, `count`, `shuffle`, `seed`; `shared/ui-kit/src/components/lesson/EngineQuestionRenderer.tsx` presently reads `lesson.questions` and selects by slug.
- `shared/engine/configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas.ts`: has no explicit bank-ID selection interface; Section `content` is for ContentBlocks and must stay separate.
- `shared/engine/configurators/yaml/yamlLessonCourse.schemas.ts` / `shared/engine/scripts/generateYamlSchemas/`: initial Lesson YAML editor schema includes banks, derived through Zod and generated JSON Schema.
- `shared/engine/scripts/lessonBuilder/lessonModules.mjs`: emits bank subtrees/imports from the one Lesson `config.yaml`; fixtures/tests depend on this; `generateLessonProps` publishes banks indirectly through Lesson Build.
- Existing Studio already calls `questions.yaml` and `flashcards.yaml` distinct **editorial source-language** artifacts; they are **not automatically** equivalent to the nested technical `config` YAML representation.
- Playground's `howLightMoves` imports complete banks into its `defineLesson` and its Quiz derives slugs with `Object.keys(howLightMovesQuestions.selectOneAnswer)`. Test fixtures, Math samples and documentation may have the same pattern.

## Source layout and three independent authoring stages

Preferred canonical source layout under `content/<textbook>/data/lessons/<last-uuid-hex>/<lesson-uuid>/`:

```text
lesson.yaml                    # Stage A: technical Lesson/Section/ContentBlock source, no banks
index.ts                       # generated Lesson Configurator (no bank imports)
constants.ts                   # Lesson languages/typed scope
sections/<sectionSlug>/...     # Section/ContentBlock source, including Quiz references
questions.yaml                 # Stage B: canonical approved Question Bank source
questions/<questionSlug>/...   # generated Question TS modules, if authored and approved
flashcards.yaml                # Stage C: canonical approved Flashcard Bank source
flashcards/<cardSlug>/...      # generated Flashcard TS modules, if authored and approved
review.ts                     # unchanged review record; not part of Props
```

- Rename the **technical Lesson** input `config.yaml` to `lesson.yaml` in the Lesson Builder CLI, its input discovery/diagnostics, schema/docs, staged-source paths, fixture and invocation tests. Do **not** rename Course `config.yaml` without a separate explicit change. The name `lesson.yaml` does not change the Engine entity discriminator `type: lesson` or single `config.id` identity.
- Stage A consumes **only** `lesson.yaml`. Keep each nested `{ config, production? }` envelope, source-language-only values, Markdown/Code extraction, colocated media/Scene specifications and no-overwrite behavior. It must not produce `questions/index.ts`, `flashcards/index.ts`, placeholder banks, invented Question UUIDs or bank imports. Existing root bank fields must cause a clear migration diagnostic, not silent omission.
- The approved flat source layout requires no `questions/` or `flashcards/` directories when these YAML files are created. Those directories are optional future TypeScript outputs, not YAML prerequisites. Stage B consumes `questions.yaml`; Stage C consumes `flashcards.yaml`. These are different entrypoints, schemas, commands and tests with their own create-only behavior. Stage C remains downstream of approved Questions if cards reference Question-derived content. A Stage B/C run must not edit or regenerate the Stage A Lesson root `index.ts`.
- **Historical design decision, now resolved:** Questions and Flashcards use their own Engine-shaped Lesson-root YAMLs and strict Engine-schema draft builders. Old `lesson-questions.schema.json` and any historic separate editorial format are **not active authoring contracts**. Inspect [Questions Builder](../../../shared/engine/scripts/questionsBuilder/README.md), [Flashcard Builder](../../../shared/engine/scripts/flashcardBuilder/README.md) and their tests instead of constructing duplicate editable YAML.
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
6. **Content migration:** migrate applicable Playground reference and Engine coverage fixture; the owner-authorized Mathematics source migration renamed all 109 technical `config.yaml` files to `lesson.yaml` and removed 109 empty root `flashcards` collections (no root `questions` fields existed). Respect the owner-edited #557 tree and already-open #576/#577. Preserve all existing Question/Flashcard UUIDs, texts/answers, flags, links, locale dictionaries and curated Quiz assignments. Do not generate replacement educational content to satisfy tests.
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
