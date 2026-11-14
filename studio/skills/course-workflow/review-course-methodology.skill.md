# Review Course Methodology and Configuration

**Role:** Course Methodologist, using [Methodologist Persona](../../personas/methodist.persona.md). Read the [Course entity](../../docs/entities/course.md), [Course TOC](./create-course-toc.skill.md), [Lesson matching](./match-course-toc-lessons.skill.md), [Course Overrides](./course-overrides.md) and its [schema](../../../shared/engine/yaml-schemas/courseOverrides.schema.json), relevant Lesson/Section contracts, current Engine `build.overrides(patch, { languages })` API and applicable `AGENTS.md` before acting.

## Purpose and timing

This is the **Course-wide pedagogical and configuration review** performed **after** relevant Lessons have been matched and actually authored, and after Course screenwriting when there is a scenario layer. It is the **mandatory pedagogical review gate before treating Course configuration as approved for final implementation/publication**. It is independent from the optional [Scenario Review](./review-course-scenario.skill.md) in its criteria and verdict. Do not run it as a substitute for Course Methodology, Course TOC, Lesson Matching, Lesson Production, Lesson-specific QA or the actual deterministic Builder.

The Course Methodologist can **author or revise methodological Lesson overrides in this review stage when justified**; a separate mandatory `Create Course Overrides` skill is not required. The reviewer does not self-approve these modifications.

## Canonical inputs

For the specified Course UUID, read the entire current:

- Approved `methodology.md`, `toc.yaml`, verified Skill taxonomy and each selected Lesson slot's `lessonId`, required outcomes and selection rationale.
- Actual standalone `Lesson<'data'>` configuration and needed Section/ContentBlock data for every scoped Lesson; verify stable IDs/slugs, supported languages, `requireQuiz`, navigation/skipping settings, Section order and approved assessment intent. Editorial-only Lesson drafts are **not** sufficient to generate final concrete overrides.
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

When an authorized pedagogical correction is needed, **create or modify the same Course-owned `overrides.yaml`** described in [Course Overrides](./course-overrides.md). Do not put executable overrides into `toc.yaml`, `methodology.md`, the standalone Lesson folder or a second competing YAML file.

- Add only supported schema operations: `params` (the `sections` navigation/skipping/index settings), `title`, `events`, `section-set/remove/order`, `block-set/remove/order`. A `params` override **cannot change `requireQuiz` or `languages`**.
- Reuse `slotKey`, `lessonId`, existing slugs and approved Course-owned TS source refs. Never invent Section/ContentBlock code, Question catalogs, translations, or a new story to make a patch possible.
- **Merge editorial intent, not just YAML text:** preserve previously authorized sparse Build patches, applicable Section order and dependencies. Different authors may contribute to **one** overrides file; reconcile conflicts explicitly with the relevant content owner/editor, never silently replace the other author's changes.
- Keep new or changed operations at `status: draft` until **independent authorized editorial approval**. Record operation-by-operation provenance, educational rationale, relevant previous approval and changed source revision in the review report or linked PR; the current YAML schema does not include `author` or `rationale` properties.
- Validate the YAML against `course-overrides.schema.json` and the current source/creator constraints. A review `pass` or green CI is not independent editorial sign-off. Never mark `status: approved` merely because the reviewer wrote the changes.
- If no override is necessary, do not manufacture an `overrides.yaml`. An existing approved override must still be reviewed for pedagogical compatibility.

## Output and sign-off

Create/update `methodology-review.md` **in the Course folder** (distinct from a Lesson's `methodology-review.md`) and include:

- Course UUID, reviewer, date, exact Git blob/commit SHAs for Methodology, TOC, actual Lesson Data, relevant scenario sources and the current sparse overrides source (or its explicit absence).
- Verdict `pass | changes-requested | blocked`, Course-wide Skill/outcome coverage, sequence/prerequisite/assessment findings and **per-slot parameter audit**.
- For each recommended or edited override: `slotKey`, `lessonId`, Build patch path/slug, previous → proposed behavior, pedagogical rationale, expected learner impact, any scenario implications, owning author, approval status and precise re-review requirements.
- Issues by severity, affected source revision and accountable owner; separately record Course language and implementation blockers.
- Editorial sign-off links for the current source revisions. The review verdict is not self-approval, and a change to the inspected configuration requires a source-specific follow-up check.

**Gate:** Before treating a Course as finished or publishable, require authorized approval of current Course Methodology/TOC, necessary Course-owned scenario/content sources, `overrides.yaml` if present and this methodological review; where applicable, require Scenario Review too. This is a **Studio process rule**, not a validation performed by the generic YAML → TypeScript draft scaffolder. Producing an intermediate draft does not bypass approval; final integration/publication remains blocked until sign-off. See [YAML Config handoff](../../docs/architecture/yaml-config-scaffolding.md).

Use a Draft PR, preserve other specialists' ownership, and do not mark a Course ready on the basis of a self-authored review recommendation.
