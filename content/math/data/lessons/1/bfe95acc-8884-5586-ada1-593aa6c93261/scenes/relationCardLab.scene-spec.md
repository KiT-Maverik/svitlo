# Relation Card Lab — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Say It With a Sign: Less, Greater, Equal Content](../content.md), Section 1
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Link each of the three glyphs to an actual pair of quantities with the choice of sign explained by visible cardinal evidence.

**Underlying number relationship:** The statement a < b means a is less than b, a > b means a is greater than b, and a = b means they have equal values. For 8 and 12, 8 < 12 is true, while 12 > 8 expresses the **same** quantitative relationship after swapping operand order. Leaving < in place after swapping makes 12 < 8 false. Equality stays equality after swapping the same values: 7 = 7 in either order. The glyphs are mathematical operators with fixed operand order; they are not words to mirror for Arabic/Hebrew layout. The mathematical pair is isolated directionally so the left operand and right operand remain the intended numbers.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** Two separate baskets of identical counters, left basket 8 and right basket 12; sign slot with <, > and =; a second independent preset with 7 and 7 displayed at different spacing. All operators appear in a dedicated mathematically left-to-right expression region even inside RTL text.

**Model and invariant:** Two canonical integer values, selected sign, numeric evidence ledger, current preset, reveal state. Displayed left and right operand identities are fixed by the math expression, not by CSS page order. No counter removal on choosing a sign.

**Numerical and pedagogical limits:** Grade 2, pairs of nonnegative integers 0–20, comparisons justified by quantity models or an equal-scale line; no chain inequalities, negative values, decimals, algebraic equation solving or crocodile-mouth mnemonic as the sole explanation.

**Boundary case / nuance:** Do not imply the sign choice is a score; a child can inspect exact quantities before or after a prediction. Equal-value counts require the same sign even when one visual row is longer.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Eight dots on the first side and twelve on the second. Which sign makes the sentence true?

1. **Invitation:** “Eight dots on the first side and twelve on the second. Which sign makes the sentence true?”
2. **Controllable investigation:** Count or inspect both groups, select < between numeral 8 and numeral 12, and show a strict lower/higher quantity comparison.
3. **Correct visible consequence:** 8 < 12, read eight is less than twelve.
4. **Worked number evidence:** 8 < 12; 12 is four more than 8, so they are not equal.
5. **Mistaken or incomplete route:** For >, show 8 is not more than 12. For =, line up eight one-to-one pairs and reveal four unmatched dots on the twelve side.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — Seven dots are spread widely and seven are close together. What sign belongs between 7 and 7?

1. **Invitation:** “Seven dots are spread widely and seven are close together. What sign belongs between 7 and 7?”
2. **Controllable investigation:** Inspect paired count ledger for both seven-dot groups and choose = despite different spacing.
3. **Correct visible consequence:** 7 = 7; layout does not change the total.
4. **Worked number evidence:** 7 = 7, whether spread or close together.
5. **Mistaken or incomplete route:** For < or >, pair all seven dots one-to-one with none unmatched, then show the two written 7s.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Choose <, > or =; inspect left/right counted values; choose 8&12 or 7&7 preset; explain/reveal; reset.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** Do not imply the sign choice is a score; a child can inspect exact quantities before or after a prediction. Equal-value counts require the same sign even when one visual row is longer.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Expose expression as 'eight less than twelve' and an isolated accessible math string '8 < 12'; fully focusable sign picker and count ledger. RTL reading direction localizes prose, not operand or operator order.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. 8 and 12 accepts <, rejects > and = with distinct reasoning.
2. 7 and 7 accepts = regardless of spacing.
3. Sign choice changes only the proposed comparison, not either underlying count.
4. A nonvisual/RTL learner can identify both operand roles and the true statement.
5. For Beat 1, verify exact expected result: 8 < 12; 12 is four more than 8, so they are not equal. Test plausible wrong response: For >, show 8 is not more than 12. For =, line up eight one-to-one pairs and reveal four unmatched dots on the twelve side.
6. For Beat 2, verify exact expected result: 7 = 7, whether spread or close together. Test plausible wrong response: For < or >, pair all seven dots one-to-one with none unmatched, then show the two written 7s.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
