# Beyond Ten: Count and Read to Twenty — Lesson Content

Status: **Provisional Draft — pending Methodologist approval**
Source: [Methodologist Brief](./methodologist-brief.md) (Draft)
Program dependence: None
Code: Not implemented

## Instructional concept

Count forward from a chosen start within 20, including ten transitions, and read/write numerals connected to quantities 0–20. Every Section invites prediction or observation, meaningful learner control, explanatory feedback, and a chance to apply the reasoning to a changed representation, not an extended lecture followed by a token quiz.

## Learner journey / ordered Section plan

Each Section is a proposed `LessonSection_Config` with vertically ordered existing Resource types: `text` → proposed new `scene` → `markdown`. The generic scene resource type exists; the custom Scene specified here is **not implemented**. Independent prop-free placements have their own starting states and no external mode prop.

### Section 1 — After nine

**text / learner invitation:** “Nine buttons are on the frame. What if we add one more?”

**scene / learner action:** [numbersFromTenToTwenty Lab](./scenes/numbersFromTenToTwentyLab.scene-spec.md), placement 1. Fill tenth cell of a ten-frame and reveal the numeral 10. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** Nine then one more makes ten, written 10. Example: 9, 10.

**Formative feedback:** If nine is chosen, show the tenth button; 1 denotes one, not ten. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 2 — Ten and some more

**text / learner invitation:** “Ten beads and three extra beads make how many?”

**scene / learner action:** [numbersFromTenToTwenty Lab](./scenes/numbersFromTenToTwentyLab.scene-spec.md), placement 2. Explore a full ten-frame plus 3, 7 or zero loose beads; select numeral and count aloud or via ordered ledger. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** 10+3 = 13; 10+7 = 17; 10+0 = 10. Example: Ten and three → 13.

**Formative feedback:** For 103, show that thirteen is the single numeral 13, not the concatenation of spoken parts. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 3 — Beyond nineteen

**text / learner invitation:** “Start at seventeen. What comes after nineteen?”

**scene / learner action:** [numbersFromTenToTwenty Lab](./scenes/numbersFromTenToTwentyLab.scene-spec.md), placement 3. Continue 17,18,19,20 on a 0–20 number strip, one step per activation. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** Each forward count adds one; 19 is followed by 20. Example: 17, 18, 19, 20.

**Formative feedback:** For 110, show two full sets of ten rather than a hundred and ten. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Predict what changes in the next representation while retaining the mathematical principle.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

### Section 4 — Crayon label

**text / learner invitation:** “A box contains fourteen crayons. Which label belongs on it?”

**scene / learner action:** [numbersFromTenToTwenty Lab](./scenes/numbersFromTenToTwentyLab.scene-spec.md), placement 4. Match an unfamiliar full-ten-plus-four crayon set to 14, contrasting 12 and 21. Child may predict, inspect, revise or reveal a full worked model.

**markdown / explanation:** 14 labels fourteen crayons; 10+4 is fourteen. Example: Ten plus four → 14.

**Formative feedback:** For 12 point to the extra two crayons; 21 is not fourteen. Allow retry, Reset and fully explained Reveal. No scored results or forced success.

**Transition:** Independent transfer: explain the total or symbol in this unfamiliar context.

**Accessibility:** Ordered object list with clearly announced count/status changes and keyboard/touch controls gives identical mathematical information.

## Custom Scene specification

- [numbersFromTenToTwenty Lab](./scenes/numbersFromTenToTwentyLab.scene-spec.md) — four independently instantiated prop-free Scenes, proposed only.

## Lesson Notes — proposed

Potential concise later recall cue: “9, 10.” Notes, unlocking, persistence and review scheduling are **not** claimed implemented.

## Practice, retrieval, transfer and assessment boundaries

Section 4 provides independent application in a changed context. Revisit countable evidence if answers differ. No Question, Quiz, scoring, mastery or persistence is designed here.

## Localization, accessibility and offline

Provide complete genuine translation of every caption, feedback, numeral word and accessible label to all supported locales (no English fallback). RTL mirrors semantic layout without reversing mathematical sequence. Provide WCAG 2.2 AA alternatives, reduced motion, screen-reader count ledger, small-screen support and fully selected-locale offline behavior as planned requirements, not implemented claims.

## Editorial dependencies

Provisional only: explicit Methodologist approval, Screenwriter review, Scene implementation, localization, and independent Scene tests remain necessary. Shared Skill index and generated taxonomy are coordinator-owned.
