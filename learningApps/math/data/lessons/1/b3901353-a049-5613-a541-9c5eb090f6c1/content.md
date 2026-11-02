# Finding an Unknown Divisor — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/unknownDivisor/
Audience: Readiness-gated enrichment for 6–8-year-olds who can explain exact division and matching multiplication, NOT universal grade 1–2
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; not approved)
Learning outcomes: locate missing divisor, reconstruct from known nonzero dividend and quotient, explain using distinct group roles, check original exact division, reject zero divisor.
Target Skills: Canonical unknownDivisor.data.ts directly linked from Methodologist Brief.
Program dependence: None

## INSTRUCTIONAL CONCEPT

In a division, the **starting total** and the **answer per group** may be known while the **number of equal groups** is missing. For the explicit sharing story, “Twelve counters shared evenly into some groups give four counters in each,” ask how many groups can be made. Forming groups of four from twelve gives three, so **12 ÷ 4 = 3** finds the group count. The _original_ statement is **12 ÷ □ = 4**; putting three in the box gives **12 ÷ 3 = 4**. This exact check, not merely the finding calculation, completes the reasoning.

Only exact division with nonzero dividend, nonzero quotient and positive integer divisor in examples ≤25; a divisor of zero is never allowed. For this story the divisor is a **group count**. Another valid division story uses divisor as group **size**, but the lesson must identify that model separately rather than making a secret switch. This is advanced enrichment after multiplication and exact division prerequisites.

## LEARNER JOURNEY

1. Inspect 12 shared among three known groups, four each; name total, divisor, quotient.
2. Hide the group-count numeral, leaving twelve total and four per group; build and count three groups.
3. Insert candidate divisors into 12 ÷ □ = 4, check exactly; contrast quotient 4 with divisor 3 and forbidden divisor zero.
4. Transfer to 20 ÷ □ = 5: form groups of five, find four groups, and check 20 ÷ 4 = 5.

## SECTION PLAN

### Section 1 — Twelve Shared Fairly

- Purpose: Identify the three roles in a complete exact-division example before hiding one.
- Current shape: LessonSection_Config, vertical ordered Resource blocks.
- Ordered blocks:
  1. **text — available:** “Twelve counters are shared equally among **3 groups**. Each group has **4**. What does each number tell us?”
  2. **scene — generic Scene resource available, custom implementation proposed:** [Missing Divisor Sharing Lab](./scenes/missingDivisorSharingLab.scene-spec.md), known-division placement with three labeled groups of four and three separate role labels.
  3. **markdown — available:** “**12 ÷ 3 = 4**. Twelve was the total. Three was the number of groups. Four was in each group. The number after ÷ is called the divisor.”
- Core explanation: Dividend = total twelve; divisor = three groups _in this story_; quotient = four per group. No automatic promotion to formal language before seeing quantities.
- Learner action/feedback: “Inspect total,” “Inspect group count,” “Inspect each group” (keyboard-operable). If the child confuses three with four: “Three groups. Four counters **inside each**.” No score.
- Navigation: Hide only the number of groups, with all twelve counters still countable.
- Accessibility/RTL: Ordered group ledger and full mathematical expression; distinct semantic labels not inferred from spatial left/right.
- Note: No new Note yet; this recalls a prerequisite.
- Dependencies: Custom Scene proposed.

### Section 2 — How Many Groups Could There Be?

- Purpose: Recover a missing divisor from the known total and quotient.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “**12 ÷ □ = 4**. We have twelve counters altogether and want **4 in each group**. How many groups can we make?”
  2. **scene — supported block, proposed new Scene:** [Missing Divisor Sharing Lab](./scenes/missingDivisorSharingLab.scene-spec.md), build-groups placement: user triggers “Make a group of four” repeatedly, drawing from twelve without duplication, and counts three completed groups.
  3. **markdown — available:** “Four, eight, twelve: we made **3 groups** of four. To find the missing divisor we can calculate **12 ÷ 4 = 3**. The original box is **3**.”
- Model and feedback: The twelve counters are partitioned into groups of four, no leftovers. If child suggests 4 groups, explain “Four groups of four would need sixteen, but we have twelve.” A candidate two would give six in each group, not four.
- Navigation: Show the need to put candidate in original statement, not in a different equation.
- Accessibility: “group one four, group two four, group three four; total twelve,” native step controls, no drag.
- Note: “Missing divisor = dividend ÷ nonzero quotient (when exact),” after model and exact arithmetic.
- Dependencies: Bespoke prop-free entry, no automatic graded Question.

### Section 3 — Does the Number Really Work?

- Purpose: Verify by substitution and explicitly distinguish divisor from quotient.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **markdown — available:** “We found **3** groups. Put it into the box of the **original** division: **12 ÷ 3 = 4**. Let's try other numbers and see why they fail.”
  2. **scene — supported generic resource, new Scene proposed:** [Missing Divisor Sharing Lab](./scenes/missingDivisorSharingLab.scene-spec.md), trial-entry using candidate **2 / 3 / 4 / 0**, with each result and zero prohibition explained.
  3. **text — available:** “**12 ÷ 3 = 4** is true. **12 ÷ 4 = 3**, not four. You must never divide by zero.”
- Learner action and feedback: For 2, “12 ÷ 2 = 6; each group would have six, not four”; for 4, “12 ÷ 4 = 3”; for 0, “You cannot divide into zero groups. Division by zero is not defined.” Keep the original equality visible at all times.
- Navigation: New number with same kind of missing role.
- Accessibility: Trial equality is read with full operand names and whether it fits, not a color-only tick.
- Note: “Check the divisor in the original division; it must not be zero,” after comparison.
- Dependencies: Trial choices strictly formative, not validated quiz items.

### Section 4 — A New Missing Divisor

- Purpose: Transfer with the same rule and less guidance.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “**20 ÷ □ = 5.** Twenty counters shared equally: five in each group. How many groups must there be?”
  2. **scene — proposed:** [Missing Divisor Sharing Lab](./scenes/missingDivisorSharingLab.scene-spec.md), transfer-entry with twenty counters optionally revealed, candidate **2 / 4 / 5**, exact original-substitution check.
  3. **markdown — available:** “**20 ÷ 5 = 4** finds the number of groups. Check the **original** division: **20 ÷ 4 = 5**. Four is the missing divisor.”
- Learner feedback: 2 yields 20÷2=10, 5 yields 20÷5=4, 4 yields five. Full explanation accessible without answering. Reflection asks “What did five mean here? What did four mean?” via text, optional speech or selectable phrases.
- Navigation: No grade or fictitious mastery; end after comprehension explanation.
- Accessibility: Locally available full group list, labeled original numbers, screen-reader and keyboard use, semantic RTL; reduced motion and offline parity.
- Notes: Revisit missing-divisor and original-check cues.
- Dependencies: Scene proposed, readiness requirement retained.

## CUSTOM SCENE SPECIFICATIONS

- [Missing Divisor Sharing Lab](./scenes/missingDivisorSharingLab.scene-spec.md), four independent prop-free entries for complete model, group construction, candidate checking and transfer.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Missing divisor = dividend ÷ quotient, when quotient is nonzero and division is exact.” After Section 2 groups of four are built and counted.
2. “Divisor cannot be zero; check it in the original division.” After Section 3 verifies 12÷3=4 and rejects zero.

Proposed Note unlocks, not wired. No Note API, learner state, personalized revision sheet, spaced-retrieval scheduler or scored proof of mastery implied.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Exact grouping, numerical trial feedback and second example are formative teaching; no Question_Config, Quiz or pass criterion authored. Assessment Architect must independently approve how the broad unknownDivisor Skill is evaluated and whether prerequisite readiness is demonstrated, as a child selecting one answer is insufficient. Current Quiz adapter select-one does not implement this Scene's behavior.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every prompt, group role, numerical readout, hint, error, accessible name and Note must have real supported-language translations without fallback. Distinguish “number of groups” and “items per group” when translating division examples. The math symbols and order remain correct in RTL; no naive reversal of dividend and divisor. Ordered text/list mode is fully operable by keyboard, touch and assistive technology as the visual model; no color-only, drag-only, timed or required speech task. Zoom/mobile/reduced-motion and offline deterministic calculations preserve exact understanding after download; no streaming or external media.

## PRODUCTION / PLATFORM DEPENDENCIES

Existing LessonSection_Config and generic text, markdown and scene rendering are available. New Missing Divisor Sharing Lab and per-Section prop-free entries, complete locales, own tests and offline integration are proposed. Image/audio/video/code blocks are typed-only in current generic Section renderer; YouTube lacks config, none required. Notes/review/download systems are separate product work, not fictitious APIs.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md) (Draft, not approved).
- [Generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editor: confirm advanced age gate and explicitly labeled primary equal-sharing story. No claim of universal grade alignment.

## HANDOFF

Provisional Draft lesson script and separately reviewable Draft Scene spec. Editor must approve new Methodologist Brief first, then Content and Scene. Scene Designer, Coding Agent and Assessment Architect operate only under separate authorization; no runtime code or graded Questions are created.
