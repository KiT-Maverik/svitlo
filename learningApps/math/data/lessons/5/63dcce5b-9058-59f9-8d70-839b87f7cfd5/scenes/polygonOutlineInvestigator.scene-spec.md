# Polygon Outline Investigator — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Classify Polygons by Sides and Corners](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md) — identify simple polygons, count sides and vertices, classify by count; no invented new Skills.

## LEARNER PURPOSE AND CONCEPT

The child should **inspect a boundary rather than trust appearance**. One operation traces straight outer edges, one highlights distinct vertices, and another tests **straight**, **closed** and **non-crossing** conditions. These actions yield an evidence-based polygon classification rather than a guessing game.

Learner voice: "**It has to be a closed outline of straight sides. I count each side and corner once.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- A **simple polygon** is a non-self-crossing closed chain of at least three straight segments meeting end-to-end. Each vertex is shared by two neighboring sides. Polygon class by count: triangle (3/3), quadrilateral (4/4), pentagon (5/5), hexagon (6/6).
- For any closed simple polygon, distinct side count = distinct vertex count. The initial vertex at the end of a trace is **not** counted again.
- Circle and smooth curved boundary are **not polygons**. An open chain of straight segments is **not a polygon**. An interior dashed divider is not an additional outer side.
- Distinguish non-examples with a violated rule, not blanket "wrong shape" messages. Exclude self-intersecting chains from beginner classification except as a non-target diagnostic if editor approves.
- Geometry uses diagram-local arbitrary units; no measurement or perimeter/area formula is implied. Whole-shape rotation preserves edges, vertices, closure and category. If vertices are moved, the resulting outline must stay non-self-crossing and keep edge count; otherwise reject that edit and explain.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A. Trace an Unusual Quadrilateral (Section 1)

1. Draw an irregular four-vertex shape using (1,1),(4,0),(5,3),(2,4), connected in that order and back to (1,1). The entire outline is closed and simple. An optional dashed diagonal from vertex 1 to 3 is labeled **inside decoration / not a boundary edge**.
2. Prompt: "There are lines inside this drawing. Which lines are the **outside sides**? Trace them in order."
3. "Next side" highlights edge 1→2, 2→3, 3→4, 4→1. "Next vertex" marks V1,V2,V3,V4 exactly once; returning to V1 displays "back to the starting corner", not "vertex five".
4. Reveal "**4 sides, 4 vertices**" after tracing. Feedback if selecting dashed divider: "It is inside, not part of the closed outline." If counting return V1 twice: "We came back to the **same** starting corner."

### B. Test the Polygon Rule (Section 2)

1. Offer four known items with short descriptive names: (a) closed straight triangle, 3 sides/3 vertices; (b) open zigzag with **two** straight segments and **three** points (not closed); (c) closed circle, one continuous curved boundary (not straight); (d) the closed irregular quadrilateral from A.
2. Prompt: "Which outlines count as polygons? Check **straight**, **closed** and **not crossing**." Provide explicit three-part rule for each, e.g. triangle: yes/yes/yes, circle: no/yes/yes, zigzag: yes/no/yes.
3. Selection/reveal includes reason: circle is not polygon because curved; zigzag not polygon because open; two closed straight shapes are polygons. The circle is not called "one-sided polygon".
4. An accessible text list and binary rule-status controls carry the same evidence as boundary tracing. Reset returns all rule checks to unrevealed.

### C. Invariant Counts and Rotation (Section 3)

1. An unfamiliar irregular **pentagon** has exact vertices (1,1),(4,1),(5,3),(3,4),(1,3). Its straight edges are consecutive; no edges cross. Trace 1→2→3→4→5→1 to reveal **5 sides / 5 vertices**.
2. "Turn shape 90°" applies **rigid rotation** to all vertices about their centroid; counts remain 5/5. "Make it bigger" uses uniform scaling only, also keeping count and shape class. These are descriptive modeling operations, not pixel assumptions.
3. Preset gallery: triangle 3/3; quadrilateral 4/4; above pentagon 5/5; non-crossing hexagon vertices (2,0),(4,1),(5,3),(4,5),(2,5),(0,3), 6/6. Each has a plain-language description of boundary segment sequence.
4. Prompt: "Some sides are short and some long. Does that change how many sides there are?" Feedback: "No. Side **length** changed; number of connected straight sides did not."
5. If an exploratory vertex control is offered, use discrete "move selected vertex" and reject crossing/overlap with feedback. No free-drawing mode is required, and **never** permit an invalid polygon while still labeling it simple.

### D. Independent Proof or Counterexample (Section 4)

1. Present one new simple closed five-sided polygon (not exactly the pentagon from C; use noncrossing vertices e.g. (0,1),(2,0),(5,2),(4,5),(1,4)) and one closed five-piece outline with one genuinely **curved** boundary edge.
2. Ask: "Which is a polygon with five straight sides? Tell us how you know." Reveal rule-test statuses and numbered outer-side ledger on demand.
3. Valid first: 5 straight edges, closed, no crossing → pentagon. Curved-edge near-miss: closed but **not all straight**, therefore not polygon irrespective of visible corner count.
4. Feedback never depends on a typed paragraph: an accessible sequence of attribute choices "closed", "all straight", "five sides" can express the same reasoning. Provide an explicit hint for first missing condition without leaking a mark/score.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** outline path, numbered outside edges, distinct vertex dots, optional internal dashed line, one boundary-type rule ledger, category label only after reveal, rotate/scale/trace/back/reset controls.
- **State:** selected preset shape, trace index within 0…edgeCount, last highlighted edge/vertex, rule checks shown, chosen prediction, optional rotation (0°/90°/180°), optional proportional scale, locally revealed classification.
- **Invariant:** closed path connects last point to first; number of **unique** vertices is n; side count n; trace index cannot count repeated initial point twice; view transforms do not mutate topology.
- **Nonexamples:** open chain stays open despite nearly touching endpoints; curved edge stays curved; don't silently coerce an invalid shape to a polygon.
- **Prop-free roots:** each authored Section placement is an independent Scene entry/state/preset; internal common helpers may be shared, but exported roots take no props. Actual Scene locale values use verified context, never a guessed API.
- **Controls:** numbered buttons offer trace and explanation alternatives to drag; if a touch trace is added it is supplementary. Give immediate reasoned feedback, not penalties or hidden scoring.

## VISUAL / AUDIO / MEDIA DIRECTION

Clear single-color stroke geometries with distinct dashed interior line; thin corners should receive big focusable hit targets without pretending those are added vertices. An animated tracing line may help but is pausable and reduced-motion compatible. A rigid rotation retains all boundary geometry. Do not use aesthetically rounded polygon corners if that obscures "straight sides"; use minimal SVG and accompanying descriptions, not decorative illustrations.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Localize "side", "vertex/corner", "closed", "open", "straight", "curved", "polygon", category names, statuses, prompts and all accessible labels. Introduce everyday "corner" then mathematical "vertex" where translations permit.
- **RTL does not reverse topological membership.** Outer edge traversal can be numbered from a clearly marked start and proceed in one documented direction independent of interface reading direction; both are valid if ordered consistently. Textual side logs always match actual diagram.
- Every important shape has a nonvisual structured description: "closed shape with five straight edges, five vertices; edges join without crossing". This description must be sufficient for the same concept checks. Provide independent button controls and predictable focus, avoid color-only yes/no and pointer precision.
- Use responsive diagrams, labels that scale, no tiny edge controls, reading-order clarity, instant reduced-motion changes and fully local/offline assets after download.
- WCAG 2.2 AA testing and screen-reader behavior are release requirements, **not verified implementation**.

## ACCEPTANCE SCENARIOS

1. The irregular quadrilateral has exactly **4 outside sides / 4 unique vertices**; a dashed diagonal is not counted as a fifth side.
2. Closing a trace at its first vertex does **not** increase vertex count.
3. The closed triangle satisfies polygon checks; the open zigzag fails closure; the circle fails straight-edge requirement.
4. The pentagon's ordered five vertices and edges remain 5/5 after 90° rotation and uniform scaling.
5. The six provided hexagon vertices connect into a non-self-crossing simple closed polygon with 6/6 counts.
6. Independent five-sided example is a polygon; matching curved-edge near-miss is not, with a specific explanation.
7. If edits would cause edge crossing, reject the edit or leave that mode disabled; never claim invalid geometry meets the simple-polygon rule.
8. Keyboard, switch, screen reader, RTL, mobile, 200% text, reduced-motion and post-download offline alternatives preserve the same property evidence.
9. Reset and revisiting a separate placement do not leak revealed counts/choices across Sections.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The Lesson renderer handles a `scene` block, but this bespoke Scene **does not exist**. Scene Designer must implement and test it only after editorial approval, with real localized strings, no props and explicit nonvisual equivalent. Editor to review irregular five- and six-sided outlines and optional non-crossing vertex controls. No Question/Quiz, mastery, Note persistence or fabricated event contract.
