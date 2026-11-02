# Capacity Pouring Bench — Scene Specification

Status: **Provisional Draft pending Methodologist approval**
Owner: Educational Screenwriter
Parent Lesson / Sections: [Which Container Holds More?](../content.md), Sections 1–4
Methodologist objective: [Draft Methodologist Brief](../methodologist-brief.md) — compare maximum container **capacities** using fair transfer or equal-size repeated scoops, not appearance, current fill or unequal units. Pouring is an instructional representation, **not a separate Skill**.

## LEARNER PURPOSE AND CONCEPT

The learner estimates from appearance, discovers why height alone is uncertain, then fills differently shaped containers with **identical scoop units**, transfers contents without loss and explains **spare capacity versus remainder**. A final equal-capacity pair and two unfair measuring setups let the learner distinguish maximum capacity from current contents. The entire inquiry is possible through discrete named controls and a semantic ledger—there is no need to drag/pour physical or simulated liquid precisely.

Learner voice: "**To compare capacity, see how much each can hold when full. Use the same scoop or a fair full-to-empty transfer.**"

## ACCURATE CONTENT AND MODEL LIMITATIONS

- **Capacity** `C` is maximum modeled fill quantity to each designated full mark. **Current contents** `V` satisfy `0 ≤ V ≤ C`; an empty vessel still has `C > 0`. The diagram is a discrete **scoop-count model**, not calibrated fluid volume or a real fluid dynamics simulator.
- **Scoop size** `u` is an identical model volume unit for both containers in a valid comparison. One "Add scoop" increments `V` by **one** unit where `V < C`; otherwise the Scene states "**Already full**" and leaves volume unchanged. Never accept additions over maximum with a silent overflow.
- Distinct container profiles:
  - **A:** tall/narrow, `C_A=4u`. The silhouette may look taller but cannot by itself establish mass or capacity.
  - **B:** short/wide, `C_B=6u`.
  - **C:** different silhouette, `C_C=5u`.
  - **D:** contrasting silhouette, `C_D=5u`.
- A filled-container-to-empty-container transfer is non-spill and conserves the combined amount: if source currently has `V_s`, recipient currently has `V_r`, and recipient capacity `C_r`, moved amount `t = min(V_s, C_r − V_r)`; new states `V_s' = V_s − t`, `V_r' = V_r + t`. **No contents vanish or arise.** For the intended fair test, source must first be **full** (`V_s=C_s`) and recipient **empty** (`V_r=0`), otherwise the transfer alone is not an identified maximum-capacity comparison.
- Valid transfer comparisons:
  - **A full (4/4)** into **empty B (0/6)** → A 0/4, B **4/6**, so B has **2u free capacity**. Therefore B>A.
  - **B full (6/6)** into **empty A (0/4)** → B **2/6 remains**, A **4/4 full**, so B>A. No spilling: 2u stays in B.
  - **C and D** each hold **5u** when full, so equal capacity despite different appearance.
- **Invalid count comparison:** one large scoop for C and one small scoop for D; even numbers "3 scoops" vs "5 scoops" are **not comparable** until common scoop size is established. A presented "three large scoops" amount is a separate illustrative invalid report and **not** treated as the known actual C=5u count under common scoop.
- **Invalid current-fill comparison:** C is 2/5 while D is 5/5; current volume differs, but maximum capacities are **equal**.
- No liters, milliliters, density, physical mass inference, geometry-to-volume formulas, real heat/pressure, noninteger scoops or actual household cup calibration. Changing container silhouette for a named model must not accidentally change declared internal capacity.

## EXPERIENCE BEATS AND LEARNER ACTIONS

### A — Empty Yet Able to Hold (Section 1)

1. Display **empty** A (tall/narrow) and B (short/wide) with visible but unnumbered full marks; neither exact capacity nor current maximum ordering is disclosed **before** the fair test in Section 2.
2. Prompt "**Which could hold more if full? Can height alone tell us?**" Learner chooses "A", "B", or "height alone isn't enough"; any choice is recorded only as a provisional **prediction**.
3. "Show definition" reveals "Capacity is how much it can hold **when full**", and "Both have room even while empty." It **does not reveal B>A or the numbers 4 and 6** yet. Explain why a tall/narrow and shorter/wider silhouette alone cannot determine maximum volume.
4. If child claims empty implies capacity zero: "The cup is empty now but has space it could hold when full." If child insists tall must be more: "We need a fair test using the same scoop." The learner can replay and navigate to filling without score.
5. The text description before the comparison gives appearance **only**, not hidden counts or a volume chart that trivially discloses B's capacity.

### B — Fill Both With an Identical Scoop (Section 2)

1. Fresh independent preset: A0/4 and B0/6, same one-scoop unit `u`. Both full marks labeled "capacity endpoint" without numeric counts before reveal.
2. Controls: "Select A/B", "Add one identical scoop", "Undo last addition", "Read current contents", "Check which is full", "Reset". A has four steps 0→1→2→3→4, then stays **4/4 full**. B has six steps to **6/6 full**. Full status is never inferred solely from fill-height pixels.
3. After **both full**, "Compare capacity" reveals **4 scoops versus 6 scoops** and **B can hold 2 more identical scoops**. Before both are full, respond "This measures what is inside now, not necessarily maximum capacity. Fill the other container too."
4. Attempting add at full gives "Already full: it cannot take one more of this scoop", leaves quantity unchanged; neither generates hidden spill nor overflows the model. If a child requests "Try a larger scoop", explain why it would invalidate comparing counts and keep the equal-size scoop fixed here.
5. Accessible ledger after each action lists container and current count, e.g. "A: 3 of 4 scoop spaces filled; B: 1 of 6", but if **pre-full maximum labels** would leak exact `C` to learners, before complete fill provide "A has received 3 scoops, not yet full" and reveal denominators only on completion. For teachers/tests, full numeric state remains deterministic internally.
6. Explanation shows why shorter/wider B is greater capacity **in this model** without implying all short/wide vessels hold more.

### C — Two Fair Transfers, No Lost Contents (Section 3)

1. **Forward preset**: A4/4 full, B0/6 empty. Prompt "**Will a full A fill empty B?**" Choices yes/no/not sure; reveal "Transfer full A to empty B" updates **A0/4, B4/6**, **2u free room in B**.
2. Give text status **before and after**. Key learner explanation: "A was full, but it couldn't fill B. B can hold more."
3. "Start reverse test" resets to **B6/6 full**, **A0/4 empty**. Prompt "Will the full B fit entirely into A?" Reveal "Transfer full B into empty A" moves **4u** and leaves B **2/6**, A **4/4 full**.
4. Explain: "Two scoops' worth is **left in B** after A fills; contents did not disappear or spill. So B has greater capacity." The transfer can be shown as discrete unit moves; no continuous fluid animation needed.
5. **Conservation test:** before and after each test, total current volume remains **4u** (forward) or **6u** (reverse). Child can ask "Where did every scoop go?" and read a paired source/destination table.
6. If a learner tries to infer capacity from an incompletely filled source, label that transfer **not a valid max-capacity comparison** and request a fresh full→empty setup. On a full recipient, moved amount may be zero; explain why, never disappear fluid.
7. "Swap direction" does **not** silently transfer leftovers on top of a partially filled container. It always resets both vessels to the next documented full→empty preset for a fair proof.

### D — Equal Capacity and a Tricky Unfair Comparison (Section 4)

1. Fresh independent models C and D, both with true capacity **5u** but different silhouettes. Ask "Could these different-looking containers hold **the same** amount?"
2. Fair test: fill both with an identical scoop, each reaching **5/5**. Reveal **equal capacity**; "C and D have different shapes, but both hold five of the same scoops."
3. **Invalid scoop example:** one comparison card "C: 3 **large scoops**; D: 5 **small scoops**". Sizes are explicitly **different** and the large-scoop count is _not interpreted as C's capacity in unit `u`_. Prompt "Can we compare 3 with 5?" Feedback "Not until both use the same scoop; numbers alone are misleading." "Use common scoop" resets the fair 5/5 test rather than fabricating an implicit scoop conversion.
4. **Invalid current-fill example:** C has **2 of its 5 equal units** currently filled; D has **5 of 5**. Prompt "Does the fuller D necessarily have greater capacity?" Answer: **No**; C is partly filled even though capacity C=D. "Fill C" adds **three** common units to reach 5/5, confirming equal capacity.
5. Independent transfer prompt: A new tall/narrow and short/wide pair shown without counts asks for a method to **learn** which capacity is greater; valid method "Fill each with the same scoop to full" or "Pour from a full source into an empty recipient". Answers "pick tallest" and "count different scoops" receive specific explanations and do not count as measurements.
6. Reset clears every comparison selection and restores a known starting state. No score, mastery threshold or hidden performance log.

## INTERACTIVE OBJECTS, STATES AND RULES

- **Objects:** four named ideal containers A–D with distinct silhouettes and marked full boundaries; one common model scoop `u`; unit fill status; source/destination choice, "Add one", "Fill", "Transfer", "Read capacities/contents", "Undo", "Reset", prediction and feedback.
- **Local state per Section:** container capacities (immutable), current modeled volumes, identical-scoop selection, phase (prediction, fill, transfer, reveal), current operation/direction, selected justification and feedback.
- **Invariant 1:** every container fill satisfies `0 ≤ V ≤ C` at all times; attempted overfill does not silently create a spill.
- **Invariant 2:** every non-spill transfer preserves `V_source + V_destination` exactly and moves only `min(V_source, C_destination−V_destination)`, leaving any excess **in the source**.
- **Invariant 3:** comparing counts is justified only with **identical** scoop units and complete-to-full containers; a full→empty transfer permits comparison if conditions were checked. Half-full current volume does not directly determine capacity.
- **Invariant 4:** empty does not imply zero capacity; C and D are 5/5 equal capacity despite differing shapes; A4 and B6 do **not** reverse based on visual height or UI reading direction.
- **Reset/state isolation:** each Section placement has an explicit independent default. No step in C inherits a half-full vessel from B; never move between forward/reverse preset without re-establishing full→empty fairness.
- **Prop-free exported roots:** Section-specific Scene components accept **no public props** and fetch localized copy from verified Lesson context, not guessed `capacity`, `locale`, `mode`, `onPour` or `onResult` props. Pure internal helpers may share the conservation model.
- **Equivalent interaction:** all pouring and filling can be done via discrete buttons and named text status. The visual liquid's fill height may be schematic and **must not** act as the only source of numerical facts; a full/empty counter description is primary.
- **Feedback:** explain why a comparison is fair/unfair, what is left or free, and which capacity is greater/equal. No graded Question, score, retry cap, Note event, user storage or assessment.

## VISUAL / AUDIO / MEDIA DIRECTION

Use simple high-contrast SVG container silhouettes and a visibly **constant-sized scoop**; avoid complex animated fluid, real-world measurement illusions and detailed arbitrary-width geometry that contradicts numeric capacities. A tall container can have a shorter filled volume **in this declared conceptual model** due to width/shape. "Pour" may animate one discrete unit at a time, but in reduced-motion it must switch immediately to the same correct ledger; no model change depends on animation. Show numbered scoop tokens or an explicit ordered table after reveal. For reverse transfer, **two scoop tokens remain in B** and should be visible/textual, never rendered as accidental overflow. Do not render physically impossible fill levels as scientifically authoritative: label representation schematic.

## LOCALIZATION, DIRECTION AND ACCESSIBILITY

All capacity/full/empty/current content, scoop size, leftover and room-for-more vocabulary, labels, feedback, accessible status and prospective Notes need authentic supported-locale translations; missing locales block release, no silent English fallback. In RTL, presentation and button order may mirror semantically, but the **names A/B/C/D and their state/capacities** must remain correctly mapped to source/destination and the ledger. Nonvisual learner hears "A full with 4 equal scoops; B empty with room for six; after transferring, A empty and B has four of six, two spaces left" only **after** numbers are legitimately revealed; before reveal, offer the same relative clues as sighted learner without leaked hidden counts. Keyboard/switch and touch buttons replace precision fluid gestures; visible focus, large targets, robust zoom 200%, color-independent full markers, reduced motion, captions for any audio and WCAG 2.2 AA verification. Essential interaction uses local rules and assets, complete offline after actual lesson/locale download. These are product release criteria, **not claimed current implementation**.

## ACCEPTANCE SCENARIOS

1. Both empty A0/4 and B0/6 still have **positive capacities**; stage A does not disclose which is greater until a fair test is performed.
2. A fills with **four** identical `u` scoops, B with **six**; when both full, B capacity > A by **2u**. Adding past full does not increase V.
3. A4/4 full → empty B0/6 transfer ends A0/4 and B4/6 with **2u room left in B**; initial and final total current volumes equal **4u**.
4. B6/6 full → empty A0/4 transfer ends **B2/6**, **A4/4**, preserving **6u** total with **2u leftover in B** and no spill.
5. C5/5 and D5/5 hold the same number of **identical** scoops and have equal capacity despite different silhouettes.
6. "C three large scoops versus D five small scoops" is labeled **incomparable without common unit**, not automatically interpreted as C smaller.
7. C2/5 partly filled versus D5/5 full does **not** imply different max capacities; adding three scoops to C confirms 5/5 equality.
8. A full source and an empty recipient are necessary for a simple fair maximum-capacity transfer inference; a half-filled source does not establish comparison by itself.
9. All preset resets, undo, RTL, screen reader, mobile, reduced motion and post-download offline modes preserve no-spill conservation, amounts and equivalent conceptual reasoning without drag/color/sound dependence.
10. All feedback is explanatory and formative, with no Quiz, hidden pass band, persistent unlock/score or invented platform event contract.

## IMPLEMENTATION DEPENDENCIES AND OPEN QUESTIONS

The generic `scene` block type/rendering is available, but **Capacity Pouring Bench is not implemented**. Editor and Methodologist must approve this model and the Content first. Scene Designer/Coding Agent later checks real localization context, makes Section-specific prop-free roots, deterministic state tests, equivalent accessible amount ledger and offline assets. No React, runtime Lesson, actual measuring fluid simulation, Questions, Quiz, Note persistence, analytics or score implementation belongs in this Draft PR. The editor should explicitly approve the **discrete equal-scoop** abstraction as fair for Grade 1 and the no-spill transfer illustration.
