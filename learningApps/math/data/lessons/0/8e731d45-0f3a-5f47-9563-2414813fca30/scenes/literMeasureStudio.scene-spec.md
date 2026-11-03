# Liter Measure Studio — Scene Specification

Status: **Provisional Draft — awaiting Methodologist and Screenwriter/editor approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [One Liter at a Time](../content.md), Sections 1–4
Methodologist objectives: [Draft Methodologist Brief](../methodologist-brief.md) — know one liter as a standard unit of volume/capacity, estimate and measure whole-liter container capacity against a **full calibrated 1 L reference**, diagnose unfair partial or different-unit measures. This is not a new Skill, a fluid-physics simulator or a scored Question.

## LEARNER PURPOSE AND CONCEPT

Children have compared capacities using abstract equal scoops. This Scene makes a **common standard unit** explicit: a calibrated measuring vessel that holds **1 liter at its full marked line**. The learner makes a prediction, fills the reference completely, transfers it into a target, counts equivalent one-liter portions, then explains what the target can hold. A visible container's width/height is a **hypothesis**, not a reliable measurement.

Core learner phrase: "**A full reference is one liter. Count how many full liters a container holds. Empty and full are contents, not the container's capacity.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- **Liter (L)** is a volume unit used for capacity. In the virtual model, reference capacity is exactly **1 L** when filled to its calibration line. The reference's **current contents** are a separate state: **0 L** empty or **1 L** full during ordinary measurement. In a **deliberate diagnostic only**, the reference can be **partially filled (0 < contents < 1 L)**; this amount is **not** treated as one liter and need not be numerically exposed to early learners.
- Each target has immutable capacity `C` in **whole liters**, initially empty for each new measurement. Target contents `v` must remain between **0 and C**. Capacity `C` does **not** change on filling, emptying, shape illustration or screen resizing.
- A **successful full-liter transfer** requires the reference contains exactly **1 L**, target has at least **1 L remaining capacity**, and the simulated operation moves that volume **from reference to target**. Afterward reference contents becomes **0 L** and target contents increases by exactly **1 L**. **No fluid is duplicated, lost, evaporated or spilled.**
- A reference at 0 L cannot execute a full-liter pour: require filling first, with explanatory feedback. A target at `v=C` is full; a further attempted full-liter pour is **blocked**, not silently clipped or consumed. When target has <1 L of space in a later extension, do not apply a full-liter step or claim an exact whole-liter measure; current Lesson uses only integral capacities and complete portions.
- Stages: A `C_reference=1 L`; B target `C=3 L`; C both different-shaped targets `C_A=3 L`, `C_B=3 L`; D new target `C=4 L`. All model arithmetic is explicit and deterministic.
- Visual height alone cannot be used to infer capacity in arbitrary-shaped containers. The model may show simple fill states as **labelled qualitative levels**; actual capacity values derive from the discrete calibrated volumes, **not** pixel height/shape calculations. The two differently shaped 3 L containers should be drawn plausibly as different volumes with intentionally equal internal model capacities and a clear 'schematic' label.
- The prior `capacityConcept` Lesson established the distinction between **maximum possible volume** and amount **currently inside**. This one measures in _liters_ and includes a pre-measure estimate. No fractional liter arithmetic, mL conversion, density, weight or physical calibration to actual on-screen containers is taught.
- **Fairness:** Count repeated **full 1 L** transfers into an initially empty target. A partly filled reference is _not_ a one-liter portion and must never increment "number of completed full 1 L transfers".
- A digital interface may present fluid as icons or progress bars, but a screen reader gets **the same unit-bearing values and state transitions**. UI never implies that an empty 3 L container's capacity becomes 0 L.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — The One-Liter Reference (Section 1)

1. Show fixed reference vessel with readable **1 L fill mark**, initially empty. State ledger: "**Capacity 1 L; currently contains 0 L**."
2. Prompt: "If the reference vessel is empty now, can it still hold one liter?" Choices "Yes, when full" / "No, capacity is zero". Prediction before reveal.
3. "Fill to marked line" changes current contents **0→1 L**, capacity remains **1 L**. Both visual state and text announce "**Contains 1 L, full**".
4. "Empty reference" changes contents **1→0 L** while capacity remains **1 L**. Correct explanation: "Empty isn't no capacity. The vessel could still hold one liter."
5. Feedback for wrong "no capacity" focuses on same vessel/unchanged capacity, no point deduction or confusion with object mass.
6. Reset restores empty reference and unrevealed prediction. No actual pouring, screen size or water properties needed.

### B — Three Complete Reference Transfers (Section 2)

1. Set target **C=3 L**, contents0. Show a **1 L reference** separately, with its capacity label. Do **not** disclose exact target C in learner-visible or accessibility UI before measurement; describe it as "larger than one 1 L reference, perhaps around two, three or four liters" with deliberately coarse geometry. Learner chooses estimate `e∈{2,3,4} L`, optionally a short reason.
2. "Confirm estimate" then "Fill reference" ⇒ reference contents 1 L. "Pour full reference" ⇒ target contents **1 L**, reference0. Repeat exactly twice more. Document transitions:
   - Initial: target0 L, reference0 L, confirmed full transfers0.
   - Fill+pour 1: target1 L, reference0, transfers1.
   - Fill+pour 2: target2 L, reference0, transfers2.
   - Fill+pour 3: target3 L (**full**), reference0, transfers3; reveal "**Capacity 3 L**".
3. "Pour" when reference empty is blocked: "The reference is empty; first fill it to the one-liter line." Refill cannot exceed reference capacity.
4. "Pour" when target already full is blocked, and reference full volume remains in reference (no disappearance). Explanation: "This target is already at its full capacity, 3 L."
5. Feedback for estimate2: "The target took one **more** full liter than your estimate"; estimate4: "One **less**"; estimate3: "Your prediction matched the three measured portions." These are **unscored explanatory** comparisons, not a secret tolerance.
6. If learner requests "What did we do?" read a complete log of three exact transfers with current contents and final capacity. Reset clears estimate and restores both empty.

### C — Two Different Shapes, Equal Liters; Unfair Reference (Section 3)

1. Two fixed differently shaped schematic targets A (tall narrow) and B (short wide), **each** capacity **3 L**, initially empty. Prompt: "Would the taller one necessarily hold more?"
2. Learner may "Measure A" and "Measure B" independently. Each needs three **complete** one-liter reference transfers from an initially empty target to its full mark. Ledger: "A capacity3 L, B capacity3 L, despite shape difference."
3. Show diagnostic measuring vessel intentionally **partially filled below 1 L line**. Prompt: "May we call each such pour one liter?" Choices yes/no, then reveal. Correct: **no**; a part-full reference contributes less than one liter.
4. If diagnostic "Pour part-filled vessel" is permitted to illustrate, it must use a separate non-scored model preserving volume, not increment the **full-liter portion counter**, and should not pretend the target fills after three such pours. Simpler implementation may **block** that action with explanation and require "Fill to 1 L mark" first; preferred for Grade 2.
5. Explanatory feedback: "Container height alone doesn't determine capacity. We compared the same full one-liter portions." "Part-filled is not one liter." No fractional liters presented as an assessed numeric concept.
6. Reset restores both A/B empty and full-liter counters0. Changes to one shape model cannot alter its underlying capacity without explicit editorial redesign.

### D — New Four-Liter Container (Section 4)

1. New target **C=4 L**, contents0; same fixed reference1 L, contents0. No numeric target reveal before estimate. Coarse cue: "Clearly bigger than one reference vessel" with comparable shape illustration, not exact readout. Estimate choices2,3,4 L; short optional justification.
2. On confirmed estimate, cycle "Fill 1 L reference" and "Pour full measure" four times. Target contents **0→1→2→3→4 L**; current reference returns to0 after each transfer. Count **four full 1 L transfers** and reveal "**Capacity 4 L**".
3. At intermediate target contents3 L, ask: "Does the container have 3 L capacity or 3 L _inside_?" Correct: **contains3 L; capacity4 L**. No claim that the model water level reads a precise fraction based on pixels.
4. After full, a fifth full reference pour must be refused without consuming volume; state remains target4 L and reference1 L if it was refilled. Message: "It is already full. A further liter cannot be added."
5. Feedback if estimate2: two more full portions than expected; estimate3: one more; estimate4: matches; reasoning refers to the observed full-liter portions, no grades. Reset to blank new target with no leaked previous answer.
6. A new container style, changed language or increased zoom may not alter volume states or true capacity. No external fluid/pour animation required.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** marked 1 L reference vessel, target vessel(s), capacity/contents state ledger, estimate choice, optional reason, Fill/Pour/Empty/Undo/Reset buttons, full-liter portion counter, reveal feedback, optional container-shape illustrations.
- **State per placement:** preset true capacity, reference current contents, target current contents, confirmed transfer count, learner estimate and reveal stage; Stage C two separate targets with independent contents/counters. The canonical reference remains exactly 1 L.
- **Conservation:** on any successful transfer `referenceBefore + targetBefore = referenceAfter + targetAfter`; no spill/loss, no volume generation. Refill represents addition from an explicit virtual reservoir, not spontaneous duplication; label as "fill from supply" in the model if shown.
- **Guard conditions:** block empty/partial reference as a complete 1L transfer; block a target with insufficient room without draining vessel; report why and allow reset/correction.
- **Counter invariant:** full-liter transfer count increases **only** after exactly 1 L has been moved to the target. Zero on reset; no count change on mere refill, failed pour or invalid half-full state.
- **Prop-free implementation:** each Section-specific Scene entry must be self-contained, accept **no external props**, and derive locale from verified Lesson context. Shared private arithmetic helpers allowed, no invented public `capacity`, `mode`, `language`, `onPour` props or events.
- **Feedback:** learner always sees/hears consistent current content, capacity only when appropriately revealed, number of validated full-liter transfers and an actionable error explanation. No graded state, Quiz or Note persistence.

## VISUAL / AUDIO / MEDIA DIRECTION

Minimal high-contrast schematic marked reference and target vessels with distinct labels "capacity" vs "contents". Convey pours through discrete volume-state cards/numbered tokens; optional animation must not imply a continuous physical-fluid solver, calibrated pixel height or that taller means more. A partially filled reference is visibly below the 1 L mark and also described explicitly. Avoid real water-hazard demonstrations; fully virtual. Reduced motion uses instant transitions. No required pictures/video/audio, external assets, network call or physical measuring supplies.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

- All visible and screen-reader messages, unit expressions, button labels, prediction choices, feedback, status, "full/empty/contains/can hold" and future Notes need **genuine translations** into every supported locale, including correct singular/plural for liter and code **L**. Missing translations block implementation rather than falling back silently.
- UI may be semantic RTL but no diagram mirror may change transferred quantities or which container has C=3/4. Do not reverse the numerical relation of _maximum capacity_ and _current contents_.
- A nonvisual learner can choose an estimate from coarse cues, fill and pour through native labeled buttons, inspect a transfer history and receive the exact same measured capacity at the same instructional point. No audio, drag, fine pour, color-only fill bar, timed action or water simulation required.
- Screen-reader announcements should report meaningful changes once per action; keyboard/switch focus, large touch controls, 200% text, reduced motion, WCAG 2.2 AA, mobile and low-end device equivalence, and full offline operation after verified package/locale download are all **future release acceptance requirements**, not existing platform assertions.

## ACCEPTANCE SCENARIOS

1. Empty 1 L reference: capacity **1 L**, contents **0 L**; filling reaches contents **1 L** without changing capacity; emptying returns contents0 with unchanged capacity.
2. Starting from target0 and reference0, three cycles of Fill then Pour yield target **1,2,3 L**, reference0 after each, full-liter counter3 and measured capacity **3 L**.
3. An attempted Pour while reference is empty/part-filled cannot be recorded as a completed **full 1 L** measure. Invalid operation reports why and preserves arithmetic.
4. A target already full at 3 L refuses a fourth full-liter pour **without consuming** the 1 L reference.
5. Two differently shaped containers A/B both hold exactly **3 full 1 L** measures; visual height/width cannot alter this model result.
6. Stage D four valid transfers yield contents **0→1→2→3→4 L** and capacity4; three-liter contents at an intermediate point do not change 4 L capacity.
7. Trying a fifth pour on full 4 L target is blocked; no fluid vanishes or target exceeds C.
8. Estimate2/3/4 for a 3 L or 4 L target produces only correct comparative explanation, no score. Exact hidden target value is not disclosed in pre-reveal learner-facing/aria copy.
9. All roots reset independently and accept no React props; screen-reader, keyboard, RTL, reduced-motion, mobile and offline-after-download modes preserve the same full-liter arithmetic and explanatory messages.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic `scene` Resource exists, but **Liter Measure Studio is not implemented**. Future Coding Agent/Scene Designer verifies actual Lesson locale provider, builds deterministic bounded state transitions and visual/nonvisual parity, authors genuine locale dictionaries, tests invalid pours, packages offline content and uses self-contained prop-free Scene roots **after editorial approval**. No scored Question/Quiz, learner mastery, Note events, real fluid engine or external database invented.
