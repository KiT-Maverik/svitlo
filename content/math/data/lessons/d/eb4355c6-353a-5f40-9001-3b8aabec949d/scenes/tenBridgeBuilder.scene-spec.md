# Ten Bridge Builder — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Make Ten First Content](../content.md), Sections 1–4
Methodologist objectives: Identify how many more counters are needed to fill a ten-frame when eight are shown. Decompose five into two and three, make a full ten, then find 8+5=13 while conserving all counters. Explain why 8+2+3 and 8+5 have the same total and reject a decomposition that changes five. Apply the make-ten strategy to 9+6=15 and 7+6=13 with hints if necessary. [Methodologist Brief](../methodologist-brief.md), pending approval.

## LEARNER PURPOSE AND CONCEPT

Teach a strategically useful addition decomposition: split one addend so part fills the first addend to ten, then add the remainder. Use counter frames of ten, transparent part labels and the invariant that no counter is lost or added by regrouping. Demonstrate 8+5=8+2+3=13, then transfer to 9+6 and 7+6.

Learner actions must make the numerical structure explicit, including all contributions and complete before/after states. The Scene is a formative explanatory exploration, not an assessment widget.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Use nonnegative whole-number examples with results at most 20. For 8+5, 8 needs 2 to reach 10, so 5 = 2+3 and 8+5 = (8+2)+3 = 10+3 =13. For 9+6, 9 needs 1 and 6=1+5, total 15. For 7+6, 7 needs 3 and 6=3+3, total 13. The decomposition and rearrangement preserve five/six exactly. Do not claim make-ten is the only valid mental strategy or teach the full associative law as the independent target.

**Math invariants:** At all times, the number of counters in the filled original first-addend positions plus moved counters plus remaining source counters equals the original a+b. The number moved from second tray equals 10−a in the authored examples, never larger than second addend; remaining count equals b−(10−a).

**Potential wrong models:** Taking two from the five without removing them from its source tray, producing 8+5+2=15; thinking 8+2=11; losing the remaining three; treating the written '10' as an extra object; assuming one must split the same addend in every arithmetic problem. An incomplete ten-frame needs exactly the missing positions filled; counters carry stable IDs. The actual expression, components and result must remain numerically true at every accepted transition.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1: How Much to Complete Ten?.** Prompt “Eight counters fill eight places in a ten-frame. How many places are empty?”. Show one ten-frame with eight occupied cells and two empty. Child selects 'Count empty places', fills precisely two when offered and labels full ten. The result is **8 + 2 = 10**; learner explanation: Eight needs two more to make ten. The empty places tell us the exact number to take from the next addend. If misunderstood: A response of one leaves a visibly empty slot; three would exceed the ten-frame, so show only two positions remaining. Native step/reveal/reset controls permit completion without a predicted answer.

2. **Section 2: Split Five Into Two and Three.** Prompt “We want to add five to eight. Can we give two to finish the ten and keep the other three?”. Show separate source tray of exactly five counters. 'Move two to frame' transfers two actual IDs into the last empty cells; remaining tray now visibly has THREE, not five. The result is **5 = 2 + 3; 8 + 2 = 10**; learner explanation: We used two of the five counters to complete the ten. Three of the same five remain to add later. We did not create any new counters. If misunderstood: If a learner tries to keep five in the tray after moving two, show that this would count seven contributions; the original added amount is only five. Native step/reveal/reset controls permit completion without a predicted answer.

3. **Section 3: Now Add the Three Left.** Prompt “Ten is full. Three counters are still waiting. How many counters altogether?”. Use separate visible full ten-frame (10) and remaining three counters; learner controls 'Add the three' while text shows original eight plus five unchanged across transformation. The result is **8 + 5 = (8 + 2) + 3 = 10 + 3 = 13**; learner explanation: We started with eight and five: thirteen counters. The split let us make ten first, then add three. Nothing was lost or duplicated. If misunderstood: If the child answers fifteen, compare the original eight plus five against a nonexistent extra two; if twelve, count all three outside the full frame. Native step/reveal/reset controls permit completion without a predicted answer.

4. **Section 4: Use Ten on a Different Sum.** Prompt “Try nine plus six. How much makes ten? How many of the six remain? Then try seven plus six.”. Two staged transfer problems: 9+6 uses 1 and 5, yielding 15; on explicit request, 7+6 uses 3 and 3, yielding 13. Child predicts then steps through frame/split/add or requests entire worked model. The result is **9 + 6 = (9 + 1) + 5 = 15; 7 + 6 = (7 + 3) + 3 = 13**; learner explanation: Nine needs one to reach ten; six splits one and five, giving fifteen. Seven needs three; six splits three and three, giving thirteen. Use the same method, but each number needs a different complement. If misunderstood: If nine plus six is given as sixteen, show ten and five; if seven plus six is fourteen, show ten and three. Split only what the source tray contains. Native step/reveal/reset controls permit completion without a predicted answer.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Four independent prop-free Scene entries** with their own initial examples and internal state; do not introduce a public `mode` prop or new Resource_Config discriminators.
- **Objects:** numbered countable counter IDs, trays or ten-frame as appropriate, explicit addend/remaining labels, full original equality, optional candidate controls and deterministic textual result ledger, reset and explanation panels.
- **State:** first addend (8/9/7), second addend (5/6), source counter identities, ten-frame occupancy, counts transferred into frame and still in source, step index, explanation visibility and optional selected transfer example; independent per Section.
- **Invariant:** At all times, the number of counters in the filled original first-addend positions plus moved counters plus remaining source counters equals the original a+b. The number moved from second tray equals 10−a in the authored examples, never larger than second addend; remaining count equals b−(10−a). On every accepted transition compute the correct quantity, and mark a mistaken prediction as a _trial_ rather than changing the model to make it true.
- Children can get the full worked explanation without guessing; no stored score, threshold, mastery event, reward or Quiz/Question object.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple high-contrast HTML/SVG counters, ten-frame or separate group trays with visible quantities and large labels. Animate only the action the child triggers, and keep every step count in readable text. Reduced motion skips transitions but shows exactly the same intermediate numerical states and accessible descriptions. No required photo, sound, video, online AI, large graphics or WebGL.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All strings, controls, accessible status, object counts, operation descriptions and feedback require genuine translations to all supported languages; English is editor source, **not a fallback**. A nonvisual learner can inspect and operate the same steps using an ordered state ledger and native keyboard/touch/switch controls; no precise dragging or audio/speech/animation-only meaning. RTL must preserve addend order, place value and exact numerical roles rather than reversing mathematical facts. WCAG 2.2 AA, child-size hit targets, focus, 200% zoom, responsive mobile and reduced motion. Full selected-locale content and deterministic feedback must work offline after download.

## ACCEPTANCE SCENARIOS

1. 8 has two empty slots in a ten-frame; placing exactly two makes ten.
2. From original five, moving two leaves three; no double counting or duplication.
3. The full ten and remaining three make thirteen; original 8+5 also thirteen.
4. 9+6 uses 1+5 to make 15 and 7+6 uses 3+3 to make 13; both checked in original sums.
5. Correct and incorrect predictions get exact, non-scored numeric explanations, retry and full reveal.
6. Section initial states are isolated; reset never mutates any other Section or a persisted learner result.
7. Keyboard, screen reader, semantic RTL, reduced motion, zoom/mobile and downloaded offline support preserve the exact same calculations and meanings.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Existing Lesson Scene resources can render generic Scene components. **Ten Bridge Builder is proposed, not implemented**; requires editor-approved Methodologist Brief, then separate Content/Scene approvals, self-contained prop-free React entrypoints and own tests. Coding Agent handles genuine locale integration and offline delivery. Assessment Architect separately owns scored questions. Editorial decision: Prerequisite place-value ten-frame competence must be verified before use in Grade 2; the source Skill stays grade-independent and the Lesson does not claim to teach all addition strategies.
