# Course Workflow

**Canonical production procedure:** [Create Course Flow](./create-course-flow.skill.md). Course production has **seven stages, one entity-owned Course PR and one evolving TypeScript Course planning object**. This replaces the old temporary `course.yaml` editorial source; it does not create a second plan, `toc.yaml`, `config.yaml`, review PR, production Issue, stage-status file or artifact ledger. The [Course entity](../../docs/entities/course.md), [Methodologist](../../personas/methodist.persona.md) and [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) supply the domain requirements.

## One typed source and one production record

- **Stages 1–3:** keep one Course source object at its canonical UUID-addressed Course location, refining the same `config` and `production` tree. Import `CourseWorkflowStage1`, `CourseWorkflowStage2` and `CourseWorkflowStage3` from `@svitlo/engine/build` and use the relevant `satisfies` operator. The [Engine type contract](../../../shared/engine/types/workflow/courseWorkflow.types.ts) defines the actual structure; its [typecheck fixtures](../../../shared/engine/types/workflow/courseWorkflow.typecheck.ts) show working positive/negative type examples.
- **Stage 4:** a separate-context Methodologist/Assessment Architect reviews the *actual Stage 3 TS source* at an exact SHA, commits any in-scope corrections immediately to the **same Course PR**, verifies the corrected final source and records a single final SHA/verdict. There is no Stage 4 TypeScript data contract or second independent methodological review.
- **PR:** the existing Course PR description owns all seven stage checkboxes and revision-pinned review/handoff evidence. Git holds the authored source. Draft is the active-editing state; **Ready for review is the automatic handoff after authorized work is complete**, not a merge authorization. Follow [CI lifecycle](../../rules/ci-workflow.md).
- **Stage 5:** requires specific authorization and a **verified, implemented typed** Course materializer. The legacy `materializeCourseFlow` command still reads `course.yaml`; do not give it TS and do not claim the new materializer works until its implementation and trusted CI path from integration [#775](https://github.com/KiT-Maverik/svitlo/pull/775) are integrated and tested. New Lesson UUIDs/handoffs belong to Stage 5, never Stage 3. It does **not** start Lesson Production.
- **Stages 6–7:** authorized Course-owned translations and independent linguistic review occur in the **same entity PR** and do not certify independently authored Lessons. Follow [Translation Workflow](../translation-workflow/README.md).

## Seven stages

| Stage | Responsible role | Acceptance boundary |
| --- | --- | --- |
| 1. Create Course Methodology | Methodologist | Complete `CourseWorkflowStage1`: identity, pedagogy, verified target/prerequisite scope, evidence, `production.languages`, accessibility and standards |
| 2. Design Course Structure | Methodologist | `CourseWorkflowStage2`: ordered permitted hierarchy, substantive Module/Chapter editorial intent, verified Skill-only Lesson slots, Episode focus/purpose |
| 3. Design & Match Lessons | Methodologist + Assessment Architect | `CourseWorkflowStage3`: every Lesson slot resolved to `new` with full methodology or `existing` with verified source, reuse/override and assessment ownership |
| 4. Review Course Plan | Independent Methodologist + Assessment Architect | Final corrected Stage 3 source reviewed in a separate context, findings/edits and source SHA recorded once in the Course PR |
| 5. Materialize Course | Coding Agent | Verified typed source materialization with new Lesson identity handoff, not editorial sign-off or Lesson PR |
| 6. Translate Course | Technical Translator | Authored Course-local target locale fields, checked against actual language support |
| 7. Review Course Translations | Independent Technical Translator | Source-SHA-pinned semantic/linguistic approval for each required Course locale |

## Migration boundary

The previous Course YAML JSON Schema, `validateCourseFlow`, `materializeCourseFlow`, old Course-specific Engine YAML schemas and protected `/course materialize` Action **must not be deleted merely because TypeScript Stage 1–3 types exist**. Identify their actual callers and only retire a legacy Course pipeline once the equivalent typed Stage 5 and trusted authorization path are proven functional. Other Lesson, Questions, Flashcards, Episode and shared YAML schema consumers remain separately owned. The current PR's **Legacy mechanism audit** tracks removal candidates; this README is not another migration tracker.

For detailed methodology, partial/final acceptance, assessment-only Lesson dependencies, PR tracker format and Stage 5–7 handoffs, consult only [Create Course Flow](./create-course-flow.skill.md).