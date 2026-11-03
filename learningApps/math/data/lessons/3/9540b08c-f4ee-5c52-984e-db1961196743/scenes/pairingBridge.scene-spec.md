# Pairing Bridge — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [Which Collection Has More? Content](../content.md), Section 1
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

Link members of two finite collections one-to-one; inspect both sides and leftovers. Pairing rather than guessing is the learning action. Make judgments of more, fewer and equally many from set cardinality rather than object appearance. Matching two sets one-to-one supplies concrete evidence; counted totals offer an independent cross-check.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For finite collections A and B, pairing each item of A with one distinct item of B establishes cardinality comparison. If A has unmatched items after B is fully paired, A has more and B fewer; if neither has unmatched items, their numbers are equal. Physical area, item size, color, orientation and spacing do not change cardinality. Counts 5 and 3 imply five has two more than three, but the 'difference' is only a concrete count of leftovers here, not formal subtraction or a numerical sign. Comparing an empty set is possible; not essential to this learning unit.

**Model state at entry:** Four circles (A) and three squares (B), clearly labelled A and B; a sequential accessible pair-builder. Each object can be used in exactly one pair.

**Instructional boundary:** Sets of 0–12 discrete objects, visually and textually identifiable; no formal `<`, `>` or `=` symbol teaching (reserved `comparisonSymbols` Skill), no subtraction algorithm and no scored mastery. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: There are four circles and three squares. Can each square get its own circle?

- **Exact learner-facing invitation:** “There are four circles and three squares. Can each square get its own circle?”
- **Action / teacher model:** Learner pairs each square with a different circle, then reveals unmatched circle. Can also choose 'Pair next' for accessible sequential matching.
- **Expected state change / observation:** Three pairs formed, one unmatched circle; A has 4, B has 3.
- **Correct explanation / verification:** 4 vs 3: A has one more item, B one fewer.
- **Feedback when incomplete or incorrect:** If 'same number' selected, show 3 pairs plus 1 unpaired circle; do not rely on red/green marks.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: Now match five squares to five circles. Does one set have more?

- **Exact learner-facing invitation:** “Now match five squares to five circles. Does one set have more?”
- **Action / teacher model:** Reset to five squares and five circles, which are displayed with different spatial spread. Learner completes all five pairings.
- **Expected state change / observation:** Five pairs, zero unpaired on either side.
- **Correct explanation / verification:** 5 vs 5 are equally many even if one row is longer.
- **Feedback when incomplete or incorrect:** If a widely spread row appears 'bigger', show five paired labels on both sides and the number five for both.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Choose scenario, Pair next / select distinct item pairs, Undo pair, Reveal remaining, Reset. Pairing same object twice is disallowed with explanatory prompt.

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- 4 vs 3 forms 3 distinct pairs and 1 unmatched A item. 5 vs 5 forms 5 pairs with none left. Undo returns both paired members to available state; Reset restores exact scenario.

**Controls and agency:** Choose scenario, Pair next / select distinct item pairs, Undo pair, Reveal remaining, Reset. Pairing same object twice is disallowed with explanatory prompt. Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Pair ledger enumerates 'Pair 1 A-circle1 → B-square1'; unmatched items are listed by name, not color. Each pairing achievable with native focusable choices and a sequential option.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. 4 vs 3 forms 3 distinct pairs and 1 unmatched A item.
2. 5 vs 5 forms 5 pairs with none left.
3. Undo returns both paired members to available state; Reset restores exact scenario.
4. For beat 1, expected: 4 vs 3: A has one more item, B one fewer. Wrong/partial branch: If 'same number' selected, show 3 pairs plus 1 unpaired circle; do not rely on red/green marks.
5. For beat 2, expected: 5 vs 5 are equally many even if one row is longer. Wrong/partial branch: If a widely spread row appears 'bigger', show five paired labels on both sides and the number five for both.
6. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Pairing Bridge does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
