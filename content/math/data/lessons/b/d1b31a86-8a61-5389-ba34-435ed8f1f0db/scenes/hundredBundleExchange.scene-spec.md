# Hundred-Bundle Exchange — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Ten Tens Become a Hundred Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Reveal the causal mathematical principle in an operable first model. Discover ten tens are exactly one hundred ones and count by repeated additions of a complete ten, including crossing a hundred while keeping remaining ones unchanged.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** One group of ten has 10 objects. Ten separate ten-groups contain 100 distinct objects, and repacking them into one hundred-block preserves all 100: ten tens = one hundred = one hundred ones. Each count-by-ten move adds exactly one complete ten and keeps any remaining ones fixed. From 75: 75→85→95→105 has five ones throughout; at 105 the ten full tens regroup into one hundred. From 90: 90→100→110 has nine, then ten tens, then one hundred and one ten. +10 is never the addition of just one loose unit.

**Initial state:** Ten named bundles T1–T10 each with ten separate bead IDs, total 100. No hundred group initially; a specific Exchange action is available only for ten complete ten-bundles.

**Authoritative model:** 100 stable member IDs, with reversible grouping as ten × ten or one × hundred, group ledger, prediction and Reveal. The same objects exist throughout the exchange.

**Instructional boundary:** Nine complete bundles are 90 and cannot be traded for 100; Unbundle returns exactly ten complete bundles of ten.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — If ten bundles each have ten beads, how many beads are there?

- **Exact learner-facing invitation:** “If ten bundles each have ten beads, how many beads are there?”
- **Controllable investigation:** Inspect all ten complete bundles and accumulate 10,20,30,…,100; compare bundle count with bead count.
- **Observed correct consequence:** There are ten bundles and one hundred beads.
- **Evidence from actual model:** 10+10+10+10+10+10+10+10+10+10=100.
- **Misconception-sensitive feedback and repair:** For ten beads, show every bundle has its own ten distinct members, not one.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — Exchange ten complete tens for a single hundred-block. What happened to the count?

- **Exact learner-facing invitation:** “Exchange ten complete tens for a single hundred-block. What happened to the count?”
- **Controllable investigation:** Swap grouping from ten groups to one hundred, inspect the same 100 member IDs, and reverse the operation.
- **Observed correct consequence:** The bead count stays 100 whether written as ten tens, one hundred or one hundred ones.
- **Evidence from actual model:** 10 tens = 1 hundred = 100 ones, with zero added or removed.
- **Misconception-sensitive feedback and repair:** For one bead, expand the hundred-block and show all hundred separate original member IDs.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Inspect member IDs inside a bundle, count cumulative groups of ten, Exchange to hundred, Unbundle hundred into ten tens, Reset.
- **Invariants and consistency:** 100 stable member IDs, with reversible grouping as ten × ten or one × hundred, group ledger, prediction and Reveal. The same objects exist throughout the exchange. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

The object hierarchy is a fully accessible list of ten bundles each naming ten members, also available after conversion under the hundred group. Exchange is a native button rather than precision dragging.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. Exactly 100 unique bead IDs are present in both groupings.
2. Ten complete tens exchange for one hundred and back, preserving quantity.
3. Nine tens cannot be exchanged for hundred.
4. Reset returns to ten tens and no changes to the second Scene.
5. Beat 1 correct model: 10+10+10+10+10+10+10+10+10+10=100. Test misconception route: For ten beads, show every bundle has its own ten distinct members, not one.
6. Beat 2 correct model: 10 tens = 1 hundred = 100 ones, with zero added or removed. Test misconception route: For one bead, expand the hundred-block and show all hundred separate original member IDs.
7. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
8. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; Hundred-Bundle Exchange does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
