# Appearance Versus Amount — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [Which Collection Has More? Content](../content.md), Section 3
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

Discover why size and spread can deceive, then choose a justified comparison in a novel context. Make judgments of more, fewer and equally many from set cardinality rather than object appearance. Matching two sets one-to-one supplies concrete evidence; counted totals offer an independent cross-check.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For finite collections A and B, pairing each item of A with one distinct item of B establishes cardinality comparison. If A has unmatched items after B is fully paired, A has more and B fewer; if neither has unmatched items, their numbers are equal. Physical area, item size, color, orientation and spacing do not change cardinality. Counts 5 and 3 imply five has two more than three, but the 'difference' is only a concrete count of leftovers here, not formal subtraction or a numerical sign. Comparing an empty set is possible; not essential to this learning unit.

**Model state at entry:** Three large books in one row and five tiny counters in another; secondary scenario 8 pencil icons close together and 6 widely spaced eraser icons.

**Instructional boundary:** Sets of 0–12 discrete objects, visually and textually identifiable; no formal `<`, `>` or `=` symbol teaching (reserved `comparisonSymbols` Skill), no subtraction algorithm and no scored mastery. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: There are three BIG books and five tiny counters. Which group has more objects?

- **Exact learner-facing invitation:** “There are three BIG books and five tiny counters. Which group has more objects?”
- **Action / teacher model:** Learner first predicts based on scene, then chooses count each or build pairings. Counts update without altering size.
- **Expected state change / observation:** Books = 3, counters = 5; counters have more objects despite smaller visible size.
- **Correct explanation / verification:** 5 counters are more numerous than 3 books.
- **Feedback when incomplete or incorrect:** If 'books have more', say 'The books look larger, but there are only three of them. Count five separate counters.'
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: Eight pencils are bunched together; six erasers are spread out. Which group has more?

- **Exact learner-facing invitation:** “Eight pencils are bunched together; six erasers are spread out. Which group has more?”
- **Action / teacher model:** Independent transfer: change object identity and spacing; learner counts or pairs and explains the observed relation, with optional explanation reveal.
- **Expected state change / observation:** 8 pencils vs 6 erasers, two pencils unpaired when six pairs formed.
- **Correct explanation / verification:** 8 pencils exceed 6 erasers by two objects, regardless of row length.
- **Feedback when incomplete or incorrect:** If erasers chosen because their row is longer, show 6 matched pairs plus 2 unmatched pencils.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Predict group, Count each, Match objects sequentially, Explain/reveal, Reset. No automatic correctness lock.

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- 3 large versus 5 small returns the five-item group as more. 8 tight versus 6 spread yields two unmatched pencils. All pairing methods distinguish quantity from icon scale; semantic RTL preserves group A/B roles.

**Controls and agency:** Predict group, Count each, Match objects sequentially, Explain/reveal, Reset. No automatic correctness lock. Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Nonvisual version lists objects and sizes explicitly but does not reveal counts until the learner requests a count; count and pairing ledger then exposes all evidence.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. 3 large versus 5 small returns the five-item group as more.
2. 8 tight versus 6 spread yields two unmatched pencils.
3. All pairing methods distinguish quantity from icon scale; semantic RTL preserves group A/B roles.
4. For beat 1, expected: 5 counters are more numerous than 3 books. Wrong/partial branch: If 'books have more', say 'The books look larger, but there are only three of them. Count five separate counters.'
5. For beat 2, expected: 8 pencils exceed 6 erasers by two objects, regardless of row length. Wrong/partial branch: If erasers chosen because their row is longer, show 6 matched pairs plus 2 unmatched pencils.
6. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Appearance Versus Amount does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
