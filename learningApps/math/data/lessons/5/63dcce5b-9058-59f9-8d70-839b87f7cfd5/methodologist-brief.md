# Classify Polygons by Sides and Corners — Methodologist Brief

Date: 2026-10-31
Lesson slug: classifyingPolygonAttributes
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Move from merely naming familiar plane figures to **property-based classification** that remains valid when a polygon turns or changes proportions. A category must be justified with sides and vertices, not remembered from an upright picture.

## Target audience

**Primary audience: Grade 2 (approximately 7–8).** Primary Grade 2 (approximately 7–8 years). Learners recognize triangles, rectangles and squares from multiple orientations. Provide large traceable edges, narrated boundaries, integer side/vertex counts (3–6), nonvisual lists and a non-drag classification method.

**Instructional depth:** Simple, non-self-intersecting polygons only; 3–6 sides in primary practice, with all straight edges and clear vertices. No curved polygons, self-intersection, proof of Euler's formula, angle-sum formulas, concavity terminology or regular-polygon angle calculations. Square-as-rectangle nesting is acknowledged only when relevant; not a target of this Lesson.

## Prerequisites

[identify2dShapes.data.ts](../../../../data/skills/geometry/figures/skills/identify2dShapes.data.ts): identify basic flat figures despite rotation, color and scale. Count 1–6 reliably and distinguish a straight side from a meeting point. Re-teach the meaning of one 'corner' before introducing 'vertex' as a precise word.

## Target Skills

- [shapeAttributes.data.ts](../../../../data/skills/geometry/figures/skills/shapeAttributes.data.ts)

## Expected learning outcomes

- Recognize a **simple polygon** as a closed shape made from straight segments, distinguishing circles, open paths and shapes with curved edges.
- Count **sides** and **vertices** of simple polygons and explain that the totals match for a closed non-self-intersecting polygon.
- Classify and justify unfamiliar 3-, 4-, 5- and 6-sided polygons using counts rather than orientation, color or equal-sided appearance.
- Explain why a rotated or unequal-sided example can remain in the same side-count class, while a closed curved figure is not a polygon.

## Essential subject matter

A simple polygon is a **closed chain of straight line segments** meeting end-to-end without crossings, with at least three sides. The **sides** are straight edges; **vertices** are endpoints where neighboring sides meet. Each side has a next vertex in the loop: simple triangles have 3/3, quadrilaterals 4/4, pentagons 5/5, hexagons 6/6. The appearance or slant does not change these counts. A circle is a familiar plane figure but not a polygon. A 'wobbly closed loop' whose edges are curved is not a polygon. Do not imply all 4-sided shapes are rectangles, or all 5-sided examples must be regular.

## Conceptual progression and dependencies

Begin with an unfamiliar rotated 4-sided closed outline; invite a name but foreground 'How can we check?' Trace consecutive straight sides, mark each meeting point exactly once, and compare equal counts. Show a circle and open zigzag as deliberate non-examples. Let the learner change vertex positions while preserving a simple closed outline, recount, then independently classify a new irregular pentagon.

## Misconceptions, examples and boundaries

Treating a circle as a 'one-sided polygon'; double-counting the start vertex at closure; mistaking a decorative line inside a polygon for an outer side; assuming only regular/upright shapes qualify; classifying an open zigzag as a polygon; assuming sides and vertices are different totals for a simple closed polygon.

**Explicit exclusions:** Simple, non-self-intersecting polygons only; 3–6 sides in primary practice, with all straight edges and clear vertices. No curved polygons, self-intersection, proof of Euler's formula, angle-sum formulas, concavity terminology or regular-polygon angle calculations. Square-as-rectangle nesting is acknowledged only when relevant; not a target of this Lesson.

## Localization, accessibility and offline intent

All explanations, controls, Scene cues, alternative descriptions, feedback and eventual Note text require genuine translations in the supported locales with no missing-language fallback. For spatial direction, apply genuine semantic RTL adaptation rather than indiscriminate mirroring of geometry or mathematical order. For measurement, keep scale meaning and cm labels intact regardless of UI direction. Make learner actions possible by keyboard/switch/touch, with semantic equivalents to any visual manipulation, audible content fully captioned, reduced-motion alternatives, visible focus, readable targets and WCAG 2.2 AA review. The complete Lesson and its feedback must work offline after a verified download; this is an intended capability, not an existing implementation claim.

## Sources and factual verification

- [shapeAttributes.data.ts](../../../../data/skills/geometry/figures/skills/shapeAttributes.data.ts) — immutable canonical Mathematics Skill data copied from `learningApps/math/data/skills/` with its UUID, translations and methodological description preserved.
- [Studio Methodologist persona](../../../../../../studio/personas/methodist.persona.md) and [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — editorial scope and workflow.
- [Playground taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — currently stale for these newly migrated domain Skills; coordinator regeneration is required before it can confirm their inclusion.

The examples are checked against the precise canonical Skill description, not treated as evidence of compliance with any particular jurisdiction's curriculum.

## Curriculum / Program compatibility

No Program or national Curriculum assigned. This standalone Lesson may later be referenced by multiple curricula, but the chosen Grade 2 depth is a Lesson decision only and **does not alter the grade-independent Skill definition**.

## Open editorial decisions

- Editor to confirm use of irregular pentagons/hexagons and whether one concave polygon should appear as an optional later example. The Skill remains grade-independent; only this Lesson's depth is bounded.
- **Approval gate:** this Brief has not received explicit Methodologist approval. Accompanying `content.md` and Scene spec are **provisional Drafts under the batch-specific user authorization**, not formally approved Lesson Content.

## Methodologist handoff

Review the intended audience, prerequisite chain, bounded mathematical examples and misconceptions before changing this Brief from Draft to Approved. The Educational Screenwriter's proposed Sections and Scene are separate editorial artifacts and may be revised if the Brief changes. No runtime Lesson component, Question, Quiz, scoring, Note persistence or content publication is authorized.
