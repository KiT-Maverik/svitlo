# Three at a Time: Division Facts by Three — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionByThree/
Primary audience: Grade 3
Methodologist source: [Methodologist Brief](./methodologist-brief.md) — Draft, not approved
Target Skills: by3; direct canonical links in the Methodologist Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Develop exact division-by-three facts by linking multiples of three, equal groups, stepping in threes and inverse multiplication, not memorizing a table without evidence. Explain quotient units based on the chosen grouping or sharing interpretation.

Whole-number exact division by three corresponds to multiples of three: 3×4=12 so 12÷3=4; 3×5=15 so 15÷3=5; 3×6=18 so 18÷3=6; 3×7=21 so 21÷3=7. In the grouping model 12÷3=4 means FOUR groups of THREE; in the sharing model 15÷3=5 means THREE groups of FIVE. Inverse check always uses the original dividend and divisor. 20 ÷ 3 is non-exact in whole numbers (six groups of three plus two left), so must not be labeled 20÷3=6 as an exact equality. All positive whole factors, totals ≤30, no fraction or formal remainder algorithm needed.

Learners act on a controlled model or interpret an original equation, test a prediction and receive an exact explanation. The mathematical statement never changes just to make a guess look correct.

## LEARNER JOURNEY

1. **Build Twelve in Threes:** Starting with twelve distinct counter IDs, 'Make one group of three' consumes three at a time, revealing groups 1,2,3,4 and pool 12→9→6→3→0.
2. **Share Fifteen Among Three:** In a separate fair-sharing entry, give each of three labeled trays one counter per round, until all fifteen are assigned. Five appear in each; compare with grouping meaning from previous Section.
3. **Step by Three to Eighteen:** Show number sequence 0,3,6,9,12,15,18 with a focusable step counter. The child counts six three-steps and evaluates the original division using 3×6=18.
4. **A New Total: Twenty-One:** Learner predicts six/seven/eight, optionally builds seven 3-counter groups or checks each multiplication: 3×6=18, 3×7=21, 3×8=24; reveal exact full model.

## SECTION PLAN

### Section 1 — Build Twelve in Threes

- **Outcome:** Build four groups of three from twelve counters to justify 12 ÷ 3 = 4.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “Twelve counters, with THREE in each group: how many complete groups can you build?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Three Step Division Explorer](./scenes/threeStepDivisionExplorer.scene-spec.md), independent entry 1. Starting with twelve distinct counter IDs, 'Make one group of three' consumes three at a time, revealing groups 1,2,3,4 and pool 12→9→6→3→0.
- **Markdown Resource (supported):** “There are four groups of three. Four is the number of complete groups.” Mathematical record: **12 ÷ 3 = 4; 3 × 4 = 12**.
- **Learner action and reflection:** Starting with twelve distinct counter IDs, 'Make one group of three' consumes three at a time, revealing groups 1,2,3,4 and pool 12→9→6→3→0. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If three groups suggested, count 3×3=9, with three counters left to form the fourth.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** Invite the next example after a complete explanation, with independent replay/reset and no success threshold.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “To divide by three, build or count complete groups of three.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

### Section 2 — Share Fifteen Among Three

- **Outcome:** Use three equal sharing groups to show 15 ÷ 3 = 5 and identify five as items per group.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “Fifteen counters shared among THREE groups: how many in EACH group?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Three Step Division Explorer](./scenes/threeStepDivisionExplorer.scene-spec.md), independent entry 2. In a separate fair-sharing entry, give each of three labeled trays one counter per round, until all fifteen are assigned. Five appear in each; compare with grouping meaning from previous Section.
- **Markdown Resource (supported):** “Now the divisor three counts the groups, and five counts counters in each. The story changes what the quotient counts.” Mathematical record: **15 ÷ 3 = 5; 3 × 5 = 15**.
- **Learner action and reflection:** In a separate fair-sharing entry, give each of three labeled trays one counter per round, until all fifteen are assigned. Five appear in each; compare with grouping meaning from previous Section. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If child answers three, explain three trays with three each contain nine, not fifteen.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** Invite the next example after a complete explanation, with independent replay/reset and no success threshold.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “Check your answer by multiplying it by three to get the original total.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

### Section 3 — Step by Three to Eighteen

- **Outcome:** Find 18 ÷ 3 = 6 using a 3-step number sequence or a matching multiplication fact, checking 3 × 6 = 18.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “How many threes make eighteen? Which multiplication can check it?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Three Step Division Explorer](./scenes/threeStepDivisionExplorer.scene-spec.md), independent entry 3. Show number sequence 0,3,6,9,12,15,18 with a focusable step counter. The child counts six three-steps and evaluates the original division using 3×6=18.
- **Markdown Resource (supported):** “Six steps of three reach eighteen. The quotient is six; multiplication rebuilds the original eighteen.” Mathematical record: **18 ÷ 3 = 6; 3 × 6 = 18**.
- **Learner action and reflection:** Show number sequence 0,3,6,9,12,15,18 with a focusable step counter. The child counts six three-steps and evaluates the original division using 3×6=18. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If five selected, show five threes are fifteen, not eighteen; another group of three is needed.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** Invite the next example after a complete explanation, with independent replay/reset and no success threshold.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “Check your answer by multiplying it by three to get the original total.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

### Section 4 — A New Total: Twenty-One

- **Outcome:** Transfer independently to 21 ÷ 3 = 7 and use inverse multiplication to reject a wrong quotient.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “Twenty-one divided by three: how many equal groups of three? How do you check?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Three Step Division Explorer](./scenes/threeStepDivisionExplorer.scene-spec.md), independent entry 4. Learner predicts six/seven/eight, optionally builds seven 3-counter groups or checks each multiplication: 3×6=18, 3×7=21, 3×8=24; reveal exact full model.
- **Markdown Resource (supported):** “Seven threes make twenty-one. Multiplication confirms the quotient and leaves no remainder.” Mathematical record: **21 ÷ 3 = 7; 3 × 7 = 21**.
- **Learner action and reflection:** Learner predicts six/seven/eight, optionally builds seven 3-counter groups or checks each multiplication: 3×6=18, 3×7=21, 3×8=24; reveal exact full model. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If six chosen, only eighteen counters are grouped; if eight, twenty-four would be required, exceeding the original total.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** End with a voluntary explanation of what makes the division true or undefined, not with a scored mastery result.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “Check your answer by multiplying it by three to get the original total.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

## CUSTOM SCENE SPECIFICATIONS

- [Three Step Division Explorer](./scenes/threeStepDivisionExplorer.scene-spec.md), one standalone Draft spec with four independent prop-free Section-specific entries.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- “To divide by three, build or count complete groups of three.” — proposed only after a full worked model is accessible.
- “Check your answer by multiplying it by three to get the original total.” — proposed only after a full worked model is accessible.

No Note persistence, unlock event, personal offline sheet, scheduler or mastery state is implemented by the document.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

New numerical examples with transparent feedback are formative experiences. Assessment Architect separately approves any graded Questions, Skill coverage, permitted answer formats, thresholds, retries and mastery evidence. A child's one correct answer in a proposed Scene is not a validated score. No runtime Quiz/Question included.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Use real translations in every supported locale (no silent English fallback), including result-check, undefined-operation explanations, object states and aria labels. LTR/RTL adapt semantically, preserving operand roles. An operable ordered count/number ledger plus native keyboard/touch/switch controls must give a nonvisual child every choice and mathematical step; do not rely on color, dragging, animation, sound or time. WCAG 2.2 AA, zoom/mobile, focus, reduced motion and local offline parity after the entire chosen-language package is downloaded.

## PRODUCTION / PLATFORM DEPENDENCIES

Text/markdown/scene Resource rendering and LessonSection_Config exist; Three Step Division Explorer is **proposed and not implemented**, with prop-free entries, real locale integration and own tests required. Notes/review/sync/download are separate product capabilities, not assumed existing. No Quiz, Question, React Scene, scoring or mastery implementation is part of this editorial batch.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, not approved.
- [Generated Playground Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md) (coordinator-controlled).
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Use meaningful regrouping and inverse checks rather than four similar flashcards. Each context must say whether three represents group size or number of groups; preserve Grade 3 audience.

## HANDOFF

Provisional four-Section Screenwriter Draft plus separate Scene Draft, requiring Methodologist/editor approval before Scene Designer and Coding Agent implementation. Assessment Architect owns graded tasks. No existing Lessons modified.
