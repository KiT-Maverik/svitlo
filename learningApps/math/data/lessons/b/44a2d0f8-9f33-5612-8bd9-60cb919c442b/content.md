# Read and Draw Simple Grid Maps — Lesson Content

Status: **Provisional Draft pending Methodologist approval — NOT Approved**
Target Lesson: `learningApps/playground/Data/Lessons/1/readingAndDrawingGridMaps/`
Audience: **Grade 2**, approximately ages 7–8; early/mixed readers; accessible row/column and no-drag interactions
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: read named grid cells, follow one-cell routes with consistent orientation, create a legible simple map and explain the importance of shared cell/scale conventions.
Target Skills: `gridMapNavigation.data.ts` as linked in the Brief. `positionWords` and `spatialOrientationPath` remain prerequisites, not automatically assessed new outcomes.
Program dependence: None
Implementation state: editorial plan only; custom Scene is not implemented.

## INSTRUCTIONAL CONCEPT

**"A map is useful only if we agree what its squares and labels mean."** A shared 4×4 cell grid gives repeatable directions: rows A, B, C, D start **at map top**, columns 1–4 start **at map left**. The name **B2 means row B, column 2**, the whole square cell—not a crossing of lines. Each adjacent move on this map is _one cell_. The child uses this fixed convention to locate landmarks, trace a route and build a small map for another person. Display size may vary with device, but the **grid cell-to-cell convention** does not.

Use a modest map with park, tree and pond icons and corresponding text labels. These are orientation examples, not a Program quest, timed treasure hunt or real geography.

## LEARNER JOURNEY

1. Locate a landmark by reading row and column labels; resolve ambiguous "second square".
2. Follow a short cell-by-cell route and verify each move, without switching between heading-relative turns and absolute map directions silently.
3. Place three landmarks in specified cells so somebody else can read the same map; validate the legend.
4. Transfer to a fresh map with an unseen route and identify one example of a broken grid convention.

## SECTION PLAN

### Section 1 — Which Square Is B2?

- **Purpose:** interpret one cell reference rather than a line crossing or a bare number.
- **Current shape:** `LessonSection_Config`; one vertical ordered Resource sequence.
- **Ordered blocks:**
  1. **text — existing renderer:** "Look at our little map. The letters A, B, C, D name the rows. The numbers 1, 2, 3, 4 name the columns. Where is **B2**—the second square of row B, or a line where the labels cross?"
  2. **scene — existing Resource type, custom Scene proposed:** [Grid Map Workshop](./scenes/gridMapWorkshop.scene-spec.md), stage A. Show 4×4 cells with labeled rows/columns. Learner selects a **cell** by row choice and column choice (not precision clicking). Tree at **B2**, park at **A4**, pond at **C3**. "Read chosen cell" reveals "B2: tree"; "Show row B" highlights four cells and names them B1–B4.
  3. **markdown — existing renderer:** "First find the **row letter**, then the **column number**. B2 is **one square** in row B and column 2. A square is an area on the map; the grid lines are its borders. Names help two people talk about the same place."
- **Feedback:** Selecting C2 for B2: "You kept column 2 but moved one row down. Find the row labeled B." Selecting B3: "You kept row B, but moved to column 3. Check the number 2." If child chooses a line crossing: "We name the _inside of a square_ on this map."
- **Access:** Row/column selectors plus a 16-row logical cell list "A1 empty; …; B2 tree …". Use no unstated visual coordinates. Planned Note: "Read the row letter, then the column number."

### Section 2 — From the Tree to the Park

- **Purpose:** apply a consistent map orientation and exactly one cell per move.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered blocks:**
  1. **text — existing:** "Start at the tree in B2. Move **right one**, **right one**, then **up one**. Where do you arrive? Tell us which squares you pass."
  2. **scene — proposed:** [Grid Map Workshop](./scenes/gridMapWorkshop.scene-spec.md), stage B. Trace B2 → **B3** → **B4** → **A4**. Each reveal includes row/column text and marks exactly one new neighboring cell. Final A4 displays park. No diagonal movement, no map rotation.
  3. **markdown — existing:** "First we moved to B3. One more right step reached B4. Up one row took us to **A4**, the park. 'Right' on this map means toward the **larger column number**. 'Up' means toward the **earlier row letter**."
- **Feedback:** If learner says C4 after the final step: "C4 is **down** from B4. The instruction said **up**, so we go to A4." For a jump from B2 to B4 in one step: "That crosses **two** neighboring cells; our map uses one square per step." For diagonal B3→A4: "That cuts across a corner, but we are following up/down/left/right moves only."
- **Consistency:** This Lesson uses absolute map directions rather than the explorer-facing right-turn controls of the earlier Route Directions Lesson. State this difference in child-friendly copy: "A map arrow stays the same way even if the walker turns."

### Section 3 — Make a Map Somebody Else Can Read

- **Purpose:** construct a named grid map, not only use a supplied one.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered blocks:**
  1. **text — existing:** "Your friend will see only your map. Place a **tree at B2**, a **pond at C3** and a **park at A4**. How will they know which symbol is which?"
  2. **scene — proposed:** [Grid Map Workshop](./scenes/gridMapWorkshop.scene-spec.md), stage C. Start with empty 4×4 labeled grid. A labeled landmark selector and row/column selectors place unique tree, pond and park symbols, each with visible word label and a legend. "Read back map" lists the three placements; "Check against directions" provides specific guidance, not a score. Child can move/remove a landmark and restore map with Reset.
  3. **markdown — existing:** "A map needs a **key** to say what its pictures mean. With a named row, column and key, another person can find the exact same square. If you move the pond from C3 to C4, the map tells a **different** story."
- **Feedback:** If pond at B3: "Our directions say C3: column 3 is right, but the pond must be in **row C**." If duplicate landmark placed: "We have one pond to place; move its existing marker instead of creating a second pond." Reject dropping outside the 4×4 cells with explanation rather than silently storing out-of-bounds coordinates.
- **Reading and mobility:** Show a deterministic text map (each row A–D lists four cell labels and contents). No drag-only placing; keyboard arrow selection may be optional, but explicit row/column buttons remain.
- **Planned Note:** "A map key explains the symbols; the cell labels show where they are."

### Section 4 — New Places, Same Grid Rules

- **Purpose:** independent transfer to a fresh map with an explicit convention.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered blocks:**
  1. **text — existing:** "A new map has a **garden in A3** and a **market in D2**. You start in **C2**. Go up two squares, then right one. Which place will you reach? Check the row and column after every step."
  2. **scene — proposed:** [Grid Map Workshop](./scenes/gridMapWorkshop.scene-spec.md), stage D. Start C2 and move **C2 → B2 → A2 → A3**. End at garden. Provide optional "Show previous square" and "Read route as cells". Then show a separate wrong legend "A3 = row 3, column A" and ask whether it follows the agreed map format.
  3. **markdown — existing:** "The path ended at **A3**, the garden. We kept the same map orientation, and **one step meant one neighboring square** the whole way. Swapping what letters and numbers mean makes the map unreadable to a friend."
- **Feedback:** For B3: "You went up only once. We needed two up steps from C2 to A2, **then** right to A3." For A2: "You did the two up steps but forgot the final right step." For a claim that "up-right diagonal" is one step: "Our plan named three adjacent moves, not a diagonal shortcut." Another valid route may lead to the same square; no claim that the exact tape is the only possible one.
- **Independent drawing transfer:** Offer a small unscored task: construct a fresh 3-landmark map with row/column and legend from written instructions. A screen reader can inspect the same landmarks as a list.

## CUSTOM SCENE SPECIFICATIONS

- [Grid Map Workshop](./scenes/gridMapWorkshop.scene-spec.md) — editorial standalone custom Scene with four separately initialized, prop-free placements and a complete nonvisual map representation.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 B2 reveal: "Grid cell: read the row letter, then the column number."
2. After Section 3 map construction: "A map key gives each symbol a meaning."
3. After Section 4 consistency check: "Keep the same direction and cell size throughout one map."

These are future brief Notes only. No Note IDs, event names, learner revision-sheet storage, synchronization or scheduling is implemented.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

An Assessment Architect may later design independent map-location and map-drawing evidence using varied labels, symbols and directions, plus an equivalent text-list mode. Section 4's practice is **unscored** and never automatically certifies mastery. A future Program may link the Lesson but the Lesson does not depend on a quest character or narrative.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All labels, landmark names, prompts, route descriptions, feedback and accessible names require genuine translations in every supported locale. **Fixed map convention** (A at top, column 1 at left) must be explicitly described and preserved if locale layout is RTL; never silently mirror the map while leaving the cell names or route outcomes unchanged. Localized alphabet symbols can be displayed alongside stable reference identifiers only with verified, one-to-one mapping; do not invent transliteration rules. Use cell lists by row, numbered controls, sufficient focus, visible labels and text status independent of color/picture. A verbal description of the 4×4 map must let a nonvisual learner locate, navigate and create the same cells. Respect touch sizes, font enlargement, reduced motion and complete offline access after downloaded locale/Scene content is available.

## PRODUCTION / PLATFORM DEPENDENCIES

`text`, `markdown` and `scene` Resource block types are supported by the generic Section renderer; the custom Grid Map Workshop **does not exist**. Future implementation requires independent prop-free roots per Section, actual verified locale context, keyboard/AT alternatives, pure local map data and automated tests. There is no runtime Lesson data, map API, persistence, Question/Quiz/scoring or Note mechanism added by this editorial work.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md); the canonical grid-map Skill and prerequisite Skills linked there.
- Editor: confirm row/column symbols A–D / 1–4 are universally understandable when genuinely localized or explained; the mathematical relation must remain invariant.
- Editor: consider whether a small physical-floor-grid activity is a useful **optional** extension. No materials may be required for completion.
- The Methodologist Brief remains **Draft**; these Section/Scene proposals are **provisional**.

## HANDOFF

Methodologist approves audience/criteria. Screenwriter/editor verifies map cell examples and explanatory feedback. Approved Scene spec then passes to Scene Designer for component design and tests. Assessment Architect owns any future scored evidence.
