# Joining and Growing Lab — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson: [Two Ways Addition Works Content](../content.md), Sections 1–4
Methodologist objectives: Identify whether a situation joins two separate collections or grows one existing collection. Represent each story by a correct addition equality and distinguish starting amount, amount added and combined total. Explain with counters that 3+2=5 in both stories without pretending the first story contains a temporal event. Solve a new one-step combine or increase example within ten and check by counting. [Methodologist Brief](../methodologist-brief.md) (Draft, not approved)

## LEARNER PURPOSE AND CONCEPT

Establish that addition can describe combining two previously separate sets OR increasing an existing quantity. The arithmetic may be identical, while the story and the meaning of each addend differ. Avoid teaching the plus sign exclusively as an instruction to move objects together.

Each learner action must preserve or change quantities exactly as the narrated context requires. The Scene's instructional feedback is not a correct/incorrect mastery engine.

## ACCURATE CONTENT AND MODEL LIMITATIONS

Whole-number quantities 0–10, nonnegative; two addends only; no need to introduce commutativity, formal set theory, long word problems or carrying. Same sum 3+2=5 in two meanings. Transfer 4+3=7.

**Misconceptions and forbidden depictions:** A child may say that the joined-set story must involve a later arrival; may add the group count to the members of one group; may say 3+2=6 by counting the starting 'three' twice. Keep objects trackable and introduce different stories without extra quantities. Never use an arbitrary visual position or color as the only evidence of object roles. Any reported equality must match actual object counts in its own story.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1 / Two Collections, One Total:** Prompt “Three blue counters are in one bowl and two yellow counters in another. How many counters do both bowls hold?” Initial and learner actions: Two separate countable bowls with 3 and 2 counters. Learner selects 'Count first bowl', 'Count second bowl', then 'Count all' (or a complete-text explanation). No physical arrival, no time sequence. The numerical conclusion is **3 + 2 = 5**. Feedback and explanation: The first bowl has three and the second has two. Counting both disjoint sets once gives five. Nothing had to arrive later; we joined the quantities in our counting. For a misconception: If six is chosen, highlight one-to-one counting of all five with no duplicates; if three is chosen, explain that the second bowl is also part of 'both'. Hints and full reveal are available at every step.

2. **Section 2 / Now Two More Arrive:** Prompt “Three counters are on the table. Two more arrive. How many are on the table now?” Initial and learner actions: Show an initial group of 3, then learner-controlled 'Add two' action places exactly two new counters in a labeled 'arrived' area. Preserve both initial and new counts. The numerical conclusion is **3 + 2 = 5**. Feedback and explanation: Three were already here, and two arrived; now there are five. This time addition describes a change in one collection, although the numbers match the bowl story. For a misconception: If the learner labels five as 'arrived', explicitly distinguish the added two from the final five; if the total is guessed as three, ask what happened to the two arrivals. Hints and full reveal are available at every step.

3. **Section 3 / Same Numbers, Different Story:** Prompt “Which story joins two groups? Which story makes one group grow?” Initial and learner actions: Offer both stories side by side inside the Scene, with semantic labels. Learner selects 'both bowls' or 'two arrive'; display corresponding objects and identical 3+2=5 each time. The numerical conclusion is **3 + 2 = 5**. Feedback and explanation: Both stories have a total of five, but in one we combined separate bowls and in the other two new counters arrived. The equality alone doesn't tell the entire story. For a misconception: If the learner says both stories must involve arriving counters, show untouched bowls and explain the meaning of counting both. Hints and full reveal are available at every step.

4. **Section 4 / Make and Explain a New Sum:** Prompt “Four counters are waiting. Three more arrive. How many now? Can you also make a two-bowl story for those numbers?” Initial and learner actions: Transfer: initial 4, arrival 3, new total 7. Learner predicts 6/7/8, inspects a counter ledger, then toggles to two independent bowls 4 and 3 and explains 4+3=7. The numerical conclusion is **4 + 3 = 7**. Feedback and explanation: Four plus three equals seven. We can grow a group of four by three or count two separate groups of four and three. Both contain seven overall. For a misconception: Six loses one counter, eight double-counts one; show seven individually numbered counters as equivalent accessible text. Hints and full reveal are available at every step.

## INTERACTIVE OBJECTS, STATES AND RULES

- Four Section-specific self-contained **prop-free** entries. State does not leak across Section instances. Exact component paths/registration chosen by Coding Agent; editorial placement is not a new public `mode` prop.
- **Objects:** countable counters, semantically named initial and added/combined groups, numeric equations, keyboard-operable action buttons, prediction candidates if useful, readable steps and reset/explanation controls.
- **State:** placement (join, grow, comparison, transfer), initial and extra counters, which controls have been selected, prediction and explanation reveal; each placement is a separate self-contained Scene entry.
- **Invariants:** each described initial group, incoming/other contribution and current whole must be numerically consistent with the declared example. An object belongs to exactly one counted source contribution, and an optional wrong choice cannot silently mutate the true model.
- Reset restores the initial data for that entry, reveal is available without answering; no QuizState, score, mastery event, token reward or persisted assessment.
- Every action provides a deterministic text readout of before/after, not a visual-only change.

## VISUAL / AUDIO / MEDIA DIRECTION

Use simple high-contrast HTML/SVG counters and labeled bowls/trays, with clear group boundaries and large numbers. Move only the explicitly newly arriving objects in a growth story; do not invent arrivals in a union story. Optional step-by-step transitions are user-controlled. Reduced-motion provides identical before/after count ledger and contextual explanations immediately. No external audio/video/image or WebGL required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate every phrase, group role, action label, status and feedback to all supported locales; no English fallback. An accessible ordered numeric ledger and keyboard/touch/switch controls must let a screen-reader user carry out each operation and inspect totals, without relying on vision, precise dragging, sound or speed. Math expressions keep semantically correct operands and operators in RTL; don't mirror object quantities into incorrect roles. Visible focus, 200% zoom, child-size targets, reduced motion, mobile/weak-device and offline operation after downloaded content package are acceptance requirements.

## ACCEPTANCE SCENARIOS

1. Three plus two counts five distinct counters in two separate bowls with no time-changing story.
2. Three then two arriving produces five, with three initial and two added distinguished.
3. The comparison shows two genuinely different contexts for the same equality.
4. Four then three gives seven and the two-bowl transfer also gives seven.
5. Prediction mistakes produce exact numerical explanatory feedback and permit retry or complete reveal without score.
6. Section placements reset independently and preserve model counts and equation roles.
7. Keyboard, screen reader, semantic RTL, zoom/mobile, reduced motion and downloaded offline logic provide identical conclusions.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Existing generic `scene` Resource and Lesson rendering are available; **Joining and Growing Lab itself is not implemented**. It requires editor approval of the Methodologist Brief, independent Scene spec approval, prop-free React implementation, accessible tests and genuine locale context integration. Assessment Architect alone authorizes any scored item. Editorial review item: The two meanings must remain distinct in translations, particularly 'both' versus 'more arrived'; no additional curriculum assignment is assumed.
