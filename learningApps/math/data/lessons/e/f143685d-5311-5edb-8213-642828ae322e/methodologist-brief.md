# Draw Segments of a Given Length — Methodologist Brief

Date: 2026-10-31
Lesson slug: drawingSegmentsInCentimeters
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Reverse the previous measurement question. Instead of measuring a segment that already exists, learners **construct** an original straight segment of a specified whole-centimeter length using the ruler's zero, a measured endpoint and a straight connecting stroke. This makes the zero-origin and interval ideas actionable without conflating drawing with reading.

## Target audience

**Primary grade: 2 (approximately ages 7–8).** Grade 2 learners (approximately 7–8) who know the scale marks 0–10, count equal intervals, and can distinguish a straight connection from a curve. A keyboard/touch option must place named endpoints and connect them without fine motor drawing; equivalent diagrams and state text are available to low-vision/nonvisual users.

**Instructional depth:** 1–10 cm whole-centimeter segments, straight-line construction from distinct marked endpoints with a correctly aligned schematic centimeter ruler; do not require a literal digital pen, physical ruler purchase or precise pixel drawing. Exclude millimeters/fractions, nonzero-origin subtraction as construction strategy, polygons, perimeter and calibrated physical-size drawing.

## Prerequisites

[useRuler.data.ts](../../../../data/skills/measurement/length/skills/useRuler.data.ts) (0 mark, intervals and alignment), [measureCentimeters.data.ts](../../../../data/skills/measurement/length/skills/measureCentimeters.data.ts) (length from pre-existing straight segment), [nonstandardLength.data.ts](../../../../data/skills/measurement/length/skills/nonstandardLength.data.ts) (no gaps/overlap), and [segment.data.ts](../../../../data/skills/geometry/lines/skills/segment.data.ts) for two endpoints and a straight connecting segment. Count up to ten; no fractions.

## Target Skills

- [drawSegmentCentimeters.data.ts](../../../../data/skills/measurement/length/skills/drawSegmentCentimeters.data.ts)

## Expected learning outcomes

- Start at the ruler's **printed 0 mark**, select the required length L in whole centimeters, and mark a second endpoint at the **L** tick without counting endpoints as intervals.
- Connect the two marked endpoints with **one straight stroke** to construct a segment of the specified length, with the ruler scale parallel to the segment.
- Explain and repair a construction error caused by starting at the physical edge/1 mark, using the wrong endpoint mark or drawing a bent path.
- Verify a newly drawn segment by checking its two endpoints against 0 and L with consistent unit labels.

## Essential subject matter

Given a target such as **5 cm**, choose point A at the ruler's 0 tick, count unit intervals to tick 5, mark B there and connect A to B by a straight stroke. The segment AB includes both endpoints; it spans **five** one-centimeter intervals, from 0–1 to 4–5. The pencil stroke should remain straight along the ruler. Drawing to mark 6 produces a **6 cm**, not 5 cm segment. Starting at mark 1 and drawing to mark 5 yields **4 cm**, not 5 cm. The ruler's unnumbered physical margin is not part of the scale. Diagram centimeters are **schematic** and must not be claimed physically accurate on phones, monitors or at different zoom levels.

## Conceptual progression and dependencies

1. Recall correct measurement of existing AB from 0 to 4 cm. 2) Show an empty ruler: to **make** a 4 cm segment, start at zero and mark the far dot at 4. 3) Let the learner choose target 3/5/7 and author the endpoints, then create a straight connection and verify. 4) Diagnose start-at-1 and bent-stroke counterexamples; finally construct an unseen 6 cm segment independently. Keep the creative construction challenge separate from prior 'what length is this existing segment?' task.

## Misconceptions, examples and boundaries

Counting five tick **labels** (0–4) as five spaces; placing A at plastic edge rather than zero; marking target 5 next to tick 4 because 0 is counted 'one'; choosing two marks but drawing a wavy path; accepting a ruler tilted away from the segment; assuming onscreen rendering represents real centimeters.

**Explicitly out of scope:** 1–10 cm whole-centimeter segments, straight-line construction from distinct marked endpoints with a correctly aligned schematic centimeter ruler; do not require a literal digital pen, physical ruler purchase or precise pixel drawing. Exclude millimeters/fractions, nonzero-origin subtraction as construction strategy, polygons, perimeter and calibrated physical-size drawing. Canonical Skill definitions remain grade-independent and are never rewritten to fit these limits.

## Localization, accessibility and offline intent

All proposed learner-facing messages (including SVG descriptions, answer explanations, controls, geometry terms, measurement units, feedback and proposed recall Notes) must eventually receive **genuine supported-locale translations**. Do not invent translation resources, silently fall back to English, or interpret draft English copy as multilingual implementation. Design semantic LTR/RTL layout without changing mathematical order or map/measurement direction. Every meaningful visual manipulation requires a semantically equivalent keyboard/switch and nonvisual path; no forced dragging, color-only answers, precise drawing gestures, audio dependence or timers. WCAG 2.2 AA, large mobile controls, 200% text, reduced motion, correct reading order and complete offline access **after an actual download mechanism exists** are release requirements, not proof of implemented support.

## Sources and factual verification

- [Canonical draw-segment Skill](../../../../data/skills/measurement/length/skills/drawSegmentCentimeters.data.ts) — approved/promoted Mathematics data, copied without changing UUID, slug or translations.
- [Studio Methodologist persona](../../../../../../studio/personas/methodist.persona.md), [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), and [Lesson entity](../../../../../../studio/docs/entities/lesson.md) define role ownership and independent Program-neutral Lesson scope.
- [Playground generated English taxonomy](../../../../docs/generated/skills/taxonomy.en.md) is **not regenerated in this feature branch**. Coordinator must regenerate after integrating domain-local Skill registration; it cannot currently verify the newly transferred entries.

Mathematical worked cases are included as editorial models; they do not imply compliance with a specific nation's standard or experimental validation of individual learner mastery.

## Curriculum / Program compatibility

No national curriculum or Program assigned. The Lesson is standalone and may later be referenced from different Programs without changing the underlying Skill. Grade 2 is an **instructional depth choice**, not a Skill Taxonomy field.

## Open editorial decisions

- Confirm that the independent outcome here is **construction**, not simply repeating the earlier reading-length Lesson, and that the no-drag construction mode is mathematically equivalent to manual line drawing.
- **Approval gate remains open.** This Brief is Draft. User-authorized same-batch Lesson Content and Scene specifications are **provisional Drafts pending explicit Methodologist approval**, not a claim that Studio's standard approval gate has passed.

## Methodologist handoff

Editor should validate scope, prerequisites, examples, developmental fit, sources and misconceptions. A Screenwriter may refine the provisional narrative under this batch authorization; only formal approval permits an implemented Lesson design handoff. No React, runtime Lesson data, Question, Quiz, scoring, analytics, Note persistence or user-state event contract is authorized here.
