# Equal Parts of One Whole — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Audience:** Grade 2, approximately ages 7–8.
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md) — **not approved**.
**Canonical target Skill:** [wholeAndEqualParts.data.ts](../../../../data/skills/fractions/representation/skills/wholeAndEqualParts.data.ts)
**Program dependence:** None
**Implementation:** No Lesson runtime objects, scored assessments or custom Scenes created by this editorial batch.

## Instructional concept

Recognize a chosen whole and decide whether it has been partitioned into parts of equal area, including when the equal pieces look different. The learner should not merely name a correct option: the model must make the essential distinction observable. A new situation in the final Section checks whether the learner can use the distinction without remembering the original picture.

The Section plans below specify **single-column top-to-bottom** Resource order. `text`, `markdown` and `scene` are verified Resource block types; the **PartitionLab Scene is proposed**, not currently a registered renderer. No Question, Quiz, scoring, success gate or Program plot is defined.

## Learner journey

1. **Which shape is the whole?** — Anchor the reference whole before comparing pieces.
2. **A cut does not guarantee equal parts** — Distinguish number of parts from their sizes.
3. **Equal parts can have different outlines** — Correct the misconception that equal means same visual shape.
4. **What if the whole changes?** — Transfer to a different reference whole.

## Ordered Sections

### Section 1 — Which shape is the whole?

**Learning purpose:** Anchor the reference whole before comparing pieces.

**Vertical Resource sequence:**

1. **`text` (existing type):** “This is one whole sheet of paper. If we cut it, all the new pieces together still make this one sheet. Point to the whole.”

2. **`scene` (existing type; new Scene proposed):** [PartitionLab](./scenes/PartitionLab.scene-spec.md). Partition Lab starts with one uncut 8-by-4 grid rectangle. Select 'Whole' to highlight the entire area; then reveal two candidate cuts, but keep the original outline visible.

3. **`markdown` (existing type):** “The whole is the complete sheet we chose. To talk about equal parts, we compare the pieces of that same sheet.”

**Learner action:** Identify the whole; predict whether every two-piece cut makes equal halves.

**Immediate explanatory feedback:** If only a piece is selected as the whole: “That is one piece. Follow the original outer border to find the whole sheet.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 2 — A cut does not guarantee equal parts

**Learning purpose:** Distinguish number of parts from their sizes.

**Vertical Resource sequence:**

1. **`text` (existing type):** “Both pictures show two pieces. Are both cuts fair shares?”

2. **`scene` (existing type; new Scene proposed):** [PartitionLab](./scenes/PartitionLab.scene-spec.md). Inspect the midpoint vertical cut (4+4 equal unit columns) and the off-center cut (2+6 columns) in Partition Lab. Select 'Equal' or 'Not equal' separately for each.

3. **`markdown` (existing type):** “Two equal halves cover the same amount of the whole. The 4+4 cut makes equal parts; the 2+6 cut does not, even though both cuts make two pieces.”

**Learner action:** Compare areas, not labels, using selectable unit-square grid overlays.

**Immediate explanatory feedback:** For incorrect 'equal' on 2+6: “Count or match the covered squares: this side covers 8 small squares and the other 24. They are not equal.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 3 — Equal parts can have different outlines

**Learning purpose:** Correct the misconception that equal means same visual shape.

**Vertical Resource sequence:**

1. **`text` (existing type):** “A diagonal cut makes two triangles. They do not look like the two rectangles from the middle cut. Are they equal parts?”

2. **`scene` (existing type; new Scene proposed):** [PartitionLab](./scenes/PartitionLab.scene-spec.md). Switch Partition Lab to a corner-to-corner diagonal. Select either triangle and show a turn-and-match overlay placing one on the other; also offer a labelled text explanation.

3. **`markdown` (existing type):** “Yes. These two triangles cover equal area of the original rectangle. A half does not need to be a rectangle.”

**Learner action:** Inspect rotation/matching, then name the equality rule.

**Immediate explanatory feedback:** If 'not equal' is selected: “The outlines are triangles, but turning one shows the pieces match in area; each is half of the same sheet.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 4 — What if the whole changes?

**Learning purpose:** Transfer to a different reference whole.

**Vertical Resource sequence:**

1. **`markdown` (existing type):** “One small paper rectangle and one large paper rectangle are each cut exactly through the middle. Are their halves always the same size?”

2. **`scene` (existing type; new Scene proposed):** [PartitionLab](./scenes/PartitionLab.scene-spec.md). Select between a 4-by-4 and an 8-by-4 whole with midpoint cuts; compare covered grid-square totals with no automatic hint.

3. **`text` (existing type):** “No. Equal parts belong to their own whole. Half of a larger sheet can cover more area than half of a smaller sheet.”

**Learner action:** Make independent prediction, show reasoning, optionally reveal hint.

**Immediate explanatory feedback:** If 'same size' is chosen: “Check which original sheet is larger; equal division does not make the two wholes the same.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

## Custom Scene specification

- [PartitionLab](./scenes/PartitionLab.scene-spec.md): provides the learner-controlled model and its explanatory feedback. A Scene instance is self-contained and prop-free; repeated presentations must have independent local state. The new Scene needs future code, locale dictionaries and tests before use.

## Independent transfer

A rectangular garden is split diagonally from one corner to the opposite. Explain why the two plots cover equal area without trusting their orientation. Give a first attempt without immediately showing the previous example; provide an optional hint and then a complete worked explanation. This is an instructional transfer opportunity, not a validated assessment.

## Proposed Lesson Note (planned only)

**Cue:** “Equal parts have the same amount of one chosen whole.”

Proposed editorial unlock moment: after the learner has inspected and explained the contrasting example in Section 3. Note entity/persistence/unlock events/revision schedules are not verified implemented and are **not** wired by this batch. Learners who do not engage the cue still receive the complete Lesson explanation.

## Localization, access and offline handoff

This English editorial copy is **not a multilingual runtime bundle**. A later translation workflow must supply genuine complete translations for all supported locales, including Scene explanations, controls, accessible names and model descriptions. Do not silently fall back to English. The planned equivalent nonvisual action, 2D SVG/static-state rendering, semantic RTL, readable small screens, reduced motion and locally packaged offline content are implementation acceptance gates; they are not reported as implemented.

## Editorial gates and assessment boundaries

**Provisional Draft, pending Methodologist approval.** Separate Content and Scene editorial reviews are also pending. Assessment Architect owns valid Questions/Quiz, evidence rules, scores, thresholds and analytics. Coding Agent owns Scene/renderer/locale implementation and automated tests. No Section here claims mastery based on a reveal, selection, or Note.
