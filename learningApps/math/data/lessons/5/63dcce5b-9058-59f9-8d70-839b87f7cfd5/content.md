# Classify Polygons by Sides and Corners — Lesson Content

Status: **Provisional Draft — pending Methodologist approval; not approved.**
Target Lesson: `learningApps/playground/Data/Lessons/1/classifyingPolygonAttributes/`
Audience: **Grade 2** (approximately 7–8), mixed readers, accessible trace/count controls
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Target Skills: `shapeAttributes.data.ts` linked in Brief; `identify2dShapes.data.ts` prerequisite only
Program dependence: None
Implementation state: editorial plan; custom Scene and runtime configuration do not exist.

## INSTRUCTIONAL CONCEPT

"**Count what makes the outline.**" Children already know a triangle and rectangle by sight. Now an unfamiliar slanted or uneven shape should be recognized by its **straight sides** and the **corners (vertices)** where two neighboring sides meet. We first test whether an outline is a polygon, then count, then classify. Deliberate nonexamples make properties visible. A shape may be stretched, recolored or turned without becoming a different _side-count class_, provided the boundary remains a **simple closed polygon** and its number of straight sides remains unchanged.

A **side** is a straight line segment along the outer boundary. A **vertex** is a joining point between consecutive sides; the final return to the first vertex does **not** create an extra vertex. For simple polygons, side count equals vertex count. All of the Lesson's polygon examples are non-self-crossing; classifications use 3, 4, 5 or 6 sides. Neither every quadrilateral nor every irregular polygon must be a rectangle.

## LEARNER JOURNEY

1. Inspect an unusual, rotated 4-sided shape. Before naming it, trace the boundary.
2. Confront open and curved boundaries: what counts as a polygon, and why?
3. Classify several unequal, turned outlines by counted attributes with a controllable highlighter.
4. Independently describe an unfamiliar five-sided polygon and reject one convincing-looking nonexample.

Avoid a repetitive shape-matching quiz. The key experience is a **traceable, explainable boundary** whose properties are visible whether visual, tactile or verbal.

## SECTION PLAN

### Section 1 — Which Marks Are Sides?

- **Purpose:** Separate straight outer sides from corners, decorations and placement.
- **Section contract:** `LessonSection_Config`, vertical sequence.
- **Ordered blocks:**
  1. **text — existing renderer:** "This shape is tilted and its sides are not all the same size. Is it still a four-sided shape? What would you count to find out?"
  2. **scene — existing type, proposed Scene:** [Polygon Outline Investigator](./scenes/polygonOutlineInvestigator.scene-spec.md), stage A: irregular quadrilateral in a clear non-crossing outline. Controls "Trace next straight side" / "Show next corner" reveal exactly four distinct boundary edges and four distinct meeting points; an internal dashed diagonal is **decoration** and can be hidden.
  3. **markdown — existing renderer:** "The **sides** are straight pieces of the outside edge. A **corner**, or **vertex**, is where one side meets the next. This outline has **4 sides and 4 vertices**. A line drawn _inside_ it is not an extra outer side."
- **Action and feedback:** Invite children to name each edge 1–4 as it lights up or appears in a textual list. If they count the dashed diagonal: "That line goes through the inside. We count only the outside outline." If they count five corners: "We came back to the **starting corner**. It does not become a new corner."
- **Navigation/access:** Child-controlled reveal, large buttons, read-out vertex list and alternative ordered description. No exact dragging or color-only highlight.
- **Planned Note:** "Sides are the straight parts of the outside edge."

### Section 2 — Is It a Polygon?

- **Purpose:** Learn the boundary condition before sorting by side count.
- **Section contract:** `LessonSection_Config`, vertical sequence.
- **Ordered blocks:**
  1. **markdown — existing:** "A **polygon** is closed and made only of straight sides. The sides join end to end without crossing. A shape can be flat and closed without being a polygon."
  2. **scene — proposed:** [Polygon Outline Investigator](./scenes/polygonOutlineInvestigator.scene-spec.md), stage B, side-by-side selection **within one Scene** (the Section itself remains one column): an upright closed triangle, an **open** two-segment path that nearly looks triangular, a circle and a closed irregular quadrilateral. Learner reveals whether each satisfies **straight? closed? no crossing?**
  3. **text — existing:** "The circle is a flat shape, but its boundary curves. An open zigzag has straight pieces, but the ends do not join. Both fail the polygon rule."
- **Predictions and feedback:** For circle chosen as polygon: "It is closed but not made from straight sides." For open path chosen: "Follow the path from its end: it does not return to the start." For valid triangle: "Three straight segments join into one closed outline."
- **Boundary:** Never imply any flat/closed shape is a polygon; exclude self-crossing examples at this level rather than silently grading them as ordinary polygons.

### Section 3 — Four, Five, Six: The Shape Can Look Different

- **Purpose:** Classify by the invariant number of sides and vertices.
- **Section contract:** `LessonSection_Config`, vertical sequence.
- **Ordered blocks:**
  1. **text — existing:** "A pentagon can be very uneven. Can you still find **five** outside sides? Turn it and check what stays the same."
  2. **scene — proposed:** [Polygon Outline Investigator](./scenes/polygonOutlineInvestigator.scene-spec.md), stage C. Start irregular pentagon with vertices (1,1), (4,1), (5,3), (3,4), (1,3) in _local diagram units_, five distinct straight edges closing to the first. Trace 1→2→3→4→5→1; turn whole outline by a preset 90° and recount. Switch between **triangle 3/3**, **irregular quadrilateral 4/4**, **irregular pentagon 5/5**, **simple hexagon 6/6**. Each result gives count and category; shape names are introduced only _after_ the learner can justify them.
  3. **markdown — existing:** "Turning did not add an edge. The five outside edges still meet at five vertices: that is a **pentagon**. A polygon with three sides is a triangle, with four is a quadrilateral, with six is a hexagon."
- **Feedback and contrast:** If user calls irregular pentagon "not a pentagon" because the sides are unequal: "Pentagon means five straight sides that make a simple closed outline; those sides do **not** have to be equal." If someone chooses "6" from the duplicate start corner, show an ordered ledger of five _unique_ vertices.
- **Proposed Note:** "For a simple polygon, sides and vertices come in matching counts."

### Section 4 — Explain, Don't Just Guess

- **Purpose:** Transfer to an unfamiliar drawing and explain a near-miss.
- **Section contract:** `LessonSection_Config`, vertical sequence.
- **Ordered blocks:**
  1. **text — existing:** "Here are two shapes we have not traced yet. One is a closed figure with five straight sides. The other looks almost the same but has one gently curved edge. Which one is a pentagon, and how can you prove it?"
  2. **scene — proposed:** [Polygon Outline Investigator](./scenes/polygonOutlineInvestigator.scene-spec.md), stage D. Use a novel five-sided non-self-crossing outline and a same-layout mixed straight/curved boundary. Provide "Trace sides", "Read the outline" and non-scored "Explain" prompts. The clear polygon has 5 sides/5 vertices; the near-miss **is not a polygon**, even if its outline has five visible meeting marks.
  3. **markdown — existing:** "Check the rule **before** counting. For the first, five straight sides close the shape. In the second, a curved part breaks the rule. Looking almost like a familiar polygon is not enough."
- **Feedback:** Wrong choice gets explanatory evidence from boundary segments. Alternative expressive response: select attributes ("closed", "all straight", "five sides") or describe verbally; no typing or speech required.
- **Independent transfer:** Find a closed shape in a room or drawing, trace its outline with a finger (optional), or use an accessible described outline. Ask for property evidence rather than an object-name guess.

## CUSTOM SCENE SPECIFICATIONS

- [Polygon Outline Investigator](./scenes/polygonOutlineInvestigator.scene-spec.md) — editorial definition of a prop-free, stateful trace/classify tool with counterexamples and independent nonvisual modes.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. "Count straight outside edges, not lines inside." Proposed after the Section 1 diagonal challenge.
2. "A simple polygon is a closed outline of straight sides." Proposed after Section 2 nonexamples.
3. "A simple polygon has as many vertices as sides." Proposed after Section 3 comparison.

These are future short recall cues; Note IDs, events, learner storage and automated review scheduling are **not** claimed to exist.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 supplies unscored transfer and explanatory feedback. A future Assessment Architect can vary drawing orientation, irregularity, color and distractor curved/open outlines; the assessment must check reasoned classification rather than memory of showcased shapes. Do not assign points or mastery here.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All terms ("side", "corner", "vertex", "closed", "straight", "polygon") need authentic age-appropriate translations; when a language uses distinct everyday and technical terms, explain both without untranslatable idioms. RTL changes reading/presentation order but **must not** invert the polygon's topology or the order of its actual boundary vertices. A numbered edge list with lengths/relative directions is a nonvisual equivalent to tracing. Controls offer "next edge", "previous edge" and "read all" instead of requiring precise pointer movement. Use shape/number status rather than hue, announced state changes, reduced motion, focus/contrast/touch accessibility, and offline-resident vector diagrams and content for every locale.

## PRODUCTION / PLATFORM DEPENDENCIES

- `text`, `markdown`, `scene`: supported by the present generic Lesson Section renderer.
- Polygon Outline Investigator: **proposed, not implemented**. Requires tested prop-free scene composition and real locale context.
- Avoid embedding dynamic textual labels into SVG path data. No invented platform API, Question, Quiz, scoring, replay analytics or publishing pipeline.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and its canonical Math Skill source.
- Editor: confirm whether 5- and 6-sided irregular examples are manageable at Grade 2 with the supplied tracing scaffold.
- Editor: confirm that the curved-edge near-miss is pedagogically clear and does not confuse side-counting with category membership.
- Content and Scenes **provisional** until Methodologist approval.

## HANDOFF

Methodologist approves scope and grade; Screenwriter/editor validates exact shape outlines and feedback; Scene Designer implements only after Scene specification approval; Assessment Architect separately prepares scored questions if desired.
