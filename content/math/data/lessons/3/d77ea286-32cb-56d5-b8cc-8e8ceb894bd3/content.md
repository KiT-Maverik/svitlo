# Make Both Sides Equal — Lesson Content

**Screenwriter status:** Provisional Draft — awaiting Methodologist approval of [Brief](./methodologist-brief.md). **Runtime:** not implemented. **Program dependence:** none. **Language:** English editorial source; learner strings require genuine locale translations.

## Editorial experience

Do not repeat the existing unknown-addend Lesson as a single blank arithmetic fact. The central discovery is that **both sides of the equals sign may be expressions**, and the unknown must make their _values_ match. Use predictable, equal-unit counters first, then let students reason symbolically; every attempt receives a meaningful explanation, without a score.

### Section 1 — One side is already known (guided exploration)

_Purpose: learn to establish a target value before choosing a missing term._

1. **`text` resource:** “Which side can we work out right now? **6 + □ = 4 + 5**.” Give a moment to predict whether the box should contain 3, 5 or 9, without marking a guess wrong.
2. **`scene` resource, proposed:** [Expression Match Lab](./scenes/expressionMatchLab.scene-spec.md), entry A. A fixed right-hand board shows four counters joined with five; its total is revealed as **9**. The left board shows six visible counters and a space for the box. Children insert one, two, three or more unit counters using plus/minus controls (a keyboard-equivalent to optional manipulation), then inspect the two totals.
3. **`text`:** For 3: “Six and three make nine. Four and five make nine. **Both sides match**.” For 9: “The right side is nine altogether, but six plus nine is fifteen. The box is one part, not the whole.” For 5: “Six plus five is eleven, not nine.”
4. **`markdown`:** “The side with no box gives us a target. Find a number that makes the other side have that same value. Then check _both_ sides.”

### Section 2 — Move the box, not the rule (guided contrast)

_Purpose: resist reading the equals sign as a one-way arrow._

1. **`text`:** “A different equality: **7 + 2 = □ − 1**. Seven plus two is nine. What number must we start with if we remove one and still have nine?”
2. **`scene` resource, proposed:** Expression Match Lab, entry B. Show nine counters for 7 + 2 on one board. The other board is a configurable starting group with one counter visually marked to leave. Try **9**, **10**, **11** in the start box, and reveal the amount after removing one. The learner may change the candidate freely.
3. **`text`:** If 9: “Nine minus one is eight, so the sides differ.” If 11: “Eleven minus one is ten, too many.” If 10: “Ten minus one is nine. Both sides are nine. The box is **10**, even though the other side's value is **9**.”
4. **`markdown`:** “The missing number is not always the result. It may be a starting number or part of an expression.”

### Section 3 — Fix a mistaken idea (prediction and explanation)

_Purpose: make the value-based test explicit._

1. **`text`:** “A friend writes **8 + □ = 6 + 5**, puts **11** in the box and says, ‘The right side is eleven, so the box is eleven.’ Is that enough?”
2. **`scene` resource, proposed:** Lab entry C begins with candidate 11. Compare 8 + 11 = 19 with 6 + 5 = 11. Ask what is actually missing on the left; replacing with **3** restores 8 + 3 = 11. Learner chooses whether to change the box or the equals sign. If they choose the sign: “The symbol doesn't change eight plus eleven.”
3. **`text`:** “A true check: **8 + 3 = 11** and **6 + 5 = 11**. You found what _was needed_, not just the total.”

### Section 4 — New context, independent transfer

_Purpose: apply the same reasoning without a pre-filled candidate._

1. **`text`:** “Make **□ + 4 = 5 + 6** true. First work out the side without the box, then find the missing part and explain.”
2. **`scene` resource, proposed:** Lab entry D hides the target until the learner elects to reveal a hint, offers an accessible number-entry alternative to tokens, and shows a comparison only after the learner requests Check. Expected: **7 + 4 = 5 + 6 = 11**.
3. **`text`:** Feedback for 11: “Eleven is the value of the whole side, but eleven plus four is fifteen.” Feedback for 7: “Seven plus four and five plus six both equal eleven.” Ask: “How did you check?” Accept a nonverbal choice of “I worked out both sides.”
4. **`markdown`:** “**Recall:** Work out a known side; choose a candidate for the blank; **check both sides**. An equality is true only when the values match.”

## Production / access and editorial dependencies

Each Section contains a **single vertical ordered** list of `text`, `markdown` and proposed `scene` resources; there is no invented `sectionType` or Quiz resource. A renderer for generic `text`, `markdown`, `scene` is available in the inspected Playground, but **Expression Match Lab is not implemented**. Every equation needs semantic math reading in LTR/RTL, nonvisual side values, keyboard/switch alternative to counter movement, text plus visual feedback, non-color-only outcomes, reduced motion and 200% zoom/mobile reflow. All teaching strings, mistakes and accessibility labels must be meaningfully translated for supported locales with no fallbacks. The selected lesson and media must become offline-capable after actual implementation and download; this document asserts neither an existing offline flow nor saved progress.

No Questions, Quizzes, scores, grading, Note APIs or runtime lesson data are authored. This Content is provisional pending explicit [Methodologist approval](./methodologist-brief.md); see the separate [Scene handoff](./scenes/expressionMatchLab.scene-spec.md).
