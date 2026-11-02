# Half Past, Quarter Past, Quarter To — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not an Approved Screenwriter artifact.**

- Lesson directory: `learningApps/playground/Data/Lessons/1/halfAndQuarterHours/`
- Audience: **Grade 3**, approximately ages 8–9
- Methodologist source: [Draft Brief](./methodologist-brief.md) (**not approved**)
- Target Skills:
  - [readHalfQuarter.data.ts](../../../../data/skills/time/clock/skills/readHalfQuarter.data.ts)
- Program dependence: **None**
- Runtime/assessment status: editorial instructions only; no implementation, graded Questions or mastery signal.

## Creative and instructional premise

Read analog and digital times at quarter-hour and half-hour marks, interpreting the minute hand and the continuously advancing hour hand.

A dial with the minute hand's journey highlighted in four equal quarters and a continuously positioned short hour hand, switching between 4:15, 6:30, 7:45 and 10:45 presets. The contrast of 7:45 to 8:00 matters more than animation polish.

**Why interactivity matters:** The child can change the relevant mathematical or observational state, inspect evidence rather than accept an answer by authority, receive a reason-specific explanation, and retry without penalty. The final unfamiliar example is not a copy of the original. The experience is a standalone teaching sequence, not a Program plot, mascot activity or points-based game.

**Teaching limits:** Twelve-hour analog clock, 15-, 30- and 45-minute readings, verbal quarter past / half past / quarter to expressions and matching digital time. No arbitrary minute reading, 24-hour format, AM/PM, interval arithmetic or time-zone comparisons. Quarter terminology is conceptual and must be localized naturally. All readings are snapshots at precisely 15-minute multiples; the note about moving hour hands is explanatory, not a request for general continuous-clock computation.

## Learner journey / planned Sections

1. **Why is 3 fifteen minutes?:** Derive quarter-hour labels from equal divisions of the minute-hand circuit.
2. **Two clocks, one half-hour:** Interpret the halfway minute position and the halfway hour-hand position.
3. **The tricky quarter before the next hour:** Read quarter-to using the hour already in progress.
4. **Read a new clock, not a remembered answer:** Apply the rule to a novel quarter-to example.

Each general Section has a **single top-to-bottom column** of typed `text`, `markdown` and `scene` blocks. These Resource types are supported by the current generic renderer, but the **named ClockQuarterExplorer Scene does not exist yet** and is specified for later implementation. No new Section discriminators, Question adapters or scoring contracts are invented.

## Detailed ordered Section plan

### Section 1 — Why is 3 fifteen minutes?

**Purpose:** Derive quarter-hour labels from equal divisions of the minute-hand circuit.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “Watch the long minute hand move around the dial. One complete trip is 60 minutes. If we stop one quarter of the way, how many minutes have gone by?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [ClockQuarterExplorer](./scenes/ClockQuarterExplorer.scene-spec.md): Quarter Wheel mode: show the minute hand first at 12, then one of four equal dial arcs to numeral 3. Reveal 60 ÷ 4 = 15 only as teacher-facing rationale; child sees four 15-minute parts.

3. **`markdown`** (supported Resource type) — “One quarter of an hour is 15 minutes. When the long hand points at 3, we are 15 minutes after the hour—quarter past.”

**Meaningful learner action:** Select the first quarter arc and inspect its 15-minute length.

**Specific formative feedback, not a scored answer:**

- 3 minutes chosen: “The numerals mark hours, but on the outer minute journey, the hand has passed fifteen one-minute steps by the time it reaches 3.”
- Correct 15: “Yes. Four equal quarter-turns of 15 minutes make one 60-minute hour.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Use separately labelled minute-hand path and hour numerals to avoid conflating their roles.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 2 — Two clocks, one half-hour

**Purpose:** Interpret the halfway minute position and the halfway hour-hand position.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “At half past six, the long hand is at 6. Where would the short hand be: exactly on 6 or halfway toward 7?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [ClockQuarterExplorer](./scenes/ClockQuarterExplorer.scene-spec.md): Clock mode shows 6:00 then 6:30. Learner can reveal the hand movement and compare 'on 6' versus 'between 6 and 7'.

3. **`markdown`** (supported Resource type) — “Half an hour is 30 minutes. At 6:30, the long hand points to 6 and the short hand has moved halfway toward 7.”

**Meaningful learner action:** Predict the short-hand position at 6:30, check with the overlay.

**Specific formative feedback, not a scored answer:**

- On 6 selected: “It is already thirty minutes after six. The short hour hand has traveled halfway to seven.”
- Minute hand at 12 selected: “That would mark an exact hour, 6:00, not half past.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Expose fixed static states for reduced-motion; no timed animation is necessary.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 3 — The tricky quarter before the next hour

**Purpose:** Read quarter-to using the hour already in progress.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “It is 7:45. Is it quarter to eight, or quarter to seven? Look at where the short hand is going.”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [ClockQuarterExplorer](./scenes/ClockQuarterExplorer.scene-spec.md): Clock mode presents 7:45 with long hand at 9 and short hand three quarters of the way from 7 to 8. Provide a separate next-hour outline at 8:00 after prediction.

3. **`markdown`** (supported Resource type) — “Three quarters of an hour—45 minutes—have passed since seven. One quarter—15 minutes—remains until eight. The digital reading is still 7:45.”

**Meaningful learner action:** Select 'quarter to eight' or 'quarter to seven', then match 7:45 to a digital option.

**Specific formative feedback, not a scored answer:**

- Quarter to seven selected: “That says we are approaching seven, but the short hand has already passed seven and is approaching eight.”
- 8:45 selected: “The hour is not eight yet. The digital hour stays 7 until the minute hand completes its journey to 12.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Do not translate 'quarter to' literally when locale conventions differ: preserve precise interval meaning.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 4 — Read a new clock, not a remembered answer

**Purpose:** Apply the rule to a novel quarter-to example.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “The long hand is at 9. The short hand is between 10 and 11, closer to 11. Say the time, then write it in digits.”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [ClockQuarterExplorer](./scenes/ClockQuarterExplorer.scene-spec.md): Transfer mode: display a 10:45 analog snapshot. Learner selects between 10:45, 11:45 and 10:15, then reveals a timeline from 10:00 to 11:00.

3. **`markdown`** (supported Resource type) — “This is 10:45, quarter to eleven. It is 45 minutes after ten and 15 minutes before eleven.”

**Meaningful learner action:** Choose the reading and explain both hand positions before optional reveal.

**Specific formative feedback, not a scored answer:**

- 11:45 selected: “The short hand is nearing eleven; it has not reached eleven. The hour is still ten.”
- 10:15 selected: “At 10:15, the long hand would point to 3, not 9.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. No scores; a freely requested explanation and a fresh retry remain available.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

## Scene handoff

- [ClockQuarterExplorer](./scenes/ClockQuarterExplorer.scene-spec.md) — proposed prop-free, self-contained Scene with explicit state cases, feedback and nonvisual pathway. **The Scene type/renderer is present as a general platform capability; this particular Scene is not implemented.**
- Scene instances may use independent local preset selection within each Section, without a public props API or hidden cross-Section state. Section order itself is specified above; no invented Lesson runtime registry is implied.

## Independent transfer and reflection

10:45 is quarter to 11; the long hand is at 9 and the short hand is near—but not yet on—11.

Invite the child to describe **why** the result fits the model before revealing the full explanation. One optional hint is available. A non-reading learner can use accessible choice-and-explanation controls or speak to a nearby adult, without a speech-recognition requirement. Do not turn a voluntary reveal, an acknowledgement or a Section completion into a mastery claim.

## Planned short recall Note

“Quarter past is 15 minutes after; half past is 30 after; quarter to is 15 before the next hour.”

Proposed pedagogical unlock _point_: when the contrast in Section 3 has been examined and explained. **Status planned, not wired**: no Note entity, unlock API, persistence, offline sync or review-sheet scheduler is claimed present. A learner who does not trigger an eventual Note still gets the full teaching content.

## Locale, accessibility, offline and resource readiness

All quoted learner text and Scene feedback above are English authoring source, **not implemented locale bundles**. Complete genuine translation for all required languages, contextual terms, numeral conventions, accessible descriptions and RTL-specific meaning is mandatory before runtime delivery. The spec does not create or claim language fallback behavior. Design for WCAG 2.2 AA, keyboard and mobile touch, nonvisual equivalent participation, reduced motion, weak-device parity and complete offline access once the Lesson and Scene are packaged. New assets must be locally available; no network call is essential to these experiences.

## Editorial and engineering dependencies

**All Content is provisional Draft pending Methodologist approval.** Subsequent Screenwriter approval and independent Scene review remain required. Coding Agent owns runtime content assembly, Scene registration, tests, locale resources and eventual PWA packaging. Assessment Architect owns all Questions, Quiz behavior, scores, retries and validated evidence. This batch does **not** implement any of those capabilities.
