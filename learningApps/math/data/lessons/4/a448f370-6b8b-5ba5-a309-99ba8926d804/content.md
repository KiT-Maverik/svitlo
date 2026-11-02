# Which Object Has More Mass? — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation.**
Target Lesson: `learningApps/playground/Data/Lessons/1/comparingMassOnBalance/`
Audience: **Grade 1**, approximately 6–7 years, beginning readers and learners with varied sensory/motor access
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: use a fair equal-arm balance to decide heavier/lighter/equal, interpret lower pan, reject size-based assumptions and restore fairness to an invalid setup.
Target Skills: **`compareMass.data.ts`** as directly linked in the Brief; `weighObject` is a later distinct Skill, not silently taught here.
Program dependence: None
Implementation status: complete **editorial proposal** only; there is no built Balance Scene, Lesson data, scored Question or Quiz.

## INSTRUCTIONAL CONCEPT

**"Do not guess the mass from the picture. Compare fairly."** A large foam block may have less mass than a small dense metal-like token. A simple **equal-arm balance** helps compare two objects **under the same conditions**: the pan with greater total mass goes **down**, the pan with less goes **up**, and two equal masses leave the beam level on a calibrated ideal balance. Children must learn to identify which object is heavier and **why the comparison is reliable**, not simply memorize the direction of tilt.

The Lesson uses a lightweight **schematic** simulation, not an authentic hardware or gram measurement. For unambiguous expected behavior, internal model mass tokens are positive whole numbers, but the child sees only object descriptions and balance behavior. No new measurements, external weights or supplies are required. Natural-language labels "more mass", "less mass" and "same mass" are paired with "heavier/lighter" in child-friendly language without claiming mass is measured in an unspecified standard unit.

## LEARNER JOURNEY

1. Compare a **large-looking foam block** and **small dense token** without the balance, and predict which has more mass. Reveal a surprising but physically possible result.
2. Swap exactly those objects between pans. Observe which **pan** goes down now, and confirm that **object mass** didn't change.
3. Meet differently shaped objects with equal masses; see the balance stay **level** despite different appearances.
4. Inspect an invalid comparison with an extra hidden object, make it fair, then interpret an unfamiliar final pair.

Section content is ordered **vertically** as typed resources; a custom Scene can lay out the two pans internally. No performance labels, rewards, confidence scores, arbitrary retries or mastery judgments.

## SECTION PLAN

### Section 1 — Big Object, Small Object

- **Purpose:** elicit and test the misconception that bigger volume always means more mass.
- **Current shape:** `LessonSection_Config` with an ordered single-column Resource list.
- **Ordered Resources:**
  1. **text — available renderer:** "This foam block looks big, and this small metal-like token looks tiny. Which one has **more mass**? Make your prediction. Then place one object on each pan of our balance."
  2. **scene — Resource type/rendering exists, specific Scene proposed:** [Equal-Arm Balance Lab](./scenes/equalArmBalanceLab.scene-spec.md), placement A. Model: **large foam block B**, mass **2 internal units**, on **right pan**; **small dense token A**, mass **5 internal units**, on **left pan**. Both pans start empty. The child chooses a prediction, places one on each side using labeled controls, and presses "Release balance" to reveal **left pan lower, right pan higher**. Internal mass numbers are only test labels, not visible pre-reveal.
  3. **markdown — available renderer:** "The **small token's pan goes down**. On this fair balance, that means the small token has **more mass**. The large block takes more space, but being larger does not necessarily make something heavier."
- **Specific feedback:** If child chooses large block: "It looks bigger, but watch the **balance**: the small token's side went down." Correct choice: "Yes: the lower pan holds the more massive object." If object was not placed: "First place **one object on each pan** so we can compare them."
- **Nonvisual equivalent:** Before reveal, the child receives the same descriptions but **not** hidden masses; after reveal the textual state is "Token A on left, foam B on right; left pan down; token A has more mass". The balance tilt is not a color or motion-only clue.
- **Future Note:** "On an equal-arm balance, the pan with greater mass goes down."

### Section 2 — Swap Sides, Same Objects

- **Purpose:** show that side position changes but relative mass does not.
- **Current shape:** general Section with ordered blocks.
- **Ordered Resources:**
  1. **text — available:** "The little token made the **left** pan go down. If we move the token to the **right** pan and the foam to the **left**, does the token become lighter? Which pan should go down?"
  2. **scene — proposed:** [Equal-Arm Balance Lab](./scenes/equalArmBalanceLab.scene-spec.md), placement B. Reset to the same pair A mass 5 and B mass 2. Start **A left/B right** with left lower, then use "Swap pan contents" (or two-step accessible replacement that never shows a valid result while only one pan occupied). After swap **A right/B left**, right lower. "Read comparison" states in both arrangements **A > B** in mass. Control "Return to original" restores state.
  3. **markdown — available:** "The lower **pan** changed because the heavier object moved. The **small token still has more mass**. Moving an object to the other pan does not change its mass."
- **Feedback:** If child predicts left pan remains lower after swap: "The pans carry the objects. The token moved to the **right**, so now the **right** pan goes down." If child says the object lost mass: "Only its position changed, not the amount of matter in it."
- **Access:** Use literal status sentences for each pan and object, and a pressable "Swap contents"; never require dragging over a moving beam.

### Section 3 — Different Shapes, Equal Mass

- **Purpose:** demonstrate that a level calibrated equal-arm balance represents equality, not lack of information.
- **Current shape:** one-column general Section.
- **Ordered Resources:**
  1. **text — available:** "A round stone-like object and a wide smooth block look different. Could they have the **same mass**? What would the balance look like?"
  2. **scene — proposed:** [Equal-Arm Balance Lab](./scenes/equalArmBalanceLab.scene-spec.md), placement C. Objects **C** and **D** have equal **3 internal mass units**, visually distinct shapes. Place C left/D right; after reveal, **both pans at equal height**. Toggle "Change their picture size, not their mass" to compare a larger-looking D with unchanged masses: pans remain level.
  3. **markdown — available:** "The pans are **level**. With one object on each side and a fair equal-arm balance, their **masses are equal**. Objects can have different shapes and still have the same mass."
- **Prediction and feedback:** If learner expects larger shape must be heavier: "The **balance** says equal. The shape/size did not tell us which mass was larger." If they say the beam never moved, therefore the comparison didn't work: "Here it is a meaningful result: both sides have the **same mass**."
- **Scaffolding:** An optional text ledger says "C mass equals D mass"; internal numeric token values remain irrelevant for the child, even though they support deterministic test cases.
- **Future Note:** "Level pans on a fair equal-arm balance mean equal mass."

### Section 4 — Make the Comparison Fair

- **Purpose:** independent transfer including a deliberately invalid setup and correction.
- **Current shape:** general Section.
- **Ordered Resources:**
  1. **text — available:** "Two objects C and D have balanced before. Now the left pan has a **second small object** hiding beside C, and the beam tilts down on that side. Does this prove C is heavier? What should we fix?"
  2. **scene — proposed:** [Equal-Arm Balance Lab](./scenes/equalArmBalanceLab.scene-spec.md), placement D. Start C mass **3** left, D mass **3** right, **extra E mass 2** left; left total mass 5 versus right 3. Show visibly and textually "**two objects left, one object right — not the requested one-to-one comparison**." Choose "Remove extra E" to leave C vs D, producing level pans. Then show unseen pair **F mass 4** left / **G mass 6** right, one per pan, and ask for conclusion after release: **right pan lower, G has greater mass**.
  3. **markdown — available:** "First make a **fair comparison**: one chosen object on each side, the same calibrated balance, no extra things in a pan. After removing the extra, C and D balance. In the new fair pair, the **right** pan goes down: G has greater mass."
- **Feedback:** For "C is heavier" based on unfair setup: "The left pan had **two objects**. That comparison cannot tell us that C alone is heavier." For new pair assuming bigger picture wins: "Read the tilt: the pan holding G is lower, regardless of the drawings' sizes." No penalty, scoring or inferred mastery.
- **Transfer and extension:** Learner may optionally examine an actual balance with safe lightweight items under adult supervision, but the virtual equivalent supplies every observation and conclusion; no physical setup is required.

## CUSTOM SCENE SPECIFICATIONS

- [Equal-Arm Balance Lab](./scenes/equalArmBalanceLab.scene-spec.md) — proposed self-contained, prop-free Scene specification for four independent Section placements, with textual pan readings, fair-comparison rules and deterministic outcomes.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 reveal: "The lower pan has more mass on a fair equal-arm balance."
2. After Section 3 equal pans: "Equal pan height means equal mass."
3. After Section 4 repair: "Check that the comparison is fair before deciding."

These are short _future_ localized Note suggestions only. No existing Note unlock API, stable Note ID, persistence, user profile or spaced schedule is asserted.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The new pair F/G is **unscored** independent transfer. A future Assessment Architect should separately assess qualitative comparison, equal case, swapping sides and fair-setup reasoning. No gram/kilogram readings or weight arithmetic Questions belong to this lesson without an explicit distinct Skill. One correct choice is not proof of sustained mastery.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate every object label, pan state, mass comparison, feedback, lever description, navigation control and Note cue genuinely for the configured languages; do not invent English fallbacks. In RTL a rendered page may mirror layout, but the **actual pan on the displayed left/right must agree with the textual pan state and logical model**; swap controls must track the same objects. Low-vision/nonvisual users receive a named pan-status table ("left: token A, down; right: foam B, up") and can place/remove/swap by ordinary buttons. No reliance on animation of a beam, color, exact clicking on a moving object or sound cues. Include focus, large targets, reduced-motion instant tilt changes, 200% text, WCAG 2.2 AA and full offline model/feedback after verified download. This is a specification, **not tested runtime**.

## PRODUCTION / PLATFORM DEPENDENCIES

- **Available renderer:** general `text`, `markdown` and `scene` Resource blocks.
- **Proposed:** Equal-Arm Balance Lab, numeric invariant model (not physical calibration), genuine locale/context strings, per-placement prop-free root components, independent keyboard/text mode, tests and offline packaging. No reusable prop API invented.
- Avoid full dynamics simulation if a simple static two-pan state + optional tilt animation preserves learning. No React, runtime Lesson data, scored Questions, Quiz, Note persistence or analytics are added here.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and direct `compareMass.data.ts` canonical source linked there.
- Editor: verify Grade 1 terms "more mass / heavier" and that the equal-arm balance behavior is described with no contradictory or hidden pan changes.
- All Content and Scene material **provisional** pending explicit approval.

## HANDOFF

Methodologist approves conceptual boundaries; Screenwriter/editor reviews fairness scenarios and age-friendly explanations; Scene Designer/Coding Agent implements only an approved Scene after verification of actual contracts. Assessment Architect defines any later scored evidence.
