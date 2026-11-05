# Addend Swap Workbench — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Swap the Addends, Keep the Sum Content](../content.md), Sections 1–4
Methodologist objectives: Count two disjoint groups in either order and justify that 3+5 and 5+3 both equal eight. State which values swapped places and what remained unchanged, using the term addends after concrete exploration. Contrast swapping factors/addends with altering a quantity; see that 3+6 differs from 3+5. Use a fresh model to find 4+7 and 7+4 and explain why both equal eleven. [Methodologist Brief](../methodologist-brief.md), pending approval.

## LEARNER PURPOSE AND CONCEPT

Help the learner discover and justify that swapping addends changes their order, not the total: a+b=b+a. Use two clearly bounded disjoint collections that are counted once, first in one order then the other. Distinguish reordering from physically adding more counters.

Learner actions must make the numerical structure explicit, including all contributions and complete before/after states. The Scene is a formative explanatory exploration, not an assessment widget.

## ACCURATE CONTENT AND MODEL LIMITATIONS

The commutative property holds for addition: a+b=b+a. For children use nonnegative whole-number addends and totals ≤20: 3+5=5+3=8, 4+7=7+4=11, and a comparison 3+6=9. A change in temporal order can change a story's wording, but not the arithmetic total of the two quantities. Do not imply commutativity of subtraction, or introduce negative-number examples.

**Math invariants:** Reordering 3/5 or 4/7 changes expression order and reading labels ONLY, never counter cardinality. A value-change action from 3+5 to 3+6 adds exactly one counter and changes total from eight to nine.

**Potential wrong models:** Confusing a swap with creating a second set of counters (doubling the total), thinking 3+5=3+6 because both have three first, mistaking the '+' sign as direction-sensitive, assuming reordering an increase story keeps its temporal events unchanged. Present two collection trays for clean interpretation; no formal algebraic proof necessary. The actual expression, components and result must remain numerically true at every accepted transition.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: Count Both Groups.** Prompt “One tray holds three counters. Another holds five. How many are there in both?”. Show separate trays with exactly 3 and 5 countable objects, names 'first tray three' and 'second tray five'; count 3 then 5, finishing at eight. The result is **3 + 5 = 8**; learner explanation: Three from one tray and five from the other make eight. These are the same eight objects whichever tray we count first. If misunderstood: An answer of five counts one tray only; an answer of nine double-counts an object. Highlight all eight once with a count ledger. Native step/reveal/reset controls permit completion without a predicted answer.

2. **Section 2: Put Five First.** Prompt “What if we count the five first and the three second? Did any counters arrive?”. A learner-selected 'Swap order' button switches the expression 3+5 to 5+3 and reading order of tray descriptions while leaving the underlying eight counter IDs unchanged. The result is **5 + 3 = 8**; learner explanation: Five plus three also equals eight. We swapped which addend came first, not how many objects we had. If misunderstood: If the learner predicts ten, show no counters were duplicated; if three, show both groups still count. Native step/reveal/reset controls permit completion without a predicted answer.

3. **Section 3: Swap or Change a Quantity?.** Prompt “Compare swapping 3 and 5 with changing the five into six. Which action keeps the sum?”. Offer two explicit actions: 'Swap the two groups' gives 5+3=8; 'Add one to the second group' gives 3+6=9. Read an ordered ledger describing whether object count changed. The result is **3 + 5 = 5 + 3 = 8; 3 + 6 = 9**; learner explanation: Swapping the addends keeps the total eight. Adding one more object makes nine; that is not only a swap. If misunderstood: If the child says all changes keep eight, show the new ninth dot in the changed-quantity case. Swapping no dot is newly added. Native step/reveal/reset controls permit completion without a predicted answer.

4. **Section 4: A New Pair: Four and Seven.** Prompt “Four counters plus seven makes how many? Will seven plus four have the same total?”. Display 4+7 as two trays, 11 distinct counters. Before showing result ask predicted sum and swap; reveal both 4+7=11 and 7+4=11 through same counter IDs. The result is **4 + 7 = 7 + 4 = 11**; learner explanation: There are eleven counters in both orders. We can choose whichever addend to count first; the sum is eleven. If misunderstood: Ten omits a counter, twelve double-counts one. A stepwise count shows four then seven with complete total. Native step/reveal/reset controls permit completion without a predicted answer.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Four independent prop-free Scene entries** with their own initial examples and internal state; do not introduce a public `mode` prop or new Resource_Config discriminators.
- **Objects:** numbered countable counter IDs, trays or ten-frame as appropriate, explicit addend/remaining labels, full original equality, optional candidate controls and deterministic textual result ledger, reset and explanation panels.
- **State:** pair of nonnegative addend counts, unique counter IDs in each tray, displayed term order, optional added counter for comparison, selected prediction and explanation visibility; each Scene placement independent.
- **Invariant:** Reordering 3/5 or 4/7 changes expression order and reading labels ONLY, never counter cardinality. A value-change action from 3+5 to 3+6 adds exactly one counter and changes total from eight to nine. On every accepted transition compute the correct quantity, and mark a mistaken prediction as a _trial_ rather than changing the model to make it true.
- Children can get the full worked explanation without guessing; no stored score, threshold, mastery event, reward or Quiz/Question object.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple high-contrast HTML/SVG counters, ten-frame or separate group trays with visible quantities and large labels. Animate only the action the child triggers, and keep every step count in readable text. Reduced motion skips transitions but shows exactly the same intermediate numerical states and accessible descriptions. No required photo, sound, video, online AI, large graphics or WebGL.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All strings, controls, accessible status, object counts, operation descriptions and feedback require genuine translations to all supported languages; English is editor source, **not a fallback**. A nonvisual learner can inspect and operate the same steps using an ordered state ledger and native keyboard/touch/switch controls; no precise dragging or audio/speech/animation-only meaning. RTL must preserve addend order, place value and exact numerical roles rather than reversing mathematical facts. WCAG 2.2 AA, child-size hit targets, focus, 200% zoom, responsive mobile and reduced motion. Full selected-locale content and deterministic feedback must work offline after download.

## ACCEPTANCE SCENARIOS

1. 3+5 and 5+3 both evaluate to eight using the same eight objects.
2. Swap does not duplicate counters or change numerical values attached to each group.
3. Adding one to the group of five creates nine with 3+6, unlike pure swapping.
4. 4+7 and 7+4 both evaluate to eleven with full group ledger.
5. Correct and incorrect predictions get exact, non-scored numeric explanations, retry and full reveal.
6. Section initial states are isolated; reset never mutates any other Section or a persisted learner result.
7. Keyboard, screen reader, semantic RTL, reduced motion, zoom/mobile and downloaded offline support preserve the exact same calculations and meanings.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Existing Lesson Scene resources can render generic Scene components. **Addend Swap Workbench is proposed, not implemented**; requires editor-approved Methodologist Brief, then separate Content/Scene approvals, self-contained prop-free React entrypoints and own tests. Coding Agent handles genuine locale integration and offline delivery. Assessment Architect separately owns scored questions. Editorial decision: Avoid repeating an array-rotation example, which belongs to multiplication commutativity. This lesson concerns addition with two actual disjoint quantities and preserves their interpretation.
