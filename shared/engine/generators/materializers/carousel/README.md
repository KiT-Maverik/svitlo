# Composite and Scene source materializers — Agent D

This PR delivers five **independent authored-source renderers** inside their own kind folders:

| Materializer | Factory | Owned child boundary | Source file |
| --- | --- | --- | --- |
| Carousel | `defineCarousel` | `slides.items/<slug>` → Image/Scene | `carousel/materializeCarousel.ts` |
| Checkpoint | `defineCheckpoint` | `content.items/<slug>` → CheckpointItem | `checkpoint/materializeCheckpoint.ts` |
| CheckpointItem | `defineCheckpointItem` | `question` → Text, `answer` → CheckpointAnswer | `checkpointItem/materializeCheckpointItem.ts` |
| CheckpointAnswer | `defineCheckpointAnswer` | `content.items/<slug>` → supported non-Checkpoint ContentBlocks | `checkpointAnswer/materializeCheckpointAnswer.ts` |
| Scene | `defineScene` | none; production specification beside authored Config | `scene/materializeScene.ts` |

All paths are relative to the **parent-approved entity source root**. Each renderer returns `{ exportName, files: [{ path, content, kind }], diagnostics }`, never writing files or publishing Props. The parent is responsible for invoking each renderer, verifying collocated source and required imports, allocating any still-missing UUID once, and applying the final safe create-only file writer. The per-kind callbacks are **explicit delegation seams**, not a global registry or generic materializer.

## Historical YAML → TypeScript feature-parity review

Read actual `shared/engine/scripts/yamlScaffolding/{recursiveMaterializer.mjs,recursiveMaterializer.spec.mjs,yamlScaffolding.mjs,productionScaffolding.mjs,README.md}` on `integration/unified-yaml-materialization-preview`, the current Engine Config/Zod/build tests, existing Course/Lesson materializers and PR #773 Scene scaffolding. This replacement never imports the YAML implementation.

- **Factories/generics:** Uses actual `defineCarousel<Slug, Items, Languages>`, `defineCheckpoint<Slug, Items, Languages>`, `defineCheckpointItem<Slug, Answer, Question, Languages>`, `defineCheckpointAnswer<Slug, Items, Languages>`, and `defineScene<Slug, Languages>` with source names and named child imports. There is **no** `CarouselSlide` factory.
- **Collection order & boundaries:** Only the Engine-defined `slides.items/order`, `content.items/order`, `question` and `answer` paths are traversed; ordered modules preserve every enabled child exactly once and omit draft-disabled `false` nodes. Explicit owner callbacks emit nested source, preventing parent serializers from inventing their child's Code/Markdown/media/Scene implementation.
- **Identity & locations:** Validates canonical UUIDs, camelCase slugs, allowed kinds, local duplicate IDs, and safe relative module directory components; the final Config has stable authored IDs, never runtime-generated IDs. Repeated calls on identical input are byte-stable. Parent must also detect **cross-subtree UUID collisions** and perform filesystem symlink/path/no-clobber preflight before writing.
- **Source languages:** Each renderer consumes the reviewed source language passed as `documentLanguage` by the parent (for Course it is `production.languages.document`), never a fabricated translation or a pre-Stage-5 `config.params.languages`. Parent owns `languages.ts` and the `TODO (BLOCKER)` for the *complete planned language set*; each child references the parent-supplied tuple. Missing source-language translations error instead of substituting placeholders.
- **Scene:** Emits a canonical `defineScene` Config and the exact source `production.specification` beside it. Unregistered/pending Scenes receive a visible `TODO (BLOCKER)`, and missing specifications receive a separate blocker. Does **not** touch SceneStub, React Scene TSX, lazy UUID registry or existing sceneScaffolding/registry scripts. Parent must coordinate explicit, verified Scene staging/registration with that existing workflow and treat these as separate outputs.
- **Pending source details:** `readMarkdown`/`readCodeSource`, Code file extensions, media nil-UUID placeholders/spec sidecars and non-Scene pending cases belong to the delegated *concrete primitive materializers*, not composite parents. Quiz/Flashcard pending helpers are not emitted from these five types. The parent production stage must reject incomplete materialization and pending TODOs. Raw TypeScript expressions/source imports that cannot be round-tripped through plain JavaScript Config are **not reconstructed** here: the parent preserves those source expressions through the approved authoring/integration seam.
- **Overrides:** Parent #775 owns the Course reuse/built sparse `{base, locale}` patch bridge and staged `additionalItems`/nested `build.overrides` expression handling; concrete composite renderers emit only the final ordered authored Config tree after approved source projection. The `false` exclusions are draft authoring filters, **not** permission to mutate an existing configurator or publish a disabled child.

## Verified compatibility with parent #775 typed Course workflow (2026-11-22)

Reviewed the real parent branch head `66514c2b959e4824f4307d5dd4c1e32f11beefeb`: `shared/engine/types/workflow/courseWorkflow.types.ts`, its positive/negative `courseWorkflow.typecheck.ts` fixtures, and the updated Lesson Build contract. This is a **source-contract inspection**, not an executed Engine typecheck.

- **Stage 1:** the authored language is `course.production.languages.document` and the nonempty planned tuple is `course.production.languages.planned`. `course.config.params.languages` is intentionally forbidden before materialization. The Stage-5 orchestrator must map `production.languages.document` to each renderer's `documentLanguage` context and emit an approved source-only `languages.ts` with a blocker for unreviewed planned locales. No renderer should read `config.params.languages` from a Stage 1/2/3 Course plan.
- **Stage 2:** Module and Chapter children are `{ config, production }` nodes. Provisional Episode/Lesson slots deliberately have **no UUID**. These five materializers are NOT invoked on Stage 2 source; the parent Stage-5 allocator must allocate/persist child IDs once before calling a concrete materializer. Delegates must not create IDs.
- **Stage 3:** new Lessons remain methodological handoffs, and existing Lessons use **exactly** `production.existing: { id, base?, locale? }`. Built sparse `base/locale` patches must not be passed as raw Course overrides; the Course materializer (Agent A / parent #775) owns that conversion. The composite and Scene renderers do not import Lesson references, interpret matching rationale or serialize Stage 3 Course placement objects.
- **Stage 4:** independent review pins the **same Stage 3 typed object** to a Git SHA; no new Stage 4 Config or implicit approval status is inferred. These source materializers may run only after that review and the Stage-5 source projection, not as part of Stage 1–4 planning.
- **Scene and deep child source:** The Stage 1–3 Course types do not yet define a Stage-5 Lesson/Episode ContentBlock production envelope. Scene's own `production.specification` and pending/registration evidence must be carried explicitly into `SceneSourceContext.production`. Until parent finalizes that integration contract, wrappers must map nested `{ config, production }` at known boundaries without dropping the production metadata. It is **not** valid to assume a raw `SceneSource` alone contains the specification.
- **Adjustment in this child PR:** `CarouselSlideSource` and `CheckpointAnswerBlockSource` now use this PR's explicit `SceneSource` draft projection instead of demanding a completed `ContentBlock_Scene_Config` too early. All composite delegates reject files outside their exact owned child subtree. Independent final Config schemas remain strict, and parent retains responsibility for full UUID uniqueness, safe filesystem writing and validated Stage-5 authoring.

**Compatibility verdict:** no changes to the shipped Stage 1–3 parent types are required. These five materializers are structurally compatible **after** the parent Stage-5 projection assigns identities, selects the source language and forwards Scene metadata. End-to-end compatibility remains unverified until Stage 5 orchestrator + full Engine typechecks exist.

## Parent integration contracts still required

1. Confirm and wire the uniform `renderChild`/specific `renderQuestion`, `renderAnswer`, `renderItem` callback contracts into parent #775; callers must supply reviewed `documentLanguage`, stable `languagesImport`, verified Scene `registered`, and Scene-owned production specification.
2. Use the parent-only source UUID allocator and **global** ID collision check, source import/expression preservation, planned-language tuple, nested override projection, and safe atomic create-only/check file writer. No local filesystem writes or shared helpers have been introduced in this child PR.
3. Run strict TypeScript compilation **against actual `@svitlo/engine/build` definitions**, end-to-end Stage-5 materialization, Scene stub registration, a cross-parent Lesson/Episode invocation and no-clobber tests after the shared producer is integrated. Synthetic delegate-only fixtures are not full integration validation.
4. Parent updates `shared/engine/generators/AGENTS.md` to distinguish source materializers from existing Props/JSON publishers. These five renderers do not change the existing Config/build/Props contracts.

## Verification

Adjacent `*.spec.ts` files exercise each kind, strict ordering, forbidden types, stable identities, source-locale pruning, explicit Scene blocking/specification, delegation, syntactic TS AST parsing, and a deep Checkpoint → Item → Answer → Carousel → Scene nesting fixture. Tests only assert generated code syntax and fake delegate behavior where the parent API is missing.

**Test execution status:** The agent's GitHub-connected environment lacks a checked-out repository and installed workspace dependencies. The following commands were **not executed** and must not be treated as passing:

```sh
node --test shared/engine/generators/materializers/{carousel,checkpoint,checkpointItem,checkpointAnswer,scene}/*.spec.ts
npm test --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
```

Run with the repository's actual TypeScript test runner/package scripts after parent integration; `node --test` alone may require the configured TS loader. Check CI on the **latest PR head**, not a historical merge SHA. Draft remains Draft; no Ready/merge authorization is implied.
