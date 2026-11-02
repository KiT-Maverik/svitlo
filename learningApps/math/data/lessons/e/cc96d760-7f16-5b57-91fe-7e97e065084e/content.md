# Taking Away Zero — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/subtractZero/
Audience: Children 6–8, grades 1–2, counting and elementary subtraction within 20
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not represented as approved)
Learning outcomes: explain a−0=a, predict unchanged quantity, distinguish “remove none” from “none left,” keep operand order accurate.
Target Skills: As directly linked in the Methodologist Brief.
Program dependence: None

## INSTRUCTIONAL CONCEPT

If no counters are taken away, the collection has exactly as many as before. This is the mathematical meaning of **7 − 0 = 7**, not a memorized exception. In a number line, subtracting zero corresponds to a jump of zero, which changes nothing. Contrast it with a real decrease by two and with the misconception “zero makes the answer zero.” Keep operands meaningful and do not suggest subtraction is commutative.

## LEARNER JOURNEY

1. Predict the effect of removing ZERO of seven counters.
2. Compare the same starting collection with removing two.
3. Connect a zero-sized subtraction jump with the unchanging number.
4. Transfer to thirteen and zero, and explain the operand order.

## SECTION PLAN

### Section 1 — Take Nothing Away

- Purpose: See the meaning of a zero subtrahend.
- Shape: LessonSection_Config.
- Ordered vertical blocks:
  1. **text — available:** “There are 7 counters. You must take away ZERO counters. How many stay?”
  2. **scene — proposed, supported resource:** [Zero Removal Explorer](./scenes/zeroRemovalExplorer.scene-spec.md), seven countable counters and a “Take away 0” action with visibly unchanged quantity.
  3. **markdown — available:** “You removed none. All seven remain: **7 − 0 = 7**.”
- Explanation and learner action: Child predicts 0 / 7 / 6, then reveals unchanged seven. For 0: “Zero tells us how many were removed, not how many remained.” For 6: “No counter was taken away; count seven still here.” Show the full explanation even without a prediction.
- Model: Counter array and an accessible before/removed/after list.
- Navigation: Ask “What if we really take some counters away?”
- Accessibility/RTL: Stable accessible count log, correctly ordered equation, no animation-only event.
- Note: “Taking away zero leaves the number unchanged,” planned after visible demonstration.
- Dependencies: New custom Scene; text/markdown renderer exists.

### Section 2 — Zero Is Different from Two

- Purpose: Distinguish “remove none” from actual removal and “none remain”.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “Begin with 7. Compare taking away 0 with taking away 2.”
  2. **scene — proposed:** [Zero Removal Explorer](./scenes/zeroRemovalExplorer.scene-spec.md), comparison entry: two independently labeled trials from seven; removing 0 leaves 7; removing 2 leaves 5.
  3. **markdown — available:** “**7 − 0 = 7**. **7 − 2 = 5**. The first action removes nothing; the second removes two. Zero does not make the whole collection disappear.”
- Explanation/feedback: Ask whether either example leaves zero. Answer: neither; the first leaves 7, second leaves 5. Confusion gets a countable before/after comparison, no score.
- Model: Show separate trials, not 7−0−2 mislabeled as 7−2.
- Navigation: Connect to zero-length jumps on a number line.
- Accessibility: Read every trial, label removed and remaining counts, use no color-only distinction.
- Note: No new Note; invite recall of previous one.
- Dependencies: Scene entry with isolated state.

### Section 3 — A Jump of Zero

- Purpose: Connect the rule to another representation and generalize it.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **markdown — available:** “Subtracting means a jump back on a number line. What happens when the jump is **0**?”
  2. **scene — proposed:** [Zero Removal Explorer](./scenes/zeroRemovalExplorer.scene-spec.md), number-line entry at seven; show zero-length displacement (no changed coordinate), and a contrast jump back two to five.
  3. **text — available:** “A jump of zero leaves us at seven. **7 − 0 = 7**.”
- Explanation/feedback: If child thinks a jump of zero arrives at zero: “Zero is the **size** of the jump. We did not move from seven.” State explicitly that the number line's direction and start are labeled.
- Navigation: New number, same rule.
- Accessibility: Text “start 7; move 0; finish 7” is fully operable and equivalent for nonvisual users.
- Note: “A zero subtraction is a jump of zero,” optional planned cue, only if editorially distinct enough to merit recall.
- Dependencies: Scene visualization, no separate image renderer.

### Section 4 — Does the Starting Number Matter?

- Purpose: Apply the rule to an unfamiliar starting number and retain operand order.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “There are **13** counters. Take away **0**. What is 13 − 0?”
  2. **scene — proposed:** [Zero Removal Explorer](./scenes/zeroRemovalExplorer.scene-spec.md), transfer entry with 13 counters, 13−0=13, plus optional case 0−0=0.
  3. **markdown — available:** “Nothing was taken away, so **13 − 0 = 13**. The starting number stays the same. **0 − 13** reverses the order: it does not mean ‘start at thirteen and remove nothing’. We cannot take thirteen objects from an empty collection in this nonnegative counter model.”
- Feedback: For 0: “Thirteen did not disappear”; for 13: “Yes, it remains thirteen because none were removed.” Optional compare and discuss order without requiring negative-number calculation.
- Navigation: Conclude with child-generated example of a−0=a, using selection, text or speech to an adult; no forced output.
- Accessibility: Native button/keyboard alternative to counters, clear mathematical order in RTL.
- Notes: Recall original cue; no fake mastery.
- Dependencies: New Scene and teacher/editor review on non-example wording.

## CUSTOM SCENE SPECIFICATIONS

- [Zero Removal Explorer](./scenes/zeroRemovalExplorer.scene-spec.md) — counter removal, contrast, number line and transfer; distinct prop-free Scene instances by Section.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- “Take away 0 → the starting amount stays.” Unlock proposal after first unchanged seven-counter model.
- Optional “A jump of 0 does not move the number.” After number-line contrast, subject to editor review for redundancy.

Planned, not wired. No Note type/unlock event/review-sheet persistence. No automatic spaced schedule, and a revealed cue is not mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Predict/removal/contrast/new-number activities are formative instructional interactions, not Quiz_Config items. Assessment Architect validates any later a−0 question and separately prevents 0−a confusion; no scored data or result policy authored. Current Lesson adapter supports select-one in Quiz but Scene interactions are new and require implementation.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

English source strings require real complete locale translations with no silent English fallback. Preserve the difference between “zero taken” and “zero left” in every language. Semantic RTL mathematics, structured text state for stationary visuals, keyboard/touch/screen-reader access, reduced motion, legible zoom/mobile and offline calculations must be equivalent. No image, audio, video, code or YouTube resources needed.

## PRODUCTION / PLATFORM DEPENDENCIES

LessonSection_Config and text/markdown/scene generic rendering are verified. Zero Removal Explorer is **proposed**, requires standalone spec approval, prop-free component implementation and tests. Locale selection and offline downloads need actual engineering verification. Other resource types not in generic renderer. Notes and review schedule planned. No code, Quiz or scoring is implemented by this document.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md) (Draft; editor approval pending).
- [Generated taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editor: determine whether a brief reverse-order non-example is helpful for age six without formally introducing negative arithmetic.
- Engineering: precise zero-displacement accessible model must not be rendered as invisible animation.

## HANDOFF

Draft Brief, provisional Draft Script and Draft Scene specification for editorial review. Respect the Methodologist gate before promoting Script for coding. Scene Designer builds only after independent approved Scene spec; Coding Agent assembles resources, Assessment Architect owns scored items.
