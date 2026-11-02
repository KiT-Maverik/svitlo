# Digits Are Number Symbols — Lesson Content

Status: **Provisional Draft — pending Methodologist approval**
Source: [Methodologist Brief](./methodologist-brief.md) (Draft)
Program dependence: None
Code: Not implemented

## Instructional concept

Read the ten digits 0–9 as symbols that represent numbers and corresponding quantities. Every Section invites prediction or observation, meaningful learner control, explanatory feedback, and a chance to apply the reasoning to a changed representation, not an extended lecture followed by a token quiz.

## Learner journey / ordered Section plan

Each Section is a proposed `LessonSection_Config` with vertically ordered existing Resource types: `text` → proposed new `scene` → `markdown`. The generic scene resource type exists; the custom Scene specified here is **not implemented**. Independent prop-free placements have their own starting states and no external mode prop.

### Section 1 — One mark for three

**text / learner invitation:** “Three apples are here. Which one symbol can say how many?”

**scene / learner action:** [digitsTellNumbers Lab](./scenes/digitsTellNumbersLab.scene-spec.md), placement 1. Count three apples and select a digit card among 2, 3 and 5. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** The digit 3 represents three apples, though it is one written symbol. Example: Three apples → 3.

**Formative feedback:** For 2, compare two marks to the three actual apples. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 2 — The empty basket

**text / learner invitation:** “Which digit represents the empty basket's contents?”

**scene / learner action:** [digitsTellNumbers Lab](./scenes/digitsTellNumbersLab.scene-spec.md), placement 2. Switch basket contents between zero, one and six balls; choose matching digit. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** 0 means no balls; 1 one ball; 6 six balls. Example: Empty basket → 0 balls.

**Formative feedback:** A choice of 1 for the empty basket counts the basket instead of its contents. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 3 — Digit gallery

**text / learner invitation:** “Can you match each symbol to its number of dots?”

**scene / learner action:** [digitsTellNumbers Lab](./scenes/digitsTellNumbersLab.scene-spec.md), placement 3. Explore accessible cards 0–9 with spoken and printed number words, ten-frame models. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** Each digit 0–9 can label its matching set of dots. Example: 6 dots → 6; 9 dots → 9.

**Formative feedback:** For 6/9 confusion, show six and nine quantities side by side rather than rotating text. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 4 — The shelf label

**text / learner invitation:** “A shelf is labeled 7. How many blocks should you place?”

**scene / learner action:** [digitsTellNumbers Lab](./scenes/digitsTellNumbersLab.scene-spec.md), placement 4. Add or remove blocks until a new shelf contains exactly seven blocks. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** A single 7 labels a complete seven-block collection. Example: Seven blocks match digit 7.

**Formative feedback:** Eight blocks reveals one extra, and six reveals one missing. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Independent transfer: explain the total or symbol in this unfamiliar context.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

## Custom Scene specification

- [digitsTellNumbers Lab](./scenes/digitsTellNumbersLab.scene-spec.md) — four independently instantiated prop-free Scenes, proposed only.

## Lesson Notes — proposed

Potential concise later recall cue: “Three apples → 3.” Notes, unlocking, persistence and review scheduling are **not** claimed implemented.

## Practice, retrieval, transfer and assessment boundaries

Section 4 provides independent application in a changed context. Revisit countable evidence if answers differ. No Question, Quiz, scoring, mastery or persistence is designed here.

## Localization, accessibility and offline

Provide complete genuine translation of every caption, feedback, numeral word and accessible label to all supported locales (no English fallback). RTL mirrors semantic layout without reversing mathematical sequence. Provide WCAG 2.2 AA alternatives, reduced motion, screen-reader count ledger, small-screen support and fully selected-locale offline behavior as planned requirements, not implemented claims.

## Editorial dependencies

Provisional only: explicit Methodologist approval, Screenwriter review, Scene implementation, localization, and independent Scene tests remain necessary. Shared Skill index and generated taxonomy are coordinator-owned.
