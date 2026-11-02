# Measured Segment Maker — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson: [Draw Segments of a Given Length](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md): **construct** a straight segment of given whole-centimeter length using zero-based ruler alignment, endpoint marking and a straight connector. No extra Skills, scored Questions or mastery contract.

## LEARNER PURPOSE AND CONCEPT

Children are familiar with using a ruler to **measure** a line already drawn. This Scene asks them to **make** one from a length instruction. They have direct control over origin, endpoint and connection and can investigate two different failure conditions: wrong **distance** between endpoints and a **nonstraight path**. The model is deterministic and not a pixel-drawing challenge.

Learner voice: "**Start A at 0. Mark B at the length we need. Connect them with one straight line. Check the number of spaces.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- All constructions are schematic, fixed **whole-centimeter** lengths L in `{3,4,5,6,7}`, ruler major marks `0…10` equally spaced. A ruler body may extend a small unnumbered distance before zero. Model tick n is at distance n _one modeled centimeter interval_ from tick 0.
- A geometric segment AB includes two **distinct** endpoints; the target construction uses A at the printed ruler **0** and B at printed ruler **L**, with exactly L intervals between. One **straight** connecting stroke AB is required. A bent trace through a third point C off AB is not a straight segment even if it visits both endpoints.
- The **first number** is zero, not one. From marks 0 to 4 are **four** spaces, although five printed tick labels. From mark 1 to mark 5 are also **four** spaces; this is not the taught zero-origin construction of five.
- The paper/ruler picture is not physically calibrated to actual screen dimensions, zoom, portrait/landscape device size or browser pixel units. Label "model centimeter interval" accurately. A real-world physical ruler is an optional transfer, not an assumed built-in app feature.
- A ruler can be repositioned, but its **internal equal tick spacing** and numeric meaning stay fixed. If rotated for a vertical example, both ruler orientation and proposed segment axis change coherently; never stretch an SVG unevenly and call it the same units.
- Neither learner selection nor an answer reveals a secret scoring rule. Use explanatory comparisons of constructed geometry and target L; no scoring, Questions, Quiz or persistence.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Placement A — Worked Four-Centimeter Construction (Section 1)

1. Intro comparison: a **pre-existing segment** with endpoints opposite 0 and 4 on a schematic ruler, so known measured length **4 cm**. Then clear the segment and present a **target** card "Please draw **4 cm**".
2. Prompt: "What do we mark first? The start, the end, or an arbitrary stroke?" Accessible learner choice followed by "Show first step".
3. Set/mark **A at 0**. Next prompt: "Where should B go?" Choose 3, 4, or 5; 4 gives **B at 4**. No connection yet. The proposal to draw earlier is explained but not accepted as a finished construction.
4. Choose "Connect straight". Draw the straight AB from tick0 to tick4; reveal intervals **0–1, 1–2, 2–3, 3–4** in order. Report "4 equal spaces: **4 cm**".
5. If B=5: "0→5 has **five** intervals; too long for 4." If B=3: "0→3 has **three**; too short." If A at the outer plastic edge: "The physical edge may not be tick zero; move to the line **0**."
6. Reset returns to blank workspace, target 4, no marked A/B or stroked segment. Replay can restore the worked construction by explicit reveal.

### Placement B — Same Procedure, Chosen Target (Section 2)

1. Learner selects L from **3 cm**, **5 cm**, **7 cm**. Selection **clears** previous B and connection; no mixing an old stroke with a new target.
2. Controls: "Set A at 0", "Mark B at [number]" (numerals 0–10), "Connect straight", "Inspect intervals", "Undo last step", "Try another length", "Reset". A and B cannot be the same for this nonzero target; before endpoints are marked, the final connection control is unavailable with explanation.
3. Correct examples:
   - L=3 → A0,B3 ⇒ three spaces, 3 cm.
   - L=5 → A0,B5 ⇒ five spaces, 5 cm.
   - L=7 → A0,B7 ⇒ seven spaces, 7 cm.
4. Incorrect example L=5,B6 yields **six**, not five, centimeters; label exactly what changed, offer a one-tick adjustment without losing the learner's work. If L=7,B7 but the connection is bent, say "**Correct length between ends, but not a straight segment**."
5. No compulsory number of attempts, timed gate or celebration confetti. The learner can inspect an explanation first or retry, and every action has a nonvisual text status.

### Placement C — Repair Two Distinct Errors (Section 3)

1. Target "**5 cm straight segment**"; show two independent examples that can be selected by label:
   - **Case 1:** A at printed mark **1**, B at mark **5**, connection straight. Their separation is only **4 cm** (intervals 1–2,2–3,3–4,4–5).
   - **Case 2:** A at **0**, B at **5**, path A→C→B via an off-line bend C. The endpoints are five modeled centimeter intervals apart, but the drawn **path** is not straight.
2. Ask "What is wrong?" before showing the fix. Case 1 fixes by **placing A at 0 while B remains at 5** (or by starting the construction from scratch at zero). Case 2 fixes by replacing the bent connector with a **single straight** AB while retaining A0 and B5.
3. For Case1 an alternative mathematically correct 5 cm nonzero-start construction could use **1→6**, but this Lesson deliberately applies the validated beginner **zero-start procedure**; never say that a nonzero start _can never_ yield five cm. The editorial counterexample's error is the actual **1→5 four-interval span**.
4. For Case2 do not claim the total bent-route length equals five centimeters; the endpoint separation is five, while the bent trace may be longer and is not the specified straight segment.
5. After repair, reveal the two conditions as independent checked statements: "Endpoints 0 and 5 = five equal cm spaces" and "Single straight connection". No hidden scoring.

### Placement D — Independent Six-Centimeter Construction (Section 4)

1. Start with an **empty workspace**, a ruler with visible physical margin and tick sequence 0–10, and target "**Make a straight segment 6 cm**"; no preplaced dots or revealed target endpoint. Default ruler optionally shifted so the marked zero needs to be aligned with a labeled blank start.
2. Learner chooses "Align ruler's 0 at start", "Mark A", "Choose B at n", "Draw one straight segment", "Check". Correct state **A at 0, B at 6**, straight connection, exactly six one-centimeter intervals.
3. For B5: "Five intervals—one less than requested." B7: "Seven—one more." For start at plastic edge: "It may not be 0; find the mark labeled zero." For a curve: "It does not make the required straight segment."
4. "Show first hint" says "Find 0" only; second hint says "Count six equal spaces from zero"; reveal shows the completed AB, but only after learner requests it or has made an attempt.
5. Optional vertical construction uses a separately oriented ruler and aligned vertical segment of the same modeled L=6; **no change in computed length**. Any rotation or scaling must maintain length/mark relationship.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** ruler body with blank margin, major ticks 0…10, A/B endpoint markers, local 1cm interval brackets, connecting straight stroke or bent-route nonexample, explicit target number, target-selection buttons, check/reveal/undo/reset and textual state ledger.
- **Per-placement local state:** preset target L, selected ruler origin/alignment, A and B tick choices (or none), connection variant (none/straight/bent for diagnostic), chosen diagnosis, hint level and reveal index. Each Lesson Section placement has a fixed **self-contained preset**.
- **Invariants:** correct construction ⇒ A tick0, B tick L, one straight connection ⇒ L identical intervals and length L cm. Mark/tick values always reflect actual model positions. Diagnosis never redefines what a straight segment is. Reset clears local states and never changes another Section.
- **No public props:** each top-level Scene component is **prop-free** and obtains localization through verified Lesson context, not invented `targetLength`, `initialState`, `locale`, `onAnswer`, `mode` or callback props. Internal helpers may accept private arguments.
- **No drag dependency:** discrete tick-selector buttons and "Connect straight" are **semantically equivalent** to marking/drawing, and remain available on mobile/keyboard/switch; optional dragging is extra only.
- **Feedback and access:** all incorrect constructions get a reason identifying distance error versus straightness error and a suggested correction. No numeric grading, retries policy, timer, mastery state, Note trigger or user data persistence.

## VISUAL / AUDIO / MEDIA DIRECTION

Use SVG/HTML ruler at a stable schematic proportional scale. Display printed **0** clearly and physically separate from the ruler body's start. Each centimeter interval has the same width under responsive scaling. A and B use large labelled dots; the connector is either one straight SVG segment or explicitly a two-piece bent path through C. Do not use a decorative squiggle so thin it is inaccessible; connect actions can be activated by buttons. Optional line-drawing motion respects reduced motion and does not affect geometry. No remote images, video, physical size calibration or special media dependency.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Every term, target, unit, hint, feedback, tick label description, accessible name and planned Note must have authentic translations in all configured locales. Correct singular/plural ("1 cm" versus "5 cm") and direction terms. No silent fallback.
- In LTR and RTL presentation, retain explicit **zero-to-growing-number** scale orientation and correct line construction. Do not flip 0↔10 by mirroring the SVG while leaving numeric rules unchanged.
- A screen reader can hear "Target 5 centimeters. A is at ruler mark 0. B is at mark 6. Six spaces: one more than requested. Stroke straight" and choose a correction using ordinary buttons. For bent mode, verbalize "the path changes direction at C; not one straight segment".
- Keyboard focus, switch/touch selection, large targets, 200% text scaling, no color-only cues, reduced-motion direct rendering and WCAG 2.2 AA verification are release expectations. Equivalent functionality on weak devices cannot sacrifice construction.
- Offline after an actual successful lesson/locale download must include all diagrams, calculations and feedback. No assumption that current PWA sync or Note unlocking is live.

## ACCEPTANCE SCENARIOS

1. Target **4 cm**, A0 B4 straight yields exactly intervals 0–1,1–2,2–3,3–4 and a **4 cm** model segment.
2. For target **3**, 0→3 yields **3 cm**; for **5**, 0→5 yields **5 cm**; for **7**, 0→7 yields **7 cm**.
3. Target 5, 0→6 straight: six intervals and feedback "one too many"; 0→4: four intervals and feedback "one too few".
4. Target 5, 1→5 straight: **4 cm**, _not_ 5; explanatory correction repositions A to 0 while B stays at 5.
5. Target 5, 0→5 connected by a bent A→C→B path does **not** count as the required straight segment, even though endpoint separation is five intervals.
6. Stage D target **6 cm**, A0 B6 straight produces six intervals and the exact answer **6 cm**; B5/B7 diagnoses are correct.
7. Ruler margin, display zoom, screen dimension, optional rotation and line thickness never silently change the modeled centimeter count or claim physical calibration.
8. Retry/reveal/undo/reset restore exactly the documented local state and do not leak stage state across Section placements.
9. Keyboard, screen reader, RTL, reduced motion, small mobile, 200% zoom and offline after download allow equivalent construction and error diagnosis.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Current Playground generic renderer can display a typed `scene` Resource, but **Measured Segment Maker does not exist**. After explicit Methodologist and Scene approval, Scene Designer/Coding Agent must implement independently testable prop-free roots, true locale content, accessible controls and deterministic geometry assertions. This batch does not add React, Lesson data, Questions, Quizzes, scored checking, Note persistence or invented event contracts.
