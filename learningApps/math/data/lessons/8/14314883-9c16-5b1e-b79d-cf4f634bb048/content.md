# Estimate Length, Then Measure — Lesson Content

Status: **Provisional Draft pending Methodologist approval — NOT Approved**
Target Lesson: `learningApps/playground/Data/Lessons/1/estimatingAndCheckingLengths/`
Audience: **Grade 3**, approximately 8–9 years; comfortable with whole-number centimeters through 30 and simple differences
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: make a reasoned centimeter estimate against a consistent 10 cm reference, verify with an accurately aligned ruler, describe the direction and size of an estimate–measurement discrepancy and refine reasoning on new objects.
Target Skills: `estimateLength.data.ts` linked in the Brief; prior centimeter measurement and comparison Skills are prerequisites.
Program dependence: None
Implementation state: purely editorial; no working Scene, accuracy score or persistence.

## INSTRUCTIONAL CONCEPT

**"First make a sensible estimate. Then measure. Learn from the difference."** Many things are awkward to measure immediately, but a known reference helps predict their size. Our fixed **10 cm benchmark strip** acts like one familiar ten-unit piece. We may reasonably say an unknown strip looks a little shorter than twice the reference, then predict a number in centimeters. Only **after** recording the prediction do we use a schematic ruler to reveal the actual whole-centimeter length. A measured result does not make a reasonable estimate "wrong"; it makes it **checkable and improvable**.

A crucial contrast: **estimate** is a justified approximate number, not a random guess; **measurement** is a count of equal standard intervals from correctly aligned zero. Both need the same unit to compare. The model's centimeter intervals are abstract, **not physically calibrated screen pixels**. For a nonvisual learner, pre-reveal descriptions use **coarse comparisons** such as "longer than one benchmark but shorter than two" and never leak the exact measured length.

## LEARNER JOURNEY

1. Learn the reference comparison with a first, almost-one-reference strip. Record a plausible length estimate **before** any ruler appears.
2. Check against a ruler and express how far below or above the actual length the estimate was.
3. Compare different estimates of the **same** measured object, with an explicit unit mismatch trap, and improve a guess after evidence.
4. Transfer independently to a fresh unknown-length strip and explain the discrepancy without a graded threshold.

No requirement to guess an exact number; the important evidence is a **reasoned estimate**, correct tool measurement and interpretation.

## SECTION PLAN

### Section 1 — Use a Known Length as a Clue

- **Purpose:** use a known benchmark to generate an estimate before revealing a measurement.
- **Current shape:** `LessonSection_Config`, one vertical ordered Resource sequence.
- **Ordered Resources:**
  1. **text — currently rendered:** "This short strip is our **10 cm reference**. The mystery strip looks a little longer. Could it be about **11 cm**, **12 cm**, or **15 cm**? Make an estimate, not a perfect guess. What did you compare?"
  2. **scene — Resource type exists, custom model proposed:** [Length Estimate Laboratory](./scenes/lengthEstimateLaboratory.scene-spec.md), stage A. Show fixed reference bar labeled **10 cm** beside an unlabeled mystery bar of exact model length **12 cm** but with **no grid/ticks/endpoint ruler labels** until after estimate. Learner picks an approximate centimeter number (11,12,15 permitted) and a reason choice ("similar to ten; slightly longer", "more than twice ten", "not sure"). Record estimate in **cm** in local unscored state, then press "Measure" to align a ruler at zero and reveal 0→12 as **12 cm**.
  3. **markdown — currently rendered:** "Our reference is **10 cm** long. The mystery strip was a little longer, so a value a little above 10 made sense. The ruler shows **12 cm**. Measuring checks an estimate; it does not turn estimation into a guessing contest."
- **Explanatory feedback:** For 11: "You estimated 11 cm; the ruler says 12 cm. Your estimate is 1 cm **below** the measurement." For 12: "Your estimate and measurement match." For 15: "You estimated 15 cm, 3 cm **above** the measured length. Look again at how much longer it is than the 10 cm reference." No hidden acceptable-range pass/fail, positive/negative numerical error sign confusion, or premature answer reveal.
- **Access:** Meaningful nonvisual comparison says "Mystery is a little longer than one ten-centimeter reference and much shorter than two", not "exactly two intervals longer". Learner may request a coarse hint before estimating, with the same benchmark language.

### Section 2 — Compare the Numbers Using the Same Unit

- **Purpose:** explain measured-versus-estimated differences with consistent centimeter units.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — available:** "A second mystery strip looks longer than **10 cm**, but shorter than **20 cm** (two reference strips). I think it might be **15 cm**. Let's check with the ruler."
  2. **scene — proposed:** [Length Estimate Laboratory](./scenes/lengthEstimateLaboratory.scene-spec.md), stage B. True fixed model length **16 cm**, reference length **10 cm**. Learner chooses an estimate in cm (e.g. 14,15,16,18) and then reveals ruler aligned at 0. Worked demonstration specifically selects **15 cm**, reveals **16 cm** and highlights that 16 is **1 greater than 15**. Display "Estimated 15 cm; measured 16 cm; estimate was **1 cm below**." An independent alternative chosen by learner produces correct feedback based on chosen number, not a predetermined "correct estimate".
  3. **markdown — available:** "**15 cm** was our estimate. **16 cm** is what the ruler showed. The estimate is **1 cm less** than the measured length. Both values are in **centimeters**, so they can be compared directly."
- **Feedback:** If learner says "one too long": "Look at which number is larger: 16 measured is larger than 15 estimated, so our estimate was **below**." If they omit `cm`: "A difference in a measurement needs a unit too. Here it is one **centimeter**." No forced subtraction notation, but give optional 16 − 15 = 1 in readable form.
- **Access:** Report values in a structured comparison table or verbal sentence, not color-only bars. The bar is fixed while the ruler appears, so measurement never visually changes the mystery length.
- **Planned Note:** After reveal: "Compare estimate and measurement in the **same unit**."

### Section 3 — Two Estimates, One Object

- **Purpose:** distinguish a reasoned approximate estimate from an arbitrary number and explain discrepancies in either direction.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — available:** "Two people estimated the **same** strip. One said **20 cm**; another said **25 cm**. The ruler shows **18 cm**. Which estimate was nearer? How much higher was each?"
  2. **scene — proposed:** [Length Estimate Laboratory](./scenes/lengthEstimateLaboratory.scene-spec.md), stage C; true fixed length **18 cm**, reference 10 cm. Before revealing ruler, child sees two recorded estimates 20 and 25 cm as separate markers. After "Measure", show: 20 vs 18 → **2 cm above**; 25 vs 18 → **7 cm above**. The strip remains unchanged. Next show misleading comparison "20" with **no unit** vs "18 cm"; invite choice "Can we compare directly?" and explain unit requirement.
  3. **markdown — available:** "The 20 cm estimate is **2 cm higher**, and the 25 cm estimate is **7 cm higher** than the same measured length. Both missed the exact number, but the first was closer. Saying only '20' without a unit does not say how long something is."
- **Feedback:** If child claims strip shrank from 25 to 18: "The strip never changed. **25** was a prediction, not a measured size." If they call 25 a 'wrong measurement': "It was an estimate. We compare it to the later measurement and explain the difference." Clarify that a **wild estimate** can be less useful without assigning points or "good enough" threshold.
- **Planned Note:** "An estimate can be above or below a measured length; the **difference** tells how far."

### Section 4 — Make an Estimate You Can Defend

- **Purpose:** independent transfer on an unseen fixed length, with reflection rather than scoring.
- **Current shape:** one-column `LessonSection_Config`.
- **Ordered Resources:**
  1. **text — available:** "The reference strip is **10 cm**. A new mystery strip looks a little more than twice as long. First choose your estimate **in cm** and tell what you noticed. Only then measure it."
  2. **scene — proposed:** [Length Estimate Laboratory](./scenes/lengthEstimateLaboratory.scene-spec.md), stage D. True model length **23 cm**, concealed until measurement. Before reveal, offer coarse size comparison **between 20 and 25 cm** without exact interval boundary labels. Learner selects any whole-centimeter estimate **18–28**, says/reference-selects a reason and commits it. Press "Measure" to reveal a ruler scale 0–25 (or consistent paged 0–30) and the end at **23 cm**. Feedback computed from estimate `e`: when e<23 → "**23−e cm below**"; e=23 → "matches"; e>23 → "**e−23 cm above**". Show the exact intervals and final number to all modes **after** the estimate.
  3. **markdown — available:** "A checkable estimate has **a reference, a unit and a reason**. The ruler found **23 cm**. If you chose **22 cm**, that is **1 cm below**; if you chose **24 cm**, it is **1 cm above**. We can keep the useful benchmark and adjust our next estimate."
- **Feedback and recovery:** For 20: "20 cm is 3 cm below 23. You recognized two reference strips; this one was another 3 cm longer." For 28: "28 cm is 5 cm above 23. Compare its size again with two 10 cm references and a partial extra." For 23: "Your estimate matched, but it is still an _estimate_ until checked with a ruler." If no reason chosen, invite reflection before revealing but never lock the learner permanently.
- **Offline practical transfer:** An optional ruler check on a real book edge may be proposed, but users without a ruler must have exactly the same conceptual estimation and checking interaction in the self-contained Scene.

## CUSTOM SCENE SPECIFICATIONS

- [Length Estimate Laboratory](./scenes/lengthEstimateLaboratory.scene-spec.md) — four independent self-contained prop-free placements, with truthful pre-reveal information, no offscreen answer leak and mathematically exact discrepancy feedback.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 benchmark comparison: "Estimate from a familiar length, then check by measuring."
2. After Section 2 interval check: "Estimate and measurement must use the same unit."
3. After Section 3 two estimates: "The difference shows how far above or below the measurement an estimate is."

These are planned brief recall Notes; there are **no verified Note events, IDs, unlocked-state storage or spaced-review scheduler** in this authoring batch.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The unseen 23 cm case is **unscored**, with descriptive feedback for the chosen prediction and an explicit reference-based explanation. A future Assessment Architect should distinguish quality of justification, instrument reading and interpretation of numeric discrepancies; do not grade an arbitrary proximity threshold without an approved rubric. Practice today is not independently validated mastery; spaced retrieval needs a separate approved system.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Genuine translations for all supported locales, including `cm` unit labels, comparative terms ("above/below", "closer/farther"), alternative reasons, interactive feedback and numerals/plurals. Use semantic LTR/RTL layouts, but never change centimeter order or silently reverse the meaning of 'below' a measurement. Screen readers have a **pre-measurement coarse benchmark description** sufficient for estimating yet not exposing the exact value; after the chosen estimate, they can read a precise ruler interval log and a numerical discrepancy sentence. Keyboard/switch controls choose estimates and reason categories; no pointer measurement, touch-precision, color, audio or timed choice required. Maintain focus/contrast, reduced motion, scalable charts, WCAG 2.2 AA design and equivalence on low-end/offline devices after locale/code downloads. The schematic must never claim that its pixels equal real cm.

## PRODUCTION / PLATFORM DEPENDENCIES

Existing generic Lesson Section supports `text`, `markdown`, `scene` blocks. Length Estimate Laboratory is **proposed**, not implemented. Future engineering must verify locale context and build prop-free Scene entry points, unit-valid numeric logic, pre/post-reveal descriptions, tests, mobile and offline packaging. There is no runtime `Lesson`, Question/Quiz, scoring, progress event, analytics or Note persistence in this PR.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md), canonical `estimateLength` Skill and prerequisites linked there.
- Editor: approve the Grade 3 treatment of difference size and above/below wording, without an unapproved "correct estimate" scoring band.
- Editor: verify nonvisual pre-reveal comparison does not make the estimate trivial but still provides comparable reasoning affordances.
- Content/Scenes remain **provisional Drafts** until formal Methodologist review.

## HANDOFF

Methodologist reviews benchmark, numerical depth and intended reasoning. Screenwriter/editor validates every prompt and feedback example before approval. Coding Agent implements from approved Scene spec; Assessment Architect designs optional future scored tasks separately.
