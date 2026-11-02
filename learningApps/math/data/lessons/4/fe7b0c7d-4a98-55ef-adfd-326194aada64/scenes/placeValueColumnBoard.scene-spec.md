# Place-Value Column Board — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Subtraction Across Ten and with Place-Value Columns](../content.md), Sections 3–4
Methodologist objective(s): Align tens with tens and ones with ones, exchange one ten into ten ones without altering 32, solve 32−17 and verify the result with 15+17=32. [Methodologist Brief](../methodologist-brief.md).

## LEARNER PURPOSE AND CONCEPT

The board connects three simultaneous descriptions of **the same thirty-two**: bundles/counters, labeled place values and column marks. The child must understand why the written tens digit changes when the ones count gains ten. The written algorithm becomes a record of a real exchange rather than a mysterious instruction to “borrow”.

Child-facing explanation: “Thirty-two has three tens and two ones. We need to take away seven ones. Let's exchange one ten: two tens and twelve ones are still thirty-two.”

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Starting minuend 32 = 3×10 + 2; subtrahend 17 = 1×10 + 7. Because 2 < 7, a normal ones-column subtraction needs regrouping.
- Single exchange transforms **3 tens + 2 ones → 2 tens + 12 ones**, preserving 32. Do not show 3 tens + 12 ones as equivalent: that equals **42**, not 32.
- Correct operation after exchange: ones 12−7=5, tens 2−1=1, result 1 ten + 5 ones = 15; verify original subtraction via **15+17=32**.
- Written columns must have clear, semantically labeled tens and ones. Visually altered digits must correspond to the physical regrouping; never move a ones digit into the tens column or show “subtract the smaller digit from the larger” as a valid rule.
- The subtrahend's 17 counters are a **quantity to remove from 32**, not additional counters in the original thirty-two collection. Removed 17 + remaining 15 = original 32.
- Optional transfer: 41−16=25. Starting 4 tens+1 one becomes 3 tens+11 ones; 11−6=5 ones, 3−1=2 tens, 25+16=41. Only optional after default example explained.
- Whole-number two-digit nonnegative problems, at most one tens-to-ones exchange. No zeros-across-columns borrow chains, negative values, decimals, freeform larger numbers or unsupported “standard algorithm” generalization.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Section 3 / notice and exchange**

1. Show a labeled tens/ones board with 32 above 17, and a separate model: three ten-bundles and two ones for 32. Label 17 as “we are taking away one ten and seven ones,” clearly separated from the original whole.
2. Ask “Can we take away seven ones from the two loose ones?” Child may predict, then reveal the numerical comparison “2 ones is fewer than 7 ones.”
3. “Exchange one ten” transforms exactly one of the three ten-bundles into ten loose ones. The tens column decrements from three to two; the ones column changes from two to twelve. Display both states and explicit equality: **30+2=20+12=32**.
4. Provide optional incorrect-choice contrast: “What if we keep 3 tens and write 12 ones?” Reveal **30+12=42**, which cannot represent thirty-two. Feedback: “We used one ten to make ten ones, so only two tens remain.”
5. Ask the child to name both new place counts, or select from “2 tens and 12 ones” versus “3 tens and 12 ones”. “Show the numbers” is available without selection.
6. Only after the child can inspect the conserved representation does the Scene display the preview “Now we can subtract 7 from 12 ones.”

**Section 4 / subtract and verify**

1. A fresh self-contained entry displays **32−17**, aligned tens/ones columns, and the corresponding original 3 ten-bundles+2 ones. The answer and marks are not initially displayed.
2. “Exchange a ten” performs the same conservation-safe update (or “Show me how” reveals the update). Show “2 tens, 12 ones”.
3. “Take away 7 ones” moves/marks seven ones as removed, leaving five. Write **12−7=5** into the ones-column explanation.
4. “Take away 1 ten” marks one of the remaining two tens as removed, leaving one ten. Write **2−1=1 ten**. Final result is **1 ten + 5 ones = 15**.
5. “Check the answer” explicitly displays **15+17=32** and labels it as reverse addition to the _original_ subtraction 32−17; the sum thirty-two matches the initial quantity.
6. Offer a supported mistake inspection (not a fake quiz): If child selects “subtract 7−2=5,” say “We need to take seven ones FROM the two ones in thirty-two. We cannot reverse the numbers to avoid an exchange. Exchange one ten so we can do 12−7.” If child retains three tens after exchange, show **42** and explain missing decrement.
7. Optional new case **41−16** (only upon request), with exchange, subtraction and check **25+16=41**; all steps must reflect the new numbers. “Reset” restores the original case.
8. End with learner reflection “What changed when the ten became ones? What did not change?” Reveal “The number of tens and ones changed. The total before subtracting stayed the same.”

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: labeled Tens/Ones table or stack, source minuend and subtrahend with stable operand descriptions, countable ten-bundles and singles, exchanged loose units, removed items area, “Exchange / Undo / Subtract ones / Subtract tens / Check / Show steps / Reset” native controls, detailed ordered accessible state ledger.
- Two independent, **prop-free** Scene placements with their own initial states; guided exchange in Section 3, full computation in Section 4. This is editorial information, not a new React mode prop or Resource_Config discriminator.
- State: current example (minuend/subtrahend), grouped counters, exchanged=true/false, removed ones, removed tens, numerical step shown, current candidate/misconception explanation if any. Subtraction steps must follow valid dependencies; display why a control is not yet possible.
- Conservation invariant BEFORE subtraction: 10×tens + ones = original minuend (32 or 41). After subtraction, remaining + removed = original minuend. An exchange changes exactly −1 tens and +10 ones, without adding/removing counters.
- Alignment invariant: ones subtraction uses the minuend's ones after exchange minus subtrahend's ones; tens subtraction uses the decreased tens count after exchange minus subtrahend's tens.
- The check calculates the ORIGINAL minuend by adding final difference and original subtrahend; verification text must not misidentify 42 as thirty-two or 7−2 as the prescribed ones subtraction.
- A “trial” response is explicitly temporary. No score, threshold, mastery event or graded QuestionState; complete explanation remains available without a correct guess.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight SVG/HTML place-value bundle and digit grid with strong labels **Tens** and **Ones** and visible operand meaning. If column marks show an altered tens value and 12 ones, connect each mark to the same concrete exchange. Animation is a small learner-triggered transition rather than a continuous movie; reduced motion immediately shows exact before/after counts. Do not require a color legend, custom image, online media, video, 3D or sound. Counters removed remain countable in a labeled separate area for conservation.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Fully translate all prompts, buttons, place-value names, expanded counts, subtraction/verifications, errors, accessible statuses and Note references into every supported locale, without silent English fallbacks. Avoid a metaphor suggesting a ten has been acquired from outside the number.
- In RTL, surround equation/math with semantically appropriate direction handling; **Tens/Ones columns must be identified by actual place value**, not blindly mirrored screen positions. The accessible ordered list must name minuend, subtrahend, column and resulting count explicitly.
- Equivalent screen-reader ledger: “Thirty-two: three tens and two ones. Exchange one ten. Now thirty-two is two tens and twelve ones. Subtract seven ones: five left. Subtract one ten: one left. Result fifteen. Check fifteen plus seventeen equals thirty-two.”
- All steps keyboard-operable, focus visible, child-sized touch targets, high contrast and distinguishable borders. No drag-only movement, hover-only labels, color-only feedback, compulsory speech recognition or timed completion. 200% zoom and mobile layouts may stack the model and grid vertically while preserving exact arithmetic.
- Offline after full content/language download: calculations, translations and alternatives are local and deterministic; reduced motion and lower-performance devices deliver the same intermediate and final mathematical states, not a simplified wrong algorithm.

## ACCEPTANCE SCENARIOS

1. Initial state: 32 shown as exactly 3 tens + 2 ones; subtrahend 17 shown as 1 ten + 7 ones, never added into original minuend.
2. After one exchange: exactly 2 tens + 12 ones, still 32. A proposed 3 tens+12 ones is labeled 42 and rejected as a representation of thirty-two.
3. Ones subtraction 12−7 yields 5; tens subtraction 2−1 yields 1 ten; final difference 15.
4. Inverse check 15+17=32 restores original minuend; missing/incorrect exchanges cannot yield a false verified status.
5. Optional 41−16 uses 3 tens+11 ones, 11−6=5, 3−1=2, result 25; 25+16=41.
6. Asking “why not 7−2?” explains subtraction operand order and need to exchange, not just a wrong-label icon.
7. Undo/reset and independent Section entrypoints do not leak previous state; help/reveal always available without grading.
8. Keyboard/screen reader, RTL, high zoom, mobile, reduced motion and downloaded offline execution show the same counts, place-value changes, arithmetic and explanatory messages.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic Scene Resource and renderer are verified; **Place-Value Column Board is new and proposed**, not implemented. Editor approval of this spec precedes Design Scene skill and tests. Coding Agent must choose accurate column rendering, independent prop-free entries and per-locale contextual strings. Preserve the arithmetic/conservation invariants for all access modes. If nonvisual users cannot fully operate the representation, implementation remains blocked until an equivalent step-ledger is provided. Assessment Architect separately authorizes any graded tasks; this spec does not.
