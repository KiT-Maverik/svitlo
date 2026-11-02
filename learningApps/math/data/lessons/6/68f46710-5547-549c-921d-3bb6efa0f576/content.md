# Which Is Longer? Compare Fairly — Lesson Content

**Editorial status: Provisional Draft — pending Methodologist approval.**
**Lesson:** `learningApps/playground/Data/Lessons/1/comparingLengths/`. **Audience:** Grade 1 (ages 6–7). **Program dependence:** None.
**Methodology:** [Draft Methodologist Brief](./methodologist-brief.md). **Target Skills:** exactly the linked canonical Skill(s) in that Brief; no inferred UUID or runtime registration.

## Instructional premise

Move the start, not the finish: compare lengths from a shared zero. Make the learner predict, manipulate an accurate model, inspect what stays constant, articulate the reason, and transfer to new objects. This is explanatory learning, not a graded quiz or a sequence of arbitrary clicks. Progress is self-paced. Proposed custom Scene: [Fair Length Comparator](./scenes/fairLengthComparator.scene-spec.md).

## Ordered Section plan

Each Section is a single-column ordered Resource plan. **`text` and `markdown`** are existing typed blocks; **`scene`** is an existing block type but the Fair Length Comparator component itself is **not implemented**. Actual rendering and all optional audio are subject to coding-agent verification. No unsupported Resource types or APIs are assumed.

### Section 1 — A Tricky Picture

**Purpose:** Elicit prior intuition and create an intelligible problem.

1. **text (existing):** Show two straight ribbons: A length 6 equal grid intervals starting at x=2, B length 5 starting at x=5. B's right tip is farther right, but A is longer. Ask for a prediction.
2. **scene (type exists; proposed instance):** Work within [Fair Length Comparator](./scenes/fairLengthComparator.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Explain that far-right placement alone cannot tell length: A spans six intervals, B five. Align their starting ends.

**Explanatory feedback and recovery:** If child chooses B: 'Its tip is farther right because it starts later. Line up the starts first.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 2 — Make the Comparison Fair

**Purpose:** Strengthen the concept by testing a controlled contrast.

1. **text (existing):** In the comparator, press 'Align starts' to move both ribbons to one origin; change ribbon thickness and vertical position without changing endpoint separation.
2. **scene (type exists; proposed instance):** Work within [Fair Length Comparator](./scenes/fairLengthComparator.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Reveal A six intervals and B five; A longer by one interval. Add 4 vs 4 equal case, and thick 3 vs thin 5 case.

**Explanatory feedback and recovery:** For thick 3 vs thin 5: 'Width is not length. Look from one end to the other.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 3 — Compare Without Moving Objects

**Purpose:** Strengthen the concept by testing a controlled contrast.

1. **text (existing):** Show fixed book edge and shelf edge in different locations. Learner transfers a single comparison strip from book edge to shelf edge, keeping its length unchanged.
2. **scene (type exists; proposed instance):** Work within [Fair Length Comparator](./scenes/fairLengthComparator.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Explain: 'The same strip reaches beyond the shorter object but not the longer one.' Include equal length case.

**Explanatory feedback and recovery:** If learner changes strip length: 'Then it is not the same reference. Reset the strip and use it for both.'

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

### Section 4 — Transfer

**Purpose:** Transfer the new reasoning independently.

1. **text (existing):** Show two offset drawn paths with endpoints labeled and ask for a reasoned comparison. Child can select align or use reference strip and verbalize why.
2. **scene (type exists; proposed instance):** Offer a fresh preset or an accessible textual equivalent in [Fair Length Comparator](./scenes/fairLengthComparator.scene-spec.md). The child may inspect the current state, predict an outcome, change exactly one relevant variable, and review a previous state. No gesture-only path.
3. **markdown (existing):** Feedback names the method, not only the longer object. Offer an independent 'which is longer and why' reflection.

**Explanatory feedback and recovery:** When the prediction differs, show the comparison and why, allow another attempt, and offer a descriptive hint without score or penalty.

**Navigation:** Continue after reflection or explore again; never claim success solely from completion. **Accessibility:** readable semantic text corresponding to each state, localized controls, logical keyboard focus, accessible change announcements and an equivalent no-drag route.

## Independent application and feedback principles

Invite the learner to explain the key reason in a new everyday example, not only repeat the original picture. A plausible wrong answer must receive a _specific mathematical explanation_ rather than a red mark. Avoid asserting mastery from one voluntary interaction. No Question/Quiz/scoring implementation is proposed in this batch.

## Future recall cue (not implemented)

“Move the start, not the finish: compare lengths from a shared zero.” Suggested trigger: after the learner observes the decisive contrast in Section 2. This is a **proposed Note cue only**; no persistence, unlock event or runtime Note contract is invented.

## Editorial/implementation boundary

All texts, labels, model alternatives, explanations, optional sound transcripts and Scene states require authentic supported-locale translation. Semantic RTL, mobile operation, WCAG 2.2 AA, reduced motion and post-download offline equivalence are acceptance requirements, not verified features. A standalone prop-free Scene must be designed and coded later. The Lesson is independent of Curriculum/Program, has no specified runtime lesson data, scored Questions, or analytics.
