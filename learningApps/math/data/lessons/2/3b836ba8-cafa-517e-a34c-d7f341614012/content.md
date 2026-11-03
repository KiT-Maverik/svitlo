# Two Ways Addition Works — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionMeaning/
Primary audience: **Grade 1**, with prior knowledge: Count objects accurately to 10; distinguish 'already here', 'arrive' and 'altogether'; recognize numbers 0–10. Reading may be emerging; concrete counters and narrated-equivalent text are available.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) — Draft, not approved
Target Skill: `addMeaning.data.ts` directly linked in the Brief, canonical definition unchanged
Program dependence: None

## INSTRUCTIONAL CONCEPT

Establish that addition can describe combining two previously separate sets OR increasing an existing quantity. The arithmetic may be identical, while the story and the meaning of each addend differ. Avoid teaching the plus sign exclusively as an instruction to move objects together.

Whole-number quantities 0–10, nonnegative; two addends only; no need to introduce commutativity, formal set theory, long word problems or carrying. Same sum 3+2=5 in two meanings. Transfer 4+3=7.

Learners build and examine exact numerical relationships before being told a rule. Every incorrect candidate is used to reveal a specific mismatch; hints and the full explanation are never locked by a score.

## LEARNER JOURNEY

1. **Two Collections, One Total.** Two separate countable bowls with 3 and 2 counters. Learner selects 'Count first bowl', 'Count second bowl', then 'Count all' (or a complete-text explanation). No physical arrival, no time sequence.
2. **Now Two More Arrive.** Show an initial group of 3, then learner-controlled 'Add two' action places exactly two new counters in a labeled 'arrived' area. Preserve both initial and new counts.
3. **Same Numbers, Different Story.** Offer both stories side by side inside the Scene, with semantic labels. Learner selects 'both bowls' or 'two arrive'; display corresponding objects and identical 3+2=5 each time.
4. **Make and Explain a New Sum.** Transfer: initial 4, arrival 3, new total 7. Learner predicts 6/7/8, inspects a counter ledger, then toggles to two independent bowls 4 and 3 and explains 4+3=7.

## SECTION PLAN

### Section 1 — Two Collections, One Total

**Purpose and outcome:** Identify whether a situation joins two separate collections or grows one existing collection.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “Three blue counters are in one bowl and two yellow counters in another. How many counters do both bowls hold?”
2. **scene (generic renderer supported; custom implementation proposed):** [Joining and Growing Lab](./scenes/joiningGrowingLab.scene-spec.md), Section 1 entry. Two separate countable bowls with 3 and 2 counters. Learner selects 'Count first bowl', 'Count second bowl', then 'Count all' (or a complete-text explanation). No physical arrival, no time sequence.
3. **markdown (supported):** “The first bowl has three and the second has two. Counting both disjoint sets once gives five. Nothing had to arrive later; we joined the quantities in our counting.” Display the mathematical statement **3 + 2 = 5** as readable symbolic text.

**Learner action and interaction:** Two separate countable bowls with 3 and 2 counters. Learner selects 'Count first bowl', 'Count second bowl', then 'Count all' (or a complete-text explanation). No physical arrival, no time sequence. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** If six is chosen, highlight one-to-one counting of all five with no duplicates; if three is chosen, explain that the second bowl is also part of 'both'.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Keep the model available and move to the next contrast only after the current example has been fully explained.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** “Adding can combine two separate groups.” after the whole demonstration and explanation are available (planned, not wired).

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

### Section 2 — Now Two More Arrive

**Purpose and outcome:** Represent each story by a correct addition equality and distinguish starting amount, amount added and combined total.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “Three counters are on the table. Two more arrive. How many are on the table now?”
2. **scene (generic renderer supported; custom implementation proposed):** [Joining and Growing Lab](./scenes/joiningGrowingLab.scene-spec.md), Section 2 entry. Show an initial group of 3, then learner-controlled 'Add two' action places exactly two new counters in a labeled 'arrived' area. Preserve both initial and new counts.
3. **markdown (supported):** “Three were already here, and two arrived; now there are five. This time addition describes a change in one collection, although the numbers match the bowl story.” Display the mathematical statement **3 + 2 = 5** as readable symbolic text.

**Learner action and interaction:** Show an initial group of 3, then learner-controlled 'Add two' action places exactly two new counters in a labeled 'arrived' area. Preserve both initial and new counts. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** If the learner labels five as 'arrived', explicitly distinguish the added two from the final five; if the total is guessed as three, ask what happened to the two arrivals.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Keep the model available and move to the next contrast only after the current example has been fully explained.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** “Adding can also show how a group grows.” after the whole demonstration and explanation are available (planned, not wired).

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

### Section 3 — Same Numbers, Different Story

**Purpose and outcome:** Explain with counters that 3+2=5 in both stories without pretending the first story contains a temporal event.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “Which story joins two groups? Which story makes one group grow?”
2. **scene (generic renderer supported; custom implementation proposed):** [Joining and Growing Lab](./scenes/joiningGrowingLab.scene-spec.md), Section 3 entry. Offer both stories side by side inside the Scene, with semantic labels. Learner selects 'both bowls' or 'two arrive'; display corresponding objects and identical 3+2=5 each time.
3. **markdown (supported):** “Both stories have a total of five, but in one we combined separate bowls and in the other two new counters arrived. The equality alone doesn't tell the entire story.” Display the mathematical statement **3 + 2 = 5** as readable symbolic text.

**Learner action and interaction:** Offer both stories side by side inside the Scene, with semantic labels. Learner selects 'both bowls' or 'two arrive'; display corresponding objects and identical 3+2=5 each time. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** If the learner says both stories must involve arriving counters, show untouched bowls and explain the meaning of counting both.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Keep the model available and move to the next contrast only after the current example has been fully explained.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** None: connect the two prior concepts.

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

### Section 4 — Make and Explain a New Sum

**Purpose and outcome:** Solve a new one-step combine or increase example within ten and check by counting.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “Four counters are waiting. Three more arrive. How many now? Can you also make a two-bowl story for those numbers?”
2. **scene (generic renderer supported; custom implementation proposed):** [Joining and Growing Lab](./scenes/joiningGrowingLab.scene-spec.md), Section 4 entry. Transfer: initial 4, arrival 3, new total 7. Learner predicts 6/7/8, inspects a counter ledger, then toggles to two independent bowls 4 and 3 and explains 4+3=7.
3. **markdown (supported):** “Four plus three equals seven. We can grow a group of four by three or count two separate groups of four and three. Both contain seven overall.” Display the mathematical statement **4 + 3 = 7** as readable symbolic text.

**Learner action and interaction:** Transfer: initial 4, arrival 3, new total 7. Learner predicts 6/7/8, inspects a counter ledger, then toggles to two independent bowls 4 and 3 and explains 4+3=7. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** Six loses one counter, eight double-counts one; show seven individually numbered counters as equivalent accessible text.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Offer a short voluntary explanation of the numerical relationship; end without a scored completion condition.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** “Adding can combine two separate groups.” after the whole demonstration and explanation are available (planned, not wired).

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

## CUSTOM SCENE SPECIFICATIONS

- [Joining and Growing Lab](./scenes/joiningGrowingLab.scene-spec.md): four distinct self-contained prop-free Scene placements, separately initialized in Sections 1–4. No public `mode` prop or additional Resource_Config field is assumed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Adding can combine two separate groups.” — proposed when the relevant conceptual demonstration has been experienced and explained.
2. “Adding can also show how a group grows.” — proposed when the relevant conceptual demonstration has been experienced and explained.

Notes and unlock events are planned, not wired. Do not claim personal persistence, an offline revision sheet or spaced-repetition scheduling. A Note reveal is not mastery evidence.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Transfer: initial 4, arrival 3, new total 7. Learner predicts 6/7/8, inspects a counter ledger, then toggles to two independent bowls 4 and 3 and explains 4+3=7. Learner predictions are formative; Assessment Architect must independently design valid, scored Question_Config items, Skill attribution, hints/retry thresholds and mastery criteria. These illustrative answer choices are not ready-to-ship Quiz data. The current Question adapter's select-one support is not a substitute for implementing custom Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all child-facing text, mathematical terminology, status announcements, Notes and accessible controls into the complete supported locale set with no silent English fallback. Equivalent ordered text/tables must let learners inspect and operate each object-count and equation state without sight, drag or sound. Maintain semantic LTR/RTL operand/number order; keyboard/touch/switch control, WCAG 2.2 AA, large targets, focus, reduced motion, zoom/mobile compatibility. Run all deterministic calculations and feedback offline after a full chosen-locale download; do not invent remote services.

## PRODUCTION / PLATFORM DEPENDENCIES

The generic LessonSection renderer supports `text`, `markdown`, `scene`, and its Lesson Section contract orders resources vertically. Joining and Growing Lab is **proposed, not implemented**, with separate Section entry components/localized context and own tests required after approval. No image/audio/video/code generic blocks or YouTube integration used. Notes, review scheduling and download/sync facilities must not be represented as already implemented. No runtime Lesson Config, Quiz, Question or scoring artifacts created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), awaiting explicit editor approval.
- Canonical `addMeaning.data.ts` linked from the Brief; the shared generated taxonomy is coordinated separately.
- [Create Lesson Content Skill](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- The two meanings must remain distinct in translations, particularly 'both' versus 'more arrived'; no additional curriculum assignment is assumed.

## HANDOFF

This is one **provisional Draft** Content document with the separately reviewable Draft Scene spec. Editor first approves the Methodologist Brief, then evaluates Content and Scene. Scene Designer, Coding Agent and Assessment Architect proceed only with separate authorization. Do not rewrite canon Skills, create scored Questions, or change unrelated Lessons.
