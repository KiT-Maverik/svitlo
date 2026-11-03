# Finding an Unknown Subtrahend — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/unknownSubtrahend/
Audience: Children 6–8 with counting, subtraction and part–whole reasoning within 20
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not approved)
Learning outcomes: distinguish removed amount from initial and remaining, reconstruct it as whole minus remainder, verify original subtraction, transfer.
Target Skills: One canonical unknownSubtrahend.data.ts linked in the Brief.
Program dependence: None

## INSTRUCTIONAL CONCEPT

We can find what was **taken away** even if we did not see it being removed: compare how much there was at first with what remains. A starting eleven and remaining seven mean exactly four were removed. The calculation 11−7=4 _finds_ this missing part, but the original statement **11−□=7** is only verified when the learner puts **4** into the box and checks **11−4=7**. The same numbers appeared in the unknown-minuend Lesson, but the missing role is different.

## LEARNER JOURNEY

1. Observe eleven before and seven afterward; infer the missing removed amount.
2. Separate seven retained objects from eleven and count four removed; translate to 11−7=4.
3. Test candidates in the exact original 11−□=7 and contrast with □−4=7.
4. Apply to 14−□=9 and explain why five is the missing removal.

## SECTION PLAN

### Section 1 — What Went Away?

- Purpose: Identify the removed part as unknown.
- Shape: LessonSection_Config, ordered text/scene/markdown blocks.
- Ordered resources:
  1. **text — available:** “There were **11** counters at first. Now **7** are left. How many were taken away?”
  2. **scene — available integration, proposed:** [Missing Removal Investigator](./scenes/missingRemovalInvestigator.scene-spec.md), two observational states with 11 initially and seven remaining; only the removed count hidden, never the evidence of the original eleven.
  3. **markdown — available:** “Eleven at first and seven still here. The other **4** counters must have been removed.”
- Core explanation and learner action: Inspect 11 counters, mark seven as remaining and count the other four. Predictions 4/7/18 provide count-based feedback: “Seven were left, not taken away”; “Eighteen is greater than the eleven we started with.”
- Navigation: Ask for the number sentence that finds the removed part.
- Accessible model: Linear “original 11 / still there 7 / taken away 4”; keyboard/select equivalent, no color-only comparison, semantic RTL.
- Planned Note: “Removed part = whole − what remains” after the contrast, not wired.
- Dependencies: New Scene proposed.

### Section 2 — Subtract What Is Left

- Purpose: Connect part–whole difference to calculating the missing removed amount.
- Shape: LessonSection_Config.
- Ordered resources:
  1. **markdown — available:** “If we begin with **11** and still have **7**, compare them: **11 − 7 = 4**. Four were taken away.”
  2. **scene — proposed:** [Missing Removal Investigator](./scenes/missingRemovalInvestigator.scene-spec.md), difference entry: match seven of the eleven as retained, highlight four unpaired objects and reveal 11−7=4.
  3. **text — available:** “We subtracted the amount that **remains** from the amount we **started with**. That gave the amount removed.”
- Learner feedback: If child proposes 11+7=18: “We are not joining two new groups. Seven are part of the original eleven.” If 7−11, explain original whole is eleven; the removed group cannot exceed that.
- Navigation: Now the child must verify in original subtraction, not just the finding calculation.
- Accessibility: All seven matched counters and four unmatched can be explored through an ordered text ledger and native controls.
- Planned Note: No new Note; reuse one.
- Dependencies: Additional isolated Scene entry.

### Section 3 — Put the Missing Amount in the Middle

- Purpose: Distinguish the box in the subtrahend position and verify candidate.
- Shape: LessonSection_Config.
- Ordered resources:
  1. **text — available:** “Here is the original equality: **11 − □ = 7**. Which number goes inside the box? Check it by subtracting.”
  2. **scene — proposed:** [Missing Removal Investigator](./scenes/missingRemovalInvestigator.scene-spec.md), candidate entry with 3/4/7 and complete evaluated original expression for each.
  3. **markdown — available:** “**11 − 4 = 7**. Four is the missing removed part. The calculation **11 − 7 = 4** helped us find it; the calculation **11 − 4 = 7** checked it.”
- Learner action and feedback: Candidate 3 → 11−3=8, not seven. Candidate 7 → 11−7=4, not seven. Candidate 4 → 11−4=7. Contrast briefly with □−4=7: “There the starting amount is missing; here the removed amount is missing.”
- Navigation: Shift to independent problem with different values.
- Accessibility: Missing box explicitly named “amount taken away”; exact substituted expressions and verdict in text/screen-reader output. No graded scoring.
- Planned Note: “Check the answer in the original subtraction” after the candidate comparison.
- Dependencies: Scene implementation/translation later.

### Section 4 — Find the Lost Part Yourself

- Purpose: Transfer to a different whole and remainder.
- Shape: LessonSection_Config.
- Ordered resources:
  1. **text — available:** “**14 − □ = 9.** Fourteen at first, nine remain. How many did we take away?”
  2. **scene — proposed:** [Missing Removal Investigator](./scenes/missingRemovalInvestigator.scene-spec.md), transfer entry; optional text/counter model, candidate 4/5/6 and “Show how.”
  3. **markdown — available:** “**14 − 9 = 5** finds what was taken away. Check the **original** statement: **14 − 5 = 9**.”
- Feedback: Choosing 4 shows 14−4=10, not 9; 6 yields 14−6=8, not 9; 5 yields nine. Show explanations even without a submitted choice. Reflection “Why did we subtract nine to find the missing number?” by optional oral, selected or typed answer.
- Navigation: End with a role summary rather than a victory animation.
- Accessibility: Full text log, RTL-safe math, adequate focus/touch targets, no drag or speech requirement.
- Notes: Recall removed-part rule; no additional cue.
- Dependencies: New Scene; no validated Quiz.

## CUSTOM SCENE SPECIFICATIONS

- [Missing Removal Investigator](./scenes/missingRemovalInvestigator.scene-spec.md) — four independent prop-free entries covering comparison of before/after, subtraction finding, substitution and transfer.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Removed amount = starting whole − what remains.” After Section 1–2’s known/remaining model.
2. “Verify the removed amount in the original subtraction.” After a complete checked 11−4=7.

Planned, not wired. No Note data type, unlock/persistence, review sheet or spaced-retrieval scheduling is asserted. A revealed Note is not Skill mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

These are explanatory and formative learner interactions, not scored Questions. Assessment Architect later validates any items distinguishing unknown subtrahend from unknown minuend and establishes scores, retries and evidence. Repeated correct selection alone does not establish both Skills. Current generic renderer supports text/markdown/scene; bespoke Scene is not built.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All strings must be genuinely translated into required locales, not copied from English. “Started with”, “left over” and “removed” are separate linguistic roles. A child must be able to operate the model through ordered text, keyboard, touch and assistive technology; large text and controls, semantic RTL operator order, reduced motion and offline deterministic computation after package download. No media dependency, drag-only task or compulsory speech input.

## PRODUCTION / PLATFORM DEPENDENCIES

Existing LessonSection_Config and general text/markdown/scene resources are available; Missing Removal Investigator is **proposed** and needs approved spec, prop-free Scene implementation, own tests and locale wiring. Image/audio/video/code generic renderer unsupported, YouTube label not configured; not used. Notes, offline sync and spaced scheduler are planned, not claimed implemented.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md) (Draft, needs explicit approval).
- [Generated Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editor to confirm whether unknown-minuend comparison is short enough not to dilute the atomic Skill; no Program/curriculum alignment claims.

## HANDOFF

A provisional Draft Screenwriter script and a separate Draft Scene spec. Approval order: editor reviews Brief, then Content/Scene; Coding Agent/Scene Designer and Assessment Architect work only after their separately authorized stages. No code or scored Questions.
