# Reading Every Minute — Methodologist Brief

Date: 2026-10-31
Lesson slug: readingIndividualMinutes
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Read and record analog time to the nearest minute across all 60 equally spaced minute positions, matching it to correct two-digit digital minute notation while distinguishing a clock instant from elapsed duration.

**Pedagogical rationale and placement:** After exact hours, half/quarter hours and five-minute marks, learners can count the smaller one-minute ticks accurately and combine the elapsed minute number with the hour hand's interval.

The single canonical target Skill is a competency, not an interaction format or an assessed mastery state.

## Target audience

**Primary grade: Grade 3; ages approximately 8–9.** This depth follows the stated prerequisites, not an arbitrary one-Skill-per-Grade or one-Lesson-per-Skill mapping. Design for emerging literacy, mixed language proficiency, variable math fluency and accessibility needs. Use short concrete learner-facing copy, clear audible/textual alternatives and non-motor-precision inputs. The canonical Skills have no Grade ceiling.

## Prerequisites

- Identify both clock hands and read exact hours, quarter/half hours and five-minute marks.
- Count by fives through 55 and count 1–4 more; read two-digit numerals.
- Recognize that minute 00 begins an hour and minute 59 immediately precedes the next exact hour.

Previously transferred, pedagogically adjacent Skills: `readHour`, `readHalfQuarter`, `readFiveMinute`. The Lesson itself must remain standalone and Program-neutral; a learner with the equivalent knowledge need not complete any named preceding Lesson.

## Target Skills

- [readMinute.data.ts](../../../../data/skills/time/clock/skills/readMinute.data.ts)

## Expected learning outcomes

- Identify a minute hand at two small ticks past 3 as 17 minutes, so an hour hand between 2 and 3 shows 2:17.
- Identify a minute hand at two small ticks past 8 as 42 minutes; pair with the hour hand between 7 and 8 to read 7:42.
- Write minutes 03 with a leading zero in a digital clock reading, e.g., 5:03.
- Read a late-hour analog display as 11:59 rather than 12:59 by checking which hour has already started.
- Explain that a clock displaying 2:17 names an instant of day, while “17 minutes” alone describes a duration, not a unique time.

These observable outcomes state what the Lesson intends to teach and invite learners to demonstrate. Neither a single correct choice nor completion of a Section guarantees validated mastery of an individual Skill.

## Essential subject matter

- A standard analog clock has sixty equal minute positions, including the top reference position corresponding to minute 00. Moving the long hand from one minute tick to the next marks one minute.
- Large numbered positions are five-minute landmarks: at 3 means 15; two additional small ticks beyond 3 make 17.
- At 7:42, the long hand is two one-minute ticks beyond the numeral 8 (40+2), and the short hand has advanced from 7 toward 8 by 42/60 of the interval.
- A digital clock normally writes minute fields using exactly two digits: 5:03 not 5:3; minute values 00 through 59 are elapsed minutes since the start of that hour.
- At 11:59 the short hand is almost at 12 but still has not completed the hour; after one more minute the dial reads 12:00 on a twelve-hour clock.
- Time-of-day 2:17 and elapsed duration 17 minutes answer different questions; one is a clock instant, the other an interval.

**Depth selected for this audience:** Grade-3 conceptual and practical precision for 1-minute increments 00–59 only, using a 12-hour clock. Include small-tick counting, two-digit digital minutes, and instant-versus-duration distinction. Exclude 24-hour formatting, AM/PM determination from the clock alone, time arithmetic, seconds, variable clock precision and time-zone concerns.

## Conceptual progression and dependencies

Build on the listed prerequisites, expose the _reference_ (whole size, hour and minute scale, pictograph key, or random-experiment conditions) before asking the learner to reason. Move from a familiar case to an interactive contrast that makes a common misconception visible, then apply the correct rule in an independent fresh example. The Screenwriter chooses presentation, interactions and number of Sections; the Methodologist owns content limits and accuracy. Supporting representations teach a Skill; they do not create additional Skill IDs.

## Misconceptions, examples and boundaries

- The numeral 3 always means minute 3 rather than 15.
- A tick two spaces past a number is an extra five minutes rather than two minutes.
- The short hour hand exactly points to the current hour mark throughout the hour.
- 5:3 is the standard two-digit digital display instead of 5:03.
- A hand near the next hour has already reached that hour.
- An interval of 17 minutes is itself the same thing as clock time 2:17.

**Explicit exclusions:** Grade-3 conceptual and practical precision for 1-minute increments 00–59 only, using a 12-hour clock. Include small-tick counting, two-digit digital minutes, and instant-versus-duration distinction. Exclude 24-hour formatting, AM/PM determination from the clock alone, time arithmetic, seconds, variable clock precision and time-zone concerns. Do not implicitly extend the canonical Skill description, invent new taxonomy entities or treat any exercise format as a separately approved Skill.

## Localization, accessibility and offline intent

Complete authentic translation of all learner-facing text, mathematical terminology, captions, nonvisual model descriptions, controls, hints and feedback is mandatory for every standard locale at implementation. No English replacement text, fake dictionaries, silent fallbacks or `allLocales` assertions of incomplete coverage. Adapt layout and narrative order semantically for RTL without reversing mathematical truth. Require meaningful keyboard/touch/screen-reader participation, visible focus, adequate targets, high contrast, static reduced-motion representation, small-screen readability and WCAG 2.2 AA testing. Once downloaded, the complete Lesson, Scene and explanatory feedback must run offline on low-resource devices. These are requirements, not claims that runtime assets or PWA flows exist.

## Sources and factual verification

- [readMinute.data.ts](../../../../data/skills/time/clock/skills/readMinute.data.ts) — canonical Mathematics Skill object and methodological description.
- Studio [Lesson](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) contracts.
- Scene specification below records fully specified examples and truth conditions for subsequent mathematical and editorial review.

## Curriculum / Program compatibility

Not specified. Standalone and Program-neutral. Do not claim formal Ukrainian or international Curriculum alignment without reviewing a concrete Curriculum.

## Open editorial decisions

- **Editor/Methodologist:** verify Grade 3 audience, prerequisite suitability, target Skills, depth and treatment of the listed misconceptions.
- **Editor/Screenwriter:** approve the provisional Section plan and separately review the custom Scene specification only after the Methodologist Brief is accepted.
- **Engineering/QA:** accessible equivalence, locale coverage, offline behavior, tests and runtime Section integration remain future implementation work, not established behavior.

## Methodologist handoff

**Draft pending editorial approval.** Companion Content and Scene specifications are _provisional_ under the explicit batch instruction; their creation does not satisfy or bypass the Methodologist approval gate. No runtime Lesson_Config, Question, Quiz, React Scene, scoring, storage API or Note implementation is authorized by this handoff.
