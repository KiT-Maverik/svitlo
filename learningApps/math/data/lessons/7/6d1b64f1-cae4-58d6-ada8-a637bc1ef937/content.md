# Numbers Across the Tens: Read and Count to 100 — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/readAndCountToOneHundred/`
Primary audience: Grade 2
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not yet approved)
Target Skills: exactly the canonical linked Skill files in the Brief; no copied UUIDs or alternate taxonomy
Program dependence: None
Runtime Lesson: **Not implemented**

## INSTRUCTIONAL CONCEPT

Read and compose whole-number numerals through 100 using tens and ones, then advance or retreat exactly one unit across ten boundaries without restarting the count.

**Exact mathematical foundation and reference model:** A written two-digit numeral represents complete tens and remaining ones: 42 has four tens and two ones, whereas 24 has two tens and four ones; 70 has seven tens and zero ones and is not 7. Each neighboring number differs by exactly one: 28→29→30→31, 31→30→29→28, 98→99→100 and 100→99. At 100, ten complete tens become one hundred; this is a _three-digit endpoint_, not an example of a two-digit numeral. The selected 0–100 exercise range has boundaries but the wider number sequence does not end at 100.

The learner actively constructs or changes a representation, predicts its effect and explains a discrepancy. The Lesson does **not** consist of a long Markdown lecture plus a token quiz. One Scene provides the guided causal encounter, a short reflection section retrieves the rule and challenges a shortcut, and a **different** second Scene tests the rule with changed numbers and a new context. Correct answers are accompanied by verifiable evidence, not praise alone.

## LEARNER JOURNEY

1. **Question and prediction:** “Four tens and two ones: which number names them?” Learner can think or select an outcome before acting, but is not forced to make a guess.
2. **Manipulate and notice:** 4×10+2=42; 2×10+4=24. 7 tens +0 ones=70, not 7. An object/amount/count ledger connects concrete items with the written numbers.
3. **Explain the counterexample:** After twenty-nine comes thirty, not two-ten. Why? Child attempts a reasoning response before the short worked explanation.
4. **Independent transfer:** Count from 28 to 31 one object at a time; what comes after 29? The second Scene has its own state and a new number, item or money configuration; it is not a prop-mode clone.
5. **Conclude and retrieve:** The final worked example and the planned Note express the enduring principle without a time limit, score or mastery claim.

## SECTION PLAN

### Section 1 — Build and Read Two Digits

- **Purpose:** Develop the principle through a manipulable concrete model and a counterexample.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “Four tens and two ones: which number names them?”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [Build and Read Two Digits](./scenes/buildAndReadTwoDigits.scene-spec.md). Three independently selectable model cases: 42 (4 ten-bundles+2 ones), 24 (2+4), 70 (7+0). Every ten bundle has ten named member objects, so its face value is unambiguous.
  3. **`markdown` — existing generic renderer:** “42 names four tens and two ones; 24 names two tens and four ones. 4×10+2=42; 2×10+4=24.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “Four tens and two ones: which number names them?”** Inspect 4 tens +2 ones and choose 42; compare independently with the 2 tens+4 ones case. **Result:** 42 names four tens and two ones; 24 names two tens and four ones. **Why the plausible mistake fails:** If 24 picked for 4 tens+2 ones, expand the four full ten-bundles and show the number of bundles is four, not two. **Verified model:** 4×10+2=42; 2×10+4=24.
  - **Beat 2: “Seven tens but no loose objects: does the numeral say 7 or 70?”** Inspect seven complete ten-bundles and a zero ones bin, then select 70. **Result:** Seven tens represent 70 objects; seven would mean only 7 single objects. **Why the plausible mistake fails:** If 7 chosen, show all seven groups each contain 10 distinct items and the ones position is empty. **Verified model:** 7 tens +0 ones=70, not 7.
- **Independent controls:** Choose case, select numeral, expand one ten-bundle to inspect its 10 members, show numeral and amount ledger, Reset. No precision drag. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** Selected case, ten group IDs, loose unit IDs, selected numeral, explanation, Reset. Display always derives numeral value as 10×numberOfTens+numberOfOnes; comparisons never mutate underlying objects.
- **Instructional boundary:** Treat 100 as a separate regrouped endpoint in the following Scene, not a two-digit numeral.
- **Accessibility and RTL:** Text ledger explicitly names the role of tens and ones and the full number word; in RTL do not mirror the order of numeral digits. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “In two-digit numbers, the tens digit counts tens and the ones digit counts individual ones.” is planned only, with no event or persistence.

### Section 2 — Why Not 210?

- **Purpose:** Retrieve a numerical invariant and contrast it with a likely mistaken shortcut without score or response validation.
- **Current Section shape:** `LessonSection_Config`, one ordered vertical Resource column.
- **Ordered content blocks:**
  1. **`text` (existing renderer):** “After twenty-nine comes thirty, not two-ten. Why?”
  2. **`markdown` (existing renderer):** “Twenty-nine has two tens and nine ones. One more object completes a third ten: three tens and zero loose ones, written 30.”
  3. **`markdown` (existing renderer):** “One step back from thirty yields twenty-nine, not twenty. One object changes, even if regrouping changes how the numeral looks.”
- **Instructional dialogue:** Invite a child to give a private, spoken or recorded-on-paper answer before reading the explanation. The existing text/Markdown blocks do not implement hidden-answer input or auto-grading, so no such widget, correctness tracking or KnowledgeCheckpoint API is claimed.
- **Misconception feedback:** Mixing 42 and 24, treating zero ones as permission to omit 0 from 70, saying 29→210 or 99→910, jumping from 30 backward to 20, or asserting no numbers exist beyond this displayed range. Use the detailed preceding Scene model if the child remains unsure.
- **Navigation and access:** The explanation remains legible to a screen reader and does not require a visual page transition, sound or animation.

### Section 3 — One-Step Hundred Counter

- **Purpose:** Apply the principle to unfamiliar quantities or representations, not replay the first model.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “Count from 28 to 31 one object at a time; what comes after 29?”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [One-Step Hundred Counter](./scenes/oneStepHundredCounter.scene-spec.md). A contiguous 0–100 counting model at 28, with independent presets 31,98,58. Counters are grouped into full tens and loose ones; the 100 endpoint displays ten groups of ten.
  3. **`markdown` — existing generic renderer:** “29 is followed by 30; stepping backwards from 30 gives 29. 28,29,30,31 and 31,30,29,28, each adjacent difference is one.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “Count from 28 to 31 one object at a time; what comes after 29?”** Press +1 thrice to visit 29,30,31, then use −1 to return 30,29,28. **Result:** 29 is followed by 30; stepping backwards from 30 gives 29. **Why the plausible mistake fails:** For 210, point to 30 as three complete tens, not '2' followed by '10'. For 20 when stepping back from 30, show precisely one object removed. **Verified model:** 28,29,30,31 and 31,30,29,28, each adjacent difference is one.
  - **Beat 2: “From 98, add two single objects. Then step back. What happens at 100?”** Take 98→99→100, group ten tens into the 100 endpoint, then 100→99. Independently try 58→59→60. **Result:** 99 is followed by 100, and 100→99 is one backward move; 59→60 is also only one increment. **Why the plausible mistake fails:** For 101 directly after 99, reveal the skipped 100. For 910, count the ten full tens as one hundred rather than joining digits as text. **Verified model:** 98+1=99, 99+1=100, 100−1=99; 58→59→60.
- **Independent controls:** Choose starting preset, +1, −1, inspect ten/one groups, read ordered step log, Reset and Reveal. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** Current value n, bounded 0≤n≤100, +1/−1 actions, fixed preset, move ledger and regrouped item representation. Every move changes n by exactly one, never ten or a string-concatenation trick.
- **Instructional boundary:** At 100 the model displays an endpoint, not an assertion that 101 doesn't exist. At zero, -1 is outside this Lesson's nonnegative range, with an explicit explanation.
- **Accessibility and RTL:** Every action names before number, action, new number, countable objects and any regrouping; keyboard/switch/touch and screen reader can traverse the exact same sequence. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “One step changes a count by one, even when the tens digit changes.” is planned only, with no event or persistence.

## CUSTOM SCENE SPECIFICATIONS

- [Build and Read Two Digits](./scenes/buildAndReadTwoDigits.scene-spec.md) — distinct concrete exploration.
- [One-Step Hundred Counter](./scenes/oneStepHundredCounter.scene-spec.md) — separately initialized changed-context transfer.

Both are **proposed prop-free Scene components**, not existing React code. Generic `scene` Resource support alone does not implement the named Scenes, and no new Resource discriminator, Scene mode prop or undocumented app context is assumed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “In two-digit numbers, the tens digit counts tens and the ones digit counts individual ones.” — after the first worked contrast, independently of the answer given.
2. “One step changes a count by one, even when the tens digit changes.” — after inspecting the transfer case's worked reasoning.

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
| Build and Read Two Digits, One-Step Hundred Counter   | **Proposed** Screenwriter specifications | Editor approval, Scene Designer, independent tests   |
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
