# Tens-First Comparator — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Compare Tens First: Ordering Numbers to 100 Content](../content.md), Section 1
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md), not yet approved
Implementation: **proposed independent, self-contained prop-free Scene**, not built

## LEARNER PURPOSE AND CONCEPT

Reveal the causal mathematical principle in an operable first model. Compare and arrange two-digit numbers by the more significant tens place first and the ones only when tens are equal. Justify order using quantities rather than numeral appearance.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Canonical mathematical rule:** Compare tens first in two-digit decimal numbers: 47<52 because four tens<five tens even though seven ones>two ones; 29<31 because two tens<three. When tens match, compare remaining ones: 63<68 since both have six tens but three ones<eight. Identical values are equal: 72=72 even if counters are rearranged. Sort 42,29,71,24 ascending as 24,29,42,71. Sort 90,86,80,69 descending as 90,86,80,69. The tens-place rule, not the last digit's graphic size, determines magnitude.

**Initial state:** Presets A=47,B=52; A=29,B=31; A=63,B=68; equal pair 72/72. Each item has explicit tens bundles and loose one identities.

**Authoritative model:** Selected pair, immutable operand values, derived tens and ones counts, selected relation and worked comparison ledger. Choosing a relation never changes the source numbers.

**Instructional boundary:** Do not teach comparing ones before tens when tens differ; 100 is a three-digit endpoint and not a two-digit sort card.

No displayed answer, aria readout, animation result or feedback may contradict the object counts, place values, numeric order, exact group membership or real face values in the model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Compare 47 and 52. Do seven ones make 47 larger?

- **Exact learner-facing invitation:** “Compare 47 and 52. Do seven ones make 47 larger?”
- **Controllable investigation:** Inspect four complete tens vs five tens, then choose 47<52. A secondary 29/31 counterexample uses nine ones vs one.
- **Observed correct consequence:** 47<52 and 29<31 because the larger tens count wins.
- **Evidence from actual model:** 47=40+7<50+2=52; 29<31.
- **Misconception-sensitive feedback and repair:** For 47>52, show the extra complete ten in 52 is greater than the difference in loose ones.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

### Beat 2 — Now compare 63 and 68; then try 72 and 72.

- **Exact learner-facing invitation:** “Now compare 63 and 68; then try 72 and 72.”
- **Controllable investigation:** Since six tens match, compare three vs eight ones; then inspect identical value 72 in varied arrangements.
- **Observed correct consequence:** 63<68 because 3<8 ones; 72=72 regardless of spacing.
- **Evidence from actual model:** 63<68; 72=72.
- **Misconception-sensitive feedback and repair:** For greater on 63/68, show the five unmatched ones in 68. For not-equal on 72, match all ten-groups and loose ones.
- **Agency:** Prediction optional. Show a complete annotated Reveal without requiring a correct answer; allow Undo/Reset and retry, never lock progress behind timed or scored success.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects and controls:** Stable unique group/counter/card/cash identifiers, explicit numbers and roles, text ledger, prediction and explanations. Select pair; inspect tens; inspect ones; select <,>,=; show grouping evidence; reveal; reset.
- **Invariants and consistency:** Selected pair, immutable operand values, derived tens and ones counts, selected relation and worked comparison ledger. Choosing a relation never changes the source numbers. All derived visual and text values use a single authoritative local state. One object cannot be counted, paired or removed twice unless an action legitimately reverses a previous change.
- **Self-contained:** No props, external mode, new Resource kind, cross-Section mutable state or unverified event API. Each new Scene's pedagogical constants must be defined inside its own future component.
- **Reset and feedback:** Reset restores this Scene's own initial state and does not change another Section. Incorrect or partial states produce a specific cause-and-effect explanation.
- **Assessment boundary:** No timed pass, Question/Quiz, scoring, mastery attribution, persistent Note unlock or fabricated analytics hook.

## VISUAL / AUDIO / MEDIA DIRECTION

Lightweight labelled HTML/SVG or semantic native controls are sufficient; maintain exact countable items and visually discoverable relationships at small sizes. If animations help, make them learner-paced with a reduced-motion instantaneous alternative. No mandatory audio, precision drag, externally fetched imagery or 3D asset. Money appears only as clearly schematic euro cards with real denominations; do not imply copyrighted currency images have been provided.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

A/B role and tens/ones ledger are labelled in words; math signs and operands are directionally isolated so RTL cannot invert the comparison accidentally.

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

## ACCEPTANCE SCENARIOS

1. 47<52 and 29<31 via tens count.
2. 63<68 via ones after equal tens.
3. 72=72 despite changing layout.
4. Selections never mutate operand values.
5. Beat 1 correct model: 47=40+7<50+2=52; 29<31. Test misconception route: For 47>52, show the extra complete ten in 52 is greater than the difference in loose ones.
6. Beat 2 correct model: 63<68; 72=72. Test misconception route: For greater on 63/68, show the five unmatched ones in 68. For not-equal on 72, match all ten-groups and loose ones.
7. Complete the same task with keyboard, switch, screen reader, RTL, reduced motion, mobile/high zoom and downloaded selected-language offline resources; the numerical result and instructional explanation are identical.
8. Reset only this Scene and verify no other Section's state changed and no score, mastery or Note event occurred.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

This is a **proposed** Scene. Generic `scene` Resource rendering exists; Tens-First Comparator does **not**. Editor approval of the Methodologist Brief, Content and this Scene spec is pending. Future implementation must verify the actual localization context and Renderer contracts before authoring any React; QA must test all examples and error branches, translations, semantic RTL, accessibility and real airplane-mode offline delivery.
