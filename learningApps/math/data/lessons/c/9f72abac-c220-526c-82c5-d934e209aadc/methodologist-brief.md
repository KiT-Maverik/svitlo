# Find the Story in a Data Table — Methodologist Brief

Date: 2026-10-31
Lesson slug: readingAndComparingTables
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Read a correctly labelled two-column category-frequency table and use compatible category counts to answer 'how many together?' and 'how many more?' questions.

**Why this Lesson now:** After representing observations in a table, reading row/column headings and finding numerical differences is a coherent next step. Reading values and comparing totals are distinct target Skills.

## Target audience

**Grade 2, approximately ages 7–8.** Choose this grade independently of the previous Lesson's age: target complexity and prerequisites justify the depth. Learners may have variable reading fluency, numeracy speed, vision, motor control and language proficiency; offer equivalent meaningful visual and nonvisual actions. The Skills themselves remain grade-independent.

## Prerequisites

- Count categories and check the total (`collectCounts`).
- Record tally marks and fill simple tables with correct row labels (`tallyMarks`, `fillSimpleTable`).
- Add and subtract nonnegative whole numbers within 12 with concrete support.

No Program completion is required; these are underlying knowledge needs only. Missing prerequisites should trigger scaffold or a separate prior Lesson rather than silently redefining the target Skill.

## Target Skills

- [readSimpleTable.data.ts](../../../../data/skills/data/presentation/skills/readSimpleTable.data.ts)
- [compareCategories.data.ts](../../../../data/skills/data/interpretation/skills/compareCategories.data.ts)

The 2 canonical Skills remain independently assessable even though one conceptual Lesson integrates them.

## Expected learning outcomes

- Identify the correct row, column heading and unit when answering a table question.
- Read the statement '6 triangles' rather than reporting an isolated number 6.
- Find 6 triangles versus 4 squares has a difference of 2 shapes, and 6 triangles plus 2 circles totals 8 shapes.
- Identify that the table of 6 triangles, 4 squares and 2 circles represents 12 shapes total.
- Independently interpret a fresh table with stars 5, moons 3 and suns 1, finding 9 total and a difference of 2 between stars and moons.
- Reject cross-unit comparisons, such as comparing a count of shapes against a number measured in centimeters.

These are instructional opportunities and observable behaviors; one correct selection or a revealed model is not a validated mastery claim.

## Essential subject matter

- A table cell has meaning only when paired with its row, column, heading and unit. For the category 'Triangles' under 'Number of shapes', 6 means six triangles in that collection.
- For one common collection containing 6 triangles, 4 squares and 2 circles: total 6+4+2=12 shapes.
- For the same collection, 'How many more triangles than squares?' asks for 6−4=2 shapes; 'How many triangles and circles combined?' asks for 6+2=8 shapes.
- An expression comparing two categories is valid when their counts have the same counting unit and observational context. Six shapes cannot directly be subtracted from four centimeters.
- Data supports only the questions its headings and recorded values permit; table counts alone do not reveal why a category is more frequent.

**Instructional depth:** Two-column (Category, Number of shapes) count table, mutually exclusive categories, totals ≤12; comparisons only for compatible counts in the same context and unit. Supports selecting correct rows/cells, sums and additive differences; no chart scaling, averages, percentages or causal claims.

## Conceptual progression and dependencies

Activate the prerequisite representation, elicit a prediction before explanation, expose the mathematical condition using an inspectable model, contrast it with a tempting misconception, then let the learner transfer to a new case with optional hints. This progression specifies what must become clear, not a mandated Section-type pattern. The Screenwriter controls delivery and detailed interactions provisionally; no scoring or automatic progress API is assumed.

## Misconceptions, examples and boundaries

- Choose the numerically largest cell without reading its category row.
- Treat a table value as a universal fact rather than one observation collection.
- Add instead of subtracting to answer 'how many more'.
- Compare numbers with incompatible units as if they were category counts.
- Infer an explanation (e.g., 'triangles are always more popular') from one table.

**Hard exclusions and postponed Skills:** Scaled bar charts, pictographs, line plots, percentages, statistical conclusions about a population and causal interpretations are deferred.

## Localization, accessibility and offline intent

All runtime text, accessible descriptions, controls, feedback and optional audio must eventually be genuinely translated into every supported locale. No fake translations, placeholder dictionaries, missing locales or unauthorized language fallback. Use proper localized mathematical vocabulary and numeric formatting; preserve math and factual diagram relations while adapting semantic LTR/RTL reading order. Ensure full keyboard/touch, nonvisual, reduced-motion and small-screen equivalent experiences and WCAG 2.2 AA targets. Once delivered, the entire lesson, Scene and feedback must work offline on weak devices; this is an engineering requirement, not a claim of current functionality.

## Sources and factual verification

- [readSimpleTable.data.ts](../../../../data/skills/data/presentation/skills/readSimpleTable.data.ts) — canonical Mathematics Skill with UUID, names and methodological descriptions preserved.
- [compareCategories.data.ts](../../../../data/skills/data/interpretation/skills/compareCategories.data.ts) — canonical Mathematics Skill with UUID, names and methodological descriptions preserved.
- [Lesson architecture](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) for editorial and ownership boundaries.
- The provisional Scene's worked examples provide explicitly stated values and assumptions for mathematical verification; editorial approval remains pending.

## Curriculum / Program compatibility

Standalone and Program-neutral. No national curriculum compatibility is asserted. Grade is an instructional design choice, not taxonomy content.

## Open editorial decisions

- **Editor:** approve Grade 2, prerequisite assumptions, target Skills, depth and misconception treatment.
- **Editor:** review the proposed transfer case and the separate Scene specification; their status is provisional until the Methodologist Brief is approved.
- **Coding Agent / later QA:** review accessibility, localization completeness, offline delivery and Lesson/Scene implementation under their separate workflows; do not infer implementation from this document.

## Methodologist handoff

**Draft only.** No formal Methodologist approval gate has passed. The accompanying Content and Scene documents were prepared provisionally under the batch instruction and require independent Screenwriter/Scene approval before engineering. No runtime lesson data, Questions, Quizzes, assessment engine or score is authorized here.
