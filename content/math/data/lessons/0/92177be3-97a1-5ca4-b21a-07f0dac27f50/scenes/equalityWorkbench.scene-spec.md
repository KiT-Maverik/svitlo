# Equality Workbench — Scene Specification

Status: Provisional Draft — pending Methodologist approval
Owner: Educational Screenwriter
Parent: [Lesson Content](../content.md), Sections 1–3
Methodologist source: [Draft Brief](../methodologist-brief.md)

## Learner purpose and mathematical invariant

Experience the equals sign as a comparison of two numeric values, independent of the location of an “answer”. The Scene models discrete counted objects. A true equality requires total(left) = total(right), regardless of color, arrangement or relative position. Never identify equality using pixel height or a decorative balance alone.

## Guided experience and learner actions

1. Opening: tray A contains 3 red + 2 blue tokens; tray B has 5 neutral tokens. Labels explicitly say “first side” and “second side” and totals initially hidden. Ask “Same amount?” with accessible yes/no choices.
2. A “Count first side” control reveals the individual counts and total 5; “Count second side” reveals 5. Before both are counted, a premature guess receives “Check both amounts.” After reveal, choosing “same” gets “Five equals five”; “different” gets “Both trays have five, even though their colors differ.”
3. Second placement starts independently with 3 + 2 and 4 + 1. Expose one side at a time, then show 3 + 2 = 4 + 1. A reversed example 5 = 2 + 3 must be allowed as equally valid.
4. Third placement starts with 4 + 2 = 4 + 3. Let learner add one token on the first side or remove one token on the second; both yield true but differently written equalities. After any change, update visible expressions and textual totals. If still unequal: “Six and seven do not match.” Do not just alter a visual balance without updating arithmetic.
5. Reset restores the specific placement only. Reveal explanation and skip-ahead remain available without guessing.

## Objects, state and rules

Two independently labeled token collections; grouped subcollections for expressions; optional symbolic equality; action choices; count and explanation buttons; current counts; booleans for revealed totals; selected equality judgment. All arithmetic is derived from displayed counts, not a stored correctness flag. Moving a token changes exactly one count. Each placement has independent initial state; no hidden props, persistence or cross-Section state.

## Visual, audio and localization

Use restrained motion if enabled, never to communicate truth by itself. Every group has numerals and text count. RTL preserves expression order and relationships, with explicit side labels and logical focus order; the = glyph remains semantically stable. All interaction copy and feedback requires genuine translations for every supported locale. A keyboard/switch user changes counters through add/remove buttons; no mandatory drag. Screen reader announces both groups and totals, plus equality conclusion. High contrast and reduced motion, 200% zoom and small screens preserve information. Full content works offline with no external requests.

## Acceptance scenarios

- 3+2 versus 5: both totals five and equality true.
- 3+2 versus 4+1: five/five and equality true.
- 5 = 2+3: true despite reversed orientation.
- 4+2 versus 4+3: six/seven and false; adding one first-side token yields seven/seven.
- Optional removal from second side yields six/six; symbolic expression changes accordingly.
- Correct and mistaken judgments get explanatory feedback, not a score.
- Keyboard-only, nonvisual, RTL, zoom, reduced motion and offline paths expose the same computations.

## Implementation dependencies

Proposed new prop-free Scene entry, localized strings and accessible controls. No existing Scene implementation, assessment integration, persistence or Note API is asserted. Coding Agent must verify current renderer/context and test every case after approval.
