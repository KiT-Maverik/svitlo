# How Many Are There? Lab — Scene Specification

Status: **Provisional Draft — awaiting Methodologist approval**
Owner: Educational Screenwriter
Sources: [Content](../content.md); [Brief](../methodologist-brief.md) (Draft)

## Purpose and accurate model

Use the final count word to describe the total quantity of a collection, independent of arrangement. Empty and nonempty sets 0–12, concrete models; no symbolic arithmetic drills. Every rendered count, accessible ledger and explanation must match the actual collection. No hidden additions, skipped count words, or inconsistent symbols.

## Experience beats and acceptance

### Placement 1: Four shells

- Prompt: “Count the shells. How many shells are there in all?”
- Independent initial state and interaction: Count four shells one by one, then answer without recounting.
- Correct mathematical rule: The last count word, four, describes all four shells.
- Expected example: One, two, three, four → four shells in all.
- Error feedback: If learner says one, show the one last shell next to the other three.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 2: Spread them apart

- Prompt: “There are four shells close together. Will they become more if spaced out?”
- Independent initial state and interaction: Predict, spread four shells, and optionally recount the same identified objects.
- Correct mathematical rule: The set remains four because no shell was added or removed.
- Expected example: Four together = four spread apart.
- Error feedback: For five, trace each shell before and after the move.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 3: Empty bowl

- Prompt: “How many marbles are in an empty bowl?”
- Independent initial state and interaction: Inspect an empty bowl, add a marble, then remove it.
- Correct mathematical rule: Zero marbles in the empty bowl, one after adding, zero after removing.
- Expected example: Zero marbles means none.
- Error feedback: Distinguish one bowl from zero marbles inside it.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 4: A pencil box

- Prompt: “A friend asks how many pencils are inside. Can you tell them?”
- Independent initial state and interaction: Independently count eight pencils in a different layout, give total with number or word choices.
- Correct mathematical rule: Eight is the quantity of the whole collection.
- Expected example: Eight pencils altogether.
- Error feedback: For seven, identify the eighth uncounted pencil in the count ledger.
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
