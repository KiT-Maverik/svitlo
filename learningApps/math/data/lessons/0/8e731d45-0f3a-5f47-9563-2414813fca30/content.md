# One Liter at a Time — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation**
Target Lesson: `learningApps/playground/Data/Lessons/1/measuringCapacityInLiters/`
Audience: **Grade 2**, approximately ages 7–8, beginning/mixed readers; exact whole-liter model quantities
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: explain liter as a standard capacity unit; measure container capacity by repeated **full 1 L** reference portions without losses; estimate beforehand; diagnose unfair measures and unreliable shape predictions.
Target Skills: `liter.data.ts`, linked directly in Brief; `capacityConcept.data.ts` is a prerequisite, not another new target Skill.
Program dependence: None
Implementation: **editorial concept only**. Generic Section supports `text`, `markdown`, `scene` blocks, but the proposed Scene, locale assets and runtime Lesson are not implemented.

## INSTRUCTIONAL CONCEPT

**"One full liter, then another: we count how much the container can hold."** A child already knows that a container's capacity is what it **could** hold when filled, not how much is currently inside it. This Lesson gives the measure a common **unit**: a **liter (L)**. We model a reference measuring vessel that holds **exactly 1 L when filled to its marked line**. Repeatedly emptying that full reference into an empty target, with no losses, counts the target's capacity in whole liters. Children predict first, then check. They discover that an attractive tall thin container may still hold fewer liters than a short wide container and that an empty 3 L container has **3 L capacity but 0 L inside**.

The model uses discrete calibrated volume quantities rather than real fluid dynamics. A "fill" is an exact one-liter transfer **only when the reference vessel is full**; a half-filled vessel makes an unfair comparison. This is not a hands-on water safety experiment, a calibrated physical measuring device or a litres-to-millilitres conversion activity.

## LEARNER JOURNEY

1. Contrast an empty reference cup's **capacity 1 L** with its current contents; reveal a printed **1 L** fill line.
2. Predict the capacity of a target from a known 1 L reference before showing its exact internal result. Measure it by three full transfers and report **3 L**.
3. Explore two unlike-looking **3 L** containers; both accept three identical reference portions, despite very different dimensions. Repair a half-full source error.
4. Transfer to a new container: estimate **about 2, 3 or 4 L**, then prove a fixed **4 L** capacity by four complete full-liter transfers with all volume accounted for.

No splash animation, pump mechanism or drag-only pour is necessary; the **reasoning is the controlled quantity**.

## SECTION PLAN

### Section 1 — What Exactly Is One Liter?

- **Purpose:** establish a standard capacity reference and distinguish capacity from contents.
- **Section contract:** `LessonSection_Config`; vertically ordered Resources.
- **Ordered blocks:**
  1. **text — currently supported:** "This measuring vessel has a line marked **1 L**. It is empty now. Does it still have a **one-liter capacity**? What happens when we fill it to the line?"
  2. **scene — Resource type supported, custom Scene proposed:** [Liter Measure Studio](./scenes/literMeasureStudio.scene-spec.md), placement A. Show a calibrated schematic **1 L reference vessel**, initially **0 L current contents / 1 L capacity**. Prediction controls "Empty vessel has no capacity" versus "Still holds 1 L when full." "Fill to mark" sets contents to exactly **1 L**, matching its printed line, then "Empty" returns contents to 0 L without changing capacity.
  3. **markdown — currently supported:** "A **liter (L)** is a standard way to measure **volume**, including how much a container can hold. This reference has **1 L capacity** even when empty. When we fill it _to the one-liter line_, it contains **1 L**."
- **Explanatory feedback:** If child says capacity vanished when empty: "The cup is still the same size. Its **contents** became zero, but it could still hold one liter when filled." If correct: "Yes: capacity is what it _can_ hold; current contents are how full it is." Do not use an animated water height to falsely imply volume is a simple function of height for arbitrary shapes.
- **Access:** A text ledger always distinguishes capacity and currently inside, e.g. "Reference: capacity 1 L; contains 0 L / 1 L." Large Fill/Empty buttons and numerical status ensure equal nonvisual reasoning.
- **Planned Note:** "One full marked reference holds 1 L; an empty container still has capacity."

### Section 2 — How Many Full One-Liter Measures?

- **Purpose:** determine whole-liter capacity by repeatable, no-loss filling.
- **Section contract:** `LessonSection_Config`, one vertical Resource stack.
- **Ordered blocks:**
  1. **text — available:** "Here is a container that looks as if it might hold **two, three or four liters**. Before we fill it, choose an estimate. Then pour one **full 1 L reference** at a time."
  2. **scene — proposed:** [Liter Measure Studio](./scenes/literMeasureStudio.scene-spec.md), placement B. Target model true capacity **3 L**, initially empty, hidden numeric capacity until measurement is complete. Learner chooses a provisional estimate from {2 L,3 L,4 L} based on a stated coarse comparison with a 1 L reference, then "Prepare full measure" and "Pour full 1 L" three times. After pours: target contents **1 L, 2 L, 3 L**, then full, capacity **3 L**. Each pour empties the 1 L reference, which must be filled again before next pour; volume is never duplicated or lost. Exact target capacity is not announced pre-reveal.
  3. **markdown — available:** "We filled our measuring vessel to **1 L** each time, then emptied it into the target. After **three full one-liter pours**, the target was full. Its **capacity is 3 L**. An estimate came first; measuring checked it."
- **Feedback:** If estimated 2 L: "We checked and needed **three** full liters, one more than your estimate." If 4 L: "Three full portions filled it, one fewer than expected." If 3 L: "Your estimate matched; the repeated full measures are how we _know_." If child tries to pour an empty reference, block with: "First fill the measuring vessel to its **1 L line**; an empty pour adds nothing."
- **Invariant:** No liquid spills; target never exceeds capacity; target is initially empty. "Reset" returns 0 L target and an empty reference so the measurement is repeatable.
- **Planned Note:** "Count equal **full 1 L portions** to find capacity in liters."

### Section 3 — Shape Doesn't Tell the Liter Count

- **Purpose:** separate shape and current fill from maximum numeric capacity; diagnose unfair reference use.
- **Section contract:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **text — available:** "This tall narrow container looks very different from a short wide one. Could they both hold **3 L**? What if someone used a half-filled one-liter cup and counted each pour as one liter?"
  2. **scene — proposed:** [Liter Measure Studio](./scenes/literMeasureStudio.scene-spec.md), placement C. Fixed tall narrow A **capacity 3 L**, short wide B **capacity 3 L**. Both are initially empty; their visual shapes are illustrative but explicitly designed/modelled to be **equal capacity**. A and B each take three identical full-liter transfers. Show an intentionally **half-full reference** (contents **less than 1 L**), and ask whether three half-filled pours can prove 3 L. Choose "Fill reference all the way to line" as correction. Do not introduce exact 0.5 L numerical calculations in the learner interface.
  3. **markdown — available:** "The outside shape can change without changing capacity. Both of these containers hold **three full liters**. A **half-full** measuring cup does _not_ contain 1 L, so counting it as one liter gives an unreliable total."
- **Feedback:** If the child chooses taller as more capacity: "Height alone isn't evidence. Each filled completely after three equal **1 L** portions." If a half-filled pour is counted as a liter: "That measure was not full to the line. We cannot call it one liter." If child confuses present contents with capacity: "We can empty both without changing how much each _could_ hold."
- **Access:** Nonvisual shape labels and the exact test sequence are available; cup outline is not the exclusive source of evidence. No exact volume for half-full cup needs to be calculated.
- **Planned Note:** "Always use the same **full** reference volume when counting liters."

### Section 4 — Predict and Check a New Container

- **Purpose:** independent transfer with an unfamiliar whole-liter capacity.
- **Section contract:** `LessonSection_Config`, vertical.
- **Ordered blocks:**
  1. **text — available:** "Our new container looks **much bigger** than the 1 L reference. Do you expect about **2, 3 or 4 liters**? Choose an estimate and tell us what you compared. Now check one full measure at a time."
  2. **scene — proposed:** [Liter Measure Studio](./scenes/literMeasureStudio.scene-spec.md), placement D. New target capacity fixed **4 L**, initially empty. Pre-reveal nonvisual/visual clue: "Larger than the known three-liter target shown earlier and about four of the standard 1 L reference vessels" would **leak** answer, so instead give only "Clearly larger than a single 1 L vessel; its exact capacity is unknown." Learner chooses estimate {2,3,4 L}, then runs **four** full transfers from the fixed 1 L reference. Target states **0→1→2→3→4 L**, then "full" at 4; fifth attempted full pour is blocked without losing fluid and with feedback "The target is already full."
  3. **markdown — available:** "Four correctly filled reference measures went in before the target was full. Its capacity is **4 L**. The vessel's shape only gave an estimate; the repeated known liters gave a measured result."
- **Feedback:** Estimate 2 L: "You expected two, but it took four known one-liter measures." Estimate 3 L: "One full measure more was needed." Estimate 4 L: "Your prediction matched the checked capacity." Choosing a half-full reference is explained and must be refilled before a full-liter step; a learner can always replay instead of being stuck.
- **Reflective checkpoint:** "If we poured three liters into this container and stopped, how much would be inside? Is that the same as its capacity?" Reveal "3 L contents, 4 L capacity" without a score.
- **Boundary:** Whole liters only, no fractional pour arithmetic, no ml conversion, no physical calibration claim.

## CUSTOM SCENE SPECIFICATIONS

- [Liter Measure Studio](./scenes/literMeasureStudio.scene-spec.md) — proposed self-contained custom Scene, four independently initialized prop-free placement roots.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 reference line: "One liter (1 L) is a standard volume unit."
2. After Section 2 measured capacity: "Count repeated **full one-liter** measures to find liters."
3. After Section 3 counterexample: "Container shape or current fill does not alone reveal capacity."

These are **planned** short Git-authored recall cues, not a current Note type, unlock signal, persistence or personal revision-sheet implementation.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

The new four-liter task is unscored practice and independent transfer. A future Assessment Architect should vary reference quantities/container shapes without making the learner infer calibrated liter quantities from pixels; test counting of _genuinely full_ measures, unit-bearing responses and fair versus unfair measurement. One successful pour simulation does not establish mastery; spaced review is future work.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

Translate "capacity", "contents", "liter", "full", "half-full", "estimate", control labels, status, every explanation, Note text and unit-bearing amounts authentically for all configured locales. The visible model depicts fixed **calibrated unit transfers**, not visual water-pixel height as proof. A screen reader reads target contents, current reference fill, number of confirmed pours and whether target is full, plus safe alternative estimate cues _before_ reveal. The same discrete Fill/Pour/Reset buttons work with keyboard, switch and touch; no drag-only activity, audio-only feedback, precision pouring or color dependence. RTL may change labels/layout but not amount or volume-conservation arithmetic; ensure readable 200% text, reduced motion, high contrast, focus, large touch controls, WCAG 2.2 AA and all locally downloaded content usable fully offline after a verified download process exists.

## PRODUCTION / PLATFORM DEPENDENCIES

Current generic Lesson Section renderer handles `text`, `markdown`, `scene`, not this specific Scene. Implementation of liter-calibrated amounts, genuine translations, Lesson runtime data, tests and offline packaging remains future work. Scene roots must be prop-free, use real verified locale context and have local deterministic tests. No physics solver, server measurement, Question/Quiz, scoring, Note event or persistence is added.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and canonical `liter.data.ts` Skill source linked there.
- Editor: ensure equal-capacity tall/short vessel illustrations do not undermine accurate volume models; avoid height=volume simplification.
- Editor: confirm the **half-full** diagnostic remains qualitative, since `milliliter` or fractions are not yet being taught.
- Brief/Content/Scene remain Draft pending explicit approvals.

## HANDOFF

Methodologist approves standard-unit concept and prerequisite fit first. Screenwriter/editor reviews calibration claims and transfer examples. Scene Designer may implement only an approved specification, while Assessment Architect separately defines any scored mass/capacity evidence.
