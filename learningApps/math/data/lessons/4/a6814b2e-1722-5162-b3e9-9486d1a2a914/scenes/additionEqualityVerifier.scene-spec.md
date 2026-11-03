# Addition Equality Verifier — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Addend Content](../content.md), Sections 3 “The Box Can Be on Either Side of the Plus” and 4 “Put Your Number Back and Check”
Methodologist objective(s): Identify the unknown addend in either position and verify its candidate value by substituting into the ORIGINAL addition equality. [Methodologist Brief](../methodologist-brief.md)

## LEARNER PURPOSE AND CONCEPT

A missing addend is not “whatever appears after plus.” It is an unknown part whose value must make the entire equality true. The child sees the same relationship in different addend arrangements, then **tests the candidate inside the original equation**. Comparing the two sides makes the equals sign a relation, not just a prompt to write an answer.

Canonical child-facing statement: “The box can be first or second. Put your number into the box. Do the two sides show the same amount?”

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Valid initial examples use nonnegative whole numbers W ≤ 20, known addend K with 0 ≤ K ≤ W, unknown U=W−K. Both K + □ = W and □ + K = W have the same missing value U.
- **Section 3 fixed pair:** 5 + □ = 12 and □ + 5 = 12. Correct candidate is 7; substitution yields 5 + 7 = 12 and 7 + 5 = 12. A five-counter known part and seven-counter unknown part together comprise the original whole of twelve.
- **Section 3 optional transfer:** 4 + □ = 9 and □ + 4 = 9; candidate 5 gives 4 + 5 = 9 and 5 + 4 = 9. Wrong candidate 4 gives 4 + 4 = 8, so cannot satisfy the original sum of nine.
- **Section 4 independent task:** □ + 6 = 14, candidate set 7 / 8 / 9. Substitution checks are respectively 7 + 6 = 13 (not 14), 8 + 6 = 14 (matches), 9 + 6 = 15 (not 14). The inverse subtraction 14 − 6 = 8 explains how to find the candidate, not a replacement for checking the original addition.
- **Section 4 optional transfer:** 4 + □ = 9, candidate 5, check 4 + 5 = 9.
- For the Brief’s extreme error example, 5 + 17 = 22 ≠ 12; this can be shown as an arithmetic comparison in explanatory text, not as a new counter example outside the ≤20 initial-model scope.
- Equality is mathematical equivalence of the evaluated left and right quantities. Do not treat "=" as an operation instruction and do not move the unknown to the right side of "=" as an unrelated Skill. The two addend placements have the same result by addition commutativity in these natural-number examples; a rote commutativity lesson is out of scope.
- The Scene is instructional; its deterministic matching feedback is **not a scored Quiz or a validated mastery decision**.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Section 3 / position-comparison placement**

1. Show 5 + □ = 12, with a 12-counter whole split into five known counters and seven counters whose numeral is hidden. Prompt **“Which part is the box? What number makes the two sides equal?”**
2. Permit choosing 5, 6 or 7, or pressing “Show the parts”. Selecting 7 replaces the box and displays **“5 + 7 = 12. Both sides are 12.”** Selecting 5 gives **“5 + 5 = 10. That is not 12.”** Selecting 6 gives **“5 + 6 = 11. That is not 12.”** Do not give feedback solely as red/green or a score.
3. Present **□ + 5 = 12** with exactly the same whole and the same part sizes. Prompt **“Now the box moved. Did the whole change?”** Learner may substitute the same seven. The check reads **“7 + 5 = 12.”** Show that the total and known part did not change.
4. Show both complete equalities as consecutive, clearly labeled rows. Ask **“Is the missing number different because the box moved?”** Reveal **“No. It is still seven. Five and seven make twelve in either order.”**
5. Optional example toggle: **4 + □ = 9** and **□ + 4 = 9**, correct missing part five. Retain optional object/count support; do not presume the child knows commutativity by name.
6. Learner can reset or select “Show why” at any stage; no compulsory success gate.

**Section 4 / independent substitution placement**

1. In an independently initialized Scene, show **□ + 6 = 14** and clear text **“Find the missing part. Put your number in the box. Then check the addition.”** Do not initially expose the result.
2. Optional “Show the parts” reveals a model of fourteen counters with a known six; “Show a hint” says **“If you know the whole and one part, subtract that part from the whole.”** These aids do not change the learning goal.
3. Offer **7 / 8 / 9** as formative selections. A candidate is inserted into the **same original equation**; explicitly compute both sides and compare:
   - 7: **“7 + 6 = 13. The right side is 14. They are not equal.”**
   - 8: **“8 + 6 = 14. Both sides are 14. This number fits.”**
   - 9: **“9 + 6 = 15. That is one more than 14. They are not equal.”**
4. If the first choice is not 8, retain the visible failed substitution and ask **“Could another number make both sides fourteen?”** Allow a second choice without erasing why the earlier one failed.
5. “Show how to find it” reveals **“14 − 6 = 8; now check 8 + 6 = 14.”** Present subtraction and verification as two connected but distinct steps.
6. Optional transfer **4 + □ = 9** follows exactly the same logic, with missing value 5 and check 4 + 5 = 9.
7. End prompt **“How do you know your missing number works?”** The learner may read the verified equality, choose a reasoning sentence, type a short phrase or explain aloud to another person. No speech recognition or forced written response is required.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Object set:** accessible full original equality, missing-number box, labeled countable whole/known/unknown parts, ordered numeric candidate buttons, substitution display, evaluated left-hand total, right-hand total, explanation panel, hint, reset/try-other-example controls.
- **Placement independence:** Two self-contained, prop-free Scene entries; position-comparison and independent-check are **editorial presentations**, not a new React mode prop or Resource_Config field. Coding Agent may share internal logic while preserving initial state and locale isolation.
- **State:** current original equality and missing position, known addend, whole, candidate(s) tried, last substituted equality, result of direct numeric comparison, help level, explanation visibility, optional transfer example. Reset restores the original unseen candidate, not a hidden “correctness score”.
- **Calculation rule:** On choosing candidate C, render the original expression with □ replaced by C, evaluate LHS using addition, compare exactly with the stated RHS W, and explain the result. The displayed check must not silently rewrite the original equality as a subtraction problem.
- **Mathematical invariant:** The only _valid missing value_ for K + U = W or U + K = W in the approved nonnegative domain is W−K. Other candidates must be shown as failed substitutions with their actual sums. The UI may display an incorrect equality temporarily, but must label it clearly as **not equal**, never a true mathematical identity.
- **Control state:** The child may request explanation without choosing, switch between positions in Section 3 and switch to transfer only on explicit request. Every switch announces the original equality and resets dependent state. Cross-Section state is not shared.
- **Out-of-range cases:** No example with negative unknown or sum above twenty is set as an initial task. When evaluating a wrong candidate that would produce a sum above 20, use accurate numerical text rather than inventing uncountable/overflow counter visuals.
- **No scoring:** All responses are transitory formative comparisons, not Question_Config answer persistence, diagnostic statistics or a mastered Skill event.

## VISUAL / AUDIO / MEDIA DIRECTION

Display one large, legible expression and a simple counter part/whole representation. Show the _candidate substitution_ as a visible replacement of the box, followed by the evaluated left and right numerical values; mark **“equal”** or **“not equal”** in words as well as optional icons. Use subtle transitions to call attention to which position changed, but avoid a balance scale animation that falsely implies different operations or physical weights. Present equations in correct mathematical reading order in every layout. No required media asset, narration, video, remote computation, mascot or visual reward.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Genuine translations required for **all** learner-facing controls, hints, feedback, equation descriptions and accessible status messages in every supported locale; retain mathematically meaningful terms and a child-friendly explanation for addend/whole/sum.
- For screen readers, speak **“missing first addend plus six equals fourteen”** or **“five plus missing second addend equals twelve”** as appropriate, and on testing announce the _full substituted equality_, result and match status. A structured text comparison must enable all reasoning without viewing the counters.
- RTL: preserve the order and identities of numeric operands/equalities; do not blindly flip mathematical glyphs or make the unknown appear in the wrong addend role. Surrounding controls may use locale-specific logical ordering.
- Accessible native buttons, visible focus, high contrast, ample hit areas for children, no drag-only interactions, no compulsory typing/voice or timed expiry. Counter group sizes also available through text and optional simple numerals for dyscalculia support.
- Reduced-motion mode shows identical substituted numbers and outcomes instantly. Zoom and narrow-screen layouts may stack the model and original equality while preserving the same Section and Scene behavior.
- All expression evaluation, models, feedback and complete localized resources must function offline once downloaded. No AI checking, network call, WebGL, speech recognition or external media requirement.

## ACCEPTANCE SCENARIOS

1. **Second unknown:** 5 + □ = 12; candidate 7 → 5 + 7 = 12, explicit both sides equal.
2. **Wrong value:** candidate 5 → 5 + 5 = 10 ≠ 12, and candidate 6 → 5 + 6 = 11 ≠ 12; learner may inspect explanation and retry.
3. **First unknown:** □ + 5 = 12; candidate 7 → 7 + 5 = 12. The model retains the original twelve and five.
4. **Position change:** toggling the missing addend position never changes the fixed whole or known part, and updates the accessible equation description.
5. **New case:** □ + 6 = 14; candidate 7 → 13 vs 14 mismatch; 8 → 14 vs 14 match; 9 → 15 vs 14 mismatch. No fabricated score.
6. **Two-step solution:** after “Show how,” display **14 − 6 = 8** AND **8 + 6 = 14** explicitly, with the addition identified as verification of the original equality.
7. **Transfer:** 4 + □ = 9 yields 5; substitution 4 + 5 = 9. An erroneous 4 + 4 = 8 is not approved as equal.
8. **Help/reset:** learner can access complete explanation before answering, retry freely, reset, and revisit the other placement without state leakage.
9. **Equivalent modes:** keyboard, screen reader, RTL, reduced motion, 200% zoom, mobile screen and offline after download all display the same evaluated equalities and explanation semantics.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Generic Lesson Section scene resources and React rendering currently exist in Playground; **Addition Equality Verifier itself is proposed, not implemented**.
- Editor approves this Scene specification before Design Scene implementation; Coding Agent validates per-Section isolated prop-free entries, locale context and real typed-content integration. Each implemented Scene has its own tests and WCAG 2.2 AA access review.
- Assessment Architect must separately determine any later scored Question/Quiz item, Skill attribution, validity and result policy; do not reuse these formative choices as assessment without review.
- No new taxonomy Skill, Math source change, public Scene prop, scoring event or Note API is authorized by this script.
