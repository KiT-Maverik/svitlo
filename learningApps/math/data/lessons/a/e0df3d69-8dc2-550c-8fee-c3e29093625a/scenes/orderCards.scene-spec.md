# Number Card Organizer — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [Putting Numbers in Order to Twenty Content](../content.md), Section 1
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

Sorting demands that the learner justify the order of neighboring values, not simply match an ornamental row. Use numerical magnitude to arrange numbers from 0 to 20 in increasing or decreasing order, including repeated equal values. An ordered arrangement is a relationship among numbers, not a decorative spatial pattern.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For ascending (nondecreasing) order, each adjacent value must be at least the one before it; equality is permitted. For descending (nonincreasing) order, each adjacent value must be no greater than the one before it. Examples: [4,6,9] ascending; [3,8,8,10] ascending; [20,19,12,0] descending. For ordered cards [5,7,6], placing 6 before 7 corrects the ascent. Within 0–20, 0 is the least and 20 the greatest; the lesson does not teach inequalities `<`/`>` or numeric place-value algorithms.

**Model state at entry:** Unordered cards 9, 4, 6; unfilled three-position ordered tray marked 'smallest first'. A separate four-card challenge 8, 3, 10, 8.

**Instructional boundary:** Whole numbers 0–20; no special `comparisonSymbols` Skill teaching, no measured number-line distances or generalized place-value rules; sorted rows are logical sequences, not physical left/right requirements in RTL. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: Put 9, 4 and 6 from smallest to largest.

- **Exact learner-facing invitation:** “Put 9, 4 and 6 from smallest to largest.”
- **Action / teacher model:** Learner selects a card then an ordered slot, or uses Move earlier/later controls. After each placement, offer a visual quantity helper for the selected number.
- **Expected state change / observation:** Correct ascending arrangement 4, 6, 9.
- **Correct explanation / verification:** 4, 6, 9 in nondecreasing order.
- **Feedback when incomplete or incorrect:** If 9 is placed before 4, show that nine objects outnumber four; the smallest starts first.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: Two cards both say 8. Can the row still be sorted?

- **Exact learner-facing invitation:** “Two cards both say 8. Can the row still be sorted?”
- **Action / teacher model:** New deck 8, 3, 10, 8; learner orders all cards without discarding either 8 and sees a narrated adjacent-pair check.
- **Expected state change / observation:** Correct 3, 8, 8, 10. The equal adjacent pair is valid.
- **Correct explanation / verification:** 3, 8, 8, 10; 8 followed by 8 is acceptable.
- **Feedback when incomplete or incorrect:** If one 8 is omitted, explain each card remains present and equal numbers can stand together; a valid sort retains both.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Choose challenge, Place/move card, Check each neighbor (formative), Show worked order, Reset. All cards must remain present once placed. No opaque drag requirement.

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- 9,4,6 sorts as 4,6,9. 8,3,10,8 sorts as 3,8,8,10 without dropping duplicates. Losing a selected item or altering its value is disallowed.

**Controls and agency:** Choose challenge, Place/move card, Check each neighbor (formative), Show worked order, Reset. All cards must remain present once placed. No opaque drag requirement. Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Use native choose-card and choose-slot controls, with an ordered voice/text ledger; sorting direction is announced ('smallest first') and position names are semantic, not physical.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. 9,4,6 sorts as 4,6,9.
2. 8,3,10,8 sorts as 3,8,8,10 without dropping duplicates.
3. Losing a selected item or altering its value is disallowed.
4. For beat 1, expected: 4, 6, 9 in nondecreasing order. Wrong/partial branch: If 9 is placed before 4, show that nine objects outnumber four; the smallest starts first.
5. For beat 2, expected: 3, 8, 8, 10; 8 followed by 8 is acceptable. Wrong/partial branch: If one 8 is omitted, explain each card remains present and equal numbers can stand together; a valid sort retains both.
6. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Number Card Organizer does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
