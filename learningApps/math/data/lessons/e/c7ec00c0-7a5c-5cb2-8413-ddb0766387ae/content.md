# Recognize Shapes by Properties — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval.**
**Lesson:** `learningApps/playground/Data/Lessons/1/recognizingPlaneFigures/`. **Audience:** Grade 1 (ages 6–7). **Program dependence:** None.
**Methodology:** [Draft Methodologist Brief](./methodologist-brief.md). **Target Skills:** exactly the linked canonical Skill(s) in that Brief; no inferred UUID or runtime registration.

## Instructional premise

Change the picture without changing the shape. Make the learner predict, manipulate an accurate model, inspect what stays constant, articulate the reason, and transfer to new objects. This is explanatory learning, not a graded quiz or a sequence of arbitrary clicks. Progress is self-paced. Proposed custom Scene: [Shape Property Studio](./scenes/shapePropertyStudio.scene-spec.md).

## Ordered Section plan

Each Section is a single-column ordered Resource plan. **`text` and `markdown`** are existing typed blocks; **`scene`** is an existing block type but the Shape Property Studio component itself is **not implemented**. Actual rendering and all optional audio are subject to coding-agent verification. No unsupported Resource types or APIs are assumed.

### Section 1 — The Turned Square

**Purpose:** Elicit prior intuition and create an intelligible problem.

1. **text (existing):** Present one upright square and one square rotated 45 degrees. Ask: 'Are these the same kind of shape?' Keep the rotation model visible.
2. **scene (type exists; proposed instance):** Work within [Shape Property Studio](./scenes/shapePropertyStudio.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Reveal equal side lengths and four right-angle corners on both. Explain: 'Turning a square does not change its corners or sides.'

**Explanatory feedback and recovery:** For 'diamond': 'It looks tilted. Trace its four equal sides and square corners; it is still a square.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 2 — Change What Does Not Matter

**Purpose:** Strengthen the concept by testing a controlled contrast.

1. **text (existing):** In Shape Property Studio, learner rotates, rescales and recolors one figure; the property ledger stays constant. Include triangles and rectangles with multiple legitimate appearances.
2. **scene (type exists; proposed instance):** Work within [Shape Property Studio](./scenes/shapePropertyStudio.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Ask the learner to predict whether a shape name changes after a turn, then test. A stretched square becomes a non-square rectangle only if actual side lengths change; scaling both dimensions equally preserves the square.

**Explanatory feedback and recovery:** Do not claim every stretch preserves shape type. If width changes alone, say: 'Its sides changed, so it may no longer be a square.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 3 — Shapes Within Shapes

**Purpose:** Strengthen the concept by testing a controlled contrast.

1. **text (existing):** Show square and a longer rectangle. Reveal that each has four right angles; ask if both may be called rectangles. Sort by 'rectangles' and 'squares' as overlapping groups.
2. **scene (type exists; proposed instance):** Work within [Shape Property Studio](./scenes/shapePropertyStudio.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Explain the relationship in plain language: 'All squares are rectangles. Some rectangles have unequal neighboring sides and are not squares.'

**Explanatory feedback and recovery:** If the learner excludes the square: 'Check its corners. A square also has four right angles.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 4 — Find One Away From the Screen

**Purpose:** Transfer the new reasoning independently.

1. **text (existing):** Invite a learner to identify a triangle and a rectangle from unfamiliar, color-neutral outlines, including a turned example; alternatively describe a real sign/window shape.
2. **scene (type exists; proposed instance):** Offer a fresh preset or an accessible textual equivalent in [Shape Property Studio](./scenes/shapePropertyStudio.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Ask them to name a property, not a color. No answer tracking or formal assessment.

**Explanatory feedback and recovery:** If unsure: 'Try counting straight sides and checking the corners.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

## Independent application and feedback principles

Invite the learner to explain the key reason in a new everyday example, not only repeat the original picture. A plausible wrong answer must receive a _specific mathematical explanation_ rather than a red mark. Avoid asserting mastery from one voluntary interaction. No Question/Quiz/scoring implementation is proposed in this batch.

## Future recall cue (not implemented)

“Change the picture without changing the shape.” Suggested trigger: after the learner observes the decisive contrast in Section 2. This is a **proposed Note cue only**; no persistence, unlock event or runtime Note contract is invented.

## Editorial/implementation boundary

All texts, labels, model alternatives, explanations, optional sound transcripts and Scene states require authentic supported-locale translation. Semantic RTL, mobile operation, WCAG 2.2 AA, reduced motion and post-download offline equivalence are acceptance requirements, not verified features. A standalone prop-free Scene must be designed and coded later. The Lesson is independent of Curriculum/Program, has no specified runtime lesson data, scored Questions, or analytics.
