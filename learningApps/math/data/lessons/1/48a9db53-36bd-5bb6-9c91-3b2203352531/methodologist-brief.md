# Half Past, Quarter Past, Quarter To — Methodologist Brief

Date: 2026-10-31
Lesson slug: halfAndQuarterHours
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Read analog and digital times at quarter-hour and half-hour marks, interpreting the minute hand and the continuously advancing hour hand. Grade 3 provides an appropriate depth for relating 15, 30 and 45 elapsed minutes to fractions of an hour and for distinguishing the hour that has begun from the next hour named in 'quarter to'.

The single target Skill is preserved in its canonical taxonomy; supporting activities are not new Skills.

## Target audience

**Primary: Grade 3**, approximately ages 8–9. Grade 3 provides an appropriate depth for relating 15, 30 and 45 elapsed minutes to fractions of an hour and for distinguishing the hour that has begun from the next hour named in 'quarter to'. Mixed reading fluency and language proficiency are expected: use short text, meaningful optional narration, explicit number/category labels, and full keyboard/touch and nonvisual alternatives. The Grade is a teaching-depth decision, not part of the Skill definition.

## Prerequisites

- Read exact-hour analog and digital clocks (existing Skill `readHour`).
- Count by 15 with guidance and recognize that one hour contains 60 minutes.
- Distinguish an hour hand from a minute hand and recognize the four quarter divisions of a circle.

Relevant previously transferred Playground Skill: `readHour`. The Lesson is standalone: a learner does not need to complete any named Program or another specific Lesson if equivalent prerequisite knowledge is present.

## Target Skills

- [readHalfQuarter.data.ts](../../../../data/skills/time/clock/skills/readHalfQuarter.data.ts)

## Expected learning outcomes

- Associate minute hand at 3 with 15 minutes after the hour, at 6 with 30, and at 9 with 45.
- Read 4:15 as quarter past four, 6:30 as half past six, and 7:45 as quarter to eight.
- Explain that at 7:45 the short hour hand is between 7 and 8, near 8—not exactly on 8.
- Match each analog position to a digital reading using the hour that has already started.
- Independently decode a new 10:45 analog display as quarter to eleven.

An instructional interaction shows what was taught or practiced, not validated mastery of every linked Skill.

## Essential subject matter

- A full revolution of the minute hand is 60 minutes. Four equally spaced quarter positions divide this revolution into four 15-minute intervals.
- A quarter past the hour is 15 minutes after it: 4:15 means the long hand points to 3 and the short hand sits just past 4.
- Half past the hour is 30 minutes after: 6:30 means the minute hand points to 6 and the hour hand is halfway from 6 to 7.
- At 7:45, 45 minutes have passed after 7; only 15 minutes remain before 8:00. This is quarter to eight, with the hour hand between 7 and 8 and closer to 8.
- The digital hour at 7:45 is still 7, even if the hour hand is near 8. An analog clock reading does not on its own specify morning or evening.

**Instructional depth and hard scope:** Twelve-hour analog clock, 15-, 30- and 45-minute readings, verbal quarter past / half past / quarter to expressions and matching digital time. No arbitrary minute reading, 24-hour format, AM/PM, interval arithmetic or time-zone comparisons. Quarter terminology is conceptual and must be localized naturally.

## Conceptual progression and dependencies

Begin with the learner's prerequisite mental model, introduce one controlling representation or condition, then have the learner explain both a confirming example and a tempting non-example. Later reduce hints so they apply the concept to a new setup. Grade 3 provides an appropriate depth for relating 15, 30 and 45 elapsed minutes to fractions of an hour and for distinguishing the hour that has begun from the next hour named in 'quarter to'. Do not infer that presentation, a correct guess or a revealed explanation certifies independent competence.

## Misconceptions, examples and boundaries

- Reading a long hand at 3 as 3 minutes past instead of 15.
- Reading 7:45 as 8:45 because the hour hand is nearer 8.
- Treating quarter to eight as 8:15 instead of 7:45.
- Assuming the hour hand jumps between hour numerals rather than advancing continuously.

**Exclusions:** All readings are snapshots at precisely 15-minute multiples; the note about moving hour hands is explanatory, not a request for general continuous-clock computation.

## Localization, accessibility and offline intent

Learner-facing text, mathematical language, captions, accessible labels and Scene feedback must ultimately have **genuine translations for every supported locale**; no missing keys, English placeholder translations or silent fallback are approved. Use semantically appropriate LTR/RTL layouts; do not mirror mathematics, clock meanings, figures or numeric symbols by default. Design equivalently meaningful touch, keyboard, screen-reader and low-vision paths, reduced-motion static representations, visible focus, adequate target sizes and WCAG 2.2 AA compliance. Preserve full learning functionality in low-resource and offline use once the platform supports packaged Lesson downloads. These are intended acceptance criteria, **not claims of current implementation**.

## Sources and factual verification

- [readHalfQuarter.data.ts](../../../../data/skills/time/clock/skills/readHalfQuarter.data.ts) — Mathematics canonical Skill definition/description; transferred to Playground without modification.
- [Lesson](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) entity contracts in Studio.
- Checked model cases and expected results are enumerated independently in the associated provisional Scene spec; verify them again at implementation.

## Curriculum / Program compatibility

Unspecified. Standalone learning objective only, with no external quest, reward or Program narrative. Grade is determined pedagogically and does not cap the taxonomy Skill.

## Open editorial decisions

- **Editor:** approve this Grade 3 audience, depth, boundary and Skill coverage; a Draft Brief does not authorize a later Approved state.
- **Methodologist/editor:** confirm any cross-representation scope before development; no Skill taxonomy edits are requested.
- **Screenwriter:** the authorized draft Content and Scene spec are **provisional pending this Methodologist decision** and require their own subsequent reviews.

## Methodologist handoff

Ready for editorial review only. The companion `content.md` and Scene specification have been drafted provisionally by explicit batch instruction; **formal Methodologist approval gate has not passed**. No React Scene, runtime Lesson, Question, Quiz or scoring has been authorized or implemented.
