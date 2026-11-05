# Ten Exchange Workshop — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [When Ones Make a New Ten Content](../content.md), Sections 1–4
Methodologist objectives: Observe 8+5=13, count the thirteen ones and recognize that they contain a group of ten. Exchange ten of those ones for one labeled ten and three ones without changing total thirteen. Explain both 9+4=13 and 7+6=13 with a correctly conserved ten-and-ones model. Distinguish composing a ten from adding extra objects or incorrectly leaving the original ten loose after exchanging. [Methodologist Brief](../methodologist-brief.md) (Draft, not approved).

## LEARNER PURPOSE AND CONCEPT

When two collections of ones together contain ten or more, exchange exactly ten ones for one ten while conserving the value. This lesson makes a base-ten exchange visible. It is distinct from the existing make-ten mental strategy: here the child records and justifies the _new ten_ after the ones sum, not only decomposes an addend to reach ten.

Learners are active in the mathematical transformation and see every count, intermediate step and verification. The Scene is not an unscored imitation of a Quiz; it provides concrete controlled exploration and exact feedback.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For 8+5, count thirteen one-counters, trade ten for one ten-bundle, retain three individual ones: 13 ones → 1 ten + 3 ones, both equal 13. For 9+4, 13 ones → 1T 3O. For 7+6, 13 ones → 1T 3O. Optional boundary 6+4=10 becomes 1T 0O. In decimal place value exactly TEN ones can be replaced with ONE ten; this is not a new amount, and both originals must be counted only once. All totals ≤20; no written carry marks yet.

A child may retain all thirteen loose counters plus a new ten (23), confuse ten-bundle with one object worth one, or think because a ten is created the sum grows by ten. A child may confuse the make-ten strategy (split a contributing addend) with exchanging the _sum_ of ones; show their conceptual connection but preserve the new Skill focus.

**Invariant:** Before exchange each original counter belongs to exactly one addend; after exchange 10×tens + loose ones equals the sum of original addends. For 13 the only authored exchanged state is 1T3O. Exchanging is a replacement, not an addition.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1, Thirteen Loose Ones:** Prompt “There are 8 ones in one tray and 5 in another. How many ones altogether?”. Start with eight and five uniquely identifiable one-counters in separately labeled trays, then let the learner place them in a joint counting area. Count 8+5=13; keep both contributions observable in the ledger. Learner can reveal or predict before seeing the full equality. Display: **8 + 5 = 13**. Explanation: Eight ones plus five ones make thirteen ones. The total is thirteen, even before we group any counters. Corrective feedback: A prediction of twelve overlooks a counter; fourteen counts one twice. Show a complete list of eight from the first group and five from the second.

2. **Section 2, Exchange Ten, Keep Three:** Prompt “Thirteen loose ones are hard to read quickly. Can you replace exactly ten ones with a ten-bundle?”. Allow 'Group next one' or 'Exchange ten at once' to take exactly ten of the thirteen from the loose counter area, show one 10-valued ten-bundle, and leave exactly three loose counters. Undo restores thirteen ones. Learner can reveal or predict before seeing the full equality. Display: **13 ones = 1 ten + 3 ones**. Explanation: Ten of the thirteen ones became one ten; the other three stayed. The new shape still shows thirteen, not twenty-three. Corrective feedback: If a learner claims 23, contrast 10+3=13 with the incorrect 10+13=23: the ten is replacing counters, not arriving on top of them.

3. **Section 3, Another Pair That Crosses Ten:** Prompt “Nine ones plus four ones. Does a new ten appear? How many ones stay loose?”. Independent 9+4 trial begins with thirteen ones, offers prediction of 1T3O and a learner-controlled exchange from 13 ones to 1 ten and 3 ones; compare original contributors. Learner can reveal or predict before seeing the full equality. Display: **9 + 4 = 13 = 1 ten + 3 ones**. Explanation: Nine and four make thirteen; exchanging ten produces one ten and three ones. The sum is still thirteen. Corrective feedback: One ten and four ones would mean fourteen, not thirteen; show four original new ones were included in all thirteen before exchange.

4. **Section 4, Look for the Ten in Seven Plus Six:** Prompt “Seven ones plus six ones. How many tens and ones after exchanging? What about six plus four?”. Transfer: 7+6=13 with exchange to 1T3O, then optional boundary 6+4=10 to 1T0O; learner predicts the remainder and checks both original sums. Learner can reveal or predict before seeing the full equality. Display: **7 + 6 = 13; 6 + 4 = 10**. Explanation: Seven plus six makes thirteen, so one ten and three ones. Six plus four makes exactly ten, so one ten and no loose ones. Corrective feedback: If the learner reports one ten and six ones for 7+6, show that the six were part of the total thirteen and ten were exchanged. For 6+4, there are zero ones left over.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four _independent prop-free Scene entries_, one per Section. Section mode is editorial, not a public React prop or Resource_Config discriminator. Implementer may share internal math utilities but must not share per-learner UI state across placements.
- Objects and semantics: Two source trays, a large exchange ring accepting precisely ten counters and a single ten-bundle marked 10, with an accessible running ledger; never show ten _more_ counters appearing. Use labeled objects, native controls for each action, ordered numerical text ledger, prediction buttons, explanation and Reset/Undo.
- State: Per placement: contributor counts (8+5, 9+4, 7+6 or boundary 6+4), stable counter identities, number of loose ones and ten bundles, exchange in progress, prediction, feedback visibility and Reset.
- Rules: Before exchange each original counter belongs to exactly one addend; after exchange 10×tens + loose ones equals the sum of original addends. For 13 the only authored exchanged state is 1T3O. Exchanging is a replacement, not an addition. The UI must not silently change actual mathematical objects when a child selects a wrong option; incorrect statements are explicitly identified as _trials_, not true equalities.
- All instruction available on reveal without forced guesses. No grader, Note API, score event or achievement state.

## VISUAL / AUDIO / MEDIA DIRECTION

Two source trays, a large exchange ring accepting precisely ten counters and a single ten-bundle marked 10, with an accessible running ledger; never show ten _more_ counters appearing. Render using lightweight HTML/SVG with explicit quantities and large labels, rather than remote/generated image assets. Motion is initiated by learner and may be stepped through or skipped; reduced motion shows identical before/after numerical states instantly. No WebGL, mandatory narration, video, music, external resources or reward graphics.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All prompts, errors, accessible labels, counts, status and control names genuinely translated across complete supported locale roster (English source is not fallback). Semantic LTR/RTL rules preserve order of mathematical operands and the meanings of exchanges, pairings and groups. A keyboard/switch/touch user can execute each step with large focusable controls and inspect the ordered textual state ledger; screen reader announces changes once. 200% zoom, reduced motion, child-size targets, responsive mobile, non-color-only signals and equivalent offline local computation after full download are required. No timed, drag-only or speech-recognition path.

## ACCEPTANCE SCENARIOS

1. 8+5 has exactly 13 counters before grouping.
2. Exchange replaces ten of those with a ten-bundle and leaves three loose, with preserved 13.
3. 9+4 and 7+6 each yield 13 and exchanged 1T3O.
4. 6+4 boundary yields 1T0O; no extra ones.
5. Incorrect predictions yield the documented numerical explanation without a score; retry and full reveal remain possible.
6. Reset and independent Section entries do not leak state; no counters duplicated or secretly removed.
7. Keyboard, screen-reader, semantic RTL, reduced-motion, zoom/mobile and downloaded offline state yield the same arithmetic and explanation.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Section Scene renderer exists; **Ten Exchange Workshop is proposed**, not implemented. Requires editorial approval of the new Methodologist Brief, separate approval of Content and this Scene spec, then Scene Designer implementation and own tests. Coding Agent verifies prop-free registration, genuine locale context and complete offline availability. Assessment Architect owns any scored Question separately. Editorial review: Check that the audience has mastered composing tens; distinguish crossing-ten exchange here from the previously drafted makeTenStrategy, which explicitly decomposes a second addend.
