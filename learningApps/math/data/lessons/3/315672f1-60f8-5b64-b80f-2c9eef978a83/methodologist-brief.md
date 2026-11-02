# Reading a Bar Chart — Methodologist Brief

Date: 2026-10-31
Lesson slug: readingBarCharts
Methodologist status: **Draft — pending explicit approval**
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Read categorical counts from a bar chart using its category labels, baseline and numerical scale, then compare values without treating bar width or decoration as the count.

**Why this lesson now:** After collecting counts, reading tables and building pictographs, a length-encoded bar chart is the next straightforward visual representation. The canonical Skill remains an independently assessable unit even though this Lesson structures examples and models around it.

## Target audience

**Primary grade: Grade 2**, approximately ages 7–8. Grade 2: pupils can already read one-to-one pictographs and simple count tables, enabling a bar chart with a zero baseline and unit steps. The grade and learning depth are editorial decisions and do not redefine the Skill's cross-grade identity. Use short child-native language and meaningful equivalent interactions for visual, nonvisual, mobile and multilingual learners.

## Prerequisites

- Read numerals 0–6 and count one unit at a time.
- Match a category label to its recorded count in a simple table.
- Understand that one picture symbol can represent one observation in an unscaled pictograph.

These are assumed competencies, not claims that a preceding Playground Lesson proves mastery. Missing prerequisites require separate support.

## Target Skills

- [readBarChart.data.ts](../../../../data/skills/data/presentation/skills/readBarChart.data.ts) — original canonical Mathematics Skill retained with exact UUID, names, multilingual metadata and methodological description.

## Expected learning outcomes

- Find the category indicated by each bar's label.
- Start at zero and count unit marks up to the bar top to read its numerical value.
- Report apples 4, pears 2 and plums 5 from a fixed correctly labelled chart.
- Compare the largest and smallest categories by their measured heights.
- Explain why a wide bar is not a larger count when its numerical height is shorter.

Observe explanations and transfer behaviors, not mere clicks or answer reveals. Formal assessment and scores are outside this editorial batch.

## Essential subject matter and depth

The example is a vertical bar chart with equal-width bars, a labelled y-axis starting at 0 and unit ticks 0,1,2,3,4,5,6. The table and bars are apples=4, pears=2, plums=5. The same valid chart may be redrawn with wider but equal-width bars; width is not a data axis. A purposely varied-width misleading decoration is shown only as a **non-authoritative contrast**, never as a recommended chart. The heights and categories determine values. No axis breaks or scales greater than one.

**Verified model cases:** Use apples=4, pears=2, plums=5, y-axis 0 to 6 in unit steps; 5 > 4 > 2. For transfer, use books read by three fictional readers or library shelf categories: red=3, blue=5, yellow=1 with a zero baseline and count unit 1. All charts have explicit unit names and source context.

## Conceptual progression and dependencies

Recall the relevant earlier model, ask a precise prediction, allow an active inspection, reveal a mathematically justified counterexample, then offer a new transfer condition. An inspectable bar-chart model with a numbered 0–6 y-axis, fixed unit scale 1, categorical x-axis and labelled count table; a deliberately misleading variable-width view is clearly marked as a bad design and can never replace the canonical model. The Screenwriter can adjust pacing within this conceptual boundary after Methodologist approval.

## Misconceptions, examples and boundaries

- The widest bar necessarily means the largest number.
- The tallest-looking decorative image is more than the numerical scale indicates.
- A bar must start its count from 1 instead of the 0 baseline.
- Changing the width changes the data value.
- A chart category's count can be read without consulting the scale.

**Explicit exclusions:** Do not teach constructing bar charts (separate Skill), unequal numeric steps, broken baselines, frequency ratios, 2D bar area interpretation, multiplication with scale values, histogram bins, percentages or statistical conclusions beyond simple comparisons.

## Localization, accessibility and offline intent

All future client-facing text, controls, feedback, Scene state descriptions, labels and any narration need **real** meaning-preserving translations for every supported locale. No silent English fallback, placeholder locale or missing dictionary key is acceptable. RTL adapts semantic reading and control order without changing mathematical quantities, fraction values, bar scale, data category labels or chronological meaning. Provide complete keyboard, touch and assistive-technology routes; equivalent alternatives for essential visual information; visible focus, contrast, reduced motion, readable small screens and WCAG 2.2 AA review. Once packaged for PWA download, all educational states must work offline and on weak devices; these are future implementation gates, not shipped functionality.

## Sources and factual verification

- Canonical Skill [readBarChart.data.ts](../../../../data/skills/data/presentation/skills/readBarChart.data.ts), including preserved methodological definition and names.
- [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Lesson entity](../../../../../../studio/docs/entities/lesson.md), [Section entity](../../../../../../studio/docs/entities/section.md) and [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md).
- Worked factual example model: Use apples=4, pears=2, plums=5, y-axis 0 to 6 in unit steps; 5 > 4 > 2. For transfer, use books read by three fictional readers or library shelf categories: red=3, blue=5, yellow=1 with a zero baseline and count unit 1. All charts have explicit unit names and source context.

## Curriculum / Program compatibility

Standalone and Program-neutral: no presumed national curriculum endorsement, story, mascot, external participant, grade-lock or previous account state. Links to prerequisite math ideas are conceptual only.

## Open editorial decisions

- **Methodologist:** Approve the brief and pedagogical use of one intentionally misleading chart as a critical comparison (not an endorsement of distorted data graphics).
- **Methodologist:** accept the Grade 2 audience, prerequisites and observable learning outcomes.
- **Screenwriter / Scene reviewer:** review the separate provisional documents after explicit Methodologist sign-off.
- **Coding Agent / QA:** eventually verify true locale completeness, LTR/RTL, nonvisual parity, offline delivery, tests and weak-device behavior. No implementation is claimed.

## Methodologist handoff

**Draft, not approved.** The accompanying Content and Scene spec are explicitly **provisional**, prepared as a batch deliverable without treating Methodologist approval as granted. There is no Lesson runtime config, Questions, Quiz, assessment, scoring, Notes entity or Scene React code in this batch.
