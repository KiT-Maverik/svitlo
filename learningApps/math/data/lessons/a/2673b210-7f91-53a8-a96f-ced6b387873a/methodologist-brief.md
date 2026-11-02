# From Tally Marks to a Table — Methodologist Brief

Date: 2026-10-31
Lesson slug: talliesIntoTables
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

Record observations as consistent tally marks, group them in fives, and transfer correctly matched category, tally and frequency values into a simple labelled table. Grade 2 learners who already count by category can externalize that count using marks and read a structured table; five-groups make counting efficient without requiring graph interpretation.

This Lesson intentionally joins 2 independently assessable Skills because a meaningful learning sequence must first build and then communicate the representation; it does not merge Skill identities or claim a new integrative Skill.

## Target audience

**Primary: Grade 2**, approximately ages 7–8. Grade 2 learners who already count by category can externalize that count using marks and read a structured table; five-groups make counting efficient without requiring graph interpretation. Mixed reading fluency and language proficiency are expected: use short text, meaningful optional narration, explicit number/category labels, and full keyboard/touch and nonvisual alternatives. The Grade is a teaching-depth decision, not part of the Skill definition.

## Prerequisites

- Count up to twelve, classify every observation into one exclusive category and check category totals (existing Skill `collectCounts`).
- Read category labels and a small two-column or three-column table with accessible row-by-row guidance.
- Recognize that a group of five equals four individual marks plus a fifth cross mark when that convention is taught.

Relevant previously transferred Playground Skill: `collectCounts`. The Lesson is standalone: a learner does not need to complete any named Program or another specific Lesson if equivalent prerequisite knowledge is present.

## Target Skills

- [tallyMarks.data.ts](../../../../data/skills/data/collection/skills/tallyMarks.data.ts)
- [fillSimpleTable.data.ts](../../../../data/skills/data/collection/skills/fillSimpleTable.data.ts)

## Expected learning outcomes

- Record each new observation by adding one mark to exactly one category's tally.
- Apply the explicitly taught grouping rule: four upright marks followed by a crossing fifth, then restart counting.
- Read six as a five-group plus one, four as four marks, and two as two marks.
- Fill a table in which category names, tally marks and frequency numerals refer to the same observations.
- Check that the row counts 6, 4 and 2 total twelve, and transfer the routine to 5, 2 and 1.

An instructional interaction shows what was taught or practiced, not validated mastery of every linked Skill.

## Essential subject matter

- Tally strokes are a compact record made while observations arrive. One new observation adds one mark to the row for its category.
- A common convention groups five strokes: four vertical lines and a fifth crossing them diagonally. A sixth observation begins another vertical stroke.
- A table provides labelled rows: each row has one category, its tally representation and its numerical frequency. A numeral without its row label can be misleading.
- For a twelve-card set with six birds, four cats and two dogs: birds have one group of five plus one, cats four single marks, dogs two; 6 + 4 + 2 = 12.
- The nonvisual equivalent announces 'group of five, one extra' rather than asking learners to identify crossing strokes by sight.

**Instructional depth and hard scope:** Single category variable, up to three mutually exclusive categories, one observation per token, counts 0–12, one record per item. Use one consistent five-bundled tally convention; no pie charts, averages, percentages or statistical inference.

## Conceptual progression and dependencies

Begin with the learner's prerequisite mental model, introduce one controlling representation or condition, then have the learner explain both a confirming example and a tempting non-example. Later reduce hints so they apply the concept to a new setup. Grade 2 learners who already count by category can externalize that count using marks and read a structured table; five-groups make counting efficient without requiring graph interpretation. Do not infer that presentation, a correct guess or a revealed explanation certifies independent competence.

## Misconceptions, examples and boundaries

- Recording the fifth stroke as a separate upright line when the rule requires a crossing mark.
- Putting a count in the wrong category's row.
- Counting the crossing stroke both as the fifth and as another five marks.
- Leaving an observed object unrecorded or counting a single object twice.

**Exclusions:** Do not introduce a new data-investigation Skill or infer comparisons from a single table as mastery of chart interpretation. Recording and reading tallies and accurately recording values in a table are two separately linked canonical Skills in this same lesson.

## Localization, accessibility and offline intent

Learner-facing text, mathematical language, captions, accessible labels and Scene feedback must ultimately have **genuine translations for every supported locale**; no missing keys, English placeholder translations or silent fallback are approved. Use semantically appropriate LTR/RTL layouts; do not mirror mathematics, clock meanings, figures or numeric symbols by default. Design equivalently meaningful touch, keyboard, screen-reader and low-vision paths, reduced-motion static representations, visible focus, adequate target sizes and WCAG 2.2 AA compliance. Preserve full learning functionality in low-resource and offline use once the platform supports packaged Lesson downloads. These are intended acceptance criteria, **not claims of current implementation**.

## Sources and factual verification

- [tallyMarks.data.ts](../../../../data/skills/data/collection/skills/tallyMarks.data.ts) — Mathematics canonical Skill definition/description; transferred to Playground without modification.
- [fillSimpleTable.data.ts](../../../../data/skills/data/collection/skills/fillSimpleTable.data.ts) — Mathematics canonical Skill definition/description; transferred to Playground without modification.
- [Lesson](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) entity contracts in Studio.
- Checked model cases and expected results are enumerated independently in the associated provisional Scene spec; verify them again at implementation.

## Curriculum / Program compatibility

Unspecified. Standalone learning objective only, with no external quest, reward or Program narrative. Grade is determined pedagogically and does not cap the taxonomy Skill.

## Open editorial decisions

- **Editor:** approve this Grade 2 audience, depth, boundary and joint-Skill pedagogical grouping; a Draft Brief does not authorize a later Approved state.
- **Methodologist/editor:** confirm any cross-representation scope before development; no Skill taxonomy edits are requested.
- **Screenwriter:** the authorized draft Content and Scene spec are **provisional pending this Methodologist decision** and require their own subsequent reviews.

## Methodologist handoff

Ready for editorial review only. The companion `content.md` and Scene specification have been drafted provisionally by explicit batch instruction; **formal Methodologist approval gate has not passed**. No React Scene, runtime Lesson, Question, Quiz or scoring has been authorized or implemented.
