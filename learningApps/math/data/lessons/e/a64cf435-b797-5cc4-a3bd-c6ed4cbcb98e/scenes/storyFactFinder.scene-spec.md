# Story Fact Finder — Scene Specification

Status: Provisional Draft — pending Methodologist approval
Owner: Educational Screenwriter
Parent: [Lesson Content](../content.md), Sections 1–3
Methodologist source: [Draft Brief](../methodologist-brief.md)

## Learner purpose and model boundary

Recognize **given numerical quantities**, **their relationship**, **the question/unknown** and **descriptive details** in a short story without computing or treating a keyword as an operation. The learner may sort cards by tap, keyboard or optional drag; it is classification as instruction, not a scored Question.

## Experience beats

1. Guided story: “Six pencils in a box. Three more put in. How many now?” Show three cards: “six originally” = known, “three arrive” = known + change relationship, “number now” = unknown. Read the full story aloud on request and show it in visible text.
2. The learner selects a card then chooses a category. Feedback for treating the question as known: “We do not know the new total yet.” For treating three as unknown: “The story already tells us three arrive.” Give the complete story context after each move.
3. Story variation: “Eight stickers. Two are given away. How many remain?” Identify known eight, known two and removal relationship, unknown remainder. If learner confuses arrival with departure: “Giving away means these two leave the collection.”
4. Detail variation: “A green basket has four pears. Two pears are added. How many now?” Cards: green basket = descriptive detail; four pears and two arriving = known quantities; new total = unknown. Feedback for green as math fact: “Green does not tell us how many pears.”
5. A “Show my reasoning” action summarizes each card with category and evidence from the story. Reset affects only current placement; independent Section entries begin fresh.

## State and logic

Fixed, locale-specific complete story text and atomic meaning cards; learner-selected card, assigned categories, explanatory feedback, reveal state. Known and unknown classifications must be tied to explicit quantity roles; do not infer answers by matching surface words like “more”. No arithmetic answer is required and no UI correctness persistence is assumed. A card can be revised without penalty.

## Visual and inclusive alternatives

Place readable story first, card list second, category destinations third in a single Scene internal layout that can reflow vertically. Every card has accessible title and described role; keyboard sequence is select card → choose category, with focus returned predictably. Optional drag has a fully equivalent tap/keyboard path. Color is supplementary to labels. In RTL preserve temporal sequence (before, change, after) rather than reversing causal order. Translate story semantics and feedback genuinely, not by keyword substitution. Include optional audio with text equivalent, reduce animation when requested, support small screens and zoom, and work fully offline.

## Acceptance scenarios

- Pencil case: six and three known; final total unknown.
- Sticker case: eight and two known; quantity left unknown; action is decrease.
- Basket case: “green” is descriptive; four/two known; total unknown.
- Wrong classification offers concrete evidence and can be revised.
- No action forces a calculation or implies a score.
- RTL, keyboard, touch, screen reader, zoom and offline reveal the same story logic.

## Dependencies

Proposed bespoke prop-free Scene with local editable categorization; no runtime component, Question object or Note event exists yet. Coding Agent must verify locale context and renderer against current code.
