# Count What Belongs Together — Lesson Content

**Status: Provisional Draft — pending Methodologist approval.**
**Audience:** Grade 1, approximately ages 6–7.
**Methodologist input:** [Draft Methodologist Brief](./methodologist-brief.md) — **not approved**.
**Canonical target Skill:** [collectCounts.data.ts](../../../../data/skills/data/collection/skills/collectCounts.data.ts)
**Program dependence:** None
**Implementation:** No Lesson runtime objects, scored assessments or custom Scenes created by this editorial batch.

## Instructional concept

Assign observations to unambiguous categories, count the frequency of each category, and check that the category counts add to the total. The learner should not merely name a correct option: the model must make the essential distinction observable. A new situation in the final Section checks whether the learner can use the distinction without remembering the original picture.

The Section plans below specify **single-column top-to-bottom** Resource order. `text`, `markdown` and `scene` are verified Resource block types; the **CategoryCounter Scene is proposed**, not currently a registered renderer. No Question, Quiz, scoring, success gate or Program plot is defined.

## Learner journey

1. **What are we counting?** — Define the investigation and categorical rule.
2. **Count each shape once** — Develop an accurate frequency count.
3. **Does everything add up?** — Reconcile category subtotals with the whole collection.
4. **New objects, same method** — Independent transfer with different labels and totals.

## Ordered Sections

### Section 1 — What are we counting?

**Learning purpose:** Define the investigation and categorical rule.

**Vertical Resource sequence:**

1. **`text` (existing type):** “We have eight shapes. How many are circles, triangles and squares? First decide which group each shape belongs to.”

2. **`markdown` (existing type):** “Every object goes into exactly one group, according to its shape. We will count how many times each shape appears.”

3. **`scene` (existing type; new Scene proposed):** [CategoryCounter](./scenes/CategoryCounter.scene-spec.md). Category Counter presents 4 circles, 3 triangles and 1 square, all visually distinct and also individually named for screen-reader inspection. Select any one object and choose its group.

**Learner action:** Identify categories by shape, not color, and place the first object.

**Immediate explanatory feedback:** If an object is assigned to the wrong category, state its shape and prompt a reclassification; do not remove or duplicate it. A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 2 — Count each shape once

**Learning purpose:** Develop an accurate frequency count.

**Vertical Resource sequence:**

1. **`text` (existing type):** “Sort the remaining shapes. Watch a count grow each time you put one shape in its matching group.”

2. **`scene` (existing type; new Scene proposed):** [CategoryCounter](./scenes/CategoryCounter.scene-spec.md). Make the eight assignments. Each move has an undo button; each source object has an assigned/unassigned state; the category counter rises only on a valid assignment.

3. **`markdown` (existing type):** “There are 4 circles, 3 triangles and 1 square. These numbers tell how often each kind appears.”

**Learner action:** Finish all eight assignments and inspect each counter.

**Immediate explanatory feedback:** If one remains: “Seven have been counted and one is still waiting. Count the remaining one before checking the total.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 3 — Does everything add up?

**Learning purpose:** Reconcile category subtotals with the whole collection.

**Vertical Resource sequence:**

1. **`text` (existing type):** “The first collection had 8 shapes. Do the group counts make 8 in all?”

2. **`scene` (existing type; new Scene proposed):** [CategoryCounter](./scenes/CategoryCounter.scene-spec.md). Reveal a reconciliation view: 4 circles + 3 triangles + 1 square = 8; compare assigned count with original count and flag any unassigned observation without punitive error state.

3. **`markdown` (existing type):** “4 + 3 + 1 = 8. We counted every shape once. If the totals did not match, a shape might have been missed or counted twice.”

**Learner action:** Compare displayed counts and choose whether the total agrees.

**Immediate explanatory feedback:** For 'no' when 4+3+1=8: “Add the groups in order: 4 + 3 = 7, and 7 + 1 = 8.” A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

### Section 4 — New objects, same method

**Learning purpose:** Independent transfer with different labels and totals.

**Vertical Resource sequence:**

1. **`markdown` (existing type):** “A new collection has stars, circles and squares. Sort it and count each kind without looking at the old answers.”

2. **`scene` (existing type; new Scene proposed):** [CategoryCounter](./scenes/CategoryCounter.scene-spec.md). Use a new fixed dataset of 5 stars, 2 circles, 2 squares. Counters start at zero; optional hint says 'each shape belongs to one group'.

3. **`text` (existing type):** “The new counts are 5 stars, 2 circles and 2 squares. Check: 5 + 2 + 2 = 9, exactly the number of shapes you began with.”

**Learner action:** Complete independent category counting and reconcile total.

**Immediate explanatory feedback:** If total differs, display assigned and unassigned counts; offer undo and retry instead of announcing a score. A learner may revise the answer, inspect the concrete model, or request the explanation; no penalty, score or pretend mastery flag. When the child chooses correctly, show the mathematical reason, not merely “Correct.”

**Access and pacing:** Full keyboard and touch actions, text-based model inspection and a meaningful nonvisual equivalent; hints, explanations and Next are learner-controlled. Any narration repeats key information with caption/transcript, not as an audio-only requirement. Preserve numeric reading order in RTL.

## Custom Scene specification

- [CategoryCounter](./scenes/CategoryCounter.scene-spec.md): provides the learner-controlled model and its explanatory feedback. A Scene instance is self-contained and prop-free; repeated presentations must have independent local state. The new Scene needs future code, locale dictionaries and tests before use.

## Independent transfer

Count five stars, two circles and two squares in a new nine-object collection, then explain why 5 + 2 + 2 must equal 9. Give a first attempt without immediately showing the previous example; provide an optional hint and then a complete worked explanation. This is an instructional transfer opportunity, not a validated assessment.

## Proposed Lesson Note (planned only)

**Cue:** “Count each object once; category counts together must equal the number of objects.”

Proposed editorial unlock moment: after the learner has inspected and explained the contrasting example in Section 3. Note entity/persistence/unlock events/revision schedules are not verified implemented and are **not** wired by this batch. Learners who do not engage the cue still receive the complete Lesson explanation.

## Localization, access and offline handoff

This English editorial copy is **not a multilingual runtime bundle**. A later translation workflow must supply genuine complete translations for all supported locales, including Scene explanations, controls, accessible names and model descriptions. Do not silently fall back to English. The planned equivalent nonvisual action, 2D SVG/static-state rendering, semantic RTL, readable small screens, reduced motion and locally packaged offline content are implementation acceptance gates; they are not reported as implemented.

## Editorial gates and assessment boundaries

**Provisional Draft, pending Methodologist approval.** Separate Content and Scene editorial reviews are also pending. Assessment Architect owns valid Questions/Quiz, evidence rules, scores, thresholds and analytics. Coding Agent owns Scene/renderer/locale implementation and automated tests. No Section here claims mastery based on a reveal, selection, or Note.
