# Regrouping Through a Zero Place — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/regroupingAcrossZero/
Audience: **Optional advanced learners** aged 6–8 with secure 3-digit place value, hundred/ten/one exchanges and prior single-exchange column subtraction; not core content for the full age group
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (new Draft; not represented as approved)
Learning outcomes: preserve 302 through a two-step exchange; explain why zero tens requires exchanging one hundred; compute and verify 302−175=127; transfer to 403−186=217.
Target Skills: Exact source regrouping.data.ts linked by filename in Methodologist Brief; no new intermediate or duplicate Skill created
Program dependence: None

## INSTRUCTIONAL CONCEPT

An empty tens place does not prevent subtraction; it means the child may need to exchange in **two steps**. For 302 there are 3 hundreds, zero tens and 2 ones. We cannot exchange a ten that is not there. First **one hundred becomes ten tens**; then **one of those tens becomes ten ones**. The quantity remains 302 throughout: 300+2 = 200+100+2 = 200+90+12. After this, subtraction of 175 works by matching place values, yielding 127. A visual exchange is meaningful only if the child can name exactly which place lost one unit and which gained ten.

This is not a generic high-speed algorithm or a retelling of the existing two-digit column Lesson. It targets one advanced place-value case, with a zero in the tens position. The related canonical Skill is broader (also larger numbers, other exchanges); this one Lesson does not claim to exhaust it.

## LEARNER JOURNEY

1. **See the gap:** Display 302 as three hundred-blocks, zero tens and two ones. Ask how to subtract five ones when there are only two.
2. **Make tens appear without changing the total:** Exchange one hundred to ten tens, then one ten into ten ones; compare each unchanged total.
3. **Use the new representation to subtract:** 302−175, then name the remaining hundreds, tens and ones; check by adding back 175.
4. **Try a new zero-tens example:** 403−186; reveal the chained exchanges on request and confirm 217+186=403.

All interactions are learner-controlled and explanatory. Errors are treated as informative trials, never graded.

## SECTION PLAN

### Section 1 — Where Can the Tens Come From?

- Purpose / outcome: Identify a zero tens place and the need to exchange from a higher place; review hundreds/tens/ones meaning.
- Current shape: LessonSection_Config; ordered single-column Resource blocks.
- Ordered blocks:
  1. **text — supported:** “Here is **302**: three hundreds, zero tens, two ones. We want to take away five ones. We have only two loose ones. Can we make more without changing 302?”
  2. **scene — generic resource supported, bespoke Scene proposed:** [Hundred Exchange Lab](./scenes/hundredExchangeLab.scene-spec.md), initial 302 with three hundreds/zero tens/two ones. Child inspects each quantity and predicts which higher-place unit can be exchanged.
  3. **markdown — supported:** “There are **0 tens**, so we cannot exchange a ten yet. But **one hundred is ten tens**. We can exchange from the hundreds place first.”
- Model and learner action: Place-value blocks with labeled values and count ledger; “Inspect hundreds,” “Inspect tens,” “Count ones,” “Show why.” If child says “borrow a ten from zero,” respond: “There are no tens to exchange yet. A hundred can become ten tens.”
- Navigation: Move to the two-step exchange only after showing the fact 1H=10T.
- Accessibility/RTL: Numeric ledger “H=3,T=0,O=2, value 302”, full keyboard/touch and screen-reader equivalent; no visual dependency or mechanical RTL flip of place values.
- Note: “One hundred = ten tens,” planned after the first equivalence explanation.
- Dependencies: New Hundred Exchange Lab component; not implemented.

### Section 2 — Two Exchanges, Same Three Hundred Two

- Purpose: Carry out the linked hundred-to-ten and ten-to-one exchanges without changing the quantity.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **markdown — supported:** “First exchange a hundred: **3 hundreds + 0 tens + 2 ones → 2 hundreds + 10 tens + 2 ones**. Then exchange a ten: **2 hundreds + 9 tens + 12 ones**. The whole number is still 302.”
  2. **scene — proposed:** [Hundred Exchange Lab](./scenes/hundredExchangeLab.scene-spec.md), guided two-exchange placement. Child activates “Exchange 1 hundred” then “Exchange 1 ten”; sees both value computations 200+100+2=302 and 200+90+12=302.
  3. **text — supported:** “We did not add more. We changed how the same amount is grouped. Now we have twelve ones, so we can take away five ones.”
- Model/feedback: Number-label changes are bound to actual blocks and a persistent numeric ledger. Wrong “2 hundreds and 10 tens and 12 ones” gives **200+100+12=312**, not 302: “We counted the ten twice; one ten was used to make ten ones.” Wrong “3 hundreds and 10 tens” gives 400 before ones: “The hundred was not removed from its original place.”
- Navigation: Use the correct conserved state as the starting point for the written subtraction; the child may replay/undo both steps.
- Accessibility: Separate logical state descriptions after each exchange, not color-only marks; decreased place count announced.
- Note: “Exchanging changes the form, not the value,” planned after both equality checks.
- Dependencies: Same proposed Scene with isolated Section entry, distinct prop-free setup.

### Section 3 — Use the Exchange to Subtract

- Purpose: Solve 302−175 by correct corresponding place subtraction, then verify through inverse addition.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — supported:** “Now write **302 − 175** in hundreds, tens and ones columns. We have already exchanged to **2 hundreds, 9 tens, 12 ones**. Can we take away 1 hundred, 7 tens and 5 ones?”
  2. **scene — supported type, bespoke Scene proposed:** [Zero Bridge Column Board](./scenes/zeroBridgeColumnBoard.scene-spec.md), guided full subtraction with labeled columns, exchange replay, stepwise 12−5=7 ones; 9−7=2 tens; 2−1=1 hundred.
  3. **markdown — supported:** “**302 − 175 = 127**. We had 2H, 9T, 12O after exchanging. Take away 1H, 7T, 5O. That leaves **1H, 2T, 7O = 127**. Check the original amount: **127 + 175 = 302**.”
- Core explanation: The zero in the original tens place required two exchanges, but the written subtraction still compares like place values.
- Learner action and feedback: Predict ones/tens/hundreds remainders in order. If child writes 12−5=8: “Count five away from twelve: seven remain.” If they retain all ten tens and twelve ones: “The second exchange used one of the ten tens.” Explicitly compare result+removed with original 302.
- Navigation: After verifying, introduce a new numerical problem without prepopulating answer.
- Accessibility: Full ordered column ledger with source/target place identities, keyboard inspect/exchange/subtract, RTL-safe column order.
- Note: “Exchange a hundred, then a ten when the tens place is empty,” after the full example, planned.
- Dependencies: New Zero Bridge Column Board. No scored Quiz.

### Section 4 — Try Another Zero in the Tens Place

- Purpose: Transfer the chain to a fresh three-digit example and demonstrate understanding rather than memorizing 302.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — supported:** “Try **403 − 186**. Four hundreds, zero tens, three ones. How do we take away six ones when the tens place is empty?”
  2. **scene — proposed:** [Zero Bridge Column Board](./scenes/zeroBridgeColumnBoard.scene-spec.md), independent transfer entry: request help or enact 4H0T3O → 3H10T3O → 3H9T13O; subtract 1H8T6O and check the answer.
  3. **markdown — supported:** “After both exchanges, 403 is **3 hundreds + 9 tens + 13 ones**. Subtract: **13−6=7** ones, **9−8=1** ten, **3−1=2** hundreds. So **403−186=217**. Check: **217+186=403**.”
- Feedback: Wrong 227 vs correct 217: “We have nine tens after exchange, and removing eight tens leaves ONE ten.” Wrong 207: “One ten remains, so the tens digit cannot be zero.” Full explanation available without mandatory guess.
- Navigation: Reflect “What stayed the same during the exchanges? When did the starting amount actually decrease?” End with an optional oral/selected/text description; never grade.
- Accessibility: Text state log, large controls, reduced motion, RTL place descriptions and complete offline model; optional spoken explanation never required.
- Notes: Revisit the exchange-chain cue; no new Note unless editor identifies a distinct recall target.
- Dependencies: Formative only; no assessed mastery of the broader regrouping Skill.

## CUSTOM SCENE SPECIFICATIONS

- [Hundred Exchange Lab](./scenes/hundredExchangeLab.scene-spec.md), new component for Sections 1–2.
- [Zero Bridge Column Board](./scenes/zeroBridgeColumnBoard.scene-spec.md), new component for Sections 3–4.

Both are Screenwriter-owned Draft Scene specifications. The generic scene resource exists but these components do not; editor approval and Design Scene are separate stages.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “1 hundred = 10 tens.” After Section 1 shows the equivalence.
2. “Exchange changes representation, not value.” After Section 2's explicit 302 value checks.
3. “With zero tens, exchange a hundred first.” After Section 3's full two-step exchange.

All Notes are proposed, not wired to Note schemas, unlock events, persistence, revision-sheet generators or spaced schedulers. Unlocking is not evidence of mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Learner-led exchange, error contrast and inverse addition are formative. Assessment Architect must independently decide whether and how this advanced special case contributes evidence toward the broader regrouping Skill, as it does not represent three-digit/multi-zero/general larger-number mastery. Distinguish demonstration of isolated exchange states from evaluated subtraction competency. The current Lesson adapter handles select-one Questions only, and the present spec does not create any Quiz or score.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Real translations are required for every supported locale, including place-value terms, controls, status and Notes; no fallback English. Place-value columns use semantic labels rather than mere left/right position; RTL UI adapts logically while preserving mathematical H/T/O meanings. Every visual exchange has an equivalent ordered text state ledger including the exact total after each step and native operable controls; no color-only, drag-only or motion-only reasoning. Large targets, screen-reader status, keyboard, reduced motion, responsive/zoomed mobile and fully local offline arithmetic/feedback after download. No streaming, special media resource, online answer checker or WebGL needed.

## PRODUCTION / PLATFORM DEPENDENCIES

| Feature                                                      | Readiness / next owner                                                                                            |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| LessonSection_Config, text/markdown/scene vertical rendering | Verified in current Playground implementation; Coding Agent integrates reviewed resources                         |
| Hundred Exchange Lab, Zero Bridge Column Board               | **Proposed**, require independent editor-approved specifications then Scene Designer implementation and own tests |
| Prop-free isolated Scene entries, locale lookup              | Coding Agent checks integration; no invented mode prop or Scene API                                               |
| Quiz/Question scoring                                        | Assessment Architect owns validation and scoring; none authored                                                   |
| image/video/audio/code generic Section resources             | Typed only, not generic-rendered; unused                                                                          |
| youtube label                                                | No generic Resource_Config; unused                                                                                |
| Notes, offline sync/download, spaced review                  | Planned requirements, not claimed implemented                                                                     |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), currently Draft and requiring independent approval.
- [Playground generated taxonomy](../../../../docs/generated/skills/taxonomy.en.md), broad, canonical regrouping Skill.
- [Create Lesson Content Skill](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- [Common Core Mathematics Standards](https://corestandards.org/mathematics-standards/) as comparative age context, not a claim this is universally for grade 1–2.
- **Editorial gate:** This is advanced content for children with prior three-digit place-value competence. Approve whether to retain in the 6–8 band at all or defer to older learners.
- Confirm the exact 302/403 cases and that one empty tens place is a bounded lesson example, not a restriction on the source Skill.
- Methodologist Brief and Screenwriter Content are both Draft; no publication approval inferred.

## HANDOFF

Provisional Screenwriter Content and two Draft Scene specs for editor review, after the separate Methodologist approval. Do not run Design Scene, code, scored Questions, Program narrative, or new Skills automatically. Other Lessons remain unchanged.
