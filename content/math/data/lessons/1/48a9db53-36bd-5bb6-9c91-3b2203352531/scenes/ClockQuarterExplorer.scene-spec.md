# ClockQuarterExplorer — Scene Specification

**Status:** Provisional Draft, pending Methodologist approval and separate Scene review
**Owner:** Educational Screenwriter (specification only)
**Lesson Content:** [Half Past, Quarter Past, Quarter To](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Target Skills:**

- [readHalfQuarter.data.ts](../../../../../data/skills/time/clock/skills/readHalfQuarter.data.ts)

## Intended learning interaction

A dial with the minute hand's journey highlighted in four equal quarters and a continuously positioned short hour hand, switching between 4:15, 6:30, 7:45 and 10:45 presets. The contrast of 7:45 to 8:00 matters more than animation polish.

**Specific manipulation and learner control:** Select exact-hour, first quarter, half-hour, third quarter and fully specified presets with labelled buttons; reveal the digital reading, inspect a textual hand-position transcript, and reset. No freehand minute-hand dragging. The Scene supports every lesson Section via local preset menu, without external props.

The root Scene is proposed as a self-contained **prop-free component** with local state and no external data dependencies. Selectable instructional presets are held internally; the Lesson supplies no props, scores, correct answers or fabricated events. The Scene is not implemented.

## Visual/conceptual model and required states

| State / preset     | What the learner can inspect                       | Correct mathematical / logical condition       |
| ------------------ | -------------------------------------------------- | ---------------------------------------------- |
| Initial exact hour | 4:00; long hand 12, short hand 4                   | Reference for start of the hour.               |
| Quarter past       | 4:15; long hand 3, short hand 4.25 hour-position   | Quarter past four = 4:15.                      |
| Half past          | 6:30; long hand 6, short hand 6.5 hour-position    | Half past six = 6:30.                          |
| Quarter to         | 7:45; long hand 9, short hand 7.75 hour-position   | Quarter to eight = 7:45.                       |
| Boundary reveal    | 8:00; long hand 12, short hand 8                   | After 7:45, fifteen more minutes reaches 8:00. |
| Independent        | 10:45; long hand 9, short hand 10.75 hour-position | Quarter to eleven = 10:45.                     |

All representations preserve the chosen whole, complete inventory, reference clock or observed tokens as appropriate. Do not silently change model conditions while an answer is being explained.

## Learner journey, transitions, and recovery

1. Initialize one internally selected preset in a predictable and fully described state. Text lists give the relevant inventory/values, and essential terms are explained before manipulation.
2. Invite a prediction. It may be chosen, typed from a constrained option set or skipped in favor of an accessible "Show model" explanation without penalty.
3. Change the model in response to the learner's chosen labelled control, not an unseen randomized event. Present the new mathematical values and context.
4. On an incorrect choice, display **why the inspected state contradicts it**, preserve evidence, and allow a revised choice. Correct choices receive a reason, not only approval.
5. On a new preset, reset or isolate its local state; do not carry hidden results from another Section. A reset restores the complete initial inventory and clear labels.
6. On the Section's transfer preset, initially hide the worked conclusion, not the underlying evidence. A hint and worked answer remain available independently of correctness.

## Explanatory messages and failure modes

- **Why is 3 fifteen minutes? — 3 minutes chosen:** “The numerals mark hours, but on the outer minute journey, the hand has passed fifteen one-minute steps by the time it reaches 3.”
- **Why is 3 fifteen minutes? — Correct 15:** “Yes. Four equal quarter-turns of 15 minutes make one 60-minute hour.”
- **Two clocks, one half-hour — On 6 selected:** “It is already thirty minutes after six. The short hour hand has traveled halfway to seven.”
- **Two clocks, one half-hour — Minute hand at 12 selected:** “That would mark an exact hour, 6:00, not half past.”
- **The tricky quarter before the next hour — Quarter to seven selected:** “That says we are approaching seven, but the short hand has already passed seven and is approaching eight.”
- **The tricky quarter before the next hour — 8:45 selected:** “The hour is not eight yet. The digital hour stays 7 until the minute hand completes its journey to 12.”
- **Read a new clock, not a remembered answer — 11:45 selected:** “The short hand is nearing eleven; it has not reached eleven. The hour is still ten.”
- **Read a new clock, not a remembered answer — 10:15 selected:** “At 10:15, the long hand would point to 3, not 9.”

**Boundary:** All readings are snapshots at precisely 15-minute multiples; the note about moving hour hands is explanatory, not a request for general continuous-clock computation.

**Reasoning over mechanics:** Every meaningful transition must reveal exactly which mathematical condition changed; clicking, sorting, revealing, or matching on its own is not evidence of mastery.

## Nonvisual / nonmotor-dependent equivalent

For every state, offer a textual dial state ('long hand points at 9; short hand between 7 and 8, closer to 8') and corresponding elapsed/remaining minute descriptions. Learner can predict, choose and check without observing moving hands.

Present individual choices as clear localized native controls with discernible accessible names, visible focus and ordered traversal. Ensure all necessary exploration, comparison, answer revision, reset, hint and worked-reason actions are possible without spatial dragging, a mouse, visual color discrimination or hearing. Dynamic announcements should convey meaningful changed counts/hand positions/outcome membership without overwhelming assistive technology.

## RTL, locale, device and offline delivery

The eventual Scene requires real localized labels, explanations and audio descriptions for **every supported locale**, without fake translations, silent gaps or author-invented fallback. RTL means semantically chosen placement and reading order, not reversing numeral sequences, clock-hand geometry, tally quantities or logical outcome membership. On narrow screens, keep all values and controls discoverable without horizontal precision gestures. Respect reduced-motion and avoid expensive animation when identical evidence can be shown as a static state. Package the entire Scene and feedback locally for offline PWA use when implemented; do not imply a working offline system now.

## Implementation and verification handoff

**Status is a specification only.** A Coding Agent must later implement the prop-free component and its co-located automated Scene tests covering every defined state, boundary, reset, feedback path, supported locale, RTL, keyboard/screen-reader equivalent, reduced-motion behavior, mobile and offline readiness. Verify `scene` Resource integration against actual Code; do not invent event APIs, Note persistence, scored Questions, or Scene props. Any accessibility shortfall must be reported explicitly at implementation time under Studio Design Scene instructions.
