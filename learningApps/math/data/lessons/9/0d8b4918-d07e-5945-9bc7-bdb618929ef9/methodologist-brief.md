# From One Part to Several Parts — Methodologist Brief

Date: 2026-10-31
Lesson slug: fromUnitFractionsToSeveralParts
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Extend an established unit fraction into fractions such as 2/4 and 3/4, distinguishing the number of equal parts making one whole (denominator) from the number selected (numerator).

**Why this Lesson now:** Three adjacent canonical Skills form one coherent conceptual move: set the unit-part size, choose a number of those parts, and represent the resulting fraction. They remain independent Skills for later assessment.

## Target audience

**Grade 3, approximately ages 8–9.** Choose this grade independently of the previous Lesson's age: target complexity and prerequisites justify the depth. Learners may have variable reading fluency, numeracy speed, vision, motor control and language proficiency; offer equivalent meaningful visual and nonvisual actions. The Skills themselves remain grade-independent.

## Prerequisites

- Identify equal parts of a fixed whole (`wholeAndEqualParts`).
- Read and model 1/2, 1/3 and 1/4 (`unitFractionModel` and `unitFractionRead`).
- Count to eight and compare small counts using concrete quantities.

No Program completion is required; these are underlying knowledge needs only. Missing prerequisites should trigger scaffold or a separate prior Lesson rather than silently redefining the target Skill.

## Target Skills

- [denominatorMeaning.data.ts](../../../../data/skills/fractions/representation/skills/denominatorMeaning.data.ts)
- [numeratorMeaning.data.ts](../../../../data/skills/fractions/representation/skills/numeratorMeaning.data.ts)
- [nonUnitModel.data.ts](../../../../data/skills/fractions/representation/skills/nonUnitModel.data.ts)

The 3 canonical Skills remain independently assessable even though one conceptual Lesson integrates them.

## Expected learning outcomes

- Explain that, in 3/4, four equal parts compose one whole and three are selected.
- Construct 1/4, 2/4, 3/4 and 4/4 using a single fixed rectangular whole; recognize 4/4 as one complete whole.
- Explain that increasing the numerator while keeping the denominator and whole fixed selects more of the same-sized parts.
- Contrast 2/3 of one whole with 2/4 of the same whole using equal models, without treating 3 or 4 as the count of selected parts.
- Reject 3/4 for a shape with four unequal partitions even if three are shaded.

These are instructional opportunities and observable behaviors; one correct selection or a revealed model is not a validated mastery claim.

## Essential subject matter

- For a chosen whole divided into b equal parts (b is positive), the denominator b describes the number and therefore size of its equal unit parts.
- For a fixed whole and denominator b, the numerator a tells how many of those unit parts are selected. It can be zero; when a=b all b parts are chosen, so a/b=1 in the chosen model.
- One 12-unit strip divided into four equal 3-unit parts: selecting three gives 3/4 and covers 9 of 12 units. Selecting two gives 2/4 and covers 6 of 12 units.
- One 12-unit strip divided into three equal 4-unit parts: selecting two gives 2/3 and covers 8 of 12 units. Changing the bottom number changes the part size even while the top stays 2.
- The requirement that pieces have equal area/length does not disappear when multiple parts are selected.

**Instructional depth:** Grade-3 conceptual emphasis on positive denominators 2–4, numerators from 0 to denominator and one chosen whole. Use unit squares and equal strip partitions, not formulas for fraction operations. This does not cover improper fractions above one, formal equivalence, fraction sums, decimal notation or simplifying. Canonical Skill scope remains grade-independent.

## Conceptual progression and dependencies

Activate the prerequisite representation, elicit a prediction before explanation, expose the mathematical condition using an inspectable model, contrast it with a tempting misconception, then let the learner transfer to a new case with optional hints. This progression specifies what must become clear, not a mandated Section-type pattern. The Screenwriter controls delivery and detailed interactions provisionally; no scoring or automatic progress API is assumed.

## Misconceptions, examples and boundaries

- Top and bottom numbers both mean shaded parts.
- A larger denominator always means a larger piece.
- 3/4 means four selected pieces.
- Three shaded unequal pieces count as 3/4 just because a diagram shows four regions.
- Changing both the whole and the denominator preserves a meaningful visual comparison.

**Hard exclusions and postponed Skills:** Fractions greater than one, reducing and equivalence, fractions on number lines, same-denominator arithmetic and formal symbolic comparison are explicitly deferred.

## Localization, accessibility and offline intent

All runtime text, accessible descriptions, controls, feedback and optional audio must eventually be genuinely translated into every supported locale. No fake translations, placeholder dictionaries, missing locales or unauthorized language fallback. Use proper localized mathematical vocabulary and numeric formatting; preserve math and factual diagram relations while adapting semantic LTR/RTL reading order. Ensure full keyboard/touch, nonvisual, reduced-motion and small-screen equivalent experiences and WCAG 2.2 AA targets. Once delivered, the entire lesson, Scene and feedback must work offline on weak devices; this is an engineering requirement, not a claim of current functionality.

## Sources and factual verification

- [denominatorMeaning.data.ts](../../../../data/skills/fractions/representation/skills/denominatorMeaning.data.ts) — canonical Mathematics Skill with UUID, names and methodological descriptions preserved.
- [numeratorMeaning.data.ts](../../../../data/skills/fractions/representation/skills/numeratorMeaning.data.ts) — canonical Mathematics Skill with UUID, names and methodological descriptions preserved.
- [nonUnitModel.data.ts](../../../../data/skills/fractions/representation/skills/nonUnitModel.data.ts) — canonical Mathematics Skill with UUID, names and methodological descriptions preserved.
- [Lesson architecture](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) for editorial and ownership boundaries.
- The provisional Scene's worked examples provide explicitly stated values and assumptions for mathematical verification; editorial approval remains pending.

## Curriculum / Program compatibility

Standalone and Program-neutral. No national curriculum compatibility is asserted. Grade is an instructional design choice, not taxonomy content.

## Open editorial decisions

- **Editor:** approve Grade 3, prerequisite assumptions, target Skills, depth and misconception treatment.
- **Editor:** review the proposed transfer case and the separate Scene specification; their status is provisional until the Methodologist Brief is approved.
- **Coding Agent / later QA:** review accessibility, localization completeness, offline delivery and Lesson/Scene implementation under their separate workflows; do not infer implementation from this document.

## Methodologist handoff

**Draft only.** No formal Methodologist approval gate has passed. The accompanying Content and Scene documents were prepared provisionally under the batch instruction and require independent Screenwriter/Scene approval before engineering. No runtime lesson data, Questions, Quizzes, assessment engine or score is authorized here.
