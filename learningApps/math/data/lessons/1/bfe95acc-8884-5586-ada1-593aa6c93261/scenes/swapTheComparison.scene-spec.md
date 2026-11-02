# Swap the Comparison — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Say It With a Sign: Less, Greater, Equal Content](../content.md), Section 3
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Demonstrate operator reversal as the consequence of swapping two different numerical operands, not visual flipping of a symbol.

**Underlying number relationship:** The statement a < b means a is less than b, a > b means a is greater than b, and a = b means they have equal values. For 8 and 12, 8 < 12 is true, while 12 > 8 expresses the **same** quantitative relationship after swapping operand order. Leaving < in place after swapping makes 12 < 8 false. Equality stays equality after swapping the same values: 7 = 7 in either order. The glyphs are mathematical operators with fixed operand order; they are not words to mirror for Arabic/Hebrew layout. The mathematical pair is isolated directionally so the left operand and right operand remain the intended numbers.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** Editable truth card 8 < 12 with an accessible Swap operands action; a preset 7 = 7; an independent new-card challenge 16 and 9. Text says exactly which operand appears first/second.

**Model and invariant:** Ordered pair [a,b], selected operator, truth explanation, scenario preset and undo. Swap exchanges a and b while preserving their numeric values; a proposal is considered true only if relation mathematically holds.

**Numerical and pedagogical limits:** Grade 2, pairs of nonnegative integers 0–20, comparisons justified by quantity models or an equal-scale line; no chain inequalities, negative values, decimals, algebraic equation solving or crocodile-mouth mnemonic as the sole explanation.

**Boundary case / nuance:** The sign must not be mirrored as a mere visual RTL effect; only the explicit user-operable Swap action changes operand order. Swapping identical values does not require changing =.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — 8 < 12 is true. Swap the numbers. Does < still tell the truth?

1. **Invitation:** “8 < 12 is true. Swap the numbers. Does < still tell the truth?”
2. **Controllable investigation:** Swap positions to [12,8] but intentionally leave < visible as an invalid proposal; learner selects > to repair it.
3. **Correct visible consequence:** 12 > 8 is true. 12 < 8 is false.
4. **Worked number evidence:** 8 < 12 and 12 > 8 express the same fact.
5. **Mistaken or incomplete route:** If < kept, show twelve objects cannot be fewer than eight; explain that the operator changes because the operands changed places.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — What happens when equal numbers swap? Then compare a new 16 and 9.

1. **Invitation:** “What happens when equal numbers swap? Then compare a new 16 and 9.”
2. **Controllable investigation:** Swap 7=7 without changing truth; then independently choose > for [16,9] and < when those values swap to [9,16].
3. **Correct visible consequence:** 7 = 7 stays true under swap; 16 > 9 and 9 < 16 are the true new relations.
4. **Worked number evidence:** 7=7; 16>9; 9<16.
5. **Mistaken or incomplete route:** If = changes for 7, both sides still have seven. If 16<9 chosen, point to 16 being the larger count and explain which sign means greater.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Swap operands; choose one of three sign buttons; explain with a count/number-line model; choose new challenge; reset.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** The sign must not be mirrored as a mere visual RTL effect; only the explicit user-operable Swap action changes operand order. Swapping identical values does not require changing =.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Explicit ordered text naming first and second operand and localized reading of each relation. Use bidirectional isolates/semantic math direction so 8<12 cannot render as a different statement in RTL.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. Swapped 8 and 12 requires > to remain true.
2. 7=7 remains true under swap.
3. Independent 16>9 and 9<16 are both true.
4. An interface direction switch does not silently swap operands or flip signs.
5. For Beat 1, verify exact expected result: 8 < 12 and 12 > 8 express the same fact. Test plausible wrong response: If < kept, show twelve objects cannot be fewer than eight; explain that the operator changes because the operands changed places.
6. For Beat 2, verify exact expected result: 7=7; 16>9; 9<16. Test plausible wrong response: If = changes for 7, both sides still have seven. If 16<9 chosen, point to 16 being the larger count and explain which sign means greater.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
