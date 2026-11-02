# Read What a Division Expression Says — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/divisionReadingExpressions/
Primary audience: **Grade 3**. Prerequisites: Understand exact equal sharing (known group count, find each share) and equal grouping (known group size, count groups). Read 12÷3=4 and construct or inspect small equal groups, with whole numbers and no leftovers. Know division by zero is not used; multiplication fact 3×4=12 with model support.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: `readExpression.data.ts`, linked as the unchanged canonical source in the Methodologist Brief
Program dependence: None

## INSTRUCTIONAL CONCEPT

Help learners read dividend, divisor and quotient as mathematical roles rather than memorizing an unexplained word order. Keep the arithmetic expression stable while examining both equal-sharing and equal-grouping stories. In 12 ÷ 3 = 4, twelve is always the total and three always the nonzero second operand, but its story unit differs: it names THREE groups in an equal-sharing story or THREE objects per group in an equal-grouping story. The answer four likewise changes units between four PER group and four GROUPS.

Dividend = total, divisor = nonzero second operand, quotient = result. In 12÷3=4, 12 is the starting total in both contexts. In fair sharing, the known divisor '3' is number of groups, the quotient '4' is size of each share. In equal grouping, the divisor '3' is items in each group, the quotient '4' is number of groups. Both model 12 items exactly. In 20÷5=4, sharing means five groups of four, grouping means four groups of five. Every story must name whether the known number means groups or size; never make a blank picture carry the meaning on its own. Zero divisor is invalid; 0 is excluded as the second operand, but the Skill itself is not changed. No remainders, negative numbers, fractions or long division.

The learner should discover that a numerical result also has a _meaning and unit_. Use explicit models, inspectable symbolic roles, accurate formative counterexamples and transparent check procedures rather than treating division as merely reading characters aloud.

## LEARNER JOURNEY

1. **Give the Numbers Their Names:** A large stable equation has three separately focusable semantic tokens: total/dividend 12, nonzero divisor 3, quotient 4. Learner chooses a token and sees the corresponding label and short explanation. Accessible text offers the same annotated expression and an optional 12-counter model.
2. **Three Groups, Four in Each:** Same equation remains fixed. Show three separate labeled groups of four and role strips Total 12, Number of groups 3, In each 4. Learner maps each strip to exact equation position and can inspect the group totals without moving individual counters.
3. **Three in Each, Four Groups:** Keep 12÷3=4 visible, switch explicit story label to grouping. Reveal four distinct groups of three and map Total 12, Group size 3, Number of groups 4 to the same operand slots; offer an operable side-by-side story role comparison.
4. **One Equality, Two New Stories:** Independent transfer with stable equation 20÷5=4. Child inspects candidate stories '20 shared among 5 groups, 4 each', '20 in groups of 5, 4 groups', and an incorrect story '20 shared into 4 groups, 5 each' (which is 20÷4=5). Native role-matching options and full model reveal available.

## SECTION PLAN

### Section 1 — Give the Numbers Their Names

- **Instructional purpose/outcome:** Identify dividend 12, divisor 3 and quotient 4 in an unchanged expression, reading and explaining the order.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “Read 12 ÷ 3 = 4. Which number is the total? Which comes after the division sign? Which is the result?”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Division Expression Decoder](./scenes/divisionExpressionDecoder.scene-spec.md), independent Section 1. A large stable equation has three separately focusable semantic tokens: total/dividend 12, nonzero divisor 3, quotient 4. Learner chooses a token and sees the corresponding label and short explanation. Accessible text offers the same annotated expression and an optional 12-counter model.
- **Markdown Resource (currently renderable):** “We read twelve divided by three equals four. Twelve is the dividend or total; three is the divisor; four is the quotient. The mathematical order does not change when we name them.” Mathematical record: **12 ÷ 3 = 4**.
- **Exact learner action and model:** A large stable equation has three separately focusable semantic tokens: total/dividend 12, nonzero divisor 3, quotient 4. Learner chooses a token and sees the corresponding label and short explanation. Accessible text offers the same annotated expression and an optional 12-counter model. Stable large equation with semantic token focus/selection, two strongly labeled story panels, exact numeric group-role ledger, and lightweight countable groups. Every accessible role labels its _value and unit_, not just its visual location. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If four is chosen as the dividend, name it as result and show the total of twelve; if three is chosen as quotient, explain that the second operand is the divisor.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Keep the interpreted model visible while introducing the next explicit story or inverse check; no mandatory correctness gate.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** “In total ÷ nonzero divisor = quotient, the dividend is the starting total.” once the model and its numerical reasoning are explained (not yet wired).
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

### Section 2 — Three Groups, Four in Each

- **Instructional purpose/outcome:** Explain the number roles in 12÷3=4 as sharing into 3 groups of 4, with quotient as counters PER group.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “Twelve objects are shared into 3 equal groups. What does the 4 mean in 12 ÷ 3 = 4?”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Division Expression Decoder](./scenes/divisionExpressionDecoder.scene-spec.md), independent Section 2. Same equation remains fixed. Show three separate labeled groups of four and role strips Total 12, Number of groups 3, In each 4. Learner maps each strip to exact equation position and can inspect the group totals without moving individual counters.
- **Markdown Resource (currently renderable):** “When we share among three groups, the three names how many groups receive counters. Four is how many are in each group. Twelve is the total before sharing.” Mathematical record: **12 ÷ 3 = 4; 3 groups × 4 each = 12**.
- **Exact learner action and model:** Same equation remains fixed. Show three separate labeled groups of four and role strips Total 12, Number of groups 3, In each 4. Learner maps each strip to exact equation position and can inspect the group totals without moving individual counters. Stable large equation with semantic token focus/selection, two strongly labeled story panels, exact numeric group-role ledger, and lightweight countable groups. Every accessible role labels its _value and unit_, not just its visual location. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If the child calls '4 groups' the answer here, count precisely three recipient trays and four in each; keep expression unchanged.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Keep the interpreted model visible while introducing the next explicit story or inverse check; no mandatory correctness gate.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** “The story tells us whether the divisor counts groups or objects per group.” once the model and its numerical reasoning are explained (not yet wired).
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

### Section 3 — Three in Each, Four Groups

- **Instructional purpose/outcome:** Explain the identical expression as making groups of 3 from 12, with quotient as FOUR groups, without changing the numerical operands.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “Now make groups OF 3 from the same 12. What does the quotient 4 count in this story?”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Division Expression Decoder](./scenes/divisionExpressionDecoder.scene-spec.md), independent Section 3. Keep 12÷3=4 visible, switch explicit story label to grouping. Reveal four distinct groups of three and map Total 12, Group size 3, Number of groups 4 to the same operand slots; offer an operable side-by-side story role comparison.
- **Markdown Resource (currently renderable):** “Now three names the size of each group, while four counts the groups we can form. The same equation fits, but the units carried by the answer are different.” Mathematical record: **12 ÷ 3 = 4; 4 groups × 3 each = 12**.
- **Exact learner action and model:** Keep 12÷3=4 visible, switch explicit story label to grouping. Reveal four distinct groups of three and map Total 12, Group size 3, Number of groups 4 to the same operand slots; offer an operable side-by-side story role comparison. Stable large equation with semantic token focus/selection, two strongly labeled story panels, exact numeric group-role ledger, and lightweight countable groups. Every accessible role labels its _value and unit_, not just its visual location. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If 'three groups' is chosen, point to the four completed groups and the explicit group size of three; distinguish it from the earlier sharing story.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Keep the interpreted model visible while introducing the next explicit story or inverse check; no mandatory correctness gate.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** “The story tells us whether the divisor counts groups or objects per group.” once the model and its numerical reasoning are explained (not yet wired).
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

### Section 4 — One Equality, Two New Stories

- **Instructional purpose/outcome:** Read a new 20÷5=4 equality and match two accurately labeled stories and their different answer units.
- **Structure:** One `LessonSection_Config` with vertically ordered text, scene and markdown blocks.
- **Text Resource (currently renderable):** “20 ÷ 5 = 4. Choose a sharing story and a grouping story that both match this exact equality.”
- **Scene Resource (generic type renderable; custom component PROPOSED):** [Division Expression Decoder](./scenes/divisionExpressionDecoder.scene-spec.md), independent Section 4. Independent transfer with stable equation 20÷5=4. Child inspects candidate stories '20 shared among 5 groups, 4 each', '20 in groups of 5, 4 groups', and an incorrect story '20 shared into 4 groups, 5 each' (which is 20÷4=5). Native role-matching options and full model reveal available.
- **Markdown Resource (currently renderable):** “Sharing: five groups receive four each. Grouping: four groups of five can be made. Both use twenty, but 20 ÷ 4 = 5 is a different expression even if its model also has twenty counters.” Mathematical record: **20 ÷ 5 = 4**.
- **Exact learner action and model:** Independent transfer with stable equation 20÷5=4. Child inspects candidate stories '20 shared among 5 groups, 4 each', '20 in groups of 5, 4 groups', and an incorrect story '20 shared into 4 groups, 5 each' (which is 20÷4=5). Native role-matching options and full model reveal available. Stable large equation with semantic token focus/selection, two strongly labeled story panels, exact numeric group-role ledger, and lightweight countable groups. Every accessible role labels its _value and unit_, not just its visual location. The child can inspect quantities and semantic roles without first guessing; show worked explanation on request.
- **Specific feedback on misconception:** If the child accepts 'divide twenty among four' as the same expression, highlight that four would be the divisor and five the quotient; the original has divisor five.
- **Expected evidence, not grading:** Child identifies what each numerical role counts and matches the model to a true equality. A wrong answer gets a numeric counterexample and retry; no scoring/threshold.
- **Navigation:** Conclude with optional spoken/selected/text reflection about operand roles, without a graded result.
- **Accessibility and locale:** Screen reader announces full expression with operand and group units, keyboard/touch/switch controls support the same selection/reveal, semantic RTL number order preserved, real translated status and reduced motion.
- **Planned Note:** “In total ÷ nonzero divisor = quotient, the dividend is the starting total.” once the model and its numerical reasoning are explained (not yet wired).
- **Implementation dependency:** Proposed independent prop-free Scene placement; no invented `mode` prop, runtime Question, Note event, assessment state or private API.

## CUSTOM SCENE SPECIFICATIONS

- [Division Expression Decoder](./scenes/divisionExpressionDecoder.scene-spec.md), self-contained specification for four independently initialized prop-free Scene placements, one per Lesson Section.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “In total ÷ nonzero divisor = quotient, the dividend is the starting total.” — proposed after a complete learner-accessible mathematical demonstration, not triggered by correctness alone.
2. “The story tells us whether the divisor counts groups or objects per group.” — proposed after a complete learner-accessible mathematical demonstration, not triggered by correctness alone.

These are **planned**, not implemented Note entities, API events, persistence, review sheets, scheduling or mastery evidence. Do not invent Note or Quiz runtime contracts.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 is a new numerical context with less default scaffolding and complete optional worked reveal. All learner selections/reasoning are formative instructional activities. Assessment Architect separately validates graded cases, numerical boundaries, answer interpretation and which Skill is assessed. The generic Quiz select-one adapter does not implement this bespoke Scene.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All learner prompts, operation-role names, unit descriptions, feedback, controls, state labels, aria announcements and Notes need genuine translations for all supported locales, not silent English fallback. The expression and group model must be fully **operable through an accessible ordered state ledger**, with native keyboard/touch/switch controls, complete screen-reader descriptions, child-size targets, high contrast, focus, zoom/mobile and reduced-motion parity. RTL changes text/layout semantically while preserving mathematical operand order and divisor/quotient meaning. No audio/video/drag/speech requirement or remote math service. All selected-locale resources and deterministic interactions must work offline after download.

## PRODUCTION / PLATFORM DEPENDENCIES

The general `LessonSection_Config` renderer supports text, markdown and scene Resources; **Division Expression Decoder is not implemented**. After editor approval, Scene Designer and Coding Agent build prop-free Scene components with own tests, real locale-context integration and offline verification. Generic image/audio/video/code Resource blocks are typed only and YouTube has no configured Resource type; unused here. Notes and spaced review/download/sync are separate work, not claimed implemented. No runtime Lesson, Question, Quiz or scoring code is delivered.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), newly drafted and requiring explicit approval.
- [Canonical Skill source](../../../../data/skills/arithmetic/divide/skills/readExpression.data.ts), byte-identical to Mathematics source.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- This Grade 3 Lesson teaches reading and assigning units to expression roles, not yet another fully procedural group-building lesson. Grade 2 learners with sufficient prerequisites may inspect it but the designated primary audience is Grade 3.
- Coordinator-owned generated taxonomy is intentionally left unchanged until PR integration.

## HANDOFF

Provisional Draft Content with a standalone Draft Scene specification, not implementation-ready until Methodologist Brief, Content and Scene have received separate editorial approval. Coding Agent, Scene Designer and Assessment Architect have distinct downstream responsibilities. No preexisting Lesson, Skill ID or Program narrative is changed.
