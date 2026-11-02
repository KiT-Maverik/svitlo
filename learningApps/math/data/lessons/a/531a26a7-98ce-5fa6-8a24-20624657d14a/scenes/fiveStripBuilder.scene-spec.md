# Five-Strip Builder — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [Five in Every Pack: Count by Fives Content](../content.md), Section 1
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Make the fixed five-unit increment tangible through complete repeatable strips and two labelled totals.

**Underlying number relationship:** Each completed pack contains five **distinct** objects. After k complete packs the number of items is 5k, while there are only k packs. Starting from zero, successive completed packs yield 5,10,15,20,25,30 for one through six packs. Three packs have fifteen items; four packs twenty; six packs thirty. A pack of four is not a complete five-item pack: two complete packs plus one four-item group total 5+5+4=14, not 15, and cannot be called three full packs of five. Numerical increments of five correspond to adding a **whole** five-item group each time. This is a specific counting strategy, not an inference task about an arbitrary number pattern.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** Empty table with button Add Complete Strip. Each strip contains exactly five distinguishable dots as a bounded group. Capacity six strips but initial guided steps stop at four. Two ledgers: number of strips and total dots.

**Model and invariant:** Complete strip IDs with five uniquely identified dot IDs each, count of complete strips k, total=5×k, ledger of increments, prediction, reveal/reset. No partial strips in this first workbench.

**Numerical and pedagogical limits:** Grade 2: one through six complete groups of five (up to 30 items), and one explicitly incomplete group of four to expose the invariant. No multiplication-table drills, fractional groups, large multi-digit jumps or price calculations. We name groups and members separately, and if learner can't read 25/30 yet show tens-and-ones models rather than assuming competence.

**Boundary case / nuance:** Adding a full strip always means exactly five new member IDs. No model may create a seventh strip in the bounded activity; explain the displayed range rather than wrapping counter to zero.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Add one, two and three strips. How many dots do you have after each?

1. **Invitation:** “Add one, two and three strips. How many dots do you have after each?”
2. **Controllable investigation:** Add three complete five-dot strips and inspect the ledger 5,10,15.
3. **Correct visible consequence:** Three strips contain fifteen dots, not three dots.
4. **Worked number evidence:** 1 strip=5, 2=10, 3=15 dots.
5. **Mistaken or incomplete route:** For three, show that a strip is a group and display five separate members in each of three groups.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — Add a fourth strip. What is the new total? Can you continue to six?

1. **Invitation:** “Add a fourth strip. What is the new total? Can you continue to six?”
2. **Controllable investigation:** Add strip four to reach 20, then optionally strips five and six to reach 25 and 30, each with a full five-dot group.
3. **Correct visible consequence:** Four full strips have twenty dots, five have twenty-five and six have thirty.
4. **Worked number evidence:** 5,10,15,20,25,30: repeated +5 for complete strips.
5. **Mistaken or incomplete route:** For 21 after the fourth strip, show exactly five additional dots after the previous fifteen: 15+5=20. For 24 on strip five, show 20+5=25.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Add complete strip; Remove last strip; Inspect each strip's five items; Predict total; Reveal repeated +5 ledger; Reset.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** Adding a full strip always means exactly five new member IDs. No model may create a seventh strip in the bounded activity; explain the displayed range rather than wrapping counter to zero.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Each group is a named strip with five listed dot IDs, independent of color or pattern. Two clearly distinct readouts ('strips' and 'dots'); keyboard button adds exactly five and announces the full numeric update.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. Three complete strips total 15 members.
2. Four total 20, five 25, six 30.
3. Every completed Add Strip adds exactly five distinct dots.
4. Removing a strip removes its exact five members and decreases total by five.
5. For Beat 1, verify exact expected result: 1 strip=5, 2=10, 3=15 dots. Test plausible wrong response: For three, show that a strip is a group and display five separate members in each of three groups.
6. For Beat 2, verify exact expected result: 5,10,15,20,25,30: repeated +5 for complete strips. Test plausible wrong response: For 21 after the fourth strip, show exactly five additional dots after the previous fifteen: 15+5=20. For 24 on strip five, show 20+5=25.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
