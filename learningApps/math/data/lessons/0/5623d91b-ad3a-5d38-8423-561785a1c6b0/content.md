# Where Is It? Relative Position — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval.**
**Lesson:** `learningApps/playground/Data/Lessons/1/relativePositions/`. **Audience:** Grade 1 (ages 6–7). **Program dependence:** None.
**Methodology:** [Draft Methodologist Brief](./methodologist-brief.md). **Target Skills:** exactly the linked canonical Skill(s) in that Brief; no inferred UUID or runtime registration.

## Instructional premise

An object can stay still while its position words change when the observer walks around it. Make the learner predict, manipulate an accurate model, inspect what stays constant, articulate the reason, and transfer to new objects. This is explanatory learning, not a graded quiz or a sequence of arbitrary clicks. Progress is self-paced. Proposed custom Scene: [Viewpoint Position Lab](./scenes/viewpointPositionLab.scene-spec.md).

## Ordered Section plan

Each Section is a single-column ordered Resource plan. **`text` and `markdown`** are existing typed blocks; **`scene`** is an existing block type but the Viewpoint Position Lab component itself is **not implemented**. Actual rendering and all optional audio are subject to coding-agent verification. No unsupported Resource types or APIs are assumed.

### Section 1 — Whose Left?

**Purpose:** Elicit prior intuition and create an intelligible problem.

1. **text (existing):** A book is in the middle; a cup stands on one side. First ask 'Where is the cup?' before naming the observer. Invite the child to predict whether two opposite observers will say the same thing.
2. **scene (type exists; proposed instance):** Work within [Viewpoint Position Lab](./scenes/viewpointPositionLab.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Reveal: from the observer facing the table, the cup is on the left. From the opposite observer, the same cup is on the right. Nothing moved; the viewer changed.

**Explanatory feedback and recovery:** For 'left' without a viewer: 'That could be true from one side. Tell me whose left you mean.' For a named viewer: 'Yes: from that viewpoint the cup is left of the book.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 2 — Move the Viewer, Not the Objects

**Purpose:** Strengthen the concept by testing a controlled contrast.

1. **text (existing):** Use the Viewpoint Position Lab to switch between two marked viewing positions without moving the cup or book. Ask before switching: 'Will the answer stay the same?'
2. **scene (type exists; proposed instance):** Work within [Viewpoint Position Lab](./scenes/viewpointPositionLab.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** At each switch, expose an object-centric verbal description and a separate viewer-oriented description. Ask the learner to compare them.

**Explanatory feedback and recovery:** If the learner expects the cup to move: 'Look at the object markers. They stayed fixed; only our view moved.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 3 — Give a Precise Direction

**Purpose:** Transfer the new reasoning independently.

1. **text (existing):** Present a new scene: ball below a shelf, plant beside a chair. Ask learners to make a precise description for another person. Offer two versions: 'Move it left' vs 'Place it to the left of the chair, as seen from the doorway.'
2. **scene (type exists; proposed instance):** Offer a fresh preset or an accessible textual equivalent in [Viewpoint Position Lab](./scenes/viewpointPositionLab.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** The second instruction carries a reference object and viewer. Transfer to locating a pencil beside a notebook in a real room.

**Explanatory feedback and recovery:** Explain why 'beside' may be sufficient for proximity but not for distinguishing left versus right. No graded score.

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

## Independent application and feedback principles

Invite the learner to explain the key reason in a new everyday example, not only repeat the original picture. A plausible wrong answer must receive a _specific mathematical explanation_ rather than a red mark. Avoid asserting mastery from one voluntary interaction. No Question/Quiz/scoring implementation is proposed in this batch.

## Future recall cue (not implemented)

“An object can stay still while its position words change when the observer walks around it.” Suggested trigger: after the learner observes the decisive contrast in Section 2. This is a **proposed Note cue only**; no persistence, unlock event or runtime Note contract is invented.

## Editorial/implementation boundary

All texts, labels, model alternatives, explanations, optional sound transcripts and Scene states require authentic supported-locale translation. Semantic RTL, mobile operation, WCAG 2.2 AA, reduced motion and post-download offline equivalence are acceptance requirements, not verified features. A standalone prop-free Scene must be designed and coded later. The Lesson is independent of Curriculum/Program, has no specified runtime lesson data, scored Questions, or analytics.
