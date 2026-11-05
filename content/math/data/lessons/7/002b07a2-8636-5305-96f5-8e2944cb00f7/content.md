# Read the Clock in Five-Minute Steps — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval (not formally approved).**
**Audience:** Grade 3, approximately ages 8–9.
**Source brief:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skills:**

- [readFiveMinute.data.ts](../../../../data/skills/time/clock/skills/readFiveMinute.data.ts)
  **Lesson:** standalone, Program-neutral; no runtime Lesson, Quiz, Question, score or completed Scene is implemented.

## The learner's experience

Connect the twelve numbered clock positions to minute counts in jumps of five while locating the continuously advancing hour hand correctly.

Whole-hour and quarter-hour readings already establish hand roles; the next prerequisite step is to read five-minute precision before minute-by-minute readings.

Select one of the named presets or step the minute hand in five-minute increments with labelled Previous/Next controls; the short hand updates proportionally. Hide/reveal the matching digital time and show count-by-five progression. Maintain local state and reset to 3:00. No API, props, persistence, or time-dependent animation.

**Teaching boundary:** Clock face with twelve numbers, each arc between neighboring hour numerals worth five minutes; 5-minute increments 00–55 only. 12-hour digital notation including leading-zero minute labels. No arbitrary minute precision, elapsed-time calculations across hours, AM/PM, 24-hour clock or seconds. The activity must explain why an answer fits rather than merely reward a selection. Every comparison uses a specified whole, time scale, unit or random experiment, as appropriate. Wrong answers receive evidence-based feedback and a no-penalty retry.

## Ordered learning journey

1. **A numeral becomes five minutes:** Connect numeral-to-numeral jumps to a five-minute scale.
2. **Read both hands together:** Map a minute position and an in-between hour-hand position to a precise time.
3. **Near the next hour is not there yet:** Prevent off-by-one-hour errors when the hour hand is near the upcoming numeral.
4. **Your new clock:** Transfer independently at a different five-minute mark.

The general Sections below use a **single vertical top-to-bottom column** of typed Resource blocks. `text`, `markdown` and `scene` are available block types; the named **FiveMinuteDial Scene is proposed and not implemented**. No separate 'Theory' or 'Practice' TypeScript discriminators are invented.

## Section plan and learner-facing copy

### Section 1 — A numeral becomes five minutes

**Purpose / intended outcome:** Connect numeral-to-numeral jumps to a five-minute scale.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “We know the long hand at 3 means quarter past. How many minutes has it passed? Let's count the jumps from 12 to 3, five minutes each.”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FiveMinuteDial](./scenes/FiveMinuteDial.scene-spec.md): FiveMinuteDial preset 'Count the minute steps': mark 12→1 (05), 1→2 (10), 2→3 (15), then continue through 5 (25). Learner advances one jump and predicts the next label.

3. **`markdown` — existing Resource block type.** “One number jump is five minutes. By the time the long hand reaches 5, five jumps have passed: 5, 10, 15, 20, 25 minutes.”

**What the learner actually does:** Advance from 12 to 1 through 5 and identify 25 minutes at the numeral 5.

**Specific explanatory feedback:**

- _Five minutes at numeral 5_: “Each jump is five minutes. Five jumps make twenty-five, not five.”
- _25 minutes_: “Yes: five equal intervals times five minutes each make 25 minutes.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Expose a numeric transcript 'after 4 jumps: 20 minutes' on each action. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 2 — Read both hands together

**Purpose / intended outcome:** Map a minute position and an in-between hour-hand position to a precise time.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “The long hand is at 5. The short hand is a little after 2, not at 5. What time is it?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FiveMinuteDial](./scenes/FiveMinuteDial.scene-spec.md): Show 2:25 clock state with long hand at 5 and short hand at 2 + 25/60 of the interval toward 3; learner chooses 2:25, 2:05 or 5:25 before reveal.

3. **`text` — existing Resource block type.** “It is 2:25. The long hand tells 25 minutes, and the short hand tells us which hour has already begun: two.”

**What the learner actually does:** Read an unseen 2:25 analog dial, then explain each hand.

**Specific explanatory feedback:**

- _2:05_: “The long hand is at numeral 5, not numeral 1. Count five jumps to 25 minutes.”
- _5:25_: “The long hand shows 25 minutes; the short hand is between 2 and 3, so the hour is two.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Read-out available: 'short hand between 2 and 3, nearer 2; long hand at 5'. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 3 — Near the next hour is not there yet

**Purpose / intended outcome:** Prevent off-by-one-hour errors when the hour hand is near the upcoming numeral.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “The long hand points to 8. The short hand has moved most of the way from 6 to 7. Is it 6:40 or 7:40?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FiveMinuteDial](./scenes/FiveMinuteDial.scene-spec.md): Compare states 6:40 and 7:40 while keeping the minute hand at 8. Highlight how only the short hand's interval changes. Show 11:55 next to a revealed 12:00 boundary snapshot.

3. **`markdown` — existing Resource block type.** “The long hand at 8 means 40 minutes. The short hand has passed 6 but not reached 7, so it is 6:40. At 11:55 it has almost reached 12, but is still in the eleven o’clock hour.”

**What the learner actually does:** Distinguish 6:40 and 7:40 and predict whether 11:55 has become 12:00.

**Specific explanatory feedback:**

- _7:40 chosen for 6:40_: “The short hand has not passed 7. It is still after 6; the minute hand does not name the hour.”
- _12:55 chosen for 11:55_: “The short hand is almost at 12, not one hour beyond. It is 11:55 until the minute hand returns to 12.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Text descriptions include the short hand's interval endpoints so no subtle pointer angle must be perceived. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 4 — Your new clock

**Purpose / intended outcome:** Transfer independently at a different five-minute mark.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “A new dial shows the long hand at 7 and the short hand between 9 and 10, a little past halfway. Predict the digital time before showing the answer.”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FiveMinuteDial](./scenes/FiveMinuteDial.scene-spec.md): Transfer preset: exact 9:35 analog state; learner chooses 9:35, 7:09 or 10:35. Hide numerical minute tick values until optional hint; after answer show seven five-minute jumps.

3. **`text` — existing Resource block type.** “It is 9:35. The long hand has crossed seven five-minute intervals. The short hand has moved from nine toward ten, but ten has not started.”

**What the learner actually does:** Independently read 9:35 and explain seven jumps and the current hour.

**Specific explanatory feedback:**

- _10:35_: “The hour hand is still between nine and ten, so nine is the current hour.”
- _7:09_: “The hand at seven is the minute hand; seven jumps of five minutes make 35.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. All answer choices and reasoning can be selected through labelled buttons with no drag or time pressure. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

## New custom Scene handoff

- [FiveMinuteDial](./scenes/FiveMinuteDial.scene-spec.md) — Screenwriter's provisional design, not implemented. It is self-contained, local-state and prop-free; any preset switches are internal rather than fake public props.
- Every Section points to the same specification because its cases cover the whole conceptual progression; each rendered Scene occurrence must remain an independently initialized instance, not depend on another Section's state.

## Independent transfer

Long hand at 7 is 35 minutes, short hand after 9 means 9:35.

Give the learner a fresh problem before revealing its answer, allow one useful optional hint, and then offer a worked explanation. A learner may answer verbally to an adult or via equivalent selectable controls; no assumed speech API. Transfer is instructional practice, not proof of validated mastery.

## Proposed unlocked recall Note (not wired)

“Count five minutes for each numbered step the long hand takes from 12.”

Proposed moment: when Section 3's important contrasting example has been explored and accurately explained. **Note entity, unlock events, persistence, offline Notes sync and spaced review scheduling are planned concepts, not current implemented capabilities.** Do not block the Lesson on Note events.

## Delivery and review readiness

- **Existing typed Resources:** `text`, `markdown`, `scene` with single-column Section ordering.
- **Proposed:** the named interactive Scene, all its data presets, localized learner-facing text, accessibility alternatives, Scene tests and future offline package.
- **Not designed here:** Questions, Quiz, graded response banks, mastery evaluation, score thresholds, new Resource types, API contracts or Program storyline.

Complete authentic localization, meaningful RTL, keyboard/touch/screen-reader equivalents, reduced motion, narrow screens, WCAG 2.2 AA and offline/weak-device parity are future implementation gates, not current claims. Methodologist, Screenwriter and Scene review statuses remain Draft until explicit editor approval.
