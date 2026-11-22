# Agent A materializer workstream — course

**Status:** Nine independent draft source renderers and their adjacent tests are implemented on this branch. Parent #775 still owns the typed stage contract, UUID/path writer, entrypoint orchestration, and actual production integration. No materializer is yet integrated into the production pipeline.

## Owned kinds

- `course` -> `shared/engine/generators/materializers/course/`
- `module` -> `shared/engine/generators/materializers/module/`
- `chapter` -> `shared/engine/generators/materializers/chapter/`
- `episode` -> `shared/engine/generators/materializers/episode/`
- `skill` -> `shared/engine/generators/materializers/skill/`
- `skillGroup` -> `shared/engine/generators/materializers/skillGroup/`
- `skillDomain` -> `shared/engine/generators/materializers/skillDomain/`
- `educationStandard` -> `shared/engine/generators/materializers/educationStandard/`
- `assessmentMethod` -> `shared/engine/generators/materializers/assessmentMethod/`

## Work to implement

Course/Module/Chapter/Episode tree and Skills taxonomy, EducationStandard, AssessmentMethod source. Course accepts the typed Stage 3 Lesson variants: `production.kind: 'existing'` with a unified `production.existing: { id, base?, locale? }`, or `production.kind: 'new'` with complete methodology and no ID. It delegates nested Episode Sections to Agent B; do not replicate a Section renderer.

## Mandatory historical behavior audit

Read the **actual** existing YAML -> TypeScript implementation on branch `integration/unified-yaml-materialization-preview` (parent PR #769; agent PR #772):
- `shared/engine/scripts/yamlScaffolding/recursiveMaterializer.mjs`
- `shared/engine/scripts/yamlScaffolding/recursiveMaterializer.spec.mjs`
- `shared/engine/scripts/yamlScaffolding/yamlScaffolding.mjs`
- `shared/engine/scripts/yamlScaffolding/productionScaffolding.mjs`
- `shared/engine/scripts/yamlScaffolding/README.md`
Also inspect current develop `materializeCourseFlow`, `lessonBuilder`, `questionsBuilder`, `flashcardBuilder` only for the applicable kinds and relevant actual configurator/Zod/test contracts. **Do not import the YAML materializer or move YAML dependencies into the new source materializer.**

For **each assigned kind**, explicitly map and port applicable existing behaviors: exact factory selection and type-specific TS generics; slug-based variable/export names and stable nested imports; correct child-boundary paths and ordered collections; locale-source pruning and planned-language TODOs; location-qualified validation; TODO (BLOCKER) placement and pending semantics; external Markdown/Code text readers; source/specification sidecars; nil-UUID reserved media placeholders (never real assets); Scene/assessment pending safeguards; correct handling of special source values/expressions; no loss of authored values; syntactically valid emitted TS; deterministic, create-only behavior. Some cases do not apply to every kind; record N/A where appropriate. Also fix observed defects rather than duplicating them and add regression tests.

## Independence and collaboration

- Base/head ancestry: target `architecture/typed-production-materializers` (parent Draft PR #775), not `develop` or #769. All five agents work on branches created from the same parent head.
- All implementations belong under `shared/engine/generators/materializers/<concreteKind>/`, one folder per concrete kind. Your branch owns only its assigned folders. Keep tests adjacent to each concrete kind. **Do not edit shared indexes, `package.json`, tsconfig, Studio, rules, production contracts, global generator helpers, UUID/path/writer code, original Configurators, existing YAML scripts or another agent's folders.** Integration of exports, entrypoints, production types, shared primitives and workflows belongs to parent #775.
- Input is **already-authored, typed, plain Config object data** plus separate production metadata, not a `define*` Configurator and not a YAML document. Final Config may be incomplete during staged authoring; do not weaken real Config/Zod validators. Emit authored TypeScript/TSX/Markdown modules and sidecars, **not published JSON/Props**. Never add `build.files` to a Configurator.
- Each kind's materializer should be simple, explicit and standalone; duplication is preferable to generic factories/registries/base classes, complex AST abstractions or cross-sibling coupling. A parent delegates to its child's materializer and never reimplements child logic. Avoid circular imports; if a child kind belongs to another agent, produce a narrow delegation boundary and test it with a fixture/test double rather than implementing that sibling.
- The parent will implement canonical derived Production stage types and any minimal shared UUID/path/file writer contract. **Do not invent competing canonical shared types**; use local types derived from real `*_Config` where possible, and list any requested parent exports/contracts in your PR. Coordinate the final function signature through #775; keep self-contained tests passing now and state explicitly which integration checks remain pending.
- Respect `shared/engine/generators/AGENTS.md` as the existing JSON publication guidance; it currently assumes generators only serialize Props. Source materializers are intentionally distinct, and parent #775 must update that instruction to distinguish them. Do not change it in this subtask.
- Protect invariant IDs, explicit source identity, human-edited files and real localization/asset validation. Do not suppress TypeScript diagnostics with `as any` or `@ts-ignore`. No invented approved content or silently fabricated translations.

## Required evidence

Implement all owned kinds with adjacent unit tests and a cross-nesting fixture when relevant. Demonstrate exact generated module paths, imports/exports, immutable identifiers, source-language behavior, TODO blockages, warnings/errors, deterministic re-runs, and no-clobber behavior. Run the actual applicable tests/types/format where possible and report commands and results. Distinguish unit tests that passed from parent integration tests that cannot yet run because the shared Production API is still being authored. Keep the PR in Draft; do not merge without the project owner's instruction.

## Implemented interface and parity record

Each folder exports `materialize<Kind>(plainConfigOrEnvelope, context)` from `materialize.mjs`, returning `{ exportName, files, diagnostics }` (Course hierarchy also returns contextual Lesson `placements`; hierarchy results include `id`). All output files are a deterministic manifest of authored TS and Markdown, not Props/JSON. The parent must provide validated plain Config, `sourceLanguage`, optional deterministic `deriveId(kind, placement)`, create-only atomic writer and actual child renderers via dedicated callbacks. These callbacks are a temporary integration seam, not a universal factory/registry. The original YAML renderer is not imported.

| Materializer | Independently supported behavior | Needs parent or sibling integration |
| --- | --- | --- |
| Course | `content.items/order`, ordered direct Module/Chapter/Episode/Lesson placements, source locale, typed defineCourse output, per-placement Lesson metadata, methodology sidecars | Verified Lesson imports + built sparse override bridge and deterministic ID/writer |
| Module / Chapter | Typed `defineModule` / `defineChapter`, real child order, direct placement including Lessons, child metadata sidecars | Actual Lesson bridge; parent's UUID/writer |
| Episode | `defineEpisode` generics, `section.items/order`, events, source locale, Section imports under `sections/<slug>`, specification | Agent B's concrete Section dispatcher and Section parity with Lesson |
| Skill | Immutable UUID/slug, name and methodological/frontend descriptions, source-locale filtering | Final language coverage and parent writer |
| SkillGroup | Actual keyed Skills map, independent Skill files, typed child imports; no invented `items/order` | Parent orchestration, language coverage |
| SkillDomain | Actual direct Skills and grouped Skills maps, separate child files, deterministic map ordering | Parent orchestration, language coverage |
| AssessmentMethod | Title/description source text and review-language blocker | Parent orchestration, complete locales |
| EducationStandard | Original name, jurisdiction/source metadata, methodology and **complete** authored frontend locale dictionary; intentionally not pruned | Canonical full-locale review and parent writer |

Legacy per-kind behaviors applicable here include deterministic `define*` naming/generics, immutable Config identity, language review TODO markers for supported kinds, scoped nested child imports, arbitrary educational metadata preserved in specifications, syntax-checkable TS, and explicit failures on unsafe slugs, missing child renderers, duplicate ordered keys or identities. Markdown/Code asset readers, media nil UUIDs, Scene/Quest pending factories and bank Question/Flashcard placeholders are **not applicable** to the nine owned kinds and belong to other agents. The old YAML emitter's duplicate-ID failure for two aliases of the **same reusable Lesson** is deliberately not copied across separate parent placements; distinct contextual placements must survive.

**Important boundaries:** the new Course/Module/Chapter source layout follows the existing Course Stage 5 `content/<childSlug>/index.ts` convention; Episode's `sections/<slug>/` is the intentional Agent B handoff. Parent #775 must settle this layout against its source writer. Existing `Lesson` is never re-authored here. `production.existing` contains the **verified Lesson ID** and optional **built sparse** `base`/`locale` patch. The materializer passes that single reference, its matching evidence and full placement to the parent-owned Lesson callback; it never feeds built patches into legacy `course.build.overrides(rawPatch)`. New Lessons retain complete `production.methodology` without allocating an ID until Stage 5. An uncompleted Stage 2 Episode `{ config: { type: 'episode' }, production: { focus, purpose } }` produces a deterministic blocked `defineEpisode` draft with an empty Section collection, visible `Not implemented` title, `TODO (BLOCKER)`, blocker diagnostic and the original focus/purpose retained in `specification.md`. It is **not an approved scenario or publishable content**, and Episode content authoring remains separately authorized. New Lesson source creation is a parent-owned Stage 1 workflow handoff, not an independent full Lesson Configurator.

## Verification and remaining blockers

Source smoke assertions were executed against all nine branch modules and the current typed Stage 1–3 fixtures; 35 of 35 test-body scenarios passed using an isolated JavaScript assertion harness, including Course > Module > Chapter > Episode, direct Lesson and Episode placements, nested SkillDomain and SkillGroup, and two separate contextual overrides for one reused Lesson. Earlier GitHub checks passed for the existing Content packages build, Blocker TODOs, and label checks. Independently, the actual local TypeScript parser reported zero syntax diagnostics for representative generated Course and SkillDomain modules; the harness stubs the parser for the remaining test bodies, so this is **not** a real end-to-end generated-source typecheck. **These existing checks do not prove the new `.spec.mjs` files run**, because the Engine's current `package.json` pins explicit test paths. The parent must wire all nine adjacent tests into the test command and execute full Engine TypeScript, tests, format, materialization preflight/no-clobber, and end-to-end Draft/production checks. No TypeScript typecheck of emitted completed source or safe write/no-clobber check has been claimed. Generated incomplete drafts remain blocked rather than approved.


## Compatibility with Course Workflow Types from parent #775 (2026-11-22)

Validated against the actual `shared/engine/types/workflow/courseWorkflow.types.ts` definitions at parent commit `66514c2b959e4824f4307d5dd4c1e32f11beefeb`. The materializers preserve the original `{config,production}` envelope and never treat production-only data as final Config fields:

- **Stage 1 / Stage 4:** `CourseWorkflowStage3` inherits Stage 1 `production.languages.document` and the nonempty `planned` tuple. Course source materialization uses only the document locale in the generated `languages` declaration; unreviewed planned languages remain a visible blocker. It formats the required Stage 1 methodology object as `methodology.md`. Stage 4 is the same reviewed Stage 3 object, not a new Config shape.
- **Stage 2:** `CourseWorkflowStage2Module` and `CourseWorkflowStage2Chapter` may lack `id` and `params`. The parent `deriveId(kind, fullPlacement)` callback assigns first-materialization immutable identities, and absent optional params become valid final `params: {}`. Their exact `content.items/order` collection and production sidecars remain intact.
- **Stage 3 existing Lesson:** `CourseWorkflowStage3ExistingLesson` contains `production.kind='existing'`, `production.existing: {id,base?,locale?}` and `production.matching`. The renderer verifies the ID and matching provenance, forbids raw patches/identity mutation, and delegates import plus built sparse override bridging through a placement-scoped callback. `production.existing` is not serialized as a Lesson Config.
- **Stage 3 new Lesson:** `CourseWorkflowStage3NewLesson` contains full methodology and intent, **including the four distinct `production.assessment` booleans**, but no UUID, Sections or runtime languages. The Course-family renderers delegate a *standalone Lesson Stage 1 authoring handoff*, never invoke a complete Lesson/Section/Quiz renderer or synthesize assessment banks. The bridge returns a permanent allocated Lesson UUID and **exactly one** `content/<book>/data/lessons/<last-hex>/<uuid>/index.ts` source file. This file is deliberately omitted from the parent `defineCourse`/`defineModule`/`defineChapter` Configurator imports until independent Lesson completion; its exact intended placement/order is preserved in returned `pendingPlacements` and a `TODO (BLOCKER)` source comment, while the rendered draft's active Configurator collection contains only completed children. The parent writer and publisher **must block final publication** while there are unresolved handoffs; this is not a complete publishable Course or a replacement for the Stage 3 planning source.
- **Episode boundary:** a Stage 2 Episode slot is valid in `CourseWorkflowMaterializerInput = CourseWorkflowStage3` but lacks full `Episode_Config` fields. The Episode materializer emits a deterministic **blocked** `defineEpisode` draft with `Not implemented` localized title and empty Sections, plus `pending-episode-scenario` diagnostic and retained editorial `focus/purpose`. It never invents scenario Sections, Scenes or approval; the final publisher must reject the blocker. A complete Episode still delegates Sections to Agent B.

The Stage 3/Stage 4 *authoring shape* is now compatible; full Stage 5 orchestration, typed production bridge exports, actual generated source typechecking, language completeness checks, no-clobber writer and test-command registration remain responsibilities of parent #775. This PR deliberately does not introduce a competing shared Stage type, a YAML adapter or a raw-vs-built override compatibility layer.


## Owner instructions received 2026-11-22 — precedence and missing parent API

- The newest owner comment on PR #776 (issuecomment-7082624724) **supersedes** the earlier comment (issuecomment-7082512393) requesting executable Lesson/Quiz/Flashcards stubs at Course Stage 5. **Do not implement those stubs here.** A new Course Lesson gets only a reviewed standalone `LessonWorkflowStage1` source handoff. Question/Flashcard banks, Quiz/Flashcards Sections and `defineLesson` belong to the separate Lesson production flow.
- The intermediate review (issuecomment-7082549520) correctly identified a Stage 3 type mismatch for provisional Episodes; the blocked Episode draft described above resolves this in Agent A's owned materializer. Its `pending-episode-scenario` diagnostic is a required production blocker.
- The newer parent #775 already exports `CourseWorkflowMaterializerInput = CourseWorkflowStage3` and the canonical `LessonProductionAssessmentRequirements` with four independent booleans. Child materializers accept this envelope structurally. The **parent has not yet exported `LessonWorkflowStage1` or a Lesson Stage 1 bridge/writer** at the time of this change. The actual authored shape and `satisfies LessonWorkflowStage1` typecheck, stable root-scoped UUID generator, create-only writer and no-clobber checks must be implemented by the parent, without weakening Stage 3 typing.
- **Exact temporary callback seam:** `materializeLessonPlacement(stage3Node, { directory, placement, kind: 'new', production, sourceLanguage, plannedLanguages })` must allocate/return `lessonId` and one UUID-addressed Stage 1 `index.ts` file. For `kind: 'existing'`, it must preserve the imported Lesson identity and optional prebuilt sparse patch and return a real existing Configurator import. Do not return the incomplete Stage 1 object as a final Course child. Renderer results include `pendingPlacements` and a severity-`blocker` diagnostic for every new Lesson. The writer must preflight all paths, not overwrite existing authored sources, and prevent runtime/course publication until independent Lesson completion.
- Tests cover the new callback payload, assessment decisions, Stage 1 source path, lack of fabricated Sections/Quiz/Flashcards, direct and nested placements, no false completed import, provisional Episode draft source and blocked diagnostics, evidence-preserving methodology rendering and deterministic output. **35/35 assertion-harness test bodies pass**; TypeScript parser calls in that harness remain stubbed, and real Engine tests/typechecks, parent writer checks and end-to-end publication gating remain unverified.

## Review follow-up — high-priority verification request (2026-11-22)

[PR review comment #7083085106](https://github.com/KiT-Maverik/svitlo/pull/776#issuecomment-7083085106) correctly distinguishes the earlier **35/35 isolated JavaScript test-body harness** from a real Node test run. That harness stubbed `ts.createSourceFile`, so the earlier result **does not prove emitted TypeScript validity** or satisfy the review request.

**Work completed here:**
- Added `course/materialize.build.spec.mjs`, a focused **semantic generated-source test**. It uses real `typescript.createProgram` / `getPreEmitDiagnostics`, maps `@svitlo/engine/build` to the **actual Engine `build.ts`** (not a homemade stub), and compiles deterministic complete Course → Module → Chapter → Episode sources in a virtual filesystem. The test deliberately uses complete metadata with an empty Episode Section collection to isolate the owner API contract; a reviewed storyline is not claimed. The test does not touch disk or change publication.
- Labeled the existing fake `LessonWorkflowStage1` test output explicitly as a **test double**, not a valid Lesson production object. Its fake `export const lessonStage1 = {}` verifies only routing, metadata and UUID path, never the absent canonical Stage 1 type or writer.
- **Executed actual Node 22 + installed TypeScript parser** for four real generated `index.ts` files from the current Course → Module → Chapter → Episode hierarchy. Each returned **zero syntax diagnostics**. Command: `node /tmp/svitlo-776-real-node/ts-diagnostics.mjs <four-emitted-source-paths>`; this is an isolated compiler parser run, **not** a package typecheck or native nine-suite test execution.
- The full nine adjacent `node --test` suites and the new `materialize.build.spec.mjs` semantic test **have not been executed**, because this environment has no local Svitlo repository checkout and cannot reach GitHub over the container network. Existing GitHub Draft workflows check content and TODOs, not these materializer suites. **Do not mark the review as verified or merge-ready based on those Draft checks.**

**Reproduction in a checked-out, dependency-installed repository:**

```sh
node --test \
  shared/engine/generators/materializers/{course,module,chapter,episode,skill,skillGroup,skillDomain,educationStandard,assessmentMethod}/materialize.spec.mjs \
  shared/engine/generators/materializers/course/materialize.build.spec.mjs
```

The parent #775 owns wiring these exact paths into Engine test/CI, implementing the canonical `LessonWorkflowStage1` emitter/UUID-addressed writer, and verifying actual end-to-end publication blockers. Until the native suites and semantic compiler test have succeeded on the current head, **review finding #7083085106 remains open**.
