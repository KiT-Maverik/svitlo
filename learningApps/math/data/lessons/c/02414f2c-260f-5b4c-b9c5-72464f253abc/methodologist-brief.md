# How Much Flat Space? Count Equal Squares — Methodologist Brief

Date: 2026-10-31
Lesson slug: coveringShapesWithUnitSquares
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Introduce **area as the amount of plane region covered**, not the length around its outside. Children first use equal square tiles to cover a simple region _exactly_, without gaps or overlaps, then compare regions by square counts. This is a prerequisite for reasoning about pieces that can be rearranged while preserving total area.

## Target audience

**Primary audience: Grade 2, approximately ages 7–8.** Grade 2, approximately 7–8 years, learners who know flat shapes and can count small collections. Include early-reader short prompts, large grid positions, no-drag tile placement, complete accessible text descriptions and a unit-square ledger.

## Prerequisites

- Recognize a rectangle and another flat region from earlier [identify2dShapes.data.ts](../../../../data/skills/geometry/figures/skills/identify2dShapes.data.ts).
- Count equal items up to 12, understand one-to-one matching, and distinguish a shape's inside from its outer edge. Familiarity with equal **length** pieces from [nonstandardLength.data.ts](../../../../data/skills/measurement/length/skills/nonstandardLength.data.ts) is helpful but does not substitute for area.

## Target Skills

- [areaAsCovering.data.ts](../../../../data/skills/geometry/area/skills/areaAsCovering.data.ts)

## Expected learning outcomes

- Explain that area describes how much **flat interior region** a shape covers, rather than the perimeter or number of corners.
- Cover a supplied region made from whole unit cells with equal 1×1 square tiles **without gaps or overlaps**, identifying every covered cell exactly once.
- Report simple areas such as a 2-row × 3-column region as **6 square units**, and a five-cell step shape as **5 square units**, without requiring the multiplication formula.
- Explain why different unit-tile sizes cannot be compared by bare tile counts and why stretching/recoloring the outline without changing the region's unit-cell coverage is not an area change.

## Essential subject matter

Area of a planar region quantifies its two-dimensional **coverage** in square units. On a square grid each full cell is one **unit square**. The 2×3 rectangle has rows of three cells (1+1+1)+(1+1+1)=**6 square units**. A step-shaped region with rows of three and two unit squares has **5 square units**. Every counted tile has the **same area**; no tile overlaps another and no intended cell remains uncovered. Coloring or rotating a rigid region does not change its area. The border describes the region's boundary, not its coverage: a tall narrow shape and wide squat shape can have equal area despite distinct outlines. Different-shaped regions may use the same six unit tiles. A large square tile and small square tile are **not interchangeable counting units**. Avoid claims about partial-cell areas or physical cm², because no calibrated screen size or fractional measurement is used.

## Conceptual progression and dependencies

Start with two shapes whose borders look unlike each other but that cover the same number of equal cells. Model placing one tile per cell, with visible and verbal coverage state. Examine an intentionally empty gap and an overlapped tile as invalid coverage. Count the rectangular region by rows, then cover a five-cell step shape. Conclude with an independently shown rearranged six-cell outline to distinguish total region coverage from exterior border appearance.

## Misconceptions, examples and boundaries

Area is the amount of outline; a shape with more corners must cover more; counting the same overlapped cell twice makes the region bigger; a hole can be ignored while still claiming full coverage; rectangles require multiplying length×width before area can be understood; six large squares and six small squares necessarily cover equal area; a screen pixel is a physical centimeter.

**Instructional depth / explicit exclusions:** Small polygonal filled regions made of **4–12 whole 1×1 grid cells**, no cut or fractional squares, no area formulas or multiplication requirement, no conversion to real-world square centimeters, no calculus, no composite subtraction, no perimeter equation. Contrasting boundaries is illustrative; **perimeter** is not independently assessed. These are **Lesson boundaries**; the canonical Skill object remains grade-neutral and unchanged.

## Localization, accessibility and offline intent

Every learner-visible prompt, feedback, dynamic state description, diagram label, ruler/scale symbol, unit expression, alt description, optional transcript and proposed recall Note requires authentic localization into **every supported textbook locale**, with **no silent English fallback or placeholder translation**. Reading direction can change layout but must never change the invariant square-cell area, rigid-piece count, one-liter measure or scale tick values. For nonvisual learners provide a complete meaningful ordered list of the model's unit cells, pieces, pours or graduation marks. Each manipulation must be operable via touch, keyboard/switch and appropriately labeled controls without precision dragging. Use WCAG 2.2 AA targets/contrast/focus, understandable low-reading-load copy, accessible text scaling, reduced motion, equivalent low-end performance and complete post-download offline activity. These are design requirements, **not existing infrastructure claims**.

## Sources and factual verification

- [areaAsCovering.data.ts](../../../../data/skills/geometry/area/skills/areaAsCovering.data.ts) — canonical Mathematics Skill source from `learningApps/math/`; copied byte-for-byte (UUID, multilingual data, methodological description unchanged) into this textbook's local Skill tree.
- [Methodologist persona](../../../../../../studio/personas/methodist.persona.md), [separate editorial artifact policy](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Lesson entity definition](../../../../../../studio/docs/entities/lesson.md) — editorial roles, Program-neutral scope and approval boundaries.
- [Playground generated taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — **stale for newly transferred Skills** until coordinator integration/regeneration; the canonical source files above, not this view, are the identity authority.

Mathematical/measurement illustrative cases must be reviewed against the exact Skill definition; no country-specific curriculum was assigned and no external instrument calibration has been verified.

## Curriculum / Program compatibility

No national Program or Curriculum specified. The Lesson is independently usable and may be sequenced differently by future Programs. Grade 2 denotes bounded **pedagogical depth**, not a modification to the global Skill's definition.

## Open editorial decisions

- Editor: confirm whether the five-cell step outline is suitably readable in Grade 2. The key conceptual boundary is **region coverage** versus boundary; perimeter measurement remains deferred.
- **Methodologist approval required:** This Brief is Draft. Associated `content.md` and `scenes/*.scene-spec.md` in this batch are **provisional screenwriter drafts**, prepared under user batch authorization ahead of formal Brief approval. They must be revised if this Brief changes.

## Methodologist handoff

Review prerequisites, mathematical examples, misconceptions and audience demands before any explicit Approved status. The Screenwriter owns the provisional Section experience; future approved Scene Designer work must remain within it. Assessment Architect separately owns any Question, Quiz, grading and evidence model. No React Scene, runtime Lesson config, published locale content, Note persistence or generated registries is included.
