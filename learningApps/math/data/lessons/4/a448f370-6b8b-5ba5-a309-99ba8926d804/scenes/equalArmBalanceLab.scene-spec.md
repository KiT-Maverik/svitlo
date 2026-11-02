# Equal-Arm Balance Lab — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Which Object Has More Mass?](../content.md), Sections 1–4
Methodologist objective: [Draft Brief](../methodologist-brief.md) — compare **mass** qualitatively using a fair equal-arm balance, interpret greater/less/equal, and reject appearance/unfair-setup inferences. A comparison exercise is not an extra Skill.

## LEARNER PURPOSE AND CONCEPT

A learner first predicts from appearances, then observes a controlled, scientifically consistent equal-arm balance. They must learn which object has more mass by interpreting **pan position** (or an accessible equivalent) rather than from object size or which side happens to be drawn on the left. Swapping pans without changing objects tests conservation of object mass. Equal masses and a deliberately unfair extra object make the definition of a **fair comparison** explicit.

Learner voice: "**On this fair balance, the pan with the object of greater mass goes lower. Level pans can mean the two masses are equal.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- The model is an **ideal, calibrated equal-arm balance** on level support, under uniform gravity. Equal arms and identical pan assemblies are assumed, no friction or external force. Left pan and right pan are equidistant from central pivot. One selected test object **per pan** is required for a fair object-to-object comparison.
- Let `mass(L)` and `mass(R)` be the **sum** of all internal model masses of objects currently in each pan. If both pans are loaded with the intended comparison objects:
  - `mass(L) > mass(R)` → **left pan goes down, right pan goes up**.
  - `mass(L) < mass(R)` → **right pan goes down, left pan goes up**.
  - `mass(L) = mass(R)` → beam stays **level**, pans same vertical height.
- If a pan is empty, the Scene must label "comparison not yet prepared" for the two-target-object task; never present an unfinished placement as an authoritative comparison. If **extra objects** are loaded, the balance still responds to **total pan mass**, but the inference "target L alone > target R alone" is **invalid until extra loads are removed**.
- Objects are ideal and their pictures/size are not calibrated masses. Model quantities are internal **unitless integer tokens** to determine reliable visual outcomes; do not teach them as grams, kilograms or a valid instrument reading.
- Fixed independent object profiles:
  - **A:** small dense-looking token, model mass **5**.
  - **B:** larger-looking foam block, model mass **2**.
  - **C:** rounded object, model mass **3**.
  - **D:** wide differently shaped block, model mass **3**.
  - **E:** small added object, model mass **2**.
  - **F:** unfamiliar object, model mass **4**.
  - **G:** unfamiliar differently shaped object, model mass **6**.
- Internals must not be described as actual densities/material measurements. When an object is switched from one pan to another, its mass is invariant; the direction of tilt switches if imbalance reverses. When artwork enlarges but model mass does not change, the balance **must** remain level if it was level.
- No numerical reading, unit conversion, beam torque equation, density computation or ordinary physical lifting task. Temperature, fluid displacement and gravity variation are outside scope.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — Big Foam, Small Dense Token (Section 1)

1. Show a small solid-looking **token A** and a large airy-looking **block B**, with neither internal mass number visible to child. Prompt: "**Which might have more mass?**" Choices "small token", "large foam block", "can't know from size alone". The third is a sensible uncertainty, not a wrong prediction.
2. Present a stationary **empty equal-arm balance** clearly marked LEFT and RIGHT in its graphical/textual description. Controls "Place A on left", "Place B on right", "Compare" (and inverse positioning if child explores), with a paired or stepwise placement alternative that prevents inference before both target objects are present.
3. Canonical stage configuration: A5 **left** / B2 **right**. When "Release balance" or "Compare" is activated, **left pan lower**. The status ledger says "Left: token A; down. Right: foam block B; up. Token A has greater mass."
4. Feedback for height/size-based choice B: "The foam looks bigger, but its pan is **higher**. The smaller token's side is lower, so it has more mass." For A: "Your prediction matches the balance." For uncertainty: "Good question—size cannot decide it. The balance provides evidence."
5. "Read reasoning" explains why an equal-arm balanced device compares masses with the same arm lengths. "Reset" restores empty pans, unrevealed result and prediction control.
6. The visual animation may tilt gently; the semantic state is immediate/available on reduced-motion path and does not rely on color or sound.

### B — Switch the Objects, Not Their Masses (Section 2)

1. Start A **left** and B **right** in a previously revealed A5/B2 comparison. Left pan lower.
2. Prompt: "After swapping A and B between pans, **which pan should be lower**? Will A still have greater mass?"
3. "Swap pan contents" atomically updates to **B2 left / A5 right** and reveals **right pan lower**. No intermediate one-pan result may be falsely described as a finished comparison.
4. Compare textual statements:
   - Before: "A left, B right; left pan down; **A heavier than B**."
   - After: "B left, A right; right pan down; **A heavier than B**."
5. If child chooses "A became lighter": "We moved A, but its mass did not change. The lower _side_ moved with A." Provide "Swap again" to replay; no reward.
6. Clear, separately named left/right pan state in any RTL locale: if visual positions mirror, the same swap and text log must be remapped consistently rather than reversing which object is heavier.

### C — Equal Mass, Different Shapes (Section 3)

1. Two objects **C3 left** and **D3 right** have different-looking shapes and surface area in the picture, but equal model masses.
2. Prediction: "The shapes look different. Could the balance still be level?" Reveal **level beam**, both pans same height.
3. "Make D picture larger" changes **only rendered appearance** of D, not model mass. Beam must stay level, and no extra invisible object should appear. "Restore picture" returns previous size.
4. Explanation: "**Their masses match**, even though their shapes do not." If the learner thinks the larger picture should make D heavy: "Picture size is not the balance's measured mass."
5. "Swap positions" (optional) keeps level; equality is symmetric. If C and D are accidentally absent from pans, Scene reports "place both objects before comparing", not "level means equal" for empty pans.
6. Structured text: "C left, D right; each one object; pan heights equal; comparison: same mass."

### D — Repair an Unfair Setup, Then Infer a New Comparison (Section 4)

1. Initial: C3 and extra E2 **on the left pan** (two objects), D3 **on the right** (one object). Actual total left 5, right 3 → **left pan lower**. Both the visibly distinguishable extra object and the textual inventory explicitly say "Left has C and E; right has D". Do **not** conceal E from assistive technologies.
2. Ask "Does left-down prove **C alone** has greater mass than D? Why not?" Correct conceptual response: **no**, because there are two things left. Feedback identifies the extra E.
3. "Remove extra E" updates pan inventory to C3 left/D3 right → **level**. Now C and D compare fairly and have equal mass. "Add back E" (optional) again lowers the left by the additional load, making the mechanism reviewable.
4. Fresh independent pair: **F4 left / G6 right**, exactly one object per pan. Child predicts which side will lower; "Compare" reveals **right pan lower** and **G greater mass than F**. Use a different picture size ordering from mass to prevent appearance guessing.
5. If child says F heavier from artwork: "The right pan with G is lower; the balance compares mass, not picture size." For wrong unfair inference C>D: "The balance responded to **C + E**, not to C alone."
6. Make "Reset fair test" and "Read all pan contents" available; no timed reveal, number-based score or hidden performance tracking.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** one equal-arm beam/pivot/pan pair, seven independent object profiles A–G, pan inventory, clear LEFT/RIGHT labels, prediction/reveal/hint/undo/reset controls, status text ledger.
- **State per independent placement:** local initial inventory, selected objects, optional appearance-only size preset, current predicted direction, reveal/compare status, current pan total relation, feedback. All model test masses immutable within one instance.
- **Rule:** totals determine beam state, **but** a comparison of designated single objects is flagged valid only when each designated object is alone on its pan and balance hardware is in the same fair configuration.
- **Rule:** switching two loads changes which physical pan is lower but never their underlying mass order. Changing SVG dimensions/size does not change model mass.
- **Rule:** equal pan heights with **two target objects present** means equality. Empty initial balance is **unprepared**, not automatically evidence of equal target masses.
- **Prop-free Scene root:** each Section's authored placement has no public incoming React props; internal helpers can share deterministic model but must obtain locale from real verified context. Do **not** invent `leftMass`, `rightMass`, `locale`, `onCompare` or `mode` Scene API.
- **Access:** named buttons "Place", "Remove", "Swap", "Read pan states" and discrete predictions are equivalent to all optional drag/tilt animation. Every reveal provides words **left higher/lower, right higher/lower, balanced** and object identity. All comparisons are **formative**, not a scored Question or mastery event.
- **Reset:** each independent Section instance returns to its documented starting inventory/prediction/reveal state; one Section cannot inherit previous user answers.

## VISUAL / AUDIO / MEDIA DIRECTION

Use a very simple labeled horizontal beam with **equal arms** about a stable center pivot and two pan holders. Do not draw a physically misleading beam where the left end moves down while the object is on right heavier. For an imbalance, move lower pan down and higher pan up (or switch instantly for reduced motion), keep object/pan labels readable and anchored. Equal masses produce level beam. Decorative object scale differences intentionally challenge appearance but cannot alter the numeric physical model. A simple HTML/SVG state model is preferable to physics dynamics; sound unnecessary. Use shape/arrow/text status in addition to any colors.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

Translate every left/right, heavier/lighter/equal, pan inventory, compare/reveal action, feedback and accessible name into every supported locale with real translations; no English fallback. **RTL must not break the mapping between displayed pan, object, status and direction**; if UI is reflowed, list which physical pan each object occupies. Screen readers can inspect a table "left pan: object A, lower; right pan: object B, higher" before being asked which has greater mass **after the reveal**; before reveal do not leak mass token numbers. Use a keyboard/switch-operable button instead of precise pan drag or waiting for tilt; visible focus, large mobile targets, 200% scaling, WCAG 2.2 AA, no color/sound-only information and instant reduced-motion updates. All content, model logic and selected locale must work offline after verified package download; this is a future implementation requirement, not current tested behavior.

## ACCEPTANCE SCENARIOS

1. Stage A, A5 left/B2 right → **left lower** and A greater mass despite smaller-looking token. Equal-arm condition explicit.
2. Stage B, same A5/B2 swapped to B2 left/A5 right → **right lower**; identity "A greater mass" unchanged.
3. Stage C, C3/D3 → **level**, even when visual size of D changes without mass change. Empty pans are not mistaken for successful object-to-object equality.
4. Stage D unfair C3+E2 left vs D3 right → **left lower** due to total 5 vs 3; result does **not** prove C>D as individual objects.
5. After removing E, C3 left/D3 right → **level**, correctly infers C=D in mass.
6. Fresh F4 left/G6 right → **right lower**, correctly infers G greater than F.
7. All states preserve object mass and are deterministic after reset/swap; all interface labels and underlying pan identities agree in LTR and RTL.
8. Keyboard/screen-reader/text ledger, reduced motion, mobile 200% text and post-download offline operation preserve full comparison and fairness reasoning without a physical balance.
9. Every wrong prediction gives a mathematically specific explanation, **not** points/grades/retry penalties or an invented platform event.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic `scene` Resource kind is available, but **Equal-Arm Balance Lab is not implemented**. After editor and Methodologist approval, Scene Designer/Coding Agent must implement locale-aware **prop-free** Section roots, deterministic pan-state tests, nonvisual interaction and offline packaging. Do not create runtime Lesson/Question/Quiz data, scoring, Note event APIs or persistent learner records in this editorial batch. Editor to verify balance-dynamics simplification is clearly labeled as an ideal equal-arm model.
