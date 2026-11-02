# Point and Line Explorer — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson: [Points, Lines and Segments Content](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md), two separately meaningful Skills: recognize points/line types and construct/label a straight segment. This is a proposed instructional tool **not an extra Skill**.

## LEARNER PURPOSE AND CONCEPT

Children are usually shown finite ink marks, which can misleadingly look like the mathematical objects themselves. Here they _change marker size without moving the point_, explore three fundamentally distinct path types, switch between a full straight-line **representation** and finite segment AB, then **construct** a new labeled segment. At each stage the learner predicts a difference, manipulates the model, sees the exact changed property and explains it.

Learner-facing invariant: "**A drawn dot shows where a point is. A straight line keeps going. A segment is the straight part between two endpoints.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- A **point** has a position but no size. Marker discs may have arbitrary visible radius `r>0`; changing `r` does **not** change center position. Display pixels are _not_ geometric length or point size.
- An ideal **straight line** extends without endpoints in two directions; it is represented by a finite straight stroke with two continuation arrows, explicitly labeled "continues beyond picture". Those arrows indicate extension, **not endpoint dots**.
- A general **curve** need not be straight or a chain of straight segments. Use a genuinely curved SVG path in stage B, not many segments secretly presented as a proof of straightness.
- A **polygonal chain** consists of consecutive straight segments joined end-to-end; in this Lesson use one open **two-piece** chain with a visible bend at C.
- A **segment AB** includes its two **distinct** endpoints A and B, is straight between them and has a finite length equal to the straight-line distance. **AB = BA** as an _unoriented geometric segment_. Distinguish from arrows at ends of a drawn line. A bent route A→C→B with C not collinear with A,B is not AB.
- All coordinates are **diagram-local model units**, not centimeter lengths or formal coordinate-plane learning targets. No exact motor drawing or screen calibration. Do not introduce rays, angle measure, parallel/perpendicular Skills or length computations as goals.
- A single finite drawn piece cannot display an infinite line in full; explicitly teach it is a **model**, not literal completion.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Placement A: Same Point, Bigger Dot (Section 1)

1. Initial: marked point **A** centered at (2,2), small dot radius `r=0.1`; label A available. Prediction prompt: "If its marker gets bigger, does the point move?"
2. Two distinct actions: **Enlarge dot** changes radius to `r=0.3`, center stays exactly (2,2). **Move A** later changes center to (4,2), radius stays at chosen setting.
3. Show before/after state text: "A remained at same position; only marker size changed" versus "A changed position to the right". Children can compare both without seeing screen coordinates.
4. If child predicts "position changed" for enlargement: "The center of the mark did not move." If they predict "same" for actual movement: "The center moved; that indicates a different location."
5. Reset restores center (2,2), small radius and unrevealed prediction. No drawing size becomes an actual geometric measurement.

### Placement B: Straight, Curved, Piecewise Straight (Section 2)

1. Display three accessible, explicitly **different** models with text labels hidden until inspection: (a) one straight stroke across canvas with **continuation arrows at both ends**; (b) a single smoothly curved arc with a different tangent direction at different points; (c) polyline from A=(1,2) through C=(3,3) to B=(5,2).
2. Prompt "Which can keep going straight? Which bends smoothly? Which joins two straight pieces at a corner?" Selection available as **buttons/list**, not mandatory clicking thin paths.
3. **Inspect edge/path** reveals: (a) direction constant; full ideal line continues outside drawing, no displayed endpoints; (b) curved path changes direction **smoothly**; (c) first straight A→C and second straight C→B, with an abrupt directional change at C.
4. Misconception feedback: "Both pieces are straight, but their joined route is **not one straight line**" if chain was chosen as full straight line. If curve chosen, say "The path bends." Do not call an entire polyline a segment.
5. Trace controls "Next piece", "Read model", "Reset". The textual equivalent includes endpoints/joints and model limitations; no motion-only line tracing.

### Placement C: A Segment Ends (Section 3)

1. Fixed labeled points A=(1,2), B=(5,2). "Show **ideal line**" draws one straight stroke through A and B with arrows beyond both, representing endless extension.
2. "Show **segment AB**" displays **only** the straight path from (1,2) to (5,2), **both endpoint dots filled**. "Beyond A/B" regions are hidden.
3. "Swap label order" names the exact same path **BA**, with no change to endpoints, geometry, state length or direction. Explain equality of _unoriented segments_; do not imply an instruction route A→B equals a directed move B→A.
4. "Show bent alternative" draws A→C→B where C=(3,3), distinct from the straight AB. Both paths share endpoints but not interior geometry or length. The bent path must be clearly marked "**not segment AB**".
5. Prompts: "Does AB include the two dots?", "Do the arrows belong to the segment?", "Does swapping the order of the letters move the line?" Feedback explains the relevant inclusion/limitation, not a binary colored grade.
6. Text summary after reveal: "The straight segment includes endpoints A and B. It stops at both. The extended line continues in both directions."

### Placement D: Build AB (Section 4)

1. Draw a **5×5 discrete position board** as an optional coordinate selection aid (internal positions 0…4 on both axes); initial construction preset **A=(1,1), B=(4,3)** with endpoints distinct. Do not teach Cartesian coordinates here; visible controls describe positions as board row/column or named dots, with a matching textual list.
2. Learner may choose new A and B positions using two row/column selectors, then presses "Mark endpoints". Attempt to set B equal A gets: "Choose two _different_ positions so we can make a finite segment with two distinct endpoints." No silent fallback point moves.
3. "Connect straight" draws exact straight stroke between A and B; "Connect via C" places C=(2,4) or another explicitly **off-line** position and creates two-piece route A→C→B. This is a deliberate wrong construction **not** a scored trap.
4. "Name AB" / "Name BA" buttons show identical straight segment for either label order. Prompt learner to explain: "Same endpoints, same straight piece."
5. Independent transfer preset: choose new points A=(0,3) and B=(3,0), with prior answers cleared, and invite a straight connection. Compare with path via (0,0): two straight pieces, not AB. The learner can review an ordered ledger and reset to blank.
6. An incorrect choice generates descriptive feedback: endpoints, straightness and presence of a bend. A correct construction generates the reason, not a score or persistent completion claim.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** visible marker discs with fixed center, straight continuation arrows, smooth curve, polygonal chain, named endpoints, optional grid-based point-position selector, straight-connect and bent-route controls, annotated text ledger.
- **Per-placement state:** independent preset type A/B/C/D fixed editorially; selected object/path, center/radius for marker (A only), display mode line vs segment vs bend, selected endpoint positions, chosen prediction and reveal step. User-visible data comes from real locale context.
- **Geometry invariant:** marker radius never mutates center; an ideal line has no mathematical endpoints; segment stroke between A and B is straight and includes endpoints; AB and BA are same unoriented segment; changing drawing size does not create a new point.
- **Bounds:** coordinates remain on local board; two endpoints must be distinct; C bent-path preset cannot lie on segment AB. The scene must not use SVG scale/pixel size as centimeters.
- **Reset:** restore _that Section placement_ to its original model and unrevealed state, with no leakage from another Section. Each exported Scene root is **prop-free**; implementations may share private helpers while independent roots define their own initial presets. Do **not** introduce a guessed `mode`, `data`, `direction`, `locale` or `onChange` public prop.
- **Controls:** native labeled buttons/list/radio selections, keyboard and switch accessibility equal to any optional pointer exploration. Every revealing action updates a readable state log without requiring visual arrow interpretation.
- **Pedagogical feedback:** one actionable reason, hint/retry and optional reveal; no score/Quiz/mastery calculation, correct-answer secrets, timers, storage or external event schema.

## VISUAL / AUDIO / MEDIA DIRECTION

Use clean SVG/HTML with high-contrast thin but scalable model strokes and **large independent click/touch targets**. Dot-marker enlargement must not look like a move; use a center guide marker plus explicit text. The ideal straight line is shown with arrows extending beyond cropped drawing, not cap-like endpoint dots. Curved path should remain smoothly curved; polygonal chain shows exactly one visible kink. Straight segment AB must never be rendered with continuation arrows. Optional reveal animation is controlled and disappears under reduced-motion preference; content does not depend on animations.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All labels, model descriptions, prediction choices, explanations, feedback, optional audio/transcripts, shape aliases and Note cues require genuine supported-locale translation without English fallbacks. In RTL layout, preserve geometrically meaningful endpoint inclusion and arrows in **both** continuation directions; do not invert AB and BA claims or assign mathematical direction from reading order. Give a nonvisual list describing each path's defining features and point positioning; before reveal, avoid naming the answer as a secret but provide enough objective attributes to reason. Controls must support keyboard/switch/touch and 200% zoom, explicit focus, WCAG 2.2 AA, reduced motion and no color-only meaning. All assets and logic must be available offline after selected language/lesson download; offline delivery is a future requirement, not established functionality.

## ACCEPTANCE SCENARIOS

1. Enlarging marker radius for A centered (2,2) does not change its position. Moving it to (4,2) changes position, irrespective of marker size.
2. The "ideal straight line" has **both** continuation arrows and no _mathematical_ endpoints; its finite picture is not claimed physically infinite.
3. Smooth curve and two-piece A→C→B chain with C=(3,3) are distinct from one straight line.
4. Switching extended line to segment AB keeps endpoints A=(1,2), B=(5,2) and removes all portions beyond them.
5. BA and AB give **exactly the same** straight segment geometry, including endpoints; a bend via (3,3) is explicitly **not** AB.
6. For A=(1,1), B=(4,3), "Connect straight" produces exactly one straight path. B=A is rejected as outside the intended **two-distinct-endpoints** construction.
7. Two-piece transfer via C=(0,0) for A=(0,3),B=(3,0) is not the straight segment between endpoints.
8. Independent Section placement resets do not leak point positions or predictions; UI remains prop-free.
9. Keyboard, screen-reader, RTL, reduced-motion, mobile, large-text and post-download offline modes preserve the same geometric truth and feedback, with no mandatory fine-precision drawing or color interpretation.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Current `scene` Resource and generic renderer provide a place for such a component, **not the component itself**. Coding Agent later verifies localization provider/context, Section placement, Math SVG models, deterministic tests and offline packaging; Scene Designer requires an **approved** Scene specification first. Editorial decision pending on whether optional segment-length _description_ should be allowed; no centimeter output is part of this Lesson. No Question, Quiz, Score, Note unlock API, persistence or external action invented here.
