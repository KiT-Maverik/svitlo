# Graduated Mass Scale — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and Screenwriter/editor approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Read the Mass on a Graduated Scale](../content.md), Sections 1–4
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md): read gram-calibrated graduations and midpoint intervals, report a correct number **with g**, recognize a nonzero empty scale and repair using tare/reset. No other Skill or scored assessment.

## LEARNER PURPOSE AND CONCEPT

A heavy/light balance comparison gives **relative** mass but not a number. Children now learn to read a **gram-calibrated scale**, infer the size of one major and one minor interval, and avoid reporting an object mass from a scale that wasn't zeroed. An explicit counterexample (empty pointer at 100 g, load appears 450 g; correct mass after zeroing 350 g) distinguishes instrument **reading** from blindly copying a number.

Learner phrase: "**Check zero. Count what each little mark means. Read where the pointer is and write grams.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- Schematic device reports mass in **grams**, symbol **g**, as a calibrated idealized scale. Its graduation axis has major marks **0,100,200,300,400,500,600 g**, spaced at **100 g** each (six major intervals), and one midpoint minor tick per interval at **50,150,250,350,450,550 g**. Each half-interval spans exactly **50 g**.
- The mapping of pointer position to mass is defined by the calibration marks, **not SVG angles, CSS pixel distances, size of drawing or device hardware**. A linear horizontal/vertical schematic may be preferable to a curved dial. Any responsive scaling preserves spacing ratios. The chosen numeric increasing direction is explicit and must be preserved in RTL; no silent mirroring of value labels.
- A mass reading must include its unit. "350" alone is not a fully specified measurement; "**350 g**" is. Small midway marks have meaningful values even when the printed numerals only appear at hundreds.
- Standard correct zero: empty scale pointer at **0 g**. After an object of modeled mass `m` is placed, a correctly zeroed scale points to `m` grams, for the limited 0–600 g range.
- Error diagnostic: a **mis-zeroed empty instrument** has indicated offset `+100 g`. A modeled object of true mass `350 g` yields indicated **450 g** until the empty scale is reset/tared. This **uncorrected** indication is not an accurate object-only mass. "Remove object" then "Set empty pointer to zero" clears offset; re-place the same object yields **350 g**.
- Tare here is an explicit **empty-platform zeroing** procedure. Real scales can tare a container, but that is _outside this Lesson_. The scale is modeled as calibrated to report mass; in real physics some spring/digital systems respond to weight under local gravity. Do not claim this toy representation measures mass physically without calibration or that gravity never matters.
- Exact whole model masses used: Stage A **200 g**; Stage B **350 g**; Stage C true mass **350 g** with wrong offset indication450 g; Stage D **550 g**, optionally **450 g** follow-up. No grams↔kilograms conversions, decimals, hidden rounding, overloaded range or negative readings.
- The earlier equal-arm balance Skill remains prerequisite knowledge of **relative mass**; its tilt direction is not directly translated into grams here.
- Feedback is formative; reading a scale is not a Quiz or durable mastery event.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — From "Heavier" to "200 g" (Section 1)

1. Show comparison balance schematic that only says **A heavier than B**, no mass numbers. Transition to an initially empty, **zeroed** graduated mass scale. Display the unit **g** and ordered major marks 0…600 every100.
2. Prompt: "What number and unit does the pointer show when we place this object?" "Place object" uses fixed **m=200 g** so pointer moves from0→**200** (exact major mark).
3. Offer learner-readable options "2", "200", "**200 g**" and "Not sure—show labels". Feedback 2: "You counted two big steps, but each step is **100 grams**." Feedback bare200: "Add the unit **g**." Correct: "The pointer is on the tick labeled 200 grams."
4. "Read major ticks" shows 0,100,200,300,400,500,600 in one line or row-by-row accessible list. In early reveal, avoid outputting the final mass in aria text before the learner asks for the answer; describing the pointer "on the major tick marked 200" **is the evidence** the child uses.
5. Reset removes object, pointer returns0 and prediction is cleared. Any optional animation can be skipped without losing the mark interpretation.

### B — Midpoint Is Fifty More (Section 2)

1. The empty zeroed scale has major marks labelled. Object `m=350 g` is placed; pointer is on the **small midpoint tick between labelled 300 and 400**.
2. Prompt: "That gap is **100 grams** wide. How many grams are half the gap? What is this tick?" Choices "300 g", "**350 g**", "400 g". Do not add a fake "1 g" answer requirement.
3. "Show two equal spaces" brackets 300→350 and 350→400, explicitly declaring each **50 g** because both halves total100. Reveal final "**350 g**".
4. For 300: "The pointer is **after** 300, half of the way to 400"; for 400: "It has not reached 400"; for 350: "It is the midway value, with grams named." Both explanations rely on the same numbered scale.
5. Provide ordered accessible tick list: "300 big tick, midway small tick, 400 big tick; pointer on midway." No exact result leaked beyond the mathematical evidence children are meant to reason from.
6. Reset returns to empty, zeroed state; minor tick labeling only appears as explained, not mysteriously re-scaled.

### C — Empty Scale Starts at 100: Fix It (Section 3)

1. Fixed true object mass **350 g**, initially **not on scale**. Scale has simulated erroneous empty-offset `+100 g`, so **empty pointer indicates 100 g**. Prompt: "Would the reading be trustworthy if we put an object there now? Which step is missing?"
2. Choice "Place object anyway" (demonstrate error) yields indicated **450 g** (100 offset + 350 mass); use label "**uncorrected indication 450 g**", not measured object mass. Child may predict the problem and inspect it.
3. "Remove object" returns indicated pointer to **100 g**. "Zero/tare empty scale" then sets offset0, empty reading0. "Place same object" yields corrected indicated **350 g**.
4. A "Tare while object on platform" action is blocked **for this beginner model** with explanation "Remove the object; we're zeroing an **empty platform** before measuring the object's mass." This narrow rule avoids teaching advanced taring of container mass but does not claim other scale use is impossible.
5. Feedback if learner trusts450: "The empty scale already had a 100 g offset. We must zero it before trusting the object's number." After repair: "The **same object** reads 350 g. The error belonged to the instrument setup, not a change in mass."
6. Reset returns to **empty mis-zeroed** state, not the corrected state; that is essential to replay the diagnosis independently.

### D — Unfamiliar 550 g Midpoint (Section 4)

1. Begin with a clean empty scale at **0 g**. Place new object `m=550 g`; pointer rests **halfway between 500 and 600**, at the small tick.
2. Prompt: "What mass is this? Include the unit." Choices "**550 g**", "500 g", "600 g", "550 (no unit)". "Read interval" describes major tick values and exactly one midway minor tick.
3. Reveal two equal subintervals 500→550 and 550→600, each50 g, and final **550 g**.
4. Feedback 500: "The pointer passed 500"; 600: "It hasn't reached 600"; bare550: "Value correct; add grams **g**." For a reading right on the midway small tick, never round to the nearest hundred.
5. Independent follow-up: select a fixed **450 g** mass pointer halfway between 400 and 500; learner applies the same rule, not a memorized final550. The current scale remains zeroed and has the same major/minor spacing.
6. Reset restores the stage initial empty zeroed instrument, not the prior case's +100 error; stages are independent and use no persisted state.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** calibrated axis major 0…600 by100, optional labelled minor tick 50 between each pair, pointer, empty/object placement button, tare/reset controls, interval-bracket reveal, prediction choice, local feedback/step history.
- **State per Section placement:** fixed object mass `m`, current offset (0 or +100 stage C), whether object is on platform, current pointer value `indicated=offset+(objectPresent?m:0)`, chosen learner answer, hint/reveal stage and focused interval.
- **Invariants:** correctly tared empty indication0; correct object indication`m`, with unit g. Stage C offset100 + mass350 = indicated450, corrected offset0 gives 350; object mass `m` never changes on tare or visual zoom. Halfway mark between n*100 and (n+1)*100 equals n*100+50.
- **Out-of-range:** forbid objects or offset combos outside 0–600g scale in authored presets. If implementation later adds new cases, must explicitly handle over-range instead of wrapping pointer around.
- **Reset:** each Scene placement has its own immutable preset: A/B/D offset0 empty; C offset100 empty. Independent local state cannot leak from stage C into stage D.
- **Prop-free public roots:** each Section-specific exported Scene component receives **no props** and reads locale from verified Lesson context. Private helpers may take mass presets; don't invent public `mass`, `locale`, `mode`, `onAnswer`, `onTare` props or platform event data.
- **Feedback:** dynamic messages identify the incorrect calibration assumption, bad mark interpretation or missing unit; no grades, repeat threshold, user progression or Note APIs.

## VISUAL / AUDIO / MEDIA DIRECTION

A large simple graduated **linear schematic scale** can be clearer than a realistic round dial. Major tick lengths and printed 0–600 labels differ visually from minor ticks; 50g midway marks are evenly centered. Use focusable **controls outside thin SVG ticks**; a decorative pointer itself need not be a tiny touch target. Avoid making a scale appear physically heavier/lighter through dial dimensions. Motion may be immediate on reduced-motion settings, with status changes announced once. No real sensors, images, Remotion/video or hardware integrations required.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- Translate all learner-facing numerals/units, terms "mass", "grams", "graduation", "midpoint", "zero/tare", "uncorrected", object descriptions, choices, explanations and planned Notes for **each supported locale**, with correct number grammar and no missing-language fallback.
- In RTL, textual controls may reorder, but the numeric instrument's **fixed ascending axis** must remain mathematically coherent (0→600 and actual pointer value); a mirrored visual must remap every tick and explanation consistently. Do not render mixed numeral direction misleadingly.
- For screen readers supply an **ordered scale description** of 0,100,…600, the midpoint tick between each pair, and exact pointer _position relation_ (e.g., midway between labelled 300 and 400) available before answer reveal. User can reason without seeing a pointer; no hidden right-answer status announced prematurely. After reveal announce value plus unit.
- Provide keyboard/switch/touch choices, contrast/shape labels independent of color, logical focus, large touch targets, 200% text, reduced-motion alternatives, no audio-only evidence, no precision drag, WCAG 2.2 AA testing and equivalent offline/weak-device experience **after the real package/locale download works**. Accessibility claims remain requirements, not implementation status.

## ACCEPTANCE SCENARIOS

1. Scale has **seven** major ticks 0…600 separated by **six** 100g intervals, and minor ticks at 50,150,250,350,450,550 centered exactly halfway.
2. Stage A zeroed object 200g indicates major tick **200 g**; bare "200" is incomplete unit-bearing measurement.
3. Stage B midpoint between 300 and 400 is **350 g**, with two equal 50g intervals.
4. Stage C **empty erroneous** scale indicates **100 g**, object true mass350 produces **uncorrected 450 g**; after empty tare indicated0, the same object yields **350 g**.
5. Taring with object present is blocked in this **specified beginner procedure**, explained without claiming real scales can never tare containers.
6. Stage D midway between 500 and600 is **550 g**; separate 400–500 midpoint is **450 g**, without altering graduation spacing.
7. A scale displayed larger/smaller or in RTL never changes numeric calibration, indicated masses or unit.
8. Stage reset independently restores A/B/D empty offset0 and C empty offset+100, no cross-stage leak, no data persistence.
9. Keyboard, screen reader, reduced motion, RTL, mobile zoom, offline-after-download and no-color-only modes provide the identical scale reasoning, tare operation and feedback.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

Only the generic `scene` Resource handler is present. **Graduated Mass Scale is not implemented**. After Methodologist/Scene approval, Coding Agent must verify actual locale context and create four prop-free Scene roots with exact tick/value calculations, accessibility tests and full offline content packaging. This document adds no runtime Lesson, real scale sensor, scored Questions/Quiz, learner progress, persistent Notes or imaginary state/event API.
