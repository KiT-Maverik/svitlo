# One Ten, Many Ones: Building Two-Digit Numbers — Content

Status: **Provisional Draft — pending Methodologist Brief approval**
Target Lesson: `learningApps/playground/Data/Lessons/1/buildNumbersWithTensAndOnes/`
Primary audience: Grade 2 — Grade 2 learners ready to group quantities and reason about two-digit representations. Children may recognize numbers to 20 but need explicit support for reading new two-digit numerals through 49, so names and written labels are introduced alongside physical bundles.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (**Draft, not approved**)
Target Skills: exactly those canonical `*.data.ts` links in the Brief; do not duplicate or rewrite them here
Program dependence: None
Runtime Lesson status: Not implemented

## INSTRUCTIONAL CONCEPT

Understand ten ones as one ten and use equal-value exchanges to build and interpret two-digit numbers by their tens and remaining ones. The same quantity can be shown with objects, bundles, and a numeral. The experience deliberately connects an observable cause to a numerical conclusion. Short prompts trigger learner prediction; interactive evidence corrects reasoning in a non-punitive way, followed by a simple verbal rule and an independent changed-context attempt.

In decimal notation a ten is equivalent to exactly ten ones. For a two-digit number n=10t+u with t from 1 to 9 and remaining ones u from 0 to 9, `t` is the tens count and `u` the ones count in its usual representation. Ten ones may be bundled into one ten, or one ten unbundled into ten ones, preserving total. 2 tens + 6 ones = 26, while 3 tens + 2 ones = 32. 27 can be modeled as 2 tens and 7 ones, or temporarily as 1 ten and 17 loose ones; the latter is a nonstandard unpacked representation rather than the ordinary two-digit tens/ones form. This lesson begins with totals 10–20 and extends via bundles to 21–49 with all intermediate language scaffolded. No multi-digit carrying algorithm or full hundreds system is assumed.

## LEARNER JOURNEY

1. **Investigate with concrete objects.** The learner meets a small, comprehensible situation and changes it with Bundle Exchange Workbench; the output makes the relevant mathematical invariant visible. This Scene includes two stages with a deliberate contrast or boundary case.
2. **Explain, predict and retrieve.** A short supported text/Markdown Section contrasts a tempting wrong rule with the correct one and asks for a reason before displaying a worked explanation. No automatic assessment is implied.
3. **Transfer without the original picture.** Two-Digit Number Builder presents different objects/representations and an unfamiliar challenge. The learner can explore, retry and inspect a full causal explanation without score or irreversible failure.

## SECTION PLAN

### Section 1 — Bundle Exchange Workbench

- **Purpose and learner outcome:** The critical invariant is visible: ten separate sticks and one labelled bundle represent the same ten objects.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “There are ten loose sticks. Can you turn exactly ten into one bundle?”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Bundle Exchange Workbench](./scenes/bundleExchange.scene-spec.md). Beat 1: Select all ten loose sticks (or use accessible 'Select ten' control) and activate Bundle; show a band around exactly ten, then show ten still counted inside when expanded. Beat 2: Unbundle the group of ten while leaving the seven loose ones; reveal 17 loose pieces, then bundle ten again.
  3. **`markdown` — currently renderable:** “Ten objects before, ten objects after; regrouping changes organization only. Both layouts show seventeen objects; only standard packing has 1 ten and 7 remaining ones.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “There are ten loose sticks. Can you turn exactly ten into one bundle?” The learner select all ten loose sticks (or use accessible 'Select ten' control) and activate Bundle; show a band around exactly ten, then show ten still counted inside when expanded. **Expected observation:** 10 loose ones → 1 ten-bundle + 0 loose ones; total unchanged at 10. **If reasoning is inaccurate:** If the learner thinks one bundle equals one stick, open the bundle to show ten original members and reconcile the item ledger. **Exact result:** Ten objects before, ten objects after; regrouping changes organization only.
  - Beat 2: “Here are one ten-bundle and seven loose sticks. What if you unbundle the ten?” The learner unbundle the group of ten while leaving the seven loose ones; reveal 17 loose pieces, then bundle ten again. **Expected observation:** 1 ten + 7 ones = 17; 0 tens + 17 loose ones = 17; return to 1 ten + 7 ones. **If reasoning is inaccurate:** If total 7 is predicted after unbundling, count all ten released pieces plus seven others; nothing disappeared. **Exact result:** Both layouts show seventeen objects; only standard packing has 1 ten and 7 remaining ones.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** Bundle is an accessible group named 'ten sticks'; when unpacked, the ledger enumerates the same ten stable items. Cannot bundle nine or fewer and cannot double-count a bundled stick. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Bundle Exchange Workbench component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

### Section 2 — What changed when we packed ten?

- **Purpose and learner outcome:** Recover the relationship from memory and distinguish it from a plausible mistaken shortcut.
- **Section contract:** `LessonSection_Config`, one vertically ordered column.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “If you put a band around ten sticks, do you have fewer sticks than before?”
  2. **`markdown` — currently renderable:** “No. The bundle has the same ten sticks inside. Replacing ten loose ones with one ten-bundle changes their grouping, not their total. With two tens and three loose ones, there are twenty-three sticks; with three tens and two loose ones, there are thirty-two.”
  3. **`text` — currently renderable:** “Now explain the rule using a new example, not just the picture you saw.”
- **Worked response / model:** There are still ten sticks inside a ten-bundle. 'One ten and seventeen loose ones' still makes twenty-seven, but standard tens/ones notation regroups ten loose ones into another ten: two tens and seven ones.
- **Action and feedback:** Learner is invited to predict or explain before reading the visible explanation (or hide the text with an accessible native disclosure in a later authorized implementation). This is **unscored reflection**, not an implemented interactive self-check; the explanatory text remains accessible and no Question or scored checkpoint is invented.
- **Navigation / rationale:** A misconception is challenged explicitly; the next Scene changes representation so the learner must use the rule rather than repeat previous clicks.
- **Accessibility:** Text-first explanation is equivalent nonvisual content. Any future hide/reveal affordance must work with keyboard and announce expanded state, but is not assumed implemented.

### Section 3 — Two-Digit Number Builder

- **Purpose and learner outcome:** Learner constructs numerals from groups and detects digit reversal as a real magnitude change.
- **Section contract:** `LessonSection_Config` with **one vertically ordered** nonempty Resource list. This is not a `Quiz_Config`.
- **Ordered content blocks:**
  1. **`text` — currently renderable:** “Build the number 26 using bundles and loose sticks.”
  2. **`scene` — typed/generic renderer exists, new Scene implementation proposed:** [Two-Digit Number Builder](./scenes/placeValueBuilder.scene-spec.md). Beat 1: Place two ten-bundles and six loose units in labelled Tens/Ones containers, then select numeral 26; read as twenty-six with a language-specific voice/text alternative. Beat 2: Side-by-side inside this single Scene compare 23 and 32 with complete item/group ledger; change bundle counts rather than merely rearrange digit glyphs. Beat 3: Select ten of seventeen loose sticks, bundle them, observe two ten-bundles and seven loose units. Beat 4: Independent transfer: build four bundles and three loose units, identify 43, then explain why 34 is not equivalent.
  3. **`markdown` — currently renderable:** “Two tens plus six ones equals 26. 23 and 32 are different quantities; 32 has more. 27 is 2 tens and 7 ones in canonical tens/ones form. Four tens and three ones is 43.”
- **Learner actions and explanatory feedback:**
  - Beat 1: “Build the number 26 using bundles and loose sticks.” The learner place two ten-bundles and six loose units in labelled Tens/Ones containers, then select numeral 26; read as twenty-six with a language-specific voice/text alternative. **Expected observation:** 2 tens and 6 ones -> 26; 20+6=26 used only as a supported explanation, not as an unscored addition drill. **If reasoning is inaccurate:** For 62, show that 6 is loose ones while 2 is ten-bundles; swapping them changes the total from 26 to 62. **Exact result:** Two tens plus six ones equals 26.
  - Beat 2: “A model has two tens and three ones. Another has three tens and two ones. Are the amounts equal?” The learner side-by-side inside this single Scene compare 23 and 32 with complete item/group ledger; change bundle counts rather than merely rearrange digit glyphs. **Expected observation:** 23 = 2 tens + 3 ones; 32 = 3 tens + 2 ones; difference is nine items. **If reasoning is inaccurate:** If equal, expand bundles and demonstrate 23 is not the same quantity as 32. Do not require a subtraction computation. **Exact result:** 23 and 32 are different quantities; 32 has more.
  - Beat 3: “You have one ten and seventeen loose sticks. Can you repack to show 27 normally?” The learner select ten of seventeen loose sticks, bundle them, observe two ten-bundles and seven loose units. **Expected observation:** 1 ten +17 loose ones = 2 tens +7 ones =27; preserve 27 original object identities. **If reasoning is inaccurate:** If 117 is proposed as numeral, explain 'one ten and seventeen loose ones' is an unpacked model and counting all objects gives 27; standard placement shows two tens and seven ones. **Exact result:** 27 is 2 tens and 7 ones in canonical tens/ones form.
  - Beat 4: “Without a worked example beside it, model forty-three.” The learner independent transfer: build four bundles and three loose units, identify 43, then explain why 34 is not equivalent. **Expected observation:** 4 tens +3 ones =43, distinct from 3 tens+4 ones =34. **If reasoning is inaccurate:** If 34 selected, compare the tens column: it has three bundles, but the model shows four. **Exact result:** Four tens and three ones is 43.
- **Visible explanation and reason to continue:** The child can reveal the fully worked model rather than submit a forced guess. Ask the learner to say or select what changed and what remained invariant before continuing.
- **Accessibility / RTL / locale:** Explicit role labels 'Tens' and 'Ones', numeric counts and text ledger; semantic CSS layout for RTL with digit sequence and value retained. Accessible button alternatives rather than drag-only placement. Localized control names, keyboard/touch/switch focus order, reduced-motion instantaneous transitions and identical nonvisual numeric evidence are necessary.
- **Implementation dependency:** Entire new Two-Digit Number Builder component is **proposed**, prop-free and unimplemented. Its scenario data belongs inside the Scene, not an invented Resource prop. No Question bank, score, mastery event or Note API.

## CUSTOM SCENE SPECIFICATIONS

- [Bundle Exchange Workbench](./scenes/bundleExchange.scene-spec.md) — concrete exploratory model and boundary contrast, independent prop-free Scene.
- [Two-Digit Number Builder](./scenes/placeValueBuilder.scene-spec.md) — independently initialized transfer model, distinct interaction with separate prop-free Scene.

Both are **proposed** components. Current generic `scene` Resource support does not mean that either specific Scene exists in runtime. There is no `sceneMode` prop, fake Resource metadata or fabricated event contract.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

- **Section 1 when ten loose pieces become one bundle:** “One ten is worth ten ones.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.
- **Section 3 when digits are compared:** “In 23, the 2 means two tens and the 3 means three ones.” — proposed after the learner has seen and explained the corresponding model, not after a correctness threshold. Exact event schema/unlock handling **not implemented**.

Notes are proposed concise recall anchors, not full Lesson summaries. The architecture has **no verified implemented Note type, unlock event, storage, synchronization or spaced-review sheet**; future development must specify stable identity and ordering separately.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 1 supplies coached formative reasoning; Section 2 supports retrieval with worked explanation; Section 3 tests applicability by changing the setting. Correct selections alone do not constitute independent mastery. If an Assessment Architect later adds graded Questions, that role owns validity, scoring and retries; none are authored here. Future spaced retrieval is an editorial opportunity, **not** an implemented scheduler.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every prompt, alternative text, digit/number word, Scene state, feedback, Focus label, Note and any spoken support must be genuinely translated into every currently supported locale using the project's Engine language definitions. Text in this file is English source editorial copy **not** 27/other locale production resources. No silent English fallback. Number strings retain logical order; comparisons, count sequence and place-value column semantics must survive semantic RTL. WCAG 2.2 AA plan includes keyboard/switch/touch parity, nonvisual ordered state ledger, visible focus, appropriate contrast/targets, no precision drag, no color-only or sound-only information, 200% zoom, reduced motion and small-screen equivalence. Mathematical explanations must be fully available on a low-end downloaded offline package; current PWA completion is **not claimed**.

## PRODUCTION / PLATFORM DEPENDENCIES

| Item                                                           | Actual status                                     | Owner / next step                                               |
| -------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| General `LessonSection_Config` with ordered Resource list      | Existing Code contract                            | Coding Agent assembles Lesson only after approvals              |
| Generic `text`, `markdown`, `scene` Resource rendering         | Existing Playground renderer                      | Coding Agent verifies current implementation                    |
| Bespoke Bundle Exchange Workbench and Two-Digit Number Builder | **Proposed**; only Screenwriter scene specs exist | Editor approves specs, then Scene Designer implements and tests |
| Locales / screen readers / semantic RTL / media alternatives   | Design requirements; not delivered here           | Localization and QA must verify                                 |
| Fully downloaded offline experience                            | Required target; not established by these docs    | App/PWA integration and airplane-mode tests                     |
| Notes and persistence                                          | Planned only, no verified Note runtime            | Separate future architectural approval                          |
| Questions, Quizzes, scoring, mastery                           | **Not authored**                                  | Assessment Architect owns separate stage                        |

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) (including exact Skill source links and numerical boundaries).
- [Studio Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md) and [Section entity](../../../../../../studio/docs/entities/section.md).
- Specific unresolved approvals: selected grade and outcomes, Scene spec feasibility, complete locale coverage, and accessible/offline equivalence.

## HANDOFF

**Provisional Screenwriter Draft, explicitly not approved.** Editor first reviews the Draft Brief, then Content and each Scene spec. Implementers must not infer code readiness, registered Skills, Question/Quiz data, Note events, locale completion or approval from these documents.
