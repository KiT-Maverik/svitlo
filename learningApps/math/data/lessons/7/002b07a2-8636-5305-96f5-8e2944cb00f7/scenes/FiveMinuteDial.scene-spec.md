# FiveMinuteDial — Interactive Scene Specification

**Editorial status: Provisional Draft — pending Methodologist and separate Scene approvals.**
**Lesson:** [Read the Clock in Five-Minute Steps — Content](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skills:**

- [readFiveMinute.data.ts](../../../../../data/skills/time/clock/skills/readFiveMinute.data.ts)

## Pedagogical role

Connect the twelve numbered clock positions to minute counts in jumps of five while locating the continuously advancing hour hand correctly.

**Why a custom interactive Scene is warranted:** Whole-hour and quarter-hour readings already establish hand roles; the next prerequisite step is to read five-minute precision before minute-by-minute readings. Select one of the named presets or step the minute hand in five-minute increments with labelled Previous/Next controls; the short hand updates proportionally. Hide/reveal the matching digital time and show count-by-five progression. Maintain local state and reset to 3:00. No API, props, persistence, or time-dependent animation.

This Scene is a **proposed self-contained, prop-free root**. A renderer for the generic `scene` Resource is not proof that this named Scene exists. All instructional presets are controlled internally, and no invented props, events, answer callbacks, Note persistence or global state are authorized.

## Model, essential visual states and verifiable answers

| State / preset   | Concrete representation                | Explanation / correct conclusion    |
| ---------------- | -------------------------------------- | ----------------------------------- |
| At 3:00          | Minute hand at 12, hour hand exactly 3 | 00 minutes                          |
| First step       | Long hand at 1, short hand just past 3 | 3:05; one step × five minutes       |
| Five jumps       | Long hand at 5, hour hand 2 + 25/60    | 2:25; five jumps × five = 25        |
| Late hour        | Long hand at 8, hour hand 6 + 40/60    | 6:40; not 7:40                      |
| Contrast hour    | Long hand at 8, hour hand 7 + 40/60    | 7:40; different short-hand interval |
| Almost next hour | Long hand at 11, short hand 11 + 55/60 | 11:55; not 12:55                    |
| Boundary         | Long hand at 12, short hand 12         | 12:00; exactly at boundary          |
| Transfer         | Long hand at 7, short hand 9 + 35/60   | 9:35; seven five-minute jumps       |

**Model scope and limitation:** A clock state represents a time on a twelve-hour dial; morning/evening cannot be inferred from the dial alone. Animated hand movement, if implemented, illustrates continuity but must have equal static access.

## Learner controls, transitions and no-penalty recovery

1. Start in a fully described initial preset. Announce all model conditions before a prediction: chosen whole, clock reading scale, table headings or spinner fairness conditions.
2. Make the next mathematical change depend on an explicit labelled learner action. Learner can always inspect numerical, textual and nonvisual descriptions of the same state.
3. Hold back the result label until a prediction or a voluntary reveal, then give a reason citing the governing condition—not only “Correct”.
4. Incorrect choices show the precise mismatch and allow retry, reset or exploration of another preset; no animation-only messages, automatic penalties or fake mastery transitions.
5. Switch between explicitly enumerated presets using controls **inside** this Scene, not through public props or a cross-Section state contract. Reset must restore the full initial conditions.
6. Provide a fresh independent transfer preset with optional hint and learner-triggered full reveal. The Scene remains useful when a learner skips prediction and requests explanation.

## Required explanatory feedback and errors

- **A numeral becomes five minutes / Five minutes at numeral 5:** “Each jump is five minutes. Five jumps make twenty-five, not five.”
- **A numeral becomes five minutes / 25 minutes:** “Yes: five equal intervals times five minutes each make 25 minutes.”
- **Read both hands together / 2:05:** “The long hand is at numeral 5, not numeral 1. Count five jumps to 25 minutes.”
- **Read both hands together / 5:25:** “The long hand shows 25 minutes; the short hand is between 2 and 3, so the hour is two.”
- **Near the next hour is not there yet / 7:40 chosen for 6:40:** “The short hand has not passed 7. It is still after 6; the minute hand does not name the hour.”
- **Near the next hour is not there yet / 12:55 chosen for 11:55:** “The short hand is almost at 12, not one hour beyond. It is 11:55 until the minute hand returns to 12.”
- **Your new clock / 10:35:** “The hour hand is still between nine and ten, so nine is the current hour.”
- **Your new clock / 7:09:** “The hand at seven is the minute hand; seven jumps of five minutes make 35.”

**Exclude:** Reading arbitrary individual minutes, numerical time intervals, hours–minutes unit conversions, 24-hour conventions and duration word problems are outside this Lesson.

## Equivalent participation without sight, color, drag or hearing

For each dial provide 'long minute hand at numeral 7 = 35 minutes; short hour hand between 9 and 10; hour is nine'. Offer keyboard selectable five-minute position labels and digital choices. The learner can inspect and compare without seeing a pointer.

All meaningful actions must work with keyboard and touch via clearly labelled semantic controls, with visible focus, coherent traversal and judicious state announcements. Do not require precise drag targets, perception of motion, audio or physical pointing. In a screen-reader mode, every label and explanation must preserve the actual quantitative relationships, not merely read an image title.

## Internationalization, access, mobile and offline acceptance

Supply genuine translations for all configured locales (including RTL languages), including control names, state descriptions, worked feedback, captions and any narration. No placeholder English duplicates or silent fallback. Semantic RTL affects reading/layout order but does not invert mathematical signs, fraction units, numeric ordering, clock-hand relationships or spinner probability. Support WCAG 2.2 AA, reduced motion, minimum accessible target sizes, responsive layout and equivalent low-resource/offline functioning once the PWA download infrastructure is implemented; do not assert these are already available.

## Coding Agent and Assessment Architect handoff

**Not implemented.** Future work must create the Scene module and its own co-located tests for every required state, reset, feedback, keyboard, focus, screen-reader, RTL, locale, reduced-motion, low-device and offline use case. There is no fabricated Scene API, Question/Quiz configuration, performance score or completion event. Methodologist approval must occur before this provisional specification becomes an approved implementation source.
