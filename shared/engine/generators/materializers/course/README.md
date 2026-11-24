# Typed Course family source materializers

**Implementation status:** the Course/Module/Chapter/Episode source renderers and typed Course Stage 5 orchestrator compose reviewed typed source. Their job is to emit reviewed, immutable **TypeScript authoring modules and derived methodology**, not runtime Course Props/JSON, editorial approval or a YAML conversion.

## Concrete kinds and responsibility

Nine independent kinds have their own implementations/tests: `course`, `module`, `chapter`, `episode`, `skill`, `skillGroup`, `skillDomain`, `educationStandard` and `assessmentMethod`. A parent determines the typed child map/order and where it belongs; each child's own `materialize.mjs` emits the appropriate `define*` module, export/import declarations, source-locale content, specifications and pending diagnostics. Episode delegates Sections to **the same concrete Section materializers** used under Lesson, without a separate Episode-only source generator.

The public `materializeCourse(input)` direct entrypoint in `materializeCourseDirect.ts` validates the canonical plan using Zod and delegates to the concrete `materializeStage5.mjs` orchestrator. The trusted orchestrator `materializeStage5.mjs` accepts the **canonical** `CourseWorkflowStage3 = CourseWorkflowStage3` and composes these concrete renderers. The Stage 1–3 plan is one evolving typed `draft.ts` with editorial `production` distinct from final Engine Config/Props. Independent Stage 4 review records editorial evidence; the technical materialization gate uses the exact pinned Stage 3 source without parsing that evidence. TypeScript `satisfies` alone does not grant editorial approval. See [Stage 5 orchestration](./STAGE5.md) and [trusted Course rollout](../../../../../scripts/ci/courseMaterialization/README.md).

## Lesson placements and safe source transition

- **New Lesson:** derive a deterministic immutable UUID from the Course root and full placement path, persist it, and emit **only** a new `CourseWorkflowLessonSeed` `draft.ts` under the Lesson's UUID directory. Preserve proposal methodology, Skill references, evidence and all four assessment booleans; derive seed language context from the Course root. It is not Lesson Stage 1. Do not emit `defineLesson`, Sections, Quiz/Flashcards placeholders, a bank or any imaginary content; the Course remains blocked until independent Lesson production.
- **Existing Lesson:** preserve imported Lesson identity and verify trusted matching/provenance. A Course-local sparse `build.overrides(rawPatch, { languages })` result must be reconciled against the directly imported Lesson Configurator and original plain `production.sourcePatch`; never feed built `{id,base,locale}` directly as a raw Course Config patch or mutate the standalone Lesson.
- **Episode brief:** `production.focus/purpose` alone does not supply a reviewed playable Episode scenario. Pending Episodes stay explicitly blocked. Never invent a scenario, Scenes or full narrative on Stage 5.
- **Source preservation:** the trusted no-replay publisher deletes the exact pinned Stage 3 `draft.ts` and creates `index.ts` plus owner-allowlisted TS/Markdown files in the same Git commit. Exact original bytes remain in the reviewed commit/blob. Require pinned HEAD/blob, write-authorized actor, deterministic paths/UUIDs, no symlink/traversal, no existing file clobbers and non-force branch lease. Generated methodology is a **derived output**, not a second editable plan.

**Deployment boundary:** verify `.github/workflows/course-typed-materialization.yml` on default `develop`, its manual `workflow_dispatch` with `pr_number` and an actual authorized pinned Actions run before claiming operational materialization.

## Verification commands

```sh
node --test scripts/ci/courseMaterialization/typed-course-direct.spec.mjs
node --test shared/engine/generators/materializers/course/materializeStage5.spec.mjs
node --test shared/engine/generators/materializers/course/materializeStage5.build.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
npm test --workspace @svitlo/engine
```

Use the current HEAD and report actual results and outstanding blockers.

## Ordered placement inventory

The Stage 5 plan and trusted manifest include `inventory.lessons` and `inventory.episodes`, derived from actual renderer results and the complete reviewed Course order. Each row identifies its immutable UUID, slug, full placement and zero-based order path, source path, kind and factual handoff status. Repeated Lesson references have separate rows keyed by placement rather than UUID alone. This is source-planning evidence, not child PR creation, editorial approval or publication status.
