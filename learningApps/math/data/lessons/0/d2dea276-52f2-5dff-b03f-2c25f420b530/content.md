# Reading Every Minute — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Methodologist input:** [Draft Brief](./methodologist-brief.md) (**not approved**).
**Primary audience:** Grade 3, ages 8–9.
**Target canonical Skills:**

- [readMinute.data.ts](../../../../data/skills/time/clock/skills/readMinute.data.ts)
  **Independence:** standalone Playground Lesson; no Program storyline, mascot, reward, mission or past learner state required.
  **Implementation:** editorial Content only. No runtime Lesson, Questions, Quizzes, scoring, registered custom Scenes or locale bundles created.

## Instructional concept

Read and record analog time to the nearest minute across all 60 equally spaced minute positions, matching it to correct two-digit digital minute notation while distinguishing a clock instant from elapsed duration.

After exact hours, half/quarter hours and five-minute marks, learners can count the smaller one-minute ticks accurately and combine the elapsed minute number with the hour hand's interval.

The core web opportunity is **learner-controlled inspection of a mathematical model**, not merely an illustration: A learner-controlled 60-minute dial with five-minute anchor labels and intervening small one-minute ticks. The long hand advances in exactly one-minute steps; the short hand follows proportionally rather than jumping. A textual log and keyboard selectors let the learner inspect each hand independently without relying on visual pointer accuracy.

Every example is bounded: Grade-3 conceptual and practical precision for 1-minute increments 00–59 only, using a 12-hour clock. Include small-tick counting, two-digit digital minutes, and instant-versus-duration distinction. Exclude 24-hour formatting, AM/PM determination from the clock alone, time arithmetic, seconds, variable clock precision and time-zone concerns.

## Learner journey and ordered Sections

1. **Small ticks count, too** — Develop the one-minute scale from the familiar five-minute anchors.
2. **Write the little zero** — Read minute values below ten as a two-digit digital minute field.
3. **Which hour is it really?** — Avoid late-hour off-by-one errors and distinguish a clock instant from an interval.
4. **A clock you have not seen yet** — Independently identify a new minute tick and hour.

Use a vertical single-column order of typed Resource blocks within each general Section: `text`, `markdown` and the existing `scene` Resource type. The named **MinuteMarkerExplorer** is a new proposed Scene, not yet implemented, and each appearance must be self-contained rather than depending on earlier Section state. A generic Scene renderer does not mean this particular educational interaction is available. No new Section discriminators or hidden readiness APIs are implied.

## Section-by-Section learning experience

### Section 1 — Small ticks count, too

**Learning purpose:** Develop the one-minute scale from the familiar five-minute anchors.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “You already know the long hand at 3 means 15 minutes. What if it goes two tiny marks farther?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [MinuteMarkerExplorer](./scenes/MinuteMarkerExplorer.scene-spec.md). Start at 2:15 on a 60-tick dial. Let the learner make two individual 1-minute steps to 2:16 then 2:17 while keeping the five-minute anchor at 15 labelled.

3. **`markdown` Resource (available block type):** “Fifteen minutes, plus one, plus one, makes seventeen. The clock shows 2:17. Every small mark counts one minute.”

**Meaningful learner action:** Identify tick 15, advance twice, explain 15+2 =17.

**Explanatory feedback for anticipated choices:**

- **Answer 2:15:** “The minute hand moved two one-minute ticks past the quarter mark. Add two to fifteen.”
- **Answer 2:20:** “Twenty is the next big numeral at 4. We moved only two small ticks, not all five.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 2 — Write the little zero

**Learning purpose:** Read minute values below ten as a two-digit digital minute field.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “Three tiny minute steps after five o’clock are shown. Should the digital clock show 5:3 or 5:03?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [MinuteMarkerExplorer](./scenes/MinuteMarkerExplorer.scene-spec.md). Preset 5:03 with the minute hand on the third small mark after 12 and hour hand just past 5. Learner builds a digital display with hour 5 and minute field 03.

3. **`markdown` Resource (available block type):** “Digital clocks use two digits for minutes. Three minutes after five is 5:03. The first zero is a place holder.”

**Meaningful learner action:** Select `03` instead of `3` or `30` and identify the time as an instant.

**Explanatory feedback for anticipated choices:**

- **5:30:** “Thirty minutes would put the long hand at 6. Here it moved only three tiny marks.”
- **5:3:** “We say three minutes past five, but the clock writes minutes with two digits: 03.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 3 — Which hour is it really?

**Learning purpose:** Avoid late-hour off-by-one errors and distinguish a clock instant from an interval.

**Ordered blocks (single outer column):**

1. **`markdown` Resource (available block type):** “The minute hand is two small marks beyond 8, and the short hand has passed 7 but not reached 8. Read the time. Does the phrase '42 minutes' alone tell us when this happens?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [MinuteMarkerExplorer](./scenes/MinuteMarkerExplorer.scene-spec.md). Compare 7:42 and 8:42 while minute hand stays at tick 42, then inspect 11:59 followed by 12:00. An optional side prompt distinguishes '7:42' from '42 minutes'.

3. **`text` Resource (available block type):** “It is 7:42, not 8:42, because seven is the hour already started. '42 minutes' is a length of time; 7:42 is a particular clock reading. At 11:59 it is still eleven o’clock hour.”

**Meaningful learner action:** Read both hands, distinguish clock reading from duration, predict the 11:59→12:00 boundary.

**Explanatory feedback for anticipated choices:**

- **8:42:** “The shorter hand is still between 7 and 8. It has not reached the next hour.”
- **42 minutes as exact clock time:** “Forty-two minutes describes how long. To know when, we also need the hour, such as 7:42.”
- **12:59:** “The hour hand is nearing 12, not yet past it. The long hand needs one more minute to reach 12:00.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 4 — A clock you have not seen yet

**Learning purpose:** Independently identify a new minute tick and hour.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “A new clock shows the long hand three small ticks past 5 and the short hand after 9. Write the time before uncovering the answer.”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [MinuteMarkerExplorer](./scenes/MinuteMarkerExplorer.scene-spec.md). New preset 9:28. Offer choices 9:28, 9:25, 10:28 with optional hint 'the big numeral 5 marks 25 minutes' and learner-requested final explanation.

3. **`markdown` Resource (available block type):** “It is 9:28. From 12 to 5 is twenty-five minutes. Three extra minute ticks make twenty-eight. The hour hand is still between nine and ten.”

**Meaningful learner action:** Produce 9:28 and explain 25+3 and why the hour is nine.

**Explanatory feedback for anticipated choices:**

- **9:25:** “There are three small ticks after 5, so add three minutes to twenty-five.”
- **10:28:** “The short hand is past nine but has not reached ten. The current hour is nine.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

## Custom Scene specifications

- [MinuteMarkerExplorer](./scenes/MinuteMarkerExplorer.scene-spec.md) — proposed interactive, prop-free self-contained Scene. Review its pedagogical cases, state changes, feedback, accessibility alternatives and reset. It is a written specification, **not** a React component.

## Independent transfer and reflection

At 9:28, the minute hand is three small ticks beyond 5 (25+3) and the hour hand is between 9 and 10, so the digital time is 9:28.

Present the unfamiliar case before revealing the worked result. The learner may request a hint and review a full explanation; speech input is optional to a nearby adult rather than an assumed speech-recognition system. An unscored transfer response informs learning but is not validated mastery.

## Lesson Notes — planned, not implemented

**Concise cue:** “Count fives to a numbered mark, then count extra one-minute ticks; the current hour is the one the short hand has passed.”

**Proposed unlock moment:** after the learner has examined the critical comparison in Section 3 and can explain what made the examples different. There is no verified Note entity, unlock event, persistent study sheet, spaced-repetition scheduler or offline Notes sync; the Lesson must remain understandable without those features.

## Assessment and technical handoff

These interactions are formative, explanatory and unscored. An Assessment Architect owns later Question banks, diagnostic validity, Quiz behavior, scoring thresholds and mastery evidence. A Coding Agent owns runtime Lesson/Section data, Scene implementation, translations, assets, tests, registration and packaging. The Scene's feasibility, full supported locale coverage, WCAG 2.2 AA access, true RTL, reduced motion, mobile and offline parity are **release requirements, not existing implementation claims**.

## Open editorial questions

- Confirm the Methodologist's selected scope before approving this Content.
- Review explanatory language and any potentially ambiguous model assumptions in the Scene with domain specialist.
- Review all locale-specific labels, numerals and conventions, and provide accurate genuine translations before implementation.

**Editorial status remains Provisional Draft.**
