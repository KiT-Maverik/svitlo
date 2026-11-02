# Which Outcome Is More Likely? — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval (not formally approved).**
**Audience:** Grade 3, approximately ages 8–9.
**Source brief:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skills:**

- [likelihoodLanguage.data.ts](../../../../data/skills/probability/events/skills/likelihoodLanguage.data.ts)
  **Lesson:** standalone, Program-neutral; no runtime Lesson, Quiz, Question, score or completed Scene is implemented.

## The learner's experience

Distinguish an event being possible from it being more or less likely, compare chances only under clearly specified spinner conditions and account for whether outcomes are equally likely.

The prior lessons established certain/impossible events and complete outcome lists; comparisons of likelihood require inspecting how the possible results are distributed, not just naming them.

Choose between four predetermined spinners, toggle visibility of individual sector labels and total color coverage, predict which color is more/equally/less likely, request an explanation, reset. Optional single spin animation must not alter the logical comparison; avoid reliance on randomness or streaks. Local state, prop-free, no invented APIs.

**Teaching boundary:** Qualitative comparison of two colored outcomes, a uniformly random spinner with equal angular sectors as the main model (4–6 sections), and one deliberately unequal-sector contrast. Do not calculate probability fractions, percentages or odds, claim certainty from a finite sample, or assume all physical methods are fair. The activity must explain why an answer fits rather than merely reward a selection. Every comparison uses a specified whole, time scale, unit or random experiment, as appropriate. Wrong answers receive evidence-based feedback and a no-penalty retry.

## Ordered learning journey

1. **Both colors are possible—but are they equal?:** Move beyond binary possible/impossible claims.
2. **Equal chances require equal coverage:** Distinguish a balanced spinner from an unbalanced one under the same assumptions.
3. **A large slice can matter more than several small ones:** Expose the limit of sector-counting as a chance heuristic.
4. **New spinner, make a justified prediction:** Independent qualitative comparison without overpromising the actual draw.

The general Sections below use a **single vertical top-to-bottom column** of typed Resource blocks. `text`, `markdown` and `scene` are available block types; the named **ChanceSpinnerLab Scene is proposed and not implemented**. No separate 'Theory' or 'Practice' TypeScript discriminators are invented.

## Section plan and learner-facing copy

### Section 1 — Both colors are possible—but are they equal?

**Purpose / intended outcome:** Move beyond binary possible/impossible claims.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “This spinner has five equally sized slices: four blue, one yellow. We assume the pointer is equally likely to land anywhere around the circle. Could yellow appear? Is it as likely as blue?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [ChanceSpinnerLab](./scenes/ChanceSpinnerLab.scene-spec.md): ChanceSpinnerLab preset '4 blue, 1 yellow': view five equal labelled sectors. Select possible/impossible for yellow, then compare 'blue more likely', 'yellow more likely', 'equally likely' with direct sector evidence.

3. **`markdown` — existing Resource block type.** “Yellow can happen, so it is possible. But blue covers four of five equal slices and yellow only one. Blue is more likely; yellow is less likely—not impossible.”

**What the learner actually does:** Differentiate yellow possible from yellow equally likely without an actual spin.

**Specific explanatory feedback:**

- _Yellow impossible_: “The yellow sector is small in number, not missing. The pointer could land there.”
- _Equal chances_: “The five slices are equally sized and have equal chance individually. Four are blue and one is yellow.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Provide a text inventory 'sectors B,B,B,B,Y equal chance each' and counts in addition to color. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 2 — Equal chances require equal coverage

**Purpose / intended outcome:** Distinguish a balanced spinner from an unbalanced one under the same assumptions.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “Now our spinner has four equal slices: two blue and two yellow. Which color is more likely?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [ChanceSpinnerLab](./scenes/ChanceSpinnerLab.scene-spec.md): Switch to a four-equal-sector preset with B,B,Y,Y, and optionally lay the pairs side by side to see matching angle coverage. Choose 'same chance' and explain.

3. **`text` — existing Resource block type.** “Blue and yellow each cover two of the four equally likely slices. Neither is favored. It is not certain which color appears on one spin.”

**What the learner actually does:** Inspect matching two-color coverage, choosing equally likely.

**Specific explanatory feedback:**

- _Blue more likely_: “Both colors cover exactly two equal-sized slices. Neither has more of the circle.”
- _Blue certain_: “There are yellow slices too. Equal chances do not tell us the next result.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Express '2 equal sectors versus 2 equal sectors' in text, not only shaded wedges. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 3 — A large slice can matter more than several small ones

**Purpose / intended outcome:** Expose the limit of sector-counting as a chance heuristic.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “Look carefully. This spinner has one large blue half-circle and two small yellow quarter-circles. Are there more yellow slices? Does that make yellow more likely?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [ChanceSpinnerLab](./scenes/ChanceSpinnerLab.scene-spec.md): Preset unequal sectors: Blue one 180° sector, Yellow two 90° sectors; pointer direction is uniform. Highlight half-circle coverage and show blue total 180°, yellow total 180°. Count sectors separately from total coverage.

3. **`markdown` — existing Resource block type.** “There are two yellow slices but together they take the same half of the circle as the one blue slice. Under our uniform-spin rule, the colors are equally likely. Count possible coverage, not just pieces.”

**What the learner actually does:** Compare both region count and total angular coverage, then state the correct qualitative relation.

**Specific explanatory feedback:**

- _Yellow more likely because two slices_: “The yellow slices are each smaller. Together they cover one half, the same as blue's single half.”
- _Blue certain_: “Half the circle is yellow. Yellow remains possible.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Provide numerical angle totals 180°/180° plus simple 'half of circle versus half'; the angle degree value is optional, not a new required Skill. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 4 — New spinner, make a justified prediction

**Purpose / intended outcome:** Independent qualitative comparison without overpromising the actual draw.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “A new fair spinner has six equal slices. Four are yellow and two are blue. Which color is more likely? Could the other color still appear?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [ChanceSpinnerLab](./scenes/ChanceSpinnerLab.scene-spec.md): Transfer preset six equal sectors, Y,Y,Y,Y,B,B. Hide relative-chance labels until the learner chooses which is more likely and whether blue is possible.

3. **`text` — existing Resource block type.** “Yellow is more likely because it covers four of six equal slices. Blue is still possible because two blue slices remain. Neither result is guaranteed on one spin.”

**What the learner actually does:** Identify yellow as more likely, blue as still possible, and explain the evidence.

**Specific explanatory feedback:**

- _Blue impossible_: “There are two blue slices. Blue can happen even though there are more yellow slices.”
- _Yellow certain_: “The spinner also has blue slices. More likely does not mean guaranteed.”
- _Equal chance_: “Four equally likely slices are yellow, while only two are blue. The coverage is not the same.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Choose via keyboard-labelled chance options and verify from an ordered sector list. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

## New custom Scene handoff

- [ChanceSpinnerLab](./scenes/ChanceSpinnerLab.scene-spec.md) — Screenwriter's provisional design, not implemented. It is self-contained, local-state and prop-free; any preset switches are internal rather than fake public props.
- Every Section points to the same specification because its cases cover the whole conceptual progression; each rendered Scene occurrence must remain an independently initialized instance, not depend on another Section's state.

## Independent transfer

For six equal sectors with four yellow and two blue, yellow is more likely but blue still possible.

Give the learner a fresh problem before revealing its answer, allow one useful optional hint, and then offer a worked explanation. A learner may answer verbally to an adult or via equivalent selectable controls; no assumed speech API. Transfer is instructional practice, not proof of validated mastery.

## Proposed unlocked recall Note (not wired)

“Possible is not always half-and-half; compare chances using the actual experiment and coverage.”

Proposed moment: when Section 3's important contrasting example has been explored and accurately explained. **Note entity, unlock events, persistence, offline Notes sync and spaced review scheduling are planned concepts, not current implemented capabilities.** Do not block the Lesson on Note events.

## Delivery and review readiness

- **Existing typed Resources:** `text`, `markdown`, `scene` with single-column Section ordering.
- **Proposed:** the named interactive Scene, all its data presets, localized learner-facing text, accessibility alternatives, Scene tests and future offline package.
- **Not designed here:** Questions, Quiz, graded response banks, mastery evaluation, score thresholds, new Resource types, API contracts or Program storyline.

Complete authentic localization, meaningful RTL, keyboard/touch/screen-reader equivalents, reduced motion, narrow screens, WCAG 2.2 AA and offline/weak-device parity are future implementation gates, not current claims. Methodologist, Screenwriter and Scene review statuses remain Draft until explicit editor approval.
