# Part–Whole Workbench — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Finding an Unknown Addend Content](../content.md), Sections 1 “One Part Is Missing” and 2 “Take Away the Known Part”
Methodologist objective(s): Recognize a whole and its two parts, locate an unknown addend, derive missing part by subtraction and confirm that adding the parts restores the given sum. [Methodologist Brief](../methodologist-brief.md)

## LEARNER PURPOSE AND CONCEPT

The child experiences “unknown addend” as **a specific quantity of objects already included in a known total**, not as a magic symbol or an extra pile to add on. By separating a known part from the whole and preserving the total, the child sees why subtraction identifies the missing part, then reconnects the result with the original addition equality.

Canonical child-facing idea: “There are 12 counters altogether. Five are in this part. How many are in the other part?” Then: “Take the five we know away from the whole. Count the ones left.”

## ACCURATE CONTENT AND MODEL LIMITATIONS

- A valid example has a nonnegative whole W and a nonnegative known part K with 0 ≤ K ≤ W ≤ 20. The unknown part is U = W − K. The mathematical statement is K + U = W, and U + K = W is equally true.
- Section 1 fixed data: W=12, K=5, U=7. All **12 counter positions remain visible and countable**; the missing part's number label is hidden initially. Never conceal the only evidence of the missing number behind an inaccessible cover.
- Section 2 fixed data: W=12, K=5, U=7; show 12 − 5 = 7 by separating exactly five counters, not deleting or changing the original total. Then restore 5 + 7 = 12. Optional transfer W=10, K=4, U=6.
- Do not equate physically moving five counters with changing the whole from twelve to seven; the seven counters are the remainder, while the original whole always has twelve counters. On-screen text must distinguish original whole from remainder.
- One whole with precisely two parts is sufficient; no negative answers, fraction parts, multiple hidden addends or multi-step equation solving.
- Boundary cases: W=K implies U=0 (a legitimate empty missing part), W=0/K=0 implies U=0; invalid input K>W must not be offered. The Section’s default examples avoid an empty-counter visual at first, but the model must be mathematically honest if a boundary is reached.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Section 1 / observation entry (prop-free placement)**

1. A large number “12 altogether” names the whole. Show twelve individually countable counters (such as outlines or identical dots) in a tidy, stable arrangement.
2. Draw a clear divider after five counters and label that cluster “5 we know.” The other counters remain countable but the numeric label is “?” or “missing part.” Read the relationship out loud as text: “5 plus a missing number equals 12.”
3. Ask “How many counters are in the other part?” Offer optional response choices 6 / 7 / 8 or buttons “Count the rest” and “Show both parts.” A learner does **not** need to answer to obtain the explanation.
4. If 7: “There are seven in the other part. Five and seven make twelve.” If 6: “Five and six make eleven, not twelve. Count the remaining counters.” If 8: “Five and eight make thirteen, more than our whole.” Reveal the exact remaining counter count, not a bare wrong/right icon.
5. After inspection, show “5 + 7 = 12” immediately beside the model. Invite “Point to the whole” and “Point to the known part,” with equivalent text controls and response via accessible selection.
6. “Reset” restores the unlabeled group and clears the choice; “Show the full explanation” always available.

**Section 2 / guided subtraction entry (independent state)**

1. Begin with the same twelve counters, all still present. Ask: “We already know five of the twelve. What happens if we move those five to a separate part?”
2. “Separate the 5” moves exactly the known five to a labeled sub-area and announces “12 altogether; 5 separated; 7 left in the other part.” Both clusters remain visible so none of the whole disappears.
3. The equivalent numbers display “12 − 5 = 7.” Select “Put the two parts together” to rejoin the clusters and display “5 + 7 = 12,” stressing **the whole stayed twelve**.
4. Learner may do “Separate,” “Count remaining,” and “Put together” in their preferred order where logically possible; if they request “Put together” before separation, the explanatory text says “The parts are already together.”
5. Offer “Try ten and four” using W=10, K=4; exact steps show 10 − 4 = 6 and 4 + 6 = 10. Feedback: “Removing the known part from the whole finds the unknown part.”
6. Optional “Show me” completes all steps for a learner who does not use manual controls; the step-by-step text remains navigable afterwards. No Quiz status, points or timer.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** total label, ordered counter collection, clear fixed part boundary, two labeled sub-containers, optional uncovered numeral for unknown, associated equality and subtraction statements, response buttons, focusable count/reveal/restore controls, accessible status log.
- **Scene placements:** Section 1 observation and Section 2 guided subtraction are **distinct self-contained prop-free Scene entries**, each initialized for its narrative point. The Scene specification names editorial entry experiences; it does not introduce a React prop named mode or a new Resource_Config field. The Coding Agent may reuse internal code but must isolate both states.
- **State, observation:** W=12, K=5, U=7 (computed, not user-managed secret); whether unknown label is displayed, chosen guess, whether a group count has been exposed, active model explanation.
- **State, guided:** fixed example choice 12/5 or 10/4, current representation (combined vs separated), which numerical statements are revealed, explanation visibility.
- **Invariant:** exactly W counters across both parts at all times, exactly K counters in the known part, exactly W−K in missing part. No counter duplication/deletion when rearranging; never show inconsistent labels or a sum unequal to W as “checked.”
- **Control constraints:** switching example resets grouping and clearly announces the new whole and known quantity. Disabled transitions must explain why and cannot strand the learner. Return/reset should not affect other Sections.
- **Incorrect prediction:** demonstrate the actual addition against W (“5 + 6 is 11, but the whole is 12”), then allow a new guess or the reveal. Never produce a correctness score, persistent assessment record or a diagnosis.
- **No hidden answer security claim:** this is formative teaching; the child may always access the explanatory values. Scoring/answer-concealment policy is not specified here.

## VISUAL / AUDIO / MEDIA DIRECTION

Use simple high-contrast counter shapes arranged in groups that a child can track without visual clutter. Show grouping by spacing, outlines and words, never hue alone. In the subtraction view, move the known group smoothly into a separate clearly labeled area; the total label remains fixed at twelve to avoid implying conservation failure. For reduced motion, show the final separated groups immediately with the exact same numeric statements. No photographic image asset, audio track, video, WebGL or online data is needed. Narration, if eventually offered, is an additional localized representation with identical text.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- All learner strings, spoken-equivalent descriptions, control names, status messages, mathematical terms, screen-reader labels and optional Note references need genuine translations across Svitlo's required languages; English here is editorial source, not a fallback.
- Announce the missing box semantically as “missing number” or “unknown addend”; the equation 5 + □ = 12 must keep proper mathematical order in LTR and RTL contexts even if surrounding labels adapt to RTL.
- The **equivalent nonvisual model is explicit**, e.g. “whole: twelve counters; known part: five; remaining part: seven; twelve minus five equals seven.” It must be available through accessible text/list, not only SVG alt text. A blind learner can invoke each state action and hear/read the result without seeing dots.
- Native keyboard-operable buttons, visible focus, adequately sized touch targets, screen-reader announcements for changed groups, no time limits, no drag-only demand, no reliance on color or audio. Arrange control order logically for each locale.
- For dyscalculia or memory support, keep all existing counter groups and numeric parts visible during reasoning; permit replay and step-by-step guidance. At zoom and narrow mobile width, use a vertical arrangement and structured text without shrinking counters below usable sizes.
- All counters, calculations, translated text and explanations must work with locally available assets after download. No streaming, cloud calculation or speech recognition dependency.
- If semantics cannot be preserved for any access mode, flag an actual a11y blocker during implementation; do not silently replace interactive reasoning with a static answer.

## ACCEPTANCE SCENARIOS

1. **Default observation:** exactly twelve counter positions, a known group of five, remaining group of seven with its numeral hidden; the accessible total remains twelve.
2. **Correct prediction:** choosing seven reveals “5 + 7 = 12,” with a visible/restated seven-counter remaining part.
3. **Wrong predictions:** six yields 5 + 6 = 11, eight yields 5 + 8 = 13; feedback identifies mismatch with twelve, allows hint or retry, and never scores.
4. **Separate and restore:** with W=12, K=5, separate known five → seven remain; show 12 − 5 = 7; restore → 5 + 7 = 12 and original whole preserved.
5. **Transfer example:** W=10, K=4 → U=6, subtraction 10 − 4 = 6 and restored addition 4 + 6 = 10.
6. **Edge case and invalid input:** W=K reveals a genuine zero missing part; W=0/K=0 gives zero; K>W is unavailable; no negative counter count.
7. **State isolation:** Reset in Section 2 does not reveal or alter Section 1. Revisiting Section 1 always starts from its defined observation state.
8. **Equivalent access:** all numeric facts, count transitions and feedback work through keyboard and screen reader, RTL, reduced motion, low-end mobile and complete offline availability after download.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Existing: Scene Resource type and generic Lesson renderer, locale context pattern in existing Playground Scenes.
- **Proposed:** new Part–Whole Workbench Scene component(s) with both editorial placements, local calculation/model, complete supported-language translations and own tests. Must be approved before running Design Scene.
- Coding Agent decides precise component/state sharing, but the component(s) must remain prop-free at public Scene interface and use validated localization source/context rather than novel unapproved APIs.
- Avoid extra rendering dependencies. If counters cannot be meaningfully represented nonvisually, engineer equivalent accessible state/control flow rather than hiding the model.
- This is formative explanation and practice, not an Assessment Architect-designed scored Question or evidence of Skill mastery.
