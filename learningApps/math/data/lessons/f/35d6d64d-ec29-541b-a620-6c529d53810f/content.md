# True or False? Compare Both Sides — Lesson Content

**Screenwriter status:** Provisional Draft — **pending Methodologist approval**.  
**Methodologist source:** [Draft Brief](./methodologist-brief.md). **Program dependence:** None. **Runtime:** Not implemented.  
**Editorial language:** English source only, not finished multilingual content.

## Learning experience — investigate claims rather than merely calculate

The child is a “mathematical claim inspector”: a symbol between two complete expressions makes a _claim_ that can be true or false. No rewards or scores; each decision leads to a concrete comparison of the values on both sides. This is not a repeat of the equals-sign concept Lesson or the missing-box equality Lesson.

### Section 1 — Test an equality with two expressions

_Purpose: evaluate both entire sides and compare the results._

1. **`text`:** “Does **3 + 5 = 4 + 4** tell the truth? Look at both sides before you decide.” Invite a prediction without immediately revealing the totals.
2. **`scene` Resource (proposed):** [Statement Verifier](./scenes/statementVerifier.scene-spec.md), entry A, shows two equal-unit trays with groups 3+5 and 4+4, the original equality and separate “Check side” buttons. The learner can decide true/false then inspect **8** and **8**. “Yes, they are arranged differently but each side equals eight.”
3. **`text`, misconception feedback:** If false chosen: “Look again: three plus five is eight; four plus four is also eight. A true equality does not require identical writing on each side.” No score, no forced retry.

### Section 2 — Less than, more than, and the values they compare

_Purpose: connect strict order relation to **evaluated** values, not literal first numerals._

1. **`markdown`:** “The sign **<** says ‘the value on this side is **smaller** than the other value’. The sign **>** says ‘the value on this side is **greater**’. Neither sign is automatically an instruction to find an answer.” Present clear numerical examples **7 < 8** and **8 > 7**; accompanying bars explicitly label seven and eight.
2. **`text`:** “Is **5 + 2 < 4 + 4** true? Work out the left and right values.”
3. **`scene` Resource (proposed):** Statement Verifier entry B. Reveal left **7**, right **8** separately and show **7 < 8**, true. Ask the learner to explain with “seven is smaller than eight” rather than “the arrow points that way”. For false: “Five plus two is seven; four plus four is eight. Seven really _is less than_ eight.”
4. **`text`:** “Try **9 − 2 > 3 + 5**. The left side is seven; the right side is eight. So the claim ‘seven is greater than eight’ is false.” Offer learner-controlled reveal before explaining.

### Section 3 — What if the values are equal but the symbol says “less”?

_Purpose: detect the subtle false strict inequality._

1. **`text`:** “Someone writes **4 + 6 < 8 + 2** and says it is true because both sides make ten. Is that a good reason?” Allow a prediction before showing values.
2. **`scene` Resource (proposed):** Statement Verifier entry C compares **10** and **10**. Child must choose the relation to _repair_ the original statement from **<** to **=** while leaving the expressions unchanged. If select **>**, feedback: “Ten is not greater than ten.” If retain **<**, feedback: “Ten is not smaller than ten.” If choose **=**: “Yes. Equal values need equality, not strict less-than.”
3. **`markdown`:** “Equal values satisfy **=**, but not the strict signs **<** or **>**. A false claim may have correctly calculated numbers but the **wrong relation**.”

### Section 4 — Independent claim check

_Purpose: make the learner evaluate without a preselected comparison._

1. **`text`:** “Check **5 + 6 > 8 + 2**. Choose true or false, then explain what each side equals. The symbol is a claim, not a calculator button.”
2. **`scene` Resource (proposed):** Statement Verifier entry D hides totals until inspected and offers optional hints “Compute five plus six” and “Compute eight plus two”. Values **11** and **10**; claim **11 > 10** is true. Incorrect “false” receives “Eleven is one more than ten; the sign says greater, so the claim is true.”
3. **`text`:** Optional contrast “**8 − 3 > 2 + 4**” shows **5** versus **6**, so **5 > 6** is false. The corrected relation is **<**. Encourage explanation based on _both_ values.
4. **`markdown`:** “**Recall:** First find or reason about each side's value. Then check whether the sign **=, <, >** describes the comparison accurately.”

## Implementation, accessibility and localization handoff

The Section sequence uses vertically ordered existing `text`, `markdown` and **proposed** `scene` resource blocks. [Statement Verifier](./scenes/statementVerifier.scene-spec.md) is a new specification, **not a shipped widget**. Do not add Questions, Quizzes, scores, evaluation persistence, Notes or runtime Lesson configs.

Provide fully equivalent text explanations, mathematical operand order and explicit spoken meanings of < and > for screen readers. Keyboard/touch/switch users must inspect both values and choose relations without drag-only or hover interaction. RTL changes overall reading order appropriately but not relational meaning or numeric operands; treat mixed bidi numerals and signs carefully. Use exact side-value labels, avoid a purely animated “crocodile” or color-only truth signal, offer reduced motion, visible focus, text scaling/mobile reflow and equivalent offline behavior once code and locale assets are downloaded. All strings and aria-like names require genuine translations into every supported locale before runtime implementation. Content remains provisional until formal approval of the [Methodologist Brief](./methodologist-brief.md).
