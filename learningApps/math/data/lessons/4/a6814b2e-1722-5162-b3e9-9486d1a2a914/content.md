# Finding an Unknown Addend — Content

Status: Draft
Target Lesson: learningApps/playground/Data/Lessons/1/findingUnknownAddend/ (Playground)
Audience: Children aged 6–8 in grades 1–2; beginning addition and subtraction, unequal reading fluency, optional manipulatives and nonverbal access
Approved Methodologist source: [Methodologist Brief](./methodologist-brief.md) — editor authorized treating the existing Briefs as approved for this workflow test; the source file still says Methodologist status: Draft and requires separate editorial reconciliation before publication
Learning outcomes: identify the missing addend in either position; understand the whole as known and unknown parts; use total minus known part to find the missing part (initially within 20); verify by restoring the missing value in the ORIGINAL addition equality
Target Skills: As approved and directly linked in the Methodologist Brief (unknownAddend.data.ts); no copied or invented Skill identities
Program dependence: None

## INSTRUCTIONAL CONCEPT

A sum names a **whole** made from two **parts**. When one part is known and the whole is known, the other part can be found by subtraction. The equals sign says the quantities on its two sides are equal—not “the answer comes next.” Finding a candidate is only half the reasoning: replacing the box in the original addition must make the complete equality true.

Make the invisible _part_ visible with counters before presenting the inverse subtraction. Then preserve meaning as the empty box moves from right addend to left addend. End with a fresh case in which the learner reconstructs the missing part and checks the original equality. Every example is nonnegative whole-number arithmetic with sum at most 20; no negative numbers, long equation-solving transformations, multiple unknowns, or timed fact drills.

The experience is Program-neutral and does not turn correctness in a Scene into a Quiz, score, mastery record, or new Skill.

## LEARNER JOURNEY

1. **Notice the missing part:** twelve counters are a whole; five are in the known part and the remaining counters are not labeled yet. The child predicts how many are missing.
2. **Discover a reliable method:** start from the whole, separate the known part, and read the leftover as a subtraction; restore both parts and see that their total is unchanged.
3. **Read either arrangement:** compare 5 + □ = 12 and □ + 5 = 12. Both describe a whole of twelve with one known part five.
4. **Try and check:** independently find the unknown in □ + 6 = 14, then substitute the proposed value into the _original_ addition and compare its sum with fourteen. Offer hints and a complete explanation without penalty.

Each Section is short and learner-paced; text and mathematical actions use one consistent concrete representation. Hints remain optional and never conceal the explanation from a child who cannot yet calculate independently.

## SECTION PLAN

### Section 1 — One Part Is Missing

- Purpose / learning outcome: Identify the whole, known part, and missing part; understand □ as one unknown quantity, not a direction to compute the visible numbers together.
- Current implementation shape: LessonSection_Config; nonempty ordered single-column resources.
- Ordered content blocks (top to bottom):
  1. **text — available now:** “There are 12 counters altogether. We can see a group of 5. The other part has no number yet. How many counters are in that part?”
  2. **scene — type and renderer available; custom Scene proposed:** [Part–Whole Workbench](./scenes/partWholeWorkbench.scene-spec.md), observation placement: present a whole frame with 12 clearly countable positions, a known group of 5, and a still-unlabeled complementary group. A reversible cover hides the complementary label, _not the counters needed for reasoning_. Child can count or request grouping assistance.
  3. **markdown — available now:** “The 12 counters are the whole. The 5 counters are one part. We are finding the other part. We can write this as **5 + □ = 12**. The box stands for one number.”
- Core explanation and learner-facing text: **Whole** means all twelve counters; a **part** means a group within them. The box is the number of counters in the unnamed part. The equal sign states the sum of both parts must be twelve.
- Illustration / model / interaction: A 12-position strip with a clear separator after 5; all positions can be counted even before revealing the missing group’s numeral. Equal groups are NOT presumed. Avoid interpreting a picture as five plus twelve objects.
- Learner action, observations and explanatory feedback: “Show the two parts” highlights 5 and 7 without revealing a trick answer first; after counting, reveal “5 counters and 7 counters make 12.” A wrong prediction receives “Let’s count the other part. There are 7 counters there,” without shame or a point total.
- Navigation and transition: Show the complete 5 + 7 = 12 composition before transitioning from counting to subtraction. No accuracy gate.
- Accessibility, locale and RTL requirements: Ordered text equivalent “whole 12; known part 5; remaining part has 7 positions”; keyboard buttons for count/reveal; no reliance on color or precise dragging. □ must be announced as “missing number.” Preserve mathematical operand order under RTL.
- Proposed unlocked Note(s) at this moment: Note 1 “A sum is a whole made from parts.” Proposed after the complete 12 = 5 + 7 model is observed; planned, not wired.
- Implementation dependencies and review notes: New Workbench Scene is proposed; type text/markdown and generic scene resource rendering are available. Choice/prediction is formative only.

### Section 2 — Take Away the Known Part

- Purpose / learning outcome: Explain how subtracting the known addend from the sum identifies the other addend.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks (top to bottom):
  1. **markdown — available now:** “We know the whole is 12. We already know 5 of those counters. Count what is left: **12 − 5 = 7**. So the missing part is 7.”
  2. **scene — resource supported; custom Scene proposed:** [Part–Whole Workbench](./scenes/partWholeWorkbench.scene-spec.md), guided subtraction placement: child selects or watches “Separate the known 5,” sees 7 remaining from the same unchanged twelve, then restores the two parts to make twelve.
  3. **text — available now:** “We did not change the whole. We found the part we did not know. When one part is missing, we can subtract the known part from the whole.”
- Core explanation and learner-facing text: Subtraction **12 − 5 = 7** finds the missing addend; restoration **5 + 7 = 12** checks the part–whole relationship. Neither “subtract the visible five from itself” nor “add five to twelve” gives the missing part.
- Illustration / model / interaction: Maintain the same 12 counters while the known five are _separated_ to a distinct labeled area. The remaining seven are counted, with a corresponding number sentence. Show one shorter transfer example with whole 10, known 4, remaining 6.
- Learner action, observations and explanatory feedback: Offer controls “Separate the 5,” “Count what remains,” “Put the parts together,” “Show the subtraction,” and “Try 10 and 4.” For 10 − 4: “Six counters remain. Four and six make ten.” If learner first selects 5 as the missing part for 12 and 5: “Five is the part we already knew. Count the other counters.”
- Navigation and transition: Compare both equivalent views—whole minus known equals missing, and known plus missing equals whole—then move to a different position for the box.
- Accessibility, locale and RTL requirements: Narrate exact totals, moved counts, operation symbols and results; accessible linear list/table of whole, known and unknown parts. Operations must not change mathematical meaning when display direction changes. Animation may be disabled with the identical before/after explanation.
- Proposed unlocked Note(s) at this moment: Note 2 “Whole − known part = missing part.” Proposed after seeing both 12 − 5 = 7 and 5 + 7 = 12; planned, not wired.
- Implementation dependencies and review notes: No new mathematical Skill is created by this concrete representation; building the Scene requires its separately approved specification.

### Section 3 — The Box Can Be on Either Side of the Plus

- Purpose / learning outcome: Identify the missing addend when it is first or second and keep the equals sign as a comparison of equal amounts.
- Current implementation shape: LessonSection_Config.
- Ordered content blocks (top to bottom):
  1. **text — available now:** “Look at these two equalities: **5 + □ = 12** and **□ + 5 = 12**. Where is the box now? Did the whole or the known part change?”
  2. **scene — resource supported; custom Scene proposed:** [Addition Equality Verifier](./scenes/additionEqualityVerifier.scene-spec.md), position-comparison placement: place the same five-and-seven part model under both arrangements, invite selection of which addend is missing, and substitute 7 into either place. Compare each displayed sum with 12.
  3. **markdown — available now:** “In both equalities, **12** is the whole and **5** is the known part. The missing part is **7**. We can check: **5 + 7 = 12** and **7 + 5 = 12**. The place of the box changed, but the part did not.”
- Core explanation and learner-facing text: Addends are parts being joined; their order can change without changing their sum. A missing addend is not necessarily the number after the plus sign. Equal sign means both sides have the same value.
- Illustration / model / interaction: Two vertically stacked equalities shown _sequentially_, not two sibling Resource blocks side-by-side. The internal Scene may position addend models for comparison. A separate check with 4 + □ = 9 and □ + 4 = 9 is available after the shared example.
- Learner action, observations and explanatory feedback: Learner identifies the box and proposes 7 for each. If a child treats the box as “whatever comes after equals,” show the exact original expression with the box marked; if 5 is proposed, display “5 + 5 = 10, not 12.” Reveal without penalizing and offer retry.
- Navigation and transition: Pose “How do we make sure our missing number is right?” then lead to substitution in a new equality.
- Accessibility, locale and RTL requirements: Label both expressions “first equality” and “second equality”; screen reader says “missing first addend” vs “missing second addend”; keep the mathematical reading order unaltered in RTL; avoid using placement alone as instruction.
- Proposed unlocked Note(s) at this moment: No new Note; invite recall of Note 2 with the other addend position.
- Implementation dependencies and review notes: Scene is proposed. No scored select-one Question is implied by identification of the blank.

### Section 4 — Put Your Number Back and Check

- Purpose / learning outcome: Independently find an unknown addend in a new case and verify by substitution into the _original addition_, noticing a mismatch when an incorrect candidate is tested.
- Current implementation shape: LessonSection_Config. No required Quiz_Config and no validated Question object.
- Ordered content blocks (top to bottom):
  1. **markdown — available now:** “A new equality: **□ + 6 = 14**. The whole is 14. One part is 6. What is the other part? You can count counters or subtract. Then put your number in the box and check the addition.”
  2. **scene — generic scene renderer available; custom Scene proposed:** [Addition Equality Verifier](./scenes/additionEqualityVerifier.scene-spec.md), independent-check placement: offer candidate values **7 / 8 / 9** with optional “Show the parts,” compute the resulting sum transparently, and compare it to 14. The child can reset or request the full explanation.
  3. **markdown — available now:** After the attempt: “The missing part is **14 − 6 = 8**. Check in the original equality: **8 + 6 = 14**. Both sides are 14, so the missing number fits. If they are different, we need to try again.” Optional transfer “4 + □ = 9” uses 9 − 4 = 5 and check 4 + 5 = 9.
- Core explanation and learner-facing text: The inverse subtraction **proposes** the missing value; inserting the value back into the exact original equality **verifies** it. A correct subtraction alone is not the required substitution check.
- Illustration / model / interaction: First show the unknown with no visible hint, then use a 14-counter whole and six known counters on demand. A numeric comparison of “left side” and “right side” makes the verification objective.
- Learner action, observations and explanatory feedback: 7 → “7 + 6 = 13, but the whole should be 14.” 9 → “9 + 6 = 15, which is one more than 14.” 8 → “8 + 6 = 14. Both sides are the same.” Show “14 − 6 = 8” after a hint or reveal, not as an unexplained grading key. An intentional misconception contrast can say “5 + 17 = 22, not 12,” so **adding** known five and whole twelve cannot solve 5 + □ = 12.
- Navigation and transition: End with an optional prompt “Tell how you found the missing part and how you checked it.” Speaking is optional; the learner may select a reasoning sentence, type, or simply inspect the full explanation. No performance score, reward, forced retry or future-program dependency.
- Accessibility, locale and RTL requirements: Numeric candidates and substituted equality are screen-reader accessible; all state changes announced in text, with clear keyboard focus, touch-friendly targets and RTL-safe equations. No drag-only or compulsory speech input.
- Proposed unlocked Note(s) at this moment: Note 3 “Check the missing part in the original addition.” Proposed after at least one complete checked substitution is _shown and explained_, regardless of whether the child guessed correctly.
- Implementation dependencies and review notes: The Scene is an instructional interaction, not an Assessment Architect-reviewed Quiz. Math examples are editorial prompts; assessment thresholds and question validity remain separate.

## CUSTOM SCENE SPECIFICATIONS

- [Part–Whole Workbench](./scenes/partWholeWorkbench.scene-spec.md): self-contained Scene for Sections 1–2; observation and guided-subtraction placements, different initial states, no public React props assumed.
- [Addition Equality Verifier](./scenes/additionEqualityVerifier.scene-spec.md): self-contained Scene for Sections 3–4; position-comparison and independent-substitution placements, no invented scoring APIs.

Both are **proposed** and have separate Draft scene specifications. The generic scene resource exists; these Scene components have not been implemented.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. **Note 1: “A sum is a whole made from parts.”** Proposed reveal after the twelve-counter model has been assembled as five plus seven in Section 1.
2. **Note 2: “Whole − known part = missing part.”** Proposed reveal after Section 2 explicitly connects 12 − 5 = 7 and 5 + 7 = 12.
3. **Note 3: “Check the missing part in the original addition.”** Proposed reveal after Section 4 displays and explains a checked substitution.

All Notes are **planned, not wired**: no real Note type, unlock event, personal persistence, automatic revision sheet or spaced-review scheduler is assumed. If later implemented, an individual learner's review sheet contains only that learner's unlocked cues in pedagogical order. An unlocked Note is not evidence of Skill mastery.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

- **Concept-building:** In Sections 1–2, count parts of a whole, separate the known group, and restore it; explain the two operations' relationship.
- **Varied presentation:** Section 3 moves the box to the first addend; optional 4 + □ = 9 and □ + 4 = 9 cases distinguish position from mathematical role.
- **Independent transfer:** In Section 4, □ + 6 = 14 is followed by explicit substitution and comparison. Help and full explanation remain available regardless of the learner's answer.
- **Assessment Architect:** Decide whether a formal Quiz should be created, separately validate any items, correct/incorrect alternatives, actual Skill attribution, success thresholds, retries and mastery evidence. None of the Scene interactions are scored. The observed Lesson adapter currently supports select-one-answer only despite more QuestionType labels in contracts.
- **Retrieval:** Revisit the same part/whole relation with varied numbers and opposite box placement later if a separate review system is authorized; no automatic spaced repetition exists here.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

The canonical script is in English for specialist review; **all** learner-visible strings, counts, labels, state announcements, accessible names, feedback and Notes must have genuine supported-language translations before production. No locale is silently omitted or replaced by an English copy. Terminology: translate “addend,” “sum,” “part,” “whole,” “equals,” and “missing” accurately, using child-friendly explanation before formal terms. Equation order and mathematical meaning must remain correct under LTR and RTL; do not mirror operand positions geometrically without considering the equality. Every counter representation has an equivalent structured text list (“whole 12, known 5, missing 7”) and arithmetic statement. Use large controls, keyboard focus, nonvisual output, speech-independent choices, high contrast, reduced-motion state transitions and alternatives for dyscalculia. Do not infer a diagnosis from activity.

**Offline and low device:** after downloading the required package, selected locale, text, scene code and assets, all reasoning and feedback must be available offline. A simple HTML/SVG counter model and deterministic addition/subtraction are sufficient; no online evaluator, AI, WebGL, streaming audio or video dependency. The fallback access mode must preserve the entire mathematical relationship, not silently remove the manipulation or checking.

**Renderer verification:** Existing general Section resources support text, markdown and scene. Image/audio/video/code exist in types but not the current generic renderer; youtube is a label without a supported config. None are required. Lesson Sections keep a vertical ordered block column; scenes may organize internal model panels.

## PRODUCTION / PLATFORM DEPENDENCIES

| Item                                                                             | Status                                                 | Owner / action                                                                                         |
| -------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| LessonSection_Config, text, markdown, scene resource types and generic rendering | Verified in current code                               | Coding Agent assembles reviewed localized resources after editorial approval                           |
| Part–Whole Workbench and Addition Equality Verifier                              | Proposed Scenes; not implemented                       | Scene Designer builds prop-free components with unit tests from approved specs                         |
| Scene placement-specific initial state and per-Scene localization                | Integration review required                            | Coding Agent chooses safe separate entries; no invented mode props or runtime fields                   |
| Optional reflection / KnowledgeCheckpoint                                        | Existing widget through wrapper Scene; unscored        | Not necessary; embedded Scene explanations suffice                                                     |
| Quiz_Config and broader QuestionType values                                      | Typed / partially integrated                           | Assessment Architect owns any future scored work; only select-one integrated in current Lesson adapter |
| Image/audio/video/code general blocks                                            | Typed-only in current generic renderer                 | Not needed here                                                                                        |
| YouTube                                                                          | Label only, not supported by generic Resource_Config   | Not used                                                                                               |
| Lesson Notes, offline download/sync, spaced review                               | Product requirements/planned; not verified implemented | Separate future engineering work; no fabricated API                                                    |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md): canonical scope, age group, prerequisite knowledge, mathematical examples and one target Skill.
- [Generated English Skill taxonomy](../../../../docs/generated/skills/taxonomy.en.md): canonical methodological definition of finding an unknown addend; Skill source link is in the Brief.
- [Create Lesson Content workflow](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md): role boundaries, Source/Resource/Section contracts, Scene specification handoff.
- [Common Core mathematics reference](https://corestandards.org/mathematics-standards/) and [IES/WWC Elementary Mathematics Intervention](https://ies.ed.gov/ncee/wwc/PracticeGuide/26): references already identified by the Methodologist; comparison/instructional rationale only, not asserted national Curriculum approval.
- **Methodologist metadata:** editor verbally approved these five Briefs for workflow testing, while on-disk status is still Draft. Keep the Methodologist-owned file unchanged; synchronize approval status through a separate explicitly authorized editorial update before publication.
- **Editorial review:** Verify the initial total ≤20, chosen counter model and movement from second to first addend; confirm no mandatory Quiz is desired.
- **Engineering review:** Confirm isolated prop-free Scene placements, correct locale selection and fully accessible/offline model implementation.

## HANDOFF

This Draft specifies an ordered four-Section experience and two independent Draft Scene specs in the already existing findingUnknownAddend Lesson directory. Once the editor approves Content and each Scene spec, the Scene Designer can implement the scenes, Coding Agent can assemble localized typed resources, and Assessment Architect can independently propose valid graded evidence if required. **Stop at documents; do not change Briefs, Skill Code, existing Scenes, other Lessons or implementation.**
