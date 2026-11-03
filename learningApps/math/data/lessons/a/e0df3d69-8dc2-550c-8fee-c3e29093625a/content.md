# Putting Numbers in Order to Twenty — Content

Status: **Provisional Draft — pending Methodologist Brief approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/orderNumbersWithinTwenty/`
Primary audience: Grade 1 — Grade 1 after basic forward/backward counting within 20, reading numerals 0–20 and comparing quantities. Reading prompts are short; manipulable cards have accessible keyboard alternatives.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft, not approved**)
Target Skills: exactly those canonical `*.data.ts` links in the Brief; do not duplicate or rewrite them here
Program dependence: None
Runtime Lesson status: Not implemented

## INSTRUCTIONAL CONCEPT

Use numerical magnitude to arrange numbers from 0 to 20 in increasing or decreasing order, including repeated equal values. An ordered arrangement is a relationship among numbers, not a decorative spatial pattern. The experience deliberately connects an observable cause to a numerical conclusion. Short prompts trigger learner prediction; interactive evidence corrects reasoning in a non-punitive way, followed by a simple verbal rule and an independent changed-context attempt.

For ascending (nondecreasing) order, each adjacent value must be at least the one before it; equality is permitted. For descending (nonincreasing) order, each adjacent value must be no greater than the one before it. Examples: [4,6,9] ascending; [3,8,8,10] ascending; [20,19,12,0] descending. For ordered cards [5,7,6], placing 6 before 7 corrects the ascent. Within 0–20, 0 is the least and 20 the greatest; the lesson does not teach inequalities `<`/`>` or numeric place-value algorithms.

## LEARNER JOURNEY

1. **Investigate with concrete objects.** The learner meets a small, comprehensible situation and changes it with Number Card Organizer; the output makes the relevant mathematical invariant visible. This Scene includes two stages with a deliberate contrast or boundary case.
2. **Explain, predict and retrieve.** A short supported text/Markdown Section contrasts a tempting wrong rule with the correct one and asks for a reason before displaying a worked explanation. No automatic assessment is implied.
3. **Transfer without the original picture.** Reverse and Repair presents different objects/representations and an unfamiliar challenge. The learner can explore, retry and inspect a full causal explanation without score or irreversible failure.

## SECTION PLAN

### Section 1 — Number Card Organizer

- **Purpose and learner outcome:** Sorting demands that the learner justify the order of neighboring values, not simply match an ornamental row.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “Put 9, 4 and 6 from smallest to largest.”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Number Card Organizer](./scenes/orderCards.scene-spec.md). Beat 1: Learner selects a card then an ordered slot, or uses Move earlier/later controls. After each placement, offer a visual quantity helper for the selected number. Beat 2: New deck 8, 3, 10, 8; learner orders all cards without discarding either 8 and sees a narrated adjacent-pair check.
  3. **`markdown` — currently renderable:** “4, 6, 9 in nondecreasing order. 3, 8, 8, 10; 8 followed by 8 is acceptable.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “Put 9, 4 and 6 from smallest to largest.” The learner learner selects a card then an ordered slot, or uses Move earlier/later controls. After each placement, offer a visual quantity helper for the selected number. **Expected observation:** Correct ascending arrangement 4, 6, 9. **If reasoning is inaccurate:** If 9 is placed before 4, show that nine objects outnumber four; the smallest starts first. **Exact result:** 4, 6, 9 in nondecreasing order.
  - Beat 2: “Two cards both say 8. Can the row still be sorted?” The learner new deck 8, 3, 10, 8; learner orders all cards without discarding either 8 and sees a narrated adjacent-pair check. **Expected observation:** Correct 3, 8, 8, 10. The equal adjacent pair is valid. **If reasoning is inaccurate:** If one 8 is omitted, explain each card remains present and equal numbers can stand together; a valid sort retains both. **Exact result:** 3, 8, 8, 10; 8 followed by 8 is acceptable.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** Use native choose-card and choose-slot controls, with an ordered voice/text ledger; sorting direction is announced ('smallest first') and position names are semantic, not physical. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Number Card Organizer component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

### Section 2 — Order is a rule, not a shape

- **Purpose and learner outcome:** Recover the relationship from memory and distinguish it from a plausible mistaken shortcut.
- **Section contract:** `LessonSection_Config`, one vertically ordered column.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “Would a row 3, 8, 8, 10 be correctly ordered from smallest to largest even with the repeated 8?”
  2. **`markdown` — currently renderable:** “Yes. Each next number is either the same or greater: three, eight, eight, ten. The second eight doesn't make the numbers go backward. Descending order reverses the comparison, not the number of cards.”
  3. **`text` — currently renderable:** “Now explain the rule using a new example, not just the picture you saw.”
- **Worked response / model:** 3, 8, 8, 10 is a valid ascending order. 4, 9, 6 is not ascending, because 9 is followed by the smaller 6. Move 6 between 4 and 9 to repair it.
- **Action and feedback:** Learner is invited to predict or explain before reading the visible explanation (or hide the text with an accessible native disclosure in a later authorized implementation). This is **unscored reflection**, not an implemented interactive self-check; the explanatory text remains accessible and no Question or scored checkpoint is invented.
- **Navigation / rationale:** A misconception is challenged explicitly; the next Scene changes representation so the learner must use the rule rather than repeat previous clicks.
- **Accessibility:** Text-first explanation is equivalent nonvisual content. Any future hide/reveal affordance must work with keyboard and announce expanded state, but is not assumed implemented.

### Section 3 — Reverse and Repair

- **Purpose and learner outcome:** Change ordering direction and diagnose an error independently; this is transfer from arranging to reasoning about ordering.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “Arrange 12, 20, 0 and 19 from largest to smallest.”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Reverse and Repair](./scenes/reverseAndRepair.scene-spec.md). Beat 1: Learner builds a descending row via numbered slots and can reveal one adjacent comparison at a time. Beat 2: Learner inspects adjacent pairs and moves only the offending card(s), then explains why 5 precedes 11.
  3. **`markdown` — currently renderable:** “20, 19, 12, 0. 2, 5, 11, 17; 11 then 5 is a descending step, not ascending.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “Arrange 12, 20, 0 and 19 from largest to smallest.” The learner learner builds a descending row via numbered slots and can reveal one adjacent comparison at a time. **Expected observation:** Correct descending 20, 19, 12, 0. **If reasoning is inaccurate:** If 0 is first, use the number-quantity model to show none is the smallest value in this set, so it belongs last in descending order. **Exact result:** 20, 19, 12, 0.
  - Beat 2: “Is this row truly smallest-to-largest: 2, 11, 5, 17?” The learner learner inspects adjacent pairs and moves only the offending card(s), then explains why 5 precedes 11. **Expected observation:** Repaired ascending sequence 2, 5, 11, 17. **If reasoning is inaccurate:** If learner accepts original, show that 11 followed by 5 goes down, violating the requested direction; one reversal corrects the pair. **Exact result:** 2, 5, 11, 17; 11 then 5 is a descending step, not ascending.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** The order is an explicit semantic ordered list and never encoded by left-to-right layout alone. RTL can reposition the tray without changing sequence indices or numeral meaning. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Reverse and Repair component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

## CUSTOM SCENE SPECIFICATIONS

- [Number Card Organizer](./scenes/orderCards.scene-spec.md) — concrete exploratory model and boundary contrast, independent prop-free Scene.
- [Reverse and Repair](./scenes/reverseAndRepair.scene-spec.md) — independently initialized transfer model, distinct interaction with separate prop-free Scene.

Both are **proposed** components. Current generic `scene` Resource support does not mean that either specific Scene exists in runtime. There is no `sceneMode` prop, fake Resource metadata or fabricated event contract.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- **Section 1 after a three-card sort:** “From smallest to largest, each next number is not smaller.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.
- **Section 3 after the duplicate test:** “Equal numbers can stand next to each other in order.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.

Notes are proposed concise recall anchors, not full Lesson summaries. The architecture has **no verified implemented Note type, unlock event, storage, synchronization or spaced-review sheet**; future development must specify stable identity and ordering separately.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 1 supplies coached formative reasoning; Section 2 supports retrieval with worked explanation; Section 3 tests applicability by changing the setting. Correct selections alone do not constitute independent mastery. If an Assessment Architect later adds graded Questions, that role owns validity, scoring and retries; none are authored here. Future spaced retrieval is an editorial opportunity, **not** an implemented scheduler.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every prompt, alternative text, digit/number word, Scene state, feedback, Focus label, Note and any spoken support must be genuinely translated into every currently supported locale using the project's Engine language definitions. Text in this file is English source editorial copy **not** 27/other locale production resources. No silent English fallback. Number strings retain logical order; comparisons, count sequence and place-value column semantics must survive semantic RTL. WCAG 2.2 AA plan includes keyboard/switch/touch parity, nonvisual ordered state ledger, visible focus, appropriate contrast/targets, no precision drag, no color-only or sound-only information, 200% zoom, reduced motion and small-screen equivalence. Mathematical explanations must be fully available on a low-end downloaded offline package; current PWA completion is **not claimed**.

## PRODUCTION / PLATFORM DEPENDENCIES

| Item                                                         | Actual status                                     | Owner / next step                                               |
| ------------------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------- |
| General `LessonSection_Config` with ordered Resource list    | Existing Code contract                            | Coding Agent assembles Lesson only after approvals              |
| Generic `text`, `markdown`, `scene` Resource rendering       | Existing Playground renderer                      | Coding Agent verifies current implementation                    |
| Bespoke Number Card Organizer and Reverse and Repair         | **Proposed**; only Screenwriter scene specs exist | Editor approves specs, then Scene Designer implements and tests |
| Locales / screen readers / semantic RTL / media alternatives | Design requirements; not delivered here           | Localization and QA must verify                                 |
| Fully downloaded offline experience                          | Required target; not established by these docs    | App/PWA integration and airplane-mode tests                     |
| Notes and persistence                                        | Planned only, no verified Note runtime            | Separate future architectural approval                          |
| Questions, Quizzes, scoring, mastery                         | **Not authored**                                  | Assessment Architect owns separate stage                        |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) (including exact Skill source links and numerical boundaries).
- [Studio Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md) and [Section entity](../../../../../../studio/docs/entities/section.md).
- Specific unresolved approvals: selected grade and outcomes, Scene spec feasibility, complete locale coverage, and accessible/offline equivalence.

## HANDOFF

**Provisional Screenwriter Draft, explicitly not approved.** Editor first reviews the Draft Brief, then Content and each Scene spec. Implementers must not infer code readiness, registered Skills, Question/Quiz data, Note events, locale completion or approval from these documents.
