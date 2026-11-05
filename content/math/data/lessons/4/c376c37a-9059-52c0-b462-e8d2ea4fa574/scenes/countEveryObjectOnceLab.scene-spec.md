# One Object, One Count Lab — Scene Specification

Status: **Provisional Draft — awaiting Methodologist approval**
Owner: Educational Screenwriter
Sources: [Content](../content.md); [Brief](../methodologist-brief.md) (Draft)

## Purpose and accurate model

Match exactly one spoken count word to each new object, without skipping or recounting. 1–10 concrete objects; no digit-writing, time pressure or formal arithmetic. Every rendered count, accessible ledger and explanation must match the actual collection. No hidden additions, skipped count words, or inconsistent symbols.

## Experience beats and acceptance

### Placement 1: Six buttons in a tray

- Prompt: “There are six buttons. Can we count each exactly once?”
- Independent initial state and interaction: Mark each of six separated buttons; each advances a count-word ledger once.
- Correct mathematical rule: The sixth different button corresponds to the word six.
- Expected example: Six buttons, six distinct count words.
- Error feedback: If a button is counted twice, explain it has already received a number; show the unmarked items.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 2: Scattered pebbles

- Prompt: “Will the total change when the pebbles are scattered?”
- Independent initial state and interaction: Rearrange seven pebbles, then count by choosing a new unmarked pebble in any order.
- Correct mathematical rule: Any order counts the same seven distinct objects.
- Expected example: Seven pebbles stay seven when scattered.
- Error feedback: For a guess of eight, contrast the eight words with only seven unique pebbles.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 3: Find the missing stone

- Prompt: “A friend said five but one stone is still unmarked. Is the count finished?”
- Independent initial state and interaction: Show six stones with only five counted; let learner identify the missed item and complete a new count.
- Correct mathematical rule: One unmarked stone means the count is incomplete; the final total is six.
- Expected example: Five marked plus one unmarked = six stones.
- Error feedback: A five-answer highlights the uncounted stone and models all six steps.
- Reset clears the local placement only; Reveal displays the item-to-number reasoning, not merely correctness.

### Placement 4: Path of nine stones

- Prompt: “How many stones lead across this little path?”
- Independent initial state and interaction: Independently count nine stones in a new path layout; allow ordered list navigation without tapping stones.
- Correct mathematical rule: Nine different marks correspond to nine count words, without repetition.
- Expected example: There are nine stones; each received one word.
- Error feedback: Replay the exact item-to-word ledger for any incomplete count.
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
