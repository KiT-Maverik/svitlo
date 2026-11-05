# Centimeter Segment Bench — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Measure Straight Segments in Centimeters](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md) — find length of **existing straight segments** by aligning a cm ruler at zero and counting equal intervals. Do not implement a construct/draw-segment Skill.

## LEARNER PURPOSE AND CONCEPT

"**Start from zero, read the far endpoint, count spaces and name the unit.**" The learner predicts, aligns a schematic centimeter scale, counts intervals and repairs a seductive wrong measure caused by ruler misplacement. The Scene makes **endpoints**, **zero mark**, **unit interval** and **reported length** independently inspectable.

## ACCURATE CONTENT AND MODEL LIMITATIONS

- A segment is a **fixed straight path** between two endpoint dots; its length in the model is a _positive integer_ number of centimeter intervals, 1…10. Only specified examples 3, 4, 5, 6, 7 cm appear in this Lesson. No drawing or resizing segments by the learner.
- Scale ticks **0…10** form ten equal conceptual 1 cm intervals. The scale has a small unnumbered plastic margin; the zero tick, not the body edge, is used for alignment. A correct reading has start dot at mark **0**, end dot at mark **L**, giving **L cm** for preset L.
- If the ruler is offset, the printed endpoint label alone is **not** the length. Example: segment length **5 cm** starts opposite mark **1** and ends opposite **6**; after shifting the ruler so its zero aligns to the segment's start, the endpoint matches **5**. This Lesson corrects by moving to zero; it does not require subtracting marks.
- Tilt is a distinct incorrect preparation state; aligning a mis-angled scale or trusting its end label is not permitted.
- The **screen is not a calibrated physical ruler**. CSS/SVG lengths are educational model values only; actual centimeter measurements of real objects require a physical ruler. Screen pixel distances, zoom and orientation must not change the model's numeric results.
- A visual ruler moves relative to a **fixed** segment; position adjustments never alter true segment length. One real-world object may have a fractional length; those are outside this introductory model.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Placement A — Count Four Intervals (Section 1)

1. Fixed 4 cm segment, scale already parallel with start at 0 and end at 4. Visible marks: **0,1,2,3,4**, but exactly four spaces.
2. Ask: "How many one-centimeter spaces from the first dot to the last?" Prediction choices: **4 cm**, **5 cm**, **4** (unit missing).
3. "Show spaces" highlights **0→1**, **1→2**, **2→3**, **3→4** one at a time, with an ordered text list; after final interval reveal "**4 cm**".
4. 5 cm prediction: "You counted five printed labels, but there are four spaces." Missing unit: "You counted correctly; say the unit **cm**."
5. Allow reveal, reset and retry with no penalty; number of ticks and spaces always distinct.

### Placement B — Move Ruler Until Zero Aligns (Section 2)

1. Fixed **7 cm** segment. Ruler initially parallel but shifted **left by two model unit intervals** relative to correct position, so first endpoint is over printed mark **2**, far endpoint over printed mark **9**.
2. Learner may use "Align zero" or **"Move ruler right one mark" twice** (the ruler's zero moves toward the segment's start). At final alignment, dots are over **0 and 7**.
3. Ask learner to read the far mark and report "**7 cm**", optionally reveal a log of intervals 0→1 through 6→7.
4. Reading far mark 9 _before_ alignment triggers: "The ruler's zero does not meet the first dot. Move the scale before reading length."
5. Additional preset **3 cm** starts already aligned 0→3; moving the segment vertically or changing stroke thickness does not change its length or ruler labels.

### Placement C — Detect a False Six (Section 3)

1. Fixed segment **5 cm**, ruler parallel with segment spanning mark **1 to mark 6**. Prompt: "It ends at the mark 6. Is this a 6 cm measurement? What should we fix?"
2. Choices: "Move zero to the first dot" (appropriate), "Keep 6", "Count all six printed labels as spaces" (inappropriate).
3. Corrected position: ruler shifts **right by one unit interval**, so segment spans **0 to 5**, exactly **five** equal spaces. Final explanation "5 cm".
4. For wrong 6: "That is the number printed at the far end, but our scale started at 1. The result does not follow from the correct zero method."
5. The child's choice to shift the ruler changes only displayed _instrument placement_, never the segment's true length. Do not teach arithmetic subtraction as the required strategy.

### Placement D — Independent Unseen Segment (Section 4)

1. Fixed **6 cm** segment, initially ruler **tilted** and offset. Give separate accessible controls "Straighten the scale", "Align zero", "Read endpoint", "Count interval spaces".
2. After correcting both setup flaws, first dot meets 0 and second dot meets 6. The exact answer with unit is **6 cm**; the scale has **seven printed labels** from 0 to 6 but six spaces.
3. For 7 cm answer: "You counted labels. Count the six spaces between adjacent numbered lines." For a prematurely read number: "First align the zero mark." For correct 6: "The segment covers six unit intervals, so the length is 6 cm."
4. If "Reveal next hint" is selected, show only "Check the direction of the ruler" first, then "Align zero" as needed, **not** an immediate final result.
5. Optional real-ruler extension is external: the editor may suggest checking a physical object, but the Scene must remain fully equivalent without physical supplies.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** fixed endpoint-labeled segment, schematic ruler body and major marks, interval brackets, alignment-status text, placement presets, discrete adjust/reset/reveal/undo controls, written result choices, ordered interval log.
- **State:** fixed preset length `L` per Section, instrument position/tilt, count of revealed intervals, prediction choice, hint level and feedback state. This is **conceptual design**, not an invented runtime type or prop contract.
- **Invariants:** on valid setup, segment start maps to ruler 0; segment end maps to L; number of unit spaces is exactly L; ruler shift/tilt changes reading readiness, not L; dots remain fixed; only full single-cm preset lengths used.
- **Boundary:** If ruler is not straight and zero-aligned, final numeric result control is either unavailable with explanation or any submitted result gives feedback "Fix the setup first"; never accept a printed far-end number as a valid measure without proper setup.
- **Prediction flow:** user can inspect interval log before selecting answer; this is unscored formative reasoning and doesn't trigger any mastery state.
- **Prop-free design:** each Section's Scene must be self-contained with local fixed presets and no incoming React props. Internal shared functions are possible if no external Scene contract is invented.
- **Alternative interaction:** buttons select unit shift/angle correction; no fine drag, pointer pixel distance or voice command needed.

## VISUAL / AUDIO / MEDIA DIRECTION

Use a spacious high-contrast schematic ruler, clear printed 0…10 numbers and visible endpoint dots. Unit brackets should be exact and equal. Ensure ruler markings stay parallel to the segment when ready; depict tilt as a definite crossing angle rather than microscopic error. The model's apparent size can scale with device width; **do not call one displayed interval a physical centimeter**. Instant before/after modes must be identical in meaning to any optional animation. No recorded sound/video or generated imagery required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Genuine translations across all configured locales: "zero mark", "interval", "centimeter", "align", "straighten", endpoint terms, hints and numeric-with-unit result feedback. Correct grammar for singular/plural and appropriate `cm` label; never invent an English fallback for unfinished locales.
- RTL display/layout may change positioning of explanatory copy, but mathematical ruler labels must remain in a chosen **explicit** ascending order 0→1→…→10 and correct endpoint mapping. Do not mirror an SVG while leaving numeric statements inconsistent.
- Offer screen-reader-friendly list "interval 1: mark 0 to 1" and a ruler-state sentence "segment begins opposite ruler mark 1; ruler zero is one interval to its left." Nonvisual learner must be able to choose alignment and compute the same answer as sighted learner. Announce status once per action.
- Provide keyboard/switch/touch operations, visible focus, targets suitable for younger hands, no color-only correctness cues, no timings and reduced-motion instantaneous changes. Fit phone width/zoom and maintain relationship of endpoints and markings without distorting geometry.
- Full offline use after locale/Scene download; all numeric presets, feedback and logic on device. Accessibility modes cannot omit any conceptual challenge.

## ACCEPTANCE SCENARIOS

1. With 0→4 aligned, there are **four** equal spaces and **five** labels; correct result **4 cm**, never 5 cm.
2. Initial 7 cm segment ruler offset maps 2→9; shifting ruler **right two** scale intervals produces correct 0→7 and **7 cm**.
3. Valid 3 cm preset maps 0→3 and yields **3 cm**, independent of line thickness or vertical placement.
4. Wrong setup for 5 cm segment maps 1→6; after zero alignment it maps 0→5, with exact correct result **5 cm**.
5. Tilted/offset 6 cm preset does not allow a valid finished reading until both straight and zero-aligned; then yields **6 cm**, not 7 cm.
6. Reset, undo and independent Scene placements retain deterministic length and alignment; no cross-Section state leakage.
7. A reported length includes `cm`; numeric-only "4" receives an explanatory missing-unit prompt without scoring.
8. Keyboard, screen reader, RTL, reduced motion, large zoom, phone and post-download offline all provide equivalent preparation and interval-count reasoning.
9. Browser zoom changes display scale but cannot change modeled results; no physical measurement calibration is asserted.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Only the general `scene` Resource type/rendering is available today. The Centimeter Segment Bench, translations, tests, Section-specific prop-free Scene entry points and all lesson registration are **future work** requiring approval. The separate drawing-a-segment Skill remains untouched. No Question, Quiz, scoring system, Note persistence, analytics hook or invented platform event field is permitted.
