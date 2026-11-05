# Bundle Exchange Workbench — Scene Specification

Status: **Provisional Draft — Methodologist approval pending**
Owner: Educational Screenwriter
Parent Lesson / Section: [One Ten, Many Ones: Building Two-Digit Numbers Content](../content.md), Section 1
Methodologist objectives: [Draft Brief](../methodologist-brief.md), relevant outcomes only; not approved
Scene implementation: **Proposed, not built; prop-free**

## LEARNER PURPOSE AND CONCEPT

The critical invariant is visible: ten separate sticks and one labelled bundle represent the same ten objects. Understand ten ones as one ten and use equal-value exchanges to build and interpret two-digit numbers by their tens and remaining ones. The same quantity can be shown with objects, bundles, and a numeral.

## ACCURATE CONTENT AND MODEL LIMITATIONS

In decimal notation a ten is equivalent to exactly ten ones. For a two-digit number n=10t+u with t from 1 to 9 and remaining ones u from 0 to 9, `t` is the tens count and `u` the ones count in its usual representation. Ten ones may be bundled into one ten, or one ten unbundled into ten ones, preserving total. 2 tens + 6 ones = 26, while 3 tens + 2 ones = 32. 27 can be modeled as 2 tens and 7 ones, or temporarily as 1 ten and 17 loose ones; the latter is a nonstandard unpacked representation rather than the ordinary two-digit tens/ones form. This lesson begins with totals 10–20 and extends via bundles to 21–49 with all intermediate language scaffolded. No multi-digit carrying algorithm or full hundreds system is assumed.

**Model state at entry:** Ten individual sticks in an inventory and empty bundle slot, exact count 10. Learner controls a 'bundle ten' action only when at least ten loose ones are available.

**Instructional boundary:** Build and read 10–49 with bundling visuals, optional extension to 99 only after editor approval. Zero loose units may occur (20), but treatment of zero as a general positional placeholder is reserved for `zeroPlaceholder`. No written regrouping algorithm or calculation fluency, no `readWrite100` mastery assumed. No scoring. All numeric results must derive from the displayed model and stay within that boundary.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1: There are ten loose sticks. Can you turn exactly ten into one bundle?

- **Exact learner-facing invitation:** “There are ten loose sticks. Can you turn exactly ten into one bundle?”
- **Action / teacher model:** Select all ten loose sticks (or use accessible 'Select ten' control) and activate Bundle; show a band around exactly ten, then show ten still counted inside when expanded.
- **Expected state change / observation:** 10 loose ones → 1 ten-bundle + 0 loose ones; total unchanged at 10.
- **Correct explanation / verification:** Ten objects before, ten objects after; regrouping changes organization only.
- **Feedback when incomplete or incorrect:** If the learner thinks one bundle equals one stick, open the bundle to show ten original members and reconcile the item ledger.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

### Beat 2: Here are one ten-bundle and seven loose sticks. What if you unbundle the ten?

- **Exact learner-facing invitation:** “Here are one ten-bundle and seven loose sticks. What if you unbundle the ten?”
- **Action / teacher model:** Unbundle the group of ten while leaving the seven loose ones; reveal 17 loose pieces, then bundle ten again.
- **Expected state change / observation:** 1 ten + 7 ones = 17; 0 tens + 17 loose ones = 17; return to 1 ten + 7 ones.
- **Correct explanation / verification:** Both layouts show seventeen objects; only standard packing has 1 ten and 7 remaining ones.
- **Feedback when incomplete or incorrect:** If total 7 is predicted after unbundling, count all ten released pieces plus seven others; nothing disappeared.
- **Progression:** Learner may inspect a worked reveal at any time; no irreversible grade, timeout or random success condition.

## INTERACTIVE OBJECTS, STATES AND RULES

**Objects:** Modelled quantity cards/items, their stable semantic identities, count/representation ledger, native controls and visible explanation. Select ten, Bundle, Unbundle, Show contained members, Reveal full count, Reset; no automatic timed actions.

**Local state and invariants:**

- Initial values come from deterministic constants within the standalone Scene module, **not** a Lesson prop, global store, new Resource subtype, invented platform API or fake locale prop.
- Only an explicit learner action may change represented quantity, grouping or order; all labels and accessible counts derive from the same authoritative local model.
- Do not allow an object to be consumed/paired/placed twice when that would alter the mathematics. **Reset** restores exactly this Scene's initial state, not any other Section; scenario changes cannot leak answers or counters from the previous state.
- Predictions are formative and are not persisted as assessment evidence or Skill mastery. **Reveal** gives the worked cause-and-effect account, not only 'correct'.
- Bundling exactly 10 preserves total 10. 1 ten plus 7 loose, then unbundle, produces 17 loose and unchanged total 17. Fewer than 10 loose ones disables bundling with explanation; keyboard and screen reader provide equivalent operations.

**Controls and agency:** Select ten, Bundle, Unbundle, Show contained members, Reveal full count, Reset; no automatic timed actions. Use no invisible timer, precision drag requirement or external network request.

## VISUAL / AUDIO / MEDIA DIRECTION

Use low-overhead SVG/HTML where useful, countable distinct units, stable labels, and restrained visual state changes that the child can advance at their own pace. Provide a simple text ledger and objects that remain discernible at mobile/zoom sizes. Optional spoken narration requires accurate offline locale audio plus captions/transcripts; **audio is not essential** and is not generated by this spec. Reduced motion substitutes immediate equivalent updates. Never hide an instructional item behind an illustration or depend on color/size cues alone.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Bundle is an accessible group named 'ten sticks'; when unpacked, the ledger enumerates the same ten stable items. Cannot bundle nine or fewer and cannot double-count a bundled stick.

Translate all prompts, state summaries, every number word, error explanations, aria names and Note-related cues fully in every Engine-supported locale; English here is only editorial source. RTL layouts must preserve mathematics (number order, pairing identities, ten/one roles and/or logical item indices); numeric text remains correct rather than mirrored. Every action works by keyboard, switch and touch, with visible focus and meaningful nonvisual readout; no mandatory drag or hover, no color-only distinction, readable contrast, reduced motion and 200% zoom. The same interaction and math must be available once selected-locale Lesson resources are downloaded for offline use on weak devices. This is an implementation requirement, **not** evidence that a current PWA or Scene exists.

## ACCEPTANCE SCENARIOS

1. Bundling exactly 10 preserves total 10.
2. 1 ten plus 7 loose, then unbundle, produces 17 loose and unchanged total 17.
3. Fewer than 10 loose ones disables bundling with explanation; keyboard and screen reader provide equivalent operations.
4. For beat 1, expected: Ten objects before, ten objects after; regrouping changes organization only. Wrong/partial branch: If the learner thinks one bundle equals one stick, open the bundle to show ten original members and reconcile the item ledger.
5. For beat 2, expected: Both layouts show seventeen objects; only standard packing has 1 ten and 7 remaining ones. Wrong/partial branch: If total 7 is predicted after unbundling, count all ten released pieces plus seven others; nothing disappeared.
6. Reset/restoration, no cross-Scene state, logical RTL, fully nonvisual keyboard completion, reduced-motion and offline selected-locale replay all yield mathematically identical results.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

- Explicit editorial approval of Methodologist Brief (currently **Draft**) and this Scene specification is required before a Scene Designer or Coding Agent begins implementation.
- Generic `scene` Resource currently exists; **Bundle Exchange Workbench does not**. Use prop-free components with localization from the approved app context once the concrete context contract is verified. Do not invent event names, Scene props, Note storage, Question APIs, scores, badges or mastery.
- QA must test every state/result above, locale copy, keyboard/screen-reader operation, LTR/RTL, mobile, reduced motion and genuine offline download; runtime implementation and its own tests are **not in this batch**.
