# Find Flat Shapes on and Through Solids — Methodologist Brief

Date: 2026-10-31
Lesson slug: flatFacesAndCrossSections
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Develop a mathematically accurate bridge between **2D figures** and **3D solids**. A solid's flat **face** may have a recognizable plane-figure shape; a virtual plane cutting through a solid produces a **plane section**. The learner identifies shapes on faces and in deliberately simple cross-sections while keeping the face/section separate from the whole solid.

## Target audience

**Grade 3 (approximately ages 8–9).** Grade 3 learners (approximately ages 8–9), following basic solid recognition. Requires short and concrete descriptions of what is 'on the outside' versus what appears 'inside on a flat virtual slice'. Give an accessible text-first section diagram and step-by-step buttons; no physical cutting tools or fine drag are needed.

## Prerequisites

Recognize a cube, cuboid, cylinder and sphere from their surfaces ([identify3dSolids.data.ts](../../../../data/skills/geometry/solids/skills/identify3dSolids.data.ts)); recognize square, rectangle, circle and **filled disk** as 2D shapes or regions ([identify2dShapes.data.ts](../../../../data/skills/geometry/figures/skills/identify2dShapes.data.ts)). Understand that a drawn surface in perspective may look skewed. Plane intersection/section terminology is introduced by an analogy to a safe computer visualization, not prior formal plane geometry.

## Target Skills

- [shapeOnSolidSurface.data.ts](../../../../data/skills/geometry/solids/skills/shapeOnSolidSurface.data.ts)

## Expected learning outcomes

- Identify the square-shaped **flat face** on a cube, rectangular **flat face** on a cuboid, and disk-shaped flat base on a right circular cylinder; distinguish each from the entire solid.
- Distinguish an exterior **flat face** from a **curved exterior surface**, and recognize that a sphere has no flat exterior face even though a virtual cut through it can have a circular plane section.
- Predict the plane-figure **section** produced by an explicitly oriented simple virtual cut: e.g. a cuboid plane parallel to one rectangular face yields a rectangle, while a cut perpendicular to a cylinder's axis yields a circular disk.
- Explain why a flat 2D section/face does not turn the original 3D solid into a 2D figure, and correct a 'the entire can is a circle' classification.

## Essential subject matter

A **flat face** is a bounded planar region of a solid's exterior. The cube's face is **square-shaped** (a square region); the cuboid's face is **rectangular**; a right circular cylinder's two flat **bases** are circular disks. Its **curved side** is not a flat rectangle even if it could be drawn as a rectangle in an unwrapped net. A **plane section** is the 2D shape formed by the intersection of a 3D solid with an imaginary flat cutting plane, shown as the flat **filled** region on a virtual cut—not simply an outline line. A cuboid intersected by a plane **parallel to a chosen face and inside the body** has a rectangle section (square if corresponding face is square). A right circular cylinder cut by a plane perpendicular to its axis and through its interior has a disk; a **sphere** has _no flat exterior faces_, but a central plane cut makes a disk with a circular boundary. The solid itself remains 3D; the section is 2D. The same circle-looking picture can be a rim (circle boundary), a base disk (filled flat face) or a curved-solid silhouette—context matters.

## Conceptual progression and dependencies

Recap a cube with six visible/invisible surfaces and ask 'Is one square face the whole cube?'; then compare rectangular faces on boxes and flat circular cylinder bases versus curved exterior side. Predict a **simple** face-parallel or perpendicular virtual section; reveal the flat filled section and name its 2D shape. Contrast a sphere's lack of outside flat faces with its central circular section and ask why these statements are consistent. Finish with a fresh cube/cylinder/sphere face-or-section choice, requiring property justification.

## Misconceptions, examples and boundaries

Calling a cylinder a circle; treating all illustrated circular outlines as flat faces; assuming an ellipsoid-looking perspective base is an ellipse instead of a circular disk; treating a sphere's imaginary plane cut as a flat external face; claiming that a curved cylinder side is planar because it 'unwraps' to a rectangle; saying every slice through a cylinder is circular; saying a cuboid's every slice must be rectangular. Explicitly limit valid demonstrations to specified plane orientations.

**Depth exclusions:** Only exterior flat faces of familiar solids and **explicitly specified**, easy virtual planar cross-sections: cuboid parallel to a rectangular face, right circular cylinder perpendicular to its axis, and central section of sphere. No arbitrary oblique sections, 3D coordinate plane equations, conic sections, nets or area calculations, real knife/scissors demonstrations, or claims that all sections of a named solid share one shape. This Lesson is assigned Grade 3 because full canonical Skill includes plane sections; do not erase that part of its definition. These boundaries govern a **Lesson**, not the grade-independent canonical Skill definition.

## Localization, accessibility and offline intent

Authentically localize every future learner-facing prompt, explanation, feedback message, geometry/measurement term, numerical description, accessible name, optional sound transcript, Scene control and recall Note in the supported locale set. No fake translations or English text fallbacks. Adopt meaning-preserving LTR/RTL: changing reading direction must never silently invert geometric surface structure, left/right pan behavior, amount ordering or 3D/2D membership. Use keyboard/switch-operable controls and complete nonvisual text-ledger alternatives; visual rotation or pouring effects are optional enhancements, never the only way to understand. Favor small controllable steps, reduced-motion versions, large mobile targets, visible focus, WCAG 2.2 AA and identical learning outcomes on weak devices. All essential model data, localized copy, Scene assets and explanations must be **downloadable for full offline use**; this is a product goal, not verified runtime support. If a later design cannot supply equivalent nonvisual/low-end modes, surface that as an editorial blocker, not a silent simplification.

## Sources and factual verification

- [shapeOnSolidSurface.data.ts](../../../../data/skills/geometry/solids/skills/shapeOnSolidSurface.data.ts) — canonical source migrated verbatim from Mathematics `main`, including UUID, translations and methodological description.
- [Methodologist Persona](../../../../../../studio/personas/methodist.persona.md), [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) and [Lesson entity](../../../../../../studio/docs/entities/lesson.md) — governing editorial scope, autonomy and approval.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md) — a **coordinator-owned generated view** that has **not been regenerated** to include these pending Skill imports. Canonical `*.data.ts` source files above are the verified sources.

The examples are pedagogically simplified as specifically described; they make no national Curriculum alignment or experimental instructional-effectiveness claims.

## Curriculum / Program compatibility

No Program or national Curriculum has been assigned. The Lesson is independently coherent and may be referenced by future Programs. Grade 3 is a provisional **lesson-audience choice**, never a change to the taxonomy or new Skill assessment level.

## Open editorial decisions

- Editor should approve whether sphere central section is sufficiently supported by nonvisual models at Grade 3 and review terminology for filled circle/disk versus circular boundary. Distinguish the safe **virtual section** from advice to physically cut any object.
- **Explicit approval still required.** This Methodologist Brief is **Draft**. The accompanying Content and custom Scene specification are **Provisional Drafts** prepared under the user's batch-level authorization, not formally approved under the Studio's standard handoff gate.

## Methodologist handoff

Editor/Methodologist reviews learning depth, prerequisite accuracy, conceptual definition, examples and accessibility equivalence. Screenwriter may review and revise provisional Content and Scene documents, but they must not be treated as approved source for Coding Agent implementation before sign-off. Questions, Quizzes, scoring, analytics, full translation production, local persistence, Notes unlocking and runtime Lesson configuration are outside this batch.
