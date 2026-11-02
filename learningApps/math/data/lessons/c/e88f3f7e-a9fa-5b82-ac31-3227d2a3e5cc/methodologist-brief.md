# Split Shapes and Build Them Again — Methodologist Brief

Date: 2026-10-31
Lesson slug: rearrangingShapePieces
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Build from area-as-square-coverage to controlled geometric **decomposition and recomposition**. Children can show that cutting a six-unit-square shape into nonoverlapping pieces and moving the pieces without stretching or losing them preserves **total area**, while the outside edge may change. This is a geometric-invariance Lesson, not a token jigsaw.

## Target audience

**Primary audience: Grade 3, approximately ages 8–9.** Grade 3 (approximately 8–9), comfortable counting unit squares and recognizing straight-edged planar figures. Learners may use arrows, rotate buttons, keyboard-controlled piece placement and an accessible cell ledger; drag and precision drawing are optional.

## Prerequisites

- [areaAsCovering.data.ts](../../../../data/skills/geometry/area/skills/areaAsCovering.data.ts): cover a region exactly with equal square units and count them once.
- [shapeAttributes.data.ts](../../../../data/skills/geometry/figures/skills/shapeAttributes.data.ts): distinguish outside edges from internal dividing strokes; [identify2dShapes.data.ts](../../../../data/skills/geometry/figures/skills/identify2dShapes.data.ts): recognize a rectangular region.

## Target Skills

- [composeDecomposeShapes.data.ts](../../../../data/skills/geometry/figures/skills/composeDecomposeShapes.data.ts)

## Expected learning outcomes

- Partition a 2×3 rectangle into two **nonoverlapping 1×3 strips** along an internal dividing line and identify that the total area remains six square units.
- Recombine all six unit-square cells, with no gaps/overlaps, into the original rectangle or a straight 1×6 strip, using rigid translation/rotation rather than resizing pieces.
- Explain with a cell ledger why total **area stays six** even though the outside outline changes, and identify a case with a missing cell or an overlapping pair as invalid reconstruction.
- Distinguish the **outer boundary** from the seam between pieces, noting that perimeter **may change** when pieces are rearranged, without requiring a perimeter calculation.

## Essential subject matter

A valid decomposition partitions the whole **2×3** rectangular region (six 1×1 square cells) along the horizontal seam between its two rows, producing two rigid **1×3 strips**, each covering three square cells. The strips remain unchanged in area; two pieces × three cells each = six distinct cells. Recombine stacked into the 2×3 rectangle with **area 6** and an outside boundary of **10 unit edges**; place strips end-to-end without overlap to make a **1×6 rectangle** also **area 6** with outside boundary of **14 unit edges**. The seam in the 2×3 arrangement is **internal**, never part of the outside border. Two strips overlapping by exactly one cell have union area 5, _not 6_, so the reassembly is invalid if claimed to preserve all six distinct covered cells as a tiling. A cell left uncovered likewise fails to reconstruct a required target. Rotating/translating a rigid strip preserves its three unit squares; stretching it would not be the same piece. In the model area is counted discretely; general conservation applies to any dissection and rigid reassembly with no loss/overlap, but this Lesson tests only these figures.

## Conceptual progression and dependencies

First revisit 2×3 rectangle coverage and count six full cells. Reveal the internal dividing seam; distinguish it from the exterior. Split into two pieces and count three cells in each. Move one piece without rotation to make a 1×6 strip and compare total counted coverage versus new outline. Ask children to predict what happens if a strip overlaps one cell or if one tile is omitted. Finish with a clean reassembly and an explanation of which property stayed constant.

## Misconceptions, examples and boundaries

Cutting creates more area; border length automatically stays the same; a seam is an outside edge; two three-cell pieces overlapping one cell still make a valid six-cell tiling; a gap inside a target can be ignored; rotating a rigid strip changes its area; two different outlines must have different areas; screen geometry equals physical centimeters.

**Instructional depth / explicit exclusions:** Rigid straight-sided **whole-unit-square** pieces, two 1×3 strips (one 2×3 starting rectangle), 1×6 alternate rectangle and controlled nonexamples. No arbitrary curved cuts, fractional cells, impossible jigsaw decompositions, formal congruence transformations, complex area formulas, cutting hardware or perimeter calculation as an independent Skill. These are **Lesson boundaries**; the canonical Skill object remains grade-neutral and unchanged.

## Localization, accessibility and offline intent

Every learner-visible prompt, feedback, dynamic state description, diagram label, ruler/scale symbol, unit expression, alt description, optional transcript and proposed recall Note requires authentic localization into **every supported textbook locale**, with **no silent English fallback or placeholder translation**. Reading direction can change layout but must never change the invariant square-cell area, rigid-piece count, one-liter measure or scale tick values. For nonvisual learners provide a complete meaningful ordered list of the model's unit cells, pieces, pours or graduation marks. Each manipulation must be operable via touch, keyboard/switch and appropriately labeled controls without precision dragging. Use WCAG 2.2 AA targets/contrast/focus, understandable low-reading-load copy, accessible text scaling, reduced motion, equivalent low-end performance and complete post-download offline activity. These are design requirements, **not existing infrastructure claims**.

## Sources and factual verification

- [composeDecomposeShapes.data.ts](../../../../data/skills/geometry/figures/skills/composeDecomposeShapes.data.ts) — canonical Mathematics Skill source from `learningApps/math/`; copied byte-for-byte (UUID, multilingual data, methodological description unchanged) into this textbook's local Skill tree.
- [Methodologist persona](../../../../../../studio/personas/methodist.persona.md), [separate editorial artifact policy](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Lesson entity definition](../../../../../../studio/docs/entities/lesson.md) — editorial roles, Program-neutral scope and approval boundaries.
- [Playground generated taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — **stale for newly transferred Skills** until coordinator integration/regeneration; the canonical source files above, not this view, are the identity authority.

Mathematical/measurement illustrative cases must be reviewed against the exact Skill definition; no country-specific curriculum was assigned and no external instrument calibration has been verified.

## Curriculum / Program compatibility

No national Program or Curriculum specified. The Lesson is independently usable and may be sequenced differently by future Programs. Grade 3 denotes bounded **pedagogical depth**, not a modification to the global Skill's definition.

## Open editorial decisions

- Editor: confirm using explicitly different illustrative perimeter counts (10 versus 14) is age-appropriate **only as evidence** that outside boundary may change; do not require perimeter computation or promote it to another assessed Skill.
- **Methodologist approval required:** This Brief is Draft. Associated `content.md` and `scenes/*.scene-spec.md` in this batch are **provisional screenwriter drafts**, prepared under user batch authorization ahead of formal Brief approval. They must be revised if this Brief changes.

## Methodologist handoff

Review prerequisites, mathematical examples, misconceptions and audience demands before any explicit Approved status. The Screenwriter owns the provisional Section experience; future approved Scene Designer work must remain within it. Assessment Architect separately owns any Question, Quiz, grading and evidence model. No React Scene, runtime Lesson config, published locale content, Note persistence or generated registries is included.
