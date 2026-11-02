# Measure Straight Segments in Centimeters — Lesson Content

Status: **Provisional Draft — pending Methodologist approval; not an approved lesson.**
Target Lesson: `learningApps/playground/Data/Lessons/1/measuringSegmentsInCentimeters/`
Audience: **Grade 2** (approximately 7–8), numerate to ten, mixed access needs
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Target Skills: `measureCentimeters.data.ts` linked in the Brief; `useRuler.data.ts` and equal-unit counting prerequisite
Program dependence: None
Implementation state: editorial proposal; no runtime Lesson, Scene or measuring instrumentation exists.

## INSTRUCTIONAL CONCEPT

"**Count the spaces, start at zero, say the unit.**" The learner now uses the ruler correctly to find the length of an **existing** straight segment. The endpoint labels are not the answer by themselves: they represent a scale with **equal centimeter intervals**. When the ruler's 0 aligns with one endpoint, a segment reaching printed mark 4 spans 0→1, 1→2, 2→3, 3→4, hence **4 cm**.

Learners must not infer that a 4-unit diagram on a phone measures four _physical_ centimeters; the app is an exact **schematic model** with declared units, not an instrument calibrated to screen size. Physical measurement can be optional transfer with a real ruler.

## LEARNER JOURNEY

1. Predict a 4 cm result from a zero-aligned ruler and verify the four intervals.
2. Align a shifted ruler on a new, pre-drawn segment and read its **whole-centimeter** endpoint.
3. Diagnose a false "6 cm" report from a ruler that starts at mark 1, and distinguish **ticks** from **intervals**.
4. Independently measure a different straight segment, report its number and unit, and justify the method.

No segment construction; drawing a new segment is the separate Skill `drawSegmentCentimeters`. No counting pixels, scored Quiz, implicit mastery or time pressure.

## SECTION PLAN

### Section 1 — Four Spaces, Not Five Marks

- **Purpose:** Link standard unit intervals to a correct number-with-unit result.
- **Section contract:** `LessonSection_Config`, one vertical sequence.
- **Ordered blocks:**
  1. **text — existing:** "The first dot is beside **0**. The other dot is beside **4**. How many _spaces_ of one centimeter fit between them? Let's count, then say a length with its unit."
  2. **scene — existing Resource type; custom proposed:** [Centimeter Segment Bench](./scenes/centimeterSegmentBench.scene-spec.md), stage A: fixed pre-drawn segment with model length **4 cm**, 0 mark exactly at first endpoint; second endpoint at 4. Learner reveals 0→1, 1→2, 2→3, 3→4 interval brackets separately and selects "4 cm", "5 cm", or "4 (no unit)".
  3. **markdown — existing:** "The segment has **4 equal centimeter spaces**. The marks are 0, 1, 2, 3, 4—**five printed labels, but four intervals**. We say **4 centimeters**, written **4 cm**."
- **Feedback:** For 5 cm: "You counted both end marks. Count the gaps **between** them." For bare 4: "The number is correct, but a measurement also needs its unit." For 4 cm: "Yes: four one-centimeter intervals, from 0 to 4."
- **Access:** All intervals described as "interval 1: 0 to 1" etc. Give an auditory-readable and textual equivalent; never require selecting an SVG region.
- **Proposed Note:** "A length counts the equal spaces between marks."

### Section 2 — Line Up First, Read Second

- **Purpose:** Use a virtual ruler to measure an unfamiliar straight segment of integral centimeter length.
- **Section contract:** `LessonSection_Config`, one vertical sequence.
- **Ordered blocks:**
  1. **markdown — existing:** "Before reading: find the segment's starting dot, put the ruler's **0** beside it, and follow the straight line with the scale. Then read where the other dot lands."
  2. **scene — proposed [Centimeter Segment Bench](./scenes/centimeterSegmentBench.scene-spec.md):** stage B; preset segment **7 cm** long, ruler initially shifted so mark 2 is at the first endpoint. Use discrete actions "Move ruler right 1 mark" twice or "Align zero" (equivalent actions); after alignment, second endpoint maps to mark **7**, and learner counts 7 equal unit spaces. Response "7 cm" with optional "Show each space".
  3. **text — existing:** "When the **0** met the first dot, the other dot met **7**. That means **7 centimeters** from one endpoint to the other."
- **Misconception feedback:** If learner selects the number at the far end _before_ alignment: "We haven't started at 0. Move the scale first, then read." Never silently show an answer from a misaligned ruler as if valid.
- **Transfer within Section:** A second preset segment **3 cm** long, correct alignment, endpoint mark 3. Length stays constant if the diagram moves vertically or line thickness changes.

### Section 3 — Spot the False Measure

- **Purpose:** Diagnose and repair a misleading ruler position; count intervals instead of marks.
- **Section contract:** `LessonSection_Config`, one vertical sequence.
- **Ordered blocks:**
  1. **text — existing:** "Someone says this segment is **6 cm** because its far dot is by the ruler's 6. But the first dot is by **1**! What should we fix?"
  2. **scene — proposed [Centimeter Segment Bench](./scenes/centimeterSegmentBench.scene-spec.md):** stage C. Same physical schematic segment spans exactly **five** centimeter intervals, but displayed starting at ruler mark **1**, ending at **6**. Learner chooses "Move 0 to first dot" / "Count 1, 2, 3, 4, 5, 6 as six spaces" / "Keep 6". Selecting the fix repositions the ruler, after which endpoints align to **0 and 5** and result is **5 cm**. The shape does not change when the ruler moves.
  3. **markdown — existing:** "The number **6** was a label at the far end, not the segment's length with this ruler placement. We moved the **0** mark to the starting dot. Now the other end is at **5**: the segment is **5 cm**."
- **Feedback:** For choosing 6: "The ruler began at 1, not 0; the number at the end is misleading." For 5: "Good reasoning, but show your setup: align 0 and count the spaces." Never require arithmetic 6 − 1; this is a **diagnostic example**, not instruction in off-zero subtraction.
- **Proposed Note:** "Check that the ruler starts at 0 before reading the number."

### Section 4 — Your Own Measurement

- **Purpose:** Independent transfer, articulate the method and unit.
- **Section contract:** `LessonSection_Config`, one vertical sequence.
- **Ordered blocks:**
  1. **text — existing:** "Here's a new segment. Its first dot is not at the ruler's zero yet. Without asking for a hint, decide what to move, then tell its length **with units**."
  2. **scene — proposed [Centimeter Segment Bench](./scenes/centimeterSegmentBench.scene-spec.md):** stage D; unseen **6 cm** segment, ruler initially angled/offset. Discrete "Straighten scale" then "Align 0", followed by "Read endpoint" or "Count spaces", then select/write "6 cm" using accessible fixed choices; wrong attempts give explanation without scoring. After correct setup, first endpoint at 0, second at 6.
  3. **markdown — existing:** "We straightened the ruler, lined **0** with the first dot, and found **6 equal centimeter spaces** to the second dot. Our answer is **6 cm**. If we count marks instead, we would get seven, which is not a length."
- **Feedback:** If a learner answers 7 cm: "There are seven printed numbers from 0 to 6, but only six spaces." If they read while misaligned: "Move the zero first; then read the other endpoint." If the learner requires hint, reveal only the first correction, not the final answer.
- **Real-world extension:** If a real ruler is available, measure a straight-edged object with a whole-centimeter length if possible; say a real object may stop between marks. This extension is **not required for equivalent online/offline learning** and does not introduce fractional measurement.

## CUSTOM SCENE SPECIFICATIONS

- [Centimeter Segment Bench](./scenes/centimeterSegmentBench.scene-spec.md) — proposed deterministic prop-free Scene, with accessible align, count and error-repair interactions.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. "Count centimeter spaces, not printed tick labels." Proposed after Section 1.
2. "Match zero to one endpoint before reading the other." Proposed after Section 3 misalignment reveal.

Future Note content and unlock states are **planned only**; do not invent IDs, events, analytics or persistence.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The Section 4 transfer is unscored and independently solvable with accessible controls. An Assessment Architect may create later Questions asking for length and reason, including misleading ruler positions, and must validate alternative answer modalities and scoring separately. One completion does not establish mastery.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate every number-and-unit phrase, feedback sentence, instruction and accessible label for each configured locale; use genuine plural forms for "centimeter" and correct locale spacing in displayed units. Use semantic RTL that preserves the ruler's **chosen zero-to-increasing-number orientation** and exact interval relationships; not mechanical vector flipping. Every state offers textual endpoint-mark pairs and interval counts, keyboard/switch accessible alignment choices, clear focus and state changes, reduced-motion instant results and large mobile controls. No sound, drag, color distinction, internet request or physically calibrated screen is necessary. Keep the full unit-comparison experience offline once downloaded.

## PRODUCTION / PLATFORM DEPENDENCIES

- Existing Resource types/rendering: `text`, `markdown`, `scene` in generic Section.
- Proposed: custom accurate ruler bench, localization dictionaries, prop-free Scene instances, accessible state-ledger controls and later engineering tests.
- No real-life ruler calibration, runtime Lesson registration, Question, Quiz, scoring, Note API or state persistence is implemented or claimed.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), canonical `measureCentimeters` code, existing `useRuler` prerequisite and Studio Scene contract.
- Editor: verify that the 1→6 nonzero-start diagnostic is clear without encouraging "subtract numbers on the ruler" as the taught beginner method.
- The Brief remains **Draft**, so all content is **provisional**.

## HANDOFF

Methodologist confirms outcomes/depth; editor reviews numeric examples, clarity and nonvisual equivalence; Scene Designer builds from approved spec later. Assessment Architect takes scoring separately. No production code or tests are delivered here.
