# Points, Lines and Segments — Methodologist Brief

Date: 2026-10-31
Lesson slug: pointsLinesAndSegments
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Connect children's experience of drawing marks with precise geometric objects: a point indicates a position; an (ideal) straight line extends endlessly both ways; a curve may bend; a polygonal chain contains joined straight segments; a segment has exactly two endpoints and a finite length. Learning to distinguish these is immediately used to construct and label a segment without claiming a drawn mark itself is mathematically infinite.

## Target audience

**Primary grade: 2 (approximately ages 7–8).** Grade 2 learners who can identify a straight versus bent trace and follow short drawing steps, with optional audio/brief captions for emerging readers. Provide keyboard-operable placement and an equivalent numbered position list; motor precision, vision, or fluent handwriting cannot be prerequisites.

**Instructional depth:** Straight line, visually simple curve and a 2–3-part open polygonal chain; segment construction between two distinct labeled endpoints. Exclude rays as an assessed Skill, parallel/perpendicular relations, angle measurements, coordinate geometry, distance formulas, freehand precision, intersections and centimeter measurement.

## Prerequisites

Understand left/right and above/below as relative positions ([positionWords.data.ts](../../../../data/skills/geometry/orientation/skills/positionWords.data.ts), if taught). Know that a drawn dot marks a location and that two different dots may be named A and B. Basic distinction between a straight edge and a curved boundary from earlier figure recognition. **No centimeter measurement** prerequisite.

## Target Skills

- [linesAndPoints.data.ts](../../../../data/skills/geometry/lines/skills/linesAndPoints.data.ts)
- [segment.data.ts](../../../../data/skills/geometry/lines/skills/segment.data.ts)

## Expected learning outcomes

- Distinguish a point, infinite straight line, curved line, and polygonal chain of joined straight pieces using defining properties rather than size/color.
- Explain that finite arrows in a picture represent a straight line continuing beyond the frame, whereas a segment is limited by its two endpoints.
- Place and label two distinct points A and B, construct the straight segment AB between them, and identify its endpoints.
- Explain why the segment AB includes both endpoints and why the straight-line distance from A to B is its length (without computing units).

## Essential subject matter

A geometric point has **position but no size**; any visible dot is a marker. An ideal straight line extends **infinitely in both directions**; the arrows in a drawing indicate continuation rather than literal ends. A curve bends and need not be made of straight pieces. A polygonal chain is consecutive straight segments joined at their endpoints and may be open; a single segment is a special single-piece chain, but avoid unnecessary taxonomy. A straight segment AB is the portion of a line from point A to point B **including endpoints**. Naming AB or BA refers to the same geometric segment. Two distinct endpoints define exactly one straight segment. Its length is their straight-line separation; tilting a segment does not alter length.

## Conceptual progression and dependencies

1. Contrast a dot and line mark, establish that drawing symbols are models. 2) Use observable bend/straight and join properties to separate curve versus polyline. 3) Show an extendable straight line and trim to a segment with fixed endpoints. 4) Have the learner construct AB and name both endpoints; vary orientation and compare the same segment to a bent route between endpoints. Conceptual distinction comes before construction, and construction before centimeter measurements in another Lesson.

## Misconceptions, examples and boundaries

A dot's ink size is its geometric size; arrowheads are endpoints; an incomplete drawing means a line stops at the page edge; a curved path between A and B is the straight segment AB; moving A without moving B preserves AB; a bent polyline is a straight segment; endpoints are excluded. Use separate straight/curved examples and written alternatives.

**Explicitly out of scope:** Straight line, visually simple curve and a 2–3-part open polygonal chain; segment construction between two distinct labeled endpoints. Exclude rays as an assessed Skill, parallel/perpendicular relations, angle measurements, coordinate geometry, distance formulas, freehand precision, intersections and centimeter measurement. Canonical Skill definitions remain grade-independent and are never rewritten to fit these limits.

## Localization, accessibility and offline intent

All proposed learner-facing messages (including SVG descriptions, answer explanations, controls, geometry terms, measurement units, feedback and proposed recall Notes) must eventually receive **genuine supported-locale translations**. Do not invent translation resources, silently fall back to English, or interpret draft English copy as multilingual implementation. Design semantic LTR/RTL layout without changing mathematical order or map/measurement direction. Every meaningful visual manipulation requires a semantically equivalent keyboard/switch and nonvisual path; no forced dragging, color-only answers, precise drawing gestures, audio dependence or timers. WCAG 2.2 AA, large mobile controls, 200% text, reduced motion, correct reading order and complete offline access **after an actual download mechanism exists** are release requirements, not proof of implemented support.

## Sources and factual verification

- [Canonical lines-and-points Skill](../../../../data/skills/geometry/lines/skills/linesAndPoints.data.ts) — approved/promoted Mathematics data, copied without changing UUID, slug or translations.
- [Canonical segment Skill](../../../../data/skills/geometry/lines/skills/segment.data.ts) — approved/promoted Mathematics data, copied without changing UUID, slug or translations.
- [Studio Methodologist persona](../../../../../../studio/personas/methodist.persona.md), [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), and [Lesson entity](../../../../../../studio/docs/entities/lesson.md) define role ownership and independent Program-neutral Lesson scope.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md) is **not regenerated in this feature branch**. Coordinator must regenerate after integrating domain-local Skill registration; it cannot currently verify the newly transferred entries.

Mathematical worked cases are included as editorial models; they do not imply compliance with a specific nation's standard or experimental validation of individual learner mastery.

## Curriculum / Program compatibility

No national curriculum or Program assigned. The Lesson is standalone and may later be referenced from different Programs without changing the underlying Skill. Grade 2 is an **instructional depth choice**, not a Skill Taxonomy field.

## Open editorial decisions

- Confirm that two distinct canonical Skills appropriately form a single introductory Lesson (concept identification followed by segment construction), while remaining independently assessable. Keep rays as deferred dedicated Skill.
- **Approval gate remains open.** This Brief is Draft. User-authorized same-batch Lesson Content and Scene specifications are **provisional Drafts pending explicit Methodologist approval**, not a claim that Studio's standard approval gate has passed.

## Methodologist handoff

Editor should validate scope, prerequisites, examples, developmental fit, sources and misconceptions. A Screenwriter may refine the provisional narrative under this batch authorization; only formal approval permits an implemented Lesson design handoff. No React, runtime Lesson data, Question, Quiz, scoring, analytics, Note persistence or user-state event contract is authorized here.
