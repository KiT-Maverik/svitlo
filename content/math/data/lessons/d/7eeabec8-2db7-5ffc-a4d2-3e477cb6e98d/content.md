# Does the Answer Make Sense? — Lesson Content

Content status: Provisional Draft — pending Methodologist approval
Owner: Educational Screenwriter
Methodologist input: [Draft Brief](./methodologist-brief.md)
Program dependence: None
Implementation: Not implemented

## Section 1 — The number that looks impossible

1. **text**: “A library has ninety-eight picture books on one shelf and one hundred five on another. Someone says there are 2,000 books altogether. Could that be right without counting each book?”
2. **scene (proposed)**: [Reasonableness Inspector](./scenes/reasonablenessInspector.scene-spec.md). Show two approximate 100-unit groups and a marked benchmark of about 200. Learners predict whether 2,000 is plausible, then inspect groups of hundreds.
3. **text**: Feedback if “plausible”: “One shelf is near 100 and the other is near 100. Together they are near 200, not 2,000.” If “implausible”: “Yes, 2,000 is roughly ten times too large.”

## Section 2 — A useful estimate is not an exact answer

1. **markdown**: “98 is close to 100; 105 is close to 100. So the total is near 200. Exact addition gives 98 + 105 = 203. Our estimate helped us reject 2,000; it did not prove that 200 is the exact total.”
2. **scene (proposed)**: Inspector compares claims 199, 203 and 2,000 against the benchmark. Both 199 and 203 are plausible in size, but only 203 matches the exact calculation. The interface must clearly distinguish plausibility from exact correctness.
3. **text**: If learner marks 199 “exactly correct”: “199 is near 200, so the estimate alone cannot rule it out. Checking the exact sum gives 203.”

## Section 3 — Context matters, not just size

1. **text**: “There are fourteen children at a table. Three leave. A result of minus eleven children is proposed. Can the remaining children be negative?” Provide quantities with unit labels.
2. **scene (proposed)**: Inspector context check allows a “reasonable” or “not reasonable” judgment followed by “why?” Feedback: “A simple count of children left cannot be negative. Fourteen minus three is eleven, not minus eleven.”
3. **text**: “Check the situation, the size and the unit. A plausible number with the wrong unit is not a complete answer.”

## Section 4 — Your own quick check

1. **text**: “A school orders 49 notebooks and 52 more. A receipt claims 1,010 notebooks. Without adding exactly, explain whether that makes sense.”
2. **scene (proposed)**: Fresh Inspector example with no automatic hint: 49 ≈ 50 and 52 ≈ 50, so the total is near 100. The claimed 1,010 is not plausible. Exact sum is 101, revealed optionally after learner explanation.
3. **text**: Wrong feedback: “Check the size of each group first: both are near fifty.” Correct feedback: “About fifty plus fifty is about one hundred, nowhere near one thousand.”
4. **markdown**: “Remember: **estimate first, check whether the result fits the story, and calculate exactly when exactness matters.**”

## Access and production constraints

General Resources remain a single vertical column. Inspector is a proposed custom scene, not a test. All diagrams provide textual quantities and estimates; no dependence on color, animation, sound or exact pointer control. Screen readers must distinguish “plausible magnitude” from “exact total” and announce units. Translate mathematical and contextual wording accurately for every locale, preserve semantic number order under RTL, support zoom and offline access to all examples and feedback. Do not save grades or claim that estimation establishes mastery.

## Review handoff

Provisional pending [Methodologist Brief](./methodologist-brief.md) approval; [Reasonableness Inspector Scene](./scenes/reasonablenessInspector.scene-spec.md).
