# Build and Read Two Digits — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Numbers Across the Tens: Read and Count to 100 Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Reveal the causal mathematical principle in an operable first model. Read and compose whole-number numerals through 100 using tens and ones, then advance or retreat exactly one unit across ten boundaries without restarting the count.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** A written two-digit numeral represents complete tens and remaining ones: 42 has four tens and two ones, whereas 24 has two tens and four ones; 70 has seven tens and zero ones and is not 7. Each neighboring number differs by exactly one: 28→29→30→31, 31→30→29→28, 98→99→100 and 100→99. At 100, ten complete tens become one hundred; this is a _three-digit endpoint_, not an example of a two-digit numeral. The selected 0–100 exercise range has boundaries but the wider number sequence does not end at 100.

**Initial state:** Three independently selectable model cases: 42 (4 ten-bundles+2 ones), 24 (2+4), 70 (7+0). Every ten bundle has ten named member objects, so its face value is unambiguous.

**Authoritative model:** Selected case, ten group IDs, loose unit IDs, selected numeral, explanation, Reset. Display always derives numeral value as 10×numberOfTens+numberOfOnes; comparisons never mutate underlying objects.

**Instructional boundary:** Treat 100 as a separate regrouped endpoint in the following Scene, not a two-digit numeral.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Four tens and two ones: which number names them?

- **Exact learner-facing invitation:** “Four tens and two ones: which number names them?”
- **Controllable investigation:** Inspect 4 tens +2 ones and choose 42; compare independently with the 2 tens+4 ones case.
- **Observed correct consequence:** 42 names four tens and two ones; 24 names two tens and four ones.
- **Evidence from actual model:** 4×10+2=42; 2×10+4=24.
- **Misconception-sensitive feedback and repair:** If 24 picked for 4 tens+2 ones, expand the four full ten-bundles and show the number of bundles is four, not two.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — Seven tens but no loose objects: does the numeral say 7 or 70?

- **Exact learner-facing invitation:** “Seven tens but no loose objects: does the numeral say 7 or 70?”
- **Controllable investigation:** Inspect seven complete ten-bundles and a zero ones bin, then select 70.
- **Observed correct consequence:** Seven tens represent 70 objects; seven would mean only 7 single objects.
- **Evidence from actual model:** 7 tens +0 ones=70, not 7.
- **Misconception-sensitive feedback and repair:** If 7 chosen, show all seven groups each contain 10 distinct items and the ones position is empty.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Choose case, select numeral, expand one ten-bundle to inspect its 10 members, show numeral and amount ledger, Reset. No precision drag.
- **Invariants and consistency:** Selected case, ten group IDs, loose unit IDs, selected numeral, explanation, Reset. Display always derives numeral value as 10×numberOfTens+numberOfOnes; comparisons never mutate underlying objects. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Text ledger explicitly names the role of tens and ones and the full number word; in RTL do not mirror the order of numeral digits.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. 42 and 24 correspond to distinct correct tens/ones models.
2. 70 has seven tens and zero loose ones.
3. Reset preserves no selection from the second Scene.
4. Beat 1 correct model: 4×10+2=42; 2×10+4=24. Test misconception route: If 24 picked for 4 tens+2 ones, expand the four full ten-bundles and show the number of bundles is four, not two.
5. Beat 2 correct model: 7 tens +0 ones=70, not 7. Test misconception route: If 7 chosen, show all seven groups each contain 10 distinct items and the ones position is empty.
6. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
7. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; Build and Read Two Digits does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
