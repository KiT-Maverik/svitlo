# Same Spinner, Different Results — Methodologist Brief

Date: 2026-10-31
Lesson slug: randomExperimentsVary
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Compare outcome frequencies from two finite runs of the same fair random experiment and explain why differing counts can arise without any change to the experiment's possible outcomes, conditions or chances.

**Pedagogical rationale and placement:** Having identified possible outcomes and compared chances, learners can now distinguish the _fixed rule_ of a fair experiment from the _variable tally_ observed in finite repeated runs. This is the domain's final canonical Skill; the depth is Grade 3 without numeric probability calculations.

The single canonical target Skill is a competency, not an interaction format or an assessed mastery state.

## Target audience

**Primary grade: Grade 3; ages approximately 8–9.** This depth follows the stated prerequisites, not an arbitrary one-Skill-per-Grade or one-Lesson-per-Skill mapping. Design for emerging literacy, mixed language proficiency, variable math fluency and accessibility needs. Use short concrete learner-facing copy, clear audible/textual alternatives and non-motor-precision inputs. The canonical Skills have no Grade ceiling.

## Prerequisites

- Distinguish certain, impossible and possible outcomes of a fully specified experiment.
- List the distinct result colors and understand that equal-size sectors under a fair spinner assumption give equal likelihood.
- Count category frequencies up to ten and reconcile the number of observations per trial run.

Previously transferred, pedagogically adjacent Skills: `certainImpossible`, `listOutcomes`, `likelihoodLanguage`. The Lesson itself must remain standalone and Program-neutral; a learner with the equivalent knowledge need not complete any named preceding Lesson.

## Target Skills

- [experimentVariation.data.ts](../../../../data/skills/probability/experiments/skills/experimentVariation.data.ts)

## Expected learning outcomes

- Describe the unchanged conditions of a uniformly random, two-equal-sector spinner labelled blue and yellow.
- Compare one ten-spin run with blue 7/yellow 3 and a second with blue 4/yellow 6; check that each has exactly ten spins.
- Explain that the runs have different observed frequencies even though both used the same fair spinner and equal-chance rule.
- Identify that neither small run proves the spinner became unfair or that the next color is guaranteed.
- Distinguish sampling variation from a deliberate change to an unequal spinner (three equal blue sectors and one yellow sector), which changes the experiment's chances.

These observable outcomes state what the Lesson intends to teach and invite learners to demonstrate. Neither a single correct choice nor completion of a Section guarantees validated mastery of an individual Skill.

## Essential subject matter

- An experiment is defined by conditions and rules: here a spinner with two equal-size sectors, one blue and one yellow, and an assumed uniform pointer direction. Each spin yields exactly one color.
- A run of ten spins produces one frequency for blue and one for yellow; those observed counts add to ten but need not equal five and five in a particular run.
- Two illustrative, mathematically possible runs under the same fixed conditions are Run A: seven blue and three yellow; Run B: four blue and six yellow. They differ without requiring a rule change.
- Observed relative frequency in a small sample is not identical to the experiment's underlying chance; run-to-run sampling variation is natural and does not imply that the previous outcomes caused the next outcome.
- If the spinner changes to four equal sections with three blue and one yellow, or the pointer distribution changes, the experimental conditions/chances have changed. Differences then cannot be attributed to identical-condition sampling variation alone.

**Depth selected for this audience:** Two explicit ten-trial sequences of a fixed two-equal-sector uniformly random spinner, per-color frequency comparisons, and one changed-conditions counterexample. Count outcomes, identify constant/changing factors and compare two runs; do not introduce numeric probability estimates, significance testing, independence theorems, law of large numbers, hypothesis testing, percentages or claims about statistical bias from tiny samples.

## Conceptual progression and dependencies

Build on the listed prerequisites, expose the _reference_ (whole size, hour and minute scale, pictograph key, or random-experiment conditions) before asking the learner to reason. Move from a familiar case to an interactive contrast that makes a common misconception visible, then apply the correct rule in an independent fresh example. The Screenwriter chooses presentation, interactions and number of Sections; the Methodologist owns content limits and accuracy. Supporting representations teach a Skill; they do not create additional Skill IDs.

## Misconceptions, examples and boundaries

- An exactly fair two-color spinner must produce five and five in every set of ten spins.
- An outcome appearing seven times must be more likely on the _next_ spin under unchanged independent fair conditions.
- Different observed counts prove that somebody changed the spinner.
- A spinner redesigned with three blue sectors and one yellow sector is exactly the same random experiment as before.
- A recorded example sequence is a guaranteed future prediction rather than one possible result.

**Explicit exclusions:** Two explicit ten-trial sequences of a fixed two-equal-sector uniformly random spinner, per-color frequency comparisons, and one changed-conditions counterexample. Count outcomes, identify constant/changing factors and compare two runs; do not introduce numeric probability estimates, significance testing, independence theorems, law of large numbers, hypothesis testing, percentages or claims about statistical bias from tiny samples. Do not implicitly extend the canonical Skill description, invent new taxonomy entities or treat any exercise format as a separately approved Skill.

## Localization, accessibility and offline intent

Complete authentic translation of all learner-facing text, mathematical terminology, captions, nonvisual model descriptions, controls, hints and feedback is mandatory for every standard locale at implementation. No English replacement text, fake dictionaries, silent fallbacks or `allLocales` assertions of incomplete coverage. Adapt layout and narrative order semantically for RTL without reversing mathematical truth. Require meaningful keyboard/touch/screen-reader participation, visible focus, adequate targets, high contrast, static reduced-motion representation, small-screen readability and WCAG 2.2 AA testing. Once downloaded, the complete Lesson, Scene and explanatory feedback must run offline on low-resource devices. These are requirements, not claims that runtime assets or PWA flows exist.

## Sources and factual verification

- [experimentVariation.data.ts](../../../../data/skills/probability/experiments/skills/experimentVariation.data.ts) — canonical Mathematics Skill object and methodological description.
- Studio [Lesson](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) contracts.
- Scene specification below records fully specified examples and truth conditions for subsequent mathematical and editorial review.

## Curriculum / Program compatibility

Not specified. Standalone and Program-neutral. Do not claim formal Ukrainian or international Curriculum alignment without reviewing a concrete Curriculum.

## Open editorial decisions

- **Editor/Methodologist:** verify Grade 3 audience, prerequisite suitability, target Skills, depth and treatment of the listed misconceptions.
- **Editor/Screenwriter:** approve the provisional Section plan and separately review the custom Scene specification only after the Methodologist Brief is accepted.
- **Engineering/QA:** accessible equivalence, locale coverage, offline behavior, tests and runtime Section integration remain future implementation work, not established behavior.

## Methodologist handoff

**Draft pending editorial approval.** Companion Content and Scene specifications are _provisional_ under the explicit batch instruction; their creation does not satisfy or bypass the Methodologist approval gate. No runtime Lesson_Config, Question, Quiz, React Scene, scoring, storage API or Note implementation is authorized by this handoff.
