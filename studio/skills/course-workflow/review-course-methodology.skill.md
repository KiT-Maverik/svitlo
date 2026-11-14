# Review Course Methodology and Configuration

**Role:** Course Methodologist, using [Methodologist Persona](../../personas/methodist.persona.md). Read the [Course entity](../../docs/entities/course.md), [Course TOC](./create-course-toc.skill.md), [Lesson matching](./match-course-toc-lessons.skill.md), [Course Overrides](./course-overrides.md) and its [schema](../../../shared/engine/yaml-schemas/courseOverrides.schema.json), relevant Lesson/Section contracts, current Engine `build.overrides(patch, { languages })` API and applicable `AGENTS.md` before acting.

## Purpose and timing

This is the **Course-wide pedagogical and configuration review** performed **after** relevant Lessons have been matched and actually authored, and after Course screenwriting when there is a scenario layer. It is the **mandatory pedagogical review gate before treating Course configuration as approved for final implementation/publication**. It is independent from the optional [Scenario Review](./review-course-scenario.skill.md) in its criteria and verdict. Do not run it as a substitute for Course Methodology, Course TOC, Lesson Matching, Lesson Production, Lesson-specific QA or the actual deterministic Builder.

The Course Methodologist can **author or revise methodological Lesson overrides in this review stage when justified**; a separate mandatory `Create Course Overrides` skill is not required. The reviewer does not self-approve these modifications.

## Canonical inputs

For the specified Course UUID, read the entire current:

- Approved `methodology.md`, `toc.yaml`, verified Skill taxonomy and each selected Lesson slot's `lessonId`, required outcomes and selection rationale.
- Actual standalone `defineLesson` Build configuration and needed Section/ContentBlock data for every scoped Lesson; verify stable IDs/slugs, supported languages, `requireQuiz`, navigation/skipping settings, Section order and approved assessment intent. Editorial-only Lesson drafts are **not** sufficient to generate final concrete overrides.
- Current root `config.yaml.overrides` sparse Build patch (or separately stored current-format `overrides.yaml` for historical input), its approvals and linked source paths for Course-owned Sections/blocks, titles, events and patches. Legacy ordered editorial operations are unsupported; do not translate or resurrect them.
- Approved scenario/episode materials if present, with the Scenario Review result and current revision-specific sign-off, or documented reason why the Course has no scenario layer.
- Course production limitations and the Engine Config-shaped YAML handoff; the generic draft scaffolder checks **neither** approval status nor editorial review reports.

## Methodological audit

1. Check actual Course coverage, competency prerequisites, depth, repetition, pacing and progression against verified Skill dependencies and approved outcomes; identify unaddressed gaps and misleading Lesson reuse.
2. For **every matched Lesson slot**, inspect the existing Lesson configuration in the **Course context**, rather than assuming its standalone defaults are optimal. Explicitly assess `allowNavigation`, `allowSkipping`, `showIndexes`, Section-level `skippable`, Section/ContentBlock ordering and relevant events/metadata. Keep existing values when no justified change is needed.
3. Review Quiz requirements, assessment integrity and access to prerequisite instruction. Do not use a Course override to invent Question content, bypass assessment approval, redefine the standalone Lesson's `requireQuiz` or change its supported languages. For every proposed Quest, distinguish **guided practice and formative feedback** from evidence that a required Quiz measures; verify that it neither replaces/short-circuits approved assessment nor asserts unmeasured mastery. Course-owned Episode Quests are not automatically scored Quizzes.
4. Determine whether a sparse Course-local override materially improves learning; minimize restrictions on navigation, pacing and learner choice. Record the **educational rationale and specific slot/Section/block** for every change. A blanket ban on skipping is not evidence of learning quality.
5. Check whether scenario alterations preserve methodological integrity; a narrative preference must not silently remove approved competencies, assessment or accessibility. Return conflicts to the scenario author/editor. A substantive methodological change to scenario content triggers affected Scenario Review again.
6. Check that every affected Lesson actually exists, Course languages are a subset of its languages, slug paths resolve, and Course-owned additions/replacements have their separate approvals. Reject different overrides for duplicate uses of the same Lesson ID until the publisher's `OVERRIDE_REUSED_LESSON` limitation is resolved.

## Authoring methodological overrides

When an authorized pedagogical correction is needed, update **one current-format Course Build patch**, without creating a second competing source. For the new technical authoring flow, this is the root `overrides` key of the Course's `config.yaml`; for an existing legacy source it may be a separate `overrides.yaml` containing the **same** current stateless patch. Consult [Course Overrides](./course-overrides.md) and the [Engine-derived Course Overrides JSON Schema](../../../shared/engine/yaml-schemas/courseOverrides.schema.json).

- Use only the supported `course.build.overrides(patch, { languages })` shape: root `params`, `locale`, `content`, and valid nested Build API patches for Course/Module/Chapter/Episode/Lesson/Section children. The collection contract is `items`, `additionalItems` and `order` wherever the actual child configurator supports them. A new Quest Section is a Config node within an appropriate Lesson/Episode `section.additionalItems`; **inside the Quest**, `stages` and `tasks` are named maps with `start`, not ordered collections. Quest runtime support remains a separate dependency.
- **Do not use retired editorial operations** such as `section-set`, `section-remove`, `block-set`, `block-order`, `schemaVersion`, `operations`, or `createLessonOverrides`. Do not infer an unimplemented Build API patch shape from legacy documentation. Check the current configurator before authoring a nested patch.
- A Course patch cannot change a referenced Lesson's supported `languages`, bypass an approved `requireQuiz`, fabricate Questions or use a Quest as a substitute for Quiz evidence. Reuse verified slot keys, Lesson IDs and Section/ContentBlock slugs.
- Preserve approved scenario and methodological changes in the **same** patch; reconcile disagreements with the original specialist/editor rather than overwriting another role's decisions. Never edit the reusable standalone Lesson source.
- Keep the **editorial review decision** and per-change rationale in `methodology-review.md` or the linked PR, **not** as unsupported `author`, `status`, `rationale` or operations fields inside the Build patch. Changes remain Draft until independently approved.
- Review the patch against the current [Engine JSON Schema](../../../shared/engine/yaml-schemas/courseOverrides.schema.json), the actual author-owned Configurator APIs and the referenced Lesson/Section source. The YAML → TS scaffolder is draft-only and does not assert valid runtime overrides, typechecking or publication.
- If no patch is required, do not manufacture one. Reevaluate any existing approved patch for pedagogical compatibility, document its exact source revision, and preserve it unchanged unless an authorized change is necessary.

## Output and sign-off

Create/update `methodology-review.md` **in the Course folder** (distinct from a Lesson's `methodology-review.md`) and include:

- Course UUID, reviewer, date, exact Git blob/commit SHAs for Methodology, TOC, actual Lesson Data, relevant scenario sources and the current sparse overrides source (or its explicit absence).
- Verdict `pass | changes-requested | blocked`, Course-wide Skill/outcome coverage, sequence/prerequisite/assessment findings and **per-slot parameter audit**.
- For each recommended or edited override: `slotKey`, `lessonId`, Build patch path/slug, previous → proposed behavior, pedagogical rationale, expected learner impact, any scenario implications, owning author, approval status and precise re-review requirements.
- Issues by severity, affected source revision and accountable owner; separately record Course language and implementation blockers.
- Editorial sign-off links for the current source revisions. The review verdict is not self-approval, and a change to the inspected configuration requires a source-specific follow-up check.

**Gate:** Before treating a Course as finished or publishable, require authorized approval of current Course Methodology/TOC, necessary Course-owned scenario/content sources, the canonical current-format Course overrides source (when present) and this methodological review; where applicable, require Scenario Review too. This is a **Studio process rule**, not a validation performed by the generic YAML → TypeScript draft scaffolder. Producing an intermediate draft does not bypass approval; final integration/publication remains blocked until sign-off. See [YAML Config handoff](../../docs/architecture/yaml-config-scaffolding.md).

Use a Draft PR, preserve other specialists' ownership, and do not mark a Course ready on the basis of a self-authored review recommendation.
