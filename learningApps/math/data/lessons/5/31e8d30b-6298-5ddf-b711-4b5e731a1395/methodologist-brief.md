# Equal Fractions, Different Pieces — Methodologist Brief

Date: 2026-10-31
Lesson slug: equalFractionsDifferentPieces
Methodologist status: **Draft — pending explicit approval**
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Use aligned visual representations of the same-sized whole to demonstrate that different numerator/denominator pairs can cover the same fraction of a whole, especially 1/2 = 2/4 and 1/3 = 2/6.

**Why this lesson now:** Earlier Lessons established a reference whole, unit fractions, multiple equal parts and how the numerator/denominator are read. The visual conservation of amount follows directly before symbolic comparison or fraction arithmetic. The canonical Skill remains an independently assessable unit even though this Lesson structures examples and models around it.

## Target audience

**Primary grade: Grade 3**, approximately ages 8–9. Grade 3: known fractional notation, shaded unit parts, numerator/denominator meaning and a fixed reference whole permit an equivalence model. The grade and learning depth are editorial decisions and do not redefine the Skill's cross-grade identity. Use short child-native language and meaningful equivalent interactions for visual, nonvisual, mobile and multilingual learners.

## Prerequisites

- Recognize equal-sized pieces of a single fixed whole.
- Read and construct 1/2, 2/4, 1/3 and 2/6 using the correct numerators and denominators.
- Explain that numerator counts selected parts while denominator names how many equal parts partition the same whole.

These are assumed competencies, not claims that a preceding Playground Lesson proves mastery. Missing prerequisites require separate support.

## Target Skills

- [equivalentVisual.data.ts](../../../../data/skills/fractions/representation/skills/equivalentVisual.data.ts) — original canonical Mathematics Skill retained with exact UUID, names, multilingual metadata and methodological description.

## Expected learning outcomes

- Build two equal-length bar models showing 1/2 and 2/4 shaded, aligned with the same reference whole.
- State why 1/2 and 2/4 name the same proportion despite different-looking part divisions.
- Identify 2/6 as equal to 1/3 when drawn using the same whole.
- Reject 1/2 = 2/6 using a same-whole model.
- Explain that equal fractions can shade different absolute-sized areas if displayed on different-sized wholes, so a same-whole visual comparison is needed.

Observe explanations and transfer behaviors, not mere clicks or answer reveals. Formal assessment and scores are outside this editorial batch.

## Essential subject matter and depth

Compare models only when the reference wholes have identical lengths/areas. A 12-unit bar split into 2 equal chunks of 6, one shaded, covers 6/12. The same 12-unit bar split into 4 chunks of 3, two shaded, also covers 6/12: 1/2 = 2/4. Another 12-unit bar split into 3 chunks of 4, one shaded, and into 6 chunks of 2, two shaded, each cover 4/12: 1/3 = 2/6. Contrast 1/2 versus 2/6 on the same 12-unit bar: 6/12 versus 4/12, not equal. Fractions as numbers are still equivalent independent of how large the physical whole is; only direct shaded-area comparison requires identical wholes.

**Verified model cases:** With the identical 12-unit reference strip: 1/2 = 6 units, 2/4 = 6 units, 1/3 = 4 units, 2/6 = 4 units; 2/6 ≠ 1/2. Splits are equal size within each model. Side-by-side aligned strips have a common starting edge. Use counted lengths and accessible textual numeric comparisons as a full alternative to graphics.

## Conceptual progression and dependencies

Recall the relevant earlier model, ask a precise prediction, allow an active inspection, reveal a mathematically justified counterexample, then offer a new transfer condition. Two parallel, same-start bars with independently selectable partitions of one reference length (12 units) and shading presets 1/2, 2/4, 1/3, 2/6; all comparisons expose the shaded length and the selected-part count. A clearly labelled alternative 24-unit whole appears only for whole-dependence transfer. The Screenwriter can adjust pacing within this conceptual boundary after Methodologist approval.

## Misconceptions, examples and boundaries

- Bigger numerator and denominator always mean more of the whole.
- Fractions are equal only when their symbols match.
- The number of shaded pieces alone decides the amount.
- One half of a short bar and two quarters of a long bar should have the same absolute shaded length.
- 1/2 and 2/6 are equal because both examples show two numbers.

**Explicit exclusions:** Defer simplification algorithms, multiplying numerator and denominator symbolically, all fraction arithmetic, common-denominator comparison and values above one. Describe the preserving relation conceptually; do not assume equivalence is established by looking at different-sized wholes.

## Localization, accessibility and offline intent

All future client-facing text, controls, feedback, Scene state descriptions, labels and any narration need **real** meaning-preserving translations for every supported locale. No silent English fallback, placeholder locale or missing dictionary key is acceptable. RTL adapts semantic reading and control order without changing mathematical quantities, fraction values, bar scale, data category labels or chronological meaning. Provide complete keyboard, touch and assistive-technology routes; equivalent alternatives for essential visual information; visible focus, contrast, reduced motion, readable small screens and WCAG 2.2 AA review. Once packaged for PWA download, all educational states must work offline and on weak devices; these are future implementation gates, not shipped functionality.

## Sources and factual verification

- Canonical Skill [equivalentVisual.data.ts](../../../../data/skills/fractions/representation/skills/equivalentVisual.data.ts), including preserved methodological definition and names.
- [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Lesson entity](../../../../../../studio/docs/entities/lesson.md), [Section entity](../../../../../../studio/docs/entities/section.md) and [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md).
- Worked factual example model: With the identical 12-unit reference strip: 1/2 = 6 units, 2/4 = 6 units, 1/3 = 4 units, 2/6 = 4 units; 2/6 ≠ 1/2. Splits are equal size within each model. Side-by-side aligned strips have a common starting edge. Use counted lengths and accessible textual numeric comparisons as a full alternative to graphics.

## Curriculum / Program compatibility

Standalone and Program-neutral: no presumed national curriculum endorsement, story, mascot, external participant, grade-lock or previous account state. Links to prerequisite math ideas are conceptual only.

## Open editorial decisions

- **Methodologist:** Review the distinction between equivalence of fraction numbers and differing absolute shaded areas when the wholes differ; avoid making larger-whole diagrams appear to disprove equivalence.
- **Methodologist:** accept the Grade 3 audience, prerequisites and observable learning outcomes.
- **Screenwriter / Scene reviewer:** review the separate provisional documents after explicit Methodologist sign-off.
- **Coding Agent / QA:** eventually verify true locale completeness, LTR/RTL, nonvisual parity, offline delivery, tests and weak-device behavior. No implementation is claimed.

## Methodologist handoff

**Draft, not approved.** The accompanying Content and Scene spec are explicitly **provisional**, prepared as a batch deliverable without treating Methodologist approval as granted. There is no Lesson runtime config, Questions, Quiz, assessment, scoring, Notes entity or Scene React code in this batch.
