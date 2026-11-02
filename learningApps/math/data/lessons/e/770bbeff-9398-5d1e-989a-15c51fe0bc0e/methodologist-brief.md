# One Relationship, Four Ways to Show It — Methodologist Brief

Date: 2026-10-31
Lesson slug: sameMathDifferentModels
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Teach deliberate conversion among concrete objects, a quantified diagram, a verbal description and a numeric expression. Verify that all representations preserve **which amount is initial, what changes, and which amount is sought**, not simply share two numerals.

## Target audience

**Primary audience: Grade 2.** Select conceptual depth and expected independence according to these prerequisites, not a numerical grade ceiling on the canonical Skill. Plan for developing reading fluency, optional teacher/adult mediation, accessible symbols, working-memory scaffolding and multiple response modes. All examples remain legible and comprehensible without sound, exact pointer control or high-speed interaction.

## Prerequisites

- [oneStepModel.data.ts](../../../../data/skills/problemSolving/models/skills/oneStepModel.data.ts): construct a one-operation quantitative representation.
- [readNumericExpressions.data.ts](../../../../data/skills/algebra/expressions/skills/readNumericExpressions.data.ts): read addition/subtraction expressions and the order of operands.
- Recognize parts/whole, count within 20, and describe add/remove situations in simple language.

## Target Skills

- [multipleRepresentations.data.ts](../../../../data/skills/reasoning/representations/skills/multipleRepresentations.data.ts)

## Expected learning outcomes

- Translate an addition story into matching counters, a labeled part–whole diagram, words and a numerical expression.
- Translate a removal diagram or expression back into a faithful verbal scenario, preserving the initial and removed amounts.
- Reject a diagram or story that preserves the same numerals but reverses the relationship (e.g. adds instead of removes).
- Explain a representational choice through one invariant quantity/role relationship rather than visual resemblance.

## Essential subject matter

For ‘There are 8 beads and 3 are added’, equivalent forms are eight counters joined with three incoming counters; a diagram with known part 8 and incoming part 3 with unknown total; ‘eight, then three more’; and 8 + 3 = 11 if evaluated. For ‘There are 12 tokens and 5 are taken away’, a correct diagram begins with 12 and marks 5 as removed, leaving 7; numerical relation 12 − 5 = 7. A picture with eight counters and three _removed_ cannot represent ‘three added’ merely because it features 8 and 3. Diagram bar lengths must follow equal-unit counts or explicit scales; shape/color/layout is not an independent mathematical fact.

## Conceptual progression and dependencies

Begin by preserving counts across two equivalent visual arrangements, connect concrete to a labeled diagram and then to words/symbols, contrast an incorrect reversal with identical numerals, and transfer to an unfamiliar context where the learner authors a verbal or symbolic translation.

## Misconceptions, examples and boundaries

A model with the same two numbers is necessarily equivalent; regrouping colors changes cardinality; the diagram's direction can be read independently of labels; the equation's order can be casually reversed for subtraction. Limit to one-step add/remove quantities within 20; exclude nonlinear scale, multi-step equations, fractions, vague unlabeled diagrams, or claiming all imaginable representational forms have been assessed.

## Localization, accessibility and offline intent

English text is an **editorial source**, not a finished multilingual translation. Before implementation every learner-visible prompt, story, diagram label, mathematical reading, control name, feedback statement and nonvisual alternative needs **genuine, meaning-preserving translation for all current supported locales**, with no silent English fallback. Mathematical operand order, chronological events, and quantitative meaning must remain stable in RTL; adapt layout semantically rather than mirror all graphics. Offer keyboard, touch and switch alternatives to dragging, explicit textual names and values rather than color-only cues, predictable focus, zoom/mobile reflow, reduced motion and equivalent auditory/nonvisual explanations. All lesson-critical resources and feedback should be available after offline download; this is a **target** requiring future implementation checks, not a promise that PWA/Note persistence is implemented.

## Sources and factual verification

- [multipleRepresentations.data.ts](../../../../data/skills/reasoning/representations/skills/multipleRepresentations.data.ts) — directly linked Mathematics canonical Skill data; confirm exact source/UUID and domain-local composition, not a generated Markdown authority.
- [Lesson Editorial Artifacts](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — independent Methodologist and Screenwriter artifacts and approval boundaries.
- [Internationalization and Accessibility](../../../../../../studio/docs/architecture/internationalization-and-accessibility.md) — current inclusive localization design requirements.
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/) — optional international reference for a broad progression, **not** a claim of Curriculum alignment.

## Curriculum / Program compatibility

Not specified. This Lesson is standalone and Program-neutral.

## Open editorial decisions

- This represents conversion _between_ modes rather than a repeat of oneStepModel model construction; the editor must verify that transfer between representations is independently demonstrated.
- The generated Playground taxonomy view is a shared coordinator-owned artifact and may not yet include newly migrated SkillGroups; formal taxonomy approval must be independently confirmed. Do not mistake the presence of a canonical source Code object for a new editorial sign-off.
- Methodologist/editor must explicitly approve this Draft Brief before Content or Scene specifications become formally approved; current parallel drafts are **provisional**.

## Methodologist handoff

**Draft, pending explicit approval.** The Screenwriter's [provisional Content](./content.md) and [proposed Scene](./scenes/representationBridge.scene-spec.md) are independently reviewable, not evidence that the Methodologist gate passed. No runtime Lesson, Question, Quiz, grade, scoring or Note persistence was implemented.
