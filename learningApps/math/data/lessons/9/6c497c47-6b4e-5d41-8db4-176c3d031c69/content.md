# Same Fraction, Different Whole — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Methodologist input:** [Draft Brief](./methodologist-brief.md) (**not approved**).
**Primary audience:** Grade 3, ages 8–9.
**Target canonical Skills:**

- [wholeDependence.data.ts](../../../../data/skills/fractions/representation/skills/wholeDependence.data.ts)
- [oneAsFraction.data.ts](../../../../data/skills/fractions/representation/skills/oneAsFraction.data.ts)
  **Independence:** standalone Playground Lesson; no Program storyline, mascot, reward, mission or past learner state required.
  **Implementation:** editorial Content only. No runtime Lesson, Questions, Quizzes, scoring, registered custom Scenes or locale bundles created.

## Instructional concept

Explain why a fraction of a larger whole has greater absolute area than the same fraction of a smaller whole, and show that selecting all n equal parts of any chosen whole is n/n = 1.

Begin with the whole already established in the prior fraction Lessons; distinguish equal fractional share from equal absolute amount, then reconstruct the chosen whole from all of its equal parts. These are complementary facets of the reference whole, but remain two independent canonical competencies.

The core web opportunity is **learner-controlled inspection of a mathematical model**, not merely an illustration: An interactive area explorer showing reference whole explicitly; identical cell-size grids make absolute area honest. Select 'small 4×2' or 'large 8×2', partition by two, or choose one 12-cell strip partitioned into 2,3,4 equal pieces. Reveal selected area and normalized fraction labels, with independent keyboard/text controls.

Every example is bounded: Rectangles measured in congruent grid squares; halves, thirds, quarters and n/n for n=2,3,4 only. Show same-share/different-amount and complete-whole reconstruction. Exclude comparisons of unrelated units, formal fraction equivalence beyond the full-whole identity, fractions above one, fraction multiplication or calculating a fraction of arbitrary quantities.

## Learner journey and ordered Sections

1. **Which whole did we start with?** — Make the reference whole explicit before comparing its fractional part.
2. **One whole from all its parts** — Rebuild a reference whole by selecting every equal part.
3. **The number of cuts does not change 'all'** — Generalize n/n across equal partitions and avoid equating it with two wholes.
4. **Two different complete wholes** — Independent transfer distinguishes equal proportion from unequal absolute amount.

Use a vertical single-column order of typed Resource blocks within each general Section: `text`, `markdown` and the existing `scene` Resource type. The named **WholeSizeExplorer** is a new proposed Scene, not yet implemented, and each appearance must be self-contained rather than depending on earlier Section state. A generic Scene renderer does not mean this particular educational interaction is available. No new Section discriminators or hidden readiness APIs are implied.

## Section-by-Section learning experience

### Section 1 — Which whole did we start with?

**Learning purpose:** Make the reference whole explicit before comparing its fractional part.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “Here are two rectangles made from equal-sized square tiles. One contains eight tiles, the other sixteen. If we take half of each, do we take the same number of tiles?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [WholeSizeExplorer](./scenes/WholeSizeExplorer.scene-spec.md). Compare a 4×2 whole and an 8×2 whole side-by-side at the same tile scale, first with whole borders highlighted, then select half of each via labelled buttons.

3. **`markdown` Resource (available block type):** “Half of the small whole covers four square tiles. Half of the large whole covers eight. Both are called one half because each is half of its own whole.”

**Meaningful learner action:** Predict whether the two absolute half-areas match; identify original whole and select halves.

**Explanatory feedback for anticipated choices:**

- **Same number:** “The wholes are different sizes: 8 versus 16 squares. Their halves cover 4 versus 8 squares, even though both are written 1/2.”
- **One half confirmed:** “Correct share, but also check the area: 4 of 8 squares versus 8 of 16.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 2 — One whole from all its parts

**Learning purpose:** Rebuild a reference whole by selecting every equal part.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “One long strip has been cut into three equal pieces. If we choose all three, how much of the whole is selected?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [WholeSizeExplorer](./scenes/WholeSizeExplorer.scene-spec.md). Use a twelve-square strip divided 4+4+4. First select 1/3, then 2/3, then all 3/3. Highlight the original border and total selected area.

3. **`markdown` Resource (available block type):** “Three thirds means all three equal pieces of the same whole. Together they cover the entire strip: 3/3 = 1 whole.”

**Meaningful learner action:** Build 1/3, 2/3, 3/3 and explain why the final selection equals the whole.

**Explanatory feedback for anticipated choices:**

- **Three wholes:** “Three thirds are three _parts_ of one whole. They fit within its original border and fill it once.”
- **2/3 for all:** “Two of the three equal pieces leave one unselected; to cover the whole we need three of three.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 3 — The number of cuts does not change 'all'

**Learning purpose:** Generalize n/n across equal partitions and avoid equating it with two wholes.

**Ordered blocks (single outer column):**

1. **`markdown` Resource (available block type):** “We can divide one strip into two equal parts, three equal parts, or four equal parts. What fraction do we get if we choose all the parts each time?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [WholeSizeExplorer](./scenes/WholeSizeExplorer.scene-spec.md). Hold the twelve-square whole fixed while toggling splits 6+6, 4+4+4 and 3+3+3+3. An 'Select all' action reveals 2/2, 3/3, 4/4 and the same full area each time.

3. **`text` Resource (available block type):** “All two halves make 2/2 = 1. All three thirds make 3/3 = 1. All four quarters make 4/4 = 1. It is still one complete strip.”

**Meaningful learner action:** Select all parts for every partition, explain what denominator and numerator each count.

**Explanatory feedback for anticipated choices:**

- **4/4 greater than 2/2:** “Both select every equal part of one unchanged strip. They cover the same whole, even though four cuts make smaller parts.”
- **12/12 assumed:** “Our examples use 2, 3 or 4 equal parts; the fraction counts parts, not individual drawn grid squares.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 4 — Two different complete wholes

**Learning purpose:** Independent transfer distinguishes equal proportion from unequal absolute amount.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “Two gardens are divided into three equal strips each. The first covers six unit squares; the second covers twelve. If all three strips are selected, what fraction of each garden is chosen?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [WholeSizeExplorer](./scenes/WholeSizeExplorer.scene-spec.md). Fresh presets 2×3 and 4×3 rectangles divided into equal strips. Learner chooses 3/3 or 1/3 for each and reports whether their actual areas match before revealing counts.

3. **`markdown` Resource (available block type):** “Both gardens are fully selected: 3/3 = 1 of each garden. Their areas differ: six and twelve square units. The same fraction does not mean the same absolute area when the whole changes.”

**Meaningful learner action:** Explain 3/3 of both different-sized wholes and contrast absolute areas.

**Explanatory feedback for anticipated choices:**

- **Both six squares:** “One garden is twice as large in congruent squares. Count the full borders: six squares versus twelve.”
- **1/3 selected:** “All three strips were selected, not only one. That is 3/3 of each whole.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

## Custom Scene specifications

- [WholeSizeExplorer](./scenes/WholeSizeExplorer.scene-spec.md) — proposed interactive, prop-free self-contained Scene. Review its pedagogical cases, state changes, feedback, accessibility alternatives and reset. It is a written specification, **not** a React component.

## Independent transfer and reflection

With a 2×3 rectangle and a 4×3 rectangle each split into three equal strips, all parts selected are 3/3=1 of their respective wholes; the selected absolute areas are six and twelve squares.

Present the unfamiliar case before revealing the worked result. The learner may request a hint and review a full explanation; speech input is optional to a nearby adult rather than an assumed speech-recognition system. An unscored transfer response informs learning but is not validated mastery.

## Lesson Notes — planned, not implemented

**Concise cue:** “A fraction names a share of a chosen whole; n/n uses all n equal parts and makes one whole.”

**Proposed unlock moment:** after the learner has examined the critical comparison in Section 3 and can explain what made the examples different. There is no verified Note entity, unlock event, persistent study sheet, spaced-repetition scheduler or offline Notes sync; the Lesson must remain understandable without those features.

## Assessment and technical handoff

These interactions are formative, explanatory and unscored. An Assessment Architect owns later Question banks, diagnostic validity, Quiz behavior, scoring thresholds and mastery evidence. A Coding Agent owns runtime Lesson/Section data, Scene implementation, translations, assets, tests, registration and packaging. The Scene's feasibility, full supported locale coverage, WCAG 2.2 AA access, true RTL, reduced motion, mobile and offline parity are **release requirements, not existing implementation claims**.

## Open editorial questions

- Confirm the Methodologist's selected scope before approving this Content.
- Review explanatory language and any potentially ambiguous model assumptions in the Scene with domain specialist.
- Review all locale-specific labels, numerals and conventions, and provide accurate genuine translations before implementation.

**Editorial status remains Provisional Draft.**
