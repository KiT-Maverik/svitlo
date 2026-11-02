# Ten Exchange Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Subtraction Across Ten and with Place-Value Columns](../content.md), Sections 1–2
Methodologist objective(s): Explain crossing-ten subtraction by exchanging one ten for ten ones while preserving the original quantity; show 13−7=6 using exchange and an equivalent 13−3−4 route. [Methodologist Brief](../methodologist-brief.md).

## LEARNER PURPOSE AND CONCEPT

A child must not experience the act of “borrowing” as magically gaining more objects. This Scene displays the same thirteen counters in two forms, then makes it possible to remove seven. Learner controls let children inspect and repeat each actual transformation, alongside a second, “reach ten first” subtraction path.

Core copy: “A ten is ten ones. We can open the ten, but thirteen is still thirteen.” Then “We can take away seven and see how many are left.”

## ACCURATE CONTENT AND MODEL LIMITATIONS

- A bundle contains EXACTLY ten counter units. Initial quantity 13 = 1 ten + 3 ones. After exchange: 0 tens + 13 ones, total still 13.
- Subtraction example: 13 − 7 = 6. Via exchange: from 13 loose ones remove 7, leaving 6. Via decomposition: 7 = 3 + 4, 13 − 3 = 10, 10 − 4 = 6.
- When physically removing counters, distinguish **thirteen at the start** from **six remaining**; removed seven plus remaining six always equals thirteen.
- No negative numbers, phantom extras, duplicating an exchanged bundle and its constituent ten loose ones, or visual animation that temporarily represents 23 as the amount owned.
- Only these approved small-number cases are required; a zero-counter state if extended later must still be mathematically honest. No timed fact memorization or new Skill beyond the Brief.

## EXPERIENCE BEATS AND LEARNER ACTIONS

**Section 1: exchange without subtraction**

1. Show one labeled ten-bundle and three separate units; text: “One ten and three ones make thirteen.”
2. Ask “If we open the bundle, will there be more, fewer or the same number of counters?” Choices are optional; “Show me” always provides the explanation without judging.
3. “Exchange one ten”: the bundle visibly separates into ten constituent ones. The three original ones remain. Count all thirteen and display “0 tens + 13 ones = 13”.
4. Compare exact before and after ledgers; feedback for a “more” prediction: “We did not bring in any counters. We just opened the ten, so there are still thirteen.” For “fewer”: “The ten did not disappear: it is now ten individual ones.”
5. “Undo exchange” reconstructs the single ten-bundle from precisely ten of those same units; never adds or duplicates. “Reset” restores starting state.

**Section 2: crossing-ten subtraction**

1. Begin independently at 13, one ten and three ones, with a subtraction request “Take away seven.”
2. Route A “Open the ten”: exchange ten for ten ones. Let learner activate “Remove one” up to seven times or “Remove seven”, with explicit count ledger showing remaining and removed. After seven, six remain; display “13 − 7 = 6”.
3. Route B “Reach ten first”: start a separate 13 representation and remove 3 ones, yielding 10. Then remove 4 from the ten, yielding 6. Show “13 − 3 = 10”, “10 − 4 = 6” and “3 + 4 = 7”. All amounts remain countable, and removing four from ten may visually open the bundle as necessary without representing a different original total.
4. Ask “Did we take away seven in both ways?” Provide “Yes. Three and four make seven. Both ways leave six.”
5. If learner stops after removing only three: “Ten are left, but only three have been removed. We still need to remove four more.”
6. “Show every step”, “Try another way”, “Undo” and “Reset” are accessible, learner-controlled and non-scored.

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: countable ten-bundle with ten constituent identifiers, loose ones, removed-count area, a running total/removed/remaining ledger, ordered step labels, prediction/route/step/reset controls.
- Two separate self-contained **prop-free** Scene placements for Sections 1 and 2. Do not invent a React mode prop or a new Resource_Config field; Coding Agent chooses isolated registrations or internal sharing that preserves different initial states.
- Section 1 state: bundled=true/false, predicted conservation optional, count display visibility. Invariant 10×tens + ones = 13 throughout.
- Section 2 state: selected route A/B, currently available or removed counters and their identities, step index, displayed explanation. Invariant available + removed = 13, and when bundled representation is in use its ten must not be counted again as ten loose ones.
- A subtraction action cannot remove more than are currently available; accidental extra activation yields a clear disabled state with text, not negative counters. Undo reverses the most recent action without changing the other Scene placement.
- All incorrect learner predictions are formative and reversible; neither a Quiz result nor Skill mastery is stored.

## VISUAL / AUDIO / MEDIA DIRECTION

A concrete, readable ten-bundle and loose units in simple HTML/SVG, with identical counters represented as bundled or loose. Label quantity with both words and numerals; subdued step-by-step motion directs attention without requiring animation. Removed objects are visibly tracked in a separate area rather than disappearing without explanation. Reduced-motion mode makes the same before/after states and count ledger available instantly. No image asset, sound cue, external video, WebGL or Program story is necessary.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All instructions, counters, state changes, bundle/ones labels, and error explanations must be genuinely localized across the complete locale roster. In RTL, preserve numeral and subtraction order and make “before/after” explicit; do not flip the mathematical meaning of a number-line direction. Offer a keyboard-operable numbered list/table of quantities and individual step controls as an EQUIVALENT route to understanding, not merely a static description. The screen reader can inspect “one ten, three ones, total thirteen” and then “zero tens, thirteen ones, total thirteen” and “removed seven, remaining six”, even with no SVG. Touch targets suitable for young children, visible focus, non-color clues, 200%-zoom/mobile layouts and reduced motion are required. Optional narration never replaces equivalent text; no drag-only, motor-precision, timed or speech-recognition dependency. Offline after download, all math, labels and interactions run locally on low-resource devices.

## ACCEPTANCE SCENARIOS

1. Before exchange, 1 ten + 3 ones = 13; after exchange, 0 tens + 13 ones = 13 with no duplicated objects.
2. Incorrect prediction “more” or “fewer” receives the exact conservation explanation and allows replay.
3. Subtraction route A: 13 − 7 = 6, with seven removed and six remaining and total starting thirteen.
4. Route B: 13 − 3 = 10, 10 − 4 = 6; cumulative removal 3 + 4 = 7, same final six.
5. “Undo” restores the previous valid state; premature extra removals are blocked with text.
6. Reset in Section 2 never changes Section 1’s state; no hidden scoring or compulsory answer.
7. LTR/RTL, keyboard, screen reader, touch, reduced motion, 200% zoom and offline delivery expose all numerical states and reasoning.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The typed scene Resource and current generic renderer are available; **Ten Exchange Lab is proposed**, not yet implemented. Editorial approval precedes Design Scene implementation and own tests. Coding Agent validates independent prop-free entrypoints, locale context and accessibility state handling; avoid fictional scene props/assessment APIs. If physical counter rearrangement proves insufficiently accessible, an equivalent interactive ordered state ledger is mandatory, not optional.
