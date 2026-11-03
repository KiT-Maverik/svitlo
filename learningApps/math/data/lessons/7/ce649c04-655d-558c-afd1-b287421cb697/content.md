# Zero as Dividend Is Not Zero as Divisor — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionWithZero/
Primary audience: Grade 3
Methodologist source: [Methodologist Brief](./methodologist-brief.md) — Draft, not approved
Target Skills: zeroDividend, noDivisionByZero; direct canonical links in the Methodologist Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Distinguish the defined operation zero divided by a NONZERO divisor, which gives zero, from every attempt to divide BY zero, which cannot produce a unique quotient. Use the inverse multiplication check rather than a rote prohibition, with accessible empty-group and numerical explanations.

For any positive integer d, 0 ÷ d = 0: d equal groups of zero counters use zero total. In particular 0 ÷ 4 = 0 because 4 × 0 = 0; 0 ÷ 3 = 0. For any a, a ÷ 0 is undefined. If a=6, 0 × q = 6 is impossible because 0 × q = 0. If a=0, 0 × q = 0 holds for multiple q, so division does not produce ONE unique answer. 9 ÷ 3 = 3 checks 3 × 3 = 9. The dividend is the first operand, divisor the second: 0 ÷ 4 and 4 ÷ 0 cannot be swapped. These restrictions are mathematical, not only because there are no physical group trays. Work with small whole numbers; no limits on canonical Skill.

Learners act on a controlled model or interpret an original equation, test a prediction and receive an exact explanation. The mathematical statement never changes just to make a guess look correct.

## LEARNER JOURNEY

1. **Share Nothing into Four Groups:** Show four labeled empty groups, zero original counters, accessible ledger; allow learner to inspect every empty group and check 4×0=0.
2. **Try Dividing Six by Zero:** Show the original 6÷0, allow inspection of nonzero six total and zero group-count boundary, and test the equation 0×q=6 with candidate q 0/1/6, all yielding 0, never six.
3. **What About Zero Divided by Zero?:** Keep 0÷0 visibly _undefined_, offer candidate q=0,1,2 and compute 0×q=0 for all; point out a division result must be uniquely determined.
4. **Read the Divisor Carefully:** Offer four independent expression cards with native labels for first/second operand and explanatory classification. Check 3×0=0 and 3×3=9; for either /0 explicitly show 'undefined'.

## SECTION PLAN

### Section 1 — Share Nothing into Four Groups

- **Outcome:** Model 0 ÷ 4 = 0 as four empty sharing groups and verify 4 × 0 = 0.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “There are zero counters and FOUR groups. How many does each receive?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Zero Division Boundary Lab](./scenes/zeroDivisionBoundaryLab.scene-spec.md), independent entry 1. Show four labeled empty groups, zero original counters, accessible ledger; allow learner to inspect every empty group and check 4×0=0.
- **Markdown Resource (supported):** “Each of four groups gets zero; together they account for zero counters.” Mathematical record: **0 ÷ 4 = 0; 4 × 0 = 0**.
- **Learner action and reflection:** Show four labeled empty groups, zero original counters, accessible ledger; allow learner to inspect every empty group and check 4×0=0. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If four is chosen, four groups of four would require sixteen counters, which we do not have.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** Invite the next example after a complete explanation, with independent replay/reset and no success threshold.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “Zero divided by a nonzero number is zero.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

### Section 2 — Try Dividing Six by Zero

- **Outcome:** Explain why 6 ÷ 0 is undefined: no quotient q could satisfy 0 × q = 6.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “Can we divide SIX counters into ZERO groups and get one exact quotient?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Zero Division Boundary Lab](./scenes/zeroDivisionBoundaryLab.scene-spec.md), independent entry 2. Show the original 6÷0, allow inspection of nonzero six total and zero group-count boundary, and test the equation 0×q=6 with candidate q 0/1/6, all yielding 0, never six.
- **Markdown Resource (supported):** “Any alleged quotient would need zero multiplied by that quotient to equal six. Zero times any candidate is zero, so none works.” Mathematical record: **6 ÷ 0 is undefined**.
- **Learner action and reflection:** Show the original 6÷0, allow inspection of nonzero six total and zero group-count boundary, and test the equation 0×q=6 with candidate q 0/1/6, all yielding 0, never six. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If child picks six or zero, substitute it in 0×q; both give zero, not six.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** Invite the next example after a complete explanation, with independent replay/reset and no success threshold.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “We cannot divide by zero, even when the starting number is zero.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

### Section 3 — What About Zero Divided by Zero?

- **Outcome:** Explain why 0 ÷ 0 is also undefined: 0 × q = 0 holds for many q and gives no single answer.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “Is 0 ÷ 0 equal to one, zero, or another number?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Zero Division Boundary Lab](./scenes/zeroDivisionBoundaryLab.scene-spec.md), independent entry 3. Keep 0÷0 visibly _undefined_, offer candidate q=0,1,2 and compute 0×q=0 for all; point out a division result must be uniquely determined.
- **Markdown Resource (supported):** “All three candidates work as a product, so none is selected as the one division answer. Zero as divisor is not allowed even when dividend is zero.” Mathematical record: **0 ÷ 0 is undefined**.
- **Learner action and reflection:** Keep 0÷0 visibly _undefined_, offer candidate q=0,1,2 and compute 0×q=0 for all; point out a division result must be uniquely determined. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If learner assumes self-division makes one, note a÷a=1 only applies when a is nonzero.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** Invite the next example after a complete explanation, with independent replay/reset and no success threshold.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “We cannot divide by zero, even when the starting number is zero.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

### Section 4 — Read the Divisor Carefully

- **Outcome:** Classify a fresh set of expressions as defined (0 ÷ 3 = 0, 9 ÷ 3 = 3) or undefined (9 ÷ 0, 0 ÷ 0), citing the divisor position.
- **One ordered LessonSection_Config:** text → scene → markdown.
- **Text Resource (supported):** “Which are defined: 0 ÷ 3, 9 ÷ 3, 9 ÷ 0, 0 ÷ 0?”
- **Scene Resource (generic integration supported; bespoke component proposed):** [Zero Division Boundary Lab](./scenes/zeroDivisionBoundaryLab.scene-spec.md), independent entry 4. Offer four independent expression cards with native labels for first/second operand and explanatory classification. Check 3×0=0 and 3×3=9; for either /0 explicitly show 'undefined'.
- **Markdown Resource (supported):** “Look at the divisor, the number AFTER ÷. If it is zero, division is undefined. A zero FIRST number is fine if divisor is nonzero.” Mathematical record: **0 ÷ 3 = 0; 9 ÷ 3 = 3; 9 ÷ 0 and 0 ÷ 0 undefined**.
- **Learner action and reflection:** Offer four independent expression cards with native labels for first/second operand and explanatory classification. Check 3×0=0 and 3×3=9; for either /0 explicitly show 'undefined'. Full model, arithmetic and “Show why” are accessible even without a trial. Predictions are formative, with clear original-operand labels.
- **Specific misconception feedback:** If child marks 0÷3 undefined, point out divisor is three, not zero. If 9÷0 is marked zero, demonstrate 0×q can never give nine.
- **Exact state model:** Original dividend, divisor, unit role, quotient or expressly undefined state, object/group/step count, multiplication check and a fully operable text ledger.
- **Navigation:** End with a voluntary explanation of what makes the division true or undefined, not with a scored mastery result.
- **Accessibility, localization and RTL:** Child-readable real translated strings, semantically stable equation operand order in RTL, native controls and screen-reader status, mobile/zoom, reduced motion, offline calculation.
- **Planned unlocked Note:** “We cannot divide by zero, even when the starting number is zero.” after the complete evidence and explanation, not a scored answer or wired event.
- **Dependencies:** Proposed prop-free Scene, own implementation/tests pending approval; no invented Question/Note API or runtime mode property.

## CUSTOM SCENE SPECIFICATIONS

- [Zero Division Boundary Lab](./scenes/zeroDivisionBoundaryLab.scene-spec.md), one standalone Draft spec with four independent prop-free Section-specific entries.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- “Zero divided by a nonzero number is zero.” — proposed only after a full worked model is accessible.
- “We cannot divide by zero, even when the starting number is zero.” — proposed only after a full worked model is accessible.

No Note persistence, unlock event, personal offline sheet, scheduler or mastery state is implemented by the document.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

New numerical examples with transparent feedback are formative experiences. Assessment Architect separately approves any graded Questions, Skill coverage, permitted answer formats, thresholds, retries and mastery evidence. A child's one correct answer in a proposed Scene is not a validated score. No runtime Quiz/Question included.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Use real translations in every supported locale (no silent English fallback), including result-check, undefined-operation explanations, object states and aria labels. LTR/RTL adapt semantically, preserving operand roles. An operable ordered count/number ledger plus native keyboard/touch/switch controls must give a nonvisual child every choice and mathematical step; do not rely on color, dragging, animation, sound or time. WCAG 2.2 AA, zoom/mobile, focus, reduced motion and local offline parity after the entire chosen-language package is downloaded.

## PRODUCTION / PLATFORM DEPENDENCIES

Text/markdown/scene Resource rendering and LessonSection_Config exist; Zero Division Boundary Lab is **proposed and not implemented**, with prop-free entries, real locale integration and own tests required. Notes/review/sync/download are separate product capabilities, not assumed existing. No Quiz, Question, React Scene, scoring or mastery implementation is part of this editorial batch.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, not approved.
- [Generated Playground Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md) (coordinator-controlled).
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Grade 3 explanation of 0÷0 should be intuitive, explicit and optional to explore; ensure it does not accidentally suggest a quotient of zero.

## HANDOFF

Provisional four-Section Screenwriter Draft plus separate Scene Draft, requiring Methodologist/editor approval before Scene Designer and Coding Agent implementation. Assessment Architect owns graded tasks. No existing Lessons modified.
