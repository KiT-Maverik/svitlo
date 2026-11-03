# Adding Nothing Changes Nothing — Content

Status: Draft — provisional Screenwriter draft pending Methodologist Brief approval
Target Lesson: learningApps/playground/Data/Lessons/1/additionZero/
Primary audience: **Grade 1**, with prior knowledge: Know zero represents no objects, count a set to 10, and understand adding objects means combining contributions. Basic + and = recognition with text support.
Methodologist source: [Methodologist Brief](./methodologist-brief.md) — Draft, not approved
Target Skill: `addZero.data.ts` directly linked in the Brief, canonical definition unchanged
Program dependence: None

## INSTRUCTIONAL CONCEPT

Show that zero contributes no objects to an addition, so the starting amount remains. Treat a+0=a and 0+a=a as the same value with different positions for the zero addend; contrast adding zero with starting from zero, not with subtraction.

Nonnegative whole numbers 0–20; initial examples 6+0=6, 0+6=6, contrast 6+2=8 and boundary 0+0=0, transfer 9+0=9 and 0+9=9. No generalized discussion of different number systems.

Learners build and examine exact numerical relationships before being told a rule. Every incorrect candidate is used to reveal a specific mismatch; hints and the full explanation are never locked by a score.

## LEARNER JOURNEY

1. **A Tray of Six and an Empty Tray.** Show six countable counters in one labeled tray and an empty tray labeled 0. Learner counts both, may reveal '6 from first, 0 from second' and sees six total.
2. **The Empty Tray Comes First.** Learner changes from 6+0 to 0+6, with exactly six objects still present. Accessible 'first tray zero; second six; total six' counters.
3. **No Contribution or Two More?.** Two independent trials begin with six: 6+0=6 and 6+2=8. Learner picks the added amount and sees exact resulting count without modifying the other trial.
4. **Try Nine and the Boundary.** Offer three independent cases, predict/reveal totals nine, nine and zero, with explicit text ledger and optional counter pictures.

## SECTION PLAN

### Section 1 — A Tray of Six and an Empty Tray

**Purpose and outcome:** Explain that 6+0=6 using six objects and an empty contribution.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “One tray has six counters. The other is empty. How many in both trays together?”
2. **scene (generic renderer supported; custom implementation proposed):** [Zero Addition Explorer](./scenes/zeroAdditionExplorer.scene-spec.md), Section 1 entry. Show six countable counters in one labeled tray and an empty tray labeled 0. Learner counts both, may reveal '6 from first, 0 from second' and sees six total.
3. **markdown (supported):** “We combined six counters with no counters. None were added to the six, so there are still six.” Display the mathematical statement **6 + 0 = 6** as readable symbolic text.

**Learner action and interaction:** Show six countable counters in one labeled tray and an empty tray labeled 0. Learner counts both, may reveal '6 from first, 0 from second' and sees six total. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** If zero chosen as sum, show the original six still present; if seven chosen, show no extra object in the empty tray.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Keep the model available and move to the next contrast only after the current example has been fully explained.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** “Adding zero keeps the total unchanged.” after the whole demonstration and explanation are available (planned, not wired).

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

### Section 2 — The Empty Tray Comes First

**Purpose and outcome:** Explain that 0+6=6 gives the same total despite different zero position.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “If the empty tray is written first, does the answer change?”
2. **scene (generic renderer supported; custom implementation proposed):** [Zero Addition Explorer](./scenes/zeroAdditionExplorer.scene-spec.md), Section 2 entry. Learner changes from 6+0 to 0+6, with exactly six objects still present. Accessible 'first tray zero; second six; total six' counters.
3. **markdown (supported):** “The first addend is zero, but the second has six. Together they still make six. The place of zero doesn't make the counters disappear.” Display the mathematical statement **0 + 6 = 6** as readable symbolic text.

**Learner action and interaction:** Learner changes from 6+0 to 0+6, with exactly six objects still present. Accessible 'first tray zero; second six; total six' counters. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** Choosing zero gets a concrete group-by-group readout; don't presume the whole commutativity theorem is already learned.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Keep the model available and move to the next contrast only after the current example has been fully explained.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** “Zero can be either addend: a+0 and 0+a both equal a.” after the whole demonstration and explanation are available (planned, not wired).

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

### Section 3 — No Contribution or Two More?

**Purpose and outcome:** Distinguish an empty addend from an empty total and from an actual new contribution.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “What happens when we add zero to six? What if we add two instead?”
2. **scene (generic renderer supported; custom implementation proposed):** [Zero Addition Explorer](./scenes/zeroAdditionExplorer.scene-spec.md), Section 3 entry. Two independent trials begin with six: 6+0=6 and 6+2=8. Learner picks the added amount and sees exact resulting count without modifying the other trial.
3. **markdown (supported):** “Zero adds no objects. Two adds two objects. The difference is the amount contributed, not a magical rule changing all totals to zero.” Display the mathematical statement **6 + 0 = 6; 6 + 2 = 8** as readable symbolic text.

**Learner action and interaction:** Two independent trials begin with six: 6+0=6 and 6+2=8. Learner picks the added amount and sees exact resulting count without modifying the other trial. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** If the learner predicts eight for the zero case, display no arrivals; if six for +2, show the two distinct added counters.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Keep the model available and move to the next contrast only after the current example has been fully explained.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** “Adding zero keeps the total unchanged.” after the whole demonstration and explanation are available (planned, not wired).

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

### Section 4 — Try Nine and the Boundary

**Purpose and outcome:** Predict the sum for a fresh number (9+0 and 0+9) and verify without compulsory counting.

**Ordered resource blocks (one vertical LessonSection_Config):**

1. **text (supported):** “What is nine plus zero? What about zero plus nine? What about zero plus zero?”
2. **scene (generic renderer supported; custom implementation proposed):** [Zero Addition Explorer](./scenes/zeroAdditionExplorer.scene-spec.md), Section 4 entry. Offer three independent cases, predict/reveal totals nine, nine and zero, with explicit text ledger and optional counter pictures.
3. **markdown (supported):** “A number plus zero stays the number, whichever side zero is on. Zero plus zero is zero because neither addend contributes any objects.” Display the mathematical statement **9 + 0 = 9; 0 + 9 = 9; 0 + 0 = 0** as readable symbolic text.

**Learner action and interaction:** Offer three independent cases, predict/reveal totals nine, nine and zero, with explicit text ledger and optional counter pictures. Prediction is optional, with non-scored feedback; "Show each step," "Read the quantities," and "Try again" remain available regardless of prediction.

**Specific misconception response:** Mistaking 0+9 for zero triggers a 'second addend nine' readout; 0+0=9 is rejected by both empty collections.

**Visible mathematical model:** every original object, added/combined quantity and total is named. The accessible ordered list must carry the same numerical facts as the diagram. The initial state can be revisited without changing other Sections.

**Transition:** Offer a short voluntary explanation of the numerical relationship; end without a scored completion condition.

**Accessibility and localization:** Full translated control/feedback strings, accessible labels for each group and numeric state, RTL-safe equations, keyboard/touch/switch controls, visible focus, reduced-motion and offline equivalence.

**Proposed unlocked Note:** “Zero can be either addend: a+0 and 0+a both equal a.” after the whole demonstration and explanation are available (planned, not wired).

**Implementation dependencies:** New prop-free Scene entry remains a proposal; no assessed Question, new Skill or invented runtime event.

## CUSTOM SCENE SPECIFICATIONS

- [Zero Addition Explorer](./scenes/zeroAdditionExplorer.scene-spec.md): four distinct self-contained prop-free Scene placements, separately initialized in Sections 1–4. No public `mode` prop or additional Resource_Config field is assumed.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. “Adding zero keeps the total unchanged.” — proposed when the relevant conceptual demonstration has been experienced and explained.
2. “Zero can be either addend: a+0 and 0+a both equal a.” — proposed when the relevant conceptual demonstration has been experienced and explained.

Notes and unlock events are planned, not wired. Do not claim personal persistence, an offline revision sheet or spaced-repetition scheduling. A Note reveal is not mastery evidence.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Offer three independent cases, predict/reveal totals nine, nine and zero, with explicit text ledger and optional counter pictures. Learner predictions are formative; Assessment Architect must independently design valid, scored Question_Config items, Skill attribution, hints/retry thresholds and mastery criteria. These illustrative answer choices are not ready-to-ship Quiz data. The current Question adapter's select-one support is not a substitute for implementing custom Scenes.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate all child-facing text, mathematical terminology, status announcements, Notes and accessible controls into the complete supported locale set with no silent English fallback. Equivalent ordered text/tables must let learners inspect and operate each object-count and equation state without sight, drag or sound. Maintain semantic LTR/RTL operand/number order; keyboard/touch/switch control, WCAG 2.2 AA, large targets, focus, reduced motion, zoom/mobile compatibility. Run all deterministic calculations and feedback offline after a full chosen-locale download; do not invent remote services.

## PRODUCTION / PLATFORM DEPENDENCIES

The generic LessonSection renderer supports `text`, `markdown`, `scene`, and its Lesson Section contract orders resources vertically. Zero Addition Explorer is **proposed, not implemented**, with separate Section entry components/localized context and own tests required after approval. No image/audio/video/code generic blocks or YouTube integration used. Notes, review scheduling and download/sync facilities must not be represented as already implemented. No runtime Lesson Config, Quiz, Question or scoring artifacts created.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Methodologist Brief](./methodologist-brief.md), awaiting explicit editor approval.
- Canonical `addZero.data.ts` linked from the Brief; the shared generated taxonomy is coordinated separately.
- [Create Lesson Content Skill](../../../../../../studio/skills/lesson-workflow/create-lesson-content.skill.md).
- Keep empty trays perceptible in screen-reader mode: an empty collection needs a real textual description, not invisible graphic content.

## HANDOFF

This is one **provisional Draft** Content document with the separately reviewable Draft Scene spec. Editor first approves the Methodologist Brief, then evaluates Content and Scene. Scene Designer, Coding Agent and Assessment Architect proceed only with separate authorization. Do not rewrite canon Skills, create scored Questions, or change unrelated Lessons.
