# Reading Whole Hours — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Audience:** Grade 1, approximately ages 6–7.
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md) — **not approved**.
**Canonical target Skill:** [readHour.data.ts](../../../../data/skills/time/clock/skills/readHour.data.ts)
**Program dependence:** None
**Implementation:** No Lesson runtime objects, scored assessments or custom Scenes created by this editorial batch.

## Instructional concept

Read exact hours on analog clocks using the hands correctly and match those readings to digital time. The learner should not merely name a correct option: the model must make the essential distinction observable. A new situation in the final Section checks whether the learner can use the distinction without remembering the original picture.

The Section plans below specify **single-column top-to-bottom** Resource order. `text`, `markdown` and `scene` are verified Resource block types; the **ClockExplorer Scene is proposed**, not currently a registered renderer. No Question, Quiz, scoring, success gate or Program plot is defined.

## Learner journey

1. **Two hands, different jobs** — Identify which hand encodes what.
2. **Build three o'clock** — Connect a whole-hour analog pattern to digital notation.
3. **Change the hour, keep the pattern** — Generalize the whole-hour rule.
4. **Can you read a different clock?** — Independent transfer without picture-specific cues.

## Ordered Sections

### Section 1 — Two hands, different jobs

**Learning purpose:** Identify which hand encodes what.

**Vertical Resource sequence:**

1. **`text` (existing type):** “This clock has a short hour hand and a long minute hand. Their jobs are different. Which hand helps you find the hour?”

2. **`scene` (existing type; new Scene proposed):** [ClockExplorer](./scenes/ClockExplorer.scene-spec.md). Clock Explorer shows an analog clock with both hands labelled in a key. Choose 'Hour hand' or 'Minute hand' and see its role explained.

3. **`markdown` (existing type):** “The short hour hand points near the hour number. At an exact hour, the long minute hand points to 12.”

**Learner action:** Select a hand by its name, not solely by color or clicking its narrow graphic.

**Immediate explanatory feedback:** If minute hand is selected for hour: “That is the longer hand. At whole hours it points to 12, while the shorter hand tells us which hour.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 2 — Build three o'clock

**Learning purpose:** Connect a whole-hour analog pattern to digital notation.

**Vertical Resource sequence:**

1. **`text` (existing type):** “The hour hand is at 3 and the minute hand is at 12. What time is it?”

2. **`scene` (existing type; new Scene proposed):** [ClockExplorer](./scenes/ClockExplorer.scene-spec.md). Choose '3 o’clock' in Clock Explorer; hide the digital display until prediction, then reveal 3:00.

3. **`markdown` (existing type):** “It is 3:00, said ‘three o’clock’. The 00 says zero minutes after three.”

**Learner action:** Predict digital representation from labelled positions; reveal after prediction or on demand.

**Immediate explanatory feedback:** If 12:03 is selected: “The long hand points to 12 to show zero minutes, not the hour 12. The short hand is at 3.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 3 — Change the hour, keep the pattern

**Learning purpose:** Generalize the whole-hour rule.

**Vertical Resource sequence:**

1. **`markdown` (existing type):** “Now set 4:00. The shorter hand points to 4 while the longer hand is still at 12. Later, the short hand will move smoothly toward 5—not jump suddenly.”

2. **`scene` (existing type; new Scene proposed):** [ClockExplorer](./scenes/ClockExplorer.scene-spec.md). Move through 3:00, 4:00 and 5:00 using hour choice buttons. Narrated text always identifies both hand positions; no continuous motion needed to learn exact hours.

3. **`text` (existing type):** “At each exact hour, the long hand is at 12. The short hand tells which hour it is.”

**Learner action:** Compare two consecutive exact-hour snapshots.

**Immediate explanatory feedback:** If a learner claims both hands should point to 4: “Only the short hour hand points to 4; the minute hand stays at 12 at an exact hour.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 4 — Can you read a different clock?

**Learning purpose:** Independent transfer without picture-specific cues.

**Vertical Resource sequence:**

1. **`text` (existing type):** “A new clock has its short hand at 8 and its long hand at 12. Read it first before opening the answer.”

2. **`scene` (existing type; new Scene proposed):** [ClockExplorer](./scenes/ClockExplorer.scene-spec.md). Present an unlabeled 8:00 dial with accessible hand names on request; select between 8:00, 12:08 and 8:30. Hide confirmation until choice or learner-triggered reveal.

3. **`markdown` (existing type):** “The short hand at 8 tells us eight; the long hand at 12 means zero minutes. The reading is 8:00.”

**Learner action:** Explain in words or choose from independently selectable reasons.

**Immediate explanatory feedback:** For 8:30: “At half past eight, the minute hand would point at 6, not 12.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

## Custom Scene specification

- [ClockExplorer](./scenes/ClockExplorer.scene-spec.md): provides the learner-controlled model and its explanatory feedback. A Scene instance is self-contained and prop-free; repeated presentations must have independent local state. The new Scene needs future code, locale dictionaries and tests before use.

## Independent transfer

On a new dial, read the hour hand at 8 and the minute hand at 12, then explain how 8:00 differs from 12:08. Give a first attempt without immediately showing the previous example; provide an optional hint and then a complete worked explanation. This is an instructional transfer opportunity, not a validated assessment.

## Proposed Lesson Note (planned only)

**Cue:** “For exact o’clock time, the long hand is at 12; the short hand names the hour.”

Proposed editorial unlock moment: after the learner has inspected and explained the contrasting example in Section 3. Note entity/persistence/unlock events/revision schedules are not verified implemented and are **not** wired by this batch. Learners who do not engage the cue still receive the complete Lesson explanation.

## Localization, access and offline handoff

This English editorial copy is **not a multilingual runtime bundle**. A later translation workflow must supply genuine complete translations for all supported locales, including Scene explanations, controls, accessible names and model descriptions. Do not silently fall back to English. The planned equivalent nonvisual action, 2D SVG/static-state rendering, semantic RTL, readable small screens, reduced motion and locally packaged offline content are implementation acceptance gates; they are not reported as implemented.

## Editorial gates and assessment boundaries

**Provisional Draft, pending Methodologist approval.** Separate Content and Scene editorial reviews are also pending. Assessment Architect owns valid Questions/Quiz, evidence rules, scores, thresholds and analytics. Coding Agent owns Scene/renderer/locale implementation and automated tests. No Section here claims mastery based on a reveal, selection, or Note.
