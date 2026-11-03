# From Tally Marks to a Table — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not an Approved Screenwriter artifact.**

- Lesson directory: `learningApps/playground/Data/Lessons/1/talliesIntoTables/`
- Audience: **Grade 2**, approximately ages 7–8
- Methodologist source: [Draft Brief](./methodologist-brief.md) (**not approved**)
- Target Skills:
  - [tallyMarks.data.ts](../../../../data/skills/data/collection/skills/tallyMarks.data.ts)
  - [fillSimpleTable.data.ts](../../../../data/skills/data/collection/skills/fillSimpleTable.data.ts)
- Program dependence: **None**
- Runtime/assessment status: editorial instructions only; no implementation, graded Questions or mastery signal.

## Creative and instructional premise

Record observations as consistent tally marks, group them in fives, and transfer correctly matched category, tally and frequency values into a simple labelled table.

A compact observation stream with persistent local category tallies and a labelled three-column table; a fifth mark crosses four upright marks. Every card has its own processed state to prevent accidental double-counting. Learners may undo and replay.

**Why interactivity matters:** The child can change the relevant mathematical or observational state, inspect evidence rather than accept an answer by authority, receive a reason-specific explanation, and retry without penalty. The final unfamiliar example is not a copy of the original. The experience is a standalone teaching sequence, not a Program plot, mascot activity or points-based game.

**Teaching limits:** Single category variable, up to three mutually exclusive categories, one observation per token, counts 0–12, one record per item. Use one consistent five-bundled tally convention; no pie charts, averages, percentages or statistical inference. Do not introduce a new data-investigation Skill or infer comparisons from a single table as mastery of chart interpretation. Recording and reading tallies and accurately recording values in a table are two separately linked canonical Skills in this same lesson.

## Learner journey / planned Sections

1. **A mark for each new card:** Convert one-to-one observations into a written count.
2. **A bundle of five:** Read and construct tallies without miscounting the crossed mark.
3. **Put the marks into a table:** Make category, tally and numerical frequency correspond row by row.
4. **Fresh observations, your table:** Use the recording procedure independently with a different symbol set.

Each general Section has a **single top-to-bottom column** of typed `text`, `markdown` and `scene` blocks. These Resource types are supported by the current generic renderer, but the **named TallyTableStudio Scene does not exist yet** and is specified for later implementation. No new Section discriminators, Question adapters or scoring contracts are invented.

## Detailed ordered Section plan

### Section 1 — A mark for each new card

**Purpose:** Convert one-to-one observations into a written count.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “Twelve picture cards will appear, one at a time. Every time you see a bird, cat or dog, make one mark in its group. Which row will you use for a bird?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [TallyTableStudio](./scenes/TallyTableStudio.scene-spec.md): Observation mode shows twelve named cards in a fixed order: bird, cat, bird, dog, bird, cat, bird, cat, bird, dog, cat, bird. Show the next card only when requested; learner chooses its labelled category.

3. **`markdown`** (supported Resource type) — “One card gives one tally mark, in one row. The marks remember our count so we do not have to start again each time.”

**Meaningful learner action:** Process six observations first, then optionally continue; each submission labels the specific recorded card.

**Specific formative feedback, not a scored answer:**

- Wrong row: “This card shows a bird. Add its mark to Bird, not Cat; keep one mark for the one card.”
- Extra mark attempted: “This card has already been recorded. Move to the next card before adding another mark.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. The source card stays available in a review list; any category assignment can be corrected by undo.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 2 — A bundle of five

**Purpose:** Read and construct tallies without miscounting the crossed mark.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “When the fifth bird arrives, do we add a fifth upright mark—or cross the four marks to show one complete group of five?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [TallyTableStudio](./scenes/TallyTableStudio.scene-spec.md): Tally mode isolates the bird row. Step through counts 1, 2, 3, 4, 5, 6; at five the four upright marks gain one crossing stroke, and at six one new upright stroke appears.

3. **`markdown`** (supported Resource type) — “Four straight strokes plus one crossing stroke stand for five. Add one more straight stroke for six. It is a group of five and one more—not six groups.”

**Meaningful learner action:** Choose the tally for five and then six, using a visually and verbally precise grouping.

**Specific formative feedback, not a scored answer:**

- Six counted as five: “Count the complete five-mark group first, then add the single new stroke: five plus one is six.”
- Crossing stroke ignored: “The diagonal stroke is the fifth mark. It counts as one observation just like a straight mark.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Use dynamic grouped labels 'five' and 'one extra'; do not rely on diagonal direction as semantic information in RTL.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 3 — Put the marks into a table

**Purpose:** Make category, tally and numerical frequency correspond row by row.

**Ordered content blocks:**

1. **`markdown`** (supported Resource type) — “Our observations are six birds, four cats and two dogs. Let's put each count next to the correct label.”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [TallyTableStudio](./scenes/TallyTableStudio.scene-spec.md): Table mode has three rows Bird/Cat/Dog and columns Category, Tally, Count. Learner places the 6, 4 and 2 numerals into the matching rows after reading the tallies; the 12 observation cards remain available.

3. **`text`** (supported Resource type) — “Bird: a group of five and one, count 6. Cat: four marks, count 4. Dog: two marks, count 2. Together that is 12 cards.”

**Meaningful learner action:** Fill three frequency cells and check the sum against the original twelve cards.

**Specific formative feedback, not a scored answer:**

- Bird row labeled 5: “Read the group of five and the one extra mark. Bird is six.”
- Counts swapped: “Look at the named row, not just the number. Four tallies belong beside Cat.”
- Sum does not match: “Add 6 + 4 + 2. It makes 12, the number of cards we counted once each.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Provide a linearized table transcript with explicit row headings.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 4 — Fresh observations, your table

**Purpose:** Use the recording procedure independently with a different symbol set.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “Now count eight new cards: five stars, two moons, one sun. Make the marks first, then write the count in each row.”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [TallyTableStudio](./scenes/TallyTableStudio.scene-spec.md): Transfer mode starts with eight cards in mixed order and blank tally and count cells, no pre-filled numbers. Learner can request 'How do I group five?' once or reveal afterward.

3. **`markdown`** (supported Resource type) — “Star has one complete group of five: 5. Moon has two marks: 2. Sun has one mark: 1. The table total is 5 + 2 + 1 = 8.”

**Meaningful learner action:** Count, tally and fill three rows, then explain why the total is eight.

**Specific formative feedback, not a scored answer:**

- Extra ninth mark: “There are only eight cards. Check whether one was marked twice.”
- Missing mark: “Read the observation list again and find the item without a recorded mark.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. No score or mastery gate. The full worked table can be revealed voluntarily.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

## Scene handoff

- [TallyTableStudio](./scenes/TallyTableStudio.scene-spec.md) — proposed prop-free, self-contained Scene with explicit state cases, feedback and nonvisual pathway. **The Scene type/renderer is present as a general platform capability; this particular Scene is not implemented.**
- Scene instances may use independent local preset selection within each Section, without a public props API or hidden cross-Section state. Section order itself is specified above; no invented Lesson runtime registry is implied.

## Independent transfer and reflection

Eight new observations make Star 5, Moon 2 and Sun 1; construct each tally and verify the table total is eight.

Invite the child to describe **why** the result fits the model before revealing the full explanation. One optional hint is available. A non-reading learner can use accessible choice-and-explanation controls or speak to a nearby adult, without a speech-recognition requirement. Do not turn a voluntary reveal, an acknowledgement or a Section completion into a mastery claim.

## Planned short recall Note

“One observation adds one mark to its category. A five-mark bundle helps count, and table rows keep labels matched to counts.”

Proposed pedagogical unlock _point_: when the contrast in Section 3 has been examined and explained. **Status planned, not wired**: no Note entity, unlock API, persistence, offline sync or review-sheet scheduler is claimed present. A learner who does not trigger an eventual Note still gets the full teaching content.

## Locale, accessibility, offline and resource readiness

All quoted learner text and Scene feedback above are English authoring source, **not implemented locale bundles**. Complete genuine translation for all required languages, contextual terms, numeral conventions, accessible descriptions and RTL-specific meaning is mandatory before runtime delivery. The spec does not create or claim language fallback behavior. Design for WCAG 2.2 AA, keyboard and mobile touch, nonvisual equivalent participation, reduced motion, weak-device parity and complete offline access once the Lesson and Scene are packaged. New assets must be locally available; no network call is essential to these experiences.

## Editorial and engineering dependencies

**All Content is provisional Draft pending Methodologist approval.** Subsequent Screenwriter approval and independent Scene review remain required. Coding Agent owns runtime content assembly, Scene registration, tests, locale resources and eventual PWA packaging. Assessment Architect owns all Questions, Quiz behavior, scores, retries and validated evidence. This batch does **not** implement any of those capabilities.
