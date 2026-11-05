# Ruler Orientation Desk — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Find Zero and Read a Ruler](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md) — locate ruler's zero mark, read centimeter marks, recognize equal intervals, position ruler parallel and zero-aligned; **do not** teach measurement of an unknown segment.

## LEARNER PURPOSE AND CONCEPT

A child mistakes an instrument's **physical edge** for its **zero line**, or counts printed marks rather than equal interval spaces. The desk makes the two visible, controllable and explicitly distinguished. It helps the learner position a ruler properly before a later Lesson uses it to measure.

Core explanation: "**Zero is the scale's start. The space between neighboring marks is one centimeter.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Use a **schematic** straight ruler with physical body from coordinate −0.4 to 10.4 units along a horizontal axis; its **printed zero line** at coordinate 0. Major centimeter marks at exact model positions 0, 1, …, 10, all equally spaced in the representation.
- Each **adjacent gap** (0→1, 1→2, …) is one **modeled cm interval**. The 0-to-2 region has three marks (0,1,2) but **two** intervals. Units are conceptual marks, not device pixels or real physical centimeters.
- The physical plastic margin at coordinate −0.4 is **not** a part of the numbered scale. A second ruler style has a larger blank margin, e.g. −0.8 to 10.4, but the numerical marks remain unchanged.
- A guide straight segment is used **only to check instrument alignment**. The Scene never reports the unknown guide's length. The subsequent separate measuring Skill owns unknown-length inference.
- Do not infer screen calibration from CSS pixels, SVG viewbox, DPI, zoom or browser geometry. A genuine physical ruler may be used outside the Scene only as an optional learner exercise.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A. Locate 0 Rather Than the Outer Edge (Section 1)

1. Display ruler body with blank left margin, physical edge, a visible zero tick marked **0**, next tick **1**. Prompt: "Which place starts the marked scale?"
2. Choice controls with accessible names: "Plastic edge", "Mark 0", "Mark 1". On selection, reveal the difference:
   - Plastic edge: "The ruler has blank space before zero. Start at the **0 line**."
   - Mark 1: "That skips the first centimeter interval. Look one mark earlier."
   - 0: "Yes. The zero line starts the numbered scale."
3. Highlight the correct zero line with a **shape/label bracket**, not solely color. Allow reset and replay.
4. An independent textual sequence says: "outer edge → blank margin → zero mark → first interval → one mark".

### B. See Intervals as Spaces (Section 2)

1. Start at zero and reveal labeled brackets **0–1**, **1–2**, **2–3**, **3–4**, each exactly one conceptual ruler unit.
2. Prompt: "There are marks 0, 1, 2. How many _spaces_ from zero to two?" Offer two or three, then explain **two** spaces with 3 marks.
3. Ask "Which mark has printed number 4?" and show exact label-to-tick relationship; this is **mark reading**, not determining the length of an unknown object.
4. Allow "Show interval n" (n from 1…4), "Read all intervals" and "Back"; a nonvisual log states one range at a time.

### C. Prepare Ruler Along a Guide Segment (Section 3)

1. Display an unnumbered straight guide with a named **start dot** and a schematic ruler. Select placement presets:
   - **Ready:** mark 0 at start dot, ruler's marked edge parallel and aligned along guide.
   - **Wrong edge:** plastic edge at start dot, zero line offset by margin.
   - **Wrong start mark:** printed 1 opposite dot, not 0.
   - **Tilted scale:** zero at dot but ruler's numbered edge points away from the straight guide.
2. Prompt: "Which setup is ready for a measurement later?" Learner can select a preset, inspect the alignment with an explicit status summary, then choose "Show a careful placement".
3. Ready feedback: "Zero meets the first dot, and the scale follows the line." Wrong edge: "Match the printed zero, not the ruler's edge." Wrong mark 1: "We've already skipped an interval." Tilt: "Keep the numbered scale along the straight line."
4. **Never** display a total length number for the guide; this would blur the intentionally distinct `measureCentimeters` Skill.

### D. New Ruler, Familiar Origin (Section 4)

1. Change to larger-margin ruler style, keep intervals equal. Ask: "Find zero; find the mark labeled 3; place zero at the guide's first endpoint." Independent preset, not copied state from A–C.
2. Reveal three separate explanation stages for origin, label and ruler placement. No answer score and no hidden timeout.
3. If learner wrongly counts visible physical marks from the edge including ornamental printing, say "Look for the number **0** first. The margin is not a centimeter interval."
4. Optional suggestion: check a real ruler's zero and first interval. All on-screen objectives remain independently available without physical supplies.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** scale body, marks 0…10, major equal unit brackets, blank margin, fixed unmeasured guide, labeled start endpoint, choose/reveal/previous/reset and optional preset-switch controls.
- **State per independent placement:** ruler style; selected predicted origin; interval index; selected numeric mark; selected ruler placement; feedback reveal stage. Reset returns to fixed initial state of **that placement**.
- **Invariant:** tick n is spaced one unit from n−1; zero is the printed mark and distinct from physical body edge; changing margin or graphical scale does not change tick intervals or the definition of a centimeter in the schematic; aligning zero does not automatically infer guide length.
- **No props:** define separate Section-specific root exports if needed; each public Scene entry is prop-free and self-contained. Shared presentational internals are allowed but must not require fictional Lesson props.
- **Interactions:** all answers are unscored conceptual predictions with reasoned feedback; no state persistence or simulated physical ruler calibration.
- **Nonvisual ledger:** "physical edge: before zero; zero mark: x=0 of the scale; 1 follows after one equal interval"; placement summaries explicitly distinguish start/tilt.

## VISUAL / AUDIO / MEDIA DIRECTION

Large schematic ruler, visible zero tick and printed numerals, separate plastic margin shading/pattern, bracketed **spaces** from tick to tick. Maintain consistent spacing even when responsive; do not stretch the ruler nonuniformly. Use instant switch and optional gentle pointer highlight; no ruler-flinging animation, ornamental ticks that resemble centimeter marks or automatic reading. Optional real ruler photo **not required** and has no approved asset.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Real localized translations for every instruction, mark name, interval, hint, preset, explanation, optional audio description and eventual Note. No placeholders or English fallback.
- The mathematical scale has an **explicit orientation** (0→1→…→10 in diagram coordinates). RTL UI can reorder text controls and labels but must not reverse mark values or misalign zero relative to the guide. Consider rendering ruler and numerals in a `dir=ltr` mathematical subregion with adequate contextual text, subject to actual platform verification.
- Keyboard/switch/touch controls replace all pixel-perfect moving; focus, contrast, labels, announced preset changes, logical reading order and reachable targets require WCAG 2.2 AA review. No sound-only condition, motion dependence or tiny tick selection.
- Nonvisual equivalence provides numbered tick list, interval descriptions and ruler-to-guide alignment statuses; learners can decide correct setup from meaningful text independent of the diagram.
- Offline after lesson/locale download, including all feedback and Scene logic; local schematic data only. A low-end device gets the **same reasoning**, not a shortened lesson.

## ACCEPTANCE SCENARIOS

1. On ruler with −0.4 margin, selecting physical edge or mark 1 gives specific explanation; selecting mark 0 reveals the correct start.
2. Between 0 and 2 are exactly **2 equal intervals** with **3 labeled marks**.
3. Mark 4 is unambiguously the fourth printed number after 0; do not confuse number labels with number of marks visible.
4. "Ready" placement has mark 0 at first guide dot and scale parallel to guide, but **no unknown length is reported**.
5. "Physical edge at start", "mark 1 at start", and "tilted" are all visibly/textually distinct incorrect preparation states.
6. New ruler margin size does not change its printed mark order or equal interval spacing.
7. Reset and Section placement separation clear prior predictions; no props or cross-Scene state.
8. Keyboard, RTL, screen reader, reduced motion, mobile zoom and fully offline use preserve the same correct ruler semantics.
9. Browser zoom/resizing changes _display size_ only, never asserts that a rendered spacing equals one physical centimeter.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic `scene` resource renderer exists, but this custom ruler model is **proposed**. The Coding Agent must implement each placement as a prop-free Scene root with real locale data, and build automated tests for interval spacing, margin, alignment and accessibility. The editor must approve ruler visual conventions and verify it never asks an unknown-length question. No runtime Lesson registration, Note persistence, scored Question, Quiz or events are part of this specification.
