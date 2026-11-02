# Which Outcome Is More Likely? — Methodologist Brief

Date: 2026-10-31
Lesson slug: whichOutcomeIsMoreLikely
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Distinguish an event being possible from it being more or less likely, compare chances only under clearly specified spinner conditions and account for whether outcomes are equally likely.

**Why this Lesson now:** The prior lessons established certain/impossible events and complete outcome lists; comparisons of likelihood require inspecting how the possible results are distributed, not just naming them.

## Target audience

**Grade 3, approximately ages 8–9.** Choose this grade independently of the previous Lesson's age: target complexity and prerequisites justify the depth. Learners may have variable reading fluency, numeracy speed, vision, motor control and language proficiency; offer equivalent meaningful visual and nonvisual actions. The Skills themselves remain grade-independent.

## Prerequisites

- Identify certain, impossible and possible events (`certainImpossible`).
- List possible outcomes for a fully specified random experiment (`listOutcomes`).
- Recognize equal-area angular sectors and compare small category counts using concrete models.

No Program completion is required; these are underlying knowledge needs only. Missing prerequisites should trigger scaffold or a separate prior Lesson rather than silently redefining the target Skill.

## Target Skills

- [likelihoodLanguage.data.ts](../../../../data/skills/probability/events/skills/likelihoodLanguage.data.ts)

The single Skill is not a Question format; its defined competency is the target of instruction.

## Expected learning outcomes

- For a fair spinner with five equal sectors, four blue and one yellow, explain why blue is more likely while neither color is certain.
- For a fair spinner with four equal sectors, two blue and two yellow, identify equal chances for the two colors.
- Explain that merely 'possible' does not imply fifty-fifty and that a result not seen in a few spins can still be possible.
- Identify that counting differently sized sectors as if each were equally likely can give a misleading comparison.
- Use a new six-equal-sector spinner (four yellow, two blue) to predict which color is more likely and justify the prediction without computing percentages.

These are instructional opportunities and observable behaviors; one correct selection or a revealed model is not a validated mastery claim.

## Essential subject matter

- Probability describes how likely an event is under a stated experiment. A possible event may be more likely, less likely or equally likely than another possible event.
- Under the explicitly assumed uniform pointer direction, each equal angular sector of a well-designed spinner has equal chance. Five equal sectors with four blue and one yellow therefore make blue more likely.
- Four equal sectors, two blue and two yellow, make the two colors equally likely. Both remain possible; neither is certain.
- A spinner with one half-circle blue region and two quarter-circle yellow regions has blue and yellow each covering half the total angle, despite one blue region and two yellow regions. Counting visible sectors is not sufficient when sector sizes differ.
- The result of a single fair spin cannot be guaranteed based only on which color is more likely. Some realized sequences can omit a possible color, but it remains possible under unchanged rules.

**Instructional depth:** Qualitative comparison of two colored outcomes, a uniformly random spinner with equal angular sectors as the main model (4–6 sections), and one deliberately unequal-sector contrast. Do not calculate probability fractions, percentages or odds, claim certainty from a finite sample, or assume all physical methods are fair.

## Conceptual progression and dependencies

Activate the prerequisite representation, elicit a prediction before explanation, expose the mathematical condition using an inspectable model, contrast it with a tempting misconception, then let the learner transfer to a new case with optional hints. This progression specifies what must become clear, not a mandated Section-type pattern. The Screenwriter controls delivery and detailed interactions provisionally; no scoring or automatic progress API is assumed.

## Misconceptions, examples and boundaries

- Possible means exactly 50% probable.
- The color with the most sectors is always more likely even when sectors have unequal angular sizes.
- More likely means certain, so the less likely color cannot appear.
- A few sample outcomes prove a spinner must favor the color that appeared most.
- Changing the spinner's rules or angle distribution does not affect the chance comparison.

**Hard exclusions and postponed Skills:** Formal probability calculations, probability fractions/percentages, sampling variation over repeated runs, dependent events and biased spin mechanisms belong elsewhere. A physical spinner is only treated as uniform when explicitly stated.

## Localization, accessibility and offline intent

All runtime text, accessible descriptions, controls, feedback and optional audio must eventually be genuinely translated into every supported locale. No fake translations, placeholder dictionaries, missing locales or unauthorized language fallback. Use proper localized mathematical vocabulary and numeric formatting; preserve math and factual diagram relations while adapting semantic LTR/RTL reading order. Ensure full keyboard/touch, nonvisual, reduced-motion and small-screen equivalent experiences and WCAG 2.2 AA targets. Once delivered, the entire lesson, Scene and feedback must work offline on weak devices; this is an engineering requirement, not a claim of current functionality.

## Sources and factual verification

- [likelihoodLanguage.data.ts](../../../../data/skills/probability/events/skills/likelihoodLanguage.data.ts) — canonical Mathematics Skill with UUID, names and methodological descriptions preserved.
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
