# Reverse-Operation Checker — Scene Specification

Status: **Provisional Draft pending Methodologist/editor approval**  
Owner: Educational Screenwriter  
Parent: [Lesson Content](../content.md), Sections 1–4; [Draft Methodologist Brief](../methodologist-brief.md)  
Implementation: **Proposed**, self-contained and prop-free; no runtime component is asserted.

## Educational purpose and scope

A calculation can be checked by performing a **different, inverse operation** that reconstructs an original quantity. The child must construct and inspect the reverse relation, not repeat the first algorithm. Estimates may reject implausible results but cannot certify exact arithmetic. A successful numeric inverse check does **not** validate whether a real-world story was modeled correctly.

## Experience beats, accurate calculations and corrective feedback

**Entry A (Section 1), addition verified by subtraction.** Display forward trip: start **46**, change **+27**, claimed end **73**. Learner predicts a different operation for a return trip and chooses **73 − 27 = ?**, not 73 + 27. The reverse track/table reveals **46**, exactly the starting value. Feedback for wrong +: “Adding another twenty-seven moves farther away; to undo adding twenty-seven, subtract twenty-seven.” For correct: “We got the same forty-six back, so the arithmetic statement passes this check.” Use both a labelled number-track progression and an accessible step-by-step textual comparison.

**Entry B (Section 2), a wrong but not fantastically large result.** Display claim **46 + 27 = 63**. Ask how to check it without redoing the same addition. Learner chooses **63 − 27**, obtains **36**, and compares against original start **46**. Explicit mismatch: “The return trip got thirty-six, not forty-six. That claim fails.” Optionally reveal correction: **46 + 27 = 73**, whose reverse is **73 − 27 = 46**. Never mark 63 correct just because its size is in the tens. If the learner instead adds 27 to 63, give the inversion explanation, not a generic “wrong”.

**Entry C (Section 3), subtraction verified by addition.** Story: start **84** stickers, remove **29**, proposed remainder **55**. The learner creates reverse statement **55 + 29 = 84** by restoring removed stickers. If choose 55 − 29: “You are removing more, not restoring the original collection.” Also compare near-miss candidate **54**: 54 + 29 = **83**, not 84. Show exactly why an answer one away fails the inverse check.

**Entry D (Section 4), independent transfer.** Present **68 − 19 = 49** with the reverse calculation absent. The learner can enter an expression through a keyboard-friendly simple numeric/operator chooser or select accessible symbolic parts, then optionally reveal hint 1: “Restore what was removed” and hint 2: “Start with forty-nine and add nineteen.” Correct verification is **49 + 19 = 68**. For choosing 49−19, say “That removes more and cannot rebuild the original sixty-eight.” The learner may reveal the complete mathematical explanation without a score. Reset returns to the initial blank check.

**Optional extension:** For a learner who already understands exact division, 6 × 4 = 24 can be checked by 24 ÷ 4 = 6. It is a _proposal for a later optional mode_, not required content or automatic grade prerequisite; do not implement it by default.

## Objects and state invariants

Objects: starting value, signed forward change, proposed result, independently selectable inverse operator, reverse calculation steps, check comparison, localized statement of passes/fails, hint and reset. All quantities and signed operations are explicit. The reverse check must compute its answer from chosen displayed numbers and selected operation, never reuse a stored “correct” flag. The correct conclusion is whether the reverse result matches **the original known starting value**, not whether the candidate resembles an estimate. Initial state, hints and feedback are isolated per Section placement; no shared scene state or prop-based data transfer is required. A scene does not decide whether an original story is mathematically modeled correctly.

## Visual and accessibility contract

A number track may animate forward/reverse changes, but a **textual route ledger** must fully describe start, change, end, chosen reverse expression and result. Do not infer subtraction direction from a purely visual RTL arrow: use explicit +/− symbols and operand reading order; mathematical direction and timeline are labeled separately. Screen readers must announce the exact equation and mismatch/confirmation. Keyboard, switch and touch controls can select/construct reverse operations without dragging or precise pointing. Use visible focus, WCAG 2.2 AA contrasts, no color-only success/failure, reduced-motion instant reveal and zoom/mobile reflow. Every string, unit, hint, spoken mathematical representation and feedback must have genuine translations in all supported locales; optional narration has an equivalent text path. Content must function fully offline when an implementation and selected locale assets are downloaded; the current project is not claimed to deliver that yet.

## Acceptance scenarios

1. 46+27=73; inverse 73−27=46 passes, but adding 27 again is not the reverse operation.
2. Wrong claim 46+27=63; inverse 63−27=36, which fails against 46; show corrected 73.
3. 84−29=55; inverse 55+29=84 passes; near miss 54+29=83 fails.
4. 68−19=49; learner constructs 49+19=68 with hints optional.
5. An approximate magnitude judgement never substitutes for exact inverse verification.
6. Reset and each Section entry remain independent; accessibility, RTL and offline versions preserve numeric semantics.

## Dependencies and editorial handoff

Generic Playground Scene resources are presently renderable, but this custom Checker is **new**. Coding Agent must inspect context and implementation contracts, create real localized strings, test arithmetic and access routes, and satisfy approval gates. This document creates no React, runtime Lesson data, Questions, Quizzes, score persistence, mastery rules or Note behavior.
