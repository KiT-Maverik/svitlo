# UnitFractionWorkshop — Scene Specification

**Status:** Provisional Draft, pending Methodologist approval and separate Scene review
**Owner:** Educational Screenwriter (specification only)
**Lesson Content:** [One Part Has a Name](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Target Skills:**

- [unitFractionModel.data.ts](../../../../../data/skills/fractions/representation/skills/unitFractionModel.data.ts)
- [unitFractionRead.data.ts](../../../../../data/skills/fractions/representation/skills/unitFractionRead.data.ts)

## Intended learning interaction

An accessible strip-and-set exploration with a chosen whole, partition presets, a one-part highlight, true area/group counts and an optional fraction name reveal. Visual modes are representation changes, not different props or separate Scoring stages.

**Specific manipulation and learner control:** Choose model (strip or counter collection) and local preset with labelled buttons, select partition, group counters using accessible assign/move controls, pick fraction label, ask for area/group evidence, reset. Same self-contained Scene component owns all presets; no props.

The root Scene is proposed as a self-contained **prop-free component** with local state and no external data dependencies. Selectable instructional presets are held internally; the Lesson supplies no props, scores, correct answers or fabricated events. The Scene is not implemented.

## Visual/conceptual model and required states

| State / preset | What the learner can inspect                                          | Correct mathematical / logical condition             |
| -------------- | --------------------------------------------------------------------- | ---------------------------------------------------- |
| A equal        | 12-unit rectangular strip; three segments of four squares             | One segment can truthfully be called 1/3.            |
| A unequal      | Same strip; widths 2, 3, 7 units                                      | No segment is 1/3 by equal partition.                |
| B half         | 12-unit strip split 6+6, select one                                   | 1/2, one half; selected length 6 units.              |
| B third        | 12-unit strip split 4+4+4, select one                                 | 1/3, one third; selected length 4 units.             |
| B quarter      | 12-unit strip split 3+3+3+3, select one                               | 1/4, one quarter; selected length 3 units.           |
| C collection   | 12 counters into four labelled groups of three; select group of three | 1/4 of twelve is three counters; one of four groups. |
| D transfer     | Eight-unit ribbon split 2+2+2+2; one group selected                   | 1/4; all four parts equal.                           |

All representations preserve the chosen whole, complete inventory, reference clock or observed tokens as appropriate. Do not silently change model conditions while an answer is being explained.

## Learner journey, transitions, and recovery

1. Initialize one internally selected preset in a predictable and fully described state. Text lists give the relevant inventory/values, and essential terms are explained before manipulation.
2. Invite a prediction. It may be chosen, typed from a constrained option set or skipped in favor of an accessible "Show model" explanation without penalty.
3. Change the model in response to the learner's chosen labelled control, not an unseen randomized event. Present the new mathematical values and context.
4. On an incorrect choice, display **why the inspected state contradicts it**, preserve evidence, and allow a revised choice. Correct choices receive a reason, not only approval.
5. On a new preset, reset or isolate its local state; do not carry hidden results from another Section. A reset restores the complete initial inventory and clear labels.
6. On the Section's transfer preset, initially hide the worked conclusion, not the underlying evidence. A hint and worked answer remain available independently of correctness.

## Explanatory messages and failure modes

- **A fair piece, not just a piece — Correct on 4+4+4:** “Each part covers four squares, so one part is one of three equal parts of the strip.”
- **A fair piece, not just a piece — Incorrect on 2+3+7:** “There are three pieces, but they cover different amounts. We cannot call any of them one third of this strip.”
- **The number for one of the parts — Confuse 1/3 with 1/4:** “Count the equal sections in the whole, not the unselected sections. There are three, so one section is 1/3.”
- **The number for one of the parts — Confuse 4/1 with 1/4:** “The top 1 says one selected section. The bottom 4 says four equal sections make the whole.”
- **Can one quarter contain three counters? — Only one counter selected:** “One counter is not one of four equal groups of twelve. Each of the four groups needs three counters.”
- **Can one quarter contain three counters? — Groups 4,3,3,2:** “We have four groups, but they are not equal. Move counters until every group contains three.”
- **New whole, independent explanation — 1/2 chosen:** “That would mean two equal pieces make the whole. This ribbon has four.”
- **New whole, independent explanation — 1/3 chosen:** “Three parts would make thirds. Count the four equal lengths here.”

**Boundary:** The lesson uses the denominator only as part of reading a unit fraction; a full independent denominator-definition Skill is intentionally reserved for later coverage. The discrete-set example uses groups of identical counters and no claim about their physical area.

**Reasoning over mechanics:** Every meaningful transition must reveal exactly which mathematical condition changed; clicking, sorting, revealing, or matching on its own is not evidence of mastery.

## Nonvisual / nonmotor-dependent equivalent

Offer a text grid of exact widths (4+4+4; 2+3+7), an ordered account of group sizes, and a verbal fraction option list, providing exactly the same comparisons to learners using screen readers.

Present individual choices as clear localized native controls with discernible accessible names, visible focus and ordered traversal. Ensure all necessary exploration, comparison, answer revision, reset, hint and worked-reason actions are possible without spatial dragging, a mouse, visual color discrimination or hearing. Dynamic announcements should convey meaningful changed counts/hand positions/outcome membership without overwhelming assistive technology.

## RTL, locale, device and offline delivery

The eventual Scene requires real localized labels, explanations and audio descriptions for **every supported locale**, without fake translations, silent gaps or author-invented fallback. RTL means semantically chosen placement and reading order, not reversing numeral sequences, clock-hand geometry, tally quantities or logical outcome membership. On narrow screens, keep all values and controls discoverable without horizontal precision gestures. Respect reduced-motion and avoid expensive animation when identical evidence can be shown as a static state. Package the entire Scene and feedback locally for offline PWA use when implemented; do not imply a working offline system now.

## Implementation and verification handoff

**Status is a specification only.** A Coding Agent must later implement the prop-free component and its co-located automated Scene tests covering every defined state, boundary, reset, feedback path, supported locale, RTL, keyboard/screen-reader equivalent, reduced-motion behavior, mobile and offline readiness. Verify `scene` Resource integration against actual Code; do not invent event APIs, Note persistence, scored Questions, or Scene props. Any accessibility shortfall must be reported explicitly at implementation time under Studio Design Scene instructions.
