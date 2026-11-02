# Length Estimate Laboratory — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson: [Estimate Length, Then Measure](../content.md), Sections 1–4
Methodologist objectives: [Draft Brief](../methodologist-brief.md): estimate length from a benchmark, accurately check by measuring, and interpret discrepancy in the **same unit**. No additional Skill or scoring criterion is introduced.

## LEARNER PURPOSE AND CONCEPT

A known **10 cm benchmark** gives children a reason to suggest a length **before** measuring. They must compare, choose a plausible approximate number, then independently check with a ruler and explain whether the estimate was high, low or equal. The active learning loop is **predict → commit a reason → reveal measured evidence → interpret and refine**; it is not a competition for the closest number.

Learner voice: "**I used a length I know, made an estimate in centimeters, then checked what the ruler actually says. The difference helps me improve.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- All model lengths are fixed whole numbers in **centimeters**. The reference strip is **10 cm** in the schematic numerical model. Stage target actual lengths: A=**12 cm**, B=**16 cm**, C=**18 cm**, D=**23 cm**. A separate ruler has modeled centimeter ticks 0 to **at least 25/30**, equally spaced.
- **Before** an estimate is chosen and explicitly confirmed (stage A, B, D), the mystery strip's exact value, scale tick endpoint, numeric length, computed difference and any answer-specific aria text are **not presented to the learner**. No developer-tool security is promised; hiding values from the console is a runtime engineering concern, not a solved protection mechanism.
- Pre-reveal modes display a known-length **10 cm reference** and a mystery strip drawn at internally consistent proportional scale **without tick divisions**. Nonvisual users receive a **coarse relative comparison** adequate to reason ("a little longer than one reference"; "between one and two"; "a little more than two, less than two and a half"), without exact lengths.
- An **estimate** is a plausible approximate numerical claim expressed with a unit and reason; the Scene records it locally for the learning interaction, not persistently or as mastery evidence. The measured value is obtained by correctly aligning zero and counting unit intervals. Do not call a predicted number a measured result.
- Discrepancy in **centimeters** equals **|estimate − measured|**. Direction is **below** if estimate is smaller; **above** if estimate is larger; **equal** if the same. Never infer that the object physically shrank or grew when prediction differs. Same unit is mandatory for direct numeric comparison.
- No hidden pass threshold: an estimate that differs from measurement can still be a reasoned estimate. Use quality of comparison and error explanation as formative feedback, not a grade or arbitrary accepted band.
- Screen pixels, SVG units, zoom, physical display DPI are **not calibrated centimeters**; all comparisons are schematic and proportionally consistent within one display. Do not claim real-world distance measurements through screen size.
- This Lesson is Grade 3, whole centimeters between roughly 8 and 30 only. No millimeters, meters, decimals/fractions, percent error or statistics.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### Placement A: A Little Longer Than Ten (Section 1)

1. Show known **10 cm reference strip** with label and an **unlabeled 12 cm target strip**, proportionally a little longer, no ruler/ticks on target.
2. Prompt: "Is the mystery around 11, 12 or 15 centimeters? Choose **an estimate** and a reason." Coarse nonvisual description: "A little longer than one 10cm reference, far shorter than two."
3. Estimate choices **11/12/15 cm**. Reason choices "Just above 10", "More than 20", "I am unsure" (latter asks for a gentle hint). Any selection records an **estimate**, not an outcome. A "Confirm my estimate" action fixes it for this reveal without scoring; "Edit estimate" remains possible before reveal.
4. On deliberate "Measure", display schematic correctly aligned ruler 0…15 (at least), reveal endpoint mark **12**, and count the **twelve** equal unit intervals as requested. State: "Measured 12 cm".
5. Feedback exact: 11 → estimate **1 cm below**; 12 → **matches**; 15 → **3 cm above**. For reason "more than 20": "Our strip looked much shorter than two 10 cm pieces; check your benchmark before measuring."
6. No hidden exact length in pre-reveal accessible strings, visually displayed marks, cursor labels or image descriptions; nonvisual and visual learners both estimate without the ruler.

### Placement B: Fifteen Versus Sixteen (Section 2)

1. Present reference 10 cm and unknown target **16 cm**, no target ruler. Coarse description "Longer than one 10 cm reference, shorter than two." Learner may choose estimate 14/15/16/18 or another simple integer within an accessible bounded range if engineer approves; **worked example uses 15 cm**.
2. "Confirm estimate" then "Reveal ruler" shows zero-aligned endpoint at **16 cm**, unit spaces 0→1…15→16, true length unchanged.
3. Worked feedback: e=15, actual=16 ⇒ measured is one greater, so "**1 cm below**". For e=18, result **2 cm above**; for e=16, it **matches**. Every chosen estimate is labeled an estimate even if exact.
4. Ask "Was your estimate above, below, or equal to the measured number?" Reasoned feedback: 15 below 16; both values measured in **cm** so comparison legitimate. The same centimeter unit appears on benchmark, estimate, measurement and difference.
5. Reset returns to unrevealed fixed length 16, with no stored choice or previous stage state.

### Placement C: Two Estimates of One Fixed Strip (Section 3)

1. Display the **same fixed target of 18 cm**, reference 10 cm, with already declared estimates **20 cm** and **25 cm**; these are _given examples_, not the learner's hidden initial guess.
2. After "Measure", show 0→18 from a ruler and exact comparison:
   - **20 cm estimate** vs 18 measured ⇒ **2 cm above**.
   - **25 cm estimate** vs 18 measured ⇒ **7 cm above**.
3. Ask "Which estimate is closer?" Answer **20 cm** because its difference 2 is less than 7. Explain comparison regardless of color or graphic marker positions.
4. Show "20" **without a unit** against "18 cm" in a second illustrative card and ask "Is the comparison complete?" Explain no: a length needs an explicit unit. Do not incorrectly assert that the bare number 20 is a known centimeter estimate unless explicitly supplied.
5. Feedback for "object got shorter": "The strip stayed **18 cm**. 20 and 25 were guesses; they were never the object's measured lengths." Offer a one-step review of reference-to-target reasoning.
6. This placement doesn't claim any learner prediction is "wrong" as a scored result; its purpose is to interpret relative discrepancy sizes.

### Placement D: New Strip, Reason First (Section 4)

1. New **23 cm** fixed target strip, no visible unit grid/tick endpoint. Show reference **10 cm**; comparative cue "A little more than two references, but less than two and a half" (between **20 and 25 cm**, not an exact value). Provide the same coarse nonvisual cue without exposing 23.
2. Learner selects an integer estimate **e ∈ {18,19,…,28}** via accessible stepper/select plus a reason e.g. "just above 20" / "near two and a half reference strips" / "unsure; show a clue". Never require a typed paragraph.
3. "Confirm my estimate" then deliberately "Check with ruler" reveals a correctly zero-aligned scale 0…25 or 0…30, with endpoint **23**. Record exact measured "**23 cm**".
4. Feedback calculated for any allowed e: if **e < 23**, show "**23−e cm below**"; if **e > 23**, show "**e−23 cm above**"; if equal, "**matches**". Specific examples: e=20 ⇒ **3 cm below**; e=22 ⇒ **1 cm below**; e=24 ⇒ **1 cm above**; e=28 ⇒ **5 cm above**. Explain the difference through the fixed 10 cm benchmark after reveal.
5. A learner may say "the estimate was far too large for this reference", compare two 10 cm spans to the target and revise their next future estimate. They may retry but no grade or hidden performance label is stored. An independent new estimate after a reset is always a new _practice_ event, not spaced scheduling.
6. Keep everything locally deterministic, including all feedback and no scoring state. A physical ruler is an optional outside-the-Scene extension and not required.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** fixed 10 cm reference strip, fixed but pre-reveal unlabeled target strip, optional proportional length-comparison brackets, estimate selection control (integer centimeters), reason choices, explicit "Confirm estimate" / "Reveal measurement", schematic ruler/tick intervals, measured result with unit, difference sentence and reflect/retry/reset controls.
- **State:** per placement fixed internal reference and target length, learner estimate (nullable), chosen reason, confirmation status, ruler reveal status, possibly selected interval for inspection and feedback. All UI localization must come from actual verified context, **not** public props.
- **Invariant:** mystery strip's underlying length NEVER changes when measured or resized; before reveal no exact target value leaked in learner-perceivable text/UI; ruler ticks equal and zero-aligned after reveal; difference magnitude and direction computed correctly using _the same unit_.
- **Reason checks:** show explanatory commentary ("estimate not informed by reference") without treating guesses as pass/fail. If estimate omitted, pressing "Measure" requests a provisional estimate and a reason **or offers an explicit 'show anyway' route for accessibility**; avoid permanently blocking learning.
- **No public props:** Section-specific Scene roots must each be self-contained and **prop-free**. They can share private model functions but may not require invented `targetLength`, `language`, `mode`, `onAnswered` or learner-state event props.
- **No persistence/quiz:** chosen local estimate is a transient instructional variable. No recorded results, mastery validation, scoring, Note events or external network dependency.

## VISUAL / AUDIO / MEDIA DIRECTION

Use a stable, clean SVG strip comparison showing the known 10cm reference; the mystery target is proportionally drawn but **not pre-divided into one-centimeter marks**. Under "Reveal measurement", an evenly marked schematic ruler appears; zero aligns with target start, endpoint at exact integer tick. Label intervals and numerical comparisons in text as well as visual brackets. If device width forces proportional scaling, both reference and target scale by **the same transform** to preserve relative lengths. Large text, no decorative motion; reveal animation optional and bypassed by reduced-motion mode. Do not request or imply external image/video or hardware calibration.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Translate all unit-bearing values, comparative cues, choice labels, numeral/plural display, messages, reflection sentences, ruler descriptions and Note text genuinely for all supported locales. Use suitable localized grammar for 1/2/3+ centimeters and avoid idioms where "above/below" might be mistaken for vertical placement; pair with "greater/less than the measured value".
- **RTL:** UI text/control order may mirror, but the ruler's chosen numeric orientation (0 increasing consistently) and the reference/target length relation **must not** reverse. Avoid whole SVG mirroring that changes mapped tick labels.
- **Pre-reveal nonvisual equity:** a screen reader gets the same _coarse_ relational clue as visual learners, but not the target's exact numeric value; no exact endpoint mark in aria labels until measured. After reveal, provide an exhaustive interval-based text explanation if requested. The optional visual ruler isn't a secret answer channel in another modality.
- Keyboard/switch accessible integer stepper and reason buttons, visible focus, ample touch targets, no precision pointer measuring, no time limit, no mandatory speech, no color-only encoding, controlled announcements and reduced motion.
- Must meet WCAG 2.2 AA intent and preserve full learning on mobile, low-end or offline after successful package/locale download. These are **implementation requirements** awaiting verification, not claims that current UI supports them.

## ACCEPTANCE SCENARIOS

1. Stage A known 10 cm, hidden target 12 cm: before estimate **no exact target appears** in learner-facing or accessibility UI; after reveal length **12 cm**, estimates 11/12/15 produce differences **1 below / equal / 3 above**.
2. Stage B target 16 cm, worked estimate 15 cm ⇒ **1 cm below**; estimate 18 cm ⇒ **2 cm above**, always in centimeters.
3. Stage C target fixed 18 cm with estimates 20 and 25 produces **2 cm above** and **7 cm above**, so 20 is nearer; the target bar itself never shrinks/grows.
4. A unitless "20" versus 18 cm is explicitly **not a fully specified length comparison** until the unit is supplied.
5. Stage D true 23 cm and estimate e ∈ 18…28 yields deterministic `|e−23|` cm and the correct below/equal/above direction; e=20/22/24/28 gives **3 below/1 below/1 above/5 above**.
6. All displayed unit intervals are equal and proportional to the one fixed 10 cm reference; browser zoom never asserts physical calibration.
7. After reset, no previous estimate, reason or revealed answer persists across independent Section placements.
8. Keyboard, screen reader, RTL, reduced motion, mobile zoom and post-download offline operations provide equivalent pre-estimate **non-exact** evidence and complete post-measure feedback.
9. No arbitrary scoring threshold, persistent answer state, Question/Quiz or invented runtime event exists.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The current generic Section accepts a `scene` Resource, but **Length Estimate Laboratory does not yet exist**. An editor must approve the lesson and Scene specifications first. Future Scene Designer/Coding Agent verifies actual locale provider hooks and creates deterministic prop-free components, unit-valid tests, equitable pre-reveal descriptive modes and complete offline assets. No React, runtime Lesson, scored assessment, learner analytics or Note persistence is part of this batch. The rubric for a "reasonable" estimate remains an editorial/Assessment Architect decision rather than a hidden threshold.
