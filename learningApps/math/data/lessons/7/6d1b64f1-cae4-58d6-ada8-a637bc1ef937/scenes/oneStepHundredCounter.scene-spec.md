# One-Step Hundred Counter — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Numbers Across the Tens: Read and Count to 100 Content](../content.md), Section 3
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Transfer the rule into a changed number/item context without the first Scene's state or answer. Read and compose whole-number numerals through 100 using tens and ones, then advance or retreat exactly one unit across ten boundaries without restarting the count.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** A written two-digit numeral represents complete tens and remaining ones: 42 has four tens and two ones, whereas 24 has two tens and four ones; 70 has seven tens and zero ones and is not 7. Each neighboring number differs by exactly one: 28→29→30→31, 31→30→29→28, 98→99→100 and 100→99. At 100, ten complete tens become one hundred; this is a _three-digit endpoint_, not an example of a two-digit numeral. The selected 0–100 exercise range has boundaries but the wider number sequence does not end at 100.

**Initial state:** A contiguous 0–100 counting model at 28, with independent presets 31,98,58. Counters are grouped into full tens and loose ones; the 100 endpoint displays ten groups of ten.

**Authoritative model:** Current value n, bounded 0≤n≤100, +1/−1 actions, fixed preset, move ledger and regrouped item representation. Every move changes n by exactly one, never ten or a string-concatenation trick.

**Instructional boundary:** At 100 the model displays an endpoint, not an assertion that 101 doesn't exist. At zero, -1 is outside this Lesson's nonnegative range, with an explicit explanation.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Count from 28 to 31 one object at a time; what comes after 29?

- **Exact learner-facing invitation:** “Count from 28 to 31 one object at a time; what comes after 29?”
- **Controllable investigation:** Press +1 thrice to visit 29,30,31, then use −1 to return 30,29,28.
- **Observed correct consequence:** 29 is followed by 30; stepping backwards from 30 gives 29.
- **Evidence from actual model:** 28,29,30,31 and 31,30,29,28, each adjacent difference is one.
- **Misconception-sensitive feedback and repair:** For 210, point to 30 as three complete tens, not '2' followed by '10'. For 20 when stepping back from 30, show precisely one object removed.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — From 98, add two single objects. Then step back. What happens at 100?

- **Exact learner-facing invitation:** “From 98, add two single objects. Then step back. What happens at 100?”
- **Controllable investigation:** Take 98→99→100, group ten tens into the 100 endpoint, then 100→99. Independently try 58→59→60.
- **Observed correct consequence:** 99 is followed by 100, and 100→99 is one backward move; 59→60 is also only one increment.
- **Evidence from actual model:** 98+1=99, 99+1=100, 100−1=99; 58→59→60.
- **Misconception-sensitive feedback and repair:** For 101 directly after 99, reveal the skipped 100. For 910, count the ten full tens as one hundred rather than joining digits as text.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Choose starting preset, +1, −1, inspect ten/one groups, read ordered step log, Reset and Reveal.
- **Invariants and consistency:** Current value n, bounded 0≤n≤100, +1/−1 actions, fixed preset, move ledger and regrouped item representation. Every move changes n by exactly one, never ten or a string-concatenation trick. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Every action names before number, action, new number, countable objects and any regrouping; keyboard/switch/touch and screen reader can traverse the exact same sequence.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. 28→29→30→31 and reverse are exactly one-unit transitions.
2. 98→99→100→99 crosses the endpoint correctly.
3. New 58→59→60 case has a new initial state.
4. Range boundaries are stated as display limits only.
5. Beat 1 correct model: 28,29,30,31 and 31,30,29,28, each adjacent difference is one. Test misconception route: For 210, point to 30 as three complete tens, not '2' followed by '10'. For 20 when stepping back from 30, show precisely one object removed.
6. Beat 2 correct model: 98+1=99, 99+1=100, 100−1=99; 58→59→60. Test misconception route: For 101 directly after 99, reveal the skipped 100. For 910, count the ten full tens as one hundred rather than joining digits as text.
7. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
8. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; One-Step Hundred Counter does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
