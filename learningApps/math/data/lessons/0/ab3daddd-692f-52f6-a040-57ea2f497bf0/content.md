# A Step Back: Counting Backward to Twenty — Content

Status: **Provisional Draft — pending Methodologist Brief approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/countingBackwardWithinTwenty/`
Primary audience: Grade 1 — A child who can count forward within 20 and recognize numerals 0–20. Spoken-number supports are helpful but cannot be required. Grade 1 is suitable for concrete backward steps and crossings around ten; formal subtraction notation is optional and not taught.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft, not approved**)
Target Skills: exactly those canonical `*.data.ts` links in the Brief; do not duplicate or rewrite them here
Program dependence: None
Runtime Lesson status: Not implemented

## INSTRUCTIONAL CONCEPT

Learn that each step backward reaches the immediately preceding number, one less, from any starting value within 0–20. Seeing the actual removal or movement connects the sequence to change rather than a recited rhyme. The experience deliberately connects an observable cause to a numerical conclusion. Short prompts trigger learner prediction; interactive evidence corrects reasoning in a non-punitive way, followed by a simple verbal rule and an independent changed-context attempt.

A predecessor immediately before an integer n differs by one. For positive values n in the chosen range, removing one object from n countable objects leaves the quantity immediately preceding n. A counting sequence has no skipped step: 12, 11, 10, 9 and 3, 2, 1, 0. Only the represented range 0–20 is in scope; zero ends the displayed countdown, not necessarily all mathematics. Movement on a number strip and removal from a collection are two models of the same decrement, but an ordinal position alone is not a count of removed objects.

## LEARNER JOURNEY

1. **Investigate with concrete objects.** The learner meets a small, comprehensible situation and changes it with Countdown Objects; the output makes the relevant mathematical invariant visible. This Scene includes two stages with a deliberate contrast or boundary case.
2. **Explain, predict and retrieve.** A short supported text/Markdown Section contrasts a tempting wrong rule with the correct one and asks for a reason before displaying a worked explanation. No automatic assessment is implied.
3. **Transfer without the original picture.** Backward Path presents different objects/representations and an unfamiliar challenge. The learner can explore, retry and inspect a full causal explanation without score or irreversible failure.

## SECTION PLAN

### Section 1 — Countdown Objects

- **Purpose and learner outcome:** A countdown changes a real quantity one object at a time; the learner operates the transition rather than only clicking an answer.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “Six lights are on. Turn off one. How many stay on?”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Countdown Objects](./scenes/countdownObjects.scene-spec.md). Beat 1: Activate Step back to extinguish exactly one lit lantern and update an ordered ledger of remaining lights; predict 5 before reveal. Beat 2: Display full ten-frame plus two loose objects, remove the two loose objects in two steps, then remove one object from the ten-frame; allow next, previous-step review and reset.
  3. **`markdown` — currently renderable:** “6 lit − 1 lit = 5 lit, with five visible remaining. 12 objects: 10+2; after three distinct removals 9 remain.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “Six lights are on. Turn off one. How many stay on?” The learner activate Step back to extinguish exactly one lit lantern and update an ordered ledger of remaining lights; predict 5 before reveal. **Expected observation:** 6 → 5, five lit and one unlit; only lit items count. **If reasoning is inaccurate:** If six is selected, say: 'One light went off. Count only the five still shining.' If four, pair each of the five lit items with a count word. **Exact result:** 6 lit − 1 lit = 5 lit, with five visible remaining.
  - Beat 2: “Start at twelve. Step back three times. Which numbers do you pass?” The learner display full ten-frame plus two loose objects, remove the two loose objects in two steps, then remove one object from the ten-frame; allow next, previous-step review and reset. **Expected observation:** 12 → 11 → 10 → 9; 10-frame goes from full to nine on the third step. **If reasoning is inaccurate:** For '12 → 11 → 10 → 19', point to the full ten-frame at 10 and the nine remaining slots after one removal; do not interpret a numerical string as 19. **Exact result:** 12 objects: 10+2; after three distinct removals 9 remain.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** Ledger lists 'Step 0: 6 lit; step 1: 5 lit' and focusable controls; light status has text 'lit/unlit', no reliance on glow/color. A nonvisual item ledger makes removed objects explicit. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Countdown Objects component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

### Section 2 — What makes a step 'back'?

- **Purpose and learner outcome:** Recover the relationship from memory and distinguish it from a plausible mistaken shortcut.
- **Section contract:** `LessonSection_Config`, one vertically ordered column.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “If you are at 11 and move backward, is 12 or 10 next? Explain how you know.”
  2. **`markdown` — currently renderable:** “11 is followed backward by 10: 10 is one less, whereas 12 is one more. When a row of ten objects stays full, 11 can lose its one extra object and become 10; lose one more, and nine remain. There is no need to restart reciting from 20.”
  3. **`text` — currently renderable:** “Now explain the rule using a new example, not just the picture you saw.”
- **Worked response / model:** 10 is immediately before 11. A child may move left visually in an LTR sketch, but 'back' must mean the mathematically preceding number, not a screen direction; RTL layouts may place controls differently.
- **Action and feedback:** Learner is invited to predict or explain before reading the visible explanation (or hide the text with an accessible native disclosure in a later authorized implementation). This is **unscored reflection**, not an implemented interactive self-check; the explanatory text remains accessible and no Question or scored checkpoint is invented.
- **Navigation / rationale:** A misconception is challenged explicitly; the next Scene changes representation so the learner must use the rule rather than repeat previous clicks.
- **Accessibility:** Text-first explanation is equivalent nonvisual content. Any future hide/reveal affordance must work with keyboard and announce expanded state, but is not assumed implemented.

### Section 3 — Backward Path

- **Purpose and learner outcome:** Transfer the one-less rule to an ordered path, not another object-removal tray.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “You stand at step 8. Move back four steps. Where will you be?”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Backward Path](./scenes/backwardPath.scene-spec.md). Beat 1: Choose 'one step back' four times, with a prediction of the destination available before moving; marker follows positions 8,7,6,5,4. Beat 2: Learner selects the preceding label 16 for 17, then 10 for 11; provide a one-move marker explanation and optional full reveal.
  3. **`markdown` — currently renderable:** “Four backward moves from 8 end at 4. Immediately before 17 is 16; immediately before 11 is 10.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “You stand at step 8. Move back four steps. Where will you be?” The learner choose 'one step back' four times, with a prediction of the destination available before moving; marker follows positions 8,7,6,5,4. **Expected observation:** Marker ends at step 4; each step exactly one earlier ordinal number. **If reasoning is inaccurate:** For a predicted 5, display the ledger '8 → 7 (1), → 6 (2), → 5 (3), → 4 (4)'; count moves, not only the visited numbers. **Exact result:** Four backward moves from 8 end at 4.
  - Beat 2: “Start at 17. Find the number immediately before it. Then before 11.” The learner learner selects the preceding label 16 for 17, then 10 for 11; provide a one-move marker explanation and optional full reveal. **Expected observation:** Pred(17)=16 and Pred(11)=10, chosen independently with no restart at twenty. **If reasoning is inaccurate:** If 18 is chosen, distinguish a forward step from a backward step; if 9 is chosen after 11, show the intervening 10. **Exact result:** Immediately before 17 is 16; immediately before 11 is 10.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** Logical 0–20 position labels and step ledger read in numerical order independent of RTL visual placement. Marker position and step count always announced and visible. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Backward Path component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

## CUSTOM SCENE SPECIFICATIONS

- [Countdown Objects](./scenes/countdownObjects.scene-spec.md) — concrete exploratory model and boundary contrast, independent prop-free Scene.
- [Backward Path](./scenes/backwardPath.scene-spec.md) — independently initialized transfer model, distinct interaction with separate prop-free Scene.

Both are **proposed** components. Current generic `scene` Resource support does not mean that either specific Scene exists in runtime. There is no `sceneMode` prop, fake Resource metadata or fabricated event contract.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- **Section 1, after removal-and-ledger explanation:** “One step backward means one less.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.
- **Section 3, after crossing ten:** “After 11 comes 10, then 9, when counting backward.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.

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
| Bespoke Countdown Objects and Backward Path                  | **Proposed**; only Screenwriter scene specs exist | Editor approves specs, then Scene Designer implements and tests |
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
