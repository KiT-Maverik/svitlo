# Split Shapes and Build Them Again — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation**
Target Lesson: `learningApps/playground/Data/Lessons/1/rearrangingShapePieces/`
Audience: **Grade 3**, approximately ages 8–9; learners already count full grid-square area units
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: decompose an exact plane region into nonoverlapping rigid pieces, reassemble without gaps/overlaps, explain area conservation under rearrangement and contrast potentially changed outside borders.
Target Skills: `composeDecomposeShapes.data.ts` as directly linked in the Brief; prior `areaAsCovering` is a prerequisite, not another graded outcome.
Program dependence: None
Implementation: editorial documents only; Section rendering of `scene` type exists, bespoke Scene not yet built.

## INSTRUCTIONAL CONCEPT

**"The pieces can move. The total flat space in them stays the same."** Start with a 2×3 rectangle covering **six equal square units**. Split along a row boundary into **two 1×3 strips**, each of area three. If neither is stretched, lost nor overlapped when rearranged, the result still covers six separate unit squares. Placing one strip **end-to-end** with the other produces a **1×6** region: area still six; outside border is different from the original 2×3 region. A deliberately overlapping arrangement lets the learner catch a false "six covered squares" report.

This is not a memorized jigsaw exercise; children predict changes, choose locations, verify a region's actual _union_ and explain why a hidden overlap changes covered area. Unlike the prior area-covering Lesson, this one focuses on the **relationship between parts and whole across a rearrangement**.

## LEARNER JOURNEY

1. Predict what happens to a six-cell region when an internal dividing line is added.
2. Split into two **three-cell straight strips**, trace each and sum the nonoverlapping parts.
3. Reassemble into a 1×6 strip and compare its coverage and **outside** boundary with the original 2×3.
4. Debug an overlap and a missing strip, then independently rebuild the original 2×3 without losing or stretching pieces.

No physical cutting equipment, compulsory mouse drag, competition, scored Question or Lesson mastery assignment.

## SECTION PLAN

### Section 1 — Does a Cut Create More Space?

- **Purpose:** understand decomposition into nonoverlapping parts, not new area.
- **Current shape:** one vertical `LessonSection_Config` Resource sequence.
- **Ordered blocks:**
  1. **text — available:** "This rectangle covers **six equal squares**. We draw a line between its two rows. Do we now have more flat space than before, or the same six squares?"
  2. **scene — type supported, custom Scene proposed:** [Shape Piece Workshop](./scenes/shapePieceWorkshop.scene-spec.md), placement A. Start two rows of three cells: row-top (0,0),(1,0),(2,0); row-bottom (0,1),(1,1),(2,1). "Show dividing seam" draws an **internal** line along the shared row boundary, not an added outer border. "Separate pieces" offsets the two rigid **1×3** row strips without changing unit cells. Piece A has 3 cells, B has 3; together **6**.
  3. **markdown — available:** "We have **two pieces**, but we did not make extra area. Each piece covers **three unit squares**. Three plus three is **six**. The dividing line is a **seam inside** the original shape."
- **Explanatory feedback:** If learner says "more" after splitting: "A new line changed the picture, but the **same six square pieces** are still there." If they confuse seam with outside: "The seam sits **between** pieces; it is not on the original outside edge." Correct predictions get the reason, not a badge/score.
- **Access:** Both pieces listed by exact cell count and relative location before/after; no visual tracking needed.
- **Planned Note:** "Cutting without losing or adding pieces keeps the total area."

### Section 2 — Turn Two Short Strips into One Long Strip

- **Purpose:** verify area preservation when rigid pieces reassemble into a new outline.
- **Current shape:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **text — available:** "Two strips each cover three equal squares. Could they join into **one long strip**? Predict whether the area changes—and what happens to the outside edge."
  2. **scene — proposed:** [Shape Piece Workshop](./scenes/shapePieceWorkshop.scene-spec.md), placement B. Piece A occupies cells (0,0),(1,0),(2,0); the learner places piece B at (3,0),(4,0),(5,0). All pieces translate **rigidly**. Result: **1×6** region, area **6**, outside border **14 unit edges**; original 2×3 rectangle also area **6** but outside border **10 unit edges**. Optional boundary-edge reveal **counts** rather than an assessed perimeter question.
  3. **markdown — available:** "The six squares are still here. The **area stayed six square units**. But the long shape has a **different outside outline** from the shorter, wider rectangle. Area and outline describe different things."
- **Feedback:** If learner predicts area 12 because the shape got longer: "Length changed, but it is only one square high. We still have **two strips of three cells**." If learner claims the outside edge must remain the same: "Trace the outer edges of the two versions; some inner joins became outside edges, so the outline can change."
- **Exactness:** A shared edge between the two adjacent bars is internal, not an exterior border. The 1×6 construction must have **no gap**, including between cells 2 and 3.
- **Planned Note:** "Moving rigid parts can change the outline but keep the area."

### Section 3 — Hidden Overlap, Missing Area

- **Purpose:** reject counting material pieces when the area of their planar union differs.
- **Current shape:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **text — available:** "Someone says, 'Two three-square strips always cover six different squares, even if I lay one partly on top of the other.' Is that true? Look at the shared square."
  2. **scene — proposed:** [Shape Piece Workshop](./scenes/shapePieceWorkshop.scene-spec.md), placement C. A occupies (0,0),(1,0),(2,0), B occupies (2,0),(3,0),(4,0): **one overlap** (2,0). Although the pieces contain 3+3=6 unit cells **of material**, their union covers only **5 distinct grid cells**. "Slide B one cell to the right" changes B to (3,0),(4,0),(5,0) ⇒ union **6** nonoverlapping cells. Separate "Remove a piece" demo covers only three cells.
  3. **markdown — available:** "Both pieces _contain_ three squares, but when they overlap on one square, **only five different places are covered**. For a valid reassembly, pieces must fit with **no overlap and no gap**. Shift the strip and we cover six different cells again."
- **Feedback:** If learner counts shared cell twice: "That is **one place**, even though two layers cover it." If learner thinks overlapped area vanished from the pieces: "The pieces still have six squares of material; the flat _region they cover together_ has only five distinct squares when layered." If learner leaves a gap in the target outline: "The target region isn't fully reconstructed; join the strips edge to edge."
- **Access:** The ledger reads both **piece totals** and **distinct occupied cells**, with repeated cell named explicitly.
- **Reflection:** "What stayed the same about the pieces? What changed about the region they cover?" Unscored checkpoint, no scored Question.

### Section 4 — Rebuild the Whole

- **Purpose:** independent decomposition/recomposition and an explanation of the invariant.
- **Current shape:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **text — available:** "Start with two separate strips, each three squares long. Make the original **two-row, three-column rectangle** again. How do you know you didn't lose or overlap anything?"
  2. **scene — proposed:** [Shape Piece Workshop](./scenes/shapePieceWorkshop.scene-spec.md), placement D. Piece A fixed at (0,0),(1,0),(2,0), B initially at (4,2),(5,2),(6,2) in a larger board; learner moves/rotates whole B using named discrete controls and aligns it beneath A: target B=(0,1),(1,1),(2,1). Success when union equals **exactly** the six target cells, with no overlap/extra cells and both rigid pieces unaltered. Alternate placement above A is allowed **only when target outline is defined accordingly**; this preset target is explicitly the 2×3 region at rows0/1.
  3. **markdown — available:** "The two rigid pieces now make the **same six-cell rectangle** we began with. Every target square is covered **once**; we did not add, lose, stretch or layer the pieces. The total area is still **six square units**."
- **Feedback:** Off-by-one placement B=(1,1),(2,1),(3,1) has an extra outside cell (3,1) and leaves the target cell (0,1) empty: "One extra square sticks out, and one target square is uncovered. Move B left one." B overlaps an upper row: "The shared cell has two layers, so it cannot count twice." A valid rigid rotation is permitted but must still fit the exact target.
- **Transfer:** Ask if swapping piece colors changes area. Correct reasoning: "Color does not change any covered cells." Provide accessible cell-by-cell before/after explanation and reset.

## CUSTOM SCENE SPECIFICATIONS

- [Shape Piece Workshop](./scenes/shapePieceWorkshop.scene-spec.md) — proposed independently operable, prop-free rigid-piece Scene with explicit overlap/union arithmetic.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After decomposition: "The area of nonoverlapping parts adds up to the whole."
2. After long-strip reassembly: "Moving rigid pieces preserves their area."
3. After overlap diagnosis: "No gaps or overlaps when rebuilding a region."

These are planned short recall cues, not implemented Note IDs, unlock events, local state or spaced repetition.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 provides **unscored** independent proof-of-coverage via a cell ledger. Future Assessment Architect work may test different decompositions (e.g., two strips making a rectangle) and require area conservation reasoning, not just "shape fits" dexterity. Do not assert a correct drag shows durable conceptual mastery. A later perimeter Skill remains separate.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All prompts, shape names, state ledgers, error explanations, units, controls and proposed Notes need authentic translations in every configured locale. A nonvisual learner can inspect piece A's three cells, piece B's three cells, their union, duplicates, uncovered targets and the outer-boundary summary, and can move/rotate pieces with named commands. No puzzle must be drag-only or depend on color: pieces are labeled A/B, and each occupied cell reports its owner(s). In RTL the diagram's chosen coordinate frame and rigid transforms remain mathematically consistent; mirror only layout unless all cell-state text is updated. Ensure keyboard/switch focus, large touch targets, screen-reader state announcements, reduced motion, no time limits, 200% zoom and offline equivalence after actual locale/package download. Features are design requirements, not proof the present app implements them.

## PRODUCTION / PLATFORM DEPENDENCIES

`text`, `markdown`, `scene` Resource types are understood by the generic Playground Section renderer, but Shape Piece Workshop **does not exist**. Future Coding Agent must verify locale context, implement fixed independent prop-free Section roots, exact rigid grid transformations, validation of union and target coverage, co-located tests and offline assets. No runtime Lesson, Question/Quiz, scoring, Note API, analytics or user progress logic is included.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), canonical `composeDecomposeShapes.data.ts` linked there, and prerequisite area Lesson.
- Editor: confirm perimeter-edge counts are an optional **observation**, not an assessed target. Check that selected tilings have physically/virtually plausible nonoverlapping placements.
- Methodologist Brief is Draft; Content and Scene remain provisional until explicit approval.

## HANDOFF

Methodologist approves depth and preservation examples; Screenwriter/editor checks all coordinates and feedback. Scene Designer receives approved specification before coding, and Assessment Architect separately designs any scored tasks.
