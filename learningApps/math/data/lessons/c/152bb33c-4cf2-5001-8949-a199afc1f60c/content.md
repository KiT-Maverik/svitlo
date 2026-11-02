# Parts Make a Whole — Lesson Content

**Screenwriter status:** Provisional Draft, pending explicit Methodologist approval.  
**Source:** [Draft Methodologist Brief](./methodologist-brief.md). **Program dependence:** None. **Implementation:** None.  
**Language:** English editorial source, not yet translated for runtime delivery.

## Learning experience

The learner will work with **one stable two-part partition** in several forms. The central discovery is that 6 and 4 are known parts of the same ten counters, and changing **what is asked** changes the useful operation without changing the objects. Do not repeat the earlier one-step-model Lesson as a generic “which operation?” chooser: here the same whole/parts relation is intentionally reversed.

### Section 1 — Two pieces of the same collection

_Purpose: observe a known-part/known-part situation and reconstruct the unknown whole._

1. **`text` Resource:** “There are **6 red buttons** and **4 blue buttons** in a box. These are all the buttons. How many buttons altogether?” Ask for a prediction. Do not display a total before the child sees the pieces.
2. **`scene` Resource (proposed):** [Part–Whole Partition Lab](./scenes/partWholePartitionLab.scene-spec.md), entry A. Show six individually countable red tokens and four blue tokens. The learner groups both parts into one visible tray with the group labels preserved. Reveal **6 + 4 = 10 buttons**.
3. **`text`, feedback:** “Ten counts all the buttons, with no overlap: six red and four blue.” If they answer six: “That is only the red part. We also have four blue buttons.” If they answer fourteen: “We had six red and four blue, not six plus an already known total.”
4. **`markdown`:** “A **whole** can be made of **parts**. The parts together make the whole when every object belongs to exactly one part.”

### Section 2 — Same collection, different unknown

_Purpose: distinguish a known whole from a missing part._

1. **`text`:** “This time the box has **10 buttons in total**. **6 are red; all the rest are blue.** How many are blue? We still have the same ten buttons.”
2. **`scene` Resource (proposed):** Partition Lab entry B starts with a full ten-unit tray labeled “whole 10”, six marked red and four unnamed “rest”. The child identifies which amount is **already included** in the ten and predicts the unknown part. Let them uncover 10 − 6 = **4 blue buttons**, then rejoin parts.
3. **`text`, feedback:** For 16: “Ten is the total already; six are included in it. Adding six counts red buttons a second time.” For 4: “Six red and four blue fit the whole ten.”
4. **`markdown`:** “Known **whole + one known part** tells us the other part by subtraction. Check it by adding the parts together again.”

### Section 3 — The question can change, not the objects

_Purpose: practice shifting which quantity is unknown, not guessing keywords._

1. **`text`:** “Here are 10 counters: 6 belong to the red group and 4 to the blue group. If we hide **the total**, what would we need to find? If we hide **the blue part**, what changes?”
2. **`scene` Resource (proposed):** Entry C offers the same 6/4/10 partition with one role hidden at a time: unknown total: **6 + 4 = ?**; unknown second part: **10 − 6 = ?**; unknown first part: **10 − 4 = ?**. The learner chooses the matching role, not a word trigger. Give immediate reasoned feedback and reveal on demand. Values are 10, 4 and 6 respectively.
3. **`text`:** “Our counted objects did not change. The question changed. A part cannot be more than the whole when these are the only nonoverlapping parts.”
4. **`markdown`:** Optional zero-part contrast: “If all 10 are red, and the rest are blue, **10 − 10 = 0 blue buttons**.” Zero is a valid missing-part result.

### Section 4 — Independent transfer in a new context

_Purpose: discover an unknown part from a total and check by recombining._

1. **`text`:** “A bag has **15 marbles**. **9** are green. **All the remaining marbles are yellow**. How many yellow marbles? Show why your answer makes one whole.”
2. **`scene` Resource (proposed):** Partition Lab entry D supplies a fifteen-unit model with nine labeled green; child fills the unknown yellow group using a number picker or counter increment/decrement, then checks **15 − 9 = 6** and **9 + 6 = 15**. First hint: “Fifteen includes the nine green.” Second hint: “What goes with nine to make fifteen?”
3. **`text`, feedback:** Candidate 24: “Adding the known part to the whole would count green marbles twice.” Candidate 6: “Nine green plus six yellow makes the full fifteen.” Give an explanation choice, text/speech to an adult, or voluntary typed response.
4. **`markdown`:** “**Recall:** Parts join to make a whole. If the whole is known, remove one known part to find the other. Always check the complete partition.”

## Production, accuracy, accessibility and review

Every general Section is an **ordered single vertical column** of available `text`/`markdown` and **proposed** `scene` resources. The [Partition Lab](./scenes/partWholePartitionLab.scene-spec.md) has a separate spec; it does not exist in runtime. All groups are explicitly nonoverlapping, and “rest are blue/yellow” means there are exactly two categories. Do not use vague mixed-group illustrations, silently introduce a third category, or treat a 10-unit whole as an additional group to add. This is non-scored instruction, not a Question, Quiz, mastery decision or Note event.

All words, units, accessible group descriptions, feedback and symbolic reading require authentic translations for all supported locales. In RTL maintain the causal part/whole roles and operand order, not a mirrored arithmetic claim. Every draggable/manipulable object has a keyboard/switch/tap alternative and nonvisual numerical ledger. Use focus management, large targets, reduced-motion/static equivalent, high-contrast non-color-only group identity, small-screen zoom and offline-complete selected-language assets once implemented. The current app's PWA state is not assumed. This Content is **provisional**, pending approval of its [Draft Brief](./methodologist-brief.md).
