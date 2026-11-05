# Order the Tens Cards — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Compare Tens First: Ordering Numbers to 100 Content](../content.md), Section 3
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Transfer the rule into a changed number/item context without the first Scene's state or answer. Compare and arrange two-digit numbers by the more significant tens place first and the ones only when tens are equal. Justify order using quantities rather than numeral appearance.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** Compare tens first in two-digit decimal numbers: 47<52 because four tens<five tens even though seven ones>two ones; 29<31 because two tens<three. When tens match, compare remaining ones: 63<68 since both have six tens but three ones<eight. Identical values are equal: 72=72 even if counters are rearranged. Sort 42,29,71,24 ascending as 24,29,42,71. Sort 90,86,80,69 descending as 90,86,80,69. The tens-place rule, not the last digit's graphic size, determines magnitude.

**Initial state:** First task four unique cards with values [42,29,71,24], in unsorted slots; second independent task values [90,86,80,69], with requested largest-to-smallest ordering.

**Authoritative model:** Card identity list, placement permutation, direction, pairwise comparison hints and reveal. Each original card appears exactly once in output; positions correspond to numerical order not CSS side.

**Instructional boundary:** Strictly teach numeric sorting of two-digit natural values, not alphabetical sorting of written number words. Equality of identical values remains valid when separately shown.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Arrange 42,29,71,24 from smallest to largest.

- **Exact learner-facing invitation:** “Arrange 42,29,71,24 from smallest to largest.”
- **Controllable investigation:** Build an ordered tray and check 24<29<42<71, explaining why 24 precedes 29 despite sharing two tens.
- **Observed correct consequence:** 24,29,42,71 is the correct ascending row.
- **Evidence from actual model:** 24<29<42<71.
- **Misconception-sensitive feedback and repair:** If 29 before 24, compare equal two tens and ones nine vs four. If 42 before 29, compare four tens vs two.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — Now arrange 90,86,80,69 from largest to smallest.

- **Exact learner-facing invitation:** “Now arrange 90,86,80,69 from largest to smallest.”
- **Controllable investigation:** In a new preset, place 90 first, 86 second, 80 third, 69 last; use tens then ones to justify.
- **Observed correct consequence:** 90,86,80,69 is descending and retains all four cards.
- **Evidence from actual model:** 90>86>80>69.
- **Misconception-sensitive feedback and repair:** For 80 before 86, compare equal eight tens and six additional ones in 86. For 69 before 90, compare six vs nine tens.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Choose card; place in ordinal slot; move one slot earlier/later; inspect adjacent tens/ones; reset; switch challenge; reveal.
- **Invariants and consistency:** Card identity list, placement permutation, direction, pairwise comparison hints and reveal. Each original card appears exactly once in output; positions correspond to numerical order not CSS side. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Slots are numbered semantically first/second/third/fourth with 'smallest-first' or 'largest-first' label. Keyboard selection and move actions replace dragging, including under RTL.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. 42,29,71,24 sorts to 24,29,42,71 ascending.
2. 90,86,80,69 sorts to 90,86,80,69 descending.
3. Card ID set is unchanged throughout both sorting tasks.
4. No reliance on visual right-to-left order.
5. Beat 1 correct model: 24<29<42<71. Test misconception route: If 29 before 24, compare equal two tens and ones nine vs four. If 42 before 29, compare four tens vs two.
6. Beat 2 correct model: 90>86>80>69. Test misconception route: For 80 before 86, compare equal eight tens and six additional ones in 86. For 69 before 90, compare six vs nine tens.
7. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
8. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; Order the Tens Cards does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
