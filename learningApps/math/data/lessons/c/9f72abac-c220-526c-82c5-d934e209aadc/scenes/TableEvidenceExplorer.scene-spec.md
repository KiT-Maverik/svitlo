# TableEvidenceExplorer — Interactive Scene Specification

**Editorial status: Provisional Draft — pending Methodologist and separate Scene approvals.**
**Lesson:** [Find the Story in a Data Table — Content](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skills:**

- [readSimpleTable.data.ts](../../../../../data/skills/data/presentation/skills/readSimpleTable.data.ts)
- [compareCategories.data.ts](../../../../../data/skills/data/interpretation/skills/compareCategories.data.ts)

## Pedagogical role

Read a correctly labelled two-column category-frequency table and use compatible category counts to answer 'how many together?' and 'how many more?' questions.

**Why a custom interactive Scene is warranted:** After representing observations in a table, reading row/column headings and finding numerical differences is a coherent next step. Reading values and comparing totals are distinct target Skills. Explore a labelled table through row and column selectors, choose one or two rows, reveal quantity tokens/equations, match equal counts and count extras, switch to fresh dataset, reset. No ability or API to read a live spreadsheet is assumed. Keep all data preset and local, with no external props.

This Scene is a **proposed self-contained, prop-free root**. A renderer for the generic `scene` Resource is not proof that this named Scene exists. All instructional presets are controlled internally, and no invented props, events, answer callbacks, Note persistence or global state are authorized.

## Model, essential visual states and verifiable answers

| State / preset            | Concrete representation                                               | Explanation / correct conclusion      |
| ------------------------- | --------------------------------------------------------------------- | ------------------------------------- |
| Main table                | Two headings Shape / Number of shapes; Triangle 6, Square 4, Circle 2 | All values count shapes from one tray |
| Read square cell          | Square row × Number of shapes column                                  | 4 squares                             |
| Combine two               | Triangle 6 and Circle 2 selected                                      | 6+2=8 shapes                          |
| All rows                  | Triangle 6 + Square 4 + Circle 2                                      | 12 shapes total                       |
| Difference                | Triangle 6 and Square 4 paired                                        | 6−4=2 extra triangles                 |
| New table                 | Star 5, Moon 3, Sun 1, same unit shapes                               | 5+3+1=9 shapes; 5−3=2 gap             |
| Incompatible unit warning | An example length 4 cm placed beside count 6 shapes                   | Cannot treat cm as a count of shapes  |

**Model scope and limitation:** The table describes one invented finite tray of shapes, not a survey of a population. The explorer does not infer causes or statistics.

## Learner controls, transitions and no-penalty recovery

1. Start in a fully described initial preset. Announce all model conditions before a prediction: chosen whole, clock reading scale, table headings or spinner fairness conditions.
2. Make the next mathematical change depend on an explicit labelled learner action. Learner can always inspect numerical, textual and nonvisual descriptions of the same state.
3. Hold back the result label until a prediction or a voluntary reveal, then give a reason citing the governing condition—not only “Correct”.
4. Incorrect choices show the precise mismatch and allow retry, reset or exploration of another preset; no animation-only messages, automatic penalties or fake mastery transitions.
5. Switch between explicitly enumerated presets using controls **inside** this Scene, not through public props or a cross-Section state contract. Reset must restore the full initial conditions.
6. Provide a fresh independent transfer preset with optional hint and learner-triggered full reveal. The Scene remains useful when a learner skips prediction and requests explanation.

## Required explanatory feedback and errors

- **A number needs its label / 6 chosen for squares:** “Six belongs to Triangle. Follow the Square row across to the count column.”
- **A number needs its label / 4 with no unit:** “Four of what? The row and heading tell us: four square shapes.”
- **Together means add / 6+2=10:** “Count on from six: seven, eight. Two more makes eight.”
- **Together means add / Wrong total:** “Check all three rows exactly once: six triangles, four squares, two circles; 6+4+2=12.”
- **More than means find the gap / 10 as the difference:** “Ten is the total of both rows. To find how many MORE, match four pairs and count the two triangles left over.”
- **More than means find the gap / 2 as difference:** “Yes. Six minus four gives a gap of two shapes.”
- **A different table, your evidence / Total 8:** “Count all three categories: five plus three is eight, and one more sun makes nine.”
- **A different table, your evidence / Difference 8:** “Eight adds stars and moons; 'how many more' asks for the gap, five minus three = two.”

**Exclude:** Scaled bar charts, pictographs, line plots, percentages, statistical conclusions about a population and causal interpretations are deferred.

## Equivalent participation without sight, color, drag or hearing

Provide an accessible semantic table or ordered row-by-row transcript with headings and units. Every comparison exposes '6 triangles, 4 squares, match four pairs, two triangles remain' in logical order, with keyboard and screen-reader equivalents.

All meaningful actions must work with keyboard and touch via clearly labelled semantic controls, with visible focus, coherent traversal and judicious state announcements. Do not require precise drag targets, perception of motion, audio or physical pointing. In a screen-reader mode, every label and explanation must preserve the actual quantitative relationships, not merely read an image title.

## Internationalization, access, mobile and offline acceptance

Supply genuine translations for all configured locales (including RTL languages), including control names, state descriptions, worked feedback, captions and any narration. No placeholder English duplicates or silent fallback. Semantic RTL affects reading/layout order but does not invert mathematical signs, fraction units, numeric ordering, clock-hand relationships or spinner probability. Support WCAG 2.2 AA, reduced motion, minimum accessible target sizes, responsive layout and equivalent low-resource/offline functioning once the PWA download infrastructure is implemented; do not assert these are already available.

## Coding Agent and Assessment Architect handoff

**Not implemented.** Future work must create the Scene module and its own co-located tests for every required state, reset, feedback, keyboard, focus, screen-reader, RTL, locale, reduced-motion, low-device and offline use case. There is no fabricated Scene API, Question/Quiz configuration, performance score or completion event. Methodologist approval must occur before this provisional specification becomes an approved implementation source.
