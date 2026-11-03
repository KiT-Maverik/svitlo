# TallyTableStudio — Scene Specification

**Status:** Provisional Draft, pending Methodologist approval and separate Scene review
**Owner:** Educational Screenwriter (specification only)
**Lesson Content:** [From Tally Marks to a Table](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Target Skills:**

- [tallyMarks.data.ts](../../../../../data/skills/data/collection/skills/tallyMarks.data.ts)
- [fillSimpleTable.data.ts](../../../../../data/skills/data/collection/skills/fillSimpleTable.data.ts)

## Intended learning interaction

A compact observation stream with persistent local category tallies and a labelled three-column table; a fifth mark crosses four upright marks. Every card has its own processed state to prevent accidental double-counting. Learners may undo and replay.

**Specific manipulation and learner control:** Show next observation, choose exactly one category, undo a specific recorded observation, step through the five-group build, fill count cells through labelled buttons/numeric selection, request row explanation, reset. No DOM drag requirement and no external props/API.

The root Scene is proposed as a self-contained **prop-free component** with local state and no external data dependencies. Selectable instructional presets are held internally; the Lesson supplies no props, scores, correct answers or fabricated events. The Scene is not implemented.

## Visual/conceptual model and required states

| State / preset     | What the learner can inspect                                           | Correct mathematical / logical condition                          |
| ------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| First observation  | The first of 12 bird/cat/dog cards unprocessed; three tally rows empty | Total assigned 0.                                                 |
| Five birds         | Bird row: four vertical marks crossed by a fifth; count five           | Exactly five recorded observations, not six.                      |
| Six birds          | Bird row: complete five-group + one straight mark; count six           | 5+1=6.                                                            |
| Final dataset A    | Bird 6; Cat 4; Dog 2; 12 cards processed                               | 6+4+2=12.                                                         |
| Table mismatched   | Cat row tally 4 but editable numeral 6                                 | Show row-specific mismatch; no silent correction.                 |
| Dataset B transfer | Star 5; Moon 2; Sun 1; eight cards                                     | 5+2+1=8.                                                          |
| Undo               | One previously processed card returned to unprocessed status           | Its one tally stroke and affected count are removed consistently. |

All representations preserve the chosen whole, complete inventory, reference clock or observed tokens as appropriate. Do not silently change model conditions while an answer is being explained.

## Learner journey, transitions, and recovery

1. Initialize one internally selected preset in a predictable and fully described state. Text lists give the relevant inventory/values, and essential terms are explained before manipulation.
2. Invite a prediction. It may be chosen, typed from a constrained option set or skipped in favor of an accessible "Show model" explanation without penalty.
3. Change the model in response to the learner's chosen labelled control, not an unseen randomized event. Present the new mathematical values and context.
4. On an incorrect choice, display **why the inspected state contradicts it**, preserve evidence, and allow a revised choice. Correct choices receive a reason, not only approval.
5. On a new preset, reset or isolate its local state; do not carry hidden results from another Section. A reset restores the complete initial inventory and clear labels.
6. On the Section's transfer preset, initially hide the worked conclusion, not the underlying evidence. A hint and worked answer remain available independently of correctness.

## Explanatory messages and failure modes

- **A mark for each new card — Wrong row:** “This card shows a bird. Add its mark to Bird, not Cat; keep one mark for the one card.”
- **A mark for each new card — Extra mark attempted:** “This card has already been recorded. Move to the next card before adding another mark.”
- **A bundle of five — Six counted as five:** “Count the complete five-mark group first, then add the single new stroke: five plus one is six.”
- **A bundle of five — Crossing stroke ignored:** “The diagonal stroke is the fifth mark. It counts as one observation just like a straight mark.”
- **Put the marks into a table — Bird row labeled 5:** “Read the group of five and the one extra mark. Bird is six.”
- **Put the marks into a table — Counts swapped:** “Look at the named row, not just the number. Four tallies belong beside Cat.”
- **Put the marks into a table — Sum does not match:** “Add 6 + 4 + 2. It makes 12, the number of cards we counted once each.”
- **Fresh observations, your table — Extra ninth mark:** “There are only eight cards. Check whether one was marked twice.”
- **Fresh observations, your table — Missing mark:** “Read the observation list again and find the item without a recorded mark.”

**Boundary:** Do not introduce a new data-investigation Skill or infer comparisons from a single table as mastery of chart interpretation. Recording and reading tallies and accurately recording values in a table are two separately linked canonical Skills in this same lesson.

**Reasoning over mechanics:** Every meaningful transition must reveal exactly which mathematical condition changed; clicking, sorting, revealing, or matching on its own is not evidence of mastery.

## Nonvisual / nonmotor-dependent equivalent

Use a chronological labelled observation list with 'assigned to Bird' status; textual tallies 'one group of five plus one' and an accessible row-wise table. Learner can independently perform all actions with named buttons.

Present individual choices as clear localized native controls with discernible accessible names, visible focus and ordered traversal. Ensure all necessary exploration, comparison, answer revision, reset, hint and worked-reason actions are possible without spatial dragging, a mouse, visual color discrimination or hearing. Dynamic announcements should convey meaningful changed counts/hand positions/outcome membership without overwhelming assistive technology.

## RTL, locale, device and offline delivery

The eventual Scene requires real localized labels, explanations and audio descriptions for **every supported locale**, without fake translations, silent gaps or author-invented fallback. RTL means semantically chosen placement and reading order, not reversing numeral sequences, clock-hand geometry, tally quantities or logical outcome membership. On narrow screens, keep all values and controls discoverable without horizontal precision gestures. Respect reduced-motion and avoid expensive animation when identical evidence can be shown as a static state. Package the entire Scene and feedback locally for offline PWA use when implemented; do not imply a working offline system now.

## Implementation and verification handoff

**Status is a specification only.** A Coding Agent must later implement the prop-free component and its co-located automated Scene tests covering every defined state, boundary, reset, feedback path, supported locale, RTL, keyboard/screen-reader equivalent, reduced-motion behavior, mobile and offline readiness. Verify `scene` Resource integration against actual Code; do not invent event APIs, Note persistence, scored Questions, or Scene props. Any accessibility shortfall must be reported explicitly at implementation time under Studio Design Scene instructions.
