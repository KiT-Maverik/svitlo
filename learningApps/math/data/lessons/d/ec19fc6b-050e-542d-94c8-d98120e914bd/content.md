# Points, Lines and Segments — Lesson Content

Status: **Provisional Draft pending Methodologist approval — NOT Approved**
Target Lesson: `learningApps/playground/Data/Lessons/1/pointsLinesAndSegments/`
Audience: **Grade 2**, approximately ages 7–8; early/mixed readers; equivalent touch, keyboard/switch and nonvisual participation
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: distinguish geometric point/straight line/curve/polygonal chain; distinguish infinite straight line from bounded segment; construct and label a straight AB segment between two points; explain the role of endpoints and straight-line length.
Target Skills: `linesAndPoints.data.ts` and `segment.data.ts`, linked directly in the Brief; do not merge or redefine either Skill.
Program dependence: None
Implementation state: **editorial only**. A `scene` Resource is renderable in the current generic Section renderer, but the proposed Scene has not been implemented.

## INSTRUCTIONAL CONCEPT

**"A dot shows where. A line keeps going. A segment starts and stops at two points."** Start with a familiar pencil mark and challenge the assumption that the ink itself _is_ a perfect geometric object. Children predict what a drawn mark represents, trace alternative paths, then produce an exact straight segment AB. A point does not become larger when its display dot is enlarged; a mathematical straight line does not terminate because its picture is cropped. A segment has two named endpoints and a finite straight-line span; the learner can construct it without a touchscreen pencil.

The Lesson proceeds from recognition to investigation to construction, never relying on remembering a name alone. Keep each Section short and active. No points, correctness records, timed performance or hidden mastery flags.

## LEARNER JOURNEY

1. Notice that a visible **dot** indicates a **position**, and its size is just drawing ink.
2. Trace a straight, a bending and a broken straight-piece path; learn what an ideal infinite line means in a finite picture.
3. See that fixed **endpoints** bound a segment and distinguish it from an arrow-continued straight line.
4. Build segment AB from labeled points, then reconstruct with reversed labels and distinguish it from a curving route between the same endpoints.

## SECTION PLAN

### Section 1 — Can a Point Be Big?

- **Learning purpose:** separate geometric position from the size of its visible marker.
- **Current shape:** `LessonSection_Config`; one vertical ordered content column.
- **Ordered Resources:**
  1. **text — existing renderer:** "This dot stands for a point named A. If I draw the dot much bigger, have I moved A or made the mathematical point wider? Choose what you think."
  2. **scene — contract and generic renderer available, custom Scene proposed:** [Point and Line Explorer](./scenes/pointAndLineExplorer.scene-spec.md), stage A. A dot centered at diagram position (2,2) changes from small to large mark while its exact center remains (2,2); a second dot at (4,2) shows a genuinely different position. Two prediction actions: "same point" and "new position".
  3. **markdown — existing renderer:** "A **point** tells us _where_. We draw a dot so we can see it, but a geometric point itself has **no width or thickness**. A bigger dot can mark the **same** point A. Moving the center to a new place marks a _different_ position."
- **Explanatory feedback:** If "new position" for a bigger dot: "Look at the dot's center. The center stayed exactly where A was. Only the ink got bigger." If A moves from (2,2) to (4,2): "Now the center moved, so the marked position changed." No metric coordinates appear in the child's text.
- **Interaction and access:** "Enlarge marker", "Move marker", "Read point positions", "Reset"; no precision touch needed. Nonvisual state: "Point A stays in the same place; its marker grew." Reveal only after prediction. A simple localized Note about a point as a position is **planned**, not implemented.

### Section 2 — Straight, Curved, or Made of Segments?

- **Learning purpose:** identify line types by their actual continuity/geometry.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — existing:** "Three paths join places on the page: one stays straight, one bends smoothly, and one turns at a sharp join. Which is the straight path? Which is a curve? Which is built from straight pieces?"
  2. **scene — proposed:** [Point and Line Explorer](./scenes/pointAndLineExplorer.scene-spec.md), stage B, with selectable models: (a) straight line-like trace across canvas, continuation arrows on both ends; (b) smooth bending curve without straight-piece joints; (c) open polygonal chain A→C→B with two segments meeting at C. Show exact text descriptions, trace segments with "Next piece" and label the joint.
  3. **markdown — existing:** "A **straight line** never bends and, in mathematics, extends past both ends of any drawing. The two arrows show **continuation**, not end points. A **curve** can bend smoothly. A **polygonal chain** is made of straight pieces joined end-to-end."
- **Prediction/feedback:** Selecting the broken path as straight: "Each piece is straight, but the **whole path turns at C**. It is a chain of straight pieces, not one straight line." Selecting the curve: "This path changes direction smoothly." Correct: "The arrow-ended trace models one straight line." Explain that every screen drawing is finite even when it represents an infinite line.
- **Boundary and access:** Do not introduce a ray as a formal target or claim every curve is wavy. A screen reader gets three ordered path descriptions and a list of their components. Keyboard toggle moves selection and reveals descriptions, never requiring pointer tracing.

### Section 3 — Where Does a Segment Stop?

- **Learning purpose:** contrast an unbounded mathematical line with a bounded straight segment.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — existing:** "On the same straight path, two marked points are A and B. Does the **segment AB** include the places beyond the points? What happens if we switch the names to BA?"
  2. **scene — proposed:** [Point and Line Explorer](./scenes/pointAndLineExplorer.scene-spec.md), stage C. A and B are fixed at diagram (1,2) and (5,2). "Show full line" renders continuation arrows both ways, "Show segment AB" leaves **only** the straight piece between endpoints, with two filled endpoint marks. "Swap order of labels" displays BA for **same** segment. "Show bent alternative" renders a two-piece route A→(3,3)→B and explicitly labels it **not** the straight segment AB.
  3. **markdown — existing:** "A **segment** starts at one endpoint and ends at the other, **including both**. Segment AB and segment BA name the same straight piece. Between the same points, a bent route is a different path. The segment's **length** is the straight distance from A to B."
- **Explanatory feedback:** If child says arrows are part of AB: "The arrows belong to the drawing of a whole line. AB ends at its two marked points." If says BA is different: "The endpoints are the same; we just named them in the opposite order." If child chooses bent route: "It visits the endpoints but changes direction at a middle point, so it is not the straight segment."
- **Access:** Text list identifies included endpoints and which path spans the two markers. The semantic difference is available without seeing arrows. Suggested future Note: "A segment is the straight piece between two endpoints."

### Section 4 — Make Your Own AB

- **Learning purpose:** independent construction and explanation of a finite straight segment.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — existing:** "Place A and B in **different** places. Make **one straight segment** from A to B, then label the two endpoints. Would BA show a different segment?"
  2. **scene — proposed:** [Point and Line Explorer](./scenes/pointAndLineExplorer.scene-spec.md), stage D. Provide discrete position buttons on a 5×5 board to choose A at (1,1), B at (4,3) as starting preset; learner can select alternate distinct grid positions. "Connect straight" draws a single straight AB; "Connect via third point" produces visibly bent A→C→B if C lies off the straight span and asks the learner to identify it as **not** AB. "Switch name AB/BA" preserves the geometry. Show the two endpoint labels and text.
  3. **markdown — existing:** "You chose two distinct endpoints. Exactly **one straight segment** connects them. It does not matter which end you name first: **AB = BA** as geometric segments. We can find its _length_ later by measuring between the ends."
- **Independent transfer:** New, unlabeled endpoints are offered without hints. Learner assigns labels, chooses straight connection and says why a two-part bend is not the same segment. For a coincident A/B selection, explain that **this Lesson needs two distinct endpoints** and ask learner to move one; do not silently generate a nonzero segment.
- **Feedback and progression:** The Scene reveals conceptual reasons, not numeric lengths or scoring. A child with no drag facility completes via labeled position controls. Optional physical paper-and-pencil extension is not required for equivalent online/offline learning.

## CUSTOM SCENE SPECIFICATIONS

- [Point and Line Explorer](./scenes/pointAndLineExplorer.scene-spec.md) — one custom editorial Scene specification, with four **independent prop-free placement presets** corresponding to Sections 1–4.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 marker-size contrast: "A point gives a position; a dot is its drawing."
2. After Section 3 line/segment contrast: "A segment is straight and has two included endpoints."
3. After Section 4 AB/BA reveal: "AB and BA name the same segment."

These are potential Git-authored Note texts, not an invented Note API, unlock event, user persistence or spaced-scheduling implementation.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The unseen A/B construction is **unscored** independent transfer. A future Assessment Architect should separately assess conceptual line-type discrimination and segment construction (the two canonical Skills), with alternative input modes and clear outcome evidence; a single solved challenge is not mastery. Later measurements are deliberately outside this Lesson and may retrieve the segment idea.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all terms and feedback genuinely into every configured locale. Distinguish the everyday "line" from mathematical straight line; do not assume English suffix conventions translate literally. Treat AB/BA as geometric labels, with accessible names rather than relying on reading direction. The diagram's arrows signify continuation in **both** directions for any LTR/RTL context; never mirror mathematical claims while mirroring UI. All model states have a semantic list describing point locations, path continuity, and endpoint inclusion. Labeled keyboard/touch controls and focus navigation replace drag and pressure-sensitive drawing. Fit narrow screens, support reduced motion, adequate targets/contrast, 200% text, nonvisual operation and full content/feedback offline **after download**.

## PRODUCTION / PLATFORM DEPENDENCIES

The generic renderer currently supports `text`, `markdown`, `scene`; **Point and Line Explorer does not exist**. Future Coding Agent must verify lesson-local locale context and implement distinct prop-free Section roots, deterministic geometry, tests, semantic alternatives and offline assets. Do not invent a reusable Scene prop API, Lesson registry, timed state or Question data. Audio is optional if genuinely localized with transcripts.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), canonical line-type and segment Skill source files linked there, and repository Studio Lesson/Scene contracts.
- Editor: approve whether using a polygonal chain with a single bend is enough evidence for the canonical chain concept; no ray as a separate outcome.
- The Brief is **Draft**; Content and Scene specifications are **provisional Drafts**.

## HANDOFF

Methodologist confirms target Skills, grade, progression and bounds before formally approving. Screenwriter/editor reviews all exact phrases and representations. Scene Designer receives the scene spec only after editorial approval; a separate Assessment Architect owns any scoring or mastered-skill decisions.
