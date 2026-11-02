# What Could the Result Be? — Methodologist Brief

Date: 2026-10-31
Lesson slug: listPossibleOutcomes
Methodologist status: Draft
Code: [Not implemented](#)
Program dependence: None

## Educational purpose

List every possible and only possible result of a clearly defined one-step random experiment, without mistaking outcomes for predictions or silently changing what is observed. After distinguishing certain and impossible events, a Grade 2 learner can practice complete and nonoverlapping lists using a four-sector numbered spinner before confronting outcomes with repeated colors.

The single target Skill is preserved in its canonical taxonomy; supporting activities are not new Skills.

## Target audience

**Primary: Grade 2**, approximately ages 7–8. After distinguishing certain and impossible events, a Grade 2 learner can practice complete and nonoverlapping lists using a four-sector numbered spinner before confronting outcomes with repeated colors. Mixed reading fluency and language proficiency are expected: use short text, meaningful optional narration, explicit number/category labels, and full keyboard/touch and nonvisual alternatives. The Grade is a teaching-depth decision, not part of the Skill definition.

## Prerequisites

- Classify events as possible, impossible or certain for explicitly specified contents (existing Skill `certainImpossible`).
- Recognize numerals 1 through 4 and compare sets of a few labels.
- Understand that one spin gives one reported value, not several values at once.

Relevant previously transferred Playground Skill: `certainImpossible`. The Lesson is standalone: a learner does not need to complete any named Program or another specific Lesson if equivalent prerequisite knowledge is present.

## Target Skills

- [listOutcomes.data.ts](../../../../data/skills/probability/events/skills/listOutcomes.data.ts)

## Expected learning outcomes

- State an experiment and what will be recorded before listing its outcomes.
- For a spinner with four sectors numbered 1, 2, 3, 4, list exactly 1, 2, 3, 4 as possible reported results.
- Identify missing and impossible entries in an outcome list, explaining why 5 is not a result on this spinner.
- Distinguish individual spinner sectors or tokens from the reported number/color when labels repeat.
- For a bag holding two red tokens and one blue token, list the possible _colors_ as red and blue once each, not red/red/blue or green.

An instructional interaction shows what was taught or practiced, not validated mastery of every linked Skill.

## Essential subject matter

- A random experiment has defined conditions. An outcome is the one value recorded when it is performed once.
- If a four-sector spinner is labeled 1, 2, 3, 4 and the recorded value is the number shown, the possible outcomes are exactly {1, 2, 3, 4}. Every spin reports one of these, never a 5.
- The possible-outcome list includes each distinct reported value. A missing possible value makes the list incomplete; an impossible value makes it inaccurate.
- If we draw exactly one token from a bag with two red and one blue and record its **color**, the possible color outcomes are {red, blue}. There are three physical tokens but two distinct reported color values.
- A list of _possible colors_ is not a tally of how many physical tokens carry those colors and does not imply equal likelihood. If token identity were recorded instead, it would be a different experiment description.

**Instructional depth and hard scope:** One draw or one spin; finite sample spaces, at most four visibly specified sectors or three tokens. Outcomes are mutually exclusive and exhaustive at the _chosen description level_. No probability arithmetic, numerical odds, equal-likelihood assumptions, replacement protocols or predictions of the next actual result.

## Conceptual progression and dependencies

Begin with the learner's prerequisite mental model, introduce one controlling representation or condition, then have the learner explain both a confirming example and a tempting non-example. Later reduce hints so they apply the concept to a new setup. After distinguishing certain and impossible events, a Grade 2 learner can practice complete and nonoverlapping lists using a four-sector numbered spinner before confronting outcomes with repeated colors. Do not infer that presentation, a correct guess or a revealed explanation certifies independent competence.

## Misconceptions, examples and boundaries

- Inventing a result not present in the specified spinner or bag.
- Leaving out a possible result because it seems unlikely or has not appeared in a previous try.
- Listing 'red' twice when asked for distinct **reported colors** from two red tokens and one blue token.
- Assuming that a list of two possible colors makes them equally likely.
- Changing from recording a color to recording token identity without noticing the changed question.

**Exclusions:** The experiment is one independent spin or draw with fully disclosed contents; the learner lists outcomes at the specified observation level only. Comparing likelihood, calculating ratios and repeated-run variation are reserved for their own Skills.

## Localization, accessibility and offline intent

Learner-facing text, mathematical language, captions, accessible labels and Scene feedback must ultimately have **genuine translations for every supported locale**; no missing keys, English placeholder translations or silent fallback are approved. Use semantically appropriate LTR/RTL layouts; do not mirror mathematics, clock meanings, figures or numeric symbols by default. Design equivalently meaningful touch, keyboard, screen-reader and low-vision paths, reduced-motion static representations, visible focus, adequate target sizes and WCAG 2.2 AA compliance. Preserve full learning functionality in low-resource and offline use once the platform supports packaged Lesson downloads. These are intended acceptance criteria, **not claims of current implementation**.

## Sources and factual verification

- [listOutcomes.data.ts](../../../../data/skills/probability/events/skills/listOutcomes.data.ts) — Mathematics canonical Skill definition/description; transferred to Playground without modification.
- [Lesson](../../../../../../studio/docs/entities/lesson.md), [Lesson Content](../../../../../../studio/docs/entities/lesson-content.md), [Section](../../../../../../studio/docs/entities/section.md) and [Program](../../../../../../studio/docs/entities/program.md) entity contracts in Studio.
- Checked model cases and expected results are enumerated independently in the associated provisional Scene spec; verify them again at implementation.

## Curriculum / Program compatibility

Unspecified. Standalone learning objective only, with no external quest, reward or Program narrative. Grade is determined pedagogically and does not cap the taxonomy Skill.

## Open editorial decisions

- **Editor:** approve this Grade 2 audience, depth, boundary and Skill coverage; a Draft Brief does not authorize a later Approved state.
- **Methodologist/editor:** confirm any cross-representation scope before development; no Skill taxonomy edits are requested.
- **Screenwriter:** the authorized draft Content and Scene spec are **provisional pending this Methodologist decision** and require their own subsequent reviews.

## Methodologist handoff

Ready for editorial review only. The companion `content.md` and Scene specification have been drafted provisionally by explicit batch instruction; **formal Methodologist approval gate has not passed**. No React Scene, runtime Lesson, Question, Quiz or scoring has been authorized or implemented.
