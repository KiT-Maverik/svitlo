# Morning, Afternoon, Evening, Night — Methodologist Brief

Date: 2026-10-31
Lesson slug: partsOfTheDayInOrder
Methodologist status: **Draft — pending explicit approval**
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Sequence morning, afternoon, evening and night as a repeating daily cycle, and match plausible everyday situations to approximate periods without declaring fixed boundaries.

**Why this lesson now:** The clock lessons already establish readings at an instant; this introduces recurring qualitative periods before calendar dates or duration calculations. The canonical Skill remains an independently assessable unit even though this Lesson structures examples and models around it.

## Target audience

**Primary grade: Grade 1**, approximately ages 6–7. Early primary: everyday temporal vocabulary and ordered cycles before exact calendar arithmetic. The grade and learning depth are editorial decisions and do not redefine the Skill's cross-grade identity. Use short child-native language and meaningful equivalent interactions for visual, nonvisual, mobile and multilingual learners.

## Prerequisites

- Use the everyday words before and after to describe two events.
- Recognize a repeating sequence of familiar steps.
- Differentiate an approximate part of a day from a clock reading such as 8:00.

These are assumed competencies, not claims that a preceding Playground Lesson proves mastery. Missing prerequisites require separate support.

## Target Skills

- [daySequence.data.ts](../../../../data/skills/time/calendar/skills/daySequence.data.ts) — original canonical Mathematics Skill retained with exact UUID, names, multilingual metadata and methodological description.

## Expected learning outcomes

- Order morning → afternoon → evening → night for one daily cycle.
- Explain why the cycle goes from night to the next morning rather than stopping.
- Locate which named period immediately precedes or follows another within that stated cycle.
- Choose plausible periods for several example activities, while acknowledging schedules differ.
- Reject a single universal clock-hour boundary for words such as evening.

Observe explanations and transfer behaviors, not mere clicks or answer reveals. Formal assessment and scores are outside this editorial batch.

## Essential subject matter and depth

Use the deliberately simplified cycle morning, afternoon, evening, night, then back to morning. These labels are approximate social conventions and do not have universally fixed clock boundaries. Time-of-day activities depend on people, season, location and routines. For orientation, use a labelled four-state cycle, not a rigid timetable, daylight sensor or geography-specific sunrise rule.

**Verified model cases:** Use morning → afternoon → evening → night → next morning. Activities are examples only: breakfast can happen in morning for some families, but a nurse can work at night and someone can eat dinner earlier or later. Explicitly prevent an activity stereotype from becoming a formal definition.

## Conceptual progression and dependencies

Recall the relevant earlier model, ask a precise prediction, allow an active inspection, reveal a mathematically justified counterexample, then offer a new transfer condition. A locally driven, labelled four-state cycle where moving forward or backward highlights the adjacent period; one alternate display shows contextual activities as examples but no numerical start/end clock thresholds. The Screenwriter can adjust pacing within this conceptual boundary after Methodologist approval.

## Misconceptions, examples and boundaries

- Night is the end of the sequence and has no next period.
- Every family eats dinner or goes to school at the same time.
- Morning and evening always begin at an exact universal hour.
- The word afternoon means a fixed number of hours in every place and season.

**Explicit exclusions:** Do not teach weekdays, dates, months, leap years, elapsed time, clock-hour start/end thresholds or time-zone conversions. The neighboring canonical `weekMonthYear` Skill is not included.

## Localization, accessibility and offline intent

All future client-facing text, controls, feedback, Scene state descriptions, labels and any narration need **real** meaning-preserving translations for every supported locale. No silent English fallback, placeholder locale or missing dictionary key is acceptable. RTL adapts semantic reading and control order without changing mathematical quantities, fraction values, bar scale, data category labels or chronological meaning. Provide complete keyboard, touch and assistive-technology routes; equivalent alternatives for essential visual information; visible focus, contrast, reduced motion, readable small screens and WCAG 2.2 AA review. Once packaged for PWA download, all educational states must work offline and on weak devices; these are future implementation gates, not shipped functionality.

## Sources and factual verification

- Canonical Skill [daySequence.data.ts](../../../../data/skills/time/calendar/skills/daySequence.data.ts), including preserved methodological definition and names.
- [Lesson editorial architecture](../../../../../../studio/docs/architecture/lesson-editorial-document.md), [Lesson entity](../../../../../../studio/docs/entities/lesson.md), [Section entity](../../../../../../studio/docs/entities/section.md) and [Lesson Content entity](../../../../../../studio/docs/entities/lesson-content.md).
- Worked factual example model: Use morning → afternoon → evening → night → next morning. Activities are examples only: breakfast can happen in morning for some families, but a nurse can work at night and someone can eat dinner earlier or later. Explicitly prevent an activity stereotype from becoming a formal definition.

## Curriculum / Program compatibility

Standalone and Program-neutral: no presumed national curriculum endorsement, story, mascot, external participant, grade-lock or previous account state. Links to prerequisite math ideas are conceptual only.

## Open editorial decisions

- **Methodologist:** Confirm the precise internationalizable labels for morning/afternoon/evening/night and that this conceptual cycle is culturally appropriate without claiming universal fixed clock intervals.
- **Methodologist:** accept the Grade 1 audience, prerequisites and observable learning outcomes.
- **Screenwriter / Scene reviewer:** review the separate provisional documents after explicit Methodologist sign-off.
- **Coding Agent / QA:** eventually verify true locale completeness, LTR/RTL, nonvisual parity, offline delivery, tests and weak-device behavior. No implementation is claimed.

## Methodologist handoff

**Draft, not approved.** The accompanying Content and Scene spec are explicitly **provisional**, prepared as a batch deliverable without treating Methodologist approval as granted. There is no Lesson runtime config, Questions, Quiz, assessment, scoring, Notes entity or Scene React code in this batch.
