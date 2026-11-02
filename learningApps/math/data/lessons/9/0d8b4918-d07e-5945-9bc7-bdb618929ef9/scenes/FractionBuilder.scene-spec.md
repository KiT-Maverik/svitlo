# FractionBuilder — Interactive Scene Specification

**Editorial status: Provisional Draft — pending Methodologist and separate Scene approvals.**
**Lesson:** [From One Part to Several Parts — Content](../content.md)
**Methodologist source:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skills:**

- [denominatorMeaning.data.ts](../../../../../data/skills/fractions/representation/skills/denominatorMeaning.data.ts)
- [numeratorMeaning.data.ts](../../../../../data/skills/fractions/representation/skills/numeratorMeaning.data.ts)
- [nonUnitModel.data.ts](../../../../../data/skills/fractions/representation/skills/nonUnitModel.data.ts)

## Pedagogical role

Extend an established unit fraction into fractions such as 2/4 and 3/4, distinguishing the number of equal parts making one whole (denominator) from the number selected (numerator).

**Why a custom interactive Scene is warranted:** Three adjacent canonical Skills form one coherent conceptual move: set the unit-part size, choose a number of those parts, and represent the resulting fraction. They remain independent Skills for later assessment. Switch among preset equal-part counts, select whole partition units with numbered buttons, inspect part sizes/covered cell counts, optionally reveal the conventional fraction, reset selected state or restore a known whole. Do not provide props or persist results.

This Scene is a **proposed self-contained, prop-free root**. A renderer for the generic `scene` Resource is not proof that this named Scene exists. All instructional presets are controlled internally, and no invented props, events, answer callbacks, Note persistence or global state are authorized.

## Model, essential visual states and verifiable answers

| State / preset    | Concrete representation                                             | Explanation / correct conclusion           |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| One whole         | 12-cell strip partitioned into four equal groups of 3, no selection | 0/4 selected, whole still twelve cells     |
| One selected      | Same partition, one group selected                                  | 1/4 = 3 of 12 cells                        |
| Three selected    | Same partition, three groups selected                               | 3/4 = 9 of 12 cells                        |
| All selected      | Same partition, all four groups selected                            | 4/4 = 12 of 12 cells = one whole           |
| Two thirds        | 12-cell strip partitioned 4+4+4, two groups selected                | 2/3 = 8 of 12 cells                        |
| Two quarters      | 12-cell strip partitioned 3+3+3+3, two groups selected              | 2/4 = 6 of 12 cells                        |
| Unequal warning   | 8-unit strip cut into 1,1,2,4, first three regions selected         | Not justified as 3/4 because parts unequal |
| Independent badge | 2×2 four-square badge, three squares selected                       | 3/4: top 3 chosen, bottom 4 equal parts    |

**Model scope and limitation:** Visual tile area is a model of a fraction of a _chosen_ whole; it does not authorize conclusions about different-sized wholes.

## Learner controls, transitions and no-penalty recovery

1. Start in a fully described initial preset. Announce all model conditions before a prediction: chosen whole, clock reading scale, table headings or spinner fairness conditions.
2. Make the next mathematical change depend on an explicit labelled learner action. Learner can always inspect numerical, textual and nonvisual descriptions of the same state.
3. Hold back the result label until a prediction or a voluntary reveal, then give a reason citing the governing condition—not only “Correct”.
4. Incorrect choices show the precise mismatch and allow retry, reset or exploration of another preset; no animation-only messages, automatic penalties or fake mastery transitions.
5. Switch between explicitly enumerated presets using controls **inside** this Scene, not through public props or a cross-Section state contract. Reset must restore the full initial conditions.
6. Provide a fresh independent transfer preset with optional hint and learner-triggered full reveal. The Scene remains useful when a learner skips prediction and requests explanation.

## Required explanatory feedback and errors

- **Four parts, but how many chosen? / 3/4:** “Yes: four equal pieces make the whole; exactly three are selected.”
- **Four parts, but how many chosen? / 4/3:** “That reverses the jobs. Four tells how many equal pieces the whole has; only three are selected.”
- **Four parts, but how many chosen? / 3/3:** “There are four equal pieces in the whole, including the unselected one. Check the bottom number.”
- **Change the top number, keep the part size / 4/4 fills whole:** “Four selected out of four equal parts covers the whole strip: 4/4 is one whole.”
- **Change the top number, keep the part size / 0/4 confusion:** “Zero selected parts cover none of the whole. The whole still has four equal parts.”
- **Change the top number, keep the part size / More denominator:** “The cut lines did not change, so the denominator stays four. Only the selected count changes.”
- **Change the bottom number instead / Same amount:** “Two parts are selected in both, but the parts have different sizes. Count: 8 cells versus 6 cells.”
- **Change the bottom number instead / 2/4 larger:** “Four equal cuts make smaller parts than three equal cuts in this same strip; two quarters cover less than two thirds.”
- **A new picture to explain alone / Equal model 4/3:** “There are four equal pieces, not three, in the whole. Three are marked.”
- **A new picture to explain alone / Unequal model accepted:** “A fraction names equal unit parts of one whole. Those four regions differ in area, so counting three of them is not enough.”

**Exclude:** Fractions greater than one, reducing and equivalence, fractions on number lines, same-denominator arithmetic and formal symbolic comparison are explicitly deferred.

## Equivalent participation without sight, color, drag or hearing

A labelled grid and a status line announce 'this whole has 4 equal parts; selected parts 1, 2, 3; three of four chosen; nine of twelve cells.' For comparison, provide 'thirds: 8 of 12 cells; quarters: 6 of 12 cells.' Learners can choose a unit-part number using keyboard controls rather than clicking small tiles.

All meaningful actions must work with keyboard and touch via clearly labelled semantic controls, with visible focus, coherent traversal and judicious state announcements. Do not require precise drag targets, perception of motion, audio or physical pointing. In a screen-reader mode, every label and explanation must preserve the actual quantitative relationships, not merely read an image title.

## Internationalization, access, mobile and offline acceptance

Supply genuine translations for all configured locales (including RTL languages), including control names, state descriptions, worked feedback, captions and any narration. No placeholder English duplicates or silent fallback. Semantic RTL affects reading/layout order but does not invert mathematical signs, fraction units, numeric ordering, clock-hand relationships or spinner probability. Support WCAG 2.2 AA, reduced motion, minimum accessible target sizes, responsive layout and equivalent low-resource/offline functioning once the PWA download infrastructure is implemented; do not assert these are already available.

## Coding Agent and Assessment Architect handoff

**Not implemented.** Future work must create the Scene module and its own co-located tests for every required state, reset, feedback, keyboard, focus, screen-reader, RTL, locale, reduced-motion, low-device and offline use case. There is no fabricated Scene API, Question/Quiz configuration, performance score or completion event. Methodologist approval must occur before this provisional specification becomes an approved implementation source.
