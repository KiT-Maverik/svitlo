# How Many Are There? — Lesson Content

Status: **Provisional Draft — pending Methodologist approval**
Source: [Methodologist Brief](./methodologist-brief.md) (Draft)
Program dependence: None
Code: Not implemented

## Instructional concept

Use the final count word to describe the total quantity of a collection, independent of arrangement. Every Section invites prediction or observation, meaningful learner control, explanatory feedback, and a chance to apply the reasoning to a changed representation, not an extended lecture followed by a token quiz.

## Learner journey / ordered Section plan

Each Section is a proposed `LessonSection_Config` with vertically ordered existing Resource types: `text` → proposed new `scene` → `markdown`. The generic scene resource type exists; the custom Scene specified here is **not implemented**. Independent prop-free placements have their own starting states and no external mode prop.

### Section 1 — Four shells

**text / learner invitation:** “Count the shells. How many shells are there in all?”

**scene / learner action:** [howManyInTheSet Lab](./scenes/howManyInTheSetLab.scene-spec.md), placement 1. Count four shells one by one, then answer without recounting. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** The last count word, four, describes all four shells. Example: One, two, three, four → four shells in all.

**Formative feedback:** If learner says one, show the one last shell next to the other three. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 2 — Spread them apart

**text / learner invitation:** “There are four shells close together. Will they become more if spaced out?”

**scene / learner action:** [howManyInTheSet Lab](./scenes/howManyInTheSetLab.scene-spec.md), placement 2. Predict, spread four shells, and optionally recount the same identified objects. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** The set remains four because no shell was added or removed. Example: Four together = four spread apart.

**Formative feedback:** For five, trace each shell before and after the move. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 3 — Empty bowl

**text / learner invitation:** “How many marbles are in an empty bowl?”

**scene / learner action:** [howManyInTheSet Lab](./scenes/howManyInTheSetLab.scene-spec.md), placement 3. Inspect an empty bowl, add a marble, then remove it. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** Zero marbles in the empty bowl, one after adding, zero after removing. Example: Zero marbles means none.

**Formative feedback:** Distinguish one bowl from zero marbles inside it. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 4 — A pencil box

**text / learner invitation:** “A friend asks how many pencils are inside. Can you tell them?”

**scene / learner action:** [howManyInTheSet Lab](./scenes/howManyInTheSetLab.scene-spec.md), placement 4. Independently count eight pencils in a different layout, give total with number or word choices. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** Eight is the quantity of the whole collection. Example: Eight pencils altogether.

**Formative feedback:** For seven, identify the eighth uncounted pencil in the count ledger. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Independent transfer: explain the total or symbol in this unfamiliar context.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

## Custom Scene specification

- [howManyInTheSet Lab](./scenes/howManyInTheSetLab.scene-spec.md) — four independently instantiated prop-free Scenes, proposed only.

## Lesson Notes — proposed

Potential concise later recall cue: “One, two, three, four → four shells in all.” Notes, unlocking, persistence and review scheduling are **not** claimed implemented.

## Practice, retrieval, transfer and assessment boundaries

Section 4 provides independent application in a changed context. Revisit countable evidence if answers differ. No Question, Quiz, scoring, mastery or persistence is designed here.

## Localization, accessibility and offline

Provide complete genuine translation of every caption, feedback, numeral word and accessible label to all supported locales (no English fallback). RTL mirrors semantic layout without reversing mathematical sequence. Provide WCAG 2.2 AA alternatives, reduced motion, screen-reader count ledger, small-screen support and fully selected-locale offline behavior as planned requirements, not implemented claims.

## Editorial dependencies

Provisional only: explicit Methodologist approval, Screenwriter review, Scene implementation, localization, and independent Scene tests remain necessary. Shared Skill index and generated taxonomy are coordinator-owned.
