# Typed Course family source materializers

**Implementation status:** the Course/Module/Chapter/Episode source renderers and typed Course Stage 5 orchestrator compose reviewed typed source. Their job is to emit reviewed, immutable **TypeScript authoring modules and derived methodology**, not runtime Course Props/JSON, editorial approval or a YAML conversion.

## Concrete kinds and responsibility

Nine independent kinds have their own implementations/tests: `course`, `module`, `chapter`, `episode`, `skill`, `skillGroup`, `skillDomain`, `educationStandard` and `assessmentMethod`. A parent determines the typed child map/order and where it belongs; each child's own `materialize.mjs` emits the appropriate `define*` module, export/import declarations, source-locale content, specifications and pending diagnostics. Episode delegates Sections to **the same concrete Section materializers** used under Lesson, without a separate Episode-only source generator.

The trusted orchestrator `materializeStage5.mjs` accepts the **canonical** `CourseWorkflowMaterializerInput = CourseWorkflowStage3` and composes these concrete renderers. The Stage 1–3 plan is one evolving typed `draft.ts` with editorial `production` distinct from final Engine Config/Props. Independent Stage 4 approval pins the final Stage 3 bytes; authoring with `satisfies` alone is not approval. See [Stage 5 orchestration](./STAGE5.md) and [trusted Course rollout](../../../../../scripts/ci/courseMaterialization/README.md).

## Lesson placements and safe source transition

- **New Lesson:** derive a deterministic immutable UUID from the Course root and full placement path, persist it, and emit **only** a new `LessonWorkflowStage1` `draft.ts` under the Lesson's UUID directory. Preserve methodology, source/planned languages and all four independent assessment booleans. Do not emit `defineLesson`, Sections, Quiz/Flashcards placeholders, a bank or any imaginary content; the Course remains blocked until independent Lesson production.
- **Existing Lesson:** preserve imported Lesson identity and verify trusted matching/provenance. A Course-local sparse `build.overrides(rawPatch, { languages })` result must be reconciled against the real authored raw expression; never feed built `{id,base,locale}` directly as a raw Course Config patch or mutate the standalone Lesson.
- **Episode brief:** `production.focus/purpose` alone does not supply a reviewed playable Episode scenario. Pending Episodes stay explicitly blocked. Never invent a scenario, Scenes or full narrative on Stage 5.
- **Source preservation:** `sourceCommit.mjs` and the trusted workflow delete the exact reviewed Stage 3 `draft.ts` and create `index.ts` plus owner-allowlisted TS/Markdown files in the same Git commit. Exact original bytes remain in the reviewed commit/blob. Require pinned HEAD/blob/reviewer, valid independent APPROVED review, deterministic paths/UUIDs, no symlink/traversal, no existing file clobbers and non-force branch lease. Generated methodology is a **derived output**, not a second editable plan.

**Deployment boundary:** verify `.github/workflows/course-typed-materialization.yml` on default `develop`, its manual `workflow_dispatch` with `pr_number` and an actual authorized pinned Actions run before claiming operational materialization.

## Verification commands

```sh
node scripts/ci/courseMaterialization/build-course-renderers.mjs
node --test scripts/ci/courseMaterialization/typed-course-materialization.spec.mjs
node --test shared/engine/generators/materializers/course/materializeStage5.spec.mjs
node --test shared/engine/generators/materializers/course/materializeStage5.build.spec.mjs
node --test shared/engine/generators/materializers/course/sourceCommit.spec.mjs
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
npm test --workspace @svitlo/engine
```

Use the current HEAD and report actual results and outstanding blockers.
