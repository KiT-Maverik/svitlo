# Finding an Unknown Minuend — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/unknownMinuend/
Audience: Children aged 6–8 with part–whole counting, simple addition/subtraction within 20
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; NOT editor-approved)
Learning outcomes: recover a missing starting whole from amount removed and amount left; add those parts; verify in original subtraction; distinguish blank positions.
Target Skills: As directly linked in Methodologist Brief; no duplicate skill definitions
Program dependence: None

## INSTRUCTIONAL CONCEPT

Subtraction can hide the **starting quantity**, not just the answer. We can work backward by _putting removed and remaining counters together_. If four were taken away and seven remain, there had to be eleven to begin with. The discovery is visible before the formula: **7 + 4 = 11**, and the decisive check is **11 − 4 = 7**. The model must not confuse a missing minuend with a missing amount removed.

## LEARNER JOURNEY

1. Notice the removed four and remaining seven without a stated beginning.
2. Reconstruct the whole from both groups, count eleven and connect to addition.
3. Compare □ − 4 = 7 with 11 − □ = 7 to see why the unknown’s position matters.
4. Transfer to □ − 3 = 5, independently suggest eight and check 8 − 3 = 5.

## SECTION PLAN

### Section 1 — How Many Were There at First?

- Purpose / learning outcome: Recognize the unknown as the _starting_ collection.
- Current implementation shape: LessonSection_Config, vertical ordered Resource blocks.
- Ordered content blocks:
  1. **text (available):** “Someone took away 4 counters. You can still see 7. How many counters were there before?”
  2. **scene (generic resource available; new Scene proposed):** [Before and After Builder](./scenes/beforeAfterBuilder.scene-spec.md), hidden-beginning entry with two labeled groups (removed 4, remaining 7), and a “Put both parts together” action.
  3. **markdown (available):** “The 4 taken away and 7 left were all there at the start. Put them together: **4 + 7 = 11**. There were eleven before anything was removed.”
- Core explanation: Removed and remaining are known; the original whole is missing. Each group belongs to the same initial collection, so combining them is meaningful.
- Illustration, learner action and feedback: Children can count both groups or reveal a count ledger; predicted 3/7/11 explained. For 7: “Seven remained, but four more were there before.” For 3: “Seven minus four describes a different action; try putting the parts together.”
- Navigation: Move from the concrete whole to the missing first number in a statement.
- Accessibility, locale, RTL: Explicit “removed 4 / remaining 7 / originally ?” list, nonvisual rebuild button, locale-resolved words, RTL-safe □ position.
- Proposed unlocked Note: “Starting whole = taken away + left,” planned after the two groups are reunited.
- Dependencies: New bespoke Scene; not yet implemented.

### Section 2 — Fill the First Box

- Purpose / outcome: Link reconstruction to □ − 4 = 7 and check it.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks:
  1. **markdown (available):** “Here is the same story: **□ − 4 = 7**. The box is where the starting amount goes. We found it by adding **7 + 4 = 11**.”
  2. **scene (new, proposed):** [Before and After Builder](./scenes/beforeAfterBuilder.scene-spec.md), equation entry: choose a candidate for the first box, substitute into unchanged original subtraction and display removed and remaining amounts.
  3. **text (available):** “Check: **11 − 4 = 7**. That is the number still left. Both parts of the story fit.”
- Core explanation and action: “Try 3,” “Try 7,” “Try 11,” “Show groups,” and “Show check.” 3 − 4 is outside the nonnegative model, explicitly **not** a valid way to leave seven; 7 − 4 = 3, not seven; 11 − 4 = 7. Do not claim a negative result equals seven.
- Navigation: Ask where the box appears if instead we do not know how much was taken away.
- Accessibility: Full original and substituted equations read aloud in text descriptions, screen-reader equality verdict, no hidden correctness signal.
- Note: “Check by putting the number in the original subtraction,” planned after a verified substitution.
- Dependencies: Scene-based formative checking only.

### Section 3 — Which Number Is Missing?

- Purpose: Distinguish missing _starting whole_ from missing _removed amount_, avoiding rule confusion.
- Current implementation shape: LessonSection_Config.
- Ordered blocks:
  1. **text (available):** “Compare **□ − 4 = 7** with **11 − □ = 7**. Which box is the starting number? Which box is the amount removed?”
  2. **scene (proposed):** [Before and After Builder](./scenes/beforeAfterBuilder.scene-spec.md), role-comparison entry that highlights original-whole, taken-away and remainder roles, with no compulsory answer.
  3. **markdown (available):** “In the first equation, **11** was missing at the start. In the second, we already have 11 and must find the amount taken away: **4**. The blank's place changes the question.”
- Core explanation: The operand's role controls the inverse operation, not the shape of the box. Do not start a full lesson on finding unknown subtrahends here.
- Interaction feedback: “Both blanks are 11” → “Check 11−11: it leaves zero, not seven.” “Both blanks are 4” → “4−4 leaves zero, not seven.” Correct distinction includes the reason.
- Navigation: A new unknown beginning case will need less help.
- Accessibility: Labels “first number / amount taken away / remainder” and linear alternative to any visual highlighting.
- Note: No additional Note; revisit role distinction.
- Dependencies: Independent prop-free placement, same approved scenario.

### Section 4 — Build a New Beginning

- Purpose: Apply the concept without repeating the eleven-counter story.
- Current shape: LessonSection_Config.
- Ordered blocks:
  1. **text (available):** “**□ − 3 = 5**. Three counters were taken away. Five remain. What was the first number?”
  2. **scene (proposed):** [Before and After Builder](./scenes/beforeAfterBuilder.scene-spec.md), independent entry, optional model and candidate 7 / 8 / 9; substitution in original equality.
  3. **markdown (available):** “Put the parts together: **3 + 5 = 8**. Check **8 − 3 = 5**. Eight was the starting whole.”
- Feedback: 7−3=4, 9−3=6, neither matches the given five; 8−3=5 matches. Show full explanation without submitting a choice.
- Navigation: Voluntary reflection “Why did adding help us solve a subtraction?” via selection, optional speech to an adult or typed reply; no score.
- Accessibility: Text-only equivalent of candidate inspection and the original expression, clear focus/touch and RTL operation order.
- Notes: Recall “starting whole = taken away + left.”
- Dependencies: Scenes proposed, no formal assessment.

## CUSTOM SCENE SPECIFICATIONS

- [Before and After Builder](./scenes/beforeAfterBuilder.scene-spec.md) — four independently initialized prop-free Scene entries for reconstruction, checking, role comparison and transfer.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- “Starting whole = taken away + left.” Unlock proposal after a physical/textual reconstruction of eleven.
- “Check in the original subtraction.” Unlock after the first complete checked substitution.

Notes are planned, not wired; no Note events, learner-specific persistence, review sheet or spaced scheduler exists by implication. Revealing a Note does not establish mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Counter reconstruction and numerical candidate feedback are formative practice. Assessment Architect may later create validated items for unknownMinuend while separating evidence from unknownSubtrahend. No scored Question, threshold or mastery inference is specified. The current generic Lesson renderer supports text/markdown/scene blocks; the Quiz adapter's select-one support is not an implementation of these Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All strings/feedback/aria/Notes need genuine translations across supported locales, without English fallback. The meanings of original, removed and remaining are differentiated in short readable text; the counter grouping is fully operable through keyboard, touch and screen readers with an equivalent state ledger. Use semantic RTL order, visible focus, large targets, reduced motion, zoom/mobile and low-device HTML/SVG, and complete offline local calculations after content download. Speech recognition and drag are not required.

## PRODUCTION / PLATFORM DEPENDENCIES

Available: LessonSection_Config and general text, markdown and scene rendering. Proposed: Before and After Builder, independent scene entrypoints, full translations and tests. Image/audio/video/code blocks are typed-only in the generic renderer; YouTube has no supported resource config; none needed. Notes/sync/review scheduler not claimed implemented. Assessment Architect separately owns scored work.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md) (Draft, not approved).
- [English generated Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Approve the new Brief before promoting this provisional script; confirm how much unknown-subtrahend contrast belongs here.
- No particular national Curriculum or efficacy outcome asserted.

## HANDOFF

Provisional Draft script and separately reviewable Draft Scene spec, not authorized for coding until Methodologist and Scene/editor gates have passed. No runtime data, graded Questions, taxonomy modifications or Program story in this handoff.
