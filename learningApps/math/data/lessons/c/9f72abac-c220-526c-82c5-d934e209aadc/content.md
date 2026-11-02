# Find the Story in a Data Table — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval (not formally approved).**
**Audience:** Grade 2, approximately ages 7–8.
**Source brief:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skills:**

- [readSimpleTable.data.ts](../../../../data/skills/data/presentation/skills/readSimpleTable.data.ts)
- [compareCategories.data.ts](../../../../data/skills/data/interpretation/skills/compareCategories.data.ts)
  **Lesson:** standalone, Program-neutral; no runtime Lesson, Quiz, Question, score or completed Scene is implemented.

## The learner's experience

Read a correctly labelled two-column category-frequency table and use compatible category counts to answer 'how many together?' and 'how many more?' questions.

After representing observations in a table, reading row/column headings and finding numerical differences is a coherent next step. Reading values and comparing totals are distinct target Skills.

Explore a labelled table through row and column selectors, choose one or two rows, reveal quantity tokens/equations, match equal counts and count extras, switch to fresh dataset, reset. No ability or API to read a live spreadsheet is assumed. Keep all data preset and local, with no external props.

**Teaching boundary:** Two-column (Category, Number of shapes) count table, mutually exclusive categories, totals ≤12; comparisons only for compatible counts in the same context and unit. Supports selecting correct rows/cells, sums and additive differences; no chart scaling, averages, percentages or causal claims. The activity must explain why an answer fits rather than merely reward a selection. Every comparison uses a specified whole, time scale, unit or random experiment, as appropriate. Wrong answers receive evidence-based feedback and a no-penalty retry.

## Ordered learning journey

1. **A number needs its label:** Locate a value through both a row and a column heading.
2. **Together means add:** Combine two compatible frequencies and reconcile the whole collection.
3. **More than means find the gap:** Contrast a difference with a total.
4. **A different table, your evidence:** Independently answer row, total and gap questions from a fresh table.

The general Sections below use a **single vertical top-to-bottom column** of typed Resource blocks. `text`, `markdown` and `scene` are available block types; the named **TableEvidenceExplorer Scene is proposed and not implemented**. No separate 'Theory' or 'Practice' TypeScript discriminators are invented.

## Section plan and learner-facing copy

### Section 1 — A number needs its label

**Purpose / intended outcome:** Locate a value through both a row and a column heading.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “This table counts paper shapes in one tray. Which entry tells us the number of squares? Don't look for a number until you find the row and column.”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [TableEvidenceExplorer](./scenes/TableEvidenceExplorer.scene-spec.md): TableEvidenceExplorer displays the labelled table: rows Triangle 6, Square 4, Circle 2; headings 'Shape' and 'Number of shapes'. Select Square row and Number of shapes column; highlight intersection 4.

3. **`markdown` — existing Resource block type.** “The table says there are four squares in this tray. The number 4 means four shapes because we used the Square row and the Number of shapes column.”

**What the learner actually does:** Choose the labelled row, column heading and unit for square count.

**Specific explanatory feedback:**

- _6 chosen for squares_: “Six belongs to Triangle. Follow the Square row across to the count column.”
- _4 with no unit_: “Four of what? The row and heading tell us: four square shapes.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. A screen reader can inspect a linear list of pairs: 'Triangle, six shapes; Square, four shapes; Circle, two shapes'. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 2 — Together means add

**Purpose / intended outcome:** Combine two compatible frequencies and reconcile the whole collection.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “There are six triangles and two circles. How many of those two kinds are there together? And how many shapes are there in all?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [TableEvidenceExplorer](./scenes/TableEvidenceExplorer.scene-spec.md): Choose Triangle and Circle rows; the explorer shows six and two named shape tokens, then an optional 'Combine' view. Add Square to obtain all three category counts.

3. **`text` — existing Resource block type.** “Six triangles plus two circles make eight shapes. All the kinds together make 6+4+2 = 12 shapes.”

**What the learner actually does:** Combine Triangle+Circle = 8 and all rows =12, keeping the unit shapes.

**Specific explanatory feedback:**

- _6+2=10_: “Count on from six: seven, eight. Two more makes eight.”
- _Wrong total_: “Check all three rows exactly once: six triangles, four squares, two circles; 6+4+2=12.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Token quantities and equations both have text alternatives and no color-only identification. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 3 — More than means find the gap

**Purpose / intended outcome:** Contrast a difference with a total.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “We have six triangles and four squares. How many MORE triangles than squares? Should we add the two counts or find the gap?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [TableEvidenceExplorer](./scenes/TableEvidenceExplorer.scene-spec.md): Select Triangle and Square rows. Model side-by-side aligned token lines; learner matches the first four, leaving two unmatched triangles. On request reveal 6−4=2.

3. **`markdown` — existing Resource block type.** “Four triangles can match the four squares. Two triangles remain. So there are two more triangles than squares, not ten more.”

**What the learner actually does:** Compare the two labelled counts and say why the difference is two.

**Specific explanatory feedback:**

- _10 as the difference_: “Ten is the total of both rows. To find how many MORE, match four pairs and count the two triangles left over.”
- _2 as difference_: “Yes. Six minus four gives a gap of two shapes.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Provide a nonvisual pairing count: 'four matched pairs; two unmatched triangles'. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 4 — A different table, your evidence

**Purpose / intended outcome:** Independently answer row, total and gap questions from a fresh table.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “A new tray has stars 5, moons 3 and suns 1. Which row answers 'How many moons?' What is the total? How many more stars than moons?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [TableEvidenceExplorer](./scenes/TableEvidenceExplorer.scene-spec.md): New table: Star 5, Moon 3, Sun 1, all in 'Number of shapes' column. Learner locates Moon=3 and selects total 9 and difference 2, with separate reveal of each explanation.

3. **`text` — existing Resource block type.** “There are three moons. Together, 5+3+1=9 shapes. There are 5−3=2 more stars than moons.”

**What the learner actually does:** Read Moon=3, find total nine, compare star and moon counts without initial example numbers.

**Specific explanatory feedback:**

- _Total 8_: “Count all three categories: five plus three is eight, and one more sun makes nine.”
- _Difference 8_: “Eight adds stars and moons; 'how many more' asks for the gap, five minus three = two.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. No drawing or precise row targeting required; named row choices and spoken explanations are equivalent. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

## New custom Scene handoff

- [TableEvidenceExplorer](./scenes/TableEvidenceExplorer.scene-spec.md) — Screenwriter's provisional design, not implemented. It is self-contained, local-state and prop-free; any preset switches are internal rather than fake public props.
- Every Section points to the same specification because its cases cover the whole conceptual progression; each rendered Scene occurrence must remain an independently initialized instance, not depend on another Section's state.

## Independent transfer

A table of 5 stars, 3 moons, 1 sun contains 9 shapes and has 2 more stars than moons.

Give the learner a fresh problem before revealing its answer, allow one useful optional hint, and then offer a worked explanation. A learner may answer verbally to an adult or via equivalent selectable controls; no assumed speech API. Transfer is instructional practice, not proof of validated mastery.

## Proposed unlocked recall Note (not wired)

“Find the row, heading and unit before using a number; add for together, subtract for how many more.”

Proposed moment: when Section 3's important contrasting example has been explored and accurately explained. **Note entity, unlock events, persistence, offline Notes sync and spaced review scheduling are planned concepts, not current implemented capabilities.** Do not block the Lesson on Note events.

## Delivery and review readiness

- **Existing typed Resources:** `text`, `markdown`, `scene` with single-column Section ordering.
- **Proposed:** the named interactive Scene, all its data presets, localized learner-facing text, accessibility alternatives, Scene tests and future offline package.
- **Not designed here:** Questions, Quiz, graded response banks, mastery evaluation, score thresholds, new Resource types, API contracts or Program storyline.

Complete authentic localization, meaningful RTL, keyboard/touch/screen-reader equivalents, reduced motion, narrow screens, WCAG 2.2 AA and offline/weak-device parity are future implementation gates, not current claims. Methodologist, Screenwriter and Scene review statuses remain Draft until explicit editor approval.
