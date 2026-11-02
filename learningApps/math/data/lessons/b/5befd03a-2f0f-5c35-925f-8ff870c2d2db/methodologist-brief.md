# Pictures That Count — Methodologist Brief

Date: 2026-10-31
Lesson slug: buildingAndReadingPictographs
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Construct and interpret one-to-one pictographs with a clear category label and key where one identical symbol represents exactly one observation, validating the chart against its source table.

**Pedagogical rationale and placement:** Learners already collected and recorded counts and read a simple table; mapping those counts to one-symbol-per-object pictographs is an accessible next representation. Building an accurate diagram and reading its categories/key are separate canonical Skills in the same lesson.

Multiple independently assessable Skills are deliberately taught through one coherent reference model; they remain separate competencies with unchanged canonical IDs.

## Target audience

**Primary grade: Grade 2; ages approximately 7–8.** This depth follows the stated prerequisites, not an arbitrary one-Skill-per-Grade or one-Lesson-per-Skill mapping. Design for emerging literacy, mixed language proficiency, variable math fluency and accessibility needs. Use short concrete learner-facing copy, clear audible/textual alternatives and non-motor-precision inputs. The canonical Skills have no Grade ceiling.

## Prerequisites

- Count and reconcile totals up to twelve; classify each observation into exactly one category.
- Read a labelled category-frequency table and identify which count belongs to which row.
- Recognize that an icon used in this lesson is a counting symbol, not an illustration with arbitrary size or value.

Previously transferred, pedagogically adjacent Skills: `collectCounts`, `tallyMarks`, `fillSimpleTable`, `readSimpleTable`, `compareCategories`. The Lesson itself must remain standalone and Program-neutral; a learner with the equivalent knowledge need not complete any named preceding Lesson.

## Target Skills

- [buildPictograph.data.ts](../../../../data/skills/data/presentation/skills/buildPictograph.data.ts)
- [readPictograph.data.ts](../../../../data/skills/data/presentation/skills/readPictograph.data.ts)

## Expected learning outcomes

- Explain the pictograph key: one identical token icon represents one object, without relying on picture color.
- From a table with apples 4, pears 3, plums 2, build exactly four, three, two identical count icons in correctly labelled rows.
- Read a pictograph with cats 5, dogs 2, birds 4 by matching a category name, the one-icon key and the count.
- Check that the built chart total 4+3+2=9 equals its source table's nine observations.
- Spot an incorrect chart with five icons for apples but a source table count of four, and repair the extra icon.

These observable outcomes state what the Lesson intends to teach and invite learners to demonstrate. Neither a single correct choice nor completion of a Section guarantees validated mastery of an individual Skill.

## Essential subject matter

- A pictograph represents observed frequencies using repeated symbols. A _key_ states how many observations each symbol represents. In this lesson the key always says 1 icon = 1 object.
- In a one-to-one pictograph, the correct row icon count equals that category's observed count. Changing the physical icon size or color cannot change the number it represents.
- A source table with Apples 4, Pears 3, Plums 2 (all pieces of fruit) must produce four/three/two uniform count tokens, with category labels kept beside the matching rows.
- To read a pictograph, identify the category label, read the key, and count the symbols in that row. For five cat icons, two dog icons and four bird icons, there are 5, 2 and 4 animals respectively.
- Any representation can be checked against the original category counts and combined total: 4 + 3 + 2 = 9, and 5 + 2 + 4 = 11.

**Depth selected for this audience:** Strictly one identical accessible counting symbol per observed item and unscaled keys (1 icon = 1 item); two or three categories and counts of 0–6, with totals at most twelve. No half-icons, scaled pictographs, bar charts, averages, percentages or inferential claims. Distinguish reading the chart from making it.

## Conceptual progression and dependencies

Build on the listed prerequisites, expose the _reference_ (whole size, hour and minute scale, pictograph key, or random-experiment conditions) before asking the learner to reason. Move from a familiar case to an interactive contrast that makes a common misconception visible, then apply the correct rule in an independent fresh example. The Screenwriter chooses presentation, interactions and number of Sections; the Methodologist owns content limits and accuracy. Supporting representations teach a Skill; they do not create additional Skill IDs.

## Misconceptions, examples and boundaries

- A larger decorative icon stands for more objects even though the stated key is one-to-one.
- The pictograph has one icon per _category_, not per observation.
- An unlabeled row of five icons tells us which category it describes without a heading.
- A displayed key can be ignored because the icons look like the physical objects.
- A pictograph with five icons for four observed apples is acceptable because it looks more balanced.

**Explicit exclusions:** Strictly one identical accessible counting symbol per observed item and unscaled keys (1 icon = 1 item); two or three categories and counts of 0–6, with totals at most twelve. No half-icons, scaled pictographs, bar charts, averages, percentages or inferential claims. Distinguish reading the chart from making it. Do not implicitly extend the canonical Skill description, invent new taxonomy entities or treat any exercise format as a separately approved Skill.

## Localization, accessibility and offline intent

Complete authentic translation of all learner-facing text, mathematical terminology, captions, nonvisual model descriptions, controls, hints and feedback is mandatory for every standard locale at implementation. No English replacement text, fake dictionaries, silent fallbacks or `allLocales` assertions of incomplete coverage. Adapt layout and narrative order semantically for RTL without reversing mathematical truth. Require meaningful keyboard/touch/screen-reader participation, visible focus, adequate targets, high contrast, static reduced-motion representation, small-screen readability and WCAG 2.2 AA testing. Once downloaded, the complete Lesson, Scene and explanatory feedback must run offline on low-resource devices. These are requirements, not claims that runtime assets or PWA flows exist.

## Sources and factual verification

- [buildPictograph.data.ts](../../../../data/skills/data/presentation/skills/buildPictograph.data.ts) — canonical Mathematics Skill object and methodological description.
- [readPictograph.data.ts](../../../../data/skills/data/presentation/skills/readPictograph.data.ts) — canonical Mathematics Skill object and methodological description.
- Studio [Lesson](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) contracts.
- Scene specification below records fully specified examples and truth conditions for subsequent mathematical and editorial review.

## Curriculum / Program compatibility

Not specified. Standalone and Program-neutral. Do not claim formal Ukrainian or international Curriculum alignment without reviewing a concrete Curriculum.

## Open editorial decisions

- **Editor/Methodologist:** verify Grade 2 audience, prerequisite suitability, target Skills, depth and treatment of the listed misconceptions.
- **Editor/Screenwriter:** approve the provisional Section plan and separately review the custom Scene specification only after the Methodologist Brief is accepted.
- **Engineering/QA:** accessible equivalence, locale coverage, offline behavior, tests and runtime Section integration remain future implementation work, not established behavior.

## Methodologist handoff

**Draft pending editorial approval.** Companion Content and Scene specifications are _provisional_ under the explicit batch instruction; their creation does not satisfy or bypass the Methodologist approval gate. No runtime Lesson_Config, Question, Quiz, React Scene, scoring, storage API or Note implementation is authorized by this handoff.
