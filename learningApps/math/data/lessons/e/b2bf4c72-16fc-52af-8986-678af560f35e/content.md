# Add Tens and Ones in Columns — Content

Status: Draft — provisional Screenwriter content pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionInColumns/
Audience: **Grade 2**, with prerequisites Know two-digit numeration: a tens digit names tens and a ones digit names single units. Add one-digit quantities through fourteen, and exchange ten ones for one ten without changing amount. Read addition equality, align numerals by place value rather than by appearance; `additionCrossingTen` offers the relevant concept.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Target Skill: Canonical `columnAddition.data.ts` from Brief with unchanged identity
Program dependence: None

## INSTRUCTIONAL CONCEPT

Explain how written column addition aligns equal place values and uses a carry mark to record a real exchange of ten ones for one ten. Start by reading two-digit place values correctly, then add 27+35=62 with an exact physical model. This lesson focuses on column notation and single ones-to-tens carry, distinct from the age-neutral broader Skill 'Addition with regrouping'.

27 = 2 tens+7 ones, 35=3 tens+5 ones. Add ones: 7+5=12=1 ten+2 ones, record 2 ones and a carried ten. Tens: 2+3+1=6 tens, sum 62. Unregrouped example 23+14=37 demonstrates aligning tens with tens, ones with ones. Transfer 46+28: 6+8=14 → 4 ones+1 ten; 4+2+1=7 tens →74. Use only nonnegative two-digit operands and sum under 100, one carry at most, no stacked three-digit or multiple-carry work in this Lesson.

Learners predict, manipulate and inspect every exchange, identify the physical source of each carried unit, and explain why the total is conserved. We do not replace that understanding with a written-algorithm recital or a graded quiz.

## LEARNER JOURNEY

1. **Put Every Digit in Its Place:** A labeled 'Tens | Ones' board and exact ledger place 27 as 2T7O and 35 as 3T5O. Child selects cells with accessible buttons, checks each named place, and can inspect 23+14=37 without carry as a contrast.
2. **Twelve Ones Need an Exchange:** The child combines 7 and 5 uniquely identified singles, then exchanges exactly ten for a bundle of ten. Column ones outcome becomes digit 2, a clearly labeled 'carry 1 ten' marker appears above tens.
3. **Complete Twenty-Seven Plus Thirty-Five:** Add tens on the board: 2+3+1=6 tens; append 2 ones. Show the original 27+35 above a resulting 62 and a full invariant 20+7+30+5=62.
4. **Try a New Column:** Fresh empty Tens/Ones board with operands 46 and 28 correctly aligned. Learner can place carry, record 6+8=14 as 1T4O, and compute 4+2+1=7 tens. Optional reveal always available.

## SECTION PLAN

### Section 1 — Put Every Digit in Its Place

- **Outcome/purpose:** Place 27 and 35 on a labeled Tens/Ones board with each digit correctly valued.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “What does 27 mean? What does 35 mean? Put their tens and ones in the correct columns.”
- **Scene Resource (type supported; new component proposed):** [Place Value Column Adder](./scenes/placeValueColumnAdder.scene-spec.md), independent Section 1 placement: A labeled 'Tens | Ones' board and exact ledger place 27 as 2T7O and 35 as 3T5O. Child selects cells with accessible buttons, checks each named place, and can inspect 23+14=37 without carry as a contrast.
- **Markdown Resource (available):** “The tens columns count bundles of ten, and the ones columns count single objects. We add each kind to the same kind.” Mathematical statement: **27 = 2 tens + 7 ones; 35 = 3 tens + 5 ones**.
- **Learner action and observation:** A labeled 'Tens | Ones' board and exact ledger place 27 as 2T7O and 35 as 3T5O. Child selects cells with accessible buttons, checks each named place, and can inspect 23+14=37 without carry as a contrast. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** If 27 is entered as 7 tens and 2 ones, calculate 72 and explain how a digit's place changes its value. Never call the two numerals interchangeable. Responses are formative, not assessed.
- **Visual/interactive model direction:** Semantically labeled Tens/Ones columns, linked countable counters and ten-bundles, an explicit carried-ten marker with provenance, and a persistent accessible ledger. A carry must visibly correspond to a real bundle formed from ten singles. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Invite the next example only after the current place-value statement has been explained; offer Reset and 'Show steps'.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** “Line up ones with ones and tens with tens.”, after the explanation is accessible (planned, not wired).
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

### Section 2 — Twelve Ones Need an Exchange

- **Outcome/purpose:** Explain why 7 ones + 5 ones = 12 ones requires recording 2 ones and carrying 1 ten.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “Seven ones plus five ones give twelve ones. Can twelve fit into the ones column?”
- **Scene Resource (type supported; new component proposed):** [Place Value Column Adder](./scenes/placeValueColumnAdder.scene-spec.md), independent Section 2 placement: The child combines 7 and 5 uniquely identified singles, then exchanges exactly ten for a bundle of ten. Column ones outcome becomes digit 2, a clearly labeled 'carry 1 ten' marker appears above tens.
- **Markdown Resource (available):** “We keep two ones and carry one full ten. That ten was made from ten of the twelve singles, not added from outside.” Mathematical statement: **7 ones + 5 ones = 12 ones = 1 ten + 2 ones**.
- **Learner action and observation:** The child combines 7 and 5 uniquely identified singles, then exchanges exactly ten for a bundle of ten. Column ones outcome becomes digit 2, a clearly labeled 'carry 1 ten' marker appears above tens. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** If a child writes 12 in the ones digit slot, explain it holds only the remaining two ones; if they claim the sum grew by ten, count physical objects before and after exchange. Responses are formative, not assessed.
- **Visual/interactive model direction:** Semantically labeled Tens/Ones columns, linked countable counters and ten-bundles, an explicit carried-ten marker with provenance, and a persistent accessible ledger. A carry must visibly correspond to a real bundle formed from ten singles. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Invite the next example only after the current place-value statement has been explained; offer Reset and 'Show steps'.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** “When twelve ones appear, write two ones and carry one ten.”, after the explanation is accessible (planned, not wired).
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

### Section 3 — Complete Twenty-Seven Plus Thirty-Five

- **Outcome/purpose:** Compute 27+35=62 in columns and reconcile it with two independent counter totals.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “There is one carried ten. Add it with the two tens and three tens. What is the whole sum?”
- **Scene Resource (type supported; new component proposed):** [Place Value Column Adder](./scenes/placeValueColumnAdder.scene-spec.md), independent Section 3 placement: Add tens on the board: 2+3+1=6 tens; append 2 ones. Show the original 27+35 above a resulting 62 and a full invariant 20+7+30+5=62.
- **Markdown Resource (available):** “Seven plus five gave two ones and one ten. Two original tens plus three original tens plus the carried ten make six tens. Six tens and two ones make sixty-two.” Mathematical statement: **27 + 35 = 62**.
- **Learner action and observation:** Add tens on the board: 2+3+1=6 tens; append 2 ones. Show the original 27+35 above a resulting 62 and a full invariant 20+7+30+5=62. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** For 52, show the missed carried ten, yielding only 5T2O; for 72, show an extra ten was counted twice. Responses are formative, not assessed.
- **Visual/interactive model direction:** Semantically labeled Tens/Ones columns, linked countable counters and ten-bundles, an explicit carried-ten marker with provenance, and a persistent accessible ledger. A carry must visibly correspond to a real bundle formed from ten singles. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Invite the next example only after the current place-value statement has been explained; offer Reset and 'Show steps'.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** “Line up ones with ones and tens with tens.”, after the explanation is accessible (planned, not wired).
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

### Section 4 — Try a New Column

- **Outcome/purpose:** Use an aligned two-digit column to calculate 46+28=74 and verify the result with place-value decomposition.
- **Section type:** `LessonSection_Config`; ordered vertically as text, Scene, markdown.
- **Text Resource (available):** “What is 46 + 28? Where does the new ten go?”
- **Scene Resource (type supported; new component proposed):** [Place Value Column Adder](./scenes/placeValueColumnAdder.scene-spec.md), independent Section 4 placement: Fresh empty Tens/Ones board with operands 46 and 28 correctly aligned. Learner can place carry, record 6+8=14 as 1T4O, and compute 4+2+1=7 tens. Optional reveal always available.
- **Markdown Resource (available):** “Four tens and six ones plus two tens and eight ones make seven tens and four ones. Six plus eight gives fourteen, so the carried ten must be included.” Mathematical statement: **46 + 28 = 74**.
- **Learner action and observation:** Fresh empty Tens/Ones board with operands 46 and 28 correctly aligned. Learner can place carry, record 6+8=14 as 1T4O, and compute 4+2+1=7 tens. Optional reveal always available. Every updated place count has a text/table equivalent, and the full explanation is available on request without a correct prediction.
- **Specific constructive feedback:** For 64, point to the omitted carried ten; for 84, show that one ten was counted twice. Confirm with 40+6+20+8=74. Responses are formative, not assessed.
- **Visual/interactive model direction:** Semantically labeled Tens/Ones columns, linked countable counters and ten-bundles, an explicit carried-ten marker with provenance, and a persistent accessible ledger. A carry must visibly correspond to a real bundle formed from ten singles. Counter/block state, written marks and accessible ledger must remain mathematically consistent.
- **Navigation/transition:** Reflect on which place changed and which value stayed the same, then end with no grade or mastery badge.
- **Accessibility, locale and RTL:** Named place-value columns independently of left/right placement, native accessible controls, full real translation of operands/group labels and errors, correct RTL numerical semantics, zoom/reduced-motion/offline equivalence.
- **Planned unlocked Note:** “When twelve ones appear, write two ones and carry one ten.”, after the explanation is accessible (planned, not wired).
- **Production status:** Scene proposed, no invented `mode` props, Note events, evaluation IDs, Quiz or new Resource type.

## CUSTOM SCENE SPECIFICATIONS

- [Place Value Column Adder](./scenes/placeValueColumnAdder.scene-spec.md), four self-contained prop-free Section entries. Generic Scene rendering is supported; this bespoke component does not yet exist.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Line up ones with ones and tens with tens.” — editorial proposal only after the corresponding complete mathematical model and explanation.
2. “When twelve ones appear, write two ones and carry one ten.” — editorial proposal only after the corresponding complete mathematical model and explanation.

Notes are **not wired** and do not imply a real Note API, state events, per-child persistence, revision sheet, spaced repetition or evidence of mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 introduces a fresh case with optional scaffolds and worked feedback, remaining a _formative experience_. Assessment Architect independently validates graded problems, decomposition variants, Skill evidence, retry thresholds, scores and mastery. A correct column total alone does not establish the full canonical Skill; current Quiz select-one adapter is separate from proposed Scenes. No scored Question_Config produced.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all child-facing English prompts, errors, explanations, number-role terms, columns, accessible names and planned Notes into every supported locale, never silently falling back to English. An equivalent ordered accessible numeric ledger offers all exchange/undo/add/check actions for keyboard, touch, switches and screen readers, not merely a static picture label. RTL aligns each digit by _semantic place value_ rather than naive mirroring; mathematical operand order remains true. WCAG 2.2 AA focus, large controls, low-resource mobile, 200% zoom, reduced motion and full downloaded offline calculation/feedback must preserve exactly the same intermediate and final mathematical states. No sound, video, WebGL, drag-only or remote checker required.

## PRODUCTION / PLATFORM DEPENDENCIES

Current `LessonSection_Config` and generic renderer support text, markdown, scene resources. Place Value Column Adder is **proposed, not implemented**, and requires approved Scene spec, prop-free entries with real locale context and own tests; no public runtime mode prop is presumed. Generic image/audio/video/code resources are typed only; YouTube is not a supported Resource_Config. Notes, spaced-review scheduler, full PWA download and synchronization remain separate product work. No TS runtime Lesson Config, Question, Quiz or scoring has been created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), Draft, not approved.
- [Canonical Skill](../../../../data/skills/arithmetic/addition/skills/columnAddition.data.ts) unchanged from Mathematics.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Confirm this Lesson's single-carry Grade 2 depth and separation from `additionRegroupingAcrossPlaces`, which extends the _value-preserving exchange_ across tens and hundreds.
- Shared generated taxonomy is coordinator-owned and intentionally left unmodified in this branch.

## HANDOFF

One provisional Draft four-Section Content and a separate Draft Scene specification. Editor must approve the Methodologist Brief first, then independently review Content and Scene; Scene Designer/Coding Agent/Assessment Architect proceed only with separate approval. Do not change any previous Lesson or source Skill.
