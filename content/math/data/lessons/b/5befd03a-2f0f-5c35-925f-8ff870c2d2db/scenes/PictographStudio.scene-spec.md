# PictographStudio — Interactive Scene Specification

**Status: Provisional Draft; pending Methodologist approval and independent Scene editorial review.**
**Lesson Content:** [Pictures That Count](../content.md)
**Methodologist:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skills:**

- [buildPictograph.data.ts](../../../../../data/skills/data/presentation/skills/buildPictograph.data.ts)
- [readPictograph.data.ts](../../../../../data/skills/data/presentation/skills/readPictograph.data.ts)

## Educational purpose and intended web interaction

Construct and interpret one-to-one pictographs with a clear category label and key where one identical symbol represents exactly one observation, validating the chart against its source table.

A learner-manipulable table-to-pictograph builder and a separate read-only example. Rows carry explicit text category names; each count icon is a same-size tally token independent of the fruit/animal's real shape. The key is always displayed and narrated.

**Self-contained design:** One independently initializable, prop-free Scene root owns all preset data, controls, explanations and interaction state. Multiple Section placements must not rely on props or state inherited from other Scenes. No invented renderer registration, engine hooks, scoring or persistence are authorized by this document.

## Exact factual models and required states

| Preset/state            | Model shown or described                                                                 | Correct observation and explanatory result     |
| ----------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Builder initial**     | Source table Apple=4, Pear=3, Plum=2; all pictograph rows empty; key one icon = one item | Chart needs 4/3/2 count icons                  |
| **Builder complete**    | Apple row four tokens, Pear row three, Plum row two                                      | 4+3+2=9, matches table total                   |
| **Builder error**       | Apple row five tokens while source table says four                                       | One extra Apple icon; repair by removing one   |
| **Reader A**            | Cat row five equal icons, Dog row two, Bird row four; one=one key                        | Five cats, two dogs, four birds; total eleven  |
| **Empty category test** | A category count of zero with a labelled empty row                                       | Zero icons for that category, not missing data |
| **Transfer**            | New table Star=2, Moon=4, Sun=1; key one icon = one item                                 | 2+4+1=7 icons in correctly labelled rows       |

**Validity boundary:** Strictly one identical accessible counting symbol per observed item and unscaled keys (1 icon = 1 item); two or three categories and counts of 0–6, with totals at most twelve. No half-icons, scaled pictographs, bar charts, averages, percentages or inferential claims. Distinguish reading the chart from making it.

## Learner actions, transitions and recovery

Choose internal 'Build' or 'Read' mode, select labelled row and add/remove exactly one equal count symbol with native buttons, compare row icon count to the table, reveal row-wise explanation, reset to known source table. Reading mode asks for a row count without altering the chart. No precise drag, props, or scores.

1. Start from one fully specified state with all its reference data visible or available via the text equivalent (whole, units, tick scale, key, or experimental conditions).
2. Let the learner predict before an automatic answer reveal where useful, but always permit a voluntary request for a worked explanation without an assessment gate.
3. For each action, preserve mathematical invariants, update the model deterministically and expose the new state and relevant numbers using both a visible and a structured accessible description.
4. Incorrect prediction or choice: explain what contradicts the claim (actual part size, the hand's position, chart's row count, or sample-space evidence) and allow an undo, retry or reset, without score or penalty.
5. Switch presets without leaking state between separate Scene instances; reset returns the current Scene to the documented initial state. A later independent transfer must hide the worked result until prediction or voluntary reveal, not hide the evidence itself.
6. No essential knowledge depends on autoplay motion, sound, fixed response time, probability of hitting a random state, or fine motor skill.

## Detailed explanatory feedback

- **Pictures can keep a count: One icon per row.** “The key says one icon is one fruit, not one whole category. Four apples need four separate icons.”
- **Pictures can keep a count: Icon size matters.** “All count symbols represent one object each. Their displayed size does not change their meaning.”
- **Build a pictograph from the table: Apple has five icons.** “The table records four apples. Remove the extra Apple icon so chart and table agree.”
- **Build a pictograph from the table: Pear has two icons.** “Three pears are in the table. Add one more Pear icon to the Pear row.”
- **Build a pictograph from the table: Total not nine.** “Add the three row counts. The table has 4+3+2 = 9 fruit observations.”
- **Read somebody else's picture: Five dogs.** “Five icons belong to Cat, not Dog. Find the Dog row, then count its two symbols.”
- **Read somebody else's picture: Eleven dogs.** “Eleven counts every animal in all rows. The Dog row alone has two.”
- **Your new chart: Moon has three icons.** “The Moon row's source count is four. Add the fourth symbol.”
- **Your new chart: Total six.** “Two plus four plus one is seven. Count the icons in all three labelled rows again.”

**Model limitations:** All examples are explicitly constrained to the conditions above. Do not extrapolate to unsupported operations or claim a simulation proves mastery or statistical generalizations. For the probability Scene, recorded illustrative sequences must never be described as a live random experiment that empirically verified fairness.

## Accessible equivalent path

Offer a fully equivalent textual row-by-row view listing category, key, icon IDs and count; keyboard buttons add/remove one icon in a named row. For instance 'Apple—4 icons, key one icon for one fruit—four apples', with no need to distinguish colors or shapes visually.

All key interactions must be fully operable with native labelled keyboard/touch controls. Screen readers need a chronological, understandable announcement of changes without a flood of redundant narration. Use text labels and descriptive math/value captions rather than color or position alone. Include visible focus, sensible order, reduced-motion/static states, adequate touch sizing and narrow-screen alternatives.

## Locale / RTL / offline / weak-device requirements

Genuine meaning-preserving translations of every label, narration, option, alt description and explanatory message are required in every supported locale; **do not implement silent English fallbacks, fake translations or missing dictionaries**. Distinguish mathematical meaning from visual LTR/RTL arrangement; fraction slash interpretation, clock hands and spinner probabilities must not be reversed by naive mirroring. The same lesson functionality must remain available on low-power/mobile devices and offline after complete package download. These are implementation acceptance criteria, not features supplied by this specification.

## Implementation boundary and test handoff

Scene is **specified, not coded**. Later Design Scene implementation requires a prop-free React component, localized content via existing context, exact required state handling, separate Scene-specific automated tests, focus/screen-reader tests, true RTL, keyboard/touch parity, reduced motion and offline validation. No Lesson_Config, Question_Config, Quiz_Config, grading, completion API, Note API or real RNG is introduced here. Editor review is required before implementation.
