# Reading a Bar Chart — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not formally approved.**
**Audience:** Grade 2 (approximately 7–8).
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skill:** [readBarChart.data.ts](../../../../data/skills/data/presentation/skills/readBarChart.data.ts).
**Standalone:** No Program story, imported Quiz, scored Question, progress gate, runtime Lesson code or assembled locale bundle is created.

## Learner experience and teaching logic

Read categorical counts from a bar chart using its category labels, baseline and numerical scale, then compare values without treating bar width or decoration as the count.

After collecting counts, reading tables and building pictographs, a length-encoded bar chart is the next straightforward visual representation. The activity builds toward an explanation by the learner, not automatic mastery from making a choice. An inspectable bar-chart model with a numbered 0–6 y-axis, fixed unit scale 1, categorical x-axis and labelled count table; a deliberately misleading variable-width view is clearly marked as a bad design and can never replace the canonical model.

**Scope boundary:** Do not teach constructing bar charts (separate Skill), unequal numeric steps, broken baselines, frequency ratios, 2D bar area interpretation, multiplication with scale values, histogram bins, percentages or statistical conclusions beyond simple comparisons.

The Sections below use the existing block types `text`, `markdown` and `scene`, arranged in one **vertical top-to-bottom column**. `BarChartReader` is **proposed** and is not a registered/implemented Scene. There are no invented custom Resource discriminators or server APIs.

## Learning journey

1. **A bar's length stands for a number.** Introduce category and count axes and the zero baseline.
2. **Read three values.** Read the exact height of each bar, not an approximate pictorial impression.
3. **Which group has more?.** Compare two numerical values and expose a visual distractor.
4. **Read a new chart without a model answer.** Independent value reading and comparison.

## Section scripts (ordered Resources)

### Section 1: A bar's length stands for a number

**Purpose:** Introduce category and count axes and the zero baseline.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “This chart shows how many fruit tokens we counted: apples, pears and plums. Which name belongs to each bar?”

2. **`scene` (existing Resource type; Scene proposed).** [BarChartReader](./scenes/BarChartReader.scene-spec.md). Display a unit-scaled 0–6 vertical bar chart, labels under three bars and optional visible horizontal unit guides. Highlight the ‘0’ baseline and ‘1’ to ‘6’ numbers.

3. **`markdown` (existing Resource type).** “Find the bar’s name, then read its top against the numbered scale. Start from zero.”

**Learner's actual move:** Select a labelled category and see its bar, baseline and top marker named.

**Misconception-specific explanation:** If the child counts a bar's decorative width: “The number goes up the scale, not across the width of the bar.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 2: Read three values

**Purpose:** Read the exact height of each bar, not an approximate pictorial impression.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “How many apples? Trace upward from zero until the apple bar stops. Do the same for pears and plums.”

2. **`scene` (existing Resource type; Scene proposed).** [BarChartReader](./scenes/BarChartReader.scene-spec.md). Select apples, pears or plums to reveal counted unit steps from zero. Hide exact labels until requested; then show apples 4, pears 2, plums 5.

3. **`markdown` (existing Resource type).** “The chart tells us 4 apples, 2 pears and 5 plums. The line at the top of each bar matches its count.”

**Learner's actual move:** Predict the exact value of two bars, inspect tick marks and reveal the source table.

**Misconception-specific explanation:** If apples are read as 5: “The apple bar stops at the tick marked 4. The plum bar is the one that reaches 5.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 3: Which group has more?

**Purpose:** Compare two numerical values and expose a visual distractor.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “Which group has the most tokens? If a bar is drawn wider, does that change its number?”

2. **`scene` (existing Resource type; Scene proposed).** [BarChartReader](./scenes/BarChartReader.scene-spec.md). Show the correct equal-width bars. An ‘Inspect misleading widths’ mode then widens the pear bar while keeping its height 2 and explicitly flags that distorted width is not a value and is bad chart design.

3. **`markdown` (existing Resource type).** “Plums have the most, 5. Pears have only 2 even if somebody draws their bar very wide. Trust the number scale.”

**Learner's actual move:** Name maximum and minimum, then explain why changing bar width is irrelevant or misleading.

**Misconception-specific explanation:** If pears are called most because the pear bar is wide: “Read height against the scale: pears are 2, plums are 5. Width is not the count.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

### Section 4: Read a new chart without a model answer

**Purpose:** Independent value reading and comparison.

**Block sequence — a single column:**

1. **`text` (existing Resource type).** “A new chart counts three kinds of cards: red 3, blue 5, yellow 1. Which is the smallest group? How many are blue?”

2. **`scene` (existing Resource type; Scene proposed).** [BarChartReader](./scenes/BarChartReader.scene-spec.md). Use a correctly drawn unit-scale bar chart with blue 5, red 3, yellow 1 (all bars equal width). Offer a text table only as an optional reveal or nonvisual equivalent.

3. **`markdown` (existing Resource type).** “Yellow is smallest with 1 card, blue has 5, and red has 3. A bar chart still follows the same label-and-scale rule.”

**Learner's actual move:** Read the independent chart, compare maxima/minima and explain the zero baseline.

**Misconception-specific explanation:** For smallest red: “Follow the yellow bar to the 1 mark and red to the 3 mark; 1 is smaller than 3.” Even after a correct choice, the mathematical reason must be visible or obtainable with a labelled 'Why?' control. The learner can revisit the model, use a hint, reveal the result or retry without penalty.

**Accessibility and pacing:** Short localized instructions; keyboard/touch controls, equivalent nonvisual decision, labels not solely by color or position, screen-reader count/state announcements, reduced motion, no hidden timing threshold. The next Section does not demand a simulated mastery result.

## Bespoke interactive Scene — provisional

- [BarChartReader](./scenes/BarChartReader.scene-spec.md) is a proposed **self-contained, prop-free** Scene. It owns only its local learning model and explanation state. It has no runtime implementation yet; if reused by multiple sections, each instance should maintain independent state.

## Independent transfer prompt

On a new unit-scale chart, blue reaches 5 while yellow reaches 1. Which has more and how do you know without judging colors or bar widths?

Learners should first predict or justify their thinking without copying the original example. Reveal a correct worked explanation only on request or after an attempt. This remains instruction, **not scored mastery assessment**.

## Proposed Lesson Note — product concept only

“Read a bar’s label and height against the scale; its width is not the count.”

**Editorial unlock proposal:** Make this cue available after the learner inspects the explicit misconception contrast in Section 3 and explains it. The Note entity, unlock API, offline notes persistence and automatic spaced review are not implemented by this content plan; the explanation stays available regardless.

## Source verification and content constraints

The canonical [readBarChart.data.ts](../../../../data/skills/data/presentation/skills/readBarChart.data.ts) governs Skill meaning; its UUID, definition and multilingual translations are unchanged. Use apples=4, pears=2, plums=5, y-axis 0 to 6 in unit steps; 5 > 4 > 2. For transfer, use books read by three fictional readers or library shelf categories: red=3, blue=5, yellow=1 with a zero baseline and count unit 1. All charts have explicit unit names and source context.

All runtime copy requires complete, authentic translation into every configured locale; this English editorial script is _not_ runtime locale coverage. The proposed Scene's essential functions need nonvisual equivalence, mobile usability, semantic RTL, and offline availability. These are requirements for implementation review, not a declaration that they pass.

## Approvals and implementation boundary

**Methodologist approval pending. Screenwriter and Scene editorial approval pending.** Assessment Architect owns any Questions/Quiz, scoring and competency evidence. Coding Agent owns runtime Lesson/Scene, provider-free public Scene interface, localizations, tests and offline support. No scoring, Program content or runtime configuration is added.
