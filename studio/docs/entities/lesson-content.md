# Lesson Content

**Entity category:** Educational Screenwriter-owned **machine-readable editorial plan** for one independently reusable Lesson.

A Lesson has two distinct editorial sources: `methodology.md` specifies **what, why, for whom** and the required Quiz/Assessment Method policy; `content.yaml` specifies **how to teach it**: ordered Sections, ContentBlocks, learner-facing source-language copy, experience design, required Quiz placements and production dependencies.

## Canonical file and ownership

**Canonical file:** `content/<textbook>/data/lessons/<bucket>/<lesson-uuid>/content.yaml`.

[Create Lesson Content](../../skills/lesson-workflow/create-lesson-content.skill.md) authors this YAML from an approved Methodologist Brief. Its [JSON Schema](../../skills/lesson-workflow/lesson-content.schema.json) checks structural format and known Section/ContentBlock and Assessment Method keys. The Lesson UUID is unchanged and is not inferred from title or slug. Existing `content.md` is a legacy Screenwriter document; it must be explicitly reviewed before editorial migration and should not remain a competing source of truth.

`documentLanguage` is the single **source locale** of the Plan's learner-facing strings. `supportedLanguages` is the planned Lesson locale set, **not a translation completion report**. Plain strings are translatable source text; `{value, invariant: true}` is used only for truly locale-invariant titles. A future generator may scaffold the Lesson directory and source-locale TypeScript from the Plan. It must not fabricate translations, silently widen/narrow declared language coverage or suppress missing-locale TypeScript errors. Translation is a separate subsequent step required before normal production publication. **This YAML-to-TS generator is planned, not implemented by the editorial skill.**

## Section and Quiz contracts

Regular Sections contain ordered ContentBlocks (current discriminant `type`; no old `blockType`). Every block has stable editorial key, type, role, required content or specification, accessibility and readiness. A Screenwriter can propose a new Scene or media dependency but cannot claim that runtime support already exists.

**A Quiz is a Section, never a ContentBlock.** A Lesson may have **no Quiz, one Quiz or several** according to the approved Methodologist `assessmentPlan`. Each Quiz Section references a unique approved `assessmentPlanKey` and repeats the exact target Skill IDs and `requiredAssessmentMethods` from that requirement. `AssessmentMethodKey` expresses a cognitive operation, not the UI Question type. The Assessment Architect owns Question correctness, distractors, grading and mastery; the Screenwriter places the Quiz and explains its teaching context.

`content.yaml` is not directly serialized as a runtime `Lesson<'data'>` or `Lesson<'response'>`. The Coding Agent and a future generator transform the editorial specification using the actual Engine creators and maintain the current resource layouts. [Lesson](./lesson.md), [Section](./section.md) and [Lesson editorial artifacts](../architecture/lesson-editorial-document.md) establish boundaries and review policy.
