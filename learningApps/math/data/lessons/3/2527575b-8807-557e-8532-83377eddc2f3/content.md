# Which Container Holds More? — Lesson Content

Status: **Provisional Draft — Methodologist approval pending; NOT approved for implementation.**
Target Lesson: `learningApps/playground/Data/Lessons/1/comparingContainerCapacity/`
Audience: **Grade 1**, approximately 6–7 years, all reading/sensory/motor modes, no actual pouring required
Methodologist source: [Draft Methodologist Brief](./methodologist-brief.md)
Learning outcomes: explain capacity as _maximum_ fill, compare two containers fairly by complete transfer or same-sized scoop, reject misleading height/current fill, recognize equal capacities, repair unfair measurement.
Target Skills: **`capacityConcept.data.ts`** as directly linked in the Brief, not liter/milliliter measurement or density.
Program dependence: None
Implementation status: editor-authored Lesson/Scene concept only; no runtime Lesson, water-physics engine, Question or Quiz.

## INSTRUCTIONAL CONCEPT

**"How much could it hold if it were full?"** A tall, narrow cup can hold less than a shorter, wide cup. Capacity asks about the **most** a container can hold—not just how much is in it right now. The child learns to make a **fair** comparison, either filling each with **the same scoop** or transferring the contents of a **full source** to an **empty recipient**. Capacity is about volume, not the mass of a container or liquid and not its height alone.

All demonstrations use discrete internal capacity values in **identical model-scoop units**, not real-world liters or simulated liquid-fluid dynamics. For example: A is tall/narrow and holds **4** model scoops; B is short/wide and holds **6**. The model always accounts for leftover contents without inventing spills or disappearing volume. These internal values become observable only during deliberate filling/reveal; the child's first prediction is about relative appearance, not a leaked scale label.

## LEARNER JOURNEY

1. See a **tall narrow** and **short wide** empty container, ask which _could hold_ more, and separate **capacity** from **current fill**.
2. Use one equal-sized scoop to fill both to their full marks; discover **4 versus 6** and explain why comparing the counts is fair.
3. Transfer from the _full_ smaller container into the _empty_ larger one, then reverse the process; reason from **spare room** versus **leftover volume**, without spills.
4. Compare differently shaped **equal-capacity** containers, then diagnose a false comparison caused by starting partly filled or changing scoop size.

This is intentional observation–prediction–explanation–controlled manipulation–transfer, not a pouring game for collecting scores. Every interactive action has a verbal/textual equivalent and a reproducible result. No sound, time pressure, graphics-intensive fluid rendering or physical water handling is necessary.

## SECTION PLAN

### Section 1 — Empty Doesn't Mean No Capacity

- **Purpose:** distinguish a container's maximum capacity from its current content and challenge height-only judgments.
- **Current shape:** `LessonSection_Config` with one ordered vertical Resource column.
- **Ordered Resources:**
  1. **text — existing renderer:** "A tall cup and a short wide cup are both empty. Does that mean they can hold nothing? Which one _could hold more if full_? Can we tell from height alone?"
  2. **scene — existing Resource type, proposed custom:** [Capacity Pouring Bench](./scenes/capacityPouringBench.scene-spec.md), placement A. Present empty tall/narrow A, shorter/wider B, each with a marked full boundary but **no numerical unit ticks**. Before revealing model capacities, offer predictions "A holds more", "B holds more", "Cannot know from height only". After the child responds, reveal only the **capacity definition** and why appearance cannot establish which is greater; do **not** reveal capacity ordering or scoop counts before the fair test in Section 2.
  3. **markdown — existing renderer:** "Even an **empty** cup can hold something. Its **capacity** is the amount it could hold when filled to its full mark. A taller cup is not necessarily the cup with greater capacity: width and shape also matter. We need a fair comparison."
- **Feedback:** For "empty means no capacity": "It's empty now, but it still has space inside. That's its capacity." For "A because taller": "Height alone doesn't tell us how much it can hold. Let's use the **same scoop** to test." The initial "cannot tell" is a reasoned uncertainty, not a scored correct answer.
- **Nonvisual parity:** "A is tall and narrow; B is shorter but wider; both are empty and marked with full lines" is provided before prediction. Children don't need photos or physical objects.
- **Future Note:** "Capacity is how much a container can hold when full."

### Section 2 — One Scoop Size, Two Different Counts

- **Purpose:** introduce equal-sized repeated units as fair comparative measurement.
- **Current shape:** general single-column Section.
- **Ordered Resources:**
  1. **text — available:** "We will use the **same little scoop** for both cups. How many of these scoops fill the tall cup? How many fill the short, wide cup?"
  2. **scene — proposed:** [Capacity Pouring Bench](./scenes/capacityPouringBench.scene-spec.md), placement B. Fixed capacity A=**4 identical model scoops**, B=**6 identical model scoops**, initial fill 0/0. Learner selects A or B and presses "Add one scoop" repeatedly; each press adds **one unit** to the selected container without overflow. At 4, A displays "full"; at 6, B displays "full". Before each container is full, the learner-facing ledger shows **scoops added so far** without announcing its unrevealed maximum. Once that container is full, the ledger records A as **4 of 4** or B as **6 of 6**, respectively. "Compare" reveals **B can hold two more scoops than A** under this common scoop size.
  3. **markdown — available:** "The tall cup held **4 of the same scoops**. The short wide cup held **6**. Since both were filled using **one identical scoop**, B has **greater capacity**. Height alone fooled us."
- **Feedback:** If child compares A4 to B3 before B full: "You counted what is **inside now**, not what B can hold **when full**. Keep adding equal scoops until each reaches its full mark." If different scoops suggested: "Bigger scoops would change the number even if the containers stayed the same. Use the **same size** to compare." No spilled extra scoop; at full, "Add one scoop" explains the container has no room rather than silently accepting an overflow.
- **Access and pacing:** Fully local step controls, text ledger and ready-to-inspect full markers; nonvisual mode has unit count/status equally informative. Each action may be undone without score.
- **Future Note:** "A fair scoop comparison uses equal scoops and full containers."

### Section 3 — Pour Into a Different Container

- **Purpose:** use conservation of transferred modeled contents to infer relative maximum capacity.
- **Current shape:** single-column general Section.
- **Ordered Resources:**
  1. **text — available:** "First **fill the tall cup A completely** and leave B empty. Pour A into B. Will B be full? Then reset: fill B completely, leave A empty, and try pouring back."
  2. **scene — proposed:** [Capacity Pouring Bench](./scenes/capacityPouringBench.scene-spec.md), placement C. **Forward transfer:** A starts 4/4 full; B starts 0/6; after transfer, A0/4 and B4/6, with **two-scoop empty room in B**. **Reverse transfer:** from separate reset B6/6 full; A0/4; transfer only as much as A holds, resulting B2/6 remaining and A4/4 full. Do **not** spill or invent extra liquid. Show exact before/after ledgers and a reasoned choice "B has greater capacity".
  3. **markdown — available:** "A full cup A did **not** fill B: B still had room. When B was full, it **filled A and still had some left**. Both fair tests tell us **B can hold more** than A."
- **Feedback:** If child says A larger because it starts taller: "We tested their **capacity** by transferring a full amount, not by height." If reverse transfer drops leftover: "We can't make the extra amount disappear. After filling A, **two scoops stay in B**." If source only half full: "That would test current contents, not which container can hold more."
- **Safety and accessibility:** Virtual pouring is triggered by named buttons and state text; no real liquid, continuous animation or precision dragging. Reduced motion shows discrete fill/leftover changes instantly. A nonvisual user gets the same capacity comparison from before/after tables.

### Section 4 — Same Capacity, New Shapes

- **Purpose:** transfer to equality and diagnose unfair comparisons.
- **Current shape:** single-column general Section.
- **Ordered Resources:**
  1. **text — available:** "Here are two more differently shaped containers. Could they hold the **same amount**? Someone measured one container with a **big scoop** and the other with a **small scoop**. Is that a fair test?"
  2. **scene — proposed:** [Capacity Pouring Bench](./scenes/capacityPouringBench.scene-spec.md), placement D. Containers C tallish/narrow and D low/wide each have capacity **5 of one identical model scoop**. A fair comparison fills both with 5 and reports **equal capacity**. An _invalid_ example shows "C: 3 large scoops; D: 5 small scoops" where scoop volumes are **not equivalent** and no numeric comparative conclusion is permitted. Offer "Use identical scoop", "Fill both to the full mark", then reveal 5 versus 5. Another false example uses C only partly filled (2/5) while D is full (5/5); repair it before comparing capacities.
  3. **markdown — available:** "C and D have **equal capacity** because each holds **five of the same scoops** when full. Different shapes can hold the same amount. We cannot compare capacities from different scoop sizes or from one cup only partly filled."
- **Feedback:** For "D holds more because five is bigger than three": "Those numbers count **different-sized scoops**, so the comparison isn't fair." For "D holds more because it's fuller right now": "One cup was **not filled to capacity**. Fill both fully with identical scoops." For equality when fair: "Same full count with the same scoop means **equal capacity**." Do not assert that physically equivalent scoop sizes have been measured in liters.
- **Independent transfer:** Show unfamiliar empty vessels with very different silhouettes and ask what measurement setup would fairly compare their capacities. Child selects "same scoop, fill to full" instead of guessing taller or wider. No graded Quiz.

## CUSTOM SCENE SPECIFICATIONS

- [Capacity Pouring Bench](./scenes/capacityPouringBench.scene-spec.md) — proposed prop-free, deterministic comparison tool with stable fill/transfer states, no-spill rule, same-scoop validity, fully equivalent text ledger and keyboard controls.

## LESSON NOTES — UNLOCKED RECALL CUES (PLANNED)

1. After Section 1 definition: "Capacity is how much a container can hold when full."
2. After Section 2 identical-scoop comparison: "Use the same scoop and fill both to compare."
3. After Section 3 transfer: "Room left or contents left over can reveal which capacity is larger."

These are **planned** future localized recall Notes, not real runtime events, Note IDs, persistence or a compiled study-sheet feature.

## PRACTICE, RETRIEVAL AND ASSESSMENT HANDOFF

Section 4 tests reasoning informally but **unscored**. A future Assessment Architect can assess capacity definition, comparison fairness and transfer conclusions with alternate container silhouettes and nonvisual representations. Do not require learners to calculate physical liters/mL, density or internal volume formulas or infer mastery from this one demonstration.

## GLOBAL ACCESSIBILITY AND LOCALIZATION

All object names, full/empty/current contents, maximum capacity, scoop size, leftovers, hints, feedback, status reports, controls and potential Note cues require real translation for each supported locale without silent English fallback. RTL reading direction may affect UI control position but **must not** change the model's numeric counts, which container is full or the direction of transferred contents in textual explanations. Keyboard/switch buttons "Select container", "Add one", "Fill", "Transfer", "Read amounts", "Undo", "Reset" fully replace any fluid dragging or pouring animation. A screen reader receives full source/destination **before and after** tables, including leftovers and spare capacity, and can reason from the same information. Large targets, WCAG 2.2 AA, visible focus, reduced motion, no colors/sounds as sole cues, mobile/low-end equivalents and completely downloaded offline content are release requirements, **not proven features**.

## PRODUCTION / PLATFORM DEPENDENCIES

- Current generic `LessonSection_Config` renderer supports `text`, `markdown`, `scene` Resources.
- Proposed: Capacity Pouring Bench, precise discrete no-spill state controller, genuine localization, accessible table/interactive controls, independent prop-free Section roots, tests and offline package integration.
- No physical calibrated volume or liter measurement, runtime Lesson config, scored Question/Quiz, Note API, user progress, analytics or invented "pour" platform event. A simple HTML/SVG discrete model is adequate; a costly fluid animation adds no required learning.

## EDITORIAL SOURCES AND OPEN QUESTIONS

- [Draft Methodologist Brief](./methodologist-brief.md) and canonical `capacityConcept.data.ts` linked there.
- Editor: verify realism of "no-spill transfer" representation, the distinction between maximum capacity and current fill, and the accessibility of the same-scoop comparison.
- Formal approval remains pending; Content and Scene are **Provisional Drafts**.

## HANDOFF

Methodologist approves the scope and concrete comparisons. Screenwriter/editor checks each fill/transfer case and localized instructions. Scene Designer/Coding Agent implements only from an **approved** Scene specification with tests and verified locale/Section APIs. Assessment Architect separately defines scoring, if ever requested.
