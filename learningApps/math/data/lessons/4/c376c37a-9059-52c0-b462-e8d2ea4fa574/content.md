# One Object, One Count — Lesson Content

Status: **Provisional Draft — pending Methodologist approval**
Source: [Methodologist Brief](./methodologist-brief.md) (Draft)
Program dependence: None
Code: Not implemented

## Instructional concept

Match exactly one spoken count word to each new object, without skipping or recounting. Every Section invites prediction or observation, meaningful learner control, explanatory feedback, and a chance to apply the reasoning to a changed representation, not an extended lecture followed by a token quiz.

## Learner journey / ordered Section plan

Each Section is a proposed `LessonSection_Config` with vertically ordered existing Resource types: `text` → proposed new `scene` → `markdown`. The generic scene resource type exists; the custom Scene specified here is **not implemented**. Independent prop-free placements have their own starting states and no external mode prop.

### Section 1 — Six buttons in a tray

**text / learner invitation:** “There are six buttons. Can we count each exactly once?”

**scene / learner action:** [countEveryObjectOnce Lab](./scenes/countEveryObjectOnceLab.scene-spec.md), placement 1. Mark each of six separated buttons; each advances a count-word ledger once. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** The sixth different button corresponds to the word six. Example: Six buttons, six distinct count words.

**Formative feedback:** If a button is counted twice, explain it has already received a number; show the unmarked items. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 2 — Scattered pebbles

**text / learner invitation:** “Will the total change when the pebbles are scattered?”

**scene / learner action:** [countEveryObjectOnce Lab](./scenes/countEveryObjectOnceLab.scene-spec.md), placement 2. Rearrange seven pebbles, then count by choosing a new unmarked pebble in any order. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** Any order counts the same seven distinct objects. Example: Seven pebbles stay seven when scattered.

**Formative feedback:** For a guess of eight, contrast the eight words with only seven unique pebbles. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 3 — Find the missing stone

**text / learner invitation:** “A friend said five but one stone is still unmarked. Is the count finished?”

**scene / learner action:** [countEveryObjectOnce Lab](./scenes/countEveryObjectOnceLab.scene-spec.md), placement 3. Show six stones with only five counted; let learner identify the missed item and complete a new count. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** One unmarked stone means the count is incomplete; the final total is six. Example: Five marked plus one unmarked = six stones.

**Formative feedback:** A five-answer highlights the uncounted stone and models all six steps. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 4 — Path of nine stones

**text / learner invitation:** “How many stones lead across this little path?”

**scene / learner action:** [countEveryObjectOnce Lab](./scenes/countEveryObjectOnceLab.scene-spec.md), placement 4. Independently count nine stones in a new path layout; allow ordered list navigation without tapping stones. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** Nine different marks correspond to nine count words, without repetition. Example: There are nine stones; each received one word.

**Formative feedback:** Replay the exact item-to-word ledger for any incomplete count. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Independent transfer: explain the total or symbol in this unfamiliar context.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

## Custom Scene specification

- [countEveryObjectOnce Lab](./scenes/countEveryObjectOnceLab.scene-spec.md) — four independently instantiated prop-free Scenes, proposed only.

## Lesson Notes — proposed

Potential concise later recall cue: “Six buttons, six distinct count words.” Notes, unlocking, persistence and review scheduling are **not** claimed implemented.

## Practice, retrieval, transfer and assessment boundaries

Section 4 provides independent application in a changed context. Revisit countable evidence if answers differ. No Question, Quiz, scoring, mastery or persistence is designed here.

## Localization, accessibility and offline

Provide complete genuine translation of every caption, feedback, numeral word and accessible label to all supported locales (no English fallback). RTL mirrors semantic layout without reversing mathematical sequence. Provide WCAG 2.2 AA alternatives, reduced motion, screen-reader count ledger, small-screen support and fully selected-locale offline behavior as planned requirements, not implemented claims.

## Editorial dependencies

Provisional only: explicit Methodologist approval, Screenwriter review, Scene implementation, localization, and independent Scene tests remain necessary. Shared Skill index and generated taxonomy are coordinator-owned.
