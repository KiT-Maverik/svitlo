# Which Operation Fits the Story? — Lesson Content

**Screenwriter status:** Provisional Draft — pending [Methodologist approval](./methodologist-brief.md). **Runtime:** not implemented. **Program dependence:** none. **Language:** English editorial source, not localized production copy.

## Editorial experience

The learner must **read the relationship and the unknown** before choosing an operation. A surprising pair of stories with the same word “more” provides the conceptual pivot. No operation is selected by a keyword rule; the proposed Scene lets learners inspect _what the quantities refer to_.

### Section 1 — What happens to the collection?

_Purpose: connect addition/subtraction to visible changes, not language cues._

1. **`text`:** “There are **7 shells** in a box. We add **5 more shells**. How many now?” Ask learners to predict whether the collection grows or shrinks before choosing a symbol.
2. **`scene` resource, proposed:** [Story Relationship Switch](./scenes/storyRelationshipSwitch.scene-spec.md), entry A. Child places seven known shells and five incoming shells in a labeled before/change/after model. Choose either **7 + 5 = ?** or **7 − 5 = ?**, then reveal: twelve shells. Wrong-choice feedback: “No shells were removed; five came in.” Right-choice feedback: “The new amount includes both groups.”
3. **`text`:** “Now there are **12 cards** and **5 are given away**. What changes?” Child predicts fewer, then compares **12 − 5 = 7** with the impossible **12 + 5 = 17** for cards remaining. If addition chosen: “Giving away does not add cards to the starting collection.”
4. **`markdown`:** “When you know the parts being joined, addition finds the whole. When some of a known collection leaves, subtraction finds what remains.”

### Section 2 — The same word can tell different stories

_Purpose: reveal the failure of keyword matching._

1. **`text`:** “Ava has **9 beads**. Sam has **4 more beads than Ava**. How many beads does Sam have?” Invite a prediction, then label Ava as the smaller known amount.
2. **`scene` resource, proposed:** Switch entry B. Display labeled Ava=9, Sam=?, gap=4. Place a four-counter extension on Sam's bar and display **9 + 4 = 13**. Feedback if 9−4 selected: “Sam has four _more_, so Sam must have _more than nine_, not five.”
3. **`text`:** “Now change **who** has more: Ava has **9 beads** and Ava has **4 more than Sam**. How many does **Sam** have? The word ‘more’ stayed, but which person is the larger group?”
4. **`scene` resource, proposed:** Switch entry C preserves the labeled bars and swaps the relational arrow, not just the operation. Gap 4 lies between Sam and Ava; Sam=9−4=**5**. For 13: “If Sam had thirteen, Ava could not have four more than Sam while Ava has nine.” For 5: “Five plus four matches Ava's nine.”
5. **`markdown`:** “Don't ask whether the story says ‘more’ or ‘less’. Ask: **Who has what? Which amount is unknown?**”

### Section 3 — Choose first, then calculate

_Purpose: avoid accidental correct answers from trial calculations._

1. **`text`:** “A class has **15 markers**. **6 markers** belong in a drawing box; the rest belong in a writing box. How many markers belong in the writing box?” Ask children to label **known whole 15**, **known part 6**, **unknown other part**.
2. **`scene` resource, proposed:** Switch entry D, without an operation offered first. The learner chooses a verbal relationship (“two parts make fifteen” or “two new groups join fifteen”) and then chooses **15 − 6 = ?**. Reveal **9 markers**. If choose addition: “Fifteen is the whole collection already; adding six counts that part twice.”
3. **`text`:** “What makes the answer reasonable?” Nine and six total fifteen and belong to the same whole.

### Section 4 — Independent transfer: the wording trap

_Purpose: transfer to a comparison without a supplied model._

1. **`text`:** “Lina has **11 pencils**. Lina has **3 more pencils than Tom**. How many pencils does **Tom** have? Tell which amount is larger _before_ choosing the calculation.”
2. **`scene` resource, proposed:** Fresh comparison with empty role labels. Learner chooses “Lina larger” and **11 − 3 = 8**. Optional hint exposes the comparison bar without disclosing the operation; full reveal checks **8 + 3 = 11**.
3. **`text`:** Feedback for 14: “If Tom had fourteen, Tom would have more than Lina, but the story says Lina has more.” Feedback for 8: “Tom has eight and Lina has three more: eleven.”
4. **`markdown`:** “**Recall:** Follow the quantities and their roles; the same word can accompany different operations.”

## Production / access and editorial dependencies

All general Section blocks appear **top-to-bottom** and use verified `text`/`markdown` plus **proposed** `scene` kinds. This is formative interaction, not a Question or a Quiz. Every comparison bar must have accessible semantic labels for larger/smaller and known/unknown; no dependence on horizontal direction, a red/green color, drag-only or narration-only. RTL must retain the logical larger-than relationship and operation order while adapting label layout. Provide keyboard/touch/switch controls, spoken-equivalent descriptions, reduced motion, zoom/mobile reflow, localized story grammar, complete real translations for all supported locales and an offline bundle in future implementation. Do not imply these capabilities are already delivered or invent persistence APIs.

No runtime configuration, grading, scoring, Question, Quiz or Notes. All Content and [Scene specifications](./scenes/storyRelationshipSwitch.scene-spec.md) remain provisional until editor approval of the [Brief](./methodologist-brief.md).
