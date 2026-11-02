# Plan Two Steps Before You Calculate — Methodologist Brief

Date: 2026-10-31
Lesson slug: planTwoStepSolution
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Build a dependency-aware plan for a word problem requiring an intermediate unknown before the final answer. Contrast two-step structures: combine then subtract, and compare then combine, to prevent rote memorization of a single operation sequence.

## Target audience

**Primary audience: Grade 3.** Select conceptual depth and expected independence according to these prerequisites, not a numerical grade ceiling on the canonical Skill. Plan for developing reading fluency, optional teacher/adult mediation, accessible symbols, working-memory scaffolding and multiple response modes. All examples remain legible and comprehensible without sound, exact pointer control or high-speed interaction.

## Prerequisites

- [identifyKnownUnknown.data.ts](../../../../data/skills/problemSolving/conditions/skills/identifyKnownUnknown.data.ts): separate supplied quantities and the asked-for result.
- [oneStepModel.data.ts](../../../../data/skills/problemSolving/models/skills/oneStepModel.data.ts): represent a one-step relation with a named unknown.
- [chooseOperationAddSub.data.ts](../../../../data/skills/problemSolving/models/skills/chooseOperationAddSub.data.ts): select addition/subtraction from roles rather than keywords.
- Compute additions/subtractions within 100, understand ‘fewer than’ additive comparison and units.

## Target Skills

- [twoStepPlan.data.ts](../../../../data/skills/problemSolving/planning/skills/twoStepPlan.data.ts)

## Expected learning outcomes

- Identify an intermediate question that must be answered before the final question can be resolved.
- Sequence two justified operations while preserving the meaning and units of the intermediate result.
- Explain why a proposed single-operation answer does not address the actual final question.
- Independently plan (and optionally carry out) a comparison-then-combine task without a prebuilt operation sequence; recognize a valid alternative strategy when it preserves all relationships.

## Essential subject matter

For ‘A shelf has 8 red books and 7 blue books; 6 books are borrowed; how many remain?’, first find 8+7=15 books (original total), then 15−6=9 books (remain). The first answer is an **intermediate**, not the final result. A second structure: ‘Ava has 12 stickers; Sam has 3 fewer than Ava; how many have they together?’ first Sam=12−3=9 stickers; then 12+9=21 stickers. A child who only calculates 12−3 answers Sam's amount, not the _combined_ question. Other mathematically valid strategies may exist, so never assert an arbitrary sequence of arithmetic symbols is the unique legitimate plan; dependency and units are central.

## Conceptual progression and dependencies

Begin with a visibly missing intermediate total and explicit plan cards, execute and name the intermediate, contrast a different dependency graph using ‘fewer than’, then transfer to a new comparison-then-combine context with no supplied plan. Ask the learner to justify what the intermediate answers in words.

## Misconceptions, examples and boundaries

The first result is always the final answer; automatically add every numeral, choose steps by word order alone, misuse ‘fewer than’ as 12+3, omit the known person's amount in final total, or assert a valid alternative ordering is always wrong. Restrict to two essential steps and nonnegative counts within 100. No 3-step/variable/rate/ratio planning or grading outcomes.

## Localization, accessibility and offline intent

English text is an **editorial source**, not a finished multilingual translation. Before implementation every learner-visible prompt, story, diagram label, mathematical reading, control name, feedback statement and nonvisual alternative needs **genuine, meaning-preserving translation for all current supported locales**, with no silent English fallback. Mathematical operand order, chronological events, and quantitative meaning must remain stable in RTL; adapt layout semantically rather than mirror all graphics. Offer keyboard, touch and switch alternatives to dragging, explicit textual names and values rather than color-only cues, predictable focus, zoom/mobile reflow, reduced motion and equivalent auditory/nonvisual explanations. All lesson-critical resources and feedback should be available after offline download; this is a **target** requiring future implementation checks, not a promise that PWA/Note persistence is implemented.

## Sources and factual verification

- [twoStepPlan.data.ts](../../../../data/skills/problemSolving/planning/skills/twoStepPlan.data.ts) — directly linked Mathematics canonical Skill data; confirm exact source/UUID and domain-local composition, not a generated Markdown authority.
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — independent Methodologist and Screenwriter artifacts and approval boundaries.
- [Internationalization and Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) — current inclusive localization design requirements.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/) — optional international reference for a broad progression, **not** a claim of Curriculum alignment.

## Curriculum / Program compatibility

Not specified. This Lesson is standalone and Program-neutral.

## Open editorial decisions

- Editor to confirm Grade 3 use of additive comparison as a prerequisite and accept that the proposed intermediate-first strategy is scaffolded but not mathematically unique.
- The generated Playground taxonomy view is a shared coordinator-owned artifact and may not yet include newly migrated SkillGroups; formal taxonomy approval must be independently confirmed. Do not mistake the presence of a canonical source Code object for a new editorial sign-off.
- Methodologist/editor must explicitly approve this Draft Brief before Content or Scene specifications become formally approved; current parallel drafts are **provisional**.

## Methodologist handoff

**Draft, pending explicit approval.** The Screenwriter's [provisional Content](./content.md) and [proposed Scene](./scenes/twoStepPlanner.scene-spec.md) are independently reviewable, not evidence that the Methodologist gate passed. No runtime Lesson, Question, Quiz, grade, scoring or Note persistence was implemented.
