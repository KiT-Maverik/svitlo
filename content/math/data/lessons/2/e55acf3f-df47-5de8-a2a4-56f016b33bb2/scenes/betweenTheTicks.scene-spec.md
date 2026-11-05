# Between the Ticks — Scene Specification

Status: **Provisional Draft — pending Methodologist and independent Scene approval**
Owner: Educational Screenwriter
Parent Lesson / Section: [A Number's Place on the Line Content](../content.md), Section 3
Methodologist objectives: [Methodologist Brief](../methodologist-brief.md) (**Draft, not approved**)
Implementation status: Proposed standalone **prop-free Scene**, not implemented

## LEARNER PURPOSE AND CONCEPT

Use an explicit line segment to determine predecessor, successor and all intermediate integers instead of guessing from visual proximity.

**Underlying number relationship:** The number line has positions 0,1,…,20 in numerical order with one **equal-length unit interval** between adjacent integers. In conventional number-line coordinates, larger values lie to the right and smaller values to the left; the arrow labelled increasing and ordered tick list always determine meaning, regardless of interface RTL direction. From tick 10, two unit moves reach 12 (via 11); from 5, three unit moves reach 8 (5→6, 6→7, 7→8). Immediately before 10 is 9, immediately after 10 is 11. Strictly between 7 and 11 lie 8,9,10 (not the endpoints). Inside the shown 0–20 segment, no predecessor of 0 and no successor of 20 are displayed; this is a display boundary, not a claim numbers do not continue.

The child must be able to change or examine the representation, form a prediction, see the exact model and explain why a plausible wrong shortcut fails.

## ACCURATE CONTENT AND MODEL LIMITATIONS

**Initial state:** Same invariant 0–20 scale, independently initialized marker at 10 and accessible numeric selection. Two fixed endpoint probes: 7 & 11, then 12 & 16. Strict between means excluding highlighted endpoint labels.

**Model and invariant:** Selected query mode (previous/next/strict-between), known target(s), selected answers, ordered line labels and explicit endpoint inclusion setting (always false for strictly between). Source values remain fixed.

**Numerical and pedagogical limits:** Grade 1: integers 0–20, horizontal equally spaced fixed unit increments, before/after and the finite set of numbers strictly between endpoints. Do not teach signed numbers, rational interpolation, arbitrary scales, inequality symbols as the lesson target, graphical mirroring as mathematical reversal or formal coordinate arithmetic.

**Boundary case / nuance:** For 0, say 'no number immediately before 0 in this displayed segment'; for 20, say 'no number immediately after 20 in this displayed segment.' Outside 0–20 is not studied or declared nonexistent.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Beat 1 — Find the number just before 10 and just after 10.

1. **Invitation:** “Find the number just before 10 and just after 10.”
2. **Controllable investigation:** Select 9 and 11 on the line, explaining each is exactly one adjacent unit interval from 10.
3. **Correct visible consequence:** 9 is immediately before 10; 11 is immediately after it.
4. **Worked number evidence:** 9, 10, 11: immediate neighbors differ by one.
5. **Mistaken or incomplete route:** If 8 chosen for before, show 8→9→10 is two intervals, so 9 is the immediate neighbor.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

### Beat 2 — Which whole numbers lie strictly between 7 and 11? Then try between 12 and 16.

1. **Invitation:** “Which whole numbers lie strictly between 7 and 11? Then try between 12 and 16.”
2. **Controllable investigation:** Mark 8,9,10 for 7–11, then independently transfer to 13,14,15 for 12–16. Read results as an ordered list.
3. **Correct visible consequence:** 8,9,10 lie strictly between 7 and 11; 13,14,15 lie strictly between 12 and 16.
4. **Worked number evidence:** 7 | 8,9,10 | 11 and 12 | 13,14,15 | 16.
5. **Mistaken or incomplete route:** If 7 or 11 selected, show endpoints are the limits, not inside. If 9 alone, point out unmarked valid 8 and 10.
6. **Explanatory Reveal and replay:** Permit a full annotated number/object ledger before retry, with no score or time limit. The child can also reset just this Scene without locking other Sections.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Semantic objects:** Named countable group members, ticks, operands or operator controls, each with stable identity, a visible state and an equivalent ordered textual ledger.
- **Control map:** Choose previous/next/between task, select integer labels in an ordered list, Explain with highlighted unit gaps, Reset. No precision click or drag required.
- **Deterministic state:** The numbers, chosen preset, group members, selected values, prediction, Reveal state and Reset all come from the self-contained Scene's own constants and actions, not caller props.
- **Integrity:** Every displayed result, spoken/narrated number, count, step or comparison derives from the same authoritative model. Prevent duplicate membership or phantom items. Do not silently mutate counts when moving viewports, swapping layout direction or resetting.
- **Independence:** The proposed component has **no props** and no mutable state shared with a Lesson or another Scene; each Section contains its own independently resettable placement.
- **Boundaries:** For 0, say 'no number immediately before 0 in this displayed segment'; for 20, say 'no number immediately after 20 in this displayed segment.' Outside 0–20 is not studied or declared nonexistent.
- **Assessment boundary:** Prediction and feedback are formative only. No Question bank, Quiz, correct-answer security contract, mastery metric, score, persistent Note event, timed completion or invented platform API.

## VISUAL / AUDIO / MEDIA DIRECTION

Use lightweight HTML/SVG or ordinary semantic controls for individual items and groups, with a concise number ledger. Animation may highlight an interval, pair or new group but may never be the only carrier of information; reduced-motion mode updates state immediately. No required audio, live external service, asset generation or ornamental 3D. If optional sound is added later, localized captions/transcripts and downloaded media must preserve full learning.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Full ordered integer list and query description convey all spatial meaning. Nonvisual selection of the set of between values; the mathematical order is not reversed by RTL or a moving viewport.

Every learner-facing prompt, number word, accessible description, feedback branch, state announcement and Note requires a complete genuine translation for the current Engine-supported roster, with no silent English fallback. RTL changes reading presentation but not mathematical operand order, number-line increasing direction, counting origin or grouping identity. WCAG 2.2 AA: native keyboard/switch/touch operation, visible focus, nonvisual ordered model ledger, non-color explanations, reduced motion, legible 200% zoom/mobile experience. All selected-language models, scripts, assets and feedback must be locally available after the lesson package is downloaded. These are production requirements, not claims that localization/PWA behavior currently exists.

## ACCEPTANCE SCENARIOS

1. Previous/next of 10 are 9/11.
2. Between 7 and 11 returns exactly [8,9,10].
3. Between 12 and 16 returns exactly [13,14,15].
4. Endpoints 0/20 are handled as segment boundaries, not universal number boundaries.
5. For Beat 1, verify exact expected result: 9, 10, 11: immediate neighbors differ by one. Test plausible wrong response: If 8 chosen for before, show 8→9→10 is two intervals, so 9 is the immediate neighbor.
6. For Beat 2, verify exact expected result: 7 | 8,9,10 | 11 and 12 | 13,14,15 | 16. Test plausible wrong response: If 7 or 11 selected, show endpoints are the limits, not inside. If 9 alone, point out unmarked valid 8 and 10.
7. All interactions work by keyboard, switch and touch with full nonvisual ledger, correct semantic RTL, reduced motion, mobile/high zoom and identical downloaded-offline mathematics.
8. Reset affects this Scene only, not another Section; no scoring or unimplemented Note event is emitted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Each custom Scene is independently initialized, self-contained and **prop-free**; no caller supplies mode or numerical props. Scenarios and variables reside in that Scene's own authored module once implemented. The generic `scene` Resource type is supported, but this particular Scene has **not** been implemented. No invented API, registration, event, Note persistence, assessment, score or mastery side effect is assumed.

Editor must explicitly approve the Methodologist Brief and each proposed Content/Scene separately. Then the Scene Designer/Coding Agent implements real React code and tests in another authorized stage. QA must test all positive/negative cases, complete locales, RTL, accessibility and offline packaging; this Draft creates none of those features.
