# Beyond Ten: Count and Read to Twenty Lab — Scene Specification

Status: **Provisional Draft — awaiting Methodologist approval**
Owner: Educational Screenwriter
Sources: [Content](../content.md); [Brief](../methodologist-brief.md) (Draft)

## Purpose and accurate model

Count forward from a chosen start within 20, including ten transitions, and read/write numerals connected to quantities 0–20. Concrete full ten-frame and extra units; no generalized place-value algorithms or carrying. Every rendered count, accessible ledger and explanation must match the actual collection. No hidden additions, skipped count words, or inconsistent symbols.

## Experience beats and acceptance

### Placement 1: After nine

- Prompt: “Nine buttons are on the frame. What if we add one more?”
- Independent initial state and interaction: Fill tenth cell of a ten-frame and reveal the numeral 10.
- Correct mathematical rule: Nine then one more makes ten, written 10.
- Expected example: 9, 10.
- Error feedback: If nine is chosen, show the tenth button; 1 denotes one, not ten.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 2: Ten and some more

- Prompt: “Ten beads and three extra beads make how many?”
- Independent initial state and interaction: Explore a full ten-frame plus 3, 7 or zero loose beads; select numeral and count aloud or via ordered ledger.
- Correct mathematical rule: 10+3 = 13; 10+7 = 17; 10+0 = 10.
- Expected example: Ten and three → 13.
- Error feedback: For 103, show that thirteen is the single numeral 13, not the concatenation of spoken parts.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 3: Beyond nineteen

- Prompt: “Start at seventeen. What comes after nineteen?”
- Independent initial state and interaction: Continue 17,18,19,20 on a 0–20 number strip, one step per activation.
- Correct mathematical rule: Each forward count adds one; 19 is followed by 20.
- Expected example: 17, 18, 19, 20.
- Error feedback: For 110, show two full sets of ten rather than a hundred and ten.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 4: Crayon label

- Prompt: “A box contains fourteen crayons. Which label belongs on it?”
- Independent initial state and interaction: Match an unfamiliar full-ten-plus-four crayon set to 14, contrasting 12 and 21.
- Correct mathematical rule: 14 labels fourteen crayons; 10+4 is fourteen.
- Expected example: Ten plus four → 14.
- Error feedback: For 12 point to the extra two crayons; 21 is not fourteen.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

## Self-contained interactive state and constraints

Each new Scene is **prop-free** and self-contained; scenario constants belong inside its module. Use ordered focusable items, counted flags, prediction state, reveal state and Reset. Prevent recounting one item as two; when arrangement changes, preserve item identity and quantity unless an explicit add/remove is shown. No external events, invented APIs, score, Note persistence or cross-Section state.

## Visual, audio and media direction

Lightweight semantic HTML/SVG objects, distinct countable positions, legible numerals and optional locally available narration. No forced animation, sound, precision drag or reliance on colors. Reduced motion shows the same values immediately.

## Localization, RTL, WCAG and offline

Complete real translations for every supported locale; logical count direction and object order remain intact under RTL. Keyboard, switch, screen-reader ledger, focus, zoom, touch and reduced motion provide equivalent interaction. Deterministic count model, content and selected-language explanations must be downloadable offline. Offline/PWA behavior is not asserted implemented.

## Cross-placement acceptance criteria

- Each of four initial states is reproducible and mathematically accurate.
- Every error path offers specific reasoning and a recoverable action.
- Repeated selection cannot increase counted quantity twice; no phantom objects appear.
- Reset in one placement never changes another.
- Nonvisual, RTL, reduced-motion, mobile and offline test paths yield identical counts and conclusions.
- Custom Scene is proposed; generic `scene` blockType alone is not its implementation.

## Review and dependencies

Editor must approve Methodologist Brief first; then Content and Scene review, localization, accessibility implementation and Scene tests. No scored Question, Quiz or runtime Lesson code is authorized.
