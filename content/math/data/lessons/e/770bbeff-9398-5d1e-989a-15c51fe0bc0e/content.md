# One Relationship, Four Ways to Show It — Lesson Content

**Screenwriter status:** Provisional Draft — pending [Methodologist Brief](./methodologist-brief.md) approval.  
**Implementation:** None; proposed Scenes are not React components. **Program dependence:** None.  
**Working language:** English editorial source; full multilingual localization remains future work.

## Experience rationale

This Lesson is **not** another task merely to choose a model of a story. Children must make deliberate transformations **in both directions** between concrete objects, a labeled diagram, a verbal description and a symbolic expression, checking that the same mathematical relationship survives. The experience varies surface pictures but keeps the roles of quantities explicit. A full diagram-to-symbol-to-words cycle matters more than many lookalike quizzes.

### Section 1 — Four doors to the same change

_Purpose: perceive what stays invariant across differently presented forms._

1. **`text` Resource:** “There are **8 beads** in a jar. **3** more are dropped in. How can we show what happened in more than one way? Predict whether every picture showing the numbers 8 and 3 tells the same story.”
2. **`scene` Resource (proposed):** [Representation Bridge](./scenes/representationBridge.scene-spec.md), entry A. Start with 8 discrete counters and a separate incoming group of 3. Learner reveals a labeled before/add/after diagram with **before=8**, **added=3**, **after=?**. Then reveal a sentence “Eight beads, then three added” and symbolic **8 + 3**, optionally **8 + 3 = 11**. Each mode is independently describable through text.
3. **`text` Resource:** “The colors and arrangement change, but we still start with eight and add three. That means the final quantity can be calculated as eleven.”
4. **`markdown` Resource:** “Models are different ways to explain the **same relationship**. A diagram is good when it names what the numbers mean; a symbol is short, but we still need to know the story behind it.”

### Section 2 — A beautiful picture can be the wrong model

_Purpose: separate using the same numerals from preserving what those numerals mean._

1. **`text`:** “Two diagrams both show **8** and **3**. One joins three new beads to eight; the other marks three beads as removed from eight. Do they tell the same story?” Give the learner room to predict before reveal.
2. **`scene` Resource (proposed):** Representation Bridge entry B. Present two explicitly labeled diagrams: **A: 8 initial, +3 incoming**; **B: 8 initial, −3 removed**. Their expressions are **8+3=11** and **8−3=5**. Ask learners to match “three arrive” to A and explain why B fails. Wrong feedback: “Both show the numbers eight and three, but one **adds** three and the other **removes** three.”
3. **`text`:** “We did not change the digits; we changed the **relationship**. Matching numbers is not enough to make representations equivalent.”

### Section 3 — Work backward from a diagram or symbol

_Purpose: convert from an unfamiliar mode into accurate words._

1. **`text`:** “Here is a diagram: a collection of **12 tokens** with **5** marked as taken away, and a remaining group not yet counted. Tell a story that matches what the diagram says.”
2. **`scene` Resource (proposed):** Representation Bridge entry C. Allow selection among verbal descriptions:
   - A: “Twelve tokens, five removed; how many remain?” **Correct.**
   - B: “Twelve tokens, five added; how many now?” **Incorrect relationship.**
   - C: “Five tokens, twelve removed.” **Incorrect starting quantity and impossible nonnegative model.**
     Reveal **12−5=7** after learner inspection. Incorrect A/B choice feedback: “The diagram marks five leaving, not arriving.” Incorrect C feedback: “Twelve was the amount you began with.”
3. **`markdown`:** “A useful translation keeps **starting amount, change, unknown** and units. It is not enough to draw approximately the same number of shapes.”

### Section 4 — Your new story, your representations

_Purpose: independent transfer to a different object and a different initial quantity._

1. **`text`:** “A table has **10 shells**. A child moves **4 shells** into a bag. Build or choose **a new diagram, one sentence and one expression** that all describe the shells remaining on the table.”
2. **`scene` Resource (proposed):** Representation Bridge entry D, fresh scenario. The learner uses choice cards or accessible text input to produce a diagram with **10 starting shells**, **4 removed**, **? remain**; sentence “Ten shells, four moved away”, expression **10 − 4**. Feedback if choose **10+4**: “Those four leave the table, so their quantity cannot be added to what remains here.” Wrong diagram with 4 initial: “Four is the number moved, not the initial total.” On reveal **10−4=6 shells**. A learner may explain by selecting the role descriptions without needing to speak or write.
3. **`text`:** “If one of your forms has **four shells arriving** while the others show **four leaving**, they are not the same story. Fix the one that changed the relationship.”
4. **`markdown`:** “**Recall:** When moving between objects, diagrams, words and expressions, keep the **roles and relationships** the same. A number alone never tells the entire story.”

## Source-of-truth and production boundaries

Use a **single vertical column** of ordered `text`, `markdown` and proposed `scene` Resources for each Section. The [Representation Bridge](./scenes/representationBridge.scene-spec.md) is a _new proposed Scene_ with a separate specification; the generic renderer can handle Scene resources but this interaction is **not implemented**. There is no runtime lesson, Question, Quiz, scoring, mastery or Note persistence.

No translation is delivered by this English editorial file. Localization must preserve linguistic differences between “moved into bag”, “removed”, “joined”, and “remaining”, as well as math syntax, all feedback and nonvisual explanations for every supported locale. RTL changes layout and logical reading order, not the meaning of before/after or arithmetic operands. Every model needs a screen-reader-equivalent list of labeled quantities and relational actions; provide keyboard/switch/touch controls and a nondrag alternative, obvious visible focus, no color-only differences, reduced-motion reveal and zoom/mobile reflow. Offline equivalence is a **future implementation requirement for downloadable selected locale resources**, not an existing feature claim. The Brief and all Scene proposals remain Draft pending Methodologist/editor approval.
