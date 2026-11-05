# Equal-Tick Trail — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [A Number's Place on the Line Content](../content.md), Section 1
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Experience numeric position and equal one-unit intervals rather than a decorative run of labels.

**Underlying number relationship:** The number line has positions 0,1,…,20 in numerical order with one **equal-length unit interval** between adjacent integers. In conventional number-line coordinates, larger values lie to the right and smaller values to the left; the arrow labelled increasing and ordered tick list always determine meaning, regardless of interface RTL direction. From tick 10, two unit moves reach 12 (via 11); from 5, three unit moves reach 8 (5→6, 6→7, 7→8). Immediately before 10 is 9, immediately after 10 is 11. Strictly between 7 and 11 lie 8,9,10 (not the endpoints). Inside the shown 0–20 segment, no predecessor of 0 and no successor of 20 are displayed; this is a display boundary, not a claim numbers do not continue.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** A mathematically fixed horizontal line with integer ticks 0–20. Consecutive tick centres have the same geometric spacing. A labelled increasing-direction arrow points toward increasing values; current marker at 10. On mobile, the visible window may scroll over this unchanged 21-tick model, with keyboard-accessible numeric list for the entire range.

**Model and invariant:** Integers 0 through 20, fixed unit spacing, current tick, target tick, step ledger, revealed interval count and explanation. Each Step +1 advances exactly one tick and one equal-length interval. Step −1 traverses one interval in the opposite direction. Window scrolling must never change the scale.

**Numerical and pedagogical limits:** Grade 1: integers 0–20, horizontal equally spaced fixed unit increments, before/after and the finite set of numbers strictly between endpoints. Do not teach signed numbers, rational interpolation, arbitrary scales, inequality symbols as the lesson target, graphical mirroring as mathematical reversal or formal coordinate arithmetic.

**Boundary case / nuance:** A requested step beyond 0 or 20 says 'outside the displayed 0–20 segment' rather than declaring an impossible mathematical operation; never wrap the marker to the opposite end.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Start at 10. Make exactly two one-unit moves toward larger numbers. Where do you arrive?

1. **Invitation:** “Start at 10. Make exactly two one-unit moves toward larger numbers. Where do you arrive?”
2. **Controllable investigation:** Activate Step +1 twice, with marker moving 10→11→12 and revealing both equal-length gaps.
3. **Correct visible consequence:** The marker arrives at 12 after two distinct equal unit intervals.
4. **Worked number evidence:** 10 + 1 + 1 = 12; two equal gaps.
5. **Mistaken or incomplete route:** For 11, display the two traversed intervals 10→11 (first), 11→12 (second). For 13, show that the extra third interval was not requested.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — Between 5 and 8, how many one-unit moves are needed?

1. **Invitation:** “Between 5 and 8, how many one-unit moves are needed?”
2. **Controllable investigation:** Switch fixed preset to marker 5, target 8; move 5→6→7→8, recording each interval and separately listing interior ticks.
3. **Correct visible consequence:** Three moves; two interior numbers (6 and 7) but three gaps.
4. **Worked number evidence:** 5→6→7→8: 3 intervals, 2 intermediate numbers.
5. **Mistaken or incomplete route:** If two selected, explain that 6 and 7 are intermediate labels, while the gaps are 5–6, 6–7, 7–8.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Choose target tick, Step +1, Step −1, Show counted intervals, Reset, Reveal. An ordered numeric input/list alternative permits selection without dragging or fine tapping.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** A requested step beyond 0 or 20 says 'outside the displayed 0–20 segment' rather than declaring an impossible mathematical operation; never wrap the marker to the opposite end.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Keep the increasing arrow and exact tick order mathematically fixed under RTL; announce marker, target and numbered interval list. Allow scroll/zoom without compressing 21 ticks to illegibility; native buttons and entire ordered list work without visual geometry.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. All 20 unit gaps have equal length, both visually and conceptually.
2. At 10, two +1 moves end at 12.
3. At 5, three +1 moves end at 8; intermediate labels are 6 and 7.
4. At display endpoints, crossing is prevented with an explicit display-boundary explanation.
5. For Beat 1, verify exact expected result: 10 + 1 + 1 = 12; two equal gaps. Test plausible wrong response: For 11, display the two traversed intervals 10→11 (first), 11→12 (second). For 13, show that the extra third interval was not requested.
6. For Beat 2, verify exact expected result: 5→6→7→8: 3 intervals, 2 intermediate numbers. Test plausible wrong response: If two selected, explain that 6 and 7 are intermediate labels, while the gaps are 5–6, 6–7, 7–8.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
