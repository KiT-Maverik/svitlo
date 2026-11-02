# OutcomeExplorer — Scene Specification

**Status:** Provisional Draft, pending Methodologist approval and separate Scene review
**Owner:** Educational Screenwriter (specification only)
**Lesson Content:** [What Could the Result Be?](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Target Skills:**

- [listOutcomes.data.ts](../../../../../data/skills/probability/events/skills/listOutcomes.data.ts)

## Intended learning interaction

A set-builder inspector for a clearly stated one-step experiment. Learner changes which reported values appear in an outcome list and receives immediate evidence linked to the actual spinner or bag. No random draw is required; the list is justified from possible results, not a finite sample of spins.

**Specific manipulation and learner control:** Choose experiment preset, inspect the agreed report criterion, toggle candidate result cards, compare set to physical sectors or named tokens, request a corrective hint, reset. All states are local, and multiple section uses have independent initial state; no props, network or invented result hooks.

The root Scene is proposed as a self-contained **prop-free component** with local state and no external data dependencies. Selectable instructional presets are held internally; the Lesson supplies no props, scores, correct answers or fabricated events. The Scene is not implemented.

## Visual/conceptual model and required states

| State / preset                              | What the learner can inspect                                              | Correct mathematical / logical condition                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Spinner A                                   | Four equally sized sectors numbered 1,2,3,4; report 'one number'          | Possible outcomes {1,2,3,4}; exactly one numeral per spin.                                            |
| Faulty proposed list                        | Candidate list {1,3,4,5} for Spinner A                                    | 2 missing, 5 extra; corrected {1,2,3,4}.                                                              |
| Bag B                                       | Three tokens individually labeled red A, red B, blue C; report only color | Possible reported colors {red,blue}, no green. Two red tokens do not create two distinct red results. |
| Bag B alternate identity thought experiment | Same three tokens, report token label instead                             | Possible token identity labels {red A,red B,blue C}; different reporting criterion.                   |
| Spinner C transfer                          | Three sectors numbered 2,4,6; report number                               | Possible outcomes {2,4,6}, no 3.                                                                      |
| Empty candidate set                         | No choices selected despite available sectors                             | Incomplete; explain any one missing matching sector.                                                  |

All representations preserve the chosen whole, complete inventory, reference clock or observed tokens as appropriate. Do not silently change model conditions while an answer is being explained.

## Learner journey, transitions, and recovery

1. Initialize one internally selected preset in a predictable and fully described state. Text lists give the relevant inventory/values, and essential terms are explained before manipulation.
2. Invite a prediction. It may be chosen, typed from a constrained option set or skipped in favor of an accessible "Show model" explanation without penalty.
3. Change the model in response to the learner's chosen labelled control, not an unseen randomized event. Present the new mathematical values and context.
4. On an incorrect choice, display **why the inspected state contradicts it**, preserve evidence, and allow a revised choice. Correct choices receive a reason, not only approval.
5. On a new preset, reset or isolate its local state; do not carry hidden results from another Section. A reset restores the complete initial inventory and clear labels.
6. On the Section's transfer preset, initially hide the worked conclusion, not the underlying evidence. A hint and worked answer remain available independently of correctness.

## Explanatory messages and failure modes

- **What counts as a result? — 5 included:** “A spin always stops on one of the numbered sectors. This spinner has no sector numbered 5.”
- **What counts as a result? — 2 omitted:** “The sector labelled 2 is on the spinner, so 2 must be in our list even if we have not spun it yet.”
- **Find the missing and extra item — 1 marked missing:** “We can already see 1 in the list. Look for a number on the spinner that is absent.”
- **Find the missing and extra item — 4 marked extra:** “4 appears on the spinner, so it belongs. 5 has no matching sector.”
- **Three tokens, but how many possible colors? — Two red entries:** “There are two red tokens but only one reported color word, red. A list of different color results has red once.”
- **Three tokens, but how many possible colors? — Green included:** “No token in the bag is green, so green cannot be recorded.”
- **Three tokens, but how many possible colors? — Equal chance inferred:** “Seeing two color names does not mean those colors are equally likely. This lesson lists possibilities, not their chances.”
- **Your experiment, your complete list — 3 included:** “The numeral 3 is not on any sector. An impossible result is not part of this list.”
- **Your experiment, your complete list — 6 omitted:** “The spinner includes a sector numbered 6. That makes 6 a possible result even before any spin.”

**Boundary:** The experiment is one independent spin or draw with fully disclosed contents; the learner lists outcomes at the specified observation level only. Comparing likelihood, calculating ratios and repeated-run variation are reserved for their own Skills.

**Reasoning over mechanics:** Every meaningful transition must reveal exactly which mathematical condition changed; clicking, sorting, revealing, or matching on its own is not evidence of mastery.

## Nonvisual / nonmotor-dependent equivalent

Present the complete numbered sector inventory or labelled bag inventory as a text list and a separate checkable list of distinct reported values. Voice-independent keyboard controls give the same ability to add, remove and inspect a candidate.

Present individual choices as clear localized native controls with discernible accessible names, visible focus and ordered traversal. Ensure all necessary exploration, comparison, answer revision, reset, hint and worked-reason actions are possible without spatial dragging, a mouse, visual color discrimination or hearing. Dynamic announcements should convey meaningful changed counts/hand positions/outcome membership without overwhelming assistive technology.

## RTL, locale, device and offline delivery

The eventual Scene requires real localized labels, explanations and audio descriptions for **every supported locale**, without fake translations, silent gaps or author-invented fallback. RTL means semantically chosen placement and reading order, not reversing numeral sequences, clock-hand geometry, tally quantities or logical outcome membership. On narrow screens, keep all values and controls discoverable without horizontal precision gestures. Respect reduced-motion and avoid expensive animation when identical evidence can be shown as a static state. Package the entire Scene and feedback locally for offline PWA use when implemented; do not imply a working offline system now.

## Implementation and verification handoff

**Status is a specification only.** A Coding Agent must later implement the prop-free component and its co-located automated Scene tests covering every defined state, boundary, reset, feedback path, supported locale, RTL, keyboard/screen-reader equivalent, reduced-motion behavior, mobile and offline readiness. Verify `scene` Resource integration against actual Code; do not invent event APIs, Note persistence, scored Questions, or Scene props. Any accessibility shortfall must be reported explicitly at implementation time under Studio Design Scene instructions.
