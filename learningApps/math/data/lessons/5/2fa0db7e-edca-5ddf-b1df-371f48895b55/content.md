# Certain or Impossible? — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Audience:** Grade 2, approximately ages 7–8.
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md) — **not approved**.
**Canonical target Skill:** [certainImpossible.data.ts](../../../../data/skills/probability/events/skills/certainImpossible.data.ts)
**Program dependence:** None
**Implementation:** No Lesson runtime objects, scored assessments or custom Scenes created by this editorial batch.

## Instructional concept

Classify specified events as certain, impossible or possible-but-not-certain using all possible outcomes of a one-token draw. The learner should not merely name a correct option: the model must make the essential distinction observable. A new situation in the final Section checks whether the learner can use the distinction without remembering the original picture.

The Section plans below specify **single-column top-to-bottom** Resource order. `text`, `markdown` and `scene` are verified Resource block types; the **OutcomeBag Scene is proposed**, not currently a registered renderer. No Question, Quiz, scoring, success gate or Program plot is defined.

## Learner journey

1. **What could come out?** — Specify the complete set of outcomes.
2. **When is something impossible?** — Explain an event that contains no available outcome.
3. **What must happen?** — Explain an event that covers every possible outcome and contrast possible red.
4. **Change the conditions** — Transfer after modifying the complete sample space.

## Ordered Sections

### Section 1 — What could come out?

**Learning purpose:** Specify the complete set of outcomes.

**Vertical Resource sequence:**

1. **`text` (existing type):** “A bag holds three tokens: blue, blue and red. We take one token without looking. Which colors could come out?”

2. **`scene` (existing type; new Scene proposed):** [OutcomeBag](./scenes/OutcomeBag.scene-spec.md). Outcome Bag opens an inventory view (two labelled blue tokens, one labelled red token). Choose which color labels are present before the next explanation.

3. **`markdown` (existing type):** “A blue token could come out, and a red token could come out. Those are the possible colors. Nothing else is in this bag.”

**Learner action:** Inspect the full inventory and name the possible color outcomes.

**Immediate explanatory feedback:** If green is included: “Look through all three tokens; there is no green one.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 2 — When is something impossible?

**Learning purpose:** Explain an event that contains no available outcome.

**Vertical Resource sequence:**

1. **`text` (existing type):** “Can the one token we draw be green?”

2. **`scene` (existing type; new Scene proposed):** [OutcomeBag](./scenes/OutcomeBag.scene-spec.md). Choose 'possible', 'certain', or 'impossible' for green. Reveal a complete color inventory and an explanation.

3. **`markdown` (existing type):** “Green is impossible here: there are no green tokens. Impossible means it cannot happen under the stated conditions.”

**Learner action:** Classify green and inspect evidence.

**Immediate explanatory feedback:** For 'possible': “Nothing green is in the bag, so no draw can produce green.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 3 — What must happen?

**Learning purpose:** Explain an event that covers every possible outcome and contrast possible red.

**Vertical Resource sequence:**

1. **`text` (existing type):** “Will we draw blue OR red? Now a different question: will it definitely be red?”

2. **`scene` (existing type; new Scene proposed):** [OutcomeBag](./scenes/OutcomeBag.scene-spec.md). Compare two event cards against the same bag: 'blue or red' and 'red'. Highlight which inventory tokens satisfy each claim and which do not.

3. **`markdown` (existing type):** “Blue OR red is certain, because every token is one of those colors. Red alone is possible, not certain: the next token might be blue.”

**Learner action:** First select certain for 'blue or red'; then possible-but-not-certain for 'red'.

**Immediate explanatory feedback:** For 'red is certain': “Two blue tokens could also be selected. Red is possible, but not guaranteed.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 4 — Change the conditions

**Learning purpose:** Transfer after modifying the complete sample space.

**Vertical Resource sequence:**

1. **`markdown` (existing type):** “Now the bag contains only blue tokens. Is blue certain? Is red impossible? What about 'blue or red'?”

2. **`scene` (existing type; new Scene proposed):** [OutcomeBag](./scenes/OutcomeBag.scene-spec.md). Switch to a fixed all-blue bag. Submit each event classification, then reveal the relevant outcome coverage; allow learner to switch back and compare.

3. **`text` (existing type):** “Blue is certain and red is impossible in this new bag. 'Blue or red' is still certain because blue is included. The bag's contents decide the answer.”

**Learner action:** Independently classify events in a new bag.

**Immediate explanatory feedback:** If 'blue or red' is called impossible: “Blue is one of the two colors named, so every draw satisfies 'blue or red'.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

## Custom Scene specification

- [OutcomeBag](./scenes/OutcomeBag.scene-spec.md): provides the learner-controlled model and its explanatory feedback. A Scene instance is self-contained and prop-free; repeated presentations must have independent local state. The new Scene needs future code, locale dictionaries and tests before use.

## Independent transfer

A box has only four triangles and no circles. With one shape drawn, explain why 'triangle' is certain and 'circle' impossible. Give a first attempt without immediately showing the previous example; provide an optional hint and then a complete worked explanation. This is an instructional transfer opportunity, not a validated assessment.

## Proposed Lesson Note (planned only)

**Cue:** “Certain means every possible outcome fits; impossible means none fits.”

Proposed editorial unlock moment: after the learner has inspected and explained the contrasting example in Section 3. Note entity/persistence/unlock events/revision schedules are not verified implemented and are **not** wired by this batch. Learners who do not engage the cue still receive the complete Lesson explanation.

## Localization, access and offline handoff

This English editorial copy is **not a multilingual runtime bundle**. A later translation workflow must supply genuine complete translations for all supported locales, including Scene explanations, controls, accessible names and model descriptions. Do not silently fall back to English. The planned equivalent nonvisual action, 2D SVG/static-state rendering, semantic RTL, readable small screens, reduced motion and locally packaged offline content are implementation acceptance gates; they are not reported as implemented.

## Editorial gates and assessment boundaries

**Provisional Draft, pending Methodologist approval.** Separate Content and Scene editorial reviews are also pending. Assessment Architect owns valid Questions/Quiz, evidence rules, scores, thresholds and analytics. Coding Agent owns Scene/renderer/locale implementation and automated tests. No Section here claims mastery based on a reveal, selection, or Note.
