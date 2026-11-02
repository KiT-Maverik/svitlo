# Multiplication with Rows and Columns — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/multiplicationArrayModel/ (Playground)
Audience: Children aged 6–8 who recognize small equal groups and can count objects in rows, up to 25
Methodologist source: [Methodologist Brief](./methodologist-brief.md) (Draft; not editor-approved)
Target Skill: The existing `arrayModel.data.ts` linked by the Brief, unchanged
Program dependence: None

## INSTRUCTIONAL CONCEPT

Establish the rectangular array as a multiplication representation with the SAME number of objects in every row, and relate row count, items per row, column count and product. An array with R equal rows and C objects in every row has R×C elements. Three rows of four = 12; two rows of five = 10; four rows of two = 8. An incomplete row with only three items invalidates the exact 3×4 rectangular model, although its objects can still be counted. Rows and columns describe mathematical structure, not directions tied to reading order.

The learner should see and control the **cause** of each total rather than infer correctness from a colored tick. Countable models, progressively lighter hints, careful contrasts and child-friendly numerical explanations do the teaching. No score, timer, Program story or mandatory Quiz.

## LEARNER JOURNEY

1. **A Grid with Three Rows:** Show a rectangular 3-by-4 dot grid with clearly named rows and columns. Reveal row counts 4,4,4 one by one.
2. **Make a Rectangle:** Choose R=2, C=5; add dots with an accessible 'Fill next row' control; show ten occupied cells and their row counts.
3. **Find the Missing Dot:** Contrast a complete 3×4 grid with a 4,3,4 ragged grid. Learner identifies an empty cell, fills it, and compares 11 versus 12 occupied positions.
4. **Read a Fresh Array:** Construct a 4-by-2 grid, let learner inspect row and column counts, select 4×2=8 or request full reveal.

## SECTION PLAN

### Section 1 — A Grid with Three Rows

- **Purpose and learner outcome:** Identify the number of rows and the number of objects in each row in a rectangular array.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “Look at 3 rows. Each row has 4 dots. How many dots are there?”
  2. **scene (generic type supported, NEW implementation proposed):** [Array Grid Studio](./scenes/arrayGridStudio.scene-spec.md), placement 1. Show a rectangular 3-by-4 dot grid with clearly named rows and columns. Reveal row counts 4,4,4 one by one.
  3. **markdown (supported):** “Three rows of four contain twelve dots. We can write 3 × 4 = 12.”
- **Learner action, meaningful observations and formative feedback:** For seven, explain that 3+4 names two measures but misses other rows; an ordered row count shows 4+4+4=12. A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Invite a prediction that motivates the next Section while retaining the mathematical model.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** “A rectangular array has the same number of items in every row.” after the model and its explanation are available (planned, not wired).
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

### Section 2 — Make a Rectangle

- **Purpose and learner outcome:** Construct and read a 3-row, 4-column array as 3 × 4 = 12, supported by an equivalent row-by-row count.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “Build a grid with 2 rows and 5 dots in every row. Is each row complete?”
  2. **scene (generic type supported, NEW implementation proposed):** [Array Grid Studio](./scenes/arrayGridStudio.scene-spec.md), placement 2. Choose R=2, C=5; add dots with an accessible 'Fill next row' control; show ten occupied cells and their row counts.
  3. **markdown (supported):** “Two complete rows of five contain 10 dots: 2 × 5 = 10. Each row needs five dots.”
- **Learner action, meaningful observations and formative feedback:** If only nine dots are filled, say 'One row has only four. One more dot is needed to make both rows equal.' A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Invite a prediction that motivates the next Section while retaining the mathematical model.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** “Rows × items in each row tells us how many items are in the array.” after the model and its explanation are available (planned, not wired).
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

### Section 3 — Find the Missing Dot

- **Purpose and learner outcome:** Explain why a ragged shape with row sizes 4,3,4 is not a complete 3 × 4 rectangular array.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “Three rows should have four dots each. One row has only three. Is the rectangle complete?”
  2. **scene (generic type supported, NEW implementation proposed):** [Array Grid Studio](./scenes/arrayGridStudio.scene-spec.md), placement 3. Contrast a complete 3×4 grid with a 4,3,4 ragged grid. Learner identifies an empty cell, fills it, and compares 11 versus 12 occupied positions.
  3. **markdown (supported):** “The incomplete grid holds eleven dots. Fill the one missing place to make three full rows of four and twelve dots.”
- **Learner action, meaningful observations and formative feedback:** A claim that the incomplete grid is 3×4 gets a row-by-row check and a visible empty slot; do not pretend it already contains twelve. A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Invite a prediction that motivates the next Section while retaining the mathematical model.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** None; revisit the previous rule for contrast.
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

### Section 4 — Read a Fresh Array

- **Purpose and learner outcome:** Inspect a 4-row, 2-column new array and determine its total.
- **Section contract:** `LessonSection_Config`, one ordered top-to-bottom resource list.
- **Ordered content blocks:**
  1. **text (supported):** “There are 4 rows with 2 dots in each. What product matches the grid?”
  2. **scene (generic type supported, NEW implementation proposed):** [Array Grid Studio](./scenes/arrayGridStudio.scene-spec.md), placement 4. Construct a 4-by-2 grid, let learner inspect row and column counts, select 4×2=8 or request full reveal.
  3. **markdown (supported):** “Four rows of two contain eight dots: 2+2+2+2=8 and 4×2=8.”
- **Learner action, meaningful observations and formative feedback:** If 4+2=6, show each row’s two dots; if 2×4=8, acknowledge equal numerical total but explain the present row-count-first reading is 4×2. A learner may ask for the full worked solution without submitting a prediction; no score or irreversible failure.
- **What remains visible:** Exact quantities, the symbolic equality (when shown), and a navigable text record of the model, including the steps that justify the total.
- **Transition:** Short optional reflection naming the mathematical relationship; end without a graded success screen.
- **Accessibility / locale / RTL:** Native focusable controls and count-by-count text equivalents; mathematical factor/row/group roles remain correct in RTL, with optional reduced-motion immediate state.
- **Proposed unlocked Note:** “Rows × items in each row tells us how many items are in the array.” after the model and its explanation are available (planned, not wired).
- **Dependencies:** Custom Scene placement is proposed; no new Question type, score event or public React mode prop is authorized.

## CUSTOM SCENE SPECIFICATIONS

- [Array Grid Studio](./scenes/arrayGridStudio.scene-spec.md) — four self-contained, independent prop-free placement entries; the generic `scene` Resource renderer exists but this Scene does not.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “A rectangular array has the same number of items in every row.” — proposed when the corresponding observed model is explained, not when a prediction happens to be correct.
2. “Rows × items in each row tells us how many items are in the array.” — proposed when the corresponding observed model is explained, not when a prediction happens to be correct.

No Note entity, unlock event, revision sheet, persistence, mastery marker or spaced scheduler is claimed implemented. Any future revision sheet may show only a learner's unlocked Notes.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Prediction, building, comparison and an independent final example are **formative**; Identify row and column labels → place counters into equal rows → read R×C as a total → contrast ragged row → independently build and count another array. Assessment Architect independently validates any scored Question, correct alternatives, Skill attribution, pass criteria and retries. A correct single total never demonstrates broad mastery. The generic Lesson Question adapter's select-one support does not make these custom scenes graded Questions.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

English here is a source for genuine complete-language translation (prompts, feedback, accessible labels, Notes, models). Never silently fall back to English. The relevant group/row model and exact quantities must remain operable through equivalent ordered text/table state, native keyboard/switch/touch controls, visible focus, large targets, 200% zoom, mobile layouts and screen readers. RTL adapts prose/layout semantically while preserving equation operand identities and named group/row counts. Reduced motion removes transitions, not mathematical states. Complete selected-language instructions, scene logic and feedback must work offline on weak devices after download, without media, audio-only meaning, dragging or cloud services.

## PRODUCTION / PLATFORM DEPENDENCIES

Available in current generic Lesson renderer: `LessonSection_Config`, text, markdown and `scene` Resource type. Proposed: Array Grid Studio Scene with four prop-free entries and own unit/accessibility tests. Coding Agent verifies locale context, state isolation, and actual offline delivery; do not invent a React `mode` prop. Generic image/audio/video/code are typed-only in current generic renderer; YouTube not a configured Resource. Notes, review scheduler and full download flow are separate product dependencies. No Lesson runtime config or Quiz is created here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), pending editor approval.
- [Generated taxonomy](../../../../docs/generated/skills/taxonomy.en.md); direct canonical Skill filename/ID is in the Brief.
- [Create Lesson Content](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- **Editorial:** Array rotation may be previewed as observation but a full rule a×b=b×a belongs to the separate commutative Lesson. Confirm coherent sequencing alongside equalGroups.
- **Implementation:** Verify pedagogical equivalent access and full supported-language coverage; no claim of published readiness.

## HANDOFF

One provisional Draft Content and one separate Draft Scene specification. **Gate:** approve the Methodologist Brief first, then Content and Scene independently before Design Scene and Coding Agent implementation. Assessment Architect alone owns evaluated items. Do not modify other Lessons, Skills or Program narratives.
