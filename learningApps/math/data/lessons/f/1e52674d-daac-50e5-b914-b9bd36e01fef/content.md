# Recognize Solids by Their Surfaces — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation.**
Target Lesson: `learningApps/playground/Data/Lessons/1/identifyingSolidFigures/`
Audience: **Grade 2**, approximately 7–8 years, mixed reading and access needs
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: distinguish 3D objects from 2D depictions; identify basic solids by flat and curved surfaces, bases, faces and corners; recognize cube as a special cuboid; explain classification across viewpoints.
Target Skills: **`identify3dSolids.data.ts`** as linked directly in the Brief, not a new observation/rotation Skill.
Program dependence: None
Technical status: Only this Screenwriter document and an unimplemented custom Scene proposal; no runtime Lesson data, real React components or assessment.

## INSTRUCTIONAL CONCEPT

**"Look for the surfaces, not just the picture."** A ball can look like a circle in a drawing, and a cube's front may look square, but the ball and cube occupy space in three directions: their silhouettes do not tell their complete shape. The learner compares **surface properties**, turns a model between fixed viewpoints and explains the same classification after a rotation. A small glossary gradually introduces **flat face**, **curved surface**, **base**, **edge** and **corner/vertex**.

For a solid, the outer faces and surfaces matter: a cube has square flat faces, a rectangular box has rectangular flat faces, a sphere has a curved surface without flat faces, a right circular cylinder has two flat disk-shaped bases and a curved side, and a right circular cone has one flat disk-shaped base and a curved side meeting at an apex. Children do **not** need an advanced count of cylinder edges or hidden vertices, nor memorized geometry formulas. The concept of a "cube is also a cuboid" can be taught as nested shape membership, not a false mutually exclusive guessing contest.

## LEARNER JOURNEY

Begin with the misleading appearance of a square-like cube face, reveal that a solid has depth, then compare two boxlike solids by their flat faces. Next use a sphere/cylinder/cone comparison to discover the role of curved surfaces and flat bases. Finally inspect an unfamiliar/rotated view and justify a classification from **properties** instead of a familiar object name.

Each Section is a **single vertical** sequence of ordered content Resources (current `LessonSection_Config` editorial shape). The custom Scene lives inside one block per Section; it may internally lay out models in a grid. A learner makes a prediction, changes one model aspect, reads feedback and is invited to explain, without scores or a completion-as-mastery claim.

## SECTION PLAN

### Section 1 — A Flat Picture of a Solid

- **Purpose:** distinguish a 2D depiction/face from a 3D solid.
- **Current shape:** `LessonSection_Config`, ordered vertical content.
- **Ordered Resources:**
  1. **text — available in generic Section renderer:** "This drawing looks like a square. Could the object behind it be a flat square—or the front of a box? What else would we need to see?"
  2. **scene — Resource type and generic renderer exist; custom proposed:** [Solid Surface Observatory](./scenes/solidSurfaceObservatory.scene-spec.md), placement A. Initially show a face-on square-shaped front without depth cues, then reveal a simplified cube with **six square flat faces** as a rigid model. Controls: "See front", "See top", "See side", "Read its surfaces". The same cube remains the subject; only viewpoint changes.
  3. **markdown — available in generic renderer:** "A **square** is a flat shape. A **cube** is a solid: it has depth, and you can describe its flat square-shaped faces. A drawing on paper is still flat even when it helps us picture a solid."
- **Prediction and feedback:** If child calls the front-view square a complete cube: "The picture shows only one face. A **cube** has more surfaces, including ones hidden from that view." If they say any square picture must be flat: "The _picture_ is flat, but it can stand for a three-dimensional box." Offer a face list for nonvisual participation.
- **Accessibility and navigation:** Equally informative text-first face inventory, no required video, viewpoint drag or stereo vision. Slow/fast transitions optional; in reduced-motion mode switch instantly. The child may replay before proceeding.
- **Planned future Note:** "A picture may show one face of a 3D solid."

### Section 2 — Cube or Long Box?

- **Purpose:** classify by surface shape and relation among edge lengths, not orientation.
- **Current shape:** one-column general `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — available:** "These two boxes are turned differently. One has equal edge lengths, and the other is long. Do they both have flat rectangular faces? Is the square-faced cube also a kind of rectangular box?"
  2. **scene — proposed:** [Solid Surface Observatory](./scenes/solidSurfaceObservatory.scene-spec.md), placement B. Present an ideal cube with model dimensions **2×2×2** and a non-cubic rectangular cuboid **4×2×2**, using arbitrary _diagram units_ (not centimeters). Each model has six flat faces. Preset "front/top/side" reveals **square faces** of cube; cuboid has a mix of rectangle-shaped faces, including some square-shaped faces because two dimensions equal. "Show properties" reports equal-length edges for cube, not for the elongated box.
  3. **markdown — available:** "A **cube** has six square faces and equally long edges. A **rectangular cuboid** has six rectangular faces and may be longer in one direction. A square counts as a rectangle too, so a cube is a special kind of rectangular cuboid. Turning the model does not change its surfaces."
- **Prediction and feedback:** If child says cube cannot be a rectangular box: "Squares have right angles, so their faces are rectangles as well. A cube follows the rectangular-box rule and adds equal edge lengths." If they expect the long box to become cube on rotation: "Turn it back: its edge lengths never changed." Never claim every face of a noncube cuboid must be nonsquare.
- **Contrast:** Make child decide which property rules out a sphere or cylinder. Show "six flat faces" as evidence rather than a memorized silhouette.
- **Planned Note:** "The same solid can look different when we turn it."

### Section 3 — Curved Sides and Flat Bases

- **Purpose:** contrast sphere, cylinder and cone using the **presence/count of flat bases** and the shape of curved surfaces.
- **Current shape:** one-column general Section.
- **Ordered Resources:**
  1. **text — available:** "A ball, a can and a party-hat shape can all look round from some sides. Which ones have a **flat circular bottom**? Which has a tip? Which has **no flat face at all**?"
  2. **scene — proposed:** [Solid Surface Observatory](./scenes/solidSurfaceObservatory.scene-spec.md), placement C. Models: **sphere** (curved exterior, zero flat bases), **right circular cylinder** (two flat disk-shaped bases plus curved lateral side), **right circular cone** (one flat disk-shaped base and a pointed apex). Select "Inspect top", "Inspect side", "List flat faces/bases". Do not present a flat rectangular cylinder side as a face; an unwrapped drawing belongs to a different Lesson.
  3. **markdown — available:** "A **sphere** has no flat face. A **cylinder** has two flat circular bases and a curved side. A **cone** has one flat circular base and a curved side meeting at a tip. A round-looking picture does not mean all three solids are the same."
- **Feedback:** If child calls the sphere a circle: "The circle is a **flat boundary**. The ball-shaped object is a **solid sphere**." If they claim a cylinder's side is flat: "Its side curves around; only the two bases are flat." If they confuse cone and cylinder: "Check the **number of flat bases** and whether there is a tip."
- **Access:** Surface list available as an ordered text ledger even before visual inspection. It describes _observable_ features, not the target answer before a requested classification unless reveal/hint chosen. No haptic/physical object is required.
- **Planned Note:** "Sphere: no flat bases; cylinder: two; cone: one."

### Section 4 — Recognize a Solid in Another View

- **Purpose:** independent transfer from surface properties to new examples without scoring.
- **Current shape:** one-column general Section.
- **Ordered Resources:**
  1. **text — available:** "Here is a solid you have not seen in this position. It has two equal flat circular bases and a side that curves between them. Which solid is it? What rules out a cone?"
  2. **scene — proposed:** [Solid Surface Observatory](./scenes/solidSurfaceObservatory.scene-spec.md), placement D. An inclined right circular cylinder shown with fixed perspective presets; property ledger reports **two disk bases + curved side** with a newly chosen surface display, independent of color/size. Offer answer choices **cylinder**, **cone**, **sphere** plus "Show its surfaces". After prediction, reveal a rotation to another viewpoint and one equivalent everyday example. Second comparison: small cube rotated on corner versus elongated box; identifying a cube requires equal edge lengths and square faces, not merely one square silhouette.
  3. **markdown — available:** "A **cylinder** still has two flat circular bases when turned. A cone has only one base and a tip. A view can hide part of a surface, but the solid's defining surfaces stay the same."
- **Feedback:** For cone: "Two bases means this is not the one-base cone." For sphere: "The sphere has **no flat bases**, but this shape has two." For rotated cube versus cuboid: "Check the face shapes and equal edges; rotation changes the drawing, not the object."
- **Independent transfer:** Invite the learner to describe a familiar object _or an equivalent property-only model_ and state which geometric solid it approximates, acknowledging real objects are rarely perfect ideal solids. No live photos or external inventory necessary.

## CUSTOM SCENE SPECIFICATIONS

- [Solid Surface Observatory](./scenes/solidSurfaceObservatory.scene-spec.md) — unimplemented, self-contained, prop-free Scene concept with independent Section presets and nonvisual surface descriptions.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 2D/3D contrast: "A solid has depth; a picture of it is flat."
2. After Section 2 cube/cuboid comparison: "A cube is a rectangular box with equal edges and square faces."
3. After Section 3 curved-surface contrast: "Look for flat bases to tell a sphere, cylinder and cone apart."

These are **planned** short localized recall cues. No verified Note ID, unlock event, personal note state, persistence or revision sheet exists for this Lesson.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 is independent, **unscored** formative practice. A later Assessment Architect may test property-based identification from unfamiliar orientations and equivalent text descriptions; completion is not evidence of mastery. Exact counts of all polyhedral edges/vertices belong to other dedicated Skills and should not be silently assessed here.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

The Screenwriter must supply authentic translations of shape terms, face/base/edge vocabulary, prompts, controls, feedback, SVG `title`/`desc` and Note text for the supported locale roster before release. In RTL layouts, semantic direction changes text reading and navigation, **not** number of bases, surface curvature or identity of an object. No single fixed drawing may be sole evidence: include descriptive property inventory and predictable preset viewpoints; rotation by touch is optional. Keyboard/switch access, high contrast, no color-only status, focus visibility, large touch targets, instant reduced-motion updates, 200% zoom and offline resources/feedback after download are required but **not yet tested**.

## PRODUCTION / PLATFORM DEPENDENCIES

- **Available:** generic Section Resource `text`, `markdown`, `scene` recognition in current Playground renderer.
- **Proposed, not implemented:** Solid Surface Observatory component/3D or schematic models, context-driven authentic locale strings, accessible alternative surface ledger, tests and offline packaging.
- A simple lightweight SVG/HTML model is preferred if it conveys the same faces/curvature as a more expensive 3D renderer. Device class may not silently remove essential examples. No Quiz/Question, scoring, randomization, Note APIs, runtime Lesson registration or persistence has been added.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and its direct canonical `identify3dSolids.data.ts` reference.
- Editor: confirm how much geometric terminology (bases versus flat faces; cube nested inside cuboids) is appropriate for Grade 2 and whether a text-based schematic is fully equivalent.
- Brief and this Content remain **Draft/Provisional Draft** pending explicit approval.

## HANDOFF

Methodologist confirms purpose and depth before formal Content approval. Screenwriter/editor validates geometric examples, terminology and alternate representations. Scene Designer/Coding Agent later implements only from **approved** Scene specs and verified contracts. Assessment Architect owns any scored Questions and evidence policy.
