# Find Zero and Read a Ruler — Lesson Content

Status: **Provisional Draft — pending Methodologist approval, not approved.**
Target Lesson: `learningApps/playground/Data/Lessons/1/rulerZeroAndMarks/`
Audience: **Grade 1** (approximately 6–7), beginning readers, varied motor/vision access
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Target Skills: `useRuler.data.ts` linked in the Brief (with `nonstandardLength` and `compareLength` as prerequisite experiences)
Program dependence: None
Implementation state: only an editorial Lesson/Scene plan exists.

## INSTRUCTIONAL CONCEPT

"**The zero mark starts the count.**" Children have placed equal unit pieces end to end. A ruler keeps those equal intervals on one instrument. The physical end of the ruler is **not necessarily zero**; one must find the **printed 0 line**, align it with a starting endpoint, keep the numbered scale along a straight line, and read its labels in order.

This Lesson is **instrument orientation and handling**, not determination of an unknown segment's length. Any visible guide segment is of unspecified length and children are not asked to report a measurement for it. An on-screen ruler is a **schematic** ruler: browser zoom, DPI and device size mean an image cannot be assumed to show physically accurate centimeters.

## LEARNER JOURNEY

1. Recognize equal gaps and notice that a real-looking ruler can have margin before printed zero.
2. Find **0**, then inspect where the first and second centimeter intervals really lie.
3. Align the **zero line** with the starting endpoint of an unnumbered guide segment.
4. Transfer to another ruler layout with numbers and a larger blank outer margin, without reporting the segment's length.

The distinction between **mark** and **interval** is the main insight. Keep copy brief, let the child control pace and replay.

## SECTION PLAN

### Section 1 — Where Does the Counting Start?

- **Purpose:** Identify the true origin of a ruler.
- **Contract:** `LessonSection_Config` with a single vertical resource sequence.
- **Ordered blocks:**
  1. **text — rendered:** "A line of equal blocks helped us measure. A ruler is like those blocks joined into one strip. But where is its starting mark? At the outside plastic edge—or at the line labeled 0?"
  2. **scene — existing type; proposed [Ruler Orientation Desk](./scenes/rulerOrientationDesk.scene-spec.md):** stage A, ruler rectangle extends 0.4 schematic unit left of the **printed zero**. Show evenly spaced marks labeled **0, 1, 2, 3, …, 10**. Learner selects "Physical edge", "Line marked 0", "Line marked 1", then "Reveal". The correct origin is the **0 line**, not the extra margin.
  3. **markdown — rendered:** "Find the **line marked 0**. A ruler often has a little space before the first number. That extra plastic is not part of the numbered centimeters. We begin measuring from the **zero mark**, not from the ruler's edge."
- **Feedback:** If learner picks edge: "The edge is outside the numbered scale. Follow the marks to 0." If picks 1: "Then the first interval would be skipped. Look one mark earlier." Correct: "Yes; the 0 line is our starting reference."
- **Proposed Note:** "Start at the 0 mark, not the ruler's edge" after reveal.
- **Access:** Nonvisual choices are explicit; the ruler is also described as "outer edge, small blank margin, zero line, one line, two line…" so vision is not a prerequisite.

### Section 2 — Marks and Equal Spaces

- **Purpose:** Recognize a ruler as repeated equal intervals rather than a collection of numbers to count.
- **Contract:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **text — rendered:** "Point to the space from 0 to 1. Now point to the space from 1 to 2. Are those spaces equal?"
  2. **scene — proposed [Ruler Orientation Desk](./scenes/rulerOrientationDesk.scene-spec.md):** stage B, reveal one bracket over 0→1 and another 1→2; both exactly one **centimeter interval** in the model. Control "Show next interval" advances through 0→1, 1→2, 2→3, 3→4. The learner can choose a label to inspect: "Which mark says 4?".
  3. **markdown — rendered:** "The printed numbers are **marks**. The **space between neighboring marks** is one equal centimeter interval. From 0 to 1 is the first interval; from 1 to 2 is the second. The marks themselves have no length."
- **Feedback:** If child says there are three intervals from 0 to 2 (counting 0, 1, 2): "Those are three **marks**, with only two **spaces** between them." If says the gap 0→1 is bigger: "The schematic ruler uses exactly equal spacing; check the matching brackets."
- **Access:** Use explicit numbered mark list and interval list, with spatial scale measured consistently; no reliance on animation or color.

### Section 3 — Place the Ruler Along the Line

- **Purpose:** Align ruler zero and direction to a straight segment, without evaluating length.
- **Contract:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **markdown — rendered:** "To prepare a ruler: (1) find the segment's **starting endpoint**; (2) place **0** beside it; (3) keep the straight numbered edge **along** the segment. You are now ready to read it."
  2. **scene — proposed [Ruler Orientation Desk](./scenes/rulerOrientationDesk.scene-spec.md):** stage C, a straight **unmeasured** guide segment. Ruler presets: "Zero at start, parallel" (correct setup); "Outer edge at start" (incorrect), "Mark 1 at start" (incorrect), "Scale tilted away" (incorrect). The child predicts which setup is ready and activates it. Do not show a numeric segment-length answer or an implicit "measured N cm" badge.
  3. **text — rendered:** "The zero line needs to meet the starting dot. Then the ruler's scale must follow the line—not point away from it."
- **Explanatory feedback:** Wrong edge: "The mark labeled 0 begins later than the segment. Shift the ruler until its 0 line meets the dot." Tilt: "Both straight edges should run in the same direction. Straighten the ruler first." Correct: "Ready to measure. We have lined up 0 and the straight edge." No scored correct/incorrect count.
- **Navigation:** Attempt two setups; an explicit "Show careful placement" control always available. Child can explain setup without needing to drag.

### Section 4 — A New Ruler, Same Rule

- **Purpose:** Independent recognition and transfer without adding the next Skill.
- **Contract:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **text — rendered:** "Here is a ruler with a bigger blank space before 0. Can you find the real start and point to the mark labeled 3? Then put 0 next to the first dot of a new straight guide line."
  2. **scene — proposed [Ruler Orientation Desk](./scenes/rulerOrientationDesk.scene-spec.md):** stage D, a different outline (larger margin, same equal intervals) and a guide line. "Identify zero", "Find mark 3", "Prepare ruler" are three separate no-score prompts; after each, reveal explanations; never ask "How long is the guide?".
  3. **markdown — rendered:** "The ruler can look different, but **0 still starts the scale**. Every step to the next numbered centimeter mark covers the same distance on the ruler. Careful placement comes before reading a length."
- **Feedback:** If a child matches printed 3 to the physical third line from the edge and the blank margin includes extra decoration: "Count from the **printed 0**, not from the plastic edge." The final section does not teach centimetre measurement of unknown lengths.
- **Independent practical extension:** If a physical ruler is available, locate its zero mark and the first centimeter space. Do not require this material for full Lesson completion.

## CUSTOM SCENE SPECIFICATIONS

- [Ruler Orientation Desk](./scenes/rulerOrientationDesk.scene-spec.md) — prop-free, self-contained virtual setup. Its values are **schematic scale marks**, not a calibrated physical measuring tool.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. "Start from the line marked 0, not the ruler's edge." Proposed after Section 1 reveal.
2. "Centimeters are the equal spaces between neighboring marks." Proposed after Section 2 interval demonstration.

These cues are planned authoring inputs only, without event names, IDs, Note persistence or revision schedule.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The unseen ruler in Section 4 is an **unscored** independent transfer. Future Assessment Architect work may ask children to position zero or identify equal divisions, and must test the separate `measureCentimeters` outcome **elsewhere** rather than silently reclassify this Lesson's use of the instrument.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Genuine translations of "mark", "interval", "zero", "along", "start", "centimeter" and all feedback required for every supported locale; do not inject fake fallback labels. RTL presentation order may change the surrounding text, but **ruler values and zero-origin direction must remain explicit**; do not flip numerals or silently reverse measured increasing marks. Provide an accessible ordered list of markings and the relation of each preset to the fixed guide segment. No precision dragging; focus-visible large segmented controls; reduce-motion immediate states; screen reader announces newly chosen preset without announcing every mark redundantly. Make all instructional states and explanations available offline after download.

## PRODUCTION / PLATFORM DEPENDENCIES

- `text`, `markdown`, `scene` types are presently supported in the generic Playground Section renderer.
- The ruler Scene and translations are **proposed**; no existing calibrated measurement component or Note mechanism is asserted.
- Scene Designer to verify context-based locale dispatch, keyboard mode, tests and low-end mobile fidelity. The full ruler learning objective must remain intact offline and without fine motor precision.
- No runtime Lesson config, Question, Quiz, numeric answer checking or scoring.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and linked canonical `useRuler` Skill description.
- Editor: verify the larger margin remains perceptible without implying a standard physical distance.
- Editor: check lesson boundary: **reading numbered marks / proper setup** but no unknown-length result.

## HANDOFF

Methodologist must approve scope before Content becomes editorially approved. Screenwriter reviews language and Scene states; Coding Agent independently verifies renderability and implements a prop-free Scene only after its spec is approved. Assessment Architect authors any later scored use-ruler tasks.
