# Lesson Content

**Entity category:** historical Screenwriter-owned editorial plan for a Lesson. **Not a new-work source:** [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md) now uses a single temporary `lesson.yaml` with nested `config` and `production` through Stages 1–5; the old `content.yaml` and its hand-maintained schema are retained only for an audited, non-destructive legacy migration. Do not generate new `content.yaml` or represent it as a current canonical authoring requirement.

## Historical editorial format (migration reference only)

Earlier Lessons used two independent documents: a Methodologist `methodology.md` for educational intent and Screenwriter `content.yaml` for Section/ContentBlock plans, source locale, assessment placement and media handoffs. This is **not** a current new-work protocol or a second canonical source.

Historical path: `content/<textbook>/data/lessons/<last-uuid-hex>/<lesson-uuid>/content.yaml`. Preserve original documents and SHA-linked independent reviews when migrating into the single, nested `lesson.yaml` `config` + `production`; never silently truncate approved prose, fabricate translations, or assume a legacy `status: approved` marker equals today's independent review.

For **new** Lesson authoring, [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md) owns Stages 1–5 on `lesson.yaml`. Methodologist `production.methodology` defines outcomes/subject/assessment obligations, Screenwriter authors actual ordered Section and ContentBlock `config` plus `production` specifications, and independent reviewers record decisions in the **Lesson Draft PR**. [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md) checks completed technical schema and safely materializes source at Stage 6. `questions.yaml` and `flashcards.yaml` are separate Engine-shaped banks and not part of Lesson Config.

**Legacy schema note:** [lesson-content.schema.json](../../skills/lesson-workflow/lesson-content.schema.json) is retained solely to interpret older `content.yaml` data, never as a second current authoring schema. Engine-derived `lesson.scaffold.schema.json` and its real current Zod Config contract govern new structural source.

## Section and Quiz contracts

Regular Sections contain ordered ContentBlocks (current discriminant `type`; no old `blockType`). Markdown ContentBlocks support inline and display LaTeX; see [Markdown formulas](./markdown-content-block.md) for accessibility, syntax and translation guidance. Every block has stable editorial key, type, role, required content or specification, accessibility and readiness. A Screenwriter can propose a new Scene or media dependency but cannot claim that runtime support already exists.

**A Quiz is a Section, never a ContentBlock.** A Lesson may have **no Quiz, one Quiz or several** according to the approved Methodologist `assessmentPlan`. Each Quiz Section references a unique approved `assessmentPlanKey` and repeats the exact target Skill IDs and `requiredAssessmentMethods` from that requirement. `AssessmentMethodKey` expresses a cognitive operation, not the UI Question type. The Assessment Architect owns Question correctness, distractors, grading and mastery; the Screenwriter places the Quiz and explains its teaching context.

`content.yaml` is not a runtime Lesson Props object or a direct `defineLesson` Config. The Engine YAML → TypeScript draft scaffolder mechanically emits unfinished `define*` code **from the separate Config-shaped projection**, without editorial validation, TypeScript completeness guarantees or publishing. [Implement Scene](../../skills/lesson-workflow/implement-scene.skill.md) handles only approved Scene React behavior, tests, integration and source-locale text; translation agents complete other languages. [Lesson](./lesson.md), [Section](./section.md) and [Lesson editorial artifacts](../architecture/lesson-editorial-document.md) establish boundaries and review policy.

## Quest editorial blueprint

[Quest](./quest.md) is a planned Section presentation option for autonomous interactive workspaces with branching Stage media and Task Scenes. When proposing a Quest, describe the start Stage, initial Task, every branch/reaction, pedagogical intent, feedback, Task Scene behavior, mandatory media alternatives, captions/transcripts, nonvisual interaction, reduced-motion and offline prerequisites. It is not a scored Quiz, nor an Episode-level storyline introduced into a standalone Lesson. The editorial plan schema can express a Quest proposal, but **the Engine Config-to-YAML runtime pipeline and UI are not wired yet**; classify production as pending platform capability.
