# Representation Bridge — Scene Specification

**Status:** Provisional Draft pending explicit Methodologist/editor approval.
**Owner:** Educational Screenwriter.
**Parent:** [Lesson Content](../content.md), Sections 1–4; [Draft Methodologist Brief](../methodologist-brief.md).
**Availability:** A proposed Scene, not an implemented React component. All future public Scene entries are self-contained, prop-free and independently resettable.

## Concept and learning purpose

Translate among **four modes**—countable objects, a labeled quantitative diagram, verbal description, and numeric expression—without changing the meaning. Preserve the **starting amount, amount entering or leaving, unknown and eventual result**, not merely the digits in each representation. Different objects or colors may represent the same quantitative relationship; diagrams showing the same numbers but reversed actions do not. The learner must make and justify conversions in both directions.

## Educational experience: independent Scene entries

### Entry A — from objects to diagram to symbols (Section 1)

Show eight beads in a jar and a distinct incoming group of three beads. Start with a learner prediction: “Would every picture with an eight and a three tell the same story?” Offer a “Show diagram” control producing explicit **before=8, incoming=3, after=?** labels, and then “Say it in words” revealing “Eight beads, three more arrive.” Show expression **8 + 3**, with optional “Find total” revealing **11**. Any colors used are secondary to count/role labels. The invariant is _eight initial plus three incoming_, not a particular spatial layout. If the learner associates the group with removal, explain “The three enter the jar rather than leave.”

### Entry B — the same digits do not guarantee the same model (Section 2)

Show two diagrams, each featuring 8 and 3 but different action types. Diagram A labels **initial 8, add 3**, expression 8 + 3 = **11**. Diagram B labels **initial 8, remove 3**, expression 8 − 3 = **5**. Learner matches the sentence “Three more beads arrive” to A. Wrong-choice feedback: “Both use the numbers eight and three, but one joins them while the other removes them.” Ask which quantity changed and how; numeric equality alone is not enough. Make diagram B visually and textually accessible even without color or motion.

### Entry C — from a diagram back to words and symbols (Section 3)

Display a labeled diagram with a known starting group of **12** tokens, **5** marked removed, and an unknown remainder. Offer three verbal alternatives:

- “Twelve tokens; five are taken away; how many remain?” (accurate).
- “Twelve tokens; five are added; how many now?” (wrong relation).
- “Five tokens; twelve removed; how many remain?” (wrong starting amount).
  The learner chooses and can request the symbolic form **12 − 5**, with optional evaluation **7**. For the second, explain “The diagram marks five leaving.” For the third, explain “The twelve is the original whole; five is the amount removed.” A choice is formative, not scored.

### Entry D — independently construct equivalent modes (Section 4)

Narrative: “Ten shells on a table, four shells moved into a bag. How many remain on the table?” Offer a diagram editor with explicit labels and accessible select controls, plus text response choices to prevent mandatory drawing. A correct diagram labels ten initial and four removed, one sentence conveys the same action, and expression **10 − 4** gives result **6** if evaluated. If child supplies **10 + 4**, say “The shells moved away _from_ the table; nothing was added to the table.” If they set four as initial group, say “Four is the number moved, not the original amount.” If the story input is incomplete, allow “Show a complete model” without penalty.

## States, objects, invariants and reset

- Each entry has fixed localized story and immutable mathematical quantities, model view mode, current verbal/symbolic choice, explicit role labels (start, arriving/removed, unknown), optional calculation reveal, hint and feedback state.
- Diagram lengths, number of discrete counters and symbolic operands must be linked to the _same labeled quantities_. Do not use physically scaled but numerically inconsistent bars. Never infer meaning from color or picture orientation alone.
- Translation between modes is correct only if both numeric quantities and their **roles and relation** are preserved. Identical numerals with different operations are non-equivalent.
- Reset restores the single entry; there is no hidden cross-Section memory, score, Question model or Note storage.
- Each Scene entry is independently configured at design/implementation time while public React components take no props; do not invent an API or Resource-config property to vary the scenario.

## Visual and nonvisual equivalent direction

Four representations can be shown in one internally responsive Scene, but not as arbitrary multi-column sibling Section Resources. Each mode has a separate textual ledger: “Ten initially; four removed; remainder unknown,” which a screen reader can inspect before results are revealed. Keyboard, switch and touch users select roles, representation modes and feedback without drag; optional pointer interaction is never required. In RTL, preserve temporal/quantitative relationships and minus operand order rather than simply mirroring diagrams. Each count, group title, label, hint, alternative text and feedback must receive genuine translations for all supported locales. Controls use visible focus, no color-only status, sufficient target size, reduced-motion instant reveal and 200% zoom/mobile reflow. The chosen lesson should operate with all selected assets offline **after implementation and download**; current offline infrastructure is not asserted.

## Acceptance cases

1. Eight start plus three arrive translates consistently into counters, before/add/after diagram, words, 8+3 and (if evaluated) 11.
2. Same 8 and 3 with removal instead translates to 8−3=5 and is not equivalent to addition.
3. Twelve with five removed yields a valid verbal story and 12−5=7, not an addition or a reversal of initial/removed roles.
4. Ten shells with four moved away yield 10−4=6; choosing 10+4 receives action-specific feedback.
5. Different arrangements of equal-unit counters with identical role labels may still encode the same relationship.
6. Every entry resets independently and provides no-assessment, nonvisual, keyboard, RTL, zoomed, reduced-motion and offline-equivalent paths.

## Editorial and technical handoff

Only generic Scene rendering is currently known. A Coding Agent must implement prop-free entry Scenes, locale content, mathematical invariants and tests, verify accessible controls and actual download behavior, and secure required approvals. No React/runtime Lesson code, Question, Quiz, mastery, scoring or Note persistence belongs in this specification.
