# What Could the Result Be? — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval; not an Approved Screenwriter artifact.**

- Lesson directory: `learningApps/playground/Data/Lessons/1/listPossibleOutcomes/`
- Audience: **Grade 2**, approximately ages 7–8
- Methodologist source: [Draft Brief](./methodologist-brief.md) (**not approved**)
- Target Skills:
  - [listOutcomes.data.ts](../../../../data/skills/probability/events/skills/listOutcomes.data.ts)
- Program dependence: **None**
- Runtime/assessment status: editorial instructions only; no implementation, graded Questions or mastery signal.

## Creative and instructional premise

List every possible and only possible result of a clearly defined one-step random experiment, without mistaking outcomes for predictions or silently changing what is observed.

A set-builder inspector for a clearly stated one-step experiment. Learner changes which reported values appear in an outcome list and receives immediate evidence linked to the actual spinner or bag. No random draw is required; the list is justified from possible results, not a finite sample of spins.

**Why interactivity matters:** The child can change the relevant mathematical or observational state, inspect evidence rather than accept an answer by authority, receive a reason-specific explanation, and retry without penalty. The final unfamiliar example is not a copy of the original. The experience is a standalone teaching sequence, not a Program plot, mascot activity or points-based game.

**Teaching limits:** One draw or one spin; finite sample spaces, at most four visibly specified sectors or three tokens. Outcomes are mutually exclusive and exhaustive at the _chosen description level_. No probability arithmetic, numerical odds, equal-likelihood assumptions, replacement protocols or predictions of the next actual result. The experiment is one independent spin or draw with fully disclosed contents; the learner lists outcomes at the specified observation level only. Comparing likelihood, calculating ratios and repeated-run variation are reserved for their own Skills.

## Learner journey / planned Sections

1. **What counts as a result?:** Define both the experiment and what gets recorded before listing.
2. **Find the missing and extra item:** Check whether a proposed list is exhaustive and has no impossibilities.
3. **Three tokens, but how many possible colors?:** Distinguish physical items from distinct reported outcomes.
4. **Your experiment, your complete list:** Independent transfer to a new spinner without shown answer.

Each general Section has a **single top-to-bottom column** of typed `text`, `markdown` and `scene` blocks. These Resource types are supported by the current generic renderer, but the **named OutcomeExplorer Scene does not exist yet** and is specified for later implementation. No new Section discriminators, Question adapters or scoring contracts are invented.

## Detailed ordered Section plan

### Section 1 — What counts as a result?

**Purpose:** Define both the experiment and what gets recorded before listing.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “We spin this numbered spinner once and write down the number where the pointer stops. It has sectors 1, 2, 3 and 4. What might we write?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [OutcomeExplorer](./scenes/OutcomeExplorer.scene-spec.md): Numbered-spinner preset shows four equal sectors labeled 1–4 and a fixed result slot. Learner selects which numbers belong in a 'possible results' tray; no actual random spin is necessary.

3. **`markdown`** (supported Resource type) — “A result is one number recorded after one spin. Any of 1, 2, 3 or 4 could be recorded. There is no 5 on this spinner.”

**Meaningful learner action:** Inspect the spinner and list candidate reported numbers.

**Specific formative feedback, not a scored answer:**

- 5 included: “A spin always stops on one of the numbered sectors. This spinner has no sector numbered 5.”
- 2 omitted: “The sector labelled 2 is on the spinner, so 2 must be in our list even if we have not spun it yet.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. All four sectors equally sized in this model, but do not teach equal likelihood as part of the outcome-listing Skill.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 2 — Find the missing and extra item

**Purpose:** Check whether a proposed list is exhaustive and has no impossibilities.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “Someone wrote 1, 3, 4, 5. They forgot one possible number and added one impossible number. Which?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [OutcomeExplorer](./scenes/OutcomeExplorer.scene-spec.md): Inspector preset overlays the spinner's true set {1,2,3,4} with the proposed list {1,3,4,5}. Select the missing label and the extra label separately; reveal explanations one at a time.

3. **`markdown`** (supported Resource type) — “2 is missing, because there is a 2 sector. 5 is extra, because there is no 5 sector. The complete list is 1, 2, 3, 4.”

**Meaningful learner action:** Identify both kinds of error independently, then repair the proposed list.

**Specific formative feedback, not a scored answer:**

- 1 marked missing: “We can already see 1 in the list. Look for a number on the spinner that is absent.”
- 4 marked extra: “4 appears on the spinner, so it belongs. 5 has no matching sector.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. The learner must explain a mismatch against the experiment, not memorize an answer key.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 3 — Three tokens, but how many possible colors?

**Purpose:** Distinguish physical items from distinct reported outcomes.

**Ordered content blocks:**

1. **`markdown`** (supported Resource type) — “Here is a bag with three labelled tokens: red A, red B and blue C. We draw one token and write only its color. How many different color words could we write?”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [OutcomeExplorer](./scenes/OutcomeExplorer.scene-spec.md): Bag-color preset shows all three token labels and a separate report field 'record color'. The learner builds a list of different possible colors, with a count of distinct labels rather than physical objects.

3. **`text`** (supported Resource type) — “We could write red or blue. The list of possible colors is red, blue. Red does not need two entries: the report says the color, not which red token it was.”

**Meaningful learner action:** Build the distinct color list and explain why green is impossible and red is not written twice.

**Specific formative feedback, not a scored answer:**

- Two red entries: “There are two red tokens but only one reported color word, red. A list of different color results has red once.”
- Green included: “No token in the bag is green, so green cannot be recorded.”
- Equal chance inferred: “Seeing two color names does not mean those colors are equally likely. This lesson lists possibilities, not their chances.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. A color list must not be used as a claim of 50–50 chances.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

### Section 4 — Your experiment, your complete list

**Purpose:** Independent transfer to a new spinner without shown answer.

**Ordered content blocks:**

1. **`text`** (supported Resource type) — “A new spinner has exactly three sectors, numbered 2, 4 and 6. We spin once and record the number. Make a complete list of possible numbers.”

2. **`scene`** (typed Resource supported; named Scene **proposed**, not implemented) — [OutcomeExplorer](./scenes/OutcomeExplorer.scene-spec.md): Transfer preset displays three distinct sectors 2, 4, 6 and candidate cards 2, 3, 4, 6. Build the set and explain why 3 should stay out; optional hint points to the sector labels.

3. **`markdown`** (supported Resource type) — “The complete list is 2, 4, 6. Every number on the spinner is included, and 3 is not included because there is no 3 sector.”

**Meaningful learner action:** Independently choose 2,4,6 and reject 3; check each against the pictured experiment.

**Specific formative feedback, not a scored answer:**

- 3 included: “The numeral 3 is not on any sector. An impossible result is not part of this list.”
- 6 omitted: “The spinner includes a sector numbered 6. That makes 6 a possible result even before any spin.”

**Progression:** The learner can inspect a concrete counterexample, choose "Show why", and revise independently. The next Section follows the explanation, not an invented pass threshold. Reveal the full reason on demand, with no scored outcome.

**Accessibility and localization:** Every visual/gesture has a text-first and keyboard-operated equivalent based on the same values, with translated accessible names and explanatory feedback. Allow reduced motion; avoid color-only or audio-only meaning. Numerals and directional/clock mathematics retain their semantics when layout is adapted for RTL.

## Scene handoff

- [OutcomeExplorer](./scenes/OutcomeExplorer.scene-spec.md) — proposed prop-free, self-contained Scene with explicit state cases, feedback and nonvisual pathway. **The Scene type/renderer is present as a general platform capability; this particular Scene is not implemented.**
- Scene instances may use independent local preset selection within each Section, without a public props API or hidden cross-Section state. Section order itself is specified above; no invented Lesson runtime registry is implied.

## Independent transfer and reflection

With a new spinner numbered 2, 4, 6, the full result list is {2,4,6}; including 3 or leaving out 6 contradicts the spinner.

Invite the child to describe **why** the result fits the model before revealing the full explanation. One optional hint is available. A non-reading learner can use accessible choice-and-explanation controls or speak to a nearby adult, without a speech-recognition requirement. Do not turn a voluntary reveal, an acknowledgement or a Section completion into a mastery claim.

## Planned short recall Note

“First say what gets recorded; a complete outcome list contains every possible reported result and nothing impossible.”

Proposed pedagogical unlock _point_: when the contrast in Section 3 has been examined and explained. **Status planned, not wired**: no Note entity, unlock API, persistence, offline sync or review-sheet scheduler is claimed present. A learner who does not trigger an eventual Note still gets the full teaching content.

## Locale, accessibility, offline and resource readiness

All quoted learner text and Scene feedback above are English authoring source, **not implemented locale bundles**. Complete genuine translation for all required languages, contextual terms, numeral conventions, accessible descriptions and RTL-specific meaning is mandatory before runtime delivery. The spec does not create or claim language fallback behavior. Design for WCAG 2.2 AA, keyboard and mobile touch, nonvisual equivalent participation, reduced motion, weak-device parity and complete offline access once the Lesson and Scene are packaged. New assets must be locally available; no network call is essential to these experiences.

## Editorial and engineering dependencies

**All Content is provisional Draft pending Methodologist approval.** Subsequent Screenwriter approval and independent Scene review remain required. Coding Agent owns runtime content assembly, Scene registration, tests, locale resources and eventual PWA packaging. Assessment Architect owns all Questions, Quiz behavior, scores, retries and validated evidence. This batch does **not** implement any of those capabilities.
