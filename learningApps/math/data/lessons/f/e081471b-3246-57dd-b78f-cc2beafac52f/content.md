# Parentheses Change the Grouping — Lesson Content

**Screenwriter status:** Provisional Draft, pending explicit Methodologist approval.  
**Source:** [Draft Methodologist Brief](./methodologist-brief.md). **Program dependence:** None. **Runtime implementation:** None.  
**Language:** English editorial source; genuine translations not yet created.

## Instructional premise

Parentheses are not stickers placed around arbitrary digits: they specify which _subexpression_ is evaluated before another operation uses the result. Begin with subtraction because two visually similar notations can have different values, then investigate multiplication/addition precedence, and finally contrast a grouping that **does not change** the result. The brief intentionally covers introductory depth of a broader canonical Skill, not nested parentheses or the full order-of-operations curriculum.

### Section 1 — Same numerals, two different calculations

_Purpose: reveal why grouping is mathematically significant._

1. **`text` Resource:** “We have two cards: **(10 − 4) − 2** and **10 − (4 − 2)**. They contain the same numbers and minus signs. Must they give the same answer?” Invite an unscored prediction before showing a result.
2. **`scene` Resource (proposed):** [Grouping Workbench](./scenes/groupingWorkbench.scene-spec.md), entry A. Highlight **(10 − 4)** as the first subexpression in the first card, evaluate 10−4=6, then show 6−2=**4**. On the second card highlight **(4 − 2)**, evaluate 4−2=2, then show 10−2=**8**. The child controls each reveal; no automatic jump over the grouped stage.
3. **`text`, feedback:** If “same result”: “The digits match, but the part we work out first is different. Four and eight are not the same.” If “different”: “Yes: parentheses show different groups to calculate first.”
4. **`markdown`:** “**Parentheses ( ) say: use the value of this whole group before the outer operation.** They can change what a calculation means.”

### Section 2 — What happens when multiplication and addition meet?

_Purpose: make the conventional unparenthesized order explicit rather than implying every expression is left-to-right._

1. **`text`:** “The expression **2 × (3 + 4)** describes **two groups of seven**. First find three plus four, then multiply the result by two. What is the total?”
2. **`scene` Resource (proposed):** Grouping Workbench entry B shows two trays of seven unit counters (or two labeled groups with seven each) and a nested stage readout **3 + 4 = 7**, then **2 × 7 = 14**. Learner can choose stage order and request explanation.
3. **`text`:** “Now compare **2 × 3 + 4** with **no parentheses**. Under the usual convention multiplication is done before addition: **2 × 3 = 6**, then **6 + 4 = 10**. It is not equal to fourteen.”
4. **`scene` Resource (proposed):** Same entry in separate comparison mode, visibly labels the conventional grouping of **2 × 3 + 4** as **(2 × 3) + 4**; avoid claiming that a child can always choose any order. Feedback for 14 as unparenthesized result: “That would group 3+4 first, but no parentheses instruct us to do that here.”
5. **`markdown`:** “Parentheses come first. Without them, multiplication ordinarily comes before addition. The calculation rules are agreed mathematical notation, not a guessing game.”

### Section 3 — Parentheses do not always change a value

_Purpose: avoid the converse misconception that any brackets force a different answer._

1. **`text`:** “Are **(2 + 3) + 4** and **2 + (3 + 4)** different in value? Let's examine the groups.”
2. **`scene` Resource (proposed):** Grouping Workbench entry C evaluates left grouping **2+3=5**, then 5+4=**9**. Right grouping **3+4=7**, then 2+7=**9**. Both equal nine. The child still follows the different grouping order and can explain that addition of these nonnegative counts produces the same total.
3. **`text`, feedback:** “The first groups are different, but both expressions total nine. Parentheses specify a grouping; they **may**, not **must**, change the value.”
4. **`markdown`:** Optional compact recognition Note concept: “Work out the part inside parentheses first, then continue with the surrounding operation.”

### Section 4 — Independent transfer: explain both stages

_Purpose: apply grouping to a fresh expression and expose an incorrect calculation path._

1. **`text`:** “Which answer matches **3 × (2 + 5)**? Explain what happens first.”
2. **`scene` Resource (proposed):** Workbench entry D starts with the symbolic expression and no grouped counter tray. The child chooses subexpression **2+5=7** and then **3×7=21**. Distractor **11** comes from performing **3×2+5=6+5=11** instead. Optional hints: “Look inside the parentheses” and “How many groups of seven?”
3. **`text`, feedback:** For 11: “You multiplied three by two before adding five. But this expression first groups two plus five.” For 21: “Three equal groups of seven make twenty-one.” For an invalid interim number, show the exact inner result before the total.
4. **`markdown`:** “**Recall:** Parentheses tell you what group to calculate first. Preserve all signs and operands. Compare results only after evaluating the complete expressions.”

## Coverage limits, accessibility and production

The canonical `parentheses` Skill includes grouping alongside operation precedence and can extend to nesting. This is an introductory **Grade 3 Lesson**; **nested parentheses, division precedence and variable expressions are deferred**, not redefined or declared mastered. Children need the explicit prerequisite that multiplication precedes addition when parentheses do not override it. Each Section is a single vertical ordered set of supported `text`/`markdown` plus **proposed** `scene` Resources. [Grouping Workbench](./scenes/groupingWorkbench.scene-spec.md) is not a runtime component. None of the learner choices is a scored Question or Quiz.

Provide accessible literal expression read-out, explicit identification of the grouped operands, step-by-step numeric ledger and screen-reader equivalence to all highlighted mathematics. RTL must keep subtraction order and grouping location, not invert expressions. Keyboard, switch and touch users select stages and reveal totals without dragging; reduced-motion static steps contain identical facts, no animation-only explanation. Localize every speech/readout, formula label, hint and feedback for all supported languages with no English fallback. Ensure zoom/mobile reflow, visible focus, color-independent highlights, and complete offline operation after a future download—not an assertion of implemented PWA support. Brief is still Draft and Content **provisional**.
