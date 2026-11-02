# Shape Piece Workshop — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and Screenwriter/editor approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Split Shapes and Build Them Again](../content.md), Sections 1–4
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md) — decompose a planar region into nonoverlapping parts, reassemble without gaps/overlaps and explain why area remains the same while outer boundary may change. Distinct `composeDecomposeShapes` Skill, not a second area-covering quiz.

## LEARNER PURPOSE AND CONCEPT

The student can **cut** a six-square 2×3 region _along a cell boundary_, inspect two unaltered three-square strips and reposition them. The conceptual question is not which puzzle picture looks right but **why the parts still contain six equal unit-square cells**. The Scene distinguishes the _piece-material count_ from the **unique grid cells covered by their union**. This matters when pieces overlap: each strip still has three squares, yet the flat area covered by their layered union may be only five.

Learner voice: "**The parts keep their squares. If they don't overlap or leave pieces out, their areas add to the new shape's area. The outside edge can change.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Use a discrete integer grid with equal 1×1 square cells. Starting region R contains **(0,0),(1,0),(2,0),(0,1),(1,1),(2,1)**: a **2-row × 3-column** rectangle, area **6 square units**.
- Horizontal decomposition into two **1×3 rigid strips**: Piece A = {(0,0),(1,0),(2,0)}, Piece B = {(0,1),(1,1),(2,1)}. Each has exactly **3** unit cells. The seam between rows is **internal** to starting region and never an outside edge of whole R.
- A piece may **translate** by integer cell offsets and (optionally) **rotate** rigidly by 90° steps around a specified grid anchoring convention, preserving its three unit cells and connected edge relationships. No scaling/stretching or splitting individual strips in the later arrangement.
- When strips are disjoint, **union area** = 3+3=**6**. When overlapping in exactly one cell, **union area**=3+3−1=**5** (the pieces still individually contain three). A "cover target correctly" task also requires the union's cell set to equal the **target cell set**, not simply to have the right count.
- Original R has exterior **10** one-unit edges: for a 2×3 rectangle, 2*(2+3)=10. Two 1×3 strips placed **end-to-end** make a **1×6** rectangle: area **6**, exterior **14** one-unit edges (2*(1+6)=14). Illustrate as an optional outside-edge **observation**, never a perimeter mastery requirement.
- End-to-end state: A cells {(0,0),(1,0),(2,0)} and B cells {(3,0),(4,0),(5,0)}. There is **no gap** between the strip ends: cell (2,0) shares an edge with (3,0).
- Overlap state: A {(0,0),(1,0),(2,0)}, B {(2,0),(3,0),(4,0)}. Cell (2,0) belongs to **both** piece footprints and is counted **once** in union area. A learner must notice this before claiming a six-square reassembly.
- Do not confuse rotating a rigid piece with morphing/repainting, and do not interpret onscreen pixel size as actual cm². All targets composed of whole unit cells only.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — Add a Seam, Not Area (Section 1)

1. Begin with six-cell rectangle R, six numbered unit cells, no seam. Ask: "If we split it **between the two rows**, do we gain flat space?"
2. "Show seam" reveals **only** the horizontal internal boundary between the top row and bottom row; region and six occupied cells remain unchanged.
3. "Separate strips" translates B down to a display-only staging row while preserving its three local cells. A remains three cells. Ledger "Piece A: 3; Piece B: 3; original R: 6."
4. Reveal: "The line was inside the rectangle. It divided **six** squares into groups of **three and three**." If the learner predicted larger area: "No new cell appeared; we only moved a boundary between parts."
5. Optional "Put back together" restores starting R without scoring. Reset makes seam/part separation unrevealed, no state leakage.

### B — Reassemble a Long Strip (Section 2)

1. Begin with two separated strips, each three cells, in a sufficiently wide board. Prompt: "Put B next to A to make **one row of six**. What will happen to area and the outside?"
2. Non-drag controls: "Move B left/right/up/down by one cell", optional "Rotate B 90°", "Place B end-to-end" as a revealing hint, "Read occupied cells", "Check". Goal A {(0,0),(1,0),(2,0)}, B {(3,0),(4,0),(5,0)}.
3. Correct arrangement union has six distinct cells in one row. Reveal "Area: **6 square units**." Optionally compare original and new outside edges as **10 vs 14 unit-edge pieces** with accurate tracing; never ask child to calculate formal perimeter.
4. If B at (4,0),(5,0),(6,0) leaving a gap at (3,0), the union still has six cells **but not the 1×6 target region**. Feedback: "All pieces are here, yet the long strip has a gap. Bring B one cell left to join edges." No false "complete" based on raw total alone.
5. If B starts at (2,0),(3,0),(4,0), overlap at (2,0) and union area 5; explain the exact duplicate cell. A displaced B may change bounding outline but not itself deform.
6. Reset/replay returns to two original separate strips, with no assumed persistent Lesson completion.

### C — The Layered Cell Trap (Section 3)

1. Start A horizontal at x=0,1,2 row0 and B at x=2,3,4 row0, with exact **one-cell overlap**. No animation required to see that B's first square lies over A's third.
2. Learner predicts "Six physical piece squares means how many **different occupied places**?" Accessible choices 5,6 or "not sure". "Reveal shared square" identifies (2,0) as owned by both pieces.
3. Report **three cells in A + three in B**, but **five distinct cells in union**. Explain it is a layering problem, not a lost material square.
4. "Shift B one cell right" makes B at x=3,4,5, union 6 with no overlap/gaps; both strips unchanged.
5. Alternate "Remove B" yields just A area3; different from overlap, reinforces that **using all pieces** matters to a specified six-square reassembly.
6. Any claim "the six-square target has been reconstructed" must check target cell set and no overlap, not only count. Feedback is unscored and reversible.

### D — Rebuild the Exact 2×3 Target (Section 4)

1. Start A occupying {(0,0),(1,0),(2,0)}, B occupying {(4,2),(5,2),(6,2)} on board large enough for both. Target outline is fixed R rows0/1 columns0,1,2.
2. Learner moves B with discrete direction buttons or chooses target anchor "row 2, column 1" (human-visible 1-index labels) to set its cells at **(0,1),(1,1),(2,1)**; A remains fixed. "Check target" compares **union exactly to R**, ensures occupancy1 for every target and occupancy0 outside.
3. Example wrong B at {(1,1),(2,1),(3,1)}: R cell **(0,1)** missing and out-of-target **(3,1)** occupied. Feedback: "Move B left one cell. One target cell is empty and one cell sticks outside."
4. Example B overlapping A at row0: union has <6 distinct cells, explicitly invalid; user may undo/retry. A/B piece geometry never changes on movement.
5. Correct: all six target cells covered once, no extras, no overlap; explain "**same six squares, rearranged**". A "Swap colors" reveal illustrates color changes appearance but not counted area.
6. If optional rotation is available, it must use mathematically rigid mapping; a rotated vertical 3-cell strip will not fit the exact two-row rectangle here unless moved/rotated back. Explain mismatch rather than snapping silently.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** target cell set R, two labelled rigid 1×3 strips, seam, board, occupancy union ledger, transform buttons, prediction, check/reveal/undo/reset, optional outside-edge trace.
- **State per placement:** A/B anchors and orientation, seam visibility, target preset, chosen prediction, reveal stage, last transform/history and feedback. Pieces always contain three cells each. Coordinates may be internal; learner sees meaningful rows/cells and before/after ownership.
- **Geometry invariants:** per-piece area=3, shape invariant under rigid transformation; distinct union area=cardinality(set(A)∪set(B)); target success requires exact equality with R and no overlaps. Area6 alone **not sufficient** for exact target if shape has gap/extraneous cells.
- **Rotations:** explicit 90° increments only, preserving tile adjacency. If unsupported by actual code, designer may omit optional rotation because the required A/B transformations are translations; must not claim a UI control exists before implementation.
- **Independent prop-free roots:** each Section placement owns its own preset/state with **zero public React props**. Shared private geometry functions acceptable, but no guessed Section `mode`, `locale`, `initialPieces`, `onSuccess` API.
- **Accessible moves:** choose a piece then use named cardinal button controls and an undo; do not depend on dragging. Numeric cell occupancy list is the authoritative nonvisual equivalent to the visual overlap diagram.
- **Feedback:** identify the first relevant wrong assumption (overlap, gap, extra cell, deforming) with a clear next correction. Never turn a single correct arrangement into scored mastery.

## VISUAL / AUDIO / MEDIA DIRECTION

Use a clean uniform grid with two pieces differentiated by **A/B text and hatching/pattern** as well as optional color. A shared square must show both **A+B** labels or a double-layer symbol; do not silently hide underneath. A seam is visibly interior; after reassembly trace outer edges separately to distinguish from interior joins. No dramatic cutting tools, paper-scissors violence, heavy animation, video or external image requirement. Optional stepwise motion is reduced-motion compatible; screen zoom cannot stretch any unit cells independently.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate every piece label, direction button, "overlap", "gap", "outer edge", unit-square count, feedback and Note into genuine supported locales. RTL changes reading/presentation order but not rigid-transform correctness, piece coordinates or union arithmetic; no automatic whole-diagram mirroring while retaining mismatched cell descriptions. For screen reader and switch user, a row-by-row ledger lists each cell, its owner(s), target membership, duplicated cells and missing cells; all transforms are discrete accessible controls. Avoid color-only information, forced drag/touch precision, auditory-only feedback, time limits. Provide WCAG 2.2 AA design, large focusable targets, screen-reader status clarity, reduced motion, 200% text and same complete lesson on low-end/offline devices after package/locale download; current implementation has **not** been verified.

## ACCEPTANCE SCENARIOS

1. Starting 2×3 R has **6** unit cells; splitting at internal row seam yields **two pieces of 3**, no new square created.
2. A horizontal x=0,1,2 and B horizontal x=3,4,5 at row0 make one **1×6** region of six disjoint cells with outside boundary **14** unit edges.
3. Initial 2×3 R outside boundary counts **10** unit edges; area is six in both it and 1×6 shape, so outside edge need not remain constant.
4. Overlap at cell (2,0) gives A3+B3 but **union 5**; moving B one right gives disjoint union6.
5. B shifted to x=4,5,6 leaves a **gap** in intended 1×6 target even though union area is six; reject target success with explanation.
6. Stage D A at top row and B at {(0,1),(1,1),(2,1)} exactly reconstructs R with area6, no gaps/overlaps.
7. B at {(1,1),(2,1),(3,1)} leaves target (0,1) uncovered and adds out-of-target (3,1); "move left one" corrects.
8. Rigid piece translation/rotation preserves exactly three squares in each piece and does not change its material area; color swap doesn't change geometry.
9. All root placements reset independently and are prop-free; keyboard, screen reader, RTL, reduced motion, mobile zoom and offline after download preserve exact occupancy and feedback with no forced drag.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Only generic `scene` Resource integration currently exists. **Shape Piece Workshop is not implemented**, has no locale dictionaries or automated tests yet and must await explicit Brief/Scene approval. Future engineering owns deterministic union/intersection logic, keyboard-accessible piece moves, Section-local prop-free components, real locale context and offline packaging. No scoring, Question, Quiz, Note persistence or platform events invented.
