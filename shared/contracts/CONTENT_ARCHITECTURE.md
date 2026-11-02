# Canonical content contract architecture

**Source of truth:** `@svitlo/contracts/content` (re-exported by `@svitlo/engine/content`).

## Canonical public names

- `Lesson<'definition' | 'data' | 'response'>` and `defineLessonData`
- `Section<'definition' | 'data' | 'response'>`
- `Flashcard<'definition' | 'data' | 'response'>`
- `Question<'definition' | 'data' | 'response'>`, `Question_Map`, `Question_Catalog`, `Question_Catalog_DataFor`, `Question_Catalog_ValidSlugs`, and nine `Question_*` variants
- `ContentBlock<'definition' | 'data' | 'response'>`, `ContentBlock_Map`, `ContentBlock_Type`, `ContentBlock_Catalog`, `ContentBlock_Catalog_DataFor`, `ContentBlock_Reference`, `defineContentBlockCatalog` and ten `ContentBlock_*` variants
- A Quiz is `ContentBlock_Quiz`, not a separate standalone Lesson section or independent `Quiz_Config`.
- Session/progress-only types remain `LessonState`, `QuizState`, `QuizAnswer`, `QuizResult`, etc., in `state.types.ts` and `@svitlo/contracts/state`.

No public `LessonV2`, `QuestionV2`, `Lesson_Config`, `Quiz_Config`, `Question_Config`, or `ContentBlock_Config` aliases exist.

## Three representations

| Representation | Purpose | Serializable? |
| --- | --- | --- |
| Definition | Structure, catalog selectors, explicit order, stable renderer registry keys | Renderer keys are strings; JSX must not be embedded |
| Data | Canonical authored IDs, slugs, full locale maps, invariant settings and content | Build-time only |
| Response | Selected locale, localized strings, question references, nested discriminated blocks | **Yes**; only this form reaches runtime |

`ContentBlock<'response'>` always carries a discriminating `type`. Nested `checkpoint.items[].answer` also consists of discriminated Response blocks. Authored catalog types imply their kinds from their keys; the build-time serializer must inject `type` into the Response for every block, including nested blocks.

Every Response Scene carries `rendererKey: string`, resolved by the **runtime component registry**. Definition Scene carries the same key. The translated Scene payload is `messages`; `locale` is reserved for the selected language/fallback metadata. Never serialize React components, JSX or functions.

Quiz authored Data can embed selected questions for strict validation, but the published quiz block stores only `questionSlugs`; each slug must resolve in the Lesson's localized `questions.selectOneAnswer` catalog. Question payloads are published once.

Presentation order is separate from catalog lookup: `Lesson.sectionOrder` and `Section.order` are optional ordered references. A renderer/publisher should prefer those order declarations and validate references against catalogs, rather than relying on lexicographic or object-entry iteration.

## Migration notes for parallel agents

Agents 1 and 2 should use the canonical generic `Lesson<'response'>`, `Section<'response'>`, and `ContentBlock<'response'>` names, and the Response-only renderer. Replace authored use of `defineLessonV2Data` with `defineLessonData` when updating lesson wiring, without rewriting translations. The generator must enrich published resources with `type`, `rendererKey`, and source-independent order metadata.

The old lesson/config builders have been removed; do not bring them back as backwards-compatibility exports. Existing Playground/Math legacy Lesson UI consumers need migration to Response. Playground UI and the source Lesson wiring are owned by Agents 1 and 2. Math's legacy UI is outside this agent's assigned change scope and should be tracked as an integration blocker until migrated.

## Baseline and validation limits

On integration base `new-lesson` (commit `66300e8`), the Playground authored Lesson imports missing `*.definition` modules; this is a pre-existing failure, not caused by contract cleanup. The canonical type-level checks are in `contentArchitecture.typecheck.ts`. Whole-monorepo typechecking will also encounter unmigrated consumers of removed legacy types; those must be distinguished from errors inside the new contracts.
