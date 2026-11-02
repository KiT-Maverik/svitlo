# Recognize Solids by Their Surfaces — Methodologist Brief

Date: 2026-10-31
Lesson slug: identifyingSolidFigures
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Establish the difference between a flat diagram and an object that occupies three-dimensional space. The learner identifies everyday solid shapes by invariant **surface structure**—flat versus curved surfaces, type of flat faces/bases, edges and corners where these apply—rather than by color, familiar object names, size or how a perspective drawing is tilted.

## Target audience

**Grade 2 (approximately ages 7–8).** Children in Grade 2 (approximately ages 7–8), including mixed/early readers, learners unfamiliar with the English technical words for face/edge/vertex, and learners using keyboard/switch or structured text rather than visual rotation. The experience should introduce everyday 'flat part / side / corner' before precise 'face / edge / vertex' and never depend on free rotation gestures.

## Prerequisites

Recognize a square, rectangle, triangle and circle in varying orientations ([identify2dShapes.data.ts](../../../../data/skills/geometry/figures/skills/identify2dShapes.data.ts)). Know the difference between a flat straight edge and a curved outline from earlier figure exploration. Count to six where a count helps but do **not** require counting all hidden edges of a prism. Use two everyday boxes as visible or verbally describable starting objects.

## Target Skills

- [identify3dSolids.data.ts](../../../../data/skills/geometry/solids/skills/identify3dSolids.data.ts)

## Expected learning outcomes

- Distinguish a 3D **solid object** from its 2D picture or silhouette, and identify a cube, non-cubic rectangular box (cuboid), sphere, cylinder and cone using surface features.
- State that a cube has square **flat faces** while a rectangular box can have **rectangular faces**; identify that a cube is a special kind of rectangular box without treating an upright picture as the definition.
- Recognize that a sphere has a continuous **curved surface without flat faces or corners**, whereas a cylinder has **two flat circular bases plus a curved side** and a cone has **one flat circular base plus a curved surface meeting at a tip**.
- Match an unfamiliar or rotated view to its solid class using properties, and describe one property that rules out a plausible wrong class.

## Essential subject matter

A **solid** has length, width and depth; a photograph or screen outline is a **2D representation** of that 3D object, not the solid itself. A **face** of a cube/cuboid is a flat region, not merely its boundary; the edges meet faces and vertices are their meeting corners. A cube has six square faces and equal edge lengths; a cuboid has six rectangular faces and may be elongated; every cube is also a cuboid in this elementary classification. A sphere has no flat planar faces or polyhedral vertices. A right circular cylinder has **two circular disk-shaped flat bases** and a curved lateral surface, with circular boundaries; a right circular cone has **one disk-shaped flat base** and one pointed apex plus curved lateral surface. Flat circular disk versus its circular rim must be distinguished where necessary. In this Lesson, learners use easily observable **qualitative** face/base/curvature clues rather than memorize exact edge/vertex counts, especially for curved solids, where 'edge' counting conventions vary. Rotating a rigid solid changes viewpoint, not its surfaces.

## Conceptual progression and dependencies

Begin with a picture of a cube and a real-world solid description, revealing why a single square-like silhouette cannot define a 3D object. Contrast cube and cuboid by faces and edge lengths; sphere versus cylinder by whether there are flat bases; cylinder versus cone by number of bases and tip. Let learners inspect fixed 90° viewpoint presets and predict which features remain. End with an unfamiliar surface-property description to classify and justify, including a misleading 'looks circular' silhouette.

## Misconceptions, examples and boundaries

Calling a sphere a circle; calling a cylinder a circle merely because its top appears circular; assuming every 'box' is a cube; thinking a different perspective makes a different solid; treating a face as an entire solid; relying on colors, size or 'rolls on table' instead of relevant geometric properties; claiming the curved cylinder side is a rectangular **flat** face. Avoid classifying a cube exclusively against cuboids: the categories nest.

**Depth exclusions:** Basic geometric solids only (cube, rectangular cuboid, sphere, right circular cylinder, right circular cone) with clear, elementary surface descriptions. No volume/surface-area formula, classification of arbitrary prisms or pyramids, precise perspective geometry, hidden-edge count assessment, unfolded nets, complex cross-sections, edge-convention disputes, or physical experiments requiring equipment. This Lesson names solids; the next Lesson targets 2D faces/sections independently. These boundaries govern a **Lesson**, not the grade-independent canonical Skill definition.

## Localization, accessibility and offline intent

Authentically localize every future learner-facing prompt, explanation, feedback message, geometry/measurement term, numerical description, accessible name, optional sound transcript, Scene control and recall Note in the supported locale set. No fake translations or English text fallbacks. Adopt meaning-preserving LTR/RTL: changing reading direction must never silently invert geometric surface structure, left/right pan behavior, amount ordering or 3D/2D membership. Use keyboard/switch-operable controls and complete nonvisual text-ledger alternatives; visual rotation or pouring effects are optional enhancements, never the only way to understand. Favor small controllable steps, reduced-motion versions, large mobile targets, visible focus, WCAG 2.2 AA and identical learning outcomes on weak devices. All essential model data, localized copy, Scene assets and explanations must be **downloadable for full offline use**; this is a product goal, not verified runtime support. If a later design cannot supply equivalent nonvisual/low-end modes, surface that as an editorial blocker, not a silent simplification.

## Sources and factual verification

- [identify3dSolids.data.ts](../../../../data/skills/geometry/solids/skills/identify3dSolids.data.ts) — canonical source migrated verbatim from Mathematics `main`, including UUID, translations and methodological description.
- [Methodologist Persona](../../../../../../studio/personas/methodist.persona.md), [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) and [Lesson entity](../../../../../../studio/docs/entities/lesson.md) — governing editorial scope, autonomy and approval.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md) — a **coordinator-owned generated view** that has **not been regenerated** to include these pending Skill imports. Canonical `*.data.ts` source files above are the verified sources.

The examples are pedagogically simplified as specifically described; they make no national Curriculum alignment or experimental instructional-effectiveness claims.

## Curriculum / Program compatibility

No Program or national Curriculum has been assigned. The Lesson is independently coherent and may be referenced by future Programs. Grade 2 is a provisional **lesson-audience choice**, never a change to the taxonomy or new Skill assessment level.

## Open editorial decisions

- Editor should confirm that the cube-as-cuboid inclusion and qualitative curved-surface vocabulary are understandable at Grade 2 without forcing exact polyhedral edge counts. Materialistic objects (box, ball, can, cone) are **representatives**, not literal definitions.
- **Explicit approval still required.** This Methodologist Brief is **Draft**. The accompanying Content and custom Scene specification are **Provisional Drafts** prepared under the user's batch-level authorization, not formally approved under the Studio's standard handoff gate.

## Methodologist handoff

Editor/Methodologist reviews learning depth, prerequisite accuracy, conceptual definition, examples and accessibility equivalence. Screenwriter may review and revise provisional Content and Scene documents, but they must not be treated as approved source for Coding Agent implementation before sign-off. Questions, Quizzes, scoring, analytics, full translation production, local persistence, Notes unlocking and runtime Lesson configuration are outside this batch.
