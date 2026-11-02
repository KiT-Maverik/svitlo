# Multiplication with Rows and Columns — Methodologist Brief

Date: 2026-10-31
Lesson slug: multiplicationArrayModel
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Establish the rectangular array as a multiplication representation with the SAME number of objects in every row, and relate row count, items per row, column count and product.

## Target audience

Children aged 6–8 who recognize small equal groups and can count objects in rows, up to 25. English is editorial source, not an implementation locale; every learner-facing phrase will need genuine supported-language translation.

## Prerequisites

- Count small sets and identify horizontal rows and vertical columns using explicit labels.
- Recognize equal groups and a multiplication expression for group count × group size.
- Operate a simple selectable grid without dragging; textual row descriptions available.

## Target Skills

- [arrayModel.data.ts](../../../../data/skills/arithmetic/multiply/skills/arrayModel.data.ts)

## Expected learning outcomes

- Identify the number of rows and the number of objects in each row in a rectangular array.
- Construct and read a 3-row, 4-column array as 3 × 4 = 12, supported by an equivalent row-by-row count.
- Explain why a ragged shape with row sizes 4,3,4 is not a complete 3 × 4 rectangular array.
- Inspect a 4-row, 2-column new array and determine its total.

## Essential subject matter

An array with R equal rows and C objects in every row has R×C elements. Three rows of four = 12; two rows of five = 10; four rows of two = 8. An incomplete row with only three items invalidates the exact 3×4 rectangular model, although its objects can still be counted. Rows and columns describe mathematical structure, not directions tied to reading order.

## Conceptual progression and dependencies

Identify row and column labels → place counters into equal rows → read R×C as a total → contrast ragged row → independently build and count another array.

## Misconceptions, examples and boundaries

Confusing 3 rows of 4 with a total of 7, counting an empty grid cell as occupied, mistaking rows for columns, assuming a ragged 4,3,4 model has twelve items, and treating rotation as changing quantity. Avoid early general proof of commutativity; the next Lesson owns that Skill.

## Localization, accessibility and offline intent

Keep semantic “groups / in each,” or “rows / columns” consistent in each locale. Every quantity and action has an equivalent ordered text representation, keyboard/touch control, non-color-only feedback, RTL-safe mathematical order, readable zoom and reduced motion. All assets and selected-language feedback must work locally after the content package downloads. No audio, video or dragging requirement.

## Sources and factual verification

- [Playground generated taxonomy](../../../../docs/generated/skills/taxonomy.en.md) and the linked canonical Skill source.
- [Common Core mathematics standards](https://corestandards.org/mathematics-standards/) as a comparative early-multiplication reference, not verified Curriculum alignment.
- [IES/WWC elementary mathematics guidance](https://ies.ed.gov/ncee/wwc/PracticeGuide/26), representation and verbal explanation as general instructional guidance.

## Curriculum / Program compatibility

Not specified. Standalone Lesson, Program-neutral.

## Open editorial decisions

- Array rotation may be previewed as observation but a full rule a×b=b×a belongs to the separate commutative Lesson. Confirm coherent sequencing alongside equalGroups.
- Confirm the chosen numerical ranges and the model's language/order before release.

## Methodologist handoff

**Draft; explicit editor approval pending.** Screenwriter Content below is **provisional** for review, not an approved implementation source. Do not start scored assessment or scene coding automatically.
