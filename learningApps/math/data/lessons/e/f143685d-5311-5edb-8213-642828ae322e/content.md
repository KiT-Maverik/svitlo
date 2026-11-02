# Draw Segments of a Given Length — Lesson Content

Status: **Provisional Draft pending Methodologist approval — NOT Approved**
Target Lesson: `learningApps/playground/Data/Lessons/1/drawingSegmentsInCentimeters/`
Audience: **Grade 2** (approximately 7–8), mixed reading/motor/visual access; whole centimeters only
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: construct a straight segment from an explicit centimeter length by marking 0 and L, join endpoints, repair common ruler/drawing errors, and verify the construction against the same ruler.
Target Skills: `drawSegmentCentimeters.data.ts` as linked in the Brief; prior `useRuler`, `measureCentimeters` and geometric `segment` Skills are prerequisites only.
Program dependence: None
Implementation: editorial plan only; no runtime Lesson data or implemented custom Scene.

## INSTRUCTIONAL CONCEPT

**"Choose the length first. Mark two ends. Join them straight."** In the earlier measurement Lesson the straight segment already existed and we read its length. Now we know a required length—for example **5 cm**—and must **make** a matching straight segment AB. This is a distinct construction competency. A ruler's zero tick marks **A**; tick 5 marks **B**; connecting A to B with **one straight stroke** produces five one-centimeter intervals. The child controls the geometry by accessible discrete actions, not a precise drawing gesture or physical calibration of the screen.

The virtual ruler is a schematic equal-interval model. A line drawn across five onscreen "centimeters" will **not necessarily** be five physical centimeters on a particular device. If a real ruler is available, an optional paper exercise can extend the knowledge without making the physical material a prerequisite.

## LEARNER JOURNEY

1. Compare the old question, "**How long is this line?**", with the new question, "**Make a line this long.**" Predict what differs.
2. Demonstrate marking **A at 0** and **B at the target tick**, then connecting the points **straight**.
3. Construct several segments with user-chosen target lengths while checking both ends and the straightness of the connecting path; catch a plausible off-by-one mark error.
4. Independently construct **6 cm** using a fresh, initially blank ruler model and explain a wrong 1→5 example.

The learner should repeatedly see the two separate sources of correctness: **where the endpoints lie** and **whether the connection is a straight segment**. A decorated trace or animated pen alone is not an interaction.

## SECTION PLAN

### Section 1 — Reading a Length or Making One?

- **Purpose:** introduce construction as the inverse instructional problem of measuring an existing line.
- **Current implementation shape:** `LessonSection_Config`; ordered vertical Resource list.
- **Ordered Resources:**
  1. **text — renderer currently available:** "Here is a straight segment. When we measure it, we find **4 cm**. But now the paper is blank and someone asks: **Draw a segment 4 cm long.** What should we place first?"
  2. **scene — typed and generically rendered; proposed bespoke Scene:** [Measured Segment Maker](./scenes/measuredSegmentMaker.scene-spec.md), stage A. Show a worked preexisting 4 cm segment from 0 to 4, then a reset blank workspace with a schematic ruler 0–10. Prediction controls: "Mark start at 0", "Mark end at 4", "Draw anywhere". Reveal an ordered construction: place **A at mark 0**, place **B at mark 4**, connect straight. Show intervals 0→1,1→2,2→3,3→4.
  3. **markdown — currently rendered:** "To **make** a 4 cm segment, do not start by guessing a line. Put **A at 0**, mark **B at 4**, and draw one **straight** line between the marks. Four equal spaces make **4 centimeters**."
- **Feedback and recovery:** If learner chooses 1 as first mark: "That leaves the first unit off the construction. We want the length starting from zero." If they select tick 5 for 4 cm: "From 0 to 5 there are five centimeter spaces. Our target has four." If they choose an arbitrary stroke: "A construction needs two correct endpoints and a straight connection." No grades, retries penalty or mastery state.
- **Accessibility:** Expose marks as selectable named controls and a text record "A at 0, B at 4, line straight." The worked result can be read or inspected interval by interval. Suggested future Note after reveal: "Construct: mark 0, mark the target, connect straight."

### Section 2 — Make Three Different Lengths

- **Purpose:** transfer the same procedure while only the _target number_ changes.
- **Current implementation shape:** `LessonSection_Config` with one vertical stack.
- **Ordered Resources:**
  1. **text — existing:** "Choose **3 cm**, **5 cm**, or **7 cm**. Where will you place the second dot if the first dot is at 0? Place the dots, draw the straight connection, then check your result."
  2. **scene — proposed:** [Measured Segment Maker](./scenes/measuredSegmentMaker.scene-spec.md), stage B. First choose a target from {3,5,7}; each new target clears old B and stroke, keeps one ruler with equal 0–10 intervals. Controls are "Set A to 0", "Mark B at n" (n selectable by accessible tick list), "Connect straight", "Check construction", "Back", "Reset". For each target n, the correct constructed segment spans marks **0→n**, precisely **n** centimeter spaces. A ruler may be positioned to a different visual location without changing unit spacing.
  3. **markdown — existing:** "The same ruler can help make different lengths. If we need **5 cm**, our last mark is **5**, because we count **five spaces** after 0. For **7 cm**, our last mark is 7. We should verify the straight segment _after_ we draw it."
- **Feedback:** If target 5 and learner chooses B at 6: "Your segment would span 0 to 6, which is **6 cm**. Move B back one mark to 5." If target 3 and B at 3 but connection uses a visibly bent route: "The endpoints are correct, but the path is not **one straight segment**. Choose 'Connect straight'." For an already correct construction: "Both ends line up and the path is straight. It spans n equal spaces."
- **Access and autonomy:** Learner may try all targets in any order; a button sequence provides exactly the same construction as optional drag. No need to draw with a finger. Nonvisual ledger reports every chosen mark and connection type without giving the answer before checking.

### Section 3 — Find the Two Mistakes

- **Purpose:** distinguish a ruler-origin error from an incorrect drawing path, and explain why both matter.
- **Current implementation shape:** single-column `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — existing:** "Two learners tried to make a **5 cm** segment. One placed A at ruler mark **1** and B at mark **5**. Another placed A at **0** and B at **5** but drew a **bent** line. Did either one make the requested straight 5 cm segment?"
  2. **scene — proposed:** [Measured Segment Maker](./scenes/measuredSegmentMaker.scene-spec.md), stage C, two selectable flawed samples. **Sample 1** has aligned straight ruler marks 1 and 5, so endpoint separation is only **4** centimeter intervals, despite the printed last mark being 5. **Sample 2** has endpoints at marks 0 and 5, but the connecting path goes via an off-line third point, so it is not the straight segment AB. Learner can choose "Fix start", "Fix end", "Straighten path", then replay an accurate construction.
  3. **markdown — existing:** "For a **5 cm straight segment**, both conditions must hold: A at **0** and B at **5**, and a **single straight path** joins A and B. The first sample is only 4 cm between its endpoints. The second is a _bent route_, not a segment."
- **Explanatory feedback:** For sample 1, "Starting at tick 1 skips the first space. Between ticks 1 and 5 there are four intervals." For sample 2, "The curved/bent route touches both points but does not go straight between them." If learner proposes extending a crooked path: "Fix its shape, not just its apparent size." We do not imply nonzero-start construction is mathematically impossible; rather, the prescribed **introductory zero-start method** was not followed.
- **Planned Note:** After diagnosis: "Correct endpoints **and** straight path are both needed."

### Section 4 — Build Six Centimeters Yourself

- **Purpose:** independent transfer of a construction strategy to an unseen target.
- **Current implementation shape:** `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — existing:** "Make a fresh straight segment **6 cm long**. This time the ruler starts without any dots on the drawing. What will you mark, and how will you connect the marks? Try before asking for a hint."
  2. **scene — proposed:** [Measured Segment Maker](./scenes/measuredSegmentMaker.scene-spec.md), stage D. Blank workspace, target 6 cm; learner independently sets A at 0, places B at tick 6, connects straight and checks. If the initial ruler is shifted, "Align zero" moves **the marked origin**, not the physical edge, into the construction start. Expected final state: A 0, B 6, straight segment, **six equal intervals**. Reveal a new optional orientation where the same marks are placed vertically; true model length is preserved.
  3. **markdown — existing:** "We marked 0 and 6 and drew a straight segment between them. That covers six one-centimeter intervals. The number **6 cm** tells us the finished segment's length, not the size of a dot or the thickness of the line."
- **Feedback and flexible routes:** If B=5: "Five spaces, one short; mark the next centimeter line." If B=7: "Seven spaces, one too far." If start at outer plastic edge: "Find the **printed zero**; the blank ruler margin is not a centimeter." For an accepted straight six-interval construction, explain _why_ each condition was satisfied. A "Show first hint" action reveals the need to locate zero **without** drawing the finished line.
- **Unscored external transfer:** With optional physical tools, attempt a 6 cm pencil segment on paper and check with a calibrated ruler. A student without tools gets complete equivalent construction practice inside the Scene.

## CUSTOM SCENE SPECIFICATIONS

- [Measured Segment Maker](./scenes/measuredSegmentMaker.scene-spec.md) — four preset independent prop-free placements; construction and repair semantics, no invented Scene props.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 constructed example: "Set A at 0, set B at the target mark, connect straight."
2. After Section 3 counterexamples: "Correct endpoints and a straight path both matter."

Notes are **future Git-authored recall cues**. Note IDs, storage, event triggers, compilation and scheduling remain unimplemented and cannot be assumed.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The target-6 construction in Section 4 is unscored transfer. Later Assessment Architect work should vary target lengths and starting ruler shifts and separately validate equivalent keyboard/assistive construction evidence; do not infer mastery from one finished diagram. Avoid mixing `measureCentimeters` (read an existing segment) correctness with `drawSegmentCentimeters` (construct a new one).

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Genuine translation into all supported locales of imperative verbs ("mark", "align", "connect straight"), units, numerals, hints, wrong construction feedback, dynamic state logs and proposed Note text. Keep geometric A/B endpoints, tick spacing and numeric increasing direction meaningful in RTL; never mirror the ruler without remapping all state and explanations. Offer keyboard/switch/touch buttons to select numerical marks and choose a straight connection, plus a screen-reader-readable endpoint-and-length ledger; no drag/pen precision, audio, timers or color dependence. WCAG 2.2 AA, focus, 200% text, reduced motion, mobile layouts and complete offline assets/content after download are **requirements**, not claims about existing code.

## PRODUCTION / PLATFORM DEPENDENCIES

The generic Lesson Section currently renders `text`, `markdown` and `scene` Resource blocks; the custom Scene, full localized copy, tests and package distribution **do not exist**. Coding Agent will later verify true locale context and Scene rendering, implement a prop-free root per Section, ensure predictable geometry and test on low-end devices. No runtime Lesson `*.data.ts`, scored Question/Quiz, persistent Note, result analytics or invented contract is included.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and its canonical draw-segment Skill.
- Editor: check that the no-drag construction controls provide the _same_ mathematical outcome as tracing a real line with pencil, within a schematic model.
- The Methodologist Brief is **Draft** and all Scene/content text is provisional.

## HANDOFF

After explicit Methodologist sign-off, screenwriter/editor may finalize the teaching sequence. Scene Designer then implements only from an approved Scene spec; Assessment Architect separately defines assessment if authorized. No source code or mastery logic is part of this batch.
