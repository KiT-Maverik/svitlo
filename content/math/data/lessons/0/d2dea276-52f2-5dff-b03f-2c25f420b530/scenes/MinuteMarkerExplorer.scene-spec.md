# MinuteMarkerExplorer — Interactive Scene Specification

**Status: Provisional Draft; pending Methodologist approval and independent Scene editorial review.**
**Lesson Content:** [Reading Every Minute](../content.md)
**Methodologist:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skills:**

- [readMinute.data.ts](../../../../../data/skills/time/clock/skills/readMinute.data.ts)

## Educational purpose and intended web interaction

Read and record analog time to the nearest minute across all 60 equally spaced minute positions, matching it to correct two-digit digital minute notation while distinguishing a clock instant from elapsed duration.

A learner-controlled 60-minute dial with five-minute anchor labels and intervening small one-minute ticks. The long hand advances in exactly one-minute steps; the short hand follows proportionally rather than jumping. A textual log and keyboard selectors let the learner inspect each hand independently without relying on visual pointer accuracy.

**Self-contained design:** One independently initializable, prop-free Scene root owns all preset data, controls, explanations and interaction state. Multiple Section placements must not rely on props or state inherited from other Scenes. No invented renderer registration, engine hooks, scoring or persistence are authorized by this document.

## Exact factual models and required states

| Preset/state           | Model shown or described                                                  | Correct observation and explanatory result |
| ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| **Whole hour**         | 5:00, long hand at top (minute 00), short hand on 5                       | Exact hour; field 00                       |
| **First fine ticks**   | 5:03, long hand third small tick after 12, hour hand just past 5          | 5:03 uses two-digit field 03               |
| **Quarter anchor**     | 2:15, long hand on numeral 3                                              | 15 minutes after 2                         |
| **Two beyond quarter** | 2:17, long hand at tick 17, short hand between 2 and 3                    | 2:17 = 15+2 after two                      |
| **Beyond forty**       | 7:42, long hand at tick 42 (two after 8), hour hand 7+42/60 toward 8      | 7:42 = 40+2 after seven                    |
| **Almost new hour**    | 11:59, minute hand at tick 59 and hour hand nearly 12                     | Still 11:59, not 12:59                     |
| **Boundary**           | 12:00, long hand back at top, hour hand on 12                             | Time after one minute from 11:59           |
| **New transfer**       | 9:28, minute hand at tick 28 (three after 5), short hand between 9 and 10 | 9:28 = 25+3 after nine                     |

**Validity boundary:** Grade-3 conceptual and practical precision for 1-minute increments 00–59 only, using a 12-hour clock. Include small-tick counting, two-digit digital minutes, and instant-versus-duration distinction. Exclude 24-hour formatting, AM/PM determination from the clock alone, time arithmetic, seconds, variable clock precision and time-zone concerns.

## Learner actions, transitions and recovery

Choose a fixed preset or move the long hand by one labelled minute step; the short hand always moves consistently with it and the local twelve-hour clock advances at boundaries. Reveal/hide digital display, compare five-minute landmark to small extra ticks, reset to 5:00. No props, global clock service, drag-only interface or time-based guessing.

1. Start from one fully specified state with all its reference data visible or available via the text equivalent (whole, units, tick scale, key, or experimental conditions).
2. Let the learner predict before an automatic answer reveal where useful, but always permit a voluntary request for a worked explanation without an assessment gate.
3. For each action, preserve mathematical invariants, update the model deterministically and expose the new state and relevant numbers using both a visible and a structured accessible description.
4. Incorrect prediction or choice: explain what contradicts the claim (actual part size, the hand's position, chart's row count, or sample-space evidence) and allow an undo, retry or reset, without score or penalty.
5. Switch presets without leaking state between separate Scene instances; reset returns the current Scene to the documented initial state. A later independent transfer must hide the worked result until prediction or voluntary reveal, not hide the evidence itself.
6. No essential knowledge depends on autoplay motion, sound, fixed response time, probability of hitting a random state, or fine motor skill.

## Detailed explanatory feedback

- **Small ticks count, too: Answer 2:15.** “The minute hand moved two one-minute ticks past the quarter mark. Add two to fifteen.”
- **Small ticks count, too: Answer 2:20.** “Twenty is the next big numeral at 4. We moved only two small ticks, not all five.”
- **Write the little zero: 5:30.** “Thirty minutes would put the long hand at 6. Here it moved only three tiny marks.”
- **Write the little zero: 5:3.** “We say three minutes past five, but the clock writes minutes with two digits: 03.”
- **Which hour is it really?: 8:42.** “The shorter hand is still between 7 and 8. It has not reached the next hour.”
- **Which hour is it really?: 42 minutes as exact clock time.** “Forty-two minutes describes how long. To know when, we also need the hour, such as 7:42.”
- **Which hour is it really?: 12:59.** “The hour hand is nearing 12, not yet past it. The long hand needs one more minute to reach 12:00.”
- **A clock you have not seen yet: 9:25.** “There are three small ticks after 5, so add three minutes to twenty-five.”
- **A clock you have not seen yet: 10:28.** “The short hand is past nine but has not reached ten. The current hour is nine.”

**Model limitations:** All examples are explicitly constrained to the conditions above. Do not extrapolate to unsupported operations or claim a simulation proves mastery or statistical generalizations. For the probability Scene, recorded illustrative sequences must never be described as a live random experiment that empirically verified fairness.

## Accessible equivalent path

A screen-reader-accessible model states 'hour hand between 7 and 8, nearer 8; minute hand tick 42, two ticks after numeral 8; time candidates 7:42, 7:40, 8:42'. A native button lets the learner step by a minute and inspect updated labels rather than needing to see 60 tiny targets.

All key interactions must be fully operable with native labelled keyboard/touch controls. Screen readers need a chronological, understandable announcement of changes without a flood of redundant narration. Use text labels and descriptive math/value captions rather than color or position alone. Include visible focus, sensible order, reduced-motion/static states, adequate touch sizing and narrow-screen alternatives.

## Locale / RTL / offline / weak-device requirements

Genuine meaning-preserving translations of every label, narration, option, alt description and explanatory message are required in every supported locale; **do not implement silent English fallbacks, fake translations or missing dictionaries**. Distinguish mathematical meaning from visual LTR/RTL arrangement; fraction slash interpretation, clock hands and spinner probabilities must not be reversed by naive mirroring. The same lesson functionality must remain available on low-power/mobile devices and offline after complete package download. These are implementation acceptance criteria, not features supplied by this specification.

## Implementation boundary and test handoff

Scene is **specified, not coded**. Later Design Scene implementation requires a prop-free React component, localized content via existing context, exact required state handling, separate Scene-specific automated tests, focus/screen-reader tests, true RTL, keyboard/touch parity, reduced motion and offline validation. No Lesson_Config, Question_Config, Quiz_Config, grading, completion API, Note API or real RNG is introduced here. Editor review is required before implementation.
