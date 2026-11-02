# Measure Straight Segments in Centimeters — Methodologist Brief

Date: 2026-10-31
Lesson slug: measuringSegmentsInCentimeters
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Apply correct ruler placement to a **new quantitative task**: determine the length of a pre-existing straight segment, expressed as a count of centimeter intervals. Keep drawing a segment of given length for a separate future Skill.

## Target audience

**Primary audience: Grade 2 (approximately 7–8).** Primary Grade 2 (approximately 7–8 years). Learners can read major ruler ticks and count a sequence of equal intervals to 10. Use a fixed-scale diagram of a ruler and segment with verbal numerical equivalents, plus practical physical-ruler prompts.

**Instructional depth:** Already drawn, straight, integral centimeter segments of 1–10 cm only. No freehand drawing, uncertain endpoint fractions, mm/other units, ruler subtraction from a nonzero start as a taught strategy, digital screen calibration or signed measurement.

## Prerequisites

[useRuler.data.ts](../../../../data/skills/measurement/length/skills/useRuler.data.ts): find 0, identify equal centimeter intervals and align scale with a straight segment; [nonstandardLength.data.ts](../../../../data/skills/measurement/length/skills/nonstandardLength.data.ts): repeated equal units cover length without gaps or overlaps; [compareLength.data.ts](../../../../data/skills/measurement/length/skills/compareLength.data.ts): shared origin. No multiplication required.

## Target Skills

- [measureCentimeters.data.ts](../../../../data/skills/measurement/length/skills/measureCentimeters.data.ts)

## Expected learning outcomes

- Align a ruler's zero mark with one endpoint of an existing straight segment and the scale along the segment.
- Determine a whole-centimeter segment length by counting the **intervals from 0** to the other endpoint and state a correct number-and-unit result.
- Recognize that 0→6 has six intervals and a misleading start at 1 with an endpoint at 6 **does not** establish a 6 cm length.
- Identify and repair a common measuring error (wrong starting mark, tilt, off-end placement, or counting ticks) and explain the correction.

## Essential subject matter

For a straight segment with one endpoint at the 0 cm mark and the other at the 6 cm mark, the measured length is **6 cm**, because there are six equal unit intervals 0–1, 1–2, 2–3, 3–4, 4–5, 5–6. A segment that starts at 1 and ends at 6 spans **5** such intervals, but the introductory correct procedure resets the ruler to zero; do not teach subtraction as a substitute for alignment here. Every reported result includes the unit cm. The simulated centimeter spacings are **schematic** and must not claim physical accuracy on a device; real-world transfer requires a physical calibrated ruler.

## Conceptual progression and dependencies

Rehearse zero alignment and labeled tick reading from `useRuler`. Before giving any number, ask 'Which endpoints should meet?' Then demonstrate a 4 cm existing segment with exactly four equal intervals. Let the learner align a virtual ruler to preset segments of 3, 5, 7 cm, count intervals and state the full result. Contrast a ruler shifted to start at 1, then finish with an unseen whole-number segment and one diagnosed measuring error.

## Misconceptions, examples and boundaries

Reporting the number under an endpoint even when the start is not zero; counting both endpoint ticks (7 marks for 6 cm); failing to report 'cm'; treating a thicker/longer-looking screen rendering as calibrated length; believing a tilted ruler gives the correct reading.

**Explicit exclusions:** Already drawn, straight, integral centimeter segments of 1–10 cm only. No freehand drawing, uncertain endpoint fractions, mm/other units, ruler subtraction from a nonzero start as a taught strategy, digital screen calibration or signed measurement.

## Localization, accessibility and offline intent

All explanations, controls, Scene cues, alternative descriptions, feedback and eventual Note text require genuine translations in the supported locales with no missing-language fallback. For spatial direction, apply genuine semantic RTL adaptation rather than indiscriminate mirroring of geometry or mathematical order. For measurement, keep scale meaning and cm labels intact regardless of UI direction. Make learner actions possible by keyboard/switch/touch, with semantic equivalents to any visual manipulation, audible content fully captioned, reduced-motion alternatives, visible focus, readable targets and WCAG 2.2 AA review. The complete Lesson and its feedback must work offline after a verified download; this is an intended capability, not an existing implementation claim.

## Sources and factual verification

- [measureCentimeters.data.ts](../../../../data/skills/measurement/length/skills/measureCentimeters.data.ts) — immutable canonical Mathematics Skill data copied from `learningApps/math/data/skills/` with its UUID, translations and methodological description preserved.
- [Studio Methodologist persona](../../../../../../studio/personas/methodist.persona.md) and [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md) — editorial scope and workflow.
- [Playground taxonomy view](../../../../docs/generated/skills/taxonomy.en.md) — currently stale for these newly migrated domain Skills; coordinator regeneration is required before it can confirm their inclusion.

The examples are checked against the precise canonical Skill description, not treated as evidence of compliance with any particular jurisdiction's curriculum.

## Curriculum / Program compatibility

No Program or national Curriculum assigned. This standalone Lesson may later be referenced by multiple curricula, but the chosen Grade 2 depth is a Lesson decision only and **does not alter the grade-independent Skill definition**.

## Open editorial decisions

- Editor to confirm explicit physical-ruler practice opportunity, while preserving the fully accessible schematic on-screen method for learners without a ruler.
- **Approval gate:** this Brief has not received explicit Methodologist approval. Accompanying `content.md` and Scene spec are **provisional Drafts under the batch-specific user authorization**, not formally approved Lesson Content.

## Methodologist handoff

Review the intended audience, prerequisite chain, bounded mathematical examples and misconceptions before changing this Brief from Draft to Approved. The Educational Screenwriter's proposed Sections and Scene are separate editorial artifacts and may be revised if the Brief changes. No runtime Lesson component, Question, Quiz, scoring, Note persistence or content publication is authorized.
