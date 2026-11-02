# Same Spinner, Different Results — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Methodologist input:** [Draft Brief](./methodologist-brief.md) (**not approved**).
**Primary audience:** Grade 3, ages 8–9.
**Target canonical Skills:**

- [experimentVariation.data.ts](../../../../data/skills/probability/experiments/skills/experimentVariation.data.ts)
  **Independence:** standalone Playground Lesson; no Program storyline, mascot, reward, mission or past learner state required.
  **Implementation:** editorial Content only. No runtime Lesson, Questions, Quizzes, scoring, registered custom Scenes or locale bundles created.

## Instructional concept

Compare outcome frequencies from two finite runs of the same fair random experiment and explain why differing counts can arise without any change to the experiment's possible outcomes, conditions or chances.

Having identified possible outcomes and compared chances, learners can now distinguish the _fixed rule_ of a fair experiment from the _variable tally_ observed in finite repeated runs. This is the domain's final canonical Skill; the depth is Grade 3 without numeric probability calculations.

The core web opportunity is **learner-controlled inspection of a mathematical model**, not merely an illustration: A deterministic _illustration of possible outcome sequences_, not a fake live-randomness proof: a labelled equal-sector spinner remains visibly unchanged while the learner reveals Run A and Run B as fixed recorded sequences of ten spins. Counts update one by one with blue/yellow labels; after both, an optional third panel deliberately shows a changed spinner and asks which conditions changed.

Every example is bounded: Two explicit ten-trial sequences of a fixed two-equal-sector uniformly random spinner, per-color frequency comparisons, and one changed-conditions counterexample. Count outcomes, identify constant/changing factors and compare two runs; do not introduce numeric probability estimates, significance testing, independence theorems, law of large numbers, hypothesis testing, percentages or claims about statistical bias from tiny samples.

## Learner journey and ordered Sections

1. **Fix the spinner, count the spins** — Make unchanged experimental conditions explicit before inspecting observed frequencies.
2. **Two runs, different totals by color** — Observe run-to-run variability with the same total trials and conditions.
3. **Different sample, or different experiment?** — Contrast natural sampling variation with changed conditions.
4. **A fresh pair of short runs** — Independently transfer the distinction without memorizing 7/3 and 4/6.

Use a vertical single-column order of typed Resource blocks within each general Section: `text`, `markdown` and the existing `scene` Resource type. The named **TrialRunComparator** is a new proposed Scene, not yet implemented, and each appearance must be self-contained rather than depending on earlier Section state. A generic Scene renderer does not mean this particular educational interaction is available. No new Section discriminators or hidden readiness APIs are implied.

## Section-by-Section learning experience

### Section 1 — Fix the spinner, count the spins

**Learning purpose:** Make unchanged experimental conditions explicit before inspecting observed frequencies.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “This spinner has one blue half and one yellow half. We assume it stops equally likely anywhere. We will spin ten times and record one color each time. Must we get exactly five blue and five yellow?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [TrialRunComparator](./scenes/TrialRunComparator.scene-spec.md). TrialRunComparator displays the unchanged blue/yellow half-spinner with its fair-uniform assumption. Learner predicts whether 5/5 must occur; Run A's ten possible example results are shown one at a time or as an accessible list.

3. **`markdown` Resource (available block type):** “A fair spinner gives both colors the same chance _on each spin_. It does not promise five of each in every short run. In this example, Run A has seven blue and three yellow.”

**Meaningful learner action:** Predict whether a 5/5 split is obligatory and tally Run A's ten outcomes.

**Explanatory feedback for anticipated choices:**

- **Five each guaranteed:** “Each spin could be either color. Equal chances do not force equal counts in a short set of spins.”
- **Seven blue changes chance:** “The spinner stayed the same; seven is what we observed in these ten example outcomes, not a new spinner rule.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 2 — Two runs, different totals by color

**Learning purpose:** Observe run-to-run variability with the same total trials and conditions.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “We use the _same_ spinner for another ten spins. Could the numbers of blue and yellow change even though the chance for each color stays equal?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [TrialRunComparator](./scenes/TrialRunComparator.scene-spec.md). Replay Run B as a distinct fixed possible sequence with exactly four blue and six yellow outcomes, keeping the spinner illustration locked. Reveal its counts and compare to Run A's 7/3.

3. **`markdown` Resource (available block type):** “Run A had seven blue and three yellow. Run B had four blue and six yellow. Both used ten spins of the same fair spinner. Different counts can happen without changing the chances.”

**Meaningful learner action:** Count Run B and identify A-versus-B frequency differences (blue 7 versus 4, yellow 3 versus 6).

**Explanatory feedback for anticipated choices:**

- **Counts must match:** “The experiment conditions are the same, but the outcomes are not predetermined. A short run can have different color totals.”
- **Run B 5/5:** “Count the blue entries in the example sequence carefully: there are four blue and six yellow.”
- **Spinner biased now:** “We observed different totals; the displayed spinner and uniform assumption did not change. These two examples alone do not prove a changed chance.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 3 — Different sample, or different experiment?

**Learning purpose:** Contrast natural sampling variation with changed conditions.

**Ordered blocks (single outer column):**

1. **`markdown` Resource (available block type):** “Now we really change the spinner: four equal parts, three blue and one yellow. Is it still the same chance for blue as in our first spinner?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [TrialRunComparator](./scenes/TrialRunComparator.scene-spec.md). Use 'Changed setup' panel: original 1 of 2 equal sectors blue; new 3 of 4 equal sectors blue, with the same uniform-pointer assumption. Learner identifies the changed blue coverage and compares to the unchanged A/B runs.

3. **`text` Resource (available block type):** “Now the spinner is different: blue covers more of its circle. The chance has changed. Different counts with changed rules are not the same example as different counts from identical conditions.”

**Meaningful learner action:** Separate the statement 'same spinner, different run' from 'new spinner, changed chance'.

**Explanatory feedback for anticipated choices:**

- **No rule change:** “The blue part changed from half to three quarters of the circle. That changes what the spinner can favor.”
- **Same as Run B:** “Run B used the original half-blue spinner. This new design favors blue; do not treat the conditions as identical.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

### Section 4 — A fresh pair of short runs

**Learning purpose:** Independently transfer the distinction without memorizing 7/3 and 4/6.

**Ordered blocks (single outer column):**

1. **`text` Resource (available block type):** “Two six-spin runs use the same fair half-blue, half-yellow spinner. One has three blue and three yellow; the other has two blue and four yellow. Must we change the spinner to explain this?”

2. **`scene` Resource (existing type; bespoke Scene proposed, not implemented):** [TrialRunComparator](./scenes/TrialRunComparator.scene-spec.md). Transfer preset: C sequence B,B,Y,B,Y,Y and D sequence Y,Y,B,Y,Y,B. Both conditions match the original spinner. Learner counts and chooses whether results can vary under unchanged rules; reveal explanations after choice.

3. **`markdown` Resource (available block type):** “The first run has three of each; the second has two blue and four yellow. Both are possible with the same fair spinner. Counts may vary from run to run even when the rule stays the same.”

**Meaningful learner action:** Count C and D, assert unchanged conditions, and give reason without claiming either is guaranteed.

**Explanatory feedback for anticipated choices:**

- **Must change spinner:** “Neither run changes the blue/yellow half-spinner. Different chance outcomes can occur under the same conditions.”
- **Second run proves yellow favored:** “Four yellows in six spins are observed outcomes; they do not change how much of the spinner is yellow.”

**Learner control and transfer:** Ask for a prediction before revealing a model's conclusion where appropriate. Any wrong selection exposes the relevant mathematical fact, with a no-penalty retry. The correct explanation stays accessible on demand without requiring a correct answer or forcing perfect performance before navigation.

**Access, locale and RTL:** All essential diagram/state facts need matching concise text or alternative labelled selections and keyboard/touch controls; optional audio must have meaningful captions/transcript. Avoid color, motion or pointer precision as the sole carrier of knowledge. RTL adaptation changes semantic layout, not quantity, clock direction, symbols, or outcome probabilities. Do not imply localization or accessible code is already implemented.

## Custom Scene specifications

- [TrialRunComparator](./scenes/TrialRunComparator.scene-spec.md) — proposed interactive, prop-free self-contained Scene. Review its pedagogical cases, state changes, feedback, accessibility alternatives and reset. It is a written specification, **not** a React component.

## Independent transfer and reflection

With a fresh 6-spin pair under the same fair two-sector spinner, Run C has B,B,Y,B,Y,Y = 3 blue/3 yellow and Run D has Y,Y,B,Y,Y,B = 2 blue/4 yellow. Explain why the equal-chance rule can still be unchanged.

Present the unfamiliar case before revealing the worked result. The learner may request a hint and review a full explanation; speech input is optional to a nearby adult rather than an assumed speech-recognition system. An unscored transfer response informs learning but is not validated mastery.

## Lesson Notes — planned, not implemented

**Concise cue:** “Same rules do not require the same results every run; small sample counts can vary.”

**Proposed unlock moment:** after the learner has examined the critical comparison in Section 3 and can explain what made the examples different. There is no verified Note entity, unlock event, persistent study sheet, spaced-repetition scheduler or offline Notes sync; the Lesson must remain understandable without those features.

## Assessment and technical handoff

These interactions are formative, explanatory and unscored. An Assessment Architect owns later Question banks, diagnostic validity, Quiz behavior, scoring thresholds and mastery evidence. A Coding Agent owns runtime Lesson/Section data, Scene implementation, translations, assets, tests, registration and packaging. The Scene's feasibility, full supported locale coverage, WCAG 2.2 AA access, true RTL, reduced motion, mobile and offline parity are **release requirements, not existing implementation claims**.

## Open editorial questions

- Confirm the Methodologist's selected scope before approving this Content.
- Review explanatory language and any potentially ambiguous model assumptions in the Scene with domain specialist.
- Review all locale-specific labels, numerals and conventions, and provide accurate genuine translations before implementation.

**Editorial status remains Provisional Draft.**
