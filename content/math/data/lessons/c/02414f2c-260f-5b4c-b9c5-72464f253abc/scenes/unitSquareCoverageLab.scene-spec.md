# Unit-Square Coverage Lab — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and Screenwriter/editor approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [How Much Flat Space? Count Equal Squares](../content.md), Sections 1–4
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md) — determine area by covering an interior region with _equal unit squares without gaps or overlaps_, distinguish coverage from exterior border and invalid units. The activity is **not** a new Skill, scored Question or perimeter assessment.

## LEARNER PURPOSE AND CONCEPT

Children should be able to **build a covering**, notice why counting tiles is meaningful only when all units are the same size and each required cell is covered exactly once, and see that unlike-looking outlines may enclose equal area. The interaction begins with a prediction, proceeds by deliberate tile/cell inspection and finishes with an explanation accessible without vision.

Learner-facing thesis: "**Count the same-size squares that fill the inside. A gap or two tiles on the same square means the covering is not finished fairly.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Model uses a **discrete square grid**. A basic tile covers exactly one 1×1 **abstract unit square**. **Unit square** is a unit of area, not length and not a real physical square centimeter. Cell identity uses (column,row) coordinates solely for specification/testing, **not** formal coordinate-plane instruction.
- Region R = {(1,1),(2,1),(3,1),(1,2),(2,2),(3,2)}, a **2-row × 3-column rectangle**; its area is exactly **6 square units**.
- Region S = {(1,1),(2,1),(3,1),(1,2),(2,2),(1,3)}, a **stair-step** region with row counts 3+2+1=**6**; it is connected and its outline is different from R.
- Region T = {(1,1),(2,1),(3,1),(1,2),(2,2)}, a **five-cell** step region with 3+2=**5**. Its area is one unit smaller than either R or S.
- Final transfer region U = {(1,1),(2,1),(3,1),(1,2)}, four cells; it is a three-plus-one L-shaped region.
- To **cover exactly**, every cell in target region has **occupancy count exactly 1** and all cells outside the region have occupancy count 0. A tile on an already occupied cell creates overlap; **do not** mark a covering complete merely because the number of placed tile objects equals required area. Coverage is the number of **distinct occupied cells inside region**.
- Changing outline topology, visual color, whole-shape rotation or screen zoom does not affect the number of equal unit-square cells _if the set of cells remains the same size_; do not claim any arbitrary resize preserves physical area. We compare only whole-cell examples, not fractional cells/curves.
- A 2×2 tile covers **4 one-by-one unit squares**. Two nonoverlapping 2×2 tiles cover **8** unit squares, whereas two nonoverlapping 1×1 tiles cover **2**. Equal raw tile counts with different tile areas **cannot** be compared directly.
- Boundary/perimeter is a different property. This model may reveal an outside outline but **must not require computing perimeter**.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — Where Is the Area? (Section 1)

1. Display outlines of R (rectangle) and S (stepped region) in separate but identically scaled diagrams. Hide full square-cell subdivisions at first, except for a clear shared reference **one unit square**.
2. Ask: "Which covers more _inside space_: rectangle R, steps S, or equal?" Predictions remain editable before "Show squares".
3. Reveal cells **row by row** (R: 3+3, S: 3+2+1). Textual state for each: "R: row one three, row two three, total six equal square units"; "S: row one three, row two two, row three one, total six".
4. Feedback for "S larger because more corners": "Corners describe an outside border; **six** same-size inside squares cover each." Feedback for "R larger because longer": "A longer appearance does not replace counting full inside cells." Correct "equal": "Both have six square units."
5. "Inspect border" traces/explains the boundary but never reveals an unrequested perimeter value. Reset hides totals and returns to prediction state without changing region geometry.

### B — Cover Exactly Once (Section 2)

1. R is a fixed grid target of six cells. The learner chooses a target **row** (1 or 2) and **column** (1,2,3), then presses "Place one unit tile." Each new tile is the same 1×1 size.
2. Display both **number of placed tile objects** and **number of different cells covered**; these can diverge after an overlap. No pointer precision/drag is necessary.
3. After six **distinct** placements in R, show status "six tiles, six different cells covered, no overlaps or gaps" and area "**6 square units**".
4. Deliberate overlapping attempt (e.g., second tile in cell (1,1)) gets a visible/accessible error state "This square is already covered; a second tile does not cover a new unit square." The duplicate can be rejected for ordinary practice or explicitly shown in "Show mistake" diagnostic mode with an occupancy counter of 2; **must not silently count it as another covered cell**.
5. "Undo last", "Next empty cell", "Count remaining empty cells", "Clear" are accessible. Exact uncovered cells are named. If five distinct cells are covered, report "five covered, one hole"—not "five square units of the shape" (the **target region still has area six**).
6. Optional "Show mistake" preset of 6 tile objects on 5 different cells supplies a reversible explanation; no grades, retry penalty or mastery event.

### C — Compare Different Regions (Section 3)

1. Display R, S and T with the **same 1×1 unit-square size**. Totals initially unlabelled; accessible mode gives the ordered row descriptions without prematurely listing total if a child wants to reason from the row counts.
2. "Count next row/cell" reveals R=6, S=6, T=5, and "Compare" shows **R=S>T**, with units "**square units**".
3. Feedback for believing R>S because it is more rectangular: "The rows add to six for both, so their covered regions are equal." For T chosen larger: "T has **five** unit cells; R and S each have **six**."
4. Offer "Rotate region view" as visual-only presentation transform with **no change to set size or area**; its text summary must explicitly preserve the six-cell count.
5. Every shape has a complete row-by-row textual cell list. Reset restores all comparison reveals independently.

### D — Repair Overlap and Challenge Unit Consistency (Section 4)

1. Target R (six cells). Six 1×1 tile objects initially placed so **two tile objects both occupy (2,1)**, **(3,2) is uncovered**, and every other R cell has occupancy one. Thus 6 objects, **5 distinct cells covered**, one overlap, one empty. "Find a missing square" and "Find overlap" are explicit choices; no color reliance.
2. "Move upper tile from (2,1) to (3,2)" yields occupancy exactly 1 for all six cells and an exact covering of 6 square units.
3. Show a separate fair-unit diagnostic: a nonoverlapping pair of 2×2 tiles covers **8** basic 1×1 squares; a pair of 1×1 tiles covers **2**. Ask "Do both use the same area unit?" Correct: no. Show subdivision ledger on reveal.
4. Independent final transfer: new U region (3+1=4 cells), four identical small tiles, learner identifies and covers all four unique cells. No computed perimeter. If a fifth duplicate is placed, explain that region still has four unique cells.
5. In correct and erroneous cases, give evidence statements, not correctness badges. Follow "Try again" with a clean, deterministic local reset.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** four precisely defined target cell sets R,S,T,U; fixed unit-square tile; optional 2×2 comparison tile; cell-selector controls; placement history; per-cell occupancy counters; row/cell count log; prediction/reveal/hint/reset.
- **State per independent Section placement:** region preset; current prediction; occupied-cell multiset or occupancy map; currently highlighted row/cell; reveal stage; localized feedback. Region definitions are **constants**; learner cannot edit boundaries into non-grid/fractional shapes.
- **Invariants:** target region area = size of its cell set; full valid tiling iff **each target cell occupancy=1** and no outside occupied cells; overlap never counts twice toward distinct coverage; identical unit square area 1; two 2×2 units occupy total 8 basic cells when nonoverlapping.
- **Validation:** if "Complete" requested early, explain remaining _uncovered target cells_. If duplicate placed in exercise mode, do not mutate occupancy or else enter explicitly marked overlap demo mode; accepted duplicate must never be treated as full coverage.
- **Reset:** per placement restores original target, predication state, initial tiles and reveal state (D includes its deliberate flawed preplacement). No state leakage between Sections.
- **Public component contract:** a Scene root for each placement is **prop-free**, reads locale from **actual verified Lesson context** and owns its state. Shared private helpers can receive internal configuration, not external runtime `region`, `locale`, `mode`, `onCheck` props.
- **Feedback contract:** tell the learner _what was covered_, not just "right/wrong". No Quiz, grading, external event, persistent Note or account requirement.

## VISUAL / AUDIO / MEDIA DIRECTION

Use uncluttered square grids with true equal-sized cells, visible boundary thicker than interior seams and clear tile/cell coordinates for accessibility. A boundary comparison never relies solely on a stylized shape; each region's unit-square cells are inspectable. Overlap indicated with an explicit **2** occupancy badge and pattern/layer cue, missing cell with **empty** label, not hue alone. Optional short tile placement motions, with reduced-motion instant replacement. No externally generated images or video necessary, no real pixel-area calibration claims.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Genuine translations of all prompts, "inside", "border", "unit square", cell labels, "overlap", "missing", "covered", units, explanations and recall Notes for each configured language; no fallback substitutions.
- Math/geometry state is independent of UI LTR/RTL; if grid layout is mirrored, the cell coordinate descriptions **must** be remapped consistently. Safer default: fixed grid coordinate convention with RTL surrounding UI adapted semantically. Neither direction changes R=6/S=6/T=5.
- Screen reader learns target cells by row and column, occupancy state for each, number of distinct covered cells and uncovered/duplicate locations; can place/undo a tile by buttons. No forced drag, pixel targeting, audio/animations, color-only states or hidden tiny labels.
- Visible focus, large touch targets, reduced motion, 200% text, logical announcements, keyboard/switch parity and WCAG 2.2 AA review. Preserve all math and actions on weak devices and offline after actual package+locale download; PWA availability is **not asserted**.

## ACCEPTANCE SCENARIOS

1. R has 2×3=**6** distinct unit squares; S has 3+2+1=**6**; T has 3+2=**5**, so **R=S>T** despite different outlines.
2. Under complete R coverage, exactly six 1×1 tile objects occupy six distinct target cells with no holes or duplicates.
3. A second tile placed on (1,1) cannot make a new covered square; ordinary exercise rejects duplicate or explicit demonstration records occupancy 2.
4. Stage D six tile objects with two on (2,1) and target (3,2) empty yields **five** uniquely covered cells; moving one to (3,2) gives six.
5. Two nonoverlapping 2×2 tiles versus two 1×1 tiles cover **8 vs 2** basic unit squares; raw count "two" is not an equal-unit comparison.
6. The novel U region comprises four distinct unit squares, not one per corner or one per border segment.
7. Rigidly rotating/recoloring a region's display does not change its defined unit-cell count; zoom never claims physical cm².
8. User reset isolates each Section placement; no inaccessible drag-only step, no grading or Note event.
9. Keyboard, screen reader, RTL, reduced motion, mobile zoom and full post-download offline use present exactly the same coverage validity and feedback.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Generic `scene` Resource rendering exists; **Unit-Square Coverage Lab does not**. Coding Agent must implement approved Section presets via self-contained prop-free roots, locale provider hooks, exact cell-set/occupancy invariants, automated tests, accessible manipulation and offline assets when ready. Methodologist and Scene approvals are missing; no production Lesson, Quiz/Question, scoring, analytics, persisted Notes or release artifact is added in this batch.
