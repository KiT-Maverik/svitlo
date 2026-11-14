# Lesson Content

**Entity category:** Educational Screenwriter-owned **machine-readable editorial plan** for one independently reusable Lesson.

A Lesson has two distinct editorial sources: `methodology.md` specifies **what, why, for whom** and the required Quiz/Assessment Method policy; `content.yaml` specifies **how to teach it**: ordered Sections, ContentBlocks, learner-facing source-language copy, experience design, required Quiz placements and production dependencies.

## Canonical file and ownership

**Canonical file:** `content/<textbook>/data/lessons/<bucket>/<lesson-uuid>/content.yaml`.

[Create Lesson Content](../../skills/lesson-workflow/create-lesson-content.skill.md) authors this YAML from an approved Methodologist Brief. Its [JSON Schema](../../skills/lesson-workflow/lesson-content.schema.json) checks structural format and known Section/ContentBlock and Assessment Method keys. The Lesson UUID is unchanged and is not inferred from title or slug. Existing `content.md` is a legacy Screenwriter document; it must be explicitly reviewed before editorial migration and should not remain a competing source of truth.

`documentLanguage` is the single **source locale** of the Plan's learner-facing strings. `supportedLanguages` is the planned Lesson locale set, **not a translation completion report**. Plain strings are translatable source text; `{value, invariant: true}` is used only for truly locale-invariant titles. An authorized technical handoff **separately** projects the approved editorial plan into Config-shaped YAML: nested `type` discriminators, stable IDs/slugs, `items/order` for Section and block collections, and source-locale-only `locale` fields. The generic TypeScript scaffolder operates on that Config-shaped input, **not directly on this editorial schema**, and does not fabricate translations or validate approvals. Missing locales, compilation and publication are independent later gates; see the [Engine YAML handoff](../architecture/yaml-config-scaffolding.md).

## Section and Quiz contracts

Regular Sections contain ordered ContentBlocks (current discriminant `type`; no old `blockType`). Every block has stable editorial key, type, role, required content or specification, accessibility and readiness. A Screenwriter can propose a new Scene or media dependency but cannot claim that runtime support already exists.

**A Quiz is a Section, never a ContentBlock.** A Lesson may have **no Quiz, one Quiz or several** according to the approved Methodologist `assessmentPlan`. Each Quiz Section references a unique approved `assessmentPlanKey` and repeats the exact target Skill IDs and `requiredAssessmentMethods` from that requirement. `AssessmentMethodKey` expresses a cognitive operation, not the UI Question type. The Assessment Architect owns Question correctness, distractors, grading and mastery; the Screenwriter places the Quiz and explains its teaching context.

`content.yaml` is not a runtime Lesson Props object or a direct `defineLesson` Config. The Engine YAML → TypeScript draft scaffolder mechanically emits unfinished `define*` code **from the separate Config-shaped projection**, without editorial validation, TypeScript completeness guarantees or publishing. [Implement Scene](../../skills/lesson-workflow/implement-scene.skill.md) handles only approved Scene React behavior, tests, integration and source-locale text; translation agents complete other languages. [Lesson](./lesson.md), [Section](./section.md) and [Lesson editorial artifacts](../architecture/lesson-editorial-document.md) establish boundaries and review policy.


## Quest editorial blueprint

[Quest](./quest.md) is a planned Section presentation option for autonomous interactive workspaces with branching Stage media and Task Scenes. When proposing a Quest, describe the start Stage, initial Task, every branch/reaction, pedagogical intent, feedback, Task Scene behavior, mandatory media alternatives, captions/transcripts, nonvisual interaction, reduced-motion and offline prerequisites. It is not a scored Quiz, nor an Episode-level storyline introduced into a standalone Lesson. The editorial plan schema can express a Quest proposal, but **the Engine Config-to-YAML runtime pipeline and UI are not wired yet**; classify production as pending platform capability.
