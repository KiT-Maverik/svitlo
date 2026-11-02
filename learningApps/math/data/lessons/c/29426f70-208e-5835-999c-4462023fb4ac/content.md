# Regrouping Ones and Tens Into Hundreds — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionRegroupingAcrossPlaces/
Audience: **Grade 3**, with prerequisites Know base-ten numbers to at least 999: 1H=10T, 1T=10O, and each column has a specific value. Understand the two-digit written column method and one carried ten. Add ones and tens with totals above ten; track a carry once, and distinguish exchanging representation from changing quantity.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: Canonical `regrouping.data.ts` from Brief with unchanged identity
Program dependence: None

## INSTRUCTIONAL CONCEPT

Develop place-value addition with multiple successive exchanges by grouping ten ones into a ten and ten tens into a hundred. Children control the physical and symbolic steps for 178+265 and verify the conserved sum 443. This Lesson extends the earlier two-digit column method; it does not redefine the canonical Skill's much broader numerical scope.

178 = 1H7T8O; 265=2H6T5O. Sum in unexchanged units = 3H13T13O = 300+130+13=443. Exchange 13 ones →1T3O, so 3H14T3O; exchange 14 tens →1H4T, obtaining 4H4T3O =443. Column order: ones 8+5=13, carry one ten; tens 7+6+1=14, carry one hundred; hundreds 1+2+1=4. Transfer: 268+157: 8+7=15 ones →5O +1T; 6+5+1=12 tens →2T +1H; 2+1+1=4 hundreds, result 425. These are **two linked carrying steps**; no arbitrary larger values, decimals, negative numbers or full general proof required. Sum remains below 1000.

Learners predict, manipulate and inspect every exchange, identify the physical source of each carried unit, and explain why the total is conserved. We do not replace that understanding with a written-algorithm recital or a graded quiz.

## LEARNER JOURNEY

1. **Read Three Places:** Display a 3-column H/T/O board plus two labeled collections 1H7T8O and 2H6T5O. Learner inspects each place and combines the contributions into raw 3H13T13O without yet calling it the final numeral.
2. **Thirteen Ones Become a Ten:** Learner combines unique 8O and 5O, exchanges ten for a ten-bundle, places 3 ones in result and a carried ten above tens, updating the total ledger to 3H14T3O.
3. **Fourteen Tens Become a Hundred:** Show 7T+6T+1T=14T, with one ten-bundle from the previous exchange. Learner exchanges ten of fourteen T into 1H, leaving four tens and final total 4H4T3O.
4. **Two New Carries:** Fresh H/T/O board. Learner works ones 8+7=15 → carry1T/remain5O; tens 6+5+1=12 → carry1H/remain2T; hundreds 2+1+1=4; check 425 against originals.

## SECTION PLAN

### Section 1 — Read Three Places

- **Outcome/purpose:** Represent 178 and 265 as hundreds, tens and ones without misplacing a digit.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “What do 178 and 265 mean in hundreds, tens and ones?”
- **Scene Resource (type supported; new component proposed):** [Hundred Exchange Addition Lab](./scenes/hundredExchangeAdditionLab.scene-spec.md), independent Section 1 placement: Display a 3-column H/T/O board plus two labeled collections 1H7T8O and 2H6T5O. Learner inspects each place and combines the contributions into raw 3H13T13O without yet calling it the final numeral.
- **Markdown Resource (available):** “We have three original hundreds, thirteen tens and thirteen ones. To write an ordinary three-digit sum we need to exchange any complete tens of a place.” Mathematical statement: **178 + 265 = 300 + 130 + 13**.
- **Learner action and observation:** Display a 3-column H/T/O board plus two labeled collections 1H7T8O and 2H6T5O. Learner inspects each place and combines the contributions into raw 3H13T13O without yet calling it the final numeral. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** If 178 is described as 1H8T7O, show 187 and correct each place by its value. Responses are formative, not assessed.
- **Visual/interactive model direction:** Three labeled Hundreds/Tens/Ones columns linked to physical base-ten blocks with low-poly complexity, explicit carried-ten and carried-hundred provenance, and a persistent value-check ledger after EVERY exchange; avoid rendering hundreds as hundreds of separate tiny dots on weak devices. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Invite the next example only after the current place-value statement has been explained; offer Reset and 'Show steps'.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** No Note in this Section.
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

### Section 2 — Thirteen Ones Become a Ten

- **Outcome/purpose:** Combine 8+5=13 ones into 1 ten and 3 ones, correctly recording where the ten goes.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “Eight ones and five ones make thirteen ones. What do you carry?”
- **Scene Resource (type supported; new component proposed):** [Hundred Exchange Addition Lab](./scenes/hundredExchangeAdditionLab.scene-spec.md), independent Section 2 placement: Learner combines unique 8O and 5O, exchanges ten for a ten-bundle, places 3 ones in result and a carried ten above tens, updating the total ledger to 3H14T3O.
- **Markdown Resource (available):** “Thirteen ones contain a ten and three singles. Ten ones were used to make that ten, so there are only three loose ones left.” Mathematical statement: **8 + 5 = 13; 13 ones = 1 ten + 3 ones**.
- **Learner action and observation:** Learner combines unique 8O and 5O, exchanges ten for a ten-bundle, places 3 ones in result and a carried ten above tens, updating the total ledger to 3H14T3O. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** If a learner writes thirteen as the ones digit and also carries one, explain the double count; if they claim four loose ones, recount the original thirteen. Responses are formative, not assessed.
- **Visual/interactive model direction:** Three labeled Hundreds/Tens/Ones columns linked to physical base-ten blocks with low-poly complexity, explicit carried-ten and carried-hundred provenance, and a persistent value-check ledger after EVERY exchange; avoid rendering hundreds as hundreds of separate tiny dots on weak devices. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Invite the next example only after the current place-value statement has been explained; offer Reset and 'Show steps'.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** “Ten ones exchange for one ten; ten tens exchange for one hundred.”, after the explanation is accessible (planned, not wired).
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

### Section 3 — Fourteen Tens Become a Hundred

- **Outcome/purpose:** Combine 7+6+1=14 tens into 1 hundred and 4 tens and obtain 178+265=443.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “Now add 7 tens, 6 tens and the 1 new ten. What happens to fourteen tens?”
- **Scene Resource (type supported; new component proposed):** [Hundred Exchange Addition Lab](./scenes/hundredExchangeAdditionLab.scene-spec.md), independent Section 3 placement: Show 7T+6T+1T=14T, with one ten-bundle from the previous exchange. Learner exchanges ten of fourteen T into 1H, leaving four tens and final total 4H4T3O.
- **Markdown Resource (available):** “Fourteen tens include a hundred and four tens. Three original hundreds plus this new hundred make four hundreds. Four hundreds, four tens, three ones give four hundred forty-three.” Mathematical statement: **7 + 6 + 1 = 14 tens = 1 hundred + 4 tens; 178 + 265 = 443**.
- **Learner action and observation:** Show 7T+6T+1T=14T, with one ten-bundle from the previous exchange. Learner exchanges ten of fourteen T into 1H, leaving four tens and final total 4H4T3O. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** For 343, identify the missing new hundred. For 453, show that five tens would count one ten twice; trace actual ten-bundles. Responses are formative, not assessed.
- **Visual/interactive model direction:** Three labeled Hundreds/Tens/Ones columns linked to physical base-ten blocks with low-poly complexity, explicit carried-ten and carried-hundred provenance, and a persistent value-check ledger after EVERY exchange; avoid rendering hundreds as hundreds of separate tiny dots on weak devices. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Invite the next example only after the current place-value statement has been explained; offer Reset and 'Show steps'.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** “Each carry comes from a completed group of ten and is counted once.”, after the explanation is accessible (planned, not wired).
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

### Section 4 — Two New Carries

- **Outcome/purpose:** Solve a second example 268+157=425 with consecutive carries and verify both examples through decomposition.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “Try 268 + 157. Can the ones and the tens both make a new higher-place unit?”
- **Scene Resource (type supported; new component proposed):** [Hundred Exchange Addition Lab](./scenes/hundredExchangeAdditionLab.scene-spec.md), independent Section 4 placement: Fresh H/T/O board. Learner works ones 8+7=15 → carry1T/remain5O; tens 6+5+1=12 → carry1H/remain2T; hundreds 2+1+1=4; check 425 against originals.
- **Markdown Resource (available):** “The ones make one new ten and five ones. The tens then make one new hundred and two tens. Four hundreds, two tens and five ones make 425.” Mathematical statement: **268 + 157 = 425**.
- **Learner action and observation:** Fresh H/T/O board. Learner works ones 8+7=15 → carry1T/remain5O; tens 6+5+1=12 → carry1H/remain2T; hundreds 2+1+1=4; check 425 against originals. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** For 415, show the omitted carried ten in tens; for 325, show the missed carried hundred. Verify 200+60+8+100+50+7=425. Responses are formative, not assessed.
- **Visual/interactive model direction:** Three labeled Hundreds/Tens/Ones columns linked to physical base-ten blocks with low-poly complexity, explicit carried-ten and carried-hundred provenance, and a persistent value-check ledger after EVERY exchange; avoid rendering hundreds as hundreds of separate tiny dots on weak devices. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Reflect on which place changed and which value stayed the same, then end with no grade or mastery badge.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** “Each carry comes from a completed group of ten and is counted once.”, after the explanation is accessible (planned, not wired).
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

## CUSTOM SCENE SPECIFICATIONS

- [Hundred Exchange Addition Lab](./scenes/hundredExchangeAdditionLab.scene-spec.md), four self-contained prop-free Section entries. Generic Scene rendering is supported; this bespoke component does not yet exist.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Ten ones exchange for one ten; ten tens exchange for one hundred.” — editorial proposal only after the corresponding complete mathematical model and explanation.
2. “Each carry comes from a completed group of ten and is counted once.” — editorial proposal only after the corresponding complete mathematical model and explanation.

Notes are **not wired** and do not imply a real Note API, state events, per-child persistence, revision sheet, spaced repetition or evidence of mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 introduces a fresh case with optional scaffolds and worked feedback, remaining a _formative experience_. Assessment Architect independently validates graded problems, decomposition variants, Skill evidence, retry thresholds, scores and mastery. A correct column total alone does not establish the full canonical Skill; current Quiz select-one adapter is separate from proposed Scenes. No scored Question_Config produced.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all child-facing English prompts, errors, explanations, number-role terms, columns, accessible names and planned Notes into every supported locale, never silently falling back to English. An equivalent ordered accessible numeric ledger offers all exchange/undo/add/check actions for keyboard, touch, switches and screen readers, not merely a static picture label. RTL aligns each digit by _semantic place value_ rather than naive mirroring; mathematical operand order remains true. WCAG 2.2 AA focus, large controls, low-resource mobile, 200% zoom, reduced motion and full downloaded offline calculation/feedback must preserve exactly the same intermediate and final mathematical states. No sound, video, WebGL, drag-only or remote checker required.

## PRODUCTION / PLATFORM DEPENDENCIES

Current `LessonSection_Config` and generic renderer support text, markdown, scene resources. Hundred Exchange Addition Lab is **proposed, not implemented**, and requires approved Scene spec, prop-free entries with real locale context and own tests; no public runtime mode prop is presumed. Generic image/audio/video/code resources are typed only; YouTube is not a supported Resource_Config. Notes, spaced-review scheduler, full PWA download and synchronization remain separate product work. No TS runtime Lesson Config, Question, Quiz or scoring has been created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, not approved.
- [Canonical Skill](../../../../data/skills/arithmetic/addition/skills/regrouping.data.ts) unchanged from Mathematics.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Grade 3 only for learners with reliable three-digit place value and one-carry written addition. The Skill remains unbounded by grade, and these examples do not exhaust its broad definition.
- Shared generated taxonomy is coordinator-owned and intentionally left unmodified in this branch.

## HANDOFF

One provisional Draft four-Section Content and a separate Draft Scene specification. Editor must approve the Methodologist Brief first, then independently review Content and Scene; Scene Designer/Coding Agent/Assessment Architect proceed only with separate approval. Do not change any previous Lesson or source Skill.
