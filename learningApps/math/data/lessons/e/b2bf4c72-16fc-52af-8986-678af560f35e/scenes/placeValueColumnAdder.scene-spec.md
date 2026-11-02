# Place Value Column Adder — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Add Tens and Ones in Columns Content](../content.md), Sections 1–4
Methodologist objectives: Place 27 and 35 on a labeled Tens/Ones board with each digit correctly valued. Explain why 7 ones + 5 ones = 12 ones requires recording 2 ones and carrying 1 ten. Compute 27+35=62 in columns and reconcile it with two independent counter totals. Use an aligned two-digit column to calculate 46+28=74 and verify the result with place-value decomposition. [Methodologist Brief](../methodologist-brief.md) (Draft, not yet approved).

## LEARNER PURPOSE AND CONCEPT

Explain how written column addition aligns equal place values and uses a carry mark to record a real exchange of ten ones for one ten. Start by reading two-digit place values correctly, then add 27+35=62 with an exact physical model. This lesson focuses on column notation and single ones-to-tens carry, distinct from the age-neutral broader Skill 'Addition with regrouping'.

A meaningful Scene shows the provenance of each carried unit, a consistent physical model, and a live count/value ledger. There is no correctness score, reward or forced performance gate.

## ACCURATE CONTENT AND MODEL LIMITATIONS

27 = 2 tens+7 ones, 35=3 tens+5 ones. Add ones: 7+5=12=1 ten+2 ones, record 2 ones and a carried ten. Tens: 2+3+1=6 tens, sum 62. Unregrouped example 23+14=37 demonstrates aligning tens with tens, ones with ones. Transfer 46+28: 6+8=14 → 4 ones+1 ten; 4+2+1=7 tens →74. Use only nonnegative two-digit operands and sum under 100, one carry at most, no stacked three-digit or multiple-carry work in this Lesson.

Writing 27 and 35 without aligning tens and ones can lead to adding mismatched place values. A child may write 7+5=12 as the entire ones digit '12' and then append tens; may record carry 1 but leave 12 ones as well, making 72; may add tens 2+3=5 and forget the carry, making 52. A carry is a named ten, not an arbitrary extra one. No column procedure should be shown before the physical exchange is understood.

**Conservation invariant:** Before and after regrouping the total equals the sum of the original two operands. At the ones exchange, ten of the twelve singles are replaced by a single ten-bundle; recorded ones digit is 2 and carry represents 10. Each carry is counted exactly once in tens, not retained as ten loose ones.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: Put Every Digit in Its Place:** Prompt “What does 27 mean? What does 35 mean? Put their tens and ones in the correct columns.”. A labeled 'Tens | Ones' board and exact ledger place 27 as 2T7O and 35 as 3T5O. Child selects cells with accessible buttons, checks each named place, and can inspect 23+14=37 without carry as a contrast. The written statement is **27 = 2 tens + 7 ones; 35 = 3 tens + 5 ones**. Learner-facing explanation: The tens columns count bundles of ten, and the ones columns count single objects. We add each kind to the same kind. If mistaken: If 27 is entered as 7 tens and 2 ones, calculate 72 and explain how a digit's place changes its value. Never call the two numerals interchangeable. An independent "Show explanation" control is always available.

2. **Section 2: Twelve Ones Need an Exchange:** Prompt “Seven ones plus five ones give twelve ones. Can twelve fit into the ones column?”. The child combines 7 and 5 uniquely identified singles, then exchanges exactly ten for a bundle of ten. Column ones outcome becomes digit 2, a clearly labeled 'carry 1 ten' marker appears above tens. The written statement is **7 ones + 5 ones = 12 ones = 1 ten + 2 ones**. Learner-facing explanation: We keep two ones and carry one full ten. That ten was made from ten of the twelve singles, not added from outside. If mistaken: If a child writes 12 in the ones digit slot, explain it holds only the remaining two ones; if they claim the sum grew by ten, count physical objects before and after exchange. An independent "Show explanation" control is always available.

3. **Section 3: Complete Twenty-Seven Plus Thirty-Five:** Prompt “There is one carried ten. Add it with the two tens and three tens. What is the whole sum?”. Add tens on the board: 2+3+1=6 tens; append 2 ones. Show the original 27+35 above a resulting 62 and a full invariant 20+7+30+5=62. The written statement is **27 + 35 = 62**. Learner-facing explanation: Seven plus five gave two ones and one ten. Two original tens plus three original tens plus the carried ten make six tens. Six tens and two ones make sixty-two. If mistaken: For 52, show the missed carried ten, yielding only 5T2O; for 72, show an extra ten was counted twice. An independent "Show explanation" control is always available.

4. **Section 4: Try a New Column:** Prompt “What is 46 + 28? Where does the new ten go?”. Fresh empty Tens/Ones board with operands 46 and 28 correctly aligned. Learner can place carry, record 6+8=14 as 1T4O, and compute 4+2+1=7 tens. Optional reveal always available. The written statement is **46 + 28 = 74**. Learner-facing explanation: Four tens and six ones plus two tens and eight ones make seven tens and four ones. Six plus eight gives fourteen, so the carried ten must be included. If mistaken: For 64, point to the omitted carried ten; for 84, show that one ten was counted twice. Confirm with 40+6+20+8=74. An independent "Show explanation" control is always available.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four distinct independent **prop-free Scene placements**, one per Lesson Section. Reusable internal arithmetic is allowed but public React `mode` props or fabricated Resource_Config fields are not.
- **Objects:** Semantically labeled Tens/Ones columns, linked countable counters and ten-bundles, an explicit carried-ten marker with provenance, and a persistent accessible ledger. A carry must visibly correspond to a real bundle formed from ten singles. Include base-ten object IDs, current place counts, full original addends, carry origin markers, optional prediction, reset/undo, readable calculations and feedback.
- **State:** Per independent Scene placement: operands and labeled tens/ones digits; unique counters, number of exchanged tens, carry marker and its provenance, column result digits, selected trial and reveal/reset flags.
- **Invariant:** Before and after regrouping the total equals the sum of the original two operands. At the ones exchange, ten of the twelve singles are replaced by a single ten-bundle; recorded ones digit is 2 and carry represents 10. Each carry is counted exactly once in tens, not retained as ten loose ones. On any valid action, compute exact integer place value. Wrong trials are clearly named as not matching the original sum, never shown as accepted arithmetic identities.
- Children may reveal the full model without guessing; no persistent answer record, score, Note API, success event or classification as a graded Question.

## VISUAL / AUDIO / MEDIA DIRECTION

Semantically labeled Tens/Ones columns, linked countable counters and ten-bundles, an explicit carried-ten marker with provenance, and a persistent accessible ledger. A carry must visibly correspond to a real bundle formed from ten singles. Use low-overhead SVG/HTML place-value blocks with named H/T/O headings and large digit labels. Animate only the learner-triggered exchange, or skip animation with equivalent numerical state under reduced motion. Avoid hundreds of tiny countable dots, compulsory audio, streamed media, external drawings or WebGL.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Every prompt, error, step, role, place name, label, status, aria text and Note genuinely localized for all supported locales; no English fallback. In RTL, preserve exact operand identities and place values rather than mechanically flipping number order. A fully interactive ordered text ledger mirrors _each exchange and arithmetic step_ via native keyboard/touch/switch buttons and screen reader status, providing full access without vision or dragging. Large child-friendly controls, visible focus, high contrast, zoom/mobile and reduced-motion parity. Entire deterministic operation and locale data must work offline after download on low-end devices.

## ACCEPTANCE SCENARIOS

1. 27 and 35 map to 2T7O and 3T5O; 23+14 gives 37 without carry.
2. 7+5=12 ones converts to 1T2O with ten uniquely consumed counters.
3. 27+35 yields 62, not 52/72, and 20+7+30+5=62.
4. 46+28 yields 74, with six+eight fourteen and four+two+one tens seven.
5. Incorrect predictions trigger exact correction, retry and reveal without score or mastery inference.
6. Section placements initialize/reset independently and neither double-count nor silently remove any counter.
7. Screen reader/keyboard/switch, semantic RTL, mobile/200% zoom, reduced motion and downloaded offline modes show identical numerical and conceptual results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Scene Resource rendering exists; this specific Place Value Column Adder is **proposed** and awaits editorial approval of the Draft Brief, then separate Content/Scene approval, Design Scene coding and own tests. Coding Agent validates state isolation, actual locale coverage and offline delivery. Assessment Architect owns scored Question work. Editorial review: Confirm this Lesson's single-carry Grade 2 depth and separation from `additionRegroupingAcrossPlaces`, which extends the _value-preserving exchange_ across tens and hundreds.
