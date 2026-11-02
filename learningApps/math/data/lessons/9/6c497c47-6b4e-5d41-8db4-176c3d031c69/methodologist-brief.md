# Same Fraction, Different Whole — Methodologist Brief

Date: 2026-10-31
Lesson slug: fractionsDependOnTheWhole
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Explain why a fraction of a larger whole has greater absolute area than the same fraction of a smaller whole, and show that selecting all n equal parts of any chosen whole is n/n = 1.

**Pedagogical rationale and placement:** Begin with the whole already established in the prior fraction Lessons; distinguish equal fractional share from equal absolute amount, then reconstruct the chosen whole from all of its equal parts. These are complementary facets of the reference whole, but remain two independent canonical competencies.

Multiple independently assessable Skills are deliberately taught through one coherent reference model; they remain separate competencies with unchanged canonical IDs.

## Target audience

**Primary grade: Grade 3; ages approximately 8–9.** This depth follows the stated prerequisites, not an arbitrary one-Skill-per-Grade or one-Lesson-per-Skill mapping. Design for emerging literacy, mixed language proficiency, variable math fluency and accessibility needs. Use short concrete learner-facing copy, clear audible/textual alternatives and non-motor-precision inputs. The canonical Skills have no Grade ceiling.

## Prerequisites

- Identify the chosen whole and fair equal-area partitions.
- Read unit fractions 1/2, 1/3 and 1/4; distinguish numerator (selected) from denominator (equal pieces of the whole).
- Compare rectangular areas measured in congruent grid squares; count to 16.

Previously transferred, pedagogically adjacent Skills: `wholeAndEqualParts`, `unitFractionModel`, `unitFractionRead`, `denominatorMeaning`, `numeratorMeaning`, `nonUnitModel`. The Lesson itself must remain standalone and Program-neutral; a learner with the equivalent knowledge need not complete any named preceding Lesson.

## Target Skills

- [wholeDependence.data.ts](../../../../data/skills/fractions/representation/skills/wholeDependence.data.ts)
- [oneAsFraction.data.ts](../../../../data/skills/fractions/representation/skills/oneAsFraction.data.ts)

## Expected learning outcomes

- In a small 4×2 rectangle and a large 8×2 rectangle, identify half of each as 4 and 8 equal unit squares respectively.
- State that the fraction 1/2 is the same _share_ of each own whole but does not imply identical absolute areas.
- Reconstruct a complete selected whole as 2/2, 3/3 or 4/4 when all equal parts are selected.
- Explain why the symbol 1 (one whole) is valid for each 2/2, 3/3 and 4/4 even when the partition count changes.
- Independently distinguish 3/3 of a six-cell rectangle from 3/3 of a twelve-cell rectangle: both are complete wholes, with different absolute areas.

These observable outcomes state what the Lesson intends to teach and invite learners to demonstrate. Neither a single correct choice nor completion of a Section guarantees validated mastery of an individual Skill.

## Essential subject matter

- A fraction is a proportion relative to one explicitly chosen reference whole. The same fraction of differently sized wholes may have different areas, lengths or quantities.
- A 4×2 whole has area eight congruent unit squares; half of it contains four. An 8×2 whole has area sixteen; half contains eight. Neither fraction label changes when the reference whole changes.
- For any positive n, selecting all n equal parts of the same whole gives n/n. Two halves 2/2, three thirds 3/3, and four quarters 4/4 each cover exactly the chosen whole, so each equals 1.
- The same mathematical proportion can be represented by different partitions of the same whole (2/2 versus 4/4), and can represent a different absolute amount if the _whole_ changes.
- A fair comparison of actual amounts requires the units to be comparable; both models use congruent unit squares, not differently scaled pictures.

**Depth selected for this audience:** Rectangles measured in congruent grid squares; halves, thirds, quarters and n/n for n=2,3,4 only. Show same-share/different-amount and complete-whole reconstruction. Exclude comparisons of unrelated units, formal fraction equivalence beyond the full-whole identity, fractions above one, fraction multiplication or calculating a fraction of arbitrary quantities.

## Conceptual progression and dependencies

Build on the listed prerequisites, expose the _reference_ (whole size, hour and minute scale, pictograph key, or random-experiment conditions) before asking the learner to reason. Move from a familiar case to an interactive contrast that makes a common misconception visible, then apply the correct rule in an independent fresh example. The Screenwriter chooses presentation, interactions and number of Sections; the Methodologist owns content limits and accuracy. Supporting representations teach a Skill; they do not create additional Skill IDs.

## Misconceptions, examples and boundaries

- Half of a larger whole must equal half of a smaller whole because the written fraction is identical.
- 2/2 means two wholes rather than all two halves of one whole.
- The denominator alone changes how large the original whole is.
- A picture looks equally big on the screen, so its fractional part must be equal in real area.

**Explicit exclusions:** Rectangles measured in congruent grid squares; halves, thirds, quarters and n/n for n=2,3,4 only. Show same-share/different-amount and complete-whole reconstruction. Exclude comparisons of unrelated units, formal fraction equivalence beyond the full-whole identity, fractions above one, fraction multiplication or calculating a fraction of arbitrary quantities. Do not implicitly extend the canonical Skill description, invent new taxonomy entities or treat any exercise format as a separately approved Skill.

## Localization, accessibility and offline intent

Complete authentic translation of all learner-facing text, mathematical terminology, captions, nonvisual model descriptions, controls, hints and feedback is mandatory for every standard locale at implementation. No English replacement text, fake dictionaries, silent fallbacks or `allLocales` assertions of incomplete coverage. Adapt layout and narrative order semantically for RTL without reversing mathematical truth. Require meaningful keyboard/touch/screen-reader participation, visible focus, adequate targets, high contrast, static reduced-motion representation, small-screen readability and WCAG 2.2 AA testing. Once downloaded, the complete Lesson, Scene and explanatory feedback must run offline on low-resource devices. These are requirements, not claims that runtime assets or PWA flows exist.

## Sources and factual verification

- [wholeDependence.data.ts](../../../../data/skills/fractions/representation/skills/wholeDependence.data.ts) — canonical Mathematics Skill object and methodological description.
- [oneAsFraction.data.ts](../../../../data/skills/fractions/representation/skills/oneAsFraction.data.ts) — canonical Mathematics Skill object and methodological description.
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
