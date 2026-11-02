# Read and Draw Simple Grid Maps — Methodologist Brief

Date: 2026-10-31
Lesson slug: readingAndDrawingGridMaps
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Extend previous spatial descriptions and ordered route instructions into **maps** with a stable cell grid, row/column convention, consistent orientation and cell size. Children must be able to locate, read a path, and make a small map that someone else can understand. A grid is a shared reference system rather than a decorative pattern.

## Target audience

**Primary grade: 2 (approximately ages 7–8).** Grade 2 learners who can track rows and columns up to four and follow short ordered route directions. Early readers receive visually paired names and short narrated descriptions; every cell is available as a structured list to screen readers. No timed navigation, small touch targets or drag-only interaction.

**Instructional depth:** Discrete 4×4 rectangular grid, simple named cells, up/down/left/right adjacent steps, maps with three landmarks and optionally an obstacle. Do not introduce formal Cartesian coordinate planes, geospatial projections, GPS or real-distance scale conversion, graph-search algorithms, or assessed route optimization. All coordinates are map references, not geographic data.

## Prerequisites

[positionWords.data.ts](../../../../data/skills/geometry/orientation/skills/positionWords.data.ts) for relational location and [spatialOrientationPath.data.ts](../../../../data/skills/geometry/orientation/skills/spatialOrientationPath.data.ts) for short ordered routes. Count 1–4 and distinguish map top from viewer-relative facing direction. **No prior formal coordinate-plane skill.**

## Target Skills

- [gridMapNavigation.data.ts](../../../../data/skills/geometry/orientation/skills/gridMapNavigation.data.ts)

## Expected learning outcomes

- Read a location using an unambiguous grid convention: row label first, then column number, for example B2.
- Follow a route from a named starting cell, keeping map orientation and one-cell step size constant.
- Draw/construct a simple 4×4 grid map by placing distinct landmarks at specified cells and describe a route using those cells.
- Explain why changing the labels, north/top convention, or meaning of one grid step **without notice** invalidates a previously communicated plan.

## Essential subject matter

Use a **4×4 grid of cells**; rows A–D run from map top to bottom, columns 1–4 from map left to right. **B2 means row B, column 2**, not the intersection of lines called B and 2. Map north is the direction **toward the top** and east toward the right edge regardless of LTR/RTL UI. One step moves between neighboring cells in the same row or column; no diagonal shortcuts. Example: B2 → B3 → B4 → A4: east twice, north once, destination A4. A map legend binds a symbol to a cell (tree at B2, park at A4, library at C1); relocating a symbol alters the shared information. Within one map all cells represent one consistent step of equal area; map sketches on a different scale may require changed counts and must not be treated as identical by default. Avoid claiming that reordering axis-aligned moves **always** changes a destination on an empty grid.

## Conceptual progression and dependencies

1. Locate a single landmark from fixed row/column labels and compare B2 versus 2B. 2) Trace the B2→A4 route one neighboring cell at a time. 3) Draw a small map by placing three named landmarks into labeled cells, then inspect whether two readers obtain the same placements. 4) Transfer to a new 4×4 map with different landmarks and a route, explaining an intentionally wrong coordinate convention.

## Misconceptions, examples and boundaries

Counting grid **lines** as cells; swapping row and column; reading a corner/intersection instead of the cell interior; assuming map top changes with RTL text; moving diagonally as one step; treating a sketch with double-size cells as same unit step; believing a path has only one order or reordering right/up always changes its endpoint.

**Explicitly out of scope:** Discrete 4×4 rectangular grid, simple named cells, up/down/left/right adjacent steps, maps with three landmarks and optionally an obstacle. Do not introduce formal Cartesian coordinate planes, geospatial projections, GPS or real-distance scale conversion, graph-search algorithms, or assessed route optimization. All coordinates are map references, not geographic data. Canonical Skill definitions remain grade-independent and are never rewritten to fit these limits.

## Localization, accessibility and offline intent

All proposed learner-facing messages (including SVG descriptions, answer explanations, controls, geometry terms, measurement units, feedback and proposed recall Notes) must eventually receive **genuine supported-locale translations**. Do not invent translation resources, silently fall back to English, or interpret draft English copy as multilingual implementation. Design semantic LTR/RTL layout without changing mathematical order or map/measurement direction. Every meaningful visual manipulation requires a semantically equivalent keyboard/switch and nonvisual path; no forced dragging, color-only answers, precise drawing gestures, audio dependence or timers. WCAG 2.2 AA, large mobile controls, 200% text, reduced motion, correct reading order and complete offline access **after an actual download mechanism exists** are release requirements, not proof of implemented support.

## Sources and factual verification

- [Canonical grid-map Skill](../../../../data/skills/geometry/orientation/skills/gridMapNavigation.data.ts) — approved/promoted Mathematics data, copied without changing UUID, slug or translations.
- [Studio Methodologist persona](../../../../../../studio/personas/methodist.persona.md), [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), and [Lesson entity](../../../../../../studio/docs/entities/lesson.md) define role ownership and independent Program-neutral Lesson scope.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md) is **not regenerated in this feature branch**. Coordinator must regenerate after integrating domain-local Skill registration; it cannot currently verify the newly transferred entries.

Mathematical worked cases are included as editorial models; they do not imply compliance with a specific nation's standard or experimental validation of individual learner mastery.

## Curriculum / Program compatibility

No national curriculum or Program assigned. The Lesson is standalone and may later be referenced from different Programs without changing the underlying Skill. Grade 2 is an **instructional depth choice**, not a Skill Taxonomy field.

## Open editorial decisions

- Confirm row-letter/column-number labeling is a suitable pedagogical convention for first grid maps and that the Lesson remains genuinely accessible to nonvisual users. The separate Route Directions Lesson teaches heading-relative turns; this Lesson focuses on grid conventions and creation of a map.
- **Approval gate remains open.** This Brief is Draft. User-authorized same-batch Lesson Content and Scene specifications are **provisional Drafts pending explicit Methodologist approval**, not a claim that Studio's standard approval gate has passed.

## Methodologist handoff

Editor should validate scope, prerequisites, examples, developmental fit, sources and misconceptions. A Screenwriter may refine the provisional narrative under this batch authorization; only formal approval permits an implemented Lesson design handoff. No React, runtime Lesson data, Question, Quiz, scoring, analytics, Note persistence or user-state event contract is authorized here.
