# Check an Answer by Working Backward — Lesson Content

**Screenwriter status:** Provisional Draft — awaiting explicit [Methodologist approval](./methodologist-brief.md). **Implementation:** None. **Program dependence:** None. **Language:** English source editorial copy only.

## Editorial experience

The learner has already met plausibility checks; now they must learn an actual **second mathematical operation** that can contradict a wrong result. The key experience is reversible change: joining 27 to 46 gives 73, and removing the same 27 from 73 returns to 46. This is not a repeat of the original calculation.

### Section 1 — A journey and the way back

_Purpose: perceive the inverse relation before naming it._

1. **`text`:** “We start at **46** on a number track. We add **27** and claim that we reach **73**. How can we check the claim without doing exactly the same addition again?”
2. **`scene` resource, proposed:** [Reverse-Operation Checker](./scenes/reverseOperationChecker.scene-spec.md), entry A. Move from 46 to 73 by +27 on an annotated 0–100 track; then the learner chooses whether returning should use +27 or −27. Numeric start/change/end labels remain in a textual route table for nonvisual use.
3. **`text`:** Right choice: “73 − 27 = **46**. We returned to the original start, so the proposed sum passes this check.” Wrong choice: “Adding 27 again moves us farther away. To undo an addition of 27, subtract 27.”
4. **`markdown`:** “**Forward:** 46 + 27 = 73. **Backward check:** 73 − 27 = 46. An inverse operation undoes the change.”

### Section 2 — A number that looks close, but fails

_Purpose: distinguish a plausible estimate from exact independent verification._

1. **`text`:** “Someone writes **46 + 27 = 63**. Sixty-three is not as wildly large as 630, but how can we know whether the exact sum is correct?”
2. **`scene` resource, proposed:** Checker entry B starts from claimed total 63; the learner constructs 63 − 27 and sees **36**, not the expected **46**. A wrong “passes” verdict receives “The reverse trip reached thirty-six, but we started at forty-six.”
3. **`text`:** “Our check exposed a mismatch. We must correct the addition: 46 + 27 = **73**, then 73 − 27 = **46**.” Make a clear distinction: a failed check flags an error, but a successful check confirms _these numerical calculations_, not whether a story was modeled correctly.
4. **`markdown`:** “Checking a result means using a relationship that can catch a mistake — not simply looking at whether the answer seems about the right size.”

### Section 3 — Undo subtraction with addition

_Purpose: apply the reverse process in the other direction._

1. **`text`:** “There are **84** stickers. **29** are taken away. A solution says **55** remain. Can you check it without subtracting 29 from 84 again?”
2. **`scene` resource, proposed:** Checker entry C begins with remainder 55 and removed group 29. Restore them: **55 + 29 = 84**. Learner decides whether this matches the starting amount.
3. **`text`:** Wrong test **55 − 29**: “You took more away from the remainder; try putting back the removed stickers.” If proposed remainder is **54**, test gives **54 + 29 = 83**, not 84. Explain why the near miss is still wrong.
4. **`markdown`:** “A subtraction result can be checked by putting the removed amount back.”

### Section 4 — Independent transfer: write a reverse check

_Purpose: create a verification statement, not choose a memorized one._

1. **`text`:** “A child claims **68 − 19 = 49**. What _different_ calculation could confirm this?” No checking equation appears automatically.
2. **`scene` resource, proposed:** Checker entry D provides accessible number tokens, math-expression entry or operation chooser without drag-only interaction. Expected independent check: **49 + 19 = 68**. Optional first hint: “Put back what was taken away.” Optional second hint: “Start with the proposed remainder, forty-nine.”
3. **`text`:** If 49−19 chosen: “Subtracting again does not undo the first subtraction.” If 49+19=68: “You rebuilt the starting sixty-eight. The proposed result passes the reverse check.”
4. **`markdown`:** “**Recall:** Addition can be checked by subtraction. Subtraction can be checked by addition. An inverse check checks the numbers, not whether you chose the right model for a story.”

## Optional extension and boundaries

If students already know exact multiplication/division facts, the same inverse reasoning can check **6 × 4 = 24** via **24 ÷ 4 = 6**, but this example is **not required** in the core Grade 3 journey and must not be presented without prerequisites. This extension does not create another Target Skill.

## Accessibility and implementation handoff

The outer Section content is a single ordered column. Only generic `text`, `markdown` and planned `scene` resources are described; the Checker is new and **not implemented**. Nonvisual and keyboard/touch methods must support creating the inverse calculation, reveal the same numbers, units and mismatch explanations, and distinguish calculation sign/direction from physical movement. Provide text and explicit signs for RTL, no color-only validity, reduced-motion static steps, zoom/reflow and offline functionality once implemented. All control labels, narrated-equivalent explanations, math speech and feedback need genuine translations across all supported locales; no English fallback or invented learner records. Do not assume a Note state or any Quiz grading.

See [Reverse-Operation Checker](./scenes/reverseOperationChecker.scene-spec.md). Content awaits [Brief](./methodologist-brief.md) approval; editorial approval is not claimed.
