# From One Part to Several Parts — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval (not formally approved).**
**Audience:** Grade 3, approximately ages 8–9.
**Source brief:** [Draft Methodologist Brief](./methodologist-brief.md).
**Target Skills:**

- [denominatorMeaning.data.ts](../../../../data/skills/fractions/representation/skills/denominatorMeaning.data.ts)
- [numeratorMeaning.data.ts](../../../../data/skills/fractions/representation/skills/numeratorMeaning.data.ts)
- [nonUnitModel.data.ts](../../../../data/skills/fractions/representation/skills/nonUnitModel.data.ts)
  **Lesson:** standalone, Program-neutral; no runtime Lesson, Quiz, Question, score or completed Scene is implemented.

## The learner's experience

Extend an established unit fraction into fractions such as 2/4 and 3/4, distinguishing the number of equal parts making one whole (denominator) from the number selected (numerator).

Three adjacent canonical Skills form one coherent conceptual move: set the unit-part size, choose a number of those parts, and represent the resulting fraction. They remain independent Skills for later assessment.

Switch among preset equal-part counts, select whole partition units with numbered buttons, inspect part sizes/covered cell counts, optionally reveal the conventional fraction, reset selected state or restore a known whole. Do not provide props or persist results.

**Teaching boundary:** Grade-3 conceptual emphasis on positive denominators 2–4, numerators from 0 to denominator and one chosen whole. Use unit squares and equal strip partitions, not formulas for fraction operations. This does not cover improper fractions above one, formal equivalence, fraction sums, decimal notation or simplifying. Canonical Skill scope remains grade-independent. The activity must explain why an answer fits rather than merely reward a selection. Every comparison uses a specified whole, time scale, unit or random experiment, as appropriate. Wrong answers receive evidence-based feedback and a no-penalty retry.

## Ordered learning journey

1. **Four parts, but how many chosen?:** Bring the meaning of the unit part into the numerator distinction.
2. **Change the top number, keep the part size:** Isolate numerator variation without changing whole or denominator.
3. **Change the bottom number instead:** See how denominator changes unit-part size while numerator is held fixed.
4. **A new picture to explain alone:** Independently map an unfamiliar partition to numerator and denominator and identify a non-example.

The general Sections below use a **single vertical top-to-bottom column** of typed Resource blocks. `text`, `markdown` and `scene` are available block types; the named **FractionBuilder Scene is proposed and not implemented**. No separate 'Theory' or 'Practice' TypeScript discriminators are invented.

## Section plan and learner-facing copy

### Section 1 — Four parts, but how many chosen?

**Purpose / intended outcome:** Bring the meaning of the unit part into the numerator distinction.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “Here is one strip cut into four equal pieces. We colored one piece last time and wrote 1/4. What if we color three pieces without changing the cuts?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FractionBuilder](./scenes/FractionBuilder.scene-spec.md): FractionBuilder starts with a fixed 12-cell strip divided into four three-cell pieces. Reveal the boundary of each piece, then let the learner select one, two or three whole pieces; the fraction name stays hidden until prediction.

3. **`markdown` — existing Resource block type.** “The bottom 4 still describes four equal pieces in the whole. The top 3 tells us three of those pieces are selected: 3/4.”

**What the learner actually does:** Choose three pieces, identify the whole, and say why 3/4—not 4/3—describes it.

**Specific explanatory feedback:**

- _3/4_: “Yes: four equal pieces make the whole; exactly three are selected.”
- _4/3_: “That reverses the jobs. Four tells how many equal pieces the whole has; only three are selected.”
- _3/3_: “There are four equal pieces in the whole, including the unselected one. Check the bottom number.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. The same operation must be possible with labelled part buttons 1–4, independent of shading perception. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 2 — Change the top number, keep the part size

**Purpose / intended outcome:** Isolate numerator variation without changing whole or denominator.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “The strip stays the same. Select one, then two, then three, then all four pieces. Which number in the fraction changes?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FractionBuilder](./scenes/FractionBuilder.scene-spec.md): Pin the whole and four equal partitions in place. One button per equal unit part toggles its selection. Show the sequence 1/4, 2/4, 3/4, 4/4 after the learner builds each example; include an optional 0/4 empty state.

3. **`text` — existing Resource block type.** “The top number changes as we select more same-sized parts. At 4/4, all four parts are selected, so we have one whole.”

**What the learner actually does:** Build 2/4, 3/4 and 4/4; predict whether 4/4 fills one whole.

**Specific explanatory feedback:**

- _4/4 fills whole_: “Four selected out of four equal parts covers the whole strip: 4/4 is one whole.”
- _0/4 confusion_: “Zero selected parts cover none of the whole. The whole still has four equal parts.”
- _More denominator_: “The cut lines did not change, so the denominator stays four. Only the selected count changes.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Offer a text summary after every toggle: '3 of 4 equal parts selected; 9 of 12 cells covered'. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 3 — Change the bottom number instead

**Purpose / intended outcome:** See how denominator changes unit-part size while numerator is held fixed.

**Blocks, in the required top-to-bottom order:**

1. **`text` — existing Resource block type.** “We will keep choosing two pieces. In one whole there are three equal pieces; in the same whole there are four equal pieces. Which two-piece amount is larger?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FractionBuilder](./scenes/FractionBuilder.scene-spec.md): Use the same 12-cell strip. In compare mode switch from thirds (4+4+4) to quarters (3+3+3+3). Select two equal pieces in each model; show 2/3 covers eight cells while 2/4 covers six.

3. **`markdown` — existing Resource block type.** “The top number is two in both cases. But thirds are bigger pieces than quarters of the same whole, so 2/3 covers more than 2/4.”

**What the learner actually does:** Predict and compare two-thirds against two-quarters using the fixed strip.

**Specific explanatory feedback:**

- _Same amount_: “Two parts are selected in both, but the parts have different sizes. Count: 8 cells versus 6 cells.”
- _2/4 larger_: “Four equal cuts make smaller parts than three equal cuts in this same strip; two quarters cover less than two thirds.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Area counts and an ordered textual comparison provide the same evidence without color. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

### Section 4 — A new picture to explain alone

**Purpose / intended outcome:** Independently map an unfamiliar partition to numerator and denominator and identify a non-example.

**Blocks, in the required top-to-bottom order:**

1. **`markdown` — existing Resource block type.** “A new rectangular badge has four equal squares. Three are marked. Tell what the top and bottom numbers mean. Now look at another badge divided unequally: can three shaded pieces still be 3/4?”

2. **`scene` — existing Resource block type; bespoke Scene proposed, not coded.** [FractionBuilder](./scenes/FractionBuilder.scene-spec.md): Transfer mode shows a fresh 2×2 four-cell badge with three cells selected, then a rectangle split into widths 1+1+2+4 (unequal) with three regions selected. Learner selects the valid fraction claim and one reason; reveal full worked explanation on request.

3. **`text` — existing Resource block type.** “The first badge shows 3/4: three chosen squares out of four equal squares. The second has unequal pieces, so 3/4 is not justified by counting colored regions.”

**What the learner actually does:** Read 3/4 on the equal model, then reject the unequal partition using area as evidence.

**Specific explanatory feedback:**

- _Equal model 4/3_: “There are four equal pieces, not three, in the whole. Three are marked.”
- _Unequal model accepted_: “A fraction names equal unit parts of one whole. Those four regions differ in area, so counting three of them is not enough.”

**Guidance, pacing and transition:** Learner-controlled predict/inspect/reveal/retry; no correctness gate, scoring, timed input or fake mastery event. Present both piece areas as numerical labels to avoid precision visual interpretation. The explanation remains available even if the learner chooses not to answer before moving on.

**Locale and inclusive interaction:** The learner-facing source text is drafted in English only; complete real locale versions are required before implementation. Accessible labels must identify the same mathematical facts as the visuals. Distinct states, keyboard controls, logical focus and reduced-motion/textual descriptions preserve participation in both LTR and RTL.

## New custom Scene handoff

- [FractionBuilder](./scenes/FractionBuilder.scene-spec.md) — Screenwriter's provisional design, not implemented. It is self-contained, local-state and prop-free; any preset switches are internal rather than fake public props.
- Every Section points to the same specification because its cases cover the whole conceptual progression; each rendered Scene occurrence must remain an independently initialized instance, not depend on another Section's state.

## Independent transfer

For four equal squares with three selected, the label is 3/4. For four unequal pieces, three shaded pieces alone do not justify 3/4.

Give the learner a fresh problem before revealing its answer, allow one useful optional hint, and then offer a worked explanation. A learner may answer verbally to an adult or via equivalent selectable controls; no assumed speech API. Transfer is instructional practice, not proof of validated mastery.

## Proposed unlocked recall Note (not wired)

“The bottom number tells equal parts in the whole; the top number counts selected parts.”

Proposed moment: when Section 3's important contrasting example has been explored and accurately explained. **Note entity, unlock events, persistence, offline Notes sync and spaced review scheduling are planned concepts, not current implemented capabilities.** Do not block the Lesson on Note events.

## Delivery and review readiness

- **Existing typed Resources:** `text`, `markdown`, `scene` with single-column Section ordering.
- **Proposed:** the named interactive Scene, all its data presets, localized learner-facing text, accessibility alternatives, Scene tests and future offline package.
- **Not designed here:** Questions, Quiz, graded response banks, mastery evaluation, score thresholds, new Resource types, API contracts or Program storyline.

Complete authentic localization, meaningful RTL, keyboard/touch/screen-reader equivalents, reduced motion, narrow screens, WCAG 2.2 AA and offline/weak-device parity are future implementation gates, not current claims. Methodologist, Screenwriter and Scene review statuses remain Draft until explicit editor approval.
