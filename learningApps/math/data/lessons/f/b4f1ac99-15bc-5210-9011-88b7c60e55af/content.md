# One Group or One in Each? — Content

Status: Draft — provisional Screenwriter script pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionByOneAndSelf/
Primary audience: Grade 2
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not editor-approved)
Target Skills: by1AndSelf — links in the Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Use two distinct sharing models to show that dividing by one keeps the starting quantity, while a nonzero number divided by itself equals one. Avoid the false extension to 0 ÷ 0.

For a whole number a, a ÷ 1 = a. For a positive a, a ÷ a = 1. The first model has one group of a; the second has a groups of one. 6 ÷ 1 = 6 and 6 ÷ 6 = 1; 9 ÷ 1 = 9 and 9 ÷ 9 = 1. Checks: 1×6=6, 6×1=6, 1×9=9, 9×1=9. Zero divided by one equals zero, but 0 ÷ 0 is undefined. No fraction/negative arithmetic.

The child first predicts, then performs an exact group action, then compares the observed amounts to the original mathematical statement. Explanation and retry are available without any graded gate.

## LEARNER JOURNEY

1. **Six in One Group:** Move all six counters from an initial pool to exactly one named receiving group; allow individual or one-action transfer.
2. **One in Each of Six:** Give one original counter to each of six named groups, tracking the unchanged total six.
3. **The Same Whole, Different Share:** Compare two separately labeled models with ledger entries Total6/Groups1/Each6 and Total6/Groups6/Each1; select which number names groups.
4. **Nine and a Boundary:** Offer two independent nine-counter stories and a zero-divisor non-example with no quotient result; disclose reasons without requiring a guess.

## SECTION PLAN

### Section 1 — Six in One Group

- **Objective:** Build and read 6 ÷ 1 = 6 as one group containing six.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “Six counters shared into ONE group. How many in it?”
- **Scene resource (generic type exists; new implementation proposed):** [One and Self Division Studio](./scenes/oneSelfDivisionStudio.scene-spec.md). Move all six counters from an initial pool to exactly one named receiving group; allow individual or one-action transfer.
- **Markdown resource (available):** “The divisor one counts groups. All six counters go into that one group.” Equation **6 ÷ 1 = 6; 1 × 6 = 6**.
- **Child's meaningful action and feedback:** Move all six counters from an initial pool to exactly one named receiving group; allow individual or one-action transfer. For common wrong responses: If one is chosen, explain one is group count, not share size. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Offer replay, full explanation, and then the next conceptual contrast without mandatory success.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** Divide by one: the only group gets the whole amount., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

### Section 2 — One in Each of Six

- **Objective:** Build and read 6 ÷ 6 = 1 as six groups of one.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “Six counters shared among SIX groups. How many in each?”
- **Scene resource (generic type exists; new implementation proposed):** [One and Self Division Studio](./scenes/oneSelfDivisionStudio.scene-spec.md). Give one original counter to each of six named groups, tracking the unchanged total six.
- **Markdown resource (available):** “Six groups each get one. The quotient is one counter per group.” Equation **6 ÷ 6 = 1; 6 × 1 = 6**.
- **Child's meaningful action and feedback:** Give one original counter to each of six named groups, tracking the unchanged total six. For common wrong responses: If six is chosen, six groups of six would require thirty-six objects. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Offer replay, full explanation, and then the next conceptual contrast without mandatory success.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** A positive number divided by itself gives one in each group., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

### Section 3 — The Same Whole, Different Share

- **Objective:** Compare divisor and quotient roles in both models and verify with multiplication.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “Why are the answers to 6 ÷ 1 and 6 ÷ 6 different?”
- **Scene resource (generic type exists; new implementation proposed):** [One and Self Division Studio](./scenes/oneSelfDivisionStudio.scene-spec.md). Compare two separately labeled models with ledger entries Total6/Groups1/Each6 and Total6/Groups6/Each1; select which number names groups.
- **Markdown resource (available):** “The total remains six, but changing the number of groups changes the size of each share.” Equation **6 ÷ 1 = 6; 6 ÷ 6 = 1**.
- **Child's meaningful action and feedback:** Compare two separately labeled models with ledger entries Total6/Groups1/Each6 and Total6/Groups6/Each1; select which number names groups. For common wrong responses: If child says both answers six, reveal the one-in-each group counts. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Offer replay, full explanation, and then the next conceptual contrast without mandatory success.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** A positive number divided by itself gives one in each group., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

### Section 4 — Nine and a Boundary

- **Objective:** Apply to nine and reject 0 ÷ 0 as undefined.
- **Structure:** one ordered vertical LessonSection_Config, text → scene → markdown.
- **Text resource (available):** “Try 9 ÷ 1, 9 ÷ 9 and 0 ÷ 0. Which expression is undefined?”
- **Scene resource (generic type exists; new implementation proposed):** [One and Self Division Studio](./scenes/oneSelfDivisionStudio.scene-spec.md). Offer two independent nine-counter stories and a zero-divisor non-example with no quotient result; disclose reasons without requiring a guess.
- **Markdown resource (available):** “One group receives nine; nine groups receive one. The divisor cannot be zero, so 0 ÷ 0 is not one.” Equation **9 ÷ 1 = 9; 9 ÷ 9 = 1; 0 ÷ 0 undefined**.
- **Child's meaningful action and feedback:** Offer two independent nine-counter stories and a zero-divisor non-example with no quotient result; disclose reasons without requiring a guess. For common wrong responses: If 0÷0=1 is proposed, explain a zero divisor does not identify a unique quotient. The original counters and calculation remain inspectable; do not mark a false trial as a true identity.
- **Model:** each source counter, group total, group count, number in each, remainder (if any) and check have equivalent ordered text and focusable controls.
- **Navigation:** Close with voluntary reflection, no score or assumed mastery.
- **Accessibility/localization:** real locale strings, independent semantic LTR/RTL numerical ordering, keyboard/touch/switch and screen-reader actions, visible focus, reduced-motion and offline state parity.
- **Planned Note:** A positive number divided by itself gives one in each group., only after complete evidence and explanation, not a score or wired event.
- **Dependencies:** proposed self-contained prop-free scene entry; no invented API or runtime props.

## CUSTOM SCENE SPECIFICATIONS

- [One and Self Division Studio](./scenes/oneSelfDivisionStudio.scene-spec.md), four independent Scene placements described in a separate Draft specification.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- “Divide by one: the only group gets the whole amount.” — proposed after complete model explanation.
- “A positive number divided by itself gives one in each group.” — proposed after complete model explanation.

These Notes are not implemented, persisted or scheduled; unlocking is not mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 introduces new numbers and a meaningful check. All interactions are formative; Assessment Architect owns separately validated scored Questions, Skill attribution and passing thresholds. Select-one Quiz support in the generic adapter does not implement these proposed Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all text, controls, aria descriptions, status and feedback into every supported locale without fallback. A nonvisual learner must be able to perform each action with a keyboard and ordered interactive count ledger, not merely listen to a summary of a picture. RTL order must preserve the actual dividend/divisor/quotient. Ensure WCAG 2.2 AA, 200% zoom, mobile, reduced motion, child-sized targets and downloaded offline equivalence.

## PRODUCTION / PLATFORM DEPENDENCIES

Generic LessonSection_Config text/markdown/scene rendering exists, but One and Self Division Studio is **proposed**. After approval, implement prop-free entries and own tests, full locale content, offline calculations and accessibility. Notes/review scheduling/PWA sync are separate product features. No React or Quiz implementation is authored here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft.
- [Generated Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md), coordinator-owned and not edited.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Keep 0 ÷ 0 as a short age-appropriate boundary and avoid requiring algebraic proof.

## HANDOFF

Provisional Draft script plus Draft Scene specification for editorial review. Methodologist approval precedes Content/Scene review, then separate Scene Designer/Coding Agent work. No existing Lesson changed.
