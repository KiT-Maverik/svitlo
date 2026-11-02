# Find Zero and Read a Ruler — Methodologist Brief

Date: 2026-10-31
Lesson slug: rulerZeroAndMarks
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Transition from covering an object with identical nonstandard pieces to reading a **standardized, evenly divided instrument**. This introductory Lesson teaches instrument setup; measuring an unknown existing segment is reserved for the separate next Skill.

## Target audience

**Primary audience: Grade 1 (approximately 6–7).** Primary Grade 1 (approximately 6–7 years). Children can count to 10 and have placed equal-sized tiles end-to-end. Use a large high-contrast schematic ruler, short instructions, numbered controls and optional tangible-ruler extension. Never assume a screen image has physical centimeter size.

**Instructional depth:** Simple 0–10 centimeter major ticks and a straight segment, no millimeter readings, fractions, nonzero-start subtraction, screen calibration, unknown-length answer, constructing segments or conversions. Instrument use is distinct from subsequent segment measurement.

## Prerequisites

[nonstandardLength.data.ts](../../../../data/skills/measurement/length/skills/nonstandardLength.data.ts): equal units must cover a length consecutively without gaps or overlaps; [compareLength.data.ts](../../../../data/skills/measurement/length/skills/compareLength.data.ts): line up starting endpoints. Count 0–10 and identify an object's left or right endpoint in a labeled visual without relying on reading alone.

## Target Skills

- [useRuler.data.ts](../../../../data/skills/measurement/length/skills/useRuler.data.ts)

## Expected learning outcomes

- Find the ruler's **printed zero** rather than the physical plastic edge or printed '1' mark.
- Explain that consecutive centimeter marks represent **equal-length intervals** and point to the space between two neighboring marks.
- Place a ruler with the **zero mark at a segment's starting endpoint**, along the segment rather than tilted away from it.
- Read several printed centimeter mark labels (e.g. 0, 1, 2, 3, 4, 5) in order without mistaking the number for the quantity of marks.

## Essential subject matter

A ruler's marked **zero** establishes a measurement origin. The first centimeter interval is from 0 to 1, not from the ruler's outer physical edge to the '1'. The next equal interval is 1 to 2. A ruler positioned with 0 opposite a straight segment's first endpoint and its scale along the segment is ready to be used. In this Lesson, learners identify and **read** scale marks, but the separate Skill `measureCentimeters` will ask them to determine an unknown segment's length. Make explicit that an SVG drawing is schematic: display pixels and arbitrary browser zoom are **not guaranteed real-world centimeters**.

## Conceptual progression and dependencies

Reactivate the equal-tile measuring principle by showing four identical 1-unit gaps. Reveal a ruler with the same interval pattern and visible '0'. Contrast the ruler's physical edge with its zero line. Invite the learner to align the zero line and run parallel to a fixed guide segment; ask for labels at specific marks rather than the segment's total measured length. Independent transfer: identify zero and the first two equal intervals on a differently styled ruler.

## Misconceptions, examples and boundaries

Starting at ruler's outer edge or printed '1'; counting tick marks instead of intervals; assuming uneven screen tick spacing is acceptable; placing ruler diagonally away from the line; treating an uncalibrated onscreen ruler as a true physical centimeter measure.

**Explicit exclusions:** Simple 0–10 centimeter major ticks and a straight segment, no millimeter readings, fractions, nonzero-start subtraction, screen calibration, unknown-length answer, constructing segments or conversions. Instrument use is distinct from subsequent segment measurement.

## Localization, accessibility and offline intent

All explanations, controls, Scene cues, alternative descriptions, feedback and eventual Note text require genuine translations in the supported locales with no missing-language fallback. For spatial direction, apply genuine semantic RTL adaptation rather than indiscriminate mirroring of geometry or mathematical order. For measurement, keep scale meaning and cm labels intact regardless of UI direction. Make learner actions possible by keyboard/switch/touch, with semantic equivalents to any visual manipulation, audible content fully captioned, reduced-motion alternatives, visible focus, readable targets and WCAG 2.2 AA review. The complete Lesson and its feedback must work offline after a verified download; this is an intended capability, not an existing implementation claim.

## Sources and factual verification

- [useRuler.data.ts](../../../../data/skills/measurement/length/skills/useRuler.data.ts) — immutable canonical Mathematics Skill data copied from `learningApps/math/data/skills/` with its UUID, translations and methodological description preserved.
- [Studio Methodologist persona](../../../../../../studio/personas/methodist.persona.md) and [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — editorial scope and workflow.
- [Playground taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — currently stale for these newly migrated domain Skills; coordinator regeneration is required before it can confirm their inclusion.

The examples are checked against the precise canonical Skill description, not treated as evidence of compliance with any particular jurisdiction's curriculum.

## Curriculum / Program compatibility

No Program or national Curriculum assigned. This standalone Lesson may later be referenced by multiple curricula, but the chosen Grade 1 depth is a Lesson decision only and **does not alter the grade-independent Skill definition**.

## Open editorial decisions

- Editor to verify Grade 1 audience appropriateness and that the Scene clearly separates reading tick labels from measuring an unknown length. No physical calibration promises.
- **Approval gate:** this Brief has not received explicit Methodologist approval. Accompanying `content.md` and Scene spec are **provisional Drafts under the batch-specific user authorization**, not formally approved Lesson Content.

## Methodologist handoff

Review the intended audience, prerequisite chain, bounded mathematical examples and misconceptions before changing this Brief from Draft to Approved. The Educational Screenwriter's proposed Sections and Scene are separate editorial artifacts and may be revised if the Brief changes. No runtime Lesson component, Question, Quiz, scoring, Note persistence or content publication is authorized.
