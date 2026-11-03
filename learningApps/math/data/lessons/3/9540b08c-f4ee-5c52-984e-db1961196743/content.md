# Which Collection Has More? — Content

Status: **Provisional Draft — pending Methodologist Brief approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/compareCollectionsByCounting/`
Primary audience: Grade 1 — Grade 1 learners who can count to at least ten. Uses small familiar objects and short spoken/written descriptions. The same mathematical judgments must be accessible when pictures are not visible.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft, not approved**)
Target Skills: exactly those canonical `*.data.ts` links in the Brief; do not duplicate or rewrite them here
Program dependence: None
Runtime Lesson status: Not implemented

## INSTRUCTIONAL CONCEPT

Make judgments of more, fewer and equally many from set cardinality rather than object appearance. Matching two sets one-to-one supplies concrete evidence; counted totals offer an independent cross-check. The experience deliberately connects an observable cause to a numerical conclusion. Short prompts trigger learner prediction; interactive evidence corrects reasoning in a non-punitive way, followed by a simple verbal rule and an independent changed-context attempt.

For finite collections A and B, pairing each item of A with one distinct item of B establishes cardinality comparison. If A has unmatched items after B is fully paired, A has more and B fewer; if neither has unmatched items, their numbers are equal. Physical area, item size, color, orientation and spacing do not change cardinality. Counts 5 and 3 imply five has two more than three, but the 'difference' is only a concrete count of leftovers here, not formal subtraction or a numerical sign. Comparing an empty set is possible; not essential to this learning unit.

## LEARNER JOURNEY

1. **Investigate with concrete objects.** The learner meets a small, comprehensible situation and changes it with Pairing Bridge; the output makes the relevant mathematical invariant visible. This Scene includes two stages with a deliberate contrast or boundary case.
2. **Explain, predict and retrieve.** A short supported text/Markdown Section contrasts a tempting wrong rule with the correct one and asks for a reason before displaying a worked explanation. No automatic assessment is implied.
3. **Transfer without the original picture.** Appearance Versus Amount presents different objects/representations and an unfamiliar challenge. The learner can explore, retry and inspect a full causal explanation without score or irreversible failure.

## SECTION PLAN

### Section 1 — Pairing Bridge

- **Purpose and learner outcome:** Link members of two finite collections one-to-one; inspect both sides and leftovers. Pairing rather than guessing is the learning action.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “There are four circles and three squares. Can each square get its own circle?”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Pairing Bridge](./scenes/pairingBridge.scene-spec.md). Beat 1: Learner pairs each square with a different circle, then reveals unmatched circle. Can also choose 'Pair next' for accessible sequential matching. Beat 2: Reset to five squares and five circles, which are displayed with different spatial spread. Learner completes all five pairings.
  3. **`markdown` — currently renderable:** “4 vs 3: A has one more item, B one fewer. 5 vs 5 are equally many even if one row is longer.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “There are four circles and three squares. Can each square get its own circle?” The learner learner pairs each square with a different circle, then reveals unmatched circle. Can also choose 'Pair next' for accessible sequential matching. **Expected observation:** Three pairs formed, one unmatched circle; A has 4, B has 3. **If reasoning is inaccurate:** If 'same number' selected, show 3 pairs plus 1 unpaired circle; do not rely on red/green marks. **Exact result:** 4 vs 3: A has one more item, B one fewer.
  - Beat 2: “Now match five squares to five circles. Does one set have more?” The learner reset to five squares and five circles, which are displayed with different spatial spread. Learner completes all five pairings. **Expected observation:** Five pairs, zero unpaired on either side. **If reasoning is inaccurate:** If a widely spread row appears 'bigger', show five paired labels on both sides and the number five for both. **Exact result:** 5 vs 5 are equally many even if one row is longer.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** Pair ledger enumerates 'Pair 1 A-circle1 → B-square1'; unmatched items are listed by name, not color. Each pairing achievable with native focusable choices and a sequential option. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Pairing Bridge component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

### Section 2 — Does 'bigger-looking' mean 'more'?

- **Purpose and learner outcome:** Recover the relationship from memory and distinguish it from a plausible mistaken shortcut.
- **Section contract:** `LessonSection_Config`, one vertically ordered column.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “A long row of five dots is next to a short row of five dots. Can they be equally many?”
  2. **`markdown` — currently renderable:** “Yes. Count or match the dots one by one: five pairs form and none is left over. Spacing changes how long a row looks; the number of items remains five. Likewise, if one set has one unmatched item after pairing, it has more items.”
  3. **`text` — currently renderable:** “Now explain the rule using a new example, not just the picture you saw.”
- **Worked response / model:** Both sets can contain five dots even when one row looks longer. When comparing 'A has more than B', exchanging A and B changes the sentence to 'B has fewer than A'. Equal amounts remain equal both ways.
- **Action and feedback:** Learner is invited to predict or explain before reading the visible explanation (or hide the text with an accessible native disclosure in a later authorized implementation). This is **unscored reflection**, not an implemented interactive self-check; the explanatory text remains accessible and no Question or scored checkpoint is invented.
- **Navigation / rationale:** A misconception is challenged explicitly; the next Scene changes representation so the learner must use the rule rather than repeat previous clicks.
- **Accessibility:** Text-first explanation is equivalent nonvisual content. Any future hide/reveal affordance must work with keyboard and announce expanded state, but is not assumed implemented.

### Section 3 — Appearance Versus Amount

- **Purpose and learner outcome:** Discover why size and spread can deceive, then choose a justified comparison in a novel context.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “There are three BIG books and five tiny counters. Which group has more objects?”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Appearance Versus Amount](./scenes/appearanceVsAmount.scene-spec.md). Beat 1: Learner first predicts based on scene, then chooses count each or build pairings. Counts update without altering size. Beat 2: Independent transfer: change object identity and spacing; learner counts or pairs and explains the observed relation, with optional explanation reveal.
  3. **`markdown` — currently renderable:** “5 counters are more numerous than 3 books. 8 pencils exceed 6 erasers by two objects, regardless of row length.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “There are three BIG books and five tiny counters. Which group has more objects?” The learner learner first predicts based on scene, then chooses count each or build pairings. Counts update without altering size. **Expected observation:** Books = 3, counters = 5; counters have more objects despite smaller visible size. **If reasoning is inaccurate:** If 'books have more', say 'The books look larger, but there are only three of them. Count five separate counters.' **Exact result:** 5 counters are more numerous than 3 books.
  - Beat 2: “Eight pencils are bunched together; six erasers are spread out. Which group has more?” The learner independent transfer: change object identity and spacing; learner counts or pairs and explains the observed relation, with optional explanation reveal. **Expected observation:** 8 pencils vs 6 erasers, two pencils unpaired when six pairs formed. **If reasoning is inaccurate:** If erasers chosen because their row is longer, show 6 matched pairs plus 2 unmatched pencils. **Exact result:** 8 pencils exceed 6 erasers by two objects, regardless of row length.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** Nonvisual version lists objects and sizes explicitly but does not reveal counts until the learner requests a count; count and pairing ledger then exposes all evidence. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Appearance Versus Amount component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

## CUSTOM SCENE SPECIFICATIONS

- [Pairing Bridge](./scenes/pairingBridge.scene-spec.md) — concrete exploratory model and boundary contrast, independent prop-free Scene.
- [Appearance Versus Amount](./scenes/appearanceVsAmount.scene-spec.md) — independently initialized transfer model, distinct interaction with separate prop-free Scene.

Both are **proposed** components. Current generic `scene` Resource support does not mean that either specific Scene exists in runtime. There is no `sceneMode` prop, fake Resource metadata or fabricated event contract.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- **Section 1, after completing full matching:** “An unmatched item tells which set has more.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.
- **Section 3, after the visual-size trap:** “Size and spacing do not change how many objects there are.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.

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
| Bespoke Pairing Bridge and Appearance Versus Amount          | **Proposed**; only Screenwriter scene specs exist | Editor approves specs, then Scene Designer implements and tests |
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
