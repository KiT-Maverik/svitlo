# Two-Digit Number Builder — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [One Ten, Many Ones: Building Two-Digit Numbers Content](../content.md), Section 3
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

Learner constructs numerals from groups and detects digit reversal as a real magnitude change. Understand ten ones as one ten and use equal-value exchanges to build and interpret two-digit numbers by their tens and remaining ones. The same quantity can be shown with objects, bundles, and a numeral.

## ACCURATE CONTENT AND MODEL LIMITATIONS

In decimal notation a ten is equivalent to exactly ten ones. For a two-digit number n=10t+u with t from 1 to 9 and remaining ones u from 0 to 9, `t` is the tens count and `u` the ones count in its usual representation. Ten ones may be bundled into one ten, or one ten unbundled into ten ones, preserving total. 2 tens + 6 ones = 26, while 3 tens + 2 ones = 32. 27 can be modeled as 2 tens and 7 ones, or temporarily as 1 ten and 17 loose ones; the latter is a nonstandard unpacked representation rather than the ordinary two-digit tens/ones form. This lesson begins with totals 10–20 and extends via bundles to 21–49 with all intermediate language scaffolded. No multi-digit carrying algorithm or full hundreds system is assumed.

**Model state at entry:** Empty two-column place-value workspace with explicit Tens and Ones headers, bundled objects inventory and independent preset challenges [26,23/32,27,34,43]. Columns are semantic regardless of RTL.

**Instructional boundary:** Build and read 10–49 with bundling visuals, optional extension to 99 only after editor approval. Zero loose units may occur (20), but treatment of zero as a general positional placeholder is reserved for `zeroPlaceholder`. No written regrouping algorithm or calculation fluency, no `readWrite100` mastery assumed. No scoring. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: Build the number 26 using bundles and loose sticks.

- **Exact learner-facing invitation:** “Build the number 26 using bundles and loose sticks.”
- **Action / teacher model:** Place two ten-bundles and six loose units in labelled Tens/Ones containers, then select numeral 26; read as twenty-six with a language-specific voice/text alternative.
- **Expected state change / observation:** 2 tens and 6 ones -> 26; 20+6=26 used only as a supported explanation, not as an unscored addition drill.
- **Correct explanation / verification:** Two tens plus six ones equals 26.
- **Feedback when incomplete or incorrect:** For 62, show that 6 is loose ones while 2 is ten-bundles; swapping them changes the total from 26 to 62.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: A model has two tens and three ones. Another has three tens and two ones. Are the amounts equal?

- **Exact learner-facing invitation:** “A model has two tens and three ones. Another has three tens and two ones. Are the amounts equal?”
- **Action / teacher model:** Side-by-side inside this single Scene compare 23 and 32 with complete item/group ledger; change bundle counts rather than merely rearrange digit glyphs.
- **Expected state change / observation:** 23 = 2 tens + 3 ones; 32 = 3 tens + 2 ones; difference is nine items.
- **Correct explanation / verification:** 23 and 32 are different quantities; 32 has more.
- **Feedback when incomplete or incorrect:** If equal, expand bundles and demonstrate 23 is not the same quantity as 32. Do not require a subtraction computation.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 3: You have one ten and seventeen loose sticks. Can you repack to show 27 normally?

- **Exact learner-facing invitation:** “You have one ten and seventeen loose sticks. Can you repack to show 27 normally?”
- **Action / teacher model:** Select ten of seventeen loose sticks, bundle them, observe two ten-bundles and seven loose units.
- **Expected state change / observation:** 1 ten +17 loose ones = 2 tens +7 ones =27; preserve 27 original object identities.
- **Correct explanation / verification:** 27 is 2 tens and 7 ones in canonical tens/ones form.
- **Feedback when incomplete or incorrect:** If 117 is proposed as numeral, explain 'one ten and seventeen loose ones' is an unpacked model and counting all objects gives 27; standard placement shows two tens and seven ones.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 4: Without a worked example beside it, model forty-three.

- **Exact learner-facing invitation:** “Without a worked example beside it, model forty-three.”
- **Action / teacher model:** Independent transfer: build four bundles and three loose units, identify 43, then explain why 34 is not equivalent.
- **Expected state change / observation:** 4 tens +3 ones =43, distinct from 3 tens+4 ones =34.
- **Correct explanation / verification:** Four tens and three ones is 43.
- **Feedback when incomplete or incorrect:** If 34 selected, compare the tens column: it has three bundles, but the model shows four.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Add/remove a ten-bundle, add/remove a loose one, Trade bundle for ten ones, Bundle ten loose units, Read numeral, Reveal explanation, Reset; constraints stay within 10–49 in main pathway.

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- 2 tens+6 ones ->26; reversed two-digit string is not accepted as equal. 23 versus 32 are correctly modelled as different quantities. 1 ten+17 ones repacks to 2 tens+7 ones preserving 27 items. 4 tens+3 ones ->43 and can be distinguished from 34. All placement operations deterministic, reversible, keyboard-operable and independent of visual color.

**Controls and agency:** Add/remove a ten-bundle, add/remove a loose one, Trade bundle for ten ones, Bundle ten loose units, Read numeral, Reveal explanation, Reset; constraints stay within 10–49 in main pathway. Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Explicit role labels 'Tens' and 'Ones', numeric counts and text ledger; semantic CSS layout for RTL with digit sequence and value retained. Accessible button alternatives rather than drag-only placement.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. 2 tens+6 ones ->26; reversed two-digit string is not accepted as equal.
2. 23 versus 32 are correctly modelled as different quantities.
3. 1 ten+17 ones repacks to 2 tens+7 ones preserving 27 items.
4. 4 tens+3 ones ->43 and can be distinguished from 34.
5. All placement operations deterministic, reversible, keyboard-operable and independent of visual color.
6. For beat 1, expected: Two tens plus six ones equals 26. Wrong/partial branch: For 62, show that 6 is loose ones while 2 is ten-bundles; swapping them changes the total from 26 to 62.
7. For beat 2, expected: 23 and 32 are different quantities; 32 has more. Wrong/partial branch: If equal, expand bundles and demonstrate 23 is not the same quantity as 32. Do not require a subtraction computation.
8. For beat 3, expected: 27 is 2 tens and 7 ones in canonical tens/ones form. Wrong/partial branch: If 117 is proposed as numeral, explain 'one ten and seventeen loose ones' is an unpacked model and counting all objects gives 27; standard placement shows two tens and seven ones.
9. For beat 4, expected: Four tens and three ones is 43. Wrong/partial branch: If 34 selected, compare the tens column: it has three bundles, but the model shows four.
10. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Two-Digit Number Builder does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
