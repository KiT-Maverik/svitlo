# Check Division with Multiplication — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionMultiplicationInverse/
Primary audience: **Grade 3**. Prerequisites: Know small equal-group multiplication products such as 3×4=12 and 4×5=20. Interpret exact division with a positive divisor using equal sharing or equal grouping, and read the operand/quotient roles. Use a whole-number equality as a relationship and distinguish checking the original equation from trying an unrelated calculation.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: `relationToMultiplication.data.ts`, linked as the unchanged canonical source in the Methodologist Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Teach that exact division and multiplication undo one another, so a product and one known nonzero factor determine the remaining factor. A quotient can be FOUND or CHECKED by multiplication, and the verification must reconstruct the ORIGINAL dividend. Children build 3 groups of 4 = 12, see 12 ÷ 3 = 4 and 12 ÷ 4 = 3, then use a new 20 ÷ 5 = 4 case.

For exact whole-number division A÷d=q with d>0, d×q=A. With 3 groups of 4 there are 12 counters, so 3×4=12, 12÷3=4, and 12÷4=3 in the appropriate grouping interpretation; both division expressions are exact because 12=3×4. For 20÷5=4, 5×4=20 confirms the proposed quotient. A wrong proposed 20÷5=5 would imply 5×5=25, which does NOT reconstruct twenty. For 12÷3=5, check 3×5=15 and reject. This is not a claim that every possible division yields a whole-number quotient; work only with exact divisions and nonzero divisors. Avoid division by zero, multiplication of negative/fractional factors and automatic interchange of symbolic roles in a story.

The learner should discover that a numerical result also has a _meaning and unit_. Use explicit models, inspectable symbolic roles, accurate formative counterexamples and transparent check procedures rather than treating division as merely reading characters aloud.

## LEARNER JOURNEY

1. **From Three Times Four to Twelve:** Show 3 labeled groups × 4 each (12 unique counter IDs) and a native 'Build product' action. Display 3×4=12 and label group count 3, group size 4, product 12.
2. **Undo Multiplication by Sharing:** Re-use the 12-counter group model, not duplicate counters. Present total 12 and three groups, reveal four each; show exact 12÷3=4 then 'Check' 3×4=12, with all numerical roles named.
3. **Another Division From the Same Product:** Change the story label to 'four in each', revealing three groups; annotate 12÷4=3, and check divisor 4 × quotient 3 = 12. Show both division facts next to 3×4=12 with their story labels.
4. **Check a New Quotient:** Independent transfer board with 20 counters, target 5 groups. Child checks candidates 4 or 5 by computing 5×candidate (20 vs 25) with optional visual groups, then selects which matches ORIGINAL dividend twenty.

## SECTION PLAN

### Section 1 — From Three Times Four to Twelve

- **Instructional purpose/outcome:** Show that the same twelve-item model supports 3×4=12 and 12÷3=4 when the number of groups is known.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “Three equal groups have four counters in each. What multiplication equation names all twelve?”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Inverse Fact Family Machine](./scenes/inverseFactFamilyMachine.scene-spec.md), independent Section 1. Show 3 labeled groups × 4 each (12 unique counter IDs) and a native 'Build product' action. Display 3×4=12 and label group count 3, group size 4, product 12.
- **Markdown Resource (currently renderable):** “Three groups of four make twelve. We will use this known whole to explore what happens when the group count or group size is asked for.” Mathematical record: **3 × 4 = 12**.
- **Exact learner action and model:** Show 3 labeled groups × 4 each (12 unique counter IDs) and a native 'Build product' action. Display 3×4=12 and label group count 3, group size 4, product 12. Fact-family board with permanent original dividend, grouped counters, clearly named dividend/divisor/quotient roles, 'multiply to check' panel and side-by-side exact mathematical identities with a full ordered text alternative. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If eleven is chosen, enumerate all three groups of four; if seven, explain three plus four is not how many objects are in all groups.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Keep the interpreted model visible while introducing the next explicit story or inverse check; no mandatory correctness gate.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** No new Note in this Section.
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

### Section 2 — Undo Multiplication by Sharing

- **Instructional purpose/outcome:** Use 4×3=12 and 12÷4=3 to illustrate a second valid inverse division relationship with explicitly named roles.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “If twelve are shared among three groups, how many are in each? Which multiplication checks it?”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Inverse Fact Family Machine](./scenes/inverseFactFamilyMachine.scene-spec.md), independent Section 2. Re-use the 12-counter group model, not duplicate counters. Present total 12 and three groups, reveal four each; show exact 12÷3=4 then 'Check' 3×4=12, with all numerical roles named.
- **Markdown Resource (currently renderable):** “Twelve divided by three gives four in each group. Three groups times four each make the original twelve, so our quotient fits.” Mathematical record: **12 ÷ 3 = 4; 3 × 4 = 12**.
- **Exact learner action and model:** Re-use the 12-counter group model, not duplicate counters. Present total 12 and three groups, reveal four each; show exact 12÷3=4 then 'Check' 3×4=12, with all numerical roles named. Fact-family board with permanent original dividend, grouped counters, clearly named dividend/divisor/quotient roles, 'multiply to check' panel and side-by-side exact mathematical identities with a full ordered text alternative. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If a learner proposes five, evaluate 3×5=15 and show it cannot match the original total twelve; the candidate remains a clearly labeled trial, not a true equality.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Keep the interpreted model visible while introducing the next explicit story or inverse check; no mandatory correctness gate.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** “To check an exact division, multiply divisor by quotient to get the dividend.” once the model and its numerical reasoning are explained (not yet wired).
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

### Section 3 — Another Division From the Same Product

- **Instructional purpose/outcome:** Check a proposed division result by multiplying quotient × divisor and comparing to the original dividend; reject an incorrect candidate.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “What if each group must contain four? How many groups of four can we make from twelve?”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Inverse Fact Family Machine](./scenes/inverseFactFamilyMachine.scene-spec.md), independent Section 3. Change the story label to 'four in each', revealing three groups; annotate 12÷4=3, and check divisor 4 × quotient 3 = 12. Show both division facts next to 3×4=12 with their story labels.
- **Markdown Resource (currently renderable):** “Twelve contains three complete groups of four. Multiplying four by three returns twelve. The divisor and quotient have different positions now, so we read them carefully.” Mathematical record: **12 ÷ 4 = 3; 4 × 3 = 12**.
- **Exact learner action and model:** Change the story label to 'four in each', revealing three groups; annotate 12÷4=3, and check divisor 4 × quotient 3 = 12. Show both division facts next to 3×4=12 with their story labels. Fact-family board with permanent original dividend, grouped counters, clearly named dividend/divisor/quotient roles, 'multiply to check' panel and side-by-side exact mathematical identities with a full ordered text alternative. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If the learner says four groups of four, calculate sixteen needed and explain why that exceeds the twelve counters; reject mistaken 12÷4=4.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Keep the interpreted model visible while introducing the next explicit story or inverse check; no mandatory correctness gate.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** “One multiplication fact can help us read two connected exact division facts.” once the model and its numerical reasoning are explained (not yet wired).
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

### Section 4 — Check a New Quotient

- **Instructional purpose/outcome:** Use multiplication to find/check 20÷5=4 and state exactly why 5×4=20 verifies the division.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “Is 20 ÷ 5 = 4 correct? What if someone suggests 20 ÷ 5 = 5?”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Inverse Fact Family Machine](./scenes/inverseFactFamilyMachine.scene-spec.md), independent Section 4. Independent transfer board with 20 counters, target 5 groups. Child checks candidates 4 or 5 by computing 5×candidate (20 vs 25) with optional visual groups, then selects which matches ORIGINAL dividend twenty.
- **Markdown Resource (currently renderable):** “The proposed quotient is four. Five groups of four use twenty counters, so 20 divided by five equals four. Five groups of five would need twenty-five; it is not the same original total.” Mathematical record: **20 ÷ 5 = 4 because 5 × 4 = 20**.
- **Exact learner action and model:** Independent transfer board with 20 counters, target 5 groups. Child checks candidates 4 or 5 by computing 5×candidate (20 vs 25) with optional visual groups, then selects which matches ORIGINAL dividend twenty. Fact-family board with permanent original dividend, grouped counters, clearly named dividend/divisor/quotient roles, 'multiply to check' panel and side-by-side exact mathematical identities with a full ordered text alternative. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If the wrong five is chosen, display 5×5=25 and compare with the original dividend 20, rather than changing the original problem.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Conclude with optional spoken/selected/text reflection about operand roles, without a graded result.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** “To check an exact division, multiply divisor by quotient to get the dividend.” once the model and its numerical reasoning are explained (not yet wired).
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

## CUSTOM SCENE SPECIFICATIONS

- [Inverse Fact Family Machine](./scenes/inverseFactFamilyMachine.scene-spec.md), self-contained specification for four independently initialized prop-free Scene placements, one per Lesson Section.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “To check an exact division, multiply divisor by quotient to get the dividend.” — proposed after a complete learner-accessible mathematical demonstration, not triggered by correctness alone.
2. “One multiplication fact can help us read two connected exact division facts.” — proposed after a complete learner-accessible mathematical demonstration, not triggered by correctness alone.

These are **planned**, not implemented Note entities, API events, persistence, review sheets, scheduling or mastery evidence. Do not invent Note or Quiz runtime contracts.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 is a new numerical context with less default scaffolding and complete optional worked reveal. All learner selections/reasoning are formative instructional activities. Assessment Architect separately validates graded cases, numerical boundaries, answer interpretation and which Skill is assessed. The generic Quiz select-one adapter does not implement this bespoke Scene.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All learner prompts, operation-role names, unit descriptions, feedback, controls, state labels, aria announcements and Notes need genuine translations for all supported locales, not silent English fallback. The expression and group model must be fully **operable through an accessible ordered state ledger**, with native keyboard/touch/switch controls, complete screen-reader descriptions, child-size targets, high contrast, focus, zoom/mobile and reduced-motion parity. RTL changes text/layout semantically while preserving mathematical operand order and divisor/quotient meaning. No audio/video/drag/speech requirement or remote math service. All selected-locale resources and deterministic interactions must work offline after download.

## PRODUCTION / PLATFORM DEPENDENCIES

The general `LessonSection_Config` renderer supports text, markdown and scene Resources; **Inverse Fact Family Machine is not implemented**. After editor approval, Scene Designer and Coding Agent build prop-free Scene components with own tests, real locale-context integration and offline verification. Generic image/audio/video/code Resource blocks are typed only and YouTube has no configured Resource type; unused here. Notes and spaced review/download/sync are separate work, not claimed implemented. No runtime Lesson, Question, Quiz or scoring code is delivered.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), newly drafted and requiring explicit approval.
- [Canonical Skill source](../../../../data/skills/arithmetic/divide/skills/relationToMultiplication.data.ts), byte-identical to Mathematics source.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Ensure the inverse-check procedure always compares the reconstructed product against the _original dividend_, not against the proposed quotient. One fact family is an example, not a claim to assess full division fluency.
- Coordinator-owned generated taxonomy is intentionally left unchanged until PR integration.

## HANDOFF

Provisional Draft Content with a standalone Draft Scene specification, not implementation-ready until Methodologist Brief, Content and Scene have received separate editorial approval. Coding Agent, Scene Designer and Assessment Architect have distinct downstream responsibilities. No preexisting Lesson, Skill ID or Program narrative is changed.
