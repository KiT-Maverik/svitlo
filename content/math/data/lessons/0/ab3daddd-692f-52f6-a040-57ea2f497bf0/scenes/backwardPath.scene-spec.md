# Backward Path — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [A Step Back: Counting Backward to Twenty Content](../content.md), Section 3
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

Transfer the one-less rule to an ordered path, not another object-removal tray. Learn that each step backward reaches the immediately preceding number, one less, from any starting value within 0–20. Seeing the actual removal or movement connects the sequence to change rather than a recited rhyme.

## ACCURATE CONTENT AND MODEL LIMITATIONS

A predecessor immediately before an integer n differs by one. For positive values n in the chosen range, removing one object from n countable objects leaves the quantity immediately preceding n. A counting sequence has no skipped step: 12, 11, 10, 9 and 3, 2, 1, 0. Only the represented range 0–20 is in scope; zero ends the displayed countdown, not necessarily all mathematics. Movement on a number strip and removal from a collection are two models of the same decrement, but an ordinal position alone is not a count of removed objects.

**Model state at entry:** A path with numbered positions 0–20 and a marker initially at 8, with a deterministic second challenge starting at 17. This is a conceptual discrete number path, not a claim about a measured number-line scale.

**Instructional boundary:** Numbers 0–20 inclusive; no negative values or formal subtraction algorithm, no timed recital, no scoring. A descending number strip can support speech but must not turn into a mere memorize-and-tap exercise. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: You stand at step 8. Move back four steps. Where will you be?

- **Exact learner-facing invitation:** “You stand at step 8. Move back four steps. Where will you be?”
- **Action / teacher model:** Choose 'one step back' four times, with a prediction of the destination available before moving; marker follows positions 8,7,6,5,4.
- **Expected state change / observation:** Marker ends at step 4; each step exactly one earlier ordinal number.
- **Correct explanation / verification:** Four backward moves from 8 end at 4.
- **Feedback when incomplete or incorrect:** For a predicted 5, display the ledger '8 → 7 (1), → 6 (2), → 5 (3), → 4 (4)'; count moves, not only the visited numbers.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: Start at 17. Find the number immediately before it. Then before 11.

- **Exact learner-facing invitation:** “Start at 17. Find the number immediately before it. Then before 11.”
- **Action / teacher model:** Learner selects the preceding label 16 for 17, then 10 for 11; provide a one-move marker explanation and optional full reveal.
- **Expected state change / observation:** Pred(17)=16 and Pred(11)=10, chosen independently with no restart at twenty.
- **Correct explanation / verification:** Immediately before 17 is 16; immediately before 11 is 10.
- **Feedback when incomplete or incorrect:** If 18 is chosen, distinguish a forward step from a backward step; if 9 is chosen after 11, show the intervening 10.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Select challenge, Predict destination, Move back, Reset, Show path ledger; never automatic movement.

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- Start 8, four backward moves yields 4, not 5. The independent predecessor prompts yield 16 and 10. Keyboard/RTL/reduced motion preserve mathematical order and identical results.

**Controls and agency:** Select challenge, Predict destination, Move back, Reset, Show path ledger; never automatic movement. Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Logical 0–20 position labels and step ledger read in numerical order independent of RTL visual placement. Marker position and step count always announced and visible.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. Start 8, four backward moves yields 4, not 5.
2. The independent predecessor prompts yield 16 and 10.
3. Keyboard/RTL/reduced motion preserve mathematical order and identical results.
4. For beat 1, expected: Four backward moves from 8 end at 4. Wrong/partial branch: For a predicted 5, display the ledger '8 → 7 (1), → 6 (2), → 5 (3), → 4 (4)'; count moves, not only the visited numbers.
5. For beat 2, expected: Immediately before 17 is 16; immediately before 11 is 10. Wrong/partial branch: If 18 is chosen, distinguish a forward step from a backward step; if 9 is chosen after 11, show the intervening 10.
6. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Backward Path does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
