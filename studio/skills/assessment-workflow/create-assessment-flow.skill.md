# Create Assessment Flow

**Status:** target workflow for implementation; verify Engine contracts and deployment before use.

One Assessment belongs to one Course and one reserved ordered placement. Reuse its UUID, parent Course branch and entity-owned Draft PR. Read root AGENTS.md, [Assessment](../../docs/entities/assessment.md), [Course Flow](../course-workflow/create-course-flow.skill.md), [assessment bank separation](../../docs/architecture/lesson-assessment-bank-separation.md), GitHub/CI rules and the actual contracts/tests. Do not start automatically at Course materialization.

## Source ownership and paths

Follow the [canonical Assessment source layout](../../docs/entities/assessment.md#canonical-source-layout). Use the exact reserved placement under the Course tree, appending `content/<slug>/` at each level. The entity-owned `draft.ts` and final `index.ts` share this directory. Course Stage 5 initially emits only the inline placeholder in the immediate parent's configurator. Full materialization replaces that exact placeholder with the relative child import and emits slug-named Section/Block folders using the existing materializers. Never relocate a nested Assessment to a global directory.

## Relationship to the ten-stage Course Workflow

Course **Stage 6 Verify Questions Readiness** identifies real Lesson-owned Question Banks needed by Course-owned evaluations. Course **Stage 7 Design Assessments** applies only when the approved Course Stage 2 structure contains at least one `type: 'assessment'` slot, including nested Module/Chapter placements. It coordinates approved independent Assessment design via this eight-stage flow, preserving the actual UUID, path, selected Questions and separately authorized child PR. If the complete verified Course tree has zero Assessment slots, record Course Stage 7 **Skipped** at a verified source SHA in the **Course PR**, and do **not** create an Assessment PR. There are no Course/Module/Chapter Assessment-required flags or separate opt-outs. This does not skip any stage of an existing Assessment. Course Stages 8–9 handle only Course-owned translations; Stage 10 requires independent Assessment completion and human integrated QA before the Course may pass.

## Stages

1. **Design Assessment — Methodologist + Learning Assessment Architect.** Verify Course-approved purpose, placement, dependencies (including additional Lessons), actual completed upstream Lesson and reviewed bank sources, target Skills, scope, evidence and accessible assessment strategy. Author typed Stage 1 at the canonical Assessment-owned draft path. Do not duplicate upstream methodology or create banks.
2. **Create Assessment content — Learning Assessment Architect, with Screenwriter for supporting content if needed.** Advance the same draft to Stage 2 using existing Quiz/Content Section and Block contracts. Select real imported Question Configurator IDs, specify scoring, feedback, locale and media requirements; no copied Questions or invented IDs.
3. **Independent review — separate qualified Assessment Architect context.** Correct the same source, independently check evidence coverage, selection ownership, scoring, accessibility and actual dependency readiness, record baseline/final SHA and verdict. Final typed direct materializer invocation uses the Stage 2 Zod-inferred contract.
4. **Materialize — Coding Agent, explicit owner authorization.** Use direct Engine materializer, ordinary TS imports, Zod validation at entry, bounded output manifest and trusted atomic Git publication. Generate the modular Configurator, Section/Block files and genuine resource specifications using existing materializers; replace the exact inline Course placeholder with the completed import while preserving UUID/order, consume draft atomically. No PR-prose parsing or alternate YAML. Keep unresolved resource blockers.
5. **Complete resources — Coding Agent / authorized media owner.** Verify assets, Scenes if supported, global assessment UUID resolution, required locales and all actual technical dependencies; retain blockers until genuine completion.
6. **Translation — Technical Translator.** Translate Assessment-owned text and resources only; upstream Question localization stays with its bank owner. Same entity PR.
7. **Independent translation review — separate translator context.** Verify exact source/locale scope and record pinned final verdict in same PR.
8. **QA — human.** Inspect Assessment in its owning Course, including navigation, selected Questions, feedback, grading, accessibility and locales. Record tested revision and explicit human verdict. Never infer QA from CI.

Track stages and revision evidence in the existing Assessment PR. Draft during edits; Ready after the authorized work is complete; merge is separately authorized. Missing upstream dependencies block Assessment authoring, not Course planning or draft preview. The Course's human QA must verify completed Assessment placements as part of integrated experience. No automatic creation of child PRs, bank production or next stage.

The proposed trusted command is `/assessment materialize`; do not claim availability until deployed to default develop and verified by an actual authorized run. Reuse the direct-entrypoint infrastructure being developed in #823; do not create a second execution pipeline.
