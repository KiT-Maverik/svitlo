# Five-Pack Transfer — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Five in Every Pack: Count by Fives Content](../content.md), Section 3
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Apply equal-five grouping in a new crayon-box setting, then identify the false shortcut when a group has four instead of five.

**Underlying number relationship:** Each completed pack contains five **distinct** objects. After k complete packs the number of items is 5k, while there are only k packs. Starting from zero, successive completed packs yield 5,10,15,20,25,30 for one through six packs. Three packs have fifteen items; four packs twenty; six packs thirty. A pack of four is not a complete five-item pack: two complete packs plus one four-item group total 5+5+4=14, not 15, and cannot be called three full packs of five. Numerical increments of five correspond to adding a **whole** five-item group each time. This is a specific counting strategy, not an inference task about an arbitrary number pattern.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** Five sealed crayon boxes with a visible label '5 crayons in each', and a sixth box that can be added. Separate preset has two complete groups of 5 stickers and one intentionally incomplete group of four stickers, all labels and identities visible.

**Model and invariant:** Independent preset (six-pack crayon counting or partial-pack contrast); each box has immutable actual member count (5 or 4). Total derived from all individual values; number of complete five packs reported separately from overall groups.

**Numerical and pedagogical limits:** Grade 2: one through six complete groups of five (up to 30 items), and one explicitly incomplete group of four to expose the invariant. No multiplication-table drills, fractional groups, large multi-digit jumps or price calculations. We name groups and members separately, and if learner can't read 25/30 yet show tens-and-ones models rather than assuming competence.

**Boundary case / nuance:** Empty display slots are not objects. A drawn pack label is never an authority to count five when the actual group has only four. Do not invent virtual/fractional member to complete a short group.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Five boxes have five crayons each. How many crayons? What if a sixth box arrives?

1. **Invitation:** “Five boxes have five crayons each. How many crayons? What if a sixth box arrives?”
2. **Controllable investigation:** Inspect five complete packs and read 5,10,15,20,25; add the sixth complete five-crayon pack to see 30.
3. **Correct visible consequence:** Five boxes contain twenty-five crayons; six boxes contain thirty.
4. **Worked number evidence:** 5 groups of 5=25; 6 groups of 5=30.
5. **Mistaken or incomplete route:** If five or six chosen as the total, distinguish box count from crayon count. For 26 after new pack, show the five additional crayons: 25+5=30.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — Two boxes have five stickers each, but the third has only four. Is that 15 stickers?

1. **Invitation:** “Two boxes have five stickers each, but the third has only four. Is that 15 stickers?”
2. **Controllable investigation:** Count complete first and second groups as 5+5=10 and inspect the third group's four members; total 14, not 15.
3. **Correct visible consequence:** Ten plus four equals fourteen. The short group cannot advance a full +5 step.
4. **Worked number evidence:** 5+5+4=14, whereas 5+5+5=15.
5. **Mistaken or incomplete route:** If 15 selected, display the third group's missing fifth place, but do not count an empty place as a sticker. Explain the incomplete group's actual four items.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Add sixth full box; Show box contents; Predict item total; Switch to incomplete-pack preset; Reveal summed item ledger; Reset.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** Empty display slots are not objects. A drawn pack label is never an authority to count five when the actual group has only four. Do not invent virtual/fractional member to complete a short group.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

A fully accessible box contents list gives exact item identities; the learner can compare 5 and 4 counts without seeing graphics. Independent controls per preset; RTL does not change numeric sums.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. Five crayon boxes total 25; after sixth, 30.
2. Two five-sticker groups plus one four-sticker group total 14.
3. A missing fifth place is not counted as an object.
4. Reset and switch preserve separate component state and identical nonvisual sums.
5. For Beat 1, verify exact expected result: 5 groups of 5=25; 6 groups of 5=30. Test plausible wrong response: If five or six chosen as the total, distinguish box count from crayon count. For 26 after new pack, show the five additional crayons: 25+5=30.
6. For Beat 2, verify exact expected result: 5+5+4=14, whereas 5+5+5=15. Test plausible wrong response: If 15 selected, display the third group's missing fifth place, but do not count an empty place as a sticker. Explain the incomplete group's actual four items.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
