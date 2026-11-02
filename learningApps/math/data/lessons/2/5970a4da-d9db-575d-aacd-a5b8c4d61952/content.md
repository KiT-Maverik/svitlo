# What Does Subtraction Tell Us? — Content

Status: Draft — provisional Screenwriter draft pending approval of the new Methodologist Brief
Target Lesson: learningApps/playground/Data/Lessons/1/subtractionMeaning/
Audience: Children 6–8, grades 1–2, counting and part–whole concepts within 20
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; not represented as approved)
Learning outcomes: removal, comparison and missing-part roles; mathematical model and accurate subtraction equality for each; explain common numerical structure.
Target Skills: As linked in the Methodologist Brief (one direct canonical subtractMeaning.data.ts link)
Program dependence: None

## INSTRUCTIONAL CONCEPT

**Subtraction can answer three different questions using one number relationship.** We keep the values nine, four and five stable while changing the story, so a child sees the difference between what the numbers _do_ in the situation and the operation written as 9 − 4 = 5. We do not present comparing groups as secretly removing counters. This avoids teaching subtraction as just an action of taking objects away.

## LEARNER JOURNEY

1. Take away four of nine; count five remaining.
2. Put nine next to four without removing anything; pair four objects and identify five more in the larger collection.
3. Show a whole of nine split into a visible group of four and an unlabeled remainder; find five missing counters.
4. Look at three new short questions, choose a meaningful subtraction and explain the role of the answer.

No Program narrative, arbitrary timer, reward or scored quiz.

## SECTION PLAN

### Section 1 — What Is Left?

- Purpose / learning outcome: Make removal and a remainder visible.
- Current shape: LessonSection_Config.
- Ordered blocks, single vertical column:
  1. **text — supported:** “There are 9 counters. Take away 4. How many are left?”
  2. **scene — supported integration, new Scene proposed:** [Subtraction Stories Lab](./scenes/subtractionStoriesLab.scene-spec.md), remove mode; 9 distinct counters, learner triggers removal of exactly 4, counts 5 remaining.
  3. **markdown — supported:** “Nine was our starting number. We took away four. Five are left: **9 − 4 = 5**.”
- Core explanation: 9 = original total, 4 = removed amount, 5 = remainder. The minus sign names an amount taken away in this story.
- Model and learner action: Control “Take away four,” “Show remaining,” “Put them back.” Optional prediction 4/5/6. Wrong 4: “Four were taken away, but five stay.” Wrong 6: “Count the five counters still here.”
- Navigation: Transition with “Will subtraction still help if nothing is taken away?”
- Accessibility/RTL: Ordered accessible text of original, removed and remaining; focusable controls and no drag; operand order stable.
- Note: “Subtraction can find what remains” after the full nine-minus-four demonstration (planned, not wired).
- Dependencies: bespoke Scene is not implemented.

### Section 2 — How Many More?

- Purpose: Recognize comparison subtraction that leaves both quantities intact.
- Current shape: LessonSection_Config.
- Ordered blocks:
  1. **text — supported:** “One collection has 9 counters. Another has 4. How many MORE are in the larger collection?”
  2. **scene — proposed:** Same [Subtraction Stories Lab](./scenes/subtractionStoriesLab.scene-spec.md), compare mode; two separate groups of 9 and 4, optional one-to-one pairing of four objects, five left unmatched in the larger group; neither group shrinks.
  3. **markdown — supported:** “Four counters can be matched with four of the nine. **Five extra counters** are in the larger group. We write **9 − 4 = 5**, even though we didn't take away any counters.”
- Explanation and feedback: If learner adds 9+4=13: “That counts both collections together. We asked how many MORE one has, so compare them.” If child removes 4 from a collection, show two unchanged totals and the extra five.
- Navigation: Move to a whole with one hidden part, not a second comparative story.
- Accessibility: Pairing has a text equivalent “4 pairs matched, 5 extras”; native buttons, no color-only differences.
- Note: “Subtraction can show the difference between amounts” after comparing, planned.
- Dependencies: same Scene family, second independently initialized prop-free entry.

### Section 3 — What Part Is Missing?

- Purpose: Recognize the unknown-part model without reinterpreting it as an unrelated Skill.
- Current shape: LessonSection_Config.
- Ordered blocks:
  1. **text — supported:** “There are 9 counters altogether. We know about a part of 4. How many belong to the other part?”
  2. **scene — proposed:** [Subtraction Stories Lab](./scenes/subtractionStoriesLab.scene-spec.md), missing-part mode; 9 positions visible, 4 clearly in known part, 5 countable positions with unknown numeral.
  3. **markdown — supported:** “The whole is nine. We know four. **9 − 4 = 5** finds the part we did not know. Four and five make nine.”
- Action and feedback: “Reveal part”, “Check whole”. A guess of 13 (adding whole and known part) yields: “Four plus thirteen would be seventeen, not nine. The missing part must fit inside the whole.”
- Navigation: Child compares three story questions using identical mathematical values.
- Accessibility: Unknown label read as “missing part”; structured whole/known/other counts, no hidden objects needed for reasoning.
- Note: “Whole minus known part can reveal the missing part” after checking 4+5=9, planned.
- Dependencies: new Scene placement.

### Section 4 — Same Equation, Different Questions

- Purpose: Transfer from the triple contrast to short novel numbers.
- Current shape: LessonSection_Config.
- Ordered blocks:
  1. **markdown — supported:** “Try three questions. (A) 8 blocks, remove 3: what remains? (B) 8 blocks versus 3: how many more? (C) 8 in all and 3 known: what other part?” The child must name which situation is being described before showing the answer.
  2. **scene — proposed:** [Subtraction Stories Lab](./scenes/subtractionStoriesLab.scene-spec.md), transfer mode; select one of three illustrated/accessible stories; display 8−3 only after the scene context is understood.
  3. **markdown — supported:** “Each question uses **8 − 3 = 5**. Five can be the remainder, the difference or the missing part. The numbers are the same; what the answer tells us depends on the question.”
- Action and feedback: A child may choose a story, inspect the model, request a hint or full explanation without a score. If they confuse difference with remainder, show which objects remain physically present.
- Navigation: Conclude by asking the child to describe a subtraction story orally, by selection or optional typing. No Quiz.
- Accessibility: Identical reasoning with ordered labels and keyboard controls; texts stand independently of audio/graphics.
- Notes: revisit three short Notes; no new one.
- Dependencies: new transfer entry with separate state.

## CUSTOM SCENE SPECIFICATIONS

- [Subtraction Stories Lab](./scenes/subtractionStoriesLab.scene-spec.md) — one reviewable design with distinct prop-free entries for removal, comparison, missing-part and transfer.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Subtraction can find what remains” after Section 1.
2. “Subtraction can show the difference between amounts” after Section 2.
3. “Whole − known part = missing part” after Section 3.

These cues are planned, not wired. There is no Note API, unlock persistence, compiled revision view or automatic spaced review. Unlocking does not prove mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Prediction, inspection and explanation are instructional feedback, not scored Questions. Assessment Architect later decides how to distinguish the three meanings in valid items and score them without conflating with the separate unknown-addend Skill. Current Lesson adapter's select-one support does not prove any proposed Scene is implemented.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All prompts, controls, feedback and Notes need genuine supported-language translations, not English fallback. “How many are left,” “how many more,” “how much is missing” must remain semantically distinct. Counter displays have equivalently operable ordered text lists; keyboard/touch/screen-reader, large-type, reduced-motion, mobile and semantic RTL support. All text and Scene calculations must be accessible offline after the selected content package is downloaded. No video/audio/image resource dependency.

## PRODUCTION / PLATFORM DEPENDENCIES

General LessonSection_Config, text/markdown/scene types and generic renderer are verified. Subtraction Stories Lab is **proposed**, requires editor-approved Scene spec and later prop-free React implementation/testing with selected locale context. Image/audio/video/code are typed but unsupported as generic Section resources; youtube lacks a resource config. Notes and offline sync are planned, not implemented. No typed Lesson, Quiz or Question data created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md) — currently Draft, requires separate approval before Screenwriter script can be promoted.
- [Generated Playground taxonomy](../../../../docs/generated/skills/taxonomy.en.md).
- [Create Lesson Content Skill](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Editorial decision: confirm one Lesson may include all three interpretations and child-ready examples; this mirrors the existing atomic Skill rather than adding competencies.
- No educational efficacy or curriculum certification claimed by these illustrative activities.

## HANDOFF

Provisional Draft script and Draft Scene specification are provided **for review, not implementation**. The Methodologist Brief is not yet approved; editor first approves it, then separately reviews this script and Scene spec. Afterward Scene Designer, Coding Agent and Assessment Architect may proceed through independently authorized workflows.
