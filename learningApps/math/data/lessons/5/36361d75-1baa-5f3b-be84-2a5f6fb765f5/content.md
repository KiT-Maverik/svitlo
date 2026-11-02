# One Part Has a Name — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not an Approved Screenwriter artifact.**

- Lesson directory: `learningApps/playground/Data/Lessons/1/modelAndReadUnitFractions/`
- Audience: **Grade 3**, approximately ages 8–9
- Methodologist source: [Draft Brief](./methodologist-brief.md) (**not approved**)
- Target Skills:
  - [unitFractionModel.data.ts](../../../../data/skills/fractions/representation/skills/unitFractionModel.data.ts)
  - [unitFractionRead.data.ts](../../../../data/skills/fractions/representation/skills/unitFractionRead.data.ts)
- Program dependence: **None**
- Runtime/assessment status: editorial instructions only; no implementation, graded Questions or mastery signal.

## Creative and instructional premise

Connect the mathematical idea of one of n equal parts to its spoken and written unit-fraction name, across an area, a length and a discrete set, without treating every single object as a fractional part.

An accessible strip-and-set exploration with a chosen whole, partition presets, a one-part highlight, true area/group counts and an optional fraction name reveal. Visual modes are representation changes, not different props or separate Scoring stages.

**Why interactivity matters:** The child can change the relevant mathematical or observational state, inspect evidence rather than accept an answer by authority, receive a reason-specific explanation, and retry without penalty. The final unfamiliar example is not a copy of the original. The experience is a standalone teaching sequence, not a Program plot, mascot activity or points-based game.

**Teaching limits:** Positive integer partition counts 2, 3 and 4 only. Unit fractions with exactly one selected equal part; area/length strip models and one discrete-set model with 12 counters. The chosen whole must be shown and held constant for comparisons. Do not introduce non-unit fractions, general numerator mastery, equivalence proofs, operations, number-line arithmetic or fractions beyond one. The lesson uses the denominator only as part of reading a unit fraction; a full independent denominator-definition Skill is intentionally reserved for later coverage. The discrete-set example uses groups of identical counters and no claim about their physical area.

## Learner journey / planned Sections

1. **A fair piece, not just a piece:** Re-activate equal-part reasoning before introducing notation.
2. **The number for one of the parts:** Map a concrete equal part to written and spoken unit-fraction notation.
3. **Can one quarter contain three counters?:** Transfer from continuous length/area to a set as the reference whole.
4. **New whole, independent explanation:** Use a non-identical picture and independent labeling.

Each general Section has a **single top-to-bottom column** of typed `text`, `markdown` and `scene` blocks. These Resource types are supported by the current generic renderer, but the **named UnitFractionWorkshop Scene does not exist yet** and is specified for later implementation. No new Section discriminators, Question adapters or scoring contracts are invented.

## Detailed ordered Section plan

### Section 1 — A fair piece, not just a piece

**Purpose:** Re-activate equal-part reasoning before introducing notation.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “We can split this strip into three parts. Do the parts all have to be the same size before we name one third?” Ask for a prediction; do not reveal the label yet.

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [UnitFractionWorkshop](./scenes/UnitFractionWorkshop.scene-spec.md): Preset A: one 12-unit strip. Toggle a 4+4+4 split versus a 2+3+7 split; select one part and compare its unit-square count with the others.

3. **`markdown`** (supported Resource type) — “The three equal 4-unit pieces make thirds of the same whole. Three unequal pieces do not. A fraction needs equal parts of one chosen whole.”

**Meaningful learner action:** Choose which split permits the label and explain what stays equal.

**Specific formative feedback, not a scored answer:**

- Correct on 4+4+4: “Each part covers four squares, so one part is one of three equal parts of the strip.”
- Incorrect on 2+3+7: “There are three pieces, but they cover different amounts. We cannot call any of them one third of this strip.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Do not preselect a piece; the learner chooses a part and sees the numerical evidence.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 2 — The number for one of the parts

**Purpose:** Map a concrete equal part to written and spoken unit-fraction notation.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “One of two equal pieces is one half: 1/2. One of three is one third: 1/3. One of four is one quarter: 1/4. Why does the lower number change?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [UnitFractionWorkshop](./scenes/UnitFractionWorkshop.scene-spec.md): Preset B: choose 2, 3 or 4 equal sections of the same 12-unit strip; reveal a selected single section and a fraction card only after the learner predicts its reading.

3. **`markdown`** (supported Resource type) — “In 1/4, the 4 counts equal parts in the whole. The 1 means we chose one of them. Four equal parts still make one whole.”

**Meaningful learner action:** Switch a fixed whole from halves to thirds to quarters; match each selected part to 1/2, 1/3 or 1/4.

**Specific formative feedback, not a scored answer:**

- Confuse 1/3 with 1/4: “Count the equal sections in the whole, not the unselected sections. There are three, so one section is 1/3.”
- Confuse 4/1 with 1/4: “The top 1 says one selected section. The bottom 4 says four equal sections make the whole.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Show standard stacked fraction and accessible 'one over four' description; do not rely on tiny text.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 3 — Can one quarter contain three counters?

**Purpose:** Transfer from continuous length/area to a set as the reference whole.

**Ordered content blocks:**

1. **`markdown`** (supported Resource type) — “Twelve counters are one whole collection. Put them into four equal groups. You will not get a single counter in each group.”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [UnitFractionWorkshop](./scenes/UnitFractionWorkshop.scene-spec.md): Preset C: 12 numbered counters. Choose four grouping trays and put three counters in each; select exactly one group and show the label 1/4 of the 12-counter collection.

3. **`text`** (supported Resource type) — “One quarter of this collection is one of four equal groups. Each group contains three counters. The whole is twelve counters—not just one counter.”

**Meaningful learner action:** Arrange equal groups of three, then select one complete group as 1/4.

**Specific formative feedback, not a scored answer:**

- Only one counter selected: “One counter is not one of four equal groups of twelve. Each of the four groups needs three counters.”
- Groups 4,3,3,2: “We have four groups, but they are not equal. Move counters until every group contains three.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Text mode offers four trays with 'add selected counter' and 'move back' buttons; avoid drag-only sorting.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 4 — New whole, independent explanation

**Purpose:** Use a non-identical picture and independent labeling.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “A new ribbon is divided into four equal lengths. One length is shaded. Write its fraction, then explain how you checked it.”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [UnitFractionWorkshop](./scenes/UnitFractionWorkshop.scene-spec.md): Preset D: a ribbon of eight congruent squares split into four equal two-square lengths. Choose 1/2, 1/3 or 1/4 and optionally request a hint; do not display the fraction before prediction.

3. **`markdown`** (supported Resource type) — “There are four equal lengths in this ribbon. One is selected. So the shaded part is 1/4, one quarter of this ribbon.”

**Meaningful learner action:** Independently choose 1/4 and articulate 'one of four equal parts'.

**Specific formative feedback, not a scored answer:**

- 1/2 chosen: “That would mean two equal pieces make the whole. This ribbon has four.”
- 1/3 chosen: “Three parts would make thirds. Count the four equal lengths here.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Optional spoken answer to a teacher is possible, but speech recognition is not required.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

## Scene handoff

- [UnitFractionWorkshop](./scenes/UnitFractionWorkshop.scene-spec.md) — proposed prop-free, self-contained Scene with explicit state cases, feedback and nonvisual pathway. **The Scene type/renderer is present as a general platform capability; this particular Scene is not implemented.**
- Scene instances may use independent local preset selection within each Section, without a public props API or hidden cross-Section state. Section order itself is specified above; no invented Lesson runtime registry is implied.

## Independent transfer and reflection

One section of an eight-square ribbon divided into four equal lengths is 1/4; one of four equal groups from twelve counters contains three counters. Explain why these are both called one quarter.

Invite the child to describe **why** the result fits the model before revealing the full explanation. One optional hint is available. A non-reading learner can use accessible choice-and-explanation controls or speak to a nearby adult, without a speech-recognition requirement. Do not turn a voluntary reveal, an acknowledgement or a Section completion into a mastery claim.

## Planned short recall Note

“A unit fraction is one of equal parts of one chosen whole.”

Proposed pedagogical unlock _point_: when the contrast in Section 3 has been examined and explained. **Status planned, not wired**: no Note entity, unlock API, persistence, offline sync or review-sheet scheduler is claimed present. A learner who does not trigger an eventual Note still gets the full teaching content.

## Locale, accessibility, offline and resource readiness

All quoted learner text and Scene feedback above are English authoring source, **not implemented locale bundles**. Complete genuine translation for all required languages, contextual terms, numeral conventions, accessible descriptions and RTL-specific meaning is mandatory before runtime delivery. The spec does not create or claim language fallback behavior. Design for WCAG 2.2 AA, keyboard and mobile touch, nonvisual equivalent participation, reduced motion, weak-device parity and complete offline access once the Lesson and Scene are packaged. New assets must be locally available; no network call is essential to these experiences.

## Editorial and engineering dependencies

**All Content is provisional Draft pending Methodologist approval.** Subsequent Screenwriter approval and independent Scene review remain required. Coding Agent owns runtime content assembly, Scene registration, tests, locale resources and eventual PWA packaging. Assessment Architect owns all Questions, Quiz behavior, scores, retries and validated evidence. This batch does **not** implement any of those capabilities.
