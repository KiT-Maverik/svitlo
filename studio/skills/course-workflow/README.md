# Course Workflow

The old separate Curriculum authoring Skill is retired. Course audience, prerequisites, taxonomy mapping, pedagogy, sequencing, localization and review are part of the **one seven-stage Course Flow** and its sole temporary `course.yaml`; never create `*.curriculum.md`, a parallel Course plan or a second curriculum review ledger.

**Single authoritative entry:** [Create Course Flow](./create-course-flow.skill.md). It owns every new Course's editorial production, seven-stage checklist, exact source/review SHAs and next-action handoffs. The Course entity and methodology completeness contract are in [Course](../../docs/entities/course.md); the [Methodologist](../../personas/methodist.persona.md) and [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) provide specialist judgment, not competing source files.

## One source and one production record

During Stages 1–4 the Course has exactly one temporary authoring file:
`content/<book>/data/courses/<last-hex>/<uuid>/course.yaml`, with [Course Flow JSON Schema](./course-flow.schema.json). All Course/Module/Chapter structure, Lesson slots, reviewed methodologies, intended Quiz evidence, prerequisites and target locales live there. The one **Draft Course integration PR** records all seven stage states, the current evidence SHA, reviewer findings and exact next action. Never create a parallel `toc.yaml`, `config.yaml`, Course editorial `methodology.md`, per-stage status YAML or production Issue for this process.

The Stage 5 [Course materializer](../../../shared/engine/scripts/materializeCourseFlow/README.md) consumes the reviewed temporary file **directly** and writes the permanent Course TypeScript modules and Course/Module/Chapter methodology Markdown, plus minimal `lesson.yaml` for genuinely new Lesson slots. New Lesson IDs are allocated deterministically **here**, not during Stage 3, and **no Lesson PR** is opened by materialization. The trusted `/course materialize` operation verifies the generated outputs and deletes the temporary Course YAML in the **same atomic Git commit** as the new source files. An independent [Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md) begins only when the owner separately authorizes a specific Lesson UUID.

## Stages and their owners

| Stage                         | Owner                                                       | Required deliverable                                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Create Course Methodology  | Methodologist                                               | Broad pedagogy, prerequisites, verified Skills, target audience/depth, language/standards intent in `course.yaml`                                      |
| 2. Design Course Structure    | Methodologist                                               | Ordered meaningful Course/Module/Chapter macrostructure, no Lesson slots yet                                                                           |
| 3. Design & Match Lessons     | Methodologist + Assessment Architect                        | Complete Course Lesson-slot methodology; verified reused Lesson IDs or in-place new Lesson specifications, without premature UUIDs or Lesson PRs       |
| 4. Review Course Plan         | Independent Methodologist/Assessment review in another chat | Full Course coverage, sequencing, per-Lesson suitability, assessment ownership and revised-source approval recorded in the parent PR                   |
| 5. Materialize Course         | Coding Agent                                                | Verified generated TypeScript/Markdown and independently authored Lesson YAML shells; one internally verified source-generation-and-deletion operation |
| 6. Translate Course           | Technical Translator                                        | Complete localized **Course-owned** typed source per target locale in an authorized translation campaign                                               |
| 7. Review Course Translations | Independent Technical Translator reviewer                   | Source-pinned semantic/linguistic approval for each required Course locale                                                                             |

The exact acceptance gates, required user-facing seven-stage report, authorization policy, next-action syntax and post-Stage-5 Lesson handoff live only in [Create Course Flow](./create-course-flow.skill.md).

## Stage validation and source creation

Use the read-only stage-aware validator on the one Course YAML:

```sh
node shared/engine/scripts/validateCourseFlow/validate-course-flow.mjs \
  --file content/<book>/data/courses/<bucket>/<uuid>/course.yaml --stage 1
# Later use --stage 2, --stage 3 or --stage 3-complete as appropriate.
```

`3-complete` accepts new Lesson slots with complete inline methodology and **no Lesson UUID**. The reviewer must still inspect the actual educational content: schema validity is not pedagogical approval. Stage 5 invokes the trusted `/course materialize` workflow, which calls `materialize-course-flow.mjs --write` **once** and commits all source creations plus YAML deletion together. The standalone `--check` is an optional diagnostic, never a Stage 5 prerequisite; no `--finalize` exists. Read its [runbook](../../../shared/engine/scripts/materializeCourseFlow/README.md) before acting. Generated TS may be an intentionally incomplete Draft; never fabricate assets, missing Lessons or other-language content to silence expected diagnostics.

## Independent work outside the seven stages

- Real Lesson authoring, Question Banks and Flashcards have their own separate approval and Draft PR workflows. The Course may plan an assessment Lesson which consumes reviewed upstream banks, but the missing bank IDs are production dependencies, not reasons to invent Questions during planning.
- Optional scenario/Episode/Quest authoring and independent scenario review are separate, authorized specialist work. The Course plan is neither blocked by missing narrative nor a substitute for a scenario review. The [Course Flow](./create-course-flow.skill.md#course-specific-experiences-and-build-overrides-outside-the-editorial-stages) defines these boundaries and the permitted current `build.overrides` API.
- Translation and independent linguistic review use [Translation Workflow](../translation-workflow/README.md). Course-owned locale approval does not certify separately authored Lessons.
- Final readiness requires actual complete Lesson references, genuine media/locales, verifiable source and review evidence, and required CI/production checks. Seven completed editorial stages alone are not a release or merge authorization.

There is **no second Course TOC/matching workflow, editor source format, or backward-compatibility contract**. Read the current schema, Engine materializer and code/tests rather than inventing a migration from an old Course protocol.
