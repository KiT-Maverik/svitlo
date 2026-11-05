# Before and After Builder — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Minuend](../content.md), Sections 1–4
Methodologist objective(s): Recover an unknown beginning amount by combining removed and remaining parts and verify by substituting in original subtraction. [Methodologist Brief](../methodologist-brief.md), Draft.

## LEARNER PURPOSE AND CONCEPT

A child can directly observe that removed and remaining quantities partition the original whole. Returning removed counters to the remaining ones reconstructs a hidden beginning; substitution shows why the result belongs in the **first** position of □ − b = c. Visuals must preserve the distinction between original amount and current amount.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Initial missing-start case: removed 4, remaining 7, original 11. Derived 4+7=11; verified 11−4=7.
- Role contrast: □−4=7 has missing beginning 11; 11−□=7 has missing taken-away amount 4. A guess of 11 for the second box yields 11−11=0, not 7.
- Transfer: □−3=5 gives 8, verified 8−3=5. Wrong candidates 7 and 9 give 4 and 6 respectively.
- All concrete totals 0–20, nonnegative whole-number subtraction only. A guess 3 for □−4=7 gives no valid nonnegative removal interpretation; do not display it as a mathematically valid answer.
- Invariant: original = removed + remaining, and original − removed = remaining. No disappearing/duplicated counters.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Hidden beginning / Section 1:** Display exactly four counters in a “taken away” tray and seven in a “left” tray. Hide only the starting total label. Offer “Count taken away,” “Count left,” “Put them together,” “Show solution.” Combining restores eleven, with a complete accessible text count.
2. **Equation / Section 2:** Display □−4=7 and choices 3,7,11. Candidate is inserted at first position in the unchanged original equality. For 7: “7 minus 4 gives 3, not 7”; for 3: “We cannot take away four from three counters in this nonnegative model, and it would not leave seven”; for 11: “11 minus 4 leaves 7, so it fits.” Always permit reset/reveal.
3. **Role comparison / Section 3:** Show the two original equations □−4=7 and 11−□=7 in sequential named panels. Ask which quantity each box represents. Show first box = starting whole 11, second box = removed part 4. Feedback ties role to visible group, not glyph position alone.
4. **Transfer / Section 4:** Start fresh □−3=5, without giving the model unless requested. Choices 7/8/9 or “Show both parts”; explain 7−3=4, 8−3=5, 9−3=6. Conclude by showing 3+5=8 and substitution 8−3=5.
5. In all cases offer “Read the model,” “Show why,” “Reset” and non-scored hints; no mandatory guessing or success gate.

## INTERACTIVE OBJECTS, STATES AND RULES

Four independent prop-free Scene entries (one per Section); **no new React mode prop** is implied. Internal code may be shared with separated state and locale bindings. Objects: ordered group trays, total/removed/remaining ledger, optional candidate buttons, original equation, substitution line, explanation and reset/reveal. The candidate may temporarily show a failed _trial_ clearly marked “does not equal,” not a true identity. Reset returns entry-specific amounts and hidden states, not a hidden assessment score. Each action recomputes exact integer arithmetic and never changes original total except when switching to a named transfer example.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple two-tray and reunited-counter representation in lightweight HTML/SVG, large numerals and explicit part labels. A reversible group merge may animate briefly under user control; reduced motion shows identical counts instantly. Do not use a visual effect as the sole explanation, background quest, external video, audio or required image.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Every learner string and feedback, status, aria label and text ledger must be genuinely localized into all supported languages. RTL retains minuend/subtrahend roles and equation operand order rather than mechanically flipping mathematical expressions. A nonvisual learner can activate “recombine” and hear/read “four removed plus seven left equals eleven originally,” then check 11−4=7. Native keyboard/touch/switch controls, visible focus, zoomed/mobile layout, non-color feedback, reduced motion and offline local math must provide equivalent actions. No drag-only, timed or voice-recognition requirement.

## ACCEPTANCE SCENARIOS

1. Combining four removed and seven remaining produces eleven original with 4+7=11, not 3 or 7.
2. Inserting 11 into □−4=7 produces 11−4=7; 7 yields 3; 3 is invalid in the stated nonnegative model.
3. Comparing □−4=7 vs 11−□=7 identifies starting 11 vs removed 4 with explicit labels.
4. Transfer □−3=5 gives 8, and trials 7/9 give 4/6; a child may reveal the answer without guessing.
5. Reset, hints and different Section placements remain isolated; no score recorded.
6. Keyboard, screen reader, RTL, reduced motion, mobile/zoom and offline operation expose identical groups/equalities.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene Resource rendering is available; this specific Scene is proposed and awaits Methodologist Brief approval, editor-approved spec, Design Scene implementation and own tests. Coding Agent resolves independent prop-free entrypoints, real locale context and offline integration; Assessment Architect independently owns graded items.
