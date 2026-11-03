# Array Grid Studio — Scene Specification

Status: Draft
Owner: Educational Screenwriter
Parent Lesson / Section: [Multiplication with Rows and Columns Content](../content.md), Sections 1–4
Methodologist objectives: Identify the number of rows and the number of objects in each row in a rectangular array. Construct and read a 3-row, 4-column array as 3 × 4 = 12, supported by an equivalent row-by-row count. Explain why a ragged shape with row sizes 4,3,4 is not a complete 3 × 4 rectangular array. Inspect a 4-row, 2-column new array and determine its total. [Methodologist Brief](../methodologist-brief.md) (Draft, not approved).

## LEARNER PURPOSE AND CONCEPT

Establish the rectangular array as a multiplication representation with the SAME number of objects in every row, and relate row count, items per row, column count and product. The Scene is an explorable mathematical **representation**, not a fixed animation or a scored response picker. Every change in a count is visible and explained numerically.

## ACCURATE CONTENT AND MODEL LIMITATIONS

An array with R equal rows and C objects in every row has R×C elements. Three rows of four = 12; two rows of five = 10; four rows of two = 8. An incomplete row with only three items invalidates the exact 3×4 rectangular model, although its objects can still be counted. Rows and columns describe mathematical structure, not directions tied to reading order. Confusing 3 rows of 4 with a total of 7, counting an empty grid cell as occupied, mistaking rows for columns, assuming a ragged 4,3,4 model has twelve items, and treating rotation as changing quantity. Avoid early general proof of commutativity; the next Lesson owns that Skill. All proposed examples remain within declared small whole-number boundaries. Occupied cell count exactly equals reported total. A complete array contains R×C dots; an incomplete [4,3,4] comparison contains eleven. Every row label and column position is semantically correct in RTL, never dependent on x-axis screen direction.

## EXPERIENCE BEATS AND LEARNER ACTIONS

1. **Section 1 / A Grid with Three Rows:** Show a rectangular 3-by-4 dot grid with clearly named rows and columns. Reveal row counts 4,4,4 one by one. Prompt: “Look at 3 rows. Each row has 4 dots. How many dots are there?” Mathematical explanation: “Three rows of four contain twelve dots. We can write 3 × 4 = 12.” **Feedback:** For seven, explain that 3+4 names two measures but misses other rows; an ordered row count shows 4+4+4=12. Recheck and full reveal stay available.

2. **Section 2 / Make a Rectangle:** Choose R=2, C=5; add dots with an accessible 'Fill next row' control; show ten occupied cells and their row counts. Prompt: “Build a grid with 2 rows and 5 dots in every row. Is each row complete?” Mathematical explanation: “Two complete rows of five contain 10 dots: 2 × 5 = 10. Each row needs five dots.” **Feedback:** If only nine dots are filled, say 'One row has only four. One more dot is needed to make both rows equal.' Recheck and full reveal stay available.

3. **Section 3 / Find the Missing Dot:** Contrast a complete 3×4 grid with a 4,3,4 ragged grid. Learner identifies an empty cell, fills it, and compares 11 versus 12 occupied positions. Prompt: “Three rows should have four dots each. One row has only three. Is the rectangle complete?” Mathematical explanation: “The incomplete grid holds eleven dots. Fill the one missing place to make three full rows of four and twelve dots.” **Feedback:** A claim that the incomplete grid is 3×4 gets a row-by-row check and a visible empty slot; do not pretend it already contains twelve. Recheck and full reveal stay available.

4. **Section 4 / Read a Fresh Array:** Construct a 4-by-2 grid, let learner inspect row and column counts, select 4×2=8 or request full reveal. Prompt: “There are 4 rows with 2 dots in each. What product matches the grid?” Mathematical explanation: “Four rows of two contain eight dots: 2+2+2+2=8 and 4×2=8.” **Feedback:** If 4+2=6, show each row’s two dots; if 2×4=8, acknowledge equal numerical total but explain the present row-count-first reading is 4×2. Recheck and full reveal stay available.

## INTERACTIVE OBJECTS, STATES AND RULES

- Objects: labeled countable counters, row/group containers, original data model, numerical role labels, ordered text ledger, prediction and reveal buttons, explanation panel, independently scoped Reset/Undo.
- Four **independent prop-free Scene placements**, one per Section. “Placement” is editorial; no new React mode prop or Resource field is authorized.
- **State:** Grid dimensions R=2…4 and C=2…5; occupied slots, highlighted row, complete/incomplete example, selected expression, ordered accessible row/column counts and explanation state.
- **Invariant:** Occupied cell count exactly equals reported total. A complete array contains R×C dots; an incomplete [4,3,4] comparison contains eleven. Every row label and column position is semantically correct in RTL, never dependent on x-axis screen direction.
- All choices are **formative**, not persistent scores, Skill mastery or Question objects. Switching placements restores that placement's exact initial quantities; a child can show all reasoning without guessing.

## VISUAL / AUDIO / MEDIA DIRECTION

Simple lightweight HTML/SVG counters and grid/containers, stable number labels, countable groups and subtle user-paced highlights. Avoid decorative animations, cramped tiny digits or external media. In reduced-motion mode present identical state transitions instantly. A low-spec/offline version must preserve interaction and explanation, not become a static answer.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate all prompts, feedback, row/group/total roles, controls, aria labels, Note cues and summaries genuinely into every supported locale with **no English fallback**. Preserve precise mathematical orientation and group/row meanings under RTL; never rely on the visual left side for a role. Provide a **fully operable ordered nonvisual state list**, with announced new counts after each step, native keyboard/touch/switch controls, focus, 200% zoom, adequate targets and no drag/sound/vision/timer requirement. Entire deterministic calculation, accessible model and selected-language messages must run offline after full download.

## ACCEPTANCE SCENARIOS

1. **A Grid with Three Rows:** Show a rectangular 3-by-4 dot grid with clearly named rows and columns. Reveal row counts 4,4,4 one by one. Check: Three rows of four contain twelve dots. We can write 3 × 4 = 12.
2. **Make a Rectangle:** Choose R=2, C=5; add dots with an accessible 'Fill next row' control; show ten occupied cells and their row counts. Check: Two complete rows of five contain 10 dots: 2 × 5 = 10. Each row needs five dots.
3. **Find the Missing Dot:** Contrast a complete 3×4 grid with a 4,3,4 ragged grid. Learner identifies an empty cell, fills it, and compares 11 versus 12 occupied positions. Check: The incomplete grid holds eleven dots. Fill the one missing place to make three full rows of four and twelve dots.
4. **Read a Fresh Array:** Construct a 4-by-2 grid, let learner inspect row and column counts, select 4×2=8 or request full reveal. Check: Four rows of two contain eight dots: 2+2+2+2=8 and 4×2=8.
5. Wrong/partial prediction gets the exact explanatory comparison, not a score, and allows retry or full reveal.
6. Each Section starts independently; Reset never leaks an earlier Section's state.
7. Keyboard, screen reader, semantic RTL, reduced motion, zoom/mobile and downloaded offline produce the **same numeric quantities and conclusions**.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic Lesson Scene Resource/rendering exists, but **Array Grid Studio is proposed, not implemented**. Requires editor approval of the new Brief, then separate Content/Scene review, Design Scene implementation and own tests. Coding Agent validates prop-free entries and locale/offline integration. Assessment Architect alone may approve scored questions. Editorial scope question: Array rotation may be previewed as observation but a full rule a×b=b×a belongs to the separate commutative Lesson. Confirm coherent sequencing alongside equalGroups.
