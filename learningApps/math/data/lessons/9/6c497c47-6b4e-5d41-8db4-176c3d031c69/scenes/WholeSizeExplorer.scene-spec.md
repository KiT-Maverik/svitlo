# WholeSizeExplorer — Interactive Scene Specification

**Status: Provisional Draft; pending Methodologist approval and independent Scene editorial review.**
**Lesson Content:** [Same Fraction, Different Whole](../content.md)
**Methodologist:** [Draft Brief](../methodologist-brief.md)
**Canonical target Skills:**

- [wholeDependence.data.ts](../../../../../data/skills/fractions/representation/skills/wholeDependence.data.ts)
- [oneAsFraction.data.ts](../../../../../data/skills/fractions/representation/skills/oneAsFraction.data.ts)

## Educational purpose and intended web interaction

Explain why a fraction of a larger whole has greater absolute area than the same fraction of a smaller whole, and show that selecting all n equal parts of any chosen whole is n/n = 1.

An interactive area explorer showing reference whole explicitly; identical cell-size grids make absolute area honest. Select 'small 4×2' or 'large 8×2', partition by two, or choose one 12-cell strip partitioned into 2,3,4 equal pieces. Reveal selected area and normalized fraction labels, with independent keyboard/text controls.

**Self-contained design:** One independently initializable, prop-free Scene root owns all preset data, controls, explanations and interaction state. Multiple Section placements must not rely on props or state inherited from other Scenes. No invented renderer registration, engine hooks, scoring or persistence are authorized by this document.

## Exact factual models and required states

| Preset/state             | Model shown or described                                                         | Correct observation and explanatory result |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------ |
| **Small half**           | 4×2 whole, 8 equal unit squares, split 2+2 columns, 1 of 2 equal parts selected  | 1/2 of 8 square units = 4 square units     |
| **Large half**           | 8×2 whole, 16 equal unit squares, split 4+4 columns, 1 of 2 equal parts selected | 1/2 of 16 square units = 8 square units    |
| **Small complete**       | 4×2 whole, 2/2 selected                                                          | 2/2 = 1 small whole; area 8 square units   |
| **Complete by thirds**   | 12-square strip, 3 equal groups of 4 squares, all groups selected                | 3/3 = 1 whole; area 12 square units        |
| **Complete by quarters** | 12-square strip, 4 equal groups of 3 squares, all groups selected                | 4/4 = 1 whole; area 12 square units        |
| **Fresh small complete** | 2×3 rectangle, three strips each 2 squares, all selected                         | 3/3=1 of this six-square whole             |
| **Fresh large complete** | 4×3 rectangle, three strips each 4 squares, all selected                         | 3/3=1 of this twelve-square whole          |

**Validity boundary:** Rectangles measured in congruent grid squares; halves, thirds, quarters and n/n for n=2,3,4 only. Show same-share/different-amount and complete-whole reconstruction. Exclude comparisons of unrelated units, formal fraction equivalence beyond the full-whole identity, fractions above one, fraction multiplication or calculating a fraction of arbitrary quantities.

## Learner actions, transitions and recovery

Select the reference whole with named buttons, select one half or all equal parts, change the allowed n preset within the same whole, and reveal/check area counts. Reset to a single named initial state. No precise drawing, freehand slicing, public props, persistence or fake score events.

1. Start from one fully specified state with all its reference data visible or available via the text equivalent (whole, units, tick scale, key, or experimental conditions).
2. Let the learner predict before an automatic answer reveal where useful, but always permit a voluntary request for a worked explanation without an assessment gate.
3. For each action, preserve mathematical invariants, update the model deterministically and expose the new state and relevant numbers using both a visible and a structured accessible description.
4. Incorrect prediction or choice: explain what contradicts the claim (actual part size, the hand's position, chart's row count, or sample-space evidence) and allow an undo, retry or reset, without score or penalty.
5. Switch presets without leaking state between separate Scene instances; reset returns the current Scene to the documented initial state. A later independent transfer must hide the worked result until prediction or voluntary reveal, not hide the evidence itself.
6. No essential knowledge depends on autoplay motion, sound, fixed response time, probability of hitting a random state, or fine motor skill.

## Detailed explanatory feedback

- **Which whole did we start with?: Same number.** “The wholes are different sizes: 8 versus 16 squares. Their halves cover 4 versus 8 squares, even though both are written 1/2.”
- **Which whole did we start with?: One half confirmed.** “Correct share, but also check the area: 4 of 8 squares versus 8 of 16.”
- **One whole from all its parts: Three wholes.** “Three thirds are three _parts_ of one whole. They fit within its original border and fill it once.”
- **One whole from all its parts: 2/3 for all.** “Two of the three equal pieces leave one unselected; to cover the whole we need three of three.”
- **The number of cuts does not change 'all': 4/4 greater than 2/2.** “Both select every equal part of one unchanged strip. They cover the same whole, even though four cuts make smaller parts.”
- **The number of cuts does not change 'all': 12/12 assumed.** “Our examples use 2, 3 or 4 equal parts; the fraction counts parts, not individual drawn grid squares.”
- **Two different complete wholes: Both six squares.** “One garden is twice as large in congruent squares. Count the full borders: six squares versus twelve.”
- **Two different complete wholes: 1/3 selected.** “All three strips were selected, not only one. That is 3/3 of each whole.”

**Model limitations:** All examples are explicitly constrained to the conditions above. Do not extrapolate to unsupported operations or claim a simulation proves mastery or statistical generalizations. For the probability Scene, recorded illustrative sequences must never be described as a live random experiment that empirically verified fairness.

## Accessible equivalent path

A nonvisual table states each whole's dimensions, unit-square count, equal-part count, selected-part count and selected area. User selects 'small'/'large' and part counts with native keyboard-friendly controls. The same mathematical comparison is possible without perceiving the diagram.

All key interactions must be fully operable with native labelled keyboard/touch controls. Screen readers need a chronological, understandable announcement of changes without a flood of redundant narration. Use text labels and descriptive math/value captions rather than color or position alone. Include visible focus, sensible order, reduced-motion/static states, adequate touch sizing and narrow-screen alternatives.

## Locale / RTL / offline / weak-device requirements

Genuine meaning-preserving translations of every label, narration, option, alt description and explanatory message are required in every supported locale; **do not implement silent English fallbacks, fake translations or missing dictionaries**. Distinguish mathematical meaning from visual LTR/RTL arrangement; fraction slash interpretation, clock hands and spinner probabilities must not be reversed by naive mirroring. The same lesson functionality must remain available on low-power/mobile devices and offline after complete package download. These are implementation acceptance criteria, not features supplied by this specification.

## Implementation boundary and test handoff

Scene is **specified, not coded**. Later Design Scene implementation requires a prop-free React component, localized content via existing context, exact required state handling, separate Scene-specific automated tests, focus/screen-reader tests, true RTL, keyboard/touch parity, reduced motion and offline validation. No Lesson_Config, Question_Config, Quiz_Config, grading, completion API, Note API or real RNG is introduced here. Editor review is required before implementation.
