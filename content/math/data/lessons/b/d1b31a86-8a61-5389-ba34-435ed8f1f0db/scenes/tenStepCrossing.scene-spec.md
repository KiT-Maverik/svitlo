# Ten-Step Crossing — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Ten Tens Become a Hundred Content](../content.md), Section 3
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Transfer the rule into a changed number/item context without the first Scene's state or answer. Discover ten tens are exactly one hundred ones and count by repeated additions of a complete ten, including crossing a hundred while keeping remaining ones unchanged.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** One group of ten has 10 objects. Ten separate ten-groups contain 100 distinct objects, and repacking them into one hundred-block preserves all 100: ten tens = one hundred = one hundred ones. Each count-by-ten move adds exactly one complete ten and keeps any remaining ones fixed. From 75: 75→85→95→105 has five ones throughout; at 105 the ten full tens regroup into one hundred. From 90: 90→100→110 has nine, then ten tens, then one hundred and one ten. +10 is never the addition of just one loose unit.

**Initial state:** First case 75 as 7 tens+5 ones, second 90 as 9 tens+0 ones. At 100/105/110 hundreds, tens and ones containers are explicitly named and mathematically consistent.

**Authoritative model:** Selected preset, current total, number of added complete ten-groups, hundreds/tens/ones representation and ordered moves. +10 increments the total by 10; remaining ones are unchanged. At ten tens an explicit regrouping creates one hundred.

**Instructional boundary:** The three-digit numbers 105/110 are explicitly explained through grouped hundred/tens/ones models and are not treated as mastery of `readWrite1000`.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Start at 75; add a group of ten three times. What happens to the five loose ones?

- **Exact learner-facing invitation:** “Start at 75; add a group of ten three times. What happens to the five loose ones?”
- **Controllable investigation:** Advance 75→85→95→105, keeping five loose ones and regrouping ten complete tens into one hundred at the last step.
- **Observed correct consequence:** 75,85,95,105, with five ones unchanged all along.
- **Evidence from actual model:** 75+10=85, 85+10=95, 95+10=105; ones remainder stays 5.
- **Misconception-sensitive feedback and repair:** For 96, distinguish adding ten complete objects from adding just one. For 915, show the 105 grouping as one hundred and five.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — Start at 90 and add two groups of ten. What new grouping appears at one hundred?

- **Exact learner-facing invitation:** “Start at 90 and add two groups of ten. What new grouping appears at one hundred?”
- **Controllable investigation:** Advance 90→100→110; show ten tens become one hundred, then another ten sits beside it.
- **Observed correct consequence:** 90,100,110, with each step adding a complete ten.
- **Evidence from actual model:** 90+10=100; 100+10=110.
- **Misconception-sensitive feedback and repair:** For 91, show one entire group of ten. For 910, show ten full ten-groups rather than writing the word 'ten' after the digit nine.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Choose preset 75 or 90; Add One Ten; Remove Last Ten; Predict next number; Show hundreds/tens/ones ledger; Reveal; Reset.
- **Invariants and consistency:** Selected preset, current total, number of added complete ten-groups, hundreds/tens/ones representation and ordered moves. +10 increments the total by 10; remaining ones are unchanged. At ten tens an explicit regrouping creates one hundred. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Each move names previous total, increment +10, new value and number of hundreds/tens/ones; in RTL the numerical sequence and digit order remain correct.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. 75→85→95→105 preserves five loose ones.
2. 90→100→110 represents a whole ten each step.
3. Undo One Ten reverses ten units, not one.
4. Preset switch resets this Scene's local state.
5. Beat 1 correct model: 75+10=85, 85+10=95, 95+10=105; ones remainder stays 5. Test misconception route: For 96, distinguish adding ten complete objects from adding just one. For 915, show the 105 grouping as one hundred and five.
6. Beat 2 correct model: 90+10=100; 100+10=110. Test misconception route: For 91, show one entire group of ten. For 910, show ten full ten-groups rather than writing the word 'ten' after the digit nine.
7. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
8. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; Ten-Step Crossing does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
