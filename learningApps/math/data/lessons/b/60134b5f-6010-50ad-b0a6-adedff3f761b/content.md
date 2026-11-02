# Compare Tens First: Ordering Numbers to 100 — Content

Status: **Provisional Draft — pending Methodologist approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/compareAndOrderTwoDigitNumbers/`
Primary audience: Grade 2
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md) (not yet approved)
Target Skills: exactly the canonical linked Skill files in the Brief; no copied UUIDs or alternate taxonomy
Program dependence: None
Runtime Lesson: **Not implemented**

## INSTRUCTIONAL CONCEPT

Compare and arrange two-digit numbers by the more significant tens place first and the ones only when tens are equal. Justify order using quantities rather than numeral appearance.

**Exact mathematical foundation and reference model:** Compare tens first in two-digit decimal numbers: 47<52 because four tens<five tens even though seven ones>two ones; 29<31 because two tens<three. When tens match, compare remaining ones: 63<68 since both have six tens but three ones<eight. Identical values are equal: 72=72 even if counters are rearranged. Sort 42,29,71,24 ascending as 24,29,42,71. Sort 90,86,80,69 descending as 90,86,80,69. The tens-place rule, not the last digit's graphic size, determines magnitude.

The learner actively constructs or changes a representation, predicts its effect and explains a discrepancy. The Lesson does **not** consist of a long Markdown lecture plus a token quiz. One Scene provides the guided causal encounter, a short reflection section retrieves the rule and challenges a shortcut, and a **different** second Scene tests the rule with changed numbers and a new context. Correct answers are accompanied by verifiable evidence, not praise alone.

## LEARNER JOURNEY

1. **Question and prediction:** “Compare 47 and 52. Do seven ones make 47 larger?” Learner can think or select an outcome before acting, but is not forced to make a guess.
2. **Manipulate and notice:** 47=40+7<50+2=52; 29<31. 63<68; 72=72. An object/amount/count ledger connects concrete items with the written numbers.
3. **Explain the counterexample:** Forty-seven ends in 7 and fifty-two ends in 2. Is 47 bigger just because 7 is bigger than 2? Child attempts a reasoning response before the short worked explanation.
4. **Independent transfer:** Arrange 42,29,71,24 from smallest to largest. The second Scene has its own state and a new number, item or money configuration; it is not a prop-mode clone.
5. **Conclude and retrieve:** The final worked example and the planned Note express the enduring principle without a time limit, score or mastery claim.

## SECTION PLAN

### Section 1 — Tens-First Comparator

- **Purpose:** Develop the principle through a manipulable concrete model and a counterexample.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “Compare 47 and 52. Do seven ones make 47 larger?”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [Tens-First Comparator](./scenes/tensFirstComparator.scene-spec.md). Presets A=47,B=52; A=29,B=31; A=63,B=68; equal pair 72/72. Each item has explicit tens bundles and loose one identities.
  3. **`markdown` — existing generic renderer:** “47<52 and 29<31 because the larger tens count wins. 47=40+7<50+2=52; 29<31.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “Compare 47 and 52. Do seven ones make 47 larger?”** Inspect four complete tens vs five tens, then choose 47<52. A secondary 29/31 counterexample uses nine ones vs one. **Result:** 47<52 and 29<31 because the larger tens count wins. **Why the plausible mistake fails:** For 47>52, show the extra complete ten in 52 is greater than the difference in loose ones. **Verified model:** 47=40+7<50+2=52; 29<31.
  - **Beat 2: “Now compare 63 and 68; then try 72 and 72.”** Since six tens match, compare three vs eight ones; then inspect identical value 72 in varied arrangements. **Result:** 63<68 because 3<8 ones; 72=72 regardless of spacing. **Why the plausible mistake fails:** For greater on 63/68, show the five unmatched ones in 68. For not-equal on 72, match all ten-groups and loose ones. **Verified model:** 63<68; 72=72.
- **Independent controls:** Select pair; inspect tens; inspect ones; select <,>,=; show grouping evidence; reveal; reset. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** Selected pair, immutable operand values, derived tens and ones counts, selected relation and worked comparison ledger. Choosing a relation never changes the source numbers.
- **Instructional boundary:** Do not teach comparing ones before tens when tens differ; 100 is a three-digit endpoint and not a two-digit sort card.
- **Accessibility and RTL:** A/B role and tens/ones ledger are labelled in words; math signs and operands are directionally isolated so RTL cannot invert the comparison accidentally. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “Compare tens first; one extra group of ten can outweigh any loose ones.” is planned only, with no event or persistence.

### Section 2 — Which Digit Really Decides?

- **Purpose:** Retrieve a numerical invariant and contrast it with a likely mistaken shortcut without score or response validation.
- **Current Section shape:** `LessonSection_Config`, one ordered vertical Resource column.
- **Ordered content blocks:**
  1. **`text` (existing renderer):** “Forty-seven ends in 7 and fifty-two ends in 2. Is 47 bigger just because 7 is bigger than 2?”
  2. **`markdown` (existing renderer):** “No. Fifty-two has five tens, and forty-seven has four. The tens are the larger place and decide which number is bigger.”
  3. **`markdown` (existing renderer):** “For 63 and 68, both have six tens, so their ones decide: 3<8.”
- **Instructional dialogue:** Invite a child to give a private, spoken or recorded-on-paper answer before reading the explanation. The existing text/Markdown blocks do not implement hidden-answer input or auto-grading, so no such widget, correctness tracking or KnowledgeCheckpoint API is claimed.
- **Misconception feedback:** 47>52 because 7>2, 29>31 because 9>1, 63 and 68 assumed equal because both show six tens, confusing 80 and 86 due to zeros, dropping one item during ordering, mirroring <,> under RTL. Use the detailed preceding Scene model if the child remains unsure.
- **Navigation and access:** The explanation remains legible to a screen reader and does not require a visual page transition, sound or animation.

### Section 3 — Order the Tens Cards

- **Purpose:** Apply the principle to unfamiliar quantities or representations, not replay the first model.
- **Current Section contract:** `LessonSection_Config`, one **vertically ordered nonempty** list of typed resources, not a Quiz.
- **Ordered Resource blocks:**
  1. **`text` — existing generic renderer:** “Arrange 42,29,71,24 from smallest to largest.”
  2. **`scene` — generic type supported, bespoke implementation proposed:** [Order the Tens Cards](./scenes/orderTheTensCards.scene-spec.md). First task four unique cards with values [42,29,71,24], in unsorted slots; second independent task values [90,86,80,69], with requested largest-to-smallest ordering.
  3. **`markdown` — existing generic renderer:** “24,29,42,71 is the correct ascending row. 24<29<42<71.”
- **Learner-controlled beats, observations and feedback:**
  - **Beat 1: “Arrange 42,29,71,24 from smallest to largest.”** Build an ordered tray and check 24<29<42<71, explaining why 24 precedes 29 despite sharing two tens. **Result:** 24,29,42,71 is the correct ascending row. **Why the plausible mistake fails:** If 29 before 24, compare equal two tens and ones nine vs four. If 42 before 29, compare four tens vs two. **Verified model:** 24<29<42<71.
  - **Beat 2: “Now arrange 90,86,80,69 from largest to smallest.”** In a new preset, place 90 first, 86 second, 80 third, 69 last; use tens then ones to justify. **Result:** 90,86,80,69 is descending and retains all four cards. **Why the plausible mistake fails:** For 80 before 86, compare equal eight tens and six additional ones in 86. For 69 before 90, compare six vs nine tens. **Verified model:** 90>86>80>69.
- **Independent controls:** Choose card; place in ordinal slot; move one slot earlier/later; inspect adjacent tens/ones; reset; switch challenge; reveal. Full worked reveal is always available and Reset applies only to this Scene, without scoring or locks.
- **Mathematical state:** Card identity list, placement permutation, direction, pairwise comparison hints and reveal. Each original card appears exactly once in output; positions correspond to numerical order not CSS side.
- **Instructional boundary:** Strictly teach numeric sorting of two-digit natural values, not alphabetical sorting of written number words. Equality of identical values remains valid when separately shown.
- **Accessibility and RTL:** Slots are numbered semantically first/second/third/fourth with 'smallest-first' or 'largest-first' label. Keyboard selection and move actions replace dragging, including under RTL. Show the same model in an ordered text ledger, with native buttons and no required audio or drag. Error feedback is specific, never just a success badge.
- **Transition and Note:** After explanation ask the learner which relationship remains true in the next changed model; proposed recall cue “If tens are equal, compare ones, then keep the whole row in the required order.” is planned only, with no event or persistence.

## CUSTOM SCENE SPECIFICATIONS

- [Tens-First Comparator](./scenes/tensFirstComparator.scene-spec.md) — distinct concrete exploration.
- [Order the Tens Cards](./scenes/orderTheTensCards.scene-spec.md) — separately initialized changed-context transfer.

Both are **proposed prop-free Scene components**, not existing React code. Generic `scene` Resource support alone does not implement the named Scenes, and no new Resource discriminator, Scene mode prop or undocumented app context is assumed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Compare tens first; one extra group of ten can outweigh any loose ones.” — after the first worked contrast, independently of the answer given.
2. “If tens are equal, compare ones, then keep the whole row in the required order.” — after inspecting the transfer case's worked reasoning.

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
| Tens-First Comparator, Order the Tens Cards           | **Proposed** Screenwriter specifications | Editor approval, Scene Designer, independent tests   |
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
