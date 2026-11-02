# Countdown Objects — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [A Step Back: Counting Backward to Twenty Content](../content.md), Section 1
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

A countdown changes a real quantity one object at a time; the learner operates the transition rather than only clicking an answer. Learn that each step backward reaches the immediately preceding number, one less, from any starting value within 0–20. Seeing the actual removal or movement connects the sequence to change rather than a recited rhyme.

## ACCURATE CONTENT AND MODEL LIMITATIONS

A predecessor immediately before an integer n differs by one. For positive values n in the chosen range, removing one object from n countable objects leaves the quantity immediately preceding n. A counting sequence has no skipped step: 12, 11, 10, 9 and 3, 2, 1, 0. Only the represented range 0–20 is in scope; zero ends the displayed countdown, not necessarily all mathematics. Movement on a number strip and removal from a collection are two models of the same decrement, but an ordinal position alone is not a count of removed objects.

**Model state at entry:** Six labeled lanterns lit, count display 6, six countable lantern units; a separate optional starting-number chooser with presets 6 and 12 (both deterministic). No autonomous timer.

**Instructional boundary:** Numbers 0–20 inclusive; no negative values or formal subtraction algorithm, no timed recital, no scoring. A descending number strip can support speech but must not turn into a mere memorize-and-tap exercise. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: Six lights are on. Turn off one. How many stay on?

- **Exact learner-facing invitation:** “Six lights are on. Turn off one. How many stay on?”
- **Action / teacher model:** Activate Step back to extinguish exactly one lit lantern and update an ordered ledger of remaining lights; predict 5 before reveal.
- **Expected state change / observation:** 6 → 5, five lit and one unlit; only lit items count.
- **Correct explanation / verification:** 6 lit − 1 lit = 5 lit, with five visible remaining.
- **Feedback when incomplete or incorrect:** If six is selected, say: 'One light went off. Count only the five still shining.' If four, pair each of the five lit items with a count word.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: Start at twelve. Step back three times. Which numbers do you pass?

- **Exact learner-facing invitation:** “Start at twelve. Step back three times. Which numbers do you pass?”
- **Action / teacher model:** Display full ten-frame plus two loose objects, remove the two loose objects in two steps, then remove one object from the ten-frame; allow next, previous-step review and reset.
- **Expected state change / observation:** 12 → 11 → 10 → 9; 10-frame goes from full to nine on the third step.
- **Correct explanation / verification:** 12 objects: 10+2; after three distinct removals 9 remain.
- **Feedback when incomplete or incorrect:** For '12 → 11 → 10 → 19', point to the full ten-frame at 10 and the nine remaining slots after one removal; do not interpret a numerical string as 19.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Start preset (6/12), Predict next (optional), Step back, Show count ledger, Reset/Reveal. Each action checks currently lit objects; at zero disable further decrement or state 'We've reached zero in this lesson.'

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- A six-light initial state stepped once reports five, with five visible lit. The 12-preset takes exactly three steps to 9 and never jumps 10 → 19. Reset restores the chosen starting preset and clears all predictions.

**Controls and agency:** Start preset (6/12), Predict next (optional), Step back, Show count ledger, Reset/Reveal. Each action checks currently lit objects; at zero disable further decrement or state 'We've reached zero in this lesson.' Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Ledger lists 'Step 0: 6 lit; step 1: 5 lit' and focusable controls; light status has text 'lit/unlit', no reliance on glow/color. A nonvisual item ledger makes removed objects explicit.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. A six-light initial state stepped once reports five, with five visible lit.
2. The 12-preset takes exactly three steps to 9 and never jumps 10 → 19.
3. Reset restores the chosen starting preset and clears all predictions.
4. For beat 1, expected: 6 lit − 1 lit = 5 lit, with five visible remaining. Wrong/partial branch: If six is selected, say: 'One light went off. Count only the five still shining.' If four, pair each of the five lit items with a count word.
5. For beat 2, expected: 12 objects: 10+2; after three distinct removals 9 remain. Wrong/partial branch: For '12 → 11 → 10 → 19', point to the full ten-frame at 10 and the nine remaining slots after one removal; do not interpret a numerical string as 19.
6. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Countdown Objects does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
