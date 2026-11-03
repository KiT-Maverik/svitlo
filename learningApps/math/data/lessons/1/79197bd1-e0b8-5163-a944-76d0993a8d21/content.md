# Subtracting a Number from Itself — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/subtractSelf/
Audience: Children aged 6–8, grades 1–2, basic subtraction and counting within 20
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft, not represented as approved)
Learning outcomes: explain a−a=0; distinguish removal of all from removal of none; apply to 6, 12 and zero, verifying through addition.
Target Skills: As directly linked in the Methodologist Brief, unchanged.
Program dependence: None

## INSTRUCTIONAL CONCEPT

A whole collection can be completely removed. The difference then is **zero because nothing remains**, not because the symbols magically cancel. The same-number subtraction **a − a = 0** is a statement about removing _the full amount_. The previous lesson’s zero subtraction **a − 0 = a** asks something different. A child will examine both on one set so that similar-looking expressions do not become interchangeable chants.

## LEARNER JOURNEY

1. Predict what remains if all six counters are taken away.
2. Contrast removing zero, some and all of the same six.
3. Apply complete removal to twelve and the empty starting case.
4. Explain and check the general relationship with inverse addition.

## SECTION PLAN

### Section 1 — Take Away the Whole Group

- Purpose: Experience complete removal as a meaningful result of zero.
- Current shape: LessonSection_Config.
- Ordered vertical blocks:
  1. **text — available:** “There are **6 counters**. Take away **all 6**. What remains?”
  2. **scene — typed/renderer supported, new Scene proposed:** [Whole Removal Workbench](./scenes/wholeRemovalWorkbench.scene-spec.md), complete-removal entry: six countable counters; remove exactly six with learner-paced controls; a labeled removed area and zero left.
  3. **markdown — available:** “We had six. We took all six. **No counters remain. 6 − 6 = 0.**”
- Learner action and feedback: Prediction 6/0/2 or “Show how.” For six: “Six were here at the start, but all six went into the removed group.” For zero: “Yes. No counters are left.” The result is revealed in text even if learner does not predict.
- Model: Original six = removed six + remaining zero; do not disappear without showing where all six went.
- Navigation: “How is taking all six different from taking away zero?”
- Accessibility/locale/RTL: Detailed count log and equivalent keyboard action, readable status; no disappearing-only information. Mathematical minus sign retains role.
- Note: “A number minus itself leaves zero,” proposed after the six-minus-six model (not wired).
- Dependencies: Scene proposed, general text and markdown available.

### Section 2 — None, Some, or All?

- Purpose: Discriminate a−a=0 from a−0=a and partial removal.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “Start with six each time. What is left if you remove **0**, **2**, or **6**?”
  2. **scene — proposed:** [Whole Removal Workbench](./scenes/wholeRemovalWorkbench.scene-spec.md), three independently reset cases: 6−0=6, 6−2=4, 6−6=0.
  3. **markdown — available:** “Taking away none leaves **6**. Taking away some leaves **4**. Taking away the whole group leaves **0**. These different questions do not have the same answer.”
- Explanation and action: A child selects amount to remove, then sees before/removed/remaining. If they choose zero remaining after removing 0, feedback: “We removed nothing. All six are still here.” If they choose six remaining after removing six: “The six are all in the removed group.”
- Navigation: Ask whether the same relationship works for a larger collection.
- Accessibility: Ordered text/controls for each trial; no color alone indicates result.
- Note: “Subtracting all is different from subtracting none,” planned at contrast reveal.
- Dependencies: Same bespoke Scene, independent state.

### Section 3 — A Bigger Group, Same Reason

- Purpose: Transfer from concrete counting of six to twelve; include zero boundary.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **markdown — available:** “Twelve counters. Remove twelve. Think before you count: will any remain? How about **0 − 0**?”
  2. **scene — proposed:** [Whole Removal Workbench](./scenes/wholeRemovalWorkbench.scene-spec.md), transfer entry with 12−12=0, optional 0−0=0.
  3. **text — available:** “**12 − 12 = 0.** The whole group was taken away. **0 − 0 = 0**, because the empty group stays empty when nothing is removed.”
- Explanation and feedback: Offer a full/empty counter model plus text. Wrong “twelve remain” answer gets a clear removed-twelve vs remaining-zero comparison, not a score.
- Navigation: Lead to a concise numerical explanation beyond a specific group.
- Accessibility: Full count of twelve is optional; the before/removed/after text shows equivalence without 12 repeated taps.
- Note: No new Note needed if original is recalled.
- Dependencies: New Scene transfer entry.

### Section 4 — Explain and Check

- Purpose: Generalize a−a=0 and verify by inverse addition.
- Shape: LessonSection_Config.
- Ordered blocks:
  1. **text — available:** “When a number is taken away from itself, what remains? Choose one example: **9 − 9**, **4 − 4**, or **0 − 0**.”
  2. **scene — proposed:** [Whole Removal Workbench](./scenes/wholeRemovalWorkbench.scene-spec.md), independent entry with a chosen example, before/removed/after values and reversible verification using 0 + a = a.
  3. **markdown — available:** “The full amount has been removed, so **a − a = 0**. For example **9 − 9 = 0**. Check: **0 + 9 = 9**. If we had taken away zero instead, **9 − 0 = 9**.”
- Explanation/feedback: Child selects the result and may explain in speech, selected sentence or optional typing. For 9−9 suggested result 9: “Nine were removed from nine. The remaining amount is zero.” Full explanation is always accessible.
- Navigation: Finish without a grade, with an optional recall example for later.
- Accessibility: Text and native controls equivalent to model, correct RTL and nonvisual operation.
- Notes: revisit general rule; no invented unlock event.
- Dependencies: Scene implementation and later separate Assessment Architect review if scored tasks desired.

## CUSTOM SCENE SPECIFICATIONS

- [Whole Removal Workbench](./scenes/wholeRemovalWorkbench.scene-spec.md) — four independent prop-free placements, comparing complete/partial/zero removal.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- “Subtract a number from itself → zero remains.” Proposed after Section 1 complete removal.
- “All removed is not the same as none removed.” Proposed after Section 2 contrast.

These are future Notes, not implemented state/events, scoring or a compiled offline review sheet; an unlocked Note is not mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Prediction and comparison are formative teaching in a custom Scene, not graded Quiz items. Assessment Architect must independently design checks for generalization, avoid confusion with the separate subtractZero Skill, and decide validation, scoring and mastery, if requested. Practice can be revisited later through a separately authorized scheduler.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every label/control, number explanation and future Note requires genuine translation into every supported language without silent English fallback. Present “original, removed, remaining” explicitly via a structured text ledger and keyboard-operable controls, with screen-reader/live-text feedback, RTL-semantic equations, 200% zoom, reduced motion and fully equivalent offline access. No drag-only or visual-disappearance-only clues, mandatory speech or time limit. Simple local HTML/SVG counters suffice; generic image/video/audio/code resources not needed.

## PRODUCTION / PLATFORM DEPENDENCIES

Generic LessonSection_Config supports ordered text, markdown and scene blocks. Whole Removal Workbench is proposed, needs editorial Scene spec approval, prop-free implementation, tests, complete locales and offline verification. Quiz/question types are distinct; the current Lesson adapter only handles select-one, not this bespoke Scene. No Notes implementation or mastery/score APIs are assumed.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md) (new Draft; approval pending).
- [Generated taxonomy](../../../../docs/generated/skills/taxonomy.en.md), subtractSelf semantics.
- [Create Lesson Content Skill](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editor: approve brief contrast with a−0=a without re-teaching the whole previous Lesson; verify zero-boundary wording.
- No claimed externally validated effectiveness or particular national Curriculum placement.

## HANDOFF

Provisional Screenwriter Content and one Scene spec supplied for editorial feedback. Do not implement until the Brief and Script/Scene are each approved in their respective workflow stages. No Code/Skills/other Lessons modified by these artifacts.
