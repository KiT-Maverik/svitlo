# Array Rotation Inspector — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Swapping Factors Without Changing the Total Content](../content.md), Sections 1–4
Methodologist objectives: Observe that one physical 3-by-4 array can be reoriented to 4-by-3 without adding or removing dots. Explain in words and numerals why 3×4 and 4×3 both equal 12. Predict that changing factor order in 2×5 yields the same product as 5×2 and verify by counting. Distinguish swapping factors from changing either factor's value; avoid claiming subtraction is commutative. [Methodologist Brief](../methodologist-brief.md), not approved.

## LEARNER PURPOSE AND CONCEPT

Demonstrate that exchanging multiplication factors preserves the product, first by reorienting the SAME rectangular array of dots, then by independently checking a different pair of factors. The number of groups and the size of each group may change roles; the total does not. The browser interaction invites evidence-based predictions and explicitly compares results, not a decorative animation or a hidden scoring event.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Commutativity: a×b=b×a in the relevant whole-number domain. The same twelve-dot rectangle can be viewed as 3 rows of 4 or 4 rows of 3; a quarter turn changes orientation, not cardinality. 2×5=10 and 5×2=10 likewise count the same ten dots arranged as 2 rows of 5 or 5 rows of 2. Rotating or reorganizing must preserve each dot exactly once, not silently copy objects. The factor roles in a 'groups × size' narrative must be relabeled when the orientation changes. Mistaking rotation for doubling; interpreting 3×4 and 4×3 as two different totals; assuming any operation is commutative (e.g., 5−2=2−5); treating a rearranged 'four groups of three' story as the original unchanged 'three groups of four' story. Numbers 0–5 and products ≤25 in models; no algebraic proof requirement. **Invariant:** The cardinality of the uniquely identified dot set is 12 for 3×4↔4×3 and 10 for 2×5↔5×2. Orientation transforms indices, never duplicates/removes dots. Product of row count × per-row count must match the actual count in both states.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Placement 1 — Keep All Twelve Dots:** Prompt “Three rows with four dots each make how many?”. Display exactly twelve dots in three ordered rows of four, with an accessible row ledger; count 4+4+4=12. Explain “Three rows of four have twelve dots. This is 3 × 4 = 12.”. **If mistaken:** For a predicted seven, show three complete +4 rows; do not hide the full count. Learner may show every step without guessing.

2. **Placement 2 — Turn the Array:** Prompt “Turn the same rectangle. How many rows and dots per row can you see now?”. A learner-triggered quarter-turn reorients the SAME twelve-dot 3×4 rectangle into four rows of three; numeric row/column ledger updates to 4×3. Explain “Four rows of three still contain twelve dots. We changed orientation, not the collection. So 4 × 3 = 12.”. **If mistaken:** If a learner predicts sixteen, report that all twelve dots were retained; none appeared or disappeared. In reduced motion, instantly swap displayed orientation and ledger. Learner may show every step without guessing.

3. **Placement 3 — A Rule Worth Testing:** Prompt “Do 3 × 4 and 4 × 3 have the same product? What changed?”. Show both readings of the one array, comparing factor labels and unchanged total. Permit stepwise dot pairing or review. Explain “The order of the two factors changed. The product stayed twelve. Multiplication lets us swap factors.”. **If mistaken:** For 'the rows stayed three', point out that new orientation has four rows; only the count of dots stayed the same. Learner may show every step without guessing.

4. **Placement 4 — Try Two and Five:** Prompt “Is 2 × 5 equal to 5 × 2? Check using ten dots.”. Create two rows of five, let child reorient into five rows of two, and inspect two complete equations with total ten. Explain “2 × 5 = 10 and 5 × 2 = 10. Both ways use all ten dots exactly once.”. **If mistaken:** For twenty, count the ten original dots and distinguish relabeling from making an extra set. Answer accessible without prediction. Learner may show every step without guessing.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four independently initialized self-contained prop-free Scene entries; Section-specific "mode" is an editorial label, not a public React prop or invented Resource field.
- Objects: labeled row/group counters, exact numerals and expressions, progressive reveal, multiple optional selection controls, accessible ordered state ledger, Reset/Undo/Explain controls.
- **State:** Array dimensions 3×4 or 2×5, orientation (original / quarter-turn), dot IDs, semantic rows and columns, comparison and reveal flags; initial state independent in each Section.
- **Invariant:** The cardinality of the uniquely identified dot set is 12 for 3×4↔4×3 and 10 for 2×5↔5×2. Orientation transforms indices, never duplicates/removes dots. Product of row count × per-row count must match the actual count in both states. Validate each user action against the model; wrong trial expressions must be marked as not matching, not shown as true identities.
- No state stores mastery, score, threshold, question grading or personal analytics. Hints and explanatory reveal are never locked by correctness.

## VISUAL / AUDIO / MEDIA DIRECTION

Compact countable dots/group containers with legible text and numeric labels. User-paced rotate/switch/reveal transitions may guide attention; under reduced motion all states and quantities appear immediately with equivalent reasoning. No required photos, generated artwork, audio, WebGL, streamed video, narrator or rewards.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, operation names, counts, status, errors and aria labels require actual translations for all supported locales; English is source only. In RTL, factor/order and group/row meanings retain correct semantics and increasing/rotating directions are explicitly described. A screen-reader user has fully operable numbered state lists and native controls giving identical choices/transformations, not just image descriptions. Visible focus, switch/keyboard/touch operation, large targets, responsive/zoomed mobile display and reduced-motion parity are required. After download all calculations, alternatives and localized feedback must run offline, without audio, color-only signals or drag/speech requirements.

## ACCEPTANCE SCENARIOS

1. Keep All Twelve Dots: Display exactly twelve dots in three ordered rows of four, with an accessible row ledger; count 4+4+4=12. Correct evidence: Three rows of four have twelve dots. This is 3 × 4 = 12.
2. Turn the Array: A learner-triggered quarter-turn reorients the SAME twelve-dot 3×4 rectangle into four rows of three; numeric row/column ledger updates to 4×3. Correct evidence: Four rows of three still contain twelve dots. We changed orientation, not the collection. So 4 × 3 = 12.
3. A Rule Worth Testing: Show both readings of the one array, comparing factor labels and unchanged total. Permit stepwise dot pairing or review. Correct evidence: The order of the two factors changed. The product stayed twelve. Multiplication lets us swap factors.
4. Try Two and Five: Create two rows of five, let child reorient into five rows of two, and inspect two complete equations with total ten. Correct evidence: 2 × 5 = 10 and 5 × 2 = 10. Both ways use all ten dots exactly once.
5. Wrong predictions trigger the specific numerical explanatory feedback for that model, with retry/reveal and no score.
6. Reset and independent Section instances do not leak state.
7. Nonvisual, keyboard, RTL, zoom, reduced-motion, low-end-device and downloaded offline states preserve the same mathematical conclusions.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic scene resource renderer exists; **Array Rotation Inspector itself is proposed** and requires upstream Methodologist/editor approval, a separate approved Scene spec, prop-free implementation and own tests. Coding Agent confirms real locale and offline wiring. Assessment Architect alone can authorize scored Questions. Editorial issue: Keep this Skill distinct from arrayModel: the array lesson teaches representation and row/column counting, whereas this Lesson targets the invariant when factor order changes. Whether to show one optional subtraction counterexample is an editorial choice; do not teach negative results.
