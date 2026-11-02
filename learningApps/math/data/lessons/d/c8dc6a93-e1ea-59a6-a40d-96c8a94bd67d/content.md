# How Many More or Fewer? — Lesson Content

**Screenwriter status:** Provisional Draft, pending explicit Methodologist approval.  
**Source:** [Draft Methodologist Brief](./methodologist-brief.md). **Program dependence:** None. **Runtime:** Not implemented.  
**Language:** English editorial source; production translations are not yet authored.

## Learning experience

The learner discovers **difference as unmatched quantity** rather than treating “more” as an automatic addition instruction. The comparison always names two complete groups and asks specifically **how many more/fewer**, not “how many does the unknown character have?” (which is taught in the previous operation-selection Lesson). Use one-to-one matching with numerals and an accessible text ledger; make the _difference_ visible without changing either group's count.

### Section 1 — When each object has a partner

_Purpose: discover a zero difference through pairing._

1. **`text` Resource:** “Lena has **8 pencils**. Danylo has **8 pencils**. How many **more** pencils does one have than the other? Look at matching pairs.”
2. **`scene` Resource (proposed):** [Comparison Gap Lab](./scenes/comparisonGapLab.scene-spec.md), entry A. Eight countable pencil icons in each labeled row, plus a matching ledger “eight paired, zero left unmatched.” Learner reveals one matched pair at a time or “Show all pairs”. Feedback: “All eight have partners; **zero pencils more**.”
3. **`text`:** “More does not mean we should add here. The question asks **what the gap is**, and the groups are equal.”
4. **`markdown`:** “A comparison gap is how many units are **not matched** in the larger group. Equal groups have a gap of zero.”

### Section 2 — What stays unmatched?

_Purpose: establish the quantitative meaning of subtraction._

1. **`text`:** “Lena has **13 pencils**; Danylo has **9 pencils**. **How many more** does Lena have?” Invite a prediction before doing any calculation.
2. **`scene` Resource (proposed):** Gap Lab entry B presents thirteen and nine equal-unit counters with labels and optional pair-reveal controls. Pair nine from each group, leave **4 unpaired** in Lena's group. Model **13 − 9 = 4 pencils**. Offer accessible nonvisual count summary at every reveal.
3. **`text`, feedback:** For 22: “Thirteen plus nine counts **both collections together**, not the difference.” For 4: “Nine match nine; four remain without partners.”
4. **`markdown`:** “The **larger amount minus the smaller amount** gives the nonnegative gap: **13 − 9 = 4**. The answer is ‘four more pencils’, not just an unlabeled four.”

### Section 3 — “Fewer” changes the wording, not the gap

_Purpose: compare two descriptions of the same difference._

1. **`text`:** “Lena has thirteen pencils and Danylo nine. How many **fewer** pencils does Danylo have than Lena? Is the answer different from ‘how many more does Lena have’?”
2. **`scene` Resource (proposed):** Entry C keeps **the same counts 13 and 9** and reverses the wording only. The unmatched difference remains **4 pencils**. “More than” identifies Lena as larger; “fewer than” identifies Danylo as smaller. Ask the learner to name which group is being described.
3. **`text`:** “Both questions compare the _same two groups_. The gap is four in either wording; we are naming it from different perspectives.”
4. **`markdown`:** Clarify a separate question: “**How many times** as many?” is a **multiplicative** comparison, not another way to ask for the gap. We do not calculate a ratio in this Lesson.

### Section 4 — Independent transfer without a prebuilt pairing

_Purpose: identify a difference from numbers and explain the subtraction._

1. **`text`:** “A shelf holds **18 small books** and **11 large books**. How many **more small books than large books** are there?” These are two categories of the same unit “books”.
2. **`scene` Resource (proposed):** Gap Lab entry D starts with a textual list, no automatic aligned bars. Learner chooses to build a pairing model or instead perform **18 − 11 = 7 books** with accessible number/operator controls. Optional hint “Which group is larger?”; a second “Count how many are left after matching eleven.”
3. **`text`, feedback:** For 29: “That is all the books combined, but the question asks by how many one group exceeds the other.” For 7: “Eighteen is seven more than eleven. The gap is seven books.” If a learner proposes “7 small books in total”, clarify “Seven is the **difference**, not the whole small-book collection.”
4. **`markdown`:** “**Recall:** Compare compatible groups. Match equal units, count the unmatched excess, or subtract the smaller count from the larger.”

## Production, accessibility and editorial boundaries

Each Section is a vertically ordered `text`, `markdown`, or **proposed** `scene` Resource. [Comparison Gap Lab](./scenes/comparisonGapLab.scene-spec.md) is not currently implemented. Every comparison uses two counts of _the same unit_, never mixes pencils and books in a single arithmetic comparison. An equal-unit bar must not have misleading scale or rely on color/picture size. All choices/explanations are formative; no Question, Quiz, scoring, mastery attribution or persistence is authored.

Provide every named quantity and unmatched-pair result as visible/accessible text, keyboard/switch/tap controls instead of drag-only pairing, high contrast with descriptive labels, focus and zoom/reflow, reduced motion and no time limits. All wordings (“more”, “fewer”, “gap”), symbols, units, feedback and screen-reader descriptions need genuine locale translations. RTL may change UI navigation but must preserve which group is larger and the numerical subtraction order. Require an offline-complete implementation with selected locales/assets later, but do not claim current offline readiness. The [Methodologist Brief](./methodologist-brief.md) remains Draft and this Content is **provisional**.
