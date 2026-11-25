# Typed Course family source materializers

**Implementation status:** the Course/Module/Chapter/Episode source renderers and typed Course Stage 5 orchestrator compose reviewed typed source. Their job is to emit reviewed, immutable **TypeScript authoring modules and derived methodology**, not runtime Course Props/JSON, editorial approval or a YAML conversion.

## Concrete kinds and responsibility

Nine independent kinds have their own implementations/tests: `course`, `module`, `chapter`, `episode`, `skill`, `skillGroup`, `skillDomain`, `educationStandard` and `assessmentMethod`. A parent determines the typed child map/order and where it belongs; each child's own `materialize.mjs` emits the appropriate `define*` module, export/import declarations, source-locale content, specifications and pending diagnostics. Episode delegates Sections to **the same concrete Section materializers** used under Lesson, without a separate Episode-only source generator.

**#857 target:** The author-edited Course Stage 1–3 source is a single inert default-exported typed object. The shared trusted Draft Reader parses exact pinned bytes without executing source; it validates the final `CourseWorkflowStage3` Zod schema before passing plain data to the trusted `materializeCourse`/Stage 5 orchestrator. The independently reviewed Course draft must not invoke `materializeCourse()` itself. All genuine Lesson dependency imports and Build overrides belong to separately trusted materializer code, not the authored `draft.ts`. See [Stage 5 orchestration](./STAGE5.md) and [Course runbook](../../../../../scripts/ci/courseMaterialization/README.md) for target details and current deployment caveats.

## Lesson placements and safe source transition

- **New Lesson:** derive a deterministic immutable UUID from the Course root and full placement path, persist it, and emit **only** a new `CourseWorkflowLessonSeed` `draft.ts` under the Lesson's UUID directory. Preserve proposal methodology, Skill references, evidence and all four assessment booleans; derive seed language context from the Course root. It is not Lesson Stage 1. Do not emit `defineLesson`, Sections, Quiz/Flashcards placeholders, a bank or any imaginary content; the Course remains blocked until independent Lesson production.
- **Existing Lesson:** resolve the author-declared Lesson UUID and optional sparse `production.sourcePatch` from trusted, verified dependency context. Preserve imported Lesson identity, Skills and source SHA. Emit a **direct import in the immediate owning Course/Module/Chapter `index.ts`**, without creating a `content/<placement>/index.ts` re-export. The original JSON-safe `production.sourcePatch` is validated by the trusted materializer against the actual imported Lesson `build.overrides()` result and attached only at the reviewed placement with `placeLesson(source, patch)`; never feed built `{id,base,locale}` as a Config patch, change the standalone Lesson, or produce `authoredCourseOverrides.ts`.
- **Pending placements:** every reviewed new Lesson, Episode and Assessment slot has its **own** `<placement>/stub.ts` exporting `const stub = defineLessonStub/defineEpisodeStub/defineAssessmentStub({id, slug})` and one actionable `TODO (BLOCKER)` specifying completion and stub removal. Its immediate parent `index.ts` imports `{ stub as child_<slug> }` from that local file; `content.items` references the alias and retains the original complete `content.order`. The preview Configurator remains draft-only and blocked; an independent new Lesson UUID-addressed seed or Course-owned Episode/Assessment `draft.ts` preserves intent without being imported into the parent. An existing, verified Lesson is imported directly, **without** generating a stub. Never infer order from comments.
- **Shared languages:** emit a single Course-root `constants.ts` with source-only active `languages` and exported `Languages` type. `Course`, `Module` and `Chapter` index modules import from the root; only `constants.ts` records planned language restoration in one actionable TODO. Do not create `languages.ts` or duplicate active tuples in children.
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

**Child restoration:** Trusted Episode/Assessment gates pin the `stub.ts` blob SHA on both owning Course and child branches. The static TypeScript AST verifier accepts only its exact `define*Stub({id,slug})` export and the immediate parent's corresponding named import and item alias; it rejects foreign/executable stubs, forged IDs, ambiguous ownership, order changes and untrusted parent edits. The sealed, non-force transaction creates the completed child `index.ts`, changes only the authorized parent slot/import and **deletes both the child `draft.ts` and `stub.ts` in the same commit**. Lesson Stage 6.1 never silently edits Course; a separately authorized Course integration later replaces its pending stub after the independent Lesson is verified.

## Ordered placement inventory

The Stage 5 plan and trusted manifest include `inventory.lessons`, `inventory.episodes` and `inventory.assessments`, derived from actual renderer results and the complete reviewed Course order. Each row identifies its immutable UUID, slug, full placement and zero-based order path, source path, kind and factual handoff status. Repeated Lesson references have separate rows keyed by placement rather than UUID alone. This is source-planning evidence, not child PR creation, editorial approval or publication status.

The `placementSourcePath` for every row identifies its **immediate owning parent `index.ts`**; pending children have both `stubSourcePath` (the locally owned `stub.ts`) and an independent `sourcePath` (the authored `draft.ts` handoff, UUID-addressed for new Lessons). A reused Lesson's `sourcePath` is the immutable original Lesson `index.ts`, not a generated wrapper; the inventory additionally binds its original `sourceExportName`, import path and reviewed source SHA. Trusted manifest verification checks those placements against the sealed source bytes and rejects displaced, duplicate or unregistered stubs and handoffs. Source planning and production approval remain separate.
