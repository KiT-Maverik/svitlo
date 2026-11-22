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

**Important boundaries:** the new Course/Module/Chapter source layout follows the existing Course Stage 5 `content/<childSlug>/index.ts` convention; Episode's `sections/<slug>/` is the intentional Agent B handoff. Parent #775 must settle this layout against its source writer. Existing `Lesson` is never re-authored here. `production.existing` contains the **verified Lesson ID** and optional **built sparse** `base`/`locale` patch. The materializer passes that single reference, its matching evidence and full placement to the parent-owned Lesson callback; it never feeds built patches into legacy `course.build.overrides(rawPatch)`. New Lessons retain complete `production.methodology` without allocating an ID until Stage 5. An uncompleted Stage 2 Episode `{ config: { type: 'episode' }, production: { focus, purpose } }` is explicitly rejected with `TODO (BLOCKER)`; Episode authoring needs its own authorization before Section materialization. New Lesson source creation remains a separate independently authorized methodology handoff.

## Verification and remaining blockers

Source smoke assertions were executed against all nine branch modules and the current typed Stage 1–3 fixtures; 31 of 31 test-body scenarios passed using an isolated JavaScript assertion harness, including Course > Module > Chapter > Episode, direct Lesson and Episode placements, nested SkillDomain and SkillGroup, and two separate contextual overrides for one reused Lesson. Earlier GitHub checks passed for the existing Content packages build, Blocker TODOs, and label checks. Independently, the actual local TypeScript parser reported zero syntax diagnostics for representative generated Course and SkillDomain modules; the harness stubs the parser for the remaining test bodies, so this is **not** a real end-to-end generated-source typecheck. **These existing checks do not prove the new `.spec.mjs` files run**, because the Engine's current `package.json` pins explicit test paths. The parent must wire all nine adjacent tests into the test command and execute full Engine TypeScript, tests, format, materialization preflight/no-clobber, and end-to-end Draft/production checks. No TypeScript typecheck of emitted completed source or safe write/no-clobber check has been claimed. Generated incomplete drafts remain blocked rather than approved.


## Compatibility with Course Workflow Types from parent #775 (2026-11-22)

Validated against the actual `shared/engine/types/workflow/courseWorkflow.types.ts` definitions at parent commit `66514c2b959e4824f4307d5dd4c1e32f11beefeb`. The materializers preserve the original `{config,production}` envelope and never treat production-only data as final Config fields:

- **Stage 1 / Stage 4:** `CourseWorkflowStage3` inherits Stage 1 `production.languages.document` and the nonempty `planned` tuple. Course source materialization uses only the document locale in the generated `languages` declaration; unreviewed planned languages remain a visible blocker. It formats the required Stage 1 methodology object as `methodology.md`. Stage 4 is the same reviewed Stage 3 object, not a new Config shape.
- **Stage 2:** `CourseWorkflowStage2Module` and `CourseWorkflowStage2Chapter` may lack `id` and `params`. The parent `deriveId(kind, fullPlacement)` callback assigns first-materialization immutable identities, and absent optional params become valid final `params: {}`. Their exact `content.items/order` collection and production sidecars remain intact.
- **Stage 3 existing Lesson:** `CourseWorkflowStage3ExistingLesson` contains `production.kind='existing'`, `production.existing: {id,base?,locale?}` and `production.matching`. The renderer verifies the ID and matching provenance, forbids raw patches/identity mutation, and delegates import plus built sparse override bridging through a placement-scoped callback. `production.existing` is not serialized as a Lesson Config.
- **Stage 3 new Lesson:** `CourseWorkflowStage3NewLesson` contains full methodology and intent but no UUID, Sections or runtime languages. The materializer delegates a minimal new-Lesson handoff and requires the bridge to return an allocated persistent UUID; no fabricated complete Lesson or PR is created.
- **Episode boundary:** a Stage 2 Episode slot is allowed by the Stage 3 editorial TypeScript tree but is **not** a complete `Episode_Config`. The materializer refuses it until authorized Sections and narrative resources are authored; a completed Episode still delegates Sections to Agent B.

The Stage 3/Stage 4 *authoring shape* is now compatible; full Stage 5 orchestration, typed production bridge exports, actual generated source typechecking, language completeness checks, no-clobber writer and test-command registration remain responsibilities of parent #775. This PR deliberately does not introduce a competing shared Stage type, a YAML adapter or a raw-vs-built override compatibility layer.
