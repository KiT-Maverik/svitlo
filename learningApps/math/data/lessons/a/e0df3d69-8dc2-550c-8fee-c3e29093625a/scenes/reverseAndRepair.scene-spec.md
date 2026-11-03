# Reverse and Repair — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [Putting Numbers in Order to Twenty Content](../content.md), Section 3
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

Change ordering direction and diagnose an error independently; this is transfer from arranging to reasoning about ordering. Use numerical magnitude to arrange numbers from 0 to 20 in increasing or decreasing order, including repeated equal values. An ordered arrangement is a relationship among numbers, not a decorative spatial pattern.

## ACCURATE CONTENT AND MODEL LIMITATIONS

For ascending (nondecreasing) order, each adjacent value must be at least the one before it; equality is permitted. For descending (nonincreasing) order, each adjacent value must be no greater than the one before it. Examples: [4,6,9] ascending; [3,8,8,10] ascending; [20,19,12,0] descending. For ordered cards [5,7,6], placing 6 before 7 corrects the ascent. Within 0–20, 0 is the least and 20 the greatest; the lesson does not teach inequalities `<`/`>` or numeric place-value algorithms.

**Model state at entry:** Descending challenge cards [12, 20, 0, 19] and a separate ascending sequence [2, 11, 5, 17] with an intentionally displaced card.

**Instructional boundary:** Whole numbers 0–20; no special `comparisonSymbols` Skill teaching, no measured number-line distances or generalized place-value rules; sorted rows are logical sequences, not physical left/right requirements in RTL. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: Arrange 12, 20, 0 and 19 from largest to smallest.

- **Exact learner-facing invitation:** “Arrange 12, 20, 0 and 19 from largest to smallest.”
- **Action / teacher model:** Learner builds a descending row via numbered slots and can reveal one adjacent comparison at a time.
- **Expected state change / observation:** Correct descending 20, 19, 12, 0.
- **Correct explanation / verification:** 20, 19, 12, 0.
- **Feedback when incomplete or incorrect:** If 0 is first, use the number-quantity model to show none is the smallest value in this set, so it belongs last in descending order.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: Is this row truly smallest-to-largest: 2, 11, 5, 17?

- **Exact learner-facing invitation:** “Is this row truly smallest-to-largest: 2, 11, 5, 17?”
- **Action / teacher model:** Learner inspects adjacent pairs and moves only the offending card(s), then explains why 5 precedes 11.
- **Expected state change / observation:** Repaired ascending sequence 2, 5, 11, 17.
- **Correct explanation / verification:** 2, 5, 11, 17; 11 then 5 is a descending step, not ascending.
- **Feedback when incomplete or incorrect:** If learner accepts original, show that 11 followed by 5 goes down, violating the requested direction; one reversal corrects the pair.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Select challenge, Move card earlier/later, Inspect neighbor, Explain/reveal, Reset; all local state.

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- Descending set produces 20,19,12,0. Erroneous 2,11,5,17 is repaired to 2,5,11,17. Check works identically with keyboard, focus control, RTL and no animation.

**Controls and agency:** Select challenge, Move card earlier/later, Inspect neighbor, Explain/reveal, Reset; all local state. Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

The order is an explicit semantic ordered list and never encoded by left-to-right layout alone. RTL can reposition the tray without changing sequence indices or numeral meaning.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. Descending set produces 20,19,12,0.
2. Erroneous 2,11,5,17 is repaired to 2,5,11,17.
3. Check works identically with keyboard, focus control, RTL and no animation.
4. For beat 1, expected: 20, 19, 12, 0. Wrong/partial branch: If 0 is first, use the number-quantity model to show none is the smallest value in this set, so it belongs last in descending order.
5. For beat 2, expected: 2, 5, 11, 17; 11 then 5 is a descending step, not ascending. Wrong/partial branch: If learner accepts original, show that 11 followed by 5 goes down, violating the requested direction; one reversal corrects the pair.
6. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Reverse and Repair does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
