# How Much Flat Space? Count Equal Squares — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation**
Target Lesson: `learningApps/playground/Data/Lessons/1/coveringShapesWithUnitSquares/`
Audience: **Grade 2**, approximately ages 7–8; early/mixed readers; equivalent nonvisual, keyboard and touch participation
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: define area as two-dimensional region coverage, cover it exactly with equal square units, count whole square cells correctly, explain why overlaps/gaps or unequal-sized tiles undermine a measurement.
Target Skills: `areaAsCovering.data.ts` as linked directly in the Methodologist Brief; no perimeter Skill is assessed.
Program dependence: None
Implementation: **editorial-only**; Section `text`, `markdown`, and `scene` types exist but no custom Scene or runtime Lesson is implemented.

## INSTRUCTIONAL CONCEPT

**"Area is the space inside a flat shape. Count the equal squares that cover it."** A border helps show _where_ a flat region stops, but counting the border does not tell us how much interior space it covers. A regular square grid lets the learner **build evidence**: one **identical 1×1 square tile** covers one grid cell, no gaps or double counting. Two shapes can have different-looking outlines and still cover six identical squares. A mistaken overlap or missing cell becomes a concrete counterexample rather than an abstract correction.

This Lesson intentionally uses **whole-cell planar regions**, not a general formula or a calibrated centimetre-square measure. "Unit square" is an **abstract equal area unit**. The onscreen rectangle may change size under zoom but its cell count stays fixed.

## LEARNER JOURNEY

1. **Predict** which of two differently outlined shapes covers more interior space. Resist counting corners or length of border.
2. **Cover** a 2-row × 3-column region with exactly six equal tiles, marking cells as covered and checking gaps/overlaps.
3. **Compare** a 2×3 rectangle with a six-square stepped region and a five-square region by counting interior coverage, not visual shape.
4. **Debug** a tempting error: two tiles on the same cell and a hole elsewhere; six physical tiles do not necessarily cover six different cells. Notice that changing tile size changes the unit.

The learner acts before each result and hears a **reason**, not an automatic grade.

## SECTION PLAN

### Section 1 — The Border Isn't the Space Inside

- **Purpose:** separate the inside region from its enclosing outline.
- **Section contract:** `LessonSection_Config` with vertically ordered content.
- **Ordered Resource blocks:**
  1. **text — currently rendered:** "One shape is long and thin. Another looks like steps. Which one covers more flat space? Don't decide from the border yet—what could we count inside?"
  2. **scene — typed/renderable, custom Scene proposed:** [Unit-Square Coverage Lab](./scenes/unitSquareCoverageLab.scene-spec.md), placement A. Show an outline around **rectangle R** (two rows of three unit cells) and **stepped region S** (rows with 3, 2, 1 unit cells, respectively). Before revealing filled unit cells, allow prediction: "Rectangle bigger", "Steps bigger", "Same coverage". The areas are **both six unit squares**. On "Reveal inside", show all six cells for each, plus a narrated/text count.
  3. **markdown — currently rendered:** "The **area** is the amount of **flat inside space** a region covers. Both shapes cover **six equal square cells**, even though their outside borders look different. Counting border segments is a different question."
- **Explanatory feedback:** If learner predicts stepped region is larger from its jagged edge: "The extra corners did not make extra inside squares. Count the spaces: six and six." If they predict the rectangle is larger because it looks longer: "Width alone is not the whole inside. Look at every equal square." For equal: "Yes: the six unit squares make the areas match."
- **Access and pacing:** Both outlines have ordered row-by-row cell lists; no shape color or border thickness conveys the area. The learner can reveal one row at a time in text or diagram, with direct reveal for reduced motion.
- **Planned Note after reveal:** "Area tells how much flat space a shape covers."

### Section 2 — One Tile for Every Cell

- **Purpose:** build an exact equal-square covering without gaps or overlaps.
- **Section contract:** `LessonSection_Config`, one vertical content stack.
- **Ordered Resource blocks:**
  1. **text — currently rendered:** "This rectangle has two rows of three empty squares. We have matching square tiles. Where will you put the next tile so **every square is covered exactly once**?"
  2. **scene — proposed:** [Unit-Square Coverage Lab](./scenes/unitSquareCoverageLab.scene-spec.md), placement B. Fixed region R occupies row 1 columns 1–3 and row 2 columns 1–3 on a labeled board. Choose one target cell via row and column buttons, then "Place tile"; the tile ledger updates **distinct covered cells**. An "overlap demo" deliberately places a second tile over an already covered cell while leaving another uncovered, with an explanatory invalid-coverage state. Exact complete outcome: **6 of 6 required distinct cells covered, 0 overlaps, 0 holes**, area six square units.
  3. **markdown — currently rendered:** "We used **six identical tiles** and covered six **different squares**. That makes **six square units of area**. If two tiles share a cell and another cell stays empty, the shape is not fully covered correctly."
- **Learner feedback:** On duplicated cell: "That cell already has a tile. A second tile does not cover a _new_ square. Try a different empty cell." On a missing cell: "We still see one empty square inside the region, so our covering isn't finished." On complete: "All six different cells are covered, one tile per cell, with no gaps."
- **Reflection checkpoint (not assessment):** Ask "Did we count six pieces of plastic or six _different covered unit squares_?" Reveal why the latter is necessary. No Quiz or mastery progress.
- **Navigation:** "Next empty cell", "Undo last placement", "Reset", optional guided row coverage; all controls have nonvisual equivalents.

### Section 3 — Different Outlines, Different Amounts?

- **Purpose:** compare area by common units rather than shape appearance.
- **Section contract:** `LessonSection_Config`.
- **Ordered Resource blocks:**
  1. **text — currently rendered:** "A rectangular region covers six unit squares. A stepped region also covers six. A shorter step-shaped region covers five. Which pair has equal area?"
  2. **scene — proposed:** [Unit-Square Coverage Lab](./scenes/unitSquareCoverageLab.scene-spec.md), placement C. Three fixed regions:
     - R: two rows of three = **6** cells.
     - S: staircase rows containing 3+2+1 = **6** cells.
     - T: two rows containing 3+2 = **5** cells.
       Allow "Count next cell" and "Compare" without showing totals until the chosen count is inspected. Correct relation **R=S>T** in area.
  3. **markdown — currently rendered:** "R and S each cover six **same-size squares**; they have **equal area**. T covers only five of those squares, so its area is **one square unit smaller**. We counted _inside cells_, not sides or corners."
- **Learner action and feedback:** If R and S are declared different by outline: "Different outline doesn't guarantee different area; both contain six identical cells." If T assumed larger because it has more corners: "Count its filled squares, not its turns." Show row-wise count and labelled region names in both visual and accessible modes.
- **Planned Note:** "Equal areas can have different outlines."

### Section 4 — Does Six Tiles Always Mean Six Square Units?

- **Purpose:** transfer the invariant and expose unfair counting.
- **Section contract:** `LessonSection_Config`.
- **Ordered Resource blocks:**
  1. **text — currently rendered:** "Look carefully: someone laid **six tiles**, but **two cover the same square**, and one square in the target is still empty. Have they covered a six-square area correctly?"
  2. **scene — proposed:** [Unit-Square Coverage Lab](./scenes/unitSquareCoverageLab.scene-spec.md), placement D. Fixed six-cell region R, initially six 1×1 tiles of which two occupy the same cell and one of the six cells remains empty. The **number of placed tiles is six**, but the **number of uniquely covered cells is five**. "Move overlapped tile to empty cell" gives exact coverage of six. Next demonstrate two 2×2 large tiles versus two 1×1 small tiles: the counts both equal two tiles, but the modeled covered areas are **8 versus 2 unit squares**, so raw tile count isn't a valid comparison across differently sized units.
  3. **markdown — currently rendered:** "Six tiles can be placed unfairly: an overlap counts a square twice and leaves a gap. To measure area, use the **same-size square unit** and count each **different covered square** once. Tiles of different sizes are different units."
- **Feedback:** Before repair: "Only five different unit squares are covered; one is still empty." After repair: "Each of the six is covered exactly once: six square units." For comparing large versus small tile counts: "Both have two pieces, but one piece is not the same area unit in both pictures." If the learner treats decorative grid lines as measured area: "Only the filled _regions_ between lines count."
- **Transfer:** Unseen four-cell L-shaped region (rows 3+1) with a selection of equal unit tiles; learner covers and explains "four square units", including the equal-unit rule. No scored correctness recording.

## CUSTOM SCENE SPECIFICATIONS

- [Unit-Square Coverage Lab](./scenes/unitSquareCoverageLab.scene-spec.md) — a **proposed** deterministic, prop-free Scene specification with four independent Section presets and equivalent cell-list interaction.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. Section 1 after six-cell comparison: "Area is the flat region inside the border."
2. Section 2 after full exact coverage: "Cover with equal square units, no gaps or overlaps."
3. Section 3 after comparing R and S: "Different outlines can have equal area."

Only short future Git-authored recall cues are planned. There is no verified Note type, unlock event, revision sheet, persistence or scheduling engine; do not present these as live UI.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Four-cell transfer and overlap diagnosis are **unscored formative** interactions. Assessment Architect can later create separately assessed regions with varied square-unit arrangements and distractors for border-versus-interior confusion, including nonvisual equivalent modalities; a single correct count does **not** prove durable mastery. Spaced retrieval is a future separately authorized feature.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Every learner-facing phrase, unit-square description, dynamic ledger, control, feedback and Note must be genuinely localized into supported locales with no missing-language fallback. RTL may reorder textual explanations but must **not** change cell counts, region topology or which shape is larger. All regions have a complete row-by-row cell inventory, explicit target/occupied/empty status, and keyboard/switch/touch methods to place one tile in a named cell. Visual color cannot be the only distinction between uncovered, overlapped and correct; status is labeled. Responsive scaling and reduced motion must preserve equal cells and all instructional content. A user without mouse, sight, audio or fast device must be able to reason and act equivalently, including when the Lesson is fully available offline after a successful download. WCAG 2.2 AA is a release target, not an implementation claim.

## PRODUCTION / PLATFORM DEPENDENCIES

Existing `text`, `markdown`, and `scene` Resource types are supported by the present Playground Section renderer. The custom grid Scene, genuine translations, local content assets, automated tests, Lesson publication and Note mechanism **do not exist**. A future Coding Agent must verify real Scene context and implement independently testable **prop-free public roots**, using internal helpers only. This editorial package adds no runtime `Lesson` config, React code, Question, Quiz, score or external service.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and its linked exact canonical area Skill source.
- Editor: check that the first comparison's 3+2+1 staircase shows **six** whole equal cells and no accidental disconnected or fractional area.
- Editor: check area-coverage feedback stays distinct from perimeter measurement; do not silently merge Skills.
- Brief remains Draft; Content/Scene are provisional, pending explicit approval.

## HANDOFF

Methodologist approves audience, area-unit model and scope first. Screenwriter/editor reviews all learner text and demonstrated states. Scene Designer can implement only after approval of the complete Scene spec; Assessment Architect defines any scored evidence separately. No production implementation is authorized here.
