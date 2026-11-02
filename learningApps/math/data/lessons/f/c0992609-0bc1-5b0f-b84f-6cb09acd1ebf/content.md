# How Many Units Long? — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval.**
**Lesson:** `learningApps/playground/Data/Lessons/1/measuringWithEqualUnits/`. **Audience:** Grade 2 (ages 7–8). **Program dependence:** None.
**Methodology:** [Draft Methodologist Brief](./methodologist-brief.md). **Target Skills:** exactly the linked canonical Skill(s) in that Brief; no inferred UUID or runtime registration.

## Instructional premise

Same length, different number: the unit matters. Make the learner predict, manipulate an accurate model, inspect what stays constant, articulate the reason, and transfer to new objects. This is explanatory learning, not a graded quiz or a sequence of arbitrary clicks. Progress is self-paced. Proposed custom Scene: [Unit Tile Workbench](./scenes/unitTileWorkbench.scene-spec.md).

## Ordered Section plan

Each Section is a single-column ordered Resource plan. **`text` and `markdown`** are existing typed blocks; **`scene`** is an existing block type but the Unit Tile Workbench component itself is **not implemented**. Actual rendering and all optional audio are subject to coding-agent verification. No unsupported Resource types or APIs are assumed.

### Section 1 — The Missing Space

**Purpose:** Elicit prior intuition and create an intelligible problem.

1. **text (existing):** Show an unchanging bar of 12 grid spaces. A sequence of six identical two-space tiles covers it exactly; then insert a one-space gap while keeping six tiles. Ask if the result is still correct.
2. **scene (type exists; proposed instance):** Work within [Unit Tile Workbench](./scenes/unitTileWorkbench.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Explain: 'A good measurement covers the length once—no holes and no overlap.' Count intervals, not tile boundary marks.

**Explanatory feedback and recovery:** If they count seven boundary lines: 'Those are the edges between tiles. Count the six spaces covered.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 2 — Build a Real Measure

**Purpose:** Strengthen the concept by testing a controlled contrast.

1. **text (existing):** In the workbench, choose identical two-space tiles, place them consecutively using Next tile and Undo tile, and reveal endpoint progress. Completion at six tiles should show '6 of these tiles long'.
2. **scene (type exists; proposed instance):** Work within [Unit Tile Workbench](./scenes/unitTileWorkbench.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** For an overlap attempt, the tile snaps to the next unoccupied position or the app explains why overlap is not allowed; don't silently accept incorrect placement.

**Explanatory feedback and recovery:** If a gap remains: 'The bar is still uncovered here. Move the next tile to the previous endpoint.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 3 — Swap the Unit, Not the Bar

**Purpose:** Strengthen the concept by testing a controlled contrast.

1. **text (existing):** Lock the same twelve-space bar and switch to equal three-space tiles. Ask: 'Will we need more or fewer tiles?' Four now cover the bar exactly.
2. **scene (type exists; proposed instance):** Work within [Unit Tile Workbench](./scenes/unitTileWorkbench.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Explain: 'A bigger tile needs fewer repeats. Six small tiles and four big tiles cover the SAME bar.' Show equivalent boundaries.

**Explanatory feedback and recovery:** For 'bigger number means longer': 'The object stayed the same. What changed was the measuring unit.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 4 — Make and Fix a Measurement

**Purpose:** Transfer the new reasoning independently.

1. **text (existing):** Present two proposed measures: 2-space tiles placed at 0,2,4,6,8,10 vs same tiles with gaps/overlaps. Learner identifies what to repair and predicts the valid count.
2. **scene (type exists; proposed instance):** Offer a fresh preset or an accessible textual equivalent in [Unit Tile Workbench](./scenes/unitTileWorkbench.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Transfer to measuring a real pencil with equal blocks; advise against asserting whole units when there's an uncovered remainder. No scoring.

**Explanatory feedback and recovery:** When the prediction differs, show the comparison and why, allow another attempt, and offer a descriptive hint without score or penalty.

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

## Independent application and feedback principles

Invite the learner to explain the key reason in a new everyday example, not only repeat the original picture. A plausible wrong answer must receive a _specific mathematical explanation_ rather than a red mark. Avoid asserting mastery from one voluntary interaction. No Question/Quiz/scoring implementation is proposed in this batch.

## Future recall cue (not implemented)

“Same length, different number: the unit matters.” Suggested trigger: after the learner observes the decisive contrast in Section 2. This is a **proposed Note cue only**; no persistence, unlock event or runtime Note contract is invented.

## Editorial/implementation boundary

All texts, labels, model alternatives, explanations, optional sound transcripts and Scene states require authentic supported-locale translation. Semantic RTL, mobile operation, WCAG 2.2 AA, reduced motion and post-download offline equivalence are acceptance requirements, not verified features. A standalone prop-free Scene must be designed and coded later. The Lesson is independent of Curriculum/Program, has no specified runtime lesson data, scored Questions, or analytics.
