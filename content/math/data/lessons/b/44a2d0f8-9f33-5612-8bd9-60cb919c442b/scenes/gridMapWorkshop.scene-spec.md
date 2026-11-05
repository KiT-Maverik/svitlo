# Grid Map Workshop — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson: [Read and Draw Simple Grid Maps](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md): reference cells by stable row/column convention, follow adjacent steps and draw a readable map. Route skills are prerequisites; map design and reading are the central independent competence.

## LEARNER PURPOSE AND CONCEPT

A **grid map** only works when everybody agrees which square a label names, where map top is, what a "step" means and which pictures mark which places. The learner explores a named map, traces one step at a time and **authors** a different map someone else could interpret. The UI should make the map's **coordinate convention** visible rather than treating positions as free pixels.

Learner voice: "**First the row, then the column. Each step moves one square, and the map key says what the pictures mean.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- A fixed **4×4 array of cells**. Rows **A, B, C, D** order from **top to bottom**; columns **1, 2, 3, 4** order from **left to right**. A cell name is row letter then column numeral: e.g. **B2 is the interior** of row B, column 2.
- The **grid border intersection** is not a cell. Selecting a cell never selects a line crossing. Each cell is a discrete named region with its own contents.
- Absolute **map-right** increases column 1→4; map-left decreases it, map-up decreases row D→A and map-down increases row A→D. This direction convention is independent of **walker facing** and UI text direction.
- One "step" moves between **adjacent cells** up/down/left/right, never diagonally or past the map's edge. If a command would exit, leave the position unchanged and report it explicitly. No wraparound, teleporting or implied diagonal step.
- A map's legend contains unique named **tree**, **park**, **pond** and additional example **garden/market** as described in Content. The exact symbols and text names must agree; do not depend on color/pictogram-only recognition.
- A cell stays the same semantic reference at different display sizes. A **different map** could use a different physical scale and should label that difference; this Scene does not calculate real-world distances. Never assert that reordering independent horizontal/vertical moves in an empty grid necessarily changes the endpoint.
- Model references are schematic and cultural/place neutral. No GPS, real positions, map API, geodetic projection or formal algebra coordinates.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Placement A: Read B2, Not a Corner (Section 1)

1. Show fixed labeled 4×4 cells and the convention "letter = row; number = column". Place **tree in B2**, **park in A4**, **pond in C3**, nothing elsewhere.
2. Prompt: "Where is B2? Choose a row and column before revealing the label." Controls "Row A/B/C/D" and "Column 1/2/3/4" must be accessible without clicking grid lines.
3. Correct selection B and 2 maps to the entire cell B2. Text: "Tree at B2. Second column of row B." Selecting C2 reveals "Right column, wrong row" or B3 "Right row, wrong column".
4. "Read row B" lists **B1 empty, B2 tree, B3 empty, B4 empty** in order; "Read map" lists all 16 cells with landmarks.
5. Change only selection, never silently move landmarks. Reset returns to B2 unrevealed.

### Placement B: Trace a Cell-by-Cell Route (Section 2)

1. Fixed initial cell **B2** containing a tree. Target **A4** containing park. Command tape (absolute **map** directions): **right one**, **right one**, **up one**.
2. Prompt learner to predict next cell before running each command. Step results exactly **B2→B3→B4→A4**. Show ordered cell log with per-step meaning and the final park.
3. For predicted C4 on last step, explain C is down not up from B; for A3, explain a right move is missing; for B2→B4 in one claimed step, explain one step means _one neighbor_.
4. "Previous step", "Replay", "Reset" allow inspection, deterministic state restoration and hint/reveal with no timed gates. Do not infer the learner's heading from commands.
5. Optional alternative path to A4 can be accepted as a destination match if using the same absolute grid rules, **not** marked wrong because its command list differs. This stage's guided tape nevertheless uses the stated three commands.

### Placement C: Author a Shareable Map (Section 3)

1. Start with a blank 4×4 grid and a legend showing symbols/names **tree**, **pond**, **park**. Prompt: "Place tree at B2, pond at C3, park at A4."
2. Controls: choose landmark, choose row (A–D), choose column (1–4), choose "Place / Move landmark". It updates the **one** location for the selected landmark; placing tree again moves its marker rather than cloning it. "Remove marker" and "Reset map" are available.
3. A "Read back map" accessible list exposes every cell's contents and the legend, including empty cells. A separate "Check directions" action compares positions to the three specified cells and gives **per-landmark corrections**, not a score.
4. Examples: tree wrongly at **B3** ⇒ "Tree needs column 2 of row B"; pond wrongly at **B3** ⇒ "Pond is in column 3 but needs row C"; park at **A4** ⇒ "Park is in row A, column 4 as requested".
5. If placing multiple landmarks into a cell, either explicitly allow a clearly labeled **shared cell** and state the consequence, or in this Lesson require one landmark per cell and explain that the chosen cell is occupied; **do not silently remove** a different landmark. This specification adopts **one landmark per cell** for clarity.
6. The learner may optionally provide a route between the placed tree and park, validated by the same map conventions. Doing so is unscored, not a separate Route Skill mastery result.

### Placement D: Unfamiliar Map and Error Diagnosis (Section 4)

1. Fresh fixed map (independent of stage C) with **garden in A3**, **market in D2**, all other cells empty. Explorer starts **C2**. Visible instruction list: **up, up, right**, exactly one cell each.
2. Step-by-step results: **C2→B2→A2→A3**, ending at **garden**. Player may predict cell or destination with accessible named choices; no route animation required.
3. Feedback for B3: "We needed a second up step to reach row A"; for A2: "That is after the two up steps, before the final right"; for D3: "That is down, not up".
4. Challenge a convention violation explicitly: one proposed map-label description says "**A3 means row 3, column A**". Let the learner identify the problem: the map defines **letter rows** and **number columns**. Correct text: "A3 means row A, column 3." This is a _map-reading_ error, not a new Language Skill.
5. Optional scale thought experiment: If a different map shows squares twice as wide **on screen**, do not assume each square is twice the real distance; require a declared scale. An accessibility description should state this conceptual point without measuring physical pixels.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** 16 labeled grid cells, row/column selectors, per-cell content labels, fixed map-orientation key, landmark selector and legend, route tape, text log, editable map placement, predict/reveal/undo/reset.
- **Per-placement state:** immutable row/column convention and preset landmark positions, selected row/column, current cell, revealed route index, created landmark map (stage C), feedback/reveal state. Each Section's placement is initialized independently.
- **Invariant:** cell reference is row letter followed by column number; route transitions are always one adjacent cell for one command; landmark list and map are synchronized; stable scale and direction convention; moves outside 4×4 are rejected with explanation.
- **Prop-free integration:** each public Scene entry for a Section must be self-contained with **no incoming props**; share private helpers but never create a public `gridSize`, `locale`, `mode`, `initialCells` or `onChange` prop contract. Get locale from actual Lesson provider context once verified.
- **Interaction alternatives:** no pointer precision required. Named row/column selectors can place markers, keyboard/switch buttons can advance a route. An ordered row-major text table is not optional; it is required for nonvisual equivalent meaning.
- **Reset and hints:** reset local stage to fixed preset, leaving other stages unaffected. Hints reveal only next relevant row/column correction. No score, Quiz, Note unlock or persistent map-state guarantee.

## VISUAL / AUDIO / MEDIA DIRECTION

Use simple, large 4×4 SVG/HTML grid with a visible alphabetic row header on **each row** and number header on **each column**. Show a high-contrast outline and text name on active cell; symbols/emoji may be decorative but must not replace legend text or accessible names. A route step should highlight the current and next cells, with a textual announcement; under reduced motion, jump straight to new state. Responsive resizing maintains equal grid cell widths within each map. No external map assets, networking or real-world navigation interface required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Translate all landmark names, instructions, feedback, headings, route narration, cell position words and accessible labels genuinely for supported locales; no placeholders. A–D are **stable illustrative cell identifiers** for this English editorial spec, not proof of how letter labels translate. The eventual localized presentation must explain or safely preserve the mapping to equivalent codes.
- **RTL is not permission to flip the grid math:** map-right still increases column number and map-top still starts row A in this specified 4×4 model. If a localized design intentionally changes map orientation, all identities, route results and text must be transformed consistently and independently tested, with explicit UI explanation; the simpler approved default is a fixed-direction schematic map in RTL text layout.
- A screen reader can ask for "row B" or each cell by name, hear "B2 has tree", execute discrete route steps, and place landmarks by row/column choices. Do not rely on color-only highlights, images, fine motor dragging, audio, time pressure or repeated noisy live announcements.
- Maintain logical focus, touch target size, readable 200% labels, WCAG 2.2 AA, reduced motion and equivalent low-end/offline operation after selected locale/lesson download. Design is **not** evidence of existing PWA caching.

## ACCEPTANCE SCENARIOS

1. On A–D rows / 1–4 columns, selecting row B + column 2 identifies **cell B2** with a tree, not the border intersection.
2. B2→B3→B4→A4 by right/right/up ends at the **park in A4** with exactly one neighboring-cell transition per command.
3. C2→B2→A2→A3 by up/up/right ends at the **garden in A3**.
4. Stage C places tree B2, pond C3, park A4 and produces a **matching, unambiguous legend and ordered 16-cell list**.
5. Placing pond at B3 returns row-specific correction; placing tree at B3 returns column-specific correction.
6. A command from A2 to "up one" is blocked, leaving player at A2 with a specific edge explanation.
7. "A3 means row 3 column A" is rejected as incompatible with the agreed convention; correct is "row A column 3".
8. On-screen resize does **not** change cell references or the defined one-cell-step semantics; no fabricated physical-distance calibration.
9. Reset isolates each Scene placement; keyboard, screen reader, RTL, mobile, 200% text, reduced motion and offline after download preserve equivalent location and route reasoning.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The current generic Section renderer understands `scene`, but **Grid Map Workshop is not implemented**. Future Scene Designer/Coding Agent must implement verified locale provider use, deterministic grid-state controllers, accessible grid/list interaction, co-located tests, real translations and complete offline assets only after editorial approval. No server map API, database, scoring, Question/Quiz or Note persistence invented. Editor must confirm the fixed lettering convention is comprehensible internationally.
