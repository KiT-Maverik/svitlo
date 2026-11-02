# Expression Reader — Scene Specification

**Status:** Provisional Draft — pending Methodologist/editor approval.
**Owner:** Educational Screenwriter.
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Methodologist Brief](../methodologist-brief.md).
**Availability:** New proposed self-contained, prop-free Scene; neither React implementation nor translations exist yet.

## Learner purpose and mathematical contract

This Scene teaches translation from quantities and words into a correct **numeric expression**, without conflating expression, evaluated number and equality. All counters, symbols and text must agree on the **start**, **change** and **operation**. An expression is not automatically an equality. Correct mathematical calculations can still be the _wrong output type_ when the instruction specifically requests an expression.

## Learner journey, choices and feedback

### Entry A — seven plus four (Section 1)

Display seven initial shell counters and four labeled incoming counters; final total is initially hidden. Offer 7 + 4, 7 − 4 and 4 − 7 as focusable choices. A correct 7 + 4 selection receives “Seven joined with four: the expression describes the change.” For 7 − 4: “That would remove four, but four arrived.” For 4 − 7: “That would start with four, then remove seven.” Optional “Reveal value” shows eleven; the original expression remains 7 + 4, distinct from its value 11 or equality 7 + 4 = 11.

### Entry B — nine minus three (Section 2)

Show nine grapes in a bowl and three marked as eaten. Preserve nine as the known initial count, three as the amount removed, the remainder as unknown. Offer 9 − 3, 3 − 9, and 9 + 3. The first matches the story and may reveal six remaining grapes. 3 − 9 is not a valid representation of the start/remove roles and is outside the allowed nonnegative model. 9 + 3 would add rather than remove grapes. Ask how “subtract three from nine” is written: nine first, then subtract three. Feedback always names the known quantities, not only “try again”.

### Entry C — expression, value, statement (Section 3)

Present three labeled cards: 6 + 2, 8, and 6 + 2 = 8. Learner classifies them as expression, value, and complete equality respectively with accessible select-then-category controls; no drag is required. If asked to write only an expression, selecting the equality receives “That is mathematically true but includes a claim, not just the requested expression.” Selecting 8 receives “That is the result rather than the operation.” Provide a free “Explain all three” reveal, plus a short independent reading of 10 − 4 as words without requiring calculation.

### Entry D — independent transfer (Section 4)

Story: fourteen tokens in a jar, four taken out. Present empty operation slots or an accessible text entry. Expected expression: 14 − 4. If 4 − 14, explain that fourteen is the initial count. If 14 + 4, explain that removal lowers the number remaining. If 14 − 4 = 10, explain that it is a _true equality_ but the requested output was an expression; show 14 − 4 as the precise response. Optional hints: “Which amount starts?” then “Were tokens added or removed?” Optional answer reveal shows ten tokens remain only after the initial expression is clear.

## Objects, state and invariants

A fixed scenario (numbers, unit, start/change relation), ordered symbolic slots or choices, a precise counter depiction, optional hint/reveal state and local Reset. Each Section entry starts independently without props or shared state. Underlying arithmetic must match displayed quantities in every visible mode: 7+4=11; 9−3=6; 6+2=8; 14−4=10. Learner guesses change the _chosen representation_, never the original narrative data. An equality is not labeled numerically false merely because the instruction asked for an expression. This Scene is an explanatory interaction, not a Question or scoring contract.

## Accessibility, localization and offline intent

Use readable textual ledger (“nine start, three leave, remaining unknown”) alongside optional animated counters. Every operation and counter group has screen-reader description; tab/keyboard/switch/touch choices are fully usable without dragging or hovering. Announce expression, numeric value and complete equality distinctly, not solely via color or placement. RTL preserves mathematical operand order and the meaning of “subtract three from nine”, with bidi-safe numeric runs and semantically reordered controls. All strings, hints, alternative descriptions and feedback require actual translations into each supported locale; no silent English fallback. Reduced motion, focus visibility, high contrast, zoom/mobile reflow and equivalent offline content after downloading are requirements, not claims of already implemented features.

## Acceptance examples

1. 7+4 is the matching expression; 7−4 and 4−7 each receive exact role feedback; value eleven is optional.
2. 9−3, not 3−9 or 9+3, represents removal and gives six remaining.
3. 6+2, 8, 6+2=8 belong to expression, value and equality categories respectively.
4. 14−4 is the requested expression; 14−4=10 is true but a different type of artifact.
5. Hint and reveal work without scoring; reset does not change another Section.
6. Keyboard, screen reader, RTL, mobile zoom, reduced motion and downloaded offline path convey identical quantities and explanations.

## Implementation dependencies and editorial handoff

The generic Scene resource is renderable today, but this Scene and all required locale dictionaries are proposed. Coding Agent must verify actual Scene context, create a prop-free component and tests, and meet WCAG 2.2 AA. No invented APIs, Question/Quiz, learner-state persistence, grading or Note events. Approval remains outstanding.
