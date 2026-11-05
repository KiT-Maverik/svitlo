# Pictures That Count — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Methodologist input:** [Draft Brief](./methodologist-brief.md) (**not approved**).
**Primary audience:** Grade 2, ages 7–8.
**Target canonical Skills:**

- [buildPictograph.data.ts](../../../../data/skills/data/presentation/skills/buildPictograph.data.ts)
- [readPictograph.data.ts](../../../../data/skills/data/presentation/skills/readPictograph.data.ts)
  **Independence:** standalone Playground Lesson; no Program storyline, mascot, reward, mission or past learner state required.
  **Implementation:** editorial Content only. No runtime Lesson, Questions, Quizzes, scoring, registered custom Scenes or locale bundles created.

## Instructional concept

Construct and interpret one-to-one pictographs with a clear category label and key where one identical symbol represents exactly one observation, validating the chart against its source table.

Learners already collected and recorded counts and read a simple table; mapping those counts to one-symbol-per-object pictographs is an accessible next representation. Building an accurate diagram and reading its categories/key are separate canonical Skills in the same lesson.

The core web opportunity is **learner-controlled inspection of a mathematical model**, not merely an illustration: A learner-manipulable table-to-pictograph builder and a separate read-only example. Rows carry explicit text category names; each count icon is a same-size tally token independent of the fruit/animal's real shape. The key is always displayed and narrated.

Every example is bounded: Strictly one identical accessible counting symbol per observed item and unscaled keys (1 icon = 1 item); two or three categories and counts of 0–6, with totals at most twelve. No half-icons, scaled pictographs, bar charts, averages, percentages or inferential claims. Distinguish reading the chart from making it.

## Learner journey and ordered Sections

1. **Pictures can keep a count** — Tie one pictograph symbol to one observation and its category.
2. **Build a pictograph from the table** — Construct one-to-one symbols and reconcile them against original frequencies.
3. **Read somebody else's picture** — Use category names and the key rather than memorizing source table values.
4. **Your new chart** — Transfer a one-to-one key to a new category set and catch a mismatch.

Use a vertical single-column order of typed Resource blocks within each general Section: `text`, `markdown` and the existing `scene` Resource type. The named **PictographStudio** is a new proposed Scene, not yet implemented, and each appearance must be self-contained rather than depending on earlier Section state. A generic Scene renderer does not mean this particular educational interaction is available. No new Section discriminators or hidden readiness APIs are implied.

## Section-by-Section learning experience

### Section 1 — Pictures can keep a count

**Learning purpose:** Tie one pictograph symbol to one observation and its category.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “A table has four apples, three pears and two plums. Can we show those numbers with pictures without changing the count?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [PictographStudio](./scenes/PictographStudio.scene-spec.md). PictographStudio shows the source table, blank rows named Apple/Pear/Plum, and an explicit key: one square count icon = one fruit. Learner predicts the Apple row's number of icons.

3. **`markdown` Resource (available block type):** “We can use one same-sized symbol for one fruit. Four apples need four icons in the Apple row. The category name tells what the count is about.”

**Meaningful learner action:** Inspect and restate key, choose a row label and predict its icon count.

**Explanatory feedback for anticipated choices:**

- **One icon per row:** “The key says one icon is one fruit, not one whole category. Four apples need four separate icons.”
- **Icon size matters:** “All count symbols represent one object each. Their displayed size does not change their meaning.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 2 — Build a pictograph from the table

**Learning purpose:** Construct one-to-one symbols and reconcile them against original frequencies.

**Ordered blocks (single outer column):**

1. **`markdown` Resource (available block type):** “Use the add-one-symbol control to build the chart. The table says Apple 4, Pear 3 and Plum 2. Check every row.”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [PictographStudio](./scenes/PictographStudio.scene-spec.md). Builder mode starts at zero. Add four identical symbols to Apple, three to Pear, two to Plum; an explicit 'Check against table' reveals row matches and total 9.

3. **`text` Resource (available block type):** “The rows show four, three and two icons. Their key is one icon to one fruit. So the chart shows nine fruits, just like the table.”

**Meaningful learner action:** Construct all rows; check category-to-count matching and 4+3+2=9.

**Explanatory feedback for anticipated choices:**

- **Apple has five icons:** “The table records four apples. Remove the extra Apple icon so chart and table agree.”
- **Pear has two icons:** “Three pears are in the table. Add one more Pear icon to the Pear row.”
- **Total not nine:** “Add the three row counts. The table has 4+3+2 = 9 fruit observations.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 3 — Read somebody else's picture

**Learning purpose:** Use category names and the key rather than memorizing source table values.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “This is a new chart about animals. It shows five cat icons, two dog icons and four bird icons. The key still means one icon = one animal. How many dogs? How many animals altogether?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [PictographStudio](./scenes/PictographStudio.scene-spec.md). Read mode displays row-labelled Cat 5, Dog 2, Bird 4 pictograph and key, no source table. Learner selects Dog row and counts two, then adds 5+2+4 = 11.

3. **`markdown` Resource (available block type):** “There are two dogs because the Dog row has two icons and the key says each means one dog. There are eleven animals in the three rows together.”

**Meaningful learner action:** Read an unseen category count and total from labelled rows.

**Explanatory feedback for anticipated choices:**

- **Five dogs:** “Five icons belong to Cat, not Dog. Find the Dog row, then count its two symbols.”
- **Eleven dogs:** “Eleven counts every animal in all rows. The Dog row alone has two.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 4 — Your new chart

**Learning purpose:** Transfer a one-to-one key to a new category set and catch a mismatch.

**Ordered blocks (single outer column):**

1. **`markdown` Resource (available block type):** “A new table records two stars, four moons and one sun. Draw the chart with your count icons and put each number in its proper row.”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [PictographStudio](./scenes/PictographStudio.scene-spec.md). Transfer mode has Star=2, Moon=4, Sun=1, key one symbol=one item. Learner builds rows without prefilled symbols, then receives optional hints and checks total 7.

3. **`text` Resource (available block type):** “Two stars need two icons, four moons need four and one sun needs one. The key is unchanged. The total is seven objects.”

**Meaningful learner action:** Build 2/4/1 pictograph and explain why it matches the source table.

**Explanatory feedback for anticipated choices:**

- **Moon has three icons:** “The Moon row's source count is four. Add the fourth symbol.”
- **Total six:** “Two plus four plus one is seven. Count the icons in all three labelled rows again.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

## Custom Scene specifications

- [PictographStudio](./scenes/PictographStudio.scene-spec.md) — proposed interactive, prop-free self-contained Scene. Review its pedagogical cases, state changes, feedback, accessibility alternatives and reset. It is a written specification, **not** a React component.

## Independent transfer and reflection

With a fresh table of two stars, four moons and one sun, make a row-labelled chart with 2,4,1 symbols and a key; the total must equal seven.

Present the unfamiliar case before revealing the worked result. The learner may request a hint and review a full explanation; speech input is optional to a nearby adult rather than an assumed speech-recognition system. An unscored transfer response informs learning but is not validated mastery.

## Lesson Notes — planned, not implemented

**Concise cue:** “Read the key and category label; in this chart, one identical icon means one item.”

**Proposed unlock moment:** after the learner has examined the critical comparison in Section 3 and can explain what made the examples different. There is no verified Note entity, unlock event, persistent study sheet, spaced-repetition scheduler or offline Notes sync; the Lesson must remain understandable without those features.

## Assessment and technical handoff

These interactions are formative, explanatory and unscored. An Assessment Architect owns later Question banks, diagnostic validity, Quiz behavior, scoring thresholds and mastery evidence. A Coding Agent owns runtime Lesson/Section data, Scene implementation, translations, assets, tests, registration and packaging. The Scene's feasibility, full supported locale coverage, WCAG 2.2 AA access, true RTL, reduced motion, mobile and offline parity are **release requirements, not existing implementation claims**.

## Open editorial questions

- Confirm the Methodologist's selected scope before approving this Content.
- Review explanatory language and any potentially ambiguous model assumptions in the Scene with domain specialist.
- Review all locale-specific labels, numerals and conventions, and provide accurate genuine translations before implementation.

**Editorial status remains Provisional Draft.**
