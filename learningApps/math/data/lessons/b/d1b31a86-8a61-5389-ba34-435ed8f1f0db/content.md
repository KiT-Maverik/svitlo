# Ten Tens Become a Hundred — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/tenTensMakeAWholeHundred/`
Primary audience: Grade 2
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not yet approved)
Target Skills: exactly the canonical linked Skill files in the Brief; no copied UUIDs or alternate taxonomy
Program dependence: None
Runtime Lesson: **Not implemented**

## INSTRUCTIONAL CONCEPT

Discover ten tens are exactly one hundred ones and count by repeated additions of a complete ten, including crossing a hundred while keeping remaining ones unchanged.

**Exact mathematical foundation and reference model:** One group of ten has 10 objects. Ten separate ten-groups contain 100 distinct objects, and repacking them into one hundred-block preserves all 100: ten tens = one hundred = one hundred ones. Each count-by-ten move adds exactly one complete ten and keeps any remaining ones fixed. From 75: 75→85→95→105 has five ones throughout; at 105 the ten full tens regroup into one hundred. From 90: 90→100→110 has nine, then ten tens, then one hundred and one ten. +10 is never the addition of just one loose unit.

The learner actively constructs or changes a representation, predicts its effect and explains a discrepancy. The Lesson does **not** consist of a long Markdown lecture plus a token quiz. One Scene provides the guided causal encounter, a short reflection section retrieves the rule and challenges a shortcut, and a **different** second Scene tests the rule with changed numbers and a new context. Correct answers are accompanied by verifiable evidence, not praise alone.

## LEARNER JOURNEY

1. **Question and prediction:** “If ten bundles each have ten beads, how many beads are there?” Learner can think or select an outcome before acting, but is not forced to make a guess.
2. **Manipulate and notice:** 10+10+10+10+10+10+10+10+10+10=100. 10 tens = 1 hundred = 100 ones, with zero added or removed. An object/amount/count ledger connects concrete items with the written numbers.
3. **Explain the counterexample:** Ten groups each hold ten beads. If they become one hundred-block, did beads disappear? Child attempts a reasoning response before the short worked explanation.
4. **Independent transfer:** Start at 75; add a group of ten three times. What happens to the five loose ones? The second Scene has its own state and a new number, item or money configuration; it is not a prop-mode clone.
5. **Conclude and retrieve:** The final worked example and the planned Note express the enduring principle without a time limit, score or mastery claim.

## SECTION PLAN

### Section 1 — Hundred-Bundle Exchange

- **Purpose:** Develop the principle through a manipulable concrete model and a counterexample.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “If ten bundles each have ten beads, how many beads are there?”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [Hundred-Bundle Exchange](./scenes/hundredBundleExchange.scene-spec.md). Ten named bundles T1–T10 each with ten separate bead IDs, total 100. No hundred group initially; a specific Exchange action is available only for ten complete ten-bundles.
  3. **`markdown` — existing generic renderer:** “There are ten bundles and one hundred beads. 10+10+10+10+10+10+10+10+10+10=100.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “If ten bundles each have ten beads, how many beads are there?”** Inspect all ten complete bundles and accumulate 10,20,30,…,100; compare bundle count with bead count. **Result:** There are ten bundles and one hundred beads. **Why the plausible mistake fails:** For ten beads, show every bundle has its own ten distinct members, not one. **Verified model:** 10+10+10+10+10+10+10+10+10+10=100.
  - **Beat 2: “Exchange ten complete tens for a single hundred-block. What happened to the count?”** Swap grouping from ten groups to one hundred, inspect the same 100 member IDs, and reverse the operation. **Result:** The bead count stays 100 whether written as ten tens, one hundred or one hundred ones. **Why the plausible mistake fails:** For one bead, expand the hundred-block and show all hundred separate original member IDs. **Verified model:** 10 tens = 1 hundred = 100 ones, with zero added or removed.
- **Independent controls:** Inspect member IDs inside a bundle, count cumulative groups of ten, Exchange to hundred, Unbundle hundred into ten tens, Reset. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** 100 stable member IDs, with reversible grouping as ten × ten or one × hundred, group ledger, prediction and Reveal. The same objects exist throughout the exchange.
- **Instructional boundary:** Nine complete bundles are 90 and cannot be traded for 100; Unbundle returns exactly ten complete bundles of ten.
- **Accessibility and RTL:** The object hierarchy is a fully accessible list of ten bundles each naming ten members, also available after conversion under the hundred group. Exchange is a native button rather than precision dragging. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “Ten tens make one hundred, and changing the bundles does not change the number of objects.” is planned only, with no event or persistence.

### Section 2 — Where Did the Beads Go?

- **Purpose:** Retrieve a numerical invariant and contrast it with a likely mistaken shortcut without score or response validation.
- **Current Section shape:** `LessonSection_Config`, one ordered vertical Resource column.
- **Ordered content blocks:**
  1. **`text` (existing renderer):** “Ten groups each hold ten beads. If they become one hundred-block, did beads disappear?”
  2. **`markdown` (existing renderer):** “No. The hundred-block contains all the same hundred beads. Only their grouping changed.”
  3. **`markdown` (existing renderer):** “At 95, adding a group of ten creates 105: the five loose ones stay five, while ten full tens become one hundred.”
- **Instructional dialogue:** Invite a child to give a private, spoken or recorded-on-paper answer before reading the explanation. The existing text/Markdown blocks do not implement hidden-answer input or auto-grading, so no such widget, correctness tracking or KnowledgeCheckpoint API is claimed.
- **Misconception feedback:** Ten ten-bundles are only ten beads; a hundred-block is only one bead; 95+10=96; 95+10=915; ones digit changes during +10; exchanging a hundred-block loses members. Use the detailed preceding Scene model if the child remains unsure.
- **Navigation and access:** The explanation remains legible to a screen reader and does not require a visual page transition, sound or animation.

### Section 3 — Ten-Step Crossing

- **Purpose:** Apply the principle to unfamiliar quantities or representations, not replay the first model.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “Start at 75; add a group of ten three times. What happens to the five loose ones?”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [Ten-Step Crossing](./scenes/tenStepCrossing.scene-spec.md). First case 75 as 7 tens+5 ones, second 90 as 9 tens+0 ones. At 100/105/110 hundreds, tens and ones containers are explicitly named and mathematically consistent.
  3. **`markdown` — existing generic renderer:** “75,85,95,105, with five ones unchanged all along. 75+10=85, 85+10=95, 95+10=105; ones remainder stays 5.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “Start at 75; add a group of ten three times. What happens to the five loose ones?”** Advance 75→85→95→105, keeping five loose ones and regrouping ten complete tens into one hundred at the last step. **Result:** 75,85,95,105, with five ones unchanged all along. **Why the plausible mistake fails:** For 96, distinguish adding ten complete objects from adding just one. For 915, show the 105 grouping as one hundred and five. **Verified model:** 75+10=85, 85+10=95, 95+10=105; ones remainder stays 5.
  - **Beat 2: “Start at 90 and add two groups of ten. What new grouping appears at one hundred?”** Advance 90→100→110; show ten tens become one hundred, then another ten sits beside it. **Result:** 90,100,110, with each step adding a complete ten. **Why the plausible mistake fails:** For 91, show one entire group of ten. For 910, show ten full ten-groups rather than writing the word 'ten' after the digit nine. **Verified model:** 90+10=100; 100+10=110.
- **Independent controls:** Choose preset 75 or 90; Add One Ten; Remove Last Ten; Predict next number; Show hundreds/tens/ones ledger; Reveal; Reset. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** Selected preset, current total, number of added complete ten-groups, hundreds/tens/ones representation and ordered moves. +10 increments the total by 10; remaining ones are unchanged. At ten tens an explicit regrouping creates one hundred.
- **Instructional boundary:** The three-digit numbers 105/110 are explicitly explained through grouped hundred/tens/ones models and are not treated as mastery of `readWrite1000`.
- **Accessibility and RTL:** Each move names previous total, increment +10, new value and number of hundreds/tens/ones; in RTL the numerical sequence and digit order remain correct. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “Every +10 step adds one full ten; any loose ones stay the same.” is planned only, with no event or persistence.

## CUSTOM SCENE SPECIFICATIONS

- [Hundred-Bundle Exchange](./scenes/hundredBundleExchange.scene-spec.md) — distinct concrete exploration.
- [Ten-Step Crossing](./scenes/tenStepCrossing.scene-spec.md) — separately initialized changed-context transfer.

Both are **proposed prop-free Scene components**, not existing React code. Generic `scene` Resource support alone does not implement the named Scenes, and no new Resource discriminator, Scene mode prop or undocumented app context is assumed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Ten tens make one hundred, and changing the bundles does not change the number of objects.” — after the first worked contrast, independently of the answer given.
2. “Every +10 step adds one full ten; any loose ones stay the same.” — after inspecting the transfer case's worked reasoning.

Each Note is a concise future recall cue, **not** an implemented unlocked Note entity. Note IDs, unlock events, persistence, synchronization, revision sheets and spaced retrieval schedules require separate architectural review and implementation.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Guided manipulation in Section 1, short verbal retrieval in Section 2 and different-context transfer in Section 3 create varied formative practice. Their completion is not a validated measure of mastery of each target Skill. Any future scored Question, Quiz, correct-answer security, thresholds, retry policy or formal assessment evidence belongs to the Learning Assessment Architect and is deliberately absent.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All learner-facing prompts, controls, errors, numerals/number words, object identities, accessible state messages and Notes require **genuine translations for every current Engine-supported locale**, with no fallback. Mathematical order, operand identities, currency units and grouping must be preserved in semantic RTL, not flipped mechanically. WCAG 2.2 AA: touch/keyboard/switch controls, visible focus, nonvisual ordered evidence ledger, color-independent status, reduced motion, high zoom and mobile support. Equivalent selected-language instructional data and interaction must remain usable once downloaded offline; these are **requirements, not delivered production features**.

Learner-facing samples in this Markdown are **English editorial source only**. No translation dictionaries or alternative locale content are falsely claimed.

## PRODUCTION / PLATFORM DEPENDENCIES

| Feature                                               | Verified / proposed                      | Later responsibility                                 |
| ----------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| `LessonSection_Config` with ordered `Resource_Config` | Existing TypeScript contract             | Coding Agent assembles only after editorial approval |
| Generic `text`, `markdown`, `scene` renderer          | Observed in Playground                   | Bespoke Scenes remain unimplemented                  |
| Hundred-Bundle Exchange, Ten-Step Crossing            | **Proposed** Screenwriter specifications | Editor approval, Scene Designer, independent tests   |
| Genuine locales, RTL and nonvisual controls           | Product requirements, not delivered      | Localization and accessibility QA                    |
| Selected-language offline Lesson and asset download   | Product target, unverified               | PWA/integration and offline E2E                      |
| Notes, revision sheet, progress, persistent mastery   | Planned or unverified, not wired         | Separate architecture                                |
| Questions, Quizzes, grading                           | Not authored                             | Assessment Architect                                 |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), which links directly to canonical Skills.
- [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md), [Section entity](../../../../../../studio/docs/entities/section.md), [Learning Philosophy](../../../../../../studio/docs/architecture/learning-experience-philosophy.md).
- Editor must approve the Brief first, then Content and each Scene separately. Full locale translation and all nonvisual/RTL/offline behavior need implementation-stage tests.

## HANDOFF

**Provisional Screenwriter Draft, not Approved.** No React components, runtime Lesson data, scored Questions, Quiz, mastery, Notes persistence or assumed existing offline feature were created.
