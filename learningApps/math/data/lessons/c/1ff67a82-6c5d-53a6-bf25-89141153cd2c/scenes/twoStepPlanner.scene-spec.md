# Two-Step Dependency Planner — Scene Specification

**Status:** Provisional Draft awaiting explicit Methodologist/editor approval.
**Owner:** Educational Screenwriter.
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Methodologist Brief](../methodologist-brief.md).
**Implementation:** New proposed prop-free and self-contained Scene. No Question, Quiz, assessment, persistence or Note API.

## Pedagogical purpose and mathematical invariant

A two-step word problem has an **intermediate quantity** whose value is needed to determine the final unknown. The learner should name the first missing quantity, justify the first operation, use its result meaningfully in the second operation, and check the unit and final question. A “two-step” requirement is not a demand for a prescribed sequence of button clicks or a specific arrangement of symbols; the Scene must acknowledge mathematically valid alternative decompositions if they respect the stated relationships.

## Scenario entry A — first find total, then remaining (Section 1)

Story: “There are **8 red books** and **7 blue books** on a shelf. **6 books** are borrowed. How many books remain?” Display separate cards for known red eight, known blue seven, borrowed six, unknown initial total, unknown remaining total. Learner selects the intermediate question: “How many books were on the shelf before borrowing?” and then a second question “How many remain afterward?” The model draws labeled dependency connections; the nonvisual alternative is an ordered two-card plan.

Expected **first step** 8 + 7 = **15 books initially**. Expected **second step** 15 − 6 = **9 books remaining**. If the learner picks just 8 − 6 = 2 as final, explain “The original total includes both red and blue books; two does not answer what remains on the whole shelf.” Do not declare _every_ alternative reordering invalid; e.g., a properly justified nonnegative decomposition may get the same total. If the child stops at 15, explain that 15 answers the first question, not the final question. Every correct result retains the unit “books”.

## Scenario entry B — comparison first, then combine (Section 2)

Story: “Ava has **12 stickers**. Sam has **3 fewer** than Ava. How many do they have **together**?” The intermediate card must be **Sam's count**, initially unknown; the final card is combined count, also unknown. Learner may choose plan order and operations. Correct first step: 12 − 3 = **9 stickers for Sam**. Correct second step: 12 + 9 = **21 stickers together**. If the child chooses 12 + 3 for Sam, explain that “fewer” means Sam has less than Ava. If the child submits 9 as final, explain that this counts only Sam's stickers. If they submit 12 + 3 = 15 as together, explain that the number three is a **difference**, not Sam's total. Reconstruct all relationships in a labeled pair of quantity bars rather than only displaying a red/green result.

## Scenario entry C — what must come first? (Section 3)

Reuse Ava/Sam quantitative story **only in a new independent initial state**. Show two incomplete _meaningful_ step cards:

- “Find Sam: 12 − 3 = ?”
- “Find combined total: 12 + Sam's stickers = ?”
  Ask which can be completed with the known data and why. If the learner attempts the combined total first, do not mark their attempt as a generic wrong choice; say “We still need to know Sam's amount. Which step supplies it?” After the child reveals nine stickers for Sam (or opts to “Show why”), complete the second card 12 + 9 = 21. Include a label identifying the intermediate result, not a novel runtime state contract.

## Scenario entry D — independent transfer (Section 4)

Story: “Mila has **14 shells**. Theo has **5 fewer shells** than Mila. How many shells do they have altogether?” Start with blank first/second plan cards, not with a completed number line. Child identifies unknown Theo=?, combined total=?, then selects two operations with named outputs. Correct first **14 − 5 = 9 shells for Theo**; correct second **14 + 9 = 23 shells combined**. Optional hint 1 “Who has fewer?”; hint 2 “Which person's amount is still unknown?” Neither hint automatically supplies the final total. Feedback for **9** as final: “That is Theo's count, but the question asks for both together.” Feedback for **14 + 5**: “Five is the difference from Mila, not Theo's amount.” A valid alternative strategy may be accepted with a relation-preserving explanation; no arbitrary uniqueness claim.

## Objects and interaction state

Represent a story with known quantity cards, named missing-quantity cards, semantic dependency edges (both visual and an equivalent textual ordered list), optional step expression choices, intermediate value with unit, final answer with unit, independent hints, “Explain plan”, “Reset”. State includes which intermediate is named, the ordered plan, calculated values and revealed explanations. Arithmetic is derived from displayed quantities: 8+7=15; 15−6=9; 12−3=9; 12+9=21; 14−5=9; 14+9=23. If a step produces a number but uses an incorrect _role_, the Scene must explain the relationship error rather than judge only its arithmetic. There is no mandatory drag/arrow drawing; sequence is selectable by accessible ordered controls.

Every entry is a self-contained prop-free Scene. No Section-to-Section state is assumed; future implementation may internally reuse helpers. A “Show the answer” control provides the full two-question plan even without an attempt. Incorrect decisions are formative and revisable; never serialize correctness or claim Skill mastery.

## Visual, language, offline and accessibility

Place the final question visibly at the top throughout, with intermediate question labeled **first** and final labeled **second**. Diagram edges are numbered and textually described (“Sam's value feeds into combined total”); do not communicate causality using arrow direction alone. A screen-reader user can navigate the exact ordered plan, numeric operands, units, dependencies and why specific alternative plans fail. Keyboard, switch and touch alternatives must offer all operations and feedback without dragging, pointing accuracy, speech, sound or timed interactions. RTL adapts control flow and names but does not reverse chronological/story dependencies or subtraction operands. Genuine translations for all supported locales must cover names, unit grammar, mathematical read-outs, hints, and feedback. Use focus visibility, color-independent statuses, reduced motion, 200% zoom and small-screen reflow. Complete offline operation is an **implementation requirement after download**, not an assertion of a current PWA feature.

## Acceptance scenarios for Coding Agent

1. Books: intermediate total 15 books; final 9 books after six borrowed. Reject 15 as the final response and explain any plan that ignores the blue books.
2. Stickers: Sam 12−3=9; combined 12+9=21. Explain the meaning of both nine and twenty-one distinctly.
3. A comparison-first plan can be described in text and diagram without a drag dependency; intermediate value becomes usable in the second step.
4. Shells transfer: Theo 14−5=9, combined 14+9=23; nine alone is not the final.
5. User-controlled hints, explanation and reset remain available; no score, backend call or persistent record is produced.
6. Keyboard, screen-reader, RTL, reduced-motion, zoom/mobile and offline-downloaded modes convey identical numerical dependencies.

## Approval and technical dependencies

A generic Scene Resource can render an eventual ReactNode, but this Scene and its localization are **not implemented**. Coding Agent must verify actual context, create no-props Scene entries and tests, validate WCAG 2.2 AA and true offline readiness, and obtain separate Methodologist/Scene approvals. No invented API, Question, Quiz, scores or Note event should be introduced.
