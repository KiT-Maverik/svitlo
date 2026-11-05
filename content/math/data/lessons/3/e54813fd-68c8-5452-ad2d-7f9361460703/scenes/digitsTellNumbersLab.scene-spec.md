# Digits Are Number Symbols Lab — Scene Specification

Status: **Provisional Draft — awaiting Methodologist approval**
Owner: Educational Screenwriter
Sources: [Content](../content.md); [Brief](../methodologist-brief.md) (Draft)

## Purpose and accurate model

Read the ten digits 0–9 as symbols that represent numbers and corresponding quantities. Only single digits and their object models, no positional notation or multidigit arithmetic. Every rendered count, accessible ledger and explanation must match the actual collection. No hidden additions, skipped count words, or inconsistent symbols.

## Experience beats and acceptance

### Placement 1: One mark for three

- Prompt: “Three apples are here. Which one symbol can say how many?”
- Independent initial state and interaction: Count three apples and select a digit card among 2, 3 and 5.
- Correct mathematical rule: The digit 3 represents three apples, though it is one written symbol.
- Expected example: Three apples → 3.
- Error feedback: For 2, compare two marks to the three actual apples.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 2: The empty basket

- Prompt: “Which digit represents the empty basket's contents?”
- Independent initial state and interaction: Switch basket contents between zero, one and six balls; choose matching digit.
- Correct mathematical rule: 0 means no balls; 1 one ball; 6 six balls.
- Expected example: Empty basket → 0 balls.
- Error feedback: A choice of 1 for the empty basket counts the basket instead of its contents.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 3: Digit gallery

- Prompt: “Can you match each symbol to its number of dots?”
- Independent initial state and interaction: Explore accessible cards 0–9 with spoken and printed number words, ten-frame models.
- Correct mathematical rule: Each digit 0–9 can label its matching set of dots.
- Expected example: 6 dots → 6; 9 dots → 9.
- Error feedback: For 6/9 confusion, show six and nine quantities side by side rather than rotating text.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 4: The shelf label

- Prompt: “A shelf is labeled 7. How many blocks should you place?”
- Independent initial state and interaction: Add or remove blocks until a new shelf contains exactly seven blocks.
- Correct mathematical rule: A single 7 labels a complete seven-block collection.
- Expected example: Seven blocks match digit 7.
- Error feedback: Eight blocks reveals one extra, and six reveals one missing.
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
